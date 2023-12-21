"use client"
import React, { useState,useEffect } from "react";
import Nav from "../components/nav";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';

import toast, { Toaster } from 'react-hot-toast';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';




export default function AddProduct() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const [data, setData] = useState({
    ProductName: "",
    CostPrice: "",
    SellingPrice: "",
    Quantity: ""
  });


  const [apiData,setapiData]=useState([])
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch('http://localhost:9000/products/productsList');
        const result = await response.json();

        
        console.log(result)
        
        const modResult=result.map((item)=>(
          {...item,
            label:item.ProductName}
        )
       
          
        )
        setapiData(modResult)
        console.log(modResult)
      
      } catch (error) {
        console.error('Error fetching data:', error);
      
      }
      
    };

  fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async() => {
    await fetch("http://localhost:9000/products/updateproduct",
    {method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
  })
  .then(
    res=>{
      console.log(res)
      if(res.response=200){
        toast.success("Added")

      }
      
    }
  )
    console.log("Submitted data:", data);

   
  };

  return (
    <main className="flex h-[100vh] w-[100%]">
         <div><Toaster/></div>
      <Nav active="new" />
      <div className="w-[100%] mx-auto flex-col">
        <div className="w-[60%] my-4 mx-auto rounded-lg bg-black flex">
      <h1 className=" text-center m-4 p-2 text-2xl text-teal-500 font-black mx-auto"><a href="/addproduct">Add Product</a></h1>
      <h1 className=" text-center m-4 p-2 text-2xl text-teal-500 font-black bg-white  mx-auto"><a href="/updateproduct">Update Product</a></h1>
      <h1 className=" text-center m-4 p-2 text-2xl text-teal-500 font-black mx-auto"><a href="/deleteproduct">Delete Product</a></h1>
      </div>
        <div className="w-[60%] mx-auto p-[25px] bg-teal-100 rounded-lg shadow-lg">
        <Autocomplete
        onChange={(event, value) => {
            if (value) {
              console.log(value)
              const selectedItem = value
        
              setData({
                ...data,
                ProductName: selectedItem.ProductName,
                CostPrice: selectedItem.CostPrice,
                SellingPrice: selectedItem.SellingPrice, 
                Quantity: selectedItem.Quantity, 
              });
            }
          }}
  disablePortal
  id="combo-box-demo"
  options={apiData}

  sx={{ width: 700 }}
  renderInput={(params) => <TextField {...params} label="Product" />}
/>
          <div className="flex flex-row justify-between my-4">
            <TextField
              id="CostPrice"
              name="CostPrice"
              label="Cost Price"
              type="number"
              variant="outlined"
              value={data.CostPrice}
              onChange={handleInputChange}
            />
            <TextField
              id="SellingPrice"
              name="SellingPrice"
              label="Selling Price"
              type="number"
              variant="outlined"
              value={data.SellingPrice}
              onChange={handleInputChange}
            />
            <TextField
              id="Quantity"
              name="Quantity"
              label="Quantity"
              type="number"
              variant="outlined"
              value={data.Quantity}
              onChange={handleInputChange}
            />
          </div>
          
        <button className="w-[150px] bg-teal-500 text-black font-bold p-2" onClick={handleSubmit}>Add</button>
        </div>
        
        
      </div>
    </main>
  );
}
