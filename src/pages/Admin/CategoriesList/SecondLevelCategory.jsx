import React from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import ThirdLevelCategory from './ThirdLevelCategory';
import categoryService from '../../../services/categories';
import { toast } from 'react-toastify';
import UpdateCategory from './UpdateCategory';

const SecondLevelCategory = ({ setLoading, setCategories, secondCat, cat, fetchCategories }) => {

  const deleteSecondLevelCategory = async () => {
    setLoading(true);
    try {
      const res = await categoryService.deleteSecondLevelCategory({
        topCategoryId: cat._id,
        secondCategoryId: secondCat._id,
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
            setLoading={setLoading}
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