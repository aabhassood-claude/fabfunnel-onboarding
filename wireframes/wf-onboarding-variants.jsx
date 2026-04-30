// ─────────────────────────────────────────────────────────────
// Onboarding Variant B — Quick-start (2 steps: URL → Auto-setup)
// Minimal friction — paste a URL, everything is auto-detected
// ─────────────────────────────────────────────────────────────

function OnboardingFlowB({ onNav, funnel }) {
  const [step, setStep] = React.useState(0);
  const [url, setUrl] = React.useState('');
  const [mode, setMode] = React.useState('ecom');
  const [processing, setProcessing] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const isTrial = funnel === 'trial';

  const startAnalysis = () => {
    setStep(1);
    setProcessing(true);
    // Auto-advance through processing
    setTimeout(() => { setProcessing(false); setDone(true); }, 3500);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', fontFamily: 'var(--hand)' }}>

      {/* Trial banner */}
      {isTrial && (
        <div style={{ background: 'var(--highlight-soft)', borderBottom: '1.5px solid var(--ink)', padding: '10px 24px', textAlign: 'center', fontSize: 13 }}>
          <span className="wf-pill wf-pill-hl" style={{ fontSize: 10, marginRight: 10 }}>FREE TRIAL</span>
          7 days · 20 credits · no card on file
        </div>
      )}

      {/* Variant badge */}
      <div style={{ textAlign: 'center', padding: '24px 24px 0' }}>
        <span style={{ display: 'inline-block', padding: '4px 14px', border: '1.5px dashed var(--accent)', borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing: 1, color: 'var(--accent)' }}>VARIANT B · QUICK START</span>
      </div>

      {step === 0 && (
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '40px 24px', textAlign: 'center' }}>
          <h1 className="wf-h1" style={{ fontSize: 34, marginBottom: 10 }}>
            Paste your URL.<br/>We'll do the <span className="wf-hl">rest</span>.
          </h1>
          <p className="wf-body" style={{ fontSize: 15, color: 'var(--ink-soft)', maxWidth: 420, margin: '0 auto 32px' }}>
            One input. We auto-detect your brand, competitors, products, colors, and industry — then set up your workspace instantly.
          </p>

          {/* Mode toggle */}
          <div style={{ display: 'inline-flex', gap: 4, padding: 4, border: '1.5px solid var(--ink)', borderRadius: 999, marginBottom: 24 }}>
            {[{ id: 'ecom', label: '🛒 E-com Brand', sub: 'Store URL' }, { id: 'affiliate', label: '⚡ Affiliate', sub: 'Offer URL' }].map(m => (
              <button key={m.id} onClick={() => setMode(m.id)} style={{
                padding: '8px 20px', borderRadius: 999, border: 'none',
                background: mode === m.id ? 'var(--ink)' : 'transparent',
                color: mode === m.id ? 'var(--paper)' : 'var(--ink-soft)',
                fontFamily: 'var(--hand)', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              }}>{m.label}</button>
            ))}
          </div>

          {/* URL input — the only required field */}
          <Box style={{ padding: 28, textAlign: 'left', maxWidth: 480, margin: '0 auto 20px' }}>
            <div className="wf-eyebrow" style={{ fontSize: 10, marginBottom: 8 }}>{mode === 'ecom' ? '🌐 Your store URL' : '🔗 Your affiliate / offer URL'}</div>
            <input
              value={url} onChange={(e) => setUrl(e.target.value)}
              placeholder={mode === 'ecom' ? 'https://yourstore.com' : 'https://offer-link.com/your-niche'}
              className="wf-field"
              style={{ width: '100%', boxSizing: 'border-box', padding: '14px 16px', fontSize: 16, fontFamily: 'var(--hand)', textAlign: 'center' }}
            />
            <div className="wf-micro" style={{ marginTop: 8, fontSize: 10, textAlign: 'center' }}>
              {mode === 'ecom' ? 'Works with Shopify, WooCommerce, Amazon, and most platforms.' : 'Paste your affiliate link, landing page, or offer URL.'}
            </div>
          </Box>

          {/* What we'll auto-detect */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
            {['Brand & logo', 'Competitors', 'Products', 'Colors & style', 'Industry', 'Country'].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--ink-faint)' }}>
                <span style={{ color: 'var(--ink)' }}>✓</span> {f}
              </div>
            ))}
          </div>

          <Btn onClick={() => url.length > 5 && startAnalysis()} style={{ fontSize: 16, padding: '14px 36px', opacity: url.length > 5 ? 1 : 0.4, cursor: url.length > 5 ? 'pointer' : 'not-allowed' }}>
            Analyze & set up →
          </Btn>

          <div style={{ marginTop: 16 }}>
            <span onClick={() => { sessionStorage.setItem('ff_profile_skipped', 'genie'); sessionStorage.setItem('ff_new_user', '1'); onNav('dashboard'); }}
              style={{ fontSize: 12, color: 'var(--ink-faint)', cursor: 'pointer', textDecoration: 'underline wavy var(--ink-ghost)', textUnderlineOffset: 3 }}>
              Skip for now — explore the dashboard →
            </span>
          </div>
        </div>
      )}

      {step === 1 && processing && (
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
          <div style={{ width: 50, height: 50, border: '2px solid var(--ink)', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 24px' }} />
          <h2 className="wf-h2" style={{ fontSize: 22, marginBottom: 8 }}>Analyzing everything…</h2>
          <p className="wf-body" style={{ fontSize: 13, color: 'var(--ink-faint)', marginBottom: 24 }}>{url || 'your URL'}</p>
          <div style={{ textAlign: 'left', maxWidth: 340, margin: '0 auto' }}>
            {['Detecting brand & logo', 'Finding competitors', 'Pulling products & catalog', 'Analyzing colors & style', 'Detecting country & industry', 'Setting up workspace'].map((s, i) => {
              const [tick, setTick] = React.useState(false);
              React.useEffect(() => { const t = setTimeout(() => setTick(true), (i + 1) * 500); return () => clearTimeout(t); }, []);
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: 13 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', border: '1.5px solid var(--ink)', background: tick ? 'var(--highlight)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{tick ? '✓' : ''}</div>
                  <span style={{ fontWeight: tick ? 400 : 700, color: tick ? 'var(--ink)' : 'var(--ink-faint)' }}>{s}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {step === 1 && done && (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '48px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ width: 56, height: 56, border: '2px solid var(--ink)', borderRadius: '50%', background: 'var(--highlight)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: 28 }}>✓</div>
            <h1 className="wf-h1" style={{ fontSize: 26, marginTop: 14 }}>You're all set!</h1>
            <p className="wf-body" style={{ fontSize: 13, color: 'var(--ink-faint)' }}>Everything was auto-detected from your URL.</p>
          </div>

          {/* Auto-detected summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 20 }}>
            {[['Brand', url ? url.replace(/https?:\/\//, '').split(/[./]/)[0] : 'Your brand'], ['Industry', 'Auto-detected'], ['Country', '🇺🇸 United States'], ['Competitors', '6 found'], ['Products', '24 detected'], ['Style', 'Modern · Clean']].map(([l, v], i) => (
              <Box key={i} style={{ padding: 12, textAlign: 'center' }}><div className="wf-micro" style={{ fontSize: 9, marginBottom: 3 }}>{l}</div><div style={{ fontSize: 14, fontWeight: 700 }}>{v}</div></Box>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Btn onClick={() => { sessionStorage.setItem('ff_new_user', '1'); sessionStorage.setItem('ff_onboarded', '1'); sessionStorage.removeItem('ff_profile_skipped'); onNav('dashboard'); }}
              style={{ fontSize: 16, padding: '14px 32px' }}>✦ Start creating →</Btn>
            <div className="wf-micro" style={{ marginTop: 10, fontSize: 11 }}>You can edit all details later in Settings</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Onboarding Variant C — Conversational (chat-style, one Q at a time)
// Feels like talking to a friend — minimal UI, progressive reveal
// ─────────────────────────────────────────────────────────────

function OnboardingFlowC({ onNav, funnel }) {
  const [messages, setMessages] = React.useState([
    { from: 'bot', text: 'Hey! 👋 Welcome to fabfunnel.ai. Let me help you set up.', delay: 0 },
    { from: 'bot', text: 'First — are you an E-commerce brand or an Affiliate marketer?', delay: 800, options: ['🛒 E-commerce brand', '⚡ Affiliate marketer'] },
  ]);
  const [step, setStep] = React.useState('mode');
  const [typing, setTyping] = React.useState(false);
  const [inputVal, setInputVal] = React.useState('');
  const [showInput, setShowInput] = React.useState(false);
  const [data, setData] = React.useState({});
  const isTrial = funnel === 'trial';

  const addMsg = (from, text, opts, delay) => {
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { from, text, options: opts }]);
      setTyping(false);
    }, delay || 600);
  };

  const userReply = (text) => {
    setMessages(prev => [...prev, { from: 'user', text }]);
    return text;
  };

  const handleOption = (opt) => {
    userReply(opt);

    if (step === 'mode') {
      const isEcom = opt.includes('E-commerce');
      setData(d => ({ ...d, mode: isEcom ? 'ecom' : 'affiliate' }));
      setStep('url');
      addMsg('bot', isEcom
        ? 'Great! Drop your store URL and I\'ll pull everything automatically — products, brand colors, competitors.'
        : 'Nice! Paste your offer link or tell me your niche — I\'ll find the top ads in your space.', null, 800);
      setTimeout(() => setShowInput(true), 1400);
    } else if (step === 'country') {
      setData(d => ({ ...d, country: opt }));
      setStep('processing');
      addMsg('bot', 'Perfect! Let me set everything up for you…', null, 600);
      setTimeout(() => {
        addMsg('bot', '✓ Brand detected\n✓ 6 competitors found\n✓ 24 products indexed\n✓ Style analyzed', null, 1200);
        setTimeout(() => {
          addMsg('bot', '🎉 All done! Your workspace is ready. Let\'s start creating!', ['✦ Start creating →', '⚙ Edit settings first'], 1800);
          setStep('done');
        }, 2000);
      }, 800);
    } else if (step === 'done') {
      sessionStorage.setItem('ff_new_user', '1');
      sessionStorage.setItem('ff_onboarded', '1');
      sessionStorage.removeItem('ff_profile_skipped');
      onNav('dashboard');
    }
  };

  const handleSubmit = () => {
    if (!inputVal.trim()) return;
    const val = inputVal;
    setInputVal('');
    setShowInput(false);
    userReply(val);
    setData(d => ({ ...d, url: val }));
    setStep('country');
    addMsg('bot', 'Got it! Which country are you based in?', ['🇺🇸 United States', '🇬🇧 United Kingdom', '🇮🇳 India', '🇦🇪 UAE', '🇨🇦 Canada', '🇦🇺 Australia', '🌍 Other'], 800);
  };

  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', display: 'flex', flexDirection: 'column', fontFamily: 'var(--hand)' }}>

      {/* Trial banner */}
      {isTrial && (
        <div style={{ background: 'var(--highlight-soft)', borderBottom: '1.5px solid var(--ink)', padding: '10px 24px', textAlign: 'center', fontSize: 13 }}>
          <span className="wf-pill wf-pill-hl" style={{ fontSize: 10, marginRight: 10 }}>FREE TRIAL</span>
          7 days · 20 credits · no card on file
        </div>
      )}

      {/* Header */}
      <div style={{ padding: '16px 24px', borderBottom: '1.5px dashed var(--ink-faint)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', border: '1.5px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>✦</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>fabfunnel assistant</div>
            <div className="wf-micro" style={{ fontSize: 10, color: 'var(--ink-faint)' }}>Setting up your workspace</div>
          </div>
        </div>
        <span style={{ display: 'inline-block', padding: '4px 14px', border: '1.5px dashed var(--accent)', borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing: 1, color: 'var(--accent)' }}>VARIANT C · CHAT</span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, overflow: 'auto', padding: '24px', maxWidth: 600, width: '100%', margin: '0 auto' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', alignItems: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              padding: '12px 16px',
              maxWidth: '80%',
              borderRadius: m.from === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
              background: m.from === 'user' ? 'var(--ink)' : 'var(--paper-soft)',
              color: m.from === 'user' ? 'var(--paper)' : 'var(--ink)',
              border: m.from === 'user' ? 'none' : '1.5px solid var(--ink-faint)',
              fontSize: 14, lineHeight: 1.5, whiteSpace: 'pre-line',
            }}>{m.text}</div>

            {/* Option buttons */}
            {m.options && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
                {m.options.map((opt, j) => (
                  <button key={j} onClick={() => handleOption(opt)} style={{
                    padding: '8px 16px',
                    border: '1.5px solid var(--ink)',
                    borderRadius: 999,
                    background: 'var(--paper)',
                    fontFamily: 'var(--hand)', fontSize: 13, fontWeight: 700,
                    cursor: 'pointer', color: 'var(--ink)',
                  }}>{opt}</button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 16 }}>
            <div style={{ padding: '12px 16px', borderRadius: '14px 14px 14px 4px', background: 'var(--paper-soft)', border: '1.5px solid var(--ink-faint)', fontSize: 18, letterSpacing: 4 }}>···</div>
          </div>
        )}
      </div>

      {/* Input bar (only shown when waiting for text input) */}
      {showInput && (
        <div style={{ padding: '16px 24px', borderTop: '1.5px solid var(--ink-faint)', background: 'var(--paper)' }}>
          <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', gap: 10 }}>
            <input value={inputVal} onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder={data.mode === 'affiliate' ? 'Paste your offer link or type your niche…' : 'Paste your store URL…'}
              className="wf-field"
              style={{ flex: 1, padding: '12px 16px', fontSize: 14, fontFamily: 'var(--hand)' }}
              autoFocus
            />
            <Btn onClick={handleSubmit}>Send →</Btn>
          </div>
        </div>
      )}

      {/* Skip link */}
      {step !== 'done' && (
        <div style={{ textAlign: 'center', padding: '10px 24px 20px' }}>
          <span onClick={() => { sessionStorage.setItem('ff_profile_skipped', 'genie'); sessionStorage.setItem('ff_new_user', '1'); onNav('dashboard'); }}
            style={{ fontSize: 12, color: 'var(--ink-faint)', cursor: 'pointer', textDecoration: 'underline wavy var(--ink-ghost)', textUnderlineOffset: 3 }}>
            Skip for now →
          </span>
        </div>
      )}
    </div>
  );
}

window.OnboardingFlowB = OnboardingFlowB;
window.OnboardingFlowC = OnboardingFlowC;
