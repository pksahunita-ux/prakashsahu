/**
 * Main JavaScript Application
 * 
 * Responsible for fetching data and rendering the academic portfolio.
 * Design Philosophy: Minimal, Modular, Vanilla JS, No external dependencies.
 */

// --- Constants & Config ---
const CONFIG = {
    DATA_DIR: 'data/',
    DEFAULT_TITLE: 'Prakash Kumar Sahu | Academic Portfolio',
    NAV_ITEMS: [
        {
            label: 'Education & Experience',
            id: 'edu-exp',
            children: [
                { label: 'B.Tech', link: 'btech.html', id: 'btech-nav' },
                { label: 'M.Tech', link: 'mtech.html', id: 'mtech-nav' },
                { label: 'PhD Research', link: 'phd.html', id: 'phd-nav' },
                { label: 'Post-Doctoral Fellow', link: 'postdoc.html', id: 'postdoc-nav' },
                { label: 'Experience', link: 'experience.html', id: 'experience-nav' }
            ]
        },
        { label: 'Journal Publications', link: 'publications.html', id: 'publications' },
        {
            label: 'More',
            id: 'more',
            children: [
                { label: 'Research Interest', link: 'research.html', id: 'research' },
                { label: 'Teaching', link: 'teaching.html', id: 'teaching' },
                { label: 'Students', link: 'students.html', id: 'students' },
                { label: 'Events', link: 'events.html', id: 'events' },
                { label: 'Contact', link: 'contact.html', id: 'contact' }
            ]
        }
    ]
};

// --- Utilities ---

/**
 * Fetch JSON data from a given path with error handling.
 * @param {string} filename - The name of the JSON file to fetch.
 * @returns {Promise<Object|null>} The parsed JSON data or null on failure.
 */
async function fetchJSON(filename) {
    try {
        const response = await fetch(`${CONFIG.DATA_DIR}${filename}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        // In production, we might want to log this to an analytics service
        // console.error(`Failed to load ${filename}:`, error);
        return null;
    }
}

/**
 * Create a DOM element with specified attributes and children.
 * @param {string} tag - HTML tag name.
 * @param {Object} attributes - Key-value pairs for attributes (class, id, etc.).
 * @param {Array<string|Node>} children - Text or DOM nodes to append.
 * @returns {HTMLElement} The created element.
 */
function el(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);

    // Set attributes and properties
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'dataset') {
            Object.entries(value).forEach(([dataKey, dataValue]) => {
                element.dataset[dataKey] = dataValue;
            });
        } else if (key.startsWith('on') && typeof value === 'function') {
            element[key] = value;
        } else if (key === 'innerHTML') {
            element.innerHTML = value;
        } else {
            element.setAttribute(key, value);
        }
    });

    // Append children
    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            element.appendChild(child);
        }
    });

    return element;
}

/**
 * Renders a loading state or error message.
 * @param {HTMLElement} container - The container to render into.
 * @param {string} message - Message to display.
 */
function renderMessage(container, message) {
    container.innerHTML = ''; // Clear previous content
    container.appendChild(el('p', { className: 'status-message' }, [message]));
}

// --- Theme Management ---

/**
 * Initializes the theme based on local storage or system preference.
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

/**
 * Toggles between light and dark themes.
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update the icon
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
        btn.innerHTML = '';
        btn.appendChild(getThemeIcon());
    }
}

/**
 * Returns the appropriate SVG icon for the current theme.
 * @returns {SVGElement} The SVG icon element.
 */
function getThemeIcon() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const isDark = currentTheme === 'dark';

    // Simple SVG icons
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    const wrapper = document.createElement('span');
    wrapper.innerHTML = isDark ? sunIcon : moonIcon; // Show sun in dark mode (to switch to light), moon in light mode
    return wrapper.firstChild;
}

// --- Mobile Navigation ---

/**
 * Toggles the mobile navigation menu.
 */
function toggleMenu() {
    const nav = document.querySelector('.main-nav');
    const toggleBtn = document.querySelector('.mobile-menu-btn');
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';

    // Toggle icons
    const menuIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

    if (isExpanded) {
        nav.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.innerHTML = menuIcon;
        document.body.style.overflow = ''; // Restore scrolling
        
        // Ensure ALL dropdowns are closed when the drawer closes
        document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
    } else {
        nav.classList.add('active');
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.innerHTML = closeIcon;
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

/**
 * Handles dropdown toggling on mobile.
 */
function toggleDropdown(event) {
    // Media query matching the CSS breakpoint
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (isMobile) {
        // Prevent default and stop propagation only for mobile dropdown toggles
        event.preventDefault();
        event.stopPropagation();

        const parent = event.currentTarget.closest('.dropdown');
        if (!parent) return;

        // Close other open dropdowns for a clean accordion effect
        document.querySelectorAll('.dropdown.open').forEach(openDropdown => {
            if (openDropdown !== parent) {
                openDropdown.classList.remove('open');
            }
        });

        // Toggle visibility of the current one
        parent.classList.toggle('open');
    }
}

// --- Component Renderers ---

/**
 * Renders the site header and navigation.
 * @param {string} activePageId - The ID of the current page.
 */
function renderHeader(activePageId) {
    const header = document.getElementById('site-header');
    if (!header) return;

    const navList = el('ul', { className: 'nav-list' });

    CONFIG.NAV_ITEMS.forEach(item => {
        let li;

        if (item.children) {
            // Dropdown Item
            const label = el('a', {
                href: 'javascript:void(0)',
                className: 'dropdown-toggle',
                'aria-haspopup': 'true',
                onclick: toggleDropdown
            }, [
                item.label,
                // Arrow Icon
                el('span', { 
                    className: 'arrow-icon', 
                    innerHTML: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>` 
                })
            ]);

            const dropdownMenu = el('ul', { className: 'dropdown-menu' });

            let isActiveParent = false;

            item.children.forEach(child => {
                const childLink = el('a', { href: child.link }, [child.label]);
                if (child.id === activePageId) {
                    childLink.classList.add('active');
                    isActiveParent = true;
                }
                dropdownMenu.appendChild(el('li', {}, [childLink]));
            });

            if (isActiveParent) {
                label.classList.add('active-parent');
            }

            li = el('li', { className: 'dropdown' }, [label, dropdownMenu]);

        } else {
            // Normal Item
            const link = el('a', { href: item.link }, [item.label]);
            if (item.id === activePageId) {
                link.setAttribute('aria-current', 'page');
                link.classList.add('active');
            }
            li = el('li', {}, [link]);
        }

        navList.appendChild(li);
    });

    const nav = el('nav', { className: 'main-nav' }, [navList]);

    // Theme Toggle
    const themeBtn = el('button', {
        className: 'theme-toggle',
        ariaLabel: 'Toggle Dark Mode',
        onclick: toggleTheme
    }, [
        getThemeIcon()
    ]);

    // Mobile Menu Button
    const mobileMenuBtn = el('button', {
        className: 'mobile-menu-btn',
        ariaLabel: 'Toggle Navigation',
        'aria-expanded': 'false',
        onclick: toggleMenu
    }, [
        // Default Hamburger Icon
        el('span', { innerHTML: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>` })
    ]);
    // Fix: innerHTML in el helper doesn't work directly like that because we create text nodes for strings.
    // Let's just set innerHTML on the button manually or use a helper that returns the node.
    // Simplifying:
    mobileMenuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;


    // Container for nav + buttons
    // On mobile: Branding | [ThemeToggle] [MobileMenu]
    const controls = el('div', { className: 'header-controls' }, [themeBtn, mobileMenuBtn]);

    // We want the nav to be part of the container context or separate?
    // Structure: 
    // [Branding]       [Controls: Theme, Menu]
    // [Main Nav (starts hidden on mobile)]

    const branding = el('div', { className: 'branding' }, [
        el('a', { href: 'index.html', className: 'site-title' }, [
            el('img', { src: 'assets/images/profile/prof_sahu.jpg', alt: 'Prof. Sahu Logo', className: 'site-logo' }),
            el('span', {}, ['Prof. Prakash Kumar Sahu'])
        ])
    ]);

    const container = el('div', { className: 'nav-container' }, [branding, nav, controls]);

    header.innerHTML = '';
    header.appendChild(container);
}

/**
 * Renders the site footer.
 */
function renderFooter() {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    const year = new Date().getFullYear();
    const text = `© ${year} Prakash Kumar Sahu. All rights reserved.`;

    footer.innerHTML = '';
    footer.appendChild(el('div', { className: 'container' }, [
        el('p', {}, [text])
    ]));
}

// --- Helper Renderer ---
/**
 * Renders a standardized page hero section.
 * @param {HTMLElement} container - Container to append to.
 * @param {string} title - Page title.
 * @param {string} imagePath - Path to the hero image.
 */
function renderPageHero(container, title, imagePath) {
    const heroContent = [
        el('h1', { className: 'hero-title-overlay' }, [title]) // Optional overlay title
    ];

    // Create hero container
    const hero = el('div', { className: 'page-hero main-hero' }, [
        el('img', { src: imagePath, alt: title, className: 'hero-img' }),
        el('div', { className: 'hero-overlay' }, heroContent)
    ]);

    container.appendChild(hero);
    container.appendChild(hero);
}

/**
 * Renders a scrolling hero carousel.
 * @param {HTMLElement} container - Container to append to.
 * @param {string} title - Page title.
 * @param {Array<string>} images - Array of image paths.
 */
function renderHeroCarousel(container, title, images) {
    const heroContent = [
        el('h1', { className: 'hero-title-overlay' }, [title])
    ];

    const slides = images.map(src =>
        el('div', { className: 'carousel-item' }, [
            el('img', { src: src, alt: title, className: 'hero-img' })
        ])
    );

    const carousel = el('div', { className: 'hero-carousel full-bleed' }, slides);

    const wrapper = el('div', { className: 'carousel-wrapper main-hero' }, [
        carousel,
        el('div', { className: 'hero-overlay' }, heroContent)
    ]);

    container.appendChild(wrapper);
}

// --- Page Specific Renderers ---

/**
 * Renders the Professor's Profile page from profile.json only (no contact details).
 */
async function renderProfile(container) {
    const profile = await fetchJSON('profile.json');
    if (!profile) {
        renderMessage(container, 'Unable to load profile data.');
        return;
    }

    // Profile Image
    const profileImage = el('img', {
        src: 'assets/images/profile/prof_sahu.jpg',
        alt: profile.name || 'Profile Image',
        className: 'profile-image'
    });
    profileImage.onerror = () => { profileImage.style.display = 'none'; };

    // Profile Details
    const profileDetails = el('div', { className: 'profile-details' }, [
        el('h1', { className: 'profile-name' }, [`${profile.name}`]),
        el('h2', { className: 'profile-title' }, [profile.designation || ""]),
        el('div', { className: 'profile-meta' }, [
            el('span', { className: 'profile-dept' }, [profile.department || '']),
            ', ',
            el('span', { className: 'profile-inst' }, [profile.institution || '']),
            (profile.location ? ', ' + profile.location : ''),
            (profile.institute_tagline ? el('span', { className: 'profile-tagline' }, [" - " + profile.institute_tagline]) : null)
        ])
    ]);

    // Short Bio
    const bioSection = el('section', { className: 'profile-bio-section' }, [
        el('p', { className: 'profile-bio' }, [profile.shortBio || ""])
    ]);

    // Research Profiles / Social Links
    const socialLinksSection = el('section', { className: 'profile-socials-section' });
    const socialLinksTitle = el('h4', { className: 'profile-socials-title' }, ['Research Profiles']);
    const socialLinks = el('div', { className: 'profile-socials' });

    if (profile.researcherIds) {
        Object.entries(profile.researcherIds).forEach(([platform, url]) => {
            if (url) {
                const label = platform.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
                socialLinks.appendChild(
                    el('a', {
                        href: url,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        className: 'btn-outline',
                        'aria-label': label
                    }, [label])
                );
            }
        });
    }
    socialLinksSection.appendChild(socialLinksTitle);
    socialLinksSection.appendChild(socialLinks);

    // Render all sections (no contact section)
    container.appendChild(
        el('section', { className: 'profile-header' }, [
            profileDetails,
            el('div', { className: 'profile-image-wrapper' }, [profileImage])
        ])
    );
    container.appendChild(bioSection);
    container.appendChild(el('hr', { className: 'divider' }));
    container.appendChild(socialLinksSection);
}

/**
 * Renders the Experience page.
 */
async function renderExperience(container) {
    const data = await fetchJSON('experience.json');
    if (!data || !data.experience) {
        renderMessage(container, 'Unable to load experience data.');
        return;
    }

    const fragment = document.createDocumentFragment();

    // Add Hero Image
    renderPageHero(fragment, 'Experience', 'assets/images/hero/experince.png');

    // fragment.appendChild(el('h1', {}, ['Professional Experience']));

    const list = el('ul', { className: 'timeline-list' });

    data.experience.forEach(exp => {
        // Generate ID for deep linking
        let itemId = '';
        const posLower = exp.position.toLowerCase();
        if (posLower.includes('post-doctoral') || posLower.includes('post doc')) itemId = 'post-doc';

        const item = el('li', { className: 'timeline-item', id: itemId }, [
            el('h3', { className: 'position' }, [exp.position]),
            el('div', { className: 'meta' }, [
                el('span', { className: 'institution' }, [exp.institution]),
                el('span', { className: 'period' }, [exp.period])
            ]),
            exp.details ? el('p', { className: 'details' }, [exp.details]) : null
        ].filter(Boolean));
        list.appendChild(item);
    });

    fragment.appendChild(list);
    container.appendChild(fragment);
}

/**
 * Renders the Research page.
 */
async function renderResearch(container) {
    const data = await fetchJSON('research.json');
    if (!data) {
        renderMessage(container, 'Unable to load research data.');
        return;
    }

    const fragment = document.createDocumentFragment();

    // Add Hero Carousel
    const resImages = [
        'assets/images/hero/research2.jpg',
        'assets/images/hero/research1.png',
        'assets/images/hero/research3.jpg'
    ];
    renderHeroCarousel(fragment, 'Research', resImages);

    if (data.summary) {
        fragment.appendChild(el('section', { className: 'research-summary' }, [
            el('p', { className: 'lead' }, [data.summary])
        ]));
    }

    if (data.researchInterests && data.researchInterests.length > 0) {
        fragment.appendChild(el('h2', {}, ['Research Interests']));
        const list = el('ul', { className: 'interest-list' });
        data.researchInterests.forEach(interest => {
            list.appendChild(el('li', {}, [interest]));
        });
        fragment.appendChild(list);
    }

    container.appendChild(fragment);
}

/**
 * Renders the Publications page.
 */
async function renderPublications(container) {
    const data = await fetchJSON('publications.json');
    if (!data) {
        renderMessage(container, 'Unable to load publications data.');
        return;
    }

    const fragment = document.createDocumentFragment();

    // Add Hero Carousel
    const pubImages = [
        'assets/images/hero/journal1.png',
        'assets/images/hero/journal2.png'
    ];
    renderHeroCarousel(fragment, 'Publications', pubImages);

    // Helper to render a publication list
    const renderPubList = (items, title) => {
        if (!items || items.length === 0) return null;

        const section = el('section', { className: 'pub-section' });
        section.appendChild(el('h2', {}, [title]));

        const list = el('ol', { className: 'pub-list' }); // Ordered list for academic citations

        items.forEach(pub => {
            // Construct citation string/elements
            const citation = [];

            // Authors
            if (pub.authors) citation.push(el('span', { className: 'authors' }, [pub.authors + '. ']));

            // Title
            if (pub.title) citation.push(el('strong', { className: 'pub-title' }, [`"${pub.title}". `]));

            // Venue/Journal
            const venue = pub.journal || pub.conference || pub.book;
            if (venue) citation.push(el('em', { className: 'venue' }, [venue + ', ']));

            // Details (Vol, pages, year)
            const detailsParts = [];
            if (pub.volume) detailsParts.push(`Vol. ${pub.volume}`);
            if (pub.pages) detailsParts.push(`pp. ${pub.pages}`);
            if (pub.year) detailsParts.push(`${pub.year}`);
            if (pub.location) detailsParts.push(`${pub.location}`);

            if (detailsParts.length > 0) {
                citation.push(el('span', { className: 'pub-details' }, [detailsParts.join(', ') + '.']));
            }

            // DOI Link
            if (pub.doi) {
                const doiUrl = pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`;
                citation.push(el('a', { href: doiUrl, className: 'doi-link', target: '_blank' }, [' [DOI]']));
            }

            list.appendChild(el('li', { className: 'pub-item' }, citation));
        });

        section.appendChild(list);
        return section;
    };

    const journals = renderPubList(data.journalPublications, 'Journal Publications');
    if (journals) fragment.appendChild(journals);

    const chapters = renderPubList(data.bookChapters, 'Book Chapters');
    if (chapters) fragment.appendChild(chapters);

    const conferences = renderPubList(data.conferencePublications, 'Conference Proceedings');
    if (conferences) fragment.appendChild(conferences);

    container.appendChild(fragment);
}

/**
 * Renders the Teaching page.
 */
async function renderTeaching(container) {
    const data = await fetchJSON('teaching.json');
    if (!data) {
        renderMessage(container, 'Unable to load teaching data.');
        return;
    }

    const fragment = document.createDocumentFragment();

    // Add Hero Carousel
    const teachImages = [
        'assets/images/hero/teaching2.png',
        'assets/images/hero/teaching1.png'
    ];
    renderHeroCarousel(fragment, 'Teaching', teachImages);

    const renderCourseList = (courses, title) => {
        if (!courses || courses.length === 0) return null;

        const section = el('section', { className: 'teaching-section' });
        section.appendChild(el('h2', {}, [title]));

        const list = el('ul', { className: 'course-list' });
        courses.forEach(course => {
            // Check if course is string or object
            const courseName = typeof course === 'string' ? course : course.title;
            list.appendChild(el('li', {}, [courseName]));
        });

        section.appendChild(list);
        return section;
    };

    const ugCourses = renderCourseList(data.undergraduateCourses, 'Undergraduate Courses');
    if (ugCourses) fragment.appendChild(ugCourses);

    const pgCourses = renderCourseList(data.postgraduateCourses, 'Postgraduate Courses');
    if (pgCourses) fragment.appendChild(pgCourses);

    container.appendChild(fragment);
}

/**
 * Renders the Students page.
 */
async function renderStudents(container) {
    const data = await fetchJSON('students.json');
    if (!data) {
        renderMessage(container, 'Unable to load students data.');
        return;
    }

    const fragment = document.createDocumentFragment();

    // Add Hero Carousel
    const studImages = [
        'assets/images/hero/student&mentor1.png',
        'assets/images/hero/student&mentor2.png'
    ];
    renderHeroCarousel(fragment, 'Students & Mentorship', studImages);

    // PhD Scholars
    if (data.phdScholars && data.phdScholars.length > 0) {
        fragment.appendChild(el('h2', {}, ['PhD Scholars']));
        const list = el('ul', { className: 'student-list' });
        data.phdScholars.forEach(student => {
            const content = [
                el('strong', {}, [student.name]),
                student.topic ? el('span', {}, [` - ${student.topic}`]) : null,
                student.status ? el('span', { className: 'status' }, [` (${student.status})`]) : null
            ].filter(Boolean);
            list.appendChild(el('li', {}, content));
        });
        fragment.appendChild(list);
    }

    // Masters Students
    if (data.mastersStudents && data.mastersStudents.length > 0) {
        fragment.appendChild(el('h2', {}, ['Masters Students']));
        const list = el('ul', { className: 'student-list' });
        data.mastersStudents.forEach(student => {
            const content = [
                el('strong', {}, [student.name]),
                student.topic ? el('span', {}, [` - ${student.topic}`]) : null,
                student.year ? el('span', { className: 'year' }, [` (${student.year})`]) : null
            ].filter(Boolean);
            list.appendChild(el('li', {}, content));
        });
        fragment.appendChild(list);
    }

    // Bachelor Projects
    if (data.bachelorProjects && data.bachelorProjects.length > 0) {
        fragment.appendChild(el('h2', {}, ['Bachelor Projects']));
        const list = el('ul', { className: 'student-list' });
        data.bachelorProjects.forEach(project => {
            const studentNames = Array.isArray(project.students) ? project.students.join(', ') : project.students;
            const content = [
                el('strong', {}, [studentNames]),
                project.title ? el('span', {}, [`: "${project.title}"`]) : null,
                project.year ? el('span', { className: 'year' }, [` (${project.year})`]) : null
            ].filter(Boolean);
            list.appendChild(el('li', {}, content));
        });
        fragment.appendChild(list);
    }

    container.appendChild(fragment);
}

/**
 * Renders the Events page.
 */
async function renderEvents(container) {
    const data = await fetchJSON('events.json');
    if (!data) {
        renderMessage(container, 'Unable to load events data.');
        return;
    }

    const fragment = document.createDocumentFragment();

    // Add Hero Carousel
    const eventImages = [
        'assets/images/hero/confrence1.png',
        'assets/images/hero/confrence 2.png'

    ];
    renderHeroCarousel(fragment, 'Events & Conferences', eventImages);

    const renderEventList = (events, title) => {
        if (!events || events.length === 0) return null;

        const section = el('section', { className: 'event-section' });
        section.appendChild(el('h2', {}, [title]));

        const list = el('ul', { className: 'event-list' });
        events.forEach(event => {
            const content = [
                el('strong', {}, [event.title || event.event]),
                event.location ? el('span', {}, [`, ${event.location}`]) : null,
                event.year ? el('span', { className: 'year' }, [` (${event.year})`]) : null,
                event.role ? el('span', { className: 'role' }, [` - ${event.role}`]) : null
            ].filter(Boolean);
            list.appendChild(el('li', {}, content));
        });
        section.appendChild(list);
        return section;
    };

    const conferences = renderEventList(data.conferences, 'Conferences Attended');
    if (conferences) fragment.appendChild(conferences);

    const workshops = renderEventList(data.workshops, 'Workshops & FDPs');
    if (workshops) fragment.appendChild(workshops);

    container.appendChild(fragment);
}

/**
 * Renders the Contact page.
 */
async function renderContact(container) {
    const data = await fetchJSON('contact.json');
    if (!data) {
        renderMessage(container, 'Unable to load contact data.');
        return;
    }

    const fragment = document.createDocumentFragment();

    renderPageHero(fragment, 'Contact', 'assets/images/hero/contact1.png');
    // fragment.appendChild(el('h1', {}, ['Contact']));

    const card = el('div', { className: 'contact-card' });

    if (data.email) {
        // Handle multiple emails separated by comma
        const emails = data.email.split(',').map(e => e.trim());
        const emailContainer = el('p', {}, [el('strong', {}, ['Email: '])]);

        emails.forEach((email, index) => {
            if (index > 0) emailContainer.appendChild(document.createTextNode(', '));
            emailContainer.appendChild(el('a', { href: `mailto:${email}` }, [email]));
        });
        card.appendChild(emailContainer);
    }

    if (data.institutionalPage) {
        card.appendChild(el('p', {}, [
            el('strong', {}, ['Institutional Page: ']),
            el('a', { href: data.institutionalPage, target: '_blank' }, ['Faculty Profile'])
        ]));
    }

    if (data.links && data.links.length > 0) {
        fragment.appendChild(el('h2', {}, ['Academic Profiles']));
        const linkList = el('ul', { className: 'link-list' });
        data.links.forEach(link => {
            linkList.appendChild(el('li', {}, [
                el('a', { href: link.url, target: '_blank', className: 'external-link' }, [link.label])
            ]));
        });
        card.appendChild(linkList);
    }

    fragment.appendChild(card);
    container.appendChild(fragment);
}

/**
 * Renders a detailed degree page (B.Tech, M.Tech, PhD, PostDoc).
 * @param {HTMLElement} container - The container to render into.
 * @param {string} jsonFilename - The JSON file to fetch data from.
 */
async function renderDegreeDetail(container, jsonFilename) {
    const data = await fetchJSON(jsonFilename);
    if (!data) {
        renderMessage(container, 'Unable to load degree details.');
        return;
    }

    const fragment = document.createDocumentFragment();

    // Hero Section with Carousel
    const heroImages = [];
    if (data.heroImage) heroImages.push(data.heroImage);
    if (data.gallery) heroImages.push(...data.gallery);

    // If we have multiple images, use carousel, else single hero
    if (heroImages.length > 1) {
        renderHeroCarousel(fragment, data.title, heroImages);
    } else if (heroImages.length === 1) {
        renderPageHero(fragment, data.title, heroImages[0]);
    } else {
        // Fallback title if no images
        fragment.appendChild(el('h1', {}, [data.title]));
    }

    // Header Section (Logo + Meta)
    const headerContent = [];
    if (data.logo) {
        const logo = el('img', { src: data.logo, alt: 'Institution Logo', className: 'detail-logo' });
        headerContent.push(logo);
    }

    const metaInfo = el('div', { className: 'detail-meta-group' }, [
        el('h2', { className: 'institution-name' }, [data.institution]),
        el('div', { className: 'year-badge' }, [data.year])
    ]);
    headerContent.push(metaInfo);

    const header = el('header', { className: 'detail-header' }, headerContent);
    fragment.appendChild(header);

    // Description
    if (data.description && Array.isArray(data.description)) {
        const descSection = el('section', { className: 'detail-description' });
        data.description.forEach(para => {
            descSection.appendChild(el('p', {}, [para]));
        });
        fragment.appendChild(descSection);
    }

    // Thesis Section
    if (data.thesis) {
        const thesisBox = el('div', { className: 'thesis-box' }, [
            el('h2', {}, ['Thesis']),
            el('h3', { className: 'thesis-title' }, [data.thesis.title]),
            el('p', { className: 'thesis-supervisor' }, [`Supervisor: ${data.thesis.supervisor}`]),
            el('p', { className: 'thesis-desc' }, [data.thesis.description])
        ]);
        fragment.appendChild(thesisBox);
    }

    // Gallery removed as it is now in the carousel

    container.appendChild(fragment);
}

// --- Application Entry Point ---

/**
 * Initializes the application.
 * Detects the current page based on the `data-page` attribute on the `body` tag.
 */
async function init() {
    // Initialize Theme first
    initTheme();

    const body = document.body;
    const pageId = body.dataset.page || 'index';
    const mainContainer = document.getElementById('main-content');

    // Render shared components
    try {
        renderHeader(pageId);
        renderFooter();
    } catch (error) {
        console.error('Header/Footer render error:', error);
    }

    // Render page-specific content
    if (mainContainer) {
        // Set loading state
        renderMessage(mainContainer, 'Loading content...');

        try {
            switch (pageId) {
                case 'index':
                    await renderProfile(mainContainer);
                    break;
                case 'education':
                    await renderEducation(mainContainer);
                    break;
                case 'experience':
                    await renderExperience(mainContainer);
                    break;
                case 'research':
                    await renderResearch(mainContainer);
                    break;
                case 'btech':
                    await renderDegreeDetail(mainContainer, 'btech.json');
                    break;
                case 'mtech':
                    await renderDegreeDetail(mainContainer, 'mtech.json');
                    break;
                case 'phd':
                    await renderDegreeDetail(mainContainer, 'phd.json');
                    break;
                case 'postdoc':
                    await renderDegreeDetail(mainContainer, 'postdoc.json');
                    break;
                case 'publications':
                    await renderPublications(mainContainer);
                    break;
                case 'teaching':
                    await renderTeaching(mainContainer);
                    break;
                case 'students':
                    await renderStudents(mainContainer);
                    break;
                case 'events':
                    await renderEvents(mainContainer);
                    break;
                case 'contact':
                    await renderContact(mainContainer);
                    break;
                default:
                    renderMessage(mainContainer, 'Page not found.');
                    return; // Return early if page not found
            }

            // Successfully loaded: verify if we still have the loading message before removing it
            // or if the content was just appended. 
            // The renderers append content. If we didn't crash, we assume success.
            // We should remove the 'Loading...' message if it exists.
            const loadingMsg = mainContainer.querySelector('.status-message');
            if (loadingMsg && loadingMsg.textContent === 'Loading content...') {
                loadingMsg.remove();
            }

        } catch (error) {
            console.error('Render error:', error);
            renderMessage(mainContainer, 'An error occurred while loading content. Please try again later.');
        }
    }
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
