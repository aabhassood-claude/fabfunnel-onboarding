// ─────────────────────────────────────────────────────────────
// Use Cases · Blog · FabAgent · Login pages (wireframes)
// ─────────────────────────────────────────────────────────────

function UseCasesPage({ onNav, openBuyNow, screenshotMode, showAnnotations }) {
  const [active, setActive] = React.useState(0);
  const cases = [
    { tag: 'D2C launch',     title: 'Launching a new SKU in <14 days',     metric: '12 ad variants in 1 afternoon', who: 'Solo founder · skincare brand', kind: 'creative' },
    { tag: 'Scaling spend',  title: 'Beating creative fatigue at $2k/day', metric: '+38% ROAS in week 2',           who: 'Performance marketer · DTC apparel', kind: 'video' },
    { tag: 'BFCM seasonal',  title: 'BFCM creative refresh, solo',         metric: '60+ assets shipped, no agency', who: 'Marketing lead · home goods', kind: 'script' },
    { tag: 'Insights',       title: 'From competitor scroll to thesis',    metric: '5 winning hooks/week',          who: 'Growth · supplement brand',   kind: 'insights' },
  ];

  const Sc = ({ kind, label, h = 280 }) => screenshotMode === 'sketched'
    ? <div className="wf-box" style={{ height: h, padding: 8 }}><MockUI kind={kind} style={{ height: '100%' }} /></div>
    : <div className="wf-img" style={{ height: h }}><span>{screenshotMode === 'labeled' ? `[ ${label} ]` : label}</span></div>;

  return (
    <div>
      <div style={{ padding: '60px 60px 40px', textAlign: 'center', position: 'relative' }}>
        <span className="wf-eyebrow">Use cases</span>
        <h1 className="wf-h1" style={{ fontSize: 44, marginTop: 10 }}>
          How solo marketers <span className="wf-hl">actually</span> win with fabfunnel.
        </h1>
        <p className="wf-body" style={{ maxWidth: 560, margin: '14px auto 0', fontSize: 15 }}>
          Real workflows. Real outcomes. No "10× growth in 30 days" nonsense.
        </p>
        {showAnnotations && <Note style={{ top: 30, right: 60 }}>v1: list view + filter pills</Note>}
      </div>

      {/* filter pills */}
      <div style={{ padding: '0 60px 32px', display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
        {['All', 'D2C', 'Ecom', 'Solo', 'Agency', 'BFCM', 'Insights'].map((p, i) => (
          <button key={p} className={`wf-tab ${i === 0 ? 'active' : ''}`}>{p}</button>
        ))}
      </div>

      {/* hero case (active) */}
      <div style={{ padding: '0 60px 60px' }}>
        <Box style={{ padding: 28, display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 40, alignItems: 'center' }}>
          <div>
            <Pill hl style={{ marginBottom: 12 }}>{cases[active].tag}</Pill>
            <h2 className="wf-h2" style={{ fontSize: 32 }}>{cases[active].title}</h2>
            <p className="wf-body" style={{ marginTop: 10, fontSize: 13, color: 'var(--ink-faint)' }}>{cases[active].who}</p>
            <div style={{ marginTop: 22, padding: '20px 24px', border: '1.5px solid var(--ink)', borderRadius: 6, background: 'var(--highlight-soft)', display: 'inline-block' }}>
              <span className="wf-eyebrow">Outcome</span>
              <div style={{ fontFamily: 'var(--hand-loose)', fontSize: 30, fontWeight: 700, marginTop: 4 }}>{cases[active].metric}</div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <Btn onClick={() => openBuyNow('B')}>Try the workflow →</Btn>
              <Btn variant="outline">Read the full case →</Btn>
            </div>
          </div>
          <Sc kind={cases[active].kind} label={cases[active].title} h={320} />
        </Box>
      </div>

      {/* grid of cases */}
      <div style={{ padding: '0 60px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          {cases.map((c, i) => (
            <Box key={i} style={{ padding: 18, cursor: 'pointer' }} onClick={() => setActive(i)}>
              <Sc kind={c.kind} label={c.title} h={140} />
              <Pill soft style={{ marginTop: 14 }}>{c.tag}</Pill>
              <h3 className="wf-h3" style={{ fontSize: 16, marginTop: 8 }}>{c.title}</h3>
              <p className="wf-body" style={{ fontSize: 12, marginTop: 4 }}>{c.who}</p>
              <div style={{ marginTop: 12, fontFamily: 'var(--hand-loose)', fontSize: 18, fontWeight: 700 }}>↑ {c.metric}</div>
            </Box>
          ))}
        </div>
      </div>

      <div style={{ padding: '60px', textAlign: 'center', background: 'var(--paper-soft)' }}>
        <h2 className="wf-h2" style={{ fontSize: 32 }}>Your workflow could be next.</h2>
        <Btn onClick={() => openBuyNow('B')} style={{ marginTop: 18, fontSize: 15, padding: '14px 22px' }}>Start free — 7-day trial →</Btn>
      </div>
    </div>
  );
}

function BlogPage({ onNav, screenshotMode, showAnnotations }) {
  const [openPost, setOpenPost] = React.useState(null);
  const posts = [
    { tag: 'Playbook',  title: 'The 3-prompt creative briefing system',         author: 'Aabhas',  date: 'Apr 18, 2026', read: '6 min' },
    { tag: 'Teardown',  title: 'We analysed 1,200 winning Meta ads. Here\'s the pattern.', author: 'Mira',    date: 'Apr 12, 2026', read: '11 min' },
    { tag: 'Workflow',  title: 'How to brief AI like a senior creative director',  author: 'Devon',  date: 'Apr 03, 2026', read: '5 min' },
    { tag: 'Case',      title: 'From $200 CAC to $74 CAC in 3 weeks',             author: 'Priya',  date: 'Mar 28, 2026', read: '8 min' },
    { tag: 'Industry',  title: 'Why "creative is the new targeting" — and what it costs you',     author: 'Aabhas',  date: 'Mar 21, 2026', read: '7 min' },
    { tag: 'Workflow',  title: 'Our 7-day BFCM sprint, doc by doc',                author: 'Mira',    date: 'Mar 14, 2026', read: '9 min' },
  ];

  const Sc = ({ label, h }) => screenshotMode === 'sketched'
    ? <div className="wf-box" style={{ height: h, padding: 8 }}><MockUI kind="creative" style={{ height: '100%' }} /></div>
    : <div className="wf-img" style={{ height: h }}><span>{screenshotMode === 'labeled' ? `[ ${label} ]` : 'cover'}</span></div>;

  if (openPost !== null) {
    const p = posts[openPost];
    return (
      <div>
        <div style={{ padding: '40px 60px 0' }}>
          <span className="wf-squig" style={{ cursor: 'pointer', fontSize: 13 }} onClick={() => setOpenPost(null)}>← Back to blog</span>
        </div>
        <div style={{ padding: '40px 60px', maxWidth: 760, margin: '0 auto' }}>
          <Pill hl>{p.tag}</Pill>
          <h1 className="wf-h1" style={{ fontSize: 44, marginTop: 16 }}>{p.title}</h1>
          <div className="wf-body" style={{ marginTop: 14, fontSize: 13, color: 'var(--ink-faint)' }}>
            By {p.author} · {p.date} · {p.read} read
          </div>
          <div style={{ marginTop: 28 }}><Sc label={p.title} h={340} /></div>
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[1,2,3,4,5,6,7].map(i => (
              <React.Fragment key={i}>
                <div className="wf-line" style={{ width: '100%' }} />
                <div className="wf-line" style={{ width: '95%' }} />
                <div className="wf-line" style={{ width: '88%' }} />
                <div className="wf-line" style={{ width: '70%', marginBottom: 12 }} />
              </React.Fragment>
            ))}
          </div>
          {showAnnotations && <Note style={{ top: 60, right: -90 }}>article body — copy TBD</Note>}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ padding: '60px 60px 32px', textAlign: 'center' }}>
        <span className="wf-eyebrow">The blog</span>
        <h1 className="wf-h1" style={{ fontSize: 44, marginTop: 8 }}>Field notes from the creative front lines.</h1>
        <p className="wf-body" style={{ maxWidth: 520, margin: '14px auto 0' }}>
          Playbooks, teardowns, and workflows for solo performance marketers.
        </p>
      </div>

      {/* filters / search */}
      <div style={{ padding: '0 60px 32px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div className="wf-field" style={{ flex: 1, minWidth: 200, maxWidth: 320, color: 'var(--ink-faint)' }}>🔍  Search articles…</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['All', 'Playbook', 'Teardown', 'Workflow', 'Case', 'Industry'].map((p, i) => (
            <button key={p} className={`wf-tab ${i === 0 ? 'active' : ''}`}>{p}</button>
          ))}
        </div>
      </div>

      {/* featured */}
      <div style={{ padding: '0 60px 40px' }}>
        <Box style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 0, overflow: 'hidden' }}>
          <div style={{ padding: 32 }}>
            <Pill hl>Featured · {posts[0].tag}</Pill>
            <h2 className="wf-h2" style={{ fontSize: 32, marginTop: 14 }}>{posts[0].title}</h2>
            <p className="wf-body" style={{ marginTop: 10, fontSize: 14 }}>
              <div className="wf-line" style={{ width: '100%', marginBottom: 6 }} />
              <div className="wf-line" style={{ width: '90%' }} />
            </p>
            <div className="wf-body" style={{ marginTop: 16, fontSize: 12, color: 'var(--ink-faint)' }}>
              By {posts[0].author} · {posts[0].date} · {posts[0].read} read
            </div>
            <Btn style={{ marginTop: 20 }} onClick={() => setOpenPost(0)}>Read article →</Btn>
          </div>
          <Sc label={posts[0].title} h={320} />
        </Box>
      </div>

      {/* grid */}
      <div style={{ padding: '0 60px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          {posts.slice(1).map((p, i) => (
            <Box key={i} style={{ padding: 18, cursor: 'pointer' }} onClick={() => setOpenPost(i + 1)}>
              <Sc label={p.title} h={150} />
              <Pill soft style={{ marginTop: 14 }}>{p.tag}</Pill>
              <h3 className="wf-h3" style={{ fontSize: 16, marginTop: 10 }}>{p.title}</h3>
              <div className="wf-body" style={{ marginTop: 8, fontSize: 11, color: 'var(--ink-faint)' }}>
                {p.author} · {p.date} · {p.read}
              </div>
            </Box>
          ))}
        </div>
      </div>

      {/* newsletter */}
      <div style={{ padding: '60px', textAlign: 'center', background: 'var(--paper-soft)' }}>
        <h2 className="wf-h2" style={{ fontSize: 28 }}>Get the playbook every Friday.</h2>
        <p className="wf-body" style={{ marginTop: 8 }}>One email. One workflow. No fluff.</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 18, maxWidth: 420, margin: '18px auto 0' }}>
          <div className="wf-field" style={{ flex: 1, color: 'var(--ink-faint)' }}>your@email.com</div>
          <Btn>Subscribe</Btn>
        </div>
      </div>
    </div>
  );
}

function FabAgentPage({ onNav, showAnnotations }) {
  const [calc, setCalc] = React.useState(50);
  return (
    <div>
      {/* hero */}
      <div style={{ padding: '80px 60px', textAlign: 'center', background: 'var(--paper-soft)', position: 'relative' }}>
        <Pill hl>FabAgent · Affiliate program</Pill>
        <h1 className="wf-h1" style={{ fontSize: 56, marginTop: 18 }}>
          Earn <span className="wf-hl">30% recurring</span> for every signup.
        </h1>
        <p className="wf-body" style={{ maxWidth: 560, margin: '16px auto 0', fontSize: 15 }}>
          Built for creators, consultants, and communities serving performance marketers.
          Your audience saves time. You earn lifetime revenue.
        </p>
        <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center', gap: 12 }}>
          <Btn style={{ fontSize: 15, padding: '14px 22px' }}>Apply to FabAgent →</Btn>
          <Btn variant="outline">See payout terms</Btn>
        </div>
        {showAnnotations && <Note style={{ top: 30, right: 60 }}>separate audience — own page tone</Note>}
      </div>

      {/* stats strip */}
      <div style={{ padding: '40px 60px', borderBottom: '1.5px dashed var(--ink-faint)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 24, textAlign: 'center' }}>
          {[
            ['30%',   'Recurring commission'],
            ['90 days','Cookie window'],
            ['$0',    'Payout minimum'],
            ['Lifetime','Customer attribution'],
          ].map(([n, l], i) => (
            <div key={i}>
              <div style={{ fontFamily: 'var(--hand-loose)', fontSize: 44, fontWeight: 700 }}>{n}</div>
              <div className="wf-body" style={{ fontSize: 12, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* how it works */}
      <div style={{ padding: '80px 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <h2 className="wf-h2" style={{ fontSize: 32 }}>How FabAgent works</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 24 }}>
          {[
            ['Apply',     'Tell us about your audience.'],
            ['Get approved', 'We review within 48h.'],
            ['Share',     'Use your unique referral link.'],
            ['Earn',      '30% MRR for the customer\'s lifetime.'],
          ].map(([t, d], i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ width: 44, height: 44, border: '2px solid var(--ink)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--hand-loose)', fontSize: 22, fontWeight: 700 }}>
                {i + 1}
              </div>
              <h3 className="wf-h3">{t}</h3>
              <p className="wf-body" style={{ fontSize: 13 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* earnings calculator */}
      <div style={{ padding: '60px', background: 'var(--paper-soft)' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <h2 className="wf-h2" style={{ fontSize: 32, textAlign: 'center' }}>Calculate your earnings</h2>
          <p className="wf-body" style={{ textAlign: 'center', marginTop: 8 }}>
            Drag the slider. Watch the math.
          </p>

          <Box style={{ padding: 32, marginTop: 28 }}>
            <div className="wf-body" style={{ fontSize: 13, marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span>Customers you refer per month</span>
              <span style={{ fontFamily: 'var(--hand-loose)', fontSize: 22, fontWeight: 700 }}>{calc}</span>
            </div>
            <input
              type="range"
              min={1} max={500} value={calc}
              onChange={(e) => setCalc(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#1a1a1a' }}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 24 }}>
              <Box soft style={{ padding: 18, textAlign: 'center' }}>
                <div className="wf-body" style={{ fontSize: 12 }}>Month 1</div>
                <div style={{ fontFamily: 'var(--hand-loose)', fontSize: 32, fontWeight: 700, marginTop: 4 }}>${(calc * 15).toLocaleString()}</div>
              </Box>
              <Box soft style={{ padding: 18, textAlign: 'center', background: 'var(--highlight-soft)' }}>
                <div className="wf-body" style={{ fontSize: 12 }}>Month 12 (recurring)</div>
                <div style={{ fontFamily: 'var(--hand-loose)', fontSize: 32, fontWeight: 700, marginTop: 4 }}>${(calc * 15 * 12 * 0.7).toLocaleString()}</div>
              </Box>
              <Box soft style={{ padding: 18, textAlign: 'center' }}>
                <div className="wf-body" style={{ fontSize: 12 }}>Year 1 cumulative</div>
                <div style={{ fontFamily: 'var(--hand-loose)', fontSize: 32, fontWeight: 700, marginTop: 4 }}>${(calc * 15 * 78 * 0.7).toLocaleString()}</div>
              </Box>
            </div>
            <div className="wf-micro" style={{ textAlign: 'center', marginTop: 12 }}>Estimates based on avg $50/mo plan, 30% commission, 70% Y1 retention.</div>
          </Box>
        </div>
      </div>

      {/* who's a fit */}
      <div style={{ padding: '80px 60px' }}>
        <h2 className="wf-h2" style={{ fontSize: 32, textAlign: 'center', marginBottom: 40 }}>Who's a fit?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          {[
            ['🎙', 'Creators & influencers', 'Marketing podcasts, YouTubers, newsletter writers.'],
            ['💼', 'Consultants & agencies', 'Recommend tools your clients actually use.'],
            ['🤝', 'Communities',            'Slack/Discord groups, Twitter circles.'],
          ].map(([icon, t, d], i) => (
            <Box key={i} style={{ padding: 24 }}>
              <div style={{ fontSize: 28 }}>{icon}</div>
              <h3 className="wf-h3" style={{ marginTop: 10, fontSize: 17 }}>{t}</h3>
              <p className="wf-body" style={{ marginTop: 6, fontSize: 13 }}>{d}</p>
            </Box>
          ))}
        </div>
      </div>

      {/* final CTA */}
      <div style={{ padding: '80px 60px', textAlign: 'center', background: 'var(--paper-soft)' }}>
        <h2 className="wf-h2" style={{ fontSize: 36 }}>Ready when you are.</h2>
        <Btn style={{ marginTop: 20, fontSize: 15, padding: '14px 22px' }}>Apply to FabAgent →</Btn>
        <div className="wf-micro" style={{ marginTop: 10 }}>Most applications reviewed within 48 hours.</div>
      </div>
    </div>
  );
}

function LoginPage({ onNav, showAnnotations }) {
  const [mode, setMode] = React.useState('signin'); // signin | reset

  if (mode === 'reset') {
    return (
      <div style={{ padding: '80px 24px', display: 'flex', justifyContent: 'center', minHeight: '70vh' }}>
        <Box style={{ width: 420, padding: 32 }}>
          <h2 className="wf-h2" style={{ fontSize: 26 }}>Reset your password</h2>
          <p className="wf-body" style={{ marginTop: 8 }}>We'll email you a reset link.</p>
          <div style={{ marginTop: 18 }}>
            <label style={{ fontSize: 11, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Email</label>
            <div className="wf-field" style={{ marginTop: 4 }}>you@brand.com</div>
          </div>
          <Btn style={{ width: '100%', marginTop: 18 }}>Send reset link</Btn>
          <div style={{ textAlign: 'center', marginTop: 14, fontSize: 12 }}>
            <span className="wf-squig" style={{ cursor: 'pointer' }} onClick={() => setMode('signin')}>← Back to sign in</span>
          </div>
        </Box>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 24px', display: 'flex', justifyContent: 'center', minHeight: '70vh' }}>
      <Box style={{ width: 420, padding: 32, position: 'relative' }}>
        <h2 className="wf-h2" style={{ fontSize: 26 }}>Welcome back.</h2>
        <p className="wf-body" style={{ marginTop: 8, fontSize: 13 }}>Sign in to your fabfunnel.ai account.</p>

        <button className="wf-google-btn" style={{ marginTop: 20 }}>
          <span style={{ width: 14, height: 14, border: '1.5px solid var(--ink)', borderRadius: '50%', display: 'inline-block' }} />
          Continue with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0', color: 'var(--ink-faint)', fontSize: 11 }}>
          <div style={{ flex: 1, borderTop: '1.5px dashed var(--ink-faint)' }} /> or <div style={{ flex: 1, borderTop: '1.5px dashed var(--ink-faint)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <label style={{ fontSize: 11, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Email</label>
            <div className="wf-field" style={{ marginTop: 4 }}>you@brand.com</div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <label style={{ fontSize: 11, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Password</label>
              <span className="wf-squig" style={{ fontSize: 11, cursor: 'pointer' }} onClick={() => setMode('reset')}>Forgot?</span>
            </div>
            <div className="wf-field" style={{ marginTop: 4, color: 'var(--ink-faint)' }}>••••••••</div>
          </div>
        </div>

        <Btn style={{ width: '100%', marginTop: 18 }} onClick={() => onNav('dashboard')}>Sign in</Btn>

        <div style={{ textAlign: 'center', marginTop: 18, fontSize: 13 }}>
          New here? <span className="wf-squig" style={{ cursor: 'pointer' }} onClick={() => onNav('home')}>Start your free trial →</span>
        </div>

        {showAnnotations && <Note style={{ top: -14, right: -100 }}>quiet text link from nav</Note>}
      </Box>
    </div>
  );
}

Object.assign(window, { UseCasesPage, BlogPage, FabAgentPage, LoginPage });
