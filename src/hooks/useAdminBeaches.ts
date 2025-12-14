import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type Beach = Tables<'beaches'>;

export function useAdminBeaches() {
  const [beaches, setBeaches] = useState<Beach[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchBeaches = async () => {
    try {
      const { data, error } = await supabase
        .from('beaches')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBeaches(data || []);
    } catch (error: any) {
      toast({
        title: 'Error fetching beaches',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBeaches();
  }, []);

  const addBeach = async (data: {
    name: string;
    country: string;
    region?: string;
    latitude: number;
    longitude: number;
    threat_level: 'low' | 'medium' | 'high' | 'critical';
    nests_count: number;
    volunteers_count: number;
    photo_url?: string;
  }) => {
    setIsSubmitting(true);
    try {
      const { data: newBeach, error } = await supabase
        .from('beaches')
        .insert({
          name: data.name,
          country: data.country,
          region: data.region || null,
          latitude: data.latitude,
          longitude: data.longitude,
          threat_level: data.threat_level,
          nests_count: data.nests_count,
          volunteers_count: data.volunteers_count,
          photo_url: data.photo_url || null,
        })
        .select()
        .single();

      if (error) throw error;

      setBeaches((prev) => [newBeach, ...prev]);
      toast({
        title: 'Beach added',
        description: `${data.name} has been added successfully.`,
      });
      return true;
    } catch (error: any) {
      toast({
        title: 'Error adding beach',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateBeach = async (
    id: string,
    data: {
      name: string;
      country: string;
      region?: string;
      latitude: number;
      longitude: number;
      threat_level: 'low' | 'medium' | 'high' | 'critical';
      nests_count: number;
      volunteers_count: number;
      photo_url?: string;
    }
  ) => {
    setIsSubmitting(true);
    try {
      const { data: updatedBeach, error } = await supabase
        .from('beaches')
        .update({
          name: data.name,
          country: data.country,
          region: data.region || null,
          latitude: data.latitude,
          longitude: data.longitude,
          threat_level: data.threat_level,
          nests_count: data.nests_count,
          volunteers_count: data.volunteers_count,
          photo_url: data.photo_url || null,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setBeaches((prev) =>
        prev.map((b) => (b.id === id ? updatedBeach : b))
      );
      toast({
        title: 'Beach updated',
        description: `${data.name} has been updated successfully.`,
      });
      return true;
    } catch (error: any) {
      toast({
        title: 'Error updating beach',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteBeach = async (id: string, name: string) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('beaches').delete().eq('id', id);

      if (error) throw error;

      setBeaches((prev) => prev.filter((b) => b.id !== id));
      toast({
        title: 'Beach deleted',
        description: `${name} has been removed.`,
      });
      return true;
    } catch (error: any) {
      toast({
        title: 'Error deleting beach',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    beaches,
    isLoading,
    isSubmitting,
    addBeach,
    updateBeach,
    deleteBeach,
    refetch: fetchBeaches,
  };
}
