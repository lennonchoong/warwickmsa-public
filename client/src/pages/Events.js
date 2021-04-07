import React, {forwardRef, useState, useEffect} from 'react';
import ArrowSVG from "../statics/arrow.svg";
import Card from "./Card"
import NavBar from "./NavBar";

const Events = forwardRef((props, ref) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(props.data);
    })

    return (
        <div ref={ref} className="events">
            <div className="comm-wrapper">
                <NavBar 
                    light={false}
                    sticky={true}
                    navBarRef={props.navBarRef}
                />
                <div className="two-col">
                    <div className="scroll-col col">
                        <div className="card-col">
                            {data.map((e) => {
                                return (
                                    <Card dark={false} event={true} data={e}/>
                                )
                            })}
                        </div>
                    </div>
                    <div className="sticky-col col">
                        <div className="title-wrapper">
                            <div className="fade title light-text">Our Upcoming <span className="anim-text orange-text">Events</span></div>
                            <div className="fade title-desc light-text-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in tortor massa consectetur egestas ornare tortor nulla. Ipsum neque, nunc gravida ut. Nunc, gravida feugiat sit at turpis tortor mattis porta. Aliquet consequat augue consequat viverra. In egestas tincidunt odio condimentum. A dignissim lorem porta curabitur ac sit. Duis pulvinar facilisis eu viverra viverra neque sit sed. Pretium platea lobortis sit viverra est in eu vitae diam.</div>
                        </div>
                    </div>
                </div>
                <div className="arrow-btn-wrapper">
                    <img src={ArrowSVG} alt='logo' onClick={() => props.scrollNextPage(props.nextPageRef)}/>
                </div>
            </div>
        </div>
    )
})

export default Events;