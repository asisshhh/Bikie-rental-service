
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
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 448 512"
    className="w-5 h-5"
  >
    <path d="M224,202.66A53.34,53.34,0,1,0,277.34,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.19-30.19C298,123,256,123,256,123s-42,0-62.51,1.49a54,54,0,0,0-30.19,30.19C160,165,160,208,160,208s0,42,1.49,62.51a54,54,0,0,0,30.19,30.19C214,302,256,302,256,302s42,0,62.51-1.49a54,54,0,0,0,30.19-30.19C288,250,288,208,288,208S288,165,348.71,161.71ZM398.8,95.2A48,48,0,0,0,352,48H96A48,48,0,0,0,49.2,95.2C48,114,48,148.8,48,192v128c0,43.2,0,78,1.2,96.8A48,48,0,0,0,96,464H352a48,48,0,0,0,46.8-47.2c1.2-18.8,1.2-53.6,1.2-96.8V192C400,148.8,400,114,398.8,95.2Z"/>
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
