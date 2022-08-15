import React, { useState } from 'react'
import './css/Grid.css'
import Spinner from '../components/Spinner';
import { MdSearch } from "react-icons/md";
import { useAddMarketMutation, useGetMarketsQuery } from '../redux/markets/marketsApiSlice';
import MarketsCard from './MarketsCard';

const MarketsGrid = () => {
  const [market, setMarket] = useState('');
  const { data = [], isLoading } = useGetMarketsQuery();
  const [addMarket] = useAddMarketMutation();

  const handleAddMarket = async () => {
    if (market) {
      await addMarket({ name: market }).unwrap();
      setMarket('');
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
          <input type="text" value={market} onChange={e => setMarket(e.target.value)} />
          <button className='add-btn' onClick={handleAddMarket}>Add Item</button>
        </div>
      </div>
      <div className="container">
        {data.map(market => (
          <MarketsCard
            key={market.id}
            market={market} />
        ))}
      </div>
    </main>
  );
}

export default MarketsGrid