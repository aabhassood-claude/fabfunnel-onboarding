// ─────────────────────────────────────────────────────────────
// Home page — Mobile. Key sections only:
// hero, problem, product showcase, pricing, final CTA.
// ─────────────────────────────────────────────────────────────

function HomeMobile({ openBuyNow, screenshotMode, showAnnotations, funnel }) {
  const [pricingMode, setPricingMode] = React.useState('annual');
  const isTrial = funnel === 'trial';
  const heroCTA  = isTrial ? 'Start free — 7-day trial →' : 'Get fabfunnel.ai →';
  const planCTA  = isTrial ? 'Start free — 7-day trial'   : 'Buy plan →';
  const finalCTA = isTrial ? 'Get started — free →'        : 'Get fabfunnel.ai →';
  const finalSub = isTrial ? 'No credit card required.'    : 'Instant access · cancel anytime.';
  const pricingSub = isTrial ? '7-day free trial. No credit card.' : 'Pick a plan. Cancel anytime.';

  const Screenshot = ({ kind, label, height = 200 }) => {
    if (screenshotMode === 'sketched') return (
      <div className="wf-box" style={{ height, padding: 6 }}>
        <MockUI kind={kind} style={{ height: '100%' }} />
      </div>
    );
    if (screenshotMode === 'labeled') return (
      <div className="wf-img" style={{ height }}><span>[ {label} ]</span></div>
    );
    return <div className="wf-img" style={{ height }}><span>{label}</span></div>;
  };

  return (
    <div className="wf-device">
      <div className="wf-device-screen">

        {/* mobile nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderBottom: '1.5px dashed var(--ink-faint)', position: 'sticky', top: 0, background: 'var(--paper)', zIndex: 4 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>fabfunnel<span style={{ color: 'var(--ink-faint)' }}>.ai</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Btn onClick={() => openBuyNow('A')} style={{ fontSize: 11, padding: '6px 10px' }}>Buy</Btn>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {[1,2,3].map(i => <div key={i} style={{ width: 18, height: 1.5, background: 'var(--ink)' }} />)}
            </div>
          </div>
        </div>

        {/* SECTION 1 — Hero */}
        <div style={{ padding: '24px 18px 32px', position: 'relative' }}>
          <span className="wf-eyebrow" style={{ fontSize: 10 }}>AI for performance marketers</span>
          <h1 className="wf-h1" style={{ fontSize: 28, marginTop: 8 }}>
            Generate <span className="wf-hl">winning</span> ad creatives in minutes.
          </h1>
          <p className="wf-body" style={{ fontSize: 13, marginTop: 12 }}>
            The AI co-pilot for solo performance marketers running D2C and ecommerce.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 18 }}>
            <Btn onClick={() => openBuyNow('A')} style={{ fontSize: 13 }}>{heroCTA}</Btn>
            <button className="wf-btn wf-btn-link" style={{ fontSize: 12 }}>See it in action ↓</button>
          </div>
          <div className="wf-micro" style={{ marginTop: 8, fontSize: 10, textAlign: 'center' }}>No credit card required • Cancel anytime</div>
          <div style={{ marginTop: 20 }}>
            <Screenshot kind="hero" label="hero demo" height={180} />
          </div>
          {showAnnotations && (
            <Note style={{ top: 0, right: -6, fontSize: 13, maxWidth: 130, padding: '4px 8px' }}>visual moves below CTAs on mobile</Note>
          )}
        </div>

        <div className="wf-divider-dashed" />

        {/* SECTION 3 — Problem */}
        <div style={{ padding: '32px 18px', position: 'relative' }}>
          <span className="wf-eyebrow" style={{ fontSize: 10 }}>3 · Problem</span>
          <h2 className="wf-h2" style={{ fontSize: 20, marginTop: 6 }}>Performance marketing is a creative bottleneck.</h2>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              { t: 'Hours spent briefing creators', d: 'Endless Loom calls. Slack threads.' },
              { t: 'Guessing which creatives win', d: 'Gut-feel testing burns budget.' },
              { t: 'Drowning in industry data', d: 'No system for competitor ads.' },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div className="wf-icon" style={{ width: 28, height: 28 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 14, height: 14 }}>
                    {i === 0 && <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>}
                    {i === 1 && <><path d="M3 12h4l3-8 4 16 3-8h4"/></>}
                    {i === 2 && <><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 12l9 4 9-4"/></>}
                  </svg>
                </div>
                <div>
                  <h3 className="wf-h3" style={{ fontSize: 14 }}>{c.t}</h3>
                  <p className="wf-body" style={{ fontSize: 12, marginTop: 2 }}>{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="wf-divider-dashed" />

        {/* SECTION 4 — Product Showcase (stacked) */}
        <div style={{ padding: '32px 18px', position: 'relative' }}>
          <span className="wf-eyebrow" style={{ fontSize: 10 }}>4 · Genie suite</span>
          <h2 className="wf-h2" style={{ fontSize: 20, marginTop: 6 }}>Three Genies. One creative engine.</h2>

          {[
            { name: 'Genie: Creative Generation', kind: 'creative', desc: 'AI-powered ad creatives.' },
            { name: 'Genie: Video Sage', kind: 'video', desc: 'AI video creative assistance.' },
            { name: 'Genie: Script Generation', kind: 'script', desc: 'Copy and scripts that convert.' },
          ].map((g, i) => (
            <div key={i} style={{ marginTop: 24 }}>
              <Screenshot kind={g.kind} label={g.name} height={140} />
              <h3 className="wf-h3" style={{ fontSize: 16, marginTop: 12 }}>{g.name}</h3>
              <p className="wf-body" style={{ fontSize: 12, marginTop: 4 }}>{g.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '10px 0 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[1,2,3].map(j => (
                  <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--hand)', fontSize: 12 }}>
                    <Check />supporting bullet
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {showAnnotations && (
            <Note tilt="r" style={{ top: 24, right: -8, fontSize: 13, maxWidth: 130, padding: '4px 8px' }}>alternating layout collapses to stacked on mobile</Note>
          )}
        </div>

        <div className="wf-divider-dashed" />

        {/* SECTION 8 — Pricing */}
        <div style={{ padding: '32px 18px', position: 'relative' }}>
          <span className="wf-eyebrow" style={{ fontSize: 10 }}>8 · Pricing</span>
          <h2 className="wf-h2" style={{ fontSize: 22, marginTop: 6 }}>Simple pricing.</h2>
          <p className="wf-body" style={{ fontSize: 12, marginTop: 6 }}>{pricingSub}</p>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 18 }}>
            <div style={{ display: 'inline-flex', border: '1.5px solid var(--ink)', borderRadius: 999, padding: 3 }}>
              <button onClick={() => setPricingMode('monthly')} style={{ fontFamily: 'var(--hand)', fontSize: 11, padding: '4px 12px', border: 'none', borderRadius: 999, cursor: 'pointer', background: pricingMode === 'monthly' ? 'var(--ink)' : 'transparent', color: pricingMode === 'monthly' ? 'var(--paper)' : 'var(--ink)' }}>Monthly</button>
              <button onClick={() => setPricingMode('annual')} style={{ fontFamily: 'var(--hand)', fontSize: 11, padding: '4px 12px', border: 'none', borderRadius: 999, cursor: 'pointer', background: pricingMode === 'annual' ? 'var(--ink)' : 'transparent', color: pricingMode === 'annual' ? 'var(--paper)' : 'var(--ink)' }}>Annual</button>
            </div>
            {pricingMode === 'annual' && <Pill hl style={{ fontSize: 9, padding: '2px 6px' }}>Save 20%</Pill>}
          </div>

          {/* stacked cards */}
          <Box style={{ padding: 18, marginTop: 20, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 10, right: 10 }}><Pill hl style={{ fontSize: 9, padding: '2px 6px' }}>★ Most popular</Pill></div>
            <h3 className="wf-h3" style={{ fontSize: 15 }}>AI Individual</h3>
            <p className="wf-body" style={{ fontSize: 11, marginTop: 2 }}>Solo performance marketers.</p>
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontFamily: 'var(--hand-loose)', fontSize: 32, fontWeight: 700 }}>$[TBD]</span>
              <span className="wf-body" style={{ fontSize: 12 }}>/mo</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0', display: 'flex', flexDirection: 'column', gap: 5 }}>
              {['Genie: Creative Generation','Genie: Video Sage','Genie: Script Generation','Industry Insights — 3 folders','100 credits / mo','1 seat'].map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}><Check />{f}</li>
              ))}
            </ul>
            <Btn style={{ width: '100%', fontSize: 12 }} onClick={() => openBuyNow('A')}>{planCTA}</Btn>
          </Box>

          <Box style={{ padding: 18, marginTop: 16, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 10, right: 10 }}><Pill style={{ fontSize: 9, padding: '2px 6px' }}>Best for teams</Pill></div>
            <h3 className="wf-h3" style={{ fontSize: 15 }}>AI Team</h3>
            <p className="wf-body" style={{ fontSize: 11, marginTop: 2 }}>Teams managing shared campaigns.</p>
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontFamily: 'var(--hand-loose)', fontSize: 32, fontWeight: 700 }}>$[TBD]</span>
              <span className="wf-body" style={{ fontSize: 12 }}>/mo</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0', display: 'flex', flexDirection: 'column', gap: 5 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700 }}><Check />Everything in Individual, plus:</li>
              {['Insights Boards (shared)','Unlimited folders','450 credits / mo','3 seats included','Priority support'].map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}><Check />{f}</li>
              ))}
            </ul>
            <Btn variant="outline" style={{ width: '100%', fontSize: 12 }} onClick={() => openBuyNow('A')}>{planCTA}</Btn>
          </Box>
        </div>

        <div className="wf-divider-dashed" />

        {/* SECTION 11 — Final CTA */}
        <div style={{ padding: '40px 18px', textAlign: 'center', background: 'var(--paper-soft)', position: 'relative' }}>
          <span className="wf-eyebrow" style={{ fontSize: 10 }}>11 · Final CTA</span>
          {isTrial ? (
            <h2 className="wf-h2" style={{ fontSize: 24, marginTop: 6 }}>Start your <span className="wf-hl">7-day</span> free trial.</h2>
          ) : (
            <h2 className="wf-h2" style={{ fontSize: 24, marginTop: 6 }}>Generate <span className="wf-hl">winning creatives</span> today.</h2>
          )}
          <p className="wf-body" style={{ fontSize: 12, marginTop: 8 }}>Generate your first winning creative this afternoon.</p>
          <div style={{ marginTop: 16 }}>
            <Btn onClick={() => openBuyNow('A')} style={{ fontSize: 13, width: '100%' }}>{finalCTA}</Btn>
          </div>
          <div className="wf-micro" style={{ marginTop: 8, fontSize: 10 }}>{finalSub}</div>
        </div>

        {/* footer truncated */}
        <div style={{ padding: '24px 18px', borderTop: '1.5px solid var(--ink)', textAlign: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>fabfunnel<span style={{ color: 'var(--ink-faint)' }}>.ai</span></div>
          <div className="wf-micro" style={{ marginTop: 8, fontSize: 10 }}>Product · Company · Resources · Legal</div>
          <div className="wf-micro" style={{ marginTop: 4, fontSize: 9 }}>© 2026 FabFunnel, Inc.</div>
        </div>

      </div>
    </div>
  );
}

window.HomeMobile = HomeMobile;
