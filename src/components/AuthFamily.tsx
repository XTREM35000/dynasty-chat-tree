import React, { useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Crown, Users, Mail, Lock, User, AlertCircle, Camera, Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from './Header';
import Footer from './Footer';

interface LoginFormData {
  email: string;
  password: string;
}

interface SignupFormData {
  email: string;
  password: string;
  full_name: string;
  username: string;
}

interface AuthFamilyProps {
  onAuthSuccess: () => void;
}

const AuthFamily: React.FC<AuthFamilyProps> = ({ onAuthSuccess }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loginForm = useForm<LoginFormData>();
  const signupForm = useForm<SignupFormData>();

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: error.message,
        });
        return;
      }

      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans votre espace familial !",
      });
      
      onAuthSuccess();
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadAvatar = async (userId: string) => {
    if (!avatarFile) return null;

    const fileExt = avatarFile.name.split('.').pop();
    const fileName = `${userId}/avatar.${fileExt}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, avatarFile, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error('Erreur upload avatar:', error);
      return null;
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    setLoading(true);
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: data.full_name,
            username: data.username,
          }
        }
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur d'inscription",
          description: error.message,
        });
        return;
      }

      // Upload avatar si disponible
      let avatarUrl = null;
      if (authData.user && avatarFile) {
        avatarUrl = await uploadAvatar(authData.user.id);
      }

      // Mettre à jour le profil avec l'avatar
      if (authData.user && avatarUrl) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ avatar_url: avatarUrl })
          .eq('id', authData.user.id);

        if (profileError) {
          console.error('Erreur mise à jour profil:', profileError);
        }
      }

      toast({
        title: "Inscription réussie",
        description: "Vérifiez votre email pour confirmer votre compte",
      });
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-[var(--whatsapp-background)] whatsapp-pattern p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto mb-4 animate-float">
              <Crown className="w-10 h-10 text-[var(--whatsapp-green)]" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Généalogie Dynastique
            </h1>
            <p className="text-gray-600">
              Connectez-vous à votre histoire familiale
            </p>
          </div>

          <Card className="shadow-xl">
            <Tabs defaultValue="connexion" className="w-full">
              <CardHeader className="pb-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="connexion" className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Connexion</span>
                  </TabsTrigger>
                  <TabsTrigger value="inscription" className="flex items-center space-x-2">
                    <Crown className="w-4 h-4" />
                    <span>Inscription</span>
                  </TabsTrigger>
                </TabsList>
              </CardHeader>

              <CardContent>
                <TabsContent value="connexion" className="space-y-4">
                  <CardTitle className="text-center text-xl">
                    Accédez à votre dynastie
                  </CardTitle>
                  <CardDescription className="text-center">
                    Connectez-vous pour retrouver votre famille
                  </CardDescription>

                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        rules={{ 
                          required: "L'email est requis",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Adresse email invalide"
                          }
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center space-x-2">
                              <Mail className="w-4 h-4" />
                              <span>Email familial</span>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="votre.famille@email.com"
                                type="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={loginForm.control}
                        name="password"
                        rules={{ 
                          required: "Le mot de passe est requis",
                          minLength: {
                            value: 6,
                            message: "Le mot de passe doit contenir au moins 6 caractères"
                          }
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center space-x-2">
                              <Lock className="w-4 h-4" />
                              <span>Mot de passe</span>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Votre mot de passe"
                                type="password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full whatsapp-gradient text-white"
                        disabled={loading}
                      >
                        {loading ? "Connexion..." : "Se Connecter"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>

                <TabsContent value="inscription" className="space-y-4">
                  <CardTitle className="text-center text-xl">
                    Créer votre lignée
                  </CardTitle>
                  <CardDescription className="text-center">
                    Inscrivez-vous pour commencer votre arbre généalogique
                  </CardDescription>

                  <Form {...signupForm}>
                    <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                      {/* Avatar Selection */}
                      <div className="text-center">
                        <div className="relative inline-block">
                          {avatarPreview ? (
                            <img
                              src={avatarPreview}
                              alt="Avatar preview"
                              className="w-20 h-20 rounded-full object-cover border-4 border-[var(--whatsapp-green)]"
                            />
                          ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                              <Camera className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-0 right-0 bg-[var(--whatsapp-green)] rounded-full p-2 text-white hover:bg-[var(--whatsapp-green-dark)] transition-colors"
                          >
                            <Upload className="w-3 h-3" />
                          </button>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          Cliquez pour ajouter votre photo
                        </p>
                      </div>

                      <FormField
                        control={signupForm.control}
                        name="full_name"
                        rules={{ required: "Le nom complet est requis" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center space-x-2">
                              <User className="w-4 h-4" />
                              <span>Nom complet</span>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Jean Dupont"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={signupForm.control}
                        name="username"
                        rules={{ 
                          required: "Le nom d'utilisateur est requis",
                          minLength: {
                            value: 3,
                            message: "Au moins 3 caractères requis"
                          }
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center space-x-2">
                              <Crown className="w-4 h-4" />
                              <span>Nom d'utilisateur</span>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="jean_dupont"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={signupForm.control}
                        name="email"
                        rules={{ 
                          required: "L'email est requis",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Adresse email invalide"
                          }
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center space-x-2">
                              <Mail className="w-4 h-4" />
                              <span>Email</span>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="votre.famille@email.com"
                                type="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={signupForm.control}
                        name="password"
                        rules={{ 
                          required: "Le mot de passe est requis",
                          minLength: {
                            value: 6,
                            message: "Le mot de passe doit contenir au moins 6 caractères"
                          }
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center space-x-2">
                              <Lock className="w-4 h-4" />
                              <span>Mot de passe</span>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Choisissez un mot de passe sécurisé"
                                type="password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full whatsapp-gradient text-white"
                        disabled={loading}
                      >
                        {loading ? "Création..." : "Créer mon Compte"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </CardContent>

              <CardFooter className="flex flex-col space-y-2 text-center text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>Vos données familiales sont sécurisées</span>
                </div>
                <p>© 2024 Généalogie Dynastique - Connectez vos générations</p>
              </CardFooter>
            </Tabs>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthFamily;
