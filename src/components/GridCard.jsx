import React from 'react';
import './GridCard.css';
import { useDeleteRestaurantMutation } from '../redux/restaurantsApi';
import { Link } from 'react-router-dom';

const GridCard = ({ restaurant }) => {

  const [deleteRestaurant] = useDeleteRestaurantMutation();
  // const [updateRestaurant] = useUpdateRestaurantMutation();

  // const handleUpdateRestaurant = async () => {
  //   await updateRestaurant()
  // }

  const handleDeleteResturant = async (id) => {
    await deleteRestaurant(id).unwrap();
  }

  const handlePriceLevel = (level) => {
    switch (level) {
      case 1:
        return 'low';
      case 2:
        return 'medium';
      case 3:
        return 'high';
      default:
        return 'no level';
    }
  }

  return (
    <Link to={`/restaurants/${restaurant.id}`}>
      <div className='grid-card'>
        <div className='container-item' key={restaurant.id}>
          <h5 className="card-body card-title">{restaurant.name}</h5>
          <p className="card-body card-text">
            {restaurant.ratings
              ? restaurant.ratings.average
              : ''
            }
          </p>
          <p className="card-body card-text">Price level: {handlePriceLevel(restaurant.price_level)}</p>
          <div className="card-body card-footer">
            <button onClick={() => handleDeleteResturant(restaurant.id)}>Delete</button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default GridCard