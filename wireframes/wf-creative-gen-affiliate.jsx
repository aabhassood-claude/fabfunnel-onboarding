// ─────────────────────────────────────────────────────────────
// Creative Gen — Affiliate variant
// Renders inside <CreativeGen /> when profile === 'affiliate'
// Sketchy wireframe vibe — Genie + Concepts + Approach
// ─────────────────────────────────────────────────────────────

function CreativeGenAffiliate({ media }) {
  const [category, setCategory]     = React.useState('Home Insurance');
  const [refBrands, setRefBrands]   = React.useState(['Bewakoof', 'Glowskin', 'Apple', 'Google', 'Amalfa', 'Zacz']);
  const [includeWinners, setIW]     = React.useState(true);
  const [research, setResearch]     = React.useState(new Set(['reddit', 'trending']));
  const [conceptTab, setConceptTab] = React.useState('fresh');
  const [conceptSel, setConceptSel] = React.useState(0);
  const [apprTab, setApprTab]       = React.useState('templates');
  const [apprSel, setApprSel]       = React.useState(0);

  const toggleResearch = (k) => {
    const next = new Set(research);
    next.has(k) ? next.delete(k) : next.add(k);
    setResearch(next);
  };

  const removeBrand = (b) => setRefBrands(refBrands.filter(x => x !== b));

  const Eyebrow = ({ children, hint }) => (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
      <span className="wf-eyebrow">{children}</span>
      {hint && <span className="wf-micro">{hint}</span>}
    </div>
  );

  const SegPill = ({ active, onClick, children }) => (
    <button onClick={onClick} style={{
      padding: '6px 16px', borderRadius: 999, border: 'none',
      background: active ? 'var(--ink)' : 'transparent',
      color: active ? 'var(--paper)' : 'var(--ink-soft)',
      fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--hand)',
    }}>{children}</button>
  );

  const ResearchPill = ({ id, icon, children }) => {
    const active = research.has(id);
    return (
      <button onClick={() => toggleResearch(id)} className={`wf-pill ${active ? 'wf-pill-hl' : ''}`} style={{
        cursor: 'pointer', textTransform: 'none', fontSize: 12, padding: '7px 14px',
        background: active ? 'var(--ink)' : 'transparent',
        color: active ? 'var(--paper)' : 'var(--ink-soft)',
        border: '1.5px solid var(--ink)',
        gap: 6,
      }}>
        <span>{icon}</span>{children}
      </button>
    );
  };

  // Page name + static thumbs (winner ad cards)
  const winnerCards = [
    { glyph: 'frame'  },
    { glyph: 'pill'   },
    { glyph: 'house'  },
    { glyph: 'house2' },
    { glyph: 'doc'    },
  ];

  const conceptCards = [
    { title: 'MEDICARE FOR YOUNG MEDICARES', label: 'Luxury Lifestyle' },
    { title: 'MEDICARE FOR YUNGS',           label: 'Luxury Lifestyle' },
    { title: 'MEDICARE FOR YUNGS',           label: 'Luxury Lifestyle' },
    { title: 'PROVIDERS ADHERENCE',          label: 'Luxury Lifestyle' },
  ];

  const approachCards = [
    { title: 'Summer sale',           tags: ['Flat sale', 'E-commerce'], glyph: 'shoe' },
    { title: 'Luxury Perfume Launch', tags: ['New arrival', 'Luxury'],   glyph: 'no5'  },
    { title: 'End Season Clearance',  tags: ['Clearance', 'Sale'],       glyph: 'tee'  },
    { title: 'Limited Edition Watch', tags: ['Limited edition'],         glyph: 'watch'},
  ];

  return (
    <React.Fragment>

      {/* Genie title */}
      <div style={{ marginBottom: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>✦</span>
          <span className="wf-h1" style={{ fontSize: 20 }}>Genie</span>
        </div>
        <div className="wf-body" style={{ fontSize: 13, marginTop: 4, color: 'var(--ink-soft)' }}>
          Add URLs for research, competitor pages, landing pages, etc.
        </div>
      </div>

      {/* Genie card */}
      <Box style={{ padding: 22 }}>

        {/* Category */}
        <Eyebrow>Category</Eyebrow>
        <div style={{ position: 'relative', marginBottom: 18 }}>
          <select className="wf-field" value={category} onChange={(e) => setCategory(e.target.value)} style={{
            width: '100%', padding: '10px 36px 10px 38px', fontSize: 14,
            background: 'var(--paper)', fontFamily: 'var(--hand)',
            appearance: 'none', cursor: 'pointer', color: 'var(--ink)', boxSizing: 'border-box',
          }}>
            <option>Home Insurance</option>
            <option>Auto Insurance</option>
            <option>Life Insurance</option>
            <option>Personal Loans</option>
            <option>Credit Cards</option>
          </select>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--ink-faint)', fontSize: 13 }}>🔍</span>
          <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--ink-faint)', fontSize: 10 }}>▼</span>
        </div>

        {/* Reference brands */}
        <Eyebrow>Reference brands</Eyebrow>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
          {refBrands.map(b => (
            <span key={b} className="wf-pill" style={{ textTransform: 'none', fontSize: 12, gap: 6 }}>
              {b}
              <button onClick={() => removeBrand(b)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 11, color: 'var(--ink-faint)', padding: 0, lineHeight: 1 }}>×</button>
            </span>
          ))}
          <button className="wf-pill" style={{
            textTransform: 'none', fontSize: 12, cursor: 'pointer',
            border: '1.5px dashed var(--ink-faint)', background: 'transparent', color: 'var(--ink-soft)',
          }}>+ Add brand</button>
        </div>

        {/* Include Winner Ads */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <input type="checkbox" checked={includeWinners} onChange={(e) => setIW(e.target.checked)} style={{ accentColor: 'var(--ink)', cursor: 'pointer', width: 14, height: 14 }} />
          <span className="wf-body" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>Include Winner Ads</span>
          <span className="wf-micro">({winnerCards.length} selected)</span>
        </div>

        {includeWinners && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 10, marginBottom: 18 }}>
            {winnerCards.map((c, i) => (
              <div key={i} className="wf-box-soft" style={{ padding: 10, background: 'var(--paper)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div className="wf-body" style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)' }}>Page name</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span className="wf-pill" style={{ fontSize: 9, padding: '2px 6px', textTransform: 'none' }}>STATIC</span>
                    <span style={{ fontSize: 11, color: 'var(--ink-faint)' }}>📌</span>
                  </div>
                </div>
                <div style={{
                  height: 80, border: '1.5px dashed var(--ink-faint)', borderRadius: 4,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--paper-soft)', marginBottom: 6,
                }}>
                  <WinnerGlyph kind={c.glyph} />
                </div>
                <div className="wf-micro" style={{ fontSize: 10, fontStyle: 'italic' }}>"The more I eat the…"</div>
              </div>
            ))}
          </div>
        )}

        {/* Research enrichment */}
        <Eyebrow>Research enrichment</Eyebrow>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <ResearchPill id="reddit"     icon="🔴">Reddit Pain Points</ResearchPill>
          <ResearchPill id="trending"   icon="📈">Trending Articles</ResearchPill>
          <ResearchPill id="market"     icon="📊">Market Signals</ResearchPill>
          <ResearchPill id="competitor" icon="🎯">Competitor Angles</ResearchPill>
        </div>
      </Box>

      {/* Concepts card */}
      <Box style={{ padding: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14 }}>💡</span>
            <span className="wf-eyebrow">Concepts</span>
          </div>
          <Box soft style={{ display: 'flex', gap: 4, padding: 4, borderRadius: 999 }}>
            <SegPill active={conceptTab === 'saved'}  onClick={() => setConceptTab('saved')}>Saved</SegPill>
            <SegPill active={conceptTab === 'fresh'}  onClick={() => setConceptTab('fresh')}>Fresh AI start</SegPill>
            <SegPill active={conceptTab === 'custom'} onClick={() => setConceptTab('custom')}>Custom</SegPill>
          </Box>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
          {conceptCards.map((c, i) => {
            const active = conceptSel === i;
            return (
              <div key={i} onClick={() => setConceptSel(i)} className={active ? 'wf-box' : 'wf-box-soft'} style={{ padding: 0, cursor: 'pointer', overflow: 'hidden', borderWidth: active ? 2 : 1.5 }}>
                <div style={{
                  height: 130, background: `linear-gradient(135deg, oklch(0.${4 + i} 0 0), oklch(0.${2 + i} 0 0))`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12,
                }}>
                  <div style={{
                    fontFamily: 'var(--hand-loose)', fontSize: 14, fontWeight: 800,
                    color: 'var(--paper)', textAlign: 'center', lineHeight: 1.15, letterSpacing: 0.5,
                  }}>{c.title}</div>
                </div>
                <div style={{ padding: 12 }}>
                  <div className="wf-body" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{c.label}</div>
                  <div className="wf-micro" style={{ fontSize: 11, marginTop: 4, lineHeight: 1.4 }}>
                    Premium setting with rich textures — velvet, gold accents.
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                    <Pill soft style={{ fontSize: 9 }}>Deep mood</Pill>
                    <Pill soft style={{ fontSize: 9 }}>Dramatic</Pill>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Box>

      {/* Approach card */}
      <Box style={{ padding: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14 }}>🎯</span>
            <span className="wf-eyebrow">Approach</span>
            <Pill soft style={{ fontSize: 9 }}>1 selected</Pill>
          </div>
          <Box soft style={{ display: 'flex', gap: 4, padding: 4, borderRadius: 999 }}>
            <SegPill active={apprTab === 'templates'} onClick={() => setApprTab('templates')}>Templates</SegPill>
            <SegPill active={apprTab === 'fresh'}     onClick={() => setApprTab('fresh')}>Fresh AI start</SegPill>
          </Box>
        </div>

        {/* Search + filters */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 140px', gap: 10, marginBottom: 14 }}>
          <div style={{ position: 'relative' }}>
            <input className="wf-field" placeholder="Search by name, Angle, tag..." style={{
              width: '100%', boxSizing: 'border-box',
              padding: '10px 14px 10px 36px', fontSize: 13,
              fontFamily: 'var(--hand)', color: 'var(--ink)', outline: 'none',
            }} />
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--ink-faint)', fontSize: 12 }}>🔍</span>
          </div>
          <div style={{ position: 'relative' }}>
            <select className="wf-field" style={{
              width: '100%', boxSizing: 'border-box',
              padding: '10px 30px 10px 14px', fontSize: 13,
              background: 'var(--paper)', fontFamily: 'var(--hand)',
              appearance: 'none', cursor: 'pointer', color: 'var(--ink)',
            }}>
              <option>Issue</option>
            </select>
            <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--ink-faint)', fontSize: 9 }}>▼</span>
          </div>
          <div style={{ position: 'relative' }}>
            <select className="wf-field" style={{
              width: '100%', boxSizing: 'border-box',
              padding: '10px 30px 10px 14px', fontSize: 13,
              background: 'var(--paper)', fontFamily: 'var(--hand)',
              appearance: 'none', cursor: 'pointer', color: 'var(--ink)',
            }}>
              <option>Angle</option>
            </select>
            <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--ink-faint)', fontSize: 9 }}>▼</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
          {approachCards.map((c, i) => {
            const active = apprSel === i;
            return (
              <div key={i} onClick={() => setApprSel(i)} className={active ? 'wf-box' : 'wf-box-soft'} style={{ padding: 0, cursor: 'pointer', overflow: 'hidden', borderWidth: active ? 2 : 1.5 }}>
                <div style={{
                  height: 130, background: `linear-gradient(135deg, oklch(0.${5 + i} 0 0), oklch(0.${3 + i} 0 0))`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ApproachGlyph kind={c.glyph} />
                </div>
                <div style={{ padding: 12 }}>
                  <div className="wf-body" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{c.title}</div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                    {c.tags.map(t => <Pill key={t} soft style={{ fontSize: 9 }}>{t}</Pill>)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Box>

    </React.Fragment>
  );
}

// ── Glyphs for winner ad thumbnails ──
function WinnerGlyph({ kind }) {
  const stroke = 'var(--ink-soft)';
  if (kind === 'frame') return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <rect x="6" y="9" width="26" height="20" stroke={stroke} strokeWidth="1.5" />
      <path d="M6 24 L14 18 L20 22 L28 14 L32 18" stroke={stroke} strokeWidth="1.5" fill="none" />
      <circle cx="13" cy="15" r="2" stroke={stroke} strokeWidth="1.4" />
    </svg>
  );
  if (kind === 'pill') return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <rect x="9" y="9" width="20" height="20" rx="10" transform="rotate(45 19 19)" stroke={stroke} strokeWidth="1.5" />
      <path d="M14 24 L24 14" stroke={stroke} strokeWidth="1.5" />
    </svg>
  );
  if (kind === 'house' || kind === 'house2') return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <path d="M19 8 L7 18 L7 30 L31 30 L31 18 Z" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="16" y="22" width="6" height="8" stroke={stroke} strokeWidth="1.4" />
    </svg>
  );
  if (kind === 'doc') return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <path d="M11 7 L24 7 L28 11 L28 31 L11 31 Z" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M24 7 L24 11 L28 11" stroke={stroke} strokeWidth="1.4" />
      <path d="M15 17 L24 17 M15 21 L24 21 M15 25 L21 25" stroke={stroke} strokeWidth="1.3" />
    </svg>
  );
  return null;
}

// ── Glyphs for approach template cards ──
function ApproachGlyph({ kind }) {
  if (kind === 'shoe') return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <path d="M14 50 Q14 38 26 36 L40 28 L52 30 Q60 32 64 40 L68 50 L66 56 L14 56 Z"
        stroke="var(--paper)" strokeWidth="2" strokeLinejoin="round" fill="none" />
      <path d="M40 28 L42 36 M48 30 L50 38" stroke="var(--paper)" strokeWidth="1.5" />
    </svg>
  );
  if (kind === 'no5') return (
    <div style={{ fontFamily: 'var(--serif), serif', fontSize: 42, fontWeight: 300, color: 'var(--paper)', letterSpacing: 1 }}>N°5</div>
  );
  if (kind === 'tee') return (
    <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
      <path d="M22 18 L14 24 L18 32 L24 28 V58 H46 V28 L52 32 L56 24 L48 18 L42 21 Q35 24 28 21 Z"
        stroke="var(--paper)" strokeWidth="2" strokeLinejoin="round" fill="none" />
    </svg>
  );
  if (kind === 'watch') return (
    <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
      <rect x="18" y="28" width="24" height="30" rx="4" stroke="var(--paper)" strokeWidth="2" fill="none" />
      <path d="M24 28 L24 18 L36 18 L36 28 M24 58 L24 68 L36 68 L36 58" stroke="var(--paper)" strokeWidth="2" />
      <circle cx="30" cy="43" r="2" fill="var(--paper)" />
      <path d="M30 43 L30 36 M30 43 L34 43" stroke="var(--paper)" strokeWidth="1.5" />
    </svg>
  );
  return null;
}

window.CreativeGenAffiliate = CreativeGenAffiliate;
