"use client"
import { useEffect, useState } from 'react'
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft  } from "react-icons/md";

import Nav from '../components/nav.js'
export default function cart(){
    const[i,seti]=useState(0)
const[j,setj]=useState(5)
   
    const [data,setdata]=useState([])
    const getdata = async () => {
        try {
          const response = await fetch('http://localhost:9000/cart/get');
          const result = await response.json();
          setdata(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      useEffect(() => {
        getdata();
      }, []);
      
      const TotalPrice = () => {
        var total = 0;
        data.forEach((item) => {
          total += item.Total; // Use += for accumulation
        });
        return total;
      };
      
      const total = TotalPrice();
      
    return(
    
        <main className="flex h-[100vh] w-[100%]">
        <Nav active="Cart" />
        <div className="w-[100%] flex-col">
            <h1 className='w-fit text-4xl font-black text-teal-500 my-5 mx-auto'>Cart</h1>
            <div className='flex flex-col  w-[80%] mx-auto'>
                <div>  <div className="flex flex-row justify-between p-4 border-2 border-white bg-teal-500 text-black  m-2">
              <div className="text-2xl font-bold w-[20%] mx-auto">ID</div>
              <div className="text-2xl font-bold w-[20%] mx-auto">Name</div>
              <div className="text-2xl font-bold w-[20%] mx-auto">Quantity</div>
              <div className="text-2xl font-bold w-[20%] mx-auto">Price</div>

            </div></div>
                {
                    data.slice(i,j).map((item)=>(
                        <div className='flex flex-row justify-between border-2 border-teal-500 rounded-lg m-2 p-4 text-white text-cursive' key={item.productID}>
                            <div className='text-2xl font-bold w-[20%] mx-auto'>{item.ProductID}</div>
                            <div className='text-2xl font-bold w-[20%] mx-auto'>{item.ProductName}</div>
                            <div className='text-2xl font-bold w-[20%] mx-auto'>{item.Quantity}</div>
                            <div className='text-2xl font-bold w-[20%] mx-auto'>{item.SellingPrice}/-</div>




                        </div>
                    ))
                }
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
                <div className='flex flex-row-reverse'>
                     <div className='w-[30%] text-3xl p-2 font-black bg-teal-500 text-black font-cursive border-2 border-white'>Total Price: {total}/-</div>
                </div>
             
            </div>
            </div>
            </main>
    )
}