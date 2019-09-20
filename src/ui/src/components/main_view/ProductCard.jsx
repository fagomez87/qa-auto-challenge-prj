import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class ProductCard extends Component {
    state = {  }
    render() { 
        return ( 
            <Card className="product-card">
                <CardActionArea>
                    <CardMedia
                        className="product-media"
                        image=""
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
                    <Button size="small" color="primary">
                        Buy!
                    </Button>
                </CardActions>
            </Card>
        );
    }
}
 
export default ProductCard;