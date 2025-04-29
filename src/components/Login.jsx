import React from 'react';
import { Form, Label, Input, Button } from "reactstrap";
import { useState } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchemaValidation } from "../validations/LoginValidation";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handelSubmit,
    formState: {error},
  } = userForm({
    resolver: yupResolver(loginSchemaValidation),
  });

  onSubmit = () => {
    
  }

  return (
    <>
      <Form onSubmit={handelSubmit(onSubmit)}>
        <Label>Username</Label>
        <Input 
          type='text'
          placeholder='Enter Username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <Label>Password</Label>
        <Input 
          type='password'
          placeholder='Enter Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>yes</Button>
        <h5>Suiii</h5>
      </Form>
    </>
  )
}

export default Login;
