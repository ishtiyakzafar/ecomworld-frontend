import React, { useState } from 'react';
import { toast } from 'react-toastify';
import categoryService from '../../../../services/categories';
import ButtonLoader from '../../../../components/ButtonLoader/ButtonLoader';


const AddThirdCategory = ({ categories, topCategories, fetchCategories }) => {
  const [topCategoryId, setTopCategoryId] = useState("");
  const [secondCategoryId, setSecondCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [secondCategories, setSecondCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddThirdCategory = async () => {
    if (!topCategoryId) {
      return toast.error('Please select top category!');
    } else if (!secondCategoryId) {
      return toast.error('Please select second category!');
    } else if (!categoryName) {
      return toast.error('Please enter third category name!')
    }
    setLoading(true);
    try {
      const res = await categoryService.createThirdLevelCategory({
        categoryId: topCategoryId,
        secondLevelCategoryId: secondCategoryId,
        thirdLevelCategory: categoryName.toLowerCase()
      });
      fetchCategories();
      // setTopCategoryId("");
      // setSecondCategoryId("");
      setCategoryName("");
      toast.success(res.message)
    } catch (error) {
      toast.error(error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button className='outline' type="button" data-bs-toggle="modal" data-bs-target='#exampleModalthird'>
        Add Third Category
      </button>

      <div className="modal fade" id='exampleModalthird' tabIndex="-1" aria-labelledby='exampleModalthirdLabel' aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id='exampleModalthirdLabel'>Add Third Category</h1>
              <div className="btn-close" data-bs-dismiss="modal" aria-label="Close"></div>
            </div>
            <div className="modal-body pb-4">
              <label htmlFor="categoryName" className="form-label">
                Top Level Category
              </label>
              <select
                value={topCategoryId}
                onChange={(e) => {
                  setTopCategoryId(e.target.value)
                  const result = categories.find((item) => item._id === e.target.value)?.secondLevelCategories;
                  setSecondCategories(result.map((item) => ({ _id: item._id, secondLevelCategory: item.secondLevelCategory })));
                }}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Select top category</option>
                {
                  topCategories.map((item) => (
                    <option key={item._id} value={item._id}>{item.topLevelCategory}</option>
                  ))
                }
              </select>

              <label htmlFor="categoryName" className="form-label pt-3">
                Second Level Category
              </label>
              <select
                value={secondCategoryId}
                onChange={(e) => setSecondCategoryId(e.target.value)}
                className="form-select"
                aria-label="Default select example1"
              >
                <option value="">Select second category</option>
                {
                  secondCategories.map((item) => (
                    <option key={item._id} value={item._id}>{item.secondLevelCategory}</option>
                  ))
                }
              </select>

              <label htmlFor="categoryName" className="form-label pt-3">
                Third Level Category
              </label>
              <input
                autoComplete="off"
                type="text"
                className="form-control"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <div className='mx-auto'>
                <button disabled={loading} onClick={handleAddThirdCategory}>
                  {loading ? <ButtonLoader /> : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
};

export default AddThirdCategory;