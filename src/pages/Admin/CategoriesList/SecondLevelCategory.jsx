import React from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import ThirdLevelCategory from './ThirdLevelCategory';
import categoryService from '../../../services/categories';
import { toast } from 'react-toastify';
import UpdateCategory from './UpdateCategory';
import Swal from 'sweetalert2';

const SecondLevelCategory = ({ setCategories, secondCat, cat, fetchCategories }) => {

  const deleteSecondLevelCategory = () => {
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
          await categoryService.deleteSecondLevelCategory({
            topCategoryId: cat._id,
            secondCategoryId: secondCat._id,
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
    <div>
      <div className='secondLevelCategory'>
        <p onClick={() => {

          setCategories((prev) =>
            prev.map((category) =>
              category._id === cat._id
                ? {
                  ...category,
                  secondLevelCategories: category.secondLevelCategories.map((subCategory) =>
                    subCategory._id === secondCat._id
                      ? { ...subCategory, isShow: !subCategory.isShow }
                      : subCategory
                  ),
                }
                : category
            )
          );

        }}>{secondCat.isShow ? <FaChevronDown /> : <FaChevronRight />} {secondCat.secondLevelCategory} </p>
        <RiDeleteBin6Line onClick={deleteSecondLevelCategory} />
        <UpdateCategory
          title='Second'
          topCategoryId={cat._id}
          id={secondCat._id}
          categoryName={secondCat.secondLevelCategory}
          fetchCategories={fetchCategories}
        />
      </div>
      {secondCat.isShow &&
        secondCat.thirdLevelCategories.map((thirdCat) => (
          <ThirdLevelCategory
            key={thirdCat._id}
            thirdCat={thirdCat}
            topCategoryId={cat._id}
            secondCategoryId={secondCat._id}
            fetchCategories={fetchCategories}
          />
        ))
      }
    </div>
  )
};

export default SecondLevelCategory;