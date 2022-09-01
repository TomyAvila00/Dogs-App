import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemperaments, filterDogsByTemperament, filterDogsByOrigin, sortByName, sortByWeight } from '../../redux/actions/index';
import { Link } from 'react-router-dom';
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css";


export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.temperaments);
    
    
    const [currentPage, setCurrentPage] = useState(1); 
    const [dogsPerPage] = useState(8);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage; 
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); 

    const [/*_order*/,setOrder] = useState('');

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    //---------------------------------------------------------------------

  
    useEffect(() => { 
        dispatch(getDogs()) 
    }, [dispatch])
    
    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    function handleFilterTemperaments(e) {
        e.preventDefault();
        dispatch(filterDogsByTemperament(e.target.value))
        setCurrentPage(1);
    }

    function handleFilterOrigin(e) {
        e.preventDefault();
        dispatch(filterDogsByOrigin(e.target.value))
        setCurrentPage(1); 
    }

    function handleSortByName(e) {
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }

    function handleSortByWeight(e) {
        e.preventDefault();
        dispatch(sortByWeight(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }

    return (
        <div className='home'>

            <div className='container-navbar'>
                <ul className='navbar'>
{/*                     <li >
                        <button onClick={e => { handleClick(e) }}>Home</button>
                    </li> */}
                    <li className="nav-li">
                        <Link to='/create' ><h2 className='create-link'>Add a dog</h2></Link>
                    </li>
                    <li className="nav-li">
                        <select onChange={e => handleSortByName(e)}  >
                            <option value='selected' hidden>Sort by name</option>
                            <option value='asc'>A - Z</option>
                            <option value='desc'>Z - A</option>
                        </select>
                    </li>
                    <li className="nav-li">
                        <select onChange={e => handleSortByWeight(e)}  >
                            <option value='selected' hidden>Sort by weight</option>
                            <option value='asc'>Lighter to heavier</option>
                            <option value='desc'>Heavier to lighter</option>
                        </select>
                    </li>
                    <li className="nav-li">
                        <select onChange={e => handleFilterTemperaments(e)}  >
                            <option key={0} value='all'>All temperaments</option>
                            {allTemperaments?.sort(function (a, b) {
                                if (a.name < b.name) return -1;
                                if (a.name > b.name) return 1;
                                return 0;
                            }).map(el => {
                                return (
                                    <option key={el.id} value={el.name}>{el.name}</option>
                                )
                            })}
                        </select>
                    </li>
                    <li className="nav-li">
                        <select onChange={e => handleFilterOrigin(e)}  >
                            <option value='all'>All dogs</option>
                            <option value='api'>Existent dogs</option>
                            <option value='created'>Created</option>
                        </select>
                    </li>
                    <li className="nav-li">
                        <SearchBar />
                    </li>
                </ul>
            </div>

            {allDogs.length > 0?
                <div>
                    <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />

                    <div className="cards-container">
                        {currentDogs?.map((el) => {
                        return (
                            <div className="card-info" key={el.id}>
                                <Card
                                    id={el.id}
                                    name={el.name}
                                    image={el.image}
                                    temperaments={el.temperaments}
                                    temperament={el.temperament}
                                    weight={el.weight}
                                    key={el.id}
                                />
                            </div>
                        )
                        })}
                    </div>

                    <div className="paginado-bot">
                        <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />
                    </div>
                </div> :
                <div>
                    <h1>Loading...</h1>
                </div>
            }

        </div>
    )

}