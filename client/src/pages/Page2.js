import React, {forwardRef, useEffect, useState} from 'react';
import ArrowSVG from "../statics/arrowdark.svg";
import Card from "./Card"
import NavBar from "./NavBar";

const Page2 = forwardRef((props, ref) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(props.data);
    })

    return (
        <div ref={ref} className="page2">
            <div className="comm-wrapper">
                <NavBar 
                    light={true}
                    sticky={true}
                    navBarRef={props.navBarRef}
                />
                <div className="two-col">
                    <div className="sticky-col col">
                        <div className="title-wrapper">
                            <div className="fade title dark-text">Meet Our <span className="anim-text green-text">Committee</span></div>
                            <div className="fade title-desc dark-text-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in tortor massa consectetur egestas ornare tortor nulla. Ipsum neque, nunc gravida ut. Nunc, gravida feugiat sit at turpis tortor mattis porta. Aliquet consequat augue consequat viverra. In egestas tincidunt odio condimentum. A dignissim lorem porta curabitur ac sit. Duis pulvinar facilisis eu viverra viverra neque sit sed. Pretium platea lobortis sit viverra est in eu vitae diam.</div>
                        </div>
                    </div>
                    <div className="scroll-col col">
                        <div className="card-col">
                            {data.map((e) => {
                                return (
                                    <Card dark={true} member={true} data={e}/>
                                )
                            })}
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

export default Page2;