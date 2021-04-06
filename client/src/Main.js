import React, { Component } from 'react';
import './App.css';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2'
import Events from "./pages/Events";
import Sponsor from "./pages/Sponsor";
import Social from "./pages/Social"

class Main extends Component {
	constructor() {
		super();
		this.page1Ref = React.createRef();
		this.page2Ref = React.createRef();
		this.eventsRef = React.createRef();
		this.sponsorRef = React.createRef();
		this.socialRef = React.createRef();
		this.wrapperRef = React.createRef();
		this.navBarRef = {
			1: this.page1Ref,
			2: this.page2Ref,
			3: this.eventsRef,
			4: this.sponsorRef,
			5: this.socialRef,
		}
	}

	componentDidMount() {
		this.wrapperRef.current.addEventListener("scroll", () => this.animateInView());
	}

    animateInView() {
        [...document.querySelectorAll(".fade")].map((e) => {
            if (this.isElemInView(e)) {
                e.classList.add("fade-in-view");
            } else {
                e.classList.remove("fade-in-view");
            }
        })
    }

	scrollDown(nextPage) {
		nextPage.current.scrollIntoView();
    }

    isElemInView(e) {
        const rect = e.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
                (window.innerHeight ||
                    document.documentElement
                        .clientHeight) &&
            rect.right <=
                (window.innerWidth ||
                    document.documentElement
                        .clientWidth) 
        );
    }

	scrollNextPage(nextPageRef) {
		nextPageRef.current.scrollIntoView();
	}

    render() {
        return (
            <div ref={this.wrapperRef} className="App">
                <Page1
                    ref={this.page1Ref}
                    nextPageRef={this.page2Ref}
                    scrollNextPage={this.scrollNextPage}
					navBarRef={this.navBarRef}
                />
                <Page2
                    ref={this.page2Ref}
                    nextPageRef={this.eventsRef}
                    scrollNextPage={this.scrollNextPage}
					navBarRef={this.navBarRef}
                />
                <Events
                    ref={this.eventsRef}
                    nextPageRef={this.sponsorRef}
                    scrollNextPage={this.scrollNextPage}
					navBarRef={this.navBarRef}
                />
                <Sponsor
                    ref={this.sponsorRef}
                    nextPageRef={this.socialRef}
                    scrollNextPage={this.scrollNextPage}
					navBarRef={this.navBarRef}
                />
                <Social ref={this.socialRef} />
            </div>
        );
    }
}

export default Main