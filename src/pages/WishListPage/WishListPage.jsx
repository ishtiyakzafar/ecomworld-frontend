import React, { useEffect, useState } from 'react';
import './WishListPage.scss';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { useDispatch, useSelector } from 'react-redux';
import wishlistService from '../../services/wishlist';
import { actionSetWishlist } from '../../store/productSlice';
import Empty from '../../components/Empty/Empty';
import { IoMdHeartEmpty } from 'react-icons/io';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader/Loader';

const WishListPage = () => {
  const { wishlist } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserWishlist = async () => {
      try {
        const res = await wishlistService.getWishlist();
        dispatch(actionSetWishlist(res));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserWishlist();
  }, [])

  return (
    <div className='container'>

      {loading ?
        <Loader />
        :
        <div className='wishlistPage'>
          <SectionHeading title='My Wishlist' />
          {wishlist.length > 0 ?
            <div className='row g-4'>
              {
                wishlist.map((item) => (
                  <div key={item._id} className='col-6 col-md-4 col-lg-3'>
                    <ProductCard isWishlist={true} item={item} />
                  </div>
                ))
              }
            </div>
            :
            <Empty
              icon={<IoMdHeartEmpty />}
              heading='Your wishlist is empty!'
              title='Explore our collection and add products to your wishlist for easy access later.'
            />
          }
        </div>
      }
    </div>
  )
};

export default WishListPage;