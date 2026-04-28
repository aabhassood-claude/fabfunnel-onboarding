// ─────────────────────────────────────────────────────────────
// Post-purchase Dashboard wireframe
// ─────────────────────────────────────────────────────────────

function DashboardPage({ onNav, screenshotMode, showAnnotations, initialNav, funnel, trialUpsellStyle, openBuyNow }) {
  const [activeNav, setActiveNav] = React.useState(initialNav || 'home');
  const [showUpsell, setShowUpsell] = React.useState(true);
  const [trialModal, setTrialModal] = React.useState(null);
  const isTrial = funnel === 'trial';
  const upsellStyle = trialUpsellStyle || 'subtle';
  const trialDaysLeft = 6;
  const trialCreditsUsed = 12;
  const trialCreditsTotal = 50;

  // Sync hash → activeNav so #creative deep-links into the module
  React.useEffect(() => {
    if (initialNav) setActiveNav(initialNav);
  }, [initialNav]);

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: '◇' },
    { id: 'genie', label: 'Genie', icon: '✦', isGroup: true, children: [
      { id: 'creative',   label: 'Creative Generation', icon: '✦' },
      { id: 'video',      label: 'Video Sage',          icon: '▶' },
      { id: 'script',     label: 'Script Generation',   icon: '✎' },
    ]},
    { id: 'insights-grp', label: 'Industry Insights', icon: '⊞', isGroup: true, children: [
      { id: 'discover',     label: 'Discover',     icon: '◎' },
      { id: 'intelligence', label: 'Intelligence', icon: '⚡' },
      { id: 'boards',       label: 'Boards',       icon: '▤' },
    ]},
  ];

  // Flat lookup for breadcrumb
  const flatNav = navItems.flatMap(it => it.isGroup ? [it, ...it.children] : [it]);

  // Track which groups are open — open the group containing the active item
  const findParent = (id) => navItems.find(g => g.isGroup && g.children.some(c => c.id === id))?.id;
  const [openGroups, setOpenGroups] = React.useState(() => {
    const set = new Set(['genie', 'insights-grp']);
    const p = findParent(activeNav);
    if (p) set.add(p);
    return set;
  });
  const toggleGroup = (id) => {
    setOpenGroups(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '100vh', background: 'var(--paper-soft)', position: 'relative' }}>

      {/* sidebar */}
      <div style={{ borderRight: '1.5px solid var(--ink)', background: 'var(--paper)', padding: '20px 16px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontFamily: 'var(--hand)', fontSize: 18, fontWeight: 700, padding: '0 8px 16px' }}>
          fabfunnel<span style={{ color: 'var(--ink-faint)' }}>.ai</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navItems.map(it => {
            if (!it.isGroup) {
              return (
                <div key={it.id} onClick={() => {
                  setActiveNav(it.id);
                  if (it.id === 'home') window.location.hash = 'dashboard';
                }}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px',
                    cursor: 'pointer',
                    background: activeNav === it.id ? 'var(--paper-soft)' : 'transparent',
                    border: activeNav === it.id ? '1.5px solid var(--ink)' : '1.5px solid transparent',
                    fontSize: 13,
                    fontFamily: 'var(--hand)',
                    fontWeight: activeNav === it.id ? 700 : 400,
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                  <span style={{ width: 18, textAlign: 'center' }}>{it.icon}</span>
                  {it.label}
                </div>
              );
            }
            const isOpen = openGroups.has(it.id);
            const childActive = it.children.some(c => c.id === activeNav);
            return (
              <div key={it.id}>
                <div onClick={() => toggleGroup(it.id)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontFamily: 'var(--hand)',
                    fontWeight: childActive ? 700 : 500,
                    display: 'flex', alignItems: 'center', gap: 10,
                    color: 'var(--ink)',
                  }}>
                  <span style={{ width: 18, textAlign: 'center' }}>{it.icon}</span>
                  <span style={{ flex: 1 }}>{it.label}</span>
                  <span style={{ fontSize: 9, color: 'var(--ink-faint)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 140ms' }}>▼</span>
                </div>
                {isOpen && (
                  <div style={{ marginLeft: 14, marginTop: 2, paddingLeft: 10, borderLeft: '1.5px dashed var(--ink-faint)', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {it.children.map(c => (
                      <div key={c.id} onClick={() => {
                        setActiveNav(c.id);
                        if (c.id === 'creative') window.location.hash = 'creative';
                      }}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px',
                          cursor: 'pointer',
                          background: activeNav === c.id ? 'var(--paper-soft)' : 'transparent',
                          border: activeNav === c.id ? '1.5px solid var(--ink)' : '1.5px solid transparent',
                          fontSize: 12,
                          fontFamily: 'var(--hand)',
                          fontWeight: activeNav === c.id ? 700 : 400,
                          display: 'flex', alignItems: 'center', gap: 8,
                        }}>
                        <span style={{ width: 14, textAlign: 'center', fontSize: 11, color: 'var(--ink-faint)' }}>{c.icon}</span>
                        {c.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {isTrial ? (
            <Box soft style={{ padding: 12, borderColor: 'var(--ink)' }}>
              <div className="wf-eyebrow" style={{ fontSize: 9 }}>Trial credits</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
                <span style={{ fontFamily: 'var(--hand-loose)', fontSize: 22, fontWeight: 700 }}>{trialCreditsTotal - trialCreditsUsed}</span>
                <span className="wf-body" style={{ fontSize: 11 }}>/ {trialCreditsTotal}</span>
              </div>
              <div style={{ height: 6, background: 'var(--paper-soft)', border: '1px solid var(--ink-faint)', borderRadius: 3, marginTop: 8, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: ((trialCreditsTotal - trialCreditsUsed) / trialCreditsTotal * 100) + '%', background: 'var(--accent)' }} />
              </div>
              <div className="wf-micro" style={{ fontSize: 10, marginTop: 6 }}>{trialDaysLeft} days left in trial</div>
              <button onClick={() => openBuyNow && openBuyNow('A')} style={{
                width: '100%', marginTop: 10,
                padding: '6px 8px',
                background: 'var(--ink)',
                color: 'var(--paper)',
                border: 'none',
                borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px',
                fontFamily: 'var(--hand)', fontSize: 11, fontWeight: 700,
                cursor: 'pointer',
              }}>Upgrade →</button>
            </Box>
          ) : (
            <Box soft style={{ padding: 12 }}>
              <div className="wf-eyebrow" style={{ fontSize: 9 }}>Credits this month</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
                <span style={{ fontFamily: 'var(--hand-loose)', fontSize: 22, fontWeight: 700 }}>62</span>
                <span className="wf-body" style={{ fontSize: 11 }}>/ 100</span>
              </div>
              <div style={{ height: 6, background: 'var(--paper-soft)', border: '1px solid var(--ink-faint)', borderRadius: 3, marginTop: 8, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '62%', background: 'var(--highlight)' }} />
              </div>
              <div className="wf-micro" style={{ fontSize: 10, marginTop: 6 }}>Resets in 12 days</div>
            </Box>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px' }}>
            <div style={{ width: 28, height: 28, border: '1.5px solid var(--ink)', borderRadius: '50%' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700 }}>You</div>
              <div className="wf-micro" style={{ fontSize: 10 }}>Individual</div>
            </div>
            <span style={{ fontSize: 14, color: 'var(--ink-faint)' }}>⋯</span>
          </div>
        </div>
      </div>

      {/* main */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>

        {/* TRIAL banner — only when funnel=='trial' */}
        {isTrial && window.TrialBanner && (
          <window.TrialBanner
            style={upsellStyle}
            daysLeft={trialDaysLeft}
            creditsUsed={trialCreditsUsed}
            creditsTotal={trialCreditsTotal}
            onUpgrade={() => openBuyNow && openBuyNow('A')}
          />
        )}

        {/* top bar — breadcrumb only */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 28px', borderBottom: '1.5px dashed var(--ink-faint)', background: 'var(--paper)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="wf-body" style={{ fontSize: 12, color: 'var(--ink-faint)' }}>Dashboard</span>
            <span className="wf-body" style={{ fontSize: 12, color: 'var(--ink-faint)' }}>›</span>
            <span style={{ fontSize: 13, fontWeight: 700 }}>{flatNav.find(n => n.id === activeNav)?.label || 'Dashboard'}</span>
          </div>
        </div>

        {/* upsell banner — hide when in trial mode (trial banner takes the role) */}
        {showUpsell && !isTrial && (
          <div style={{ padding: '14px 28px', background: 'var(--highlight-soft)', borderBottom: '1.5px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Pill hl style={{ fontSize: 9 }}>Upsell</Pill>
              <div className="wf-body" style={{ fontSize: 13 }}>
                <strong>Outgrowing fabfunnel.ai?</strong> The full FabFunnel platform adds attribution, MMM, and team workflows.
              </div>
              <span className="wf-squig" style={{ fontSize: 13, cursor: 'pointer', fontWeight: 700 }}>See fabfunnel.com →</span>
            </div>
            <button className="wf-close" onClick={() => setShowUpsell(false)} style={{ width: 22, height: 22, fontSize: 11 }}>✕</button>
            {showAnnotations && <Note style={{ top: -10, right: 60 }}>fabfunnel.com upsell hook</Note>}
          </div>
        )}

        {/* ── Creative Gen module ── */}
        {activeNav === 'creative' && window.CreativeGen && (
          <window.CreativeGen />
        )}

        {/* ── Video Sage module ── */}
        {activeNav === 'video' && window.VideoSage && (
          <window.VideoSage screenshotMode={screenshotMode} showAnnotations={showAnnotations} />
        )}

        {/* ── Home view — shared by both funnels ── */}
        {activeNav === 'home' && (
        <React.Fragment>
        {/* welcome */}
        <div style={{ padding: '32px 28px 0' }}>
          <span className="wf-eyebrow">{isTrial ? 'Welcome · 7-day trial' : 'Welcome back'}</span>
          <h1 className="wf-h1" style={{ fontSize: 32, marginTop: 6 }}>What are we shipping today?</h1>
        </div>

        {/* quick actions */}
        <div style={{ padding: '20px 28px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              ['✦', 'Generate creatives', 'Static + motion ad variants'],
              ['▶', 'Video brief',         'Upload footage, get cuts'],
              ['✎', 'Write a script',      'UGC scripts in your voice'],
              ['⊞', 'Save an ad',          'Add to Industry Insights'],
            ].map(([icon, t, d], i) => (
              <Box key={i} style={{ padding: 18, cursor: 'pointer', background: 'var(--paper)' }}>
                <div style={{ fontFamily: 'var(--hand-loose)', fontSize: 26 }}>{icon}</div>
                <h3 className="wf-h3" style={{ fontSize: 14, marginTop: 8 }}>{t}</h3>
                <p className="wf-body" style={{ fontSize: 11, marginTop: 4 }}>{d}</p>
              </Box>
            ))}
          </div>
        </div>

        {/* two columns: recent + insights board */}
        <div style={{ padding: '28px 28px 60px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>

          {/* recent generations */}
          <Box style={{ padding: 20, background: 'var(--paper)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h2 className="wf-h2" style={{ fontSize: 18 }}>Recent generations</h2>
              <span className="wf-squig" style={{ fontSize: 12, cursor: 'pointer' }}>View all →</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {[1,2,3,4,5,6].map(i => (
                <div key={i}>
                  {screenshotMode === 'sketched'
                    ? <div className="wf-box" style={{ height: 110, padding: 6 }}><MockUI kind={i % 2 ? 'creative' : 'video'} style={{ height: '100%' }} /></div>
                    : <div className="wf-img" style={{ height: 110 }}><span>ad {i}</span></div>}
                  <div className="wf-body" style={{ fontSize: 11, marginTop: 6 }}>Brief #{420 + i}</div>
                  <div className="wf-micro" style={{ fontSize: 10 }}>{i} day{i === 1 ? '' : 's'} ago</div>
                </div>
              ))}
            </div>
          </Box>

          {/* insights board preview */}
          <Box style={{ padding: 20, background: 'var(--paper)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h2 className="wf-h2" style={{ fontSize: 18 }}>Insights board</h2>
              <Pill soft style={{ fontSize: 10 }}>2 / 3 folders</Pill>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Skincare hooks', 'BFCM swipe', 'Competitor: Glow Co.'].map((f, i) => (
                <div key={i} style={{ padding: 12, border: '1.5px solid var(--ink-faint)', borderRadius: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{f}</div>
                    <div className="wf-micro" style={{ fontSize: 10 }}>{[12, 8, 23][i]} ads</div>
                  </div>
                  <span style={{ fontSize: 16, color: 'var(--ink-faint)' }}>→</span>
                </div>
              ))}
            </div>
            <Btn variant="ghost" style={{ width: '100%', marginTop: 14, fontSize: 12 }}>+ New folder</Btn>
          </Box>
        </div>

        {/* trial upgrade strip — ONLY for trial funnel */}
        {isTrial && (
          <div style={{ padding: '24px 28px', borderTop: '1.5px dashed var(--ink-faint)' }}>
            <div style={{
              padding: 22,
              border: '2px solid var(--ink)',
              borderRadius: '8px 12px 9px 11px / 10px 8px 12px 9px',
              background: 'var(--highlight-soft)',
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              gap: 24,
              alignItems: 'center',
            }}>
              <div>
                <span className="wf-eyebrow" style={{ fontSize: 11 }}>Trial · {trialDaysLeft} days left</span>
                <h3 className="wf-h2" style={{ fontSize: 22, marginTop: 6, marginBottom: 8 }}>Loving it? Unlock the full thing.</h3>
                <p className="wf-body" style={{ fontSize: 13, marginBottom: 14, maxWidth: 480 }}>
                  Remove the watermark, get unlimited creatives, HD video exports, brand voice training, and Industry Insights.
                </p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button onClick={() => openBuyNow && openBuyNow('A')} style={{
                    padding: '10px 18px',
                    border: '1.5px solid var(--ink)',
                    background: 'var(--ink)',
                    color: 'var(--paper)',
                    borderRadius: '6px 9px 7px 8px / 8px 6px 9px 7px',
                    fontFamily: 'var(--hand)', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                  }}>upgrade to paid →</button>
                  <button onClick={() => setTrialModal('compare')} style={{
                    padding: '10px 18px',
                    border: '1.5px solid var(--ink)',
                    background: 'transparent',
                    borderRadius: '6px 9px 7px 8px / 8px 6px 9px 7px',
                    fontFamily: 'var(--hand)', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                  }}>see what changes</button>
                </div>
              </div>
              <div style={{ display: 'grid', gap: 8 }}>
                {[
                  ['✕', 'Watermark on exports',           '✓', 'Clean HD exports'],
                  ['10', 'Credits / day',                  '∞', 'Unlimited generation'],
                  ['—', 'Insights & competitor radar',     '✓', 'Full access'],
                ].map(([tA, lA, tB, lB], i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <div style={{ padding: '8px 10px', border: '1.5px dashed var(--ink-faint)', borderRadius: 4, background: 'var(--paper)', opacity: 0.6 }}>
                      <div className="wf-micro" style={{ fontSize: 9 }}>trial</div>
                      <div style={{ fontSize: 12, fontWeight: 700 }}><span style={{ marginRight: 6 }}>{tA}</span>{lA}</div>
                    </div>
                    <div style={{ padding: '8px 10px', border: '1.5px solid var(--ink)', borderRadius: 4, background: 'var(--paper)' }}>
                      <div className="wf-micro" style={{ fontSize: 9, fontWeight: 700 }}>paid</div>
                      <div style={{ fontSize: 12, fontWeight: 700 }}><span style={{ marginRight: 6 }}>{tB}</span>{lB}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* tips strip */}
        <div style={{ padding: '24px 28px 60px', borderTop: '1.5px dashed var(--ink-faint)' }}>
          <div className="wf-eyebrow" style={{ marginBottom: 12 }}>Get more out of fabfunnel</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              ['Connect your ad accounts', 'Pull live performance into briefs.'],
              ['Invite a teammate',         'Need 2+ seats? Upgrade to Team.'],
              ['Try the upsell',            'Full FabFunnel platform — attribution + MMM.'],
            ].map(([t, d], i) => (
              <div key={i} style={{ padding: 14, border: '1.5px dashed var(--ink-faint)', borderRadius: 5, background: 'var(--paper)' }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{t}</div>
                <div className="wf-body" style={{ fontSize: 11, marginTop: 4 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
        </React.Fragment>
        )}

        {/* ── Stub for other nav items ── */}
        {!['home', 'creative', 'video'].includes(activeNav) && (
          <div style={{ padding: '60px 28px', textAlign: 'center' }}>
            <div className="wf-eyebrow" style={{ marginBottom: 8 }}>{flatNav.find(n => n.id === activeNav)?.label || activeNav}</div>
            <div style={{ fontSize: 13, color: 'var(--ink-faint)', fontFamily: 'var(--hand)' }}>
              {isTrial ? 'Module wireframe — coming next sprint.' : 'Wireframe TBD'}
            </div>
            {isTrial && (
              <button onClick={() => setActiveNav('home')} style={{
                marginTop: 16, padding: '8px 16px',
                border: '1.5px solid var(--ink)', background: 'var(--paper)',
                borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px',
                fontFamily: 'var(--hand)', fontSize: 12, fontWeight: 700, cursor: 'pointer',
              }}>← back to dashboard</button>
            )}
          </div>
        )}

        {/* ── Demo: trigger trial conversion modals (only in trial funnel) ── */}
        {isTrial && (
          <div style={{ padding: '20px 28px', background: 'var(--highlight-soft)', borderTop: '1.5px dashed var(--ink-faint)' }}>
            <div className="wf-eyebrow" style={{ marginBottom: 8 }}>Demo · trigger conversion moments</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button onClick={() => setTrialModal('download')} style={demoBtnStyle}>⬇ Try to download (locked)</button>
              <button onClick={() => setTrialModal('exhausted')} style={demoBtnStyle}>⚡ Simulate credits exhausted</button>
              <button onClick={() => setTrialModal('expired')} style={demoBtnStyle}>⏱ Simulate trial expired</button>
            </div>
          </div>
        )}

        {trialModal && window.TrialUpgradeModal && (
          <window.TrialUpgradeModal
            kind={trialModal}
            onClose={() => setTrialModal(null)}
            onUpgrade={() => { setTrialModal(null); openBuyNow && openBuyNow('A'); }}
          />
        )}
      </div>
    </div>
  );
}

window.DashboardPage = DashboardPage;

const demoBtnStyle = {
  padding: '6px 12px',
  border: '1.5px solid var(--ink)',
  background: 'var(--paper)',
  borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px',
  fontFamily: 'var(--hand)',
  fontSize: 12,
  fontWeight: 700,
  cursor: 'pointer',
  color: 'var(--ink)',
};
