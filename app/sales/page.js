"use client"
import React, { useEffect, useState } from 'react';
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft  } from "react-icons/md";

import Nav from '../components/nav';
import toast, { Toaster } from 'react-hot-toast';

export default function sales(){
    const [data, setData] = useState([]);
    const [searchdata,setsearchdata]=useState([])
    const [loading, setLoading] = useState(true);
    const [cart,setcart]=useState([])
    const[product,setproduct]=useState(false)
    const[i,seti]=useState(0)
    const[j,setj]=useState(5)
    const fetchData = async () => {
      try {
        
        const response = await fetch('http://localhost:9000/products/productsList');
        const result = await response.json();
  
        
        console.log(result)
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
      
    };
    useEffect(() => {
  
  
    fetchData();
    }, []);
  
    const search = async (e) => {
      console.log(e.target.value);
      const searchname = e.target.value;
      setsearchdata(searchname);
  
      try {
        const response = await fetch(`http://localhost:9000/products/productsSearch/${searchname}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error searching products:', error);
      }
  
    };
 
    
    const showcart=()=>{
      setproduct(false)
      setData(cart)
  
    }
    const showproducts=()=>{
      fetchData();
      setproduct(true)
  
    }
    const UpdateCart=async()=>{
      await fetch("http://localhost:9000/cart/post",
      {method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(cart)
    })
    .then(
      res=>{
        console.log(res)
        if(res.response=200){
          toast.success("Added to cart")
  
        }
        
      }
    )
    }
    const sortByQuantity = () => {
        const sortedData = [...data].sort((a, b) => a.Quantity - b.Quantity);
        setData(sortedData);
      };
    
      const sortBySellingPrice = () => {
        const sortedData = [...data].sort((a, b) => a.SellingPrice - b.SellingPrice);
        setData(sortedData);
      };
      const SortById=()=>{
        const sortedData = [...data].sort((a, b) => a.ProductID - b.ProductID);
        setData(sortedData);

      }
    
    return (
        <main className="flex h-[100vh]">
        <div><Toaster/></div>
      <Nav active="products" />
      <div className="w-[100%]">
        <input
          type="text"
          placeholder="Search for products"
          className="border-2 border-solid border-black rounded-lg p-2 my-4 w-[80%] mx-10 text-black"
          onChange={search}
        />
      
        <div className=" w-[80%] flex flex-row justify-between mx-4 ">
            <button className="bg-teal-500 p-2 m-2 rounded-lg" onClick={sortByQuantity}>Sort by Quantity</button>
            <button className="bg-teal-500 p-2 m-2 rounded-lg" onClick={sortBySellingPrice}>Sort by Price</button>
            <button className="bg-teal-500 p-2 m-2 rounded-lg" onClick={SortById}>Sort by ID</button>

        </div>
       

        {
        <div className="flex flex-col w-[100%] mx-auto">

          <div className="flex flex-row justify-between border-2 bg-white text-teal-500 border-solid border-black rounded-lg p-2 mt-1 w-[80%] mx-10">
            <div className="flex flex-row justify-between w-[100%]">
              <div className="text-2xl font-bold w-[20%]">Name</div>
              <div className="text-lg font-bold w-[20%]">ID</div>
              <div className="text-2xl font-bold w-[20%]">Quantity</div>
              <div className="text-2xl font-bold w-[20%]">SellingPrice</div>

            </div>
          </div>

          {!loading ? (
            
            data&&data.slice(i,j).map((item) => (
              <div key={item.ProductID} className="flex flex-row justify-between border-2 border-solid border-black rounded-lg p-2 mt-1 w-[80%] mx-10 font-cursive">
              <div className="flex flex-row justify-between w-[100%]">
                <div className="text-2xl font-bold w-[20%]">{item.ProductName}</div>
                <div className="text-lg font-bold w-[20%]">{item.ProductID}</div>
                <div className="text-2xl font-bold w-[20%]">{item.Quantity}</div>
                <div className="text-2xl font-bold w-[20%]">{item.SellingPrice}</div>

             
              </div>
            </div>
            )
            
            )
          
          ) : (
            <div className='w-[100%] p-10 mx-auto font-black text-white font-cursive text-4xl'>Loading...</div>
          )}
        </div>}
        <div className='w-[100%] mx-auto flex-col'>
          <div className=' w-[80%] flex justify-center'>
          <div className={`w-fit ${i>4?'bg-teal-500':'bg-gray-500'}  my-2 mx-6`} onClick={()=>{
            if(i>4){
              seti(i-5)
            setj(j-5)
            }
          }}><MdKeyboardDoubleArrowLeft size={40}  /></div>
          <div  className={`w-fit ${data.length>j?'bg-teal-500':'bg-gray-500'}  my-2 mx-6`}onClick={()=>{
            if(data.length>j){
              seti(i+5)
            setj(j+5)
            }
          }}><MdKeyboardDoubleArrowRight size={40} /></div>
          </div>
       
          
        <button className={`w-[20%] p-4 m-4 text-black font-black  rounded-lg ${cart.length > 0 ? "bg-teal-500" : "bg-gray-400"}`} onClick={UpdateCart}>Update Cart</button>
        </div>
      </div>
    </main>
  );
    
}