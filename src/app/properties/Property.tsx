import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SelectProperties } from '@/db/schema';
import { Bath, Bed, DollarSign, Home, MapPin } from 'lucide-react';

interface PropertyProps {
  property: SelectProperties;
}

const Property = ({ property }: PropertyProps) => {
  return (
    <Card className='overflow-hidden transition-all duration-300 hover:shadow-lg'>
      <div className='relative'>
        <img src={property.image} alt={property.title} className='w-full h-56 object-cover' />
        <div className='absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700 shadow'>
          {property.type}
        </div>
      </div>
      <CardHeader className='pb-2 pt-4'>
        <CardTitle className='text-lg font-semibold text-gray-800 line-clamp-1'>{property.title}</CardTitle>
        <div className='flex items-center space-x-1 text-sm text-gray-500 mt-1'>
          <MapPin className='h-4 w-4 flex-shrink-0' />
          <span className='truncate'>{property.location}</span>
        </div>
      </CardHeader>
      <CardContent className='pb-2'>
        <div className='flex justify-between text-sm text-gray-600 mb-2'>
          <div className='flex items-center space-x-1'>
            <Bed className='h-4 w-4 text-gray-400' />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className='flex items-center space-x-1'>
            <Bath className='h-4 w-4 text-gray-400' />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className='flex items-center space-x-1'>
            <Home className='h-4 w-4 text-gray-400' />
            <span>{property.furnished}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between items-center pt-4 border-t'>
        <div className='flex items-center space-x-1'>
          <DollarSign className='h-5 w-5 text-green-500' />
          <span className='text-xl font-bold text-gray-800'>{property.rent}</span>
          <span className='text-gray-500 text-sm'>/ month</span>
        </div>
        <Button size='sm' className='transition-colors duration-200'>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Property;
