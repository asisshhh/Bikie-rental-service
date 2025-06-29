
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getFeaturedVehicles } from "@/data/vehicles";
import { testimonials } from "@/data/testimonials";
import { Star } from "lucide-react";

const HomePage = () => {
  const featuredVehicles = getFeaturedVehicles().slice(0,3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-blue-700 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Your Journey, Your Way
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Premium bike and car rentals for all your needs. Hourly, daily, and weekly options available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">Book Your Ride Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                <Link to="/vehicles">Browse Vehicles</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-full h-16 bg-white" style={{ clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)' }}></div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hourly Rentals</h3>
              <p className="text-gray-600 mb-4">
                Need a ride for just a few hours? Our flexible hourly rentals have you covered, starting at just ₹49/hour.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Affordable Pricing</h3>
              <p className="text-gray-600 mb-4">
                Competitive rates with no hidden fees. Enjoy special discounts for longer rentals and frequent customers.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600 mb-4">
                Simple call booking process. Reserve your vehicle in minutes with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Vehicles</h2>
            <Button asChild variant="outline">
              <Link to="/vehicles">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">{vehicle.name}</h3>
                    <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
                      ₹{vehicle.hourlyRate}/hr
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 flex-grow">{vehicle.description.substring(0, 100)}...</p>
                  <Button asChild>
                    <Link to={`/booking/${vehicle.id}`}>Book Now</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                    {testimonial.image ? 
                      <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 rounded-full" /> :
                      <span className="text-gray-600">{testimonial.name.charAt(0)}</span>
                    }
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.vehicle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Hit the Road?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our fleet of premium bikes and cars is waiting for you. Book now and enjoy the freedom of mobility.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/booking">Book Your Ride Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
