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
		this.state = {
			members: [],
			events: [],
			sponsors: [],
			socials: [],
		}
	}

	fetchMembers() {
		fetch("/api/member", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.status === 200) {
                console.log("Success: ", res);
                return res.json();
            } else {
                console.error("Error:", res);
            }
        }).then((data) => {
            this.setState({members: JSON.parse(data)}, () => console.log(this.state));
        }).catch((error) => {
            console.error("Error:", error);
        });
	}

	fetchEvents() {
		fetch("/api/event", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.status === 200) {
                console.log("Success: ", res);
                return res.json();
            } else {
                console.error("Error:", res);
            }
        }).then((data) => {
            this.setState({events: JSON.parse(data).sort((a,b) => (a['post_date'] > b['post_date']) ? -1 : ((b['post_date'] > a['post_date']) ? 1 : 0))});
        }).catch((error) => {
            console.error("Error:", error);
        });
	}

	fetchSponsors() {
		fetch("/api/sponsor", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.status === 200) {
                console.log("Success: ", res);
                return res.json();
            } else {
                console.error("Error:", res);
            }
        }).then((data) => {
            this.setState({sponsors: JSON.parse(data)});
        }).catch((error) => {
            console.error("Error:", error);
        });
	}

	fetchSocials() {
		fetch("/api/social", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.status === 200) {
                console.log("Success: ", res);
                return res.json();
            } else {
                console.error("Error:", res);
            }
        }).then((data) => {
            this.setState({socials: JSON.parse(data)});
        }).catch((error) => {
            console.error("Error:", error);
        });
	}

	componentDidMount() {
		this.wrapperRef.current.addEventListener("scroll", () => this.animateInView());
		this.fetchMembers();
		this.fetchEvents();
		this.fetchSponsors();
		this.fetchSocials();
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
					data={this.state.members}
                />
                <Events
                    ref={this.eventsRef}
                    nextPageRef={this.sponsorRef}
                    scrollNextPage={this.scrollNextPage}
					navBarRef={this.navBarRef}
					data={this.state.events}
                />
                <Sponsor
                    ref={this.sponsorRef}
                    nextPageRef={this.socialRef}
                    scrollNextPage={this.scrollNextPage}
					navBarRef={this.navBarRef}
					data={this.state.sponsors}
                />
                <Social 
					ref={this.socialRef} 
					data={this.state.socials}
				/>
            </div>
        );
    }
}

export default Main