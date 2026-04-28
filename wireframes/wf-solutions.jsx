// ─────────────────────────────────────────────────────────────
// Solutions — Creative Generation, Industry Insights, Video Sage
// Each gets its own product page.
// ─────────────────────────────────────────────────────────────

const SOLUTIONS = [
  {
    id: 'creative',
    name: 'Creative Generation',
    tag: 'Genie · Creative',
    tagline: 'AI-powered ad creatives, on demand.',
    blurb: 'Static and motion ad variants generated from a single brief — brand-locked, export-ready.',
    icon: '✦',
    kind: 'creative',
    bullets: [
      'Static + motion in one prompt',
      'Brand-locked outputs (logo, colors, type)',
      'Export native to Meta / TikTok / Google',
      'A/B variant generation built in',
    ],
    sections: [
      { h: 'From brief to ad in <10 minutes', p: 'Type the angle. Pick the format. Get 12 variants. Iterate.' },
      { h: 'Locked to your brand', p: 'Upload guidelines once. Every output respects them — fonts, palette, logo placement.' },
      { h: 'Built for testing volume', p: 'Generate 50 variants on Friday, ship 5 winners on Monday.' },
    ],
    metric: ['12 variants', 'in <1 hour'],
  },
  {
    id: 'insights',
    name: 'Industry Insights',
    tag: 'Insights',
    tagline: 'The competitive intelligence layer for performance marketers.',
    blurb: 'Save, organise, and reference winning ads from across your industry. Stop screenshotting into Notion.',
    icon: '⊞',
    kind: 'insights',
    bullets: [
      'Build folders by brand, angle, or campaign',
      'Shared boards on Team plan',
      'Filter by platform, format, hook type',
      'Annotate ads with team notes',
    ],
    sections: [
      { h: 'Your swipe file, but smart', p: 'Drop in a Meta library URL. We pull the ad + metadata, you organise.' },
      { h: 'Pattern recognition built in', p: 'Tag hooks, angles, and CTAs — surface what\'s actually working in your category.' },
      { h: 'From insight to brief in one click', p: 'Send a saved ad straight into Creative Generation as inspiration.' },
    ],
    metric: ['1,200+', 'ads tracked'],
  },
  {
    id: 'video',
    name: 'Video Sage',
    tag: 'Genie · Video',
    tagline: 'AI video creative assistance.',
    blurb: 'Score hooks. Auto-cut from raw footage. Generate captions and b-roll. The video co-pilot.',
    icon: '▶',
    kind: 'video',
    bullets: [
      'Hook scoring + suggestions',
      'Auto-cut from raw footage',
      'Caption + b-roll generation',
      'Multi-aspect export (9:16, 1:1, 16:9)',
    ],
    sections: [
      { h: 'Hook in the first 3 seconds', p: 'Upload a draft. Get scored hook alternatives ranked by stop-rate prediction.' },
      { h: 'Cut without an editor', p: 'Drop raw UGC. Get tight, captioned, music-ready cuts in three aspect ratios.' },
      { h: 'B-roll on demand', p: 'Need a 2-second product shot? Generate or pull from your library.' },
    ],
    metric: ['3× faster', 'than Premiere'],
  },
];

function getSolution(id) { return SOLUTIONS.find(s => s.id === id) || SOLUTIONS[0]; }

function MegaMenu({ onNav, onClose }) {
  return (
    <div
      onMouseLeave={onClose}
      style={{
        position: 'absolute', top: '100%', left: 0, right: 0,
        background: 'var(--paper)',
        borderTop: '1.5px solid var(--ink)',
        borderBottom: '1.5px solid var(--ink)',
        boxShadow: '0 6px 0 rgba(0,0,0,0.06)',
        padding: '32px 60px',
        zIndex: 20,
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1fr 1fr 1fr', gap: 32 }}>
        <div>
          <div className="wf-eyebrow" style={{ marginBottom: 8 }}>Core 3</div>
          <h3 className="wf-h3" style={{ fontSize: 18 }}>Solutions</h3>
          <p className="wf-body" style={{ fontSize: 12, marginTop: 8 }}>
            Three products. One creative engine.
          </p>
          <div
            onClick={() => { onNav('usecases'); onClose(); }}
            className="wf-squig"
            style={{ marginTop: 14, fontSize: 13, cursor: 'pointer', display: 'inline-block' }}
          >See all use cases →</div>
        </div>
        {SOLUTIONS.map(s => (
          <div
            key={s.id}
            onClick={() => { onNav('sol-' + s.id); onClose(); }}
            style={{
              padding: 16,
              border: '1.5px solid var(--ink-faint)',
              borderRadius: '6px 8px 7px 9px / 7px 6px 9px 8px',
              cursor: 'pointer',
              background: 'var(--paper)',
              transition: 'transform 80ms',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translate(-1px,-1px)'}
            onMouseLeaveCapture={(e) => e.currentTarget.style.transform = 'translate(0,0)'}
          >
            <div style={{ fontFamily: 'var(--hand-loose)', fontSize: 28 }}>{s.icon}</div>
            <h4 className="wf-h3" style={{ fontSize: 15, marginTop: 8 }}>{s.name}</h4>
            <p className="wf-body" style={{ fontSize: 12, marginTop: 6 }}>{s.tagline}</p>
            <div className="wf-squig" style={{ fontSize: 12, marginTop: 10 }}>Learn more →</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SolutionPage({ id, onNav, openBuyNow, screenshotMode, showAnnotations }) {
  const s = getSolution(id);
  const others = SOLUTIONS.filter(x => x.id !== s.id);

  const Sc = ({ kind, label, h }) => screenshotMode === 'sketched'
    ? <div className="wf-box" style={{ height: h, padding: 8 }}><MockUI kind={kind} style={{ height: '100%' }} /></div>
    : <div className="wf-img" style={{ height: h }}><span>{screenshotMode === 'labeled' ? `[ ${label} ]` : label}</span></div>;

  return (
    <div>
      {/* hero */}
      <div style={{ padding: '60px 60px 40px', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <Pill hl>{s.tag}</Pill>
            <h1 className="wf-h1" style={{ fontSize: 52, marginTop: 14, lineHeight: 1.05 }}>{s.tagline}</h1>
            <p className="wf-body" style={{ fontSize: 16, marginTop: 16, maxWidth: 460 }}>{s.blurb}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <Btn onClick={() => openBuyNow('B')} style={{ fontSize: 15, padding: '14px 22px' }}>Start free — 7-day trial →</Btn>
              <Btn variant="outline" onClick={() => onNav('usecases')}>See use cases</Btn>
            </div>
            <div className="wf-micro" style={{ marginTop: 14 }}>No credit card required • Cancel anytime</div>
          </div>
          <div style={{ position: 'relative' }}>
            <Sc kind={s.kind} label={s.name} h={340} />
            {showAnnotations && <Note tilt="r" style={{ top: -10, right: -10 }}>{s.name} hero shot</Note>}
          </div>
        </div>
      </div>

      {/* metric strip */}
      <div style={{ padding: '32px 60px', borderTop: '1.5px dashed var(--ink-faint)', borderBottom: '1.5px dashed var(--ink-faint)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'nowrap', gap: 18, whiteSpace: 'nowrap' }}>
          <span className="wf-eyebrow" style={{ flex: '0 0 auto' }}>Average user ships</span>
          <span style={{ fontFamily: 'var(--hand-loose)', fontSize: 48, fontWeight: 700, lineHeight: 1, flex: '0 0 auto' }}>{s.metric[0]}</span>
          <span className="wf-body" style={{ fontSize: 16, flex: '0 0 auto' }}>{s.metric[1]}</span>
        </div>
      </div>

      {/* feature bullets */}
      <div style={{ padding: '60px' }}>
        <h2 className="wf-h2" style={{ fontSize: 32, textAlign: 'center', marginBottom: 32 }}>What you get</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, maxWidth: 800, margin: '0 auto' }}>
          {s.bullets.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, border: '1.5px solid var(--ink-faint)', borderRadius: 6 }}>
              <Check />
              <span style={{ fontFamily: 'var(--hand)', fontSize: 14 }}>{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* deep sections */}
      <div style={{ padding: '60px', background: 'var(--paper-soft)' }}>
        {s.sections.map((sec, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', marginBottom: i < s.sections.length - 1 ? 64 : 0, direction: i % 2 ? 'rtl' : 'ltr' }}>
            <div style={{ direction: 'ltr' }}>
              <span className="wf-eyebrow">0{i + 1}</span>
              <h3 className="wf-h2" style={{ fontSize: 28, marginTop: 6 }}>{sec.h}</h3>
              <p className="wf-body" style={{ fontSize: 14, marginTop: 10 }}>{sec.p}</p>
            </div>
            <div style={{ direction: 'ltr' }}>
              <Sc kind={s.kind} label={sec.h} h={240} />
            </div>
          </div>
        ))}
      </div>

      {/* cross-sell to other solutions */}
      <div style={{ padding: '60px' }}>
        <h2 className="wf-h2" style={{ fontSize: 28, textAlign: 'center' }}>Pairs with</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 760, margin: '24px auto 0' }}>
          {others.map(o => (
            <Box key={o.id} style={{ padding: 20, cursor: 'pointer' }} onClick={() => onNav('sol-' + o.id)}>
              <div style={{ fontFamily: 'var(--hand-loose)', fontSize: 28 }}>{o.icon}</div>
              <h3 className="wf-h3" style={{ fontSize: 17, marginTop: 8 }}>{o.name}</h3>
              <p className="wf-body" style={{ fontSize: 12, marginTop: 6 }}>{o.tagline}</p>
              <div className="wf-squig" style={{ fontSize: 12, marginTop: 10 }}>Explore →</div>
            </Box>
          ))}
        </div>
      </div>

      {/* final CTA */}
      <div style={{ padding: '80px 60px', textAlign: 'center', background: 'var(--paper-soft)' }}>
        <h2 className="wf-h2" style={{ fontSize: 36 }}>Try {s.name} <span className="wf-hl">free</span> for 7 days.</h2>
        <Btn onClick={() => openBuyNow('B')} style={{ marginTop: 20, fontSize: 15, padding: '14px 22px' }}>Start free → </Btn>
        <div className="wf-micro" style={{ marginTop: 10 }}>No credit card required.</div>
      </div>
    </div>
  );
}

Object.assign(window, { SOLUTIONS, MegaMenu, SolutionPage });
