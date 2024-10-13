import { db } from '@/db';
import Filters from './Filters';
import Search from './Search';
import Property from './Property';
import { SelectProperties } from '@/db/schema';

async function getProperties() {
  // return db.query.properties.findMany();
  return Array(10).fill({
    id: 1,
    title: 'Cozy Apartment in Enschede',
    rent: 1200,
    image: '/placeholder.svg?height=200&width=300',
    location: 'Enschede, Netherlands',
    bedrooms: 2,
    bathrooms: 1,
    furnished: 'Fully Furnished',
    type: 'Apartment',
  });
}

export default async function PropertiesPage() {
  const properties = (await getProperties()) as SelectProperties[];

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-2xl font-medium text-gray-700 mb-4'>Find Your Perfect Home</h1>
        <Search />
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='w-full lg:w-1/4'>
          <div className='sticky top-20 lg:top-24'>
            <Filters />
          </div>
        </div>
        <div className='w-full lg:w-3/4'>
          <div className='mb-6'>
            <h2 className='text-xl font-semibold text-gray-800'>Available Properties</h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
            {properties.map((property, index) => (
              <Property key={`${property.id}-${index}`} property={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
