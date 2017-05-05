// var ClozeCard = function(text,cloze) {
//     //cloze is the  back of the card for example George Wash
//     //
//     partial = "..... was first president of the united states";
//     fullText ="George was the president of the united states";
// }
var ClozeCard = function(text, cloze, partial){
  if (this instanceof ClozeCard){
    this.fullText = text;
    this.cloze = cloze;
    this.partial = partial;
  } else {
    return new ClozeCard(text, cloze,partial);
  }
}

module.exports = ClozeCard;
