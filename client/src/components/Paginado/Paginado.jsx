import React, {useState} from "react";

export default function Home({cantidad, allDogs, paginado, paginaActual}){
    
    const numeros = [];
    const [nroPagina, setNroPagina] = useState(1);
    const cantTotal = Math.ceil(allDogs.length / cantidad);

    for(let i = 1; i <=cantTotal; i++){
        numeros.push(i);
    }

    function paginadoHandler(n){
        if(n < 1 || n > cantTotal) return;
        paginado(n);
        setNroPagina(n);
    }

    return(
        <div>
            <h1>Pagina: {paginaActual}</h1>
            <div>
                <button name="Principio" onClick={() => paginadoHandler(1)}>&lt;&lt;</button>
                <button name="Prev" onClick={() => paginadoHandler(paginaActual-1)}>&lt;</button>
                {
                    numeros?.map(
                        (n, i) => {
                            if(n > paginaActual + 2 || n < paginaActual - 2){
                                return
                            }else{
                                return(
                                    <button key={i} onClick={() => paginadoHandler(n)}>{n}</button>
                                )
                            }
                        }
                    )
                }
                <button name="Next" onClick={() => paginadoHandler(paginaActual+1)}>&gt;</button>
                <button name="Final" onClick={() => paginadoHandler(cantTotal)}>&gt;&gt;</button>
            </div>
        </div>
    )
}