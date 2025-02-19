import React, { useEffect, useRef, useState } from 'react';
import './AddUpdateProduct.scss';
import productService from '../../../services/product';
import { toast } from 'react-toastify';
import { MdClose } from "react-icons/md";
import categoryService from '../../../services/categories';
import { formatEnum } from '../../../Helper';
import { tagsData } from '../../../Helper/data';
import { useParams } from "react-router-dom";
import Toast from '../../../components/Toast/Toast';


const AddUpdateProduct = () => {
  const [dropDown, setDropDown] = useState(false);
  const tagsRef = useRef(null);
  const [productDetails, setProductDetails] = useState({
    brand: "",
    title: "",
    color: "",
    price: "",
    discountedPrice: "",
    discountPercent: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    description: "",
    tags: [],
    size: [
      {
        name: "S",
        quantity: ""
      },
      {
        name: "M",
        quantity: ""
      },
      {
        name: "L",
        quantity: ""
      }
    ]
  });
  const [categories, setCategories] = useState([]);
  const [secondCategories, setSecondCategories] = useState([]);
  const [thirdCategories, setThirdCategories] = useState([]);
  const [topCategoryId, setTopCategoryId] = useState("");
  const [secondCategoryId, setSecondCategoryId] = useState("");
  const [thirdCategoryId, setThirdCategoryId] = useState("");
  const { id } = useParams();
  const [dataLoading, setDataLoading] = useState(true);
  const [loading, setLoading] = useState(false);



  const handleAddUpdateProduct = async (e) => {
    e.preventDefault();

    if (productDetails.size.every((item) => item.quantity === 0)) {
      return toast.error('Minimum 1 quantity is required');
    }

    setLoading(true);

    try {
      if (id) {
        await productService.updateProduct(productDetails, id);
        toast.success('Product updated succussfully');
      } else {
        await productService.createProduct(productDetails);
        toast.success('Product added succussfully');
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({ ...prev, [name]: value }));
  };


  const handleClickOutside = (event) => {
    if (tagsRef.current && !tagsRef.current.contains(event.target)) {
      setDropDown(false);
    }
  };

  const setProductData = () => {
    setTopCategoryId("");
    setSecondCategoryId("");
    setThirdCategoryId("");
    setSecondCategories([]);
    setThirdCategories([]);

    setProductDetails({
      brand: "",
      title: "",
      color: "",
      price: "",
      discountedPrice: "",
      discountPercent: "",
      topLevelCategory: "",
      secondLevelCategory: "",
      thirdLevelCategory: "",
      description: "",
      tags: [],
      size: [
        { name: "S", quantity: "" },
        { name: "M", quantity: "" },
        { name: "L", quantity: "" },
      ]
    })
  }

  useEffect(() => {
    if (!id) setProductData();

    const callApi = async () => {
      try {
        setDataLoading(true);
        const res = await categoryService.getCategories();
        setCategories(res);

        if (id) {
          const product = await productService.productDetails(id);
          setProductDetails({
            brand: product.brand,
            title: product.title,
            color: product.color,
            price: product.price,
            discountedPrice: product.discountedPrice,
            discountPercent: product.discountPercent,
            topLevelCategory: product.topLevelCategory,
            secondLevelCategory: product.secondLevelCategory,
            thirdLevelCategory: product.thirdLevelCategory,
            description: product.description,
            tags: product.tags,
            size: product.size,
          });

          const result = res.find((item) => item.topLevelCategory === product.topLevelCategory);
          setTopCategoryId(result._id);
          setSecondCategories(result.secondLevelCategories);

          const data = result.secondLevelCategories.find((item) => item.secondLevelCategory === product.secondLevelCategory)
          setSecondCategoryId(data._id);
          setThirdCategories(data.thirdLevelCategories);
          setThirdCategoryId(data.thirdLevelCategories.find((item) => item.thirdLevelCategory === product.thirdLevelCategory)._id)
        }

      } catch (error) {
        toast.error(error)
      } finally {
        setDataLoading(false);
      }
    }

    callApi();

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [id]);


  return (
    <div className='addupdateproduct'>
      <Toast />
      {dataLoading ?
        <p className='pt-3'>Loading...</p>
        :
        <form onSubmit={handleAddUpdateProduct} className='row g-3'>
          <div className='col-md-4'>
            <label htmlFor="brand" className="form-label">
              Brand
            </label>
            <input
              autoComplete='off'
              required
              value={productDetails.brand}
              onChange={handleOnChange}
              type="text"
              className="form-control"
              id="brand"
              name='brand'
            />
          </div>
          <div className='col-md-4'>
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              autoComplete='off'
              required
              value={productDetails.title}
              onChange={handleOnChange}
              type="text"
              className="form-control"
              id="title"
              name='title'
            />
          </div>
          <div className='col-md-4'>
            <label htmlFor="color" className="form-label">Color</label>
            <input
              autoComplete='off'
              required
              value={productDetails.color}
              onChange={handleOnChange}
              type="text"
              name='color'
              className="form-control" list="colorOptions" id="color" placeholder="Type to search..." />
            <datalist id="colorOptions">
              <option value="Red" />
              <option value="Green" />
              <option value="Blue" />
              <option value="White" />
              <option value="Black" />
            </datalist>
          </div>

          <div className="col-md-4 tags">
            <label htmlFor="tag" className="form-label">Tags</label>
            <div ref={tagsRef} className="dropdown">
              <div onClick={() => setDropDown(!dropDown)} className="tagsInput" aria-expanded="false">
                {
                  productDetails.tags.map((tag) => (
                    <small key={tag}>{formatEnum(tag)} <MdClose onClick={(e) => {
                      e.stopPropagation();
                      setProductDetails((prev) => ({ ...prev, tags: prev.tags.filter((item) => item !== tag) }))

                    }} /></small>
                  ))
                }
              </div>
              {dropDown &&
                <ul>
                  {
                    tagsData.map((item) => (
                      <li
                        key={item.tag}
                        onClick={() => setProductDetails((prev) => !prev.tags.includes(item.tag) ? { ...prev, tags: [...prev.tags, item.tag] } : { ...prev, tags: prev.tags.filter((val) => val !== item.tag) })}
                        className={productDetails.tags.includes(item.tag) ? 'act' : ''}
                      >
                        {formatEnum(item.tag)}
                      </li>
                    ))
                  }
                </ul>
              }
            </div>
          </div>

          <div className='col-md-4'>
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              autoComplete='off'
              required
              value={productDetails.price}
              onChange={handleOnChange}
              type="number"
              className="form-control"
              id="price"
              name='price'
            />
          </div>
          <div className='col-md-4'>
            <label htmlFor="discountedPrice" className="form-label">
              Discount Price
            </label>
            <input
              autoComplete='off'
              required
              value={productDetails.discountedPrice}
              onChange={handleOnChange}
              type="number"
              className="form-control"
              id="discountedPrice"
              name='discountedPrice'
            />
          </div>
          <div className='col-md-4'>
            <label htmlFor="discountPercent" className="form-label">
              Discount Percent
            </label>
            <input
              autoComplete='off'
              required
              value={productDetails.discountPercent}
              onChange={handleOnChange}
              type="number"
              className="form-control"
              id="discountPercent"
              name='discountPercent'
            />
          </div>

          <div className='col-md-4'>
            <label htmlFor="topLevelCategory" className="form-label">Top Level Category</label>
            <select
              required
              name='topLevelCategory'
              onChange={(e) => {
                setSecondCategoryId("");
                setThirdCategoryId("");
                handleOnChange(e);
                setTopCategoryId(e.target.value);
                const result = categories.find((item) => item._id === e.target.value);
                setProductDetails((prev) => ({ ...prev, topLevelCategory: result.topLevelCategory }));
                setSecondCategories(result.secondLevelCategories);
              }}
              value={topCategoryId}
              id="topLevelCategory"
              className="form-select"
            >
              <option value="">Select top category</option>
              {
                categories.map((item) => (
                  <option key={item._id} value={item._id}>{item.topLevelCategory}</option>
                ))
              }
            </select>
          </div>
          <div className='col-md-4'>
            <label htmlFor="secondLevelCategory" className="form-label">Second Level Category</label>
            <select
              required
              name='secondLevelCategory'
              onChange={(e) => {
                setThirdCategoryId("");
                handleOnChange(e);
                setSecondCategoryId(e.target.value);
                const result = secondCategories.find((item) => item._id === e.target.value);
                setProductDetails((prev) => ({ ...prev, secondLevelCategory: result.secondLevelCategory }));
                setThirdCategories(result.thirdLevelCategories)
              }}
              value={secondCategoryId}
              id="secondLevelCategory"
              className="form-select">
              <option value="">Select second category</option>
              {
                secondCategories.map((item) => (
                  <option key={item._id} value={item._id}>{item.secondLevelCategory}</option>
                ))
              }
            </select>
          </div>
          <div className='col-md-4'>
            <label htmlFor="thirdLevelCategory" className="form-label">Third Level Category</label>
            <select
              required
              name='thirdLevelCategory'
              onChange={(e) => {
                handleOnChange(e);
                setThirdCategoryId(e.target.value);
                const result = thirdCategories.find((item) => item._id === e.target.value);
                setProductDetails((prev) => ({ ...prev, thirdLevelCategory: result.thirdLevelCategory }));
              }}
              value={thirdCategoryId}
              id="thirdLevelCategory"
              className="form-select">
              <option value="">Select third category</option>
              {
                thirdCategories.map((item) => (
                  <option key={item._id} value={item._id}>{item.thirdLevelCategory}</option>
                ))
              }
            </select>
          </div>

          <div className='col-md-4'>
            <label htmlFor="quantitySmall" className="form-label">
              Quantity (Small)
            </label>
            <input
              autoComplete='off'
              required
              value={productDetails.size.find((val) => val.name === 'S').quantity}
              onChange={(e) => setProductDetails((prev) => ({ ...prev, size: prev.size.map((item) => item.name === 'S' ? { ...item, quantity: parseInt(e.target.value) } : item) }))}
              type="number"
              className="form-control"
              id="quantitySmall"
            />
          </div>
          <div className='col-md-4'>
            <label htmlFor="quantityMedium" className="form-label">
              Quantity (Medium)
            </label>
            <input
              autoComplete='off'
              required
              value={productDetails.size.find((val) => val.name === 'M').quantity}
              onChange={(e) => setProductDetails((prev) => ({ ...prev, size: prev.size.map((item) => item.name === 'M' ? { ...item, quantity: parseInt(e.target.value) } : item) }))}
              type="number"
              className="form-control"
              id="quantityMedium"
              name='quantityMedium'
            />
          </div>
          <div className='col-md-4'>
            <label htmlFor="quantityLarge" className="form-label">
              Quantity (Large)
            </label>
            <input
              autoComplete='off'
              required
              value={productDetails.size.find((val) => val.name === 'L').quantity}
              onChange={(e) => setProductDetails((prev) => ({ ...prev, size: prev.size.map((item) => item.name === 'L' ? { ...item, quantity: parseInt(e.target.value) } : item) }))}
              type="number"
              className="form-control"
              id="quantityLarge"
              name='quantityLarge'
            />
          </div>

          <div className='col-md-12'>
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              required
              value={productDetails.description}
              onChange={handleOnChange}
              type="text"
              className="form-control"
              id="description"
              name='description'
            />
          </div>

          {/* <div className='col-md-12'>
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
          autoComplete='off'  
          required
            value={productDetails.image}
            onChange={handleOnChange}
            type="text"
            className="form-control"
            id="image"
            name='image'
          />
        </div>
        <div className='col-md-12'>
          <label htmlFor="image2" className="form-label">
            Image
          </label>
          <input
          autoComplete='off'  
          value={productDetails.image2}
            onChange={handleOnChange}
            type="text"
            className="form-control"
            id="image2"
            name='image2'
          />
        </div>
        <div className='col-md-12'>
          <label htmlFor="image3" className="form-label">
            Image
          </label>
          <input
          autoComplete='off'  
          value={productDetails.image3}
            onChange={handleOnChange}
            type="text"
            className="form-control"
            id="image3"
            name='image3'
          />
        </div>
        <div className='col-md-12'>
          <label htmlFor="image4" className="form-label">
            Image
          </label>
          <input
          autoComplete='off'  
          value={productDetails.image4}
            onChange={handleOnChange}
            type="text"
            className="form-control"
            id="image4"
            name='image4'
          />
        </div>
        <div className='col-md-12'>
          <label htmlFor="image5" className="form-label">
            Image
          </label>
          <input
          autoComplete='off'  
          value={productDetails.image5}
            onChange={handleOnChange}
            type="text"
            className="form-control"
            id="image5"
            name='image5'
          />
        </div> */}

          <div className="text-center">
            <button disabled={loading} type="submit">
              {
                loading ?
                  <div class="spinner-border d-flex mx-auto" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  :
                  id ? "Update" : "Add"
              }
            </button>
          </div>
        </form>
      }
    </div>
  )
};

export default AddUpdateProduct;