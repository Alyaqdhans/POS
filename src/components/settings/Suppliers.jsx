import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap';
import { addSupplierSchemaValidation } from '../../validations/AddSupplierValidation';
import { editSupplierSchemaValidation } from '../../validations/EditSupplierValidation';
import { addSupplier } from '../../features/SupplierSlice';
import { toast } from 'react-toastify';
import { clearMsg } from '../../features/CustomerSlice';

function Suppliers() {
  const { status, msg, supplierList } = useSelector((state) => state.suppliers);

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
    resolver: yupResolver(addModal ? addSupplierSchemaValidation : editSupplierSchemaValidation), 
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

    }
    handleCloseModal();
  }

  useEffect(() => {
    if (status === "success") toast.success(msg);
    if (status === "rejected") toast.success(msg);
    dispatch(clearMsg());

    setFilteredSuppliers(supplierList);
    handleSearch(search);
  }, [status]);

  useEffect(() => {

  }, [supplierList]);

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
            <Label htmlFor='name'>Name</Label>
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
            <Button color='secondry' outline onClick={handleCloseModal} disabled={status === "pendingAddSupplier"}>
              Cancel
            </Button>
            <Button color='info' type='submit' disabled={status === "pendingAddSupplier"}>
              {(status === "pendingAddSupplier") && <Spinner size='sm' />}Save
            </Button>
          </ModalFooter>
        </form>
      </Modal>


    </div>
  )
}

export default Suppliers