import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiMapPin, FiMail, FiPhone, FiCalendar } from "react-icons/fi";

const Foter = () => {
  return (
    <footer className="bg-[#141021] text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-semibold">Host Beta</h3>
          <p className="text-gray-400 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in nibh vehicula.
          </p>
          <div className="flex space-x-4 mt-4">
            <FaTwitter className="text-purple-400 text-xl cursor-pointer" />
            <FaFacebookF className="text-purple-400 text-xl cursor-pointer" />
            <FaLinkedinIn className="text-purple-400 text-xl cursor-pointer" />
            <FaInstagram className="text-purple-400 text-xl cursor-pointer" />
            <FaYoutube className="text-purple-400 text-xl cursor-pointer" />
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Get In Touch</h3>
          <p className="flex items-center text-gray-400">
            <FiMapPin className="text-purple-400 mr-2" />
            Richardson, California 62639
          </p>
          <p className="flex items-center text-gray-400 mt-2">
            <FiMail className="text-purple-400 mr-2" />
            felicia.reid@example.com
          </p>
          <p className="flex items-center text-gray-400 mt-2">
            <FiPhone className="text-purple-400 mr-2" />
            (405) 555-0128
          </p>
          <p className="flex items-center text-gray-400 mt-2">
            <FiCalendar className="text-purple-400 mr-2" />
            December 19, 2022
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quicklinks</h3>
          <ul className="text-gray-400 space-y-2">
            <li>Home</li>
            <li>About</li>
            <li>Team</li>
            <li>Pricing</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Support</h3>
          <ul className="text-gray-400 space-y-2">
            <li>Help Center</li>
            <li>Careers</li>
            <li>FAQs</li>
            <li>Privacy Policy</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Foter;
