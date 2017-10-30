// Using the airvisual.com API where keys are vaild for 365days only.
// Key generated on 30-10-2017

// Air quality index aqius
// Very Good [0 to 33]
// Good [34 to 66]
// Fair [67 to 99]
// Poor [100 to 149]
// Very Poor [150 to 200]
// Extreme [200 +]

// Sydney lat,lon: -32.9275772,151.7106918


let API_KEY = 'MLQSzi7wKJ7kxouMZ';
// let query = 'http://api.airvisual.com/v2/nearest_city?lat=-32.9275772&lon=,151.7106918&key=';

let queryCountryURL = 'http://api.airvisual.com/v2/countries?key='
let queryStateURL = 'http://api.airvisual.com/v2/states?country=';
let queryCityURL = 'http://api.airvisual.com/v2/cities?state=';
let queryQualityURL = 'http://api.airvisual.com/v2/city?city=';


let data;
let countryList = [];
let stateList = [];
let cityList = [];
function setup() {

  getCountries();


}

function draw() {


}

function getCountries() {
  // console.log(queryCountryURL + API_KEY);
  loadJSON( queryCountryURL + API_KEY, gotCountries );
}

function gotCountries(result) {
  // console.log(result);
  let len = result.data.length;
  // console.log("Number countries supported: " + len);
  // choose country at random
  index = floor(random(len));
  countryList[0] = result.data[index].country;
  console.log("Choosing " + countryList[0]);

  // Load list of states in country
  // console.log("Query states: " + queryStateURL + countryList[0] + "&key=" + API_KEY);
  loadJSON(queryStateURL + countryList[0] + "&key=" + API_KEY, getState);
}

function getState(result) {
  let len = result.data.length;
  index = floor(random(len));
  stateList[0] = result.data[index].state;
  console.log(stateList[0]);

  // Load list of cities
  loadJSON(queryCityURL + stateList[0] +"&country=" + countryList[0] + "&key=" +API_KEY, gotCity);
}

// http://api.airvisual.com/v2/cities?state={{STATE_NAME}}&country={{COUNTRY_NAME}}&key={{YOUR_API_KEY}}
function gotCity(result) {
  let len = result.data.length;
  index = floor(random(len));
  cityList[0] = result.data[index].city;
  console.log(cityList[0]);

  // Get air-quality data (finally!)
  let url = queryQualityURL + cityList[0] +"&state=" + stateList[0] + "&country=" + countryList[0] + "&key=" + API_KEY;
  // console.log("Querying " + url)
  loadJSON(url, gotData);
}

// http://api.airvisual.com/v2/city?city=Los Angeles&state=California&country=USA&key={{YOUR_API_KEY}}


function gotData(result) {
  console.log(result.data.current.pollution.aqius);
}
