import React from "react";
import './Home.css';
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';

function Home() {

    let navigate = useNavigate()

    return (
        <>
            <style>
                {`
                    #app-navbar{
                        display: none;
                    }

                    #main{
                        margin-top: 0;
                    }
                `}
            </style>
            <div
                id='home-background-code-gradient'
            ></div>
            <BackgroundText/>
            <div
                id='home-title-box'
                style={{
                    display:'flex',
                    justifyContent: 'center',
                    alignItems:'center',
                    height: '100vh',
                }}
                onClick={() => navigate('/wordle')}
            >
                <span
                    id='home-title'
                >
                    {"Programmer's Garage </>"}
                </span>
            </div>
        </>  
    );
  }
  
function BackgroundText(){

    const [heightLimits, setHeightLimits] = useState(false)

    useEffect(() => {
        /* Executa fetch dos dados */
        // let url = 'https://raw.githubusercontent.com/IgorSolerC/Experimento-React/master/src/home/Home.js'
        let url = '/Experimento-React/all-scripts.txt'
        fetch(url)
        .then((resp) => resp.text())
        .then((txt) => {
            /* Set velocidade do texto, e animação do texto */
            // Usa como base o tamanho do element do texto
            var el = document.getElementById('home-background-code')
            var txt_spd = el.offsetHeight / 50
            el.textContent = txt
            el.style.animationDuration = txt_spd + 's'
            el.style.animationName = 'scroll'
            console.log(el.offsetHeight)
            setHeightLimits(
                {
                    min: -el.offsetHeight+'px', 
                    max: el.offsetHeight+200 +'px',
                }
            )
            }).then()
        .catch((error) => console.log(error))



    }, []) 
    

    return(
        <>
            <style>
                { heightLimits && `
                    @keyframes scroll {
                        0% {top: `+heightLimits.min+`}
                        100% {top: `+heightLimits.max+`}
                    }

                    #home-background-code{
                        display: inline;
                    }
                `}
            </style>
            <div
                id='home-background-code'
                >
            </div>
        </>
    )
}

export default Home;