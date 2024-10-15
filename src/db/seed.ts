// Seed Script for Roomies Database

import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { db } from '.';
import {
  amenities,
  AmenityInsert,
  HouseTypeInsert,
  houseTypes,
  LocationInsert,
  locations,
  properties,
  propertyAmenities,
  PropertyAmenityInsert,
  PropertyInsert,
  RentDetailInsert,
  rentDetails,
} from './schema';

dotenv.config();

const CLERK_USER_ID = process.env.CLERK_USER_ID;

if (!CLERK_USER_ID) {
  throw new Error('Clerk user ID not found in environment variables');
}

async function seedDatabase() {
  try {
    // Adding House Types
    const houseTypesData: HouseTypeInsert[] = [
      {
        id: uuidv4(),
        name: 'Apartment',
        description: 'A unit in a larger building with shared amenities.',
      },
      {
        id: uuidv4(),
        name: 'Villa',
        description: 'A standalone luxury property, often with a garden.',
      },
      {
        id: uuidv4(),
        name: 'Room',
        description: 'A single room available for rent, typically within a shared house.',
      },
    ];
    await db.insert(houseTypes).values(houseTypesData);

    // Adding Locations
    const locationsData: LocationInsert[] = [
      {
        id: uuidv4(),
        address: '123 Main St',
        city: 'Enschede',
        state: 'Overijssel',
        country: 'Netherlands',
        postalCode: '7511JD',
        latitude: '52.2215',
        longitude: '6.8937',
      },
      {
        id: uuidv4(),
        address: '456 Elm St',
        city: 'Amsterdam',
        state: 'North Holland',
        country: 'Netherlands',
        postalCode: '1012AB',
        latitude: '52.3676',
        longitude: '4.9041',
      },
      {
        id: uuidv4(),
        address: '789 Oak Ave',
        city: 'Utrecht',
        state: 'Utrecht',
        country: 'Netherlands',
        postalCode: '3511AD',
        latitude: '52.0907',
        longitude: '5.1214',
      },
    ];
    await db.insert(locations).values(locationsData);

    // Adding Rent Details
    const rentDetailsData: RentDetailInsert[] = [
      {
        id: uuidv4(),
        rentAmount: '1200',
        currency: 'EUR',
        securityDeposit: '1200',
        utilityCosts: '150',
        otherCharges: '75',
      },
      {
        id: uuidv4(),
        rentAmount: '2500',
        currency: 'EUR',
        securityDeposit: '2500',
        utilityCosts: '200',
        otherCharges: '100',
      },
      {
        id: uuidv4(),
        rentAmount: '600',
        currency: 'EUR',
        securityDeposit: '600',
        utilityCosts: '50',
        otherCharges: '25',
      },
    ];
    await db.insert(rentDetails).values(rentDetailsData);

    // Adding Amenities
    const amenitiesData: AmenityInsert[] = [
      {
        id: uuidv4(),
        name: 'WiFi',
        description: 'High-speed internet available.',
      },
      {
        id: uuidv4(),
        name: 'Parking',
        description: 'Dedicated parking space available.',
      },
      {
        id: uuidv4(),
        name: 'Swimming Pool',
        description: 'Access to a shared swimming pool.',
      },
      {
        id: uuidv4(),
        name: 'Garden',
        description: 'Private or shared garden available.',
      },
    ];
    await db.insert(amenities).values(amenitiesData);

    // Adding Properties
    const propertiesData: PropertyInsert[] = [
      {
        id: uuidv4(),
        title: 'Cozy Apartment in Enschede',
        description: 'A comfortable apartment in the heart of Enschede with easy access to public transport.',
        houseTypeId: houseTypesData[0].id!,
        locationId: locationsData[0].id!,
        rentDetailsId: rentDetailsData[0].id!,
        landlordId: CLERK_USER_ID!,
        isShared: false,
        isFurnished: true,
        furnishedType: 'fully',
        visibilityStatus: 'listed',
        bedrooms: 2,
        bathrooms: 1,
        availableFrom: new Date('2024-11-01'),
        leaseDurationMin: 6,
        leaseDurationMax: 12,
        yearBuilt: 2005,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        title: 'Luxury Villa in Amsterdam',
        description: 'A stunning villa with a private pool and garden, perfect for a family.',
        houseTypeId: houseTypesData[0].id!,
        locationId: locationsData[0].id!,
        rentDetailsId: rentDetailsData[0].id!,
        landlordId: CLERK_USER_ID!,
        isShared: false,
        isFurnished: true,
        furnishedType: 'fully',
        visibilityStatus: 'listed',
        bedrooms: 4,
        bathrooms: 3,
        availableFrom: new Date('2024-12-01'),
        leaseDurationMin: 12,
        leaseDurationMax: 24,
        yearBuilt: 2015,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        title: 'Single Room in Shared House, Utrecht',
        description: 'A budget-friendly room in a shared house with great roommates.',
        houseTypeId: houseTypesData[0].id!,
        locationId: locationsData[0].id!,
        rentDetailsId: rentDetailsData[0].id!,
        landlordId: CLERK_USER_ID!,
        isShared: true,
        sharedWith: 3,
        isFurnished: true,
        furnishedType: 'partially',
        visibilityStatus: 'listed',
        bedrooms: 1,
        bathrooms: 1,
        availableFrom: new Date('2024-10-15'),
        leaseDurationMin: 3,
        leaseDurationMax: 6,
        yearBuilt: 1990,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await db.insert(properties).values(propertiesData);

    // Adding Property Amenities
    const propertyAmenitiesData: PropertyAmenityInsert[] = [
      {
        propertyId: propertiesData[0].id!,
        amenityId: amenitiesData[0].id!,
      },
      {
        propertyId: propertiesData[0].id!,
        amenityId: amenitiesData[1].id!,
      },
      {
        propertyId: propertiesData[1].id!,
        amenityId: amenitiesData[2].id!,
      },
      {
        propertyId: propertiesData[1].id!,
        amenityId: amenitiesData[3].id!,
      },
      {
        propertyId: propertiesData[2].id!,
        amenityId: amenitiesData[1].id!,
      },
    ];
    await db.insert(propertyAmenities).values(propertyAmenitiesData);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();
