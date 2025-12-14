import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type Turtle = Tables<'turtles'>;

export function useAdminTurtles() {
  const [turtles, setTurtles] = useState<Turtle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchTurtles = async () => {
    try {
      const { data, error } = await supabase
        .from('turtles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTurtles(data || []);
    } catch (error: any) {
      toast({
        title: 'Error fetching turtles',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTurtles();
  }, []);

  const addTurtle = async (data: {
    name: string;
    species: string;
    tag_id: string;
    status: 'active' | 'missing' | 'released' | 'deceased';
    threat_level: 'low' | 'medium' | 'high' | 'critical';
    health_status?: string;
    age?: number;
    weight?: number;
    length?: number;
    photo_url?: string;
  }) => {
    setIsSubmitting(true);
    try {
      const { data: newTurtle, error } = await supabase
        .from('turtles')
        .insert({
          name: data.name,
          species: data.species,
          tag_id: data.tag_id,
          status: data.status,
          threat_level: data.threat_level,
          health_status: data.health_status || 'Healthy',
          age: data.age || null,
          weight: data.weight || null,
          length: data.length || null,
          photo_url: data.photo_url || null,
        })
        .select()
        .single();

      if (error) throw error;

      setTurtles((prev) => [newTurtle, ...prev]);
      toast({
        title: 'Turtle added',
        description: `${data.name} has been added successfully.`,
      });
      return true;
    } catch (error: any) {
      toast({
        title: 'Error adding turtle',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateTurtle = async (
    id: string,
    data: {
      name: string;
      species: string;
      tag_id: string;
      status: 'active' | 'missing' | 'released' | 'deceased';
      threat_level: 'low' | 'medium' | 'high' | 'critical';
      health_status?: string;
      age?: number;
      weight?: number;
      length?: number;
      photo_url?: string;
    }
  ) => {
    setIsSubmitting(true);
    try {
      const { data: updatedTurtle, error } = await supabase
        .from('turtles')
        .update({
          name: data.name,
          species: data.species,
          tag_id: data.tag_id,
          status: data.status,
          threat_level: data.threat_level,
          health_status: data.health_status || 'Healthy',
          age: data.age || null,
          weight: data.weight || null,
          length: data.length || null,
          photo_url: data.photo_url || null,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setTurtles((prev) =>
        prev.map((t) => (t.id === id ? updatedTurtle : t))
      );
      toast({
        title: 'Turtle updated',
        description: `${data.name} has been updated successfully.`,
      });
      return true;
    } catch (error: any) {
      toast({
        title: 'Error updating turtle',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteTurtle = async (id: string, name: string) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('turtles').delete().eq('id', id);

      if (error) throw error;

      setTurtles((prev) => prev.filter((t) => t.id !== id));
      toast({
        title: 'Turtle deleted',
        description: `${name} has been removed.`,
      });
      return true;
    } catch (error: any) {
      toast({
        title: 'Error deleting turtle',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    turtles,
    isLoading,
    isSubmitting,
    addTurtle,
    updateTurtle,
    deleteTurtle,
    refetch: fetchTurtles,
  };
}
