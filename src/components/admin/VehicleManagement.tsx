
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { vehicles, Vehicle } from "@/data/vehicles";
import { toast } from "@/components/ui/use-toast";
import { Bike, Car, Edit, Trash2 } from "lucide-react";

const VehicleManagement: React.FC = () => {
  const [vehicleList, setVehicleList] = useState<Vehicle[]>(vehicles);
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [vehicleToEdit, setVehicleToEdit] = useState<Vehicle | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null);
  
  const [newVehicle, setNewVehicle] = useState<Partial<Vehicle>>({
    name: "",
    type: "car",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    hourlyRate: 0,
    available: true,
    description: "",
    specifications: {},
  });

  const handleAddNewVehicle = () => {
    // In a real app, this would save to a backend
    if (!newVehicle.name || !newVehicle.hourlyRate) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const id = `${newVehicle.type}-${Date.now()}`;
    const vehicle = {
      ...newVehicle,
      id,
      specifications: parseSpecifications(),
    } as Vehicle;

    setVehicleList([...vehicleList, vehicle]);
    resetNewVehicle();
    setIsAddVehicleOpen(false);
    
    toast({
      title: "Vehicle added",
      description: `${vehicle.name} has been added to your inventory`,
    });
  };

  const handleEditVehicle = () => {
    if (!vehicleToEdit) return;
    
    const updatedVehicles = vehicleList.map((v) => 
      v.id === vehicleToEdit.id ? vehicleToEdit : v
    );
    
    setVehicleList(updatedVehicles);
    setVehicleToEdit(null);
    
    toast({
      title: "Vehicle updated",
      description: `${vehicleToEdit.name} has been updated`,
    });
  };

  const handleDeleteVehicle = () => {
    if (!vehicleToDelete) return;
    
    const updatedVehicles = vehicleList.filter(v => v.id !== vehicleToDelete);
    const deletedVehicle = vehicleList.find(v => v.id === vehicleToDelete);
    
    setVehicleList(updatedVehicles);
    setVehicleToDelete(null);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Vehicle deleted",
      description: `${deletedVehicle?.name} has been removed from your inventory`,
    });
  };

  const handleToggleAvailability = (id: string) => {
    const updatedVehicles = vehicleList.map((v) => {
      if (v.id === id) {
        return { ...v, available: !v.available };
      }
      return v;
    });
    
    setVehicleList(updatedVehicles);
    
    const vehicle = updatedVehicles.find(v => v.id === id);
    toast({
      title: "Availability updated",
      description: `${vehicle?.name} is now ${vehicle?.available ? 'available' : 'unavailable'} for booking`,
    });
  };

  // Helper function to parse specifications from form input
  const parseSpecifications = () => {
    const specs: Record<string, string | number> = {};
    
    // Add some default specs based on vehicle type
    if (newVehicle.type === "car") {
      specs.seats = 5;
      specs.doors = 4;
      specs.transmission = "Automatic";
    } else {
      specs.frame = "Aluminum";
      specs.gears = 21;
      specs.brakes = "Disc";
    }
    
    return specs;
  };

  const resetNewVehicle = () => {
    setNewVehicle({
      name: "",
      type: "car",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      hourlyRate: 0,
      available: true,
      description: "",
      specifications: {},
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Vehicle Management</h2>
        <Button onClick={() => {
          resetNewVehicle();
          setIsAddVehicleOpen(true);
        }}>
          Add New Vehicle
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Available</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicleList.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">{vehicle.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {vehicle.type === "car" ? <Car className="h-4 w-4" /> : <Bike className="h-4 w-4" />}
                      {vehicle.type === "car" ? "Car" : "Bike"}
                    </div>
                  </TableCell>
                  <TableCell>${vehicle.hourlyRate}/hr</TableCell>
                  <TableCell>
                    <Switch 
                      checked={vehicle.available} 
                      onCheckedChange={() => handleToggleAvailability(vehicle.id)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setVehicleToEdit(vehicle);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setVehicleToDelete(vehicle.id);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Add Vehicle Dialog */}
      <Dialog open={isAddVehicleOpen} onOpenChange={setIsAddVehicleOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Vehicle</DialogTitle>
            <DialogDescription>
              Enter the details of the new vehicle to add to your inventory.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm">Name</label>
              <Input 
                className="col-span-3"
                value={newVehicle.name}
                onChange={(e) => setNewVehicle({...newVehicle, name: e.target.value})}
                placeholder="Vehicle name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm">Type</label>
              <div className="col-span-3 flex gap-4">
                <Button 
                  type="button"
                  variant={newVehicle.type === "car" ? "default" : "outline"}
                  onClick={() => setNewVehicle({...newVehicle, type: "car"})}
                  className="flex gap-2"
                >
                  <Car className="h-4 w-4" /> Car
                </Button>
                <Button 
                  type="button"
                  variant={newVehicle.type === "bike" ? "default" : "outline"}
                  onClick={() => setNewVehicle({...newVehicle, type: "bike"})}
                  className="flex gap-2"
                >
                  <Bike className="h-4 w-4" /> Bike
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm">Image URL</label>
              <Input 
                className="col-span-3"
                value={newVehicle.image}
                onChange={(e) => setNewVehicle({...newVehicle, image: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm">Hourly Rate ($)</label>
              <Input 
                className="col-span-3"
                type="number"
                value={newVehicle.hourlyRate || ''}
                onChange={(e) => setNewVehicle({...newVehicle, hourlyRate: parseFloat(e.target.value)})}
                placeholder="0.00"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm">Available</label>
              <div className="col-span-3 flex items-center gap-2">
                <Switch 
                  checked={newVehicle.available}
                  onCheckedChange={(checked) => setNewVehicle({...newVehicle, available: checked})}
                />
                <span>{newVehicle.available ? "Yes" : "No"}</span>
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <label className="text-right text-sm mt-2">Description</label>
              <Textarea 
                className="col-span-3"
                value={newVehicle.description}
                onChange={(e) => setNewVehicle({...newVehicle, description: e.target.value})}
                placeholder="Vehicle description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddVehicleOpen(false)}>Cancel</Button>
            <Button onClick={handleAddNewVehicle}>Add Vehicle</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Vehicle Dialog */}
      <Dialog open={!!vehicleToEdit} onOpenChange={(open) => !open && setVehicleToEdit(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Vehicle</DialogTitle>
            <DialogDescription>
              Update the details of this vehicle.
            </DialogDescription>
          </DialogHeader>
          {vehicleToEdit && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Name</label>
                <Input 
                  className="col-span-3"
                  value={vehicleToEdit.name}
                  onChange={(e) => setVehicleToEdit({...vehicleToEdit, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Type</label>
                <div className="col-span-3 flex gap-4">
                  <Button 
                    type="button"
                    variant={vehicleToEdit.type === "car" ? "default" : "outline"}
                    onClick={() => setVehicleToEdit({...vehicleToEdit, type: "car"})}
                    className="flex gap-2"
                  >
                    <Car className="h-4 w-4" /> Car
                  </Button>
                  <Button 
                    type="button"
                    variant={vehicleToEdit.type === "bike" ? "default" : "outline"}
                    onClick={() => setVehicleToEdit({...vehicleToEdit, type: "bike"})}
                    className="flex gap-2"
                  >
                    <Bike className="h-4 w-4" /> Bike
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Image URL</label>
                <Input 
                  className="col-span-3"
                  value={vehicleToEdit.image}
                  onChange={(e) => setVehicleToEdit({...vehicleToEdit, image: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Hourly Rate ($)</label>
                <Input 
                  className="col-span-3"
                  type="number"
                  value={vehicleToEdit.hourlyRate}
                  onChange={(e) => setVehicleToEdit({...vehicleToEdit, hourlyRate: parseFloat(e.target.value)})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Available</label>
                <div className="col-span-3 flex items-center gap-2">
                  <Switch 
                    checked={vehicleToEdit.available}
                    onCheckedChange={(checked) => setVehicleToEdit({...vehicleToEdit, available: checked})}
                  />
                  <span>{vehicleToEdit.available ? "Yes" : "No"}</span>
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label className="text-right text-sm mt-2">Description</label>
                <Textarea 
                  className="col-span-3"
                  value={vehicleToEdit.description}
                  onChange={(e) => setVehicleToEdit({...vehicleToEdit, description: e.target.value})}
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setVehicleToEdit(null)}>Cancel</Button>
            <Button onClick={handleEditVehicle}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this vehicle? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteVehicle}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VehicleManagement;
