var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");
var prompts = require("./prompts");
var request = require("request");

var basicCardArray = [];

promptUser(prompts.gameType,function(result) {
    var num ={};

    if(result["Start Game"] === "Basic Card") {
        promptUser(prompts.CardOptions,function(option){
            if(option["Card Option"] === "Play premade game") {
                promptUser(prompts.numQuestions,function(numQuest) {
                    cardBasicPlay(numQuest["questionNum"]);
                });
            }
            // else {
            //     cardBasicBuild();
            // }
        });
    }
    else {
        promptUser(prompts.CardOptions,function(option){
            if(option["Card Option"]=== "Play premade game") {

                promptUser(prompts.numQuestions,function(numQuest){num = numQuest});
                cardClozePlay(num);
            }
            else {
                cardClozeBuild();
            }
        });

    }
});

function promptUser(promptType, callback) {
    inquirer.prompt(promptType).then(function (answers) {
        callback(answers);
    });

}

function cardBasicPlay(num) {
    request("https://opentdb.com/api.php?amount="+num, function (error, response, body) {
        //console.log('body:', body); // Print the HTML for the Google homepage.
        // build question array
        if(error) {
            return
        }
        var result = JSON.parse(body).results;
        console.log(result);

        for (var question in result) {
            var buildCard = BasicCard();
            buildCard.front = result[question].question;
            buildCard.back = result[question].correct_answer;

            basicCardArray.push(buildCard);
        }
        console.log(basicCardArray);
        // promptUser("buildquestion",function(){
        //
        // });
    });
    //https://opentdb.com/api.php?amount=9
}

function cardBasicBuild() {

}
