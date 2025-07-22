
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
  <div className="bg-gray-800 p-6 rounded-lg shadow-md">
  <h3 className="text-lg font-semibold mb-4 text-white">Our Location</h3>
  <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d726.4619738932952!2d85.90046717893293!3d20.469467274863273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190d633e868ec7%3A0xf365f29219e6d674!2sBikie!5e0!3m2!1sen!2sin!4v1753186447275!5m2!1sen!2sin"
      width="100%"
      height="250"
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
  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:from-pink-600 hover:to-yellow-600 transition-all duration-300"
>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
</svg>
  <span>Follow us</span>
</a>


          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
