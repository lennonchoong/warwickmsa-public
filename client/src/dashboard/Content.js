import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from "@material-ui/core/styles"

const styles = (theme) => ({
    paper: {
        maxWidth: 936,
        margin: "auto",
        overflow: "hidden",
    },
    searchBar: {
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: "block",
    },
    addUser: {
        marginRight: theme.spacing(1),
    },
    contentWrapper: {
        margin: "40px 16px",
    },
    list: {
        width: "100%",
        maxWidth: null,
    },
    error: {
        backgroundColor: "rgba(224, 108, 117, 0.85)",
    },
    success: {
        backgroundColor: "rgba(152, 195, 121, 0.85)",
    },
});

class Content extends Component {
    constructor() {
        super();
        this.state = {
            name : "",
            position : "",
            title : "",
            desc : "",
            href : "",
            social : "",
            file : "",
            success: 0,
        }
        this.ref = React.createRef();
    }

    handleTextField = (e, key) => {
        this.setState({[key] : e.target.value})
    }

    handleFileInput = (e) => {
        this.setState({"file" : e.target.files[0]});
    }

    handleSubmit = () => {
        if (!this.validateFields()) {
            this.setState({success: -1});
            return;
        }

        if (this.props.curContext === "addMember") {
            this.resetState();
            this.resetFormFields();
            this.queryDB("/api/member");
        } else if (this.props.curContext === "addEvnt") {
            this.resetState();
            this.resetFormFields();
            this.queryDB("/api/event");
        } else if (this.props.curContext === "addSocials") {
            this.resetState();
            this.ref.current.resetSelectValue();
            this.resetFormFields();
            this.queryDB("/api/social");
        } else if (this.props.curContext === "addSponsor") {
            this.resetState();
            this.resetFormFields();
            this.queryDB("/api/sponsor");
        }
    }

    async prepareData() {
        let obj = {}
        for (const key in this.state) {
            if (this.state[`${key}`] !== "" && `${key}` !== "file" && `${key}` !== "success") {
                obj[`${key}`] = this.state[`${key}`];
            }
        }

        let promise = new Promise((resolve, reject) => {
            if (this.state["file"] !== "") {
                const reader = new FileReader();
                reader.readAsDataURL(this.state["file"])
                reader.onload = () => {
                    obj["file"] = reader.result;
                    resolve(obj);
                }
                reader.onerror = () => {
                    reject(new Error("error"));
                }
            } else {
                resolve(obj);
            }
        })

        let result = await promise;
        return result;
    }

    async queryDB(uri) {
        let data = await this.prepareData();
        fetch(uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
            }
        ).then((res) => {
            if (res.status === 200) {
                console.log("Success: ", res);
            } else {
                console.error("Error:", res);
            }
            this.setState({success: 1});
            setTimeout(() => this.setState({success: 0}), 3000);
        }).catch((error) => {
            console.error("Error:", error);
        });
    }

    validateFields = () => {
        if (this.props.curContext === "addMember") {
            return this.state.name != "" && this.state.position != "" && this.state.desc != "" && this.state.file != ""
        } else if (this.props.curContext === "addEvnt") {
            return this.state.title != "" && this.state.desc != "" && this.state.file != ""
        } else if (this.props.curContext === "addSocials") {
            return this.state.href != "" &&  this.state.social != ""
        } else if (this.props.curContext === "addSponsor") {
            return this.state.name != "" &&  this.state.desc != "" && this.state.file != ""
        }
        return false;
    } 

    resetFormFields = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
        Array.from(document.querySelectorAll("select")).forEach(
            input => (input.value = "")
        );
        Array.from(document.querySelectorAll("textarea")).forEach(
            input => (input.value = "")
        );
    }

    resetState = () => {
        this.setState({
            name : "",
            position : "",
            title : "",
            desc : "",
            href : "",
            social : "",
            file : "",
            success: 0,
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.curContext !== prevProps.curContext) {
            this.resetState();
        }
    }

    render() {
        const { classes } = this.props;
        const ctx = this.props.curContext;
        let block;
        let buttonText;

        if (ctx === "addMember") {
            block = <AddMember handleTextField={this.handleTextField} handleFileInput={this.handleFileInput}/>
            buttonText = "Add Member";
        } else if (ctx === "addEvnt") {
            block = <AddEvent handleTextField={this.handleTextField} handleFileInput={this.handleFileInput}/>
            buttonText = "Add Event/Post"
        } else if (ctx === "addSocials") {
            block = <AddSocials handleTextField={this.handleTextField} ref={this.ref} classes={classes}/>
            buttonText = "Add Socials"
        } else if (ctx === "addSponsor") {
            block = <AddSponsor handleTextField={this.handleTextField} handleFileInput={this.handleFileInput}/>
            buttonText = "Add Sponsor"
        } else {
            block = <RemoveBlock context={ctx}/>;
        }

        return (
            <Paper className={classes.paper}>
                { 
                    this.props.curContext.substring(0, 3) === "add" ? 
                    <AppBar
                        className={classes.searchBar}
                        position="static"
                        color="default"
                        elevation={0}
                    >
                        <Toolbar>
                            <Grid container spacing={2} alignItems="center" justify='flex-end'>
                                <Grid>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.addUser}
                                        onClick={this.handleSubmit}
                                    >
                                        {buttonText}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar> : null
                }
                <div className={classes.contentWrapper}>
                    {block}
                </div>
                <Fade 
                    in={this.state.success === 1 || this.state.success === -1 ? true : false}
                    timeout={
                        {
                            appear : 1000,
                            enter: 1000,
                            exit : (this.state.success === 0 ? 0 : 1400),
                        }
                    }
                >
                    <Grid
                        justify="center"
                        container
                    >
                        <Card 
                            className={this.state.success === 1 ? classes.success : classes.error}
                            raised
                        >
                            {this.state.success === 1 ? "Successful Upload" : "Error Empty Fields/Picture"}
                        </Card>
                    </Grid>
                </Fade>
            </Paper>
        );
    }
}

class RemoveBlock extends Component {
    constructor() {
        super();
        this.state = {
            data : [],
        }
    }

    componentDidMount() {
        this.updateIdentifiers();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.context !== prevProps.context) {
            this.updateIdentifiers();
        }
    }

    updateIdentifiers() {
        const ctx = this.props.context;
        let identifierKey;
        let uri;
        if (ctx === "delMember") {
            identifierKey = "name";
            uri = "/api/member";
        } else if (ctx === "delSponsor") {
            identifierKey = "name";
            uri = "/api/sponsor";
        } else if (ctx === "delEvnt") {
            identifierKey = "title";
            uri = "/api/event";
        } else {
            identifierKey = "href";
            uri = "/api/social";
        }
        this.setState({identifier: identifierKey, uri : uri}, () => this.getData())
    }

    async getData() {
        const uri = this.state.uri;
        fetch(uri, {
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
            this.setState({data: JSON.parse(data)});
        }).catch((error) => {
            console.error("Error:", error);
        });
    }

    deleteSelection(id, imgref = null) {
        const uri = this.state.uri;
        const jsonBody = {id: id};
        if (imgref) {
            jsonBody["imgref"] = imgref;
        }
        fetch(uri, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonBody),
        }).then((res) => {
            if (res.status === 200) {
                console.log("Success: ", res);
            } else {
                console.error("Error:", res);
            }
            this.getData();
        }).catch((error) => {
            console.error("Error:", error);
        });
    }

    render() {
        let body;
        if (this.state.data.length === 0) {
            body = (
                <Typography variant="h6" color="textSecondary">
                    Currently Empty
                </Typography>
            )
        } else {
            body = (
                <List>
                    {this.state.data.map(obj => (
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={obj[`${this.state.identifier}`]}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon 
                                        onClick={() => this.deleteSelection(obj.id, obj.picture)}
                                    />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            )
        }

        return (
            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
                xs={12}
            >
                {body}
            </Grid>
        )
    }
}


class AddMember extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Grid
                container
                direction="column"
                spacing={5}
                alignItems="center"
            >
                <Grid
                    container
                    item
                    direction="row"
                    spacing={10}
                    justify="center"
                >
                    <Grid item xs={5}>
                        <TextField
                            required
                            fullWidth
                            id="standard-required"
                            label="Name"
                            defaultValue=""
                            onChange={(e) => this.props.handleTextField(e, "name")}
                        />
                    </Grid>
                    <Grid 
                        item
                        xs={5}
                    >
                        <TextField
                            required
                            fullWidth
                            id="standard-required"
                            label="Position"
                            defaultValue=""
                            onChange={(e) => this.props.handleTextField(e, "position")}
                        />
                    </Grid>
                </Grid>
                
                <Grid container item xs={10}>
                    <TextField
                        fullWidth
                        required
                        multiline
                        rowsMax={30}
                        id="standard-required"
                        label="Description"
                        defaultValue=""
                        onChange={(e) => this.props.handleTextField(e, "desc")}
                    />
                </Grid>

                <Grid container item justify="center">
                    <Button
                        color="primary"
                        variant="contained"
                        component="label"
                        >
                        Upload Picture
                        <input
                            type="file"
                            hidden
                            onChange={(e) => this.props.handleFileInput(e)}
                        />
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

class AddEvent extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Grid
                container
                direction="column"
                spacing={5}
                alignItems="center"
            >
                <Grid
                    container
                    item
                    direction="row"
                    spacing={10}
                    justify="center"
                >
                    <Grid item xs={7}>
                        <TextField
                            required
                            fullWidth
                            id="standard-required"
                            label="Title"
                            defaultValue=""
                            onChange={(e) => this.props.handleTextField(e, "title")}
                        />
                    </Grid>
                </Grid>
                
                <Grid container item xs={10}>
                    <TextField
                        fullWidth
                        required
                        multiline
                        rowsMax={30}
                        id="standard-required"
                        label="Description"
                        defaultValue=""
                        onChange={(e) => this.props.handleTextField(e, "desc")}
                    />
                </Grid>

                <Grid container item justify="center">
                    <Button
                        color="primary"
                        variant="contained"
                        component="label"
                        >
                        Upload Picture
                        <input
                            type="file"
                            hidden
                            onChange={(e) => this.props.handleFileInput(e)}
                        />
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

class AddSponsor extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Grid
                container
                direction="column"
                spacing={5}
                alignItems="center"
            >
                <Grid
                    container
                    item
                    direction="row"
                    spacing={10}
                    justify="center"
                >
                    <Grid item xs={7}>
                        <TextField
                            required
                            fullWidth
                            id="standard-required"
                            label="Name"
                            defaultValue=""
                            onChange={(e) => this.props.handleTextField(e, "name")}
                        />
                    </Grid>
                </Grid>
                
                <Grid container item xs={10}>
                    <TextField
                        fullWidth
                        required
                        multiline
                        rowsMax={30}
                        id="standard-required"
                        label="Description"
                        defaultValue=""
                        onChange={(e) => this.props.handleTextField(e, "desc")}
                    />
                </Grid>

                <Grid container item justify="center">
                    <Button
                        color="primary"
                        variant="contained"
                        component="label"
                        >
                        Upload Picture
                        <input
                            type="file"
                            hidden
                            onChange={(e) => this.props.handleFileInput(e)}
                        />
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

class AddSocials extends Component {
    constructor() {
        super();
        this.state = {
            platform: "",
        }
    }

    handleSelectChange = (e) => {
        this.setState({platform : e.target.value});
    }

    resetSelectValue = () => {
        this.setState({platform : ""})
    }

    render() {
        const formControl = ({
            margin: 20,
            minWidth: 200,
        });

        const list = ({
            width: '100%',
            maxWidth: null,
        })

        return (
            <Grid
                container
                direction="row"
                spacing={5}
                alignItems="center"
                justify="space-around"
            >
                <Grid container item xs={5}>
                    <TextField
                        required
                        fullWidth
                        id="standard-required"
                        label="Hyperlink"
                        defaultValue=""
                        onChange={(e) => this.props.handleTextField(e, "href")}
                    />
                </Grid>
                <Grid container item xs={5} >
                    <FormControl className={formControl}>
                        <InputLabel required id="demo-simple-select-label">Platform</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.platform}
                            className={list}
                            onChange={(e) => {this.handleSelectChange(e); this.props.handleTextField(e, "social")}}
                        >
                            <MenuItem value={"instagram"}>Instagram</MenuItem>
                            <MenuItem value={"whatsapp"}>WhatsApp</MenuItem>
                            <MenuItem value={"facebook"}>Facebook</MenuItem>
                            <MenuItem value={"twitter"}>Twitter</MenuItem>
                            <MenuItem value={"discord"}>Discord</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        )
    }
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);