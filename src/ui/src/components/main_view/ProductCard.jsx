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
import imagePen from '../resources/pen.jpg';
import imageStickers from '../resources/stickers.jpg'
import imageWaterBottle from '../resources/waterbottle.jpg'


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

    imageValidation(product) {
        if(product === "ASAPP Pens") {
            return imagePen;
        } else if(product === "ASAPP Stickers") {
            return imageStickers;
        } else if(product === "ASAPP Water Bottle") {
            return imageWaterBottle;
        }
    }

    render() {
        return ( 
            <Card className="product-card" data-test-name="product-card">
                {this.state.alert &&
                    <AddToCartAlert open={true} />
                }
                <CardActionArea>
                    <CardMedia
                        className="product-media"
                        component="img"
                        // className={this.useStyles.media}
                        src={this.imageValidation(this.props.productName)}
                        title="product"
                    />
                    <CardContent className="product-card-content">
                        <Typography gutterBottom variant="h4" component="h2" data-test-name="product-title">
                            {this.props.productName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" data-test-name="product-desc">
                            {this.props.productDescription}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button onClick={() => this.buy()} size="small" color="primary" data-test-name="add-to-cart-button">
                        Add to Cart
                    </Button>
                    {this.props.productStock > 0 &&
                        <Button data-test-name="stock-button" size="small" color="primary">
                            In Stock!
                        </Button>
                    }
                    {this.props.productStock <= 0 &&
                        <Button size="small" color="secondary" data-test-name="out-of-stock-label">
                            Out of Stock!
                        </Button>
                    }
                </CardActions>
            </Card>
        );
    }
}
 
export default ProductCard;