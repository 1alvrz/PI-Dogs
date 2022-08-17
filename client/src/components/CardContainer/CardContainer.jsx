import React from "react";
import DogCard from "../DogCard/DogCard";
import style from './CardContainer.module.css'


export default function CardContainer({dogs}){
    return(
        <div className={style.CardContainerDiv}>
            <div className={style.contenedorTitulo}>
                <h1>Dog breeds</h1>
            </div>
            {Array.isArray(dogs) ? dogs.map(
                (dog, i) => {
                    return <DogCard  key={i} dog={dog}/>
                }
            ) : <DogCard dog={dogs}/>}

        </div>
    )
}