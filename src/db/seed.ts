// Seed Script for Roomies Database

import { db } from '.';
import { properties, houseTypes, locations, rentDetails, amenities, propertyAmenities } from './schema';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { InferInsertModel } from 'drizzle-orm';

dotenv.config();

const CLERK_USER_ID = process.env.CLERK_USER_ID;

if (!CLERK_USER_ID) {
  throw new Error('Clerk user ID not found in environment variables');
}

// Defining types using InferInsertModel for type safety
type HouseTypeInsert = InferInsertModel<typeof houseTypes>;
type LocationInsert = InferInsertModel<typeof locations>;
type RentDetailsInsert = InferInsertModel<typeof rentDetails>;
type PropertyInsert = InferInsertModel<typeof properties>;
type AmenityInsert = InferInsertModel<typeof amenities>;
type PropertyAmenityInsert = InferInsertModel<typeof propertyAmenities>;

async function seedDatabase() {
  try {
    // Adding House Types
    const houseTypesData: HouseTypeInsert[] = [
      {
        houseTypeId: uuidv4(),
        name: 'Apartment',
        description: 'A unit in a larger building with shared amenities.',
      },
      {
        houseTypeId: uuidv4(),
        name: 'Villa',
        description: 'A standalone luxury property, often with a garden.',
      },
      {
        houseTypeId: uuidv4(),
        name: 'Room',
        description: 'A single room available for rent, typically within a shared house.',
      },
    ];
    await db.insert(houseTypes).values(houseTypesData);

    // Adding Locations
    const locationsData: LocationInsert[] = [
      {
        locationId: uuidv4(),
        address: '123 Main St',
        city: 'Enschede',
        state: 'Overijssel',
        country: 'Netherlands',
        postalCode: '7511JD',
        latitude: '52.2215',
        longitude: '6.8937',
      },
      {
        locationId: uuidv4(),
        address: '456 Elm St',
        city: 'Amsterdam',
        state: 'North Holland',
        country: 'Netherlands',
        postalCode: '1012AB',
        latitude: '52.3676',
        longitude: '4.9041',
      },
      {
        locationId: uuidv4(),
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
    const rentDetailsData: RentDetailsInsert[] = [
      {
        rentDetailsId: uuidv4(),
        rentAmount: '1200',
        currency: 'EUR',
        securityDeposit: '1200',
        utilityCosts: '150',
        otherCharges: '75',
      },
      {
        rentDetailsId: uuidv4(),
        rentAmount: '2500',
        currency: 'EUR',
        securityDeposit: '2500',
        utilityCosts: '200',
        otherCharges: '100',
      },
      {
        rentDetailsId: uuidv4(),
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
        amenityId: uuidv4(),
        name: 'WiFi',
        description: 'High-speed internet available.',
      },
      {
        amenityId: uuidv4(),
        name: 'Parking',
        description: 'Dedicated parking space available.',
      },
      {
        amenityId: uuidv4(),
        name: 'Swimming Pool',
        description: 'Access to a shared swimming pool.',
      },
      {
        amenityId: uuidv4(),
        name: 'Garden',
        description: 'Private or shared garden available.',
      },
    ];
    await db.insert(amenities).values(amenitiesData);

    // Adding Properties
    const propertiesData: PropertyInsert[] = [
      {
        propertyId: uuidv4(),
        title: 'Cozy Apartment in Enschede',
        description: 'A comfortable apartment in the heart of Enschede with easy access to public transport.',
        houseTypeId: houseTypesData[0].houseTypeId!,
        locationId: locationsData[0].locationId!,
        rentDetailsId: rentDetailsData[0].rentDetailsId!,
        landlordId: CLERK_USER_ID!,
        isShared: false,
        isFurnished: true,
        furnishedType: 'fully',
        visibilityStatus: 'listed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        propertyId: uuidv4(),
        title: 'Luxury Villa in Amsterdam',
        description: 'A stunning villa with a private pool and garden, perfect for a family.',
        houseTypeId: houseTypesData[1].houseTypeId!,
        locationId: locationsData[1].locationId!,
        rentDetailsId: rentDetailsData[1].rentDetailsId!,
        landlordId: CLERK_USER_ID!,
        isShared: false,
        isFurnished: true,
        furnishedType: 'fully',
        visibilityStatus: 'listed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        propertyId: uuidv4(),
        title: 'Single Room in Shared House, Utrecht',
        description: 'A budget-friendly room in a shared house with great roommates.',
        houseTypeId: houseTypesData[2].houseTypeId!,
        locationId: locationsData[2].locationId!,
        rentDetailsId: rentDetailsData[2].rentDetailsId!,
        landlordId: CLERK_USER_ID!,
        isShared: true,
        sharedWith: 3,
        isFurnished: true,
        furnishedType: 'partially',
        visibilityStatus: 'listed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await db.insert(properties).values(propertiesData);

    // Adding Property Amenities
    const propertyAmenitiesData: PropertyAmenityInsert[] = [
      {
        propertyAmenityId: uuidv4(),
        propertyId: propertiesData[0].propertyId!,
        amenityId: amenitiesData[0].amenityId!,
      },
      {
        propertyAmenityId: uuidv4(),
        propertyId: propertiesData[0].propertyId!,
        amenityId: amenitiesData[1].amenityId!,
      },
      {
        propertyAmenityId: uuidv4(),
        propertyId: propertiesData[1].propertyId!,
        amenityId: amenitiesData[2].amenityId!,
      },
      {
        propertyAmenityId: uuidv4(),
        propertyId: propertiesData[1].propertyId!,
        amenityId: amenitiesData[3].amenityId!,
      },
      {
        propertyAmenityId: uuidv4(),
        propertyId: propertiesData[2].propertyId!,
        amenityId: amenitiesData[0].amenityId!,
      },
    ];
    await db.insert(propertyAmenities).values(propertyAmenitiesData);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();
