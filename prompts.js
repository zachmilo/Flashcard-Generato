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


module.exports = {
    gameType,
    testMe
}
