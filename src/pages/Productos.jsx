import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
const LIMIT = 20;
let start, end;

const Productos = () => {
    // let location = useLocation()
    // console.log(location)
    // let {search} = useLocation()
    // let query = new URLSearchParams(search)
    // console.log(query)

    // let start = parseInt(query.get("inicio"))
    // let end = parseInt(query.get("fin"))
    // console.log(start,end)
    let [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
      start = searchParams.get("inicio") || "1";
      end = searchParams.get("fin") || "20";
      setSearchParams({ inicio: start, fin: end });
    }, []);
    
    console.log(start,end)

    const handleNext = (e) => {
      start = new String(parseInt(start) + LIMIT);
      end = new String(parseInt(end) + LIMIT);
      setSearchParams({ inicio: start, fin: end });
    };
    const handlePrev = (e) => {
      start = new String(parseInt(start) - LIMIT);
      end = new String(parseInt(end) - LIMIT);
      setSearchParams({ inicio: start, fin: end });
    
    }
    return (
        <div>
            <h2>Productos</h2>
            <p>Mostrando productos del <b>{start}</b> al <b>{end}</b>.</p>
            <button onClick={handlePrev}>Atrás</button>
            <button onClick={handleNext}>Adelante</button>
        </div>
    )
}

export default Productos