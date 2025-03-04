import React, { useState } from 'react';
import { User } from '../types';

interface SettingsProps {
  user: User | null;
  updateUser: (user: User) => void;
}

const Settings: React.FC<SettingsProps> = ({ user, updateUser }) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (user) {
      updateUser({
        ...user,
        name,
        email
      });
      
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Account Settings</h2>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Save Changes
              </button>
              
              {successMessage && (
                <p className="mt-2 text-green-600">{successMessage}</p>
              )}
            </div>
          </div>
        </form>
      </div>
      
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <h3 className="text-md font-medium mb-4">Danger Zone</h3>
        <button
          className="bg-red-100 text-red-600 px-6 py-2 rounded-md hover:bg-red-200 transition-colors"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;