import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllDogs, getAllTempers} from "../../redux/actions/actions";

import CardContainer from "../CardContainer/CardContainer";
import SearchBar from "../SearchBar/SearchBar";
import Paginado from "../Paginado/Paginado";
import NavBar from "../NavBar/NavBar";

export default function Home(){
    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.dogs);
    const tempers = useSelector((state) => state.tempers);

    const [paginaActual, setPaginaActual] = useState(1);
    const [cantidad, setCantidad] = useState(8);
    const indiceFinal = paginaActual * cantidad;
    const indicePrimero = indiceFinal - cantidad;
    const dogsItems = dogs.slice(indicePrimero, indiceFinal);

    function paginado(nroPagina){
        setPaginaActual(nroPagina);
    }

    React.useEffect(
        () => {
            dispatch(getAllDogs());
            dispatch(getAllTempers())
        }, [dispatch]
    );

    return(<div>
            <NavBar />
            <SearchBar tempers={tempers} resetPagina={paginado}/>

        {dogs[0] === "Not Found" ? (<><h1>Breed not found</h1></>) 
        : dogs[0] ? (<><CardContainer dogs= {dogsItems} />
            <Paginado
                cantidad={cantidad}
                allDogs={dogs}
                paginado={paginado}
                paginaActual={paginaActual}/></>) 
                : (<><h1>Loading...</h1></>)}
        </div>)
}