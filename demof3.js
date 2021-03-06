alert("Keep API-requests limited!")
// Get the GitHub username input form
const gitHubForm = document.getElementById("gitHubForm");

// Listen for submissions on GitHub username input form
gitHubForm.addEventListener("submit", (e) => {
  // Prevent default form submission action
  e.preventDefault();

  // Get the GitHub username input field on the DOM
  let usernameInput = document.getElementById("usernameInput");

  // Get the value of the GitHub username input field
  let gitHubUsername = usernameInput.value;

  let Repo_count = document.getElementById("Repo_count");
  let n = Repo_count.value;

  let Commitee_count = document.getElementById("Commitee_count");
  let m = Commitee_count.value;

  // Run GitHub API function, passing in the GitHub username
  requestUserRepos(gitHubUsername, n, m);
});

function requestUserRepos(username, n, m) {
  // Create new XMLHttpRequest object
  c = 0;
  // GitHub endpoint, dynamically passing in specified username
  for (let j = 1; j <= 10; j++) {
    xhr = new XMLHttpRequest();
    // url = `https://api.github.com/users/${username}/repos?per_page=100&page=${j}`;
    url = `https://api.github.com/search/repositories?o=desc&q=${username}&s=forks&per_page=100&page=${j}`;
    // Open a new connection, using a GET request via URL endpoint
    // Providing 3 arguments (GET/POST, The URL, Async True/False)
    xhr.open("GET", url, true);

    // When request is received
    // Process it here
    xhr.onload = function () {
      // Parse API data into JSON
      const data = JSON.parse(this.response);

      // Loop over each object in data array
      for (let i in data) {
        c++;
        if (c > n) {
          break;
        }
        // Get the ul with id of of userRepos
        let ul = document.getElementById("userRepos");

        // Create variable that will create li's to be added to ul
        let li = document.createElement("li");

        // Add Bootstrap list item class to each li
        li.classList.add("list-group-item");

        // Create the html markup for each li
        li.innerHTML = `
                    <p><strong>Repo:</strong> ${data[i].name}</p>
                    <p><strong>Description:</strong> ${data[i].description}</p>
                    <p><strong>Forks:</strong> ${data[i].forks}</p>
                    <p><strong>URL:</strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>
                    <ul id="contributers_list">Top-Contributers</ul>
                `;
        fetchContributers(username,data[i].name,m)
        // Append each li to the ul
        ul.appendChild(li);
        // console.log(c);
      }
    };

    // Send the request to the server
    xhr.send();
  }
}

function fetchContributers(username,repo_name,m){
    xhr = new XMLHttpRequest();
    // https://api.github.com/repos/google/googletest/contributors?per_page=100
    url=`https://api.github.com/repos/${username}/${repo_name}/contributers?per_page=100`
    xhr.open("GET", url, true);
    xhr.onload = function () {
        // Parse API data into JSON
        const data = JSON.parse(this.response);
        for (let i in data) {
            c++;
            if (c > m) {
            break;
            }
            // Get the ul with id of of userRepos
            let ul = document.getElementById("contributers_list");

            // Create variable that will create li's to be added to ul
            let li = document.createElement("li");

            // Add Bootstrap list item class to each li
            li.classList.add("list-group-item");

            // Create the html markup for each li
            li.innerHTML = `<div>${data[i].login}<div>${data[i].contributions}</div></div>`
            ul.appendChild(li);
        }
    }
}