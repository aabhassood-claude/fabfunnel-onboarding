// ─────────────────────────────────────────────────────────────
// Industry Insights onboarding — E-com / Affiliate paths
// Choose Mode → Input → Scanning → Feed Ready
// ─────────────────────────────────────────────────────────────

const StepNavInsights = window.StepNav || function StepNavFallback({ steps, active }) {
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 28 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%', border: '1.5px solid var(--ink)',
            background: i < active ? 'var(--highlight)' : i === active ? 'var(--ink)' : 'transparent',
            color: i === active ? 'var(--paper)' : 'var(--ink)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700,
          }}>{i < active ? '✓' : i + 1}</div>
          <span style={{ fontSize: 11, color: i <= active ? 'var(--ink)' : 'var(--ink-faint)', fontWeight: i === active ? 700 : 400 }}>{s}</span>
          {i < steps.length - 1 && <div style={{ width: 24, height: 1.5, background: i < active ? 'var(--ink)' : 'var(--ink-faint)' }} />}
        </div>
      ))}
    </div>
  );
};

// ── Step 1: Choose Mode ──
function InsightsChooseMode({ onPick, onSkip, onLogin }) {
  return (
    <div style={{ padding: '48px 24px', maxWidth: 780, margin: '0 auto', fontFamily: 'var(--hand)', textAlign: 'center' }}>
      <StepNavInsights steps={['Choose Mode', 'Details', 'Scanning', 'Ready']} active={0} />

      <span className="wf-eyebrow" style={{ fontSize: 10 }}>Industry Insights</span>
      <h1 className="wf-h1" style={{ fontSize: 30, marginTop: 6, marginBottom: 6 }}>Quick Start</h1>
      <p className="wf-body" style={{ fontSize: 14, color: 'var(--ink-soft)', maxWidth: 440, margin: '0 auto 28px' }}>
        We'll find and track competitor ads in your space. How should we set up your feed?
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, textAlign: 'left', maxWidth: 620, margin: '0 auto 24px' }}>
        <Box onClick={() => onPick('ecom')} style={{ padding: 24, cursor: 'pointer', background: 'var(--paper)' }}>
          <div style={{ fontFamily: 'var(--hand-loose)', fontSize: 28, marginBottom: 10 }}>🛒</div>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>E-commerce Brand</h3>
          <p className="wf-body" style={{ fontSize: 12 }}>Paste your store URL — we'll find your competitors and start tracking their ads.</p>
          <div style={{ marginTop: 14, fontSize: 12, fontWeight: 700, color: 'var(--ink)' }}>Start →</div>
        </Box>
        <Box onClick={() => onPick('affiliate')} style={{ padding: 24, cursor: 'pointer', background: 'var(--paper)' }}>
          <div style={{ fontFamily: 'var(--hand-loose)', fontSize: 28, marginBottom: 10 }}>⚡</div>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Affiliate / Ad Lab</h3>
          <p className="wf-body" style={{ fontSize: 12 }}>Pick a category and niche — we'll surface the top-performing ads in your vertical.</p>
          <div style={{ marginTop: 14, fontSize: 12, fontWeight: 700, color: 'var(--ink)' }}>Start →</div>
        </Box>
      </div>

      <span onClick={onSkip} style={{ fontSize: 12, color: 'var(--ink-faint)', cursor: 'pointer', textDecoration: 'underline wavy var(--ink-ghost)', textUnderlineOffset: 3 }}>
        Skip for now — explore the dashboard →
      </span>
      {onLogin && (
        <div style={{ marginTop: 12, fontSize: 12, color: 'var(--ink-faint)' }}>
          Already have an account? <span onClick={onLogin} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Sign in</span>
        </div>
      )}
    </div>
  );
}

// ── Step 2a: E-com Input ──
function InsightsInputEcom({ onBack, onContinue }) {
  const [url, setUrl] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [platforms, setPlatforms] = React.useState({ meta: true, google: true, tiktok: false, youtube: false });

  return (
    <div style={{ padding: '48px 24px', maxWidth: 640, margin: '0 auto', fontFamily: 'var(--hand)' }}>
      <StepNavInsights steps={['Choose Mode', 'Details', 'Scanning', 'Ready']} active={1} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <span onClick={onBack} style={{ cursor: 'pointer', fontSize: 14 }}>←</span>
        <h1 className="wf-h1" style={{ fontSize: 24 }}>Tell us about your store</h1>
      </div>
      <p className="wf-body" style={{ fontSize: 13, color: 'var(--ink-faint)', marginBottom: 24 }}>
        We'll detect your competitors and start tracking their ads automatically.
      </p>

      <Box style={{ padding: 22, background: 'var(--paper)', marginBottom: 16 }}>
        <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>Store URL <span style={{ color: 'var(--accent)' }}>*</span></div>
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://yourstore.com"
          style={{ width: '100%', padding: '10px 12px', border: '1.5px solid var(--ink)', borderRadius: 6, fontFamily: 'var(--hand)', fontSize: 13, background: 'var(--paper)' }} />
        <div className="wf-micro" style={{ marginTop: 6, fontSize: 10 }}>Works with Shopify, WooCommerce, Amazon, and most platforms.</div>
      </Box>

      <Box style={{ padding: 22, background: 'var(--paper)', marginBottom: 16 }}>
        <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>Brand name <span style={{ fontWeight: 400, color: 'var(--ink-faint)' }}>optional — we'll detect</span></div>
        <input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="e.g., Aurora Apparel"
          style={{ width: '100%', padding: '10px 12px', border: '1.5px solid var(--ink)', borderRadius: 6, fontFamily: 'var(--hand)', fontSize: 13, background: 'var(--paper)' }} />
      </Box>

      <Box style={{ padding: 22, background: 'var(--paper)', marginBottom: 24 }}>
        <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>Platforms to monitor</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[
            { id: 'meta', label: '📘 Meta Ads' },
            { id: 'google', label: '🔍 Google Ads' },
            { id: 'tiktok', label: '🎵 TikTok Ads' },
            { id: 'youtube', label: '📺 YouTube Ads' },
          ].map(p => (
            <div key={p.id} onClick={() => setPlatforms(prev => ({ ...prev, [p.id]: !prev[p.id] }))}
              style={{
                padding: '8px 14px', border: '1.5px solid var(--ink)', cursor: 'pointer',
                borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px',
                background: platforms[p.id] ? 'var(--highlight-soft)' : 'var(--paper)',
                fontSize: 12, fontWeight: 700,
              }}>
              {p.label} {platforms[p.id] && '✓'}
            </div>
          ))}
        </div>
      </Box>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Btn variant="ghost" onClick={onBack}>← Back</Btn>
        <Btn onClick={() => onContinue({ url, brand, platforms, mode: 'ecom' })}>Continue →</Btn>
      </div>
    </div>
  );
}

// ── Step 2b: Affiliate Input ──
function InsightsInputAffiliate({ onBack, onContinue }) {
  const [category, setCategory] = React.useState('');
  const [industry, setIndustry] = React.useState('Insurance');
  const [platforms, setPlatforms] = React.useState({ meta: true, google: false, tiktok: true, youtube: false });
  const [refUrls, setRefUrls] = React.useState(['']);

  const addUrl = () => setRefUrls(prev => [...prev, '']);
  const removeUrl = (i) => setRefUrls(prev => prev.length > 1 ? prev.filter((_, idx) => idx !== i) : ['']);
  const updateUrl = (i, v) => setRefUrls(prev => prev.map((u, idx) => idx === i ? v : u));

  return (
    <div style={{ padding: '48px 24px', maxWidth: 640, margin: '0 auto', fontFamily: 'var(--hand)' }}>
      <StepNavInsights steps={['Choose Mode', 'Details', 'Scanning', 'Ready']} active={1} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <span onClick={onBack} style={{ cursor: 'pointer', fontSize: 14 }}>←</span>
        <h1 className="wf-h1" style={{ fontSize: 24 }}>What niche are you promoting?</h1>
      </div>
      <p className="wf-body" style={{ fontSize: 13, color: 'var(--ink-faint)', marginBottom: 24 }}>
        We'll find the top advertisers in your category and track their winning ads.
      </p>

      <Box style={{ padding: 22, background: 'var(--paper)', marginBottom: 16 }}>
        <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>Category name <span style={{ color: 'var(--accent)' }}>*</span></div>
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Auto Insurance, Credit Cards"
          list="insights-cat-presets"
          style={{ width: '100%', padding: '10px 12px', border: '1.5px solid var(--ink)', borderRadius: 6, fontFamily: 'var(--hand)', fontSize: 13, background: 'var(--paper)' }} />
        <datalist id="insights-cat-presets">
          {['Life Insurance','Home Insurance','Auto Insurance','Pet Insurance','Credit Cards','Mortgage','Student Loans','Crypto Trading'].map(c => <option key={c} value={c} />)}
        </datalist>
      </Box>

      <Box style={{ padding: 22, background: 'var(--paper)', marginBottom: 16 }}>
        <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>Industry</div>
        <select value={industry} onChange={(e) => setIndustry(e.target.value)} style={{
          width: '100%', padding: '8px 12px', border: '1.5px solid var(--ink)', borderRadius: 6, fontFamily: 'var(--hand)', fontSize: 13, background: 'var(--paper)',
        }}>
          {['Insurance','Finance','E-commerce','SaaS','Health & Wellness','Education','Real Estate','Travel'].map(i => <option key={i}>{i}</option>)}
        </select>
      </Box>

      <Box style={{ padding: 22, background: 'var(--paper)', marginBottom: 16 }}>
        <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>Platforms to monitor</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[
            { id: 'meta', label: '📘 Meta Ads' },
            { id: 'google', label: '🔍 Google Ads' },
            { id: 'tiktok', label: '🎵 TikTok Ads' },
            { id: 'youtube', label: '📺 YouTube Ads' },
          ].map(p => (
            <div key={p.id} onClick={() => setPlatforms(prev => ({ ...prev, [p.id]: !prev[p.id] }))}
              style={{
                padding: '8px 14px', border: '1.5px solid var(--ink)', cursor: 'pointer',
                borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px',
                background: platforms[p.id] ? 'var(--highlight-soft)' : 'var(--paper)',
                fontSize: 12, fontWeight: 700,
              }}>
              {p.label} {platforms[p.id] && '✓'}
            </div>
          ))}
        </div>
      </Box>

      <Box style={{ padding: 22, background: 'var(--paper)', marginBottom: 16 }}>
        <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>Reference URLs <span style={{ fontWeight: 400, color: 'var(--ink-faint)' }}>optional — competitor pages, offers, landing pages</span></div>
        {refUrls.map((u, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <input value={u} onChange={(e) => updateUrl(i, e.target.value)} placeholder="https://..."
              style={{ flex: 1, padding: '8px 12px', border: '1.5px solid var(--ink)', borderRadius: 6, fontFamily: 'var(--hand)', fontSize: 12, background: 'var(--paper)' }} />
            <Btn variant="ghost" onClick={() => removeUrl(i)} style={{ padding: '6px 10px', fontSize: 10 }}>✕</Btn>
          </div>
        ))}
        <Btn variant="ghost" onClick={addUrl} style={{ fontSize: 11 }}>+ Add another URL</Btn>
      </Box>

      <Box style={{ padding: 22, background: 'var(--paper)', marginBottom: 24 }}>
        <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>Target audience <span style={{ fontWeight: 400, color: 'var(--ink-faint)' }}>optional</span></div>
        <input placeholder="e.g., homeowners 30–55 looking to save on premiums"
          style={{ width: '100%', padding: '10px 12px', border: '1.5px solid var(--ink)', borderRadius: 6, fontFamily: 'var(--hand)', fontSize: 12, background: 'var(--paper)' }} />
      </Box>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Btn variant="ghost" onClick={onBack}>← Back</Btn>
        <Btn onClick={() => onContinue({ category, industry, platforms, mode: 'affiliate' })}>Continue →</Btn>
      </div>
    </div>
  );
}

// ── Step 3: Scanning ──
function InsightsScanning({ onDone, mode }) {
  const [step, setStep] = React.useState(0);
  const stages = mode === 'ecom'
    ? ['Analyzing your store…', 'Detecting competitors in your space…', 'Scanning their active ad campaigns…', 'Building your intelligence feed…']
    : ['Reading your category & niche…', 'Finding top advertisers…', 'Scanning their active ad campaigns…', 'Building your intelligence feed…'];

  React.useEffect(() => {
    const timers = stages.map((_, i) => setTimeout(() => setStep(i + 1), (i + 1) * 1100));
    const done = setTimeout(onDone, stages.length * 1100 + 500);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, []);

  return (
    <div style={{ padding: '60px 24px', maxWidth: 580, margin: '0 auto', fontFamily: 'var(--hand)', textAlign: 'center' }}>
      <StepNavInsights steps={['Choose Mode', 'Details', 'Scanning', 'Ready']} active={2} />
      <div style={{ width: 44, height: 44, border: '2px solid var(--ink)', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 20px' }} />
      <h2 className="wf-h2" style={{ fontSize: 22 }}>Scanning the ad landscape…</h2>
      <p className="wf-body" style={{ fontSize: 13, color: 'var(--ink-faint)', marginTop: 6, marginBottom: 28 }}>This usually takes 15–30 seconds.</p>
      <div style={{ textAlign: 'left', maxWidth: 360, margin: '0 auto' }}>
        {stages.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', fontSize: 13 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', border: '1.5px solid var(--ink)', background: i < step ? 'var(--highlight)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{i < step ? '✓' : ''}</div>
            <span style={{ color: i < step ? 'var(--ink)' : i === step ? 'var(--ink)' : 'var(--ink-faint)', fontWeight: i === step ? 700 : 400 }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Step 4: Done — Feed Ready (E-com) ──
function InsightsDoneEcom({ onBack, onStart, onRestart, data }) {
  const brand = data.brand || data.url || 'Your brand';
  return (
    <div style={{ padding: '48px 24px', maxWidth: 700, margin: '0 auto', fontFamily: 'var(--hand)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span onClick={onBack} style={{ cursor: 'pointer', fontSize: 13, color: 'var(--ink-faint)' }}>← Back</span>
        <span onClick={onRestart} style={{ cursor: 'pointer', fontSize: 12, color: 'var(--ink-faint)', textDecoration: 'underline' }}>Start over</span>
      </div>
      <StepNavInsights steps={['Choose Mode', 'Details', 'Scanning', 'Ready']} active={3} />

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ width: 56, height: 56, border: '2px solid var(--ink)', borderRadius: '50%', background: 'var(--highlight)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: 28 }}>✓</div>
        <h1 className="wf-h1" style={{ fontSize: 26, marginTop: 14 }}>Your competitor feed is live!</h1>
        <p className="wf-body" style={{ fontSize: 13, color: 'var(--ink-faint)' }}>We detected competitors and started tracking their ads.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Your brand', value: brand },
          { label: 'Competitors found', value: '6' },
          { label: 'Active ads detected', value: '1,284' },
          { label: 'Platforms', value: '2 connected' },
        ].map((s, i) => (
          <Box key={i} style={{ padding: 14, textAlign: 'center', background: 'var(--paper)' }}>
            <div className="wf-micro" style={{ fontSize: 9, marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 16, fontWeight: 800 }}>{s.value}</div>
          </Box>
        ))}
      </div>

      <Box style={{ padding: 18, background: 'var(--paper)', marginBottom: 16 }}>
        <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>Auto-detected competitors</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['Competitor A', 'Competitor B', 'Competitor C', 'Competitor D', 'Competitor E', 'Competitor F'].map((c, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', border: '1.5px solid var(--ink)', borderRadius: 999, fontSize: 12 }}>
              <span style={{ fontSize: 6, color: '#22c55e' }}>●</span> {c}
            </span>
          ))}
        </div>
        <div className="wf-micro" style={{ marginTop: 10, fontSize: 10 }}>We detected these from your store. You can add or remove in settings.</div>
      </Box>

      <Box style={{ padding: 18, background: 'var(--paper)', marginBottom: 16 }}>
        <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>Auto-created boards</div>
        {['All competitor ads', 'Top performers this week', 'New launches'].map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 2 ? '1px solid var(--ink-ghost)' : 'none' }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>▤ {b}</div>
            <span style={{ fontSize: 10, color: 'var(--ink-faint)' }}>auto-updating</span>
          </div>
        ))}
      </Box>

      <div style={{ textAlign: 'center' }}>
        <Btn onClick={onStart} style={{ fontSize: 15, padding: '14px 28px' }}>⊞ Start exploring competitor ads →</Btn>
        <div className="wf-micro" style={{ marginTop: 10, fontSize: 11 }}>Your feed updates every 6 hours automatically</div>
      </div>
    </div>
  );
}

// ── Step 4: Done — Feed Ready (Affiliate) ──
function InsightsDoneAffiliate({ onBack, onStart, onRestart, data }) {
  const category = data.category || 'Your niche';
  const industry = data.industry || 'Insurance';
  return (
    <div style={{ padding: '48px 24px', maxWidth: 700, margin: '0 auto', fontFamily: 'var(--hand)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span onClick={onBack} style={{ cursor: 'pointer', fontSize: 13, color: 'var(--ink-faint)' }}>← Back</span>
        <span onClick={onRestart} style={{ cursor: 'pointer', fontSize: 12, color: 'var(--ink-faint)', textDecoration: 'underline' }}>Start over</span>
      </div>
      <StepNavInsights steps={['Choose Mode', 'Details', 'Scanning', 'Ready']} active={3} />

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ width: 56, height: 56, border: '2px solid var(--ink)', borderRadius: '50%', background: 'var(--highlight)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: 28 }}>✓</div>
        <h1 className="wf-h1" style={{ fontSize: 26, marginTop: 14 }}>Your intelligence feed is live!</h1>
        <p className="wf-body" style={{ fontSize: 13, color: 'var(--ink-faint)' }}>We found the top advertisers in {category || 'your niche'} and started tracking.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Category', value: category || 'Insurance' },
          { label: 'Industry', value: industry },
          { label: 'Advertisers found', value: '42' },
          { label: 'Active ads tracked', value: '2,847' },
        ].map((s, i) => (
          <Box key={i} style={{ padding: 14, textAlign: 'center', background: 'var(--paper)' }}>
            <div className="wf-micro" style={{ fontSize: 9, marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 16, fontWeight: 800 }}>{s.value}</div>
          </Box>
        ))}
      </div>

      <Box style={{ padding: 18, background: 'var(--paper)', marginBottom: 16 }}>
        <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>Top advertisers discovered</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['Progressive', 'GEICO', 'State Farm', 'Lemonade', 'AllState', 'Liberty Mutual'].map((c, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', border: '1.5px solid var(--ink)', borderRadius: 999, fontSize: 12 }}>
              <span style={{ fontSize: 6, color: '#22c55e' }}>●</span> {c}
            </span>
          ))}
        </div>
      </Box>

      <Box style={{ padding: 18, background: 'var(--paper)', marginBottom: 16 }}>
        <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>🔥 Trending ad angles in {category || 'your niche'}</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['Price comparison', 'Customer testimonials', 'Fear-based hooks', 'Limited time offers', 'UGC-style'].map((t, i) => (
            <Pill key={i} soft>{t}</Pill>
          ))}
        </div>
      </Box>

      <Box style={{ padding: 18, background: 'var(--paper)', marginBottom: 24 }}>
        <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>Auto-created boards</div>
        {['All ads in ' + (category || 'niche'), 'Top performers', 'New launches this week'].map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 2 ? '1px solid var(--ink-ghost)' : 'none' }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>▤ {b}</div>
            <span style={{ fontSize: 10, color: 'var(--ink-faint)' }}>auto-updating</span>
          </div>
        ))}
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
  const [data, setData] = React.useState({ mode: null });

  const goto = (s) => setStep(s);

  let body;
  if (step === 0) {
    body = <InsightsChooseMode
      onPick={(mode) => { setData(d => ({ ...d, mode })); goto(1); }}
      onSkip={() => { sessionStorage.setItem('ff_profile_skipped', 'insights'); sessionStorage.setItem('ff_new_user', '1'); onNav('dashboard'); }}
    />;
  } else if (step === 1) {
    body = data.mode === 'ecom'
      ? <InsightsInputEcom onBack={() => goto(0)} onContinue={(inputs) => { setData(d => ({ ...d, ...inputs })); goto(2); }} />
      : <InsightsInputAffiliate onBack={() => goto(0)} onContinue={(inputs) => { setData(d => ({ ...d, ...inputs })); goto(2); }} />;
  } else if (step === 2) {
    body = <InsightsScanning mode={data.mode} onDone={() => goto(3)} />;
  } else {
    const DoneComp = data.mode === 'ecom' ? InsightsDoneEcom : InsightsDoneAffiliate;
    body = <DoneComp
      data={data}
      onBack={() => goto(1)}
      onStart={() => { sessionStorage.setItem('ff_new_user', '1'); sessionStorage.setItem('ff_onboarded', '1'); onNav('dashboard'); }}
      onRestart={() => goto(0)}
    />;
  }

  return <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>{body}</div>;
}

// ── Celebration screens (kept from before) ──
function InsightsCelebrate({ onDone }) {
  const [phase, setPhase] = React.useState(0);
  React.useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 600), setTimeout(() => setPhase(2), 1800), setTimeout(() => setPhase(3), 3200), setTimeout(() => setPhase(4), 4800), setTimeout(() => setPhase(5), 6200)];
    return () => t.forEach(clearTimeout);
  }, []);
  const fadeIn = (at) => ({ opacity: phase >= at ? 1 : 0, transform: phase >= at ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease-out' });
  const isDashUpgrade = !!sessionStorage.getItem('ff_upgrade_from_dashboard');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--hand)', color: 'var(--paper)', padding: '40px 24px' }}>
      <div style={{ maxWidth: 700, width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ ...fadeIn(0), marginBottom: 32 }}>
          <div style={{ width: 72, height: 72, border: '3px solid var(--highlight)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', background: 'rgba(255,241,118,0.15)' }}>
            <span style={{ fontFamily: 'var(--hand-loose)', fontSize: 40 }}>✓</span>
          </div>
          <div style={{ fontSize: 14, color: 'var(--ink-ghost)', marginTop: 14, letterSpacing: 1 }}>PAYMENT CONFIRMED</div>
        </div>
        <div style={{ ...fadeIn(1), marginBottom: 40 }}>
          <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.1, marginBottom: 12 }}>
            Your <span style={{ color: 'var(--highlight)', position: 'relative' }}>competitive edge<span style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 4, background: 'var(--highlight)', borderRadius: 2, opacity: 0.6 }}></span></span><br/>is now active.
          </h1>
          <p style={{ fontSize: 16, color: 'var(--ink-ghost)', maxWidth: 480, margin: '0 auto' }}>You just unlocked the most comprehensive ad intelligence platform in the market.</p>
        </div>
        <div style={{ ...fadeIn(2), marginBottom: 36 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
            {[{ num: '50M+', label: 'Ads indexed', icon: '⊞' }, { num: '8', label: 'Platforms tracked', icon: '◎' }, { num: '24/7', label: 'Real-time monitoring', icon: '⚡' }, { num: '<6h', label: 'Feed refresh cycle', icon: '↻' }].map((s, i) => (
              <div key={i} style={{ ...fadeIn(i < 2 ? 2 : 3), padding: '20px 16px', border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: '8px 12px 9px 11px / 10px 8px 12px 9px', background: 'rgba(255,255,255,0.04)' }}>
                <div style={{ fontSize: 12, color: 'var(--ink-ghost)', marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontSize: 32, fontWeight: 800, fontFamily: 'var(--hand-loose)', color: 'var(--highlight)' }}>{s.num}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-ghost)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ ...fadeIn(5) }}>
          <button onClick={onDone} style={{ padding: '16px 36px', border: '2px solid var(--highlight)', background: 'var(--highlight)', color: 'var(--ink)', borderRadius: '8px 12px 9px 11px / 10px 8px 12px 9px', fontFamily: 'var(--hand)', fontSize: 18, fontWeight: 800, cursor: 'pointer' }}>
            {isDashUpgrade ? 'Go to your dashboard →' : 'Set up your tracking →'}
          </button>
          <div style={{ marginTop: 14, fontSize: 12, color: 'var(--ink-ghost)' }}>{isDashUpgrade ? 'Your intelligence feed is ready' : 'Takes under 2 minutes'}</div>
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
          <p className="wf-body" style={{ fontSize: 15, color: 'var(--ink-soft)', maxWidth: 420, margin: '0 auto' }}>Choose E-com brand or Affiliate — we'll find the right ads for you.</p>
        </div>
        <div style={{ ...fadeIn(2), marginBottom: 36 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left', maxWidth: 400, margin: '0 auto' }}>
            {[
              { icon: '①', label: 'Tell us your focus', desc: 'E-com brand or Affiliate niche — we adapt' },
              { icon: '②', label: 'We scan the ad landscape', desc: 'Across Meta, Google, TikTok, YouTube' },
              { icon: '③', label: 'Get insights and track winners', desc: 'Build boards, spot patterns, remix to creatives' },
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
            {[['7', 'Day trial'], ['5K', 'Ad lookups'], ['3', 'Boards']].map(([n, l], i) => (
              <div key={i} style={{ textAlign: 'center' }}><div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'var(--hand-loose)' }}>{n}</div><div style={{ fontSize: 11, color: 'var(--ink-faint)' }}>{l}</div></div>
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
