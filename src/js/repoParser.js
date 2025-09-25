// Fetch GitHub repositories with additional details
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
        
        // Fetch additional details for each repository
        const reposWithDetails = await Promise.all(
            repos.map(async repo => {
                if (repo.name.startsWith('illmilo')) return null;
                
                try {
                    // Fetch repository details to get homepage and topics
                    const detailsResponse = await fetch(repo.url);
                    if (!detailsResponse.ok) throw new Error('Failed to fetch repo details');
                    
                    const repoDetails = await detailsResponse.json();
                    
                    return {
                        ...repo,
                        homepage: repoDetails.homepage,
                        topics: repoDetails.topics || []
                    };
                } catch (error) {
                    console.error(`Error fetching details for ${repo.name}:`, error);
                    return {
                        ...repo,
                        homepage: null,
                        topics: []
                    };
                }
            })
        );
        
        // Filter out null values and add each repository as a list item
        reposWithDetails
            .filter(repo => repo !== null)
            .forEach(repo => {
                const listItem = document.createElement('li');
                
                // Create repo card HTML structure
                listItem.innerHTML = `
                    <div class="repo-card-header">
                        <i class="fas fa-book repo-icon"></i>
                        <a href="${repo.html_url}" class="repo-name" target="_blank" rel="noopener noreferrer">
                            ${repo.name}
                        </a>
                        ${repo.homepage ? `
                            <a href="${repo.homepage}" class="repo-demo-link" target="_blank" rel="noopener noreferrer" title="Live Demo">
                                <i class="fas fa-external-link-alt"></i>
                                Demo
                            </a>
                        ` : ''}
                    </div>
                    <p class="repo-description">${repo.description || 'No description available'}</p>
                    ${repo.topics.length > 0 ? `
                        <div class="repo-topics">
                            ${repo.topics.map(topic => `
                                <span class="repo-topic">${topic}</span>
                            `).join('')}
                        </div>
                    ` : ''}
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