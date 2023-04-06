import React from "react";
import { Tilt } from "react-tilt";
import './Logo.css';
import WooX from './WooX-2.png';


const Logo = () =>{
    return(
        <div className="ma4 mt10">
            <Tilt className="Tilt br2 shadow-2" options={{max:25}} style={{height: 250, width: 250}}>
                <div className="Tilt-innter">
                    <img style={{paddingTop: '5px'}} alt="logo" src={WooX}></img>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;