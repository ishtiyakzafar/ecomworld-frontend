import React, { useState } from 'react';
import './SearchProducts.scss';
import { MdClose } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import productService from '../../services/product';
import { Link } from 'react-router-dom';

const SearchProducts = ({ setShowSearchModal }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);



  const handleSearchProduct = async (search) => {
    setSearchTerm(search);

    if (search) {
      if (searchTimeout) clearTimeout(searchTimeout);

      setLoading(true);

      const newTimeout = setTimeout(async () => {
        const query = { search };

        try {
          const res = await productService.getProducts(query);
          setProducts(res.products);
        } catch (error) {
          toast.error(error);
        } finally {
          setLoading(false);
        }
      }, 500); // 500ms debounce delay

      setSearchTimeout(newTimeout);
    } else {
      setProducts([]);
    }
  };


  return (
    <div className='searchProduct'>
      <div className='searchProductModal'>
        <div className='closeModal'>
          <MdClose onClick={() => setShowSearchModal(false)} />
        </div>

        <div className='searchInput'>
          <IoSearchOutline className='search' />
          <input
            value={searchTerm}
            onChange={(e) => handleSearchProduct(e.target.value)}
            autoComplete="off"
            type="text"
            className="form-control"
            id="search"
            placeholder='Search for products...'
          />
          {searchTerm.length > 0 && <MdClose onClick={() => {
            setSearchTerm("");
            setProducts([]);
          }} className='close' />}
        </div>

        <div className='suggestion'>
          <ul>
            {searchTerm.length === 0 ?
              <li className='noResult'>No recent searches</li>
              :
              loading ?
                <li className='noResult'>Searching...</li>
                :
                products.length > 0 ?
                  products.map((item) => (
                    <li key={item._id}>
                      <Link
                        to={`/product/${item._id}`}
                        onClick={() => setShowSearchModal(false)}
                      >
                        <span>#</span>{item.title}
                      </Link>
                    </li>
                  ))
                  :
                  <>
                    <li className='noResult'>{`No results found for "${searchTerm}"`}</li>
                    {searchTerm.length === 0 && <li className='noResult'>No recent searches</li>}
                  </>
            }
          </ul>
        </div>
      </div>
    </div>
  )
};

export default SearchProducts;