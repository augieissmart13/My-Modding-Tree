addLayer("a", {
    name: "alpha", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "\u03b1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ff5555",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "alpha", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.75, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (tmp.b && tmp.b.effect) {
        mult = mult.times(tmp.b.effect)
        }
        if(hasUpgrade('b',12)) mult = mult.times(1.5)
        if(hasUpgrade('b',14)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for alpha", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Not Good",
            description: "+50% point gain",
            cost: new Decimal(1)
        },
        12: {
            title: "Slightly Better",
            description: "+75% point gain",
            cost: new Decimal(2)
        },
        13: {
            title: "Much Better",
            description: "x2 point gain",
            cost: new Decimal(4)
        },
        14: {
            title: "Now We're Getting Somewhere",
            description: "x2.5 point gain",
            cost: new Decimal(8)
        },
        21: {
            title: "Maybe A Little Excessive",
            description: "x3 point gain",
            cost: new Decimal(20)
        },
        22: {
            title: "Unreasonable",
            description: "x3.5 point gain",
            cost: new Decimal(60)
        },
        23: {
            title: "This Is Getting Out Of Hand",
            description: "x4 point gain",
            cost: new Decimal(200)
        },
        24: {
            title: "WHAT",
            description: "x5 point gain and unlock a new layer",
            cost: new Decimal(800)
        },
        31: {
            title: "A New Beginning!",
            description: "x7.5 point gain",
            cost: new Decimal(5000),
            unlocked() {return hasUpgrade('b',11)}
        },
        32: {
            title: "More New Beginnings!",
            description: "x10 point gain",
            cost: new Decimal(50000),
            unlocked() {return hasUpgrade('b',11)}
        },
        33: {
            title: "Is This Too Much?",
            description: "x13 point gain",
            cost: new Decimal(750000),
            unlocked() {return hasUpgrade('b',11)}
        },
        34: {
            title: "Completely Unnecessary",
            description: "x20 point gain",
            cost: new Decimal(15000000),
            unlocked() {return hasUpgrade('b',11)}
        },
        41: {
            title: "Utterly Pointless",
            description: "x30 point gain",
            cost: new Decimal(500000000),
            unlocked() {return hasUpgrade('b',13)}
        },
        42: {
            title: "Why Does This Exist?",
            description: "x40 point gain",
            cost: new Decimal(20000000000),
            unlocked() {return hasUpgrade('b',13)}
        },
        43: {
            title: "Why Does The Universe Exist?",
            description: "x50 point gain",
            cost: new Decimal(1000000000000),
            unlocked() {return hasUpgrade('b',13)}
        },
        44: {
            title: "The Finale?",
            description: "x100 point gain",
            cost: new Decimal(1000000000000000),
            unlocked() {return hasUpgrade('b',14)}
        },
    },
    effect() {
        return player[this.layer].points.add(1).pow(0.35) 
    },
    effectDescription() { 
        return "which boosts point generation by x" + format(tmp[this.layer].effect) 
    },
    
}),
addLayer("b", {
    name: "beta", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "\u03b2", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffaa55",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "beta", // Name of prestige currency
    baseResource: "alpha", // Name of resource prestige is based on
    baseAmount() {return player.a.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: ["a"],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for beta", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade('a', 24) || player[this.layer].points.gt(0) },
    effect() {
        return player[this.layer].points.add(1).pow(0.3) 
    },
    effectDescription() { 
        return "which boosts alpha generation by x" + format(tmp[this.layer].effect) 
    },
    upgrades: {
        11: {
            title: "A New Boost!",
            description: "x2.5 point gain and unlock some new alpha upgrades",
            cost: new Decimal(1)
        },
        12: {
            title: "Double Boost",
            description: "x5 point gain and x1.5 alpha gain",
            cost: new Decimal(10)
        },
        13: {
            title: "Decapoints!",
            description: "x10 point gain and unlock even more new alpha upgrades",
            cost: new Decimal(200)
        },
        14: {
            title: "Icosapoints!",
            description: "x20 point gain, x2 alpha gain, and unlock a secret",
            cost: new Decimal(6000)
        },
    }
})