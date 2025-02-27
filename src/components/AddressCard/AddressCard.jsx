import React from "react";
import "./AddressCard.scss";
import { MdOutlineModeEdit } from "react-icons/md";
import addressService from "../../services/address";
import { useDispatch } from "react-redux";
import { actionDeleteAddress, actionSetShippingAddress } from "../../store/addressSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from 'sweetalert2';

const AddressCard = ({
  setIsUpdate,
  setAddress,
  item,
  isAddList,
  setStep,
  setAddressCount,
  myAddress,
}) => {
  const dispatch = useDispatch();

  const handleDeleteAddress = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this address!",
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      preConfirm: async () => {
        try {
          await addressService.deleteAddress(item._id);
          dispatch(actionDeleteAddress(item._id));
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  return (
    <div className="address_card">
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
              data-bs-toggle="modal" data-bs-target="#addNewAddress"
              onClick={() => {
                setIsUpdate(true);
                console.log(item)
                setAddress(item);

              }}
            />
          </div>
        }
      </div>
      {!myAddress &&
        <button
          className="deliver_btn"
          onClick={() => {
            if (isAddList) {
              dispatch(actionSetShippingAddress(item));
              setStep(2);
              setAddressCount(1);
            } else {
              setStep(1);
            }
          }}
        >
          {isAddList ? "Deliver here" : "Change"}
        </button>
      }
    </div>
  );
};

export default AddressCard;
