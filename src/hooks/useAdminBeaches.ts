import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { beaches as initialBeaches, Beach } from '@/data/mockData';

export function useAdminBeaches() {
  const [beaches, setBeaches] = useState<Beach[]>(initialBeaches);
  const [isLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
      await new Promise((resolve) => setTimeout(resolve, 300));

      const newBeach: Beach = {
        id: `b${Date.now()}`,
        name: data.name,
        location: { lat: data.latitude, lng: data.longitude },
        country: data.country,
        nestCount: data.nests_count,
        volunteers: data.volunteers_count,
        threatLevel: data.threat_level === 'critical' ? 'high' : data.threat_level,
        threats: [],
        recentActivity: [],
        image: data.photo_url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
        description: `${data.name} is a nesting beach in ${data.country}.`,
      };

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
      await new Promise((resolve) => setTimeout(resolve, 300));

      setBeaches((prev) =>
        prev.map((b) =>
          b.id === id
            ? {
                ...b,
                name: data.name,
                country: data.country,
                location: { lat: data.latitude, lng: data.longitude },
                nestCount: data.nests_count,
                volunteers: data.volunteers_count,
                threatLevel: data.threat_level === 'critical' ? 'high' : data.threat_level,
                image: data.photo_url || b.image,
              }
            : b
        )
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
      await new Promise((resolve) => setTimeout(resolve, 300));

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
    refetch: () => {},
  };
}
