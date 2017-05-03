var request = require("request");
var inquirer = require("inquirer");
var Entities = require("html-entities").AllHtmlEntities;

var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard.js");
var prompts = require("./prompts");


var basicCardArray = [];
var entities = new Entities(); // api passes back html special characters

promptUser(prompts.gameType,function(result) {
    var num ={};

    if(result["Start Game"] === "Basic Card") {
        promptUser(prompts.cardOptions,function(option){
            if(option["Card Option"] === "Play premade game") {
                promptUser(prompts.numQuestions,function(numQuest) {
                    cardBasicPlay(numQuest["questionNum"]);
                });
            }
             else {
                 promptUser(prompts.numQuestions, function(numQuest) {
                     //cardBasicBuild(numQuest["questionNum"]);
                     cardBasicBuild(1);
                 });
            }
        });
    }
    else {
        promptUser(prompts.cardOptions,function(option){
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
    if(basicCardArray.length === 0) {
        request("https://opentdb.com/api.php?amount="+num, function (error, response, body) {
            if(error) {
                return;
            }
            var result = JSON.parse(body).results;
            console.log(result);

            for (var question in result) {
                var buildCard = BasicCard();
                buildCard.front = entities.decode(result[question].question);
                buildCard.back = entities.decode(result[question].correct_answer);

                basicCardArray.push(buildCard);
            }
        });
    }
}

function runCards(inc) {
    console.log("what are you "+inc);
    if(inc < basicCardArray.length) {
        console.log(basicCardArray[inc].front);
        promptUser(prompts.showFront,function(cardOptions) {
            if(cardOptions["showFront"] === "Show answer") {
                console.log(basicCardArray[inc].back)
                promptUser(prompts.showBack,function(cardOptions) {
                    if(cardOptions["showBack"] === "Next card") {
                        runCards(inc+1);
                    }
                    else {
                        runCards(inc);
                    }
                });
            }
            else {
                runCards(inc+1);
            }
        });
    }
    else {
        console.log("No more cards found");
    }
}

function cardBasicBuild(totalQuestions) {
        var buildCard = BasicCard();
        if(totalQuestions > 0 ) {
            promptUser(prompts.buildCardFront, function(front) {
                buildCard.front = front["CardFront"];
                promptUser(prompts.buildCardBack, function(back) {
                    buildCard.back = back["CardBack"];
                    basicCardArray.push(buildCard);
                    cardBasicBuild(totalQuestions-1);
                });
            });
        }
        else {
            promptUser(prompts.readyToPlay,function(isReady) {
                console.log(isReady);
                if(isReady["ready"]) {
                    runCards(0);
                }
            });
        }
}
