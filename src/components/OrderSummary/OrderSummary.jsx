import React, { useEffect, useState } from "react";
import "./OrderSummary.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiMinus } from "react-icons/fi";
import { formatNumbers } from "../../Helper";
import { actionIsFromCart } from "../../store/appSlice";

const OrderSummary = ({ step, showBtn, setStep }) => {
  const { cart } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate("/login?page=cart");
    } else {
      dispatch(actionIsFromCart(true))
      navigate("/checkout");
    }
  };

  useEffect(() => {
    let totalPriceValue = 0;
    let totalDiscountedPrice = 0;
    let totalDiscount = 0;
    let items = 0;

    cart.forEach((element) => {
      totalPriceValue += element.product.price * element.quantity;
      totalDiscountedPrice += element.product.discountedPrice * element.quantity;
      totalDiscount += (element.product.price - element.product.discountedPrice) * element.quantity;
      items += element.quantity;
    });

    setTotalPrice(totalPriceValue);
    setDiscount(totalDiscount);
    setTotalAmount(totalDiscountedPrice);
    setTotalItems(items);

  }, [cart]);

  return (
    <div className="orderSummary">
      <div className="heading">
        Price Details <span>({totalItems} {`${totalItems > 1 ? "items" : "item"}`})</span>
      </div>

      <div className="details">
        <div className="orderSummaryItem">
          <h6>Price</h6>
          <p>₹{formatNumbers(totalPrice)}</p>
        </div>
        <div className="orderSummaryItem">
          <h6>Discount</h6>
          <p className="discount"><FiMinus />₹{formatNumbers(discount)}</p>
        </div>
        <div className="orderSummaryItem">
          <h6>Shipping</h6>
          <p className="shipping">Free</p>
        </div>
      </div>

      <div className="total-amount">
        <h1>Total Amount</h1>
        <h1>₹{formatNumbers(totalAmount)}</h1>
      </div>

      {(showBtn || step === 2) &&
        <button
          onClick={() => step === 2 ? setStep(3) : handleCheckout()}
        >
          {step === 2 ? "Continue" : "Checkout"}
        </button>
      }

    </div>
  );
};

export default OrderSummary;
