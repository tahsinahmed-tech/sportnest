export interface Facility {
  _id: string;
  name: string;
  sportType: string;
  imageUrl: string;
  location: string;
  pricePerHour: number;
  capacity: number;
  availableTimeSlots: string[];
  description: string;
}