import React, { useEffect } from 'react';
import { Form, Label, Button, FormGroup, Spinner, Alert } from "reactstrap";
import { useState } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchemaValidation } from "../validations/LoginValidation";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/UserSlice';
import { useForm } from 'react-hook-form';
import { CgDanger } from 'react-icons/cg';

function Login() {
  const { user, msg, status } = useSelector((state) => state.users);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(loginSchemaValidation),
  });

  const onSubmit = () => {
    const userData = {
      username: username,
      password: password,
    }
    dispatch(login(userData));
  };

  useEffect(() => {
    if (user)
      navigate("/")
  }, [user]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='form'>
      <h1>Login</h1>
      <hr />
      <FormGroup className='group'>
        <Label htmlFor='username'>Username</Label>
        <input 
          id='username'
          type='text'
          placeholder='Enter Username'
          className='form-control'
          {...register("username", {onChange: (e) => setUsername(e.target.value)})}
        />
        <p className='error'>{errors.username?.message}</p>
        <Label htmlFor='password'>Password</Label>
        <input 
          id='password'
          type='password'
          placeholder='Enter Password'
          className='form-control'
          {...register("password", {onChange: (e) => setPassword(e.target.value)})}
        />
        <p className='error'>{errors.password?.message}</p>
        <section className='action'>
          {
            msg ?
            <Alert color='danger'><CgDanger size={20} style={{margin: "0 5px 2px 0"}} /> {msg}</Alert> :
            <></>
          }
          <Button color='primary' type='submit' disabled={status === "pending"}>
            {
              (status === "pending") ?
              <><Spinner size='sm' /> Login</> :
              <span>Login</span>
            }
          </Button>
        </section>
      </FormGroup>
    </Form>
  )
}

export default Login;
