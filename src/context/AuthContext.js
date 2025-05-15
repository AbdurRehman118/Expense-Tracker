import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { createProfile, getProfile } from '../config/supabase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        getProfile(session.user.id).then(({ data }) => {
          setProfile(data);
        });
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        const { data: profile } = await getProfile(session.user.id);
        if (!profile) {
          // Create profile if it doesn't exist
          const { data: newProfile } = await createProfile(session.user.id, {
            name: session.user.user_metadata?.name || '',
            email: session.user.email
          });
          setProfile(newProfile);
        } else {
          setProfile(profile);
        }
      } else {
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    signUp: async (email, password, name) => {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name },
          },
        });
        if (error) throw error;
        return { data, error: null };
      } catch (error) {
        console.error('Sign up error:', error.message);
        return { data: null, error };
      }
    },

    signIn: async (email, password) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        return { data, error: null };
      } catch (error) {
        console.error('Sign in error:', error.message);
        return { data: null, error };
      }
    },

    signOut: async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setUser(null);
        setSession(null);
        setProfile(null);
        return { error: null };
      } catch (error) {
        console.error('Sign out error:', error.message);
        return { error };
      }
    },

    resetPassword: async (email) => {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        return { error: null };
      } catch (error) {
        console.error('Reset password error:', error.message);
        return { error };
      }
    },

    updatePassword: async (newPassword) => {
      try {
        const { error } = await supabase.auth.updateUser({
          password: newPassword
        });
        if (error) throw error;
        return { error: null };
      } catch (error) {
        console.error('Update password error:', error.message);
        return { error };
      }
    },

    user,
    session,
    profile,
    loading,
    isAuthenticated: !!user && !!session
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 