import React, { useRef } from "react";
import './Home.css';
import {useNavigate} from "react-router-dom";
import {useState, useEffect, useMemo} from 'react';

function Home() {
    let navigate = useNavigate()

    function showCategories(){

    }

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
            <div id='home-background-code-gradient'/>
            <BackgroundText/>
            <Title
                onClick={showCategories}
            />
        </>  
    );
  }
  

function Title({onClick}){

    const [pos, setPos] = useState({x:0, y:0})
    const [titleAnim, setTitleAnim] = useState([0, 0, 0])

    const mouse_pos = useRef({x:0, y:0})

    function handleMouseMove(e){
        mouse_pos.current.x = e.pageX
        mouse_pos.current.y = e.pageY
    }

    useEffect(() => {
        window.addEventListener("mousemove",handleMouseMove)
        const interval = setInterval(() => {
            let vw = window.innerWidth;
            let vh = window.innerHeight;

            setPos({
                x: (vw/2-mouse_pos.current.x) / 35,
                y: (vh/2-mouse_pos.current.y) / 20,
            })
        }, 100)
        return () => {
            window.removeEventListener("mousemove",handleMouseMove)
            clearInterval(interval)
        }
    }, [])

    return(
        <>
            <style>
                {`
                    .home-title-part{
                        transition: .6s;
                        transition-timing-function: cubic-bezier(0.85, 0.01, 0.16, 0.99);
                        display: inline-block;
                        position: relative;
                    }
                `}
            </style>
            <div
                id='home-title-box'
                style={{
                    display:'flex',
                    justifyContent: 'center',
                    alignItems:'center',
                    height: '100vh',
                }}
                onClick={() => onClick()}
            >
                <div
                    id='home-title'
                    style={{
                        left: pos.x,
                        top: pos.y,
                    }}
                    onMouseEnter={() => setTitleAnim([50, -925, 0])}
                    onMouseLeave={() => setTitleAnim([-10, 10, 10])}
                >
                    <div className="home-title-part" style={{left: titleAnim[0]+'px'}}>{"Programmer's Garage"}</div>
                    <div className="home-title-part" style={{left: titleAnim[1]+'px'}}>{"<"}</div>
                    <div className="home-title-part" style={{left: titleAnim[2]+'px'}}>{"/>"}</div>
                </div>
            </div>
        </>
    )
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
            el.textContent = txt
            setHeightLimits(true)
            
        })
        .catch((error) => console.log(error))
    }, []) 
    
    return(
        <>
            <style>
                { heightLimits && `
                    @keyframes scroll {
                        0% {top: `+(-document.getElementById('home-background-code').offsetHeight)+`px}
                        100% {top: 100vh}
                    }

                    #home-background-code{
                        display: inline;
                        animation-duration: `+document.getElementById('home-background-code').offsetHeight/75+`s;
                        animation-name: scroll;
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