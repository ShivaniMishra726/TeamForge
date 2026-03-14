import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Plus, ChevronRight, ChevronLeft, Clock, Link, AlertCircle } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import clsx from 'clsx';

type Priority = 'high' | 'medium' | 'low';
type Column = 'todo' | 'inprogress' | 'review' | 'done';

interface Task {
  id: string;
  title: string;
  assignee: string;
  estimated: number;
  actual?: number;
  priority: Priority;
  due: string;
  commits?: number;
  column: Column;
}

const initialTasks: Task[] = [
  { id: '1', title: 'Set up authentication module', assignee: 'Alex Johnson', estimated: 6, priority: 'high', due: 'Dec 10', column: 'todo' },
  { id: '2', title: 'Design onboarding flow', assignee: 'Sam Lee', estimated: 4, priority: 'medium', due: 'Dec 11', column: 'todo' },
  { id: '3', title: 'API endpoint: /users', assignee: 'Jake Park', estimated: 5, actual: 4, priority: 'high', due: 'Dec 9', commits: 3, column: 'inprogress' },
  { id: '4', title: 'Implement search bar', assignee: 'Alex Johnson', estimated: 3, actual: 2, priority: 'medium', due: 'Dec 12', column: 'inprogress' },
  { id: '5', title: 'Write unit tests for auth', assignee: 'Mia Chen', estimated: 4, priority: 'low', due: 'Dec 14', column: 'review' },
  { id: '6', title: 'Database schema design', assignee: 'Casey Torres', estimated: 3, actual: 3, priority: 'high', due: 'Dec 8', commits: 2, column: 'done' },
  { id: '7', title: 'Create project README', assignee: 'Alex Johnson', estimated: 1, actual: 1, priority: 'low', due: 'Dec 7', column: 'done' },
];

const columns: { id: Column; label: string }[] = [
  { id: 'todo', label: 'To Do' },
  { id: 'inprogress', label: 'In Progress' },
  { id: 'review', label: 'Review' },
  { id: 'done', label: 'Done' },
];

const priorityBorder: Record<Priority, string> = {
  high: 'border-l-red-500',
  medium: 'border-l-amber-500',
  low: 'border-l-emerald-500',
};

const weeklyData = [
  { name: 'Alex', hours: 12 },
  { name: 'Mia', hours: 8 },
  { name: 'Sam', hours: 6 },
  { name: 'Jake', hours: 4 },
  { name: 'Casey', hours: 10 },
];

const pieData = [
  { name: 'Alex', value: 30 },
  { name: 'Mia', value: 20 },
  { name: 'Sam', value: 15 },
  { name: 'Jake', value: 10 },
  { name: 'Casey', value: 25 },
];
const PIE_COLORS = ['#5B6CFF', '#8A7CFF', '#00D4FF', '#F59E0B', '#10B981'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass rounded-sm px-3 py-2">
        <p className="text-xs text-white/60">{label}</p>
        <p className="text-sm font-semibold text-primary-400">{payload[0].value}h</p>
      </div>
    );
  }
  return null;
};

export default function WorkloadTracker() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showAdd, setShowAdd] = useState(false);
  const [newTask, setNewTask] = useState('');

  const moveTask = (id: string, direction: 'forward' | 'back') => {
    const order: Column[] = ['todo', 'inprogress', 'review', 'done'];
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      const idx = order.indexOf(t.column);
      const next = direction === 'forward' ? order[idx + 1] : order[idx - 1];
      return next ? { ...t, column: next } : t;
    }));
  };

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      assignee: 'Alex Johnson',
      estimated: 2,
      priority: 'medium',
      due: 'TBD',
      column: 'todo',
    };
    setTasks(prev => [task, ...prev]);
    setNewTask('');
    setShowAdd(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Workload Tracker</h2>
          <p className="text-white/50 text-sm mt-0.5">Kanban board for your team's tasks</p>
        </div>
        <Button icon={<Plus size={16} />} onClick={() => setShowAdd(true)}>Add Task</Button>
      </div>

      {/* Kanban board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map(col => {
          const colTasks = tasks.filter(t => t.column === col.id);
          return (
            <div key={col.id} className="kanban-column">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-white">{col.label}</h3>
                <Badge variant="neutral">{colTasks.length}</Badge>
              </div>
              <div className="space-y-2 flex-1">
                {colTasks.map(task => (
                  <div
                    key={task.id}
                    className={clsx(
                      'glass-dark rounded-sm p-3 border-l-2 space-y-2',
                      priorityBorder[task.priority],
                    )}
                  >
                    <p className="text-sm text-white font-medium leading-tight">{task.title}</p>
                    <div className="flex items-center justify-between">
                      <Avatar name={task.assignee} size="sm" />
                      <div className="flex items-center gap-1.5 text-xs text-white/40">
                        <Clock size={11} />
                        {task.actual ? <span className="text-white/60">{task.actual}h</span> : null}
                        <span>{task.actual ? '/' : ''}{task.estimated}h</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/40">Due {task.due}</span>
                      {task.commits && (
                        <span className="text-xs text-primary-400 flex items-center gap-1">
                          <Link size={10} />{task.commits} commits
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveTask(task.id, 'back')}
                        disabled={col.id === 'todo'}
                        className="p-1 rounded text-white/30 hover:text-white/70 disabled:opacity-20 transition-colors focus-ring"
                        aria-label="Move back"
                      >
                        <ChevronLeft size={12} />
                      </button>
                      <button
                        onClick={() => moveTask(task.id, 'forward')}
                        disabled={col.id === 'done'}
                        className="p-1 rounded text-white/30 hover:text-white/70 disabled:opacity-20 transition-colors focus-ring"
                        aria-label="Move forward"
                      >
                        <ChevronRight size={12} />
                      </button>
                      <Badge
                        variant={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'success'}
                        className="ml-auto"
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
                {colTasks.length === 0 && (
                  <p className="text-xs text-white/20 text-center py-4">No tasks</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard padding="p-5">
          <h3 className="font-semibold text-white mb-4">Weekly Contributions by Member</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
              <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                {weeklyData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard padding="p-5">
          <h3 className="font-semibold text-white mb-4">Team Contribution Share</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip
                  formatter={(v) => [`${v}%`]}
                  contentStyle={{ background: 'rgba(11,16,32,0.9)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5">
              {pieData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: PIE_COLORS[i] }} />
                  <span className="text-xs text-white/70">{d.name}</span>
                  <span className="text-xs text-white/40 ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
          {weeklyData.some(m => m.hours < 6) && (
            <div className="mt-3 flex items-center gap-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-sm px-3 py-2">
              <AlertCircle size={13} />
              <span>Jake Park's contribution is below team average</span>
            </div>
          )}
        </GlassCard>
      </div>

      {/* Add Task Modal */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add New Task">
        <div className="space-y-4">
          <Input
            label="Task Title"
            placeholder="Describe the task..."
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
          />
          <div className="flex gap-2 pt-2">
            <Button className="flex-1" onClick={handleAddTask}>Add Task</Button>
            <Button variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
