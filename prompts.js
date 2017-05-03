var inquirer = require("inquirer");
var gameType = {
    type:"list",
    name:"Start Game",
    message:"Please select from the following",
    choices:["Basic Card","Cloze Card"]
}
var numQuestions = {
    type:"list",
    name:"questionNum",
    message: "Please select the number of questions to be asked",
    choices:["10","20","30","40","50"]
}

var CardOptions = {
    type: "list",
    name: "Card Option",
    message:"Please Select from the following options",
    choices: ["Play premade game","Build your own cards"]
}


module.exports = {
    gameType,
    numQuestions,
    CardOptions
}
