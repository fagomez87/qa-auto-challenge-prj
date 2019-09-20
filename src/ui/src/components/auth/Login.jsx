import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Cookies from 'js-cookie';
import Register from './Register';

class Login extends Component {
    state = {  
        register: false
    }

    login() {
        Cookies.set('DLacy', "ok")
        window.location.reload()
    }

    initiateRegister() {
        this.setState({
            register: true
        })
    }

    render() { 
        return (  
            <Card className="login-card">
            {this.state.register &&
                <Register open={true} />
            }
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            Please Login
                        </Typography>
                        <TextField
                            label="Username"
                            fullWidth="true"
                        />
                        <TextField
                            label="Password"
                            fullWidth="true"
                            type="password"
                        />
                    </CardContent>
                </CardActionArea>
                    <Button onClick={() => this.login()} size="small" color="primary">
                        Log In
                    </Button>
                    <Button onClick={() => this.initiateRegister()} size="small" color="primary">
                        Register
                    </Button>
            </Card>
        );
    }
}
 
export default Login;