
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { vehicles, Vehicle } from "@/data/vehicles";
import { Bike, Car } from "lucide-react";

const VehiclesPage = () => {
  const [selectedType, setSelectedType] = useState<"all" | "car" | "bike">("all");
  const [sortBy, setSortBy] = useState<"default" | "priceLow" | "priceHigh">("default");

  const filteredVehicles = vehicles.filter(vehicle => {
    if (selectedType === "all") return true;
    return vehicle.type === selectedType;
  });

  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    switch (sortBy) {
      case "priceLow":
        return a.hourlyRate - b.hourlyRate;
      case "priceHigh":
        return b.hourlyRate - a.hourlyRate;
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Vehicle Fleet</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Explore our diverse selection of premium bikes and cars. 
          Choose the perfect vehicle for your journey with competitive hourly rates.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={selectedType === "all" ? "default" : "outline"} 
              onClick={() => setSelectedType("all")}
            >
              All Vehicles
            </Button>
            <Button 
              variant={selectedType === "car" ? "default" : "outline"} 
              onClick={() => setSelectedType("car")}
              className="flex items-center gap-2"
            >
              <Car className="w-4 h-4" /> Cars
            </Button>
            <Button 
              variant={selectedType === "bike" ? "default" : "outline"} 
              onClick={() => setSelectedType("bike")}
              className="flex items-center gap-2"
            >
              <Bike className="w-4 h-4" /> Bikes
            </Button>
          </div>
          
          <div className="flex items-center">
            <label className="mr-2 text-gray-700">Sort by:</label>
            <select 
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="default">Default</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>

      {sortedVehicles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-2xl font-medium text-gray-600">No vehicles found matching your criteria.</p>
          <Button 
            variant="link" 
            onClick={() => {
              setSelectedType("all");
              setSortBy("default");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={vehicle.image} 
          alt={vehicle.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <div className="absolute top-4 left-4 flex items-center gap-1">
          <span className="bg-white text-primary px-3 py-1 rounded-full text-sm font-medium shadow-sm flex items-center gap-1">
            {vehicle.type === "car" ? <Car className="w-4 h-4" /> : <Bike className="w-4 h-4" />}
            {vehicle.type === "car" ? "Car" : "Bike"}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{vehicle.name}</h3>
          <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
            ₹{vehicle.hourlyRate}/hr
          </span>
        </div>
        <p className="text-gray-600 mb-4">{vehicle.description.substring(0, 100)}...</p>
        
        <h4 className="font-medium text-gray-800 mb-2">Specifications:</h4>
        <ul className="text-gray-600 mb-6 flex-grow">
          {Object.entries(vehicle.specifications).slice(0, 3).map(([key, value], index) => (
            <li key={index} className="flex justify-between mb-1">
              <span className="capitalize">{key}:</span>
              <span className="font-medium">{value}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${vehicle.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {vehicle.available ? "Available" : "Currently Unavailable"}
            </span>
          </div>
          <Button asChild disabled={!vehicle.available} className="w-full">
            <Link to={`/booking/${vehicle.id}`}>
              {vehicle.available ? "Book Now" : "Not Available"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VehiclesPage;
