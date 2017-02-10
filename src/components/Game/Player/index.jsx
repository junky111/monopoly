import React, { Component, PropTypes } from 'react';


class Player extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>{'Player'+this.props.number}</div>
        );
    }
}

export default Player;