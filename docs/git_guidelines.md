# 🛠️ Rescue Network: Git & Repository Governance

As a safety-critical platform, our repository must reflect the same level of discipline we apply to our code. This document defines the standards for contributors and recruiters viewing this work.

---

## 1. Professional Git Workflow

### Frequency & Granularity
- **Commit Early, Commit Often**: Small, frequent commits reduce merge conflicts and make reverting easier.
- **Single Responsibility (Atomic Commits)**: One commit should do ONE thing. If the commit message uses "and", it should probably be two commits.
- **Frontend vs Backend**: Always separate changes. Do not mix logic updates with UI styling unless they are inextricably linked.

### Squashing vs. History
- **Keep History in Development Branches**: Preserve the "train of thought" during a feature build.
- **Squash-on-Merge**: Use "Squash and Merge" for Pull Requests to the `main` branch to keep the root history clean and linear.

---

## 2. Conventional Commit Standards

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
`type(scope): subject`

### Types
- `feat`: New feature (e.g., `feat(maps): add live responder markers`)
- `fix`: Bug fix (e.g., `fix(auth): resolve JWT expiration race condition`)
- `refactor`: Code change that neither fixes a bug nor adds a feature.
- `docs`: Documentation updates.
- `chore`: Maintenance tasks (deps, build scripts).
- `perf`: Performance optimizations.
- `test`: Adding or fixing tests.

### Examples
- ✅ `feat(backend): implement Redis-backed socket adapter for horizontal scaling`
- ✅ `fix(frontend): update API base URL to v2 on port 5001`
- ❌ `update stuff` (Too vague)
- ❌ `added auth and fixed map` (Not atomic)

---

## 3. GitHub Strategy

### Branching Model
- `main`: Production-ready, stable code. Only merged from `develop` via PR.
- `develop` (optional for startups): Integration branch for the next release.
- `feature/*`: Specific features (e.g., `feature/ai-triage`).
- `fix/*`: Bug fixes.

### Release Versioning
Use [Semantic Versioning (SemVer)](https://semver.org/):
`v[MAJOR].[MINOR].[PATCH]`
- **v1.0.0**: Initial MVP.
- **v1.1.0**: Added AI Triage (New feature).
- **v1.1.1**: Fixed triage advice typo (Patch).
- **v2.0.0**: Complete TypeScript migration (Breaking architectural change).

---

## 4. Git Command Arsenal

### Feature Lifecycle
```bash
# 1. Start a feature
git checkout -b feature/medical-vitals

# 2. Iterative commits
git add src/modules/incident/
git commit -m "feat(backend): add vitals model and update routes"

# 3. Pull latest from main before PR
git fetch origin
git rebase origin/main

# 4. Finalize
git tag -a v2.1.0 -m "Release: Medical Stabilization intelligence"
git push origin --tags
```

---

## 5. Professional README Structure
A recruiter-facing README should satisfy 3 audiences in < 2 minutes:

1. **The Lead Engineer**: "Show me the Tech Stack and Architecture."
2. **The Product Manager**: "Show me the Problem we are solving."
3. **The Recruiter**: "Show me the Deployment and Proof of Work."

### Recommended Sections:
1. **Hero Header**: Logo, Tagline, and Status Badges.
2. **The Problem**: Why does this exist? (The "Accident Response Gap").
3. **Core Intelligence**: Highlight AI/ML and Real-time tech.
4. **Architecture Diagram**: (Mermaid or Image).
5. **Setup Guide**: 5 minutes or less to run.
6. **Project Roadmap**: What's next? (IoT integration, Analytics).

---
*Maintained by the Rescue Network Open-Source Team.*
