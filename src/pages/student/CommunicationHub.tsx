import { useState } from 'react';
import { Gavel, BookOpen, Megaphone, Send, ChevronDown, CheckCircle, Hash, Lock } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import clsx from 'clsx';

interface Message {
  id: string;
  author: string;
  text: string;
  time: string;
  isDecision?: boolean;
  isMeetingNote?: boolean;
  isProfessor?: boolean;
}

interface Thread {
  id: string;
  title: string;
  icon: React.ReactNode;
  unread?: number;
  locked?: boolean;
  type: 'discussion' | 'decision' | 'meeting' | 'announcement';
  messages: Message[];
}

const threads: Thread[] = [
  {
    id: 'general',
    title: 'General Discussion',
    icon: <Hash size={14} />,
    unread: 3,
    type: 'discussion',
    messages: [
      { id: '1', author: 'Alex Johnson', text: 'Hey team, how\'s the backend API coming along?', time: '10:32 AM' },
      { id: '2', author: 'Jake Park', text: 'Making progress! The /users endpoint is done, working on /projects now.', time: '10:35 AM' },
      { id: '3', author: 'Mia Chen', text: 'I can help with the database schema if needed.', time: '10:38 AM' },
      { id: '4', author: 'Sam Lee', text: 'The new UI mockups are uploaded to Figma, check them out!', time: '11:02 AM' },
      { id: '5', author: 'Casey Torres', text: 'CI pipeline is set up. All pushes to main will auto-deploy to staging.', time: '11:15 AM' },
    ],
  },
  {
    id: 'decisions',
    title: 'Decision Log',
    icon: <Gavel size={14} />,
    type: 'decision',
    messages: [
      { id: '1', author: 'Alex Johnson', text: 'Decided to use PostgreSQL over MongoDB for structured data requirements.', time: 'Nov 28', isDecision: true },
      { id: '2', author: 'Team', text: 'Agreed on TypeScript + React for frontend stack.', time: 'Nov 25', isDecision: true },
      { id: '3', author: 'Mia Chen', text: 'Using FastAPI for backend — voted 3-1.', time: 'Nov 22', isDecision: true },
    ],
  },
  {
    id: 'meetings',
    title: 'Meeting Notes',
    icon: <BookOpen size={14} />,
    type: 'meeting',
    messages: [
      { id: '1', author: 'Alex Johnson', text: 'Weekly standup Dec 9:\n• Alex: Working on auth module\n• Mia: Completed data pipeline\n• Sam: UI review done\n• Jake: API 70% done\n• Casey: Deployed to staging', time: 'Dec 9', isMeetingNote: true },
      { id: '2', author: 'Alex Johnson', text: 'Sprint planning Dec 2:\n• Goal: MVP by Dec 15\n• Backlog reviewed\n• 12 tasks assigned', time: 'Dec 2', isMeetingNote: true },
    ],
  },
  {
    id: 'announcements',
    title: 'Professor Announcements',
    icon: <Megaphone size={14} />,
    locked: true,
    type: 'announcement',
    messages: [
      { id: '1', author: 'Prof. Martinez', text: 'Reminder: Final project demos are scheduled for January 17th. Please confirm your timeslot by Dec 20th.', time: 'Dec 8', isProfessor: true },
      { id: '2', author: 'Prof. Martinez', text: 'Teams with contribution imbalance have been notified. Please address this by the next milestone.', time: 'Dec 5', isProfessor: true },
    ],
  },
];

const teams = ['AI Study Assistant', 'Campus Event Platform'];

function MessageBubble({ msg, isMe }: { msg: Message; isMe: boolean }) {
  if (msg.isDecision) {
    return (
      <div className="flex items-start gap-3 px-1">
        <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
          <CheckCircle size={13} className="text-emerald-400" />
        </div>
        <div className="flex-1 glass-dark rounded-sm p-3 border-l-2 border-emerald-500">
          <p className="text-xs font-semibold text-emerald-400 mb-1">Decision — {msg.time}</p>
          <p className="text-sm text-white/90">{msg.text}</p>
          <p className="text-xs text-white/40 mt-1">— {msg.author}</p>
        </div>
      </div>
    );
  }

  if (msg.isMeetingNote) {
    return (
      <div className="glass-dark rounded-sm p-4 border-l-2 border-primary-500 mx-1">
        <p className="text-xs font-semibold text-primary-400 mb-2 flex items-center gap-1.5">
          <BookOpen size={12} />
          Meeting Notes — {msg.time}
        </p>
        <pre className="text-xs text-white/70 whitespace-pre-wrap font-mono leading-relaxed">{msg.text}</pre>
      </div>
    );
  }

  if (msg.isProfessor) {
    return (
      <div className="glass rounded-sm p-4 border border-amber-500/30 mx-1">
        <div className="flex items-center gap-2 mb-2">
          <Avatar name={msg.author} size="sm" />
          <div>
            <span className="text-xs font-semibold text-amber-400">{msg.author}</span>
            <Badge variant="warning" className="ml-1.5">Instructor</Badge>
          </div>
          <span className="text-xs text-white/30 ml-auto">{msg.time}</span>
        </div>
        <p className="text-sm text-white/90">{msg.text}</p>
      </div>
    );
  }

  return (
    <div className={clsx('flex items-start gap-2.5', isMe && 'flex-row-reverse')}>
      <Avatar name={msg.author} size="sm" />
      <div className={clsx('max-w-[75%]', isMe ? 'items-end' : 'items-start', 'flex flex-col')}>
        {!isMe && <span className="text-xs text-white/40 mb-1 ml-1">{msg.author} · {msg.time}</span>}
        <div className={clsx(
          'rounded-sm px-3.5 py-2.5 text-sm',
          isMe ? 'bg-primary-500/30 border border-primary-500/40 text-white' : 'glass-dark text-white/90',
        )}>
          {msg.text}
        </div>
        {isMe && <span className="text-xs text-white/30 mt-1 mr-1">{msg.time}</span>}
      </div>
    </div>
  );
}

export default function CommunicationHub() {
  const [activeThread, setActiveThread] = useState('general');
  const [team, setTeam] = useState(teams[0]);
  const [input, setInput] = useState('');

  const thread = threads.find(t => t.id === activeThread)!;

  const sendMessage = () => {
    if (!input.trim()) return;
    setInput('');
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-white">Communication Hub</h2>
        <div className="relative">
          <select
            value={team}
            onChange={e => setTeam(e.target.value)}
            className="input-field pr-10 appearance-none cursor-pointer w-52"
          >
            {teams.map(t => <option key={t}>{t}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
        </div>
      </div>

      <div className="flex gap-4 h-[600px]">
        {/* Thread list */}
        <div className="w-52 shrink-0 flex flex-col gap-1">
          {threads.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveThread(t.id)}
              className={clsx(
                'flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-sm text-left transition-all focus-ring w-full',
                activeThread === t.id
                  ? 'bg-primary-500/20 border border-primary-500/30 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/8',
              )}
            >
              <span className="shrink-0 text-white/40">{t.icon}</span>
              <span className="flex-1 truncate">{t.title}</span>
              {t.unread && (
                <span className="w-4 h-4 bg-primary-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
                  {t.unread}
                </span>
              )}
              {t.locked && <Lock size={11} className="text-white/25 shrink-0" />}
            </button>
          ))}
        </div>

        {/* Thread detail */}
        <GlassCard padding="p-0" className="flex-1 flex flex-col overflow-hidden">
          {/* Thread header */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/8">
            <span className="text-white/50">{thread.icon}</span>
            <h3 className="font-semibold text-white">{thread.title}</h3>
            {thread.locked && (
              <Badge variant="neutral" className="ml-2">
                <Lock size={10} className="mr-0.5" />Read-only
              </Badge>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {thread.messages.map(msg => (
              <MessageBubble key={msg.id} msg={msg} isMe={msg.author === 'Alex Johnson'} />
            ))}
          </div>

          {/* Input */}
          {!thread.locked && (
            <div className="px-4 py-3 border-t border-white/8 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                className="flex-1 input-field py-2.5"
              />
              <Button icon={<Send size={15} />} onClick={sendMessage} disabled={!input.trim()}>
                Send
              </Button>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
