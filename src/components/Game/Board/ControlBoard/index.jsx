import React, { Component, PropTypes } from 'react';
import {Button} from 'react-bootstrap';
import  * as playerActions  from 'redux/actions/playerRowActions';
import  * as gameActions  from 'redux/actions/gameActions';
import  * as popupActions  from 'redux/actions/popupActions';
import  * as squareActions from 'redux/actions/squareActions';
import { connect } from 'react-redux';
import Dice from '../Dice';
import {Player} from 'components/Game/Player';
import Popup from '../Popup';
import Alert from '../Alert';


class ControlBoard extends Component {

    constructor(props) {
        super(props);

        this.state={
            doublecount:        0,
            option:             false, 
            buy:                false,
            manage:             false,
            showResignbutton:   false, 
        }
    }

    rollDiceAction(){
        let first  = Math.floor(Math.random() * 6) + 1;
        let second = Math.floor(Math.random() * 6) + 1;

        return { first, second };
    }


    addAlert = (message) => this.props.dispatch(gameActions.addAlert(message));

    updateMoney  = () => {
        let p = this.props.playersConfig.players[this.props.game.currentPlayer];
        if(p.money < 0 ) {   
            this.setState({showResignbutton: true});
            let nextButton={show:false};
            this.props.dispatch(gameActions.setNextButton(nextButton)); 
        } else {                
            this.setState({showResignbutton: false});
            let nextButton={show:true};
            this.props.dispatch(gameActions.setNextButton(nextButton));  
        }

        if(this.props.game.landed.text == "") this.props.dispatch(gameActions.setLanded({show:false}));
    }

    updatePosition = () => {
        this.props.dispatch(gameActions.updatePlayerToSquare({
            player: this.props.game.currentPlayer,
            square: this.props.playersConfig.players[this.props.game.currentPlayer].position
        }));
    }

    updateCurrentPlayer = () => {
        //get current player
        let currentPlayer = 1;
        //get number of players
        this.props.dispatch(
            squareActions.updateSquare(
                this.props.playersConfig.players[this.props.game.currentPlayer].position, 
                {owner:this.props.game.currentPlayer}
            )
        );

        //
        this.props.dispatch(gameActions.)
    }


    updateOwned = () => {
        let p = this.props.playersConfig.players[this.props.game.currentPlayer];
        console.log(this.props);
        // var checkedproperty = getCheckedProperty();
        // $("#option").show();
        // $("#owned").show();

        // var HTML = "",
        // firstproperty = -1;

        // var mortgagetext = "",
        // housetext = "";
        // var sq;

        // for (var i = 0; i < 40; i++){
        //     sq = square[i];
        //     if (sq.groupNumber && sq.owner === 0) {
        //         $("#cell" + i + "owner").hide();
        //     } else if (sq.groupNumber && sq.owner > 0) {
        //         var currentCellOwner = document.getElementById("cell" + i + "owner");

        //         currentCellOwner.style.display = "block";
        //         currentCellOwner.style.backgroundColor = player[sq.owner].color;
        //         currentCellOwner.title = player[sq.owner].name;
        //     }
        // }

        // for (var i = 0; i < 40; i++) {
        //     sq = square[i];
        //     if (sq.owner == turn) {

        //         mortgagetext = "";
        //         if (sq.mortgage) {
        //             mortgagetext = "title='Mortgaged' style='color: grey;'";
        //         }

        //         housetext = "";
        //         if (sq.house >= 1 && sq.house <= 4) {
        //             for (var x = 1; x <= sq.house; x++) {
        //                 housetext += "<img src='images/house.png' alt='' title='House' class='house' />";
        //             }
        //         } else if (sq.hotel) {
        //             housetext += "<img src='images/hotel.png' alt='' title='Hotel' class='hotel' />";
        //         }

        //         if (HTML === "") {
        //             HTML += "<table>";
        //             firstproperty = i;
        //         }

        //         HTML += "<tr class='property-cell-row'><td class='propertycellcheckbox'><input type='checkbox' id='propertycheckbox" + i + "' /></td><td class='propertycellcolor' style='background: " + sq.color + ";";

        //         if (sq.groupNumber == 1 || sq.groupNumber == 2) {
        //             HTML += " border: 1px solid grey; width: 18px;";
        //         }

        //         HTML += "' onmouseover='showdeed(" + i + ");' onmouseout='hidedeed();'></td><td class='propertycellname' " + mortgagetext + ">" + sq.name + housetext + "</td></tr>";
        //     }
        // }

        // if (p.communityChestJailCard) {
        //     if (HTML === "") {
        //         firstproperty = 40;
        //         HTML += "<table>";
        //     }
        //     HTML += "<tr class='property-cell-row'><td class='propertycellcheckbox'><input type='checkbox' id='propertycheckbox40' /></td><td class='propertycellcolor' style='background: white;'></td><td class='propertycellname'>Get Out of Jail Free Card</td></tr>";

        // }
        // if (p.chanceJailCard) {
        //     if (HTML === "") {
        //         firstproperty = 41;
        //         HTML += "<table>";
        //     }
        //     HTML += "<tr class='property-cell-row'><td class='propertycellcheckbox'><input type='checkbox' id='propertycheckbox41' /></td><td class='propertycellcolor' style='background: white;'></td><td class='propertycellname'>Get Out of Jail Free Card</td></tr>";
        // }

        // if (HTML === "") {
        //     HTML = p.name + ", you don't have any properties.";
        //     $("#option").hide();
        // } else {
        //     HTML += "</table>";
        // }

        // document.getElementById("owned").innerHTML = HTML;

        // // Select previously selected property.
        // if (checkedproperty > -1 && document.getElementById("propertycheckbox" + checkedproperty)) {
        //     document.getElementById("propertycheckbox" + checkedproperty).checked = true;
        // } else if (firstproperty > -1) {
        //     document.getElementById("propertycheckbox" + firstproperty).checked = true;
        // }
        // $(".property-cell-row").click(function() {
        //     var row = this;

        //     // Toggle check the current checkbox.
        //     $(this).find(".propertycellcheckbox > input").prop("checked", function(index, val) {
        //         return !val;
        //     });

        //     // Set all other checkboxes to false.
        //     $(".propertycellcheckbox > input").prop("checked", function(index, val) {
        //         if (!$.contains(row, this)) {
        //             return false;
        //         }
        //     });

        //     updateOption();
        // });
        // updateOption();
    }


    popup = (text, action, option) => {
        let popupConfig = { show: true } ;

        if(text)    popupConfig.text    =   text;
        if(action)  popupConfig.action  =   action;
        if(option)  popupConfig.option  =   option;

        this.props.dispatch(popupActions.setPopupConfig(popupConfig));

    }


    gotojail = () => {
        let p = this.props.playersConfig.players[this.props.game.currentPlayer];
        this.addAlert(p.name + " was sent directly to jail.");

        let landed={};
        landed.text="You are in jail.";
        landed.show=true;

        let nextButton={};
        nextButton.text="End turn";
        nextButton.title="End turn and advance to the next player.";
        nextButton.show=true;

        this.props.dispatch(gameActions.setLanded(landed));
        this.props.dispatch(gameActions.setNextButton(nextButton));

        p.jail = true;
        this.setState({doublecount: 0});

        // document.getElementById("nextbutton").value = "End turn";
        // document.getElementById("nextbutton").title = "End turn and advance to the next player.";

        // if (p.human) {
        //     document.getElementById("nextbutton").focus();
        // }

        this.updatePosition();
        this.updateOwned();

        if (!p.human) {
            //@TODO !!!
            this.popup(p.AI.alertList, game.next);
            p.AI.alertList = "";
        }
    }


    rollDice = () => {
        let dice = this.rollDiceAction();
        this.props.dispatch(gameActions.rollDice(dice));

        let config = this.state;
     
        config.hide     = false;
        config.buy      = true;
        config.manage   = false;

        //берем отсюда текущего игрока
        let p = this.props.playersConfig.players[this.props.game.currentPlayer];
        let die1 = dice.first;
        let die2 = dice.second;

        config.doublecount++;

        let nextButton={};


        if (die1 == die2) {
            this.addAlert(p.name + " rolled " + (die1 + die2) + " - doubles.");
        } else {
            this.addAlert(p.name + " rolled " + (die1 + die2) + ".");
        }

        if (die1 == die2 && !p.jail) {
            //@view обновление костей
            // updateDice(die1, die2);

            if (config.doublecount < 3) {
                nextButton.text = "Roll again";
                nextButton.title = "You threw doubles. Roll again.";
                nextButton.show = true;
                this.props.dispatch(gameActions.setNextButton(nextButton));
            // If player rolls doubles three times in a row, send him to jail
            } else if (config.doublecount === 3) {
                p.jail = true;
                config.doublecount = 0;
                this.addAlert(p.name + " rolled doubles three times in a row.");
                this.updateMoney();


                if (p.human) {
                    this.popup("You rolled doubles three times in a row. Go to jail.", this.gotojail);
                } else {
                    this.gotojail();
                }

                return;
            }
        } else {
            nextButton.text = "End turn";
            nextButton.title = "End turn and advance to the next player.";
            nextButton.show = true;
            this.props.dispatch(gameActions.setNextButton(nextButton));
            
            config.doublecount = 0;
        }

        //@view обновление позиции на
        this.updatePosition();
        //@view обновление денег визуально
        this.updateMoney();
        //окно обновления имущества игрока
        this.updateOwned();

        if (p.jail === true) {
            p.jailroll++;

            //@view обновление костей
            // updateDice(die1, die2);
            if (die1 == die2) {
                // document.getElementById("jail").style.border = "1px solid black";
                // document.getElementById("cell11").style.border = "2px solid " + p.color;
        

                this.props.dispatch(gameActions.setLanded({show:false}));

                p.jail = false;
                p.jailroll = 0;
                p.position = 10 + die1 + die2;
                config.doublecount = 0;

                this.addAlert(p.name + " rolled doubles to get out of jail.");

                land();
            } else {
                if (p.jailroll === 3) {

                    if (p.human) {
                        this.popup("<p>You must pay the $50 fine.</p>", function() {
                            payFifty();
                            payfifty();
                            p.position =10 + die1 + die2;
                            land();
                        });
                    } else {
                        payfifty();
                        p.position = 10 + die1 + die2;
                        land();
                    }
                } else {

                    let landed={};
                    landed.text="You are in jail.";
                    landed.show=true;

                    this.props.dispatch(gameActions.setLanded(landed));


                    if (!p.human) {
                        this.popup(p.AI.alertList, game.next);
                        p.AI.alertList = "";
                    }
                }
            }


        } else {
            // updateDice(die1, die2);

            // Move player
            p.position += die1 + die2;

            // Collect $200 salary as you pass GO
            if (p.position >= 40) {
                p.position -= 40;
                p.money += 200;
                this.addAlert(p.name + " collected a $200 salary for passing GO.");
            }

            // this.land();
        }
        this.props.dispatch(playerActions.updatePlayer({playerNumber: this.props.game.currentPlayer, playerEntity: p}));



        this.setState(config);
    }   


    render() {

        let landed;
        if(this.props.game.landed.show)
            landed = (
                <div id="landed" title={this.props.game.landed.title}>
                    {this.props.game.landed.text}    
                </div>
            );

        let nextButton;

        console.log(this.props.game)
        if(this.props.game.nextButton.show)
            nextButton = (
                <Button title={this.props.game.nextButton.title} onClick={function(){console.log('clicked');}}>
                    {this.props.game.nextButton.text}
                </Button>
            );

        return (
            <div>
                <Alert />
                {landed}
                {nextButton}
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
                <Popup />
                <Button type="button" className="btn btn-info" onClick={this.rollDice}>Roll dice</Button>
            </div>
        );
    }
}





function mapStateToProps(state) {
    return {
                playersConfig   : state.playersConfig,
                squareConfig    : state.squareConfig,
                game            : state.gameFunctionality,
                popupConfig     : state.popupConfig
    };
}

//connect component with global state
export default connect(mapStateToProps)(ControlBoard);