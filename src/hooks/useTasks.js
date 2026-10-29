import { useEffect, useState } from 'react';
import * as taskApi from '../services/taskApi.js';

// CUSTOM HOOK: groups task-related state and API actions into one reusable place.
// Hooks must start with "use" and should be called at the top of React components.
export function useTasks() {
  // useState: React remembers these values between renders.
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activity, setActivity] = useState('GET /tasks — waiting for server');

  // useEffect: load tasks when the component first appears.
  // The cleanup flag prevents outdated results updating state after unmount.
  useEffect(() => {
    let active = true;
    taskApi.getTasks()
      .then((data) => {
        if (active) {
          setTasks(data);
          setActivity('GET /tasks → 200 OK');
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message);
          setActivity('GET /tasks → failed');
        }
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []); // Empty dependency array: effect runs on mount (twice in dev Strict Mode).

  // Shared helper: show errors and disable buttons while a request is in progress.
  async function perform(action, method, path) {
    setSaving(true);
    setError('');
    try {
      const result = await action();
      setActivity(`${method} ${path} → success`);
      return result;
    } catch (err) {
      setError(err.message);
      setActivity(`${method} ${path} → failed`);
      throw err;
    } finally {
      setSaving(false);
    }
  }

  async function addTask(task) {
    const created = await perform(() => taskApi.createTask(task), 'POST', '/tasks');
    setTasks((previous) => [...previous, created]); // Never mutate React state directly.
  }

  async function editTask(id, updatedTask) {
    const saved = await perform(() => taskApi.updateTask(id, updatedTask), 'PUT', `/tasks/${id}`);
    setTasks((previous) => previous.map((task) => task.id === id ? saved : task));
  }

  async function removeTask(id) {
    await perform(() => taskApi.deleteTask(id), 'DELETE', `/tasks/${id}`);
    setTasks((previous) => previous.filter((task) => task.id !== id));
  }

  return { tasks, loading, saving, error, activity, addTask, editTask, removeTask };
}
