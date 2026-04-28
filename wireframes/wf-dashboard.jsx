// ─────────────────────────────────────────────────────────────
// Post-purchase Dashboard wireframe
// ─────────────────────────────────────────────────────────────

function DashboardPage({ onNav, screenshotMode, showAnnotations, initialNav, funnel, trialUpsellStyle, openBuyNow }) {
  const [activeNav, setActiveNav] = React.useState(initialNav || 'home');
  const [showUpsell, setShowUpsell] = React.useState(true);
  const [trialModal, setTrialModal] = React.useState(null);
  const [showPricing, setShowPricing] = React.useState(false);
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
    { id: 'library',      label: 'Creative Library',  icon: '🖼' },
    { id: 'launch',       label: 'Launch',            icon: '🚀', locked: true },
    { id: 'reporting',    label: 'Reporting',         icon: '📊', locked: true },
    { id: 'automation',   label: 'Automation',        icon: '⚙', locked: true },
    { id: 'integrations', label: 'Integrations',      icon: '🔌', locked: true },
    { id: 'user-panel',   label: 'User Panel',        icon: '👤', locked: true },
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
                  if (it.locked) { setActiveNav(it.id); return; }
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
                    opacity: it.locked ? 0.55 : 1,
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                  <span style={{ width: 18, textAlign: 'center' }}>{it.icon}</span>
                  <span style={{ flex: 1 }}>{it.label}</span>
                  {it.locked && <span style={{ fontSize: 11, color: 'var(--ink-faint)' }}>🔒</span>}
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

        {/* ── Creative Library module ── */}
        {activeNav === 'library' && (
          <CreativeLibrary screenshotMode={screenshotMode} onGenerate={() => setActiveNav('creative')} />
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
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
              <span className="wf-squig" onClick={() => setActiveNav('library')} style={{ fontSize: 12, cursor: 'pointer' }}>View all in Library →</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10 }}>
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
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

        {/* ── Locked premium modules ── */}
        {activeNav === 'launch' && (
          <ModuleStub icon="🚀" name="Launch"
            desc="Push creatives directly to Meta, TikTok, Google Ads, and more. Schedule, A/B test, and track deployment status."
            features={['One-click publish to ad platforms', 'Campaign scheduling & queue', 'A/B test setup with auto-winner', 'Deployment history & rollback']}
            onBack={() => setActiveNav('home')} onUpgrade={() => setShowPricing(true)} />
        )}
        {activeNav === 'reporting' && (
          <ModuleStub icon="📊" name="Reporting"
            desc="Track creative performance across platforms. See what's working, what's not, and what to generate next."
            features={['Cross-platform performance dashboard', 'Creative-level CTR, CPA, ROAS', 'Winning creative patterns & trends', 'Export reports to PDF / CSV']}
            onBack={() => setActiveNav('home')} onUpgrade={() => setShowPricing(true)} />
        )}
        {activeNav === 'automation' && (
          <ModuleStub icon="⚙" name="Automation"
            desc="Set up rules to auto-generate, auto-pause, and auto-scale creatives based on performance triggers."
            features={['Auto-generate when CTR drops below threshold', 'Pause underperforming creatives automatically', 'Scale winning creatives to new audiences', 'Scheduled generation batches (daily / weekly)']}
            onBack={() => setActiveNav('home')} onUpgrade={() => setShowPricing(true)} />
        )}
        {activeNav === 'integrations' && (
          <ModuleStub icon="🔌" name="Integrations"
            desc="Connect your ad accounts, CRMs, and creative tools. Sync data in and push creatives out."
            features={['Meta Ads, Google Ads, TikTok Ads', 'Shopify, WooCommerce, BigCommerce', 'HubSpot, Klaviyo, Mailchimp', 'Zapier & webhook support']}
            onBack={() => setActiveNav('home')} onUpgrade={() => setShowPricing(true)} />
        )}
        {activeNav === 'user-panel' && (
          <ModuleStub icon="👤" name="User Panel"
            desc="Manage your account, team members, billing, API keys, and workspace settings."
            features={['Profile & password settings', 'Team members & roles (Admin / Editor / Viewer)', 'Billing, invoices, & plan management', 'API keys & usage logs']}
            onBack={() => setActiveNav('home')} onUpgrade={() => setShowPricing(true)} />
        )}

        {/* ── Fallback stub for any remaining nav items ── */}
        {!['home', 'creative', 'video', 'library', 'launch', 'reporting', 'automation', 'integrations', 'user-panel'].includes(activeNav) && (
          <div style={{ padding: '60px 28px', textAlign: 'center' }}>
            <div className="wf-eyebrow" style={{ marginBottom: 8 }}>{flatNav.find(n => n.id === activeNav)?.label || activeNav}</div>
            <div style={{ fontSize: 13, color: 'var(--ink-faint)', fontFamily: 'var(--hand)' }}>
              {isTrial ? 'Module wireframe — coming next sprint.' : 'Wireframe TBD'}
            </div>
            <button onClick={() => setActiveNav('home')} style={{
              marginTop: 16, padding: '8px 16px',
              border: '1.5px solid var(--ink)', background: 'var(--paper)',
              borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px',
              fontFamily: 'var(--hand)', fontSize: 12, fontWeight: 700, cursor: 'pointer',
            }}>← back to dashboard</button>
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

      {/* ── Pricing Modal ── */}
      {showPricing && <PricingModal onClose={() => setShowPricing(false)} />}
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

// ── Module stub (locked upsell for premium modules) ──
function ModuleStub({ icon, name, desc, features, onBack, onUpgrade }) {
  return (
    <div style={{ padding: '48px 28px', fontFamily: 'var(--hand)' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 14 }}>{icon}</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 14px', background: 'var(--ink)', color: 'var(--paper)', borderRadius: 10, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>🔒 Premium</div>
        <h1 className="wf-h1" style={{ fontSize: 28, marginBottom: 8 }}>{name}</h1>
        <p className="wf-body" style={{ fontSize: 14, color: 'var(--ink-soft)', maxWidth: 480, margin: '0 auto 24px' }}>{desc}</p>

        {/* Upgrade CTA */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 28 }}>
          <button onClick={onUpgrade} style={{
            padding: '12px 24px',
            border: '1.5px solid var(--ink)', background: 'var(--ink)', color: 'var(--paper)',
            borderRadius: '6px 9px 7px 8px / 8px 6px 9px 7px',
            fontFamily: 'var(--hand)', fontSize: 14, fontWeight: 700, cursor: 'pointer',
          }}>Upgrade to unlock {name} →</button>
          <button onClick={onBack} style={{
            padding: '12px 20px',
            border: '1.5px solid var(--ink)', background: 'var(--paper)',
            borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px',
            fontFamily: 'var(--hand)', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>← back</button>
        </div>

        <Box style={{ padding: 24, textAlign: 'left', background: 'var(--paper)', maxWidth: 440, margin: '0 auto 24px' }}>
          <div className="wf-eyebrow" style={{ fontSize: 10, marginBottom: 12 }}>What you'll get</div>
          {features.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderBottom: i < features.length - 1 ? '1px dashed var(--ink-faint)' : 'none' }}>
              <span style={{ color: 'var(--ink-faint)', fontSize: 12, marginTop: 1 }}>✓</span>
              <span style={{ fontSize: 13 }}>{f}</span>
            </div>
          ))}
        </Box>

        <div style={{ padding: '16px 20px', background: 'var(--highlight-soft)', border: '1.5px solid var(--ink)', borderRadius: '6px 9px 7px 8px / 8px 6px 9px 7px', maxWidth: 440, margin: '0 auto' }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>💡 Included in the Growth plan</div>
          <div className="wf-body" style={{ fontSize: 12 }}>Unlock {name} + all premium modules for one price. No per-seat charges.</div>
        </div>
      </div>
    </div>
  );
}

// ── Pricing Modal (matching reference: Starter / Pro / Enterprise, monthly/annual toggle) ──
function PricingModal({ onClose }) {
  const [billing, setBilling] = React.useState('monthly');
  const s = { fontFamily: 'var(--hand)' };

  const Check = ({ children }) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '5px 0', fontSize: 12, ...s }}>
      <span style={{ color: 'var(--ink)', fontSize: 11, marginTop: 1 }}>●</span>
      <span>{children}</span>
    </div>
  );

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(20,20,20,0.5)', backdropFilter: 'blur(3px)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: '40px 20px', overflowY: 'auto',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: 'var(--paper)', borderRadius: '8px 12px 9px 11px / 10px 8px 12px 9px',
        border: '1.5px solid var(--ink)', maxWidth: 980, width: '100%', padding: '40px 32px',
        position: 'relative', ...s,
      }}>
        <button onClick={onClose} className="wf-close" style={{ position: 'absolute', top: 16, right: 16, width: 28, height: 28, fontSize: 14 }}>✕</button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.1, marginBottom: 8 }}>Simple pricing.<br/>No surprises.</h2>
          <p className="wf-body" style={{ fontSize: 14, color: 'var(--ink-soft)', maxWidth: 400, margin: '0 auto 20px' }}>Pick a plan that matches where you are — upgrade as you grow.</p>

          {/* Plan toggle: AI / Growth */}
          <div style={{ display: 'inline-flex', gap: 4, padding: 3, background: 'var(--paper-soft)', border: '1.5px solid var(--ink-faint)', borderRadius: 999, marginBottom: 16 }}>
            <button style={{ padding: '6px 16px', borderRadius: 999, border: 'none', background: 'transparent', fontFamily: 'var(--hand)', fontSize: 12, cursor: 'pointer', color: 'var(--ink-faint)' }}>AI</button>
            <button style={{ padding: '6px 16px', borderRadius: 999, border: 'none', background: 'var(--ink)', color: 'var(--paper)', fontFamily: 'var(--hand)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Growth</button>
          </div>

          {/* Billing toggle */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 8 }}>
            <span style={{ fontSize: 12, fontWeight: billing === 'monthly' ? 700 : 400, cursor: 'pointer' }} onClick={() => setBilling('monthly')}>Monthly</span>
            <div onClick={() => setBilling(b => b === 'monthly' ? 'annual' : 'monthly')} style={{
              width: 36, height: 20, borderRadius: 10, border: '1.5px solid var(--ink)',
              background: billing === 'annual' ? 'var(--ink)' : 'var(--paper)', cursor: 'pointer', position: 'relative',
            }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: billing === 'annual' ? 'var(--paper)' : 'var(--ink)', position: 'absolute', top: 2, left: billing === 'annual' ? 18 : 2, transition: 'left 120ms' }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: billing === 'annual' ? 700 : 400, cursor: 'pointer' }} onClick={() => setBilling('annual')}>Annual</span>
            <span style={{ fontSize: 10, padding: '2px 8px', background: 'var(--highlight)', borderRadius: 10, fontWeight: 700 }}>Save 20%</span>
          </div>
        </div>

        {/* Plans grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, alignItems: 'start' }}>

          {/* Starter */}
          <Box style={{ padding: 24, background: 'var(--paper)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800 }}>Starter</h3>
              <span style={{ fontSize: 9, padding: '3px 8px', border: '1.5px solid var(--ink)', borderRadius: 10, fontWeight: 700, letterSpacing: 0.5 }}>POPULAR</span>
            </div>
            <p className="wf-body" style={{ fontSize: 11, color: 'var(--ink-faint)', marginBottom: 12 }}>For growing performance marketers</p>
            <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 2 }}>[TBD]<span style={{ fontSize: 14, fontWeight: 400, color: 'var(--ink-faint)' }}>/mo</span></div>
            <div className="wf-micro" style={{ fontSize: 10, marginBottom: 16 }}>Billed {billing} · Cancel anytime</div>

            <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 8 }}>AI Features included</div>
            <div style={{ padding: '6px 10px', border: '1.5px solid var(--ink-faint)', borderRadius: 6, fontSize: 11, marginBottom: 14 }}>Genie Suite · Industry Insights</div>

            <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 8 }}>Starter features</div>
            <Check>Manual Bulk Launch — launch ads at scale</Check>
            <Check>Creative Library — save & reuse winning ads</Check>
            <Check>Co-pilot — insights & recommendations</Check>
            <Check>5 Ad Accounts</Check>
            <Check>Unlimited Team Members</Check>
            <Check>X+Y Credits per month</Check>
            <Check>Reporting</Check>
            <Check>Community Support</Check>

            <button onClick={onClose} style={{
              width: '100%', marginTop: 18, padding: '12px 16px',
              border: '1.5px solid var(--ink)', background: 'var(--paper)',
              borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px',
              fontFamily: 'var(--hand)', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            }}>Start free — 14-day trial</button>
            <div className="wf-micro" style={{ fontSize: 10, marginTop: 8, textAlign: 'center', padding: '6px 10px', border: '1.5px dashed var(--ink-faint)', borderRadius: 6 }}>14 days free. No credit card required to start.</div>
          </Box>

          {/* Pro */}
          <Box style={{ padding: 24, background: 'var(--paper)', border: '2px solid var(--ink)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800 }}>Pro</h3>
              <span style={{ fontSize: 9, padding: '3px 8px', background: 'var(--ink)', color: 'var(--paper)', borderRadius: 10, fontWeight: 700, letterSpacing: 0.5 }}>RECOMMENDED</span>
            </div>
            <p className="wf-body" style={{ fontSize: 11, color: 'var(--ink-faint)', marginBottom: 12 }}>For serious media buyers & D2C brands</p>
            <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 2 }}>[TBD]<span style={{ fontSize: 14, fontWeight: 400, color: 'var(--ink-faint)' }}>/mo</span></div>
            <div className="wf-micro" style={{ fontSize: 10, marginBottom: 16 }}>Billed {billing} · Cancel anytime</div>

            <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 8 }}>Everything in Starter, plus</div>
            <Check>Auto Bulk Launch — fully automated launches</Check>
            <Check>Automation rules — set conditions, run hands-free</Check>
            <Check>Cloning — duplicate campaigns, creatives & structures instantly</Check>
            <Check>RedTrack Integration</Check>
            <Check>15 Ad Accounts</Check>
            <Check>Unlimited Team Members</Check>
            <Check>Priority Support</Check>

            <button onClick={onClose} style={{
              width: '100%', marginTop: 18, padding: '12px 16px',
              border: '1.5px solid var(--ink)', background: 'var(--ink)', color: 'var(--paper)',
              borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px',
              fontFamily: 'var(--hand)', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            }}>Start free — 14-day trial</button>
            <div className="wf-micro" style={{ fontSize: 10, marginTop: 8, textAlign: 'center', padding: '6px 10px', border: '1.5px dashed var(--ink-faint)', borderRadius: 6 }}>14 days free. No credit card required to start.</div>
          </Box>

          {/* Enterprise */}
          <Box style={{ padding: 24, background: 'var(--paper)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800 }}>Enterprise</h3>
              <span style={{ fontSize: 9, padding: '3px 8px', border: '1.5px solid var(--ink-faint)', borderRadius: 10, fontWeight: 700, letterSpacing: 0.5, color: 'var(--ink-faint)' }}>CUSTOM</span>
            </div>
            <p className="wf-body" style={{ fontSize: 11, color: 'var(--ink-faint)', marginBottom: 12 }}>For large teams & networks at scale</p>
            <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 2 }}>Custom</div>
            <div className="wf-micro" style={{ fontSize: 10, marginBottom: 16 }}>Tailored to seats, ad accounts & volume</div>

            <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 8 }}>Everything in Pro, plus</div>
            <Check>Unlimited Team Members & Ad Accounts</Check>
            <Check>Unlimited Launches — no caps</Check>
            <Check>Client Management — unlimited clients</Check>
            <Check>Ad Rejection Management — health & auto-recovery</Check>
            <Check>Custom SLAs & contracts</Check>
            <Check>SSO & advanced permissions</Check>
            <Check>Dedicated Account Manager</Check>
            <Check>Dedicated Support</Check>

            <button onClick={() => alert('Talk to sales — coming soon')} style={{
              width: '100%', marginTop: 18, padding: '12px 16px',
              border: '1.5px solid var(--ink)', background: 'var(--paper)',
              borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px',
              fontFamily: 'var(--hand)', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            }}>Talk to sales</button>
          </Box>
        </div>
      </div>
    </div>
  );
}

// ── Creative Library module ──
function CreativeLibrary({ screenshotMode, onGenerate }) {
  const [filter, setFilter] = React.useState('all');
  const [starredIds, setStarredIds] = React.useState(new Set([2, 5, 9]));
  const [sort, setSort] = React.useState('newest');

  const toggleStar = (id) => {
    setStarredIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const allCreatives = Array.from({ length: 36 }, (_, i) => ({
    id: i + 1,
    name: [
      'Summer Tee Hero', 'Sneaker Lifestyle', 'Flash Sale Banner', 'Product Demo Reel',
      'UGC Testimonial', 'Before / After', 'Brand Story Hero', 'Offer Highlight',
      'Social Proof Card', 'Comparison Grid', 'Holiday Gift Set', 'Lipstick Promo',
      'Canvas Cap Post', 'Spring Collection', 'Unboxing Reel', 'Flat Lay Product',
      'Sale Countdown', 'Influencer Hook', 'Price Drop Alert', 'Feature Showcase',
      'Customer Review', 'Tutorial Clip', 'New Arrival', 'Limited Edition',
      'Clearance Banner', 'Testimonial Reel', 'Lifestyle Scene', 'Studio Shot',
      'Campaign Launch', 'Email Hero', 'Amazon A+', 'TikTok Ad',
      'IG Story', 'FB Carousel', 'Pinterest Pin', 'YouTube Thumb',
    ][i],
    type: i % 5 === 3 || i % 7 === 4 ? 'video' : 'image',
    brand: ['Airbnb', 'Nike', 'Glossier', 'Lululemon', 'Spotify', 'Stripe'][i % 6],
    daysAgo: Math.floor(i / 3),
    duration: [6, 15, 30][i % 3],
    isNew: i < 4,
  }));

  const filtered = allCreatives.filter(c => {
    if (filter === 'image') return c.type === 'image';
    if (filter === 'video') return c.type === 'video';
    if (filter === 'starred') return starredIds.has(c.id);
    return true;
  });

  const imgCount = allCreatives.filter(c => c.type === 'image').length;
  const vidCount = allCreatives.filter(c => c.type === 'video').length;
  const starCount = allCreatives.filter(c => starredIds.has(c.id)).length;

  return (
    <div style={{ padding: '28px', fontFamily: 'var(--hand)' }}>
      {/* header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <span className="wf-eyebrow">Genie</span>
          <h1 className="wf-h1" style={{ fontSize: 26, marginTop: 4 }}>🖼 Creative Library</h1>
          <p className="wf-body" style={{ fontSize: 13, marginTop: 4, color: 'var(--ink-faint)' }}>Every creative generated by Genie — search, filter, star, and re-use.</p>
        </div>
        <Btn onClick={onGenerate}>✦ Generate new →</Btn>
      </div>

      {/* filters + sort */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 4, padding: 3, border: '1.5px solid var(--ink)', borderRadius: 999 }}>
          {[
            { id: 'all', label: `All (${allCreatives.length})` },
            { id: 'image', label: `🖼 Images (${imgCount})` },
            { id: 'video', label: `🎬 Videos (${vidCount})` },
            { id: 'starred', label: `★ Starred (${starCount})` },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              padding: '5px 14px', borderRadius: 999, border: 'none',
              background: filter === f.id ? 'var(--ink)' : 'transparent',
              color: filter === f.id ? 'var(--paper)' : 'var(--ink-soft)',
              fontFamily: 'var(--hand)', fontSize: 12, fontWeight: 700, cursor: 'pointer',
            }}>{f.label}</button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={{
            padding: '6px 12px', border: '1.5px solid var(--ink)', borderRadius: 999,
            background: 'var(--paper)', fontFamily: 'var(--hand)', fontSize: 12, cursor: 'pointer',
          }}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="name">By name</option>
          </select>
        </div>
      </div>

      {/* NEW badge row (last 4 creatives flagged as new) */}
      {filter === 'all' && (
        <div style={{ marginBottom: 20 }}>
          <div className="wf-eyebrow" style={{ marginBottom: 10, fontSize: 10 }}>✨ Recently generated</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
            {filtered.filter(c => c.isNew).map(c => (
              <Box key={c.id} style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', position: 'relative', background: 'var(--paper)' }}>
                <div style={{ position: 'absolute', top: 8, left: 8, padding: '2px 8px', background: 'var(--ink)', color: 'var(--paper)', fontSize: 9, fontWeight: 700, borderRadius: 10, letterSpacing: 0.5 }}>NEW</div>
                <div style={{ position: 'absolute', top: 8, right: 8, cursor: 'pointer', fontSize: 16, color: starredIds.has(c.id) ? 'var(--highlight)' : 'var(--ink-ghost)' }} onClick={(e) => { e.stopPropagation(); toggleStar(c.id); }}>
                  {starredIds.has(c.id) ? '★' : '☆'}
                </div>
                <div style={{ aspectRatio: '1', background: 'var(--paper-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {screenshotMode === 'sketched'
                    ? <MockUI kind={c.type === 'video' ? 'video' : 'creative'} style={{ width: '80%', height: '80%' }} />
                    : <div className="wf-img" style={{ width: '100%', height: '100%' }}><span>{c.type === 'video' ? '▶' : '🖼'}</span></div>}
                </div>
                <div style={{ padding: '8px 10px' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{c.name}</div>
                  <div className="wf-micro" style={{ fontSize: 10 }}>{c.brand} · {c.type === 'video' ? `🎬 ${c.duration}s` : '🖼 Image'} · just now</div>
                </div>
              </Box>
            ))}
          </div>
        </div>
      )}

      {/* divider */}
      {filter === 'all' && <div className="wf-divider-dashed" style={{ margin: '8px 0 20px' }} />}

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
        {filtered.filter(c => filter !== 'all' || !c.isNew).map(c => (
          <Box key={c.id} style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', position: 'relative', background: 'var(--paper)' }}>
            <div style={{ position: 'absolute', top: 8, left: 8, padding: '2px 8px', background: c.type === 'video' ? 'var(--ink)' : 'var(--paper)', color: c.type === 'video' ? 'var(--paper)' : 'var(--ink)', border: '1px solid var(--ink)', fontSize: 9, fontWeight: 700, borderRadius: 10 }}>
              {c.type === 'video' ? '🎬 Video' : '🖼 Image'}
            </div>
            {c.type === 'video' && (
              <div style={{ position: 'absolute', bottom: 62, right: 8, padding: '2px 6px', background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: 9, fontWeight: 700, borderRadius: 8 }}>{c.duration}s</div>
            )}
            <div style={{ position: 'absolute', top: 8, right: 8, cursor: 'pointer', fontSize: 16, color: starredIds.has(c.id) ? 'var(--highlight)' : 'var(--ink-ghost)' }} onClick={(e) => { e.stopPropagation(); toggleStar(c.id); }}>
              {starredIds.has(c.id) ? '★' : '☆'}
            </div>
            <div style={{ aspectRatio: '1', background: 'var(--paper-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {screenshotMode === 'sketched'
                ? <MockUI kind={c.type === 'video' ? 'video' : 'creative'} style={{ width: '80%', height: '80%' }} />
                : <div className="wf-img" style={{ width: '100%', height: '100%' }}><span>{c.type === 'video' ? '▶' : '🖼'}</span></div>}
            </div>
            <div style={{ padding: '8px 10px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{c.name}</div>
              <div className="wf-micro" style={{ fontSize: 10 }}>{c.brand} · {c.daysAgo === 0 ? 'today' : c.daysAgo + 'd ago'}</div>
            </div>
          </Box>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--ink-faint)' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>∅</div>
          <div style={{ fontSize: 14 }}>No creatives match this filter.</div>
        </div>
      )}

      {/* footer */}
      <div style={{ textAlign: 'center', padding: '28px 0', marginTop: 12, borderTop: '1.5px dashed var(--ink-faint)' }}>
        <span className="wf-body" style={{ fontSize: 12, color: 'var(--ink-faint)' }}>Showing {filtered.length} of {allCreatives.length} creatives</span>
      </div>
    </div>
  );
}
