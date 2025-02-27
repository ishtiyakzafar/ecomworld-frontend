import React, { useState } from 'react';
import { toast } from 'react-toastify';
import categoryService from '../../../../services/categories';
import ButtonLoader from '../../../../components/ButtonLoader/ButtonLoader';


const AddSecondCategory = ({ topCategories, fetchCategories }) => {
  const [categoryName, setCategoryName] = useState("");
  const [topCategoryId, setTopCategoryId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddSecondCategory = async () => {
    if (!topCategoryId) {
      return toast.error('Please select top category!');
    } else if (!categoryName) {
      return toast.error('Please enter second category name!')
    }

    setLoading(true);
    try {
      const res = await categoryService.createSecondLevelCategory({
        categoryId: topCategoryId,
        secondLevelCategory: categoryName.toLowerCase()
      });
      fetchCategories();
      setTopCategoryId("");
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
      <button className='outline' type="button" data-bs-toggle="modal" data-bs-target='#exampleModalsec'>
        Add Second Category
      </button>

      <div className="modal fade" id='exampleModalsec' data-bs-backdrop="static" tabIndex="-1" aria-labelledby='exampleModalsecLabel' aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id='exampleModalsecLabel'>Add Second Category</h1>
              <div className="btn-close" data-bs-dismiss="modal" aria-label="Close"></div>
            </div>
            <div className="modal-body pb-4">
              <label htmlFor="categoryName" className="form-label">
                Top Level Category
              </label>
              <select value={topCategoryId} onChange={(e) => setTopCategoryId(e.target.value)} className="form-select" aria-label="Default select example">
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
                <button disabled={loading} onClick={handleAddSecondCategory}>
                  {loading ? <ButtonLoader /> : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default AddSecondCategory;