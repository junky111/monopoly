export const chanceCards = [
    {text:"GET OUT OF JAIL FREE. This card may be kept until needed or traded.", action:function(p) { p.chanceJailCard=true; this.updateOwned();}},
    {text:"Make General Repairs on All Your Property. For each house pay $25. For each hotel $100.", action:function() { streetrepairs(25, 100);}},
    {text:"Speeding fine $15.", action:function() { subtractamount(15, 'Chance');}},
    {text:"You have been elected chairman of the board. Pay each player $50.", action:function() { payeachplayer(50, 'Chance');}},
    {text:"Go back three spaces.", action:function() { gobackthreespaces();}},
    {text:"ADVANCE TO THE NEAREST UTILITY. IF UNOWNED, you may buy it from the Bank. IF OWNED, throw dice and pay owner a total ten times the amount thrown.", action:function() { advanceToNearestUtility();}},
    {text:"Bank pays you dividend of $50.", action:function() { addamount(50, 'Chance')}},
    {text:"ADVANCE TO THE NEAREST RAILROAD. If UNOWNED, you may buy it from the Bank. If OWNED, pay owner twice the rental to which they are otherwise entitled.", action:function() { advanceToNearestRailroad()}},
    {text:"Pay poor tax of $15.", action:function() { subtractamount(15, 'Chance')}},
    {text:"Take a trip to Reading Rail Road. If you pass \"GO\" collect $200.", action:function() { advance(5);}},
    {text:"ADVANCE to Boardwalk.", action:function() { advance(39);}},
    {text:"ADVANCE to Illinois Avenue. If you pass \"GO\" collect $200.", action:function() { advance(24);}},
    {text:"Your building loan matures. Collect $150.", action:function() { addamount(150, 'Chance')}},
    {text:"ADVANCE TO THE NEAREST RAILROAD. If UNOWNED, you may buy it from the Bank. If OWNED, pay owner twice the rental to which they are otherwise entitled.", action:function() { advanceToNearestRailroad();}},
    {text:"ADVANCE to St. Charles Place. If you pass \"GO\" collect $200.", action:function() { advance(11);}},
    {text:"Go to Jail. Go Directly to Jail. Do not pass \"GO\". Do not collect $200.", action:function() { gotojail();}}
];