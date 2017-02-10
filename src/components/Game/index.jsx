import React, { Component, PropTypes } from 'react';
import Player from './Player';

class Game extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let players=[];
        //@todo refactor
        for(let i=0; i<8; i++) players.push(<Player number={i}/>);
        

        return (
            <div>
                {players}
            </div>
        );
    }
}

export default Game;