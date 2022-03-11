var textArea = document.getElementById('og-tweet');
var tweetCount = 0;
var totalTweets = 0;
var tweetCountTemplate = '(1 of 1)';
var charToRemove = tweetCountTemplate.length;

// Let's check the total number of tweets as the user types
function liveUpdate() {

  var inputVal = textArea.value;
  var rawTweetCount = inputVal.length / 280;

  // Compensate for an extra digit in the counter
  if (rawTweetCount >= 10) {
    charToRemove = charToRemove + 1;
  }

  var characterCount = inputVal.length + charToRemove;
  var tweetFraction = characterCount / 280;
  var tweetCalc = Math.ceil(tweetFraction);

  if (inputVal.length === 0) {
    document.getElementById('tweet-count').classList = '';
    totalTweets = 0;
  } else {
    document.getElementById('tweet-count').textContent = `So far you've got ${tweetCalc} tweet${tweetCalc > 1 ? 's' : ''}`;
    document.getElementById('tweet-count').classList = 'visible';
    totalTweets = tweetCalc;
  }
}
textArea.addEventListener('keyup', liveUpdate);

document.getElementById('submit').onclick = function () {
  document.getElementById('output').innerHTML = '';

  var charCount = 0;
  var outputStr = '';

  // Uh uh uh, what's the magic word?
  if (!textArea.value) {
    var audio = new Audio('23.mp3');
    audio.play();

    return;
  }

  // Turn whole text value into a word array
  var rawTextArr = textArea.value.split(' ');
  var currTweetNo = 1;

  // Loop through word array
  rawTextArr.forEach(function (word, i) {
    var wordLength = word.length + 1;
    charCount += wordLength;
    var tweetCounter = ` (${currTweetNo} of ${totalTweets})`;
    var encodedCounter = encodeURIComponent(tweetCounter);
    var currCharToRemove = tweetCounter.length;

    // If we're under 280 and it isn't the last word just add it to the current tweet
    if (charCount + currCharToRemove <= 280 && i != rawTextArr.length - 1) {
      outputStr += word + ' ';
    }
    // If we're under 280 and it is the last word add it to the current tweet and print
    else if (charCount + currCharToRemove <= 280 && i == rawTextArr.length - 1) {
      outputStr += word;
      var encodedOutput = encodeURIComponent(outputStr);
      var finalOutput = `
        <li class="tweet">
          <p>${outputStr}${tweetCounter}</p>
          <a class="share-button" href="https://twitter.com/intent/tweet?text=${encodedOutput}${encodedCounter}">Tweet me</a>
        </li>`;
      document.getElementById('output').innerHTML += finalOutput;
    } else if (charCount + charToRemove > 280) {
      var encodedOutput = encodeURIComponent(outputStr);
      var finalOutput = `
        <li class="tweet">
          <p>${outputStr}${tweetCounter}</p>
          <a class="share-button" href="https://twitter.com/intent/tweet?text=${encodedOutput}${encodedCounter}">Tweet me</a>
        </li>`;
      document.getElementById('output').innerHTML += finalOutput;
      charCount = 0;
      currTweetNo = currTweetNo + 1;
      outputStr = word + ' ';
    }
  });
};

document.getElementById('output').addEventListener('click', (e) => {
  if (e.target.classList.contains('share-button')) {
    handleSocialClick(e)
  }
});

function handleSocialClick(e) {
  e.preventDefault();
  window.open(e.target.href, "window", "width=500,height=500");
}