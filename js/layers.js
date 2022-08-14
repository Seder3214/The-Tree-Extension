addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		eff: new Decimal(1),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (player.d.unlocked) mult = mult.mul(player.d.points.pow(0.4).max(1))
		if (player.m.unlocked) mult = mult.mul(player.m.points.pow(1.15).max(1))
		if (hasUpgrade("p", 21)) mult = mult.mul(2)
		if (hasUpgrade("d", 11)) mult = mult.mul(3)
						if (hasUpgrade("d", 21)) mult = mult.mul(upgradeEffect("d", 21))
		if (hasUpgrade("m", 12)) mult = mult.mul(upgradeEffect("m", 12))
		if (player.p.buyables[11].gte(1)) mult = mult.mul(buyableEffect("p", 11))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
		    tabFormat: {
        "Upgrades": {
        content:[
            function() {if (player.tab == "p") return "main-display"},
            "prestige-button",
            function() {if (player.tab == "p") return "resource-display"},
            "blank",
            "upgrades"
            ]
        },
        "Buyables": {
            content:[
                function() {if (player.tab == "p") return "main-display"},
            "prestige-button",
            function() {if (player.tab == "p") return "resource-display"},
            "blank",
            "buyables"
            ],
        },
            },
	upgrades: {
		11: {
			title: "11",
			description: "Unspent Prestige Points boosts point gain",
			cost: new Decimal(4),
			effect() {if (hasUpgrade("p", 35)) return player.p.points.pow(0.42).max(1.15).pow(1.44)
				if (hasUpgrade("p", 31)) return player.p.points.pow(0.36).max(1.15).pow(1.4)
				if (hasUpgrade("p", 32)) return player.p.points.pow(0.32).max(1.15).pow(1.4)
				if (hasUpgrade("p", 32)) return player.p.points.pow(0.32).max(1.15).times(4)
				if (hasUpgrade("p", 25)) return player.p.points.pow(0.22).max(1.15).times(4)
if (hasUpgrade("p", 15)) return player.p.points.pow(0.22).max(1.15).times(2)
				else return player.p.points.pow(0.22).max(1.15)},
			effectDisplay() {return "" + format(upgradeEffect("p", 11)) + "x"},
			unlocked() {return hasMilestone("te", 1)},
		},
				12: {
			title: "12",
			description: "Points boost themselves gain",
			cost: new Decimal(8),
			effect() {if (hasUpgrade("p", 33)) return player.points.pow(0.16).max(1).pow(1.44)
				if (hasUpgrade("p", 33)) return player.points.pow(0.16).max(1).pow(1.4)
				if (hasUpgrade("p", 25)) return player.points.pow(0.16).max(1).times(4)
if (hasUpgrade("p", 15)) return player.points.pow(0.16).max(1).times(2)
				else return player.points.pow(0.16).max(1)},
			effectDisplay() {return "" + format(upgradeEffect("p", 12)) + "x"},
			unlocked() {return hasMilestone("te", 1)},
		},
						13: {
			title: "13",
			description: "Point boost gain by each upgrade",
			cost: new Decimal(14),
			effect() {let ret = Decimal.pow(1.5, player.p.upgrades.length)
			return ret;},
			effectDisplay() {return "" + format(upgradeEffect("p", 13)) + "x"},
			unlocked() {return hasMilestone("te", 1)},
		},
			14: {
			title: "14",
			description: "Tree Expansion amount boost Point gain",
			cost: new Decimal(23),
			effect() {if (hasUpgrade("p", 35)) return player.te.points.pow(1.22).max(1).pow(1.44)
				if (hasUpgrade("p", 33)) return player.te.points.pow(1.22).max(1).pow(1.4)
				if (hasUpgrade("p", 25)) return player.te.points.pow(1.22).max(1).times(4)
if (hasUpgrade("p", 15)) return player.te.points.pow(1.22).max(1).times(2)
				else return player.te.points.pow(1.22).max(1)},
			effectDisplay() {return "" + format(upgradeEffect("p", 14)) + "x"},
			unlocked() {return hasMilestone("te", 1)},
		},
					15: {
			title: "15",
			description: "Twice 11, 12, 14 upgrades effects",
			cost: new Decimal(32),
			effectDisplay() { if (hasUpgrade("p", 35)) return "^1.44"
				if (hasUpgrade("p", 33)) return "^1.4"
			if (hasUpgrade("p", 25)) return "4.00x"
else return "2.00x"},
			unlocked() {return hasMilestone("te", 1)},
		},
					21: {
			title: "21",
			description: "Double prestige points gain, but divide point gain by 1.25x",
			cost: new Decimal(345),
			unlocked() {return hasMilestone("te", 2)},
		},
					22: {
			title: "22",
			description: "Gain 10% of Prestige Points on reset",
			cost: new Decimal(690),
			unlocked() {return hasUpgrade("p", 21)},
		},
		23: {
			title: "23",
			description: "Replace  the 1.25x <b>21</b> dividing effect. 1.25x => 0.75",
			cost: new Decimal(1780),
			unlocked() {return hasUpgrade("p", 21)},
		},
24: {
			title: "24",
			description: "Power up passive Prestige point gain up to 25%",
			cost: new Decimal(4200),
			unlocked() {return hasUpgrade("p", 21)},
		},
25: {
			title: "25",
			description: "Power up <b>15</b> effect",
			cost: new Decimal(9450),
			unlocked() {return hasUpgrade("p", 21)},
		},
		31: {
			title: "34",
			description: "Power up <b>11</b> effect",
			cost: new Decimal(2e13),
			unlocked() {return hasUpgrade("d", 13)},
		},
		32: {
			title: "31",
			description: "Power up passive Prestige point gain up to 50%",
			cost: new Decimal(18900),
			unlocked() {return hasMilestone("te", 2)},
		},
				33: {
			title: "32",
			description: "<b>11</b> upgrade will have a better formula",
			cost: new Decimal(37800),
			unlocked() {return hasUpgrade("p", 32)},
		},
						34: {
			title: "33",
			description: "Change <b>15</b> multiplier effect to exponential effect",
			cost: new Decimal(75600),
			unlocked() {return hasUpgrade("p", 32)},
		},
				35: {
			title: "35",
			description: "Power up <b>15</b> exponential effect",
			cost: new Decimal(.3e15),
			unlocked() {return hasUpgrade("d", 13)},
		},
	},
	buyables: {
    11: {
        cost(x) { return new Decimal(200000).times(x).pow(1.07) },
		purchaseLimit: 100,
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>Prestige Boost</b></h2> <br>" + "Cost: " + format(data.cost) + " Prestige Points <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "/100 <br> Effect: " + format(data.effect) + "x"},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {return x = x.pow(1.15).pow(buyableEffect("p", 12))},
		unlocked() {return player.te.points.gte(4)},
    },
	    12: {
        cost(x) { return new Decimal(180000000).times(x).pow(1.1) },
				purchaseLimit() { if (hasUpgrade("d", 12)) return new Decimal(50)
					else return new Decimal(40)},
        display() {
                let data = tmp[this.layer].buyables[this.id]
				if (hasUpgrade("d", 12)) return "<h2><b>Prestige Idle</b></h2> <br>" + "Cost: " + format(data.cost) + " Prestige Points <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "/50<br> Effect: ^" + format(data.effect)
				else return "<h2><b>Prestige Idle</b></h2> <br>" + "Cost: " + format(data.cost) + " Prestige Points <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "/40<br> Effect: ^" + format(data.effect)},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {return x = x.pow(0.16)},
		unlocked() {return player.te.points.gte(4)},
    },
},
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
									passiveGeneration() {
if (hasUpgrade("p", 31)) return (hasUpgrade("p", 32)?.5:0)										
if (hasUpgrade("p", 24)) return (hasUpgrade("p", 24)?.25:0)
else return (hasUpgrade("p", 22)?.1:0)
  },
    layerShown(){return true}
})
addLayer("d", {
    name: "Delta", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		eff: new Decimal(1),
    }},
    color: "orange",
    requires: new Decimal(5e11),
branches: ["p"],	// Can be a function that takes requirement increases into account
    resource: "Deltas",
effectDescription() {if (hasUpgrade("d", 11)) return "which multiplies Prestige Point gain by " + format(player.d.points.pow(0.4).max(1).times(3)) + "x <br>" + "The Delta gain softcaps after 100K"
	else return "which multiplies Prestige Point gain by " + format(player.d.points.pow(0.4)) + "x"},	// Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (player.d.points.gte(100000)) mult = mult.div(3000)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
		    tabFormat: {
        "Upgrades": {
        content:[
            function() {if (player.tab == "d") return "main-display"},
            "prestige-button",
            function() {if (player.tab == "d") return "resource-display"},
            "blank",
            "upgrades"
            ]
        },
        "Buyables": {
            content:[
                function() {if (player.tab == "d") return "main-display"},
            "prestige-button",
            function() {if (player.tab == "d") return "resource-display"},
            "blank",
            "buyables"
            ],
        },
            },
	upgrades: {
								11: {
			title: "11",
			description: "3.00x to the D effect",
			cost: new Decimal(1),
			unlocked() {return true},
	},
									12: {
			title: "12",
			description: "Scale the <b>Prestige Idle</b> limit to <i><b>50</b></i>",
			cost: new Decimal(4),
			unlocked() {return hasUpgrade("d", 11)},
	},
										13: {
			title: "13",
			description: "Unlock 2 new PP upgrades",
			cost: new Decimal(12),
			unlocked() {return hasUpgrade("d", 12)},
	},
											21: {
			title: "21",
			description: "Unspent Delta boosts Prestige Point gain",
			cost: new Decimal(300),
			unlocked() {return hasUpgrade("d", 13)},
			effect() {return player.d.points.pow(0.35).times(1.5)},
											effectDisplay() {return format((upgradeEffect("d", 21))) + "x"},
	},
												22: {
			title: "22",
			description: "Add base incremental formula. (Showed under point counter). Formula: <br> Prestige points^0.02 * Delta^0.02",
			cost: new Decimal(3500),
			unlocked() {return hasUpgrade("d", 21)},
	},
	},
	buyables: {
},
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
									passiveGeneration() {
  },
    layerShown(){return (player.te.buyables[11].gte(1))}
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
})

addLayer("m", {
    name: "Machines", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		eff: new Decimal(1),
		bp: new Decimal(0),
    }},
    color: "gray",
    requires: new Decimal(1e23),
branches: ["p"],	// Can be a function that takes requirement increases into account
    resource: "Machines",
effectDescription() {return "which multiplies Prestige Point gain by " + format(player.m.points.add(.5).pow(1.15)) + "x"},	// Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
		    effect() {
        if (!inChallenge("m", 11))
            return new Decimal(1);
        let eff = Decimal.pow(1);
		if (hasUpgrade("m", 11)) eff = eff.times(upgradeEffect("m", 11))
        return eff;
    },
		    tabFormat: {
        "Crafts": {
            content:[
                function() {if (player.tab == "m") return "main-display"},
            "prestige-button",
            function() {if (player.tab == "m") return "resource-display"},
            "blank",
            "upgrades"
            ],
        },
		        "Blueprints": {
            content:[
                function() {if (player.tab == "m") return "main-display"},
            "prestige-button",
            function() {if (player.tab == "m") return "resource-display"},
            "blank",
            "challenges"
            ],
        },
            },
	upgrades: {
								11: {
			title: "Craft a factory",
			description: "Each delta upgrade boosts Blueprint gain",
			cost: new Decimal(165),
			unlocked() {return (challengeCompletions("m", 11) >= 1)},
			effect() {let ret = Decimal.pow(1.4, player.d.upgrades.length)
			return ret;},
			effectDisplay() {return "" + format(upgradeEffect("m", 11)) + "x"},
			currencyDisplayName: "Blueprints", // Use if using a nonstandard currency
            currencyInternalName: "bp", // Use if using a nonstandard currency
            currencyLayer: "m",
	},
										12: {
			title: "Craft a reactor",
			description: "Boosts prestige point gain by created crafts",
			cost: new Decimal(360),
			unlocked() {return (challengeCompletions("m", 11) >= 2)},
			effect() {let ret = Decimal.pow(1.6, player.m.upgrades.length)
			return ret;},
			effectDisplay() {return "" + format(upgradeEffect("m", 12)) + "x"},
			currencyDisplayName: "Blueprints", // Use if using a nonstandard currency
            currencyInternalName: "bp", // Use if using a nonstandard currency
            currencyLayer: "m",
	},
									13: {
			title: "Craft a miner robot",
			description: "Decrease Tree Extension cost",
			cost: new Decimal(500),
			unlocked() {return (challengeCompletions("m", 11) >= 2)},
			currencyDisplayName: "Blueprints", // Use if using a nonstandard currency
            currencyInternalName: "bp", // Use if using a nonstandard currency
            currencyLayer: "m",
	},
	},
	challenges: {
    11: {
		completionLimit: 25,
        name: "Start making blueprints",
        challengeDescription() { if (challengeCompletions("m", 11) == 2) return "When you in this challenge, you should create some amount of blueprints. Now you created <h3 style='color: blue; text-shadow: 0 0 10px blue'>" + format(player.m.bp) + " / 3450</h3> Blueprints<br>"
			if (challengeCompletions("m", 11) == 1) return "When you in this challenge, you should create some amount of blueprints. Now you created <h3 style='color: blue; text-shadow: 0 0 10px blue'>" + format(player.m.bp) + " / 265</h3> Blueprints<br>"
			else return "When you in this challenge, you should create some amount of blueprints. You created <h3 style='color: blue; text-shadow: 0 0 10px blue'>" + format(player.m.bp) + " / 25</h3> Blueprints <br>"},
        canComplete: function() {if (challengeCompletions("m", 11) == 2) return player.m.bp.gte(3450)
			if (challengeCompletions("m", 11) == 1) return player.m.bp.gte(265)
			else return player.m.bp.gte(25)},
		goalDescription() {
			if (challengeCompletions("m", 11) == 2) return "3450 Blueprints"
			if (challengeCompletions("m", 11) == 1) return "265 Blueprints"
			else return "25 Blueprints"},
			rewardDescription() {if (challengeCompletions("m", 11) == 2) return "After second completion: Unlocks 2 crafts."
				else return "After first completion: Unlocks first craft."},
    },
},
    update(diff) {
   if (inChallenge("m", 11))
          return player.m.bp = player.m.bp.add(tmp.m.effect.times(diff))
	},
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
									passiveGeneration() {
  },
    layerShown(){return (player.te.buyables[11].gte(2))}
})

addLayer("o", {
    name: "Ores", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "O", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		eff: new Decimal(1),
		bp: new Decimal(0),
    }},
    color: "cyan",
    requires: new Decimal(1e28),
branches: ["m", "d"],	// Can be a function that takes requirement increases into account
    resource: "Ores",
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2,
effectDescription() {return "<br><h1>This Layer is in development</h1>"},	// Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
		    tabFormat: {
        "Mines": {
            content:[
                function() {if (player.tab == "o") return "main-display"},
            "prestige-button",
            function() {if (player.tab == "o") return "resource-display"},
            "blank",
            "challenges"
            ],
        },
            },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
									passiveGeneration() {
  },
    layerShown(){return (player.te.buyables[11].gte(2))}
=======
>>>>>>> bcf7d2ea53f90f735d18b2dfba5a94a701d5eeaf
>>>>>>> Stashed changes
})
addLayer("te", {
    name: "treeextension", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "TE", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "white",
    requires: new Decimal(2), // Can be a function that takes requirement increases into account
    resource: "Tree Extensions", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2.4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade("m", 13)) mult = mult.div(1e50)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	    tabFormat: {
        "Milestones": {
        content:[
            function() {if (player.tab == "te") return "main-display"},
            "prestige-button",
            function() {if (player.tab == "te") return "resource-display"},
            "blank",
            "milestones"
            ]
        },
        "Buyables": {
            content:[
                function() {if (player.tab == "te") return "main-display"},
            "prestige-button",
            function() {if (player.tab == "te") return "resource-display"},
            "blank",
            "buyables"
            ],
			unlocked() {return (hasMilestone("te", 4))},
        },
		        "Automation": {
            content:[
                function() {if (player.tab == "te") return "main-display"},
            "prestige-button",
            function() {if (player.tab == "te") return "resource-display"},
            "blank",
            ["buyable", 12]
            ],
			unlocked() {return (hasMilestone("te", 5))},
        },
            },
	milestones: {
    0: {
        requirementDescription: "1 Extensions",
        effectDescription: "Double Point gain",
        done() { return player.te.points.gte(1) }
    },
	    1: {
        requirementDescription: "2 Extensions",
        effectDescription: "Unlock a new row of Prestige point upgrades",
        done() { return player.te.points.gte(2) }
    },
		    2: {
        requirementDescription: "3 Extensions",
        effectDescription: "Unlock 2 new Prestige Point upgrades in 1st column that unlocks a full 2nd and 3rd row of PP upgrades",
        done() { return player.te.points.gte(3) }
    },
			    3: {
        requirementDescription: "4 Extensions",
        effectDescription: "Unlock 2 new Prestige Point buyables",
        done() { return player.te.points.gte(4) }
    },
				    4: {
        requirementDescription: "5 Extensions",
        effectDescription: "Unlock <b>Layer Extension</b> buyable",
        done() { return player.te.points.gte(5) }
    },
					    5: {
        requirementDescription: "6 Extensions",
        effectDescription: "Unlock <b>Automation</b> tab",
        done() { return player.te.points.gte(6) }
    },
},
	buyables: {
    11: {
        cost(x) { return new Decimal(5).times(x)},
		purchaseLimit: 100,
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>Layer Extension</b></h2> <br>" + "Cost: " + format(data.cost) + " Tree Extensions <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "<br> Unlocks a layer."},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		unlocked() {return hasMilestone("te", 4)},
    },
	    12: {
        cost(x) { return new Decimal(5).times(x)},
		purchaseLimit: 100,
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>Automate Upgrades</b></h2> <br>" + "Cost: " + format(data.cost) + " Machines <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "<br>Each buyable level autobuys upgrades on 1 more layer"},
        canAfford() { return player.m.points.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player.m.points = player.m.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		unlocked() {return hasMilestone("te", 4)},
    },
	},
    row: "side", // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})