'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Car, Euro, Home, Lightbulb, MapPin, PawPrint, SlidersHorizontal, Sparkles } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Mock data (replace with actual data from your schema)
const cities = ['Enschede', 'Amsterdam', 'Utrecht', 'Rotterdam', 'The Hague'];
const houseTypes = ['Apartment', 'Studio', 'House', 'Room'];
const furnishedTypes = ['Fully Furnished', 'Partially Furnished', 'Unfurnished'];

const PriceControl = ({ value, onChange }) => {
  return (
    <div className='grid gap-4 w-full'>
      <Slider
        defaultValue={value}
        value={value}
        max={5000}
        min={0}
        step={50}
        onValueChange={onChange}
        className={cn('w-full')}
      />
      <div className='flex gap-2 flex-wrap'>
        <ol className='flex items-center w-full gap-3'>
          {value.map((val, index) => (
            <li key={index} className='flex items-center justify-between w-full border px-3 h-10 rounded-md'>
              <span>€</span>
              <Input
                type='number'
                value={val}
                onChange={(e) => {
                  const newValue = [...value];
                  newValue[index] = Number(e.target.value);
                  onChange(newValue);
                }}
                className='w-20 h-8 text-sm'
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [rentRange, setRentRange] = useState([
    parseInt(searchParams.get('minRent') || '600'),
    parseInt(searchParams.get('maxRent') || '2500'),
  ]);
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '');
  const [selectedHouseTypes, setSelectedHouseTypes] = useState<string[]>(
    searchParams.get('houseTypes')?.split(',') || []
  );
  const [selectedFurnishedTypes, setSelectedFurnishedTypes] = useState<string[]>(
    searchParams.get('furnishedTypes')?.split(',') || []
  );
  const [isPetFriendly, setIsPetFriendly] = useState(searchParams.get('petFriendly') === 'true');
  const [isUtilitiesIncluded, setIsUtilitiesIncluded] = useState(searchParams.get('utilitiesIncluded') === 'true');
  const [isParkingAvailable, setIsParkingAvailable] = useState(searchParams.get('parkingAvailable') === 'true');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const resetFilters = () => {
    setRentRange([600, 2500]);
    setSelectedCity('');
    setSelectedHouseTypes([]);
    setSelectedFurnishedTypes([]);
    setIsPetFriendly(false);
    setIsUtilitiesIncluded(false);
    setIsParkingAvailable(false);
    router.replace(pathname);
  };

  const applyFiltersAndUpdateURL = () => {
    const params = new URLSearchParams(searchParams);
    const defaultFilters = {
      minRent: '600',
      maxRent: '2500',
      city: '',
      houseTypes: [],
      furnishedTypes: [],
      petFriendly: 'false',
      utilitiesIncluded: 'false',
      parkingAvailable: 'false',
    };

    const currentFilters = {
      minRent: rentRange[0].toString(),
      maxRent: rentRange[1].toString(),
      city: selectedCity,
      houseTypes: selectedHouseTypes,
      furnishedTypes: selectedFurnishedTypes,
      petFriendly: isPetFriendly.toString(),
      utilitiesIncluded: isUtilitiesIncluded.toString(),
      parkingAvailable: isParkingAvailable.toString(),
    };

    Object.entries(currentFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0 && value.join(',') !== defaultFilters[key].join(',')) {
          params.set(key, value.join(','));
        } else {
          params.delete(key);
        }
      } else if (value !== defaultFilters[key]) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const newPathname = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newPathname);

    if (isMobile) {
      setIsDrawerOpen(false);
    }
  };

  const FilterContent = () => (
    <div className='space-y-6'>
      <div>
        <Label className='text-sm font-medium flex items-center mb-2'>
          <MapPin className='w-4 h-4 mr-2 text-primary' />
          Location
        </Label>
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Select city' />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city.toLowerCase()}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className='text-sm font-medium flex items-center mb-2'>
          <Home className='w-4 h-4 mr-2 text-primary' />
          Property Type
        </Label>
        <div className='grid grid-cols-2 gap-2'>
          {houseTypes.map((type) => (
            <div key={type} className='flex items-center space-x-2'>
              <Checkbox
                id={`type-${type}`}
                checked={selectedHouseTypes.includes(type)}
                onCheckedChange={(checked) => {
                  setSelectedHouseTypes(
                    checked ? [...selectedHouseTypes, type] : selectedHouseTypes.filter((t) => t !== type)
                  );
                }}
              />
              <Label htmlFor={`type-${type}`} className='text-sm'>
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className='text-sm font-medium flex items-center mb-2'>
          <Euro className='w-4 h-4 mr-2 text-primary' />
          Rent Range
        </Label>
        <PriceControl value={rentRange} onChange={setRentRange} />
      </div>

      <div>
        <Label className='text-sm font-medium flex items-center mb-2'>
          <Home className='w-4 h-4 mr-2 text-primary' />
          Furnishing
        </Label>
        <div className='space-y-2'>
          {furnishedTypes.map((type) => (
            <div key={type} className='flex items-center space-x-2'>
              <Checkbox
                id={`furnished-${type}`}
                checked={selectedFurnishedTypes.includes(type)}
                onCheckedChange={(checked) => {
                  setSelectedFurnishedTypes(
                    checked ? [...selectedFurnishedTypes, type] : selectedFurnishedTypes.filter((t) => t !== type)
                  );
                }}
              />
              <Label htmlFor={`furnished-${type}`} className='text-sm'>
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className='text-sm font-medium flex items-center mb-2'>
          <Sparkles className='w-4 h-4 mr-2 text-primary' />
          Amenities
        </Label>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <Label htmlFor='pet-friendly' className='flex items-center space-x-2 text-sm'>
              <PawPrint className='h-4 w-4 text-primary' />
              <span>Pet Friendly</span>
            </Label>
            <Switch id='pet-friendly' checked={isPetFriendly} onCheckedChange={setIsPetFriendly} />
          </div>
          <div className='flex items-center justify-between'>
            <Label htmlFor='utilities-included' className='flex items-center space-x-2 text-sm'>
              <Lightbulb className='h-4 w-4 text-primary' />
              <span>Utilities Included</span>
            </Label>
            <Switch id='utilities-included' checked={isUtilitiesIncluded} onCheckedChange={setIsUtilitiesIncluded} />
          </div>
          <div className='flex items-center justify-between'>
            <Label htmlFor='parking-available' className='flex items-center space-x-2 text-sm'>
              <Car className='h-4 w-4 text-primary' />
              <span>Parking Available</span>
            </Label>
            <Switch id='parking-available' checked={isParkingAvailable} onCheckedChange={setIsParkingAvailable} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isMobile ? (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant='outline' size='sm' className='fixed bottom-4 right-4 z-50 rounded-full shadow-lg'>
              <SlidersHorizontal className='w-4 h-4 mr-2' />
              Filters
            </Button>
          </DrawerTrigger>
          <DrawerContent className='h-[85vh]'>
            <DrawerHeader className='border-b border-border pb-4 mb-4'>
              <DrawerTitle className='text-lg font-semibold'>Filters</DrawerTitle>
            </DrawerHeader>
            <div className='px-4 pb-8 overflow-y-auto h-full'>
              <div className='flex justify-between space-x-4 mb-6'>
                <Button variant='outline' onClick={resetFilters} className='flex-1'>
                  Reset
                </Button>
                <Button onClick={applyFiltersAndUpdateURL} className='flex-1'>
                  Apply
                </Button>
              </div>
              <FilterContent />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Card className='w-full bg-background text-foreground shadow-md'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-xl font-semibold'>Filters</CardTitle>
          </CardHeader>
          <CardContent className='pt-0 px-4'>
            <div className='flex justify-between space-x-4 mb-6'>
              <Button variant='outline' onClick={resetFilters} className='flex-1'>
                Reset
              </Button>
              <Button onClick={applyFiltersAndUpdateURL} className='flex-1'>
                Apply
              </Button>
            </div>
            <FilterContent />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Filters;
