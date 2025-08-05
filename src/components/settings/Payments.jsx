import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaEdit, FaSearch, FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table } from 'reactstrap';
import { paymentSchemaValidation } from '../../validations/PaymentValidation';
import { addPayment, clearMsg, deletePayment, editPayment } from '../../features/PaymentSlice';
import { toast } from 'react-toastify';
import moment from 'moment';

function Payments() {

  const { status, msg, paymentList } = useSelector((state) => state.payments);

  const [loading, setLoading] = useState(true);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editPaymentData, setEditPaymentData] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletePaymentData, setDeletePaymentData] = useState(false);

  const [name, setName] = useState("");

  const [search, setSearch] = useState("");
  const [filteredPayment, setFilteredPayment] = useState([]) ;
  const filterTypes = ['name'];

  const dispatch = useDispatch();

  const handleAdd = () => {
    setAddModal(true);
  };

  const handleEdit = (payment) => {
    setEditPaymentData(payment);
    setName(payment.name);
    setEditModal(true);
  };

  const handleDelete = (paymentId) => {
    setDeletePaymentData(paymentId);
    setDeleteModal(true);
  }

  const performDelete = () => {
    dispatch(deletePayment(deletePaymentData));
    setDeleteModal(false);
  }

  const handleCloseModal = () => {
    setAddModal(false);
    setEditModal(false);
    setDeleteModal(false);
    reset();
  };

  const handleSearch = (query) => {
    setSearch(query);
    const filtered = paymentList.filter(payment =>
      filterTypes.some(type => 
        payment[type]?.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredPayment(filtered);
  };

  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(paymentSchemaValidation),
  });

  const onSubmit = () => {
    if (addModal) {
      const paymentData = {
        name: name,
      }
      dispatch(addPayment(paymentData));
    }
    if (editModal) {
      const paymentData = {
        paymentId: editPaymentData._id,
        name: name,
      };
      dispatch(editPayment(paymentData));
    }
    handleCloseModal();
  };

  useEffect(() => {
    if (status === "success") toast.success(msg);
    if (status === "rejected") toast.error(msg);
    dispatch(clearMsg());

    setFilteredPayment(paymentList);
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
        <Button color='info' onClick={handleAdd}>Add Payment</Button>
      </div>
      {/* Add Modal */}
      <Modal centered isOpen={addModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add Payment</ModalHeader>
          <ModalBody>
            <Label htmlFor='name'>Name</Label>
              <input
                id='name'
                type='text'
                placeholder='Enter Name'
                className={'form-control' + (errors.name ? ' is-invalid': '')}
                {...register("name", {onChange: (e) => setName(e.target.value)})}
                readOnly={status === "pendingAddPayment"}
              />
              <p className='error'>{errors.name?.message}</p>
            </ModalBody>
            <ModalFooter>
              <Button color='secondary' outline onClick={handleCloseModal} disabled={status === "pendingAddPayment"}>
                Cancel
              </Button>
              <Button color='info' type='submit' disabled={status === "pendingAddPayment"}>
                {(status === "pendingAddPayment") && <Spinner size='sm' />} Save
              </Button>
            </ModalFooter>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal centered isOpen={editModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit Payment ({editPaymentData?.name})</ModalHeader>
          <ModalBody>
            <Label htmlFor='name'>Name*</Label>
            <input
              id='name'
              type='text'
              placeholder='Enter Name'
              value={name}
              className={'form-control' + (errors.name ? ' is-invalid' : '')}
              {...register("name", {onChange: (e) => setName(e.target.value)})}
              readOnly={status === "pendingEditPayment"}
            />
            <p className='error'>{errors.name?.message}</p>
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' outline onClick={handleCloseModal} disabled={status === "pendingEditPayment"}>
              Cancel
            </Button>
            <Button color='warning' type='submit' disabled={status === "pendingEditPayment"}>
              {(status === "pendingEditPayment") && <Spinner size='sm' />} Save
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal centered isOpen={deleteModal}>
        <ModalHeader>Delete Payment</ModalHeader>
        <ModalHeader>Are you sure you want to delete this payment?</ModalHeader>
        <ModalFooter>
          <Button color='secondary' outline onClick={handleCloseModal} disabled={status === "pendingDeletePayment"}>
            Cancel
          </Button>
          <Button color='danger' onClick={performDelete} disabled={status === "pendingDeletePayment"}>
            {(status === "pendingDeletePayment") && <Spinner size='sm' />} Perfomanently Delete
          </Button> 
        </ModalFooter>
      </Modal>

      <div className='content-display settings'>
        {
          (loading || (status === "pendingGetPayment")) ?
          <center>
            <Spinner className='large' type='grow'/>
          </center> :
          filteredPayment.length ?
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredPayment?.map((p) => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>
                      <div className='actions'>
                        <Button color='warning' onClick={() => handleEdit(p)}><FaEdit/></Button>
                        <Button color='danger' onClick={() => handleDelete(p._id)}><FaTrashAlt/></Button>
                      </div>

                      <div className='dateInfo'>
                        Created: {moment(p.createdAt).format('D/M/yyyy')} | Modified: {moment(p.updatedAt).format('D/M/yyyy')}
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table> :
          <div className='no-result'>
            <h1><FaSearch/>No matching results</h1>
          </div>
        }
      </div>
    </div>
  )
}

export default Payments