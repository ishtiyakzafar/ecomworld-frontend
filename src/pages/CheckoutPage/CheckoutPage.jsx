import React, { useEffect, useState } from "react";
import "./CheckoutPage.scss";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import { LiaShippingFastSolid } from "react-icons/lia";
import { toast } from "react-toastify";
import addressService from "../../services/address";
import AddressCard from "../../components/AddressCard/AddressCard";
import { actionSetAddress } from "../../store/addressSlice";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "../../components/CartCard/CartCard";
import { actionSetCart, actionSetCartCount } from "../../store/productSlice";
import cartService from "../../services/cart";
import noteIcon from '../../assets/icons/Layer_1.svg';
import { useNavigate } from "react-router-dom";
import orderService from "../../services/order";
import Toast from "../../components/Toast/Toast";
import Loader from "../../components/Loader/Loader";
import useWindowDimensions from "../../hooks/screenWidth";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import AddNewAddressModal from "../../components/AddNewAddressModal/AddNewAddressModal";
import { MdAdd } from "react-icons/md";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { addresses, shippingAddress } = useSelector((state) => state.address);
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    streetAddress: "",
    city: "",
    state: "",
    pinCode: "",
  });
  const [errorMsg, setErrorMsg] = useState({
    fullName: "",
    mobile: "",
    streetAddress: "",
    city: "",
    state: "",
    pinCode: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const { cart } = useSelector((state) => state.product);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();
  const [addressCount, setAddressCount] = useState(1);



  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (cart.length === 0) {
          const res = await cartService.getCart();
          const result = res.map((item) => ({ product: item.productId, _id: item._id, quantity: item.quantity, size: item.size }));
          dispatch(actionSetCart(result));
        }

        const data = await addressService.getAddresses();

        dispatch(actionSetAddress(data));
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (true) {
      fetchDetails();
    } else {
      navigate('/')
    }
  }, []);


  const handlePlaceOrder = async () => {
    if (!paymentMethod) return toast.error('Please select payment method');

    try {
      setIsLoading(true);
      const res = await orderService.addOrder({ addressId: shippingAddress._id });
      dispatch(actionSetCartCount(0));
      dispatch(actionSetCart([]));
      navigate(`/order-confirmation/${res._id}`);
    } catch (error) {
      toast.error(error)
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="checkoutPage">
      <Toast />
      <AddNewAddressModal
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
        address={address}
        setAddress={setAddress}
        isUpdate={isUpdate}
      />

      {loading ?
        <Loader />
        :
        <div className="container">
          <div className="checkout-step">
            <div onClick={() => setStep(1)} className={`step ${(step === 2 || step === 3) && 'passed'}`}>
              <p>{width > 768 ? "Delivery Address" : "Address"}</p>
            </div>
            <div onClick={() => step === 3 && setStep(2)} className={`step ${(step === 2 || step === 3) && 'checked'} ${(step === 3) && 'passed'}`}>
              <p>{width > 768 ? "Order Summary" : "Summary"}</p>
            </div>
            <div className={`step ${step === 3 && 'checked'}`}>
              <p>Payment</p>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8">
              {step === 1 &&
                <div className="billingDetails">

                  <div className="shipping-address">
                    <div className="add_title">
                      <LiaShippingFastSolid /> Select your delivery address
                    </div>

                    {addresses.slice(0, addressCount).map((item) => (
                      <AddressCard
                        setLoading={setLoading}
                        key={item._id}
                        item={item}
                        setAddress={setAddress}
                        setIsUpdate={setIsUpdate}
                        isAddList={true}
                        setStep={setStep}
                        setAddressCount={setAddressCount}
                      />
                    ))}

                    {addresses.length > 0 &&
                      <div onClick={() => setAddressCount(addressCount === 1 ? addresses.length : 1)} className="viewMore">
                        {addressCount === 1 ? <>View more address <FaAngleDown /></> : <>View less address <FaAngleUp /></>}
                      </div>
                    }
                  </div>

                  <div onClick={() => setIsUpdate(false)} className="add_new_add" data-bs-toggle="modal" data-bs-target="#addNewAddress">
                    <MdAdd /> Add a new address
                  </div>
                </div>
              }

              {step === 2 &&
                <>
                  <div className="shipping-address">
                    <AddressCard
                      item={shippingAddress}
                      setStep={setStep}
                    />
                  </div>
                  <div className="cart_summary">
                    {cart.map((item) => (
                      <CartCard isOrderSummary={true} key={item._id} item={item} />
                    ))}
                  </div>
                </>
              }

              {step === 3 &&
                <div className="payment-option">
                  <h5>Payment option</h5>
                  <div className={`option ${paymentMethod && 'active'}`}>
                    <div className="form-check">
                      <input onClick={() => setPaymentMethod("COD")} className="form-check-input" type="radio" name="paymentOption" id="cod1" />
                      <label className="form-check-label" htmlFor="cod1">
                        Cash on Delivery
                      </label>
                    </div>
                  </div>

                  <div className="payment_note">
                    <img src={noteIcon} alt="icon" />
                    <p>We currently accept Cash on Delivery (COD) only as the payment method. Thank you for your understanding and support!</p>
                  </div>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isLoading}
                  >
                    {loading ? <ButtonLoader /> : "Place Order"}
                  </button>
                </div>
              }
            </div>
            <div className="col-lg-4">
              <OrderSummary setStep={setStep} step={step} />
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default CheckoutPage;
