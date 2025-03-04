import { Link } from '../types';

// Local storage keys
const LINKS_STORAGE_KEY = 'mini-link-manager-links';
const USER_STORAGE_KEY = 'mini-link-manager-user';

// Generate a random short code
export const generateShortCode = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Generate a unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Save links to local storage
export const saveLinks = (links: Link[]): void => {
  localStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(links));
};

// Get links from local storage
export const getLinks = (): Link[] => {
  const links = localStorage.getItem(LINKS_STORAGE_KEY);
  return links ? JSON.parse(links) : [];
};

// Save user to local storage
export const saveUser = (user: any): void => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

// Get user from local storage
export const getUser = (): any => {
  const user = localStorage.getItem(USER_STORAGE_KEY);
  return user ? JSON.parse(user) : null;
};

// Clear user from local storage
export const clearUser = (): void => {
  localStorage.removeItem(USER_STORAGE_KEY);
};