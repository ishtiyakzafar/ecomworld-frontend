import React, { useEffect, useState } from 'react';
import './CategoriesList.scss';
import { toast } from 'react-toastify';
import categoryService from '../../../services/categories';
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { RiDeleteBin6Line } from 'react-icons/ri';
import SecondLevelCategory from './SecondLevelCategory';
import UpdateCategory from './UpdateCategory';
import AddTopCategory from './AddCategories/AddTopCategory';
import AddSecondCategory from './AddCategories/AddSecondCategory';
import AddThirdCategory from './AddCategories/AddThirdCategory';
import { addIsShowToCategories } from '../../../Helper';
import Toast from '../../../components/Toast/Toast';
import Swal from 'sweetalert2';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchCategories = async () => {
    try {
      const res = await categoryService.getCategories();
      const updatedCategories = addIsShowToCategories(res, false);
      setCategories(updatedCategories);
    } catch (error) {
      toast.error(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, [])

  const deleteTopLevelCategory = (id) => {
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
          await categoryService.deleteTopLevelCategory({ topCategoryId: id });
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
      <Toast />
      <div className='addCategory'>
        <AddTopCategory fetchCategories={fetchCategories} />
        <AddSecondCategory
          topCategories={categories.map((item) => ({ _id: item._id, topLevelCategory: item.topLevelCategory }))}
          fetchCategories={fetchCategories}
        />
        <AddThirdCategory
          topCategories={categories.map((item) => ({ _id: item._id, topLevelCategory: item.topLevelCategory }))}
          categories={categories}
          fetchCategories={fetchCategories}
        />
      </div>

      {
        loading ?
          <p className='pt-3'>Loading...</p>
          :
          categories.length > 0
            ?
            categories.map((cat) => (
              <div key={cat._id} className='categoryList'>
                <div className='topLevelCategory'>
                  <p
                    onClick={() => {
                      setCategories((prev) =>
                        prev.map((category) =>
                          category._id === cat._id ? { ...category, isShow: !category.isShow } : category
                        )
                      );
                    }}
                  >
                    {cat.isShow ? <FaChevronDown /> : <FaChevronRight />} {cat.topLevelCategory}
                  </p>
                  <RiDeleteBin6Line onClick={() => deleteTopLevelCategory(cat._id)} />
                  <UpdateCategory
                    title='Top'
                    id={cat._id}
                    categoryName={cat.topLevelCategory}
                    fetchCategories={fetchCategories}
                  />
                </div>

                {cat.isShow &&
                  cat.secondLevelCategories.map((secondCat) => (
                    <SecondLevelCategory
                      key={secondCat._id}
                      setCategories={setCategories}
                      secondCat={secondCat}
                      cat={cat}
                      fetchCategories={fetchCategories}
                    />
                  ))
                }
              </div>
            ))
            :
            <p className='pt-3'>Data not found!</p>
      }
    </div>
  )
};

export default CategoriesList;