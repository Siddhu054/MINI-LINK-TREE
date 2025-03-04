export interface Link {
  _id: string;
  title: string;
  url: string;
  backgroundColor?: string;
  textColor?: string;
  clicks?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  bio?: string;  // Add bio (optional)
  avatarUrl?: string;  // Add avatarUrl if missing
  createdAt: string;  // Make createdAt required, not optional
  // Add any other user properties you need
}