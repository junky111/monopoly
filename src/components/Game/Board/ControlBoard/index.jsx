import React, { Component, PropTypes } from 'react';
import {Button, Col, Row, Tabs, Tab} from 'react-bootstrap';
import { connect } from 'react-redux';

import  * as playerActions  from 'redux/actions/playerRowActions';
import  * as gameActions  from 'redux/actions/gameActions';
import  * as popupActions  from 'redux/actions/popupActions';
import  * as squareActions from 'redux/actions/squareActions';
import  * as tradeActions from 'redux/actions/tradeActions';
import  * as auctionActions  from 'redux/actions/auctionActions';
import  * as chanceCardActions  from 'redux/actions/chanceCardActions';
import  * as communityChestCardActions  from 'redux/actions/communityChestCardActions';

import Dice from '../Dice';
import {Player} from 'components/Game/Player';
import Popup from '../Popup';
import Alert from '../Alert';
import TradeModal from '../TradeModal';
import Landed from '../Landed';
import Manage from '../Manage';
import Auction from '../Auction';

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
        let currentPlayer = this.props.game.currentPlayer;
        currentPlayer++;
        if(currentPlayer >= this.props.setup.playersNumber) currentPlayer = 0;

        this.props.dispatch(gameActions.updatePlayerCurrent(currentPlayer));
        let nextButton={};
        nextButton.show = false;
        this.props.dispatch(gameActions.setNextButton(nextButton));

        if(this.props.auction.propertyAuction.length > 0) {
            console.log('propertyAuction', this.props.auction.propertyAuction.length)
            this.auction();
        }
        // this.props.dispatch(
        //     squareActions.updateSquare(
        //         this.props.playersConfig.players[this.props.game.currentPlayer].position,
        //         {owner:this.props.game.currentPlayer}
        //     )
        // );

        //

    }

    updateOwned = () => {
        let p = this.props.playersConfig.players[this.props.game.currentPlayer];
        //console.log(this.props);
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

    buy = () => {
        console.log('buy')
        let p = this.props.playersConfig.players[this.props.game.currentPlayer];
        let s = this.props.squareConfig.squares[p.position];
        let cost = s.price;

        if (p.money >= cost) {
            p.pay(cost, 0);

            s.owner = this.props.game.currentPlayer;
            this.updateMoney();
            this.addAlert(p.name + " bought " + s.name + " for " + s.pricetext + ".");

            this.updateOwned();

            this.props.dispatch(gameActions.setLanded({text:"",show:false}));
            this.props.dispatch(playerActions.updatePlayer({playerNumber: this.props.game.currentPlayer, playerEntity: p}));
            this.props.dispatch(squareActions.updateSquare(p.position, s));

        } else {
            this.popup("<p>" + p.name + ", you need $" + (s.price - p.money) + " more to buy " + s.name + ".</p>");
        }
    }

    //@todo version
    citytax() {
        this.addAlert(this.props.playersConfig.players[this.props.game.currentPlayer].name + " paid $200 for landing on City Tax.");
        this.props.playersConfig.players[this.props.game.currentPlayer].pay(200, 0);
        this.props.dispatch(playerActions.updatePlayer({playerNumber: this.props.game.currentPlayer, playerEntity: this.props.playersConfig.players[this.props.game.currentPlayer]}));

        this.props.dispatch(gameActions.setLanded({text:"You landed on City Tax. Pay $200.", show:true}));
    }

    //@todo version
    luxurytax() {
        this.addAlert(this.props.playersConfig.players[this.props.game.currentPlayer].name + " paid $100 for landing on Luxury Tax.");
        this.props.playersConfig.players[this.props.game.currentPlayer].pay(100, 0);
        this.props.dispatch(playerActions.updatePlayer({playerNumber: this.props.game.currentPlayer, playerEntity: this.props.playersConfig.players[this.props.game.currentPlayer]}));
        this.props.dispatch(gameActions.setLanded({text:"You landed on Luxury Tax. Pay $100.", show:true}));
    }

    land = (increasedRent) => {
        increasedRent = !!increasedRent; // Cast increasedRent to a boolean value. It is used for the ADVANCE TO THE NEAREST RAILROAD/UTILITY Chance cards.

        let p = this.props.playersConfig.players[this.props.game.currentPlayer];
        let square = this.props.squareConfig.squares;
        let s = square[p.position];

        // console.log('Players',this.props.playersConfig.players);
        //bougth squares
        //@debug
        // for (let sqc in this.props.squareConfig.squares) {
        //     if(this.props.squareConfig.squares[sqc].owner >-1) console.log('Square Own', this.props.squareConfig.squares[sqc]);
        // }

        // console.log('land p',p);
        // console.log('land s',s);

        let dice = this.props.game.dice;
        let die1 = dice.first;
        let die2 = dice.second;

        this.props.dispatch(gameActions.setLanded({text:"You landed on " + s.name + ".", show:true}));
        this.addAlert(p.name + " landed on " + s.name + ".");

        // Allow player to buy the property on which he landed.
        if (s.price !== 0 && s.owner === -1) {

            if (!p.human) {

               /* if (p.AI.buyProperty(p.position)) {
                    buy();
                }*/
            } else {
                this.props.dispatch(gameActions.setLanded({
                    text:"You landed on ", show:true,
                    linkValue:s.name,
                    value:"Buy ($" + s.price + ")",
                    title:'Buy " + s.name + " for " + s.pricetext + ".',
                    onclick:()=>this.buy,
                    component:true
                }));
            }

            this.props.dispatch(auctionActions.addPropertyToAuctionQueue(p.position));
        }

        // Collect rent
        if (s.owner > -1 && s.owner != this.props.game.currentPlayer && !s.mortgage) {
            let groupowned = true;
            let rent;

            // Railroads
            if (p.position == 5 || p.position == 15 || p.position == 25 || p.position == 35) {
                if (increasedRent) {
                    rent = 25;
                } else {
                    rent = 12.5;
                }

                if (s.owner == square[5].owner) {
                    rent *= 2;
                }
                if (s.owner == square[15].owner) {
                    rent *= 2;
                }
                if (s.owner == square[25].owner) {
                    rent *= 2;
                }
                if (s.owner == square[35].owner) {
                    rent *= 2;
                }

            } else if (p.position === 12) {
                if (increasedRent || square[28].owner == s.owner) {
                    rent = (die1 + die2) * 10;
                } else {
                    rent = (die1 + die2) * 4;
                }

            } else if (p.position === 28) {
                if (increasedRent || square[12].owner == s.owner) {
                    rent = (die1 + die2) * 10;
                } else {
                    rent = (die1 + die2) * 4;
                }

            } else {

                for (let i = 0; i < 40; i++) {
                    let sq = square[i];
                    if (sq.groupNumber == s.groupNumber && sq.owner != s.owner) {
                        groupowned = false;
                    }
                }

                if (!groupowned) {
                    rent = s.baserent;
                } else {
                    if (s.house === 0) {
                        rent = s.baserent * 2;
                    } else {
                        rent = s["rent" + s.house];
                    }
                }
            }

            this.addAlert(p.name + " paid $" + rent + " rent to " + this.props.playersConfig.players[s.owner].name + ".");
            p.pay(rent, s.owner);

            ////@todo dispatch
            this.props.playersConfig.players[s.owner].money += rent;
            this.props.dispatch(playerActions.updatePlayer({playerNumber: s.owner, playerEntity: this.props.playersConfig.players[s.owner]}));
            this.props.dispatch(gameActions.setLanded({
                text:"You landed on " + s.name + ". " +this.props.playersConfig.players[s.owner].name + " collected $" + rent + " rent.", show:true,
            }));
        } else if (s.owner == -1 && s.owner != this.props.game.currentPlayer && s.mortgage) {
            this.props.dispatch(gameActions.setLanded({
                text:"You landed on " + s.name + ". Property is mortgaged; no rent was collected.", show:true,
            }));
        }

        // City Tax
        if (p.position === 4) {
            this.citytax();
        }

        // Go to jail. Go directly to Jail. Do not pass GO. Do not collect $200.
        if (p.position === 30) {
            this.updateMoney();
            this.updatePosition();

            if (p.human) {
                this.popup("<div>Go to jail. Go directly to Jail. Do not pass GO. Do not collect $200.</div>", goToJail);
            } else {
                this.gotojail();
            }

            return;
        }

        // Luxury Tax
        if (p.position === 38) {
            this.luxurytax();
        }

        this.updateMoney();
        this.updatePosition();
        this.updateOwned();

        if (!p.human) {
            //@todo AI
            //popup(p.AI.alertList, chanceCommunityChest);
            //p.AI.alertList = "";
        } else {
             this.chanceCommunityChest();
        }
    }

    chanceCommunityChest = () => {
        let p = this.props.playersConfig.players[this.props.game.currentPlayer];

        // Community Chest
        if (p.position === 2 || p.position === 17 || p.position === 33) {
            let communityChestCards = this.props.communityChestCard;

            let communityChestIndex = communityChestCards.deck[communityChestCards.index];

            // Remove the get out of jail free card from the deck.
            if (communityChestIndex === 0) {
                communityChestCards.deck.splice(communityChestCards.index, 1);
            }

            this.popup("<img src='images/community_chest_icon.png' style='height: 50px; width: 53px; float: left; margin: 8px 8px 8px 0px;' /><div style='font-weight: bold; font-size: 16px; '>Community Chest:</div><div style='text-align: justify;'>" + communityChestCards.cards[communityChestIndex].text + "</div>", ()=>this.communityChestAction(communityChestIndex));

            communityChestCards.index++;

            if (communityChestCards.index >= communityChestCards.deck.length) {
                communityChestCards.index = 0;
            }

            this.props.dispatch(communityChestCardActions.updateIndex(communityChestCards.index));

            // Chance
        } else if (p.position === 7 || p.position === 22 || p.position === 36) {
            let chanceCards = this.props.chanceCard;

            let chanceIndex = chanceCards.deck[chanceCards.index];

            // Remove the get out of jail free card from the deck.
            if (chanceIndex === 0) {
                chanceCards.deck.splice(chanceCards.index, 1);
            }

            this.popup("<img src='images/chance_icon.png' style='height: 50px; width: 26px; float: left; margin: 8px 8px 8px 0px;' /><div style='font-weight: bold; font-size: 16px; '>Chance:</div><div style='text-align: justify;'>" + chanceCards.cards[chanceIndex].text + "</div>", ()=>this.chanceAction(chanceIndex));

            chanceCards.index++;

            if (chanceCards.index >= chanceCards.deck.length) {
                chanceCards.index = 0;
            }

            this.props.dispatch(chanceCardActions.updateIndex(chanceCards.index));
        } else {
            //@todo AI
           /* if (!p.human) {
                p.AI.alertList = "";

                    game.next();
                }
            }*/
        }
    }

    communityChestAction(communityChestIndex) {
        let p = this.props.playersConfig.players[this.props.game.currentPlayer];

        this.props.communityChestCard.cards[communityChestIndex].action(p);

        this.updateMoney();

        //@todo AI
        /*if (communityChestIndex !== 15 && !p.human) {
            p.AI.alertList = "";
            game.next();
        }*/
    }

    chanceAction(chanceIndex) {
        let p = this.props.playersConfig.players[this.props.game.currentPlayer];

        this.props.chanceCard.cards[chanceIndex].action(p);

        this.updateMoney();

        //@todo AI
        // if (chanceIndex !== 15 && !p.human) {
        //     p.AI.alertList = "";
        //     game.next();
        // }
    }

    streetrepairs = (houseprice, hotelprice) => {
        let cost = 0;
        for (let i = 0; i < 40; i++) {
            let s = this.props.squareConfig.squares[i];
            if (s.owner == turn) {
                if (s.hotel == 1)
                    cost += hotelprice;
                else
                    cost += s.house * houseprice;
            }
        }

        let p = this.props.playersConfig.players[this.props.game.currentPlayer];

        if (cost > 0) {
            p.pay(cost, 0);

            // If function was called by Community Chest.
            if (houseprice === 40) {
                this.addAlert(p.name + " lost $" + cost + " to Community Chest.");
            } else {
                this.addAlert(p.name + " lost $" + cost + " to Chance.");
            }
            this.props.dispatch(playerActions.updatePlayer({playerNumber: this.props.game.currentPlayer, playerEntity: p}));
        }
    }

    advance = (destination, pass) => {
        let p = this.props.playersConfig.players[this.props.game.currentPlayer];

        if (typeof pass === "number") {
            if (p.position < pass) {
                p.position = pass;
            } else {
                p.position = pass;
                p.money += 200;
                this.addAlert(p.name + " collected a $200 salary for passing GO.");
            }
        }
        if (p.position < destination) {
            p.position = destination;
        } else {
            p.position = destination;
            p.money += 200;
            this.addAlert(p.name + " collected a $200 salary for passing GO.");
        }

        this.props.dispatch(playerActions.updatePlayer({playerNumber: this.props.game.currentPlayer, playerEntity: p}));

        this.land();
    }

    subtractamount(amount, cause) {
        let p = this.props.playersConfig.players[this.props.game.currentPlayer];
        p.pay(amount, 0);
        this.addAlert(p.name + " lost $" + amount + " from " + cause + ".");

        this.props.dispatch(playerActions.updatePlayer({playerNumber: this.props.game.currentPlayer, playerEntity: p}));
    }

    auction = () => {
        this.props.dispatch(auctionActions.showWindow());
        this.props.dispatch(gameActions.setLanded({show:false}));
    }

    rollDice = () => {
        let dice = this.rollDiceAction();
        this.props.dispatch(gameActions.rollDice(dice));

        let config = this.state;
     
        config.hide     = false;
        config.buy      = true;
        config.manage   = false;

        //get current player Object
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
            let dice = this.rollDiceAction();
            this.props.dispatch(gameActions.rollDice(dice));

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

                this.land();
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

            this.land();
        }

        //обновление позиции чувака
        this.updatePosition();
        this.props.dispatch(playerActions.updatePlayer({playerNumber: this.props.game.currentPlayer, playerEntity: p}));

        this.setState(config);
    }   

    //select tab function
    handleSelect = (key) => {
        if(key === 3) this.props.dispatch(tradeActions.showWindow());
        this.setState({key:key})
    }

    render() {
        console.log('chanceCard', this.props)
        let landed;
        if(this.props.game.landed.show)
            landed = (
                <Landed
                    {...this.props.game.landed}
                />
                /*<div id="landed" title={this.props.game.landed.title}>
                    {this.props.game.landed.text}    
                </div>*/
            );

        let nextButton;
        if(this.props.game.nextButton.show)
            nextButton = (
                <Button title={this.props.game.nextButton.title} onClick={()=>{this.updateCurrentPlayer();this.setState({key:1})}}>
                    {this.props.game.nextButton.text}
                </Button>
            );
        else
            nextButton = (
                <Button className="btn btn-info" onClick={()=>{this.rollDice();this.setState({key:1});}}>Roll dice</Button>
            );

        return (
            <div className="container" style={{maxWidth:"460px"}}>
                <Row>
                    <Col md={9}>
                        <Tabs id="controller-tabs" activeKey={this.state.key} onSelect={this.handleSelect}>
                            <Tab eventKey={1} title="Buy">
                                <Alert />
                                {/*<TradeModal/>*/}
                                {landed}
                            </Tab>
                            <Tab eventKey={2} title="Manage">
                                <Manage
                                    popup={this.popup}
                                    addAlert={this.addAlert}
                                    updateOwned={this.updateOwned}
                                    updateMoney={this.updateMoney}/>
                            </Tab>
                            <Tab eventKey={3} title="Trade">
                                <TradeModal
                                    popup={this.popup}
                                    addAlert={this.addAlert}
                                />
                            </Tab>
                            {/*nextButton*/}
                        </Tabs>
                    </Col>
                    <Col md={3}>
                        <table>
                            <tbody>
                                <Player
                                    index={this.props.game.currentPlayer}
                                    player={this.props.playersConfig.players[this.props.game.currentPlayer]}
                                />
                            </tbody>
                        </table>
                        <Dice diceNumber={this.props.game.dice.first}/>
                        <Dice diceNumber={this.props.game.dice.second}/>
                        <Popup />
                    </Col>
                    <Auction
                        popup={this.popup}
                        addAlert={this.addAlert}
                    />
                </Row>
                {nextButton}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
                playersConfig           : state.playersConfig,
                squareConfig            : state.squareConfig,
                game                    : state.gameFunctionality,
                popupConfig             : state.popupConfig,
                trade                   : state.trade,
                auction                 : state.auction,
                setup                   : state.setup,
                chanceCard              : state.chanceCard,
                communityChestCard     : state.communityChestCard
    };
}

//connect component with global state
export default connect(mapStateToProps)(ControlBoard);