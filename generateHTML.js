const colors = {
    green: {
      wrapperBackground: "#E6E1C3",
      headerBackground: "#C1C72C",
      headerColor: "black",
      photoBorderColor: "#black"
    },
    blue: {
      wrapperBackground: "#5F64D3",
      headerBackground: "#26175A",
      headerColor: "white",
      photoBorderColor: "#73448C"
    },
    pink: {
      wrapperBackground: "#879CDF",
      headerBackground: "#FF8374",
      headerColor: "white",
      photoBorderColor: "#FEE24C"
    },
    red: {
      wrapperBackground: "#DE9967",
      headerBackground: "#870603",
      headerColor: "white",
      photoBorderColor: "white"
    }
};

// Generate HTML code dynamically from information gained from index.js and GitHub API
function generateHTML(data) {
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
        <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
        <title>Document</title>
        <style>
            @page {
              margin: 0;
            }
           *,
           *::after,
           *::before {
           box-sizing: border-box;
           }
           html, body {
           padding: 0;
           margin: 0;
           }
           html, body, .wrapper {
           height: 100%;
           }
           .wrapper {
           background-color: ${colors[data.color].wrapperBackground};
           padding-top: 100px;
           }
           body {
           background-color: white;
           -webkit-print-color-adjust: exact !important;
           font-family: 'Cabin', sans-serif;
           }
           main {
           background-color: #E9EDEE;
           height: auto;
           padding-top: 30px;
           }
           h1, h2, h3, h4, h5, h6 {
           font-family: 'BioRhyme', serif;
           margin: 0;
           }
           h1 {
           font-size: 3em;
           }
           h2 {
           font-size: 2.5em;
           }
           h3 {
           font-size: 2em;
           }
           h4 {
           font-size: 1.5em;
           }
           h5 {
           font-size: 1.3em;
           }
           h6 {
           font-size: 1.2em;
           }
           .photo-header {
           position: relative;
           margin: 0 auto;
           margin-bottom: -50px;
           display: flex;
           justify-content: center;
           flex-wrap: wrap;
           background-color: ${colors[data.color].headerBackground};
           color: ${colors[data.color].headerColor};
           padding: 10px;
           width: 95%;
           border-radius: 6px;
           }
           .photo-header img {
           width: 250px;
           height: 250px;
           border-radius: 50%;
           object-fit: cover;
           margin-top: -75px;
           border: 6px solid ${colors[data.color].photoBorderColor};
           }
           .photo-header h1, .photo-header h2 {
           width: 100%;
           text-align: center;
           }
           .photo-header h1 {
           margin-top: 10px;
           }
           .links-nav {
           width: 100%;
           text-align: center;
           padding: 20px 0;
           font-size: 1.1em;
           }
           .nav-link {
           display: inline-block;
           margin: 5px 10px;
           }
           .workExp-date {
           font-style: italic;
           font-size: .7em;
           text-align: right;
           margin-top: 10px;
           }
           .container {
           padding: 75px 100px 100px 100px;
           text-align: center;
           background-color: #e8eced;
           }
  
           .row {
             display: flex;
             flex-wrap: wrap;
             justify-content: space-between;
             margin-top: 20px;
             margin-bottom: 20px;
           }
  
           .card {
             padding: 20px;
             border-radius: 6px;
             background-color: ${colors[data.color].headerBackground};
             color: ${colors[data.color].headerColor};
             margin: 20px;
           }
           
           .col {
           flex: 1;
           text-align: center;
           }
  
           a, a:hover {
           text-decoration: none;
           color: inherit;
           font-weight: bold;
           }
  
           @media print { 
            body { 
              zoom: .75; 
            } 
           }
        </style>
      </head>
      <body>
          <div class="wrapper">
            <div class="photo-header">
                <img src="${data.avatar_url}">
                <h2>
                    Hi!
                    <br>
                    My name is ${data.name}!
                </h2>
                <h6>Currently @ ${data.company}</h6>
                <div class="links-nav">
                    <a href="${data.location_url}">
                        <i class="fas fa-location-arrow"></i>
                        ${data.location}
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="${data.html_url}">
                        <i class="fab fa-github-alt"></i>
                        GitHub
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="${data.blog}">
                        <i class="fas fa-rss"></i>
                        Blog
                    </a>
                </div>
            </div>
            <div class="container">
                <h3>Web Developer and Artist</h3>
                <div class="row">
                    <div class="col">
                        <div class="card">
                            <h4>
                                Public Repositories
                            </h4>
                            <h6>${data.public_repos}</h6>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <h4>
                                Followers
                            </h4>
                            <h6>${data.followers}</h6>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="card">
                            <h4>
                                GitHub Stars
                            </h4>
                            <h6>${data.stars}</h6>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <h4>
                                Following
                            </h4>
                            <h6>${data.following}</h6>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </body>
    </html>`
}

// Export the generateHTML function to the index.js
module.exports = generateHTML;