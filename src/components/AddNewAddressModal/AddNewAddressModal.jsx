import React, { useState } from "react";
import "./AddNewAddressModal.scss";
import { actionAddAddress, actionUpdateAddress } from "../../store/addressSlice";
import { useDispatch } from "react-redux";
import addressService from "../../services/address";
import { toast } from "react-toastify";
import { validateAddress } from "../../Helper";
import ButtonLoader from "../ButtonLoader/ButtonLoader";

const AddNewAddressModal = ({
  errorMsg,
  setErrorMsg,
  address,
  setAddress,
  isUpdate,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {

    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));

    // VALIDATE INPUT
    setErrorMsg((prev) => validateAddress(prev, name, value));
  };

  const handleSubmit = async () => {

    if (!address.fullName) setErrorMsg((prev) => ({ ...prev, fullName: 'Please enter your full name' }));
    if (!address.mobile) setErrorMsg((prev) => ({ ...prev, mobile: 'Please enter your mobile number' }));
    if (!address.streetAddress) setErrorMsg((prev) => ({ ...prev, streetAddress: 'Please enter your full address' }));
    if (!address.city) setErrorMsg((prev) => ({ ...prev, city: 'Please enter your City/District' }));
    if (!address.state) setErrorMsg((prev) => ({ ...prev, state: 'Please select your state' }));
    if (!address.pinCode) setErrorMsg((prev) => ({ ...prev, pinCode: 'Please enter your 6 digit Pin Code' }));

    if (
      !address.fullName || !/^[a-zA-Z ]{3,}$/.test(address.fullName) || !address.mobile || !/^\d{10}$/.test(address.mobile) ||
      !address.streetAddress || !address.city || !/^[a-zA-Z ]{3,}$/.test(address.city) || !address.state ||
      !address.pinCode || !/^\d{6}$/.test(address.pinCode)
    ) return false;


    try {
      let data;
      setLoading(true);

      if (isUpdate) {
        data = await addressService.updateAddress(address);
        dispatch(actionUpdateAddress(address));
      } else {
        data = await addressService.addAddress(address);
        dispatch(actionAddAddress(data.address));
        setAddress({ fullName: "", mobile: "", streetAddress: "", city: "", state: "", pinCode: "", });
      }

      toast.success(data.message);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setAddress({ fullName: "", mobile: "", streetAddress: "", city: "", state: "", pinCode: "" });
    setErrorMsg({ fullName: "", mobile: "", streetAddress: "", city: "", state: "", pinCode: "" });
  }

  return (
    <div className="modal fade addNewAddressModal" id="addNewAddress" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="addNewAddressLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addNewAddressLabel">{isUpdate ? 'Update address' : 'Add new address'}</h1>
            <div onClick={handleCloseModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></div>
          </div>
          <div className="modal-body">
            <form className="row g-2 g-md-3">
              <div className="col-md-6">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  style={{ borderColor: errorMsg.fullName ? "#FF6666" : "" }}
                  autoComplete="off"
                  value={address.fullName}
                  onChange={handleOnChange}
                  type="text"
                  className="form-control"
                  name="fullName"
                  id="fullName"
                />
                {errorMsg.fullName && <small>{errorMsg.fullName}</small>}
              </div>
              <div className="col-md-6">
                <label htmlFor="mobile" className="form-label">
                  Mobile
                </label>
                <input
                  style={{ borderColor: errorMsg.mobile ? "#FF6666" : "" }}
                  autoComplete="off"
                  value={isNaN(address.mobile) ? '' : address.mobile}
                  onChange={(e) => {
                    const { value } = e.target;
                    if (value.length <= 10 && !isNaN(value)) {
                      handleOnChange(e);
                    }
                  }}
                  type="text"
                  className="form-control"
                  name="mobile"
                  id="mobile"
                />
                {errorMsg.mobile && <small>{errorMsg.mobile}</small>}
              </div>

              <div className="col-12">
                <label htmlFor="streetAddress" className="form-label">
                  Street Address
                </label>
                <textarea
                  style={{ borderColor: errorMsg.streetAddress ? "#FF6666" : "" }}
                  value={address.streetAddress}
                  onChange={handleOnChange}
                  type="text"
                  className="form-control"
                  name="streetAddress"
                  id="streetAddress"
                  placeholder="1234 Main St"
                />
                {errorMsg.streetAddress && <small>{errorMsg.streetAddress}</small>}
              </div>
              <div className="col-md-4">
                <label htmlFor="city" className="form-label">
                  City/District
                </label>
                <input
                  style={{ borderColor: errorMsg.city ? "#FF6666" : "" }}
                  autoComplete="off"
                  value={address.city}
                  onChange={handleOnChange}
                  type="text"
                  className="form-control"
                  name="city"
                  id="city"
                />
                {errorMsg.city && <small>{errorMsg.city}</small>}
              </div>
              <div className="col-md-4">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <select
                  style={{ borderColor: errorMsg.state ? "#FF6666" : "" }}
                  value={address.state}
                  onChange={handleOnChange}
                  name="state"
                  id="state"
                  className="form-select"
                >
                  <option value="">Choose...</option>
                  <option value="Jharkhand">Jharkhand</option>
                </select>
                {errorMsg.state && <small>{errorMsg.state}</small>}
              </div>
              <div className="col-md-4">
                <label htmlFor="pinCode" className="form-label">
                  Pin Code
                </label>
                <input
                  style={{ borderColor: errorMsg.pinCode ? "#FF6666" : "" }}
                  autoComplete="off"
                  value={isNaN(address.pinCode) ? '' : address.pinCode}
                  onChange={(e) => {
                    const { value } = e.target;
                    if (value.length <= 6 && !isNaN(value)) {
                      handleOnChange(e);
                    }
                  }}
                  type="text"
                  className="form-control"
                  name="pinCode"
                  id="pinCode"
                />
                {errorMsg.pinCode && <small>{errorMsg.pinCode}</small>}
              </div>
            </form>
          </div>
          <div className="modal-footer mt-3">
            <div className="add_btn">
              <button
                disabled={loading}
                type="button"
                onClick={handleSubmit}
              >
                {loading ? <ButtonLoader /> : isUpdate ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewAddressModal;
