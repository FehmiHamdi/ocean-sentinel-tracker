import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shell, 
  Plus, 
  Edit, 
  Trash2,
  Loader2,
  LogOut,
  Egg,
  Calendar,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useNests } from '@/hooks/useNests';
import { NestFormDialog } from '@/components/volunteer/NestFormDialog';
import { DeleteConfirmDialog } from '@/components/admin/DeleteConfirmDialog';
import { Nest } from '@/data/nestData';

const statusColors: Record<string, string> = {
  active: 'bg-green-500/20 text-green-700 border-green-500/30',
  hatched: 'bg-blue-500/20 text-blue-700 border-blue-500/30',
  failed: 'bg-red-500/20 text-red-700 border-red-500/30',
};

export default function VolunteerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { nests, isLoading, isSubmitting, addNest, updateNest, deleteNest } = useNests();
  
  const [nestDialogOpen, setNestDialogOpen] = useState(false);
  const [selectedNest, setSelectedNest] = useState<Nest | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; nest: Nest | null }>({
    open: false,
    nest: null,
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddNest = () => {
    setSelectedNest(null);
    setNestDialogOpen(true);
  };

  const handleEditNest = (nest: Nest) => {
    setSelectedNest(nest);
    setNestDialogOpen(true);
  };

  const handleDeleteNest = (nest: Nest) => {
    setDeleteDialog({ open: true, nest });
  };

  const handleNestSubmit = async (data: any) => {
    let success: boolean;
    if (selectedNest) {
      success = await updateNest(selectedNest.id, data);
    } else {
      success = await addNest(data);
    }
    if (success) {
      setNestDialogOpen(false);
      setSelectedNest(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteDialog.nest) {
      const success = await deleteNest(deleteDialog.nest.id);
      if (success) {
        setDeleteDialog({ open: false, nest: null });
      }
    }
  };

  // Filter nests to show only current user's nests
  const userNests = nests.filter((nest) => nest.declaredBy === user?.id);
  const allNests = nests; // Show all nests for reference

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-28 pb-8 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Volunteer Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back, <span className="text-primary font-medium">{user?.username}</span>! 
                Manage your turtle nest declarations here.
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleAddNest}>
                <Plus className="w-4 h-4 mr-2" />
                Declare Nest
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Egg className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Your Nests</p>
                  <p className="text-2xl font-bold">{userNests.length}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Shell className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Eggs</p>
                  <p className="text-2xl font-bold">
                    {userNests.reduce((sum, nest) => sum + nest.turtleCount, 0)}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Nests</p>
                  <p className="text-2xl font-bold">
                    {userNests.filter((n) => n.status === 'active').length}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nests Table */}
      <section className="py-8">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Your Nest Declarations</h2>
              <Button onClick={handleAddNest} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </Button>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : userNests.length === 0 ? (
                <div className="text-center py-12">
                  <Egg className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    You haven't declared any nests yet.
                  </p>
                  <Button onClick={handleAddNest}>
                    <Plus className="w-4 h-4 mr-2" />
                    Declare Your First Nest
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Beach</TableHead>
                      <TableHead>Eggs</TableHead>
                      <TableHead>Hatch Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Declared</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userNests.map((nest) => (
                      <TableRow key={nest.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{nest.beachName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{nest.turtleCount}</TableCell>
                        <TableCell>
                          {new Date(nest.hatchDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={cn("capitalize border", statusColors[nest.status])}
                          >
                            {nest.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(nest.declaredAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditNest(nest)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => handleDeleteNest(nest)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Nests Reference */}
      {allNests.length > 0 && (
        <section className="py-8">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-6">All Nest Declarations</h2>
              <div className="glass-card rounded-2xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Beach</TableHead>
                      <TableHead>Eggs</TableHead>
                      <TableHead>Hatch Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allNests.map((nest) => (
                      <TableRow key={nest.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{nest.beachName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{nest.turtleCount}</TableCell>
                        <TableCell>
                          {new Date(nest.hatchDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={cn("capitalize border", statusColors[nest.status])}
                          >
                            {nest.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />

      {/* Nest Form Dialog */}
      <NestFormDialog
        open={nestDialogOpen}
        onOpenChange={setNestDialogOpen}
        nest={selectedNest}
        onSubmit={handleNestSubmit}
        isLoading={isSubmitting}
      />

      {/* Delete Confirm Dialog */}
      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
        title="Delete Nest Declaration"
        description="Are you sure you want to delete this nest declaration? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        isLoading={isSubmitting}
      />
    </div>
  );
}
