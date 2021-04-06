import React from 'react';
// import Picture from "../../../statics/members";

const Card = (props) => {
    const parseDate = (date) => {
        let parsedDate = new Date(Date.parse(date));
        let month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        return `${parsedDate.getDate()} ${month[parsedDate.getMonth()]} ${parsedDate.getFullYear()}`
    }

    return (
        <div className="card">
            <div className="card-wrapper">
                <div className="fade card-img">
                    <img src={".." + props.data.picture.substr(1)}></img>
                </div>
                <div className="fade card-desc">
                    <div className={`card-name ${props.dark ? 'card-text-dark' : 'card-text-light'}`}>{props.event ? props.data.title : props.data.name}</div>
                    {props.member ? <div className={`card-title ${props.dark ? 'card-text-dark' : 'card-text-light'}`}>{props.data.position}</div> : null}
                    {props.event ? <div className={`card-title ${props.dark ? 'card-text-dark' : 'card-text-light'}`}>{parseDate(props.data['post_date'])}</div> : null}
                    <div className={`card-desc ${props.dark ? 'card-text-dark-2' : 'card-text-light-2'}`}>{props.data.body}</div>
                </div>
            </div>
        </div>
    )
}

export default Card;