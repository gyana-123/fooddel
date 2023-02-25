import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { toast } from "react-toastify";
import {Link, useNavigate} from "react-router-dom"

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = React.useState({email:"", password: "" })
  const handleSubmit = async (e)=>{
    console.log(e)
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser",{
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify({email:credentials.email ,password: credentials.password })
    })
    const json = await response.json()
    console.log("h",json.sucess);
    if(json.sucess===true){
        console.log(json.authToken);
        navigate('/');
        alert('login successfully.')
        sessionStorage.setItem('jwttoken',json.authToken);
        sessionStorage.setItem('username',credentials.email)
       
    }
    else {
        alert('something wrong')
    }
}


  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}
  return (
    <form onSubmit={handleSubmit}>
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField sx={{margin: "12px"}} fullWidth label="email" id="fullWidth" name='email' value={credentials.email} onChange={onChange}/>
      <TextField sx={{margin: "12px"}} fullWidth label="password" id="fullWidth" name='password' value={credentials.password} onChange={onChange}/>
      <Button type="submit" sx={{margin:"12px"}}variant="contained">login</Button>
       don't have Account? <Link to={'/createuser'}> sing up</Link>
    </Box>
    </form>
  );
}