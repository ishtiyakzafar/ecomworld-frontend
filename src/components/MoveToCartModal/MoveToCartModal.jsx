import React, { useState } from 'react';
import './MoveToCartModal.scss';
import { MdClose } from "react-icons/md";
import cartService from '../../services/cart';
import wishlistService from '../../services/wishlist';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { actionAddToCart, actionRemoveFromWishlist } from '../../store/productSlice';
import smallImg from '../../assets/images/small_img.jpg';
import ButtonLoader from '../ButtonLoader/ButtonLoader';

const MoveToCartModal = ({ item }) => {
  const [size, setSize] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);


  const handleMoveToCart = async () => {
    if (size) {
      try {
        setLoading(true);

        await cartService.addToCart({ productId: item._id, size });
        dispatch(actionAddToCart({ product: item, size }));

        await wishlistService.deleteItemFromWishlist(item._id);
        dispatch(actionRemoveFromWishlist(item._id));

        document.getElementById(`movToCart${item._id}`).click();

        navigate('/cart')
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Please select a size');
    }
  }


  return (
    <div className='moveToCart'>
      <button className='outline' type="button" data-bs-toggle="modal" data-bs-target={`#movToCartModal${item._id}`} >
        Move to cart
      </button>

      <div className="modal fade" id={`movToCartModal${item._id}`} data-bs-backdrop="static" tabIndex="-1" aria-labelledby={`movToCartModalLabel${item._id}`} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content py-3 rounded-1">
            <div onClick={() => setSize("")} data-bs-dismiss="modal" id={`movToCart${item._id}`} className='close_icon'>
              <MdClose />
            </div>
            <div className="modal-body">
              <div className='product'>
                <img src={smallImg} alt="img" />
                <div className='product_info'>
                  <h6>{item.title}</h6>
                  <p>
                    ₹{item.discountedPrice} <small>₹{item.price}</small> <span>{item.discountPercent}% Off</span>
                  </p>
                </div>
              </div>
              <div className='productSize'>
                <p>Select Size:<span>{size}</span></p>
                <div className='sizeOption'>
                  {item.size?.map((item) => (
                    <div
                      onClick={() => setSize(item.name)}
                      key={item._id}
                      className={`size ${item.name === size && 'active'}`}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='p-3 doneBtn'>
              <button
                onClick={handleMoveToCart}
                disabled={loading}
                type="button"
              >
                {loading ? <ButtonLoader /> : "Done"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default MoveToCartModal;