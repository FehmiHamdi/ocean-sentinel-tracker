import { useState, useEffect, useCallback } from 'react';
import { Nest, getNests, saveNests } from '@/data/nestData';
import { beaches } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export function useNests() {
  const [nests, setNests] = useState<Nest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Load nests on mount
  useEffect(() => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setNests(getNests());
      setIsLoading(false);
    }, 300);
  }, []);

  const addNest = useCallback(async (data: {
    beachId: string;
    turtleCount: number;
    hatchDate: string;
    notes?: string;
  }): Promise<boolean> => {
    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const beach = beaches.find((b) => b.id === data.beachId);
      const newNest: Nest = {
        id: `nest-${Date.now()}`,
        beachId: data.beachId,
        beachName: beach?.name || 'Unknown Beach',
        turtleCount: data.turtleCount,
        hatchDate: data.hatchDate,
        declaredBy: user?.id || 'unknown',
        declaredAt: new Date().toISOString(),
        status: 'active',
        notes: data.notes,
      };

      const updatedNests = [...nests, newNest];
      setNests(updatedNests);
      saveNests(updatedNests);

      toast({
        title: 'Nest declared',
        description: `New nest at ${beach?.name} has been recorded.`,
      });

      setIsSubmitting(false);
      return true;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to declare nest. Please try again.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return false;
    }
  }, [nests, user, toast]);

  const updateNest = useCallback(async (id: string, data: Partial<Nest>): Promise<boolean> => {
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const updatedNests = nests.map((nest) => {
        if (nest.id === id) {
          // Update beach name if beachId changed
          if (data.beachId && data.beachId !== nest.beachId) {
            const beach = beaches.find((b) => b.id === data.beachId);
            data.beachName = beach?.name || nest.beachName;
          }
          return { ...nest, ...data };
        }
        return nest;
      });

      setNests(updatedNests);
      saveNests(updatedNests);

      toast({
        title: 'Nest updated',
        description: 'Nest information has been updated.',
      });

      setIsSubmitting(false);
      return true;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update nest. Please try again.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return false;
    }
  }, [nests, toast]);

  const deleteNest = useCallback(async (id: string): Promise<boolean> => {
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const updatedNests = nests.filter((nest) => nest.id !== id);
      setNests(updatedNests);
      saveNests(updatedNests);

      toast({
        title: 'Nest removed',
        description: 'Nest declaration has been deleted.',
      });

      setIsSubmitting(false);
      return true;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete nest. Please try again.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return false;
    }
  }, [nests, toast]);

  return {
    nests,
    isLoading,
    isSubmitting,
    addNest,
    updateNest,
    deleteNest,
  };
}
