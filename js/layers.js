addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
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
		if (hasUpgrade("p", 21)) mult = mult.mul(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	upgrades: {
		11: {
			title: "11",
			description: "Unspent Prestige Points boosts point gain",
			cost: new Decimal(4),
			effect() {if (hasUpgrade("p", 25)) return player.p.points.pow(0.22).max(1.15).times(4)
if (hasUpgrade("p", 15)) return player.p.points.pow(0.22).max(1.15).times(2)
				else return player.p.points.pow(0.22).max(1.15)},
			effectDisplay() {return "" + format(upgradeEffect("p", 11)) + "x"},
			unlocked() {return hasMilestone("te", 1)},
		},
				12: {
			title: "12",
			description: "Points boost themselves gain",
			cost: new Decimal(8),
			effect() {if (hasUpgrade("p", 25)) return player.points.pow(0.16).max(1).times(4)
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
			effect() {if (hasUpgrade("p", 25)) return player.te.points.pow(1.22).max(1).times(4)
if (hasUpgrade("p", 15)) return player.te.points.pow(1.22).max(1).times(2)
				else return player.te.points.pow(1.22).max(1)},
			effectDisplay() {return "" + format(upgradeEffect("p", 14)) + "x"},
			unlocked() {return hasMilestone("te", 1)},
		},
					15: {
			title: "15",
			description: "Twice 11, 12, 14 upgrades effects",
			cost: new Decimal(32),
			effectDisplay() { if (hasUpgrade("p", 25)) return "4.00x"
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
			unlocked() {return hasMilestone("te", 2)},
		},
		23: {
			title: "23",
			description: "Replace  the 1.25x <b>21</b> dividing effect. 1.25x => 0.75",
			cost: new Decimal(1780),
			unlocked() {return hasMilestone("te", 2)},
		},
24: {
			title: "24",
			description: "Power up passive Prestige point gain up to 25%",
			cost: new Decimal(4200),
			unlocked() {return hasMilestone("te", 2)},
		},
25: {
			title: "25",
			description: "Power up <b>15</b> effect",
			cost: new Decimal(9450),
			unlocked() {return hasMilestone("te", 2)},
		},
	},
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
									passiveGeneration() {	
if (hasUpgrade("p", 24)) return (hasUpgrade("p", 24)?.25:0)
else return (hasUpgrade("p", 22)?.1:0)
  },
    layerShown(){return true}
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
    exponent: 2.6, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
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
        effectDescription: "Unlock 3 new Prestige Point upgrades in 1st column",
        done() { return player.te.points.gte(3) }
    },
},
    row: "side", // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})