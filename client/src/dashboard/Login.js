import React, {useState, useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import { Typography, withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

let theme = createMuiTheme({
    typography: {
        fontSize: 28,
    },
});

const styles = {
    root: {
        backgroundColor: '#212121',
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    paper: {
        height: "60%",
        width: "75%",
        maxHeight: 580,
        maxWidth: 640,
        backgroundColor: "#333333",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: "60%",
        maxWidth: 250,
        borderRadius: 5,
        "& .MuiFormLabel-root": {
            color: 'rgba(248, 248, 248, 0.54)'
        }, 
        "& .MuiInputBase-input": {
            color: 'rgba(248, 248, 248, 0.54)'
        }
    },
    multilineColor: {
        borderColor: 'rgba(248, 248, 248, 0.54)',
    },
    color: {
        color: "#F8F8F8",
    },
    fontColor: {
        color: 'rgba(248, 248, 248, 0.54)'
    }
}


function Login(props) {
    const {classes} = props; 

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function loginUser() {
        if (username === "" || password === "") return;
        fetch('/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: username, password: password})
        }).then((res) => {
            if (res.status === 200) {
                console.log("Success: ", res);
                return res.json();
            } else {
                console.error("Error:", res);
            }
        }).then((data) => {
            props.authLogin(JSON.parse(data).auth);
        }).catch((error) => {
            console.error("Error:", error);
        });
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <Paper 
                    className={classes.paper}
                    elevation={3}
                >
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        spacing={5}
                    >
                        <Grid container item spacing={1} justify="center">
                            <Typography className={classes.fontColor} variant="h4">Login To Dashboard</Typography>
                        </Grid>
                        <Grid container item spacing={1} justify="center">
                            <TextField
                                required
                                id="outlined-username-input"
                                label="Username"
                                type="text"
                                variant="outlined"
                                className={classes.input}
                                InputLabelProps={{className: classes.multilineColor}}
                                onChange={(e) => setUsername(e.target.value)}
                                InputProps={{classes: {notchedOutline: classes.multilineColor}, className: classes.color}}
                            />
                        </Grid>
                        <Grid container item spacing={1} justify="center">
                            <TextField
                                required
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                className={classes.input}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{classes: {notchedOutline: classes.multilineColor}}}
                            />
                        </Grid>
                        <Grid container item spacing={1} justify="center">
                            <Button variant="contained" onClick={() => loginUser()}>Login</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </ThemeProvider>

    )
}

export default withStyles(styles)(Login);