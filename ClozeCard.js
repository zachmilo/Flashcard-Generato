// var ClozeCard = function(text,cloze) {
//     //cloze is the  back of the card for example George Wash
//     //
//     partial = "..... was first president of the united states";
//     fullText ="George was the president of the united states";
// }
var ClozeCard = function(text, cloze){
  if (this instanceof ClozeCard){
    this.name = name;
    this.age = age;
    this.job = job;
  } else {
    return new ClozeCard(text, cloze);
  }
}

module.exports = ClozeCard;
