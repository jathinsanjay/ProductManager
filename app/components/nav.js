export default function Nav({active}) {
    return (
        <nav className="flex items-center justify-around flex-wrap bg-teal-500  flex-col  h-[100%]">
                 <div className="font-cursive text-black  font-bold text-3xl p-3 h-[5%]">ProductManager</div>
            <div className="flex flex-col items-center flex-shrink-0 justify-between  pr-2 pl-2 pt-1 pb-1 rounded-lg h-[80%] p-4  font-bold text-black text-2xl">
           
                <div className={`border-2 border-solid border-black pr-3 shadow-lg pl-3 pt-1 pb-1  cursor-pointer ${
          active === 'dash' ? 'bg-white' : ''
        }`}><a href="/">Dashboard</a></div>
                <div className={`border-2 border-solid border-black pr-3 shadow-lg pl-3 pt-1 pb-1  cursor-pointer ${
          active === 'products' ? 'bg-white' : ''
        }`}><a href="/products">Products</a></div>
                <div className={`border-2 border-solid border-black pr-3 shadow-lg pl-3 pt-1 pb-1  cursor-pointer ${
          active === 'new' ? 'bg-white' : ''
        }`}><a href="/addproduct">Manage Product</a></div>
                <div className={`border-2 border-solid border-black pr-3 shadow-lg pl-3 pt-1 pb-1  cursor-pointer ${
          active === 'Cart' ? 'bg-white' : ''
        }`}><a href="/cart">Billing</a></div>
                <div className={`border-2 border-solid border-black pr-3 shadow-lg pl-3 pt-1 pb-1  cursor-pointer ${
          active === 'sales' ? 'bg-white' : ''
        }`}><a href="/sales">Product Sales</a></div>
            </div>

         
            </nav>  
    )
}