import React, { useEffect, useState } from "react";
import s from "./ProductPage.module.scss";
import ProductCard from "../../components/ProductCard/ProductCard";
import { CiFilter } from "react-icons/ci";
import { LiaAngleDownSolid } from "react-icons/lia";
import ProductFilter from "../../components/ProductFilter/ProductFilter";
import productService from "../../services/product";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import DataLoader from "../../components/DataLoader/DataLoader";
import { useSelector } from "react-redux";


const ProductPage = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { topLevel, secondLevel, thirdLevel } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParams = searchParams.get("category");
  const colorParams = searchParams.get("color");
  const priceParams = searchParams.get("price");
  const sizeParams = searchParams.get("size");

  const [isLoading, setIsLoading] = useState(false);
  const { categoriesLoading } = useSelector((state) => state.app);

  const fetchAllProducts = async () => {
    try {
      if (!loading) {
        setIsLoading(true);
      }

      const categoryLevel = [topLevel, secondLevel, thirdLevel].filter(Boolean).join();

      const query = {
        categoryLevel,
        categoryParams,
        colorParams,
        priceParams,
        sizeParams
      }

      const res = await productService.getProducts(query);

      setProducts(res.products);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchAllProducts();
  }, [
    topLevel,
    secondLevel,
    thirdLevel,
    categoryParams,
    colorParams,
    priceParams,
    sizeParams
  ]);


  return (
    <div className="container-fluid">
      {(loading || categoriesLoading) ?
        <Loader />
        :
        <div className={s.productPage}>
          <div className={s.filterWrap}>
            <ProductFilter showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
          </div>

          <div className={s.productList}>
            {isLoading && <DataLoader />}


            <div className={s.filterSorting}>
              <ul className={s.breadCum}>
                <li><Link to='/'>Home</Link></li>
                {topLevel && <li><span>/</span> <Link to={`/${topLevel}`}>{topLevel}</Link></li>}
                {secondLevel && <li><span>/</span> <Link to={`/${topLevel}/${secondLevel}`}>{secondLevel}</Link></li>}
                {thirdLevel && <li><span>/</span> <Link to={`/${topLevel}/${secondLevel}/${thirdLevel}`}>{thirdLevel}</Link></li>}
              </ul>
              <div onClick={() => setShowDrawer(true)} className={s.filter}>
                <CiFilter />
                <span>FILTER</span>
              </div>
              <div className={s.sorting}>
                <div className="dropdown">
                  <div
                    className={s.selectDropdown}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span>Sort</span> <LiaAngleDownSolid />
                  </div>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">Alphabetically A-Z</li>
                    <li className="dropdown-item">Alphabetically Z-A</li>
                    <li className="dropdown-item">Price, low to high</li>
                    <li className="dropdown-item">Price, high to low</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row g-2 g-md-4">
              {products.map((item) => (
                <div key={item._id} className="col-6 col-md-4 col-lg-3 col-xl-4 col-xxl-3">
                  <ProductCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ProductPage;
