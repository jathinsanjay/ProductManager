export default function product({item}){
    return(
        <div key={item.ProductID} className="flex flex-row justify-between border-2 border-solid border-black rounded-lg p-2 mt-1 w-[80%] mx-10 font-cursive">
                <div className="flex flex-row justify-between w-[100%]">
                  <div className="text-2xl font-bold w-[20%]">{item.ProductName}</div>
                  <div className="text-lg font-bold w-[20%]">{item.ProductID}</div>
                  <div className="text-2xl font-bold w-[20%]">{item.SellingPrice}</div>
                  <div className="text-2xl font-bold w-[20%]">
                    <input type="number" className="border-2 border-solid border-black w-[60%] text-black" />
                  </div>
                  <div className="text-2xl font-bold w-[20%]">
                    <button className="bg-teal-500 text-black font-bold p-2 rounded-lg text-lg">Add to cart</button>
                  </div>
                </div>
              </div>
    )
}