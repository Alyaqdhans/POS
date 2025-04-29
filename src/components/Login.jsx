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

  const { user, msg } = useSelector((state) => state.users);

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
      navigate("/home")
  },[user]);


  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>Username</Label>
        <input 
          type='text'
          placeholder='Enter Username'
          className='form-control'
          {...register("username", {
            onChange: (e) => setUsername(e.target.value)
          })}
        />
        <p className='error'>{errors.username?.message}</p>
        <Label>Password</Label>
        <input 
          type='password'
          placeholder='Enter Password'
          className='form-control'
          {...register("password", {
            onChange: (e) => setPassword(e.target.value)
          })}
        />
        <p className='error'>{errors.password?.message}</p>
        <Button type='submit'>Login</Button>
        <p>{msg}</p>
      </Form>
    </>
  )
}

export default Login;
