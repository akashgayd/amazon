import axios from "axios";
import { useState,useEffect } from "react";
const Cards = () => {
    const[data,setData]=useState([])

    const fetchData = async () => {
        try{
            const response = await axios.get('https://otpgenraterfirst.onrender.com/api/categories');
            setData(response.data.data);
            console.log(response.data)
        }
        catch(error){
            console.log(error);
        }   

    }
    useEffect(()=>{
        fetchData()
    },[])
    return (
        <div className="flex flex-wrap justify-center   gap-4 mt-6 px-4 md:px-0 lg:px-0 xl:px-0 2xl:px-0 ">
          {
            data.map((item)=>{
                return(
                    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/5 2xl:w-1/3 p-4">
                    <div className="bg-white rounded-lg shadow-md p-4">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                )
            })
          }

           
        </div>
    );    
};

export default Cards;