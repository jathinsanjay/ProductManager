"use client"
import { useState,useEffect } from 'react'
import Nav from './components/nav'

export default function Home() {
  const [DayProfit,setDayProfit]=useState(0)
  const [MonthProfit,setMonthProfit]=useState(0)
  const [DaySales,setDaySales]=useState(0)
  const [MonthSales,setMonthSales]=useState(0)
  const [items,setitems]=useState(0)
  const FetchData=async ()=>{
    
  const response1 =await fetch('http://localhost:9000/dash/monthlyprofit')
  const result1= await response1.json()
  const response2= await fetch('http://localhost:9000/dash/dailyprofit')
  const result2=await response2.json()
  const response3=await fetch('http://localhost:9000/dash/monthlysales')
  const result3=await response3.json()
  const response4=await fetch('http://localhost:9000/dash/dailysales')
  const result4=await response4.json()
  const response5 = await fetch('http://localhost:9000/products/productsList');
  const result5 = await response5.json();
  
  setMonthProfit(result1[0].TotalMonthProfit||0)
  setDayProfit(result2[0].TotalDayProfit||0)
  setMonthSales(result3[0].TotalMonthSales||0)
  setDaySales(result4[0].TotalDailySales||0)
  setitems(result5.length)
  }
  useEffect(()=>{
    FetchData();
  },[])
  return (

    <main className="flex h-[100vh]" >
    <Nav active='dash' />
    <div className='flex flex-col justify-between font-cursive w-[100%]'>
    <h1 className='w-[100%] mx-auto text-4xl text-white text-center p-4 font-bold'>Dashboard</h1>
    <div className='flex flex-wrap w-[100%] justify-center'>
    <div className='flex flex-col text-teal-500 bg-black w-[30%] p-4 m-4 rounded-lg shadow-lg shadow-black  h-[60%]' >
        <div><h1 className='text-center text-3xl  p-3'>Today's Profit/Loss</h1></div>
        <div className='text-center text-white text-2xl'>{DayProfit} /-</div>
      </div>
      <div className='flex flex-col text-teal-500 bg-black w-[30%] p-4 m-4 rounded-lg shadow-lg shadow-black h-[60%] ' >
        <div><h1 className='text-center text-3xl  p-3'>Today's Sales</h1></div>
        <div className='text-center text-white text-2xl'>{DaySales} /-</div>
      </div>
      <div className='flex flex-col text-teal-500 bg-black w-[30%] p-4 m-4 rounded-lg shadow-lg shadow-black  h-[60%] ' >
        <div><h1 className='text-center text-3xl  p-3'>No.of Products</h1></div>
        <div className='text-center text-white text-2xl'>{items}</div>
      </div>
      <div className='flex flex-col  text-teal-500 bg-black w-[30%] p-4 m-4 rounded-lg shadow-lg shadow-black  h-[60%]' >
        <div><h1 className='text-center text-3xl  p-3'>Monthly Profit/Loss</h1></div>
        <div className='text-center text-white text-2xl'>{MonthProfit}/-</div>
      </div>
      
      <div className='flex flex-col  text-teal-500 bg-black w-[30%] p-4 m-4 rounded-lg shadow-lg shadow-black  h-[60%] ' >
        <div><h1 className='text-center text-3xl  p-3'>Monthly Sales</h1></div>
        <div className='text-center text-white text-2xl'>{MonthSales}/-</div>
      </div>

    </div>
    
    <button className='bg-teal-500 rounded-lg p-4 border-2  border-solid 
    border-black animate-bounce text-black font-bold w-[40%] mx-auto m-40'>Find Products!</button>
    
    </div>

    </main>
  )
}
