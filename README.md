# FlexiTask — React Hooks + RESTful API Demo

A small educational task dashboard inspired by a FlexiSAF internship workflow. **Not an official FlexiSAF product.**

## Prerequisites
- Node.js 20.19+ or 22.12+ recommended for the Vite version used here.
- npm
- VS Code (optional)

## Run it (two terminals)

```bash
npm install
npm run server
```

Keep the API terminal open. In a **second terminal**:

```bash
npm run dev
```

Open the local URL shown by Vite (usually http://localhost:5173). The JSON Server API is at http://localhost:3001/tasks.

## Study these files in order

1. `db.json` — example tasks stored by JSON Server.
2. `src/services/taskApi.js` — `fetch()` and HTTP GET, POST, PUT, DELETE.
3. `src/hooks/useTasks.js` — `useState`, `useEffect`, and a custom Hook.
4. `src/App.jsx` — connects the Hook to the page and manages editing/filtering.
5. `src/components/TaskForm.jsx` — controlled inputs and form submission.
6. `src/components/TaskList.jsx` — rendering task cards and button callbacks.
7. `src/styles.css` — presentation styling.

## REST API cheat sheet

| Action | Method | URL | UI demonstration |
|---|---|---|---|
| Read tasks | GET | `/tasks` | Refresh the page |
| Create task | POST | `/tasks` | Submit the form |
| Update task | PUT | `/tasks/:id` | Edit and save a task |
| Delete task | DELETE | `/tasks/:id` | Click Delete and confirm |

**PUT vs PATCH:** PUT replaces the complete task; PATCH would modify selected fields. This project deliberately uses PUT and sends all task fields.

## React Hooks cheat sheet
- `useState`: remembers state and triggers re-renders when updated.
- `useEffect`: runs side-effect code (here, initial data fetching) after rendering.
- `useTasks`: our custom Hook; it reuses React Hooks and exposes CRUD functions.

## Demo steps
1. Open browser DevTools → Network → Fetch/XHR.
2. Refresh: find GET `/tasks`.
3. Add a task: find POST `/tasks` and inspect its JSON request body.
4. Edit the task: find PUT `/tasks/:id` and inspect the complete updated object.
5. Delete the task: find DELETE `/tasks/:id`.
6. Open `db.json` and confirm the changes persisted.

## Troubleshooting
- **Failed to fetch:** start the API server with `npm run server` in its own terminal.
- **Port 3001 already in use:** stop the other server using it.
- **React Strict Mode:** during development, the initial GET can occur twice. This is expected behavior.
- **Task disappears on page refresh:** ensure JSON Server is running and check `db.json`.

## Practice challenges
1. Add a search box with `useState`.
2. Add a status filter (already included); explain derived state.
3. Show an explicit loading spinner.
4. Create another custom Hook such as `useTaskStats`.
5. Add PATCH as an optional fifth API demonstration.
