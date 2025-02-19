import React, { useState } from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import categoryService from '../../../services/categories';
import { toast } from 'react-toastify';

const UpdateCategory = ({ topCategoryId, secondCategoryId, id, categoryName, title, fetchCategories }) => {
  const [category, setCategory] = useState(categoryName);
  const [loading, setLoading] = useState(false);


  const handleUpdateCategory = async (e) => {
    if (!category) return toast.error('Please enter category name!')
    setLoading(true);
    try {
      let res;
      if (title === 'Top') {
        res = await categoryService.updateTopLevelCategory(
          {
            topCategoryId: id,
            topCategory: category
          }
        );
      } else if (title === 'Second') {
        res = await categoryService.updateSecondLevelCategory(
          {
            topCategoryId,
            secondCategoryId: id,
            secondCategory: category
          }
        );
      } else {
        res = await categoryService.updateThirdLevelCategory(
          {
            topCategoryId,
            secondCategoryId,
            thirdCategoryId: id,
            thirdCategory: category
          }
        );
      }

      toast.success(res.message)
    } catch (error) {
      toast.error(error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <MdOutlineEdit style={{ color: '#2E276F' }} data-bs-toggle="modal" data-bs-target={`#exampleModal${id}`} />

      <div className="modal fade" data-bs-backdrop="static" id={`exampleModal${id}`} tabIndex="-1" aria-labelledby={`exampleModalLabel${id}`} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`exampleModalLabel${id}`}>{`Update ${title} Level Category`}</h1>
              <div onClick={() => fetchCategories()} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></div>
            </div>
            <div className="modal-body">
              <label htmlFor="category" className="form-label">
                Top Level Category
              </label>
              <input
                autoComplete="off"
                type="text"
                className="form-control"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div class="modal-footer">
              <div className='mx-auto'>
                <button disabled={loading} onClick={handleUpdateCategory}>
                  {
                    loading ?
                      <div class="spinner-border d-flex mx-auto" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                      :
                      "Update"
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default UpdateCategory;