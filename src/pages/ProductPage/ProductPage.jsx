import React, { useEffect, useState } from "react";
import s from "./ProductPage.module.scss";
import ProductCard from "../../components/ProductCard/ProductCard";
import { CiFilter } from "react-icons/ci";
import { LiaAngleDownSolid } from "react-icons/lia";
import ProductFilter from "../../components/ProductFilter/ProductFilter";
import productService from "../../services/product";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";

const ProductPage = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { slug1, slug2, slug3 } = useParams();

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      let res;

      if (slug1 || slug2 || slug3) {
        res = await productService.getProductsByCategory(slug1, slug2, slug3);
      } else {
        res = await productService.getAllProducts();
      }

      setProducts(res.products);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [slug1, slug2, slug3]);


  return (
    <div className="container-fluid">
      {loading ?
        <Loader />
        :
        <div className={s.productPage}>
          <div className={s.filterWrap}>
            <ProductFilter showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
          </div>

          <div className={s.productList}>
            <div className={s.filterSorting}>
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

            <div className="row gx-2 gy-3 g-md-4">
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
