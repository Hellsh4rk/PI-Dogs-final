/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";
import linkedin from "../img/linkedinicon.png";
import githubicon from "../img/githubicon.png"

export default function LandingPage() {
    return(
        
        <div className="background">
            
            <div className="icons">
                <a target="_blank" href={"https://www.linkedin.com/in/yahir-lope/"} rel="noreferrer">
                    <img className="icono" src={linkedin}></img>
                </a>
                <a target="_blank" href={"https://github.com/Hellsh4rk"} rel="noreferrer">
                    <img className="icono" src={githubicon}></img>
                </a>
            </div>
            <h1 className="welcomeText"> Conoce a nuestros amigos perrunos! </h1>
            <Link to ="/home">
            <button className="button">Ingresar</button>
            </Link>
        </div>
    )
}