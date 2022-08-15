import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <Link to={`/restaurants`}>Restaurante</Link>
    <Link to={`/magazine`}>Magazine</Link>
    </>
  )
}

export default Home