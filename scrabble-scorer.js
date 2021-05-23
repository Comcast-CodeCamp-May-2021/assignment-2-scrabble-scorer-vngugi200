// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.clear()
   let returnedWord =input.question("Let's play some scrabble! Enter a word:");
   return (returnedWord)
};

//simpleScore: Define a function that takes a word as a parameter and returns a numerical score. Each letter within the word is worth 1 point.
function simpleScore(word){
  let totalScore = 0
for (let i = 0; i < word.length; i++){  
//for(let letter of word.toUpperCase()) { this only scores if the word is in uppercase. removed that and put the for loop above
  //if (word.includes(letter))
  totalScore += 1

}
return totalScore
}
//console.log(simpleScore())

//Define a function that takes a word as a parameter and returns a score. Each vowel within the word is worth 3 points, and each consonant is worth 1 point.

function vowelBonusScore (word){
  let score = 0;
  let vowels = ["a","e","i","o","u"]
  for (let i = 0; i < word.length; i++){   
    if (vowels.includes(word[i])) {
      score += 3;
    } else { 
      score += 1
    } 
  }
  return score;
}

let scrabbleScore;

let simpleScoreObject = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scoreFunction: simpleScore
};

let vowelBonusScoreObject = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scoreFunction: vowelBonusScore
};

let scrabbleScoreObject = {
  name: "Scrabble Scoring",
  description: "The traditional scoring algorithm.",
  scoreFunction: oldScrabbleScorer 
};


//Finish writing the scoringAlgorithms array. It should be populated with three objects, one for each of the three scoring options. Each object should contain three keys: name, description, and scorerFunction.
const scoringAlgorithms = [simpleScoreObject,vowelBonusScoreObject, scrabbleScoreObject];

function scorerPrompt(word) {
  let finalScore = Number(input.question(`Which scoring algorithm would you like to use?

0 - Simple Score: Each letter is worth 1 point.
1 - Bonus Vowels: Vowels are worth 3 pts, and consonants are 1 pt.
2 - Scrabble: The traditional scoring algorithm.

Enter 0, 1, or 2:`));

  if (finalScore === 0) {
        console.log("algorithm name: ", scoringAlgorithms[0].name);
        console.log(word);
        console.log("scorerFunction result:", scoringAlgorithms[0].scoreFunction(word));
  } else if (finalScore === 1) {
console.log("algorithm name: ",  scoringAlgorithms[1].name);
        console.log(word);
        console.log("scorerFunction result: ", scoringAlgorithms[1].scoreFunction(word));
  } else { (finalScore === 2) 
console.log("algorithm name: ", scoringAlgorithms[2].name);
        console.log(word);
        console.log("scorerFunction result: ", scoringAlgorithms[2].scoreFunction(word));
  }
}
let newPointStructure = transform(oldPointStructure);

/* have empty object to hold new keys:values
loop across keys in old object to access array of values
      loop across each letter in the array of values

  add to new object -> key (each letter) : old key
  
** in objects chapter - how to add a new property to an object.

  1: ["a", "b"]
  transform into 
  a : 1
  b : 1
 */
function transform(letters) {
  let points = {};
   for(let key in letters){
    //console.log(letters[key]); // array of letters
   let oldLetters = letters[key];
   for(let i = 0; i< oldLetters.length; i++){
     points[oldLetters[i]]= key;
     
   }
  }
  //*** This hould be a return points instead of a console log. A retunr statement literally returns the value to the system to be utilized elsewhere. It was printing the letters over and over the culprit was this console log statement in addition to calling the transform in thr runProgram. 
  // console.log(points)
  return points
}  

function runProgram() {
  console.clear();
  let userWord = initialPrompt();
  scorerPrompt(userWord);
  // *** you also don't need to call this transform function in your run program. That's handled by the let newPointStructure = transform(oldPointStructure) that's above. This is also why it was printing every time you tested a word. 
  // transform(oldPointStructure);
  vowelBonusScore(userWord)
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

