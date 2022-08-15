import React from "react";
import {Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { emptyDog } from "../../redux/actions/actions";

export default function DogCard({dog}){
    const dispatch = useDispatch();
    
    if(!dog.hasOwnProperty("image") || dog.image.length === 0) dog.image =  "https://s2.coinmarketcap.com/static/img/coins/200x200/14447.png";
    if(!dog.hasOwnProperty("temperament")) dog.temperament = "No associated temperaments";
    return(
        <div>
            <div>
                <img src={dog.image} alt="Fotito Perrito" />
            </div>
            <h1>{dog.name}</h1>
            <div>
                <div>
                   <span>Temperament:</span>
                    <span> {!dog.temperament.length > 40 ? dog.temperament : dog.temperament.slice(0, 40)+" ..."}</span> 
                </div>
                <br />
                <div>
                    <span>Weight:</span>
                    <span> {dog.weight[0]} - {dog.weight[1]} KG</span>
                </div>
                
            </div>
            <Link to={`/detail/${dog.id}`}  onClick={() => dispatch(emptyDog())}><p>See more...</p></Link>
        </div>
    )
}