import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap';
import { branchSchemaValidation } from '../../validations/BranchValidation';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { addBranch, clearMsg } from '../../features/BranchSlice';

function Branches() {

  const { status, msg, branchList } = useSelector((state) => state.branches);

  const [loading, setLoading] = useState(true);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editBranchData, setEditBranchData] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteBranchData, setDeleteBranchData] = useState(false);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const [search, setSearch] = useState("");
  const [filteredBranches, setFilteredBranches] = useState([]);
  const filterTypes = ['name', 'mobile'];

  const dispatch = useDispatch();

  const handleAdd = () => {
    setAddModal(true)
  };

  const handleCloseModal = () => {
    setAddModal(false);
    setEditModal(false);
    setDeleteModal(false);
    reset();
  }

  const handleSearch = (query) => {
    setSearch(query);
    const filtered = branchList.filter(branch => 
      filterTypes.some(type =>
        branch[type]?.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredBranches(filtered);
  };

  const {register, handleSubmit, formState: {errors}, reset} = useForm({
      resolver: yupResolver(branchSchemaValidation),
  });

  const onSubmit = () => {
    if (addModal) {
      const branchData = {
        name: name,
        mobile: mobile,
      }
      dispatch(addBranch(branchData));
    }
    handleCloseModal();
  }

  useEffect(() => {
    if (status === "success") toast.success(msg);
    if (status === "rejected") toast.error(msg);
    dispatch(clearMsg());

    setFilteredBranches(branchList);
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
        <Button color='info' onClick={handleAdd}>Add Branch</Button>
      </div>
      {/* Add Modal */}
      <Modal centered isOpen={addModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add Branch</ModalHeader>
          <ModalBody>
            <Label htmlFor='name'>Name</Label>
            <input
              id='name'
              type='text'
              placeholder='Enter Name'
              className={'form-control' + (errors.name ? ' is-invalid': '')}
              {...register("name", {onChange: (e) => setName(e.target.value)})}
              readOnly={status === "pendingAddBranch"}
            />
            <p className='error'>{errors.name?.message}</p>
            <Label htmlFor='mobile'>Mobile</Label>
            <input
              id='mobile'
              type='text'
              placeholder='Enter Mobile'
              className={'form-control' + (errors.mobile ? ' is-invalid': '')}
              {...register("mobile", {onChange: (e) => setMobile(e.target.value)})}
              readOnly={status === "pendingAddBranch"}
            />
            <p className='error'>{errors.mobile?.message}</p>
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' outline onClick={handleCloseModal} disabled={status === "pendingAddBranch"}>
              Cancel
            </Button>
            <Button color='info' type='submit' disabled={status === "pendingAddBranch"}>
              {(status === "pendingAddBranch") && <Spinner size='sm' />}Save
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  )
}

export default Branches