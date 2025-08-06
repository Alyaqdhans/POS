import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { FaDatabase, FaEdit, FaSearch, FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table } from 'reactstrap';
import { branchSchemaValidation } from '../../validations/BranchValidation';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { addBranch, clearMsg, deleteBranch, editBranch } from '../../features/BranchSlice';
import moment from 'moment';

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

  const handleEdit = (branch) => {
    setEditBranchData(branch);
    setName(branch.name);
    setMobile(branch.mobile);
    setEditModal(true);
  }

  const handleDelete = (branchId) => {
    setDeleteBranchData(branchId);
    setDeleteModal(true);
  };

  const performDelete = () => {
    dispatch(deleteBranch(deleteBranchData));
    setDeleteModal(false);
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
    if (editModal) {
      const branchData = {
        branchId: editBranchData._id,
        name: name,
        mobile: mobile,
      };
      dispatch(editBranch(branchData));
    }
    handleCloseModal();
  };

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
              {(status === "pendingAddBranch") && <Spinner size='sm' />} Save
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal centered isOpen={editModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit Branch ({editBranchData?.name})</ModalHeader>
          <ModalBody>
            <Label htmlFor='name'>Name*</Label>
            <input
              id='name'
              type='text'
              placeholder='Enter Name'
              value={name}
              className={'form-control' + (errors.name ? ' is-invalid' : '')}
              {...register("name", {onChange: (e) => setName(e.target.value)})}
              readOnly={status === "pendingEditBranch"}
            />
            <p className='error'>{errors.name?.message}</p>
            <Label htmlFor='mobile'>Mobile*</Label>
            <input
              id='mobile'
              type='text'
              placeholder='Enter Phone Number'
              value={mobile}
              className={'form-control' + (errors.mobile ? ' is-invalid' : '')}
              {...register("mobile", {onChange: (e) => setMobile(e.target.value)})}
              readOnly={status === "pendingEditBranch"}
            />
            <p className='error'>{errors.mobile?.message}</p>
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' outline onClick={handleCloseModal} disabled={status === "pendingEditBranch"}>
              Cancel
            </Button>
            <Button color='warning' type='submit' disabled={status === "pendingEditBranch"}>
              {(status === "pendingEditBranch") && <Spinner size='sm' />} Save
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal centered isOpen={deleteModal}>
        <ModalHeader>Delete Branch</ModalHeader>
        <ModalHeader>Are you sure you want to delete this branch?</ModalHeader>
        <ModalFooter>
          <Button color='secondary' outline onClick={handleCloseModal} disabled={status === "pendingDeleteBranch"}>
            Cancel
          </Button>
          <Button color='danger' onClick={performDelete} disabled={status === "pendingDeleteBranch"}>
            {(status === "pendingDeleteBranch") && <Spinner size='sm' />} Perfomanently Delete
          </Button> 
        </ModalFooter>
      </Modal>

      <div className='content-display settings'>
        {
          (loading || (status === "pendingGetBranches")) ? (
            <center>
              <Spinner className='large' type='grow' />
            </center>
          ) : !branchList.length ? (
            <div className='no-result'>
              <h1><FaDatabase/>Database is empty</h1>
            </div>
          ) : !filteredBranches.length ? (
            <div className='no-result'>
              <h1><FaSearch/>No matching results</h1>
            </div>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredBranches?.map((b) => (
                    <tr key={b._id}> 
                      <td>{b.name}</td>
                      <td>{b.mobile}</td>
                      <td className='actions'>
                        <div className='actionButtons'>
                          <Button color='warning' onClick={() => handleEdit(b)}><FaEdit/></Button>
                          <Button color='danger' onClick={() => handleDelete(b._id)}><FaTrashAlt/></Button>
                        </div>

                        <div className='dateInfo'>
                          Created: {moment(b.createdAt).format('D/M/yyyy')} | Modified: {moment(b.updatedAt).format('D/M/yyyy')}
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

export default Branches