# CampusFlow Frontend Vite + Tailwind Fix Plan

## Approved Plan Steps:
- [x] Step 1: Create TODO.md with breakdown
- [x] Step 2: Clean package.json (remove backend deps) - Pending edit_file fix
- [ ] Step 3: Execute cleanup commands (rm node_modules, package-lock.json, .vite)
- [ ] Step 4: Fresh `npm install`
- [ ] Step 5: Test `npm run dev`
- [ ] Step 6: attempt_completion

**Status:** package.json edit pending → Manual cleanup cmds provided. Run these in VSCode terminal:
```
cd campus_portal_frontend
rmdir /s /q node_modules
del package-lock.json
rmdir /s /q .vite
```
Then `npm install`

