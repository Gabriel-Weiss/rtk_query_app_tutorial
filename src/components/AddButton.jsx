import React from 'react'
import './css/AddButton.css'

const AddButton = ({handleAddRestaurant}) => {
  return (
    <button className='add-btn' onClick={handleAddRestaurant}>Add Item</button>
  )
}

export default AddButton