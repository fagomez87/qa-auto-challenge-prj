import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddToCartAlert from './AddToCartAlert';


class ProductCard extends Component {
    useStyles = makeStyles({
        card: {
          maxWidth: 345,
        },
        media: {
          height: 140,
        },
      });
    
    state = {  
        alert: false
    }

    buy() {
        this.setState({
            alert: true
        })
    }

    render() { 
        return ( 
            <Card className="product-card">
                {this.state.alert &&
                    <AddToCartAlert open={true} />
                }
                <CardActionArea>
                    <CardMedia
                        component="img"
                        // className={this.useStyles.media}
                        image="../resources/pen.jpg"
                        title="product"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="h2">
                            {this.props.productName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.props.productDescription}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button onClick={() => this.buy()} size="small" color="primary">
                        Buy!
                    </Button>
                    {this.props.productStock > 0 &&
                        <Button size="small" color="primary">
                            In Stock!
                        </Button>
                    }
                    {this.props.productStock <= 0 &&
                        <Button size="small" color="secondary">
                            Out of Stock!
                        </Button>
                    }
                </CardActions>
            </Card>
        );
    }
}
 
export default ProductCard;