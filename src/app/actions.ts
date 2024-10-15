'use server';

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db';
import { properties } from '../db/schema';
import { InferInsertModel } from 'drizzle-orm';

export async function addProperty(formData: FormData) {
  const user = await currentUser();
  if (!user) throw new Error('User not found');

  // Validate form data
  const title = formData.get('title')?.toString();
  const description = formData.get('description')?.toString();
  const rentAmount = parseFloat(formData.get('rentAmount')?.toString() || '0');
  const furnishedType = formData.get('furnishedType')?.toString() as 'fully' | 'partially' | 'unfurnished';

  if (!title || !description || isNaN(rentAmount) || rentAmount <= 0 || !furnishedType) {
    throw new Error('Please fill in all required fields correctly.');
  }

  const newPropertyId = uuidv4();

  const newProperty: InferInsertModel<typeof properties> = {
    id: newPropertyId,
    title,
    description,
    landlordId: user.id,
    houseTypeId: formData.get('houseTypeId')!.toString(),
    locationId: formData.get('locationId')!.toString(),
    rentDetailsId: formData.get('rentDetailsId')!.toString(),
    isShared: formData.get('isShared') === 'true',
    isFurnished: formData.get('isFurnished') === 'true',
    furnishedType,
    visibilityStatus: 'listed',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.insert(properties).values(newProperty);

  redirect(`/landlord/dashboard/${newPropertyId}`);
}
