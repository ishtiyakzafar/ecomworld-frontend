import React from 'react';
import { BsDot } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import categoryService from '../../../services/categories';
import UpdateCategory from './UpdateCategory';
import Swal from 'sweetalert2';

const ThirdLevelCategory = ({ topCategoryId, secondCategoryId, thirdCat, fetchCategories }) => {

  const deleteThirdLevelCategory = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this category!",
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      preConfirm: async () => {
        try {
          await categoryService.deleteThirdLevelCategory({
            topCategoryId,
            secondCategoryId,
            thirdCategoryId: thirdCat._id,
          });
          fetchCategories();
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
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