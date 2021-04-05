import React, {forwardRef} from 'react';
import ArrowSVG from "../statics/arrow.svg";
import Card from "./Card"

const Page2 = forwardRef((props, ref) => {
    return (
        <div ref={ref} className="page2">
            <div className="comm-wrapper">
                <div className="two-col">
                    <div className="sticky-col col">
                        <div className="title-wrapper">
                            <div className="title dark-text">Meet Our <span className="anim-text green-text">Committee</span></div>
                            <div className="title-desc dark-text-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in tortor massa consectetur egestas ornare tortor nulla. Ipsum neque, nunc gravida ut. Nunc, gravida feugiat sit at turpis tortor mattis porta. Aliquet consequat augue consequat viverra. In egestas tincidunt odio condimentum. A dignissim lorem porta curabitur ac sit. Duis pulvinar facilisis eu viverra viverra neque sit sed. Pretium platea lobortis sit viverra est in eu vitae diam.</div>
                        </div>
                    </div>
                    <div className="scroll-col col">
                
                    </div>
                </div>
                <div className="arrow-btn-wrapper">
                    <img src={ArrowSVG} alt='logo'/>
                </div>
            </div>
        </div>
    )
})

export default Page2;