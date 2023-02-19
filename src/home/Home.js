import React, { useRef } from "react";
import './Home.css';
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from 'react';
import WordleBoard from '../wordle/Wordle'

function Home() {

    const [crntCategory, setCrntCategory] = useState('title')
    const [hideCategory, setHideCategories] = useState(null)

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
            {
                crntCategory == 'title'
                    ?
                    <Title
                        hide={hideCategory=='title'}
                        hideFunction={() => setHideCategories('title')}
                        onHide={setCrntCategory}
                    />
                    :
                crntCategory == 'pages'
                    ?
                    <Pages
                        hide={hideCategory=='pages'}
                        hideFunction={() => setHideCategories('pages')}
                        onHide={setCrntCategory}
                    />
                    :
                crntCategory == 'wordle'
                    ?
                    <Wordle
                        hide={hideCategory=='wordle'}
                        hideFunction={() => setHideCategories('wordle')}
                        onHide={setCrntCategory}
                    />
                    :
                undefined
            }
        </>  
    );
  }
  
function Wordle({hideFunction, hide, onHide}){

    const [nextPage, setNextPage] = useState(false)

    return(
        <Menu
            hide={hide}
            onHide={() => onHide(nextPage)}
        >
            <AnimatedTitle
                onClick={() => {
                    hideFunction(); setNextPage('pages')
                }}
                hide={hide}
                offsetArray={[15, -78, 0]}
                text='Back'
                id='home-back'
            />  
            <AnimatedTitle
                hide={hide}
                offsetArray={[50, -305, 0]}
                text='Wordle'
                id='pages-title'
            />        
            <WordleBoard/>                              
        </Menu>
    )
}

function Title({hideFunction, hide, onHide}){

    const [nextPage, setNextPage] = useState(false)

    return(
        <Menu
            hide={hide}
            onHide={() => onHide(nextPage)}
        >
            <AnimatedTitle
                onClick={() => {
                    hideFunction(); setNextPage('pages')
                }}
                hide={hide}
                offsetArray={[50, -925, 0]}
                text="Programmer's Garage"
                id='home-title'
            />                                
        </Menu>
    )
}

function Pages({hideFunction, hide, onHide}){
    
    const [nextPage, setNextPage] = useState(false)

    return(
        <Menu
            hide={hide}
            onHide={() => onHide(nextPage)}
        >
            <AnimatedTitle
                onClick={() => {
                    hideFunction(); setNextPage('title')
                }}
                hide={hide}
                offsetArray={[15, -78, 0]}
                text='Back'
                id='home-back'
            />  
            <AnimatedTitle
                hide={hide}
                offsetArray={[50, -340, 0]}
                text='Páginas'
                id='pages-title'
            />        
            <AnimatedTitle
                onClick={() => {
                    hideFunction(); setNextPage('wordle')
                }}
                hideFunction={hideFunction}
                hide={hide}
                offsetArray={[30, -185, 0]}
                text="Wordle"
                id='pages-element'
            />                              
        </Menu>
    )
}

function AnimatedTitle({onClick, hide, offsetArray, text, id, setNextPage}){

    const [titleAnim, setTitleAnim] = useState([-10, 10, 10])

    return(
        <div
            id={id}
            className='animated-code-component'
            onMouseEnter={() => !hide && setTitleAnim(offsetArray)} // Checa se está hide, para não zoar a animação
            onMouseLeave={() => !hide && setTitleAnim([-10, 10, 10])}
            onClick={onClick}
        >
            <div className="home-title-part" style={{left: titleAnim[0]+'px'}}>{text}</div>
            <div className="home-title-part" style={{left: titleAnim[1]+'px'}}>{"<"}</div>
            <div className="home-title-part" style={{left: titleAnim[2]+'px'}}>{"/>"}</div>         
        </div>
    )
}

function Menu({hide, onHide, children}){
    
    const HIDE_DURATION = 0.5
    useEffect(() => {
        if(hide){
            setTimeout(onHide, HIDE_DURATION*1000)
        }
    }, [hide])

    const [pos, setPos] = useState({x:0, y:0})

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
                    marginLeft: hide && '100vw',
                    transition: 'margin-left '+HIDE_DURATION+'s, left .2s, top .2s',
                    left: pos.x,
                    top: pos.y,
                }}
            >
                {children}
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