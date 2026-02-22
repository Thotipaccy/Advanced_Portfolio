// Initialize data when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize data if needed
    PortfolioData.init();
    
    // Load all content
    loadPortfolioContent();
    
    // Set up event listeners
    setupEventListeners();
});

function loadPortfolioContent() {
    const data = PortfolioData.getAll();
    
    // Update profile section
    updateProfile(data.profile);
    
    // Update education
    updateEducation(data.education);
    
    // Update skills
    updateSkills(data.technicalSkills, data.softSkills);
    
    // Update projects
    updateProjects(data.projects);
    
    // Update contact info
    updateContact(data.profile, data.socialLinks);
}

function updateProfile(profile) {
    // Update hero section
    document.querySelector('.hero-title').innerHTML = `Hello, I'm <span class="highlight">${profile.name}</span>`;
    document.querySelector('.hero-subtitle').textContent = profile.title;
    
    // Update about section
    const aboutTexts = document.querySelectorAll('.about-description');
    if (aboutTexts.length >= 2) {
        // Split bio into two paragraphs (you might want to do this differently)
        const bioParts = profile.bio.split('. ');
        aboutTexts[0].textContent = bioParts[0] + '.';
        aboutTexts[1].textContent = bioParts.slice(1).join('. ');
    }
    
    // Update stats
    const stats = document.querySelectorAll('.stat-item h3');
    if (stats.length >= 3) {
        stats[0].textContent = profile.stats.yearsLearning;
        stats[1].textContent = profile.stats.skillsMastered;
        stats[2].textContent = profile.stats.dedication;
    }
}

function updateEducation(education) {
    const timeline = document.querySelector('.education-timeline');
    if (!timeline) return;
    
    timeline.innerHTML = '';
    education.forEach(edu => {
        const schoolHtml = edu.school ? `<p class="timeline-school">${edu.school}</p>` : '';
        
        const eduItem = document.createElement('div');
        eduItem.className = 'timeline-item';
        eduItem.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <h3>${edu.degree}</h3>
                <p class="timeline-period">${edu.period}</p>
                ${schoolHtml}
                <p class="timeline-description">${edu.description}</p>
            </div>
        `;
        timeline.appendChild(eduItem);
    });
}

function updateSkills(technicalSkills, softSkills) {
    // Update technical skills
    const techContainer = document.querySelector('.skill-category:first-child .skill-items');
    if (techContainer) {
        techContainer.innerHTML = '';
        technicalSkills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <i class="${skill.icon}"></i>
                <span>${skill.name}</span>
            `;
            techContainer.appendChild(skillItem);
        });
    }
    
    // Update soft skills
    const softContainer = document.querySelector('.skill-category:last-child .skill-items');
    if (softContainer) {
        softContainer.innerHTML = '';
        softSkills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <i class="${skill.icon}"></i>
                <span>${skill.name}</span>
            `;
            softContainer.appendChild(skillItem);
        });
    }
}

function updateProjects(projects) {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = '';
    projects.forEach(project => {
        const techTags = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                <i class="${project.icon}"></i>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${techTags}
                </div>
                <a href="${project.githubUrl}" target="_blank" class="project-link">
                    <i class="fab fa-github"></i> View on GitHub
                </a>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

function updateContact(profile, socialLinks) {
    // Update contact details
    const contactItems = document.querySelectorAll('.contact-item');
    if (contactItems.length >= 3) {
        contactItems[0].innerHTML = `<i class="fas fa-envelope"></i><span>${profile.email}</span>`;
        contactItems[1].innerHTML = `<i class="fas fa-phone"></i><span>${profile.phone}</span>`;
        contactItems[2].innerHTML = `<i class="fas fa-map-marker-alt"></i><span>${profile.location}</span>`;
    }
    
    // Update social links
    const socialLinksContainer = document.querySelector('.social-links');
    if (socialLinksContainer) {
        socialLinksContainer.innerHTML = `
            <a href="${socialLinks.github}" target="_blank" class="social-link">
                <i class="fab fa-github"></i>
            </a>
            <a href="${socialLinks.email}" class="social-link">
                <i class="fas fa-envelope"></i>
            </a>
        `;
    }
}

function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            if (document.body.classList.contains('dark-theme')) {
                themeIcon.className = 'fas fa-sun';
            } else {
                themeIcon.className = 'fas fa-moon';
            }
        });
    }
    
    // Update copyright year
    document.getElementById('current-year').textContent = new Date().getFullYear();
}