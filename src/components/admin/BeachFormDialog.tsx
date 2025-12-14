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

const beachSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  country: z.string().min(1, 'Country is required'),
  region: z.string().optional(),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  threat_level: z.enum(['low', 'medium', 'high', 'critical']),
  nests_count: z.coerce.number().min(0).default(0),
  volunteers_count: z.coerce.number().min(0).default(0),
  photo_url: z.string().url().optional().or(z.literal('')),
});

type BeachFormData = z.infer<typeof beachSchema>;

interface BeachFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  beach?: {
    id: string;
    name: string;
    country: string;
    region?: string | null;
    latitude: number;
    longitude: number;
    threat_level: 'low' | 'medium' | 'high' | 'critical';
    nests_count: number;
    volunteers_count: number;
    photo_url?: string | null;
  } | null;
  onSubmit: (data: BeachFormData) => Promise<void>;
  isLoading: boolean;
}

export function BeachFormDialog({
  open,
  onOpenChange,
  beach,
  onSubmit,
  isLoading,
}: BeachFormDialogProps) {
  const isEditing = !!beach;

  const form = useForm<BeachFormData>({
    resolver: zodResolver(beachSchema),
    defaultValues: {
      name: '',
      country: '',
      region: '',
      latitude: 0,
      longitude: 0,
      threat_level: 'low',
      nests_count: 0,
      volunteers_count: 0,
      photo_url: '',
    },
  });

  useEffect(() => {
    if (beach) {
      form.reset({
        name: beach.name,
        country: beach.country,
        region: beach.region || '',
        latitude: beach.latitude,
        longitude: beach.longitude,
        threat_level: beach.threat_level,
        nests_count: beach.nests_count,
        volunteers_count: beach.volunteers_count,
        photo_url: beach.photo_url || '',
      });
    } else {
      form.reset({
        name: '',
        country: '',
        region: '',
        latitude: 0,
        longitude: 0,
        threat_level: 'low',
        nests_count: 0,
        volunteers_count: 0,
        photo_url: '',
      });
    }
  }, [beach, form]);

  const handleSubmit = async (data: BeachFormData) => {
    await onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Beach' : 'Add New Beach'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beach Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Tortuguero Beach" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country *</FormLabel>
                    <FormControl>
                      <Input placeholder="Costa Rica" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region</FormLabel>
                    <FormControl>
                      <Input placeholder="Caribbean" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude *</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" placeholder="10.5432" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude *</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" placeholder="-83.5024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nests_count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nests Count</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="volunteers_count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Volunteers</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
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
                    <Input placeholder="https://example.com/beach.jpg" {...field} />
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
                {isEditing ? 'Save Changes' : 'Add Beach'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
