import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaDatabase, FaEdit, FaSearch, FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table } from 'reactstrap';
import { supplierSchemaValidation } from '../../validations/SupplierValidation';
import { addSupplier, deleteSupplier, editSupplier, clearMsg } from '../../features/SupplierSlice';
import { toast } from 'react-toastify';
import moment from 'moment';

function Suppliers() {
  const { status, msg, supplierList } = useSelector((state) => state.suppliers);

  const [loading, setLoading] = useState(true);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editSupplierData, setEditSupplierData] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteSupplierData, setDeleteSupplierData] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [fax, setFax] = useState("");
  const [address, setAddress] = useState("");
  const [tax, setTax] = useState("");

  const [search, setSearch] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState("");
  const filterTypes = ['name', 'email', 'mobile', 'address'];

  const dispatch = useDispatch();

  const handleAdd = () => {
    setAddModal(true)
  }

  const handleEdit = (supplier) => {
    setEditSupplierData(supplier)
    setName(supplier.name)
    setEmail(supplier.email)
    setMobile(supplier.mobile)
    setFax(supplier.fax)
    setAddress(supplier.address)
    setTax(supplier.tax)
    setEditModal(true)
  }

  const handleDelete = (supplierId) => {
    setDeleteSupplierData(supplierId)
    setDeleteModal(true)
  }

  const performDelete = () => {
    dispatch(deleteSupplier(deleteSupplierData));
    setDeleteModal(false);
  }

  const handleCloseModal = () => {
    setAddModal(false);
    setEditModal(false);
    setDeleteModal(false);
    reset();
  }

  const handleSearch = (query) => {
    setSearch(query);
    const filtered = supplierList.filter(supplier =>
      filterTypes.some(type =>
        supplier[type]?.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredSuppliers(filtered);
  }

  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(supplierSchemaValidation), 
  });

  const onSubmit = () => {
    if (addModal) {
      const supplierData = {
        name: name,
        email: email, 
        mobile: mobile,
        fax: fax,
        address: address,
        tax: tax,
      }
      dispatch(addSupplier(supplierData));
    }

    if (editModal) {
      const supplierData = {
        supplierId: editSupplierData._id,
        name: name,
        mobile: mobile,
        fax: fax,
        address: address,
        tax: tax,
      }
      dispatch(editSupplier(supplierData));
    }
    handleCloseModal();
  }

  useEffect(() => {
    if (status === "success") toast.success(msg);
    if (status === "rejected") toast.error(msg);
    dispatch(clearMsg());

    setFilteredSuppliers(supplierList);
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
        <Button color='info' onClick={handleAdd}>Add Supplier</Button>
      </div>
      {/* Add Modal */}
      <Modal centered isOpen={addModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add Supplier</ModalHeader>
          <ModalBody>
            <Label htmlFor='name'>Name*</Label>
            <input
              id='name'
              type='text'
              placeholder='Enter Name'
              className={'form-control' + (errors.name ? ' is-invalid' : '')}
              {...register("name", {onChange: (e) => setName(e.target.value)})}
              readOnly={status === "pendingAddSupplier"}
            />
            <p className='error'>{errors.name?.message}</p>

            <Label htmlFor='email'>Email</Label>
            <input
              id='email'
              type='text'
              placeholder='Enter Email'
              className={'form-control' + (errors.email ? ' is-invalid' : '')}
              {...register("email", {onChange: (e) => setEmail(e.target.value)})}
              readOnly={status === "pendingAddSupplier"}
            />
            <p className='error'>{errors.email?.message}</p>

            <Label htmlFor='mobile'>Phone Number</Label>
            <input
              id='mobile'
              type='text'
              placeholder='Enter Phone Number'
              className={'form-control' + (errors.mobile ? ' is-invalid' : '')}
              {...register("mobile", {onChange: (e) => setMobile(e.target.value)})}
              readOnly={status === "pendingAddSupplier"}
            />
            <p className='error'>{errors.mobile?.message}</p>

            <Label htmlFor='fax'>Fax</Label>
            <input
              id='fax'
              type='text'
              placeholder='Enter Fax'
              className={'form-control' + (errors.fax ? ' is-invalid' : '')}
              {...register("fax", {onChange: (e) => setFax(e.target.value)})}
              readOnly={status === "pendingAddSupplier"}
            />
            <p className='error'>{errors.fax?.message}</p>

            <Label htmlFor='address'>Address</Label>
            <input
              id='address'
              type='text'
              placeholder='Enter Address'
              className={'form-control' + (errors.address ? ' is-invalid' : '')}
              {...register("address", {onChange: (e) => setAddress(e.target.value)})}
              readOnly={status === "pendingAddSupplier"}
            />
            <p className='error'>{errors.address?.message}</p>

            <Label htmlFor='tax'>Tax</Label>
            <input
              id='tax'
              type='text'
              placeholder='Enter Tax'
              className={'form-control' + (errors.tax ? ' is-invalid' : '')}
              {...register("tax", {onChange: (e) => setTax(e.target.value)})}
              readOnly={status === "pendingAddSupplier"}
            />
            <p className='error'>{errors.tax?.message}</p>
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' outline onClick={handleCloseModal} disabled={status === "pendingAddSupplier"}>
              Cancel
            </Button>
            <Button color='info' type='submit' disabled={status === "pendingAddSupplier"}>
              {(status === "pendingAddSupplier") && <Spinner size='sm' />} Save
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal centered isOpen={editModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit Supplier ({editSupplierData?.email}) </ModalHeader>
          <ModalBody>
            <Label htmlFor='name'>Name*</Label>
            <input
              id='name'
              type='text'
              placeholder='Enter Name'
              value={name}
              className={'form-control' + (errors.name ? ' is-invalid' : '')}
              {...register("name", { onChange: (e) => setName(e.target.value) })}
              readOnly={status === "pendingEditSupplier"}
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
              readOnly={status === "pendingAddSupplier"}
            />
            <p className='error'>{errors.email?.message}</p>

            <Label htmlFor='mobile'>Phone Number</Label>
            <input
              id='mobile'
              type='text'
              placeholder='Enter Phone Number'
              value={mobile}
              className={'form-control' + (errors.mobile ? ' is-invalid' : '')}
              {...register("mobile", { onChange: (e) => setMobile(e.target.value) })}
              readOnly={status === "pendingEditSupplier"}
            />
            <p className='error'>{errors.mobile?.message}</p>

            <Label htmlFor='fax'></Label>
            <input
              id='fax'
              type='text'
              placeholder='Enter Tax'
              value={tax}
              className={'form-control' + (errors.fax ? ' is-invalid' : '')}
              {...register("fax", { onChange: (e) => setFax(e.target.value) })}
              readOnly={status === "pendingEditSupplier"}
            />
            <p className='error'>{errors.fax?.message}</p>

            <Label htmlFor='address'>Address</Label>
            <input
              id='address'
              type='text'
              placeholder='Enter Address'
              value={address}
              className={'form-control' + (errors.address ? ' is-invalid' : '')}
              {...register("address", { onChange: (e) => setAddress(e.target.value) })}
              readOnly={status === "pendingEditSupplier"}
            />
            <p className='error'>{errors.address?.message}</p>

            <Label htmlFor='tax'></Label>
            <input
              id='tax'
              type='text'
              placeholder='Enter Address'
              value={tax}
              className={'form-control' + (errors.tax ? ' is-invalid' : '')}
              {...register("tax", { onChange: (e) => setTax(e.target.value) })}
              readOnly={status === "pendingEditSupplier"}
            />
            <p className='error'>{errors.tax?.message}</p>
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' outline onClick={handleCloseModal} disabled={status === "pendingEditSupplier"}>
              Cancel
            </Button>
            <Button color='warning' type='submit' disabled={status === "pendingEditSupplier"}>
              {(status === "pendingEditSupplier") && <Spinner size='sm' />} Save
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal centered isOpen={deleteModal}>
        <ModalHeader>Delete Supplier</ModalHeader>
        <ModalBody>Are you sure you want to delete this Aupplier?</ModalBody>
        <ModalFooter>
          <Button color='secondary' outline onClick={handleCloseModal} disabled={status === "pendingDeleteSupplier"}>
            Cancel
          </Button>
          <Button color='danger' onClick={performDelete} disabled={status === "pendingDeleteSupplier"}>
            {(status === "pendingDeleteSupplier") && <Spinner size='sm' />} Permanently Delete
          </Button>
        </ModalFooter>
      </Modal>

      <div className='content-display settings'>
        {
          (loading || (status === "pendingGetCategories")) ? (
            <center>
              <Spinner className='large' type='grow' />
            </center>
          ) : !supplierList.length ? (
            <div className='no-result'>
              <h1><FaDatabase/>Database is empty</h1>
            </div>
          ) : !filteredSuppliers.length ? (
            <div className='no-result'>
              <h1><FaSearch/>No matching results</h1>
            </div>
          ) : (
            <Table striped>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Fax</th>
                  <th>Address</th>
                  <th>Tax</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredSuppliers?.map((s) => (
                    <tr key={s._id}>
                      <td>{s.name}</td>
                      <td>{s.email}</td>
                      <td>{s.mobile}</td>
                      <td>{s.fax}</td>
                      <td>{s.address}</td>
                      <td>{s.tax}</td>
                      <td className='actions'>
                        <div className='actionButtons'>
                          <Button color='warning' onClick={() => handleEdit(s)}><FaEdit /></Button>
                          <Button color='danger' onClick={() => handleDelete(s._id)}><FaTrashAlt /></Button>
                        </div>

                        <div className='dateInfo'>
                          Created: {moment(s.createdAt).format('D/M/yyyy')} | Modified: {moment(s.updatedAt).format('D/M/yyyy')}
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

export default Suppliers