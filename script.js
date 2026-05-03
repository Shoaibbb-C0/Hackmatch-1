// FILE: script.js
// Router Class
class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = '';
        
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }

    addRoute(path, handler) {
        this.routes[path] = handler;
    }

    handleRoute() {
        const hash = window.location.hash.slice(1) || 'home';
        const route = this.routes[hash] || this.routes['home'];
        
        // Page transition
        const app = document.getElementById('app');
        app.style.opacity = '0';
        
        setTimeout(() => {
            route();
            app.style.opacity = '1';
            this.currentRoute = hash;
            this.updateActiveLink(hash);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 200);
    }

    updateActiveLink(route) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.route === route) {
                link.classList.add('active');
            }
        });
    }
}

// Initialize Router
const router = new Router();

// Home Page
router.addRoute('home', () => {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="page">
            <section class="hero">
                <div class="hero-content">
                    <h1>Find Your Perfect Hackathon Team</h1>
                    <p>Connect with talented hackers, join amazing projects, and build the future together</p>
                    <button class="cta-button" onclick="window.location.hash='teammates'">Start Matching</button>
                </div>
            </section>

            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">🚀</div>
                    <h3>Smart Matching</h3>
                    <p>Our algorithm connects you with teammates who complement your skills and share your vision.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🏆</div>
                    <h3>Top Hackathons</h3>
                    <p>Browse and join the most prestigious hackathons from around the globe.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">💡</div>
                    <h3>Build Together</h3>
                    <p>Collaborate in real-time, share ideas, and create winning projects.</p>
                </div>
            </div>

            <div class="activity-feed">
                <h2>Live Activity</h2>
                <div class="feed-scroll">
                    ${generateFeedItems()}
                </div>
            </div>
        </div>
    `;
});

// Hackathons Page
router.addRoute('hackathons', () => {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="page hackathons-page">
            <div class="page-header">
                <h1>Discover Hackathons</h1>
                <p>Join the next big event and showcase your skills</p>
            </div>

            <div class="filter-bar">
                <div class="filter-group">
                    <button class="filter-btn active">All</button>
                    <button class="filter-btn">Online</button>
                    <button class="filter-btn">In-Person</button>
                    <button class="filter-btn">Upcoming</button>
                    <button class="filter-btn">This Week</button>
                </div>
                <div class="view-toggle">
                    <button class="toggle-btn active">Grid</button>
                    <button class="toggle-btn">Table</button>
                </div>
            </div>

            <div class="hackathons-grid">
                ${generateHackathonCards()}
            </div>
        </div>
    `;

    // Filter functionality
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
});

// Teammates Page
router.addRoute('teammates', () => {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="page teammates-page">
            <div class="page-header">
                <h1>Find Teammates</h1>
                <p>Connect with talented individuals</p>
            </div>

            <div class="teammates-layout">
                <aside class="sidebar">
                    <h3>Filters</h3>
                    <div class="filter-section">
                        <h4>Skills</h4>
                        <div class="checkbox-group">
                            <label><input type="checkbox"> Frontend</label>
                            <label><input type="checkbox"> Backend</label>
                            <label><input type="checkbox"> Design</label>
                            <label><input type="checkbox"> AI/ML</label>
                            <label><input type="checkbox"> DevOps</label>
                        </div>
                    </div>
                    <div class="filter-section">
                        <h4>Experience</h4>
                        <div class="checkbox-group">
                            <label><input type="checkbox"> Beginner</label>
                            <label><input type="checkbox"> Intermediate</label>
                            <label><input type="checkbox"> Advanced</label>
                        </div>
                    </div>
                    <div class="filter-section">
                        <h4>Availability</h4>
                        <div class="checkbox-group">
                            <label><input type="checkbox"> Available Now</label>
                            <label><input type="checkbox"> This Week</label>
                            <label><input type="checkbox"> This Month</label>
                        </div>
                    </div>
                </aside>

                <main class="teammates-main">
                    <div class="post-input">
                        <div class="terminal-input">
                            <span class="terminal-prompt">$</span>
                            <input type="text" id="postInput" placeholder="Looking for teammates? Post your requirements...">
                        </div>
                        <button class="post-btn" onclick="addPost()">Post</button>
                    </div>

                    <div class="teammates-grid" id="teammatesGrid">
                        ${generateTeammateCards()}
                    </div>
                </main>
            </div>
        </div>
    `;
});

// Profile Page
router.addRoute('profile', () => {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="page profile-page">
            <div class="profile-header">
                <div class="profile-avatar"></div>
                <div class="profile-info">
                    <h1>Alex Morgan</h1>
                    <p class="profile-bio">Full-stack developer passionate about AI and blockchain. Love building innovative solutions at hackathons!</p>
                    <div class="profile-skills">
                        <span class="skill">React</span>
                        <span class="skill">Node.js</span>
                        <span class="skill">Python</span>
                        <span class="skill">TensorFlow</span>
                        <span class="skill">Web3</span>
                    </div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">24</div>
                    <div class="stat-label">Hackathons</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">12</div>
                    <div class="stat-label">Wins</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">156</div>
                    <div class="stat-label">Connections</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">89</div>
                    <div class="stat-label">Projects</div>
                </div>
            </div>

            <div class="tabs">
                <button class="tab-btn active" data-tab="posts">Posts</button>
                <button class="tab-btn" data-tab="participation">Participation</button>
            </div>

            <div class="tab-content active" id="posts">
                <div class="posts-list">
                    <div class="post-card">
                        <h3>Looking for ML expert for ETHGlobal</h3>
                        <p>Need someone experienced with PyTorch for our healthcare AI project. DM if interested!</p>
                        <div class="post-meta">
                            <span>📅 2 days ago</span>
                            <span>💬 12 responses</span>
                            <span>👁️ 234 views</span>
                        </div>
                    </div>
                    <div class="post-card">
                        <h3>Team successfully formed!</h3>
                        <p>Found an amazing team for the upcoming HackMIT. Thanks HackMatch!</p>
                        <div class="post-meta">
                            <span>📅 1 week ago</span>
                            <span>💬 8 responses</span>
                            <span>👁️ 156 views</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tab-content" id="participation">
                <div class="participation-list">
                    <div class="participation-card">
                        <h3>ETHGlobal San Francisco</h3>
                        <p>Built a decentralized healthcare records system</p>
                        <div class="participation-meta">
                            <span>🏆 1st Place</span>
                            <span>📅 Nov 2024</span>
                            <span>👥 4 members</span>
                        </div>
                    </div>
                    <div class="participation-card">
                        <h3>HackMIT 2024</h3>
                        <p>AI-powered code review assistant</p>
                        <div class="participation-meta">
                            <span>🏆 Top 10</span>
                            <span>📅 Oct 2024</span>
                            <span>👥 3 members</span>
                        </div>
                    </div>
                    <div class="participation-card">
                        <h3>TreeHacks Stanford</h3>
                        <p>Real-time collaboration platform for remote teams</p>
                        <div class="participation-meta">
                            <span>🏆 Best UI/UX</span>
                            <span>📅 Sep 2024</span>
                            <span>👥 4 members</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            e.target.classList.add('active');
            document.getElementById(e.target.dataset.tab).classList.add('active');
        });
    });
});

// About Page
router.addRoute('about', () => {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="page about-page">
            <div class="page-header">
                <h1>About HackMatch</h1>
                <p>Empowering hackers to build together</p>
            </div>

            <div class="terminal-section">
                <div class="terminal-header">
                    <span class="terminal-dot dot-red"></span>
                    <span class="terminal-dot dot-yellow"></span>
                    <span class="terminal-dot dot-green"></span>
                </div>
                <div class="terminal-body">
                    <div class="terminal-line"><span class="terminal-prompt-text">$</span> cat origin_story.txt</div>
                    <div class="terminal-line">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
                    <div class="terminal-line">In 2024, three hackers met at a hackathon...</div>
                    <div class="terminal-line">They struggled to find the right teammates.</div>
                    <div class="terminal-line">That night, HackMatch was born.</div>
                    <div class="terminal-line">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
                    <div class="terminal-line"></div>
                    <div class="terminal-line"><span class="terminal-prompt-text">$</span> ./mission.sh</div>
                    <div class="terminal-line">🎯 Connecting 10,000+ hackers worldwide</div>
                    <div class="terminal-line">🚀 Powering 500+ hackathon teams</div>
                    <div class="terminal-line">💡 Building the future, one team at a time</div>
                </div>
            </div>

            <div class="mission-grid">
                <div class="mission-card">
                    <div class="mission-icon">🤝</div>
                    <h3>Connect</h3>
                    <p>Bridge the gap between talented individuals looking to collaborate</p>
                </div>
                <div class="mission-card">
                    <div class="mission-icon">⚡</div>
                    <h3>Innovate</h3>
                    <p>Foster innovation through diverse team collaboration</p>
                </div>
                <div class="mission-card">
                    <div class="mission-icon">🌍</div>
                    <h3>Global</h3>
                    <p>Create a worldwide community of passionate builders</p>
                </div>
            </div>

            <div class="terminal-section">
                <div class="terminal-header">
                    <span class="terminal-dot dot-red"></span>
                    <span class="terminal-dot dot-yellow"></span>
                    <span class="terminal-dot dot-green"></span>
                </div>
                <div class="terminal-body">
                    <div class="terminal-line"><span class="terminal-prompt-text">$</span> git log --stats</div>
                    <div class="terminal-line"></div>
                    <div class="terminal-line">📊 Platform Statistics:</div>
                    <div class="terminal-line">├── Active Users: 12,547</div>
                    <div class="terminal-line">├── Teams Formed: 3,892</div>
                    <div class="terminal-line">├── Hackathons Listed: 247</div>
                    <div class="terminal-line">├── Projects Built: 6,734</div>
                    <div class="terminal-line">└── Awards Won: 1,289</div>
                    <div class="terminal-line"></div>
                    <div class="terminal-line"><span style="color: var(--neon-green);">✓</span> All systems operational</div>
                </div>
            </div>
        </div>
    `;
});

// Helper Functions
function generateFeedItems() {
    const items = [
        { user: 'Sarah Chen', action: 'joined ETHGlobal SF', time: '2m ago', avatar: 1 },
        { user: 'Mike Ross', action: 'won HackMIT 2024', time: '15m ago', avatar: 2 },
        { user: 'Emma Liu', action: 'looking for React developer', time: '1h ago', avatar: 3 },
        { user: 'James Park', action: 'completed AI/ML project', time: '2h ago', avatar: 4 },
        { user: 'Olivia Davis', action: 'joined TreeHacks', time: '3h ago', avatar: 5 },
        { user: 'Alex Morgan', action: 'formed new team', time: '5h ago', avatar: 6 }
    ];

    return items.map(item => `
        <div class="feed-item">
            <div class="feed-item-header">
                <div class="feed-avatar" style="background: linear-gradient(${item.avatar * 45}deg, var(--neon-green), var(--neon-blue))"></div>
                <div>
                    <div class="feed-user">${item.user}</div>
                    <div class="feed-time">${item.time}</div>
                </div>
            </div>
            <p>${item.action}</p>
        </div>
    `).join('');
}

function generateHackathonCards() {
    const hackathons = [
        {
            title: 'ETHGlobal San Francisco',
            date: 'Dec 15-17, 2024',
            location: '📍 San Francisco, CA',
            tags: ['Blockchain', 'Web3', 'DeFi'],
            prize: '$100K'
        },
        {
            title: 'HackMIT 2024',
            date: 'Dec 20-22, 2024',
            location: '🌐 Virtual',
            tags: ['AI/ML', 'Open Track'],
            prize: '$50K'
        },
        {
            title: 'TreeHacks Stanford',
            date: 'Jan 10-12, 2025',
            location: '📍 Palo Alto, CA',
            tags: ['Healthcare', 'Education', 'Climate'],
            prize: '$75K'
        },
        {
            title: 'CalHacks 11.0',
            date: 'Jan 25-27, 2025',
            location: '📍 Berkeley, CA',
            tags: ['Hardware', 'IoT', 'Mobile'],
            prize: '$60K'
        },
        {
            title: 'MHacks 16',
            date: 'Feb 1-3, 2025',
            location: '🌐 Virtual',
            tags: ['Social Good', 'Sustainability'],
            prize: '$40K'
        },
        {
            title: 'HackNYU 2025',
            date: 'Feb 15-17, 2025',
            location: '📍 New York, NY',
            tags: ['Fintech', 'AR/VR', 'Gaming'],
            prize: '$55K'
        }
    ];

    return hackathons.map(hack => `
        <div class="hackathon-card">
            <h3>${hack.title}</h3>
            <div class="hackathon-meta">
                <span>📅 ${hack.date}</span>
                <span>${hack.location}</span>
            </div>
            <div class="tags">
                ${hack.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <p style="color: var(--neon-green); font-weight: bold; margin-bottom: 1rem;">Prize Pool: ${hack.prize}</p>
            <button class="join-btn">Join Hackathon</button>
        </div>
    `).join('');
}

function generateTeammateCards() {
    const teammates = [
        {
            name: 'Sarah Chen',
            role: 'Full-stack Developer',
            skills: ['React', 'Node.js', 'MongoDB']
        },
        {
            name: 'Mike Ross',
            role: 'AI/ML Engineer',
            skills: ['Python', 'TensorFlow', 'PyTorch']
        },
        {
            name: 'Emma Liu',
            role: 'Product Designer',
            skills: ['Figma', 'UI/UX', 'Prototyping']
        },
        {
            name: 'James Park',
            role: 'Backend Developer',
            skills: ['Go', 'Kubernetes', 'PostgreSQL']
        },
        {
            name: 'Olivia Davis',
            role: 'Blockchain Developer',
            skills: ['Solidity', 'Web3.js', 'Ethereum']
        },
        {
            name: 'Ryan Taylor',
            role: 'Mobile Developer',
            skills: ['React Native', 'Swift', 'Firebase']
        }
    ];

    return teammates.map((teammate, idx) => `
        <div class="teammate-card">
            <div class="teammate-avatar" style="background: linear-gradient(${idx * 60}deg, var(--neon-green), var(--neon-blue))"></div>
            <h3>${teammate.name}</h3>
            <p class="teammate-role">${teammate.role}</p>
            <div class="skills">
                ${teammate.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
            </div>
            <button class="connect-btn">Connect</button>
        </div>
    `).join('');
}

// Add post functionality
function addPost() {
    const input = document.getElementById('postInput');
    if (input && input.value.trim()) {
        const grid = document.getElementById('teammatesGrid');
        const newPost = document.createElement('div');
        newPost.className = 'teammate-card';
        newPost.style.gridColumn = '1 / -1';
        newPost.innerHTML = `
            <h3 style="text-align: left;">New Post</h3>
            <p style="text-align: left; color: var(--text-secondary);">${input.value}</p>
            <div class="post-meta" style="justify-content: flex-start; margin-top: 1rem;">
                <span>📅 Just now</span>
                <span>👤 You</span>
            </div>
        `;
        grid.insertBefore(newPost, grid.firstChild);
        input.value = '';
        
        // Animate new post
        newPost.style.opacity = '0';
        newPost.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            newPost.style.transition = 'all 0.5s ease';
            newPost.style.opacity = '1';
            newPost.style.transform = 'translateY(0)';
        }, 10);
    }
}

// Hamburger menu toggle
document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navMenu').classList.remove('active');
    });
});

// Initialize
window.addEventListener('load', () => {
    if (!window.location.hash) {
        window.location.hash = 'home';
    }
});