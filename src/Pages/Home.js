import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Fooditem from '../components/Body/Fooditem'
import Navbar from '../components/navbar/Navbar'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";


const Home = () => {
  const navigate = useNavigate();

  var token = sessionStorage.getItem('jwttoken');
  const [search,setSearch]= useState('')
  const [item, setItem]= useState([])
  const [category, setCategory]= useState([])
  useEffect( ()=> {
    let username = sessionStorage.getItem('username');
    if (username === '' || username === null) {
    //     navigate('/login')
   
      getList();
                      
           }

        },[])

  function getList(){
    fetch("http://localhost:5000/api/displayitems",{
      method:'POST',
      headers: {
        'content-type': 'application/json'
                 }
             }).then((res) => {
         return res.json();
        }).then((res) => {
          setItem(res[0]);
          setCategory(res[1])
            console.log(res[1],res[0])
                
                     }).catch((err) => {
                         console.log(err.messsage)
                     });
  }



  return (
    <div>
        <Navbar/>
        <br></br>
        <Box sx={{ color: "black", padding: "8px" ,  backgroundColor:""}}>
        <SearchIcon />
          <InputBase
            sx={{ ml: 1, flex: 1, color: "black", width: "100px",  }}
            placeholder="Search here"
            value={search} type={search} onChange={(e)=>{setSearch(e.target.value)}}
          > </InputBase>
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
          ></IconButton>
         
          </Box>
        {
          category !== [] ? category.map((cat)=>{
            return <div><Box key={cat._id} sx={{ fontWeight: 'bold' }}><hr></hr>
              {cat.CategoryName}</Box>
              <hr>
              </hr>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {
                item !== [] ? item.filter((item)=> (item.CategoryName === cat.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()) ) 
                ).map(
                  filitem =>{
                    return <Grid item xs={2} sm={4} md={4} key={filitem._id}>
                      <Fooditem  foodname={filitem.name} option={filitem.options[0]} imgsrc={filitem.img} des={filitem.description}/>
                    </Grid>
                  }
                ) : <div>no data </div>
                }

              </Grid>
              </div>
          }) : ""
        }
        
       
    </div>
  )
}

export default Home