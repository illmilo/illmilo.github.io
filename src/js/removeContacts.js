function removeContactSection() {
  const readmeContainer = document.getElementById('readme-container');
  const contactHeading = Array.from(readmeContainer.querySelectorAll('h2')).find(
    heading => heading.textContent.trim() === 'Contact Me'
  );
  
  if (contactHeading) {
    let nextElement = contactHeading.nextElementSibling;
    
    // Remove the Contact Me heading
    contactHeading.remove();
    
    // Remove all following elements
    while (nextElement) {
      const elementToRemove = nextElement;
      nextElement = nextElement.nextElementSibling;
      elementToRemove.remove();
    }
  }
}

// Run after content is loaded
document.addEventListener('DOMContentLoaded', function() {
  // If using marked.js with async loading, you might need to use a MutationObserver
  // or call this function after your readme parsing is complete
  
  // For immediate execution after DOM is ready
  setTimeout(removeContactSection, 100);
});

// If you're loading content asynchronously, use a MutationObserver
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes.length) {
      removeContactSection();
    }
  });
});

observer.observe(document.getElementById('readme-container'), {
  childList: true,
  subtree: true
});