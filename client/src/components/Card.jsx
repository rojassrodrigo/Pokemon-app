import React from "react";
import styles from "../styles/Card.module.css";

export default function Card({name, image, types}){
    return(
        <div>
          <div className={styles.card}>
            <div>
              <h2 >{name}</h2>
              <div className={styles.types}>
                <span>
                  Tipo: {types}
                </span>
              </div>
            </div>
            <img
              src={image}
              alt="img"
              width="250px"
              height="175px"
              
            />
          </div>

        </div>
        
    )
}