import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import cartList from '../resources/sampleCartList';
import Button from '@material-ui/core/Button';
import BuyPopUp from './BuyPopUp';

class Cart extends Component {
    state = {  
        dialog: false
    }

    componentDidMount() {
        // fetch /cart
    }

    buy() {
        //fetch /buy
        this.setState({
            dialog: true
        })
    }

    remove() {
        //fetch /remove_items
    }

    render() { 
        return (  
            <div>
                {this.state.dialog &&
                    <BuyPopUp open={true} />
                }
                <Paper className="cart-table">
                    <Table className="cart-table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Products</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">In Stock</TableCell>
                                <TableCell align="center">Remove</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartList['products'].map(product => (
                                <TableRow className="cart-table-row">
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell align="center">{product.quantity}</TableCell>
                                    <TableCell align="center">{product.stock}</TableCell>
                                    <TableCell align="center"><Button onClick={() => this.remove()} size="big" color="secondary" variant="contained">x</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <br /><br />
                <div className="buy-button">
                    <Button onClick={() => this.buy()} size="big" color="secondary" variant="contained">
                        BUY!
                    </Button>
                </div>
            </div>
        );
    }
}
 
export default Cart;