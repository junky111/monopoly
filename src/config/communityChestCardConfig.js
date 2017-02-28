export const communityChestCards = [
    {text:"Get out of Jail, Free. This card may be kept until needed or sold.", action:(p)=> { p.communityChestJailCard = true; this.updateOwned();}},
    {text:"You have won second prize in a beauty contest. Collect $10.", action:() => { this.addamount(10, 'Community Chest');}},
    {text:"From sale of stock, you get $50.", action:() => { this.addamount(50, 'Community Chest');}},
    {text:"Life insurance matures. Collect $100.", action:() => { this.addamount(100, 'Community Chest');}},
    {text:"Income tax refund. Collect $20.", action:() => { this.addamount(20, 'Community Chest');}},
    {text:"Holiday fund matures. Receive $100.", action:() => { this.addamount(100, 'Community Chest');}},
    {text:"You inherit $100.", action:() => { this.addamount(100, 'Community Chest');}},
    {text:"Receive $25 consultancy fee.", action:() => { this.addamount(25, 'Community Chest');}},
    {text:"Pay hospital fees of $100.", action:() => { this.subtractamount(100, 'Community Chest');}},
    {text:"Bank error in your favor. Collect $200.", action:() => { this.addamount(200, 'Community Chest');}},
    {text:"Pay school fees of $50.", action:() => { this.subtractamount(50, 'Community Chest');}},
    {text:"Doctor's fee. Pay $50.", action:() => { this.subtractamount(50, 'Community Chest');}},
    {text:"It is your birthday. Collect $10 from every player.", action:() => { this.collectfromeachplayer(10, 'Community Chest');}},
    {text:"Advance to \"GO\" (Collect $200).", action:() => { this.advance(0);}},
    {text:"You are assessed for street repairs. $40 per house. $115 per hotel.", action:() => { this.streetrepairs(40, 115);}},
    {text:"Go to Jail. Go directly to Jail. Do not pass \"GO\". Do not collect $200.", action:() => { this.gotojail();}}
];