import React, { useEffect } from 'react';
import { Form, Label, Button, FormGroup, Spinner, Alert } from "reactstrap";
import { useState } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchemaValidation } from "../validations/LoginValidation";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/UserSlice';
import { useForm } from 'react-hook-form';

function Login() {
  const {user, msg, status} = useSelector((state) => state.users);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user)
      navigate("/")
  }, [user]);

  const {register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(loginSchemaValidation),
  });

  const onSubmit = () => {
    const userData = {
      email: email,
      password: password,
    }
    dispatch(login(userData));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='login'>
      <h1>Login</h1>
      <hr />
      <FormGroup className='logingroup'>
        <Label htmlFor='email'>Email</Label>
        <input 
          id='email'
          type='text'
          placeholder='Enter Email'
          className={'form-control ' + (errors.email ? 'is-invalid' : '')}
          {...register("email", {onChange: (e) => setEmail(e.target.value)})}
        />
        <p className='error'>{errors.email?.message}</p>
        <Label htmlFor='password'>Password</Label>
        <input 
          id='password'
          type='password'
          placeholder='Enter Password'
          className={'form-control ' + (errors.password ? 'is-invalid' : '')}
          {...register("password", {onChange: (e) => setPassword(e.target.value)})}
        />
        <p className='error'>{errors.password?.message}</p>
        <section>
          {msg ? <Alert color='danger' fade={false}>{msg}</Alert> : <></>}
          
          <Button color='primary' type='submit' disabled={status === "pending"}>
            {(status === "pending") ? <Spinner size='sm' /> : <></>}
            Login
          </Button>
        </section>
      </FormGroup>
    </Form>
  )
}

export default Login;
