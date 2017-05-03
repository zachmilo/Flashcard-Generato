var inquirer = require("inquirer");
var gameType = {
    type:"list",
    name:"Start Game",
    message:"Please select from the following:",
    choices:["Basic Card","Cloze Card"]
}
var numQuestions = {
    type:"list",
    name:"questionNum",
    message: "Please select the number of questions to be asked:",
    choices:["10","20","30","40","50"]
}

var cardOptions = {
    type: "list",
    name: "Card Option",
    message:"Please Select from the following options:",
    choices: ["Play premade game","Build your own cards"]
}

var buildCardFront = {
    type: "input",
    name:"CardFront",
    message:"Please supply the question:"
}

var buildCardBack = {
    type: "input",
    name:"CardBack",
    message:"Please supply the answer:"
}

var readyToPlay = {
    type:"confirm",
    name:"ready",
    message:"ready to play? If you say NO cards will be destroyed"
}

var showFront = {
    type:"list",
    name:"showFront",
    message:"Please select from the following",
    choices:["Show answer","Next card"]
}

var showBack = {
    type:"list",
    name:"showBack",
    message:"Please select from the following",
    choices:["show Question", "Next card"]
}

module.exports = {
    gameType,
    numQuestions,
    cardOptions,
    buildCardFront,
    buildCardBack,
    readyToPlay,
    showFront,
    showBack

}
