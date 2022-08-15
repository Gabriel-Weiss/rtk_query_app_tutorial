import React, { useState } from 'react'
import './css/Grid.css'
import Spinner from '../components/Spinner';
import { MdSearch } from "react-icons/md";
import RestaurantsCard from './RestaurantsCard';
import { useAddRestaurantMutation, useGetRestaurantsQuery } from '../redux/restaurants/restaurantsApiSlice';

export default function RestaurantsGrid() {

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
      <div className='input-bar'>
        <div className='search-item input-item'>
          <input type="text" className="header_input" placeholder='Search' />
          <i className="search_icon" aria-hidden="true"><MdSearch /></i>
        </div>
        <div className="add-item input-item">
          <input type="text" value={restaurant} onChange={e => setRestaurant(e.target.value)} />
          <button className='add-btn' onClick={handleAddRestaurant}>Add Item</button>
        </div>
      </div>
      <div className="container">
        {data.map(restaurant => (
          <RestaurantsCard
            key={restaurant.id}
            restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
}