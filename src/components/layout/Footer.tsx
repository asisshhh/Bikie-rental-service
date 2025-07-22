
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
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
<p className="mt-2">
  Phone: <a href="tel:8144229188" className="hover:underline">8144229188</a>
</p>
<p>
  Email: <a href="mailto:bikieindia@gmail.com" className="hover:underline">bikieindia@gmail.com</a>
</p>
  </address>
</div>
  <div className="mt-4">
  <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d726.4619738932952!2d85.90046717893293!3d20.469467274863273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190d633e868ec7%3A0xf365f29219e6d674!2sBikie!5e0!3m2!1sen!2sin!4v1753186447275!5m2!1sen!2sin"
      width="100%"
      height="320"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"></iframe>
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
