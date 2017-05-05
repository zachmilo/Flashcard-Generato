var request = require("request");
var inquirer = require("inquirer");
var Entities = require("html-entities").AllHtmlEntities;

var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard.js");
var prompts = require("./prompts");


var basicCardArray = [];
var clozeCardArray = [];
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
                     cardBasicBuild(numQuest["questionNum"]);
                 });
            }
        });
    }
    else {
        promptUser(prompts.ClozeCardOptions,function(option){
            promptUser(prompts.numQuestions,function(numQuest) {
                cardClozeBuild(numQuest["questionNum"]);
            });

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

            for (var question in result) {
                var buildCard = BasicCard();
                buildCard.front = entities.decode(result[question].question);
                buildCard.back = entities.decode(result[question].correct_answer);

                basicCardArray.push(buildCard);
            }
            runCards(0);
        });
    }
}

function runCards(inc) {

    if(inc < basicCardArray.length) {
        console.log("\nQuestion: "+basicCardArray[inc].front+"\n");
        promptUser(prompts.showFront,function(cardOptions) {
            if(cardOptions["showFront"] === "Show answer") {
                console.log("\nAnswer: "+basicCardArray[inc].back+"\n")
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
                if(isReady["ready"]) {
                    runClozeCards(0);
                }
            });
        }
}

function cardClozeBuild(totalQuestions) {
    var buildCard = ClozeCard();
    if(totalQuestions > 0 ) {
        promptUser(prompts.cloze, function(cloze) {
            buildCard.cloze = cloze["cloze"];
            promptUser(prompts.partial, function(partial) {
                buildCard.partial = partial["partial"];
            });
            promptUser(prompts.fullText, function(fullText) {
                buildCard.fullText = fullText["fullText"];
                clozeCardArray.push(buildCard);
                cardClozeBuild(totalQuestions-1);
            });
        });
    }
    else {
        promptUser(prompts.readyToPlay,function(isReady) {
            if(isReady["ready"]) {
                runClozeCards(0);
            }
        });
    }
}

function runClozeCards(inc) {

    if(inc < clozeCardArray.length) {
        console.log("\nQuestion: "+clozeCardArray[inc].partial+"\n");
        promptUser(prompts.showFront,function(cardOptions) {
            if(cardOptions["showFront"] === "Show answer") {
                console.log("\nCloze: "+clozeCardArray[inc].cloze+"\n")
                console.log("Full text: "+clozeCardArray[inc].fullText+"\n")
                promptUser(prompts.showBack,function(cardOptions) {
                    if(cardOptions["showBack"] === "Next card") {
                        runClozeCards(inc+1);
                    }
                    else {
                        runClozeCards(inc);
                    }
                });
            }
            else {
                runClozeCards(inc+1);
            }
        });
    }
    else {
        console.log("No more cards found");
    }
}
