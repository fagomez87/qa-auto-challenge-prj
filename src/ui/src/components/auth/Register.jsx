import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

class Register extends Component {
    state = { 
        open: true
    }

    componentWillReceiveProps() {
        this.setState({
            open: this.props.open
        })
    }

    register() {
        this.setState({
            open: false
        })
    } 

    render() { 
        return (
            <React.Fragment>
                <Dialog
                    open={this.state.open}
                    onClose={() => this.close()}
                >
                    <DialogTitle>Thank you!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please insert Username and Password
                        </DialogContentText>
                        <TextField
                            label="Username"
                            fullWidth="true"
                        />
                        <TextField
                            label="Password"
                            fullWidth="true"
                            type="password"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.register()} color="primary">
                            Register
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}
 
export default Register;