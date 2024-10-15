import { db } from '@/db';
import Filters from './Filters';
import Search from './Search';
import Property from './Property';
import { PropertyWithDetails } from '@/types';

async function getProperties() {
  // return Array(10).fill({
  //   id: 1,
  //   title: 'Cozy Apartment in Enschede',
  //   rent: 1200,
  //   image: '/placeholder.svg?height=200&width=300',
  //   location: 'Enschede, Netherlands',
  //   bedrooms: 2,
  //   bathrooms: 1,
  //   furnished: 'Fully Furnished',
  //   type: 'Apartment',
  // });ś

  const propertiesWithDetails: PropertyWithDetails[] = await db.query.properties.findMany({
    with: {
      houseType: true,
      location: true,
      rentDetail: true,
      images: true,
    },
  });

  return propertiesWithDetails;
}

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='lg:mb-8'>
        <h1 className='text-2xl font-medium  text-foreground mb-4'>Find Your Perfect Home</h1>
        <Search />
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='w-full lg:w-1/4'>
          <Filters />
        </div>
        <div className='w-full lg:w-3/4'>
          <div className='mb-6'>
            <h2 className='text-xl font-semibold  text-foreground'>{properties.length} Available Properties </h2>
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
