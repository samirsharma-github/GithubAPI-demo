function requestUserRepos(org, n) {
  // Create new XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // GitHub endpoint, dynamically passing in specified username
  // const url = `https://api.github.com/orgs/${org}/repos?per_page=${n}`;
  const url = `https://api.github.com/users/${org}/repos?per_page=${n}`;
  // https://api.github.com/users/google/repos?per_page=100&page=20

  // Open a new connection, using a GET request via URL endpoint
  // Providing 3 arguments (GET/POST, The URL, Async True/False)
  xhr.open("GET", url, true);

  // When request is received
  // Process it here
  xhr.onload = function () {
    // Parse API data into JSON
    const data = JSON.parse(this.response);

    // Log the response
    console.log(data);

    // Loop over each object in data array
    for (let i in data) {
      // Log the repo name
      console.log("Repo:", data[i].name);

      // Log the repo description
      console.log("Description:", data[i].description);

      // Log the repo url
      console.log("URL:", data[i].html_url);

      // Add a separator between each repo
      console.log("=========================");
    }
  };

  // Send the request to the server
  xhr.send();
}

// Call function passing in 'facebook' as GitHub username
requestUserRepos("facebook", String(n));
