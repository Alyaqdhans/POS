import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaEdit, FaSearch, FaTrashAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table } from 'reactstrap'
import { categorySchemaValidation } from '../../validations/CategoryValidation';
import { addCategory, deleteCategory, editCategory } from '../../features/CategorySlice';
import { toast } from 'react-toastify';
import moment from 'moment';

function Categories() {
  const { status, msg, categoryList } = useSelector((state) => state.categories);

  const [loading, setLoading] = useState(true);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteCategoryData, setDeleteCategoryData] = useState(false);

  const [name, setName] = useState("");

  const [search, setSearch] = useState("");
  const [filteredCatrgories, setFilteredCategories] = useState([]);
  const filterTypes = ['name'];

  const dispatch = useDispatch();

  const handleAdd = () => {
    setAddModal(true)
  };

  const handleEdit = (category) => {
    setEditCategoryData(category)
    setName(category.name)
    setEditModal(true)
  }

  const handleDelete = (categoryId) => {
    setDeleteCategoryData(categoryId);
    setDeleteModal(true);
  }

  const perfomDelete = () => {
    dispatch(deleteCategory(deleteCategoryData));
  }

  const handleCloseModal = () => {
    setAddModal(false);
    setEditModal(false);
    setDeleteModal(false);
    reset();
  }

  const handleSearch = (query) => {
    setSearch(query);
    const filtered = categoryList.filter(category => 
      filterTypes.some(type =>
        category[type]?.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredCategories(filtered);
  };

  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(categorySchemaValidation),
  });

  const onSubmit = () => {
    if (addModal) {
      const categoryData = {
        name: name,
      }
      dispatch(addCategory(categoryData));
    }
    if (editModal) {
      const categoryData = {
        categoryId: editCategoryData._id,
        name: name,
      }
      dispatch(editCategory(categoryData));
    }
  };

  useEffect(() => {
    if (status === "success" && msg !== null) {
      toast.success(msg);
      handleCloseModal();
    }
    if (status === "rejected" && msg !== null) {
      toast.error(msg);
      handleCloseModal();
    }

    setFilteredCategories(categoryList);
    handleSearch(search);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [status]);

  return (
    <div className='content'>
      <div className='search-section'>
        <div className='search'>
          <input type='search' placeholder={`Search`} className='form-control' onChange={(e) => handleSearch(e.target.value)} />
          <FaSearch size={20} />
        </div>
        <Button color='info' onClick={handleAdd}>Add Category</Button>
      </div>
      {/* Add Modal */}
      <Modal centered isOpen={addModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add Category</ModalHeader>
          <ModalBody>
            <Label htmlFor='name'>Name*</Label>
            <input
              id='name'
              type='text'
              placeholder='Enter Name'
              className={'form-control' + (errors.name ? ' is-invalid': '')}
              {...register("name", {onChange: (e) => setName(e.target.value)})}
              readOnly={status === "pendingAddCategory"}
            />
            <p className='error'>{errors.name?.message}</p>
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' outline onClick={handleCloseModal} disabled={status === "pendingAddCategory"}>
              Cancel
            </Button>
            <Button color='info' type='submit' disabled={status === "pendingAddCategory"}>
              {(status === "pendingAddCategory") && <Spinner size='sm' />} Save
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal centered isOpen={editModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit Category ({editCategoryData?.name})</ModalHeader>
          <ModalBody>
            <Label htmlFor='name'>Name*</Label>
            <input
              id='name'
              type='text'
              placeholder='Enter Name'
              value={name}
              className={'form-control' + (errors.name ? ' is-invalid' : '')}
              {...register("name", {onChange: (e) => setName(e.target.value)})}
              readOnly={status === "pendingEditCategory"}
            />
            <p className='error'>{errors.name?.message}</p>
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' outline onClick={handleCloseModal} disabled={status === "pendingEditCategory"}>
              Cancel
            </Button>
            <Button color='warning' type='submit' disabled={status === "pendingEditCategory"}>
              {(status === "pendingEditCategory") && <Spinner size='sm' />} Save
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal centered isOpen={deleteModal}>
        <ModalHeader>Delete Category</ModalHeader>
        <ModalBody>Are you sure you want to delete this Category?</ModalBody>
        <ModalFooter>
          <Button color='secondary' outline onClick={handleCloseModal} disabled={status === "pendingDeleteCategory"}>
            Cancel
          </Button>
          <Button color='danger' onClick={perfomDelete} disabled={status === "pendingDeleteCategory"}>
            {(status === "pendingDeleteCategory") && <Spinner size='sm' />} Permanently Delete
          </Button>
        </ModalFooter>
      </Modal>

      <div className='content-display settings'>
        {
          (loading || (status === "pendingGetCategories")) ? (
            <center>
              <Spinner className='large' type='grow' />
            </center>
          ) : !categoryList.length ? (
            <div className='no-result'>
              <h1><FaDatabase/>Database is empty</h1>
            </div>
          ) : !filteredCatrgories.length ? (
            <div className='no-result'>
              <h1><FaSearch/>No matching results</h1>
            </div>
          ) : (
            <Table striped>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredCatrgories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td className='actions'>
                        <div className='actionButtons'>
                          <Button color='warning' onClick={() => handleEdit(c)}><FaEdit /></Button>
                          <Button color='danger' onClick={() => handleDelete(c._id)}><FaTrashAlt /></Button>
                        </div>

                        <div className='dateInfo'>
                          Created: {moment(c.createdAt).format('D/M/yyyy')} | Modified: {moment(c.updatedAt).format('D/M/yyyy')}
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          )
        }
      </div>
    </div>
  )
}

export default Categories