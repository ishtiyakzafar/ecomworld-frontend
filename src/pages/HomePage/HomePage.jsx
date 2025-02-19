import React, { useEffect, useState } from 'react';
import SavingZoneSection from '../../components/SavingZoneSection/SavingZoneSection';
import ServiceSection from '../../components/ServiceSection/ServiceSection';
import OnSaleSection from '../../components/OnSaleSection/OnSaleSection';
import BestSellerSection from '../../components/BestSellerSection/BestSellerSection';
import NewArrivalsSection from '../../components/NewArrivalsSection/NewArrivalsSection';
import CategorySection from '../../components/CategorySection/CategorySection';
import HeroSection from '../../components/HeroSection/HeroSection';
import productService from '../../services/product';
import { toast } from 'react-toastify';
import Toast from '../../components/Toast/Toast';
import Loader from '../../components/Loader/Loader';

const HomePage = () => {
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [onSaleProducts, setOnSaleProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsWithTags = async () => {
      try {
        const res = await productService.getProductsWithTags();
        setNewArrivalProducts(res.filter((item) => item.tags.includes('NEW_ARRIVAL')));
        setBestSellerProducts(res.filter((item) => item.tags.includes('BEST_SELLER')));
        setOnSaleProducts(res.filter((item) => item.tags.includes('ON_SALE')));
      } catch (error) {
        toast.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProductsWithTags()
  }, [])


  return (
    <>
      {
        loading ?
          <Loader /> :
          <>
            <Toast />
            <HeroSection />
            <CategorySection />
            <NewArrivalsSection products={newArrivalProducts} />
            <BestSellerSection products={bestSellerProducts} />
            <OnSaleSection products={onSaleProducts} />
            <SavingZoneSection />
            <ServiceSection />
          </>
      }
    </>
  )
};

export default HomePage;