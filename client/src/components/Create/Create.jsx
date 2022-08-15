import {React, useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTempers, setDog } from "../../redux/actions/actions";
import NavBar from "../NavBar/NavBar";

export default function Create(){
    document.title = "Henry Dogs - Create";
    const dispatch = useDispatch();

    const tempersList = useSelector((state) => state.tempers);
    const [input, setInput] = useState({name: "", minHeight:"", maxHeight:"", minWeight:"", maxWeight:"",
    minLifeSpan:"", maxLifeSpan:"", temperaments: [], cantTemps:["1"], image:""});
    const [errores, setErrores] = useState({name: "", minHeight:"", maxHeight:"", minWeight:"", maxWeight:"",
    minLifeSpan:"", maxLifeSpan:"", temperaments: []});
    const [botonBloqueado, setBotonBloqueado] = useState("disabled");
    const [enviado, setEnviado] = useState(false);
    const arrNroTemps = [1,2,3,4,5,6,7,8,9];

    useEffect(
        () => {
            if(errores.name || errores.minHeight || errores.maxHeight || errores.minWeight || errores.maxWeight
            || errores.minLifeSpan || errores.maxLifeSpan){
                setBotonBloqueado("disabled");
            }else setBotonBloqueado("");
            if(!input.name || !input.minHeight || !input.maxHeight || !input.minWeight || !input.maxWeight
                || !input.minLifeSpan || !input.maxLifeSpan){
                    setBotonBloqueado("disabled");
            }
        }, [errores, input]
    )

    useEffect(
        () => {
            dispatch(getAllTempers());
        },[dispatch]
    )
    
    function onChangeHandler(e){
        if(e.target.name === "cantTemps"){
            let arrCant = [];
            for(let i = 0; i < e.target.value; i++){
                arrCant.push(e.target.value);
            }
            setInput( {...input, [e.target.name]:arrCant});
            return;
        }
        if(e.target.name === "minHeight" || e.target.name === "maxHeight") if(e.target.value < 0) return;
        if(e.target.name === "minWeight" || e.target.name === "maxWeight") if(e.target.value < 0) return;
        if(e.target.name === "minLifeSpan" || e.target.name === "maxLifeSpan") if(e.target.value < 0) return;
        setInput( {...input, [e.target.name]:e.target.value});
        setErrores(validar({name: e.target.name, value: e.target.value}, errores, input));
    }

    function onChangeTempHandler(e, i){
        let arrTemp = input.temperaments;
        arrTemp[i] = e.target.value;
        setInput( {...input, [e.target.name]:arrTemp});
        return;
    }

    function onSubmitHandler(e){
        e.preventDefault();
        const dog = {name: "", height:[], weight:[], years: "", temp:[], image:""};
        dog.name = input.name;
        dog.height = [input.minHeight, input.maxHeight];
        dog.weight = [input.minWeight, input.maxWeight];
        dog.years = `${input.minLifeSpan} - ${input.maxLifeSpan} years`;
        dog.temp = input.temperaments;
        dog.image = input.image;
        dispatch(setDog(dog));
        setEnviado(true);
    }

    return(
        <div>
            <NavBar />
            <div>
                <h1>Create Breed</h1>
            </div>
            {
            !enviado ? 
            (<form onSubmit={onSubmitHandler}>
                <div>
                    <label>Breed name:</label>
                    <input type="text" name="name" value={input.name} onChange={onChangeHandler} placeholder="Breed name..."/>
                    {errores.name && (<p>{errores.name}</p>)}
                </div>
                <div>
                    <label>Min height:</label>
                    <input type="number" name="minHeight" value={input.minHeight} onChange={onChangeHandler} placeholder="Min height..."/>
                    {errores.minHeight && (<p>{errores.minHeight}</p>)}
                </div>
                <div>
                    <label>Max height:</label>
                    <input type="number" name="maxHeight" value={input.maxHeight} onChange={onChangeHandler} placeholder="Max height..."/>
                    {errores.maxHeight && (<p>{errores.maxHeight}</p>)}
                </div>
                <div>
                    <label>Min weight:</label>
                    <input type="number" name="minWeight" value={input.minWeight} onChange={onChangeHandler} placeholder="Min weight..."/>
                    {errores.minWeight && (<p>{errores.minWeight}</p>)}
                </div>
                <div>
                    <label>Max weight:</label>
                    <input type="number" name="maxWeight" value={input.maxWeight} onChange={onChangeHandler} placeholder="Max weight..."/>
                    {errores.maxWeight && (<p>{errores.maxWeight}</p>)}
                </div>
                <div>
                    <label>Min lifespan:</label>
                    <input type="number" name="minLifeSpan" value={input.minLifeSpan} onChange={onChangeHandler} placeholder="Min lifespan..."/>
                    {errores.minLifeSpan && (<p>{errores.minLifeSpan}</p>)}
                </div>
                <div>
                    <label>Max lifespan:</label>
                    <input type="number" name="maxLifeSpan" value={input.maxLifeSpan} onChange={onChangeHandler} placeholder="Max lifespan..."/>
                    {errores.maxLifeSpan && (<p>{errores.maxLifeSpan}</p>)}
                </div>
                <div>
                    <label>Image:</label>
                    <input type="text" name="image" value={input.image} onChange={onChangeHandler} placeholder="Imgae url..."/>
                </div>
                <div>
                    <label>Number of temperaments:</label>
                    <select name="cantTemps" value={input.cantTemps[input.cantTemps.length - 1]} onChange={onChangeHandler}>
                    {
                        arrNroTemps.map(
                            (c, i) => {
                                return (<option key={i}>{c}</option>)
                            }
                        )
                    }
                    </select>
                </div>
                <div>
                    {
                        input.cantTemps.map(
                            (c, i) => {
                                return (
                                    <div><label></label>
                                    <select name="temperaments" value={input.temperaments[i]} 
                                    onChange={(e) => onChangeTempHandler(e, i)} key={i}>
                                        <option key={0}>Select temperament</option>
                                        {
                                            tempersList?.map(
                                                (temp, i) => {
                                                    return(
                                                        <option key={i}>{temp}</option>
                                                    )
                                                } 
                                            )
                                        }
                                    </select></div>
                                )
                            }
                        )
                    }
                </div>
                <button type="submit" disabled={botonBloqueado}>Add breed</button>
            </form>)
            : (<div><h1>Created succesfully</h1></div>)
            }
        </div>
    )
}

export function validar(input, errores, globalInput){
    if(errores[input.name]) errores[input.name] = "";
    switch(input.name){
        case "name":
            if(!input.value.length) errores.name = "Required";
            else errores.name = "";
            if(/[0-9]/.test(input.value)) errores.name = "Invalid name - Only A-z";
            if(/[@$?¡\-_]/.test(input.value)) errores.name = "Invalid name - Only A-z";
            break;
        case "minHeight":
            if(input.name === "minHeight"){
                if(parseInt(input.value) >= parseInt(globalInput.maxHeight))  errores.minHeight = "Min height must be less than max";
                else errores.minHeight = "";
            }
        case "maxHeight":
            if(input.name === "maxHeight"){
                if(parseInt(globalInput.minHeight) >= parseInt(input.value))  errores.maxHeight = "Max height must be greater than min";
                else errores.maxHeight = "";
            }
        case "minWeight":
            if(input.name === "minWeight"){
               if(parseInt(input.value) >= parseInt(globalInput.maxWeight))  errores.minWeight = "Min weight must be less than max";
                else errores.minWeight = ""; 
            }
            
        case "maxWeight":
            if(input.name === "maxWeight"){
                if(parseInt(globalInput.minWeight) >= parseInt(input.value))  errores.maxWeight = "Max weight must be greater than min";
                else errores.maxWeight = "";
            }
        case "minLifeSpan":
            if(input.name === "minLifeSpan"){
                if(parseInt(input.value) >= parseInt(globalInput.maxLifeSpan))  errores.minLifeSpan = "Min lifespan must be less than max";
                else errores.minLifeSpan = "";
            }
        case "maxLifeSpan":
            if(input.name === "maxLifeSpan"){
                if(parseInt(globalInput.minLifeSpan) >= parseInt(input.value))  errores.maxLifeSpan = "Max lifespan must be greater than min";
                else errores.maxLifeSpan = "";
            }
            if(!input.value.length) errores[input.name] = "Required";
            if(!/[0-9]/.test(input.value) || /[@$?¡\-_]/.test(input.value)){
                if(errores[input.name] === "minHeight") errores[input.name] = "Invalid height - Only numbers";
                if(errores[input.name] === "maxHeight") errores[input.name] = "Invalid height - Only numbers";
                if(errores[input.name] === "minWeight") errores[input.name] = "Invalid weight - Only numbers";
                if(errores[input.name] === "maxWeight") errores[input.name] = "Invalid weight - Only numbers";
            }
            if(input.value === "0") errores[input.name] = "Required";
            break;
        default: return errores;
    }
    return errores;
}