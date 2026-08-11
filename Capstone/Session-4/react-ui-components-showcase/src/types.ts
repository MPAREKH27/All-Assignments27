export interface NavLinkItem {
  id: string;
  label: string;
  iconName: string;
  badge?: number;
}

export interface PlaylistSong {
  title: string;
  artist: string;
  duration: string;
}

export interface Playlist {
  id: string;
  title: string;
  coverUrl: string;
  songCount: number;
  description: string;
  creator: string;
  tags?: string[];
  songs?: PlaylistSong[];
}

export interface SocialLink {
  id: string;
  name: string;
  platform: 'facebook' | 'twitter' | 'instagram' | 'youtube' | 'linkedin' | 'github';
  url: string;
  color?: string;
}

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldDefinition {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'radio' | 'checkbox' | 'textarea';
  placeholder?: string;
  required?: boolean;
  options?: FieldOption[];
  defaultValue?: any;
  helpText?: string;
}

export interface TicketBookingDetails {
  movieTitle: string;
  cinema: string;
  date: string;
  timeSlot: string;
  category: 'Classic' | 'Executive' | 'VIP';
  seatsCount: number;
  userName: string;
  userEmail: string;
}
