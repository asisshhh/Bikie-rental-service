
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Calendar, Search, X } from "lucide-react";

// Mock booking data
const mockBookings = [
  {
    id: "booking-1",
    vehicleName: "Tesla Model 3",
    vehicleId: "car-1",
    customerName: "John Smith",
    customerId: "customer-1",
    startDate: "2023-05-10T10:00:00Z",
    endDate: "2023-05-10T18:00:00Z",
    totalPrice: 360,
    status: "completed"
  },
  {
    id: "booking-2",
    vehicleName: "Mountain Bike Pro",
    vehicleId: "bike-1",
    customerName: "Sarah Johnson",
    customerId: "customer-2",
    startDate: "2023-05-12T09:00:00Z",
    endDate: "2023-05-12T13:00:00Z",
    totalPrice: 60,
    status: "active"
  },
  {
    id: "booking-3",
    vehicleName: "BMW X5",
    vehicleId: "car-2",
    customerName: "Michael Brown",
    customerId: "customer-3",
    startDate: "2023-05-15T14:00:00Z",
    endDate: "2023-05-15T20:00:00Z",
    totalPrice: 360,
    status: "upcoming"
  },
  {
    id: "booking-4",
    vehicleName: "City Cruiser",
    vehicleId: "bike-2",
    customerName: "Emily Davis",
    customerId: "customer-4",
    startDate: "2023-05-20T10:00:00Z",
    endDate: "2023-05-20T16:00:00Z",
    totalPrice: 60,
    status: "upcoming"
  },
];

interface Booking {
  id: string;
  vehicleName: string;
  vehicleId: string;
  customerName: string;
  customerId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "completed" | "active" | "upcoming" | "cancelled";
}

const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(mockBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);

  // Filter bookings based on search term and status
  const filterBookings = () => {
    let result = bookings;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        booking => 
          booking.vehicleName.toLowerCase().includes(term) ||
          booking.customerName.toLowerCase().includes(term) ||
          booking.id.toLowerCase().includes(term)
      );
    }
    
    if (statusFilter !== "all") {
      result = result.filter(booking => booking.status === statusFilter);
    }
    
    setFilteredBookings(result);
  };

  // Update filters when search term or status filter changes
  React.useEffect(() => {
    filterBookings();
  }, [searchTerm, statusFilter]);

  const handleCancelBooking = () => {
    if (!bookingToCancel) return;
    
    const updatedBookings = bookings.map((booking) => {
      if (booking.id === bookingToCancel) {
        return { ...booking, status: "cancelled" as const };
      }
      return booking;
    });
    
    setBookings(updatedBookings);
    setFilteredBookings(
      updatedBookings.filter(booking => 
        (statusFilter === "all" || booking.status === statusFilter) &&
        (searchTerm === "" || 
          booking.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
    
    setBookingToCancel(null);
    setIsCancelDialogOpen(false);
    
    toast({
      title: "Booking cancelled",
      description: "The booking has been cancelled successfully.",
    });
  };

  const handleCompleteBooking = (id: string) => {
    const updatedBookings = bookings.map((booking) => {
      if (booking.id === id) {
        return { ...booking, status: "completed" as const };
      }
      return booking;
    });
    
    setBookings(updatedBookings);
    setFilteredBookings(
      updatedBookings.filter(booking => 
        (statusFilter === "all" || booking.status === statusFilter) &&
        (searchTerm === "" || 
          booking.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
    
    toast({
      title: "Booking completed",
      description: "The booking has been marked as completed.",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "active":
        return "bg-blue-100 text-blue-800";
      case "upcoming":
        return "bg-amber-100 text-amber-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Booking Management</h2>
      </div>
      
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  No bookings found
                </TableCell>
              </TableRow>
            ) : (
              filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.vehicleName}</TableCell>
                  <TableCell>{booking.customerName}</TableCell>
                  <TableCell>{formatDate(booking.startDate)}</TableCell>
                  <TableCell>{formatDate(booking.endDate)}</TableCell>
                  <TableCell>${booking.totalPrice}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        View
                      </Button>
                      
                      {booking.status === "upcoming" || booking.status === "active" ? (
                        <>
                          {booking.status === "active" && (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleCompleteBooking(booking.id)}
                            >
                              Complete
                            </Button>
                          )}
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              setBookingToCancel(booking.id);
                              setIsCancelDialogOpen(true);
                            }}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : null}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
      
      {/* Booking Details Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={(open) => !open && setSelectedBooking(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Booking ID</h3>
                  <p>{selectedBooking.id}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Status</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(selectedBooking.status)}`}>
                    {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Vehicle</h3>
                  <p>{selectedBooking.vehicleName}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Customer</h3>
                  <p>{selectedBooking.customerName}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Start Time</h3>
                  <p>{formatDate(selectedBooking.startDate)}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">End Time</h3>
                  <p>{formatDate(selectedBooking.endDate)}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Total Price</h3>
                  <p>${selectedBooking.totalPrice}</p>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="font-medium mb-2">Actions</h3>
                <div className="flex gap-2">
                  {(selectedBooking.status === "upcoming" || selectedBooking.status === "active") && (
                    <>
                      {selectedBooking.status === "active" && (
                        <Button 
                          onClick={() => {
                            handleCompleteBooking(selectedBooking.id);
                            setSelectedBooking(null);
                          }}
                          className="flex gap-2 items-center"
                        >
                          <Calendar className="h-4 w-4" /> Mark as Completed
                        </Button>
                      )}
                      <Button 
                        variant="destructive" 
                        onClick={() => {
                          setBookingToCancel(selectedBooking.id);
                          setSelectedBooking(null);
                          setIsCancelDialogOpen(true);
                        }}
                      >
                        Cancel Booking
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedBooking(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Cancel Booking Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
              No, Keep Booking
            </Button>
            <Button variant="destructive" onClick={handleCancelBooking}>
              Yes, Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingManagement;
