import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MoneyBar from './MoneyBar';
import Board from './Board';
import  * as gameActions  from 'redux/actions/gameActions';

class Game extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.dispatch(gameActions.setPlayerToSquare(this.props.playersConfig));
    }

    render() {
        return (
            <div>
                <MoneyBar/>
                <Board/>
            </div>
        );
    }
}





function mapStateToProps(state) {
    return {playersConfig: state.playersConfig};
}

//connect component with global state
export default connect(mapStateToProps)(Game);