import React, { useEffect, useState } from 'react';
import './CustomerList.scss';
import userService from '../../../services/user';
import { toast } from 'react-toastify';
import moment from 'moment';
import Toast from '../../../components/Toast/Toast';

const CustomerList = () => {
  const [customerList, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllCustomer = async () => {
    try {
      const res = await userService.getUserList();
      setCustomerList(res);
    } catch (error) {
      toast.error(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllCustomer()
  }, [])

  return (
    <div className='customerList'>
      <Toast />
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Joined on</th>
            </tr>
          </thead>
          <tbody>
            {
              loading ?
                <p className='pt-3'>Loading...</p>
                :
                customerList.length > 0
                  ?
                  customerList.map((item) => (
                    <tr key={item._id}>
                      <td className='productImg'>
                        <img src={'https://rukminim1.flixcart.com/image/612/612/xif0q/jean/h/y/g/34-jeans-bt008-laheja-original-imagqqbsfgmdhcvn.jpeg?q=70'} alt="img" />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{moment(item.createdAt).format("MMM Do YY")}</td>
                    </tr>
                  ))
                  :
                  <p className='pt-3'>Data not found!</p>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default CustomerList;