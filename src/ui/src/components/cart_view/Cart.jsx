import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import cartList from '../resources/sampleCartList';
import Button from '@material-ui/core/Button';

class Cart extends Component {
    state = {  }

    componentDidMount() {
        // fetch /cart
    }

    buy() {
        //fetch /buy
    }

    render() { 
        return (  
            <div>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Products</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">In Stock</TableCell>
                                <TableCell align="right">Remove</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartList['products'].map(product => (
                                <TableRow>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell align="right">{product.quantity}</TableCell>
                                    <TableCell align="right">{product.stock}</TableCell>
                                    <TableCell align="center"><a>X</a></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <br /><br />
                <Button onClick={() => this.buy()} size="big" color="secondary">
                    BUY!
                </Button>
            </div>
        );
    }
}
 
export default Cart;