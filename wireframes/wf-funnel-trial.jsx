// ─────────────────────────────────────────────────────────────
// Funnel B — Free Trial signup + the Funnel A/B floating toggle
// + Compare Funnels diagram page
// All sketchy wireframe vibe.
// ─────────────────────────────────────────────────────────────

// ── 1. FloatingFunnelToggle ──────────────────────────────────
// Pinned top-right on every page so management can switch demo paths.
function FloatingFunnelToggle({ funnel, setFunnel, onCompare }) {
  return (
    <div style={{
      position: 'fixed',
      top: 80,
      right: 20,
      zIndex: 950,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      pointerEvents: 'none',
    }}>
      <div style={{ pointerEvents: 'auto' }}>
        <Box style={{ padding: 8, background: 'var(--paper)', boxShadow: '4px 4px 0 var(--ink)' }}>
          <div className="wf-eyebrow" style={{ fontSize: 9, padding: '2px 6px 6px' }}>Demo · funnel</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <button onClick={() => setFunnel('direct')} style={{
              padding: '6px 12px',
              borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px',
              border: funnel === 'direct' ? '1.5px solid var(--ink)' : '1.5px solid transparent',
              background: funnel === 'direct' ? 'var(--ink)' : 'transparent',
              color: funnel === 'direct' ? 'var(--paper)' : 'var(--ink)',
              fontFamily: 'var(--hand)',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{ fontSize: 11 }}>A</span>
              <span>Direct Buy</span>
            </button>
            <button onClick={() => setFunnel('trial')} style={{
              padding: '6px 12px',
              borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px',
              border: funnel === 'trial' ? '1.5px solid var(--ink)' : '1.5px solid transparent',
              background: funnel === 'trial' ? 'var(--ink)' : 'transparent',
              color: funnel === 'trial' ? 'var(--paper)' : 'var(--ink)',
              fontFamily: 'var(--hand)',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{ fontSize: 11 }}>B</span>
              <span>Free Trial</span>
            </button>
          </div>
          <div style={{ borderTop: '1.5px dashed var(--ink-faint)', margin: '8px 0 6px' }} />
          <button onClick={onCompare} style={{
            padding: '4px 8px',
            border: 'none',
            background: 'transparent',
            color: 'var(--ink-soft)',
            fontFamily: 'var(--hand)',
            fontSize: 11,
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left',
          }}>
            ⊞ Compare side-by-side →
          </button>
        </Box>
      </div>
    </div>
  );
}

// ── 2. TrialSignup ──────────────────────────────────────────
// Lands here when user clicks "Start Free Trial" on the home page (Funnel B).
function TrialSignup({ onComplete, onLogin, onBackToHome }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const canSubmit = email.includes('@') && password.length >= 6;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--paper-soft)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '60px 20px',
    }}>
      <div style={{ width: '100%', maxWidth: 480 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div onClick={onBackToHome} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--hand)', fontSize: 13, color: 'var(--ink-soft)', marginBottom: 14 }}>
            ← back to home
          </div>
          <div style={{ fontFamily: 'var(--hand)', fontSize: 22, fontWeight: 700, marginBottom: 6 }}>
            fabfunnel<span style={{ color: 'var(--ink-faint)' }}>.ai</span>
          </div>
          <div className="wf-h1" style={{ fontSize: 24, marginBottom: 8 }}>Start your free trial</div>
          <div className="wf-body" style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
            7 days · 20 free credits · no card required
          </div>
        </div>

        {/* Card */}
        <Box style={{ padding: 28 }}>

          {/* Trial perks list */}
          <div style={{ marginBottom: 22 }}>
            {[
              ['✦', '20 free credits', 'enough to test ~5 ad generations'],
              ['🎬', 'All Genie modes', 'Creative · Video · Script'],
              ['🛡', 'Watermark on previews', 'remove when you upgrade'],
              ['⏱', 'Single brand', 'add more after upgrading'],
            ].map(([icon, label, sub], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: i < 3 ? 10 : 0 }}>
                <span style={{ fontSize: 14, width: 18, textAlign: 'center', marginTop: 1 }}>{icon}</span>
                <div style={{ flex: 1 }}>
                  <div className="wf-body" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{label}</div>
                  <div className="wf-micro" style={{ fontSize: 11, marginTop: 1 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Google — one-click signup */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <button onClick={() => onComplete && onComplete()} style={{
              flex: 1,
              padding: '11px 14px',
              border: '1.5px solid var(--ink)',
              borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px',
              background: 'var(--paper)',
              fontFamily: 'var(--hand)',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              color: 'var(--ink)',
            }}>
              <GoogleGlyph /> Continue with Google
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '14px 0' }}>
            <div style={{ flex: 1, borderTop: '1.5px dashed var(--ink-faint)' }} />
            <span className="wf-micro" style={{ fontSize: 11 }}>or with email</span>
            <div style={{ flex: 1, borderTop: '1.5px dashed var(--ink-faint)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <div className="wf-eyebrow" style={{ marginBottom: 6 }}>Work email</div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="wf-field"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '10px 14px', fontSize: 14,
                  fontFamily: 'var(--hand)', color: 'var(--ink)', outline: 'none',
                }}
              />
            </div>
            <div>
              <div className="wf-eyebrow" style={{ marginBottom: 6 }}>Password</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="at least 6 characters"
                className="wf-field"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '10px 14px', fontSize: 14,
                  fontFamily: 'var(--hand)', color: 'var(--ink)', outline: 'none',
                }}
              />
            </div>
          </div>

          <Btn
            onClick={() => canSubmit && onComplete()}
            style={{
              width: '100%',
              marginTop: 20,
              opacity: canSubmit ? 1 : 0.45,
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              justifyContent: 'center',
            }}
          >Start free trial →</Btn>

          <div className="wf-micro" style={{ fontSize: 11, textAlign: 'center', marginTop: 14, lineHeight: 1.5 }}>
            By continuing you agree to our Terms & Privacy.<br/>
            No credit card. Cancel anytime.
          </div>
        </Box>

        <div style={{ textAlign: 'center', marginTop: 16, fontFamily: 'var(--hand)', fontSize: 13 }}>
          Already have an account?{' '}
          <span onClick={onLogin} style={{ textDecoration: 'underline wavy var(--accent)', textUnderlineOffset: 4, cursor: 'pointer', fontWeight: 700 }}>
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
      <path d="M9 7.5v3h4.2c-.18 1.08-1.32 3.18-4.2 3.18A4.65 4.65 0 1 1 9 4.32a4.05 4.05 0 0 1 2.85 1.11l1.92-1.86A6.93 6.93 0 0 0 9 1.5a7.5 7.5 0 1 0 0 15c4.32 0 7.2-3.06 7.2-7.32 0-.51-.06-.9-.12-1.26z"
        stroke="var(--ink)" strokeWidth="0.6" fill="var(--ink)" />
    </svg>
  );
}

// ── 3. CompareFunnels ───────────────────────────────────────
// /#compare — diagram page for management.
function CompareFunnels({ onNav, setFunnel }) {
  const stepA = [
    { i: 1, t: 'Landing page',     s: 'Hero · pricing · social proof' },
    { i: 2, t: 'Buy Now modal',    s: 'Plan + payment in 2–3 steps',  hot: true },
    { i: 3, t: 'Onboarding',       s: '4 steps · brand setup' },
    { i: 4, t: 'Dashboard',        s: 'Full credits · all features' },
  ];
  const stepB = [
    { i: 1, t: 'Landing page',           s: 'Same — but CTA is "Free Trial"' },
    { i: 2, t: 'Trial signup',           s: 'Email or Google · no card',     hot: true },
    { i: 3, t: 'Onboarding',             s: '4 steps · same as paid' },
    { i: 4, t: 'Dashboard · trial mode', s: 'Same UI · 20 credits · watermark · upgrade CTAs' },
    { i: 5, t: 'Upgrade prompts',        s: 'On exhaustion · download · day 7', hot: true },
    { i: 6, t: 'Buy Now modal',          s: 'Conversion to paid' },
    { i: 7, t: 'Dashboard · paid',       s: 'Same UI · limits removed' },
  ];

  const Col = ({ label, sub, badge, accent, steps, ctaLabel, ctaAction }) => (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
      <Box style={{ padding: 22, marginBottom: 16, borderTopWidth: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <div className="wf-eyebrow">{label}</div>
            <div className="wf-h1" style={{ fontSize: 22, marginTop: 4 }}>{sub}</div>
          </div>
          <Pill style={{ background: accent, color: 'var(--ink)', borderColor: 'var(--ink)' }}>{badge}</Pill>
        </div>
      </Box>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
        {steps.map((step, idx) => (
          <React.Fragment key={step.i}>
            <Box style={{
              padding: 14,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              background: step.hot ? 'var(--highlight-soft)' : 'var(--paper)',
              borderColor: step.hot ? 'var(--ink)' : undefined,
            }}>
              <div style={{
                width: 28, height: 28, flexShrink: 0,
                borderRadius: '50%',
                border: '1.5px solid var(--ink)',
                background: 'var(--paper)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--hand)', fontSize: 13, fontWeight: 700,
              }}>{step.i}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="wf-body" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>
                  {step.t}{step.hot && <span style={{ marginLeft: 8, fontSize: 10, padding: '1px 6px', background: 'var(--accent)', color: 'var(--paper)', borderRadius: 3, fontWeight: 700 }}>KEY MOMENT</span>}
                </div>
                <div className="wf-micro" style={{ fontSize: 11, marginTop: 3 }}>{step.s}</div>
              </div>
            </Box>
            {idx < steps.length - 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
                <span style={{ color: 'var(--ink-faint)', fontSize: 14 }}>↓</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div style={{ marginTop: 16 }}>
        <Btn onClick={ctaAction} style={{ width: '100%', justifyContent: 'center' }}>{ctaLabel}</Btn>
      </div>
    </div>
  );

  return (
    <div style={{ background: 'var(--paper-soft)', minHeight: '100vh', padding: '40px 28px 100px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div style={{ marginBottom: 28 }}>
          <div onClick={() => onNav('home')} style={{ cursor: 'pointer', fontFamily: 'var(--hand)', fontSize: 13, color: 'var(--ink-soft)', marginBottom: 12 }}>
            ← back to home
          </div>
          <div className="wf-eyebrow" style={{ marginBottom: 6 }}>For management</div>
          <div className="wf-h1" style={{ fontSize: 36, marginBottom: 8 }}>Two funnels, side-by-side</div>
          <div className="wf-body" style={{ fontSize: 15, color: 'var(--ink-soft)', maxWidth: 720 }}>
            Both flows lead to the same paid product. Funnel A asks for the credit card upfront; Funnel B lets users try first and converts inside the dashboard.
          </div>
        </div>

        {/* Hypothesis row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, marginBottom: 32 }}>
          <Box soft style={{ padding: 18 }}>
            <div className="wf-eyebrow" style={{ marginBottom: 6 }}>Hypothesis · A</div>
            <div className="wf-body" style={{ fontSize: 13 }}>Higher commitment, fewer signups, better LTV. Wins on already-warm traffic.</div>
          </Box>
          <Box soft style={{ padding: 18 }}>
            <div className="wf-eyebrow" style={{ marginBottom: 6 }}>Hypothesis · B</div>
            <div className="wf-body" style={{ fontSize: 13 }}>Lower friction, larger top of funnel. Conversion rests on the trial dashboard's upsells.</div>
          </Box>
          <Box soft style={{ padding: 18 }}>
            <div className="wf-eyebrow" style={{ marginBottom: 6 }}>What to watch</div>
            <div className="wf-body" style={{ fontSize: 13 }}>Signup → activated, activated → exhausted, exhausted → paid. Drop-offs at hot steps below.</div>
          </Box>
        </div>

        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <Col
            label="Funnel A"
            sub="Direct Buy"
            badge="Existing"
            accent="var(--paper)"
            steps={stepA}
            ctaLabel="Walk through Funnel A →"
            ctaAction={() => { setFunnel('direct'); onNav('home'); }}
          />
          <Col
            label="Funnel B"
            sub="Free Trial → Paid"
            badge="New"
            accent="var(--highlight)"
            steps={stepB}
            ctaLabel="Walk through Funnel B →"
            ctaAction={() => { setFunnel('trial'); onNav('home'); }}
          />
        </div>

        <Box style={{ padding: 22, marginTop: 32 }}>
          <div className="wf-eyebrow" style={{ marginBottom: 10 }}>Trial constraints (Funnel B)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
            {[
              ['7 days',           'Trial duration'],
              ['20 credits',       'Free generations'],
              ['1 brand',          'No multi-brand'],
              ['No downloads',     'Watermarked previews only'],
            ].map(([k, v], i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--hand-loose)', fontSize: 22, fontWeight: 700 }}>{k}</div>
                <div className="wf-micro" style={{ fontSize: 11, marginTop: 4 }}>{v}</div>
              </div>
            ))}
          </div>
        </Box>

      </div>
    </div>
  );
}

// ── 4. Trial dashboard chrome — banner + locked actions ─────
// Two upsell styles toggleable via Tweaks: "subtle" vs "aggressive".
function TrialBanner({ style, daysLeft, creditsUsed, creditsTotal, onUpgrade }) {
  const pct = Math.min(100, Math.round((creditsUsed / creditsTotal) * 100));
  const low = pct >= 80;

  if (style === 'subtle') {
    return (
      <div style={{
        background: low ? 'var(--highlight-soft)' : 'var(--paper-soft)',
        borderBottom: '1.5px solid var(--ink)',
        padding: '10px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <span className="wf-pill wf-pill-hl" style={{ fontSize: 10 }}>FREE TRIAL</span>
          <span className="wf-body" style={{ fontSize: 13 }}>
            <strong>{creditsTotal - creditsUsed}</strong> of {creditsTotal} credits left · <strong>{daysLeft}d</strong> remaining
          </span>
          <div style={{ width: 140, height: 6, background: 'var(--paper)', border: '1px solid var(--ink-faint)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: pct + '%', background: low ? 'var(--accent)' : 'var(--ink)' }} />
          </div>
        </div>
        <Btn onClick={onUpgrade} style={{ fontSize: 12, padding: '6px 14px' }}>Upgrade →</Btn>
      </div>
    );
  }

  // Aggressive: bigger banner, countdown, animated chip
  return (
    <div style={{
      background: 'var(--ink)',
      color: 'var(--paper)',
      padding: '14px 28px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <span style={{
          padding: '4px 10px',
          background: 'var(--accent)',
          color: 'var(--paper)',
          fontFamily: 'var(--hand)',
          fontSize: 11,
          fontWeight: 700,
          borderRadius: 3,
        }}>⚡ TRIAL · {daysLeft}d LEFT</span>
        <span style={{ fontFamily: 'var(--hand)', fontSize: 14, color: 'var(--paper)' }}>
          {creditsTotal - creditsUsed} credits left · downloads locked · single brand
        </span>
      </div>
      <button onClick={onUpgrade} style={{
        padding: '8px 18px',
        background: 'var(--highlight)',
        color: 'var(--ink)',
        border: '1.5px solid var(--paper)',
        borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px',
        fontFamily: 'var(--hand)',
        fontSize: 13,
        fontWeight: 700,
        cursor: 'pointer',
      }}>Unlock everything →</button>
    </div>
  );
}

// ── 5. Trial conversion modals ──────────────────────────────
// Triggered from the trial dashboard at three moments.
function TrialUpgradeModal({ kind, onClose, onUpgrade }) {
  const config = {
    exhausted: {
      icon: '⚡',
      title: 'You\'ve used all 20 credits',
      sub: 'Upgrade to keep generating — pick up right where you left off.',
      cta: 'Upgrade & continue →',
      blocking: true,
    },
    download: {
      icon: '⬇',
      title: 'Downloads are a paid feature',
      sub: 'Trial generations are watermarked previews. Upgrade to download HD assets.',
      cta: 'Upgrade to download →',
      blocking: false,
    },
    expired: {
      icon: '⏱',
      title: 'Your 7-day trial has ended',
      sub: 'Your dashboard is read-only. Upgrade to keep creating with all your saved work.',
      cta: 'Reactivate · upgrade →',
      blocking: true,
    },
    compare: {
      icon: '✦',
      title: 'Trial vs Paid — what changes',
      sub: 'Same dashboard, same workflow. Paid removes the limits and the watermark.',
      cta: 'Upgrade to paid →',
      blocking: false,
    },
  }[kind] || {};

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.55)',
      zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }} onClick={config.blocking ? undefined : onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 460 }}>
        <Box style={{ padding: 28, background: 'var(--paper)' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>{config.icon}</div>
          <div className="wf-h1" style={{ fontSize: 22, marginBottom: 8 }}>{config.title}</div>
          <div className="wf-body" style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 22, lineHeight: 1.5 }}>{config.sub}</div>

          <Box soft style={{ padding: 14, marginBottom: 20 }}>
            <div className="wf-eyebrow" style={{ marginBottom: 8 }}>What you unlock</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                '100 credits per month',
                'HD downloads · no watermarks',
                'Multi-brand workspaces',
                'Priority queue · video Sage',
              ].map((t, i) => (
                <div key={i} className="wf-body" style={{ fontSize: 13 }}>✓ {t}</div>
              ))}
            </div>
          </Box>

          <Btn onClick={onUpgrade} style={{ width: '100%', justifyContent: 'center' }}>{config.cta}</Btn>
          {!config.blocking && (
            <button onClick={onClose} style={{
              width: '100%', marginTop: 10, padding: '8px',
              border: 'none', background: 'transparent',
              fontFamily: 'var(--hand)', fontSize: 13, color: 'var(--ink-soft)',
              cursor: 'pointer',
            }}>Maybe later</button>
          )}
        </Box>
      </div>
    </div>
  );
}

window.FloatingFunnelToggle = FloatingFunnelToggle;
window.TrialSignup           = TrialSignup;
window.CompareFunnels        = CompareFunnels;
window.TrialBanner           = TrialBanner;
window.TrialUpgradeModal     = TrialUpgradeModal;
