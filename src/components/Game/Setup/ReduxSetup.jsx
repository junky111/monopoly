import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as setupActions from 'redux/actions/setupActions';
import * as playersActions from 'redux/actions/playerRowActions';
import {FormControl} from 'react-bootstrap';
import PlayerRow from './PlayerRow';

class Setup extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.dispatch(playersActions.changePlayersCount(this.props.setup.playersNumber));
    }

    // componentWillReceiveProps(nextProps){
    //     if(this.props.setup.playersNumber!=nextProps.setup.playersNumber)
    //         this.props.dispatch(playersActions.changePlayersCount(nextProps.setup.playersNumber))
    // }

    handleChange=(e)=>{
        this.props.dispatch(setupActions.setPlayersNumber(Number(e.target.value)));
        this.props.dispatch(playersActions.changePlayersCount(Number(e.target.value)));
    }
    render() {
        let options=[];
        for( let i=this.props.setup.minPNumber; i <= this.props.setup.maxPNumber; i++ ) 
            options.push((<option key={i} value={i} selected={i == this.props.setup.playersNumber}>{i}</option>));

        let players=[];
        if(this.props.playersConfig.players.length>0)
            for(let i = 0; i < this.props.setup.playersNumber; i++)
                players.push((<PlayerRow key={i} index={i}/>));

        return (
            <div>
                <FormControl componentClass="select" placeholder="" onChange={this.handleChange}>
                    {options}
                </FormControl>
                {players}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {setup: state.setup, playersConfig: state.playersConfig};
}

//connect component with global state
export default connect(mapStateToProps)(Setup);