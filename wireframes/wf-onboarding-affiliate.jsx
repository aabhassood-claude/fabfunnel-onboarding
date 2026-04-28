// ─────────────────────────────────────────────────────────────
// Affiliate onboarding flow — sketchy wireframe vibe
// Reuses StepNav from wf-onboarding.jsx.
// ─────────────────────────────────────────────────────────────

const StepNav = window.StepNav;

// ── Step 2 (affiliate): Input ──
function OnbInputAffiliate({ onBack, onContinue }) {
  const [category, setCategory] = React.useState('');
  const [industry, setIndustry] = React.useState('Insurance');
  const [platforms, setPlatforms] = React.useState(new Set(['Instagram', 'TikTok']));
  const [audience, setAudience] = React.useState('');
  const [urls, setUrls] = React.useState(['']);
  const [affLink, setAffLink] = React.useState('');

  const togglePlat = (p) => {
    const next = new Set(platforms);
    next.has(p) ? next.delete(p) : next.add(p);
    setPlatforms(next);
  };

  const PLAT_OPTIONS = [
    { id: 'Instagram',     icon: '📱' },
    { id: 'TikTok',        icon: '♪'  },
    { id: 'YouTube',       icon: '▶'  },
    { id: 'Blog / Website',icon: '✎'  },
    { id: 'Pinterest',     icon: '📌' },
    { id: 'X / Twitter',   icon: '𝕏'  },
    { id: 'Email',         icon: '✉'  },
  ];

  const Label = ({ children, hint, required }) => (
    <label className="wf-body" style={{ display: 'block', fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>
      {children}
      {required && <span style={{ color: 'var(--accent)', marginLeft: 4 }}>*</span>}
      {hint && <span className="wf-micro" style={{ fontWeight: 400, marginLeft: 6 }}>{hint}</span>}
    </label>
  );

  const inputCss = {
    display: 'block', width: '100%', padding: '10px 14px',
    fontFamily: 'var(--hand)', fontSize: 14, outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <StepNav active={1} onBack={onBack} backLabel="Back to Quick Start" />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px 80px' }}>
        <Pill soft style={{ marginBottom: 12 }}>STEP 2 · INPUT</Pill>
        <h1 className="wf-h1" style={{ fontSize: 30 }}>Tell us about what you're <span className="wf-hl">promoting</span></h1>
        <p className="wf-body" style={{ fontSize: 15, marginTop: 10 }}>We'll build a knowledge base for your category and tailor ad angles to your audience.</p>

        <Box style={{ padding: 28, marginTop: 28 }}>
          <Label required>Category name</Label>
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Auto Insurance" className="wf-field" style={inputCss} />
          <p className="wf-micro" style={{ marginTop: 8 }}>Type your own or pick from suggestions.</p>

          <div style={{ marginTop: 22 }}>
            <Label>Industry</Label>
            <div style={{ position: 'relative' }}>
              <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="wf-field" style={{ ...inputCss, paddingRight: 36, appearance: 'none', cursor: 'pointer', background: 'var(--paper)', color: 'var(--ink)' }}>
                <option>Insurance</option>
                <option>Finance</option>
                <option>Health & Wellness</option>
                <option>Software / SaaS</option>
                <option>Home Services</option>
                <option>Education</option>
                <option>Travel</option>
              </select>
              <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--ink-faint)', fontSize: 10 }}>▼</span>
            </div>
          </div>

          <div style={{ marginTop: 22 }}>
            <Label hint="(select all that apply)">Where will you post?</Label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {PLAT_OPTIONS.map(p => {
                const active = platforms.has(p.id);
                return (
                  <button key={p.id} onClick={() => togglePlat(p.id)} className={`wf-pill ${active ? 'wf-pill-hl' : ''}`} style={{ cursor: 'pointer', textTransform: 'none', fontSize: 12, padding: '6px 12px', gap: 6 }}>
                    <span style={{ fontSize: 12 }}>{p.icon}</span>{p.id}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: 22 }}>
            <Label hint="(optional)">Target audience</Label>
            <input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="e.g., homeowners 30–55 looking to save on premiums" className="wf-field" style={inputCss} />
          </div>

          <div style={{ marginTop: 22 }}>
            <Label hint="(optional — competitor pages, your content)">Reference URLs</Label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {urls.map((u, i) => (
                <div key={i} style={{ display: 'flex', gap: 8 }}>
                  <input value={u} onChange={(e) => { const next = [...urls]; next[i] = e.target.value; setUrls(next); }} placeholder="https://..." className="wf-field" style={inputCss} />
                  <button onClick={() => setUrls(urls.length === 1 ? [''] : urls.filter((_, j) => j !== i))} className="wf-close" title="Remove" style={{ width: 38, height: 'auto', flexShrink: 0 }}>×</button>
                </div>
              ))}
            </div>
            <Btn variant="ghost" onClick={() => setUrls([...urls, ''])} style={{ marginTop: 10, fontSize: 12, padding: '6px 12px' }}>+ Add another URL</Btn>
          </div>

          <div style={{ marginTop: 22 }}>
            <Label hint="(optional)">Affiliate link</Label>
            <input value={affLink} onChange={(e) => setAffLink(e.target.value)} placeholder="Paste your affiliate link" className="wf-field" style={inputCss} />
          </div>
        </Box>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
          <Btn variant="outline" onClick={onBack}>← Back</Btn>
          <Btn onClick={() => onContinue({
            category: category || 'Auto Insurance', industry, platforms: [...platforms], audience, urls: urls.filter(Boolean), affLink,
          })}>Continue →</Btn>
        </div>
      </div>
    </div>
  );
}

// ── Step 3 (affiliate): Processing ──
function OnbProcessingAffiliate({ onBack, onDone }) {
  const stages = [
    'Reading your category & platforms',
    'Analyzing reference URLs & competitors',
    'Detecting angles & keywords',
    'Finalizing your category profile',
  ];
  const [current, setCurrent] = React.useState(0);
  React.useEffect(() => {
    if (current >= stages.length) { setTimeout(onDone, 600); return; }
    const t = setTimeout(() => setCurrent(c => c + 1), 1100);
    return () => clearTimeout(t);
  }, [current]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <StepNav active={2} onBack={onBack} backLabel="Back to Input" />
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, margin: '0 auto', position: 'relative' }}>
          <svg width="64" height="64" viewBox="0 0 64 64" style={{ animation: 'spin 1.2s linear infinite' }}>
            <circle cx="32" cy="32" r="26" stroke="var(--ink-ghost)" strokeWidth="3" fill="none" strokeDasharray="3 4" />
            <path d="M 32 6 A 26 26 0 0 1 56 32" stroke="var(--ink)" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
        </div>
        <h1 className="wf-h1" style={{ fontSize: 28, marginTop: 24 }}>Analyzing your <span className="wf-hl">category…</span></h1>
        <p className="wf-body" style={{ fontSize: 14, marginTop: 8 }}>We're pulling reference content, researching competitors, and detecting angles.</p>

        <Box style={{ marginTop: 36, padding: 24, display: 'inline-block', textAlign: 'left' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {stages.map((label, i) => {
              const done = i < current;
              const active = i === current;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: done ? 'var(--ink)' : 'var(--paper)',
                    border: '1.5px solid var(--ink)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, fontFamily: 'var(--hand)', fontSize: 11,
                    color: done ? 'var(--paper)' : 'var(--ink)',
                  }}>
                    {done ? '✓' : (active ? <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ink)', animation: 'spin 0.8s linear infinite' }} /> : '')}
                  </div>
                  <span className="wf-body" style={{ fontSize: 15, color: done || active ? 'var(--ink)' : 'var(--ink-faint)', fontWeight: active ? 700 : 400 }}>{label}</span>
                </div>
              );
            })}
          </div>
        </Box>
      </div>
    </div>
  );
}

// ── Step 4 (affiliate): Done — Category Ready ──
function OnbDoneAffiliate({ onBack, onStart, onRestart, category }) {
  const Field = ({ label, children }) => (
    <div>
      <div className="wf-eyebrow">{label}</div>
      <div className="wf-body" style={{ fontSize: 15, color: 'var(--ink)', marginTop: 4, fontWeight: 700 }}>{children}</div>
    </div>
  );
  const PlatChip = ({ children, icon }) => (
    <Pill soft style={{ textTransform: 'none', fontSize: 12, padding: '4px 12px', gap: 6 }}>
      <span style={{ fontSize: 11 }}>{icon}</span>{children}
    </Pill>
  );

  const refUrls = [
    { url: 'https://example-competitor.com/quotes', tag: 'competitor' },
    { url: 'https://yoursite.com/auto-insurance-guide', tag: 'your content' },
    { url: 'https://offer-partner.com/landing/save-40', tag: 'offer page' },
  ];
  const competitors = [
    { i: 'P', name: 'Progressive', desc: 'Insurance · Tracking: Ad creatives, Messaging' },
    { i: 'G', name: 'GEICO',       desc: 'Insurance · Tracking: Video ads, Humor' },
    { i: 'L', name: 'Lemonade',    desc: 'Insurance · Tracking: Social posts, UGC' },
    { i: 'S', name: 'State Farm',  desc: 'Insurance · Tracking: Brand ads' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <div style={{ height: 14, background: 'var(--highlight)', borderBottom: '1.5px dashed var(--ink-faint)' }} />
      <StepNav active={3} onBack={onBack} backLabel="Back to Input" onRestart={onRestart} />

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <div className="wf-icon" style={{ width: 52, height: 52, margin: '0 auto', borderRadius: '50%' }}>
            <span style={{ fontSize: 22 }}>✓</span>
          </div>
          <h1 className="wf-h1" style={{ fontSize: 30, marginTop: 14 }}>Category <span className="wf-hl">Ready!</span></h1>
          <p className="wf-body" style={{ fontSize: 14, marginTop: 6 }}>Your affiliate category has been analyzed and is ready for generation.</p>
        </div>

        <Box style={{ padding: 28, marginTop: 28 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <Field label="Category">{category || 'Auto Insurance'}</Field>
            <Field label="Industry">Insurance</Field>
            <Field label="Reference URLs">3 added</Field>
            <Field label="Detected tone">Trustworthy · Direct</Field>
          </div>
          <div className="wf-divider-dashed" style={{ margin: '22px 0' }} />

          <div className="wf-eyebrow">Platforms</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            <PlatChip icon="📱">Instagram</PlatChip>
            <PlatChip icon="♪">TikTok</PlatChip>
          </div>

          <div className="wf-divider-dashed" style={{ margin: '22px 0' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <Field label="Target audience">Homeowners, 30–55</Field>
            <Field label="Est. search volume">~45K / mo</Field>
            <Field label="Offer / payout">$50 CPA avg</Field>
            <Field label="Regulated content">Yes · review required</Field>
          </div>

          <div style={{ marginTop: 22 }}>
            <div className="wf-eyebrow">Suggested angles</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              {['Price savings', 'Switching made easy', 'Customer testimonials', 'Comparison', 'Urgency / limited'].map(t => <Pill key={t} soft>{t}</Pill>)}
            </div>
          </div>

          <div style={{ marginTop: 22 }}>
            <div className="wf-eyebrow">Keywords we'll target</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              {['cheap car insurance', 'compare quotes', 'switch & save', 'best rates 2026'].map(t => <Pill key={t} soft>{t}</Pill>)}
            </div>
          </div>
        </Box>

        <Box style={{ padding: 24, marginTop: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="wf-eyebrow">🔗 Reference URLs collected</div>
            <Btn variant="link" style={{ fontSize: 12 }}>Edit →</Btn>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
            {refUrls.map((r, i) => (
              <Box key={i} soft style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: 'var(--ink-faint)', fontSize: 13 }}>🔗</span>
                <span className="wf-body" style={{ flex: 1, fontSize: 13, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }}>{r.url}</span>
                <Pill soft style={{ fontSize: 9 }}>{r.tag}</Pill>
              </Box>
            ))}
          </div>
        </Box>

        <Box style={{ padding: 24, marginTop: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="wf-eyebrow">◎ Top competitors in this niche</div>
            <Btn variant="ghost" style={{ fontSize: 12, padding: '6px 12px' }}>+ Add competitor</Btn>
          </div>
          <p className="wf-body" style={{ fontSize: 13, marginTop: 8 }}>Brands running ads in your category — we'll learn from their winning angles.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
            {competitors.map(c => (
              <Box key={c.name} soft style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="wf-icon" style={{ width: 30, height: 30, fontSize: 13, fontFamily: 'var(--hand)', fontWeight: 700 }}>{c.i}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="wf-body" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{c.name}</div>
                  <div className="wf-micro" style={{ marginTop: 2 }}>{c.desc}</div>
                </div>
                <Pill soft style={{ fontSize: 9 }}>{c.name === 'State Farm' ? '1' : '2'} tracked</Pill>
              </Box>
            ))}
          </div>
        </Box>

        <Btn onClick={onStart} style={{ width: '100%', marginTop: 24, padding: '16px', fontSize: 16, fontWeight: 700, gap: 8 }}>
          ✦ Start Creating
        </Btn>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginTop: 14 }}>
          <span onClick={onRestart} className="wf-body" style={{ fontSize: 13, cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'wavy', textUnderlineOffset: 4 }}>Re-analyze category</span>
          <span style={{ color: 'var(--ink-ghost)' }}>·</span>
          <span onClick={onBack} className="wf-body" style={{ fontSize: 13, cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'wavy', textUnderlineOffset: 4 }}>Edit inputs</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { OnbInputAffiliate, OnbProcessingAffiliate, OnbDoneAffiliate });
