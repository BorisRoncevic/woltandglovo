import { useState,useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import type { Restaurant } from "../model/model";
import { getMyRestaurants } from "../api/restaurantApi";
import RestaurantCard from "../components/RestaurantCard";


export default function MyRestaurants() {

    const[restaurants,setRestaurants] = useState<Restaurant[]>([]);
    const navigate = useNavigate();


    useEffect(() =>{
        getMyRestaurants().then(setRestaurants);},[]);


   
        return (
            <div>
              <h2>Restorani</h2>
        
              {restaurants.map((restaurant: any) => (
                <div
                  key={restaurant.id}
                  onClick={() => navigate(`/restaurant/${restaurant.id}/orders`)}
                  style={{
                    border: "1px solid gray",
                    padding: "10px",
                    margin: "10px",
                    cursor: "pointer"
                  }}
                >
                  <h3>{restaurant.name}</h3>
                  <p>{restaurant.city}</p>
                </div>
              ))}
            </div>
          );
        }




    




