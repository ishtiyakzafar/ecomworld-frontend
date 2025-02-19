import React, { useEffect, useState } from 'react';
import './AddProduct.scss';
import productService from '../../../services/product';


const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      resolve(event.target.result);
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};


const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
  });


  const [files, setFiles] = useState([]);
  const [base64Images, setBase64Images] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await productService.createProduct({ ...productDetails, images: uploadedImageUrls })
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({ ...prev, [name]: value }));
  };

  const uploadProductImage = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    let storeImages = [];

    for (const file of selectedFiles) {

      const data = new FormData();
      data.append("file", file);
      // data.append("upload_preset", "qjkidvfx");
      data.append("upload_preset", "gdjsowkd");

      // data.append("cloud_name", "dob0ubi8g");
      data.append("cloud_name", "dzxbddqoj");
      // data.append("signature", "bfd09f95f331f558cbd1320e67aa8d488770583e");
      // data.append("timestamp", "1315060510");
      // data.append("api_key", "526165658192339");




      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dzxbddqoj/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (res.ok) {
        storeImages.push(result.secure_url);
      } else {
        console.error('Upload failed for file:', file.name, result);
      }
    };

    setUploadedImageUrls(storeImages)

  }

  const handleImageConversion = async () => {
    const base64Array = [];
    for (const file of files) {
      const base64 = await convertToBase64(file);
      base64Array.push(base64);
    }
    setBase64Images(base64Array);
  };


  useEffect(() => {
    if (files.length > 0) {
      handleImageConversion();
    }
  }, [files]);

  //   {
  //     "asset_id": "fdf4bc63f07003a5754820c5ef33c89f",
  //     "public_id": "yidwziqxsyw3nfyljwjn",
  //     "version": 1734776173,
  //     "version_id": "a704e217b372dee0cb3927d1ce5c2dde",
  //     "signature": "79c25f47f14a950445cf967370ad42542a9bc631",
  //     "width": 1212,
  //     "height": 1600,
  //     "format": "jpg",
  //     "resource_type": "image",
  //     "created_at": "2024-12-21T10:16:13Z",
  //     "tags": [],
  //     "bytes": 95946,
  //     "type": "upload",
  //     "etag": "02b4a8bce406f8795fc12d02fb03fbee",
  //     "placeholder": false,
  //     "url": "http://res.cloudinary.com/dzxbddqoj/image/upload/v1734776173/yidwziqxsyw3nfyljwjn.jpg",
  //     "secure_url": "https://res.cloudinary.com/dzxbddqoj/image/upload/v1734776173/yidwziqxsyw3nfyljwjn.jpg",
  //     "asset_folder": "",
  //     "display_name": "product14",
  //     "original_filename": "product14"
  // }


  const deleteImage = async (publicId) => {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dzxbddqoj/image/destroy`,  // POST request for deletion
      {
        method: "POST",  // POST method is used to delete an image
        body: JSON.stringify({
          public_id: 'yidwziqxsyw3nfyljwjn',
          api_key: '526165658192339', // Cloudinary API key
          signature: "79c25f47f14a950445cf967370ad42542a9bc631",
          timestamp: "2024-12-21T10:16:13Z"
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const result = await res.json();

    if (res.ok) {
      console.log('Image deleted successfully:', result);
    } else {
      console.error('Failed to delete image:', result);
    }
  };

  //handle and convert it in base 64
  const handleImagexxx = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  }

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      // setImagexx(reader.result);
      try {
        const res = await productService.createProduct({ image: reader.result })
      } catch (error) {
        console.log(error)
      }
    }
  }


  return (
    <div className='addproduct'>
      <button onClick={deleteImage}>delete</button>
      <form onSubmit={handleAddProduct} className='row g-3'>
        <div className='col-md-6'>
          <label htmlhtmlFor="brand" className="form-label">
            Brand
          </label>
          <input
            required
            value={productDetails.brand}
            onChange={handleOnChange}
            type="text"
            className="form-control"
            id="brand"
            name='brand'
          />
        </div>
        <div className='col-md-6'>
          <label htmlhtmlFor="title" className="form-label">
            Title
          </label>
          <input
            required
            value={productDetails.title}
            onChange={handleOnChange}
            type="text"
            className="form-control"
            id="title"
            name='title'
          />
        </div>
        <div className='col-md-6'>
          <label htmlhtmlFor="color" className="form-label">
            Color
          </label>
          <input
            required
            value={productDetails.color}
            onChange={handleOnChange}
            type="text"
            className="form-control"
            id="color"
            name='color'
          />
        </div>
        <div className='col-md-6'>
          <label htmlhtmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            required
            value={productDetails.quantity}
            onChange={handleOnChange}
            type="number"
            className="form-control"
            id="quantity"
            name='quantity'
          />
        </div>

        <div className='col-md-4'>
          <label htmlFor="topLevelCategory" className="form-label">Top Level Category</label>
          <input
            required
            value={productDetails.topLevelCategory}
            onChange={handleOnChange}
            type="text"
            name='topLevelCategory'
            className="form-control" list="categoryOptions" id="topLevelCategory" placeholder="Type to search..." />
          <datalist id="categoryOptions">
            <option value="San Francisco" />
            <option value="New York" />
            <option value="Seattle" />
            <option value="Los Angeles" />
            <option value="Chicago" />
          </datalist>
        </div>
        <div className='col-md-4'>
          <label htmlFor="secondLevelCategory" className="form-label">Second Level Category</label>
          <input
            required
            value={productDetails.secondLevelCategory}
            onChange={handleOnChange}
            type="text"
            name='secondLevelCategory'
            className="form-control" list="categoryOptions" id="secondLevelCategory" placeholder="Type to search..." />
          <datalist id="categoryOptions">
            <option value="San Francisco" />
            <option value="New York" />
            <option value="Seattle" />
            <option value="Los Angeles" />
            <option value="Chicago" />
          </datalist>
        </div>
        <div className='col-md-4'>
          <label htmlFor="thirdLevelCategory" className="form-label">Third Level Category</label>
          <input
            required
            value={productDetails.thirdLevelCategory}
            onChange={handleOnChange}
            type="text"
            name='thirdLevelCategory'
            className="form-control" list="categoryOptions" id="thirdLevelCategory" placeholder="Type to search..." />
          <datalist id="categoryOptions">
            <option value="San Francisco" />
            <option value="New York" />
            <option value="Seattle" />
            <option value="Los Angeles" />
            <option value="Chicago" />
          </datalist>
        </div>

        <div className='col-md-12'>
          <label htmlhtmlFor="description" className="form-label">
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

        <div className='col-md-4'>
          <label htmlhtmlFor="quantitySmall" className="form-label">
            Quantity (Small)
          </label>
          <input
            required
            value={productDetails.quantitySmall}
            onChange={handleOnChange}
            type="number"
            className="form-control"
            id="quantitySmall"
            name='quantitySmall'
          />
        </div>
        <div className='col-md-4'>
          <label htmlhtmlFor="quantityMedium" className="form-label">
            Quantity (Medium)
          </label>
          <input
            required
            value={productDetails.quantityMedium}
            onChange={handleOnChange}
            type="number"
            className="form-control"
            id="quantityMedium"
            name='quantityMedium'
          />
        </div>
        <div className='col-md-4'>
          <label htmlhtmlFor="quantityLarge" className="form-label">
            Quantity (Large)
          </label>
          <input
            required
            value={productDetails.quantityLarge}
            onChange={handleOnChange}
            type="number"
            className="form-control"
            id="quantityLarge"
            name='quantityLarge'
          />
        </div>


        <div className='col-md-12'>
          <label for="formFile" className="form-label">Image</label>
          <input multiple accept="image/*" onChange={handleImagexxx} required className="form-control" type="file" id="formFile" />
        </div>
        {base64Images.length > 0 &&
          <div className='col-md-12'>
            <div className='d-flex flex-wrap gap-3'>
              {
                base64Images.map((item) => (
                  <img width={60} style={{ objectFit: 'cover' }} src={item} alt="img" />
                ))
              }
            </div>
          </div>
        }
        <div className="modal-footer">
          <button type="submit">Save changes</button>
        </div>
      </form>
    </div >
  )
};

export default AddProduct;