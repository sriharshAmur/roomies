import { relations, type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import {
  boolean,
  decimal,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

// Enums
export const furnishedTypeEnum = pgEnum('furnished_type', ['fully', 'partially', 'unfurnished']);
export const applicationStatusEnum = pgEnum('application_status', ['pending', 'approved', 'rejected']);
export const visibilityStatusEnum = pgEnum('visibility_status', ['listed', 'draft', 'archived']);
export const actionTypeEnum = pgEnum('action_type', ['viewed', 'saved', 'applied']);

// Property Schema
export const properties = pgTable(
  'properties',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 256 }).notNull(),
    description: text('description').notNull(),
    houseTypeId: uuid('house_type_id')
      .references(() => houseTypes.id, { onDelete: 'cascade' })
      .notNull(),
    locationId: uuid('location_id')
      .references(() => locations.id, { onDelete: 'cascade' })
      .notNull(),
    rentDetailsId: uuid('rent_details_id')
      .references(() => rentDetails.id, { onDelete: 'cascade' })
      .notNull(),
    landlordId: varchar('landlord_id', { length: 100 }).notNull(),
    isShared: boolean('is_shared').notNull(),
    sharedWith: integer('shared_with'),
    isFurnished: boolean('is_furnished').notNull(),
    furnishedType: furnishedTypeEnum('furnished_type').notNull(),
    squareFeet: decimal('square_feet', { precision: 10, scale: 2 }),
    typeOfFlooring: varchar('type_of_flooring', { length: 100 }),
    energyEfficiencyRating: varchar('energy_efficiency_rating', { length: 50 }),
    visibilityStatus: visibilityStatusEnum('visibility_status').default('draft').notNull(),
    utilitiesIncluded: boolean('utilities_included'),
    petFriendly: boolean('pet_friendly'),
    parkingAvailable: boolean('parking_available'),
    isBathroomShared: boolean('is_bathroom_shared'),
    isKitchenShared: boolean('is_kitchen_shared'),
    gardenAvailable: boolean('garden_available'),
    balconyAvailable: boolean('balcony_available'),
    storageRoomAvailable: boolean('storage_room_available'),
    bedrooms: integer('bedrooms'),
    bathrooms: integer('bathrooms'),
    availableFrom: timestamp('available_from'),
    leaseDurationMin: integer('lease_duration_min'),
    leaseDurationMax: integer('lease_duration_max'),
    yearBuilt: integer('year_built'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => {
    return {
      locationIndex: index('location_idx').on(table.locationId),
      landlordIndex: index('landlord_idx').on(table.landlordId),
    };
  }
);

export const propertiesRelations = relations(properties, ({ one, many }) => ({
  houseType: one(houseTypes, {
    fields: [properties.houseTypeId],
    references: [houseTypes.id],
  }),
  location: one(locations, {
    fields: [properties.locationId],
    references: [locations.id],
  }),
  rentDetail: one(rentDetails, {
    fields: [properties.rentDetailsId],
    references: [rentDetails.id],
  }),
  applications: many(applications),
  favorites: many(favorites),
  amenities: many(propertyAmenities),
  images: many(propertyImages),
  reviews: many(reviews),
}));

// HouseType Schema
export const houseTypes = pgTable('house_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  description: varchar('description', { length: 512 }),
});

// Location Schema
export const locations = pgTable('locations', {
  id: uuid('id').primaryKey().defaultRandom(),
  address: varchar('address', { length: 256 }).notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  state: varchar('state', { length: 100 }).notNull(),
  country: varchar('country', { length: 100 }).notNull(),
  postalCode: varchar('postal_code', { length: 20 }).notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 6 }),
  longitude: decimal('longitude', { precision: 10, scale: 6 }),
});

// RentDetails Schema
export const rentDetails = pgTable('rent_details', {
  id: uuid('id').primaryKey().defaultRandom(),
  rentAmount: decimal('rent_amount', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 10 }).notNull(),
  securityDeposit: decimal('security_deposit', { precision: 10, scale: 2 }).notNull(),
  utilityCosts: decimal('utility_costs', { precision: 10, scale: 2 }),
  otherCharges: decimal('other_charges', { precision: 10, scale: 2 }),
});

// Application Schema
export const applications = pgTable('applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id')
    .references(() => properties.id, { onDelete: 'cascade' })
    .notNull(),
  tenantId: varchar('tenant_id', { length: 100 }).notNull(),
  status: applicationStatusEnum('status').notNull(),
  message: text('message'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});

export const applicationsRelations = relations(applications, ({ one }) => ({
  property: one(properties, {
    fields: [applications.propertyId],
    references: [properties.id],
  }),
}));

// Favorites Schema
export const favorites = pgTable(
  'favorites',
  {
    tenantId: varchar('tenant_id', { length: 100 }).notNull(),
    propertyId: uuid('property_id')
      .references(() => properties.id, { onDelete: 'cascade' })
      .notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => {
    return {
      pk: primaryKey(table.tenantId, table.propertyId),
    };
  }
);

export const favoritesRelations = relations(favorites, ({ one }) => ({
  property: one(properties, {
    fields: [favorites.propertyId],
    references: [properties.id],
  }),
}));

// Amenities Schema
export const amenities = pgTable('amenities', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  description: varchar('description', { length: 256 }),
  icon: varchar('icon', { length: 100 }),
});

// PropertyAmenities Schema
export const propertyAmenities = pgTable(
  'property_amenities',
  {
    propertyId: uuid('property_id')
      .references(() => properties.id, { onDelete: 'cascade' })
      .notNull(),
    amenityId: uuid('amenity_id')
      .references(() => amenities.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey(table.propertyId, table.amenityId),
    };
  }
);

export const propertyAmenitiesRelations = relations(propertyAmenities, ({ one }) => ({
  property: one(properties, {
    fields: [propertyAmenities.propertyId],
    references: [properties.id],
  }),
  amenity: one(amenities, {
    fields: [propertyAmenities.amenityId],
    references: [amenities.id],
  }),
}));

// PropertyImages Schema
export const propertyImages = pgTable('property_images', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id')
    .references(() => properties.id, { onDelete: 'cascade' })
    .notNull(),
  imageUrl: varchar('image_url', { length: 512 }).notNull(),
  isPrimary: boolean('is_primary').notNull(),
});

export const propertyImagesRelations = relations(propertyImages, ({ one }) => ({
  property: one(properties, {
    fields: [propertyImages.propertyId],
    references: [properties.id],
  }),
}));

// UserInteractions Schema
export const userInteractions = pgTable('user_interactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: varchar('user_id', { length: 100 }).notNull(),
  actionType: actionTypeEnum('action_type').notNull(),
  propertyId: uuid('property_id').references(() => properties.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const userInteractionsRelations = relations(userInteractions, ({ one }) => ({
  property: one(properties, {
    fields: [userInteractions.propertyId],
    references: [properties.id],
  }),
}));

// TenantPreferences Schema
export const tenantPreferences = pgTable('tenant_preferences', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: varchar('tenant_id', { length: 100 }).notNull(),
  preferredRentRangeMin: decimal('preferred_rent_range_min', { precision: 10, scale: 2 }),
  preferredRentRangeMax: decimal('preferred_rent_range_max', { precision: 10, scale: 2 }),
  preferredLocation: varchar('preferred_location', { length: 256 }),
  preferredHouseType: uuid('preferred_house_type').references(() => houseTypes.id),
  petFriendly: boolean('pet_friendly'),
  parkingRequired: boolean('parking_required'),
  furnishedPreference: furnishedTypeEnum('furnished_preference'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});

export const tenantPreferencesRelations = relations(tenantPreferences, ({ one }) => ({
  houseType: one(houseTypes, {
    fields: [tenantPreferences.preferredHouseType],
    references: [houseTypes.id],
  }),
}));

// Reviews Schema
export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id')
    .references(() => properties.id, { onDelete: 'cascade' })
    .notNull(),
  tenantId: varchar('tenant_id', { length: 100 }).notNull(),
  rating: integer('rating').notNull(),
  comments: text('comments'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  property: one(properties, {
    fields: [reviews.propertyId],
    references: [properties.id],
  }),
}));

// Export types of all schemas
export type PropertySelect = InferSelectModel<typeof properties>;
export type PropertyInsert = InferInsertModel<typeof properties>;
export type HouseTypeSelect = InferSelectModel<typeof houseTypes>;
export type HouseTypeInsert = InferInsertModel<typeof houseTypes>;
export type LocationSelect = InferSelectModel<typeof locations>;
export type LocationInsert = InferInsertModel<typeof locations>;
export type RentDetailSelect = InferSelectModel<typeof rentDetails>;
export type RentDetailInsert = InferInsertModel<typeof rentDetails>;
export type ApplicationSelect = InferSelectModel<typeof applications>;
export type ApplicationInsert = InferInsertModel<typeof applications>;
export type FavoriteSelect = InferSelectModel<typeof favorites>;
export type FavoriteInsert = InferInsertModel<typeof favorites>;
export type AmenitySelect = InferSelectModel<typeof amenities>;
export type AmenityInsert = InferInsertModel<typeof amenities>;
export type PropertyAmenitySelect = InferSelectModel<typeof propertyAmenities>;
export type PropertyAmenityInsert = InferInsertModel<typeof propertyAmenities>;
export type PropertyImageSelect = InferSelectModel<typeof propertyImages>;
export type PropertyImageInsert = InferInsertModel<typeof propertyImages>;
export type UserInteractionSelect = InferSelectModel<typeof userInteractions>;
export type UserInteractionInsert = InferInsertModel<typeof userInteractions>;
export type TenantPreferenceSelect = InferSelectModel<typeof tenantPreferences>;
export type TenantPreferenceInsert = InferInsertModel<typeof tenantPreferences>;
export type ReviewSelect = InferSelectModel<typeof reviews>;
export type ReviewInsert = InferInsertModel<typeof reviews>;

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
