const arrs = process.argv.slice(2); //take 2 arguments from terminal
const fs = require('fs'); //require node filesystem moedule

let requestedURL = arrs[0]; //store 1st index of arrs array as url
let requestedLocalFilePath = arrs[1]; //store 2nd index of arrs array as local file location

const request = require('request'); //to request http info
request(`${requestedURL}`, (error, response, body) => {
  if (error) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  } else {
    savePageToFile(body); //callback function and pass body as parameter
  //console.log('body:', body); // Print the HTML for the Google homepage.
  }
});

const savePageToFile = (websiteHTML) => { //take html body from request to save locally
  let fileSize = websiteHTML;
  fileSize = fileSize.length; //to get size of file, count chars

  fs.writeFile(requestedLocalFilePath, websiteHTML, err => { //write the file
    if (err) {
      console.error(err);
    }
    console.log(`Downloaded and saved ${fileSize} bytes to ${requestedLocalFilePath}`);
  });
};