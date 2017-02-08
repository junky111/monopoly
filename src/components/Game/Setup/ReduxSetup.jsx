import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux/actions/setupActions';
import {FormControl} from 'react-bootstrap';


class Setup extends Component {

    constructor(props) {
        super(props);
    }

    handleChange=(e)=>{
        this.props.dispatch(actions.setPlayersNumber(e.target.value))
    }
    render() {
        console.log(this.props);
        let options=[];
        for( let i=this.props.minPNumber; i <= this.props.maxPNumber; i++ ) 
            options.push((<option key={i} value={i} selected={i == this.props.playersNumber}>{i}</option>));

        return (
            <div>
                <FormControl componentClass="select" placeholder="" onChange={this.handleChange}>
                    {options}
                </FormControl>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return state.setup;
}

//connect component with global state
export default connect(mapStateToProps)(Setup);