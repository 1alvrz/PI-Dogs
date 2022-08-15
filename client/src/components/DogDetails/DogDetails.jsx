import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar"
import { getDogById } from "../../redux/actions/actions";
import { Link } from "react-router-dom";

export default function DogDetails({id}){
    document.title = "Henry Dogs - Details";

    const dispatch = useDispatch();
    const dog = useSelector((state) => state.dog);
    
    React.useEffect(() => {
        dispatch(getDogById(id));
    },[dispatch]);

    if(!dog.image) dog.image =  "https://s2.coinmarketcap.com/static/img/coins/200x200/14447.png";
    if(!dog.temperament) dog.temperament = "No associated temperament";
    
    return(
        <div>
            <NavBar></NavBar>
            <div><h1>Breed details</h1></div>
           {dog.name ? ( <div>
                <h1>{dog.name}</h1>
                <img src={dog.image}/>
                <div>
                    <div>
                        <h2>Height: </h2>
                        <h3>{dog.height} Cm</h3>
                    </div>
                    <div>
                        <h2>Weight: </h2>
                        <h3>{dog.weight} Kg</h3>
                    </div>
                    <div>
                        <h2>Lifespan: </h2>
                        <h3>{dog.life_span}</h3>
                    </div>
                    <div>
                        <h2>Temperaments: </h2>
                        <h3>{dog.temperament}</h3>
                    </div>
                </div>
                    {
                        id.includes("db") ? 
                        (
                                <div>
                                    <Link to="/home"></Link>
                                </div>
                        ) :
                        ""
                    }
            </div>) : (<><h1>Loading...</h1></>)}
        </div>
    )
}