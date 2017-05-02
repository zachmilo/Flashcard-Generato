var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");
var prompts = require("./prompts")

var test = BasicCard("asljdlfk","bjack");

promptUser(prompts.gameType,function(result) {
    var num ="";
    promptUser(prompts.testMe,function(numQuest){num = numQuest});
    if(result["Start Game"]==="Basic Card") {
            cardBasic(num);
        }
        else {
            cardCloze();
        }
});



function promptUser(promptType, callback) {
    inquirer.prompt(promptType).then(function (answers) {
        callback(answers);
    });

}

function cardBasic() {
    request("https://opentdb.com/api.php?amount="+num, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        // build question array
        for (var questnum = 0; questnum < array.length; i++) {
            array[i]
        }
        promptUser("buildquestion",function(){

        });
    });

    //https://opentdb.com/api.php?amount=9
}
