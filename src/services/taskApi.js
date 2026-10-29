// All HTTP requests live in this file. 
// The UI should not need to know fetch details.
const API_URL = 'http://localhost:3001/tasks';

async function request(url, options = {}) {
  const response = await fetch(url, options);
  // HTTP errors (such as 404 or 500) do not automatically throw in fetch().
  
  if (!response.ok) throw new Error(`API error: ${response.status} ${response.statusText}`);
  // DELETE may return an empty response, so don't try to parse empty JSON.
  
  if (response.status === 204) return null;
  const body = await response.text();
  return body ? JSON.parse(body) : null;
}

// GET /tasks: read all tasks from our mock database.
export const getTasks = () => request(API_URL);

// POST /tasks: send a new task; JSON Server creates its unique ID.
export const createTask = (task) => request(API_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(task)
});

// PUT /tasks/:id: replace a task with the complete updated task object.
export const updateTask = (id, task) => request(`${API_URL}/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(task)
});

// DELETE /tasks/:id: permanently remove one task from db.json.
export const deleteTask = (id) => request(`${API_URL}/${id}`, { method: 'DELETE' });
