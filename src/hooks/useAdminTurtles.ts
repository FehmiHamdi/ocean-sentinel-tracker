import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { turtles as initialTurtles, Turtle } from '@/data/mockData';

export function useAdminTurtles() {
  const [turtles, setTurtles] = useState<Turtle[]>(initialTurtles);
  const [isLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const addTurtle = async (data: {
    name: string;
    species: string;
    tag_id: string;
    status: 'active' | 'missing' | 'released' | 'deceased';
    threat_level: 'low' | 'medium' | 'high' | 'critical';
    age?: number;
    weight?: number;
    length?: number;
    health_status?: string;
    photo_url?: string;
  }) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const newTurtle: Turtle = {
        id: `t${Date.now()}`,
        name: data.name,
        species: data.species,
        speciesScientific: data.species,
        age: data.age || 0,
        weight: data.weight || 0,
        length: data.length || 0,
        status: data.status === 'active' ? 'active' : data.status === 'missing' ? 'migrating' : 'resting',
        healthStatus: (data.health_status?.toLowerCase() as Turtle['healthStatus']) || 'good',
        threatLevel: data.threat_level === 'critical' ? 'high' : data.threat_level,
        lastSeen: new Date().toISOString(),
        temperature: 25,
        speed: 1.5,
        depth: 10,
        image: data.photo_url || 'https://images.unsplash.com/photo-1591025207163-942350e47db2?w=800',
        description: `${data.name} is a ${data.species} turtle.`,
        location: { lat: 0, lng: 0 },
        migrationTrail: [],
        taggedDate: new Date().toISOString().split('T')[0],
        totalDistance: 0,
      };

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
      age?: number;
      weight?: number;
      length?: number;
      health_status?: string;
      photo_url?: string;
    }
  ) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      setTurtles((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                name: data.name,
                species: data.species,
                age: data.age || t.age,
                weight: data.weight || t.weight,
                length: data.length || t.length,
                healthStatus: (data.health_status?.toLowerCase() as Turtle['healthStatus']) || t.healthStatus,
                threatLevel: data.threat_level === 'critical' ? 'high' : data.threat_level,
                image: data.photo_url || t.image,
              }
            : t
        )
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
      await new Promise((resolve) => setTimeout(resolve, 300));

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
    refetch: () => {},
  };
}
