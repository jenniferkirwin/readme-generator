const fs = require("fs");
const axious = require("axios");
const inquirer = require("inquirer");

let userBio;
let userImg;
let userEmail;


function askUserInfo() {
    return new Promise((resolve, reject) => {
        inquirer
            .prompt([
                {
                    type: `input`,
                    message: `What is your GitHub user name?\n`,
                    name: `githubUser`,
                }
            ]).then(({githubUser}) => {
                getUserInfo(githubUser);
            });
    })
}

function getUserInfo(userName) {

    axious.get(`https://api.github.com/users/${userName}`)
    .then(function(response) {
        console.log(`User "${userName}" has been found!`);
        //console.log(response);
        console.log(response.data.bio);
        userBio = response.data.bio;
        userImg = response.data.avatar_url;
        userEmail = response.data.email;
    }).catch(function (error) {
        inquirer.prompt([
            {
                type: `confirm`,
                name: `attemptAgain`,
                message: `User "${userName}" not found. Would you like to try to find another GitHub user?\n`
            }
        ]).then(({attemptAgain}) => {
            if (attemptAgain === true) {
                askUserInfo();
            }
            else {
                return;
            };
        });
    });

};

function getProjectInfo() {
    return new Promise((resolve, reject) => {

        inquirer
            .prompt([
                {
                    type: `input`,
                    message: `Project Title:\n`,
                    name: `projectTitle`
                },
                {
                    type: `input`,
                    message: `Project Description (2-3 sentences):\n`,
                    name: `projectDescription`
                },
                {
                    type: `input`,
                    message: `How is this project installed?\n`,
                    name: `projectInstall`
                },
                {
                    type: `input`,
                    message: `How is this project used?\n`,
                    name: `projectUsage` 
                },
                {
                    type:`list`,
                    name: `projectLicense`,
                    message: `What is the License on your project?`,
                    choices: [`None`, `Apache License 2.0`, `GNU General Public License v3.0`,`MIT License`, `BSD 2-Clause "Simplified" License`, `BSD 3-Clause "New" or "Revised" License`, `Creative Commons Zero v1.0 Universal`, `Eclipse Public License 2.0`, `GNU Affero General Public License v3.0`, `GNU General Public License v2.0`, `GNU Lesser General Public License v2.1`, `GNU Lesser General Public License v3.0`, `Mozilla Public License 2.0`, `The Unlicense`]
                    
                },
                {
                    type: `input`,
                    name: `projectTesting`,
                    message: `Any testing you did that you woud like included in your readme.md?`
                },
                {
                    type: `input`,
                    name: `additionalCollab`,
                    message: `Any other collaborators on your project?`
                }
            ]).then((answers) => {
                console.log(answers);
            })
    });    
};

askUserInfo();

 `
 # Project Title

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them



### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be


And repeat


End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why


### And coding style tests

Explain what these tests test and why


## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
 `