import React from "react";
import "./AddressCard.scss";
import { MdOutlineModeEdit } from "react-icons/md";
import { toast } from "react-toastify";
import addressService from "../../services/address";
import { useDispatch } from "react-redux";
import { actionDeleteAddress, actionSetShippingAddress } from "../../store/addressSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import Toast from "../Toast/Toast";

const AddressCard = ({
  setIsUpdate,
  setAddress,
  setShowAddresses,
  setShowAddAddress,
  item,
  isAddList,
  setStep,
}) => {
  const dispatch = useDispatch();

  const handleDeleteAddress = async () => {
    try {
      const res = await addressService.deleteAddress(item._id);
      dispatch(actionDeleteAddress(item._id));
      toast.success(res.message);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="address_card">
      <Toast />
      {!isAddList && <h5>Shipping address:</h5>}

      <div className="detail">
        <div>
          <h6>
            {item.fullName} <span>{item.mobile}</span>
          </h6>
          <p>
            {item.streetAddress} - <span>{item.pinCode}</span>
          </p>
        </div>
        {isAddList &&
          <div className="action">
            <RiDeleteBin6Line onClick={handleDeleteAddress} />
            <MdOutlineModeEdit
              onClick={() => {
                window.scrollTo({
                  top: 140,
                  behavior: "smooth",
                });
                setShowAddAddress(true);
                setShowAddresses(false);
                setAddress(item);
                setIsUpdate(true);
              }}
            />
          </div>
        }
      </div>
      <button
        onClick={() => {
          if (isAddList) {
            dispatch(actionSetShippingAddress(item));
            setStep(2);
          } else {
            setStep(1);
          }
        }}
        className="deliver_btn"
      >
        {isAddList ? "Deliver here" : "Change"}
      </button>
    </div>
  );
};

export default AddressCard;
