import React from "react";

function Home(){
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
            <div>
                Esta é a HomePage!
            </div>
        </>  
    );
  }
  
  export default Home;