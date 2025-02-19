import React from 'react';
import { BsDot } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import categoryService from '../../../services/categories';
import { toast } from 'react-toastify';
import UpdateCategory from './UpdateCategory';

const ThirdLevelCategory = ({ setLoading, topCategoryId, secondCategoryId, thirdCat, fetchCategories }) => {

  const deleteThirdLevelCategory = async () => {
    try {
      setLoading(true);
      const res = await categoryService.deleteThirdLevelCategory({
        topCategoryId,
        secondCategoryId,
        thirdCategoryId: thirdCat._id,
      });
      fetchCategories();
      toast.error(res.message)
    } catch (error) {
      toast.error(error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='subSubCategory'>
      <p><BsDot /> {thirdCat.thirdLevelCategory}</p>
      <RiDeleteBin6Line onClick={deleteThirdLevelCategory} />
      <UpdateCategory
        title='Third'
        topCategoryId={topCategoryId}
        secondCategoryId={secondCategoryId}
        id={thirdCat._id}
        categoryName={thirdCat.thirdLevelCategory}
        fetchCategories={fetchCategories}
      />
    </div>
  )
};

export default ThirdLevelCategory;