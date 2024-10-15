import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { PropertyWithDetails } from '@/types';
import { format } from 'date-fns';
import { ArrowRight, Bath, Bed, CalendarDays, Car, Dog, MapPin, Sofa, TreePine } from 'lucide-react';
import Image from 'next/image';

interface PropertyCardProps {
  property: PropertyWithDetails;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const getFurnishedLabel = (type: string) => {
    switch (type) {
      case 'fully':
        return 'Fully Furnished';
      case 'partially':
        return 'Partially Furnished';
      case 'unfurnished':
        return 'Unfurnished';
      default:
        return 'N/A';
    }
  };

  return (
    <Card className='overflow-hidden transition-all duration-300 hover:shadow-lg rounded-lg border border-border'>
      <div className='relative'>
        <Image
          src={property.images[0]?.imageUrl || '/images/apartment.jpg'}
          alt={property.title}
          width={400}
          height={250}
          className='w-full h-48 object-cover'
        />
        <Badge className='absolute top-2 right-2 bg-accent text-accent-foreground font-medium text-xs'>
          {property.houseType.name}
        </Badge>
      </div>
      <CardHeader className='py-3 px-4 space-y-1'>
        <h3 className='text-lg font-semibold text-foreground line-clamp-1'>{property.title}</h3>
        <div className='flex items-center space-x-1 text-sm text-muted-foreground'>
          <MapPin className='h-3 w-3 flex-shrink-0 text-primary' />
          <span className='truncate'>
            {property.location.city}, {property.location.state} {property.location.postalCode}
          </span>
        </div>
      </CardHeader>
      <CardContent className='px-4 pb-2 space-y-3'>
        <div className='flex justify-between text-sm text-foreground'>
          <div className='flex items-center space-x-1'>
            <Bed className='h-4 w-4 text-primary' />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className='flex items-center space-x-1'>
            <Bath className='h-4 w-4 text-primary' />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className='flex items-center space-x-1'>
            <Sofa className='h-4 w-4 text-primary' />
            <span className='truncate'>{getFurnishedLabel(property.furnishedType)}</span>
          </div>
        </div>
        {property.parkingAvailable && property.petFriendly && property.gardenAvailable && (
          <div className='flex flex-wrap gap-1'>
            {property.parkingAvailable && (
              <Badge variant='outline' className='text-xs py-0 h-5'>
                <Car className='h-3 w-3 mr-1' />
                Parking
              </Badge>
            )}
            {property.petFriendly && (
              <Badge variant='outline' className='text-xs py-0 h-5'>
                <Dog className='h-3 w-3 mr-1' />
                Pet Friendly
              </Badge>
            )}
            {property.gardenAvailable && (
              <Badge variant='outline' className='text-xs py-0 h-5'>
                <TreePine className='h-3 w-3 mr-1' />
                Garden
              </Badge>
            )}
          </div>
        )}
        {property.availableFrom && (
          <div className='text-xs text-muted-foreground flex items-center space-x-1'>
            <CalendarDays className='h-3 w-3 text-primary' />
            <span>Available from: {format(new Date(property.availableFrom), 'MMM d, yyyy')}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className='flex justify-between items-center py-3 px-4 border-t border-border'>
        <div className='flex items-baseline space-x-1'>
          <span className='text-lg font-semibold text-primary'>{property.rentDetail.rentAmount}</span>
          <span className='text-xs text-muted-foreground'>{property.rentDetail.currency}/mo</span>
        </div>
        <Button size='sm' className='bg-primary hover:bg-primary/90 text-primary-foreground'>
          View
          <ArrowRight className='ml-1 h-3 w-3' />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
