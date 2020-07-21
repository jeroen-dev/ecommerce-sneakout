import React from 'react';
import { Link } from 'react-router-dom';
import './brandsbar.css';

const BrandsBar = () => {
  return (
    <div className='brandsbar-container'>
      <ul className='brandsbar'>
        <li>
          <Link to='/'>All brands</Link>
        </li>

        <li>
          <Link to='/category/Nike'>Nike</Link>
        </li>

        <li>
          <Link to='/category/Adidas'>Adidas</Link>
        </li>
        <li>
          <Link to='/category/Vans'>Vans</Link>
        </li>
        <li>
          <Link to='/category/NB'>NB</Link>
        </li>
        <li>
          <Link to='/category/Asics'>Asics</Link>
        </li>
        <li>
          <Link to='/category/Converse'>Converse</Link>
        </li>
      </ul>
    </div>
  );
};

export default BrandsBar;
