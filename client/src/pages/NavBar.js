import React, {forwardRef, useEffect} from 'react';

const Page2 = (props) => {
    const scrollDown = (page) => {
        page.current.scrollIntoView();
    }

    return (
        <div className={(props.light ? "light-nav" : "dark-nav") + " " + (props.sticky ? "sticky-nav" : "") + " init-fade nav"}>
            <div className="nav-opt" onClick={() => scrollDown(props.navBarRef[1])}>Home</div>
            <div className="nav-opt" onClick={() => scrollDown(props.navBarRef[2])}>Committee</div>
            <div className="nav-opt" onClick={() => scrollDown(props.navBarRef[3])}>Events</div>
            <div className="nav-opt" onClick={() => scrollDown(props.navBarRef[4])}>Sponsors</div>
            <div className="nav-opt" onClick={() => scrollDown(props.navBarRef[5])}>Socials</div>
        </div>
    )
}

export default Page2;