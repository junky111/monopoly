import React, { Component, PropTypes } from 'react';
// import { colors } from './config';

class Player extends Component {

    constructor(props) {
        super(props);
    }

    render() {

    	// console.log(colors);
        return (
            <div>{'Player'+this.props.number}</div>
        );
    }
}

export default Player;