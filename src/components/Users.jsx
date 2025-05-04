import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import { addUser, getUsers } from '../features/UserSlice';
import { editUserSchemaValidation } from '../validations/EditUserValidation';
import { addUserSchemaValidation } from '../validations/AddUserValidation';

function Users() {
  const { user, userList } = useSelector((state) => state.users);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editUser, setEditUser] = useState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleEdit = (user) => {
    setEditModal(!editModal)
    setEditUser(user)
  }


  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) navigate("/login")
  }, [user]);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm({
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
      setAddModal(!addModal);
    }
    if (editModal) {
      const userData = {
        email: email,
        password: password,
      }
      dispatch();
      setEditModal(!editModal);
    }
  };

  return (
    <div className='content'>
      <div className='search-section'>
        <div className='search'>
          <input type="search" placeholder='Search' className='form-control' />
          <svg fill="grey" height="35" width="35" viewBox="-122.1 -122.1 732.60 732.60" stroke="grey" strokeWidth="20"><path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6 s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2 S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7 S381.9,104.65,381.9,203.25z"></path></svg>
        </div>
        <Button color='info' onClick={() => setAddModal(!addModal)}>Add User</Button>
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
          </ModalBody>
          <ModalFooter>
            <Button color="primary" outline onClick={() => setAddModal(!addModal)}>
              Cancel
            </Button>
            <Button color="primary" type='submit'>
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
            <Button color="primary" outline onClick={() => setEditModal(!editModal)}>
              Cancel
            </Button>
            <Button color="primary" type='submit'>
              Save
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      <div className='content-display'>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              userList?.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button color='warning' onClick={() => handleEdit(user)}>Edit</Button>
                    <Button color='danger'>Delete</Button>
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
