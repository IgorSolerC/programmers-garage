import React from "react";

function Background() {
    return (
        <div
            id='app-background'
            style={{
                width: '100vw',
                height: '100vh',
                backgroundColor: '#121212',
                position: 'fixed',
                top: "0",
                zIndex: '-10',
            }}
        >
            
        </div>
    );
  }
  
  export default Background;