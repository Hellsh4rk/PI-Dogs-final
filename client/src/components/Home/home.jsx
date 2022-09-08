import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../Card/dog";
import Paginado from "../Pagination/pagination"
import SearchBar from "../SearchBar/searchBar";
import iconHome from "../img/home1.png"
import {
    getDogs,
    getDogTemperament,
    filterDogsByTemperament,
    filterDogsByCreated,
    order,
    resetPagination,
} from "../../actions/index";

import "./home.css"
import reload from "../img/reload.png"
import cargando from "../img/loading-dog.gif"


export default function Home() {
    const dispatch = useDispatch();
    const pagination = useSelector((state) => state.paginado);
    console.log(pagination)
    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.temperaments);
    
    allTemperaments.sort(function (a, b) {
        if (a > b) {
            return 1;
        }
        if (b > a) {
            return -1
        }
        return 0;
    })

    const [, setOrden] = useState("");
    const [dogsOnPage,] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);

    const indexLastDog = pagination.current * dogsOnPage;
    const indexFristDog = indexLastDog - dogsOnPage;

    const currentDog = allDogs.slice(indexFristDog, indexLastDog);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getDogTemperament());
    },[]);

    useEffect (() => {
        dispatch(resetPagination({current: currentPage}));
    },[currentPage]);

    function handleRefresh() {
        window.location.reload(false);
    }

    function handleOrder(e) {
        e.preventDefault();
        dispatch(order(e.target.value));
        setCurrentPage(1);
        setOrden(`${ e.target.value }`);
    }

    function handleFilterDogsByTemperament(e) {
        e.preventDefault();
        dispatch(filterDogsByTemperament(e.target.value));
        setCurrentPage(1);
    }

    function handleFilterCreate(e) {
        e.preventDefault();
        dispatch(filterDogsByCreated(e.target.value));
        setCurrentPage(1);
    }
    
    
    return (
        <div className="home">
            <div>
                <div className="divCrear">
                <Link
                    to="/home/createDog"
                    className="crearDog"
                >Crea una nueva raza</Link>    
                </div>
                <h1 className="titulo">Encuentra tu lomito favorito </h1>
                <div>
            </div>

                <button
                    type="submit"
                    onClick={handleRefresh}
                    className="refresh"
                    >
                <img
                    width="20px" height="20px"
                    className="icon"
                    src={reload}
                    alt="">
                </img>
                </button>

                <SearchBar/>

                <Link type="submit"
                    to={"/"}
                    className="buttonHome"
                >
                    <img
                        width="20px" height="20px"
                        className="iconHome"
                        src={iconHome}
                        alt="">
                    </img>
                </Link>


                <select onChange={e=>handleOrder(e)} className="lista">
                    <option value="default">Orden Alfabetico</option>
                    <option value="Asc">A-Z</option>
                    <option value="Des">Z-A</option>
                    <option value="min_weight">Peso minimo</option>
                    <option value="max_weight">Peso maximo</option>
                </select>

                <select onChange={(e) => handleFilterDogsByTemperament(e)} className="lista">
                    <option value="All">temperamentos</option>
                    {
                        allTemperaments.map((temperament) => (
                        <option
                            value={temperament.name}
                            key={temperament.id}
                        >{temperament.name}</option>
                        ))
                    }
                </select>

                <select onChange={(e)=>handleFilterCreate(e)} className="lista">
                    <option value="All">Todos</option>
                    <option value="Create">Creados</option>
                    <option value="Api">Existentes</option>
                </select>

                <Paginado
                    dogsOnPage={dogsOnPage}
                    allDogs={allDogs.length}
                    pagina={paginado}
                />


                {currentDog.length > 0 ? (
                <div className="positions">{
                    currentDog.map(d => {
                        d.createdAtDb && console.log(d)
                        return (
                            <Card
                                key={d.id}
                                id={d.id}
                                name={d.name}
                                temperament={d.temperament}
                                image={d.image}
                                weight={d.weight}
                                height={d.height}
                            ></Card>
                        )
                    })
                }
                </div>
                ) : (
                    <div>
                    <img
                        src={cargando}
                        alt="cargando..."
                        className="carga"
                        />
                    </div>
                )
                }
            </div>
        </div>
    )

}