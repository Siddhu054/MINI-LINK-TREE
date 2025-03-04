import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { User, Link as LinkType } from '../types';


import { 
  Camera, Mail, User as UserIcon, Link as LinkIcon, Calendar,
  Activity, BarChart2, Clock, Award, Zap, Share2
} from 'lucide-react';

interface ProfileProps {
  user: User;
  updateUser: (user: User) => void;
  links: LinkType[]; // ✅ Correct: Uses the defined Link type
}


const Profile: React.FC<ProfileProps> = ({ user, updateUser, links }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name || '');
  const [bio, setBio] = useState(user.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || '');
  const [totalClicks, setTotalClicks] = useState(0);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  // Calculate total clicks and other stats
  useEffect(() => {
    const clicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0);
    setTotalClicks(clicks);

    // Generate recent activity
    const activity = links
      .map(link => ({
        type: 'link_created',
        date: link.createdAt,
        link: link
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
    setRecentActivity(activity);
  }, [links]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      ...user,
      name,
      bio,
      avatarUrl
    });
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Not available';
      }
      return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    } catch (error) {
      return 'Not available';
    }
  };

  const getAccountAge = (dateString: string) => {
    try {
      const signupDate = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - signupDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 30) {
        return `${diffDays} days`;
      } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} ${months === 1 ? 'month' : 'months'}`;
      } else {
        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);
        return `${years}y ${months}m`;
      }
    } catch (error) {
      return 'N/A';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
                  alt={name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg text-indigo-600 hover:text-indigo-700">
                    <Camera size={16} />
                  </button>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{name}</h1>
                <p className="flex items-center mt-1 text-indigo-100">
                  <Mail className="w-4 h-4 mr-2" />
                  {user.email}
                </p>
                {bio && !isEditing && (
                  <p className="mt-2 text-indigo-100 max-w-2xl">{bio}</p>
                )}
              </div>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Links</h3>
            <LinkIcon className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{links.length}</p>
          <p className="mt-1 text-sm text-gray-500">Active links</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Clicks</h3>
            <Activity className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalClicks}</p>
          <p className="mt-1 text-sm text-gray-500">Link clicks</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Avg. Clicks</h3>
            <BarChart2 className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {links.length ? Math.round(totalClicks / links.length) : 0}
          </p>
          <p className="mt-1 text-sm text-gray-500">Per link</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatDate(user.createdAt)}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {getAccountAge(user.createdAt)} ago
          </p>
        </div>
      </div>

      {/* Recent Activity & Top Links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Share2 className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Created new link: {activity.link.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Links */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Links</h3>
            <Award className="w-5 h-5 text-orange-500" />
          </div>
          <div className="space-y-4">
            {links
              .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
              .slice(0, 5)
              .map((link, index) => (
                <div key={link._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{link.title}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[200px]">{link.url}</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-indigo-600">
                    {link.clicks || 0} clicks
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      {isEditing && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>
            <div>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile; 