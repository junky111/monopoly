import React, { Component, PropTypes } from 'react';
import  * as tradeActions  from 'redux/actions/tradeActions';
import { connect } from 'react-redux';
import { Button, Modal, FormControl, FormGroup, ControlLabel, Col, Row, ButtonToolbar } from 'react-bootstrap';
import BootstrapTable from 'reactjs-bootstrap-table';

import Deed from '../Deed';

class TradeModal extends Component{
    constructor(props) {
        super(props);
        this.state={selection: {}, selection2: {}};
    }

    onChange = (newSelection, second) => {
    	if(second) {
            this.setState({selection2: newSelection});
            this.props.dispatch(tradeActions.setSelectionModeTwo(newSelection));
		} else {
            this.setState({selection: newSelection});
            this.props.dispatch(tradeActions.setSelectionModeOne(newSelection));
		}
    }

    handlePlayerChange = (e)=>{
    	this.props.dispatch(tradeActions.setSecondPlayer(e.target.value));
    }

    handleBidOneChange =(e)=>{
    	let value = parseInt(e.target.value, 10);
    	if(!isNaN(value)) {
    		console.log('value',value)
			this.props.dispatch(tradeActions.setBidOne({amount: value}))
        } else {
            this.props.dispatch(tradeActions.setBidOne({amount: 0}))
		}
    }

    handleBidTwoChange =(e)=>{
        let value = parseInt(e.target.value, 10);
        if(!isNaN(value)) {
            console.log('value',value)
            this.props.dispatch(tradeActions.setBidTwo({amount: value}))
        } else {
            this.props.dispatch(tradeActions.setBidTwo({amount: 0}))
        }
    }

    onHide =()=>{
		this.props.dispatch(tradeActions.hideWindow());
		this.props.dispatch(tradeActions.resetState())
    }

    onClickProposeTrade = () => {
    	//@todo add validation
    	console.log('this.props', this.props)
		if(this.props.trade.selectionOne > 0) {

		} else if(this.props.trade.selectionTwo > 0) {

		}
	}

    onClickAcceptTrade = () => {
        //@todo add validation
    	console.log('this.props', this.props)
	}

    //get square data for player by id
    getData(playerId){
        let square=this.props.squareConfig.squares;
        let squareOwner = [];

        square.map((sq,i) => {
            if(sq.owner == playerId) {
                squareOwner.push({id:i, ...sq});
            }
        });

        return squareOwner;
    }

    //render function
    myRenderer(row) {
        return <div style={{display:"flex"}}>
			<span><div style={{backgroundColor:row.color, height:"15px", width:"15px"}}></div></span>
			<span style={{width:"100px", textAlign:"center"}}><Deed square={row} linkValue={row.name}/></span>
		</div>
    }

    showButtons() {
    	if(this.props.trade.proposeMode)
    		return <ButtonToolbar>
				<Button
				title="Exchange the money and properties that are checked above."
				onClick={()=>this.onClickProposeTrade()}>Propose Trade</Button>
                <Button onClick={()=>this.onHide()}>Cancel Trade</Button>
			</ButtonToolbar>
		else if(this.props.trade.acceptMode)
            return  <ButtonToolbar>
				<Button onClick={()=>this.onClickAcceptTrade()}>Accept Trade</Button>
				<Button onClick={()=>this.onHide()}>Reject Trade</Button>
			</ButtonToolbar>
	}

    render() {
    	let currentPlayer = this.props.playersConfig.players[this.props.game.currentPlayer];
    	let playersSelect = [];

    	for( let i in this.props.playersConfig.players ) {
    		if(i!=this.props.game.currentPlayer) {
                playersSelect.push(
					<option
						key={i}
						value={i}
						/*selected={this.props.players.length && player_types[i].type == this.props.players[this.props.index].type}*/
					>
                        {this.props.playersConfig.players[i].name}
					</option>
                )
            }
    	}

		const modalInstance = (
			<Modal show={this.props.trade.show} onHide={()=>this.onHide()}>
			    <Modal.Body>
			        <Row>
						<Col md={6}>{currentPlayer.name}</Col>
						<Col md={6}>
							{this.props.trade.proposeMode && <FormControl componentClass="select" value={this.props.trade.secondPlayer} onChange={this.handlePlayerChange}>
		                        {playersSelect}
		                    </FormControl>}
		                </Col>
		            </Row>
		            <Row className="row">
						<Col md={6}>

		              	</Col>
		            </Row>
					{this.showTradeForm(currentPlayer)}
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

    showTradeForm(currentPlayer) {
        let columns = [
            {name:"color", display: "Color", renderer: this.myRenderer},
        ];
        let CurrentPlayerData = this.getData(this.props.game.currentPlayer);
        let PlayerData = this.props.trade.secondPlayer >= 0 ? this.getData(this.props.trade.secondPlayer) : [];

    	if(this.props.trade.proposeMode) {
    		return <Row className="row">
				<Col md={6}>
					$ {currentPlayer.name}
					<FormControl
						type="text"
						placeholder="Enter text"
						value={this.props.trade.bidOne}
						onChange={this.handleBidOneChange}
					/>
					<BootstrapTable
						id="trade1"
						key="trade1"
						style={{width:"250px"}}
						columns={columns}
						data={CurrentPlayerData}
						onChange={(row)=>this.onChange(row)}
						headers={false}
						select="multiple"
						selected={this.state.selection}>
						<div className="alert-danger" style={{width:"250px"}}>{currentPlayer.name} you don't have any properties.</div>
					</BootstrapTable>
				</Col>
				<Col md={6}>
					$ Player {this.props.trade.secondPlayer}
					<FormControl
						type="text"
						placeholder="Enter text"
						value={this.props.trade.bidTwo}
						onChange={this.handleBidTwoChange}
					/>
					<BootstrapTable
						id="trade2"
						key="trade2"
						style={{width:"250px"}}
						columns={columns}
						data={PlayerData}
						onChange={(row)=>this.onChange(row, true)}
						headers={false}
						select="multiple"
						selected={this.state.selection2}>
						<div className="alert-danger" style={{width:"250px"}}>Player {this.props.trade.secondPlayer} you don't have any properties.</div>
					</BootstrapTable>
				</Col>
			</Row>
		} else if(this.props.trade.acceptMode) {
            return <Row className="row">
				<Col md={6}>
					$ Player {this.props.trade.secondPlayer}
					<FormControl
						type="text"
						placeholder="Enter text"
						value={this.props.trade.bidTwo}
						onChange={this.handleBidTwoChange}
					/>
					<BootstrapTable
						id="trade2"
						key="trade2"
						style={{width: "250px"}}
						columns={columns}
						data={PlayerData}
						onChange={(row) => this.onChange(row, true)}
						headers={false}
						select="multiple"
						selected={this.state.selection2}>
						<div className="alert-danger" style={{width: "250px"}}>Player {this.props.trade.secondPlayer}
							you don't have any properties.
						</div>
					</BootstrapTable>
				</Col>
				<Col md={6}>
					$ {currentPlayer.name}
					<FormControl
						type="text"
						placeholder="Enter text"
						value={this.props.trade.bidOne}
						onChange={this.handleBidOneChange}
					/>
					<BootstrapTable
						id="trade1"
						key="trade1"
						style={{width: "250px"}}
						columns={columns}
						data={CurrentPlayerData}
						onChange={(row) => this.onChange(row)}
						headers={false}
						select="multiple"
						selected={this.state.selection}>
						<div className="alert-danger" style={{width: "250px"}}>{currentPlayer.name} you don't have any
							properties.
						</div>
					</BootstrapTable>
				</Col>
			</Row>
        }
	}
}





function mapStateToProps(state) {
    return { 
    	        playersConfig   : state.playersConfig,
    			trade 			: state.trade,
                squareConfig    : state.squareConfig,
                game            : state.gameFunctionality
    };
}

//connect component with global state
export default connect(mapStateToProps)(TradeModal);