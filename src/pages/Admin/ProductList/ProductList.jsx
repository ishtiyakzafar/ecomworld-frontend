import React, { useEffect, useState } from 'react';
import './ProductList.scss';
import { toast } from 'react-toastify';
import { RiDeleteBin6Line } from 'react-icons/ri';
import productService from '../../../services/product';
import { calculateStock, formatNumbers } from '../../../Helper';
import { useNavigate } from 'react-router-dom';
import { MdOutlineModeEdit } from 'react-icons/md';
import Toast from '../../../components/Toast/Toast';
import Swal from 'sweetalert2';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchAllProducts = async () => {
    try {
      const query = {};
      const res = await productService.getProducts(query);
      setProducts(res.products);
    } catch (error) {
      toast.error(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllProducts()
  }, [])

  const handleDeleteProduct = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this product!",
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      preConfirm: async () => {
        try {
          await productService.deleteProduct(id);
          fetchAllProducts();
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }


  return (
    <div className='productsList'>
      <Toast />
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Categories</th>
              <th>Price</th>
              {/* <th>Quantity</th> */}
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              loading ?
                <p className='pt-3'>Loading...</p>
                :
                products.length > 0
                  ?
                  products.map((item) => (
                    <tr key={item._id}>
                      <td className='productImg'>
                        <img src={'https://rukminim1.flixcart.com/image/612/612/xif0q/jean/h/y/g/34-jeans-bt008-laheja-original-imagqqbsfgmdhcvn.jpeg?q=70'} alt="img" />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.topLevelCategory}/{item.secondLevelCategory}/{item.thirdLevelCategory}</td>
                      <td>₹{formatNumbers(item.discountedPrice)}</td>
                      {/* <td>{item.quantity}</td> */}
                      <td>{calculateStock(item.size)}</td>
                      <td>
                        <div className='action'>
                          <MdOutlineModeEdit onClick={() => navigate(`/admin/products/${item._id}/update`)} />
                          <RiDeleteBin6Line onClick={() => handleDeleteProduct(item._id)} />
                        </div>
                      </td>
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

export default ProductList;