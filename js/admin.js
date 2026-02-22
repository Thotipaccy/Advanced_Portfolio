// js/admin-simple.js

// Global variables
let currentData = {};

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin dashboard loaded');
    
    // Load data
    loadData();
    
    // Set up navigation
    setupNavigation();
    
    // Set up buttons
    document.getElementById('saveAllBtn').addEventListener('click', saveAllChanges);
    
    // Handle multiple reset buttons
    document.getElementById('resetDataBtn')?.addEventListener('click', resetData);
    document.getElementById('resetDataBtn2')?.addEventListener('click', resetData);
    
    document.getElementById('exportDataBtn')?.addEventListener('click', exportData);
    
    // Set up add buttons
    document.getElementById('addEducationBtn').addEventListener('click', () => addEducationItem());
    document.getElementById('addTechSkillBtn').addEventListener('click', () => addSkillItem('technical'));
    document.getElementById('addSoftSkillBtn').addEventListener('click', () => addSkillItem('soft'));
    document.getElementById('addProjectBtn').addEventListener('click', () => addProjectItem());
    
    // Auto-save indicator
    showStatus('Ready to edit', 'info');
});

// Load all data into forms
function loadData() {
    currentData = PortfolioData.init(); // This ensures data exists
    
    // Load profile data
    document.getElementById('profileName').value = currentData.profile?.name || '';
    document.getElementById('profileTitle').value = currentData.profile?.title || '';
    document.getElementById('profileBio').value = currentData.profile?.bio || '';
    document.getElementById('profileEmail').value = currentData.profile?.email || '';
    document.getElementById('profilePhone').value = currentData.profile?.phone || '';
    document.getElementById('profileLocation').value = currentData.profile?.location || '';
    document.getElementById('profileAvatar').value = currentData.profile?.avatar || '';
    document.getElementById('statsYears').value = currentData.profile?.stats?.yearsLearning || '';
    document.getElementById('statsSkills').value = currentData.profile?.stats?.skillsMastered || '';
    document.getElementById('statsDedication').value = currentData.profile?.stats?.dedication || '';
    
    // Load education
    renderEducationList(currentData.education || []);
    
    // Load skills
    renderSkillsList('technical', currentData.technicalSkills || []);
    renderSkillsList('soft', currentData.softSkills || []);
    
    // Load projects
    renderProjectsList(currentData.projects || []);
    
    // Load social links
    document.getElementById('socialGithub').value = currentData.socialLinks?.github || '';
    document.getElementById('socialEmail').value = currentData.socialLinks?.email?.replace('mailto:', '') || '';
    
    // Load settings
    document.getElementById('showAbout').checked = currentData.settings?.showAbout ?? true;
    document.getElementById('showEducation').checked = currentData.settings?.showEducation ?? true;
    document.getElementById('showSkills').checked = currentData.settings?.showSkills ?? true;
    document.getElementById('showProjects').checked = currentData.settings?.showProjects ?? true;
    document.getElementById('showContact').checked = currentData.settings?.showContact ?? true;
}

// Render education list
function renderEducationList(education) {
    const container = document.getElementById('educationList');
    if (!container) return;
    
    if (education.length === 0) {
        container.innerHTML = '<p class="text-muted text-center p-3">No education items added. Click "Add Education" to get started.</p>';
        return;
    }
    
    container.innerHTML = '';
    
    education.forEach((edu, index) => {
        const eduItem = document.createElement('div');
        eduItem.className = 'education-item';
        eduItem.innerHTML = `
            <div class="list-item-actions">
                <button class="btn btn-sm btn-outline-danger" onclick="deleteEducationItem(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="row">
                <div class="col-md-6 mb-2">
                    <input type="text" class="form-control" placeholder="Degree (e.g., Bachelor's in Software Engineering)" 
                           value="${edu.degree || ''}" onchange="updateEducation(${index}, 'degree', this.value)">
                </div>
                <div class="col-md-6 mb-2">
                    <input type="text" class="form-control" placeholder="Period (e.g., 2023 - Present)" 
                           value="${edu.period || ''}" onchange="updateEducation(${index}, 'period', this.value)">
                </div>
                <div class="col-md-12 mb-2">
                    <input type="text" class="form-control" placeholder="School/Institution (optional)" 
                           value="${edu.school || ''}" onchange="updateEducation(${index}, 'school', this.value)">
                </div>
                <div class="col-md-12">
                    <textarea class="form-control" placeholder="Description of your studies, achievements, etc." rows="2" 
                              onchange="updateEducation(${index}, 'description', this.value)">${edu.description || ''}</textarea>
                </div>
            </div>
        `;
        container.appendChild(eduItem);
    });
}

// Render skills list
function renderSkillsList(type, skills) {
    const container = document.getElementById(type + 'SkillsList');
    if (!container) return;
    
    if (skills.length === 0) {
        container.innerHTML = '<p class="text-muted text-center p-3">No skills added. Click "Add Skill" to get started.</p>';
        return;
    }
    
    container.innerHTML = '';
    
    skills.forEach((skill, index) => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item-admin';
        skillItem.innerHTML = `
            <div class="skill-info">
                <div class="skill-icon">
                    <i class="${skill.icon || (type === 'technical' ? 'fas fa-code' : 'fas fa-users')}"></i>
                </div>
                <input type="text" class="form-control" style="width: 200px;" 
                       value="${skill.name || ''}" placeholder="Skill name"
                       onchange="updateSkill('${type}', ${index}, 'name', this.value)">
                <input type="text" class="form-control" style="width: 150px;" 
                       placeholder="Icon class (e.g., fab fa-html5)" value="${skill.icon || ''}" 
                       onchange="updateSkill('${type}', ${index}, 'icon', this.value)">
            </div>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteSkill('${type}', ${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(skillItem);
    });
}

// Render projects list
function renderProjectsList(projects) {
    const container = document.getElementById('projectsList');
    if (!container) return;
    
    if (projects.length === 0) {
        container.innerHTML = '<p class="text-muted text-center p-3">No projects added. Click "Add Project" to get started.</p>';
        return;
    }
    
    container.innerHTML = '';
    
    projects.forEach((project, index) => {
        const techTags = (project.technologies || []).map((tech, techIndex) => `
            <span class="tech-tag-input">
                ${tech}
                <i class="fas fa-times remove-tag" onclick="removeTechTag(${index}, ${techIndex})"></i>
            </span>
        `).join('');
        
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <div class="list-item-actions">
                <button class="btn btn-sm btn-outline-danger" onclick="deleteProject(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="row">
                <div class="col-md-8 mb-2">
                    <input type="text" class="form-control" placeholder="Project Title" 
                           value="${project.title || ''}" onchange="updateProject(${index}, 'title', this.value)">
                </div>
                <div class="col-md-4 mb-2">
                    <input type="text" class="form-control" placeholder="Icon class (e.g., fas fa-shield-halved)" 
                           value="${project.icon || 'fas fa-code'}" onchange="updateProject(${index}, 'icon', this.value)">
                </div>
                <div class="col-md-12 mb-2">
                    <textarea class="form-control" placeholder="Project Description" rows="3" 
                              onchange="updateProject(${index}, 'description', this.value)">${project.description || ''}</textarea>
                </div>
                <div class="col-md-12 mb-2">
                    <label class="form-label">Technologies:</label>
                    <div class="project-tech-tags mb-2">
                        ${techTags}
                    </div>
                    <div class="input-group">
                        <input type="text" class="form-control" id="newTech_${index}" placeholder="Add technology (e.g., Python, React)">
                        <button class="btn btn-outline-primary" onclick="addTechTag(${index})">Add</button>
                    </div>
                </div>
                <div class="col-md-12">
                    <input type="url" class="form-control" placeholder="GitHub URL" 
                           value="${project.githubUrl || ''}" onchange="updateProject(${index}, 'githubUrl', this.value)">
                </div>
            </div>
        `;
        container.appendChild(projectItem);
    });
}

// Setup navigation
function setupNavigation() {
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('.sidebar .nav-link').forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get section to show
            const section = this.dataset.section;
            
            // Update section title
            const sectionTitle = this.textContent.trim();
            document.getElementById('sectionTitle').textContent = sectionTitle;
            
            // Hide all sections
            document.querySelectorAll('.section-form').forEach(s => s.classList.remove('active'));
            
            // Show selected section
            document.getElementById(section + '-section').classList.add('active');
        });
    });
}

// Save all changes
function saveAllChanges() {
    // Collect profile data
    currentData.profile = {
        name: document.getElementById('profileName').value || 'THOTI PACIFIQUE NIBISHAKA',
        title: document.getElementById('profileTitle').value || 'Software Engineering Student',
        bio: document.getElementById('profileBio').value || '',
        email: document.getElementById('profileEmail').value || 'thotipaccy@gmail.com',
        phone: document.getElementById('profilePhone').value || '+250 786 308 963',
        location: document.getElementById('profileLocation').value || 'Kigali, Rwanda',
        avatar: document.getElementById('profileAvatar').value || 'image.png',
        stats: {
            yearsLearning: document.getElementById('statsYears').value || '3+',
            skillsMastered: document.getElementById('statsSkills').value || '10+',
            dedication: document.getElementById('statsDedication').value || '100%'
        }
    };
    
    // Collect social links
    const emailValue = document.getElementById('socialEmail').value;
    currentData.socialLinks = {
        github: document.getElementById('socialGithub').value || 'https://github.com/Thotipaccy',
        email: emailValue ? (emailValue.startsWith('mailto:') ? emailValue : `mailto:${emailValue}`) : 'mailto:thotipaccy@gmail.com'
    };
    
    // Collect settings
    currentData.settings = {
        showAbout: document.getElementById('showAbout').checked,
        showEducation: document.getElementById('showEducation').checked,
        showSkills: document.getElementById('showSkills').checked,
        showProjects: document.getElementById('showProjects').checked,
        showContact: document.getElementById('showContact').checked,
        theme: currentData.settings?.theme || 'light'
    };
    
    // Save all data
    PortfolioData.saveAll(currentData);
    
    showStatus('✓ All changes saved successfully!', 'success');
}

// Add new education item
function addEducationItem() {
    if (!currentData.education) currentData.education = [];
    
    currentData.education.push({
        id: Date.now(),
        degree: 'New Degree',
        period: '2024 - Present',
        school: 'University Name',
        description: 'Description of your studies and achievements...',
        current: true
    });
    
    renderEducationList(currentData.education);
    showStatus('➕ Education item added', 'info');
}

// Delete education item
function deleteEducationItem(index) {
    if (confirm('Delete this education item?')) {
        currentData.education.splice(index, 1);
        renderEducationList(currentData.education);
        showStatus('✓ Education item deleted', 'warning');
    }
}

// Update education field
function updateEducation(index, field, value) {
    currentData.education[index][field] = value;
}

// Add new skill
function addSkillItem(type) {
    const skillList = type === 'technical' ? 'technicalSkills' : 'softSkills';
    if (!currentData[skillList]) currentData[skillList] = [];
    
    const defaultIcon = type === 'technical' ? 'fas fa-code' : 'fas fa-users';
    
    currentData[skillList].push({
        name: 'New Skill',
        icon: defaultIcon
    });
    
    renderSkillsList(type, currentData[skillList]);
    showStatus('➕ Skill added', 'info');
}

// Update skill
function updateSkill(type, index, field, value) {
    const skillList = type === 'technical' ? 'technicalSkills' : 'softSkills';
    currentData[skillList][index][field] = value;
}

// Delete skill
function deleteSkill(type, index) {
    if (confirm('Delete this skill?')) {
        const skillList = type === 'technical' ? 'technicalSkills' : 'softSkills';
        currentData[skillList].splice(index, 1);
        renderSkillsList(type, currentData[skillList]);
        showStatus('✓ Skill deleted', 'warning');
    }
}

// Add new project
function addProjectItem() {
    if (!currentData.projects) currentData.projects = [];
    
    currentData.projects.push({
        id: Date.now(),
        title: 'New Project',
        description: 'Project description goes here...',
        technologies: [],
        githubUrl: 'https://github.com/Thotipaccy',
        icon: 'fas fa-code',
        featured: true
    });
    
    renderProjectsList(currentData.projects);
    showStatus('➕ Project added', 'info');
}

// Update project
function updateProject(index, field, value) {
    currentData.projects[index][field] = value;
}

// Delete project
function deleteProject(index) {
    if (confirm('Delete this project?')) {
        currentData.projects.splice(index, 1);
        renderProjectsList(currentData.projects);
        showStatus('✓ Project deleted', 'warning');
    }
}

// Add technology tag to project
function addTechTag(projectIndex) {
    const input = document.getElementById(`newTech_${projectIndex}`);
    const tech = input.value.trim();
    
    if (tech) {
        if (!currentData.projects[projectIndex].technologies) {
            currentData.projects[projectIndex].technologies = [];
        }
        currentData.projects[projectIndex].technologies.push(tech);
        renderProjectsList(currentData.projects);
        input.value = '';
    }
}

// Remove technology tag
function removeTechTag(projectIndex, techIndex) {
    currentData.projects[projectIndex].technologies.splice(techIndex, 1);
    renderProjectsList(currentData.projects);
}

// Reset data to default
function resetData() {
    if (confirm('⚠️ Reset all data to default? This will delete all your current content.')) {
        currentData = PortfolioData.reset();
        loadData();
        showStatus('✓ Data reset to default', 'warning');
    }
}

// Export data
function exportData() {
    const dataStr = JSON.stringify(currentData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    showStatus('✓ Data exported successfully', 'success');
}

// Show status message
function showStatus(message, type) {
    const statusEl = document.getElementById('saveStatus');
    statusEl.textContent = message;
    statusEl.className = `badge bg-${type}`;
    
    setTimeout(() => {
        statusEl.style.opacity = '0';
        setTimeout(() => {
            statusEl.textContent = '';
            statusEl.style.opacity = '1';
        }, 300);
    }, 2000);
}