import React from "react";
import DogCard from "../DogCard/DogCard";


export default function CardContainer({dogs}){
    return(
        <div>
            <div>
                <h1>Dog breeds</h1>
            </div>
            {Array.isArray(dogs) ? dogs.map(
                (dog, i) => {
                    return <DogCard key={i} dog={dog}/>
                }
            ) : <DogCard dog={dogs}/>}

        </div>
    )
}