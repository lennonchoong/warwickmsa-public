import React, { useState, useEffect } from 'react';
import PageSVG from "../statics/front.svg";
import ArrowSVG from "../statics/arrow.svg";

function Page1(props) {
    const scrollDown = () => {
        console.log(props.nextPageRef.current);
        props.nextPageRef.current.scrollIntoView();
    }

    return (
        <div className="page1">
            <div className="nav">
                <div className="nav-opt" onClick={() => scrollDown()}>Committee</div>
                <div className="nav-opt">Events</div>
                <div className="nav-opt">Sponsors</div>
                <div className="nav-opt">Socials</div>
            </div>
            <div className="two-col">
                <div className="left-col col">
                    <div className="title-wrapper">
                        <div className="title light-text">Warwick <br></br><span className="anim-text red-text">Malaysian</span> Society</div>
                        <div className="title-desc light-text-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in tortor massa consectetur egestas ornare tortor nulla. Ipsum neque, nunc gravida ut. Nunc, gravida feugiat sit at turpis tortor mattis porta. Aliquet consequat augue consequat viverra. In egestas tincidunt odio condimentum. A dignissim lorem porta curabitur ac sit. Duis pulvinar facilisis eu viverra viverra neque sit sed. Pretium platea lobortis sit viverra est in eu vitae diam.</div>
                    </div>
                </div>
                <div className="right-col col">
                    <div className="svg-wrapper">
                        <img src={PageSVG} alt="logo"/>
                    </div>
                </div>
            </div>
            <div className="arrow-btn-wrapper">
                <img src={ArrowSVG} onClick={() => scrollDown()} alt='logo'/>
            </div>
        </div>
    )
}

export default Page1;