import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const turtleSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  species: z.string().min(1, 'Species is required'),
  tag_id: z.string().min(1, 'Tag ID is required'),
  status: z.enum(['active', 'missing', 'released', 'deceased']),
  threat_level: z.enum(['low', 'medium', 'high', 'critical']),
  health_status: z.string().optional(),
  age: z.coerce.number().min(0).optional(),
  weight: z.coerce.number().min(0).optional(),
  length: z.coerce.number().min(0).optional(),
  photo_url: z.string().url().optional().or(z.literal('')),
});

type TurtleFormData = z.infer<typeof turtleSchema>;

interface TurtleFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  turtle?: {
    id: string;
    name: string;
    species: string;
    tag_id: string;
    status: 'active' | 'missing' | 'released' | 'deceased';
    threat_level: 'low' | 'medium' | 'high' | 'critical';
    health_status?: string | null;
    age?: number | null;
    weight?: number | null;
    length?: number | null;
    photo_url?: string | null;
  } | null;
  onSubmit: (data: TurtleFormData) => Promise<void>;
  isLoading: boolean;
}

export function TurtleFormDialog({
  open,
  onOpenChange,
  turtle,
  onSubmit,
  isLoading,
}: TurtleFormDialogProps) {
  const isEditing = !!turtle;

  const form = useForm<TurtleFormData>({
    resolver: zodResolver(turtleSchema),
    defaultValues: {
      name: '',
      species: '',
      tag_id: '',
      status: 'active',
      threat_level: 'low',
      health_status: 'Healthy',
      age: undefined,
      weight: undefined,
      length: undefined,
      photo_url: '',
    },
  });

  useEffect(() => {
    if (turtle) {
      form.reset({
        name: turtle.name,
        species: turtle.species,
        tag_id: turtle.tag_id,
        status: turtle.status,
        threat_level: turtle.threat_level,
        health_status: turtle.health_status || 'Healthy',
        age: turtle.age || undefined,
        weight: turtle.weight || undefined,
        length: turtle.length || undefined,
        photo_url: turtle.photo_url || '',
      });
    } else {
      form.reset({
        name: '',
        species: '',
        tag_id: '',
        status: 'active',
        threat_level: 'low',
        health_status: 'Healthy',
        age: undefined,
        weight: undefined,
        length: undefined,
        photo_url: '',
      });
    }
  }, [turtle, form]);

  const handleSubmit = async (data: TurtleFormData) => {
    await onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Turtle' : 'Add New Turtle'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Marina" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tag_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag ID *</FormLabel>
                    <FormControl>
                      <Input placeholder="TAG-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="species"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Species *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select species" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Green Sea Turtle">Green Sea Turtle</SelectItem>
                      <SelectItem value="Loggerhead">Loggerhead</SelectItem>
                      <SelectItem value="Hawksbill">Hawksbill</SelectItem>
                      <SelectItem value="Leatherback">Leatherback</SelectItem>
                      <SelectItem value="Olive Ridley">Olive Ridley</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="missing">Missing</SelectItem>
                        <SelectItem value="released">Released</SelectItem>
                        <SelectItem value="deceased">Deceased</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="threat_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Threat Level *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="health_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Health Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ''}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select health status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Healthy">Healthy</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age (years)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="25" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="180" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Length (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="105" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="photo_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photo URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/photo.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isEditing ? 'Save Changes' : 'Add Turtle'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
