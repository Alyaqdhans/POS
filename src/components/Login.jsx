import React, { useEffect } from 'react';
import { Form, Label, Button, Spinner } from "reactstrap";
import { useState } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchemaValidation } from "../validations/LoginValidation";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearMsg, login } from '../features/UserSlice';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function Login() {
  const {user, status, msg} = useSelector((state) => state.users);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "success") toast.success(msg);
    if (status === "rejected") toast.error(msg);
    dispatch(clearMsg());

    if (user) navigate("/");
  }, [user, status]);

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
      <div className="login-header">
        <h1>Welcome</h1>
      </div>
      <div className='login-body'>
        <Label htmlFor='email'>Email</Label>
        <input 
          id='email'
          type='text'
          placeholder='Enter Email'
          className={'form-control ' + (errors.email ? 'is-invalid' : '')}
          {...register("email", {onChange: (e) => setEmail(e.target.value)})}
          readOnly={status === "pendingLogin"}
        />
        <p className='error'>{errors.email?.message}</p>
        <Label htmlFor='password'>Password</Label>
        <input 
          id='password'
          type='password'
          placeholder='Enter Password'
          className={'form-control ' + (errors.password ? 'is-invalid' : '')}
          {...register("password", {onChange: (e) => setPassword(e.target.value)})}
          readOnly={status === "pendingLogin"}
        />
        <p className='error'>{errors.password?.message}</p>

        <section>
          <Button color='primary' type='submit' disabled={status === "pendingLogin"}>
            {(status === "pendingLogin") && <Spinner size='sm' />} Login
          </Button>
        </section>
      </div>
    </Form>
  )
}

export default Login;
