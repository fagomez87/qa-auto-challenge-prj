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

class Login extends Component {
    state = {  }


    login() {
        Cookies.set('DLacy', "ok")
        window.location.reload()
    }

    render() { 
        return (  
            <Card className="login-card">
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            Please provide a Contact for this transaction
                        </Typography>
                        <TextField
                            label="Mail"
                            placeholder="mail@dlacy.com"
                            fullWidth="true"
                        />
                    </CardContent>
                </CardActionArea>
                {/* <CardActions> */}
                    <Button onClick={() => this.login()} size="small" color="primary">
                        Log In
                    </Button>
                {/* </CardActions> */}
            </Card>
        );
    }
}
 
export default Login;