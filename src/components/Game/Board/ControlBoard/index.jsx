import React, { Component, PropTypes } from 'react';
import {Button} from 'react-bootstrap';
import  * as gameActions  from 'redux/actions/gameActions';
import { connect } from 'react-redux';
import Dice from '../Dice';
import {Player} from 'components/Game/Player';



class ControlBoard extends Component {

    constructor(props) {
        super(props);
    }

    rollDice=()=>{
        this.props.dispatch(gameActions.rollDice());
    }


    render() {

        return (
            <div>   
                <Dice diceNumber={this.props.game.dice.first}/>
                <Dice diceNumber={this.props.game.dice.second}/>
                <table>
                    <tbody>  
                        <Player 
                            index={this.props.game.currentPlayer} 
                            player={this.props.playersConfig.players[this.props.game.currentPlayer]}
                        />
                    </tbody>
                </table>
                <Button type="button" className="btn btn-info" onClick={this.rollDice}>Roll dice</Button>
            </div>
        );
    }
}





function mapStateToProps(state) {
    return {playersConfig: state.playersConfig, squareConfig: state.squareConfig, game: state.gameFunctionality};
}

//connect component with global state
export default connect(mapStateToProps)(ControlBoard);