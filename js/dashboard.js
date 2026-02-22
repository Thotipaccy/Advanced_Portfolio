// Initialize Dashboard

// Skills Chart
const ctx = document.getElementById('skillsChart').getContext('2d');
let skillsChart;

function initChart(type = 'radar') {
    const data = {
        labels: ['Python', 'JavaScript', 'React', 'SQL', 'AWS', 'Node.js'],
        datasets: [{
            label: 'Proficiency Level',
            data: [85, 75, 70, 65, 60, 70],
            backgroundColor: 'rgba(102, 126, 234, 0.2)',
            borderColor: '#667eea',
            borderWidth: 2,
            pointBackgroundColor: '#667eea',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#667eea'
        }]
    };
    
    const config = {
        type: type,
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: type === 'radar' ? {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            } : {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    };
    
    if (skillsChart) {
        skillsChart.destroy();
    }
    
    skillsChart = new Chart(ctx, config);
}

// Initialize with radar chart
initChart('radar');

// Change chart type
function changeChartType(type) {
    initChart(type);
    
    // Update active button
    document.querySelectorAll('[onclick^="changeChartType"]').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Initialize Calendar
document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek'
            },
            events: [
                {
                    title: 'Database Assignment Due',
                    start: '2025-03-15',
                    color: '#dc3545'
                },
                {
                    title: 'Web Dev Project',
                    start: '2025-03-20',
                    end: '2025-03-22',
                    color: '#ffc107'
                },
                {
                    title: 'Midterm Exams',
                    start: '2025-03-25',
                    end: '2025-03-30',
                    color: '#28a745'
                }
            ]
        });
        calendar.render();
    }
});

// GitHub Stats (mock data - replace with actual API calls)
document.getElementById('repoCount').textContent = '15';
document.getElementById('commitCount').textContent = '247';

// Refresh Dashboard
function refreshDashboard() {
    // Show loading spinner
    const refreshBtn = document.querySelector('.refresh-btn');
    refreshBtn.classList.add('fa-spin');
    
    // Simulate API calls
    setTimeout(() => {
        // Update with new mock data
        document.getElementById('repoCount').textContent = Math.floor(Math.random() * 20 + 10);
        document.getElementById('commitCount').textContent = Math.floor(Math.random() * 300 + 100);
        
        refreshBtn.classList.remove('fa-spin');
        
        // Show toast notification
        alert('Dashboard updated!');
    }, 1500);
}

// Export Data
function exportData() {
    const data = {
        projects: [
            { name: 'E-Learning Platform', progress: 90 },
            { name: 'Student Performance ML', progress: 75 },
            { name: 'Cloud Storage System', progress: 60 }
        ],
        stats: {
            repos: 15,
            commits: 247,
            leetcode: 89,
            streak: 21
        }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard-data.json';
    a.click();
}

// Add Project
function addProject() {
    const form = document.getElementById('addProjectForm');
    if (form.checkValidity()) {
        // Add project logic here
        alert('Project added successfully!');
        bootstrap.Modal.getInstance(document.getElementById('addProjectModal')).hide();
        form.reset();
    } else {
        form.reportValidity();
    }
}