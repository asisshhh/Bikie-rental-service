
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Calendar, Search, User, X } from "lucide-react";

// Mock customers data
const mockCustomers = [
  {
    id: "customer-1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "555-123-4567",
    bookingsCount: 3,
    totalSpent: 560,
    lastBooking: "2023-05-10"
  },
  {
    id: "customer-2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "555-234-5678",
    bookingsCount: 2,
    totalSpent: 180,
    lastBooking: "2023-05-12"
  },
  {
    id: "customer-3",
    name: "Michael Brown",
    email: "mbrown@example.com",
    phone: "555-345-6789",
    bookingsCount: 1,
    totalSpent: 360,
    lastBooking: "2023-05-15"
  },
  {
    id: "customer-4",
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "555-456-7890",
    bookingsCount: 5,
    totalSpent: 820,
    lastBooking: "2023-05-20"
  },
];

// Mock bookings for customer history
const mockBookingsByCustomer = {
  "customer-1": [
    {
      id: "booking-123",
      vehicleName: "Tesla Model 3",
      startDate: "2023-05-10T10:00:00Z",
      endDate: "2023-05-10T18:00:00Z",
      totalPrice: 360,
      status: "completed"
    },
    {
      id: "booking-124",
      vehicleName: "BMW X5",
      startDate: "2023-04-20T09:00:00Z",
      endDate: "2023-04-20T17:00:00Z",
      totalPrice: 480,
      status: "completed"
    },
    {
      id: "booking-125",
      vehicleName: "Mountain Bike Pro",
      startDate: "2023-06-05T14:00:00Z",
      endDate: "2023-06-05T16:00:00Z",
      totalPrice: 30,
      status: "upcoming"
    }
  ],
  "customer-2": [
    {
      id: "booking-126",
      vehicleName: "Mountain Bike Pro",
      startDate: "2023-05-12T09:00:00Z",
      endDate: "2023-05-12T13:00:00Z",
      totalPrice: 60,
      status: "active"
    },
    {
      id: "booking-127",
      vehicleName: "City Cruiser",
      startDate: "2023-04-15T10:00:00Z",
      endDate: "2023-04-15T14:00:00Z",
      totalPrice: 40,
      status: "completed"
    }
  ]
};

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  bookingsCount: number;
  totalSpent: number;
  lastBooking: string;
}

interface CustomerBooking {
  id: string;
  vehicleName: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "completed" | "active" | "upcoming" | "cancelled";
}

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerBookings, setCustomerBookings] = useState<CustomerBooking[]>([]);

  // Filter customers based on search term
  const filterCustomers = () => {
    if (!searchTerm) {
      setFilteredCustomers(customers);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = customers.filter(
      customer => 
        customer.name.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term) ||
        customer.phone.includes(term)
    );
    
    setFilteredCustomers(filtered);
  };

  // Update filters when search term changes
  React.useEffect(() => {
    filterCustomers();
  }, [searchTerm]);

  // View customer details and booking history
  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    // In a real app, we would fetch bookings from the server
    setCustomerBookings(mockBookingsByCustomer[customer.id as keyof typeof mockBookingsByCustomer] || []);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatDateTime = (dateString: string) => {
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
        <h2 className="text-2xl font-bold">Customer Management</h2>
      </div>
      
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search customers..."
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
      </div>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Total Bookings</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Last Booking</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No customers found
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {customer.name}
                    </div>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.bookingsCount}</TableCell>
                  <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>{formatDate(customer.lastBooking)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewCustomer(customer)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
      
      {/* Customer Details Dialog */}
      <Dialog open={!!selectedCustomer} onOpenChange={(open) => !open && setSelectedCustomer(null)}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Name</h3>
                  <p>{selectedCustomer.name}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Email</h3>
                  <p>{selectedCustomer.email}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Phone</h3>
                  <p>{selectedCustomer.phone}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Total Spent</h3>
                  <p>${selectedCustomer.totalSpent.toFixed(2)}</p>
                </div>
              </div>
              
              {/* Booking History */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Booking History</h3>
                {customerBookings.length === 0 ? (
                  <p className="text-gray-500">No bookings found for this customer.</p>
                ) : (
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Booking ID</TableHead>
                          <TableHead>Vehicle</TableHead>
                          <TableHead>Start Time</TableHead>
                          <TableHead>End Time</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customerBookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.id}</TableCell>
                            <TableCell>{booking.vehicleName}</TableCell>
                            <TableCell>{formatDateTime(booking.startDate)}</TableCell>
                            <TableCell>{formatDateTime(booking.endDate)}</TableCell>
                            <TableCell>${booking.totalPrice}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(booking.status)}`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedCustomer(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerManagement;
