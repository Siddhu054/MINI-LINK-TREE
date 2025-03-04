import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppearanceContextType {
  username: string;
  setUsername: (name: string) => void;
  bio: string;
  setBio: (bio: string) => void;
  profilePic: string | null;
  setProfilePic: (pic: string | null) => void;
  bannerImage: string | null;
  setBannerImage: (img: string | null) => void;
}

const AppearanceContext = createContext<AppearanceContextType | undefined>(undefined);

export const AppearanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or use default values
  const [username, setUsername] = useState(() => 
    localStorage.getItem('username') || "@anji121"
  );
  
  const [bio, setBio] = useState(() => 
    localStorage.getItem('bio') || "Add bio"
  );
  
  const [profilePic, setProfilePic] = useState<string | null>(() => 
    localStorage.getItem('profilePic')
  );
  
  const [bannerImage, setBannerImage] = useState<string | null>(() => 
    localStorage.getItem('bannerImage')
  );

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem('bio', bio);
  }, [bio]);

  useEffect(() => {
    if (profilePic) {
      localStorage.setItem('profilePic', profilePic);
    } else {
      localStorage.removeItem('profilePic');
    }
  }, [profilePic]);

  useEffect(() => {
    if (bannerImage) {
      localStorage.setItem('bannerImage', bannerImage);
    } else {
      localStorage.removeItem('bannerImage');
    }
  }, [bannerImage]);

  return (
    <AppearanceContext.Provider
      value={{
        username,
        setUsername,
        bio,
        setBio,
        profilePic,
        setProfilePic,
        bannerImage,
        setBannerImage,
      }}
    >
      {children}
    </AppearanceContext.Provider>
  );
};

export const useAppearance = () => {
  const context = useContext(AppearanceContext);
  if (context === undefined) {
    throw new Error('useAppearance must be used within an AppearanceProvider');
  }
  return context;
}; 