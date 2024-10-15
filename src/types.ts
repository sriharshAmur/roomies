import { HouseTypeSelect, LocationSelect, PropertyImageSelect, PropertySelect, RentDetailSelect } from './db/schema';

export type UserRole = 'tenant' | 'landlord';

export type PropertyWithDetails = PropertySelect & {
  houseType: HouseTypeSelect;
  location: LocationSelect;
  rentDetail: RentDetailSelect;
  images: PropertyImageSelect[];
};
