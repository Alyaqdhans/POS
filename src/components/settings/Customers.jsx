import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaDatabase, FaEdit, FaSearch, FaTrashAlt } from 'react-icons/fa'
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table } from 'reactstrap'
import { customerSchemaValidation } from '../../validations/CustomerValidation';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer, deleteCustomr, editCustomer } from '../../features/CustomerSlice';
import moment from 'moment';
import { toast } from 'react-toastify';

function Customers() {
  const { status, msg, customerList } = useSelector((state) => state.customers);

  const [loading, setLoading] = useState(true);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editCustomerData, setEditCustomerData] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteCustomerData, setDeleteCustomerData] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [search, setSearch] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const filterTypes = ['name', 'email', 'mobile'];

  const dispatch = useDispatch();

  const handleAdd = () => {
    setAddModal(true)
  }

  const handleEdit = (customer) => {
    setEditCustomerData(customer)
    setName(customer.name)
    setEmail(customer.email)
    setMobile(customer.mobile)
    setEditModal(true)
  }

  const handleDelete = (custumerId) => {
    setDeleteCustomerData(custumerId)
    setDeleteModal(true)
  }

  const performDelete = () => {
    dispatch(deleteCustomr(deleteCustomerData));
  }

  const handleCloseModal = () => {
    setAddModal(false);
    setEditModal(false);
    setDeleteModal(false);
    reset();
  }

  const handleSearch = (query) => {
    setSearch(query);
    const filtered = customerList.filter(customer =>
      filterTypes.some(type => 
        customer[type]?.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredCustomers(filtered);
  };

  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(customerSchemaValidation),
  })

  const onSubmit = () => {
    if (addModal) {
      const customerData = {
        name: name,
        email: email,
        mobile: mobile,
      }
      dispatch(addCustomer(customerData));
    }

    if (editModal) {
      const customerData = {
        customerId: editCustomerData._id,
        name: name,
        mobile: mobile,
      }
      dispatch(editCustomer(customerData));
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
    
    setFilteredCustomers(customerList);
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
          <FaSearch size={20}/>
        </div>
        <Button color='info' onClick={handleAdd} disabled={status === "pendingGetCustomers"}>Add Customer</Button>
      </div>
      {/* Add Modal */}
      <Modal centered isOpen={addModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add Customer</ModalHeader>
          <ModalBody>
            <Label htmlFor='name'>Name*</Label>
            <input
              id='name'
              type='text'
              placeholder='Enter Name'
              className={'form-control' + (errors.name ? ' is-invalid' : '')}
              {...register("name", {onChange: (e) => setName(e.target.value)})}
              readOnly={status === "pendingAddCustomer"}
            />
            <p className='error'>{errors.name?.message}</p>

            <Label htmlFor='email'>Email</Label>
            <input
              id='email'
              type='text'
              placeholder='Enter Email'
              className={'form-control' + (errors.email ? ' is-invalid' : '')}
              {...register("email", {onChange: (e) => setEmail(e.target.value)})}
              readOnly={status === "pendingAddCustomer"}
            />
            <p className='error'>{errors.email?.message}</p>

            <Label htmlFor='mobile'>Phone Number</Label>
            <input
              id='mobile'
              type='text'
              placeholder='Enter Phone Number'
              className={'form-control' + (errors.mobile ? ' is-invalid' : '')}
              {...register("mobile", {onChange: (e) => setMobile(e.target.value)})}
              readOnly={status === "pendingAddCustomer"}
            />
            <p className='error'>{errors.mobile?.message}</p>
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' outline onClick={handleCloseModal} disabled={status === "pendingAddCustomer"}>
              Cancel
            </Button>
            <Button color='info' type='submit' disabled={status === "pendingAddCustomer"}>
              {(status === "pendingAddCustomer") && <Spinner size='sm' />} Save
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal centered isOpen={editModal}>
        <form onSubmit={handleSubmit(onSubmit)}> 
          <ModalHeader>Edit Customer ({editCustomerData?.email})</ModalHeader>
          <ModalBody>
            <Label htmlFor='name'>Name*</Label>
            <input
              id='name'
              type='text'
              placeholder='Enter Name'
              value={name}
              className={'form-control' + (errors.name ? ' is-invalid' : '')}
              {...register("name", { onChange: (e) => setName(e.target.value) })}
              readOnly={status === "pendingEditCustomer"}
            />
            <p className='error'>{errors.name?.message}</p>

            <Label htmlFor='email'>Email</Label>
            <input
              id='email'
              type='text'
              placeholder='Enter Email'
              value={email}
              className={'form-control' + (errors.email ? ' is-invalid' : '')}
              {...register("email", {onChange: (e) => setEmail(e.target.value)})}
              readOnly={status === "pendingEditCustomer"}
            />
            <p className='error'>{errors.email?.message}</p>

            <Label htmlFor='nobile'>Phone Number</Label>
            <input
              id='mobile'
              type='text'
              placeholder='Enter Phone Number'
              value={mobile}
              className={'form-control' + (errors.mobile ? ' is-invalid' : '')}
              {...register("mobile", { onChange: (e) => setMobile(e.target.value) })}
              readOnly={status === "pendingEditCustomer"}
            />
            <p className='error'>{errors.mobile?.message}</p>
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' outline onClick={handleCloseModal} disabled={status === "pendingEditCustomer"}>
              Cancel
            </Button>
            <Button color='warning' type='submit' disabled={status === "pendingEditCustomer"}>
              {(status === "pendingEditCustomer") && <Spinner size='sm' />} Save
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal centered isOpen={deleteModal}>
        <ModalHeader>Delete Customer</ModalHeader>
        <ModalBody>Are you sure you want to delete this Customer?</ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={handleCloseModal} disabled={status === "pendingDeleteCustomer"}>
            Cancel
          </Button>
          <Button color='danger' onClick={performDelete} disabled={status === "pendingDeleteCustomer"}>
            {(status === "pendingDeleteCustomer") && <Spinner size='sm' />} Permanently Delete
          </Button>
        </ModalFooter>
      </Modal>

      <div className='content-display settings'>
        {
          (loading || (status === "pendingGetCustomers")) ? (
            <center>
              <Spinner className='large' type='grow' />
            </center>
          ) : !customerList.length ? (
            <div className='no-result'>
              <h1><FaDatabase/>Database is empty</h1>
            </div>
          ) : !filteredCustomers.length ? (
            <div className='no-result'>
              <h1><FaSearch/>No matching results</h1>
            </div>
          ) : (
            <Table striped>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredCustomers?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.mobile}</td>
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

export default Customers