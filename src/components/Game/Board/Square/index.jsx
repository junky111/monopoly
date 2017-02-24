import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Popover, OverlayTrigger} from 'react-bootstrap';
import  * as playerActions  from 'redux/actions/playerRowActions';

class PlayerSquare extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                className="cell-position"
                key={this.props.index}
                style={{backgroundColor:this.props.playersConfig.players[this.props.player.player].color.name.toLowerCase()}}>
                {/*this.props.player.player*/}
            </div>
        )
    }
}

class Square extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        //@todo change UI...
        const cardData = (
              <Popover title="" id={"square-"+this.props.index}>
                    <div className="row" style={{backgroundColor:this.props.color, height: "10px"}}></div>
                    <div className="row"><strong>{this.props.name}</strong></div>
                    <div className="row"><span>{`$ ${this.props.price}`||''}</span></div>
              </Popover>
        );
        let players="";
        if(this.props.playerToSquare.length)
            players=this.props.playerToSquare.map((item,index) => {
                return (
                    <PlayerSquare index={index}  player={item} playersConfig={this.props.playersConfig}/>
                )
            });

        return (
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={cardData}>
                    <td key={this.props.key} className={this.props.class}>
                        <div>
                            {players}
                            <p>{this.props.name}</p>
                        </div>
                    </td>
                </OverlayTrigger>
        );
    }
}

function mapStateToProps(state) {
    return {
        playersConfig: state.playersConfig
    };
}

export default connect(mapStateToProps)(Square);