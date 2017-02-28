import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, FormControl, FormGroup, ControlLabel, Col, Row, ButtonToolbar } from 'react-bootstrap';

import  * as auctionActions  from 'redux/actions/auctionActions';
import  * as squareActions from 'redux/actions/squareActions';
import  * as playerActions  from 'redux/actions/playerRowActions';

import Deed from '../Deed';

class Auction extends Component {
    constructor(props) {
        super(props);
        this.state = {bid:0};
    }

    componentWillReceiveProps(newProps) {
        this.setPlayers();
    }

    componentDidMount() {
        this.setPlayers();
    }

    setPlayers() {
        if(this.props.auction.playersAuction.length < 1) {
            let players = this.props.playersConfig.players;
            this.props.dispatch(auctionActions.setPlayersAuction(players))
        }
    }

    onHide =()=>{
        this.props.dispatch(auctionActions.hideWindow());
        this.props.dispatch(auctionActions.resetState())
    }

    onClickBid = () => {
        let sq = this.props.squareConfig.squares[this.props.auction.currentPropertyAuction];
        let player=this.props.playersConfig.players[this.props.auction.currentPlayerAuction];

        if(this.state.bid > player.money) {
            this.props.popup("You don't have enough money to bid $" + this.state.bid + ".")
        }
        else if(this.state.bid < 0) {
            this.props.popup("Please enter a bid.");
        }
        else if(this.state.bid <= this.props.auction.highestBid.bid ) {
            this.props.popup("Your bid must be greater than highest bid. ($" + this.props.auction.highestBid.bid + ")");
        }
        else {
            this.bid(sq, player);
        }
    }

    bid(sq, player) {
        this.pass(sq, player);
        //this.props.dispatch(auctionActions.setHighestBid({playerId:this.props.auction.currentPlayerAuction}));

    }

    pass(sq, player) {

        if (this.props.auction.highestBid.playerId === -1) {
            this.props.dispatch(auctionActions.setHighestBid({
                bid: this.props.auction.highestBid.bid,
                playerId: player.id
            }));
        }

        let currentPlayer = -1;
        if(this.props.auction.highestBid.playerId > this.props.auction.playersAuction.length) {
            currentPlayer = this.props.auction.highestBid.playerId - this.props.auction.playersAuction.length;

        } else {
            currentPlayer = player.id++;
        }
        console.log('player',currentPlayer)
        this.props.dispatch(auctionActions.updateCurrentPlayersAuction(currentPlayer));

        if (this.props.auction.highestBid.playerId == currentPlayer) {
            this.finalizeAuction();
        }
    }

    onClickPass = () => {

    }

    onClickExit = () => {
        this.props.dispatch(auctionActions.exitPlayersAuction(this.props.auction.currentPlayerAuction))
    }

    finalizeAuction() {
        console.log('final auction')
    }

    handleBid = (e) => {
        let value = parseInt(e.target.value, 10);
        this.setState({bid:value});
        console.log('bid value')
    }

    showButtons() {
        return <ButtonToolbar>
            <Button
                title="Place your bid."
                onClick={()=>this.onClickBid()}>Bid</Button>
            <Button
                title="Skip bidding this time."
                onClick={()=>this.onClickPass()}>Pass</Button>
            <Button
                title="Stop bidding."
                onClick={()=>this.onClickExit()}>Exit Auction</Button>
        </ButtonToolbar>
    }

    render() {
        console.log('Auction this.props',this.props)
        let sq = this.props.squareConfig.squares[this.props.auction.currentPropertyAuction];
        let player=this.props.playersConfig.players[this.props.auction.currentPlayerAuction];
        let playerBid = this.props.auction.highestBid.playerId > -1 ? `$(Player ${this.props.auction.highestBid.playerId})` : '(N/A)';

        console.log('player',player)
        const modalInstance = (
            <Modal show={this.props.auction.show} onHide={()=>this.onHide()} backdrop="static">
                <Modal.Body>
                    <Row>
                        <Col md={12} >
                            <p className="text-center"><b>Auction</b> <Deed square={sq} linkValue={sq.name}/></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} >
                            <p className="text-center">{`Highest Bid = $ ${this.props.auction.highestBid.bid} ${playerBid}`}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} >
                            <p className="text-center">{`${player.name}, it is your turn to bid.`}</p>
                        </Col>
                    </Row>
                    <FormControl
                        type="text"
                        placeholder="Enter text"
                        value={this.state.bid}
                        onChange={this.handleBid}
                    />
                </Modal.Body>
                <Modal.Footer>
                    {this.showButtons()}
                </Modal.Footer>
            </Modal>
        );

        return <div>
            {modalInstance}
        </div>
    }
}

function mapStateToProps(state) {
    return {
        playersConfig   : state.playersConfig,
        auction 		: state.auction,
        squareConfig    : state.squareConfig,
        game            : state.gameFunctionality
    };
}

//connect component with global state
export default connect(mapStateToProps)(Auction);