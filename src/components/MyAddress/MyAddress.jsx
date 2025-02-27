import React, { useEffect, useState } from 'react';
import './MyAddress.scss';
import Toast from '../Toast/Toast';
import SectionHeading from '../SectionHeading/SectionHeading';
import addressService from '../../services/address';
import AddressCard from '../AddressCard/AddressCard';
import Spinner from '../Spinner/Spinner';
import AddNewAddressModal from '../AddNewAddressModal/AddNewAddressModal';
import { MdAdd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { actionSetAddress } from '../../store/addressSlice';

const MyAddress = () => {
  const { addresses } = useSelector((state) => state.address);
  const [loading, setLoading] = useState(true);
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
  const dispatch = useDispatch();

  const fetchAddresses = async () => {
    try {
      const res = await addressService.getAddresses();
      dispatch(actionSetAddress(res));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAddresses();
  }, [])

  return (
    <>
      <Toast />
      <AddNewAddressModal
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
        address={address}
        setAddress={setAddress}
        isUpdate={isUpdate}
      />

      {
        loading ? <Spinner />
          :
          <div className='myAddress'>
            <div className='address_header'>
              <SectionHeading title='My Addresses' />
              <div onClick={() => setIsUpdate(false)} className="addnew_add" data-bs-toggle="modal" data-bs-target="#addNewAddress">
                <MdAdd /> Add a new address
              </div>
            </div>


            {addresses.map((item) => (
              <AddressCard
                myAddress={true}
                key={item._id}
                item={item}
                setAddress={setAddress}
                setIsUpdate={setIsUpdate}
                isAddList={true}
              />
            ))}
          </div>
      }
    </>
  )
};

export default MyAddress;