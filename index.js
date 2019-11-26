// Import NPM packages
const inquirer = require("inquirer");
const axios = require("axios");
const generateHTML = require("./generateHTML.js");
const puppeteer = require("puppeteer");

// Create questions to ask the user in Terminal
const questions = [
  "What is your GitHub username?",
  "What is your favorite color? (only green, blue, pink, and red)"
];

// Ask the user questions
inquirer
    .prompt([
        {
            type: "input",
            message: questions[0],
            name: "username"
        },
        {
            type: "input",
            message: questions[1],
            name: "color"
        }
    ])
    .then (function(response) {

        // Connect to the GitHub API to get all the user's information using what the user has inputted in CLI
        axios.get(`https://api.github.com/users/${response.username}`).then (gitHubRes => {

            // Nested API call to get the number of GitHub stars for a user
            axios.get(`https://api.github.com/users/${response.username}/repos`).then (gitHubStarsRes => {
                let stars = 0;
                gitHubStarsRes.data.forEach(element => stars += element.stargazers_count);

                // Create a data object to send to generateHTML.js file, so can dynamically add response information
                const data = {};

                if (gitHubRes.data.name == null) {
                    data.name = response.username;
                } else {
                    data.name = gitHubRes.data.name;
                };

                if (gitHubRes.data.company == null) {
                    data.company = "no company";
                } else {
                    data.company = gitHubRes.data.company;
                };

                if (gitHubRes.data.location == null) {
                    data.location = "no location";
                    data.location_url = "#";
                } else {
                    data.location = gitHubRes.data.location;
                    let location = gitHubRes.data.location.split(" ");
                    data.location_url = `https://www.google.com/maps/place/${location.join("+")}/`;
                };

                if (gitHubRes.data.blog == null) {
                    data.blog = "#";
                } else {
                    data.blog = gitHubRes.data.blog;
                };

                if (gitHubRes.data.bio == null) {
                    data.bio = "no bio";
                } else {
                    data.bio = gitHubRes.data.bio;
                };
                
                data.avatar_url = gitHubRes.data.avatar_url;
                data.html_url = gitHubRes.data.html_url;
                data.public_repos = gitHubRes.data.public_repos;
                data.followers = gitHubRes.data.followers;
                data.stars = stars;
                data.following = gitHubRes.data.following;
                data.color = response.color;
                
                // Use puppeteer to convert the dynamically written HTML into a PDF
                (async function() {
                    try {
                
                        const browser = await puppeteer.launch();
                        const page = await browser.newPage();
                
                        await page.setContent(generateHTML(data), {waitUntil: "networkidle0"});
                        await page.emulateMedia("screen");
                        await page.pdf({
                            path: "gitHubUser.pdf",
                            format: "A4",
                            printBackground: true
                        });

                        await page.addStyleTag({ url: "https://use.fontawesome.com/releases/v5.8.1/css/all.css" }, {waitUntil: "networkidle0"});
                        await page.addStyleTag({ url: "https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" }, {waitUntil: "networkidle0"});
                
                        console.log("done");
                        await browser.close();
                        process.exit();
                
                    } catch (err) {
                        console.log(err);
                    }
                })();
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });