import React from 'react'
import { useParams } from 'react-router-dom'
import "./css/DetailsCard.css";
import Spinner from '../components/Spinner';
import { useGetMarketQuery } from '../redux/markets/marketsApiSlice';

const MarketDetails = () => {
  let id = useParams();
  const {data: market, isFetching, isSuccess} = useGetMarketQuery(id);

  let content;
  if(isFetching) {
    content = <Spinner />
  } else if (isSuccess) {
    content = (
      <section>
        <article className="item-content">
          <h2>{market.name}</h2>
          <h2>
            {market.ratings
              ? "Rating: " + market.ratings
              : "Rating: no rating"}
          </h2>
          <h2>Products: {market.format_cuisines}</h2>
          <h2>Average delivery time: {market.avg_delivery_time}</h2>
        </article>
      </section>
    )
  }
  return (
    <div>{content}</div>
  )
}

export default MarketDetails