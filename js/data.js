// js/data.js

// Your portfolio data structure
const defaultPortfolioData = {
    profile: {
        name: "THOTI PACIFIQUE NIBISHAKA",
        title: "Software Engineering Student | Passionate Developer | Future Tech Leader",
        location: "Kigali, Rwanda",
        email: "thotipaccy@gmail.com",
        phone: "+250 786 308 963",
        bio: "I am THOTI PACIFIQUE NIBISHAKA, a passionate software engineering student from Rwanda. Currently pursuing my Bachelor's Degree in Software Engineering, I am deeply committed to learning and applying cutting-edge technologies to solve real-world problems. Based in Kigali, Rwanda, I bring a unique perspective to software development with my strong foundation in both technical skills and soft skills. My journey in technology started with curiosity and has evolved into a passion for creating innovative solutions that make a difference.",
        avatar: "image.png",
        stats: {
            yearsLearning: "3+",
            skillsMastered: "10+",
            dedication: "100%"
        }
    },
    education: [
        {
            id: 1,
            degree: "Bachelor's Degree in Software Engineering",
            period: "2023 - Pursuing",
            description: "Currently pursuing a comprehensive software engineering program focusing on modern development practices, algorithms, data structures, and software architecture.",
            current: true
        },
        {
            id: 2,
            degree: "A'Level & O'Level",
            period: "2016 - 2022",
            school: "Petit Seminaire Saint Kizito de Zaza",
            description: "Completed advanced level education with focus on mathematics, physics, and computer science, laying the foundation for my technical journey.",
            current: false
        }
    ],
    technicalSkills: [
        { name: "HTML5", icon: "fab fa-html5", category: "frontend" },
        { name: "CSS3", icon: "fab fa-css3-alt", category: "frontend" },
        { name: "JavaScript", icon: "fab fa-js", category: "frontend" },
        { name: "Java", icon: "fab fa-java", category: "backend" },
        { name: "Oracle SQL", icon: "fas fa-database", category: "database" },
        { name: "Big Data (Basics)", icon: "fas fa-database", category: "data" },
        { name: "Networking Devices & Initial Configurations", icon: "fas fa-network-wired", category: "networking" },
        { name: "Python", icon: "fab fa-python", category: "backend" },
        { name: "PHP", icon: "fab fa-php", category: "backend" }
    ],
    softSkills: [
        { name: "Leadership", icon: "fas fa-users" },
        { name: "Time Management", icon: "fas fa-clock" },
        { name: "Team Work", icon: "fas fa-handshake" },
        { name: "Communication", icon: "fas fa-comments" },
        { name: "Driving", icon: "fas fa-car" }
    ],
    projects: [
        {
            id: 1,
            title: "Venus and Napping - VAPT",
            description: "X Company engaged a black-box penetration test and vulnerability assessment on two VulnHub servers (Venus, Napping). The engagement identified misconfigurations, outdated software, and privilege-escalation paths, with recommendations for patching, hardening, and stronger access controls.",
            technologies: ["Security", "VAPT", "Linux"],
            githubUrl: "https://github.com/Thotipaccy/venus-napping-vapt",
            icon: "fas fa-shield-halved",
            featured: true
        },
        {
            id: 2,
            title: "Student Performance Analytics",
            description: "Analyzes UCI Student Performance data with data cleaning, feature engineering, and machine learning to identify at-risk students. Results are presented via an interactive Power BI dashboard with risk scoring and recommendations.",
            technologies: ["Python", "ML", "Power BI"],
            githubUrl: "https://github.com/Thotipaccy/StudentPerformanceAnalytics",
            icon: "fas fa-chart-line",
            featured: true
        },
        {
            id: 3,
            title: "Uber Fares Dataset Analysis",
            description: "Explores Uber fares to uncover patterns in pricing, ride durations, and KPIs. Insights are delivered via a Power BI dashboard, with data prep and exploration in Python.",
            technologies: ["Python", "Analytics", "Power BI"],
            githubUrl: "https://github.com/Thotipaccy/PowerBi",
            icon: "fas fa-car",
            featured: true
        }
    ],
    socialLinks: {
        github: "https://github.com/Thotipaccy",
        email: "mailto:thotipaccy@gmail.com"
    },
    settings: {
        theme: "light",
        showAbout: true,
        showEducation: true,
        showSkills: true,
        showProjects: true,
        showContact: true
    }
};

// Data management functions
const PortfolioData = {
    init: function() {
        if (!localStorage.getItem('thotiPortfolioData')) {
            localStorage.setItem('thotiPortfolioData', JSON.stringify(defaultPortfolioData));
        }
        return this.getAll();
    },
    
    getAll: function() {
        return JSON.parse(localStorage.getItem('thotiPortfolioData')) || defaultPortfolioData;
    },
    
    saveAll: function(data) {
        localStorage.setItem('thotiPortfolioData', JSON.stringify(data));
        return data;
    },
    
    updateSection: function(section, data) {
        const allData = this.getAll();
        allData[section] = data;
        return this.saveAll(allData);
    },
    
    getSection: function(section) {
        return this.getAll()[section];
    },
    
    reset: function() {
        localStorage.setItem('thotiPortfolioData', JSON.stringify(defaultPortfolioData));
        return defaultPortfolioData;
    }
};