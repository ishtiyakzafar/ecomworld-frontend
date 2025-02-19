import React, { useEffect } from 'react';
import './WishListPage.scss';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { useDispatch, useSelector } from 'react-redux';
import wishlistService from '../../services/wishlist';
import { actionSetWishlist } from '../../store/productSlice';
import Empty from '../../components/Empty/Empty';
import { IoMdHeartEmpty } from 'react-icons/io';
import ProductCard from '../../components/ProductCard/ProductCard';
import { ToastContainer } from 'react-toastify';

const WishListPage = () => {
  const { wishlist } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserWishlist = async () => {
      try {
        const res = await wishlistService.getWishlist();
        dispatch(actionSetWishlist(res));
      } catch (error) {
        console.log(error)
      }
    }

    fetchUserWishlist();
  }, [])

  return (
    <div className='container'>
      <ToastContainer position="bottom-center" theme="colored" />

      <div className='wishlistPage'>
        <SectionHeading title='My Wishlist' />
        {wishlist.length > 0 ?
          <div className='row g-4'>
            {
              wishlist.map((item) => (
                <div className='col-6 col-md-4 col-lg-3'>
                  <ProductCard isWishlist={true} key={item._id} item={item} />
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
    </div>
  )
};

export default WishListPage;