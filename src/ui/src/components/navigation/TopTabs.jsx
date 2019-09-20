import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

class TopTabs extends Component {
    state = {  }
    render() { 
        return (  
            <div>
                <AppBar position="static">
                    <Tabs>
                        <Tab label="Store" />
                        <Tab label="Cart" />
                    </Tabs>
                </AppBar>
            </div>
        );
    }
}
 
export default TopTabs;