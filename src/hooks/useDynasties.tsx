
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Dynasty {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'premium' | 'founder';
  founder_id: string;
  member_limit?: number;
  created_at: string;
  avatar_url?: string;
  founder?: {
    username?: string;
    full_name?: string;
  };
  member_count?: number;
}

export const useDynasties = () => {
  const { user } = useAuth();
  const [dynasties, setDynasties] = useState<Dynasty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setDynasties([]);
      setLoading(false);
      return;
    }

    const fetchDynasties = async () => {
      try {
        setLoading(true);
        
        // Get dynasties where user is founder or member
        const { data: memberDynasties, error: memberError } = await supabase
          .from('dynasty_members')
          .select(`
            dynasty_id,
            dynasties (
              id,
              name,
              description,
              status,
              founder_id,
              member_limit,
              created_at,
              avatar_url,
              profiles!dynasties_founder_id_fkey (
                username,
                full_name
              )
            )
          `)
          .eq('user_id', user.id);

        if (memberError) throw memberError;

        // Get dynasties where user is founder
        const { data: founderDynasties, error: founderError } = await supabase
          .from('dynasties')
          .select(`
            id,
            name,
            description,
            status,
            founder_id,
            member_limit,
            created_at,
            avatar_url,
            profiles!dynasties_founder_id_fkey (
              username,
              full_name
            )
          `)
          .eq('founder_id', user.id);

        if (founderError) throw founderError;

        // Combine and deduplicate dynasties
        const allDynasties = new Map();

        // Add member dynasties
        memberDynasties?.forEach(item => {
          if (item.dynasties) {
            allDynasties.set(item.dynasties.id, {
              ...item.dynasties,
              founder: item.dynasties.profiles
            });
          }
        });

        // Add founder dynasties
        founderDynasties?.forEach(dynasty => {
          allDynasties.set(dynasty.id, {
            ...dynasty,
            founder: dynasty.profiles
          });
        });

        // Get member counts for each dynasty
        const dynastiesWithCounts = await Promise.all(
          Array.from(allDynasties.values()).map(async (dynasty) => {
            const { data: memberData } = await supabase
              .from('dynasty_members')
              .select('id')
              .eq('dynasty_id', dynasty.id);

            return {
              ...dynasty,
              member_count: memberData?.length || 0
            };
          })
        );

        setDynasties(dynastiesWithCounts);
        setError(null);
      } catch (err) {
        console.error('Error fetching dynasties:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchDynasties();

    // Set up real-time subscription for dynasty changes
    const subscription = supabase
      .channel('dynasty-updates')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'dynasties'
      }, () => {
        fetchDynasties();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'dynasty_members'
      }, () => {
        fetchDynasties();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user]);

  const createDynasty = async (name: string, description?: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      // Create dynasty
      const { data: dynasty, error: dynastyError } = await supabase
        .from('dynasties')
        .insert({
          name,
          description,
          founder_id: user.id,
          status: 'active'
        })
        .select()
        .single();

      if (dynastyError) throw dynastyError;

      // Add founder as member
      const { error: memberError } = await supabase
        .from('dynasty_members')
        .insert({
          dynasty_id: dynasty.id,
          user_id: user.id,
          role: 'founder'
        });

      if (memberError) throw memberError;

      return dynasty;
    } catch (error) {
      console.error('Error creating dynasty:', error);
      throw error;
    }
  };

  return {
    dynasties,
    loading,
    error,
    createDynasty
  };
};
