import React, { useState } from 'react'
import './Grid.css'
import Spinner from './Spinner';
import { useGetRestaurantsQuery, useAddRestaurantMutation } from '../redux/restaurantsApi';
import GridCard from './GridCard';
import AddButton from './AddButton';

export default function Grid() {

  const [restaurant, setRestaurant] = useState('');
  const { data = [], isLoading } = useGetRestaurantsQuery();
  const [addRestaurant] = useAddRestaurantMutation();

  const handleAddRestaurant = async () => {
    if (restaurant) {
      await addRestaurant({ name: restaurant }).unwrap();
      setRestaurant('');
    }
  }

  if (isLoading) { return <Spinner /> }

  return (
    <main>
      <div className='add-item '>
        <input type="text" value={restaurant} onChange={e => setRestaurant(e.target.value)} />
        <AddButton handleAddRestaurant={handleAddRestaurant} />
      </div>
      <div className="container">
        {data.map(restaurant => (
          <GridCard
            key={restaurant.id}
            restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
}