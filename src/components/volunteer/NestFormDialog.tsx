import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { beaches } from '@/data/mockData';
import { Nest } from '@/data/nestData';

const nestSchema = z.object({
  beachId: z.string().min(1, 'Please select a beach'),
  turtleCount: z.coerce.number().min(1, 'Must be at least 1').max(500, 'Maximum 500'),
  hatchDate: z.string().min(1, 'Please select a hatch date'),
  status: z.enum(['active', 'hatched', 'failed']),
  notes: z.string().optional(),
});

type NestFormData = z.infer<typeof nestSchema>;

interface NestFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nest: Nest | null;
  onSubmit: (data: NestFormData) => Promise<void>;
  isLoading: boolean;
}

export function NestFormDialog({
  open,
  onOpenChange,
  nest,
  onSubmit,
  isLoading,
}: NestFormDialogProps) {
  const form = useForm<NestFormData>({
    resolver: zodResolver(nestSchema),
    defaultValues: {
      beachId: '',
      turtleCount: 0,
      hatchDate: '',
      status: 'active',
      notes: '',
    },
  });

  useEffect(() => {
    if (nest) {
      form.reset({
        beachId: nest.beachId,
        turtleCount: nest.turtleCount,
        hatchDate: nest.hatchDate,
        status: nest.status,
        notes: nest.notes || '',
      });
    } else {
      form.reset({
        beachId: '',
        turtleCount: 0,
        hatchDate: '',
        status: 'active',
        notes: '',
      });
    }
  }, [nest, form, open]);

  const handleSubmit = form.handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {nest ? 'Edit Nest Declaration' : 'Declare New Nest'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="beachId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beach</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a beach" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {beaches.map((beach) => (
                        <SelectItem key={beach.id} value={beach.id}>
                          {beach.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="turtleCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Eggs</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} max={500} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hatchDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Hatch Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {nest && (
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="hatched">Hatched</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional notes about the nest..."
                      rows={3}
                      {...field}
                    />
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
                {nest ? 'Update' : 'Declare Nest'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
