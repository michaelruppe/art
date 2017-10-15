// A copy of Dan Shiffmans coding challenge
// https://youtu.be/RPz75gcHj18

// A person has made wtf_wikipedia which looks like a very useful wikipedia parser
// https://github.com/spencermountain/wtf_wikipedia

// TODO reconfigure the callback sequence. Willy-nilly callbacks here are dangerous
// Dan mentions using 'anonymous functions right in the callack at 13:30'

// TODO perhaps stop when it hits "Kevin Bacon" :P

let userInput;
let searchURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&prop=revisions&rvprop=content&format=json&search='
let contentURL = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=';

let counter = 0;

function setup() {
  userInput = select('#userinput');
  userInput.changed(startSearch);
  let term  = userInput.value();

}


function draw() {

}

function startSearch() {
  counter = 0;
  goWiki(userInput.value());
}

function goWiki(term) {
  if (counter < 10) {
    counter++;
    let url = searchURL + term;
    loadJSON(url, gotSearch, 'jsonp');
  }
}

function gotSearch(data) {
  let len = data[1].length; // number of page titles returned
  let index = floor(random(len)); // select random title
  var title = data[1][index];
  createP(title);
  //replace spaces with underscores
  title = title.replace(/\s+/g, '_');
  let url = contentURL + title;
  console.log('Querying: ' + title);
  console.log(url);
  loadJSON(url, gotContent, 'jsonp');
}

function gotContent(data) {
  let page = data.query.pages;
  //Need to dynamically extract the pageID number, which is nested in the JSON structure. Actual page data sits somewhere under the page ID
  // The .keys function allows you to extract JSON 'keys', and we know where in the structure the ID will sit.
  let pageID = Object.keys(page)[0];
  console.log(pageID);
  let content = page[pageID].revisions[0]['*']; //can't use .* so have to use ['*'] instead
  console.log(content);

  // Match any sequence of characters, 4 or more words
  let wordRegex = /\b\w{4,}\b/g;
  var words = content.match(wordRegex);
  var word = random(words);

  goWiki(word);
}
