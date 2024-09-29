import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

/**
 * This table stores quotes submitted by users.
 */
export const UserMessages = pgTable('user_messages', {
  // This will be the user ID provided by Clerk
  user_id: text('user_id').primaryKey().notNull(),
  createTs: timestamp('create_ts').defaultNow().notNull(),
  message: text('message').notNull(),
});
