import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Square extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        console.log(this.props);
        return (<p>{this.props.name}</p>);
    }
}

export default Square;