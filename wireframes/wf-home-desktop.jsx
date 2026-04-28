// ─────────────────────────────────────────────────────────────
// Home page — Desktop. 12 sections, top to bottom.
// ─────────────────────────────────────────────────────────────

function HomeDesktop({ openBuyNow, screenshotMode, showAnnotations, onNav, embedded, funnel }) {
  const [pricingMode, setPricingMode] = React.useState('annual');
  const [useCaseTab, setUseCaseTab] = React.useState(0);
  const isTrial = funnel === 'trial';
  // Copy varies by funnel — direct sells; trial reduces friction.
  const heroCTA       = isTrial ? 'Start free — 7-day trial →' : 'Get fabfunnel.ai →';
  const heroSub       = isTrial ? 'No credit card · 50 free credits' : 'Plans from $29/mo · cancel anytime';
  const pricingTitle  = isTrial ? 'Simple pricing. Cancel anytime.' : 'Simple pricing. Cancel anytime.';
  const pricingSub    = isTrial ? 'Both plans ship a 7-day free trial. No credit card required.' : 'Pick a plan and start generating today. No long-term contracts.';
  const planCTA       = isTrial ? 'Start free — 7-day trial' : 'Buy plan →';
  const finalTitle    = isTrial ? 'Start your 7-day free trial.' : 'Generate winning creatives today.';
  const finalCTA      = isTrial ? 'Get started — free →' : 'Get fabfunnel.ai →';
  const finalSub      = isTrial ? 'No credit card required.' : 'Instant access · cancel anytime.';
  const [openFaq, setOpenFaq] = React.useState(null);

  const useCases = [
    { tab: 'D2C launch', title: 'Launching a new SKU in <14 days', metric: '12 ad variants in 1 afternoon' },
    { tab: 'Scaling spend', title: 'Beating creative fatigue at $2k/day', metric: '+38% ROAS in week 2' },
    { tab: 'Ecom seasonal', title: 'BFCM creative refresh, solo', metric: '60+ assets shipped, no agency' },
  ];

  const faqs = [
    'Can I cancel anytime?',
    'What is a credit?',
    'Do you offer refunds?',
    'How does the free trial work?',
    'What if I have a team?',
    'Is my data safe?',
  ];

  // helper for screenshot vs sketched mock vs labeled
  const Screenshot = ({ kind, label, height = 280 }) => {
    if (screenshotMode === 'sketched') return (
      <div className="wf-box" style={{ height, padding: 8 }}>
        <MockUI kind={kind} style={{ height: '100%' }} />
      </div>
    );
    if (screenshotMode === 'labeled') return (
      <div className="wf-img" style={{ height }}>
        <span>[ {label} screenshot ]</span>
      </div>
    );
    // 'cross'
    return <div className="wf-img" style={{ height }}><span>{label}</span></div>;
  };

  const wrapStyle = embedded
    ? { background: 'var(--paper)', border: '2px solid var(--ink)', borderRadius: 4, width: 1280, fontFamily: 'var(--hand)' }
    : { background: 'var(--paper)', fontFamily: 'var(--hand)' };

  return (
    <div style={wrapStyle}>
      {embedded && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: '1.5px solid var(--ink)', background: 'var(--paper-soft)' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{ width: 10, height: 10, border: '1.5px solid var(--ink)', borderRadius: '50%' }} />
              <span style={{ width: 10, height: 10, border: '1.5px solid var(--ink)', borderRadius: '50%' }} />
              <span style={{ width: 10, height: 10, border: '1.5px solid var(--ink)', borderRadius: '50%' }} />
            </div>
            <div style={{ flex: 1, height: 22, border: '1.5px solid var(--ink-faint)', borderRadius: 4, padding: '0 10px', display: 'flex', alignItems: 'center', fontSize: 12, color: 'var(--ink-faint)' }}>
              fabfunnel.ai
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 60px', borderBottom: '1.5px dashed var(--ink-faint)', position: 'relative' }}>
            <div style={{ fontFamily: 'var(--hand)', fontSize: 22, fontWeight: 700 }}>fabfunnel<span style={{ color: 'var(--ink-faint)' }}>.ai</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              <span style={{ fontSize: 14 }}>Home</span>
              <span style={{ fontSize: 14, color: 'var(--ink-faint)' }}>Use Cases</span>
              <span style={{ fontSize: 14, color: 'var(--ink-faint)' }}>Blog</span>
              <span style={{ fontSize: 14, color: 'var(--ink-faint)' }}>FabAgent</span>
              <span style={{ fontSize: 13, color: 'var(--ink-faint)' }} className="wf-squig">Login</span>
              <Btn onClick={() => openBuyNow('A')}>{isTrial ? 'Start Free Trial →' : 'Buy Now'}</Btn>
            </div>
            {showAnnotations && (
              <Note style={{ top: -4, right: 60 }}>{isTrial ? 'Start Free Trial → goes to /trial-signup' : 'Buy Now → opens modal, not a page'}</Note>
            )}
          </div>
        </>
      )}

      {/* ─────────── SECTION 1 — Hero ─────────── */}
      <div style={{ padding: '60px 60px 80px', position: 'relative' }}>
        <SectionTag num="1">Hero</SectionTag>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <span className="wf-eyebrow">AI for performance marketers</span>
            <h1 className="wf-h1" style={{ marginTop: 12, fontSize: 56, lineHeight: 1.05 }}>
              Generate <span className="wf-hl">winning ad creatives</span><br/>in minutes, not days.
            </h1>
            <p className="wf-body" style={{ fontSize: 16, marginTop: 18, maxWidth: 460 }}>
              The AI co-pilot for solo performance marketers running D2C and ecommerce campaigns. Brief less. Ship more. Win bigger.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 28 }}>
              <Btn onClick={() => openBuyNow('A')} style={{ fontSize: 15, padding: '14px 22px' }}>{heroCTA}</Btn>
              <button
                className="wf-btn wf-btn-link"
                onClick={() => document.getElementById('section-4')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See it in action ↓
              </button>
            </div>
            <div className="wf-micro" style={{ marginTop: 14 }}>
              {heroSub}
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <Screenshot kind="hero" label="hero product UI / loop" height={360} />
            {showAnnotations && <Note tilt="r" style={{ top: -16, right: -10 }}>looping demo or stills — TBD with Aabhas</Note>}
          </div>
        </div>
      </div>

      <div className="wf-divider-dashed" />

      {/* ─────────── SECTION 2 — Social Proof ─────────── */}
      <div style={{ padding: '32px 60px', position: 'relative' }}>
        <SectionTag num="2">Social proof</SectionTag>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, justifyContent: 'center' }}>
          <span className="wf-body" style={{ color: 'var(--ink-faint)', fontSize: 13 }}>Trusted by performance marketers at</span>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{ width: 90, height: 28, border: '1.5px dashed var(--ink-faint)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--ink-faint)' }}>
              logo {i}
            </div>
          ))}
        </div>
      </div>

      <div className="wf-divider-dashed" />

      {/* ─────────── SECTION 3 — Problem / Agitation ─────────── */}
      <div style={{ padding: '60px', position: 'relative' }}>
        <SectionTag num="3">Problem</SectionTag>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 className="wf-h2">Performance marketing is a creative bottleneck.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32 }}>
          {[
            { t: 'Hours spent briefing creators', d: 'Endless Loom calls. Slack threads. Versions.' },
            { t: 'Guessing which creatives will win', d: 'Gut-feel testing burns budget every week.' },
            { t: 'Drowning in industry data', d: 'Competitor ads everywhere. No system to use them.' },
          ].map((c, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
              <div className="wf-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  {i === 0 && <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>}
                  {i === 1 && <><path d="M3 12h4l3-8 4 16 3-8h4"/></>}
                  {i === 2 && <><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 12l9 4 9-4"/><path d="M3 17l9 4 9-4"/></>}
                </svg>
              </div>
              <h3 className="wf-h3">{c.t}</h3>
              <p className="wf-body">{c.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="wf-divider-dashed" />

      {/* ─────────── SECTION 4 — Product Showcase (Genie) ─────────── */}
      <div id="section-4" style={{ padding: '80px 60px', position: 'relative' }}>
        <SectionTag num="4">Genie suite</SectionTag>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span className="wf-eyebrow">The Genie suite</span>
          <h2 className="wf-h2" style={{ marginTop: 8, fontSize: 36 }}>Three Genies. One creative engine.</h2>
        </div>

        {[
          { name: 'Genie: Creative Generation', kind: 'creative', desc: 'AI-powered ad creatives, on demand.', bullets: ['Static & motion in one prompt', 'Brand-locked outputs', 'Export to Meta / TikTok / Google'] },
          { name: 'Genie: Video Sage', kind: 'video', desc: 'AI video creative assistance.', bullets: ['Hook scoring + suggestions', 'Auto-cut from raw footage', 'Caption + b-roll generation'] },
          { name: 'Genie: Script Generation', kind: 'script', desc: 'Copy and scripts that convert.', bullets: ['UGC scripts in your brand voice', 'Headline & hook generation', 'A/B variants out of the box'] },
        ].map((g, i) => {
          const flip = i % 2 === 1;
          return (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', marginBottom: i < 2 ? 80 : 0, direction: flip ? 'rtl' : 'ltr' }}>
              <div style={{ direction: 'ltr' }}>
                <span className="wf-eyebrow">Block {i + 1}</span>
                <h3 className="wf-h2" style={{ marginTop: 8, fontSize: 30 }}>{g.name}</h3>
                <p className="wf-body" style={{ fontSize: 15, marginTop: 10 }}>{g.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {g.bullets.map((b, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--hand)', fontSize: 14 }}>
                      <Check />{b}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ direction: 'ltr' }}>
                <Screenshot kind={g.kind} label={g.name} height={300} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="wf-divider-dashed" />

      {/* ─────────── SECTION 5 — Industry Insights ─────────── */}
      <div style={{ padding: '80px 60px', position: 'relative', background: 'var(--paper-soft)' }}>
        <SectionTag num="5">Industry Insights</SectionTag>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 60, alignItems: 'center' }}>
          <div>
            <Pill hl style={{ marginBottom: 14 }}>NEW · Distinct capability</Pill>
            <h2 className="wf-h2" style={{ fontSize: 36 }}>
              Save, organise, and reference <span className="wf-hl">winning ads</span> from across your industry.
            </h2>
            <p className="wf-body" style={{ fontSize: 15, marginTop: 16 }}>
              Build folders. Build boards. Stop screenshotting competitor ads into Notion.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}><Check />Up to 3 folders on Individual</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}><Check />Unlimited folders + shared boards on Team</li>
            </ul>
          </div>
          <Screenshot kind="insights" label="Industry Insights — folder/board UI" height={340} />
        </div>
        {showAnnotations && <Note style={{ top: 30, right: 60 }}>different visual treatment from Genie ↑ — own bg color</Note>}
      </div>

      <div className="wf-divider-dashed" />

      {/* ─────────── SECTION 6 — How It Works ─────────── */}
      <div style={{ padding: '80px 60px', position: 'relative' }}>
        <SectionTag num="6">How it works</SectionTag>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <h2 className="wf-h2" style={{ fontSize: 32 }}>Three steps. Zero ceremony.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', gap: 24, alignItems: 'center' }}>
          {[
            { n: 1, t: 'Sign up', d: '30 seconds. Email + password.' },
            { n: 2, t: 'Generate', d: 'Describe what you need, get creatives.' },
            { n: 3, t: 'Launch', d: 'Export and run on Meta, TikTok, Google.' },
          ].flatMap((s, i, arr) => {
            const card = (
              <div key={`s${s.n}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, border: '2px solid var(--ink)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--hand-loose)', fontSize: 32, fontWeight: 700, background: 'var(--paper)' }}>
                  {s.n}
                </div>
                <h3 className="wf-h3" style={{ fontSize: 20 }}>{s.t}</h3>
                <p className="wf-body" style={{ maxWidth: 200 }}>{s.d}</p>
              </div>
            );
            if (i < arr.length - 1) {
              return [card, (
                <svg key={`a${s.n}`} width="50" height="20" viewBox="0 0 50 20">
                  <path d="M 4 10 Q 25 4 44 10" stroke="var(--ink-faint)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3 3"/>
                  <path d="M 40 6 L 46 10 L 40 14" stroke="var(--ink-faint)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                </svg>
              )];
            }
            return [card];
          })}
        </div>
      </div>

      <div className="wf-divider-dashed" />

      {/* ─────────── SECTION 7 — Use Cases ─────────── */}
      <div style={{ padding: '80px 60px', position: 'relative' }}>
        <SectionTag num="7">Use cases</SectionTag>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 className="wf-h2" style={{ fontSize: 32 }}>Built for the way solo marketers actually work.</h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
          {useCases.map((u, i) => (
            <button key={i} className={`wf-tab ${useCaseTab === i ? 'active' : ''}`} onClick={() => setUseCaseTab(i)}>
              {u.tab}
            </button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', maxWidth: 1000, margin: '0 auto' }}>
          <div>
            <Pill soft style={{ marginBottom: 16 }}>Use case · {useCaseTab + 1} of {useCases.length}</Pill>
            <h3 className="wf-h2" style={{ fontSize: 28 }}>{useCases[useCaseTab].title}</h3>
            <div style={{ marginTop: 24, padding: '20px 24px', border: '1.5px solid var(--ink)', borderRadius: 6, background: 'var(--highlight-soft)', display: 'inline-block' }}>
              <span className="wf-eyebrow">Outcome</span>
              <div style={{ fontFamily: 'var(--hand-loose)', fontSize: 28, fontWeight: 700, marginTop: 4 }}>
                {useCases[useCaseTab].metric}
              </div>
            </div>
            <p className="wf-body" style={{ marginTop: 18, fontSize: 13, color: 'var(--ink-faint)' }}>
              ↻ before/after framing or single-metric callout — TBD per use case
            </p>
          </div>
          <Screenshot kind="creative" label={`use case ${useCaseTab + 1}`} height={260} />
        </div>
      </div>

      <div className="wf-divider-dashed" />

      {/* ─────────── SECTION 8 — Pricing ─────────── */}
      <div style={{ padding: '80px 60px', position: 'relative' }}>
        <SectionTag num="8">Pricing</SectionTag>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 className="wf-h2" style={{ fontSize: 36 }}>{pricingTitle}</h2>
          <p className="wf-body" style={{ marginTop: 10 }}>{pricingSub}</p>
        </div>

        {/* Monthly / Annual toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginBottom: 40 }}>
          <div style={{ display: 'inline-flex', border: '1.5px solid var(--ink)', borderRadius: 999, padding: 4 }}>
            <button
              onClick={() => setPricingMode('monthly')}
              style={{
                fontFamily: 'var(--hand)', fontSize: 13, padding: '6px 16px',
                border: 'none', borderRadius: 999, cursor: 'pointer',
                background: pricingMode === 'monthly' ? 'var(--ink)' : 'transparent',
                color: pricingMode === 'monthly' ? 'var(--paper)' : 'var(--ink)',
              }}>Monthly</button>
            <button
              onClick={() => setPricingMode('annual')}
              style={{
                fontFamily: 'var(--hand)', fontSize: 13, padding: '6px 16px',
                border: 'none', borderRadius: 999, cursor: 'pointer',
                background: pricingMode === 'annual' ? 'var(--ink)' : 'transparent',
                color: pricingMode === 'annual' ? 'var(--paper)' : 'var(--ink)',
              }}>Annual</button>
          </div>
          {pricingMode === 'annual' && <Pill hl>Save 20%</Pill>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 900, margin: '0 auto' }}>
          {/* AI Individual */}
          <Box style={{ padding: 28, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 16, right: 16 }}>
              <Pill hl>★ Most popular</Pill>
            </div>
            <h3 className="wf-h3" style={{ fontSize: 18 }}>AI Individual</h3>
            <p className="wf-body" style={{ marginTop: 4, fontSize: 13 }}>Solo performance marketers.</p>
            <div style={{ marginTop: 16, display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontFamily: 'var(--hand-loose)', fontSize: 44, fontWeight: 700 }}>$[TBD]</span>
              <span className="wf-body">/mo</span>
            </div>
            <div className="wf-micro" style={{ marginBottom: 18 }}>billed {pricingMode}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Genie: Creative Generation','Genie: Video Sage','Genie: Script Generation','Industry Insights — up to 3 folders','100 credits / month','1 user seat','Standard support'].map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--hand)', fontSize: 13 }}>
                  <Check />{f}
                </li>
              ))}
            </ul>
            <Btn style={{ width: '100%', marginTop: 22 }} onClick={() => openBuyNow('A')}>{planCTA}</Btn>
          </Box>

          {/* AI Team */}
          <Box style={{ padding: 28, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 16, right: 16 }}>
              <Pill>Best for teams</Pill>
            </div>
            <h3 className="wf-h3" style={{ fontSize: 18 }}>AI Team</h3>
            <p className="wf-body" style={{ marginTop: 4, fontSize: 13 }}>Teams managing shared campaigns.</p>
            <div style={{ marginTop: 16, display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontFamily: 'var(--hand-loose)', fontSize: 44, fontWeight: 700 }}>$[TBD]</span>
              <span className="wf-body">/mo</span>
            </div>
            <div className="wf-micro" style={{ marginBottom: 18 }}>billed {pricingMode} · 3 seats included</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--hand)', fontSize: 13, fontWeight: 700 }}>
                <Check />Everything in Individual, plus:
              </li>
              {['Industry Insights Boards (shared)','Unlimited folders','450 credits / mo (150 per seat)','3 seats included (8 or 15 bundles)','Team usage reporting','Priority support'].map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--hand)', fontSize: 13 }}>
                  <Check />{f}
                </li>
              ))}
            </ul>
            <Btn variant="outline" style={{ width: '100%', marginTop: 22 }} onClick={() => openBuyNow('A')}>{planCTA}</Btn>
          </Box>
        </div>
        {showAnnotations && <Note tilt="r" style={{ top: 80, right: 40 }}>both CTAs open Buy Now modal</Note>}
      </div>

      <div className="wf-divider-dashed" />

      {/* ─────────── SECTION 9 — Testimonials ─────────── */}
      <div style={{ padding: '80px 60px', position: 'relative' }}>
        <SectionTag num="9">Testimonials</SectionTag>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          {[1,2,3].map(i => (
            <Box key={i} style={{ padding: 24 }}>
              <div style={{ fontFamily: 'var(--hand-loose)', fontSize: 32, color: 'var(--ink-faint)', lineHeight: 1, marginBottom: -8 }}>"</div>
              <div className="wf-line" style={{ marginBottom: 8 }} />
              <div className="wf-line" style={{ marginBottom: 8, width: '90%' }} />
              <div className="wf-line" style={{ marginBottom: 16, width: '70%' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, border: '1.5px solid var(--ink)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--ink-faint)' }}>img</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>Name</div>
                  <div className="wf-body" style={{ fontSize: 12 }}>Role · Company</div>
                </div>
              </div>
            </Box>
          ))}
        </div>
      </div>

      <div className="wf-divider-dashed" />

      {/* ─────────── SECTION 10 — FAQ ─────────── */}
      <div style={{ padding: '80px 60px', position: 'relative' }}>
        <SectionTag num="10">FAQ</SectionTag>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 60 }}>
          <h2 className="wf-h2" style={{ fontSize: 32 }}>Frequently<br/>asked questions.</h2>
          <div>
            {faqs.map((q, i) => (
              <div key={i} className="wf-faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div style={{ flex: 1 }}>
                  <div className="wf-faq-q">{q}</div>
                  {openFaq === i && (
                    <div className="wf-faq-a">
                      <div className="wf-line" style={{ marginBottom: 6 }} />
                      <div className="wf-line" style={{ marginBottom: 6, width: '85%' }} />
                      <div className="wf-line" style={{ width: '50%' }} />
                    </div>
                  )}
                </div>
                <span className="wf-faq-toggle">{openFaq === i ? '−' : '+'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wf-divider-dashed" />

      {/* ─────────── SECTION 11 — Final CTA ─────────── */}
      <div style={{ padding: '100px 60px', textAlign: 'center', position: 'relative', background: 'var(--paper-soft)' }}>
        <SectionTag num="11">Final CTA</SectionTag>
        {isTrial ? (
          <h2 className="wf-h2" style={{ fontSize: 44 }}>Start your <span className="wf-hl">7-day free trial</span>.</h2>
        ) : (
          <h2 className="wf-h2" style={{ fontSize: 44 }}>Generate <span className="wf-hl">winning creatives</span> today.</h2>
        )}
        <p className="wf-body" style={{ fontSize: 16, marginTop: 12 }}>Generate your first winning creative this afternoon.</p>
        <div style={{ marginTop: 28 }}>
          <Btn onClick={() => openBuyNow('A')} style={{ fontSize: 16, padding: '16px 28px' }}>{finalCTA}</Btn>
        </div>
        <div className="wf-micro" style={{ marginTop: 12 }}>{finalSub}</div>
      </div>

      {/* ─────────── SECTION 12 — Footer ─────────── */}
      {embedded && (
      <div style={{ padding: '60px 60px 40px', borderTop: '1.5px solid var(--ink)', position: 'relative' }}>
        <SectionTag num="12">Footer</SectionTag>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr', gap: 40 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>fabfunnel<span style={{ color: 'var(--ink-faint)' }}>.ai</span></div>
            <p className="wf-body" style={{ marginTop: 10, fontSize: 13 }}>The AI co-pilot for performance marketers.</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              {['x','in','yt','ig'].map(s => (
                <div key={s} style={{ width: 28, height: 28, border: '1.5px solid var(--ink)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>
                  {s}
                </div>
              ))}
            </div>
          </div>
          {[
            { h: 'Product', l: ['Genie suite','Industry Insights','Pricing','Use cases'] },
            { h: 'Company', l: ['About','Careers','Press','Contact'] },
            { h: 'Resources', l: ['Blog','Help center','API','FabAgent'] },
            { h: 'Legal',     l: ['Terms','Privacy','Security','Cookies'] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>{col.h}</div>
              {col.l.map((x, j) => (
                <div key={j} className="wf-body" style={{ fontSize: 13, marginBottom: 6 }}>{x}</div>
              ))}
            </div>
          ))}
        </div>
        <div className="wf-divider-dashed" style={{ margin: '32px 0 16px' }} />
        <div className="wf-micro" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>© 2026 FabFunnel, Inc.</span>
          <span>fabfunnel.ai → upsell to fabfunnel.com post-purchase</span>
        </div>
      </div>
      )}

    </div>
  );
}

window.HomeDesktop = HomeDesktop;
