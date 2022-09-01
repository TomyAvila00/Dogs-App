import React from 'react';
import "./Paginado.css";

export default function Paginado({dogsPerPage, allDogs, paginado}) {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i + 1);
    }

    return (
        <nav>
            <ul className='paginado'>
                {pageNumbers.length > 1 && 
                pageNumbers.map(number => (
                    <li className='paginado-li' key={number}>
                        <button className='paginado-button' onClick={() => paginado(number)}><strong>{number}</strong></button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}