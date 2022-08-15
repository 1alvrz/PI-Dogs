import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { getAllDogs, getDogByApi, getDogByDb, getDogByName, getDogByTemper, orderDogs } from "../../redux/actions/actions";


export default function SearchBar({tempers, resetPagina}){
    const [input, setInput] = useState({busqueda:"", temperament:"Select temperament", raza:"All Breeds", orden:"A-Z"});
    const dispatch = useDispatch();

    function manejadorCambiosEstado(e){
        setInput({[e.target.name]: e.target.value});
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getDogByName(input.busqueda));
        resetPagina(1);
    }
    
    function filtrarPorTemperamento(e){
        e.preventDefault();
        dispatch(getDogByTemper(e.target.value));
        resetPagina(1);
        setInput({temperament:e.target.value, raza:"All Breeds", orden:"A-Z"})
    }

    function filtroRaza(e){
        if(e.target.value === "All Breeds") dispatch(getAllDogs());
        if(e.target.value === "Created Breeds") dispatch(getDogByDb());
        if(e.target.value === "API Breeds") dispatch(getDogByApi());
        setInput({temperament:"Select temperament", raza:e.target.value, orden:"A-Z"})
    }

    function orden(e){
        dispatch(orderDogs(e.target.value));
        setInput({...input, orden:e.target.value})
    }


    return(
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <button onClick={() => window.location.reload() } type="button">Refresh</button>
                <input type="text" name="busqueda" value={input.busqueda} placeholder="Breed..." onChange={manejadorCambiosEstado} required/>
                <button type="submit">Search</button>
            </form>
            <select name="temperament" onChange={filtrarPorTemperamento} value={input.temperament}>
                    <option key="0">All</option>
                    {
                        tempers?.map(
                            (temp, i) => {
                                return(
                                    <option key={i}>{temp}</option>
                                )
                            } 
                        )
                    }
            </select>
            <select name="FiltroRaza" onChange={filtroRaza} value={input.raza}>
                    <option>All Breeds</option>
                    <option>API Breeds</option>
                    <option>Created Breeds</option>
            </select>
            <select name="Orden" onChange={orden} value={input.orden}>
                <option>A-Z</option>
                <option>Z-A</option>
                <option>Weight Asc</option>
                <option>Weight Desc</option>
            </select>
        </div>
    )
}