export default function TaskList({ tasks, onEdit, onDelete, saving }) {
  if (tasks.length === 0) return <p className="empty">No tasks yet. Create your first task.</p>;

  return (
    <div className="task-list">
      {/* map() turns each task object into a visible React card. */}
      {tasks.map((task) => (
        <article className="task-card" key={task.id}>
          <div className="task-card-top"><span className={`status ${task.status.toLowerCase().replaceAll(' ', '-')}`}>{task.status}</span><span className="priority">{task.priority} priority</span></div>
          <h3>{task.title}</h3>
          <p>{task.description || 'No description provided.'}</p>
          <div className="card-actions">
            <button className="secondary" disabled={saving} onClick={() => onEdit(task)}>Edit (PUT)</button>
            <button className="danger" disabled={saving} onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </article>
      ))}
    </div>
  );
}
