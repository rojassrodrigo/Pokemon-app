import React from "react";
import styles from "../styles/Paginate.module.css";

export default function Paginate({paginaActual, setPaginaActual, allPokemons, pokemonsPorPagina, paginate}){
    const numeroPagina = [];
    const totalPages = Math.ceil(allPokemons / pokemonsPorPagina)

    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPorPagina); i++) {
        numeroPagina.push(i);
      }
    
      const handleBack = () => {
        paginaActual > 1 && (setPaginaActual(paginaActual -1))
      } 
      const handleNext = () => {
        
        if (paginaActual < totalPages) {
          setPaginaActual(paginaActual + 1);
        }
      }

    return(
        <div>
            <nav>
                <ul>
                    <button onClick={handleBack}>Atras</button>
                        {
                            numeroPagina?.map((n) => {
                                return(
                                  
                                    <li key = {n}> 
                      
                                    <button id="pagination" onClick={() => paginate(n)}>
                                    {n}
                                    </button>
                                    
                                    </li>
                                )
                            })
                        }
                    <button onClick={handleNext}>Siguiente</button>
                </ul>
            </nav>
        </div>
    )
    
}