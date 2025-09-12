
// Language color mapping
const languageColors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#2b7489',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'C': '#555555',
    'C#': '#178600',
    'PHP': '#4F5D95',
    'Ruby': '#701516',
    'CSS': '#563d7c',
    'HTML': '#e34c26',
    'Vue': '#41b883',
    'React': '#61dafb',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Shell': '#89e051',
    'Swift': '#ffac45',
    'Kotlin': '#F18E33',
    'Dart': '#00B4AB',
    'Scala': '#c22d40'
};

// Fetch GitHub repositories
async function fetchGitHubRepos() {
    try {
        const response = await fetch('https://api.github.com/users/illmilo/repos?sort=updated&per_page=10');
        if (!response.ok) throw new Error('Failed to fetch repositories');
        
        const repos = await response.json();
        const projectsContainer = document.getElementById('github-projects');
        
        // Clear loading spinner
        projectsContainer.innerHTML = '';
        
        // Create a new unordered list
        const projectsList = document.createElement('ul');
        
        // Add each repository as a list item
        repos.forEach(repo => {
            // Skip forks and empty repos
            if (repo.name.startsWith('illmilo')) return;
            
            const listItem = document.createElement('li');
            
            // Create repo card HTML structure
            listItem.innerHTML = `
                <div class="repo-card-header">
                    <i class="fas fa-book repo-icon"></i>
                    <a href="${repo.html_url}" class="repo-name" target="_blank" rel="noopener noreferrer">
                        ${repo.name}
                    </a>
                </div>
                <p class="repo-description">${repo.description || 'No description available'}</p>
                <div class="repo-meta">
                    ${repo.language ? `
                        <div class="repo-language">
                            <span class="language-color" style="background-color: ${languageColors[repo.language] || '#7b68ee'}"></span>
                            ${repo.language}
                        </div>
                    ` : ''}
                    <div class="repo-stars">
                        <i class="fas fa-star"></i>
                        ${repo.stargazers_count}
                    </div>
                    <div class="repo-forks">
                        <i class="fas fa-code-branch"></i>
                        ${repo.forks_count}
                    </div>
                    <div class="repo-updated">
                        Updated ${formatDate(repo.updated_at)}
                    </div>
                </div>
            `;
            
            // Append to projects list
            projectsList.appendChild(listItem);
        });
        
        // Append the list to the container
        projectsContainer.appendChild(projectsList);
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        document.getElementById('github-projects').innerHTML = 
            '<p>Unable to load projects from GitHub. Please try again later.</p>';
    }
}

// Format date function
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 30) return `${diffDays} days ago`;
    
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return '1 month ago';
    if (diffMonths < 12) return `${diffMonths} months ago`;
    
    const diffYears = Math.floor(diffMonths / 12);
    if (diffYears === 1) return '1 year ago';
    return `${diffYears} years ago`;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubRepos();
});