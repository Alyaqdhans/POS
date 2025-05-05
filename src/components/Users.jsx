import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import { addUser, deleteUser, getUsers } from '../features/UserSlice';
import { editUserSchemaValidation } from '../validations/EditUserValidation';
import { addUserSchemaValidation } from '../validations/AddUserValidation';
import { FaEdit, FaSearch, FaTrashAlt } from 'react-icons/fa';

function Users() {
  const { user, userList } = useSelector((state) => state.users);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editUser, setEditUser] = useState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleEdit = (user) => {
    setEditModal(true)
    setEditUser(user)
  }

  const handleDelete = (userId) => {
    if (!confirm("Are you sure you want to delete?")) return;
    dispatch(deleteUser(userId));
  }

  const handleCloseModal = () => {
    setAddModal(false);
    setEditModal(false);
    reset();
  }

  const handleSearch = (query) => {
    setSearch(query);
    const filtered = userList.filter((user) =>
      user.username.includes(query)
    );
    setFilteredUsers(filtered);
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) navigate("/login")
  }, [user]);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    setFilteredUsers(userList);
  }, [userList]);

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
      setAddModal(false);
    }
    // if (editModal) {
    //   const userData = {
    //     email: email,
    //     password: password,
    //   }
    //   dispatch();
    //   setEditModal(false);
    // }
  };

  return (
    <div className='content'>
      <div className='search-section'>
        <div className='search'>
          <input type="search" placeholder='Search' className='form-control' onChange={(e) => handleSearch(e.target.value)} />
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
            />
            <p className='error'>{errors.username?.message}</p>

            <Label htmlFor='email'>Email</Label>
            <input
              id='email'
              type='text'
              placeholder='Enter Email'
              className={'form-control ' + (errors.email ? 'is-invalid' : '')}
              {...register("email", { onChange: (e) => setEmail(e.target.value) })}
            />
            <p className='error'>{errors.email?.message}</p>

            <Label htmlFor='password'>Password</Label>
            <input
              id='password'
              type='password'
              placeholder='Enter Password'
              className={'form-control ' + (errors.password ? 'is-invalid' : '')}
              {...register("password", { onChange: (e) => setPassword(e.target.value) })}
            />
            <p className='error'>{errors.password?.message}</p>

            <Label htmlFor='confirm'>Confirm Password</Label>
            <input
              id='confirm'
              type='password'
              placeholder='Confirm New Password'
              className={'form-control ' + (errors.confirm ? 'is-invalid' : '')}
              {...register("confirm")}
            />
            <p className='error'>{errors.confirm?.message}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" outline onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button color="info" type='submit'>
              Save
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      <Modal centered isOpen={editModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit User ({editUser?.username})</ModalHeader>
          <ModalBody>
            <Label htmlFor='email'>Email</Label>
            <input
              id='email'
              type='text'
              placeholder='Enter Email'
              value={editUser?.email}
              className={'form-control ' + (errors.email ? 'is-invalid' : '')}
              {...register("email", { onChange: (e) => setEmail(e.target.value) })}
            />
            <p className='error'>{errors.email?.message}</p>

            <Label htmlFor='password'>New Password</Label>
            <input
              id='password'
              type='password'
              placeholder='Enter New Password'
              className={'form-control ' + (errors.password ? 'is-invalid' : '')}
              {...register("password", { onChange: (e) => setPassword(e.target.value) })}
            />
            <p className='error'>{errors.password?.message}</p>

            <Label htmlFor='confirm'>Confirm Password</Label>
            <input
              id='confirm'
              type='password'
              placeholder='Confirm New Password'
              className={'form-control ' + (errors.confirm ? 'is-invalid' : '')}
              {...register("confirm")}
            />
            <p className='error'>{errors.confirm?.message}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" outline onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button color="warning" type='submit'>
              Save
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      <div className='content-display'>
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredUsers?.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td className='actions'>
                    <Button color='warning' onClick={() => handleEdit(user)}><FaEdit /></Button>
                    {user.username !== "admin" && <Button color='danger' onClick={() => handleDelete(user._id)}><FaTrashAlt /></Button>}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Users;
