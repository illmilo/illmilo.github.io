fetch('https://raw.githubusercontent.com/illmilo/illmilo/main/README.md')
    .then(response => response.text())
    .then(markdown => {
      // Use a Markdown parser like marked.js
      document.getElementById('readme-container').innerHTML = 
        marked.parse(markdown);
    });