import React, { useState } from 'react';
import { toast } from 'react-toastify';
import categoryService from '../../../../services/categories';
import ButtonLoader from '../../../../components/ButtonLoader/ButtonLoader';


const AddTopCategory = ({ fetchCategories }) => {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTopCategory = async () => {
    if (!categoryName) return toast.error('Please enter top category name!')
    setLoading(true);
    try {
      const res = await categoryService.createTopLevelCategory({ topLevelCategory: categoryName.toLowerCase() });
      fetchCategories();
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
      <button className='outline' type="button" data-bs-toggle="modal" data-bs-target='#exampleModaltop'>
        Add Top Category
      </button>

      <div className="modal fade" id='exampleModaltop' tabIndex="-1" aria-labelledby='exampleModaltopLabel' aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id='exampleModaltopLabel'>Add Top Category</h1>
              <div className="btn-close" data-bs-dismiss="modal" aria-label="Close"></div>
            </div>
            <div className="modal-body pb-4">
              <label htmlFor="categoryName" className="form-label">
                Top Level Category
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
                <button
                  disabled={loading}
                  onClick={handleAddTopCategory}>
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

export default AddTopCategory;