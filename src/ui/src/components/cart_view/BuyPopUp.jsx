import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import imageDlacyCoin from '../resources/penny_dlacy.png';

class BuyPopUp extends Component {
    state = { 
        open: true
    }

    componentWillReceiveProps() {
        this.setState({
            open: this.props.open
        })
    }

    close() {
        this.setState({
            open: false
        })
    } 
    render() { 
        return (  
            <Dialog
                open={this.state.open}
                onClose={() => this.close()}
            >
                <DialogTitle>Thank you!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        We'll be sending you a link by e-mail to complete payment.
                        We only accept DLacy Coins!!
                        <img src={imageDlacyCoin} className="dlacy-coin" />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.close()} color="primary">
                        Awesome
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
 
export default BuyPopUp;