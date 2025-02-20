import React, { useEffect, useState } from "react";
import "./CheckoutPage.scss";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import { LiaAngleUpSolid, LiaShippingFastSolid } from "react-icons/lia";
import { toast } from "react-toastify";
import addressService from "../../services/address";
import AddressCard from "../../components/AddressCard/AddressCard";
import { actionSetAddress } from "../../store/addressSlice";
import { useDispatch, useSelector } from "react-redux";
import AddNewAddress from "../../components/AddNewAddress/AddNewAddress";
import { MdAdd } from "react-icons/md";
import { LiaAngleDownSolid } from "react-icons/lia";
import CartCard from "../../components/CartCard/CartCard";
import { actionSetCart, actionSetCartCount } from "../../store/productSlice";
import cartService from "../../services/cart";
import noteIcon from '../../assets/icons/Layer_1.svg';
import { useNavigate } from "react-router-dom";
import orderService from "../../services/order";
import Toast from "../../components/Toast/Toast";
import Loader from "../../components/Loader/Loader";
import useWindowDimensions from "../../hooks/screenWidth";


const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { addresses, shippingAddress } = useSelector((state) => state.address);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showAddresses, setShowAddresses] = useState(true);
  const [address, setAddress] = useState({
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


  useEffect(() => {
    if (addresses.length === 0 && !loading) {
      setShowAddAddress(true);
    }
  }, [loading])



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
      navigate('/order-confirmation');
    } catch (error) {
      toast.error(error)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="checkoutPage">
      <Toast />
      {loading ?
        <Loader />
        :
        <div className="container">
          <div className="checkout-step">
            <div className={`step ${(step === 2 || step === 3) && 'passed'}`}>
              <p>{width > 768 ? "Delivery Address" : "Address"}</p>
            </div>
            <div className={`step ${(step === 2 || step === 3) && 'checked'} ${(step === 3) && 'passed'}`}>
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
                  {addresses.length > 0 &&
                    <div className="data_collapse">
                      <div
                        onClick={() => {
                          setShowAddresses(!showAddresses);
                          setShowAddAddress(false);
                        }}
                        className="add_title"
                      >
                        <span>
                          <LiaShippingFastSolid /> Select your delivery address
                        </span>
                        {showAddresses ? (
                          <LiaAngleUpSolid />
                        ) : (
                          <LiaAngleDownSolid />
                        )}
                      </div>

                      {showAddresses && (
                        <div className="address_list">
                          {addresses.map((item) => (
                            <AddressCard
                              setLoading={setLoading}
                              key={item._id}
                              item={item}
                              setShowAddresses={setShowAddresses}
                              setShowAddAddress={setShowAddAddress}
                              setAddress={setAddress}
                              setIsUpdate={setIsUpdate}
                              isAddList={true}
                              setStep={setStep}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  }

                  <div className="data_collapse">
                    <div
                      onClick={() => {
                        setShowAddAddress(!showAddAddress);
                        setShowAddresses(false);
                        setIsUpdate(false);
                        setAddress({
                          fullName: "",
                          mobile: "",
                          streetAddress: "",
                          city: "",
                          state: "",
                          pinCode: "",
                        });
                      }}
                      className="add_title"
                    >
                      <span>
                        <MdAdd /> Add new address
                      </span>
                      {showAddAddress ? <LiaAngleUpSolid /> : <LiaAngleDownSolid />}
                    </div>
                    {showAddAddress && (
                      <AddNewAddress
                        setAddress={setAddress}
                        address={address}
                        isUpdate={isUpdate}
                        setShowAddAddress={setShowAddAddress}
                        setShowAddresses={setShowAddresses}
                      />
                    )}
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
                    <div class="form-check">
                      <input onClick={() => setPaymentMethod("COD")} class="form-check-input" type="radio" name="paymentOption" id="cod1" />
                      <label class="form-check-label" htmlFor="cod1">
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
                    {
                      isLoading ?
                        <div class="spinner-border d-flex mx-auto" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                        :
                        "Place Order"
                    }
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
