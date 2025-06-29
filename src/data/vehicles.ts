
export interface Vehicle {
  id: string;
  name: string;
  type: 'car' | 'bike';
  image: string;
  hourlyRate: number;
  available: boolean;
  featured?: boolean;
  description: string;
  specifications: {
    [key: string]: string | number;
  };
}

export const vehicles: Vehicle[] = [
  // ---------- BIKES ----------
  {
    id: "bike-1",
    name: "Honda Activa",
    type: "bike",
    image: "/heavy-grey-metallic.png",
    hourlyRate: 50,
    available: true,
    description: "Reliable and efficient scooter for city commuting.",
    specifications: {
      engine: "125cc",
      transmission: "Automatic",
      fuelType: "Petrol",
      seats: 2
    }
  },
  {
    id: "bike-2",
    name: "Royal Enfield Meteor 350",
    type: "bike",
    image: "/fireball-matt-green-5.jpg",
    hourlyRate: 100,
    available: true,
    description: "Cruiser bike with classic looks and a powerful 350cc engine.",
    featured: true,
    specifications: {
      engine: "349cc",
      transmission: "Manual",
      fuelType: "Petrol",
      seats: 2
    }
  },
  {
    id: "bike-3",
    name: "Bajaj Dominar 400",
    type: "bike",
    image: "/bajaj-select-model-aurora-green-1669289011797.webp",
    hourlyRate: 100,
    available: true,
    description: "Powerful street and touring bike with a 373cc engine.",
    featured: true,
    specifications: {
      engine: "373cc",
      transmission: "Manual",
      fuelType: "Petrol",
      seats: 2
    }
  },
  {
    id: "bike-4",
    name: "Bajaj NS 200",
    type: "bike",
    image: "/NS200-2024-Black.webp",
    hourlyRate: 100,
    available: true,
    description: "High-performance naked bike ideal for city and highway rides.",
    specifications: {
      engine: "199cc",
      transmission: "Manual",
      fuelType: "Petrol",
      seats: 2
    }
  },
  {
    id: "bike-5",
    name: "Honda Dio",
    type: "bike",
    image: "/dio-125-right-front-three-quarter-6.avif",
    hourlyRate: 50,
    available: true,
    description: "Sporty and lightweight scooter with smooth automatic ride.",
    specifications: {
      engine: "110cc",
      transmission: "Automatic",
      fuelType: "Petrol",
      seats: 2
    }
  },

  // ---------- CARS ----------
  {
    id: "car-1",
    name: "Maruti Swift Dzire",
    type: "car",
    image: "/20200303025903_Maruti-Dzire-side.avif",
    dailyRate: 2000,
    hourlyRate: 180,
    available: true,
    description: "Spacious and economical sedan ideal for city & long drives.",
    specifications: {
      seats: 5,
      doors: 4,
      transmission: "Manual",
      fuelType: "Petrol",
      mileage: "23 kmpl"
    }
  },
  {
    id: "car-2",
    name: "Hyundai i20",
    type: "car",
    image: "/Hyundai_i20_(BC3)_IMG_4165.jpg",
    dailyRate: 2000,
    hourlyRate: 180,
    available: true,
    description: "Premium hatchback with modern features and great mileage.",
    specifications: {
      seats: 5,
      doors: 4,
      transmission: "Automatic",
      fuelType: "Petrol",
      mileage: "20 kmpl"
    }
  },
  {
    id: "car-3",
    name: "Maruti S Presso",
    type: "car",
    image: "/20190930035323_Maruti-S-presso-price-var1.avif",
    dailyRate: 1500,
    hourlyRate: 150,
    available: true,
    description: "Compact SUV-like hatchback perfect for urban travel.",
    specifications: {
      seats: 4,
      doors: 4,
      transmission: "Manual",
      fuelType: "Petrol",
      mileage: "21 kmpl"
    }
  },
  {
    id: "car-4",
    name: "Hyundai Verna",
    type: "car",
    image: "/Hyundai-All-New-Verna-Atlas-White-Dual-Tone.webp",
    dailyRate: 2500,
    hourlyRate: 250,
    available: true,
    description: "Premium sedan with elegant styling and powerful engine.",
    featured: true,
    specifications: {
      seats: 5,
      doors: 4,
      transmission: "Manual",
      fuelType: "Petrol",
      mileage: "18 kmpl"
    }
  }
];


export const getVehicleById = (id: string): Vehicle | undefined => {
  return vehicles.find(vehicle => vehicle.id === id);
};

export const getAvailableVehicles = (): Vehicle[] => {
  return vehicles.filter(vehicle => vehicle.available);
};

export const getFeaturedVehicles = (): Vehicle[] => {
  return vehicles.filter(vehicle => vehicle.featured && vehicle.available);
};
