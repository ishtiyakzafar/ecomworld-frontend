import React from "react";
import "./ProductCard.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import wishlistService from "../../services/wishlist";
import { toast } from "react-toastify";
import { actionAddToWishlist, actionRemoveFromWishlist } from "../../store/productSlice";
import { IoMdHeartEmpty } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import MoveToCartModal from "../MoveToCartModal/MoveToCartModal";
import Toast from "../Toast/Toast";


const ProductCard = ({ isWishlist, item }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);


  const addToWishlist = async () => {
    try {
      const res = await wishlistService.addItemToWhislist({ productId: item._id });
      dispatch(actionAddToWishlist(item));
      toast.success(res.message);
    } catch (error) {
      toast.error(error);
    }
  }

  const deleteItemFromWishlist = async () => {
    try {
      const res = await wishlistService.deleteItemFromWishlist(item._id);
      dispatch(actionRemoveFromWishlist(item._id));
      toast.error('Product remove from your wishlist');
    } catch (error) {
      toast.error(res.message);
    }
  }

  return (
    <div className='productCard'>
      <Toast />

      <div className='productImg'>
        {isLoggedIn &&
          <div onClick={() => isWishlist ? deleteItemFromWishlist() : addToWishlist()} className='icon'>
            {isWishlist ? <RiDeleteBin6Line /> : <IoMdHeartEmpty />}
          </div>
        }
        <Link to={`/product/${item._id}`}>
          <img
            // src={item.imageUrl[0]}
            src='https://ecomusnext-themesflat.vercel.app/images/products/white-4.jpg'
            alt="img"
          />
        </Link>
      </div>
      <div className='productInfo'>
        <span>{item.brand}</span>
        <h6 className="text-truncatexx">{item.title}</h6>
        <p>
          ₹{item.discountedPrice} <small>₹{item.price}</small>{" "}
          <span>{item.discountPercent}% Off</span>
        </p>

        {isWishlist && <MoveToCartModal item={item} />}
      </div>
    </div>
  );
};

export default ProductCard;
