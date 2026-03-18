# Prof. Prakash Kumar Sahu — Academic Portfolio

**Live Website:** https://pksahunita-ux.github.io/prakashsahu/

---

## 📋 Table of Contents

1. [How to Edit Content](#how-to-edit-content)
2. [File Structure Overview](#file-structure-overview)
3. [Editing Each Section](#editing-each-section)
   - [Profile / Home Page](#1-profile--home-page---dataprofilejson)
   - [B.Tech](#2-btech---databtech.json)
   - [M.Tech](#3-mtech---datamtechjson)
   - [PhD Research](#4-phd-research---dataphdjson)
   - [Post-Doctoral Fellow](#5-post-doctoral-fellow---datapostdocjson)
   - [Experience](#6-experience---dataexperiencejson)
   - [Publications](#7-journal-publications---datapublicationsjson)
   - [Research Interest](#8-research-interest---dataresearchjson)
   - [Teaching](#9-teaching---datateachingjson)
   - [Students](#10-students---datastudentsjson)
   - [Events](#11-events--conferences---dataeventsjson)
   - [Contact](#12-contact---datacontactjson)
4. [How to Change Images](#how-to-change-images)
5. [How to Publish Changes](#how-to-publish-changes)
6. [Important Rules](#important-rules)

---

## How to Edit Content

> **All content editing is done ONLY in the `data/` folder JSON files.**
> You do NOT need to touch any HTML, CSS, or JavaScript files.

### What is JSON?
JSON files store your data in a simple format. Each piece of information has a **"key"** and a **"value"**:
```json
"key": "value"
```
For example:
```json
"name": "Prakash Kumar Sahu"
```
Just change the text inside the quotes `" "` on the right side. Never change the key on the left side.

---

## File Structure Overview

```
Prakash_Kumar_Sahu/
│
├── assets/
│   ├── css/               ← DO NOT EDIT
│   ├── js/                ← DO NOT EDIT
│   └── images/
│       ├── profile/       ← Profile photo goes here
│       └── hero/          ← Page banner images go here
│
├── data/                  ← EDIT ONLY THESE FILES
│   ├── profile.json       ← Home page info
│   ├── btech.json         ← B.Tech details
│   ├── mtech.json         ← M.Tech details
│   ├── phd.json           ← PhD details
│   ├── postdoc.json       ← Post-Doctoral details
│   ├── experience.json    ← Work experience
│   ├── publications.json  ← Journal papers, book chapters, conferences
│   ├── research.json      ← Research interests
│   ├── teaching.json      ← Courses taught
│   ├── students.json      ← PhD scholars, masters, bachelor students
│   ├── events.json        ← Conferences attended, workshops
│   └── contact.json       ← Email, links
│
├── index.html             ← DO NOT EDIT
├── publications.html      ← DO NOT EDIT
└── (other .html files)    ← DO NOT EDIT
```

---

## Editing Each Section

---

### 1. Profile / Home Page — `data/profile.json`

This controls what appears on the **Home page**.

```json
{
  "name": "Prakash Kumar Sahu",
  "designation": "Associate Professor",
  "department": "Department of Mechanical Engineering",
  "institution": "National Institute of Technology",
  "location": "Raipur, India",
  "institute_tagline": "An Institute of National Importance",
  "shortBio": "Write your short biography here...",
  "researcherIds": {
    "googleScholar": "https://scholar.google.com/...",
    "researchGate": "https://www.researchgate.net/...",
    "orcid": "https://orcid.org/...",
    "scopus": "https://www.scopus.com/..."
  }
}
```

**What you can change:**
| Field | What it controls |
|---|---|
| `name` | Your full name |
| `designation` | Your job title |
| `department` | Your department name |
| `institution` | Your university/institute name |
| `location` | City, Country |
| `institute_tagline` | Tagline shown after institution |
| `shortBio` | Your biography paragraph on home page |
| `googleScholar` | Your Google Scholar profile URL |
| `researchGate` | Your ResearchGate profile URL |
| `orcid` | Your ORCID profile URL |
| `scopus` | Your Scopus profile URL |

> **Tip:** If you don't have a profile link, set it to `""` (empty) and it won't show.

---

### 2. B.Tech — `data/btech.json`

```json
{
  "title": "B.Tech in Mechanical Engineering",
  "institution": "Name of University",
  "year": "2005 – 2009",
  "logo": "assets/images/logo/btech-logo.png",
  "heroImage": "assets/images/hero/btech.jpg",
  "description": [
    "First paragraph about your B.Tech.",
    "Second paragraph if needed."
  ],
  "thesis": {
    "title": "Your thesis title here",
    "supervisor": "Prof. Supervisor Name",
    "description": "Brief description of your thesis work."
  },
  "gallery": [
    "assets/images/gallery/btech1.jpg",
    "assets/images/gallery/btech2.jpg"
  ]
}
```

**What you can change:**
| Field | What it controls |
|---|---|
| `title` | Page heading |
| `institution` | University name |
| `year` | Year range e.g. `"2005 – 2009"` |
| `logo` | Institution logo image path |
| `heroImage` | Banner image at the top of the page |
| `description` | Array of paragraphs about your degree |
| `thesis.title` | Your thesis/project title |
| `thesis.supervisor` | Supervisor's name |
| `thesis.description` | Short description of your project |
| `gallery` | Additional images shown in a carousel |

> **Same structure applies for `mtech.json`, `phd.json`, and `postdoc.json`.**

---

### 3. M.Tech — `data/mtech.json`
Same structure as B.Tech above. Edit accordingly.

---

### 4. PhD Research — `data/phd.json`
Same structure as B.Tech above. Edit accordingly.

---

### 5. Post-Doctoral Fellow — `data/postdoc.json`
Same structure as B.Tech above. Edit accordingly.

---

### 6. Experience — `data/experience.json`

```json
{
  "experience": [
    {
      "position": "Associate Professor",
      "institution": "NIT Raipur",
      "period": "2018 – Present",
      "details": "Optional description of this role."
    },
    {
      "position": "Assistant Professor",
      "institution": "Some University",
      "period": "2014 – 2018",
      "details": ""
    }
  ]
}
```

**To add a new experience:** Copy one `{ }` block, paste it after the last one (separated by a comma), and fill in the details.

**To remove an experience:** Delete the entire `{ }` block including the comma before/after it.

---

### 7. Journal Publications — `data/publications.json`

```json
{
  "journalPublications": [
    {
      "authors": "Sahu P.K., Das A., Chen Q.",
      "title": "Title of the paper",
      "journal": "Journal Name",
      "volume": "12",
      "pages": "100–115",
      "year": "2024",
      "doi": "https://doi.org/10.xxxx/xxxxx"
    }
  ],
  "bookChapters": [
    {
      "authors": "Sahu P.K.",
      "title": "Chapter Title",
      "book": "Book Name",
      "year": "2023",
      "doi": "https://doi.org/10.xxxx/xxxxx"
    }
  ],
  "conferencePublications": [
    {
      "authors": "Sahu P.K., Das A.",
      "title": "Paper Title",
      "conference": "Conference Name",
      "location": "City, Country",
      "year": "2022"
    }
  ]
}
```

**To add a new journal paper:** Copy one `{ }` block inside `journalPublications`, paste it with a comma, fill in details.

**Fields:**
| Field | What it controls |
|---|---|
| `authors` | All author names |
| `title` | Paper title |
| `journal` | Journal name (italic on site) |
| `volume` | Volume number |
| `pages` | Page range |
| `year` | Publication year |
| `doi` | Full DOI URL — shown as `[DOI]` link |

> If any field is not available (e.g., no DOI), just leave it as `""` or remove that line.

---

### 8. Research Interest — `data/research.json`

```json
{
  "summary": "A short paragraph summarizing your research.",
  "researchInterests": [
    "Friction Stir Welding",
    "Surface Engineering",
    "Additive Manufacturing",
    "Composite Materials"
  ]
}
```

**To add a new interest:** Add a new line inside the `[ ]` array:
```json
"researchInterests": [
  "Existing Interest",
  "Your New Interest Here"
]
```

---

### 9. Teaching — `data/teaching.json`

```json
{
  "undergraduateCourses": [
    "Manufacturing Technology",
    "Engineering Materials",
    "Machine Design"
  ],
  "postgraduateCourses": [
    "Advanced Manufacturing Processes",
    "Surface Engineering"
  ]
}
```

**To add a course:** Add a new line inside the appropriate `[ ]` array with a comma.

---

### 10. Students — `data/students.json`

```json
{
  "phdScholars": [
    {
      "name": "Student Full Name",
      "topic": "Research topic title",
      "status": "Ongoing"
    },
    {
      "name": "Another Student",
      "topic": "Their research topic",
      "status": "Completed (2023)"
    }
  ],
  "mastersStudents": [
    {
      "name": "Student Name",
      "topic": "Thesis title",
      "year": "2023"
    }
  ],
  "bachelorProjects": [
    {
      "students": ["Student A", "Student B"],
      "title": "Project title",
      "year": "2024"
    }
  ]
}
```

**Status values for PhD:** Use `"Ongoing"` or `"Completed (YYYY)"`.

---

### 11. Events & Conferences — `data/events.json`

```json
{
  "conferences": [
    {
      "title": "Conference Name",
      "location": "City, Country",
      "year": "2024",
      "role": "Paper Presenter"
    }
  ],
  "workshops": [
    {
      "title": "Workshop / FDP Name",
      "location": "Institute Name",
      "year": "2023",
      "role": "Participant"
    }
  ]
}
```

---

### 12. Contact — `data/contact.json`

```json
{
  "email": "youremail@nitinstitute.ac.in",
  "institutionalPage": "https://www.nitrr.ac.in/faculty/...",
  "links": [
    {
      "label": "Google Scholar",
      "url": "https://scholar.google.com/..."
    },
    {
      "label": "ResearchGate",
      "url": "https://www.researchgate.net/..."
    }
  ]
}
```

> For multiple emails, separate them with a comma:
> `"email": "email1@nit.ac.in, email2@gmail.com"`

---

## How to Change Images

> Images are stored in `assets/images/` folder.

### Profile Photo
- File location: `assets/images/profile/prof_sahu.jpg`
- **To update:** Replace this file with your new photo.
- Keep the **same filename** `prof_sahu.jpg` — OR update the path in `profile.json`.
- Recommended size: **400 × 500 pixels**, portrait orientation.

### Page Banner / Hero Images
- File location: `assets/images/hero/`
- Each page has its own banner image. Current banners:

| Page | Image File |
|---|---|
| Experience | `hero/experince.png` |
| Contact | `hero/contact1.png` |
| Publications | `hero/journal1.png`, `hero/journal2.png` |
| Research | `hero/research1.png`, `hero/research2.jpg`, `hero/research3.jpg` |
| Teaching | `hero/teaching1.png`, `hero/teaching2.png` |
| Students | `hero/student&mentor1.png`, `hero/student&mentor2.png` |
| Events | `hero/confrence1.png`, `hero/confrence 2.png` |

- **To update a banner:** Replace the image file in `assets/images/hero/` with your new image using the **same filename**.
- Recommended size: **1200 × 400 pixels**, landscape orientation.

### Degree Page Images (B.Tech, M.Tech, PhD, PostDoc)
- These are set inside the respective JSON files:
```json
"heroImage": "assets/images/hero/your-image.jpg",
"gallery": [
  "assets/images/gallery/image1.jpg",
  "assets/images/gallery/image2.jpg"
]
```
- Upload your image to `assets/images/hero/` or `assets/images/gallery/`, then update the path in the JSON file.

---

## How to Publish Changes

After editing any file, follow these steps to make changes live on the website:

### Using GitHub Desktop (Recommended for non-technical users)
1. Open **GitHub Desktop**
2. You will see your changed files listed on the left
3. Write a short note in the **Summary** box (e.g., `"Added new publication"`)
4. Click **Commit to main**
5. Click **Push origin**
6. Wait 1–2 minutes, then visit https://pksahunita-ux.github.io/prakashsahu/ to see your changes

### Using VS Code Terminal
```bash
git add .
git commit -m "Your description of changes"
git push
```

---

## Important Rules

| You CAN do this |  Do NOT do this |
|---|---|
| Edit any `.json` file in `data/` folder | Edit `.html` files |
| Replace images keeping the same filename | Edit `.css` files in `assets/css/` |
| Add/remove items in JSON arrays | Edit `main.js` in `assets/js/` |
| Update URLs and links in JSON | Rename JSON files |
| Add new images to `assets/images/` | Delete any `.html` file |

### JSON Formatting Tips
- Always keep text inside **double quotes**: `"like this"`
- Separate multiple items with a **comma**: `"item1", "item2"`
- The **last item** in a list does NOT have a comma after it
- If you're unsure, validate your JSON at: https://jsonlint.com

---
*Designed & Developed by **Saurabh Prajapati***
---

