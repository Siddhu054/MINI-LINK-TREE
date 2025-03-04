import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Foter from './Foter';
import { 
  CheckCircle2, 
  Shield, 
  Zap, 
  Globe, 
  BarChart2, 
  Users,
  Star,
  MessageCircle,
  MapPin,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';

const LandingPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Check for saved section
    const lastSection = localStorage.getItem('lastSection');
    if (lastSection) {
      const element = document.getElementById(lastSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      localStorage.removeItem('lastSection'); // Clear after use
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      {/*<nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <LinkIcon className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">MiniLink</span>
            </div>
            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              <a href="#features" className="text-gray-700 hover:text-indigo-600">Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-indigo-600">Pricing</a>
              <a href="#testimonials" className="text-gray-700 hover:text-indigo-600">Testimonials</a>
              <a href="#contact" className="text-gray-700 hover:text-indigo-600">Contact</a>
              <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>*/}

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-100 to-white">
        {/* Fullscreen Iframe as Background */}
        <iframe
          src="https://my.spline.design/play-52f13141672ed149e16d185fe697eb2b/"
          frameBorder="0"
          className="absolute inset-0 w-full h-full"
        />

        {/* Content on top of iframe */}
        <div id="home" className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <div className="absolute bottom-6 right-6 md:bottom-5 md:right-5 
                     w-[90%] max-w-[400px] h-auto min-h-[40px] 
                     bg-black " ></div>
          <div className="flex justify-center items-center min-h-screen pt-[300px]">
            <Link
              to="/login"
              className="w-[90%] max-w-[200px] h-auto min-h-[40px] 
                         bg-blue-700 text-white px-6 md:px-8 py-3 
                         rounded-md text-[14px] md:text-[15px] font-semibold 
                         hover:bg-black text-center"
            >
              Get Started - It's Free
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to manage your links
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features to help you grow your online presence and track your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8 text-indigo-600" />,
                title: "Secure & Reliable",
                description: "Enterprise-grade security and 99.9% uptime guarantee"
              },
              {
                icon: <Zap className="w-8 h-8 text-indigo-600" />,
                title: "Lightning Fast",
                description: "Optimized for speed with global CDN distribution"
              },
              {
                icon: <Globe className="w-8 h-8 text-indigo-600" />,
                title: "Global Reach",
                description: "Connect with audience worldwide with localized links"
              },
              {
                icon: <BarChart2 className="w-8 h-8 text-indigo-600" />,
                title: "Advanced Analytics",
                description: "Detailed insights into your link performance"
              },
              {
                icon: <Users className="w-8 h-8 text-indigo-600" />,
                title: "Team Collaboration",
                description: "Work together seamlessly with team features"
              },
              {
                icon: <CheckCircle2 className="w-8 h-8 text-indigo-600" />,
                title: "Easy Integration",
                description: "Connect with your favorite tools and platforms"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that's right for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Free",
                price: "0",
                features: ["5 links", "Basic analytics", "Standard support"]
              },
              {
                name: "Pro",
                price: "9",
                features: ["Unlimited links", "Advanced analytics", "Priority support", "Custom domains"]
              },
              {
                name: "Enterprise",
                price: "29",
                features: ["Everything in Pro", "Team collaboration", "API access", "24/7 support"]
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white p-8 rounded-2xl shadow-lg ${
                  index === 1 ? 'border-2 border-indigo-500 relative' : ''
                }`}
              >
                {index === 1 && (
                  <span className="absolute top-0 right-0 bg-indigo-500 text-white px-3 py-1 text-sm rounded-bl-lg rounded-tr-xl">
                    Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-semibold ${
                  index === 1
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What our users say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied users worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-2xl"
              >
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "MiniLink has transformed how I share content online. The analytics are incredible!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-gray-600 text-sm">Digital Marketer</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get in touch
            </h2>
            <p className="text-xl text-gray-600">
              We'd love to hear from you
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info - Spans 2 columns on medium screens */}
            <div className="md:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4">MiniLink</h3>
              <p className="text-gray-400">Simplify your links, track your clicks</p>
              <div className="flex space-x-4 mt-4">
                <FaTwitter className="text-purple-400 hover:text-purple-300 text-xl cursor-pointer" />
                <FaFacebookF className="text-purple-400 hover:text-purple-300 text-xl cursor-pointer" />
                <FaLinkedinIn className="text-purple-400 hover:text-purple-300 text-xl cursor-pointer" />
                <FaInstagram className="text-purple-400 hover:text-purple-300 text-xl cursor-pointer" />
                <FaYoutube className="text-purple-400 hover:text-purple-300 text-xl cursor-pointer" />
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
              <div className="space-y-2">
                <p className="flex items-center text-gray-400">
                  <MapPin className="text-purple-400 mr-2 h-5 w-5" />
                  Richardson, California 62639
                </p>
                <p className="flex items-center text-gray-400">
                  <Mail className="text-purple-400 mr-2 h-5 w-5" />
                  felicia.reid@example.com
                </p>
                <p className="flex items-center text-gray-400">
                  <Phone className="text-purple-400 mr-2 h-5 w-5" />
                  (405) 555-0128
                </p>
                <p className="flex items-center text-gray-400">
                  <Calendar className="text-purple-400 mr-2 h-5 w-5" />
                  December 19, 2022
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'About', 'Team', 'Pricing', 'Blog'].map((item) => (
                  <li key={item} className="text-gray-400 hover:text-purple-400 cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                {['Help Center', 'Careers', 'FAQs', 'Privacy Policy', 'Contact'].map((item) => (
                  <li key={item} className="text-gray-400 hover:text-purple-400 cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} MiniLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 