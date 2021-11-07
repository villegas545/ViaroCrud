import React from 'react'

function Footer() {
    const estilo = {
        position: 'absolute',
        width: '100%',
        bottom: '0px',
    }
    return (

        <footer class="bg-dark text-center text-white" style={estilo}>

            <div class="text-center p-3">
                Realizado por:
                <a class="text-white" href="https://www.linkedin.com/in/julio-c-villegas/"> Ing. Julio Cesar Villegas Venzor</a>
            </div>

        </footer>

    )
}

export default Footer
