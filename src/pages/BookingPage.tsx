import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { getVehicleById, vehicles } from "@/data/vehicles";

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vehicleId: string;
  pickupDate: Date | null;
  pickupTime: string;
  selectedSlot: string; // Format: "hours:price" for bikes, or just hours for cars
}

const BookingPage = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    vehicleId: vehicleId || "",
    pickupDate: null,
    pickupTime: "",
    selectedSlot: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedVehicle = formData.vehicleId 
    ? getVehicleById(formData.vehicleId) 
    : undefined;

  const availableVehicles = vehicles.filter(v => v.available);

  useEffect(() => {
    if (vehicleId) {
      const vehicle = getVehicleById(vehicleId);
      if (vehicle && vehicle.available) {
        setFormData(prev => ({ ...prev, vehicleId }));
      } else {
        // Redirect to booking page without vehicle ID if vehicle is not found or not available
        navigate('/booking', { replace: true });
      }
    }
  }, [vehicleId, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => {
      // Reset selectedSlot when vehicle changes
      if (name === "vehicleId") {
        return { ...prev, [name]: value, selectedSlot: "" };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({ ...prev, pickupDate: date }));
  };

  const calculateTotalCost = (): number => {
    if (!selectedVehicle || !formData.selectedSlot) return 0;
    
    // Check if it's a slot-based selection (format: "hours:price")
    if (formData.selectedSlot.includes(":")) {
      const [hours, price] = formData.selectedSlot.split(":");
      return parseFloat(price) || 0;
    }
    
    // For hourly bookings (just a number)
    const duration = parseInt(formData.selectedSlot) || 1;
    return selectedVehicle.hourlyRate * duration;
  };

  const getSelectedSlotHours = (): number => {
    if (!formData.selectedSlot) return 0;
    
    // Check if it's a slot-based selection (format: "hours:price")
    if (formData.selectedSlot.includes(":")) {
      const [hours] = formData.selectedSlot.split(":");
      return parseInt(hours) || 0;
    }
    
    // For hourly bookings (just a number)
    return parseInt(formData.selectedSlot) || 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.phone || !formData.vehicleId || !formData.pickupDate || 
        !formData.pickupTime || !formData.selectedSlot) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Prepare FormData for Web3Forms
      const submissionData = new FormData();
      
      // Add access key
      submissionData.append("access_key", "b9669a0d-6685-474d-8776-549be978b21e");
      
      // Add form fields
      submissionData.append("name", `${formData.firstName} ${formData.lastName}`);
      submissionData.append("email", formData.email);
      submissionData.append("phone", formData.phone);
      submissionData.append("subject", "New Booking Request - Bikie Rental Service");
      
      // Format booking details as message
      const slotHours = getSelectedSlotHours();
      const isSlotBased = selectedVehicle?.slots && selectedVehicle.slots.length > 0;
      const pricingInfo = isSlotBased 
        ? `Slot: ${slotHours} hours`
        : `Duration: ${slotHours} ${slotHours > 1 ? 'hours' : 'hour'} | Hourly Rate: ₹${selectedVehicle?.hourlyRate.toFixed(2) || '0.00'}`;
      
      const bookingDetails = `
New Booking Request:

Personal Information:
- Name: ${formData.firstName} ${formData.lastName}
- Email: ${formData.email}
- Phone: ${formData.phone}

Booking Details:
- Vehicle: ${selectedVehicle?.name || 'N/A'} (${selectedVehicle?.type === 'car' ? 'Car' : 'Bike'})
- Pickup Date: ${formData.pickupDate ? format(formData.pickupDate, 'PPP') : 'N/A'}
- Pickup Time: ${formData.pickupTime}
- ${pricingInfo}
- Total Cost: ₹${calculateTotalCost().toFixed(2)}
      `.trim();
      
      submissionData.append("message", bookingDetails);
      
      // Submit to Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submissionData
      });

      const data = await response.json();

      if (data.success) {
        setLoading(false);
        setSubmitted(true);
        toast({
          title: "Booking Successful!",
          description: "Your booking has been confirmed. You will receive a confirmation email shortly.",
        });
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit booking. Please try again later.",
        variant: "destructive"
      });
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for booking with Bikie. Your reservation details have been sent to your email.
            </p>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-gray-500">Name</p>
                    <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Vehicle</p>
                    <p className="font-medium">{selectedVehicle?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Pickup Date</p>
                    <p className="font-medium">{formData.pickupDate ? format(formData.pickupDate, 'PPP') : ''}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Pickup Time</p>
                    <p className="font-medium">{formData.pickupTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="font-medium">{getSelectedSlotHours()} {getSelectedSlotHours() > 1 ? 'hours' : 'hour'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total Cost</p>
                    <p className="font-medium">₹{calculateTotalCost().toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild>
                <a href="/">Return to Home</a>
              </Button>
              <Button variant="outline">
                <a href="/vehicles">Browse More Vehicles</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Book Your Ride</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Fill out the form below to reserve your vehicle. We'll confirm your booking instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Laxman"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Nayak"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="laxman143@gmail.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="8144229188"
                    required
                  />
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-6">Booking Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <Label htmlFor="vehicleId">Select Vehicle</Label>
                  <Select
                    value={formData.vehicleId}
                    onValueChange={(value) => handleSelectChange("vehicleId", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableVehicles.map(vehicle => (
                        <SelectItem key={vehicle.id} value={vehicle.id}>
                          {vehicle.name} - ₹{vehicle.hourlyRate}/hr
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Pickup Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.pickupDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.pickupDate ? format(formData.pickupDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 pointer-events-auto">
                      <Calendar
                        mode="single"
                        selected={formData.pickupDate || undefined}
                        onSelect={handleDateChange}
                        disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 3))}
                        initialFocus
                        className="p-3"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="pickupTime">Pickup Time</Label>
                  <Select
                    value={formData.pickupTime}
                    onValueChange={(value) => handleSelectChange("pickupTime", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="12:00">12:00 PM</SelectItem>
                      <SelectItem value="13:00">01:00 PM</SelectItem>
                      <SelectItem value="14:00">02:00 PM</SelectItem>
                      <SelectItem value="15:00">03:00 PM</SelectItem>
                      <SelectItem value="16:00">04:00 PM</SelectItem>
                      <SelectItem value="17:00">05:00 PM</SelectItem>
                      <SelectItem value="18:00">06:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="selectedSlot">
                    {selectedVehicle?.slots && selectedVehicle.slots.length > 0 
                      ? "Select Slot or Hourly Duration" 
                      : "Duration (hours)"}
                  </Label>
                  <Select
                    value={formData.selectedSlot}
                    onValueChange={(value) => handleSelectChange("selectedSlot", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={selectedVehicle?.slots && selectedVehicle.slots.length > 0 
                        ? "Select a slot" 
                        : "Select duration"} />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedVehicle?.slots && selectedVehicle.slots.length > 0 ? (
                        <>
                          {/* Show slot-based pricing for bikes */}
                          {selectedVehicle.slots.map((slot, index) => (
                            <SelectItem key={`slot-${index}`} value={`${slot.hours}:${slot.price}`}>
                              {slot.hours} {slot.hours > 1 ? 'hours' : 'hour'} - ₹{slot.price} (Slot)
                            </SelectItem>
                          ))}
                          {/* Also show hourly options */}
                          <SelectItem value="1">1 hour - ₹{selectedVehicle.hourlyRate.toFixed(2)}</SelectItem>
                          <SelectItem value="2">2 hours - ₹{(selectedVehicle.hourlyRate * 2).toFixed(2)}</SelectItem>
                          <SelectItem value="3">3 hours - ₹{(selectedVehicle.hourlyRate * 3).toFixed(2)}</SelectItem>
                          <SelectItem value="4">4 hours - ₹{(selectedVehicle.hourlyRate * 4).toFixed(2)}</SelectItem>
                          <SelectItem value="5">5 hours - ₹{(selectedVehicle.hourlyRate * 5).toFixed(2)}</SelectItem>
                          <SelectItem value="6">6 hours - ₹{(selectedVehicle.hourlyRate * 6).toFixed(2)}</SelectItem>
                          <SelectItem value="12">12 hours - ₹{(selectedVehicle.hourlyRate * 12).toFixed(2)}</SelectItem>
                          <SelectItem value="24">24 hours - ₹{(selectedVehicle.hourlyRate * 24).toFixed(2)}</SelectItem>
                        </>
                      ) : (
                        // Show duration options for cars or vehicles without slots
                        <>
                          <SelectItem value="1">1 hour</SelectItem>
                          <SelectItem value="2">2 hours</SelectItem>
                          <SelectItem value="3">3 hours</SelectItem>
                          <SelectItem value="4">4 hours</SelectItem>
                          <SelectItem value="5">5 hours</SelectItem>
                          <SelectItem value="6">6 hours</SelectItem>
                          <SelectItem value="12">12 hours</SelectItem>
                          <SelectItem value="24">24 hours</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Processing..." : "Complete Booking"}
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full mt-4"
              >
                <a href="tel:+918144229188">📞 Call for Booking</a>
              </Button>
            </form>
          </div>
        </div>
        
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            {selectedVehicle ? (
              <div>
                <div className="mb-4">
                  <img 
                    src={selectedVehicle.image} 
                    alt={selectedVehicle.name} 
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-1">{selectedVehicle.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{selectedVehicle.type === 'car' ? 'Car' : 'Bike'}</p>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  {selectedVehicle.slots && selectedVehicle.slots.length > 0 ? (
                    <>
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-2">Available Slots:</p>
                        <div className="space-y-1">
                          {selectedVehicle.slots.map((slot, index) => (
                            <div 
                              key={index}
                              className={cn(
                                "flex justify-between p-2 rounded text-sm",
                                formData.selectedSlot === `${slot.hours}:${slot.price}` 
                                  ? "bg-blue-50 border border-blue-200" 
                                  : "bg-gray-50"
                              )}
                            >
                              <span>{slot.hours} {slot.hours > 1 ? 'hours' : 'hour'}</span>
                              <span className="font-medium">₹{slot.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Hourly Rate:</span>
                        <span className="text-sm font-medium">₹{selectedVehicle.hourlyRate.toFixed(2)}/hr</span>
                      </div>
                      {formData.selectedSlot && (
                        <div className="flex justify-between mb-2 pt-2 border-t">
                          <span className="text-gray-600">Selected Slot:</span>
                          <span>{getSelectedSlotHours()} {getSelectedSlotHours() > 1 ? 'hours' : 'hour'}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Hourly Rate:</span>
                        <span>₹{selectedVehicle.hourlyRate.toFixed(2)}/hr</span>
                      </div>
                      {selectedVehicle.dailyRate && (
                        <div className="flex justify-between mb-2 text-sm text-gray-500">
                          <span>Daily Rate:</span>
                          <span>₹{selectedVehicle.dailyRate.toFixed(2)}/day</span>
                        </div>
                      )}
                      {formData.selectedSlot && (
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Duration:</span>
                          <span>{getSelectedSlotHours()} {getSelectedSlotHours() > 1 ? 'hours' : 'hour'}</span>
                        </div>
                      )}
                    </>
                  )}
                  <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2 mt-2">
                    <span>Total:</span>
                    <span>₹{calculateTotalCost().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No vehicle selected</p>
                <Button asChild variant="outline">
                  <a href="/vehicles">Browse Vehicles</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;