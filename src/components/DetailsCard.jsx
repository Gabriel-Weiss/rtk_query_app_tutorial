import React from 'react'
import { useParams } from "react-router-dom";
import { useGetRestaurantQuery } from '../redux/restaurantsApi'
import Spinner from './Spinner';

const DetailsCard = () => {

  let id = useParams();
  const {data: restaurant, isFetching, isSuccess} = useGetRestaurantQuery(id);
  console.log(restaurant)
  
  let content;
  if (isFetching) {
    content = <Spinner />
  } else if (isSuccess) {
    content = (
      <article className="item-content">
        <h2>{restaurant.name}</h2>
      </article>
    )
  }

  return (
    <div>{content}</div>
  )
}

export default DetailsCard