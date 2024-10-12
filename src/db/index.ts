import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  properties,
  houseTypes,
  locations,
  rentDetails,
  applications,
  favorites,
  amenities,
  propertyAmenities,
  propertyImages,
  userInteractions,
  tenantPreferences,
  reviews,
} from './schema';

config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be a Neon postgres connection string');
}

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, {
  schema: {
    properties,
    houseTypes,
    locations,
    rentDetails,
    applications,
    favorites,
    amenities,
    propertyAmenities,
    propertyImages,
    userInteractions,
    tenantPreferences,
    reviews,
  },
});
