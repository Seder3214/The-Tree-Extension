addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		eff: new Decimal(1),
		auto: true,
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5,
	automate() {},
	autoUpgrade() { return (player.te.buyables[12].gte(2) && player.p.auto)},	// Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (player.d.unlocked) mult = mult.mul(player.d.points.pow(0.4).max(1))
		if (player.m.unlocked) mult = mult.mul(player.m.points.pow(1.15).max(1))
		if (hasUpgrade("p", 21)) mult = mult.mul(2)
		if (hasUpgrade("d", 11)) mult = mult.mul(3)
						if (hasUpgrade("d", 21)) mult = mult.mul(upgradeEffect("d", 21))
		if (hasUpgrade("m", 12)) mult = mult.mul(upgradeEffect("m", 12))
		if (player.p.buyables[11].gte(1)) mult = mult.mul(buyableEffect("p", 11))
		if (hasUpgrade("m", 31)) mult = mult.mul(buyableEffect("m", 12).div(5))
		if (hasUpgrade("i", 21)) mult = mult.mul(1.78e308)
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
if (player.te.buyables[12].gte(2)) return (hasUpgrade("p", 32)?1:1)	
if (hasUpgrade("p", 31)) return (hasUpgrade("p", 32)?.5:0)										
if (hasUpgrade("p", 24)) return (hasUpgrade("p", 24)?.25:0)
else return (hasUpgrade("p", 22)?.1:0)
  },
    		doReset(resettingLayer) {
			if (layers[resettingLayer].row <= layers[this.layer].row) return
			let keep = [];
			 if (player.te.buyables[12].gte(2)) keep.push("buyables");
			             layerDataReset("p", keep)
		},
    layerShown(){if (player.tre.points.gte(1)) return "ghost"
		if (hasUpgrade("o", 24)) return "ghost"
		else return true}
})
addLayer("d", {
    name: "Delta", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		eff: new Decimal(1),
		auto: true,
    }},
    color: "orange",
    requires: new Decimal(5e11),
branches: ["p"],	// Can be a function that takes requirement increases into account
    resource: "Deltas",
		automate() {},
	autoUpgrade() { return (player.te.buyables[13].gte(2) && player.d.auto)},
effectDescription() {if (hasUpgrade("d", 11)) return "which multiplies Prestige Point gain by " + format(player.d.points.pow(0.4).max(1).times(3)) + "x <br>" + "The Delta gain softcaps after 100K"
	else return "which multiplies Prestige Point gain by " + format(player.d.points.pow(0.4)) + "x"},	// Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (player.d.points.gte(100000)) mult = mult.div(3e300)
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
			effect() {return player.d.points.pow(0.35).times(1.5).max(3)},
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
        {key: "p", description: "d: Reset for Delta", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
									passiveGeneration() {
										return (player.te.buyables[13].gte(2)?1:1)
  },
    layerShown(){if (player.tre.points.gte(1)) return "ghost"
		if (hasUpgrade("o", 24)) return "ghost"
		else return (player.te.buyables[11].gte(2))}
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
		auto: true,
    }},
    color: "gray",
    requires: new Decimal(1e23),
branches: ["p"],	// Can be a function that takes requirement increases into account
    resource: "Machines",
			automate() {},
	autoUpgrade() { return (player.te.buyables[13].gte(2) && player.m.auto)},
effectDescription() {return "which multiplies Prestige Point gain by " + format(player.m.points.add(.5).pow(1.15).max(1)) + "x"},	// Name of prestige currency
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
        if (!player.m.buyables[11].gte(0))
            return new Decimal(1);
        let eff = Decimal.pow(1);
		if (hasUpgrade("m", 11)) eff = eff.times(upgradeEffect("m", 11))
			if (player.m.buyables[11].gte(1)) eff = eff.times(buyableEffect("m", 11))
				if (hasUpgrade("o", 31)) eff = eff.times(10)
					if (hasUpgrade("i", 13)) eff = eff.pow(1.2)
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
            "buyables"
            ],
        },
            },
	upgrades: {
								11: {
			title: "Craft a factory",
			description: "Each delta upgrade boosts Blueprint gain",
			cost: new Decimal(165),
			unlocked() {return player.m.buyables[11].gte(2)},
			effect() {let ret = Decimal.pow(1.4, player.d.upgrades.length).max(2)
			return ret;},
			effectDisplay() {return "" + format(upgradeEffect("m", 11)) + "x"},
			currencyDisplayName: "Blueprints", // Use if using a nonstandard currency
            currencyInternalName: "bp", // Use if using a nonstandard currency
            currencyLayer: "m",
	},
										12: {
			title: "Craft a reactor",
			description: "Boosts prestige point gain by created crafts",
			cost: new Decimal(3600),
			unlocked() {return player.m.buyables[11].gte(3)},
			effect() {let ret = Decimal.pow(1.6, player.m.upgrades.length)
			return ret;},
			effectDisplay() {return "" + format(upgradeEffect("m", 12)) + "x"},
			currencyDisplayName: "Blueprints", // Use if using a nonstandard currency
            currencyInternalName: "bp", // Use if using a nonstandard currency
            currencyLayer: "m",
	},
									13: {
			title: "Craft a phone",
			description: "Decrease Tree Extension cost",
			cost: new Decimal(70000),
			unlocked() {return player.m.buyables[11].gte(4)},
			currencyDisplayName: "Blueprints", // Use if using a nonstandard currency
            currencyInternalName: "bp", // Use if using a nonstandard currency
            currencyLayer: "m",
	},
										14: {
			title: "Craft a smartphone",
			description: "Boost base incremental formula effect by adding machine currency into effect",
			cost: new Decimal(1250000),
			unlocked() {return player.m.buyables[11].gte(5)},
			currencyDisplayName: "Blueprints", // Use if using a nonstandard currency
            currencyInternalName: "bp", // Use if using a nonstandard currency
            currencyLayer: "m",
			style() {
				return {
					"width": "100px"
				}
			},
										},
													21: {
			title: "Craft a monitor",
			description: "Boost base incremental formula effect by adding machine currency into effect",
			cost: new Decimal(10250000),
			unlocked() {return player.m.buyables[11].gte(6)},
			currencyDisplayName: "Blueprints", // Use if using a nonstandard currency
            currencyInternalName: "bp", // Use if using a nonstandard currency
            currencyLayer: "m",
						style() {
				return {
					"width": "100px"
				}
			},
	},
														22: {
			title: "Craft a Computer",
			description: "Make blueprint effect now boosts point gain",
			cost: new Decimal(4e9),
			unlocked() {return player.m.buyables[11].gte(7)},
			currencyDisplayName: "Blueprints", // Use if using a nonstandard currency
            currencyInternalName: "bp", // Use if using a nonstandard currency
            currencyLayer: "m",
	},
															23: {
			title: "Craft a Plane",
			description: "Start Making Blueprint robots that can speed up production",
			cost: new Decimal(8e10),
			unlocked() {return player.m.buyables[11].gte(8)},
			currencyDisplayName: "Blueprints", // Use if using a nonstandard currency
            currencyInternalName: "bp", // Use if using a nonstandard currency
            currencyLayer: "m",
	},
																24: {
			title: "Craft a Train",
			description: "Now Make Blueprint levels adds an additional bonus to Blueprint robots effect",
			cost: new Decimal(5e12),
			unlocked() {return player.m.buyables[11].gte(9)},
			currencyDisplayName: "Blueprints", // Use if using a nonstandard currency
            currencyInternalName: "bp", // Use if using a nonstandard currency
            currencyLayer: "m",
	},
																	32: {
			title: "Craft a layer",
			description: "Just divides TE cost for you to buy 16th :D",
			cost: new Decimal(2e18),
			unlocked() {return player.m.buyables[11].gte(10)},
			currencyDisplayName: "Blueprints", // Use if using a nonstandard currency
            currencyInternalName: "bp", // Use if using a nonstandard currency
            currencyLayer: "m",
									style() {
				return {
					"width": "240px",
					"height": "240px"
				}
			},
	},
																		31: {
			title: "Craft a boost",
			description: "Blueprint robots effect now applies to Prestige Point gain",
			cost: new Decimal(2e24),
			unlocked() {return player.m.buyables[11].gte(11)},
			currencyDisplayName: "Blueprints", // Use if using a nonstandard currency
            currencyInternalName: "bp", // Use if using a nonstandard currency
            currencyLayer: "m",
			style() {
				return {
					"height": "240px"
				}
			},
	},
	},
	buyables: {
    11: {
        cost(x) { return new Decimal(25).pow(x) },
		purchaseLimit: 13,
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>Make Blueprints</b></h2> <br>" + "Progress to next craft: " + format(player.m.bp) + " / " + format(data.cost) + "<br> Level: " + formatWhole(player[this.layer].buyables[this.id]) + " / 13<br> Effect: +" + format(data.effect) + " to blueprint gain <br>"},
        canAfford() { return player.m.bp.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {
			let eff = x.times(1.8).pow(x.times(1.08)).times(buyableEffect("m", 12)).times(player.o.iron.pow(1.24).times(1.34).max(1)).max(1)
			return eff;
		},
		unlocked() {return true},
    },
	    12: {
        cost(x) { return new Decimal(1.5e21).pow(x) },
		purchaseLimit: 5,
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>Make Blueprint Robots</b></h2> <br>" + "Progress to next craft: " + format(player.m.bp) + " / " + format(data.cost) + "<br> Level: " + formatWhole(player[this.layer].buyables[this.id]) + " / 5<br> Effect: x" + format(data.effect) + " to blueprint gain <br>"},
        canAfford() { return player.m.bp.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {
			let eff = x.times(x.pow(x.times(x))).add(tmp.m.buyables[11].purchaseLimit)
			return eff;
		},
		unlocked() {return true},
    },
	},
    update(diff) {
   if (player.m.buyables[11].gte(0))
          return player.m.bp = player.m.bp.add(tmp.m.effect.times(diff))
	},
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "m: Reset for Machines", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
									passiveGeneration() {
  },
        		doReset(resettingLayer) {
			if (layers[resettingLayer].row <= layers[this.layer].row) return
			let keep = [];
			 if (player.te.buyables[13].gte(2)) keep.push("buyables");
			             layerDataReset("m", keep)
		},
    layerShown(){if (player.tre.points.gte(1)) return "ghost"
		if (hasUpgrade("o", 24)) return "ghost"
		else return (player.te.buyables[13].gte(2))}
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
		cd: new Decimal(0),
		iron: new Decimal(0),
		gold: new Decimal(0),
		sc: new Decimal(1000),
		copper: new Decimal(0),
		silver: new Decimal(0),
		platinum: new Decimal(0),
    }},
    color: "cyan",
    requires: new Decimal(8e30),
branches: ["p"],	// Can be a function that takes requirement increases into account
    resource: "Ores",
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.008,
effectDescription() {
	if (hasUpgrade("o", 24)) return "You have " + format(player.o.platinum) + "<br> Platinum effect: " + format(player.o.platinum.times(3.6).pow(2.8)) + "x to nothing (You need 1 Platinum)" 
	if (hasUpgrade("i", 13)) return "You have " + format(player.o.iron) + " Iron, " + format(player.o.copper) + " Copper, " + format(player.o.silver) + " Silver, " + format(player.o.gold) + " Gold, <br>"+ "Iron Effect: " + format(player.o.iron.pow(1.24).times(1.34).max(1).times(10).pow(1.2)) + "x to blueprint gain " + "<br> Copper Effect: " + format(player.o.copper.pow(0.85).times(2).times(10).pow(1.2)) + "x to point gain" + "<br> Silver Effect: " + format(player.o.silver.pow(85).times(2).pow(1.2)) + "x reducing cost of TE " + "<br> GOLD effect: " + format(player.o.gold.times(25)) + "x to Idles gain"
	if (hasUpgrade("i", 13)) return "You have " + format(player.o.iron) + " Iron, " + format(player.o.copper) + " Copper, " + format(player.o.silver) + " Silver, " + format(player.o.gold) + " Gold, <br>"+ "Iron Effect: " + format(player.o.iron.pow(1.24).times(1.34).max(1).times(10).pow(1.2)) + "x to blueprint gain " + "<br> Copper Effect: " + format(player.o.copper.pow(0.85).times(2).times(10).pow(1.2)) + "x to point gain" + "<br> Silver Effect: " + format(player.o.silver.pow(85).times(2).pow(1.2)) + "x reducing cost of TE "
if (hasUpgrade("o", 31)) return "You have " + format(player.o.iron) + " Iron, " + format(player.o.copper) + " Copper, " + format(player.o.silver) + " Silver, " + format(player.o.gold) + " Gold, <br>"+ "Iron Effect: " + format(player.o.iron.pow(1.24).times(1.34).max(1).times(10)) + "x to blueprint gain " + "<br> Copper Effect: " + format(player.o.copper.pow(0.85).times(2).times(10)) + "x to point gain" + "<br> Silver Effect: " + format(player.o.silver.pow(85).times(2)) + "x reducing cost of TE "
	else return "You have " + format(player.o.iron) + " Iron, " + format(player.o.copper) + " Copper, " + format(player.o.silver) + " Silver, " + format(player.o.gold) + " Gold, <br>"+ "Iron Effect: " + format(player.o.iron.pow(1.24).times(1.34).max(1)) + "x to blueprint gain " + "<br> Copper Effect: " + format(player.o.copper.pow(0.85).times(2)) + "x to point gain" },	// Prestige currency exponent
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
            "clickables"
            ],
        },
		        "Quarry Shop": {
            content:[
                function() {if (player.tab == "o") return "main-display"},
            "prestige-button",
            function() {if (player.tab == "o") return "resource-display"},
            "blank",
            "upgrades"
            ],
        },
            },
					    effect() {
        if (!player.o.cd > 0)
            return new Decimal(0.2);
        let eff = new Decimal(1);
				if (hasUpgrade("o", 11)) eff = eff.times(upgradeEffect("o", 11))
        return eff;
    },
						    copeff() {
        if (!player.o.cd > 0)
            return new Decimal(0.1);
        let eff = new Decimal(0.1);
		if (hasUpgrade("o", 21)) eff = eff.times(2)
        return eff;
    },
							    sileff() {
        if (!player.o.cd > 0)
            return new Decimal(0.5);
        let eff = new Decimal(1);
				if (hasUpgrade("o", 14)) eff = eff.times(3)
        return eff;
    },
								    goldy() {
        if (!player.o.cd > 0)
            return new Decimal(3);
        let eff = new Decimal(3);
        return eff;
    },
									   plat() {
        if (!player.o.cd > 0)
            return new Decimal(0.01);
        let eff = new Decimal(0.01);
		if (hasUpgrade("o", 32)) eff = eff.times(5)
        return eff;
    },
							clickables: {
    11: {
		title: "<h2>Melt Iron</h2>",
        display() {
			return "Progress: " + format(player.o.cd) + " / 15s" + "<br> Requires: 1 Ore" + "<br> You generating " + format(tmp.o.effect.times(15)) + " Iron per melt"},
		canClick() { if (hasUpgrade("o", 22)) return false
		else if (player.o.cd == 0 && player.o.points.gte(1)) return true},
onClick() {
	 player.o.cd = 15
	 return player.o.points = player.o.points.sub(1)
},
		},
		    12: {
		title: "<h2>Melt Copper</h2>",
        display() {if (hasUpgrade("o", 21)) return "Progress: " + format(player.o.cd) + " / 30s" + "<br> Requires: 3 Ores" + "<br> You generating " + format(tmp.o.copeff.times(30)) + " Copper per melt"
			else return "Progress: " + format(player.o.cd) + " / 60s" + "<br> Requires: 3 Ores" + "<br> You generating " + format(tmp.o.copeff.times(60)) + " Copper per melt"},
		canClick() {if (hasUpgrade("o", 14)) return false
			else if (player.o.cd == 0 && player.o.points.gte(3)) return true},
		unlocked() {return hasUpgrade("o", 12)},
onClick() {
	 if (hasUpgrade("o", 21)) player.o.cd = 30
	 else player.o.cd = 60
	 return player.o.points = player.o.points.sub(3)
},
		},
				    13: {
		title: "<h2>Melt Silver</h2>",
        display() {if (hasUpgrade("o", 31)) return "Progress: " + format(player.o.cd) + " / 20s" + "<br> Requires: 20 Ores" + "<br> You generating " + format(tmp.o.sileff.times(20)) + " Silver per melt"
			else return "Progress: " + format(player.o.cd) + " / 2m" + "<br> Requires: 20 Ores" + "<br> You generating " + format(tmp.o.sileff.times(120)) + " Silver per melt"},
		canClick() { if (hasUpgrade("o", 23)) return false
		else if (player.o.cd == 0 && player.o.points.gte(20)) return true},
				unlocked() {return hasUpgrade("o", 31)},
onClick() {
	if (hasUpgrade("o", 13)) player.o.cd = 20
else player.o.cd = 120
	 return player.o.points = player.o.points.sub(20)
},
		},
						    14: {
		title: "<h2>Melt GOLD</h2>",
        display() {return "Progress: " + format(player.o.cd) + " / 2s" + "<br> Requires: 60 Ores" + "<br> You generating " + format(tmp.o.goldy.times(20)) + " GOLD per melt"},
		canClick() { if (hasUpgrade("o", 23)) return false
		if (player.o.cd == 0 && player.o.points.gte(60)) return true},
				unlocked() { return (hasUpgrade("i", 14))},
onClick() {
player.o.cd = 2
	 return player.o.points = player.o.points.sub(60)
},
		},
								    21: {
		title: "<h2>Melt PLATINUM</h2>",
        display() {return "Progress: " + format(player.o.cd) + " / 12s" + "<br> Requires: 0.7e9 Ores" + "<br> You generating " + format(tmp.o.plat.times(12)) + " PLATINUM per melt"},
		canClick() { if (player.o.cd == 0 && player.o.points.gte(.7e9)) return true},
				unlocked() { return (hasUpgrade("o", 24))},
onClick() {
player.o.cd = 12
	 return player.o.points = player.o.points.sub(0.7e9)
},
		},
    },
		upgrades: {
								11: {
			title: "Iron Quarry",
			description: "Boost Iron generating amount by unspent Iron",
			cost: new Decimal(9),
			unlocked() {return true},
			effect() {if (upgradeEffect("o", 11).gte(1000)) return player.o.sc
				else return player.o.iron.pow(0.25).times(player.o.iron).div(5)},
			effectDisplay() {return "" + format(upgradeEffect("o", 11)) + "x"},
						currencyDisplayName: "Iron", // Use if using a nonstandard currency
            currencyInternalName: "iron", // Use if using a nonstandard currency
            currencyLayer: "o",
	},
									12: {
			title: "Iron Quarry II",
			description: "Unlock new mine!",
			cost: new Decimal(30000),
			unlocked() {return true},
						currencyDisplayName: "Iron", // Use if using a nonstandard currency
            currencyInternalName: "iron", // Use if using a nonstandard currency
            currencyLayer: "o",
	},
										21: {
			title: "Copper Quarry I",
			description: "Divide the progress of melting by 2.00x",
			cost: new Decimal(6),
			unlocked() {return hasUpgrade("o", 12)},
						currencyDisplayName: "Copper", // Use if using a nonstandard currency
            currencyInternalName: "copper", // Use if using a nonstandard currency
            currencyLayer: "o",
	},
											22: {
			title: "Copper Quarry II",
			description: "Now you can passively gain Iron with the same effect as in Melt Iron.",
			cost: new Decimal(25),
			unlocked() {return hasUpgrade("o", 12)},
						currencyDisplayName: "Copper", // Use if using a nonstandard currency
            currencyInternalName: "copper", // Use if using a nonstandard currency
            currencyLayer: "o",
											},
											31: {
			title: "Prestige Quarry I",
			description: "Unlock next mine and 10.00x to Iron and Copper Effects",
			cost: new Decimal(10),
			unlocked() {return hasUpgrade("o", 12)},
				style() {
					return {
						"width": "240px"
					}
				},
	},
												32: {
			title: "Prestige Quarry II",
			description: "Spaceshift platinum and made boost 5.00x stronger",
			cost: new Decimal(0.5),
			unlocked() {return hasUpgrade("o", 24)},
				style() {
					return {
						"width": "240px"
					}
				},
										currencyDisplayName: "Platinum", // Use if using a nonstandard currency
            currencyInternalName: "platinum", // Use if using a nonstandard currency
            currencyLayer: "o",
	},
												13: {
			title: "Silver Quarry I",
			description: "Set the Melt Silver progress time to 20 secs, but reduce Silver production by 2.00x",
			cost: new Decimal(30),
			unlocked() {return hasUpgrade("o", 12)},
						currencyDisplayName: "Silver", // Use if using a nonstandard currency
            currencyInternalName: "silver", // Use if using a nonstandard currency
            currencyLayer: "o",
											},
					14: {
			title: "Silver Quarry II",
			description: "After buying this upgrade you cant Melt Iron and Copper. Boost Silver producing by Mines amount (3.00x) and auto-produce iron and copper",
			cost: new Decimal(30),
			unlocked() {return hasUpgrade("o", 12)},
						currencyDisplayName: "Silver", // Use if using a nonstandard currency
            currencyInternalName: "silver", // Use if using a nonstandard currency
            currencyLayer: "o",
											},
																23: {
			title: "GOLD Quarry I",
			description: "After buying this upgrade you cant Melt Silver and GOLD. Auto-produce gold",
			cost: new Decimal(500000000),
			unlocked() {return hasUpgrade("o", 12)},

											},
																											24: {
			title: "GOLD Quarry II",
			description: "Remove all the layers except I and O but unlock last mine",
			cost: new Decimal(1000),
			unlocked() {return hasUpgrade("o", 12)},
									currencyDisplayName: "Gold", // Use if using a nonstandard currency
            currencyInternalName: "gold", // Use if using a nonstandard currency
            currencyLayer: "o",

											},
		},
	    update(diff) {
					    if (player.o.cd > 0) player.o.cd = Math.max(0, player.o.cd - diff) 
		
			if (hasUpgrade("o", 24) && player.o.cd > 0)	return player.o.platinum = player.o.platinum.add(tmp.o.plat.times(diff))
	
					if (hasUpgrade("o", 23) && player.o.cd <= 0)  {
player.o.copper = player.o.copper.add(tmp.o.copeff.times(diff))	
player.o.iron = player.o.iron.add(tmp.o.effect.times(diff))
player.o.gold = player.o.gold.add(tmp.o.goldy.times(diff))
player.o.silver = player.o.silver.add(tmp.o.sileff.times(diff))
				}
	
				if (hasUpgrade("o", 14) && player.o.cd <= 0)  {
player.o.copper = player.o.copper.add(tmp.o.copeff.times(diff))	
player.o.iron = player.o.iron.add(tmp.o.effect.times(diff))
				}
	
		if (hasUpgrade("i", 14) && player.o.cd > 0)	return player.o.gold = player.o.gold.add(tmp.o.goldy.times(diff))
	
	if (hasUpgrade("o", 31) && player.o.cd > 0)	return player.o.silver = player.o.silver.add(tmp.o.sileff.times(diff))	
	
	if (hasUpgrade("o", 22) && player.o.cd > 0)	return player.o.copper = player.o.copper.add(tmp.o.copeff.times(diff))	

		
			if (hasUpgrade("o", 22) && player.o.cd <= 0) return player.o.iron = player.o.iron.add(tmp.o.effect.times(diff))	
				
if (player.o.cd > 0 && hasUpgrade("o", 12))  return player.o.copper = player.o.copper.add(tmp.o.copeff.times(diff))	

if (player.o.cd > 0 && player.o.cd < 60)  return player.o.iron = player.o.iron.add(tmp.o.effect.times(diff))		
		},
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "o: Reset for Ores", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
									passiveGeneration() {
  },
    layerShown(){if (player.tre.points.gte(1)) return "ghost"
		else return (player.te.buyables[11].gte(4))}
})
addLayer("i", {
    name: "Idles", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		eff: new Decimal(1),
		bp: new Decimal(0),
		cd: new Decimal(0),
		iron: new Decimal(0),
		gold: new Decimal(0),
		sc: new Decimal(1000),
		copper: new Decimal(0),
		silver: new Decimal(0),
		platinum: new Decimal(0),
    }},
    color: "violet",
    requires: new Decimal(1e45),
branches: ["p"],	// Can be a function that takes requirement increases into account
    resource: "Idles",
    baseResource: "points",
effectDescription() {return "<br><h2>IN DEV</h2>"},	// Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.001,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade("i", 11)) mult = mult.mul(player.te.points).max(1)
		if (hasUpgrade("i", 12)) mult = mult.mul(5)
		if (hasUpgrade("i", 13)) mult = mult.div(mult)
					if (player.o.gold.gte(1)) mult = mult.mul(player.o.gold.times(25))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
		    tabFormat: {
        "Idles": {
            content:[
                function() {if (player.tab == "i") return "main-display"},
            function() {if (player.tab == "i") return "resource-display"},
            "blank",
            "upgrades"
            ],
        },
            },
			upgrades: {
															11: {
			title: "11",
			description: "So... TE amount boost Idles gain",
			cost: new Decimal(20),
			unlocked() {return true},
											},
																		12: {
			title: "12",
			description: "Take a little useless boost (5.00x to Idles gain)",
			cost: new Decimal(560),
			unlocked() {return hasUpgrade("i", 11)},
											},
																	13: {
			title: "13",
			description: "Take a break and spend all of your Idles to this upgrade... But boost all of Mines effects by ^1.2",
			cost() {return player.i.points},
			unlocked() {return hasUpgrade("i", 12)},
											},
																		14: {
			title: "14",
			description: "Yeah... That was rude. Unlock a new mine",
			cost: new Decimal(60),
			unlocked() {return hasUpgrade("i", 13)},
											},
				21: {
			title: "DESTRUCTION",
			description: "BOOSTS YOUR POINT GAIN BY INFINITY",
			cost: new Decimal(17800),
			unlocked() {return hasUpgrade("i", 14)},
											},
			},
												passiveGeneration() {
 return (player.points.gte(1e53)?1:1)
												},
			    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "i: Reset for Idles", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){if (player.tre.points.gte(1)) return "ghost"
		else return (player.te.buyables[11].gte(5))}
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
		if (hasUpgrade("m", 32)) mult = mult.div(1e150)
			if (player.o.silver.gte(1)) mult = mult.div(player.o.silver.pow(85).times(2))
				if (hasUpgrade("i", 13)) mult = mult.div(player.o.silver.pow(45).times(1.2))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
		        exp = new Decimal(1)
					return exp
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
            ["buyable", 12],
			["buyable", 13]
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
        cost(x) { return new Decimal(4).times(x)},
		purchaseLimit: 10,
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
        cost(x) { return new Decimal(100000).times(x)},
		purchaseLimit: 2,
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>Automate PP</b></h2> <br>" + "Cost: " + format(data.cost) + " Deltas <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "<br>Automate PP layer"},
        canAfford() { return player.d.points.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player.d.points = player.d.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		unlocked() {return hasMilestone("te", 4)},
    },
		    13: {
        cost(x) { return new Decimal(1).times(x)},
		purchaseLimit: 2,
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>Automate D and M</b></h2> <br>" + "Cost: " + format(data.cost) + " Ores <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "<br>Automate D and M layer"},
        canAfford() { return player.o.points.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player.o.points = player.o.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		unlocked() {return hasMilestone("te", 4)},
    },
	},
    row: "side", // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "e: Reset for Extreension", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){if (player.tre.points.gte(1)) return "ghost"
		else return true}
})

addLayer("tre", {
    name: "treeextension", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "TE", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "white",
    requires: new Decimal(1e308), // Can be a function that takes requirement increases into account
    resource: "Tree Extreensions", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	    tabFormat: {
        "Milestones": {
        content:[
            function() {if (player.tab == "tre") return "main-display"},
            "prestige-button",
            function() {if (player.tab == "tre") return "resource-display"},
            "blank",
            "milestones"
            ]
        },
            },
	milestones: {
    0: {
        requirementDescription: "1 Extreensions",
        effectDescription: "Just start a game with only new one layer",
        done() { return player.tre.points.gte(1) }
    },
},
		    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "x", description: "x: Reset for Xtreension", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
})

addLayer("n", {
    name: "Nothings", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "N", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		eff: new Decimal(1),
		auto: true,
    }},
    color: "gray",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Nothings", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5,	// Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (player.points.gte(10)) mult = mult.mul(player.n.points.div(2)).max(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
		    tabFormat: {
        "Nothing": {
        content:[
            function() {if (player.tab == "n") return "main-display"},
            "prestige-button",
            function() {if (player.tab == "n") return "resource-display"},
            "blank",
            ['bar', 'bigBar'],
			"blank",
			['bar', 'collapse']
            ]
            },
			        "Something": {
        content:[
            function() {if (player.tab == "n") return "main-display"},
            function() {if (player.tab == "n") return "resource-display"},
            "blank"
            ]
            },
			},
			bars: {
				    bigBar: {
        direction: RIGHT,
        width: 400,
        height: 30,
        progress() { return player.points.div(10) },
		display() {return "Until an Overload"},
		fillStyle() {
			return {
			'background-color':'gray'
			}
		},	
    },
					    collapse: {
        direction: RIGHT,
        width: 400,
        height: 30,
        progress() { return player.n.points.div(1000) },
		display() {return "Until collapsing something"},
		fillStyle() {
			return {
			'background-color':'gray'
			}
		},	
    },
			},
	upgrades: {
		11: {
			title: "11",
			description: "Unspent Prestige Points boosts point gain",
			cost: new Decimal(4),
			unlocked() {return hasMilestone("tre", 1)},
		},
	},
    		doReset(resettingLayer) {
			if (layers[resettingLayer].row <= layers[this.layer].row) return
			let keep = [];
			 if (player.te.buyables[12].gte(2)) keep.push("buyables");
			             layerDataReset("n", keep)
		},
		    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "n", description: "n: Reset for Nothing", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasMilestone("tre", 0))},
})