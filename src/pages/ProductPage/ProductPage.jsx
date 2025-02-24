import React, { useEffect, useState } from "react";
import s from "./ProductPage.module.scss";
import ProductCard from "../../components/ProductCard/ProductCard";
import { LiaAngleDownSolid } from "react-icons/lia";
import ProductFilter from "../../components/ProductFilter/ProductFilter";
import productService from "../../services/product";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import DataLoader from "../../components/DataLoader/DataLoader";
import { useSelector } from "react-redux";
import { MdOutlineFilterList } from "react-icons/md";
import NoDataFound from "../../components/NoDataFound/NoDataFound";

const sortingData = [
  {
    id: 1,
    value: "asc",
    checked: false,
    name: "Alphabetically A-Z"
  },
  {
    id: 2,
    value: "desc",
    checked: false,
    name: "Alphabetically Z-A"
  },
  {
    id: 3,
    value: "price_high",
    checked: false,
    name: "Price, high to low"
  },
  {
    id: 4,
    value: "price_low",
    checked: false,
    name: "Price, low to high"
  }
];


const ProductPage = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { topLevel, secondLevel, thirdLevel } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParams = searchParams.get("category");
  const brandParams = searchParams.get("brand");
  const colorParams = searchParams.get("color");
  const priceParams = searchParams.get("price");
  const sizeParams = searchParams.get("size");
  const sortingParams = searchParams.get("sort");
  const discountParams = searchParams.get("discount");
  const [isLoading, setIsLoading] = useState(false);
  const { categoriesLoading } = useSelector((state) => state.app);
  const [sorting, setSorting] = useState(sortingParams);


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
        sizeParams,
        brandParams,
        discountParams,
        sortingParams
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
    sizeParams,
    brandParams,
    discountParams,
    sortingParams
  ]);


  return (
    <div className="container-fluid">
      {(loading || categoriesLoading) ?
        <Loader />
        :
        <div className={s.productPage}>
          <div className={s.filterWrap}>
            <ProductFilter setSorting={setSorting} showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
          </div>

          <div className={s.productList}>
            {isLoading ?
              <DataLoader />
              :
              <>
                <div className={s.filterSorting}>
                  <ul className={s.breadCum}>
                    <li><Link to='/'>Home</Link></li>
                    {topLevel && <li><span>/</span> <Link to={`/${topLevel}`}>{topLevel}</Link></li>}
                    {secondLevel && <li><span>/</span> <Link to={`/${topLevel}/${secondLevel}`}>{secondLevel}</Link></li>}
                    {thirdLevel && <li><span>/</span> <Link to={`/${topLevel}/${secondLevel}/${thirdLevel}`}>{thirdLevel}</Link></li>}
                  </ul>
                  <div onClick={() => setShowDrawer(true)} className={s.filter}>
                    <MdOutlineFilterList />
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
                        {
                          sortingData.map((item) => (
                            <li
                              className={item.value === sorting ? s.active : ''}
                              key={item.id}
                              onClick={() => {
                                setSorting(item.value);
                                const newParams = new URLSearchParams(searchParams);
                                newParams.set("sort", item.value);
                                setSearchParams(newParams);
                              }}
                            >
                              {item.name}
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  </div>
                </div>

                {products.length > 0 ?
                  <div className='row g-3 g-md-4'>
                    {products.map((item) => (
                      <div key={item._id} className="col-6 col-md-4 col-lg-3 col-xl-4 col-xxl-3">
                        <ProductCard item={item} />
                      </div>
                    ))}
                  </div>
                  :
                  <NoDataFound />
                }
              </>}
          </div>
        </div>
      }
    </div>
  );
};

export default ProductPage;
