import React, { useState, useEffect } from "react";
import {
  MoreHorizontal,
  Trash2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Globe,
  Share2,
  Image as ImageIcon,
  User as UserIcon,
} from "lucide-react";
import { User } from "../types";
import { useAppearance } from '../context/AppearanceContext';

interface AppearanceProps {
  user: User;
  updateUser: (user: User) => void;
}

interface SocialMediaOption {
  name: string;
  icon: JSX.Element;
  placeholder: string;
  prefix: string;
}

const Appearance: React.FC<AppearanceProps> = ({ user, updateUser }) => {
  const {
    username,
    setUsername,
    bio,
    setBio,
    profilePic,
    setProfilePic,
    bannerImage,
    setBannerImage
  } = useAppearance();
  const socialMediaOptions: SocialMediaOption[] = [
    {
      name: 'Twitter',
      icon: <Twitter />,
      placeholder: 'Your Twitter username',
      prefix: 'https://twitter.com/'
    },
    { name: "Facebook", icon: <Facebook />, placeholder: "Enter Facebook URL", prefix: "https://facebook.com/" },
    { name: "Instagram", icon: <Instagram />, placeholder: "Enter Instagram URL", prefix: "https://instagram.com/" },
    { name: "LinkedIn", icon: <Linkedin />, placeholder: "Enter LinkedIn URL", prefix: "https://linkedin.com/in/" },
    { name: "GitHub", icon: <Github />, placeholder: "Enter GitHub URL", prefix: "https://github.com/" },
    { name: "Website", icon: <Globe />, placeholder: "Enter Website URL", prefix: "" }
  ];
  
  const [socialLinks, setSocialLinks] = useState<{
    name: string;
    url: string;
    color: string;
    shape: string;
    textColor: string;
  }[]>(() => {
    try {
      const saved = localStorage.getItem('userSocialLinks');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading social links:', error);
      return [];
    }
  });

  // Save social links to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('userSocialLinks', JSON.stringify(socialLinks));
    } catch (error) {
      console.error('Error saving social links:', error);
    }
  }, [socialLinks]);

  const [activePlatform, setActivePlatform] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState("");
  const [currentCustomization, setCurrentCustomization] = useState({
    color: "bg-blue-500",
    shape: "rounded-lg",
    textColor: "text-white"
  });

  // Handle Enter Key to Add Link
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, platform: string, prefix: string) => {
    if (event.key === "Enter") {
      if (!currentUrl.startsWith(prefix)) {
        alert(`Invalid URL! Please enter a valid ${platform} link.`);
        return;
      }

      // Save link with customization
      setSocialLinks([
        ...socialLinks,
        { name: platform, url: currentUrl, ...currentCustomization }
      ]);
      
      // Reset input & customization settings after adding the link
      setCurrentUrl("");
      setActivePlatform(null);
      setCurrentCustomization({ color: "bg-blue-500", shape: "rounded-lg", textColor: "text-white" });
    }
  };

  // Update Link Customization
  const updateLinkStyle = (index: number, key: string, value: string) => {
    const updatedLinks = [...socialLinks];
    (updatedLinks[index] as any)[key] = value;
    setSocialLinks(updatedLinks);
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [showNameBioModal, setShowNameBioModal] = useState(false);

  // Handle Image Upload
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "banner"
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageURL = URL.createObjectURL(file);
      if (type === "profile") setProfilePic(imageURL);
      else setBannerImage(imageURL);
    }
  };

  const handleUpdateUser = () => {
    if (user && updateUser) {
      updateUser({
        ...user,
        // update user properties
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-4 lg:px-8">
      {/* Left Side - Mobile Preview */}
      <div className="w-full lg:w-[350px] lg:fixed lg:flex-shrink-0 mb-8 lg:mb-0">
        <div className="lg:sticky top-8 flex justify-center lg:justify-start">
          <div className="bg-white rounded-[30px] h-[450px]  shadow-[10px_10px_10px_rgba(0,0,0,0.5)] p-4 border-2 border-indigo-500 aspect-[9/18] relative overflow-hidden">
            {/* Banner Image */}
            <div className="relative w-full h-24 bg-gray-200 border-2 border-indigo-300 rounded-lg overflow-hidden flex items-center justify-center">
              {bannerImage ? (
                <img src={bannerImage} alt="Banner" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500">No Banner</span>
              )}
              {/* Three Dots Menu */}
              <button
                className="absolute top-2 right-4 scale-50 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                onClick={() => setShowEditModal(true)}
              >
                <MoreHorizontal />
              </button>
            </div>

            {/* Profile Section */}
            <div className="absolute top-[4.5rem] left-1/2 transform -translate-x-1/2 flex flex-col items-center w-full">
              {/* Profile Picture */}
              <label htmlFor="profilePicInputRight" className="cursor-pointer">
                <input
                  type="file"
                  id="profilePicInputRight"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, "profile")}
                />
                <div className="w-20 h-20 bg-blue-200 rounded-full overflow-hidden border-4 border-white flex items-center justify-center">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl">@</span>
                  )}
                </div>
              </label>

              {/* Username & Bio */}
              <h2 className="text-sm font-semibold cursor-pointer mt-2 text-center w-full" onClick={() => setShowNameBioModal(true)}>
                {username}
              </h2>
              <p
                className="text-gray-500 text-sm cursor-pointer text-center w-full break-words max-w-[250px]"
                onClick={() => setShowNameBioModal(true)}
              >
                {bio}
              </p>

              {/* Social Media Icons (Only Show If Links Exist) */}
              {socialLinks.length > 0 && (
                <div className="flex justify-center gap-3 mt-2">
                  {socialLinks.map((link, index) => {
                    const socialMedia = socialMediaOptions.find(option => option.name === link.name);
                    return (
                      <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-indigo-700">
                        {socialMedia?.icon}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Editor */}
      <div className="flex-1 lg:ml-[350px] max-w-3xl mx-auto border-4 border-indigo-400 p-4 rounded-xl">
        {/* Banner Image in Editor */}
        <div className="relative w-full h-[150px] sm:h-[200px] bg-gray-200 rounded-lg border-2 border-indigo-300 overflow-hidden" style={{ aspectRatio: "3 / 1" }}>
          {bannerImage ? (
            <img
              src={bannerImage}
              alt="Banner"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="flex items-center justify-center w-full h-full text-gray-500">
              No Banner
            </span>
          )}
          {/* Three Dots Menu */}
          <button
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100"
            onClick={() => setShowEditModal(true)}
          >
            <MoreHorizontal />
          </button>
        </div>

        {/* Profile Section Below Banner */}
        <div className="relative bottom-10 sm:bottom-14 left-4 sm:left-6 flex flex-col items-start px-2 sm:px-4">
          {/* Profile Picture */}
          <label htmlFor="profilePicInputEditor" className="cursor-pointer">
            <input
              type="file"
              id="profilePicInputEditor"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e, "profile")}
            />
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-blue-200 rounded-full overflow-hidden border-4 border-blue-400">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl sm:text-3xl flex items-center justify-center h-full">
                  @
                </span>
              )}
            </div>
          </label>

          {/* Username & Bio (Click to Edit) */}
          <h2
            className="text-base sm:text-lg font-semibold cursor-pointer ml-2 mt-1"
            onClick={() => setShowNameBioModal(true)}
          >
            {username}
          </h2>
          <p
            className="text-gray-500 text-xs sm:text-sm mt-1 ml-2 cursor-pointer"
            onClick={() => setShowNameBioModal(true)}
          >
            {bio}
          </p>

          {/* Social Media Links Section */}
          <div className="mt-4 w-full flex flex-col items-center">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Social Links</h3>

            {/* Icons to Add Social Media Links */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-4">
              {socialMediaOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => setActivePlatform(option.name)}
                  className="p-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white shadow-md"
                >
                  {option.icon}
                </button>
              ))}
            </div>

            {/* Input for Adding Link with Customization */}
            {activePlatform && (
              <div className="flex flex-col items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 w-full sm:w-[90%] mb-4">
                <div className="flex items-center w-full">
                  <span className="text-indigo-600 mr-1">{socialMediaOptions.find(option => option.name === activePlatform)?.icon}</span>
                  <input
                    type="url"
                    value={currentUrl}
                    onChange={(e) => setCurrentUrl(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, activePlatform, socialMediaOptions.find(option => option.name === activePlatform)?.prefix || "")}
                    placeholder={`Enter ${activePlatform} URL`}
                    className={`flex-1 text-xs sm:text-sm bg-transparent focus:outline-none border p-1 rounded-lg ${
                      currentUrl && !currentUrl.startsWith(socialMediaOptions.find(option => option.name === activePlatform)?.prefix || "") ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <button onClick={() => setActivePlatform(null)} className="text-red-500 hover:text-red-700 ml-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Customization Options (Visible Only While Entering) */}
                <div className="flex flex-wrap gap-2 w-full justify-between">
                  {/* Background Color */}
                  <select
                    className="border p-1 rounded text-xs sm:text-sm"
                    value={currentCustomization.color}
                    onChange={(e) => setCurrentCustomization({ ...currentCustomization, color: e.target.value })}
                  >
                    <option value="bg-blue-500">Blue</option>
                    <option value="bg-red-500">Red</option>
                    <option value="bg-green-500">Green</option>
                    <option value="bg-yellow-500">Yellow</option>
                    <option value="bg-gray-500">Gray</option>
                  </select>

                  {/* Button Shape */}
                  <select
                    className="border p-1 rounded-lg text-xs sm:text-sm"
                    value={currentCustomization.shape}
                    onChange={(e) => setCurrentCustomization({ ...currentCustomization, shape: e.target.value })}
                  >
                    <option value="rounded-lg">Rounded</option>
                    <option value="rounded-full">Pill</option>
                    <option value="rounded-none">Square</option>
                  </select>

                  {/* Text Color */}
                  <select
                    className="border p-1 rounded text-xs sm:text-sm"
                    value={currentCustomization.textColor}
                    onChange={(e) => setCurrentCustomization({ ...currentCustomization, textColor: e.target.value })}
                  >
                    <option value="text-white">White</option>
                    <option value="text-black">Black</option>
                    <option value="text-gray-300">Gray</option>
                  </select>
                </div>
              </div>
            )}

            {/* Added Social Media Links */}
            <div className="mt-4 w-full flex flex-col items-center">
              {socialLinks.map((link, index) => (
                <div key={index} className={`flex items-center justify-between w-full sm:w-[90%] px-2 sm:px-4 py-2 ${link.color} ${link.shape} mb-2`}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 ${link.textColor} font-medium`}>
                    {socialMediaOptions.find(option => option.name === link.name)?.icon}
                    <span className="text-xs sm:text-sm">{link.name}</span>
                  </a>
                  <button onClick={() => setSocialLinks(socialLinks.filter((_, i) => i !== index))} className="text-white hover:text-gray-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Edit Images</h2>
            <label className="block mb-4">
              <span className="text-sm font-medium">Upload Profile Picture</span>
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 border rounded-xl text-sm"
                onChange={(e) => handleImageUpload(e, "profile")}
              />
            </label>
            <label className="block mb-4">
              <span className="text-sm font-medium">Upload Banner Image</span>
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 border rounded-xl text-sm"
                onChange={(e) => handleImageUpload(e, "banner")}
              />
            </label>
            <div className="flex justify-end space-x-2">
              <button className="px-3 py-1 sm:px-4 sm:py-2 text-sm bg-gray-300 rounded-2xl" onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Name & Bio Edit Modal */}
      {showNameBioModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Edit Name & Bio</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent p-2 border rounded-xl mb-4 text-sm"
              placeholder="Enter new username"
            />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 bg-transparent border rounded-xl mb-4 text-sm"
              placeholder="Enter bio"
            ></textarea>
            {/* Buttons */}
            <div className="flex justify-end space-x-2">
              <button
                className="px-3 py-1 sm:px-4 sm:py-2 text-sm bg-gray-300 rounded-2xl"
                onClick={() => setShowNameBioModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 sm:px-4 sm:py-2 text-sm bg-blue-500 text-white rounded-2xl"
                onClick={() => setShowNameBioModal(false)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appearance;