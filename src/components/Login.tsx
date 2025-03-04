import React, { useState, useEffect } from 'react';
import { LinkIcon } from 'lucide-react';
import { User } from '../types';
import { auth } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setUser: (user: User) => void;
  setActiveTab: (tab: string) => void;
}

const Login: React.FC<LoginProps> = ({ setUser, setActiveTab }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIframeLoaded(true);
    }, 1500);
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      clearTimeout(timer);
    };
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      if (isLogin) {
        // Handle Login
        const response = await auth.login(email, password);
        if (response.data.user && response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setUser(response.data.user);
          navigate('/app', { replace: true });
        }
      } else {
        // Handle Register
        if (!name || !email || !password) {
          setError("All fields are required");
          return;
        }
        const response = await auth.register(name, email, password);
        if (response.data.user && response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setUser(response.data.user);
          navigate('/app', { replace: true });
        }
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.response?.data?.message || (isLogin ? "Invalid email or password" : "Registration failed"));
    } finally {
      setLoading(false);
    }
  };
  
  return (
<div className="min-h-screen w-full absolute inset-0 flex items-center justify-center overflow-hidden p-4 sm:p-8">
{/* Spline 3D Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div className="w-full h-full" style={{ transform: "translateX(-50px)" }}>
        <iframe 
  src="https://my.spline.design/particleplanet-80f345c5e76ed449a55e476c5014c114" 
  frameBorder="0" 
  className="w-full h-full object-cover scale-[1.2] sm:scale-[1.1] md:scale-[1.05]" 
  title="Interactive 3D Background"
  onLoad={() => setIframeLoaded(true)}
  style={{ opacity: iframeLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
/>

        </div>
      </div>

      {/* Login Form with Enhanced Responsive Layout */}
      <div className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4 sm:px-6 transition-all duration-300">
      <div className="w-full bg-opacity-80 rounded-2xl shadow-lg overflow-hidden border border-white/30 transform scale-[1.00] sm:scale-[1.02] md:scale-[1.05] transition-all duration-300">
      <div className="bg-transparent p-4 sm:p-6 text-center">
            <div className="flex items-center justify-center">
              <LinkIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              <h1 className="text-xl sm:text-2xl font-bold text-white ml-2">MiniLink</h1>
            </div>
            <p className="text-indigo-200 mt-1 sm:mt-2 text-xs sm:text-sm">Simplify your links, track your clicks</p>
          </div>
          
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-center mb-4 sm:mb-6 text-[rgb(234,104,104)]">
              {isLogin ? 'Sign in to your account' : 'Create a new account'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-3 sm:space-y-4">
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-800">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm border border-gray-300 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                )}
                
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-800">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm border border-gray-300 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-800">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm border border-gray-300 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                {error && (
                  <p className="text-red-600 font-medium text-xs sm:text-sm bg-red-100/60 p-2 rounded">{error}</p>
                )}
                
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-indigo-600 text-white px-4 py-2 sm:px-6 sm:py-2 text-xs sm:text-sm rounded-md hover:bg-indigo-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                  </button>
                </div>
              </div>
            </form>
            
            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-xs sm:text-sm text-gray-800 font-medium">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                  }}
                  className="ml-1 text-indigo-600 hover:text-indigo-500 focus:outline-none font-bold text-xs sm:text-sm"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;