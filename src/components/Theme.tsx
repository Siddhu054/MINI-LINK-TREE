import React, { useState, useEffect } from "react";
import {
  MoreHorizontal,
  Share2,
  Palette,
  Layout,
  Type,
  Image as ImageIcon,
  User as UserIcon,
} from "lucide-react";
import { useAppearance } from '../context/AppearanceContext';

// Define valid theme options
type ThemeOption = {
  name: 'default' | 'dark' | 'light' | 'gradient' | 'minimal' | 'colorful';
  classes: string;
};

type ButtonOption = {
  name: 'rounded' | 'square' | 'pill' | 'shadow' | 'outline' | '3d';
  classes: string;
};

type ProfileOption = {
  name: 'circle' | 'square' | 'rounded';
  classes: string;
};

type BannerOption = {
  name: 'full' | 'rounded' | 'none';
  classes: string;
};

type FontOption = {
  name: 'modern' | 'classic' | 'playful';
  class: string;
};

// Update the mapped arrays with proper typing
const themeOptions: Array<{ name: ThemeOption['name']; icon: JSX.Element }> = [
  { name: 'default', icon: <div className="h-6 w-6 rounded-full bg-white border border-gray-300"></div> },
  { name: 'dark', icon: <div className="h-6 w-6 rounded-full bg-gray-900 border border-gray-700"></div> },
  { name: 'light', icon: <div className="h-6 w-6 rounded-full bg-blue-50 border border-blue-200"></div> },
  { name: 'gradient', icon: <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600"></div> },
  { name: 'minimal', icon: <div className="h-6 w-6 rounded-full bg-gray-50 border border-gray-200"></div> },
  { name: 'colorful', icon: <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div> }
] as const;

const buttonOptions: Array<{ name: ButtonOption['name']; preview: JSX.Element }> = [
  { name: 'rounded', preview: <div className="h-6 w-12 bg-indigo-500 rounded-lg"></div> },
  { name: 'square', preview: <div className="h-6 w-12 bg-indigo-500 rounded-none"></div> },
  { name: 'pill', preview: <div className="h-6 w-12 bg-indigo-500 rounded-full"></div> },
  { name: 'shadow', preview: <div className="h-6 w-12 bg-indigo-500 rounded-lg shadow-lg"></div> },
  { name: 'outline', preview: <div className="h-6 w-12 bg-transparent border-2 border-indigo-500"></div> },
  { name: '3d', preview: <div className="h-6 w-12 bg-indigo-500 rounded-lg transform shadow-md"></div> }
] as const;

// Add proper type definitions for the option arrays
const profileOptions: Array<{ name: ProfileOption['name']; preview: JSX.Element }> = [
  { name: 'circle', preview: <div className="h-10 w-10 bg-blue-200 rounded-full flex items-center justify-center"><UserIcon className="h-6 w-6" /></div> },
  { name: 'square', preview: <div className="h-10 w-10 bg-blue-200 rounded-none flex items-center justify-center"><UserIcon className="h-6 w-6" /></div> },
  { name: 'rounded', preview: <div className="h-10 w-10 bg-blue-200 rounded-lg flex items-center justify-center"><UserIcon className="h-6 w-6" /></div> }
] as const;

const bannerOptions: Array<{ name: BannerOption['name']; preview: JSX.Element }> = [
  { name: 'full', preview: <div className="h-4 w-20 bg-gray-300 rounded-none"></div> },
  { name: 'rounded', preview: <div className="h-4 w-20 bg-gray-300 rounded-lg"></div> },
  { name: 'none', preview: <div className="h-4 w-20 bg-transparent border border-gray-300"></div> }
] as const;

const fontOptions: Array<{ name: FontOption['name']; class: string }> = [
  { name: 'modern', class: 'font-sans' },
  { name: 'classic', class: 'font-serif' },
  { name: 'playful', class: 'font-mono' }
] as const;

const Theme: React.FC = () => {
  const {
    username,
    bio,
    profilePic,
    setProfilePic,
    bannerImage,
    setBannerImage
  } = useAppearance();
  
  // Theme States with proper typing
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption['name']>('default');
  const [buttonStyle, setButtonStyle] = useState<ButtonOption['name']>('rounded');
  const [profileStyle, setProfileStyle] = useState<ProfileOption['name']>('circle');
  const [bannerStyle, setBannerStyle] = useState<BannerOption['name']>('full');
  const [fontStyle, setFontStyle] = useState<FontOption['name']>('modern');

  // CSS classes based on selections
  const [themeClasses, setThemeClasses] = useState("");
  const [buttonClasses, setButtonClasses] = useState("");
  const [profileClasses, setProfileClasses] = useState("");
  const [bannerClasses, setBannerClasses] = useState("");
  const [fontClasses, setFontClasses] = useState("");

  // Update theme classes when selections change
  useEffect(() => {
    // Theme colors with type assertion
    const themeMap: Record<ThemeOption['name'], string> = {
      default: "bg-white border-indigo-500",
      dark: "bg-gray-900 border-gray-700 text-white",
      light: "bg-blue-50 border-blue-200",
      gradient: "bg-gradient-to-br from-indigo-500 to-purple-600 border-purple-500 text-white",
      minimal: "bg-white border-gray-200",
      colorful: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 border-orange-400 text-white"
    };
    
    const buttonMap: Record<ButtonOption['name'], string> = {
      rounded: "rounded-lg bg-indigo-500 text-white",
      square: "rounded-none bg-indigo-500 text-white",
      pill: "rounded-full bg-indigo-500 text-white",
      shadow: "rounded-lg bg-indigo-500 text-white shadow-lg shadow-indigo-200",
      outline: "rounded-lg bg-transparent border-2 border-indigo-500 text-indigo-500",
      "3d": "rounded-lg bg-indigo-500 text-white transform hover:-translate-y-1 transition-transform shadow-md"
    };
    
    const profileMap: Record<ProfileOption['name'], string> = {
      circle: "rounded-full",
      square: "rounded-none",
      rounded: "rounded-lg"
    };
    
    const bannerMap: Record<BannerOption['name'], string> = {
      full: "rounded-none",
      rounded: "rounded-lg",
      none: "hidden"
    };
    
    const fontMap: Record<FontOption['name'], string> = {
      modern: "font-sans",
      classic: "font-serif",
      playful: "font-mono"
    };

    setThemeClasses(themeMap[selectedTheme]);
    setButtonClasses(buttonMap[buttonStyle]);
    setProfileClasses(profileMap[profileStyle]);
    setBannerClasses(bannerMap[bannerStyle]);
    setFontClasses(fontMap[fontStyle]);
  }, [selectedTheme, buttonStyle, profileStyle, bannerStyle, fontStyle]);

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

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-4 lg:px-8">
      {/* Left Side - Mobile Preview */}
      <div className="w-full lg:w-[350px] lg:fixed flex-shrink-0">
        <div className="lg:sticky lg:top-8">
          <div className={`rounded-[30px] h-[450px] shadow-[10px_10px_10px_rgba(0,0,0,0.5)] p-4 border-2 aspect-[9/18] relative overflow-hidden transition-colors duration-300 ${themeClasses}`}>
            {/* Banner Image */}
            <div className={`relative w-full h-24 bg-gray-200 overflow-hidden flex items-center justify-center ${bannerClasses}`}>
              {bannerImage && bannerStyle !== 'none' ? (
                <img src={bannerImage} alt="Banner" className="w-full h-full object-cover" />
              ) : (
                <span className={selectedTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                  {bannerStyle === 'none' ? '' : 'No Banner'}
                </span>
              )}
              {/* Three Dots Menu */}
              <button
                className={`absolute top-2 right-4 scale-75 ${buttonClasses}`}
                onClick={() => {}}
              >
                <MoreHorizontal className="h-4 w-4" />
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
                <div className={`w-20 h-20 bg-blue-200 overflow-hidden border-4 ${
                  selectedTheme === 'dark' ? 'border-gray-700' : 'border-white'
                } ${profileClasses}`}>
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl flex items-center justify-center h-full">@</span>
                  )}
                </div>
              </label>

              {/* Username & Bio */}
              <h2 className={`text-sm font-semibold cursor-pointer mt-2 text-center w-full ${fontClasses}`}>
                {username}
              </h2>
              <p className={`${
                selectedTheme === 'dark' ? 'text-gray-300' : 'text-gray-500'
              } text-sm cursor-pointer text-center w-full break-words max-w-[250px] ${fontClasses}`}>
                {bio}
              </p>
            </div>
            
            {/* Demo Buttons */}
            <div className="absolute bottom-16 left-0 right-0 flex justify-center space-x-2">
              <button className={`px-3 py-1 text-sm ${buttonClasses}`}>
                Follow
              </button>
              <button className={`px-3 py-1 text-sm ${buttonClasses}`}>
                Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Theme Editor */}
      <div className="flex-1 max-w-3xl lg:ml-[350px] border-4 border-indigo-300 p-4 rounded-xl">
        {/* Banner Image Upload */}
        <div className="relative w-full h-[120px] bg-gray-200 rounded-lg border-2 border-indigo-300 overflow-hidden mb-6" style={{ aspectRatio: "3 / 1" }}>
          {bannerImage ? (
            <img
              src={bannerImage}
              alt="Banner"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="flex items-center justify-center w-full h-full text-gray-500">
              Click to Upload Banner
            </span>
          )}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => handleImageUpload(e, "banner")}
          />
        </div>

        {/* Profile Picture Upload */}
        <div className="mb-6 flex items-center">
          <label htmlFor="profilePicEditor" className="cursor-pointer">
            <input
              type="file"
              id="profilePicEditor"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e, "profile")}
            />
            <div className="w-16 h-16 bg-blue-200 rounded-full overflow-hidden border-2 border-indigo-300 mr-4">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl flex items-center justify-center h-full">
                  @
                </span>
              )}
            </div>
          </label>
          <div>
            <h3 className="font-semibold">{username}</h3>
            <p className="text-sm text-gray-500">Click image to update profile picture</p>
          </div>
        </div>

        {/* Theme Settings Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Theme Settings</h2>
          
          {/* Color Themes */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Color Theme</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {themeOptions.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => setSelectedTheme(theme.name)}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                    selectedTheme === theme.name ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}

                >
                  {theme.icon}
                  <span className="capitalize mt-2">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Button Style */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Button Style</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {buttonOptions.map((style) => (
                <button
                  key={style.name}
                  onClick={() => setButtonStyle(style.name)}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                    buttonStyle === style.name ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {style.preview}
                  <span className="capitalize mt-2">{style.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Profile Picture Style */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Profile Picture Style</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {profileOptions.map((style) => (
                <button
                  key={style.name}
                  onClick={() => setProfileStyle(style.name)}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                    profileStyle === style.name ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {style.preview}
                  <span className="capitalize mt-2">{style.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Banner Style */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Banner Style</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {bannerOptions.map((style) => (
                <button
                  key={style.name}
                  onClick={() => setBannerStyle(style.name)}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                    bannerStyle === style.name ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {style.preview}
                  <span className="capitalize mt-2">{style.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Font Style */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Font Style</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {fontOptions.map((style) => (
                <button
                  key={style.name}
                  onClick={() => setFontStyle(style.name)}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                    fontStyle === style.name ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Type className="h-6 w-6 mb-2" />
                  <span className="capitalize mt-2">{style.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Theme;