// ─────────────────────────────────────────────────────────────
// Buy Now Modals — Variant A (3-step direct sales) and Variant B (2-step free trial)
// ─────────────────────────────────────────────────────────────

// Step indicator — 3 styles, controlled by tweak
function StepDots({ total, current, style = 'dots' }) {
  if (style === 'bar') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            flex: 1,
            height: 6,
            borderRadius: 3,
            border: '1.5px solid var(--ink)',
            background: i < current ? 'var(--ink)' : i === current - 1 ? 'var(--highlight)' : 'var(--paper)',
          }} />
        ))}
      </div>
    );
  }
  if (style === 'fraction') {
    return (
      <div style={{ fontFamily: 'var(--hand-loose)', fontSize: 22, fontWeight: 700, display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span>{current}</span>
        <span style={{ color: 'var(--ink-faint)', fontSize: 16 }}>/ {total}</span>
        <span style={{ fontFamily: 'var(--hand)', fontSize: 11, color: 'var(--ink-faint)', marginLeft: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
          step
        </span>
      </div>
    );
  }
  // dots — default
  return (
    <div className="wf-step-dots">
      {Array.from({ length: total }).map((_, i) => (
        <React.Fragment key={i}>
          <div className={`wf-step-dot ${i + 1 === current ? 'active' : i + 1 < current ? 'done' : ''}`}>
            {i + 1 < current ? '✓' : i + 1}
          </div>
          {i < total - 1 && <div className="wf-step-bar" />}
        </React.Fragment>
      ))}
    </div>
  );
}

// ── Modal shell with step header ──
function ModalShell({ width = 480, step, total, onClose, onBack, children, stepStyle, title }) {
  return (
    <div className="wf-modal" style={{ width, maxWidth: '100%' }}>
      {/* header */}
      <div style={{ padding: '18px 22px', borderBottom: '1.5px dashed var(--ink-faint)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
          {step > 1 && (
            <button onClick={onBack} style={{ width: 28, height: 28, border: '1.5px solid var(--ink-faint)', borderRadius: '50%', background: 'var(--paper)', cursor: 'pointer', fontFamily: 'var(--hand)', fontSize: 16 }}>←</button>
          )}
          <div style={{ flex: 1 }}>
            <StepDots total={total} current={step} style={stepStyle} />
          </div>
        </div>
        <button onClick={onClose} className="wf-close">✕</button>
      </div>
      {children}
    </div>
  );
}

// ── Variant A — Direct Sales (3 steps) ──
function ModalVariantA({ onClose, stepStyle = 'dots', showAnnotations, embedded }) {
  const [step, setStep] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);

  const next = () => setStep(s => Math.min(3, s + 1));
  const back = () => setStep(s => Math.max(1, s - 1));

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setConfirmed(true);
    }, 1800);
  };

  const totalSteps = 3;

  return (
    <ModalShell width={480} step={step} total={totalSteps} onClose={onClose} onBack={back} stepStyle={stepStyle}>

      {/* STEP 1 — Plan locked */}
      {step === 1 && (
        <div style={{ padding: 24, position: 'relative' }}>
          <span className="wf-eyebrow" style={{ fontSize: 10 }}>Step 1 · Your plan</span>
          <h3 className="wf-h2" style={{ fontSize: 22, marginTop: 6 }}>You're starting with <span className="wf-hl">AI Individual</span></h3>

          <Box style={{ padding: 18, marginTop: 18, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 12, right: 12 }}><Pill hl style={{ fontSize: 9, padding: '2px 6px' }}>★ Most popular</Pill></div>
            <h3 className="wf-h3" style={{ fontSize: 15 }}>AI Individual</h3>
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontFamily: 'var(--hand-loose)', fontSize: 32, fontWeight: 700 }}>$[TBD]</span>
              <span className="wf-body" style={{ fontSize: 12 }}>/mo · billed monthly</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {['All 3 Genies (Creative, Video Sage, Script)','Industry Insights — up to 3 folders','100 credits / mo','1 user seat'].map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}><Check />{f}</li>
              ))}
            </ul>
          </Box>

          <div style={{ marginTop: 12, fontFamily: 'var(--hand)', fontSize: 12, color: 'var(--ink-soft)' }}>
            Need team plan? <span className="wf-squig" style={{ cursor: 'pointer' }}>Switch to AI Team →</span>
          </div>

          <Btn style={{ width: '100%', marginTop: 18 }} onClick={next}>Continue →</Btn>

          {showAnnotations && !embedded && (
            <Note style={{ top: -10, right: -90, maxWidth: 130 }}>holo pattern: single plan exposed</Note>
          )}
          {showAnnotations && !embedded && (
            <Note tilt="r" style={{ bottom: 60, right: -90, maxWidth: 130 }}>phot: soft secondary path</Note>
          )}
        </div>
      )}

      {/* STEP 2 — Account */}
      {step === 2 && (
        <div style={{ padding: 24 }}>
          <span className="wf-eyebrow" style={{ fontSize: 10 }}>Step 2 · Create your account</span>
          <h3 className="wf-h2" style={{ fontSize: 22, marginTop: 6 }}>Create your account</h3>

          <button className="wf-google-btn" style={{ marginTop: 18 }}>
            <span style={{ width: 14, height: 14, border: '1.5px solid var(--ink)', borderRadius: '50%', display: 'inline-block' }} />
            Continue with Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0', color: 'var(--ink-faint)', fontSize: 11 }}>
            <div style={{ flex: 1, borderTop: '1.5px dashed var(--ink-faint)' }} />
            or
            <div style={{ flex: 1, borderTop: '1.5px dashed var(--ink-faint)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <label style={{ fontSize: 11, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Email</label>
              <div className="wf-field" style={{ marginTop: 4 }}>you@brand.com</div>
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Password</label>
              <div className="wf-field" style={{ marginTop: 4, color: 'var(--ink-faint)' }}>••••••••</div>
            </div>
          </div>

          <Btn style={{ width: '100%', marginTop: 18 }} onClick={next}>Continue →</Btn>
          <div className="wf-micro" style={{ textAlign: 'center', marginTop: 10 }}>By continuing you agree to Terms & Privacy.</div>
        </div>
      )}

      {/* STEP 3 — Payment */}
      {step === 3 && !confirmed && (
        <div style={{ padding: 24, position: 'relative' }}>
          <span className="wf-eyebrow" style={{ fontSize: 10 }}>Step 3 · Payment</span>
          <h3 className="wf-h2" style={{ fontSize: 22, marginTop: 6 }}>Payment details</h3>

          {/* order summary */}
          <Box soft style={{ padding: 12, marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
            <div>
              <div style={{ fontWeight: 700 }}>AI Individual</div>
              <div className="wf-body" style={{ fontSize: 11 }}>Monthly · cancel anytime</div>
            </div>
            <div style={{ fontFamily: 'var(--hand-loose)', fontSize: 22, fontWeight: 700 }}>$[TBD]/mo</div>
          </Box>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
            <div>
              <label style={{ fontSize: 11, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Card number</label>
              <div className="wf-field" style={{ marginTop: 4, color: 'var(--ink-faint)', display: 'flex', justifyContent: 'space-between' }}>
                <span>1234 5678 9012 3456</span>
                <span style={{ display: 'flex', gap: 4 }}>
                  <span style={{ width: 24, height: 16, border: '1px solid var(--ink-faint)', borderRadius: 2 }} />
                  <span style={{ width: 24, height: 16, border: '1px solid var(--ink-faint)', borderRadius: 2 }} />
                </span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label style={{ fontSize: 11, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Exp</label>
                <div className="wf-field" style={{ marginTop: 4, color: 'var(--ink-faint)' }}>MM / YY</div>
              </div>
              <div>
                <label style={{ fontSize: 11, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: 0.5 }}>CVC</label>
                <div className="wf-field" style={{ marginTop: 4, color: 'var(--ink-faint)' }}>•••</div>
              </div>
            </div>
          </div>

          <Btn style={{ width: '100%', marginTop: 18 }} onClick={handlePay}>
            {loading ? '⟳  Processing…' : 'Start subscription — $[TBD]/mo'}
          </Btn>
          <div className="wf-micro" style={{ textAlign: 'center', marginTop: 10 }}>Cancel anytime. Secured by Stripe.</div>

          {showAnnotations && !embedded && (
            <Note tilt="r" style={{ bottom: 70, right: -100, maxWidth: 140 }}>loading state: button → "Processing…", spinner</Note>
          )}
        </div>
      )}

      {/* loading overlay (shown over step 3) */}
      {step === 3 && loading && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(250,250,247,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, borderRadius: 'inherit' }}>
          <div style={{ width: 36, height: 36, border: '2px solid var(--ink)', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <div style={{ fontFamily: 'var(--hand)', fontSize: 13 }}>Processing your payment…</div>
        </div>
      )}

      {/* auto-redirect to celebration screen after payment confirmation */}
      {step === 3 && confirmed && (() => {
        setTimeout(() => { onClose(); window.location.hash = 'welcome-celebrate'; window.scrollTo(0, 0); }, 400);
        return (
          <div style={{ padding: 32, textAlign: 'center' }}>
            <div style={{ width: 36, height: 36, border: '2px solid var(--ink)', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
            <p className="wf-body" style={{ fontSize: 13, marginTop: 16 }}>Payment confirmed…</p>
          </div>
        );
      })()}
    </ModalShell>
  );
}

// ── Variant B — Free Trial (2 steps) ──
function ModalVariantB({ onClose, stepStyle = 'dots', showAnnotations, embedded }) {
  const [step, setStep] = React.useState(1);
  const [selectedPlan, setSelectedPlan] = React.useState('individual');
  const [loading, setLoading] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);

  const next = () => setStep(s => Math.min(2, s + 1));
  const back = () => setStep(s => Math.max(1, s - 1));

  const handleStart = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setConfirmed(true);
    }, 1400);
  };

  const totalSteps = 2;

  return (
    <ModalShell width={640} step={step} total={totalSteps} onClose={onClose} onBack={back} stepStyle={stepStyle}>

      {/* STEP 1 — Plan select */}
      {step === 1 && (
        <div style={{ padding: 24, position: 'relative' }}>
          <span className="wf-eyebrow" style={{ fontSize: 10 }}>Step 1 · Pick your plan</span>
          <h3 className="wf-h2" style={{ fontSize: 22, marginTop: 6 }}>Start your <span className="wf-hl">7-day free trial</span></h3>
          <p className="wf-body" style={{ fontSize: 12, marginTop: 6 }}>No credit card required. Cancel anytime.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 18 }}>
            {/* Individual */}
            <div
              onClick={() => setSelectedPlan('individual')}
              style={{
                cursor: 'pointer',
                padding: 18,
                border: selectedPlan === 'individual' ? '2px solid var(--ink)' : '1.5px solid var(--ink-faint)',
                borderRadius: '6px 8px 7px 9px / 7px 6px 9px 8px',
                background: selectedPlan === 'individual' ? 'var(--paper)' : 'var(--paper-soft)',
                position: 'relative',
                boxShadow: selectedPlan === 'individual' ? '3px 3px 0 var(--ink)' : 'none',
              }}>
              <div style={{ position: 'absolute', top: 10, right: 10 }}><Pill hl style={{ fontSize: 9, padding: '2px 6px' }}>★ Default</Pill></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 16, height: 16, border: '1.5px solid var(--ink)', borderRadius: '50%', background: selectedPlan === 'individual' ? 'var(--ink)' : 'var(--paper)' }} />
                <h3 className="wf-h3" style={{ fontSize: 14 }}>AI Individual</h3>
              </div>
              <div style={{ marginTop: 10, display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontFamily: 'var(--hand-loose)', fontSize: 26, fontWeight: 700 }}>$[TBD]</span>
                <span className="wf-body" style={{ fontSize: 11 }}>/mo after trial</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '10px 0 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {['All 3 Genies','100 credits / mo','3 folders','1 seat'].map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}><Check />{f}</li>
                ))}
              </ul>
            </div>
            {/* Team */}
            <div
              onClick={() => setSelectedPlan('team')}
              style={{
                cursor: 'pointer',
                padding: 18,
                border: selectedPlan === 'team' ? '2px solid var(--ink)' : '1.5px solid var(--ink-faint)',
                borderRadius: '6px 8px 7px 9px / 7px 6px 9px 8px',
                background: selectedPlan === 'team' ? 'var(--paper)' : 'var(--paper-soft)',
                position: 'relative',
                boxShadow: selectedPlan === 'team' ? '3px 3px 0 var(--ink)' : 'none',
              }}>
              <div style={{ position: 'absolute', top: 10, right: 10 }}><Pill style={{ fontSize: 9, padding: '2px 6px' }}>Best for teams</Pill></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 16, height: 16, border: '1.5px solid var(--ink)', borderRadius: '50%', background: selectedPlan === 'team' ? 'var(--ink)' : 'var(--paper)' }} />
                <h3 className="wf-h3" style={{ fontSize: 14 }}>AI Team</h3>
              </div>
              <div style={{ marginTop: 10, display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontFamily: 'var(--hand-loose)', fontSize: 26, fontWeight: 700 }}>$[TBD]</span>
                <span className="wf-body" style={{ fontSize: 11 }}>/mo after trial</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '10px 0 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {['Everything in Individual','450 credits / mo','Unlimited folders','3 seats included'].map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}><Check />{f}</li>
                ))}
              </ul>
            </div>
          </div>

          <Btn style={{ width: '100%', marginTop: 18 }} onClick={next}>
            Start free — 7-day trial →
          </Btn>
          <div className="wf-micro" style={{ textAlign: 'center', marginTop: 8 }}>No credit card required. Cancel anytime.</div>

          {showAnnotations && !embedded && (
            <Note style={{ top: -10, right: -90, maxWidth: 130 }}>both plans visible · Individual default</Note>
          )}
        </div>
      )}

      {/* STEP 2 — Account */}
      {step === 2 && !confirmed && (
        <div style={{ padding: 24, position: 'relative' }}>
          <span className="wf-eyebrow" style={{ fontSize: 10 }}>Step 2 · Create your account</span>
          <h3 className="wf-h2" style={{ fontSize: 22, marginTop: 6 }}>Create your account</h3>
          <p className="wf-body" style={{ fontSize: 12, marginTop: 4 }}>
            You picked <strong>{selectedPlan === 'individual' ? 'AI Individual' : 'AI Team'}</strong>.
            <span className="wf-squig" style={{ marginLeft: 6, cursor: 'pointer' }} onClick={back}>change</span>
          </p>

          <button className="wf-google-btn" style={{ marginTop: 18 }}>
            <span style={{ width: 14, height: 14, border: '1.5px solid var(--ink)', borderRadius: '50%', display: 'inline-block' }} />
            Continue with Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0', color: 'var(--ink-faint)', fontSize: 11 }}>
            <div style={{ flex: 1, borderTop: '1.5px dashed var(--ink-faint)' }} />
            or
            <div style={{ flex: 1, borderTop: '1.5px dashed var(--ink-faint)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <label style={{ fontSize: 11, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Email</label>
              <div className="wf-field" style={{ marginTop: 4 }}>you@brand.com</div>
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Password</label>
              <div className="wf-field" style={{ marginTop: 4, color: 'var(--ink-faint)' }}>••••••••</div>
            </div>
          </div>

          <Btn style={{ width: '100%', marginTop: 18 }} onClick={handleStart}>
            {loading ? '⟳  Starting trial…' : 'Start trial'}
          </Btn>
          <div className="wf-micro" style={{ textAlign: 'center', marginTop: 10 }}>No credit card required. Cancel anytime.</div>
        </div>
      )}

      {step === 2 && loading && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(250,250,247,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, borderRadius: 'inherit' }}>
          <div style={{ width: 36, height: 36, border: '2px solid var(--ink)', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <div style={{ fontFamily: 'var(--hand)', fontSize: 13 }}>Setting up your trial…</div>
        </div>
      )}

      {step === 2 && confirmed && (() => {
        setTimeout(() => { onClose(); window.location.hash = 'welcome-celebrate'; window.scrollTo(0, 0); }, 400);
        return (
          <div style={{ padding: 32, textAlign: 'center' }}>
            <div style={{ width: 36, height: 36, border: '2px solid var(--ink)', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
            <p className="wf-body" style={{ fontSize: 13, marginTop: 16 }}>Trial activated…</p>
          </div>
        );
      })()}
    </ModalShell>
  );
}

Object.assign(window, { ModalVariantA, ModalVariantB });
