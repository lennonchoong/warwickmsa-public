import React, { useState, useEffect, forwardRef } from 'react';
import PageSVG from "../statics/front.svg";
import ArrowSVG from "../statics/arrow.svg";
import NavBar from "./NavBar";

const Page1 = forwardRef((props, ref) => {
    useEffect(() => {
        setTimeout(() => {
            [...document.querySelectorAll(".init-fade")].map((e) => {
                e.classList.add("fade-in-view");
            })
        }, 500)
    })

    return (
        <div ref={ref} className="page1">
            <NavBar 
                light={false}
                navBarRef={props.navBarRef}
            />
            <div className="two-col">
                <div className="left-col col">
                    <div className="title-wrapper">
                        <div className="init-fade fade title light-text">Warwick <br></br><span className="anim-text red-text">Malaysian</span> Society</div>
                        <div className="init-fade fade title-desc light-text-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in tortor massa consectetur egestas ornare tortor nulla. Ipsum neque, nunc gravida ut. Nunc, gravida feugiat sit at turpis tortor mattis porta. Aliquet consequat augue consequat viverra. In egestas tincidunt odio condimentum. A dignissim lorem porta curabitur ac sit. Duis pulvinar facilisis eu viverra viverra neque sit sed. Pretium platea lobortis sit viverra est in eu vitae diam.</div>
                    </div>
                </div>
                <div className="right-col col">
                    <div className="init-fade svg-wrapper">
                        <img src={PageSVG} alt="logo"/>
                    </div>
                </div>
            </div>
            <div className="arrow-btn-wrapper">
                <img src={ArrowSVG} onClick={() => props.scrollNextPage(props.nextPageRef)} alt='logo'/>
            </div>
        </div>
    )
})

export default Page1;