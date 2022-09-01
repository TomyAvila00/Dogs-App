import React from "react";
import "./Card.css";
import { Link } from 'react-router-dom';

export default function Card({id, name, image, weight, temperament, temperaments}) {
    
    return (
        <div className="container-card">
            <Link className="container-card" to={`/home/${id}`}>
                <h1>{name}</h1>
                <img className="card-img" src={image} alt="not found"/>
                <h2 className="card-temperaments">Temperaments: </h2> <br/>
                    { temperament
                    ? temperament.map((el) => el + ", ")
                    : temperaments?.map((el) => el.name + ",")}
                <h3>Weight: {weight} kg</h3>
            </Link>
        </div>
    )
}