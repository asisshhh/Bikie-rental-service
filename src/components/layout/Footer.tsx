
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Bikie</h3>
            <p className="text-gray-300 mb-4">
              Premium bike and car rentals for all your needs. Enjoy the freedom of mobility with our reliable fleet.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/vehicles" className="text-gray-300 hover:text-white transition-colors">Browse Vehicles</Link></li>
              <li><Link to="/booking" className="text-gray-300 hover:text-white transition-colors">Book Now</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-300">Car Rentals</span></li>
              <li><span className="text-gray-300">Bike Rentals</span></li>
              <li><span className="text-gray-300">Premium Vehicles</span></li>
              <li><span className="text-gray-300">Long-term Rentals</span></li>
            </ul>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
  <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
  <address className="text-gray-300 not-italic">
    <p>Pareswara sahi, Near baya baba matha</p>
    <p>Jobra, Cuttack, Odisha, pin-753003</p>
    <p className="mt-2">Phone: 8144229188</p>
    <p>Email: bikieindia@gmail.com</p>
  </address>
</div>
</div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Bikie. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
<a
  href="https://instagram.com/bikie_2022"
  target="_blank"
  rel="noopener noreferrer"
  className="block bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold text-center py-3 rounded-lg shadow-lg hover:from-pink-600 hover:to-yellow-600 transition-all duration-300"
>
  Follow us on Instagram
</a>


          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
