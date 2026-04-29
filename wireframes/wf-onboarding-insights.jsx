// ─────────────────────────────────────────────────────────────
// Industry Insights onboarding flow — sketchy wireframe vibe
// Choose Focus → Input → Processing → Done
// ─────────────────────────────────────────────────────────────

const StepNavInsights = window.StepNav || function StepNavFallback({ steps, active }) {
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 28 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            border: '1.5px solid var(--ink)',
            background: i < active ? 'var(--highlight)' : i === active ? 'var(--ink)' : 'transparent',
            color: i === active ? 'var(--paper)' : 'var(--ink)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700,
          }}>{i < active ? '✓' : i + 1}</div>
          <span style={{ fontSize: 11, color: i <= active ? 'var(--ink)' : 'var(--ink-faint)', fontWeight: i === active ? 700 : 400 }}>{s}</span>
          {i < steps.length - 1 && <div style={{ width: 24, height: 1.5, background: i < active ? 'var(--ink)' : 'var(--ink-faint)' }} />}
        </div>
      ))}
    </div>
  );
};

// ── Step 1: Choose Focus ──
function InsightsChooseFocus({ onPick, onSkip }) {
  return (
    <div style={{ padding: '48px 24px', maxWidth: 780, margin: '0 auto', fontFamily: 'var(--hand)', textAlign: 'center' }}>
      <StepNavInsights steps={['Focus', 'Competitors', 'Scanning', 'Ready']} active={0} />
      <h1 className="wf-h1" style={{ fontSize: 30, marginBottom: 6 }}>What do you want to track?</h1>
      <p className="wf-body" style={{ fontSize: 14, color: 'var(--ink-soft)', maxWidth: 440, margin: '0 auto 28px' }}>
        Industry Insights monitors competitor ads and surfaces winning patterns. Pick your focus to get started.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, textAlign: 'left', maxWidth: 600, margin: '0 auto 24px' }}>
        {[
          { icon: '⊞', title: 'Track my industry', desc: 'See every ad running in your vertical — insurance, e-com, SaaS, etc.', id: 'industry' },
          { icon: '◎', title: 'Track specific competitors', desc: 'Monitor named brands and get alerts when they launch new ads.', id: 'competitors' },
        ].map(c => (
          <Box key={c.id} onClick={() => onPick(c.id)} style={{ padding: 22, cursor: 'pointer', background: 'var(--paper)' }}>
            <div style={{ fontFamily: 'var(--hand-loose)', fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{c.title}</h3>
            <p className="wf-body" style={{ fontSize: 12 }}>{c.desc}</p>
            <div style={{ marginTop: 12, fontSize: 12, fontWeight: 700, color: 'var(--ink)' }}>Select →</div>
          </Box>
        ))}
      </div>

      <span onClick={onSkip} style={{ fontSize: 12, color: 'var(--ink-faint)', cursor: 'pointer', textDecoration: 'underline wavy var(--ink-ghost)', textUnderlineOffset: 3 }}>
        Skip for now — explore the dashboard →
      </span>
    </div>
  );
}

// ── Step 2: Input — competitors, industry, platforms ──
function InsightsInput({ onBack, onContinue, focus }) {
  const [industry, setIndustry] = React.useState('Insurance');
  const [competitors, setCompetitors] = React.useState(['GEICO', 'Progressive', 'Lemonade']);
  const [newComp, setNewComp] = React.useState('');
  const [platforms, setPlatforms] = React.useState({ meta: true, google: true, tiktok: false, youtube: false });
  const [keywords, setKeywords] = React.useState('');

  const addComp = () => {
    if (newComp.trim() && competitors.length < 10) {
      setCompetitors(prev => [...prev, newComp.trim()]);
      setNewComp('');
    }
  };
  const removeComp = (i) => setCompetitors(prev => prev.filter((_, idx) => idx !== i));

  return (
    <div style={{ padding: '48px 24px', maxWidth: 640, margin: '0 auto', fontFamily: 'var(--hand)' }}>
      <StepNavInsights steps={['Focus', 'Competitors', 'Scanning', 'Ready']} active={1} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <span onClick={onBack} style={{ cursor: 'pointer', fontSize: 14 }}>←</span>
        <h1 className="wf-h1" style={{ fontSize: 24 }}>
          {focus === 'competitors' ? 'Who are you tracking?' : 'Tell us about your industry'}
        </h1>
      </div>
      <p className="wf-body" style={{ fontSize: 13, color: 'var(--ink-faint)', marginBottom: 24 }}>
        We'll scan ad platforms and build your personalized intelligence feed.
      </p>

      <Box style={{ padding: 22, background: 'var(--paper)', marginBottom: 16 }}>
        <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>Industry / Vertical</div>
        <select value={industry} onChange={(e) => setIndustry(e.target.value)} style={{
          width: '100%', padding: '8px 12px', border: '1.5px solid var(--ink)', borderRadius: 6,
          fontFamily: 'var(--hand)', fontSize: 13, background: 'var(--paper)',
        }}>
          {['Insurance', 'Finance', 'E-commerce', 'SaaS', 'Health & Wellness', 'Education', 'Real Estate', 'Travel', 'Automotive'].map(i => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </Box>

      <Box style={{ padding: 22, background: 'var(--paper)', marginBottom: 16 }}>
        <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>Competitors to track</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          {competitors.map((c, i) => (
            <span key={i} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 12px', border: '1.5px solid var(--ink)', borderRadius: 999,
              fontSize: 12, fontWeight: 500,
            }}>
              {c}
              <span onClick={() => removeComp(i)} style={{ cursor: 'pointer', color: 'var(--ink-faint)', fontSize: 10 }}>✕</span>
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input value={newComp} onChange={(e) => setNewComp(e.target.value)} placeholder="Add a competitor…"
            onKeyDown={(e) => e.key === 'Enter' && addComp()}
            style={{ flex: 1, padding: '8px 12px', border: '1.5px solid var(--ink)', borderRadius: 6, fontFamily: 'var(--hand)', fontSize: 12 }} />
          <Btn variant="ghost" onClick={addComp} style={{ fontSize: 11 }}>+ Add</Btn>
        </div>
        <div className="wf-micro" style={{ marginTop: 8, fontSize: 10 }}>Up to 10 competitors · We'll find their active ads automatically</div>
      </Box>

      <Box style={{ padding: 22, background: 'var(--paper)', marginBottom: 16 }}>
        <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>Platforms to monitor</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[
            { id: 'meta', label: '📘 Meta Ads', sub: 'Facebook + Instagram' },
            { id: 'google', label: '🔍 Google Ads', sub: 'Search + Display' },
            { id: 'tiktok', label: '🎵 TikTok Ads', sub: 'In-feed + Spark' },
            { id: 'youtube', label: '📺 YouTube Ads', sub: 'Pre-roll + Shorts' },
          ].map(p => (
            <div key={p.id} onClick={() => setPlatforms(prev => ({ ...prev, [p.id]: !prev[p.id] }))}
              style={{
                padding: '10px 14px', border: '1.5px solid var(--ink)', cursor: 'pointer',
                borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px',
                background: platforms[p.id] ? 'var(--highlight-soft)' : 'var(--paper)',
                flex: '1 1 140px',
              }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{p.label}</div>
              <div className="wf-micro" style={{ fontSize: 10 }}>{p.sub}</div>
              {platforms[p.id] && <div style={{ fontSize: 10, color: 'var(--ink)', marginTop: 4, fontWeight: 700 }}>✓ Active</div>}
            </div>
          ))}
        </div>
      </Box>

      <Box style={{ padding: 22, background: 'var(--paper)', marginBottom: 24 }}>
        <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>Keywords to watch <span style={{ fontWeight: 400, color: 'var(--ink-faint)' }}>optional</span></div>
        <input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="e.g., car insurance, save money, compare quotes"
          style={{ width: '100%', padding: '8px 12px', border: '1.5px solid var(--ink)', borderRadius: 6, fontFamily: 'var(--hand)', fontSize: 12 }} />
      </Box>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Btn variant="ghost" onClick={onBack}>← Back</Btn>
        <Btn onClick={() => onContinue({ industry, competitors, platforms, keywords })}>Continue →</Btn>
      </div>
    </div>
  );
}

// ── Step 3: Processing ──
function InsightsProcessing({ onDone }) {
  const [step, setStep] = React.useState(0);
  const stages = [
    'Connecting to ad platforms…',
    'Scanning competitor ad libraries…',
    'Indexing active campaigns…',
    'Building your intelligence feed…',
  ];

  React.useEffect(() => {
    const timers = stages.map((_, i) => setTimeout(() => setStep(i + 1), (i + 1) * 1100));
    const done = setTimeout(onDone, stages.length * 1100 + 500);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, []);

  return (
    <div style={{ padding: '60px 24px', maxWidth: 580, margin: '0 auto', fontFamily: 'var(--hand)', textAlign: 'center' }}>
      <StepNavInsights steps={['Focus', 'Competitors', 'Scanning', 'Ready']} active={2} />
      <div style={{ width: 44, height: 44, border: '2px solid var(--ink)', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 20px' }} />
      <h2 className="wf-h2" style={{ fontSize: 22 }}>Scanning the ad landscape…</h2>
      <p className="wf-body" style={{ fontSize: 13, color: 'var(--ink-faint)', marginTop: 6, marginBottom: 28 }}>This usually takes 15–30 seconds.</p>

      <div style={{ textAlign: 'left', maxWidth: 360, margin: '0 auto' }}>
        {stages.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', fontSize: 13 }}>
            <div style={{
              width: 20, height: 20, borderRadius: '50%',
              border: '1.5px solid var(--ink)',
              background: i < step ? 'var(--highlight)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 700,
            }}>{i < step ? '✓' : ''}</div>
            <span style={{ color: i < step ? 'var(--ink)' : i === step ? 'var(--ink)' : 'var(--ink-faint)', fontWeight: i === step ? 700 : 400 }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Step 4: Done — Feed Ready ──
function InsightsDone({ onBack, onStart, onRestart, data }) {
  const industry = data.industry || 'Insurance';
  const competitors = data.competitors || ['GEICO', 'Progressive', 'Lemonade'];
  return (
    <div style={{ padding: '48px 24px', maxWidth: 700, margin: '0 auto', fontFamily: 'var(--hand)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span onClick={onBack} style={{ cursor: 'pointer', fontSize: 13, color: 'var(--ink-faint)' }}>← Back</span>
        <span onClick={onRestart} style={{ cursor: 'pointer', fontSize: 12, color: 'var(--ink-faint)', textDecoration: 'underline' }}>Start over</span>
      </div>

      <StepNavInsights steps={['Focus', 'Competitors', 'Scanning', 'Ready']} active={3} />

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ width: 56, height: 56, border: '2px solid var(--ink)', borderRadius: '50%', background: 'var(--highlight)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: 28 }}>✓</div>
        <h1 className="wf-h1" style={{ fontSize: 26, marginTop: 14 }}>Your intelligence feed is live!</h1>
        <p className="wf-body" style={{ fontSize: 13, color: 'var(--ink-faint)' }}>We found ads across your industry and competitors.</p>
      </div>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Industry', value: industry },
          { label: 'Competitors tracked', value: competitors.length },
          { label: 'Active ads found', value: '2,847' },
          { label: 'Platforms connected', value: '2' },
        ].map((s, i) => (
          <Box key={i} style={{ padding: 14, textAlign: 'center', background: 'var(--paper)' }}>
            <div className="wf-micro" style={{ fontSize: 9, marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>{s.value}</div>
          </Box>
        ))}
      </div>

      {/* Competitors found */}
      <Box style={{ padding: 18, background: 'var(--paper)', marginBottom: 16 }}>
        <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>Competitors being tracked</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {competitors.map((c, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', border: '1.5px solid var(--ink)', borderRadius: 999, fontSize: 12 }}>
              <span style={{ fontSize: 6, color: '#22c55e' }}>●</span> {c}
            </span>
          ))}
        </div>
      </Box>

      {/* Auto-created boards */}
      <Box style={{ padding: 18, background: 'var(--paper)', marginBottom: 16 }}>
        <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>Auto-created boards</div>
        {competitors.slice(0, 3).map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 2 ? '1px solid var(--ink-ghost)' : 'none' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>▤ {c} ads</div>
              <div className="wf-micro" style={{ fontSize: 10 }}>Auto-updating · {Math.floor(Math.random() * 200 + 50)} ads indexed</div>
            </div>
            <span style={{ fontSize: 10, color: 'var(--ink-faint)' }}>→</span>
          </div>
        ))}
      </Box>

      {/* Top trending in your industry */}
      <Box style={{ padding: 18, background: 'var(--paper)', marginBottom: 24 }}>
        <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>🔥 Trending in {industry}</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['Price comparison', 'Customer testimonials', 'Fear-based hooks', 'Limited time offers', 'UGC-style'].map((t, i) => (
            <Pill key={i} soft>{t}</Pill>
          ))}
        </div>
      </Box>

      <div style={{ textAlign: 'center' }}>
        <Btn onClick={onStart} style={{ fontSize: 15, padding: '14px 28px' }}>⊞ Start exploring ads →</Btn>
        <div className="wf-micro" style={{ marginTop: 10, fontSize: 11 }}>Your feed updates every 6 hours automatically</div>
      </div>
    </div>
  );
}

// ── Wrapper flow ──
function InsightsOnboardingFlow({ onNav }) {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({ focus: null, industry: 'Insurance', competitors: ['GEICO', 'Progressive', 'Lemonade'], platforms: {}, keywords: '' });

  const goto = (s) => setStep(s);

  let body;
  if (step === 0) {
    body = <InsightsChooseFocus
      onPick={(focus) => { setData(d => ({ ...d, focus })); goto(1); }}
      onSkip={() => { sessionStorage.setItem('ff_new_user', '1'); onNav('dashboard'); }}
    />;
  } else if (step === 1) {
    body = <InsightsInput
      focus={data.focus}
      onBack={() => goto(0)}
      onContinue={(inputs) => { setData(d => ({ ...d, ...inputs })); goto(2); }}
    />;
  } else if (step === 2) {
    body = <InsightsProcessing onDone={() => goto(3)} />;
  } else {
    body = <InsightsDone
      data={data}
      onBack={() => goto(1)}
      onStart={() => { sessionStorage.setItem('ff_new_user', '1'); sessionStorage.setItem('ff_onboarded', '1'); onNav('dashboard'); }}
      onRestart={() => goto(0)}
    />;
  }

  return <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>{body}</div>;
}

// ── Insights-specific celebration text ──
function InsightsCelebrate({ onDone }) {
  const [phase, setPhase] = React.useState(0);

  React.useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setPhase(3), 3200),
      setTimeout(() => setPhase(4), 4800),
      setTimeout(() => setPhase(5), 6200),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  const fadeIn = (at) => ({
    opacity: phase >= at ? 1 : 0,
    transform: phase >= at ? 'translateY(0)' : 'translateY(20px)',
    transition: 'all 0.6s ease-out',
  });

  const isDashUpgrade = !!sessionStorage.getItem('ff_upgrade_from_dashboard');

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--ink)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--hand)', color: 'var(--paper)', padding: '40px 24px',
    }}>
      <div style={{ maxWidth: 700, width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ ...fadeIn(0), marginBottom: 32 }}>
          <div style={{ width: 72, height: 72, border: '3px solid var(--highlight)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', background: 'rgba(255,241,118,0.15)' }}>
            <span style={{ fontFamily: 'var(--hand-loose)', fontSize: 40 }}>✓</span>
          </div>
          <div style={{ fontSize: 14, color: 'var(--ink-ghost)', marginTop: 14, letterSpacing: 1 }}>PAYMENT CONFIRMED</div>
        </div>

        <div style={{ ...fadeIn(1), marginBottom: 40 }}>
          <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.1, marginBottom: 12 }}>
            Your <span style={{ color: 'var(--highlight)', position: 'relative' }}>
              competitive edge
              <span style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 4, background: 'var(--highlight)', borderRadius: 2, opacity: 0.6 }}></span>
            </span><br/>is now active.
          </h1>
          <p style={{ fontSize: 16, color: 'var(--ink-ghost)', maxWidth: 480, margin: '0 auto' }}>
            You just unlocked the most comprehensive ad intelligence platform in the market.
          </p>
        </div>

        <div style={{ ...fadeIn(2), marginBottom: 36 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
            {[
              { num: '50M+', label: 'Ads indexed', icon: '⊞' },
              { num: '8', label: 'Platforms tracked', icon: '◎' },
              { num: '24/7', label: 'Real-time monitoring', icon: '⚡' },
              { num: '<6h', label: 'Feed refresh cycle', icon: '↻' },
            ].map((s, i) => (
              <div key={i} style={{ ...fadeIn(i < 2 ? 2 : 3), padding: '20px 16px', border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: '8px 12px 9px 11px / 10px 8px 12px 9px', background: 'rgba(255,255,255,0.04)' }}>
                <div style={{ fontSize: 12, color: 'var(--ink-ghost)', marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontSize: 32, fontWeight: 800, fontFamily: 'var(--hand-loose)', color: 'var(--highlight)' }}>{s.num}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-ghost)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...fadeIn(4), marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
            {[['◎', 'Discover Feed'], ['⚡', 'Intelligence'], ['▤', 'Boards'], ['✦', 'Remix to Creative']].map(([icon, label], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                <span style={{ width: 28, height: 28, border: '1.5px solid var(--highlight)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...fadeIn(5) }}>
          <button onClick={onDone} style={{
            padding: '16px 36px', border: '2px solid var(--highlight)',
            background: 'var(--highlight)', color: 'var(--ink)',
            borderRadius: '8px 12px 9px 11px / 10px 8px 12px 9px',
            fontFamily: 'var(--hand)', fontSize: 18, fontWeight: 800, cursor: 'pointer',
          }}>{isDashUpgrade ? 'Go to your dashboard →' : 'Set up your tracking →'}</button>
          <div style={{ marginTop: 14, fontSize: 12, color: 'var(--ink-ghost)' }}>
            {isDashUpgrade ? 'Your intelligence feed is ready' : 'Takes under 2 minutes · Your feed starts building immediately'}
          </div>
        </div>
      </div>
    </div>
  );
}

// Trial welcome for Insights
function InsightsTrialWelcome({ onDone }) {
  const [phase, setPhase] = React.useState(0);
  React.useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 500), setTimeout(() => setPhase(2), 1600), setTimeout(() => setPhase(3), 2800), setTimeout(() => setPhase(4), 4000)];
    sessionStorage.setItem('ff_trial_offer', '1');
    return () => t.forEach(clearTimeout);
  }, []);

  const fadeIn = (at) => ({ opacity: phase >= at ? 1 : 0, transform: phase >= at ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.5s ease-out' });

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(170deg, var(--paper) 0%, var(--paper-soft) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--hand)', padding: '40px 24px' }}>
      <div style={{ maxWidth: 560, width: '100%', textAlign: 'center' }}>
        <div style={{ ...fadeIn(0), marginBottom: 24 }}>
          <span style={{ display: 'inline-block', padding: '5px 16px', border: '1.5px solid var(--ink)', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>🎉 Welcome to Industry Insights trial</span>
        </div>
        <div style={{ ...fadeIn(1), marginBottom: 36 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, marginBottom: 10 }}>
            See every ad your competitors<br/>are running — <span style={{ background: 'var(--highlight)', padding: '0 6px', borderRadius: '4px 6px 5px 7px / 5px 4px 7px 6px' }}>right now</span>
          </h1>
          <p className="wf-body" style={{ fontSize: 15, color: 'var(--ink-soft)', maxWidth: 420, margin: '0 auto' }}>Set up your tracking in under 2 minutes. No credit card needed.</p>
        </div>
        <div style={{ ...fadeIn(2), marginBottom: 36 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left', maxWidth: 400, margin: '0 auto' }}>
            {[
              { icon: '①', label: 'Pick your industry & competitors', desc: 'We start scanning immediately' },
              { icon: '②', label: 'We index thousands of live ads', desc: 'Across Meta, Google, TikTok, YouTube' },
              { icon: '③', label: 'Get insights and save winners', desc: 'Build boards, track patterns, remix to creatives' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 18px', border: '1.5px solid var(--ink-faint)', borderRadius: '6px 9px 7px 8px / 8px 6px 9px 7px', background: 'var(--paper)' }}>
                <span style={{ fontSize: 22, lineHeight: 1 }}>{s.icon}</span>
                <div><div style={{ fontSize: 14, fontWeight: 700 }}>{s.label}</div><div className="wf-body" style={{ fontSize: 12, color: 'var(--ink-faint)', marginTop: 2 }}>{s.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ ...fadeIn(3), marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 18, flexWrap: 'wrap' }}>
            {[['7', 'Day trial'], ['5K', 'Ad lookups'], ['3', 'Boards']].map(([num, label], i) => (
              <div key={i} style={{ textAlign: 'center' }}><div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'var(--hand-loose)' }}>{num}</div><div style={{ fontSize: 11, color: 'var(--ink-faint)' }}>{label}</div></div>
            ))}
          </div>
        </div>
        <div style={{ ...fadeIn(4) }}>
          <button onClick={onDone} style={{ padding: '14px 32px', border: '2px solid var(--ink)', background: 'var(--ink)', color: 'var(--paper)', borderRadius: '8px 12px 9px 11px / 10px 8px 12px 9px', fontFamily: 'var(--hand)', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>Set up your tracking →</button>
          <div style={{ marginTop: 12, fontSize: 12, color: 'var(--ink-faint)' }}>No credit card required · Cancel anytime</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { InsightsOnboardingFlow, InsightsCelebrate, InsightsTrialWelcome });
