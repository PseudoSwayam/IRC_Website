# 🤝 Contributing to IRC Website

Welcome to the **Official Website of ITER Robotics Club**
This document highlights the rules and best practices for contributing to this collaborative project

## Contributors 

| Contributor | Role |
|-----|-----|
| Swayam Prakash Sahoo | AIML + Frontend + DB |
| Rashmi Ranjan Rout | Frontend |
| Lalatendu Bal | Frontend + Backend|
| Nishigandha Mallik | |
| Devpriyo Ghosh | |
| Ritesh Sahoo | Frontend + Backend |
| Soumya Prakash Nayak| Frontend |
| Amrita Sahu | Frontend + Content Writer |
| Shruti Shriya | Frontend + DB + SEO |
| Aavash Kumar Beriha | Content Writer |
| Ansuman Swain | UI/UX |
| Aman Khera | UI/UX + 3d Models |
| Aritro Adhikari | Content Writer |

---

## Getting Started

### Clone Repository
```bash
git clone https://github.com/PseudoSwayam/IRC_Website.git
cd IRC_Website/
```

### Git Workflow

We follow a feature-branch workflow branching from dev (never commit directly to main):

**1. Switch to dev branch and pull latest updates**
```bash
git checkout dev
git pull origin dev
```

**2. Create a new feature branch**
```bash
git checkout -b feature/<short-description>
```
Replace <short-description> with a concise name describing your feature/task.

**3. Make changes to code, frontend, or backend as required.**

**4. Stage and commit changes**
```bash
git add .
git commit -m "feat: <short description of change/addition>"
```
Use conventional commit messages for clarity (e.g., feat: add navbar component, fix: resolve login bug).

** 5.	Push your branch to GitHub**
```bash
git push -u origin feature/<short-description>
```

---

## Pull Request (PR) Guidelines

### After pushing your feature branch:
	1.	Go to your repository on GitHub.
	2.	GitHub will suggest: “Compare & pull request” for your branch.
	3.	Set the base branch to dev (never main).
	4.	Add details:
	•	Clear PR title
	•	Description outlining your work
	•	Mention related issues (if any)
	5.	Assign reviewers: Notify the project lead or relevant team members in the WhatsApp group.

Ensure your code is reviewed and approved before merging to dev.

---

## Code Style & Conventions
	•	Use camelCase for variables and functions.
	•	Use PascalCase for React components.
	•	Keep modular and reusable components.
	•	Ensure consistent indentation (2 spaces recommended for JS/React).
	•	Comment complex code for clarity.
	•	Run linting and format checks before committing.