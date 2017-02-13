import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Button, Modal} from 'react-bootstrap';

class Alert extends Component{
    constructor(props) {
        super(props);

        this.state = {
            data: {}
        }
    }

    componentWillReceiveProps(newProps) {
        console.log('newProps', newProps);
        if(this.props != newProps) {

        }
    }


    render() {
        console.log('alert props', this.props);
        let data = this.props.gameLog || [];
        let lines = data.map((e) => "<div>" + e + "<\div>");

        return <div>
            {lines}
        </div>
    }
}

function mapStateToProps(state) {
    return {gameLog: state.gameLog};
}

//connect component with global state
export default connect(mapStateToProps)(Alert);