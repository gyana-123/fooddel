import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";


export default function Register() {
const navigate = useNavigate();
const [credentials, setCredentials] = React.useState({name:"",email:"", password: "", location:"" })
const handleSubmit = async (e)=>{
    console.log(e)
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser",{
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify({name:credentials.name, email:credentials.email ,password: credentials.password, location: credentials.location })
    })
    const json = await response.json()
    console.log("h",json.sucess);
    if(json.sucess===true){
        console.log(json.sucess);
        navigate('/');
       alert('Registered successfully.')
       
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
      <TextField sx={{margin: "12px"}} fullWidth label="username" id="fullWidth" name='name' value={credentials.name} onChange={onChange} />
      
      <TextField sx={{margin: "12px"}} fullWidth label="email" id="fullWidth" name='email' value={credentials.email} onChange={onChange}/>
      <TextField sx={{margin: "12px"}} fullWidth label="password" id="fullWidth" name='password' value={credentials.password} onChange={onChange}/>
      <TextField sx={{margin: "12px"}} fullWidth label="location" id="fullWidth" name='location' value={credentials.location} onChange={onChange}/>

      <Button type="submit"  sx={{margin:"12px"}}variant="contained">Register</Button>
    </Box>
    </form>
  );
}