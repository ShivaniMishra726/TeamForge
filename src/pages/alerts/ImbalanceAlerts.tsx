import { useState } from 'react';
import { Info, AlertTriangle, OctagonAlert, Clock, Send, X, Flag } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

function PrivateNudge() {
  const [note, setNote] = useState('');
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <GlassCard className="border-white/10">
        <p className="text-sm text-white/50 text-center">Private nudge dismissed.</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="border-amber-500/20">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-amber-500/15 rounded-sm shrink-0">
          <Info size={18} className="text-amber-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-white">Contribution Reminder</h3>
            <Badge variant="warning">Private</Badge>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            We noticed your contribution this week is below the team average. This is just a friendly reminder
            to sync with your team and discuss workload. No action has been taken — this message is only visible to you.
          </p>
        </div>
        <button onClick={() => setDismissed(true)} className="text-white/30 hover:text-white/60 transition-colors focus-ring rounded p-1 shrink-0">
          <X size={15} />
        </button>
      </div>

      <div className="mb-4">
        <label className="text-xs text-white/60 font-medium block mb-1.5">
          Add a context note (optional)
        </label>
        <textarea
          placeholder="e.g., I've been dealing with a personal matter this week..."
          value={note}
          onChange={e => setNote(e.target.value)}
          rows={2}
          className="input-field resize-none text-sm py-2.5"
        />
        <p className="text-xs text-white/30 mt-1">Your note helps your team understand the context. It will only be shared if an alert escalates.</p>
      </div>

      <div className="flex gap-2">
        <Button size="sm" icon={<Send size={14} />} disabled={!note.trim()}>Submit Note</Button>
        <Button variant="ghost" size="sm" onClick={() => setDismissed(true)}>Dismiss</Button>
      </div>
    </GlassCard>
  );
}

function TeamAlert() {
  const [note, setNote] = useState('');
  const [disputeText, setDisputeText] = useState('');
  const [showDispute, setShowDispute] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  if (acknowledged) {
    return (
      <GlassCard className="border-emerald-500/20">
        <p className="text-sm text-white/70 text-center flex items-center justify-center gap-2">
          <span className="text-emerald-400">✓</span> Team alert acknowledged.
        </p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="border-amber-500/30">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-amber-500/15 rounded-sm shrink-0">
          <AlertTriangle size={18} className="text-amber-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-white">Team Imbalance Detected</h3>
            <Badge variant="warning">Team Visible</Badge>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            Contribution levels across the team have been uneven for <strong className="text-white/90">2+ weeks</strong>.
            The team should discuss workload distribution to ensure everyone can contribute fairly.
            This alert is visible to all team members.
          </p>
          <div className="flex gap-4 mt-2 text-xs text-white/50">
            <span>Affected: <span className="text-amber-400">Jake Park</span></span>
            <span>Team avg: <span className="text-white/70">18h/week</span></span>
            <span>Jake: <span className="text-red-400">7h/week</span></span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-xs text-white/60 font-medium block mb-1.5">Add a context note (shared with team)</label>
        <textarea
          placeholder="Explain the situation or propose a solution..."
          value={note}
          onChange={e => setNote(e.target.value)}
          rows={2}
          className="input-field resize-none text-sm py-2.5"
        />
      </div>

      {showDispute ? (
        <div className="mb-4 p-3 glass-dark rounded-sm border border-white/10">
          <p className="text-xs font-medium text-white/70 mb-2">Explain why this alert is inaccurate:</p>
          <textarea
            placeholder="e.g., My contributions are tracked in a separate repo not connected to this system..."
            value={disputeText}
            onChange={e => setDisputeText(e.target.value)}
            rows={2}
            className="input-field resize-none text-sm py-2"
          />
          <div className="flex gap-2 mt-2">
            <Button size="sm" disabled={!disputeText.trim()}>Submit Dispute</Button>
            <Button variant="ghost" size="sm" onClick={() => setShowDispute(false)}>Cancel</Button>
          </div>
        </div>
      ) : null}

      <div className="flex gap-2 flex-wrap">
        <Button size="sm" onClick={() => setAcknowledged(true)}>Acknowledge</Button>
        <Button variant="ghost" size="sm" onClick={() => setShowDispute(true)}>
          This alert is inaccurate
        </Button>
      </div>
    </GlassCard>
  );
}

const AUDIT_DATES = {
  nudge: new Date(Date.now() - 1209600000).toLocaleDateString(),
  team: new Date(Date.now() - 604800000).toLocaleDateString(),
  escalated: new Date().toLocaleDateString(),
};

function ProfessorAlert() {
  const [contextNote, setContextNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const timestamp = new Date().toLocaleString();

  return (
    <GlassCard className="border-red-500/30">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-red-500/15 rounded-sm shrink-0">
          <OctagonAlert size={18} className="text-red-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-white">Escalated to Professor</h3>
            <Badge variant="error">Escalated</Badge>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            Persistent contribution imbalance has been automatically reported to the course instructor.
            This does not necessarily indicate misconduct — the professor will review the context before
            taking any action.
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs text-white/40">
            <Clock size={12} />
            <span>Alert logged at: <span className="font-mono text-white/60">{timestamp}</span></span>
          </div>
        </div>
      </div>

      {/* Audit trail */}
      <div className="mb-4 p-3 glass-dark rounded-sm border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <Flag size={12} className="text-red-400" />
          <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">Audit Trail</p>
        </div>
        <div className="space-y-1 font-mono">
          <p className="text-xs text-white/40">[ {AUDIT_DATES.nudge} ] Private nudge sent</p>
          <p className="text-xs text-white/40">[ {AUDIT_DATES.team} ] Team alert issued</p>
          <p className="text-xs text-red-400">[ {AUDIT_DATES.escalated} ] Escalated to professor</p>
        </div>
      </div>

      {submitted ? (
        <div className="mb-4 p-3 glass-dark rounded-sm border border-emerald-500/30 text-sm text-emerald-400 flex items-center gap-2">
          <span>✓</span> Context note submitted to your instructor.
        </div>
      ) : (
        <div className="mb-4">
          <label className="text-xs text-white/60 font-medium block mb-1.5">Submit Context Note to Professor</label>
          <textarea
            placeholder="Explain your situation to your instructor. This note is confidential between you and the professor."
            value={contextNote}
            onChange={e => setContextNote(e.target.value)}
            rows={3}
            className="input-field resize-none text-sm py-2.5"
          />
        </div>
      )}

      <div className="flex gap-2">
        {!submitted && (
          <Button
            size="sm"
            variant="destructive"
            icon={<Send size={14} />}
            disabled={!contextNote.trim()}
            onClick={() => setSubmitted(true)}
          >
            Submit Context Note
          </Button>
        )}
        <Button variant="secondary" size="sm">Request Review</Button>
      </div>
    </GlassCard>
  );
}

export default function ImbalanceAlerts() {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-white">Imbalance Alerts</h2>
        <p className="text-white/50 text-sm mt-0.5">
          These alerts are designed to be supportive and non-accusatory. They help teams address workload issues early.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <h3 className="text-sm font-semibold text-white/70">Stage 1: Private Nudge</h3>
          <Badge variant="neutral">Only visible to you</Badge>
        </div>
        <PrivateNudge />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <h3 className="text-sm font-semibold text-white/70">Stage 2: Team Alert</h3>
          <Badge variant="warning">Visible to your team</Badge>
        </div>
        <TeamAlert />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <h3 className="text-sm font-semibold text-white/70">Stage 3: Professor Alert</h3>
          <Badge variant="error">Escalated to instructor</Badge>
        </div>
        <ProfessorAlert />
      </div>

      <GlassCard padding="p-4" className="border-white/5">
        <p className="text-xs text-white/40 text-center leading-relaxed">
          All alerts follow a progressive, supportive process. Students always have the opportunity to provide context
          before any escalation. Alert data is used only to support team coordination and is never shared externally.
        </p>
      </GlassCard>
    </div>
  );
}
