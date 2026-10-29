import { useEffect, useState } from 'react';

const EMPTY_TASK = { title: '', description: '', status: 'To Do', priority: 'Medium' };

export default function TaskForm({ editingTask, onSave, onCancel, saving }) {
  // Controlled inputs: their displayed values come from React state.
  const [form, setForm] = useState(EMPTY_TASK);

  // When the user clicks Edit, populate the form with that task's details.
  useEffect(() => {
    setForm(editingTask ? {
      title: editingTask.title,
      description: editingTask.description,
      status: editingTask.status,
      priority: editingTask.priority
    } : { ...EMPTY_TASK });
  }, [editingTask]);

  function change(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function submit(event) {
    event.preventDefault(); // Stop the browser from reloading the page.
    if (!form.title.trim()) return;
    try {
      await onSave({ ...form, title: form.title.trim() });
      setForm({ ...EMPTY_TASK });
    } catch {
      // The custom hook already displays the API error on the dashboard.
    }
  }

  return (
    <form className="task-form" onSubmit={submit}>
      <h2>{editingTask ? 'Edit task' : 'Create a task'}</h2>
      <label>Task title<input name="title" value={form.title} onChange={change} placeholder="e.g. Review React Hooks" required maxLength={100} /></label>
      <label>Description<textarea name="description" value={form.description} onChange={change} placeholder="What needs to be done?" rows="3" /></label>
      <div className="form-grid">
        <label>Status<select name="status" value={form.status} onChange={change}><option>To Do</option><option>In Progress</option><option>Done</option></select></label>
        <label>Priority<select name="priority" value={form.priority} onChange={change}><option>Low</option><option>Medium</option><option>High</option></select></label>
      </div>
      <div className="form-actions">
        <button type="submit" disabled={saving}>{saving ? 'Saving…' : editingTask ? 'Save changes (PUT)' : 'Add task (POST)'}</button>
        {editingTask && <button className="secondary" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
