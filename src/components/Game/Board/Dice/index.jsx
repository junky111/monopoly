import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Popover, OverlayTrigger} from 'react-bootstrap';
// import {require} from 'require';

import Die_1 from 'components/imgs/Die_1.png';
import Die_2 from 'components/imgs/Die_2.png';
import Die_3 from 'components/imgs/Die_3.png';
import Die_4 from 'components/imgs/Die_4.png';
import Die_5 from 'components/imgs/Die_5.png';
import Die_6 from 'components/imgs/Die_6.png';


function importAll(r) {
  return r.keys().map(r);
}

// const images = importAll(require.context('components/imgs', false, /\.(png|jpeg|svg)$/));
// const images=[];
class Dice extends Component {

    constructor(props) {
        super(props);
    }

    showDice() {
        let dice = this.props.diceNumber;
        let img;
        switch(dice) {
            case 1:
                return <img src={Die_1} />;
            case 2:
                return <img src={Die_2} />;
            case 3:
                return <img src={Die_3} />;
            case 4:
                return <img src={Die_4} />;
            case 5:
                return <img src={Die_5} />;
            case 6:
                return <img src={Die_6} />;
        }
    }

    render() {
        return (
            <div title="Dice" className="dice">
                {this.showDice()}
            </div>
        );
    }
}

export default Dice;