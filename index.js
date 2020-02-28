const axious = require("axios");

axious.get("https://api.github.com/users/jenniferkirwin")
.then(function(response) {
    console.log(response);
    console.log(`success!!`);
}).catch(function (error) {
    console.log(error);
    console.log(`failed :'(`);
  });