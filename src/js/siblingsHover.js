document.querySelectorAll('.demo span').forEach(span => {
  const link = span.previousElementSibling;
  
  // Check if previous sibling is an anchor tag
  if (link && link.tagName === 'A') {
    span.addEventListener('mouseenter', () => {
      link.style.filter = 'blur(0px) brightness(1)';
      link.style.transform = 'scale(1)';
      link.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
      
      // Handle the ::before pseudo-element using a custom class
      link.classList.add('span-hovered');
    });
    
    span.addEventListener('mouseleave', () => {
      link.style.filter = '';
      link.style.transform = '';
      link.style.boxShadow = '';
      
      // Remove the custom class
      link.classList.remove('span-hovered');
    });
  }
});

// Add a style element for the ::before pseudo-element simulation
const style = document.createElement('style');
style.textContent = `
  #demos-container a.span-hovered::before {
    background: linear-gradient(45deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%) !important;
  }
`;
document.head.appendChild(style);
        document.querySelectorAll('.demo a').forEach(link => {
  const span = link.nextElementSibling;
  
  if (span && span.classList.contains('demo')) {
    // If the span is actually a parent container, try a different approach
    const demoContainer = link.closest('.demo');
    const actualSpan = demoContainer.querySelector('span');
    
    if (actualSpan) {
      link.addEventListener('mouseenter', () => {
        actualSpan.style.opacity = '0';
        actualSpan.style.transform = 'translate(-50%, -60%)';
      });
      
      link.addEventListener('mouseleave', () => {
        actualSpan.style.opacity = '';
        actualSpan.style.transform = '';
      });
    }
  } else if (span && span.tagName === 'SPAN') {
    // Direct sibling case
    link.addEventListener('mouseenter', () => {
      span.style.opacity = '0';
      span.style.transform = 'translate(-50%, -60%)';
    });
    
    link.addEventListener('mouseleave', () => {
      span.style.opacity = '';
      span.style.transform = '';
    });
  }
});