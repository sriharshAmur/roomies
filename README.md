# Rooomies 🏠✨

Welcome to **Rooomies**, a housing web application designed to make finding homes and tenants easier and more personalized! Whether you're a tenant searching for the perfect place or a landlord looking for an ideal tenant, rooomies has got you covered.

Hosted at: [rooomies.app](https://rooomies.app)

## 🚀 Overview

rooomies is a platform aimed at creating an effortless experience for tenants and landlords. It connects people based on their preferences to create a better housing experience. Forget about the hassle of searching through endless listings; rooomies aims to bring you personalized recommendations that match your requirements.

## 🎯 Features

- **Role Toggle**: Switch between Tenant and Landlord modes effortlessly.
- **Property Listings**: Landlords can easily create and manage property listings.
- **Search and Filters**: Tenants can search for listings that match their needs, with options to filter by location, price, and type.
- **Favorites**: Tenants can favorite properties to keep track of them.
- **Personalized Dashboard**: A unique dashboard for both tenants and landlords to manage listings, favorites, and more.

## 🔧 Technologies Used

- **Next.js (v14.2)** with App Router and React Server Components for a modern, seamless experience.
- **Tailwind CSS** for a responsive and beautiful design.
- **shadcn** for UI components.
- **Drizzle ORM** and **Neon DB** for robust data management.
- **Clerk.js** for easy and secure authentication (Google & GitHub supported).
- **Vercel** for hosting.

## 🛠️ Getting Started

1. **Clone the repository**:

   ```sh
   git clone https://github.com/sriharshAmur/roomies-app.git
   cd roomies-app
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Run the app locally**:

   ```sh
   npm run dev
   ```

4. **Visit**: Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Migration, Push, and Seeding Instructions

Follow these steps to migrate, push, and seed your database using Drizzle and Neon DB.

### Step 1: Migration

Use Drizzle to create and apply migrations to your database.

```sh
npx drizzle-kit generate
npx drizzle-kit migration
```

### Step 2: Pushing Migration to Database

This will push your generated migrations to Neon DB:

```sh
npx drizzle-kit push
```

### Step 3: Seeding the Database

Run the following command to seed your database with the initial data:

```sh
npx tsx src/db/seed.ts
```

This command runs the seeding script and populates the database with the necessary records, such as properties, locations, and amenities.

### Notes

- Make sure to set the environment variables correctly, including the `DATABASE_URL` and `CLERK_USER_ID`, in your `.env.local` file.
- If you want to clear all data and re-seed the database, you can drop all tables or use the relevant Drizzle command, then run the migration and seed commands again.

## 🔑 Authentication

We use **Clerk.js** for authentication. Users can log in using Google or GitHub. Depending on the role they select (tenant or landlord), they will have different dashboard views.

## 📦 Deployment

Rooomies is hosted on **Vercel** for easy scalability and excellent performance. To deploy your own version, push to your repository, and connect it to Vercel.

**Happy Renting! 🏡💙**
