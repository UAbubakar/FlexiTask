import { useState } from 'react';
import { useTasks } from './hooks/useTasks.js';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';

export default function App() {
  // This custom hook gives the UI all task data and CRUD functions.
  const { tasks, loading, saving, error, activity, addTask, editTask, removeTask } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('All');

  // Derived values are calculated from state; no extra useState is necessary.
  const done = tasks.filter((task) => task.status === 'Done').length;
  const visibleTasks = filter === 'All' ? tasks : tasks.filter((task) => task.status === filter);

  async function handleSave(form) {
    if (editingTask) {
      // Spread preserves the task ID when PUT replaces the full record.
      await editTask(editingTask.id, { ...editingTask, ...form });
      setEditingTask(null);
    } else {
      await addTask(form);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this task permanently?')) return;
    try {
      await removeTask(id);
      if (editingTask?.id === id) setEditingTask(null);
    } catch {
      // API errors are displayed by useTasks.
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar"><div className="brand-mark">F</div><div><strong>FlexiTask</strong><small>FlexiSAF Learning Project</small></div><span className="top-tag">React + REST API</span></header>
      <main className="page">
        <div className="heading"><div><p className="eyebrow">WORKSPACE / TASKS</p><h1>Task Dashboard</h1><p>Manage learning tasks and explore RESTful API operations.</p></div></div>
        <section className="stats"><div><small>Total tasks</small><strong>{tasks.length}</strong></div><div><small>Completed</small><strong>{done}</strong></div><div><small>In progress</small><strong>{tasks.filter((t) => t.status === 'In Progress').length}</strong></div></section>
        <div className="layout">
          <section className="main-panel"><div className="panel-title"><h2>Team tasks</h2><select aria-label="Filter tasks by status" value={filter} onChange={(event) => setFilter(event.target.value)}><option>All</option><option>To Do</option><option>In Progress</option><option>Done</option></select></div>
            {loading ? <p>Loading tasks from the API…</p> : <TaskList tasks={visibleTasks} onEdit={setEditingTask} onDelete={handleDelete} saving={saving} />}
          </section>
          <aside><TaskForm editingTask={editingTask} onSave={handleSave} onCancel={() => setEditingTask(null)} saving={saving} />
            <section className="api-panel"><h2>API activity</h2><p>This panel shows the last request. For real HTTP details, open DevTools → Network.</p><code>{activity}</code><div className="method-guide"><span>GET = Read</span><span>POST = Create</span><span>PUT = Update</span><span>DELETE = Remove</span></div></section>
          </aside>
        </div>
        {error && <p className="error" role="alert">API error: {error}. Check that <code>npm run server</code> is running.</p>}
      </main>
      <footer>FlexiTask • Educational demo • Not an official FlexiSAF product</footer>
    </div>
  );
}
