fetch('https://raw.githubusercontent.com/illmilo/illmilo/main/README.md')
    .then(response => response.text())
    .then(markdown => {
      // Use a Markdown parser like marked.js
      const containers = document.getElementsByClassName('readme-container');
      for (let i = 0; i < containers.length; i++)
        containers.item(i).innerHTML = marked.parse(markdown);
    });