import React, { useEffect, useState } from 'react';
import "./Header.scss";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoSearchOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { actionLogout } from '../../store/authSlice';
import userIcon from '../../assets/icons/user.svg';
import { actionSetCart, actionSetCartCount, actionSetWishlist, actionSetWishlistCount } from '../../store/productSlice';
import { CiLogout } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import { LiaAngleDownSolid } from "react-icons/lia";
import useWindowDimensions from '../../hooks/screenWidth';
import { addIsShowToCategories } from '../../Helper';
import { MdClose } from "react-icons/md";


const Header = () => {
  const { categories } = useSelector((state) => state.app);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { wishlistCount, cartCount } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [updatedCategories, setUpdatedCategories] = useState([]);
  const { width } = useWindowDimensions();
  const [showDrawer, setShowDrawer] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(true);


  useEffect(() => {
    if (width > 1200) {
      const data = addIsShowToCategories(categories, true);
      setUpdatedCategories(data);
    } else {
      const data = addIsShowToCategories(categories, false);
      setUpdatedCategories(data);
    }
  }, [width, categories])


  return (
    <header>
      <div className='headerLeft'>
        <MdMenu onClick={() => setShowDrawer(true)} />
        <Link onClick={() => setShowDrawer(false)} to='/' className='logo'>Ecom<span>World</span></Link>
      </div>

      {showDrawer && width > 576 && <div className='bg-overlay'></div>}
      <ul className={showDrawer ? 'menu show' : 'menu'}>
        <div className='headerLeft mobile'>
          <Link onClick={() => setShowDrawer(false)} to='/' className='logo'>Ecom<span>World</span></Link>
          <MdClose onClick={() => setShowDrawer(false)} />
        </div>

        {
          updatedCategories.map((category) => (
            <li key={category._id}>
              <div
                onMouseEnter={() => setShowMegaMenu(true)}
                onClick={() => {
                  if (width < 1200) {
                    setUpdatedCategories((prev) => prev.map((val) => val._id === category._id ? { ...val, isShow: !val.isShow } : val))
                  } else {
                    setShowMegaMenu(false);
                  }
                }}
                className={category.isShow ? 'topMenu down' : 'topMenu'}
              >
                {width > 1200 ? <Link to={`/${category.topLevelCategory}`}>{category.topLevelCategory}</Link> : <span>{category.topLevelCategory}</span>}
                <LiaAngleDownSolid />
              </div>


              {category.isShow &&
                <div className={showMegaMenu ? 'megaMenu' : 'megaMenu close'}>
                  {category.secondLevelCategories.map((subCat) => (
                    <ul key={subCat._id}>
                      <h6
                        className={subCat.isShow ? 'topMenu down' : 'topMenu'}
                        onClick={() => {
                          if (width < 1200) {
                            setUpdatedCategories((prev) =>
                              prev.map((item) =>
                                item._id === category._id
                                  ? {
                                    ...item,
                                    secondLevelCategories: item.secondLevelCategories.map((subCategory) =>
                                      subCategory._id === subCat._id
                                        ? { ...subCategory, isShow: !subCategory.isShow }
                                        : subCategory
                                    ),
                                  }
                                  : item
                              )
                            );
                          } else {
                            setShowMegaMenu(false);
                          }
                        }}
                      >
                        {width > 1200 ? <Link to={`/${category.topLevelCategory}/${subCat.secondLevelCategory}`}>{subCat.secondLevelCategory}</Link> : subCat.secondLevelCategory}
                        <LiaAngleDownSolid />
                      </h6>

                      {
                        subCat.isShow && subCat.thirdLevelCategories.map((item) => (
                          <li key={item._id}><Link onClick={() => {
                            setShowDrawer(false);
                            if (width > 1200) {
                              setShowMegaMenu(false);
                            }
                          }} to={`/${category.topLevelCategory}/${subCat.secondLevelCategory}/${item.thirdLevelCategory}`}>{item.thirdLevelCategory}</Link></li>
                        ))
                      }
                    </ul>
                  ))}
                </div>
              }
            </li>
          ))
        }
        {/* <li><Link onClick={() => setShowDrawer(false)} to='/products'>Products</Link></li> */}
        <li><Link onClick={() => setShowDrawer(false)} to="/contact-us">Contact Us</Link></li>
      </ul>

      <div className='header_right'>
        <div className='headerIcon'>
          <IoSearchOutline className='searchIcon' />
          {!isLoggedIn && <Link to='/login'><FiUser /></Link>}
          {isLoggedIn &&
            <Link className='wishlistIcon' to='/wishlist'>
              {wishlistCount > 0 && <div className='counter'>{wishlistCount}</div>}
              <IoMdHeartEmpty />
            </Link>
          }
          <Link className='cartIcon' to='/cart'>
            {cartCount > 0 && <div className='counter'>{cartCount}</div>}
            <LiaShoppingBagSolid />
          </Link>
        </div>

        {isLoggedIn &&
          <div className="dropdown">
            <div data-bs-toggle="dropdown" aria-expanded="false" className='profile'>
              <p>{user.name}</p>
              <img src={userIcon} alt="userIcon" /> <FaAngleDown />
            </div>
            <ul class="dropdown-menu">
              <li>{user.name}</li>
              <li onClick={() => navigate('/profile/account')}><FiUser /> Profile</li>
              <li onClick={() => navigate('/profile/orders')}><LiaShoppingBagSolid /> Order</li>
              <li onClick={() => navigate('/wishlist')}><IoMdHeartEmpty /> Wishlist</li>
              <li onClick={() => navigate('/cart')}><LiaShoppingBagSolid /> Cart</li>
              <li
                onClick={() => {
                  dispatch(actionLogout());
                  dispatch(actionSetWishlist([]));
                  dispatch(actionSetCart([]));
                  dispatch(actionSetCartCount(0));
                  dispatch(actionSetWishlistCount(0));
                  if (pathname === '/wishlist' || pathname === '/cart') {
                    navigate('/');
                  }
                }}
              >
                <CiLogout /> Logout
              </li>
            </ul>
          </div>
        }
      </div>
    </header >
  )
};

export default Header;