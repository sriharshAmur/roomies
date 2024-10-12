DO $$ BEGIN
 CREATE TYPE "public"."action_type" AS ENUM('viewed', 'saved', 'applied');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."application_status" AS ENUM('pending', 'approved', 'rejected');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."furnished_type" AS ENUM('fully', 'partially', 'unfurnished');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."visibility_status" AS ENUM('listed', 'draft', 'archived');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "amenities" (
	"amenity_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" varchar(256),
	"icon" varchar(100)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "applications" (
	"application_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"tenant_id" varchar(100) NOT NULL,
	"status" "application_status" NOT NULL,
	"message" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "favorites" (
	"favorite_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" varchar(100) NOT NULL,
	"property_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "house_types" (
	"house_type_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" varchar(512)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "locations" (
	"location_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"address" varchar(256) NOT NULL,
	"city" varchar(100) NOT NULL,
	"state" varchar(100) NOT NULL,
	"country" varchar(100) NOT NULL,
	"postal_code" varchar(20) NOT NULL,
	"latitude" numeric(10, 6),
	"longitude" numeric(10, 6),
	"nearby_amenities" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "properties" (
	"property_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"house_type_id" uuid NOT NULL,
	"location_id" uuid NOT NULL,
	"rent_details_id" uuid NOT NULL,
	"landlord_id" varchar(100) NOT NULL,
	"is_shared" boolean NOT NULL,
	"shared_with" integer,
	"is_furnished" boolean NOT NULL,
	"furnished_type" "furnished_type" NOT NULL,
	"square_feet" numeric(10, 2),
	"type_of_flooring" varchar(100),
	"energy_efficiency_rating" varchar(50),
	"visibility_status" "visibility_status" NOT NULL,
	"utilities_included" boolean,
	"pet_friendly" boolean,
	"parking_available" boolean,
	"is_bathroom_shared" boolean,
	"is_kitchen_shared" boolean,
	"garden_available" boolean,
	"storage_room_available" boolean,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "property_amenities" (
	"property_amenity_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"amenity_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "property_images" (
	"property_image_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"image_url" varchar(512) NOT NULL,
	"is_primary" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rent_details" (
	"rent_details_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"rent_amount" numeric(10, 2) NOT NULL,
	"currency" varchar(10) NOT NULL,
	"security_deposit" numeric(10, 2) NOT NULL,
	"utility_costs" numeric(10, 2),
	"other_charges" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reviews" (
	"review_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"tenant_id" varchar(100) NOT NULL,
	"rating" integer NOT NULL,
	"comments" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tenant_preferences" (
	"preference_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" varchar(100) NOT NULL,
	"preferred_rent_range_min" numeric(10, 2),
	"preferred_rent_range_max" numeric(10, 2),
	"preferred_location" varchar(256),
	"preferred_house_type" uuid,
	"pet_friendly" boolean,
	"parking_required" boolean,
	"furnished_preference" "furnished_type",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_interactions" (
	"interaction_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(100) NOT NULL,
	"action_type" "action_type" NOT NULL,
	"property_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "user_messages";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications" ADD CONSTRAINT "applications_property_id_properties_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("property_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorites" ADD CONSTRAINT "favorites_property_id_properties_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("property_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "properties" ADD CONSTRAINT "properties_house_type_id_house_types_house_type_id_fk" FOREIGN KEY ("house_type_id") REFERENCES "public"."house_types"("house_type_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "properties" ADD CONSTRAINT "properties_location_id_locations_location_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("location_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "properties" ADD CONSTRAINT "properties_rent_details_id_rent_details_rent_details_id_fk" FOREIGN KEY ("rent_details_id") REFERENCES "public"."rent_details"("rent_details_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "property_amenities" ADD CONSTRAINT "property_amenities_property_id_properties_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("property_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "property_amenities" ADD CONSTRAINT "property_amenities_amenity_id_amenities_amenity_id_fk" FOREIGN KEY ("amenity_id") REFERENCES "public"."amenities"("amenity_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "property_images" ADD CONSTRAINT "property_images_property_id_properties_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("property_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_property_id_properties_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("property_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tenant_preferences" ADD CONSTRAINT "tenant_preferences_preferred_house_type_house_types_house_type_id_fk" FOREIGN KEY ("preferred_house_type") REFERENCES "public"."house_types"("house_type_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
