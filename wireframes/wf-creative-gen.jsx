// ─────────────────────────────────────────────────────────────
// Creative Generation module — sketchy wireframe vibe
// Lives inside the dashboard shell (sidebar nav active = "creative")
// ─────────────────────────────────────────────────────────────

function CreativeGen() {
  const [profile, setProfile]       = React.useState('ecom');
  const [media, setMedia]           = React.useState('image');
  const [creativeType, setCreType]  = React.useState('product');
  const [template, setTemplate]     = React.useState('none');
  const [vision, setVision]         = React.useState('');
  const [vibes, setVibes]           = React.useState(new Set());
  const [advOpen, setAdvOpen]       = React.useState(false);
  const [strategy, setStrategy]     = React.useState(null);
  const [variations, setVariations] = React.useState(1);
  const [customVar, setCustomVar]   = React.useState(15);
  const [showAddBrand, setShowAddBrand] = React.useState(false);
  const [genState, setGenState] = React.useState(null); // null | 'loading' | 'done'
  const [genStep, setGenStep] = React.useState(0);

  const effectiveVariations = variations === 'custom' ? customVar : variations;

  const startGeneration = () => {
    setGenState('loading');
    setGenStep(0);
    const stages = 4;
    const timers = Array.from({ length: stages }, (_, i) =>
      setTimeout(() => setGenStep(i + 1), (i + 1) * 900)
    );
    const done = setTimeout(() => setGenState('done'), stages * 900 + 400);
    // cleanup not needed for prototype
  };

  const toggleVibe = (v) => {
    const next = new Set(vibes);
    next.has(v) ? next.delete(v) : next.add(v);
    setVibes(next);
  };

  const Eyebrow = ({ children, hint, optional }) => (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
      <span className="wf-eyebrow">{children}</span>
      {optional && <Pill soft style={{ fontSize: 9 }}>Optional</Pill>}
      {hint && <span className="wf-micro">{hint}</span>}
    </div>
  );

  const TogglePill = ({ active, onClick, children, icon }) => (
    <button
      onClick={onClick}
      className={`wf-pill ${active ? 'wf-pill-hl' : ''}`}
      style={{ cursor: 'pointer', textTransform: 'none', fontSize: 12, padding: '6px 14px', gap: 6, border: active ? '1.5px solid var(--ink)' : '1.5px solid transparent', background: active ? 'var(--ink)' : 'transparent', color: active ? 'var(--paper)' : 'var(--ink-soft)' }}
    >
      {icon && <span style={{ fontSize: 12 }}>{icon}</span>}
      {children}
    </button>
  );

  const CT = ({ id, title, sub, iconKind }) => {
    const active = creativeType === id;
    return (
      <div
        onClick={() => setCreType(id)}
        className={active ? 'wf-box' : 'wf-box-soft'}
        style={{ minWidth: 0, padding: 16, cursor: 'pointer', background: active ? 'var(--paper-soft)' : 'var(--paper)' }}
      >
        <div className="wf-icon" style={{ marginBottom: 12 }}>
          <CreativeIcon kind={iconKind} />
        </div>
        <div className="wf-body" style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{title}</div>
        <div className="wf-micro" style={{ marginTop: 4 }}>{sub}</div>
      </div>
    );
  };

  const Template = ({ id, label, glyph }) => {
    const active = template === id;
    return (
      <div onClick={() => setTemplate(id)} style={{ width: 124, flexShrink: 0, cursor: 'pointer' }}>
        <div className={active ? 'wf-box' : 'wf-box-soft'} style={{
          height: 110,
          background: id === 'none' ? 'var(--paper)' : 'var(--paper-soft)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 6, position: 'relative',
          borderWidth: active ? 2 : 1.5,
        }}>
          {id === 'none'
            ? <div className="wf-body" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', textAlign: 'center', lineHeight: 1.3 }}>None<br/><span className="wf-micro">generate from scratch</span></div>
            : <TemplateGlyph kind={glyph} />}
        </div>
        <div className="wf-body" style={{ fontSize: 12, color: 'var(--ink)', fontWeight: 700, marginTop: 8, textAlign: 'center' }}>{label}</div>
      </div>
    );
  };

  const StratTile = ({ id, title, sub, glyph }) => {
    const active = strategy === id;
    return (
      <div onClick={() => setStrategy(active ? null : id)}
        className={active ? 'wf-box' : 'wf-box-soft'}
        style={{ minWidth: 0, cursor: 'pointer', padding: 14, background: active ? 'var(--paper-soft)' : 'var(--paper)' }}
      >
        <div style={{
          height: 80, borderRadius: 6,
          background: 'var(--paper-soft)',
          border: '1.5px dashed var(--ink-faint)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 12,
        }}>
          <StrategyGlyph kind={glyph} />
        </div>
        <div className="wf-body" style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{title}</div>
        <div className="wf-micro" style={{ marginTop: 3 }}>{sub}</div>
      </div>
    );
  };

  const VAR_OPTIONS = [1, 5, 10, 'Custom'];

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100%', padding: '24px 28px 100px' }}>

      {/* Top profile + media toggles */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18, flexWrap: 'wrap' }}>
        <Box style={{ display: 'flex', gap: 4, padding: 4, borderRadius: 999 }}>
          <TogglePill active={profile === 'ecom'}      onClick={() => setProfile('ecom')}      icon="🛒">E-com</TogglePill>
          <TogglePill active={profile === 'affiliate'} onClick={() => setProfile('affiliate')} icon="⚡">Affiliate</TogglePill>
        </Box>
        <Box style={{ display: 'flex', gap: 4, padding: 4, borderRadius: 999 }}>
          <TogglePill active={media === 'image'} onClick={() => setMedia('image')} icon="🖼">Image</TogglePill>
          <TogglePill active={media === 'video'} onClick={() => setMedia('video')} icon="🎬">Video</TogglePill>
        </Box>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        {profile === 'affiliate' ? (
          <window.CreativeGenAffiliate media={media} variations={variations} setVariations={setVariations} VAR_OPTIONS={VAR_OPTIONS} />
        ) : (
        <React.Fragment>

        {/* Creative Type */}
        <Box style={{ padding: 22 }}>
          <Eyebrow hint="pick the style of ad you're generating">Creative Type</Eyebrow>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            <CT id="product" iconKind="cube"  title="Product Ads"          sub="Conversion-focused · price, offer, CTA" />
            <CT id="brand"   iconKind="store" title="Brand Ads"            sub="Awareness & style · brand storytelling" />
            <CT id="asset"   iconKind="spark" title="Product Asset Creative" sub="Detail shots · listings, email, PDP" />
          </div>
        </Box>

        {/* Brand select */}
        <Box style={{ padding: 22 }}>
          <Eyebrow hint="which brand is this creative for?">Select your brand</Eyebrow>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <select className="wf-field" style={{
                width: '100%', padding: '10px 36px 10px 14px', fontSize: 14,
                background: 'var(--paper)', fontFamily: 'var(--hand)',
                appearance: 'none', cursor: 'pointer', color: 'var(--ink)',
              }}>
                <option>T · test — 24 products · Apparel</option>
                <option>Aurora Apparel — 41 products · Apparel</option>
                <option>Glow Co. — 18 products · Skincare</option>
              </select>
              <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--ink-faint)', fontSize: 10 }}>▼</span>
            </div>
            <Btn variant="ghost" style={{ whiteSpace: 'nowrap' }} onClick={() => setShowAddBrand(true)}>+ Add new brand</Btn>
          </div>
        </Box>

        {/* Add Brand Modal */}
        {showAddBrand && (
          <div onClick={() => setShowAddBrand(false)} style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(20,20,20,0.45)', backdropFilter: 'blur(2px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
          }}>
            <div onClick={(e) => e.stopPropagation()} style={{
              background: 'var(--paper)', border: '1.5px solid var(--ink)',
              borderRadius: '8px 12px 9px 11px / 10px 8px 12px 9px',
              width: 440, padding: '28px', fontFamily: 'var(--hand)', position: 'relative',
            }}>
              <button onClick={() => setShowAddBrand(false)} className="wf-close" style={{ position: 'absolute', top: 14, right: 14, width: 24, height: 24, fontSize: 12 }}>✕</button>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Add a new brand</h3>
              <p className="wf-body" style={{ fontSize: 12, color: 'var(--ink-faint)', marginBottom: 18 }}>We'll auto-pull products, colors, and branding.</p>

              <div style={{ marginBottom: 14 }}>
                <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 6 }}>Store URL <span style={{ color: 'var(--accent)' }}>*</span></div>
                <input className="wf-field" placeholder="https://yourstore.com" style={{ width: '100%', padding: '10px 12px', fontSize: 13 }} />
                <div className="wf-micro" style={{ marginTop: 4, fontSize: 10 }}>Works with Shopify, WooCommerce, Amazon, and most platforms.</div>
              </div>

              <div style={{ marginBottom: 18 }}>
                <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 6 }}>Brand name <span style={{ fontWeight: 400, color: 'var(--ink-faint)' }}>optional — we'll detect</span></div>
                <input className="wf-field" placeholder="e.g., Aurora Apparel" style={{ width: '100%', padding: '10px 12px', fontSize: 13 }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <Btn variant="ghost" onClick={() => setShowAddBrand(false)}>Cancel</Btn>
                <Btn onClick={() => setShowAddBrand(false)}>Analyze & Add →</Btn>
              </div>
            </div>
          </div>
        )}

        {/* Use a template */}
        <Box style={{ padding: 22 }}>
          <Eyebrow hint="start from a proven reference" optional>Use a template</Eyebrow>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
            <Template id="none"      label="None" />
            <Template id="hero"      label="Product Hero" glyph="tee" />
            <Template id="social"    label="Social Proof" glyph="star" />
            <Template id="ba"        label="Before/After" glyph="ba" />
            <Template id="story"     label="Brand Story" glyph="figs" />
            <Template id="lifestyle" label="Lifestyle"   glyph="cube" />
            <Template id="ugc"       label="UGC"         glyph="phone" />
          </div>
          <div style={{ marginTop: 14 }}>
            <Btn variant="link" style={{ fontSize: 13 }}>Browse all templates →</Btn>
          </div>
        </Box>

        {/* Describe your vision — prominent prompt area */}
        <Box style={{ padding: 0, overflow: 'hidden', border: '2px solid var(--ink)' }}>
          <div style={{ padding: '16px 22px 12px', background: 'var(--highlight-soft)', borderBottom: '1.5px solid var(--ink)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>✦</span>
              <Eyebrow hint="add any specific ideas — or let Genie decide." optional>Describe your vision</Eyebrow>
            </div>
          </div>
          <div style={{ padding: '18px 22px 22px' }}>
            <textarea
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              placeholder="e.g., Summer vibes, people laughing on a beach, warm colors..."
              rows={4}
              className="wf-field"
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '14px 16px', fontSize: 15, lineHeight: 1.5,
                fontFamily: 'var(--hand)', color: 'var(--ink)', resize: 'vertical', outline: 'none',
                border: '1.5px dashed var(--ink-faint)', borderRadius: 6,
                background: 'var(--paper)',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
              <span className="wf-micro">Quick vibes:</span>
              {['Product Focus', 'Lifestyle', 'UGC Style', 'Offer Highlight', 'Bold'].map(v => {
                const active = vibes.has(v);
                return (
                  <button key={v} onClick={() => toggleVibe(v)} className={`wf-pill ${active ? 'wf-pill-hl' : ''}`} style={{ cursor: 'pointer', textTransform: 'none', fontSize: 12 }}>
                    {v}
                  </button>
                );
              })}
            </div>
          </div>
        </Box>

        {/* Advanced Options */}
        <Box style={{ padding: 0, overflow: 'hidden' }}>
          <div onClick={() => setAdvOpen(o => !o)} style={{
            padding: '18px 22px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 14 }}>⚙</span>
              <span className="wf-body" style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>Advanced Options</span>
              <span className="wf-micro">— strategy, video settings, research</span>
            </div>
            <span style={{ color: 'var(--ink-faint)', fontSize: 11, transform: advOpen ? 'rotate(180deg)' : 'none', transition: 'transform 140ms' }}>▼</span>
          </div>

          {advOpen && (
            <div style={{ padding: '0 22px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, marginTop: 4 }}>
                <span className="wf-body" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>📋 Strategy</span>
                <Pill soft style={{ fontSize: 9 }}>Optional</Pill>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
                <StratTile id="ba"       title="Before / After" sub="Show transformation."   glyph="people" />
                <StratTile id="social"   title="Social Proof"   sub="Builds trust fast."     glyph="star" />
                <StratTile id="urgency"  title="Urgency"        sub="Promos & launches."     glyph="clock" />
              </div>

              <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1.5px dashed var(--ink-faint)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="wf-body" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>🔍 Research enrichment</span>
                  <Pill soft style={{ fontSize: 9 }}>Optional</Pill>
                </div>
                <p className="wf-body" style={{ fontSize: 13, marginTop: 6 }}>Add extra context to help Genie match your tone.</p>
              </div>

              {media === 'video' && (
                <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1.5px dashed var(--ink-faint)' }}>
                  <div className="wf-body" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>🎬 Video settings</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
                    {[['Duration', '15s'], ['Aspect', '9:16'], ['Captions', 'On']].map(([k, v]) => (
                      <Box key={k} soft style={{ padding: '8px 12px' }}>
                        <div className="wf-eyebrow">{k}</div>
                        <div className="wf-body" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginTop: 2 }}>{v}</div>
                      </Box>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Box>

        {/* Variations */}
        </React.Fragment>
        )}

        {/* Variations */}
        <Box style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span className="wf-eyebrow">Variations</span>
              <span className="wf-micro">how many to generate</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Box soft style={{ display: 'flex', gap: 4, padding: 4, borderRadius: 999 }}>
                {VAR_OPTIONS.map(v => {
                  const active = variations === v;
                  return (
                    <button key={v} onClick={() => setVariations(v)} style={{
                      padding: '6px 16px', borderRadius: 999, border: 'none',
                      background: active ? 'var(--ink)' : 'transparent',
                      color: active ? 'var(--paper)' : 'var(--ink-soft)',
                      fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--hand)',
                      minWidth: 36,
                    }}>{typeof v === 'string' ? v : v}</button>
                  );
                })}
              </Box>
              {variations === 'Custom' && (
                <input type="number" value={customVar} onChange={(e) => setCustomVar(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                  min="1" max="50"
                  className="wf-field"
                  style={{ width: 64, padding: '6px 10px', fontSize: 14, textAlign: 'center', fontFamily: 'var(--hand)', borderRadius: 999 }}
                />
              )}
            </div>
          </div>
        </Box>

        {/* Summary + Generate */}
        <Box style={{ padding: 22, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
            <span className="wf-body" style={{ fontSize: 13 }}>{media === 'image' ? '🖼 Static Image' : '🎬 Video'}</span>
            <span className="wf-body" style={{ fontSize: 13 }}>{effectiveVariations} output{effectiveVariations > 1 ? 's' : ''}</span>
            <span className="wf-body" style={{ fontSize: 13 }}>{profile === 'ecom' ? 'E-com' : 'Affiliate'}</span>
            <span className="wf-body" style={{ fontSize: 13 }}>{
              creativeType === 'product' ? 'Product Ads' :
              creativeType === 'brand'   ? 'Brand Ads'   : 'Asset Creative'
            }</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span className="wf-body" style={{ fontSize: 13 }}>⚡ Uses {effectiveVariations * (media === 'image' ? 4 : 20)} credits</span>
            <Btn style={{ gap: 8 }} onClick={startGeneration}>✦ Generate →</Btn>
          </div>
        </Box>

        {/* Inline loading */}
        {genState === 'loading' && (
          <Box style={{ padding: 32, textAlign: 'center' }}>
            <div style={{ width: 40, height: 40, border: '2px solid var(--ink)', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
            <h3 className="wf-h2" style={{ fontSize: 18, marginBottom: 6 }}>Generating your creatives…</h3>
            <p className="wf-body" style={{ fontSize: 12, color: 'var(--ink-faint)', marginBottom: 20 }}>Usually takes 15–30 seconds.</p>
            <div style={{ textAlign: 'left', maxWidth: 320, margin: '0 auto' }}>
              {['Reading brand & prompt', 'Applying strategy & style', 'Rendering variations', 'Saving to Library'].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: 12 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', border: '1.5px solid var(--ink)', background: i < genStep ? 'var(--highlight)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700 }}>{i < genStep ? '✓' : ''}</div>
                  <span style={{ color: i < genStep ? 'var(--ink)' : i === genStep ? 'var(--ink)' : 'var(--ink-faint)', fontWeight: i === genStep ? 700 : 400 }}>{s}</span>
                </div>
              ))}
            </div>
          </Box>
        )}

        {/* Results grid */}
        {genState === 'done' && (() => {
          const count = Math.min(effectiveVariations, 10);
          const names = ['Product Hero', 'Lifestyle Shot', 'Ad Creative', 'Social Post', 'Offer Banner', 'UGC Style', 'Before/After', 'Brand Story', 'Email Hero', 'Comparison'];
          const emojis = ['👕', '🏖', '📢', '📱', '🎁', '👥', '⚖️', '✨', '📧', '📊'];
          return (
            <Box style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '18px 22px', borderBottom: '1.5px solid var(--ink-faint)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <h3 className="wf-h2" style={{ fontSize: 18, marginBottom: 2 }}>✦ {count} creatives generated</h3>
                  <span className="wf-body" style={{ fontSize: 12, color: 'var(--ink-faint)' }}>Saved to your Creative Library · click any to preview</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Btn variant="ghost" onClick={() => window.location.hash = 'dashboard'}>🖼 Open Library</Btn>
                  <Btn variant="ghost" onClick={() => { setGenState(null); }}>✦ Generate more</Btn>
                </div>
              </div>
              <div style={{ padding: '18px 22px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
                {Array.from({ length: count }, (_, i) => (
                  <div key={i} style={{ border: '1.5px solid var(--ink-faint)', borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px', overflow: 'hidden', cursor: 'pointer', background: 'var(--paper)' }}>
                    <div style={{ position: 'relative', aspectRatio: '1', background: 'var(--paper-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ position: 'absolute', top: 6, left: 6, padding: '2px 8px', fontSize: 9, fontWeight: 700, border: '1px solid var(--ink)', borderRadius: 8, background: media === 'video' ? 'var(--ink)' : 'var(--paper)', color: media === 'video' ? 'var(--paper)' : 'var(--ink)' }}>{media === 'video' ? '🎬 Video' : '🖼 Image'}</span>
                      <span style={{ position: 'absolute', top: 6, right: 6, padding: '2px 6px', fontSize: 9, fontWeight: 700, background: 'var(--highlight)', borderRadius: 8 }}>NEW</span>
                      <MockUI kind={media === 'video' ? 'video' : 'creative'} style={{ width: '80%', height: '80%' }} />
                    </div>
                    <div style={{ padding: '8px 10px' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{names[i % names.length]} #{i + 1}</div>
                      <div className="wf-micro" style={{ fontSize: 10 }}>just now</div>
                    </div>
                  </div>
                ))}
              </div>
            </Box>
          );
        })()}

      </div>
    </div>
  );
}

// ── Small inline icon helpers ──
function CreativeIcon({ kind }) {
  const stroke = 'var(--ink-soft)';
  if (kind === 'cube') return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2 L17 6 L17 14 L10 18 L3 14 L3 6 Z" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M3 6 L10 10 L17 6 M10 10 L10 18" stroke={stroke} strokeWidth="1.4" />
    </svg>
  );
  if (kind === 'store') return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="8" width="14" height="9" stroke={stroke} strokeWidth="1.4" />
      <path d="M3 8 L4 4 H 16 L17 8" stroke={stroke} strokeWidth="1.4" />
    </svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2 L11.5 8.5 L18 10 L11.5 11.5 L10 18 L8.5 11.5 L2 10 L8.5 8.5 Z" stroke={stroke} strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function TemplateGlyph({ kind }) {
  const stroke = 'var(--ink-faint)';
  const w = 50;
  if (kind === 'tee') return (
    <svg width={w} height={w} viewBox="0 0 50 50" fill="none">
      <path d="M16 12 L10 16 L13 22 L17 19 V40 H33 V19 L37 22 L40 16 L34 12 L29 14 Q25 16 21 14 Z" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
  if (kind === 'star') return (
    <svg width={w} height={w} viewBox="0 0 50 50" fill="none">
      <path d="M25 8 L29 20 L42 21 L32 29 L35 42 L25 35 L15 42 L18 29 L8 21 L21 20 Z" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
  if (kind === 'ba') return (
    <svg width={w} height={w} viewBox="0 0 50 50" fill="none">
      <rect x="8" y="14" width="14" height="22" stroke={stroke} strokeWidth="1.5" />
      <rect x="28" y="14" width="14" height="22" stroke={stroke} strokeWidth="1.5" />
      <text x="15" y="29" fontSize="8" fill={stroke} textAnchor="middle">A</text>
      <text x="35" y="29" fontSize="8" fill={stroke} textAnchor="middle">B</text>
    </svg>
  );
  if (kind === 'figs') return (
    <svg width={w} height={w} viewBox="0 0 50 50" fill="none">
      <circle cx="20" cy="18" r="3.5" stroke={stroke} strokeWidth="1.4" />
      <path d="M14 36 Q14 26 20 26 Q26 26 26 36" stroke={stroke} strokeWidth="1.4" fill="none" />
      <circle cx="32" cy="18" r="3.5" stroke={stroke} strokeWidth="1.4" />
      <path d="M26 36 Q26 26 32 26 Q38 26 38 36" stroke={stroke} strokeWidth="1.4" fill="none" />
    </svg>
  );
  if (kind === 'cube') return (
    <svg width={w} height={w} viewBox="0 0 50 50" fill="none">
      <path d="M25 8 L40 16 L40 32 L25 40 L10 32 L10 16 Z" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 16 L25 24 L40 16 M25 24 L25 40" stroke={stroke} strokeWidth="1.5" />
    </svg>
  );
  if (kind === 'phone') return (
    <svg width={w} height={w} viewBox="0 0 50 50" fill="none">
      <rect x="15" y="8" width="20" height="34" rx="3" stroke={stroke} strokeWidth="1.5" />
      <circle cx="25" cy="38" r="1" fill={stroke} />
    </svg>
  );
  return null;
}

function StrategyGlyph({ kind }) {
  const stroke = 'var(--ink-faint)';
  if (kind === 'people') return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="14" cy="14" r="4" stroke={stroke} strokeWidth="1.5" />
      <circle cx="26" cy="14" r="4" stroke={stroke} strokeWidth="1.5" />
      <path d="M6 30 Q6 22 14 22 Q22 22 22 30" stroke={stroke} strokeWidth="1.5" fill="none" />
      <path d="M18 30 Q18 22 26 22 Q34 22 34 30" stroke={stroke} strokeWidth="1.5" fill="none" />
    </svg>
  );
  if (kind === 'star') return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M20 6 L23 16 L33 17 L25 23 L28 33 L20 27 L12 33 L15 23 L7 17 L17 16 Z" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
  if (kind === 'clock') return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="22" r="11" stroke={stroke} strokeWidth="1.5" />
      <path d="M20 14 L20 22 L26 24" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 8 L11 11 M26 8 L29 11" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
  return null;
}

window.CreativeGen = CreativeGen;
