import React, { useEffect, useState } from 'react';
import s from "./ProductDetailPage.module.scss";
import { Link, useLocation, useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import ProductDetailSection from '../../components/ProductDetailSection/ProductDetailSection';
import ProductDetailsTags from '../../components/ProductDetailsTags/ProductDetailsTags';
import productService from '../../services/product';
import ProductImageSection from '../../components/ProductImageSection/ProductImageSection';
import Loader from '../../components/Loader/Loader';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);

  const fetchProductDetails = async () => {
    try {
      const res = await productService.productDetails(id);
      setDetails(res);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className='container'>
      {loading ?
        <Loader /> :
        <div className={s.productDetailBox}>
          <div className={s.productDetail}>
            <ProductImageSection details={details} />
            <ProductDetailSection details={details} />
          </div>

          {/* <ProductDetailsTags /> */}

          <div className={s.productDescription}>
            <SectionHeading title='Description' />
            <p>{details.description}</p>
          </div>

          <div className={s.similarProduct}>
            <SectionHeading title='Similar Products' />
            {/* <div className={s.products}>
            {
              similarProducts.slice(0, 4).map((item) => (
                <ProductCard key={item._id} item={item} />
              ))
            }
          </div> */}
          </div>
        </div>
      }
    </div>
  )
};

export default ProductDetailPage;