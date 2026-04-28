// ─────────────────────────────────────────────────────────────
// E-commerce onboarding flow — sketchy wireframe vibe
// Choose Mode → Input → Processing → Done
// ─────────────────────────────────────────────────────────────

const ONB_STEPS = ['Choose Mode', 'Input', 'Processing', 'Done'];

function StepNav({ active, onBack, backLabel, onRestart }) {
  return (
    <div style={{ width: '100%', maxWidth: 880, margin: '0 auto', padding: '32px 24px 0' }}>
      {onBack && (
        <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span onClick={onBack} className="wf-body" style={{ fontSize: 13, cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'wavy', textUnderlineOffset: 4 }}>← {backLabel || 'Back'}</span>
          {active === 3 && onRestart && (
            <span onClick={onRestart} className="wf-body" style={{ fontSize: 13, cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'wavy', textUnderlineOffset: 4 }}>Start onboarding over</span>
          )}
        </div>
      )}
      <div className="wf-step-dots" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
        {ONB_STEPS.map((label, i) => {
          const isActive = i === active;
          const isDone = i < active;
          return (
            <React.Fragment key={label}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className={`wf-step-dot ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}>
                  {isDone ? '✓' : i + 1}
                </div>
                <span className="wf-body" style={{ fontSize: 13, fontWeight: isActive ? 700 : 400, color: isActive ? 'var(--ink)' : 'var(--ink-faint)' }}>{label}</span>
              </div>
              {i < ONB_STEPS.length - 1 && <div className="wf-step-bar" />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

// ── Step 1: Choose Mode ──
function OnbChooseMode({ onPick, onSkip, onLogin }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <StepNav active={0} />
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '40px 24px 80px' }}>
        <Pill soft style={{ marginBottom: 12 }}>STEP 1 · QUICK START</Pill>
        <h1 className="wf-h1" style={{ fontSize: 38 }}>Quick <span className="wf-hl">Start</span></h1>
        <p className="wf-body" style={{ fontSize: 15, marginTop: 8 }}>Get up and running in under a minute.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 32 }}>
          {[
            { id: 'ecom',     icon: '🛒', title: 'E-commerce',         blurb: "Paste your store URL, we'll do the rest." },
            { id: 'affiliate',icon: '⚡', title: 'Affiliate / Ad Lab',  blurb: 'Pick a niche and start generating.' },
          ].map(opt => (
            <Box
              key={opt.id}
              onClick={() => onPick(opt.id)}
              style={{ padding: 24, cursor: 'pointer' }}
            >
              <div className="wf-icon" style={{ fontSize: 16 }}>{opt.icon}</div>
              <h3 className="wf-h3" style={{ fontSize: 18, marginTop: 14 }}>{opt.title}</h3>
              <p className="wf-body" style={{ fontSize: 13, marginTop: 6 }}>{opt.blurb}</p>
              <div className="wf-body" style={{ fontSize: 13, color: 'var(--ink)', marginTop: 14, fontWeight: 700, textDecoration: 'underline', textDecorationStyle: 'wavy', textUnderlineOffset: 4 }}>Start →</div>
            </Box>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Btn variant="link" onClick={onSkip}>Skip for now — explore the dashboard →</Btn>
          <p className="wf-micro" style={{ marginTop: 6 }}>You can set up your brand right from the dashboard.</p>
          <p className="wf-micro" style={{ marginTop: 18 }}>
            Already have an account? <span onClick={onLogin} className="wf-squig" style={{ cursor: 'pointer' }}>Sign in</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Step 2: Input ──
function OnbInput({ onBack, onContinue, kind }) {
  const [storeUrl, setStoreUrl] = React.useState('');
  const [brand, setBrand] = React.useState('');
  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <StepNav active={1} onBack={onBack} backLabel="Back to Quick Start" />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px 80px' }}>
        <Pill soft style={{ marginBottom: 12 }}>STEP 2 · INPUT</Pill>
        <h1 className="wf-h1" style={{ fontSize: 32 }}>Tell us about your store</h1>
        <p className="wf-body" style={{ fontSize: 15, marginTop: 10 }}>We'll auto-pull your products, colors, and branding.</p>

        <Box style={{ padding: 28, marginTop: 28 }}>
          <label className="wf-body" style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>
            Store URL <span style={{ color: 'var(--accent)' }}>*</span>
          </label>
          <input
            value={storeUrl}
            onChange={(e) => setStoreUrl(e.target.value)}
            placeholder="https://yourstore.com"
            className="wf-field"
            style={{ display: 'block', width: '100%', marginTop: 8, fontFamily: 'var(--hand)', fontSize: 14, padding: '10px 14px', boxSizing: 'border-box', outline: 'none' }}
          />
          <p className="wf-micro" style={{ marginTop: 8 }}>
            Works with Shopify, WooCommerce, Amazon, and most platforms.
          </p>

          <label className="wf-body" style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', display: 'block', marginTop: 24 }}>
            Brand name <span className="wf-micro" style={{ fontWeight: 400 }}>(optional — we'll detect from your store)</span>
          </label>
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="e.g., Aurora Apparel"
            className="wf-field"
            style={{ display: 'block', width: '100%', marginTop: 8, fontFamily: 'var(--hand)', fontSize: 14, padding: '10px 14px', boxSizing: 'border-box', outline: 'none' }}
          />
        </Box>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
          <Btn variant="outline" onClick={onBack}>← Back</Btn>
          <Btn onClick={() => onContinue({ storeUrl: storeUrl || 'yourstore.com', brand: brand || 'test' })}>
            Continue →
          </Btn>
        </div>
      </div>
    </div>
  );
}

// ── Step 3: Processing ──
function OnbProcessing({ onBack, onDone }) {
  const stages = [
    'Fetching your inputs',
    'Analyzing brand & style',
    'Preparing templates',
    'Finalizing your brand profile',
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
        <h1 className="wf-h1" style={{ fontSize: 30, marginTop: 24 }}>Setting up your <span className="wf-hl">workspace…</span></h1>
        <p className="wf-body" style={{ fontSize: 14, marginTop: 8 }}>This usually takes 10–20 seconds.</p>

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
                    flexShrink: 0,
                    fontFamily: 'var(--hand)',
                    fontSize: 11,
                    color: done ? 'var(--paper)' : 'var(--ink)',
                  }}>
                    {done ? '✓' : (active ? <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ink)', animation: 'spin 0.8s linear infinite' }} /> : '')}
                  </div>
                  <span className="wf-body" style={{
                    fontSize: 15,
                    color: done || active ? 'var(--ink)' : 'var(--ink-faint)',
                    fontWeight: active ? 700 : 400,
                  }}>{label}</span>
                </div>
              );
            })}
          </div>
        </Box>
      </div>
    </div>
  );
}

// ── Step 4: Done — Brand Ready ──
function OnbDone({ onBack, onStart, onRestart, brandName }) {
  const products = [
    { name: 'Classic Tee',       price: '$32',  status: 'In stock' },
    { name: 'Linen Jacket',      price: '$118', status: 'In stock' },
    { name: 'Slim Trousers',     price: '$74',  status: 'In stock' },
    { name: 'Everyday Sneaker',  price: '$95',  status: 'Low stock' },
    { name: 'Canvas Cap',        price: '$28',  status: 'In stock' },
    { name: 'Tote Bag',          price: '$56',  status: 'In stock' },
  ];

  const competitors = [
    { i: 'A', name: 'Aritzia',  desc: 'Apparel · Tracking: Ad creatives, Visual style' },
    { i: 'E', name: 'Everlane', desc: 'Apparel · Tracking: Messaging, Social posts' },
    { i: 'U', name: 'Uniqlo',   desc: 'Apparel · Tracking: Promotions, Pricing' },
    { i: 'C', name: 'COS',      desc: 'Apparel · Tracking: Visual style, Product launches' },
  ];

  const Field = ({ label, children }) => (
    <div>
      <div className="wf-eyebrow">{label}</div>
      <div className="wf-body" style={{ fontSize: 15, color: 'var(--ink)', marginTop: 4, fontWeight: 700 }}>{children}</div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <div style={{ height: 14, background: 'var(--highlight)', borderBottom: '1.5px dashed var(--ink-faint)' }} />

      <StepNav active={3} onBack={onBack} backLabel="Back to Input" onRestart={onRestart} />

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <div className="wf-icon" style={{ width: 52, height: 52, margin: '0 auto', borderRadius: '50%' }}>
            <span style={{ fontSize: 22 }}>✓</span>
          </div>
          <h1 className="wf-h1" style={{ fontSize: 32, marginTop: 14 }}>Brand <span className="wf-hl">Ready!</span></h1>
          <p className="wf-body" style={{ fontSize: 14, marginTop: 6 }}>Your brand has been analyzed and is ready for generation.</p>
        </div>

        {/* brand summary card */}
        <Box style={{ padding: 28, marginTop: 28 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <Field label="Brand">{brandName || 'test'}</Field>
            <Field label="Products found">24 products</Field>
            <Field label="Platform">Shopify</Field>
            <Field label="Language">English (US)</Field>
          </div>
          <div className="wf-divider-dashed" style={{ margin: '22px 0' }} />

          <div className="wf-eyebrow">Detected style</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {['#d8d4cf', '#a8a097', '#5b5247', '#111'].map(c => (
                <div key={c} style={{ width: 22, height: 22, borderRadius: '50%', background: c, border: '1.5px solid var(--ink)' }} />
              ))}
            </div>
            <span className="wf-body" style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>Modern · Clean</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 22 }}>
            <Field label="Tone of voice">Friendly · Confident</Field>
            <Field label="Target audience">25–40, Urban</Field>
            <Field label="Price range">$25 – $120</Field>
            <Field label="Logo">Extracted ✓</Field>
          </div>

          <div style={{ marginTop: 22 }}>
            <div className="wf-eyebrow">Top categories</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              {['Apparel', 'Accessories', 'Footwear'].map(t => <Pill key={t} soft>{t}</Pill>)}
            </div>
          </div>

          <div style={{ marginTop: 22 }}>
            <div className="wf-eyebrow">Brand keywords</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              {['sustainable', 'minimal', 'everyday', 'premium'].map(t => <Pill key={t} soft>{t}</Pill>)}
            </div>
          </div>
        </Box>

        {/* Sample products */}
        <Box style={{ padding: 24, marginTop: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="wf-eyebrow">Sample products fetched · 6 of 24</div>
            <Btn variant="link" style={{ fontSize: 12 }}>View all →</Btn>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 14 }}>
            {products.map((p, i) => (
              <Box key={i} soft style={{ overflow: 'hidden', padding: 0 }}>
                <div style={{ height: 72 }}>
                  <ImgPlaceholder label="img" style={{ height: '100%', borderRadius: 0, border: 'none', borderBottom: '1.5px dashed var(--ink-faint)' }} />
                </div>
                <div style={{ padding: '8px 10px' }}>
                  <div className="wf-body" style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)' }}>{p.name}</div>
                  <div className="wf-micro" style={{ marginTop: 2 }}>{p.price} · {p.status}</div>
                </div>
              </Box>
            ))}
          </div>
          <div className="wf-micro" style={{ marginTop: 12 }}>
            ↗ Fetched from: <span className="wf-squig">yourstore.com/products</span>
          </div>
        </Box>

        {/* Competitors */}
        <Box style={{ padding: 24, marginTop: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="wf-eyebrow">Competitors</div>
            <Btn variant="ghost" style={{ fontSize: 12, padding: '6px 12px' }}>+ Add competitor</Btn>
          </div>
          <p className="wf-body" style={{ fontSize: 13, marginTop: 8 }}>Similar brands we found — use them for reference or comparison ads.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
            {competitors.map(c => (
              <Box key={c.name} soft style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="wf-icon" style={{ width: 30, height: 30, fontSize: 13, fontFamily: 'var(--hand)', fontWeight: 700 }}>{c.i}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="wf-body" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{c.name}</div>
                  <div className="wf-micro" style={{ marginTop: 2 }}>{c.desc}</div>
                </div>
                <Pill soft style={{ fontSize: 9 }}>2 tracked</Pill>
                <span className="wf-body" style={{ color: 'var(--ink-faint)', cursor: 'pointer', fontSize: 16 }}>×</span>
              </Box>
            ))}
          </div>
        </Box>

        {/* CTA */}
        <Btn
          onClick={onStart}
          style={{ width: '100%', marginTop: 24, padding: '16px', fontSize: 16, fontWeight: 700, gap: 8 }}
        >
          ✦ Start Creating
        </Btn>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginTop: 14 }}>
          <span onClick={onRestart} className="wf-body" style={{ fontSize: 13, cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'wavy', textUnderlineOffset: 4 }}>Re-analyze brand</span>
          <span style={{ color: 'var(--ink-ghost)' }}>·</span>
          <span onClick={onBack} className="wf-body" style={{ fontSize: 13, cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'wavy', textUnderlineOffset: 4 }}>Edit inputs</span>
        </div>
      </div>
    </div>
  );
}

// ── Wrapper that drives the flow ──
function OnboardingFlow({ onNav, openBuyNow, funnel }) {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({ kind: 'ecom', storeUrl: '', brand: '' });
  const isTrial = funnel === 'trial';

  const goto = (s) => { setStep(s); window.scrollTo(0, 0); };
  const isAff = data.kind === 'affiliate';

  // Trial banner — shows above the onboarding flow so users always know
  // they're in trial mode (50 free credits, watermark, etc.)
  const trialBanner = isTrial ? (
    <div style={{
      background: 'var(--highlight-soft)',
      borderBottom: '1.5px solid var(--ink)',
      padding: '10px 24px',
      textAlign: 'center',
      fontFamily: 'var(--hand)', fontSize: 13,
    }}>
      <span className="wf-pill wf-pill-hl" style={{ fontSize: 10, marginRight: 10 }}>FREE TRIAL</span>
      Setting up your trial workspace · 7 days · 50 credits · no card on file
    </div>
  ) : null;

  let body;
  if (step === 0) body = <OnbChooseMode
    onPick={(kind) => { setData(d => ({ ...d, kind })); goto(1); }}
    onSkip={() => onNav('dashboard')}
    onLogin={() => onNav('login')}
  />;
  else if (step === 1) body = isAff
    ? <window.OnbInputAffiliate
        onBack={() => goto(0)}
        onContinue={(input) => { setData(d => ({ ...d, ...input })); goto(2); }}
      />
    : <OnbInput
        onBack={() => goto(0)}
        onContinue={(input) => { setData(d => ({ ...d, ...input })); goto(2); }}
        kind={data.kind}
      />;
  else if (step === 2) body = isAff
    ? <window.OnbProcessingAffiliate onBack={() => goto(1)} onDone={() => goto(3)} />
    : <OnbProcessing onBack={() => goto(1)} onDone={() => goto(3)} />;
  else body = isAff
    ? <window.OnbDoneAffiliate
        onBack={() => goto(1)}
        onStart={() => onNav('dashboard')}
        onRestart={() => goto(0)}
        category={data.category}
      />
    : <OnbDone
        onBack={() => goto(1)}
        onStart={() => onNav('dashboard')}
        onRestart={() => goto(0)}
        brandName={data.brand}
      />;

  return <React.Fragment>{trialBanner}{body}</React.Fragment>;
}

Object.assign(window, { OnboardingFlow, StepNav, OnbChooseMode, OnbInput, OnbProcessing, OnbDone });
