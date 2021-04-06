import React from 'react';
import Picture from "../statics/download.jpeg";

const Card = (props) => {
    return (
        <div className="card">
            <div className="card-wrapper">
                <div className="fade card-img">
                    <img src={Picture}></img>
                </div>
                <div className="fade card-desc">
                    <div className={`card-name ${props.dark ? 'card-text-dark' : 'card-text-light'}`}>Muhammad Ching Chong </div>
                    <div className={`card-title ${props.dark ? 'card-text-dark' : 'card-text-light'}`}>President</div>
                    <div className={`card-desc ${props.dark ? 'card-text-dark-2' : 'card-text-light-2'}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui, tellus eget imperdiet sit placerat cras accumsan laoreet nunc. Velit libero, leo faucibus libero duis sagittis. Rhoncus eget vitae mattis sed. Fermentum massa sociis enim elit parturient lectus.Fermentum massa sociis enim elit parturient lectus.</div>
                </div>
            </div>
        </div>
    )
}

export default Card;