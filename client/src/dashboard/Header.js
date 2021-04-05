import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import HelpIcon from "@material-ui/icons/Help";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const lightColor = "rgba(255, 255, 255, 0.7)";

const styles = (theme) => ({
    secondaryBar: {
        zIndex: 0,
    },
    menuButton: {
        marginLeft: -theme.spacing(1),
    },
    iconButtonAvatar: {
        padding: 4,
    },
    link: {
        textDecoration: "none",
        color: lightColor,
        "&:hover": {
            color: theme.palette.common.white,
        },
    },
    button: {
        borderColor: lightColor,
    },
});

const context = (ctx) => {
    if (ctx === "Committee") {
        return [{id : "addMember", text : 'Add Member Profile'}, {id : "delMember", text : 'Remove Member Profile'}];
    } else if (ctx === "Events") {
        return [{id : "addEvnt", text : 'Add New Event/Post'}, {id : "delEvnt", text : 'Remove Event/Post'}];
    } else if (ctx === "Sponsors") {
        return [{id : "addSponsor", text : 'Add New Sponsor'}, {id : "delSponsor", text : 'Remove Sponsor'}];
    } else if (ctx === "Socials") {
        return [{id : "addSocials", text : 'Add New Socials'}, {id : "delSocials", text : 'Remove Socials'}];
    }
}

class Header extends Component {
    constructor() {
        super();
        this.state = {
            active: 0,
        }
    }

    handleFocus = (index) => {
        this.setState({active: index});
    }

    componentDidUpdate(prevProps, prevState) {
        let currentContext = context(this.props.curContext);
        if (prevProps.curContext != this.props.curContext) {
            this.setState({active: 0});
            this.props.onTabClick(currentContext[0]['id']);
        }
    }

    render() {
        const { classes, onDrawerToggle } = this.props;

        const headerTabs = context(this.props.curContext);
        
        return (
            <React.Fragment>
                <AppBar color="primary" position="sticky" elevation={0}>
                    <Toolbar>
                        <Grid container spacing={1} alignItems="center">
                            <Hidden smUp>
                                <Grid item>
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={onDrawerToggle}
                                        className={classes.menuButton}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </Grid>
                            </Hidden>
                            <Grid item xs />
    
                        </Grid>
                    </Toolbar>
                </AppBar>
                <AppBar
                    component="div"
                    className={classes.secondaryBar}
                    color="primary"
                    position="static"
                    elevation={0}
                >
                    <Toolbar>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item xs>
                                <Typography
                                    color="inherit"
                                    variant="h5"
                                    component="h1"
                                >
                                    {this.props.curContext}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <AppBar
                    component="div"
                    className={classes.secondaryBar}
                    color="primary"
                    position="static"
                    elevation={0}
                >
                    <Tabs value={this.state.active} textColor="inherit">
                        {headerTabs.map(({id, text}, index) => (<Tab textColor="inherit" onClick={() => {this.handleFocus(index); this.props.onTabClick(id)}} label={text} />))}
                    </Tabs>
                </AppBar>
            </React.Fragment>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
