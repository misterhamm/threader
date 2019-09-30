var textArea = document.getElementById('og-tweet');
var tweetCount = 0;
var totalTweets = 0;
var tweetCountTemplate = '(1 of 1)';
var charToRemove = tweetCountTemplate.length;

function liveUpdate() {
  
  var inputVal = textArea.value;
  var rawTweetCount = inputVal.length / 280;

  if (rawTweetCount >= 10) {
    charToRemove = charToRemove + 1;
  }

  var characterCount = inputVal.length + charToRemove;
  var tweetFraction = characterCount / 280;
  var tweetCalc = Math.ceil(tweetFraction);

  if (inputVal.length === 0) {
    document.getElementById('tweet-count').classList = '';
    totalTweets = 0;
  }
  else {
    document.getElementById('tweet-count').textContent = `You're currently at ${tweetCalc} tweet${tweetCalc > 1 ? 's' : ''}`;
    document.getElementById('tweet-count').classList = 'visible';
    totalTweets = tweetCalc;
  }
}
textArea.addEventListener('keyup', liveUpdate);


// modStr.forEach(function(word, i){
//   var wordLength = word.length + 1;
//   testCharCount += wordLength;
  
//   if (testCharCount <= 280 && i != modStr.length - 1) {
//     outputStr += word + ' ';
//   }
//   else if (testCharCount <= 280 && i == modStr.length - 1) {
//     outputStr += word + ' ';
//     console.log(outputStr );
//     testCharCount = 0;
//     outputStr = word + ' ';
//   }
//   else {
//     console.log(outputStr );
//     testCharCount = 0;
//     outputStr = word + ' ';
//   }
// })



document.getElementById('submit').onclick = function() {
  document.getElementById('output').innerHTML = '';
  
  var charCount = 0;
  var outputStr = '';

  if (totalTweets === 0) {
    var audio = new Audio('23.mp3');
    audio.play();
  }


  // Turn whole text value into a word array
  var rawTextArr = textArea.value.split(' ');
  var currTweetNo = 1;

  // Loop through word array
  rawTextArr.forEach(function(word, i){
    var wordLength = word.length + 1;
    charCount += wordLength;
    var tweetCounter = `... (${currTweetNo} of ${totalTweets})`;
    var currCharToRemove = tweetCounter.length;
    
    // If we're under 280 and it isn't the last word just add it to the current tweet
    if (charCount + currCharToRemove <= 280 && i != rawTextArr.length - 1) {
      outputStr += word + ' ';
    }
    // If we're under 280 and it is the last word add it to the current tweet and print
    else if (charCount + currCharToRemove <= 280 && i == rawTextArr.length - 1) {
      outputStr += word;
      var finalOutput = `<li class="tweet"><span id="copy-confirm">copied!</span><p>${outputStr}${tweetCounter}</p><button onclick="copyTweet(${currTweetNo - 1})">copy tweet</button></li>`;
      document.getElementById('output').innerHTML += finalOutput;
    }
    else if (charCount + charToRemove > 280) {
      var finalOutput = `<li class="tweet"><span id="copy-confirm">copied!</span><p>${outputStr}${tweetCounter}</p><button onclick="copyTweet(${currTweetNo - 1})">copy tweet</button></li>`;
      document.getElementById('output').innerHTML += finalOutput;
      charCount = 0;
      currTweetNo = currTweetNo + 1;
      outputStr = word + ' ';
    }
  });
  
  // for (var i = 0; i < totalTweets; i++) {
  //   var outputItems = document.getElementsByTagName('p');
  //   var currCharToRemove = charToRemove;

  //   if (i + 1 < 10) {
  //     currCharToRemove = charToRemove;
  //   }
  //   else {
  //     currCharToRemove = charToRemove + 1;
  //   }
  //   var charNeeded = 280 - currCharToRemove;
  //   var rawOutput = textArea.value.substr(i*charNeeded,charNeeded);
  //   var finalOutput = `<li class="tweet"><span id="copy-confirm">copied!</span><p>${rawOutput} (${i + 1} of ${totalTweets})</p><button onclick="copyTweet(${i})">copy tweet</button></li>`;

  //   document.getElementById('output').innerHTML += finalOutput;
  // }
};

copyTweet = function(index) {
  var copyText = document.getElementsByTagName('p')[index].textContent;
  navigator.clipboard.writeText(copyText);

  document.getElementById('copy-confirm').classList = 'visible';

  setTimeout(function(){
    document.getElementById('copy-confirm').classList = '';
  }, 2000);
}


var testStr = 'An old man lived in the village. He was one of the most unfortunate people in the world. The whole village was tired of him; he was always gloomy, he constantly complained and was always in a bad mood. The longer he lived, the more bile he was becoming and the more poisonous were his words. People avoided him, because his misfortune became contagious. It was even unnatural and insulting to be happy next to him. He created the feeling of unhappiness in others. But one day, when he turned eighty years old, an incredible thing happened. Instantly everyone started hearing the rumour: “An Old Man is happy today, he doesn’t complain about anything, smiles, and even his face is freshened up.” The whole village gathered together. The old man was asked: Villager: What happened to you? “Nothing special. Eighty years I’ve been chasing happiness, and it was useless. And then I decided to live without happiness and just enjoy life. That’s why I’m happy now.” – An Old Man Moral of the story: Don’t chase happiness. Enjoy your life.';

