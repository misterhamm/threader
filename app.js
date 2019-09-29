var textArea = document.getElementById('og-tweet');
var tweetCount = 0;
var totalTweets = 1;
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
  }
  else {
    document.getElementById('tweet-count').textContent = `You're currently at ${tweetCalc} tweet${tweetCalc > 1 ? 's' : ''}`;
    document.getElementById('tweet-count').classList = 'visible';
  }

  if (tweetCalc === 1) { 
    return
  
  }
  else if (tweetCount !== tweetCalc) {
    totalTweets = tweetCalc;
  }
}

textArea.addEventListener('keyup', liveUpdate);


document.getElementById('submit').onclick = function() {
  document.getElementById('output').innerHTML = '';
  
  for (var i = 0; i < totalTweets; i++) {
    var outputItems = document.getElementsByTagName('p');
    var currCharToRemove = charToRemove;

    if (i + 1 < 10) {
      currCharToRemove = charToRemove;
    }
    else {
      currCharToRemove = charToRemove + 1;
    }
    var charNeeded = 280 - currCharToRemove;
    var rawOutput = textArea.value.substr(i*charNeeded,charNeeded);
    var finalOutput = `<li class="tweet"><span id="copy-confirm">copied!</span><p>${rawOutput} (${i + 1} of ${totalTweets})</p><button onclick="copyTweet(${i})">copy tweet</button></li>`;

    document.getElementById('output').innerHTML += finalOutput;
  }
};

copyTweet = function(index) {
  var copyText = document.getElementsByTagName('p')[index].textContent;
  navigator.clipboard.writeText(copyText);

  document.getElementById('copy-confirm').classList = 'visible';

  setTimeout(function(){
    document.getElementById('copy-confirm').classList = '';
  }, 2000);
}