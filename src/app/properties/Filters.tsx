'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

const Filters = () => {
  const [rentRange, setRentRange] = useState([600, 2500]);

  return (
    <div className='md:col-span-1'>
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <Label>City</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Select city' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='enschede'>Enschede</SelectItem>
                <SelectItem value='amsterdam'>Amsterdam</SelectItem>
                <SelectItem value='utrecht'>Utrecht</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Rent Range</Label>
            <Slider min={0} max={5000} step={100} value={rentRange} onValueChange={setRentRange} />
            <div className='flex justify-between text-sm text-gray-500'>
              <span>{rentRange[0]} EUR</span>
              <span>{rentRange[1]} EUR</span>
            </div>
          </div>
          <div>
            <Label>Furnished Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Select type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='fully'>Fully Furnished</SelectItem>
                <SelectItem value='partially'>Partially Furnished</SelectItem>
                <SelectItem value='unfurnished'>Unfurnished</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Property Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Select type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='apartment'>Apartment</SelectItem>
                <SelectItem value='villa'>Villa</SelectItem>
                <SelectItem value='room'>Room</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex items-center space-x-2'>
            <Switch id='pet-friendly' />
            <Label htmlFor='pet-friendly'>Pet Friendly</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Switch id='utilities-included' />
            <Label htmlFor='utilities-included'>Utilities Included</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Switch id='parking-available' />
            <Label htmlFor='parking-available'>Parking Available</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Filters;
