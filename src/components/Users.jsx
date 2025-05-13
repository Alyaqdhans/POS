import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table, UncontrolledTooltip } from 'reactstrap';
import { addUser, clearMsg, deleteUser, editUser, getUsers } from '../features/UserSlice';
import { editUserSchemaValidation } from '../validations/EditUserValidation';
import { addUserSchemaValidation } from '../validations/AddUserValidation';
import { FaEdit, FaSearch, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { MdHelp } from 'react-icons/md';
import moment from 'moment';

function Users() {
  const { user, userList, status, msg } = useSelector((state) => state.users);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editUserData, setEditUserData] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteUserData, setDeleteUserData] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterType, setFilterType] = useState(['username']);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = (user) => {
    setEditUserData(user);
    setEditModal(true);
  }

  const handleDelete = (userId) => {
    setDeleteUserData(userId);
    setDeleteModal(true);
  }

  const performDelete = () => {
    dispatch(deleteUser(deleteUserData));
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
    const filtered = userList.filter((user) =>
      filterType.some(type => 
        user[type].toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(addModal ? addUserSchemaValidation : editUserSchemaValidation),
  });

  const onSubmit = () => {
    if (addModal) {
      const userData = {
        username: username,
        email: email,
        password: password,
      }
      dispatch(addUser(userData));
      handleCloseModal();
    }
    if (editModal) {
      const userData = {
        userId: editUserData._id,
        password: password,
      }
      dispatch(editUser(userData));
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (status === "success") toast.success(msg);
    if (status === "rejected") toast.error(msg);
    dispatch(clearMsg());

    if (!user) navigate("/login");

    setFilteredUsers(userList);
    handleSearch(search);
  }, [user, userList, filterType]);

  return (
    <div className='content'>
      <div className='search-section'>
        <div className="filter">
          <select
            className='form-control'
            size={1}
            multiple
            value={filterType}
            onChange={(e) => setFilterType([...e.target.selectedOptions].map(option => option.value))}
          >
            <option value="username">Username</option>
            <option value="email">Email</option>
          </select>

          <button id='filterhelp'><MdHelp /></button>
          <UncontrolledTooltip target='filterhelp' trigger='click' placement='right' style={{width: "150px"}} fade>
            Use <kbd>Ctrl</kbd> to select multiple filters
          </UncontrolledTooltip>
        </div>

        <div className='search'>
          <input type="search" placeholder={`Search ${filterType.join(', ')}`} className='form-control' onChange={(e) => handleSearch(e.target.value)} />
          <FaSearch size={20} />
        </div>

        <Button color='info' onClick={() => setAddModal(true)}>Add User</Button>
      </div>

      <Modal centered isOpen={addModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add User</ModalHeader>
          <ModalBody>
            <Label htmlFor='username'>Username</Label>
            <input
              id='username'
              type='text'
              placeholder='Enter Username'
              className={'form-control ' + (errors.username ? 'is-invalid' : '')}
              {...register("username", { onChange: (e) => setUsername(e.target.value) })}
              readOnly={status === "pendingAddUser"}
            />
            <p className='error'>{errors.username?.message}</p>

            <Label htmlFor='email'>Email</Label>
            <input
              id='email'
              type='text'
              placeholder='Enter Email'
              className={'form-control ' + (errors.email ? 'is-invalid' : '')}
              {...register("email", { onChange: (e) => setEmail(e.target.value) })}
              readOnly={status === "pendingAddUser"}
            />
            <p className='error'>{errors.email?.message}</p>

            <Label htmlFor='password'>Password</Label>
            <input
              id='password'
              type='password'
              placeholder='Enter Password'
              className={'form-control ' + (errors.password ? 'is-invalid' : '')}
              {...register("password", { onChange: (e) => setPassword(e.target.value) })}
              readOnly={status === "pendingAddUser"}
            />
            <p className='error'>{errors.password?.message}</p>

            <Label htmlFor='confirm'>Confirm Password</Label>
            <input
              id='confirm'
              type='password'
              placeholder='Confirm New Password'
              className={'form-control ' + (errors.confirm ? 'is-invalid' : '')}
              {...register("confirm")}
              readOnly={status === "pendingAddUser"}
            />
            <p className='error'>{errors.confirm?.message}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" outline onClick={handleCloseModal} disabled={status === "pendingAddUser"}>
              Cancel
            </Button>
            <Button color='info' type='submit' disabled={status === "pendingAddUser"}>
              {(status === "pendingAddUser") && <Spinner size='sm' />} Save
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      <Modal centered isOpen={editModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit User</ModalHeader>
          <ModalBody>
            <Label htmlFor='username'>Username</Label>
            <input
              id='username'
              type='text'
              placeholder='Enter Username'
              value={editUserData?.username}
              className={'form-control ' + (errors.username ? 'is-invalid' : '')}
              {...register("username", { onChange: (e) => setUsername(e.target.value) })}
              readOnly
            />
            <p className='error'>{errors.email?.message}</p>

            <Label htmlFor='password'>New Password</Label>
            <input
              id='password'
              type='password'
              placeholder='Enter New Password'
              className={'form-control ' + (errors.password ? 'is-invalid' : '')}
              {...register("password", { onChange: (e) => setPassword(e.target.value) })}
              readOnly={status === "pendingEditUser"}
            />
            <p className='error'>{errors.password?.message}</p>

            <Label htmlFor='confirm'>Confirm Password</Label>
            <input
              id='confirm'
              type='password'
              placeholder='Confirm New Password'
              className={'form-control ' + (errors.confirm ? 'is-invalid' : '')}
              {...register("confirm")}
              readOnly={status === "pendingEditUser"}
            />
            <p className='error'>{errors.confirm?.message}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" outline onClick={handleCloseModal} disabled={status === "pendingEditUser"}>
              Cancel
            </Button>
            <Button color='warning' type='submit' disabled={status === "pendingEditUser"}>
              {(status === "pendingEditUser") && <Spinner size='sm' />} Save
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      <Modal centered isOpen={deleteModal}>
        <ModalHeader>Delete User</ModalHeader>
        <ModalBody>Are you sure you want to delete this user?</ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={handleCloseModal} disabled={status === "pendingDeleteUser"}>
            Cancel
          </Button>
          <Button color='danger' onClick={performDelete} disabled={status === "pendingDeleteUser"}>
            {(status === "pendingDeleteUser") && <Spinner size='sm' />} Permanently Delete
          </Button>
        </ModalFooter>
      </Modal>

      <div className='content-display'>
        {
          filteredUsers.length ?
          <Table striped>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredUsers?.map((u) => (
                  <tr key={u._id}>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>
                      {
                        u.lastLogin ?
                        <>{moment(u.lastLogin).format('D/M/yyyy, h:mm:ss A')} ({moment(u.lastLogin).toNow()})</> :
                        'Never logged in'
                      }
                    </td>
                    <td className='actions'>
                      <div className="actionButtons">
                        {(u.username !== "admin" || user?.username === "admin") && <Button color='warning' onClick={() => handleEdit(u)}><FaEdit /></Button>}
                        {(u.username !== "admin" && u.username !== user?.username) && <Button color='danger' onClick={() => handleDelete(u._id)}><FaTrashAlt /></Button>}
                      </div>
                      
                      <div className='dateInfo'>
                        Created: {moment(u.createdAt).format('D/M/yyyy')} | Modified: {moment(u.updatedAt).format('D/M/yyyy')}
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table> :
          <div className="no-result">
            <h1><FaSearch /> No matching results</h1>
          </div>
        }
      </div>
    </div>
  )
}

export default Users;
