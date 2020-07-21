import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';
import BrandsBar from '../components/BrandsBar';
import Fade from 'react-reveal/Fade';

function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);

  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <>
      <BrandsBar />
      <Fade cascade>
        <ul className='filter'>
          <div>
            <li>
              <form onSubmit={submitHandler}>
                <input
                  name='searchKeyword'
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button type='submit'>Go!</button>
              </form>
            </li>
          </div>
          <div>
            <li>
              <select name='sortOrder' onChange={sortHandler}>
                <option value='lowest'>Highest Price</option>
                <option value='highest'>Lowest Price</option>
              </select>
            </li>
          </div>
        </ul>
        {category && (
          <h2
            style={{
              textAlign: 'center',
              fontSize: '4rem',
              marginTop: '-2rem',
            }}
          >
            {category}
          </h2>
        )}

        {loading ? (
          <div className='loading-text'>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <ul className='products'>
            {products.map((product) => (
              <li key={product._id}>
                <div className='product'>
                  <Link to={'/product/' + product._id}>
                    <img
                      className='product-image'
                      src={product.image}
                      alt='product'
                    />
                  </Link>
                  <div className='product-name'>
                    <Link to={'/product/' + product._id}>{product.name}</Link>
                  </div>
                  <div className='product-brand'>{product.brand}</div>
                  <div className='product-price'>${product.price}</div>
                  <div className='product-rating'>
                    <Rating
                      value={product.rating}
                      text={
                        product.numReviews === 1
                          ? product.numReviews + ' review'
                          : product.numReviews + ' reviews'
                      }
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Fade>
    </>
  );
}
export default HomeScreen;
