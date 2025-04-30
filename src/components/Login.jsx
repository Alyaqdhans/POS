import React, { useEffect } from 'react';
import { Form, Label, Input, Button } from "reactstrap";
import { useState } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchemaValidation } from "../validations/LoginValidation";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/UserSlice';
import { useForm } from 'react-hook-form';

function Login() {
  const { user, msg, status } = useSelector((state) => state.users);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className='login'>
        <h1>Login</h1>
        <hr />
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
        <Button type='submit'>Login</Button>
        <p></p>
        <h6>Server Response: <code>{msg}</code></h6>
        <h6>Server Status: <code>{status}</code></h6>
      </Form>
    </>
  )
}

export default Login;
