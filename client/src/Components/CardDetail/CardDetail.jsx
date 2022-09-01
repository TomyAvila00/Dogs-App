import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions/index";
import { useEffect } from "react";
import "./CardDetail.css";


export default function CardDetail(props) {
    const dispatch = useDispatch();

    const id = props.match.params.id; 

    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id]);

    const myDog = useSelector((state) => state.detail);


    return (
        <div>
            <div className="container-detail-button">
                <div className="detail-button">
                    <Link to='/home'><button> Home </button></Link>
                </div>
                <div className="detail-button">
                    <Link to='/dogs' ><button>Create a dog</button></Link>
                </div>
            </div>
            {
                myDog.length > 0 ?
                    <div>
                        <h1 className="detail-text">{myDog[0].name}</h1>
                        <ul>
                            <li>
                                <div className="detail-img">
                                    <img className="detail-img" src={myDog[0].image} alt={myDog[0].name}  />
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h3 className="detail-text">Temperaments:</h3>
                                    {myDog[0]?.temperament
                                        ? myDog[0].temperament.map((elem) => elem + ", ")
                                        : myDog[0]?.temperaments?.map((elem) => elem.name + ", ")}

                                    <h3 className="detail-text">Height min-max:</h3>
                                    <p>{myDog[0].height} cm</p>

                                    <h3 className="detail-text">Weight min-max:</h3>
                                    <p>{myDog[0].weight} kg</p>

                                    <h3 className="detail-text">Approximate life span:</h3>
                                    <p>{myDog[0].life_span}</p>
                                </div>
                            </li>
                        </ul>
                    </div> :
                    <div>
                        <h1>loading...</h1>
                    </div>
            }
        </div>
    )
}
