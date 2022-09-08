import React from "react";
import { Link } from "react-router-dom";
import "./dog.css"


export default function Card({ image, name, temperament, weight, id, lifeSpan }) {
    
    let temp = "";
    typeof temperament === "object" ?
        temp = temperament?.map(t => {
            return t.name
        }).join(", ") : temp = temperament
    
    return (
        <div className="card-container">
            <Link to={`/home/${id}`}>
            <h2 className="nameHome">{name}</h2>
            <h4 className="weightHome">{`Peso ${weight[0]} - ${weight[1]} Kg`}</h4>
            <h3 className="temperamentsHome">Temperamentos:  </h3>
            {/* {console.log(name)} */}
            {/* <h3 className="lifeSpan">{`Vida ${lifeSpan[0]} - ${lifeSpan[1]} Nm`}</h3> */}
            <h3 className="temperamentsHome">{temp}</h3>
            {/* {console.log(temp)}  */}
            <div className="image-conteiner">
                <img
                    src={image}
                    alt=""
                    whidth="200px" height="250px"
                    className="image"
                ></img>
            </div>
            </Link>
        </div>
    );
}