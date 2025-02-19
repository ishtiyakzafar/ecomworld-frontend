import React from "react";
import "./AddNewAddress.scss";
import {
  actionAddAddress,
  actionUpdateAddress,
} from "../../store/addressSlice";
import { useDispatch } from "react-redux";
import addressService from "../../services/address";
import { toast } from "react-toastify";
import Toast from "../Toast/Toast";

const AddNewAddress = ({
  setShowAddresses,
  setShowAddAddress,
  isUpdate,
  address,
  setAddress,
}) => {
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const addAndUpdateAddress = async (e) => {
    e.preventDefault();
    try {
      let data;

      if (isUpdate) {
        data = await addressService.updateAddress(address);
        dispatch(actionUpdateAddress(address));
      } else {
        data = await addressService.addAddress(address);
        dispatch(actionAddAddress(data.address));
      }
      setShowAddAddress(false);
      setShowAddresses(true);
      toast.success(data.message);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="addNewAddress">
      <Toast />
      <form onSubmit={addAndUpdateAddress} className="row g-2 g-md-3">
        <div className="col-md-6">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            autoComplete="off"
            value={address.fullName}
            onChange={handleOnChange}
            required
            type="text"
            className="form-control"
            name="fullName"
            id="fullName"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="mobile" className="form-label">
            Mobile
          </label>
          <input
            autoComplete="off"
            value={address.mobile}
            onChange={handleOnChange}
            required
            type="number"
            className="form-control"
            name="mobile"
            id="mobile"
          />
        </div>
        <div className="col-12">
          <label htmlFor="streetAddress" className="form-label">
            Street Address
          </label>
          <textarea
            value={address.streetAddress}
            onChange={handleOnChange}
            required
            type="text"
            className="form-control"
            name="streetAddress"
            id="streetAddress"
            placeholder="1234 Main St"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="city" className="form-label">
            City/District
          </label>
          <input
            autoComplete="off"
            value={address.city}
            onChange={handleOnChange}
            required
            type="text"
            className="form-control"
            name="city"
            id="city"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="state" className="form-label">
            State
          </label>
          <select
            value={address.state}
            onChange={handleOnChange}
            required
            name="state"
            id="state"
            className="form-select"
          >
            <option value="">Choose...</option>
            <option value="Jharkhand">Jharkhand</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="pinCode" className="form-label">
            Pin Code
          </label>
          <input
            autoComplete="off"
            value={address.pinCode}
            onChange={handleOnChange}
            required
            type="number"
            className="form-control"
            name="pinCode"
            id="pinCode"
          />
        </div>
        <div className="col-md-4 add_btn">
          <button>{isUpdate ? "Update" : "Add"}</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewAddress;
