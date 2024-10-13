import { pgTable, uuid, varchar, text, boolean, decimal, integer, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm';

// Enums
export const furnishedTypeEnum = pgEnum('furnished_type', ['fully', 'partially', 'unfurnished']);
export const applicationStatusEnum = pgEnum('application_status', ['pending', 'approved', 'rejected']);
export const visibilityStatusEnum = pgEnum('visibility_status', ['listed', 'draft', 'archived']);
export const actionTypeEnum = pgEnum('action_type', ['viewed', 'saved', 'applied']);

// Property Schema
export const properties = pgTable('properties', {
  propertyId: uuid('property_id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description').notNull(),
  houseTypeId: uuid('house_type_id')
    .references(() => houseTypes.houseTypeId)
    .notNull(),
  locationId: uuid('location_id')
    .references(() => locations.locationId)
    .notNull(),
  rentDetailsId: uuid('rent_details_id')
    .references(() => rentDetails.rentDetailsId)
    .notNull(),
  landlordId: varchar('landlord_id', { length: 100 }).notNull(), // Clerk user_id used here
  isShared: boolean('is_shared').notNull(),
  sharedWith: integer('shared_with'),
  isFurnished: boolean('is_furnished').notNull(),
  furnishedType: furnishedTypeEnum('furnished_type').notNull(),
  squareFeet: decimal('square_feet', { precision: 10, scale: 2 }),
  typeOfFlooring: varchar('type_of_flooring', { length: 100 }),
  energyEfficiencyRating: varchar('energy_efficiency_rating', { length: 50 }),
  visibilityStatus: visibilityStatusEnum('visibility_status').notNull(),
  utilitiesIncluded: boolean('utilities_included'),
  petFriendly: boolean('pet_friendly'),
  parkingAvailable: boolean('parking_available'),
  isBathroomShared: boolean('is_bathroom_shared'),
  isKitchenShared: boolean('is_kitchen_shared'),
  gardenAvailable: boolean('garden_available'),
  storageRoomAvailable: boolean('storage_room_available'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// HouseType Schema
export const houseTypes = pgTable('house_types', {
  houseTypeId: uuid('house_type_id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  description: varchar('description', { length: 512 }),
});

// Location Schema
export const locations = pgTable('locations', {
  locationId: uuid('location_id').primaryKey().defaultRandom(),
  address: varchar('address', { length: 256 }).notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  state: varchar('state', { length: 100 }).notNull(),
  country: varchar('country', { length: 100 }).notNull(),
  postalCode: varchar('postal_code', { length: 20 }).notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 6 }),
  longitude: decimal('longitude', { precision: 10, scale: 6 }),
  nearbyAmenities: text('nearby_amenities'), // JSON or serialized array of nearby amenities
});

// RentDetails Schema
export const rentDetails = pgTable('rent_details', {
  rentDetailsId: uuid('rent_details_id').primaryKey().defaultRandom(),
  rentAmount: decimal('rent_amount', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 10 }).notNull(),
  securityDeposit: decimal('security_deposit', { precision: 10, scale: 2 }).notNull(),
  utilityCosts: decimal('utility_costs', { precision: 10, scale: 2 }),
  otherCharges: decimal('other_charges', { precision: 10, scale: 2 }),
});

// Application Schema
export const applications = pgTable('applications', {
  applicationId: uuid('application_id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id')
    .references(() => properties.propertyId)
    .notNull(),
  tenantId: varchar('tenant_id', { length: 100 }).notNull(), // Clerk user_id used here
  status: applicationStatusEnum('status').notNull(),
  message: text('message'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Favorites Schema
export const favorites = pgTable('favorites', {
  favoriteId: uuid('favorite_id').primaryKey().defaultRandom(),
  tenantId: varchar('tenant_id', { length: 100 }).notNull(), // Clerk user_id used here
  propertyId: uuid('property_id')
    .references(() => properties.propertyId)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Amenities Schema
export const amenities = pgTable('amenities', {
  amenityId: uuid('amenity_id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  description: varchar('description', { length: 256 }),
  icon: varchar('icon', { length: 100 }),
});

// PropertyAmenities Schema
export const propertyAmenities = pgTable('property_amenities', {
  propertyAmenityId: uuid('property_amenity_id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id')
    .references(() => properties.propertyId)
    .notNull(),
  amenityId: uuid('amenity_id')
    .references(() => amenities.amenityId)
    .notNull(),
});

// PropertyImages Schema
export const propertyImages = pgTable('property_images', {
  propertyImageId: uuid('property_image_id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id')
    .references(() => properties.propertyId)
    .notNull(),
  imageUrl: varchar('image_url', { length: 512 }).notNull(),
  isPrimary: boolean('is_primary').notNull(),
});

// UserInteractions Schema
export const userInteractions = pgTable('user_interactions', {
  interactionId: uuid('interaction_id').primaryKey().defaultRandom(),
  userId: varchar('user_id', { length: 100 }).notNull(), // Clerk user_id used here
  actionType: actionTypeEnum('action_type').notNull(),
  propertyId: uuid('property_id'), // Optional, depending on the action type
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// TenantPreferences Schema
export const tenantPreferences = pgTable('tenant_preferences', {
  preferenceId: uuid('preference_id').primaryKey().defaultRandom(),
  tenantId: varchar('tenant_id', { length: 100 }).notNull(), // Clerk user_id used here
  preferredRentRangeMin: decimal('preferred_rent_range_min', { precision: 10, scale: 2 }),
  preferredRentRangeMax: decimal('preferred_rent_range_max', { precision: 10, scale: 2 }),
  preferredLocation: varchar('preferred_location', { length: 256 }),
  preferredHouseType: uuid('preferred_house_type').references(() => houseTypes.houseTypeId),
  petFriendly: boolean('pet_friendly'),
  parkingRequired: boolean('parking_required'),
  furnishedPreference: furnishedTypeEnum('furnished_preference'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Reviews Schema
export const reviews = pgTable('reviews', {
  reviewId: uuid('review_id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id')
    .references(() => properties.propertyId)
    .notNull(),
  tenantId: varchar('tenant_id', { length: 100 }).notNull(), // Clerk user_id used here
  rating: integer('rating').notNull(),
  comments: text('comments'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// export types of all schemas
export type SelectProperties = InferSelectModel<typeof properties>;
export type InsertProperties = InferInsertModel<typeof properties>;
export type SelectHouseTypes = InferSelectModel<typeof houseTypes>;
export type InsertHouseTypes = InferInsertModel<typeof houseTypes>;
export type SelectLocations = InferSelectModel<typeof locations>;
export type InsertLocations = InferInsertModel<typeof locations>;
export type SelectRentDetails = InferSelectModel<typeof rentDetails>;
export type InsertRentDetails = InferInsertModel<typeof rentDetails>;
export type SelectApplications = InferSelectModel<typeof applications>;
export type InsertApplications = InferInsertModel<typeof applications>;
export type SelectFavorites = InferSelectModel<typeof favorites>;
export type InsertFavorites = InferInsertModel<typeof favorites>;
export type SelectAmenities = InferSelectModel<typeof amenities>;
export type InsertAmenities = InferInsertModel<typeof amenities>;
export type SelectPropertyAmenities = InferSelectModel<typeof propertyAmenities>;
export type InsertPropertyAmenities = InferInsertModel<typeof propertyAmenities>;
export type SelectPropertyImages = InferSelectModel<typeof propertyImages>;
export type InsertPropertyImages = InferInsertModel<typeof propertyImages>;
export type SelectUserInteractions = InferSelectModel<typeof userInteractions>;
export type InsertUserInteractions = InferInsertModel<typeof userInteractions>;
export type SelectTenantPreferences = InferSelectModel<typeof tenantPreferences>;
export type InsertTenantPreferences = InferInsertModel<typeof tenantPreferences>;
export type SelectReviews = InferSelectModel<typeof reviews>;
export type InsertReviews = InferInsertModel<typeof reviews>;

// Exporting all schemas
export default {
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
};
