let modInfo = {
	name: "The Extension Tree",
	id: "exttree",
	author: "seder3214",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.242",
	name: "Xtreensions!",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.095</h3><br>
<h2>I believe that I don't use it...</h2>.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	let gain = new Decimal(1)
	if (hasMilestone("te", 0)) gain = gain.times(2)
	if (hasUpgrade("p", 11)) gain = gain.times(upgradeEffect("p", 11))
		if (hasUpgrade("p", 12)) gain = gain.times(upgradeEffect("p", 12))
	if (hasUpgrade("p", 13)) gain = gain.times(upgradeEffect("p", 13))
	if (hasUpgrade("p", 14)) gain = gain.times(upgradeEffect("p", 14))
	if (hasUpgrade("p", 21)) gain = gain.div(1.25)
if (hasUpgrade("p", 23)) gain = gain.div(.5)
	if (hasUpgrade("d", 22)) gain = gain.times(player.p.points.pow(0.02).times(player.d.points.pow(0.02))).max(2)
		if (player.o.copper.gte(1)) gain = gain.times(player.o.iron.pow(1.24).times(1.34).max(1))
				if (hasUpgrade("o", 31)) gain = gain.times(10)
									if (hasUpgrade("i", 13)) gain = gain.pow(1.2)
if (player.tre.points.gte(1)) gain = gain.div(gain)
if (hasUpgrade("n", 11) && player.n.points.lte(player.n.cc.times(upgradeEffect("n", 13)).times(upgradeEffect("n", 14)))) gain = gain.times(player.n.points.pow(0.55).times(upgradeEffect("n", 22)).max(1))
	if (hasUpgrade("n", 23)) gain = gain.times(player.n.sm.pow(0.45))
		if (hasUpgrade("n", 24)) gain = gain.times(player.n.sm.pow(0.95).min(player.n.oc.times(upgradeEffect("n", 21))).pow(2))
		if (hasUpgrade("n", 31)) gain = gain.times(upgradeEffect("n", 31))
			if (hasMilestone("n", 0)) gain = gain.times(1e50)
			if (hasMilestone("n", 1)) gain = gain.times(1e50)
						if (hasMilestone("n", 1)) gain = gain.times(player.points).max(1)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
function() {
	if (hasUpgrade("m", 14)) {
	return "Base Incremency formula: " + format(player.p.points.pow(0.02).times(player.d.points.pow(0.02)).times(player.m.points.pow(0.78)).max(1)) + "x"
}
else if (hasUpgrade("d", 22)) {
	return "Base Incremency formula: " + format(player.p.points.pow(0.02).times(player.d.points.pow(0.02)).max(1)) + "x"
}
}
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}