// ─────────────────────────────────────────────────────────────
// Post-purchase Dashboard wireframe
// ─────────────────────────────────────────────────────────────

function DashboardPage({ onNav, screenshotMode, showAnnotations, initialNav, funnel, trialUpsellStyle, openBuyNow }) {
  const [activeNav, setActiveNav] = React.useState(initialNav || 'home');
  const [showUpsell, setShowUpsell] = React.useState(true);
  const [trialModal, setTrialModal] = React.useState(null);
  const [showPricing, setShowPricing] = React.useState(false);
  const [isNewUser] = React.useState(() => {
    const flag = sessionStorage.getItem('ff_new_user');
    if (flag) sessionStorage.removeItem('ff_new_user');
    return !!flag;
  });
  const [skippedProduct, setSkippedProduct] = React.useState(() => {
    return sessionStorage.getItem('ff_profile_skipped') || null;
  });
  const dismissProfileBanner = () => {
    sessionStorage.removeItem('ff_profile_skipped');
    setSkippedProduct(null);
  };
  const [showTrialOffer, setShowTrialOffer] = React.useState(false);
  const [showOfferTimer, setShowOfferTimer] = React.useState(false);
  const [countdown, setCountdown] = React.useState(24 * 60 * 60);
  const [upgraded, setUpgraded] = React.useState(false);

  const [upgradeSuccess, setUpgradeSuccess] = React.useState(false);

  // Trial offer: popup after 5s if user came from trial-welcome
  React.useEffect(() => {
    // Check for upgrade-from-dashboard success
    const upFlag = sessionStorage.getItem('ff_upgrade_success');
    if (upFlag) {
      sessionStorage.removeItem('ff_upgrade_success');
      setUpgraded(true);
      setUpgradeSuccess(true);
      setShowOfferTimer(false);
      setShowTrialOffer(false);
      setTimeout(() => setUpgradeSuccess(false), 6000);
      return;
    }
    // Only show trial offer if not upgraded
    const offerFlag = sessionStorage.getItem('ff_trial_offer');
    if (offerFlag && !upgraded) {
      sessionStorage.removeItem('ff_trial_offer');
      const t = setTimeout(() => { setShowTrialOffer(true); }, 5000);
      return () => clearTimeout(t);
    }
  }, []);

  // Countdown timer (runs when offer timer is visible)
  React.useEffect(() => {
    if (!showOfferTimer) return;
    const iv = setInterval(() => setCountdown(c => c > 0 ? c - 1 : 0), 1000);
    return () => clearInterval(iv);
  }, [showOfferTimer]);

  const fmtCountdown = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const isTrialFunnel = funnel === 'trial';
  const isTrial = isTrialFunnel && !upgraded;
  const upsellStyle = trialUpsellStyle || 'subtle';
  const trialDaysLeft = isNewUser ? 7 : 6;
  const trialCreditsTotal = 20;
  const trialCreditsUsed = isNewUser ? 0 : 8;
  const paidCreditsTotal = 100;
  const paidCreditsRemaining = isNewUser || upgraded ? paidCreditsTotal : 62;

  // Sync hash → activeNav so #creative deep-links into the module
  React.useEffect(() => {
    if (initialNav) setActiveNav(initialNav);
  }, [initialNav]);

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: '◇' },
    { id: 'genie', label: 'Genie', icon: '✦', isGroup: true, children: [
      { id: 'creative',   label: 'Creative Generation', icon: '✦' },
      { id: 'studio',     label: 'Studio',              icon: '🎨' },
      { id: 'templates',  label: 'Templates',           icon: '📋' },
      { id: 'brands',     label: 'Brands',              icon: '🏷' },
      { id: 'categories', label: 'Categories',          icon: '📁' },
    ]},
    { id: 'insights-grp', label: 'Industry Insights', icon: '⊞', isGroup: true, children: [
      { id: 'discover',     label: 'Discover',     icon: '◎' },
      { id: 'intelligence', label: 'Intelligence', icon: '⚡' },
      { id: 'boards',       label: 'Boards',       icon: '▤' },
    ]},
    { id: 'videosage-grp', label: 'Video Sage', icon: '▶', isGroup: true, children: [
      { id: 'video',   label: 'Video Sage',       icon: '▶' },
      { id: 'script',  label: 'Script Library',   icon: '✎' },
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
    const set = new Set(['genie', 'insights-grp', 'videosage-grp']);
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
                        if (c.id === 'video') window.location.hash = 'video';
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

        {/* Profile section — no credits here, moved to top bar */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 10px', cursor: 'pointer', borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px' }}>
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

        {/* upgrade success banner */}
        {upgradeSuccess && (
          <div style={{
            padding: '14px 28px', background: 'var(--highlight)', borderBottom: '1.5px solid var(--ink)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            fontFamily: 'var(--hand)', fontSize: 14, fontWeight: 700,
          }}>
            <span style={{ fontSize: 18 }}>🎉</span>
            <span>You're upgraded! All premium modules are now unlocked.</span>
            <button onClick={() => setUpgradeSuccess(false)} style={{ background: 'transparent', border: 'none', fontSize: 14, cursor: 'pointer', marginLeft: 8 }}>✕</button>
          </div>
        )}

        {/* profile incomplete banner — shown when user skipped onboarding */}
        {skippedProduct && (
          <div style={{
            padding: '16px 28px', background: 'var(--paper)',
            borderBottom: '1.5px solid var(--ink)',
            display: 'flex', alignItems: 'center', gap: 16,
            fontFamily: 'var(--hand)', flexWrap: 'wrap',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              border: '2px solid var(--accent)', background: 'rgba(255,91,58,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, flexShrink: 0,
            }}>⚠</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Complete your profile to unlock personalized results</div>
              <div className="wf-body" style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 2 }}>
                {skippedProduct === 'insights'
                  ? 'Set up your competitor tracking — we\'ll build your intelligence feed automatically.'
                  : 'Tell us about your brand or niche — Genie generates better creatives with context.'}
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--ink-faint)' }}>
                  <span style={{ width: 14, height: 14, borderRadius: '50%', border: '1.5px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8 }}>1</span>
                  <span>Profile setup</span>
                </div>
                <span style={{ fontSize: 11, color: 'var(--ink-ghost)' }}>→</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--ink-faint)' }}>
                  <span style={{ width: 14, height: 14, borderRadius: '50%', border: '1.5px solid var(--ink-faint)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8 }}>2</span>
                  <span>Personalized results</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <Btn onClick={() => {
                dismissProfileBanner();
                window.location.hash = skippedProduct === 'insights' ? 'onboarding-insights' : 'onboarding';
                window.scrollTo(0, 0);
              }}>Complete setup →</Btn>
              <button onClick={dismissProfileBanner} style={{
                padding: '8px 14px', border: '1.5px solid var(--ink-faint)', borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px',
                background: 'transparent', fontFamily: 'var(--hand)', fontSize: 12, cursor: 'pointer', color: 'var(--ink-faint)',
              }}>Later</button>
            </div>
          </div>
        )}

        {/* top bar — breadcrumb + credits */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 28px', borderBottom: '1.5px dashed var(--ink-faint)', background: 'var(--paper)', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="wf-body" style={{ fontSize: 12, color: 'var(--ink-faint)' }}>Dashboard</span>
            <span className="wf-body" style={{ fontSize: 12, color: 'var(--ink-faint)' }}>›</span>
            <span style={{ fontSize: 13, fontWeight: 700 }}>{flatNav.find(n => n.id === activeNav)?.label || 'Dashboard'}</span>
          </div>

          {/* Credits widget — always visible in top bar */}
          {isTrial ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '6px 14px', border: '1.5px solid var(--accent)', borderRadius: 999, background: 'rgba(255,91,58,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 12 }}>⚡</span>
                <span style={{ fontSize: 14, fontWeight: 800, fontFamily: 'var(--hand-loose)' }}>{trialCreditsTotal - trialCreditsUsed}</span>
                <span className="wf-body" style={{ fontSize: 11, color: 'var(--ink-faint)' }}>/ {trialCreditsTotal} credits</span>
              </div>
              <div style={{ width: 60, height: 5, background: 'var(--paper-soft)', border: '1px solid var(--ink-faint)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: ((trialCreditsTotal - trialCreditsUsed) / trialCreditsTotal * 100) + '%', background: 'var(--accent)' }} />
              </div>
              <span className="wf-micro" style={{ fontSize: 10, color: 'var(--ink-faint)' }}>{trialDaysLeft}d left</span>
              <button onClick={() => openBuyNow && openBuyNow('A')} style={{
                padding: '4px 12px', border: '1.5px solid var(--ink)', background: 'var(--ink)', color: 'var(--paper)',
                borderRadius: 999, fontFamily: 'var(--hand)', fontSize: 10, fontWeight: 700, cursor: 'pointer',
              }}>Upgrade</button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 14px', border: '1.5px solid var(--ink-faint)', borderRadius: 999 }}>
              <span style={{ fontSize: 12 }}>⚡</span>
              <span style={{ fontSize: 14, fontWeight: 800, fontFamily: 'var(--hand-loose)' }}>{paidCreditsRemaining}</span>
              <span className="wf-body" style={{ fontSize: 11, color: 'var(--ink-faint)' }}>/ {paidCreditsTotal}</span>
              <div style={{ width: 50, height: 5, background: 'var(--paper-soft)', border: '1px solid var(--ink-faint)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: (paidCreditsRemaining / paidCreditsTotal * 100) + '%', background: 'var(--highlight)' }} />
              </div>
              <span className="wf-micro" style={{ fontSize: 10, color: 'var(--ink-faint)' }}>{isNewUser || upgraded ? 'Full' : '12d left'}</span>
            </div>
          )}
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

        {/* ── Studio module ── */}
        {activeNav === 'studio' && (
          <StudioModule screenshotMode={screenshotMode} onGenerate={() => setActiveNav('creative')} onMoveToLibrary={() => setActiveNav('library')} />
        )}

        {/* ── Templates module (Genie) ── */}
        {activeNav === 'templates' && (
          <TemplatesModule screenshotMode={screenshotMode} />
        )}

        {/* ── Discover module (Industry Insights) ── */}
        {activeNav === 'discover' && (
          <DiscoverModule screenshotMode={screenshotMode} onSave={() => setActiveNav('boards')} />
        )}

        {/* ── Intelligence module (Industry Insights) ── */}
        {activeNav === 'intelligence' && (
          <IntelligenceModule screenshotMode={screenshotMode} />
        )}

        {/* ── Boards module (Industry Insights) ── */}
        {activeNav === 'boards' && (
          <BoardsModule screenshotMode={screenshotMode} />
        )}

        {/* ── Home view — shared by both funnels ── */}
        {activeNav === 'home' && (
        <React.Fragment>
        {/* welcome */}
        <div style={{ padding: '32px 28px 0' }}>
          <span className="wf-eyebrow">{isTrial ? 'Welcome · 7-day trial' : isNewUser ? 'Welcome to fabfunnel.ai' : 'Welcome back'}</span>
          <h1 className="wf-h1" style={{ fontSize: 32, marginTop: 6 }}>
            {isNewUser ? 'Let\'s create your first creative ✦' : 'What are we shipping today?'}
          </h1>
          {isNewUser && (
            <p className="wf-body" style={{ fontSize: 14, marginTop: 8, maxWidth: 520, color: 'var(--ink-soft)' }}>
              Your account is ready. Pick a starting point below — most users start with generating their first ad creative.
            </p>
          )}
        </div>

        {/* new user: getting started steps */}
        {isNewUser && (
          <div style={{ padding: '20px 28px 0' }}>
            <div className="wf-eyebrow" style={{ marginBottom: 12, fontSize: 10 }}>Getting started</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
              {[
                { num: '1', icon: '✦', title: 'Generate your first creative', desc: 'Create a static or video ad in under 60 seconds.', action: 'creative', cta: 'Start generating →', primary: true },
                { num: '2', icon: '⊞', title: 'Explore Industry Insights', desc: 'Save and study winning competitor ads.', action: 'discover', cta: 'Explore →' },
                { num: '3', icon: '▶', title: 'Analyze a video ad', desc: 'Upload or paste a video — get a breakdown and script.', action: 'video', cta: 'Try Video Sage →' },
              ].map((s, i) => (
                <Box key={i} onClick={() => setActiveNav(s.action)} style={{
                  padding: 20, cursor: 'pointer', background: 'var(--paper)',
                  border: s.primary ? '2px solid var(--ink)' : undefined,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 28, height: 28, border: '1.5px solid var(--ink)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, background: s.primary ? 'var(--highlight)' : 'transparent' }}>{s.num}</div>
                    <span style={{ fontFamily: 'var(--hand-loose)', fontSize: 22 }}>{s.icon}</span>
                  </div>
                  <h3 className="wf-h3" style={{ fontSize: 14 }}>{s.title}</h3>
                  <p className="wf-body" style={{ fontSize: 11, marginTop: 4 }}>{s.desc}</p>
                  <div style={{ marginTop: 10, fontSize: 12, fontWeight: 700, color: 'var(--ink)' }}>{s.cta}</div>
                </Box>
              ))}
            </div>
          </div>
        )}

        {/* quick actions (returning users) */}
        {!isNewUser && (
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
        )}

        {/* two columns: recent + insights board */}
        <div style={{ padding: '28px 28px 60px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>

          {/* recent generations (or empty state for new users) */}
          <Box style={{ padding: 20, background: 'var(--paper)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h2 className="wf-h2" style={{ fontSize: 18 }}>Recent generations</h2>
              {!isNewUser && <span className="wf-squig" onClick={() => setActiveNav('library')} style={{ fontSize: 12, cursor: 'pointer' }}>View all in Library →</span>}
            </div>

            {isNewUser ? (
              <div style={{ textAlign: 'center', padding: '32px 16px', border: '1.5px dashed var(--ink-faint)', borderRadius: 6 }}>
                <div style={{ fontSize: 32, marginBottom: 8, opacity: 0.4 }}>✦</div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>No creatives yet</div>
                <div className="wf-body" style={{ fontSize: 12, color: 'var(--ink-faint)', marginBottom: 14 }}>Generate your first ad creative to see it here.</div>
                <Btn onClick={() => setActiveNav('creative')}>Generate your first creative →</Btn>
              </div>
            ) : (
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
            )}
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
        {/* ── Brands module (Genie) ── */}
        {activeNav === 'brands' && (
          <BrandsModule screenshotMode={screenshotMode} onGenerate={() => setActiveNav('creative')} />
        )}

        {/* ── Categories module (Genie) ── */}
        {activeNav === 'categories' && (
          <CategoriesModule screenshotMode={screenshotMode} />
        )}

        {!['home', 'creative', 'video', 'library', 'studio', 'templates', 'brands', 'categories', 'discover', 'intelligence', 'boards', 'launch', 'reporting', 'automation', 'integrations', 'user-panel'].includes(activeNav) && (
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

      {/* 30% discount offer popup (trial users only, fires 5s after landing) */}
      {showTrialOffer && (
        <div onClick={() => { setShowTrialOffer(false); setShowOfferTimer(true); }} style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(20,20,20,0.6)', backdropFilter: 'blur(3px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: 'var(--ink)', color: 'var(--paper)', fontFamily: 'var(--hand)',
            borderRadius: '10px 14px 11px 13px / 12px 10px 14px 11px',
            maxWidth: 520, width: '100%', padding: '40px 36px', position: 'relative', textAlign: 'center',
            border: '2px solid var(--highlight)',
          }}>
            <button onClick={() => { setShowTrialOffer(false); setShowOfferTimer(true); }} style={{
              position: 'absolute', top: 14, right: 14, background: 'transparent', border: 'none',
              color: 'var(--ink-ghost)', fontSize: 18, cursor: 'pointer',
            }}>✕</button>

            {/* Flash sale badge */}
            <div style={{
              display: 'inline-block', padding: '5px 18px', marginBottom: 20,
              background: 'var(--highlight)', color: 'var(--ink)',
              borderRadius: 999, fontSize: 12, fontWeight: 800, letterSpacing: 1,
            }}>⚡ EXCLUSIVE OFFER</div>

            <h2 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.1, marginBottom: 10 }}>
              Upgrade now &<br/>save <span style={{ color: 'var(--highlight)', fontSize: 42 }}>30%</span>
            </h2>
            <p style={{ fontSize: 14, color: 'var(--ink-ghost)', maxWidth: 380, margin: '0 auto 20px' }}>
              Lock in the discounted rate before your trial ends. This offer expires in 24 hours.
            </p>

            {/* Countdown preview */}
            <div style={{
              display: 'inline-flex', gap: 8, padding: '12px 20px', marginBottom: 24,
              border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: 10,
              background: 'rgba(255,255,255,0.06)',
            }}>
              {['23', '59', '59'].map((v, i) => (
                <React.Fragment key={i}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'var(--hand-loose)', color: 'var(--highlight)' }}>{v}</div>
                    <div style={{ fontSize: 9, color: 'var(--ink-ghost)', letterSpacing: 0.5 }}>{['HRS', 'MIN', 'SEC'][i]}</div>
                  </div>
                  {i < 2 && <span style={{ fontSize: 24, color: 'var(--ink-ghost)', alignSelf: 'flex-start', marginTop: 4 }}>:</span>}
                </React.Fragment>
              ))}
            </div>

            {/* What you get */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap', fontSize: 12 }}>
              {['Unlimited creatives', 'No watermarks', 'Priority support', 'All modules'].map((f, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--paper)' }}>
                  <span style={{ color: 'var(--highlight)' }}>✓</span> {f}
                </span>
              ))}
            </div>

            <button onClick={() => { setShowTrialOffer(false); setShowOfferTimer(true); openBuyNow && openBuyNow('A'); }} style={{
              padding: '14px 32px', border: '2px solid var(--highlight)',
              background: 'var(--highlight)', color: 'var(--ink)',
              borderRadius: '8px 12px 9px 11px / 10px 8px 12px 9px',
              fontFamily: 'var(--hand)', fontSize: 16, fontWeight: 800, cursor: 'pointer',
            }}>Upgrade & save 30% →</button>

            <div style={{ marginTop: 12, fontSize: 12, color: 'var(--ink-ghost)' }}>
              <span onClick={() => { setShowTrialOffer(false); setShowOfferTimer(true); }} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                Maybe later — I'll keep exploring
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Persistent countdown timer banner (shown after dismissing offer) */}
      {showOfferTimer && countdown > 0 && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 800,
          background: 'var(--ink)', color: 'var(--paper)', fontFamily: 'var(--hand)',
          padding: '10px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, flexWrap: 'wrap',
          borderTop: '2px solid var(--highlight)',
        }}>
          <span style={{ fontSize: 12, color: 'var(--ink-ghost)' }}>⚡ 30% OFF — Upgrade in the next</span>
          <span style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--hand-loose)', color: 'var(--highlight)', letterSpacing: 2 }}>{fmtCountdown(countdown)}</span>
          <button onClick={() => { setShowOfferTimer(false); openBuyNow && openBuyNow('A'); }} style={{
            padding: '6px 16px', border: '1.5px solid var(--highlight)',
            background: 'var(--highlight)', color: 'var(--ink)',
            borderRadius: 999, fontFamily: 'var(--hand)', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          }}>Claim 30% off →</button>
          <button onClick={() => setShowOfferTimer(false)} style={{
            background: 'transparent', border: 'none', color: 'var(--ink-ghost)', fontSize: 14, cursor: 'pointer',
          }}>✕</button>
        </div>
      )}
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
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 14px', background: 'var(--ink)', color: 'var(--paper)', borderRadius: 10, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>🔒 Sold separately</div>
        <h1 className="wf-h1" style={{ fontSize: 28, marginBottom: 8 }}>{name}</h1>
        <p className="wf-body" style={{ fontSize: 14, color: 'var(--ink-soft)', maxWidth: 480, margin: '0 auto 24px' }}>{desc}</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 28 }}>
          <button onClick={onUpgrade} style={{
            padding: '12px 24px',
            border: '1.5px solid var(--ink)', background: 'var(--ink)', color: 'var(--paper)',
            borderRadius: '6px 9px 7px 8px / 8px 6px 9px 7px',
            fontFamily: 'var(--hand)', fontSize: 14, fontWeight: 700, cursor: 'pointer',
          }}>Purchase {name} →</button>
          <button onClick={onBack} style={{
            padding: '12px 20px',
            border: '1.5px solid var(--ink)', background: 'var(--paper)',
            borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px',
            fontFamily: 'var(--hand)', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>← back</button>
        </div>

        <Box style={{ padding: 24, textAlign: 'left', background: 'var(--paper)', maxWidth: 440, margin: '0 auto 24px' }}>
          <div className="wf-eyebrow" style={{ fontSize: 10, marginBottom: 12 }}>What's included</div>
          {features.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderBottom: i < features.length - 1 ? '1px dashed var(--ink-faint)' : 'none' }}>
              <span style={{ color: 'var(--ink-faint)', fontSize: 12, marginTop: 1 }}>✓</span>
              <span style={{ fontSize: 13 }}>{f}</span>
            </div>
          ))}
        </Box>

        <div style={{ padding: '16px 20px', background: 'var(--highlight-soft)', border: '1.5px solid var(--ink)', borderRadius: '6px 9px 7px 8px / 8px 6px 9px 7px', maxWidth: 440, margin: '0 auto' }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>💡 Available as an add-on</div>
          <div className="wf-body" style={{ fontSize: 12 }}>{name} is sold separately from the base plan. Purchase individually or bundle with other modules for a discount.</div>
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
            }}>Start free — 7-day trial</button>
            <div className="wf-micro" style={{ fontSize: 10, marginTop: 8, textAlign: 'center', padding: '6px 10px', border: '1.5px dashed var(--ink-faint)', borderRadius: 6 }}>7 days free. No credit card required to start.</div>
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
            }}>Start free — 7-day trial</button>
            <div className="wf-micro" style={{ fontSize: 10, marginTop: 8, textAlign: 'center', padding: '6px 10px', border: '1.5px dashed var(--ink-faint)', borderRadius: 6 }}>7 days free. No credit card required to start.</div>
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

// ── Shared creative detail modal (used by Creative Library + Studio) ──
function CreativeDetailModal({ c, isSaved, onClose, onToggleStar, screenshotMode }) {
  const prompts = [
    'Summer vibes, bright natural lighting, product laid on linen background',
    'Minimal studio shot, soft gradient backdrop, hero product centered',
    'Lifestyle scene in urban setting, model wearing product, golden hour',
    'Close-up macro shot, highlight material texture, shallow depth of field',
    'Bold offer banner, high-contrast, sale headline overlay',
  ];
  const strategies = ['Social Proof', 'Before / After', 'Urgency', 'Product Focus', 'Brand Story'];
  const vibePool = ['Product Focus', 'Lifestyle', 'UGC Style', 'Offer Highlight', 'Bold'];
  const subType = c.subType || 'Product Ads';

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(20,20,20,0.5)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, overflow: 'auto' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: 'var(--paper)', border: '1.5px solid var(--ink)', borderRadius: '8px 12px 9px 11px / 10px 8px 12px 9px', maxWidth: 820, width: '100%', display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) 1fr', overflow: 'hidden', fontFamily: 'var(--hand)', position: 'relative' }}>
        <button onClick={onClose} className="wf-close" style={{ position: 'absolute', top: 14, right: 14, width: 28, height: 28, fontSize: 14, zIndex: 2 }}>✕</button>

        {/* Left — preview */}
        <div style={{ background: 'var(--paper-soft)', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: '1.5px solid var(--ink-faint)', minHeight: 380 }}>
          <div style={{ width: '100%', maxWidth: 300, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 8, left: 8, padding: '3px 10px', fontSize: 10, fontWeight: 700, border: '1px solid var(--ink)', borderRadius: 8, background: c.type === 'video' ? 'var(--ink)' : 'var(--paper)', color: c.type === 'video' ? 'var(--paper)' : 'var(--ink)' }}>{c.type === 'video' ? '🎬 Video' : '🖼 Image'}</div>
            <div onClick={(e) => { e.stopPropagation(); onToggleStar(); }} style={{ position: 'absolute', top: 8, right: 8, fontSize: 20, cursor: 'pointer', color: isSaved ? 'var(--highlight)' : 'var(--ink-ghost)' }}>{isSaved ? '★' : '☆'}</div>
            <div style={{ aspectRatio: '4/3', background: 'var(--paper)', border: '1.5px solid var(--ink-faint)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MockUI kind={c.type === 'video' ? 'video' : 'creative'} style={{ width: '80%', height: '80%' }} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
            <button style={{ width: 30, height: 30, borderRadius: '50%', border: '1.5px solid var(--ink)', background: 'var(--paper)', cursor: 'pointer', fontSize: 12 }}>‹</button>
            <span className="wf-body" style={{ fontSize: 12 }}>1 of 4</span>
            <button style={{ width: 30, height: 30, borderRadius: '50%', border: '1.5px solid var(--ink)', background: 'var(--paper)', cursor: 'pointer', fontSize: 12 }}>›</button>
          </div>
        </div>

        {/* Right — details */}
        <div style={{ padding: '28px 24px', overflow: 'auto', maxHeight: '85vh' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18, paddingBottom: 18, borderBottom: '1.5px solid var(--ink-faint)' }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{c.name}</h2>
              <span className="wf-body" style={{ fontSize: 13, color: 'var(--ink-faint)' }}>{c.brand} · {subType}</span>
            </div>
            <span style={{ padding: '4px 12px', fontSize: 10, fontWeight: 700, borderRadius: 8, background: c.type === 'video' ? 'var(--ink)' : 'var(--paper)', color: c.type === 'video' ? 'var(--paper)' : 'var(--ink)', border: '1px solid var(--ink)' }}>{c.type === 'video' ? '🎬 Video' : '🖼 Image'}</span>
          </div>
          <button style={{ width: '100%', padding: '14px 16px', marginBottom: 8, border: '1.5px solid var(--ink)', background: 'var(--ink)', color: 'var(--paper)', borderRadius: '6px 9px 7px 8px / 8px 6px 9px 7px', fontFamily: 'var(--hand)', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>🚀 Launch Creative</button>
          <div className="wf-body" style={{ fontSize: 11, color: 'var(--ink-faint)', textAlign: 'center', marginBottom: 20 }}>Push this creative to your connected ad platforms (Meta, TikTok, Google).</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '14px 0', borderTop: '1.5px solid var(--ink-faint)', borderBottom: '1.5px solid var(--ink-faint)' }}>
            {[['Brand', c.brand], ['Creative type', subType], ['Generated', c.daysAgo === 0 ? 'today' : c.daysAgo + ' days ago'], ['Credits used', c.type === 'video' ? '20 credits' : '4 credits']].map(([label, val], i) => (
              <div key={i}><div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 3 }}>{label}</div><div style={{ fontSize: 13, fontWeight: 600 }}>{val}</div></div>
            ))}
          </div>
          <div style={{ marginTop: 18 }}><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}><span style={{ fontSize: 13 }}>💬</span><span style={{ fontSize: 12, fontWeight: 700 }}>Prompt used</span></div><div style={{ padding: '12px 14px', background: 'var(--paper-soft)', border: '1.5px solid var(--ink-faint)', borderRadius: 6, borderLeft: '3px solid var(--ink)', fontSize: 13, fontStyle: 'italic', lineHeight: 1.5 }}>"{prompts[c.id % prompts.length]}"</div></div>
          <div style={{ marginTop: 18 }}><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}><span style={{ fontSize: 13 }}>📋</span><span style={{ fontSize: 12, fontWeight: 700 }}>Strategy</span></div><div style={{ padding: '10px 14px', background: 'var(--paper-soft)', border: '1.5px solid var(--ink-faint)', borderRadius: 6, fontSize: 13 }}>{strategies[c.id % strategies.length]}</div></div>
          <div style={{ marginTop: 18 }}><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}><span style={{ fontSize: 13 }}>✨</span><span style={{ fontSize: 12, fontWeight: 700 }}>Vibes applied</span></div><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{[vibePool[c.id % vibePool.length], vibePool[(c.id + 1) % vibePool.length]].map((v, i) => <Pill key={i} soft>{v}</Pill>)}</div></div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24, paddingTop: 18, borderTop: '1.5px solid var(--ink-faint)' }}>
            <Btn variant="ghost" style={{ fontSize: 12 }}>↓ Download</Btn>
            <Btn variant="ghost" style={{ fontSize: 12 }}>✦ Regenerate</Btn>
            <Btn variant="ghost" style={{ fontSize: 12 }}>📋 Save as Template</Btn>
            <Btn variant="ghost" style={{ fontSize: 12, color: 'var(--accent)' }}>🗑 Delete</Btn>
          </div>
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
  const [selectedCreative, setSelectedCreative] = React.useState(null);

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
              <Box key={c.id} onClick={() => setSelectedCreative(c)} style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', position: 'relative', background: 'var(--paper)' }}>
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
          <Box key={c.id} onClick={() => setSelectedCreative(c)} style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', position: 'relative', background: 'var(--paper)' }}>
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

      {/* Creative detail modal */}
      {selectedCreative && <CreativeDetailModal
        c={selectedCreative}
        isSaved={starredIds.has(selectedCreative.id)}
        onClose={() => setSelectedCreative(null)}
        onToggleStar={() => toggleStar(selectedCreative.id)}
        screenshotMode={screenshotMode}
      />}
    </div>
  );
}

// ── Discover module (Industry Insights — ad feed) ──
// ── Studio module (Genie — visual grid of all generated creatives) ──
function StudioModule({ screenshotMode, onGenerate, onMoveToLibrary }) {
  const [filter, setFilter] = React.useState('all');
  const [brand, setBrand] = React.useState('all');
  const [sort, setSort] = React.useState('newest');
  const [starredIds, setStarredIds] = React.useState(new Set([1, 6]));
  const [search, setSearch] = React.useState('');
  const [selectedCreative, setSelectedCreative] = React.useState(null);
  const [selectedIds, setSelectedIds] = React.useState(new Set());
  const [movedIds, setMovedIds] = React.useState(new Set());

  const toggleStar = (id) => setStarredIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleSelect = (id) => setSelectedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const selectAll = () => setSelectedIds(new Set(creatives.filter(c => !movedIds.has(c.id)).map(c => c.id)));
  const clearSelection = () => setSelectedIds(new Set());
  const moveToLibrary = () => { setMovedIds(prev => { const n = new Set(prev); selectedIds.forEach(id => n.add(id)); return n; }); setSelectedIds(new Set()); };

  const creatives = [
    { id: 1, name: 'Summer Tee Launch', brand: 'test', subType: 'Product Ads', type: 'image', daysAgo: 2 },
    { id: 2, name: 'Sneaker Hero Shot', brand: 'test', subType: 'Brand Ads', type: 'image', daysAgo: 3 },
    { id: 3, name: 'Linen Jacket Reel', brand: 'test', subType: 'Product Demo', type: 'video', daysAgo: 4, duration: 15 },
    { id: 4, name: 'Slim Trousers Lifestyle', brand: 'test', subType: 'Product Ads', type: 'image', daysAgo: 5 },
    { id: 5, name: 'Canvas Cap Social Post', brand: 'Glossier', subType: 'Product Asset', type: 'image', daysAgo: 7 },
    { id: 6, name: 'Tote Bag Unboxing', brand: 'test', subType: 'UGC-style Reel', type: 'video', daysAgo: 7, duration: 30 },
    { id: 7, name: 'Lipstick Promo', brand: 'Glossier', subType: 'Brand Ads', type: 'image', daysAgo: 7 },
    { id: 8, name: 'Spring Collection', brand: 'test', subType: 'Offer Highlight', type: 'image', daysAgo: 14 },
    { id: 9, name: 'Brand Story Hero', brand: 'test', subType: 'Brand Ads', type: 'image', daysAgo: 14 },
    { id: 10, name: 'Flash Sale Teaser', brand: 'test', subType: 'Brand Story', type: 'video', daysAgo: 21, duration: 6 },
    { id: 11, name: 'Holiday Gift Set', brand: 'test', subType: 'Product Ads', type: 'image', daysAgo: 30 },
    { id: 12, name: 'Campaign Launch', brand: 'Glossier', subType: 'Product Asset', type: 'image', daysAgo: 30 },
  ];

  const brands = [...new Set(creatives.map(c => c.brand))];
  const filtered = creatives.filter(c => {
    if (filter === 'image' && c.type !== 'image') return false;
    if (filter === 'video' && c.type !== 'video') return false;
    if (filter === 'fav' && !starredIds.has(c.id)) return false;
    if (brand !== 'all' && c.brand !== brand) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const imgCount = creatives.filter(c => c.type === 'image').length;
  const vidCount = creatives.filter(c => c.type === 'video').length;
  const favCount = creatives.filter(c => starredIds.has(c.id)).length;

  const studioCount = creatives.filter(c => !movedIds.has(c.id)).length;

  return (
    <div style={{ padding: '28px', fontFamily: 'var(--hand)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 6, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <span className="wf-eyebrow">Genie</span>
          <h1 className="wf-h1" style={{ fontSize: 26, marginTop: 4 }}>🎨 Studio</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1.5px solid var(--ink)', borderRadius: 999, padding: '7px 14px', minWidth: 200 }}>
          <span style={{ color: 'var(--ink-faint)', fontSize: 13 }}>⌕</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search creatives…"
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--hand)', fontSize: 12 }} />
        </div>
      </div>
      <p className="wf-body" style={{ fontSize: 13, color: 'var(--ink-faint)', marginBottom: 12 }}>
        Review generated creatives here. Select the ones you're happy with and move them to your Creative Library.
      </p>

      {/* Selection bar — shows when items are selected */}
      {selectedIds.size > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
          padding: '10px 18px', marginBottom: 14,
          background: 'var(--highlight-soft)', border: '1.5px solid var(--ink)',
          borderRadius: '6px 9px 7px 8px / 8px 6px 9px 7px', flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>{selectedIds.size} selected</span>
            <span onClick={selectAll} style={{ fontSize: 11, cursor: 'pointer', textDecoration: 'underline', color: 'var(--ink-soft)' }}>Select all</span>
            <span onClick={clearSelection} style={{ fontSize: 11, cursor: 'pointer', textDecoration: 'underline', color: 'var(--ink-soft)' }}>Clear</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn onClick={moveToLibrary}>🖼 Move to Creative Library →</Btn>
            <Btn variant="ghost" style={{ fontSize: 11 }}>🗑 Delete selected</Btn>
          </div>
        </div>
      )}

      {/* Moved success toast */}
      {movedIds.size > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', marginBottom: 14, background: 'var(--paper)', border: '1.5px solid var(--ink-faint)', borderRadius: 8 }}>
          <span style={{ fontSize: 13 }}>✓</span>
          <span className="wf-body" style={{ fontSize: 12, flex: 1 }}>{movedIds.size} creative{movedIds.size > 1 ? 's' : ''} moved to Creative Library</span>
          <span onClick={() => onMoveToLibrary && onMoveToLibrary()} style={{ fontSize: 11, cursor: 'pointer', textDecoration: 'underline', color: 'var(--ink-soft)' }}>View in Library →</span>
        </div>
      )}

      {/* Filters + brand + sort */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 4, padding: 3, border: '1.5px solid var(--ink)', borderRadius: 999 }}>
          {[
            { id: 'all', label: `All`, count: creatives.length },
            { id: 'image', label: '🖼 Images', count: imgCount },
            { id: 'video', label: '🎬 Videos', count: vidCount },
            { id: 'fav', label: '☆ Favorites', count: favCount },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              padding: '5px 12px', borderRadius: 999, border: 'none',
              background: filter === f.id ? 'var(--ink)' : 'transparent',
              color: filter === f.id ? 'var(--paper)' : 'var(--ink-soft)',
              fontFamily: 'var(--hand)', fontSize: 12, fontWeight: 700, cursor: 'pointer',
            }}>{f.label} <span style={{ opacity: 0.7 }}>{f.count}</span></button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="wf-eyebrow" style={{ fontSize: 9 }}>Brand</span>
            <select value={brand} onChange={(e) => setBrand(e.target.value)} style={{ padding: '5px 10px', border: '1.5px solid var(--ink)', borderRadius: 999, fontFamily: 'var(--hand)', fontSize: 11, background: 'var(--paper)', cursor: 'pointer' }}>
              <option value="all">All brands</option>
              {brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="wf-eyebrow" style={{ fontSize: 9 }}>Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ padding: '5px 10px', border: '1.5px solid var(--ink)', borderRadius: 999, fontFamily: 'var(--hand)', fontSize: 11, background: 'var(--paper)', cursor: 'pointer' }}>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="name">By name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Creative grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
        {filtered.filter(c => !movedIds.has(c.id)).map(c => {
          const isSaved = starredIds.has(c.id);
          const isSelected = selectedIds.has(c.id);
          return (
            <Box key={c.id} onClick={() => setSelectedCreative(c)} style={{
              padding: 0, overflow: 'hidden', cursor: 'pointer', background: 'var(--paper)', position: 'relative',
              border: isSelected ? '2px solid var(--ink)' : undefined,
              boxShadow: isSelected ? '0 0 0 2px var(--highlight)' : undefined,
            }}>
              {/* Selection checkbox */}
              <div onClick={(e) => { e.stopPropagation(); toggleSelect(c.id); }} style={{
                position: 'absolute', top: 8, left: 8, zIndex: 2,
                width: 22, height: 22, borderRadius: 4,
                border: '1.5px solid var(--ink)',
                background: isSelected ? 'var(--ink)' : 'var(--paper)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: 12, color: 'var(--paper)',
              }}>{isSelected ? '✓' : ''}</div>
              {/* Type badge */}
              <div style={{ position: 'absolute', top: 8, left: 38, padding: '3px 10px', fontSize: 10, fontWeight: 700, border: '1px solid var(--ink)', borderRadius: 8, background: c.type === 'video' ? 'var(--ink)' : 'var(--paper)', color: c.type === 'video' ? 'var(--paper)' : 'var(--ink)', zIndex: 1 }}>
                {c.type === 'video' ? '🎬 Video' : '🖼 Image'}
              </div>
              {/* Star */}
              <div onClick={(e) => { e.stopPropagation(); toggleStar(c.id); }} style={{ position: 'absolute', top: 8, right: 8, fontSize: 18, cursor: 'pointer', color: isSaved ? 'var(--highlight)' : 'var(--ink-ghost)', zIndex: 1 }}>
                {isSaved ? '★' : '☆'}
              </div>
              {/* Duration badge for video */}
              {c.type === 'video' && c.duration && (
                <div style={{ position: 'absolute', bottom: 62, right: 8, padding: '2px 8px', background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 10, zIndex: 1 }}>{c.duration}s</div>
              )}
              {/* Thumbnail */}
              <div style={{ aspectRatio: '1', background: isSelected ? 'var(--highlight-soft)' : 'var(--paper-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 80ms' }}>
                <MockUI kind={c.type === 'video' ? 'video' : 'creative'} style={{ width: '75%', height: '75%' }} />
              </div>
              {/* Info */}
              <div style={{ padding: '10px 12px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{c.name}</div>
                <div className="wf-micro" style={{ fontSize: 10 }}>{c.brand} · {c.subType} · {c.daysAgo === 0 ? 'today' : c.daysAgo + (c.daysAgo === 1 ? ' day ago' : ' days ago')}</div>
              </div>
            </Box>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--ink-faint)' }}>
          <div style={{ fontSize: 32, marginBottom: 8, opacity: 0.4 }}>🎨</div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>No creatives match this filter.</div>
        </div>
      )}

      {/* Creative detail modal */}
      {selectedCreative && <CreativeDetailModal
        c={selectedCreative}
        isSaved={starredIds.has(selectedCreative.id)}
        onClose={() => setSelectedCreative(null)}
        onToggleStar={() => toggleStar(selectedCreative.id)}
        screenshotMode={screenshotMode}
      />}
    </div>
  );
}

// ── Templates module (Genie) ──
function TemplatesModule({ screenshotMode }) {
  const [filter, setFilter] = React.useState('all');
  const [category, setCategory] = React.useState('all');
  const [showUpload, setShowUpload] = React.useState(false);

  const templates = [
    { id: 1, name: 'Product Hero — Minimal', cat: 'Product Ads', type: 'image', used: 24 },
    { id: 2, name: 'Social Proof Card', cat: 'Social Proof', type: 'image', used: 18 },
    { id: 3, name: 'Flash Sale Countdown', cat: 'Urgency', type: 'video', used: 12, duration: 15 },
    { id: 4, name: 'Before / After', cat: 'Comparison', type: 'image', used: 21 },
    { id: 5, name: 'Brand Story Hero', cat: 'Brand Story', type: 'image', used: 9 },
    { id: 6, name: 'Brand Story Reel', cat: 'Brand Story', type: 'video', used: 6, duration: 30 },
    { id: 7, name: 'Lifestyle Product Shot', cat: 'Product Ads', type: 'image', used: 15 },
    { id: 8, name: 'Offer Highlight', cat: 'Product Ads', type: 'image', used: 11 },
    { id: 9, name: 'Testimonial Reel', cat: 'Social Proof', type: 'video', used: 7, duration: 20 },
    { id: 10, name: 'Limited Time Banner', cat: 'Urgency', type: 'image', used: 8 },
  ];

  const categories = [...new Set(templates.map(t => t.cat))];
  const imgCount = templates.filter(t => t.type === 'image').length;
  const vidCount = templates.filter(t => t.type === 'video').length;

  const filtered = templates.filter(t => {
    if (filter === 'image' && t.type !== 'image') return false;
    if (filter === 'video' && t.type !== 'video') return false;
    if (filter === 'uploaded') return false; // no uploaded templates in sample
    if (category !== 'all' && t.cat !== category) return false;
    return true;
  });

  return (
    <div style={{ padding: '28px', fontFamily: 'var(--hand)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 className="wf-h1" style={{ fontSize: 26 }}>📋 Templates</h1>
          <span style={{ padding: '2px 10px', border: '1.5px solid var(--ink-faint)', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>{templates.length}</span>
        </div>
        <Btn onClick={() => setShowUpload(true)}>+ Upload Template</Btn>
      </div>

      <div className="wf-divider-dashed" style={{ marginBottom: 14 }} />

      <p className="wf-body" style={{ fontSize: 13, color: 'var(--ink-faint)', marginBottom: 20 }}>
        Saved references Genie uses as inspiration. Use them from Creative Generation to draft ads in a matching style.
      </p>

      {/* Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 4, padding: 3, border: '1.5px solid var(--ink)', borderRadius: 999 }}>
          {[
            { id: 'all', label: 'All', count: templates.length },
            { id: 'image', label: '🖼 Image', count: imgCount },
            { id: 'video', label: '🎬 Video', count: vidCount },
            { id: 'uploaded', label: '📤 Uploaded', count: 0 },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              padding: '5px 14px', borderRadius: 999, border: 'none',
              background: filter === f.id ? 'var(--ink)' : 'transparent',
              color: filter === f.id ? 'var(--paper)' : 'var(--ink-soft)',
              fontFamily: 'var(--hand)', fontSize: 12, fontWeight: 700, cursor: 'pointer',
            }}>{f.label} <span style={{ opacity: 0.6 }}>{f.count}</span></button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="wf-eyebrow" style={{ fontSize: 9 }}>Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '5px 10px', border: '1.5px solid var(--ink)', borderRadius: 999, fontFamily: 'var(--hand)', fontSize: 11, background: 'var(--paper)', cursor: 'pointer' }}>
            <option value="all">All categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Template grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 14 }}>
        {filtered.map(t => (
          <Box key={t.id} style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', background: 'var(--paper)' }}>
            <div style={{ position: 'relative', aspectRatio: '1', background: 'var(--paper-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', top: 8, left: 8, padding: '3px 10px', fontSize: 10, fontWeight: 700, border: '1px solid var(--ink)', borderRadius: 8, background: t.type === 'video' ? 'var(--ink)' : 'var(--paper)', color: t.type === 'video' ? 'var(--paper)' : 'var(--ink)' }}>
                {t.type === 'video' ? '🎬 Video' : '🖼 Image'}
              </div>
              {t.type === 'video' && t.duration && (
                <div style={{ position: 'absolute', bottom: 8, right: 8, padding: '2px 8px', background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 10 }}>{t.duration}s</div>
              )}
              <MockUI kind={t.type === 'video' ? 'video' : 'creative'} style={{ width: '70%', height: '70%' }} />
            </div>
            <div style={{ padding: '10px 12px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{t.name}</div>
              <div className="wf-micro" style={{ fontSize: 10 }}>{t.cat} · used {t.used}×</div>
            </div>
          </Box>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--ink-faint)' }}>
          <div style={{ fontSize: 32, marginBottom: 8, opacity: 0.4 }}>📋</div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>No templates match this filter.</div>
        </div>
      )}

      {/* Upload modal */}
      {showUpload && (
        <div onClick={() => setShowUpload(false)} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(20,20,20,0.45)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'var(--paper)', border: '1.5px solid var(--ink)', borderRadius: '8px 12px 9px 11px / 10px 8px 12px 9px', width: 440, padding: '28px', fontFamily: 'var(--hand)', position: 'relative' }}>
            <button onClick={() => setShowUpload(false)} className="wf-close" style={{ position: 'absolute', top: 14, right: 14, width: 24, height: 24, fontSize: 12 }}>✕</button>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Upload a template</h3>
            <p className="wf-body" style={{ fontSize: 12, color: 'var(--ink-faint)', marginBottom: 18 }}>Add your own reference — Genie will use it as inspiration.</p>
            <div style={{ border: '2px dashed var(--ink-faint)', borderRadius: 10, padding: 28, textAlign: 'center', cursor: 'pointer', marginBottom: 16 }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>📁</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Click to upload or drag & drop</div>
              <div className="wf-micro" style={{ fontSize: 10, marginTop: 4 }}>PNG, JPG, MP4 · up to 20 MB</div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 6 }}>Template name</div>
              <input className="wf-field" placeholder="e.g., My Brand Hero Shot" style={{ width: '100%', padding: '10px 12px', fontSize: 13 }} />
            </div>
            <div style={{ marginBottom: 18 }}>
              <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 6 }}>Category</div>
              <select className="wf-field" style={{ width: '100%', padding: '8px 12px', fontSize: 12 }}>
                <option>Product Ads</option><option>Brand Story</option><option>Social Proof</option><option>Urgency</option><option>Comparison</option><option>Other</option>
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <Btn variant="ghost" onClick={() => setShowUpload(false)}>Cancel</Btn>
              <Btn onClick={() => setShowUpload(false)}>Upload & Save</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Brands module (Genie) ──
function BrandsModule({ screenshotMode, onGenerate }) {
  const brandsData = [
    { id: 'airbnb', name: 'Airbnb', icon: 'A', industry: 'Travel', domain: 'airbnb.com', tone: 'Warm, Adventurous, Belonging', typography: 'Cereal, Circular', guidelines: 'Belong anywhere. Focus on experiences, not just places.', products: [['🏖','Experiences','airbnb.com/experiences'],['🏡','Luxe Collection','airbnb.com/luxe']], competitors: [['B','Booking.com','booking.com · Travel',['Ad creatives','Messaging']],['V','Vrbo','vrbo.com · Travel',['Visual style','Promotions']],['E','Expedia','expedia.com · Travel',['Social posts']]] },
    { id: 'amalfa', name: 'amalfa.com', icon: 'a', industry: 'DTC', domain: 'Amalfa', tone: 'Modern, Approachable', typography: 'Inter, Sans-serif', guidelines: 'Effortless style.', products: [], competitors: [] },
    { id: 'apple', name: 'Apple', icon: '🍎', industry: 'Technology', domain: 'apple.com', tone: 'Minimal, Aspirational', typography: 'SF Pro Display', guidelines: 'Think different.', products: [['📱','iPhone','apple.com/iphone']], competitors: [['S','Samsung','samsung.com · Tech',['Ad creatives']]] },
    { id: 'duolingo', name: 'Duolingo', icon: '🦉', industry: 'Education', domain: 'duolingo.com', tone: 'Playful, Encouraging', typography: 'Feather Bold', guidelines: 'Make learning addictive.', products: [], competitors: [] },
    { id: 'glossier', name: 'Glossier', icon: 'G', industry: 'Health & Beauty', domain: 'glossier.com', tone: 'Friendly, Real', typography: 'Surveyor, Graphik', guidelines: 'Skin first.', products: [], competitors: [] },
    { id: 'google', name: 'google', icon: 'g', industry: 'DTC', domain: 'google.com', tone: 'Helpful, Smart', typography: 'Google Sans', guidelines: 'Focus on the user.', products: [], competitors: [] },
    { id: 'lululemon', name: 'Lululemon', icon: 'L', industry: 'Fashion & Apparel', domain: 'lululemon.com', tone: 'Aspirational, Bold', typography: 'Pangea', guidelines: 'Elevate from mediocrity.', products: [], competitors: [] },
    { id: 'nike', name: 'Nike', icon: '✓', industry: 'Fashion & Apparel', domain: 'nike.com', tone: 'Bold, Inspirational', typography: 'Futura', guidelines: 'Just do it.', products: [], competitors: [] },
    { id: 'notion', name: 'Notion', icon: 'N', industry: 'Technology', domain: 'notion.so', tone: 'Calm, Intelligent', typography: 'Inter', guidelines: 'One workspace.', products: [], competitors: [] },
    { id: 'spotify', name: 'Spotify', icon: '♫', industry: 'Technology', domain: 'spotify.com', tone: 'Personal, Playful', typography: 'Spotify Circular', guidelines: 'Music for every moment.', products: [], competitors: [] },
    { id: 'stripe', name: 'Stripe', icon: 'S', industry: 'Financial Services', domain: 'stripe.com', tone: 'Technical, Elegant', typography: 'Stripe Sans', guidelines: 'Increase the GDP of the internet.', products: [], competitors: [] },
    { id: 'tesla', name: 'Tesla', icon: 'T', industry: 'Automotive', domain: 'tesla.com', tone: 'Bold, Futuristic', typography: 'Gotham', guidelines: 'Sustainable energy.', products: [], competitors: [] },
  ];

  const [selectedBrand, setSelectedBrand] = React.useState(null);
  const [showAddBrand, setShowAddBrand] = React.useState(false);
  const [detailTab, setDetailTab] = React.useState('overview');

  // ── Brand detail view ──
  if (selectedBrand) {
    const b = brandsData.find(x => x.id === selectedBrand) || brandsData[0];
    return (
      <div style={{ padding: '28px', fontFamily: 'var(--hand)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
          <button onClick={() => setSelectedBrand(null)} style={{ width: 32, height: 32, borderRadius: '50%', border: '1.5px solid var(--ink)', background: 'var(--paper)', cursor: 'pointer', fontSize: 12 }}>←</button>
          <div style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700 }}>{b.icon}</div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>{b.name}</h1>
            <span className="wf-body" style={{ fontSize: 12, color: 'var(--ink-faint)' }}>{b.industry}</span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1,2,3].map(i => <div key={i} style={{ width: 18, height: 18, borderRadius: '50%', background: `hsl(${i*60},0%,${30+i*15}%)`, border: '1px solid var(--ink-faint)' }} />)}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'inline-flex', gap: 0, padding: 3, background: 'var(--paper-soft)', border: '1.5px solid var(--ink-faint)', borderRadius: 8, marginBottom: 20 }}>
          {['Overview','Strategies','Library'].map(t => (
            <button key={t} onClick={() => setDetailTab(t.toLowerCase())} style={{
              padding: '8px 18px', borderRadius: 6, border: 'none',
              background: detailTab === t.toLowerCase() ? 'var(--paper)' : 'transparent',
              fontFamily: 'var(--hand)', fontSize: 13, fontWeight: detailTab === t.toLowerCase() ? 700 : 400,
              cursor: 'pointer', boxShadow: detailTab === t.toLowerCase() ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
            }}>{t}</button>
          ))}
        </div>

        {detailTab === 'overview' && (
          <React.Fragment>
            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 16 }}>
              {[['🌐 Website','https://'+b.domain,'✓ Connected'],['📦 Products',b.products.length,'Synced items'],['⏱ Last synced','Never','Auto-sync enabled'],['🖼 Assets created','0','+6 this week']].map(([l,v,h],i) => (
                <Box key={i} style={{ padding: 14 }}><div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 6 }}>{l}</div><div style={{ fontSize: 14, fontWeight: 700 }}>{v}</div><div className="wf-micro" style={{ fontSize: 10, marginTop: 4 }}>{h}</div></Box>
              ))}
            </div>
            {/* Style row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 18 }}>
              <Box style={{ padding: 14 }}><div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 8 }}>🎨 Brand colors</div><div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 11 }}>{[1,2,3].map(i=><React.Fragment key={i}><div style={{ width: 16, height: 16, borderRadius: 3, background: `hsl(${i*80},40%,${30+i*10}%)` }} /><code style={{ background: 'var(--paper-soft)', padding: '1px 4px', borderRadius: 3, fontSize: 10 }}>#{(i*111111).toString(16).slice(0,6)}</code></React.Fragment>)}</div></Box>
              <Box style={{ padding: 14 }}><div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 8 }}>🔤 Typography</div><div style={{ fontSize: 13, fontWeight: 600 }}><strong>{b.typography.split(',')[0]}</strong>{b.typography.includes(',') ? ', '+b.typography.split(',').slice(1).join(',') : ''}</div></Box>
              <Box style={{ padding: 14 }}><div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 8 }}>💬 Brand tone</div><div style={{ fontSize: 13, fontWeight: 600 }}>{b.tone}</div></Box>
            </div>
            {/* CTAs */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
              <Btn onClick={onGenerate}>✦ Generate Ad Creative</Btn>
              <Btn variant="ghost">🖼 Generate Product Assets</Btn>
            </div>
            {/* Edit form */}
            <Box style={{ padding: 22, marginBottom: 16 }}>
              <div className="wf-eyebrow" style={{ fontSize: 10, marginBottom: 14 }}>Edit Brand Details</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 14 }}>
                <div><div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Name</div><input className="wf-field" defaultValue={b.name} style={{ width: '100%', padding: '10px 12px', fontSize: 13 }} /></div>
                <div><div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Domain / Website</div><input className="wf-field" defaultValue={'https://'+b.domain} style={{ width: '100%', padding: '10px 12px', fontSize: 13 }} /></div>
                <div><div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Industry</div><select className="wf-field" defaultValue={b.industry} style={{ width: '100%', padding: '8px 12px', fontSize: 12 }}>{['Travel','Technology','Fashion & Apparel','Health & Beauty','Financial Services','Automotive','DTC','Education','Other'].map(i=><option key={i}>{i}</option>)}</select></div>
                <div><div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Tone</div><input className="wf-field" defaultValue={b.tone} style={{ width: '100%', padding: '10px 12px', fontSize: 13 }} /></div>
              </div>
              <div style={{ marginBottom: 14 }}><div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Guidelines</div><textarea className="wf-field" defaultValue={b.guidelines} rows={2} style={{ width: '100%', padding: '10px 12px', fontSize: 12, resize: 'vertical' }} /></div>
              <div style={{ display: 'flex', gap: 10 }}><Btn>Save Changes</Btn><Btn variant="ghost" style={{ color: 'var(--accent)' }}>🗑 Delete Brand</Btn></div>
            </Box>
            {/* Products */}
            <Box style={{ padding: 22, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
                <div className="wf-eyebrow" style={{ fontSize: 10, display: 'flex', alignItems: 'center', gap: 6 }}>📦 Product Catalog <span style={{ padding: '1px 8px', border: '1px solid var(--ink-faint)', borderRadius: 10, fontSize: 10 }}>{b.products.length}</span></div>
                <div style={{ display: 'flex', gap: 8 }}><Btn variant="ghost" style={{ fontSize: 11 }}>🔄 Sync Now</Btn><Btn variant="ghost" style={{ fontSize: 11 }}>+ Add Product</Btn></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
                {b.products.map(([emoji,name,url],i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', border: '1.5px solid var(--ink-faint)', borderRadius: 6 }}>
                    <div style={{ width: 36, height: 36, background: 'var(--paper-soft)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{emoji}</div>
                    <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700 }}>{name}</div><div className="wf-micro" style={{ fontSize: 10 }}>{url}</div></div>
                    <span style={{ fontSize: 12, color: 'var(--ink-faint)' }}>↗</span>
                  </div>
                ))}
              </div>
            </Box>
            {/* Competitors */}
            <Box style={{ padding: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                <div className="wf-eyebrow" style={{ fontSize: 10, display: 'flex', alignItems: 'center', gap: 6 }}>⚖ Competitors <span style={{ padding: '1px 8px', border: '1px solid var(--ink-faint)', borderRadius: 10, fontSize: 10 }}>{b.competitors.length}</span></div>
                <Btn variant="ghost" style={{ fontSize: 11 }}>+ Add Competitor</Btn>
              </div>
              <p className="wf-body" style={{ fontSize: 11, color: 'var(--ink-faint)', marginBottom: 12 }}>Brands we track for inspiration — we'll apply their winning moves to your creatives.</p>
              {b.competitors.map(([letter,name,meta,tags],i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < b.competitors.length-1 ? '1px solid var(--ink-ghost)' : 'none', flexWrap: 'wrap' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', border: '1.5px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{letter}</div>
                  <div style={{ flex: 1, minWidth: 120 }}><div style={{ fontSize: 13, fontWeight: 700 }}>{name}</div><div className="wf-micro" style={{ fontSize: 10 }}>{meta}</div></div>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>{tags.map((t,j)=><Pill key={j} soft style={{ fontSize: 10 }}>{t}</Pill>)}</div>
                  <span style={{ fontSize: 12, color: 'var(--ink-faint)', cursor: 'pointer' }}>✕</span>
                </div>
              ))}
            </Box>
          </React.Fragment>
        )}
        {detailTab !== 'overview' && (
          <div style={{ textAlign: 'center', padding: 48, color: 'var(--ink-faint)' }}>
            <div style={{ fontSize: 32, marginBottom: 8, opacity: 0.4 }}>{detailTab === 'strategies' ? '📋' : '🖼'}</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{detailTab === 'strategies' ? 'Strategies' : 'Library'}</div>
            <div className="wf-body" style={{ fontSize: 12, marginTop: 4 }}>Coming next sprint</div>
          </div>
        )}
      </div>
    );
  }

  // ── Brand grid view ──
  return (
    <div style={{ padding: '28px', fontFamily: 'var(--hand)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 className="wf-h1" style={{ fontSize: 26 }}>🏷 Brands</h1>
          <span style={{ padding: '2px 10px', border: '1.5px solid var(--ink-faint)', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>{brandsData.length}</span>
        </div>
        <Btn onClick={() => setShowAddBrand(true)}>+ Add Brand</Btn>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
        {brandsData.map(b => (
          <Box key={b.id} onClick={() => { setSelectedBrand(b.id); setDetailTab('overview'); }} style={{ padding: 20, cursor: 'pointer', background: 'var(--paper)' }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', border: '1.5px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{b.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{b.name}</div>
            <div className="wf-body" style={{ fontSize: 11, color: 'var(--ink-faint)', marginBottom: 10 }}>{b.industry}</div>
            <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
              {[1,2,3].map(i => <div key={i} style={{ width: 14, height: 14, borderRadius: '50%', background: `hsl(0,0%,${40+i*15}%)` }} />)}
            </div>
            <div className="wf-micro" style={{ fontSize: 10, borderTop: '1px solid var(--ink-ghost)', paddingTop: 8 }}>🌐 {b.domain}</div>
          </Box>
        ))}
      </div>

      {/* Add Brand Modal */}
      {showAddBrand && (
        <div onClick={() => setShowAddBrand(false)} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(20,20,20,0.45)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'var(--paper)', border: '1.5px solid var(--ink)', borderRadius: '8px 12px 9px 11px / 10px 8px 12px 9px', width: 440, padding: '28px', fontFamily: 'var(--hand)', position: 'relative' }}>
            <button onClick={() => setShowAddBrand(false)} className="wf-close" style={{ position: 'absolute', top: 14, right: 14, width: 28, height: 28, fontSize: 14 }}>✕</button>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Add a new brand</h3>
            <p className="wf-body" style={{ fontSize: 12, color: 'var(--ink-faint)', marginBottom: 20 }}>We'll auto-pull products, colors, and branding.</p>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Store URL <span style={{ color: 'var(--accent)' }}>*</span></div>
              <input className="wf-field" placeholder="https://yourstore.com" style={{ width: '100%', padding: '12px 14px', fontSize: 14 }} />
              <div className="wf-micro" style={{ marginTop: 6, fontSize: 10 }}>Works with Shopify, WooCommerce, Amazon, and most platforms.</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Brand name <span style={{ fontWeight: 400, color: 'var(--ink-faint)' }}>(optional — we'll detect from your store)</span></div>
              <input className="wf-field" placeholder="e.g., Aurora Apparel" style={{ width: '100%', padding: '12px 14px', fontSize: 14 }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Industry</div>
              <select className="wf-field" style={{ width: '100%', padding: '10px 12px', fontSize: 13 }}>
                <option>Auto-detect</option><option>Travel</option><option>Technology</option><option>Fashion & Apparel</option><option>Health & Beauty</option><option>Financial Services</option><option>Automotive</option><option>DTC</option><option>Education</option><option>Other</option>
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <Btn variant="ghost" onClick={() => setShowAddBrand(false)}>Cancel</Btn>
              <Btn onClick={() => setShowAddBrand(false)}>Analyze & Add →</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Categories module (Genie) ──
function CategoriesModule({ screenshotMode }) {
  const [showAdd, setShowAdd] = React.useState(false);

  const categories = [
    { icon: '🚗', name: 'test category 1', industry: 'IINsurance', refs: 0 },
    { icon: '🛡', name: 'Life Insurance', industry: 'Insurance', refs: 1 },
    { icon: '🏠', name: 'Home Insurance', industry: 'Insurance', refs: 1 },
    { icon: '🐾', name: 'Pet Insurance', industry: 'Insurance', refs: 1 },
    { icon: '✈️', name: 'Travel Insurance', industry: 'Insurance', refs: 1 },
    { icon: '🦷', name: 'Dental Plans', industry: 'Insurance', refs: 1 },
    { icon: '👓', name: 'Vision Plans', industry: 'Insurance', refs: 1 },
    { icon: '💳', name: 'Credit Cards', industry: 'Finance', refs: 1 },
    { icon: '🏡', name: 'Mortgage', industry: 'Finance', refs: 1 },
    { icon: '🎓', name: 'Student Loans', industry: 'Finance', refs: 1 },
    { icon: '🏢', name: 'Business Loans', industry: 'Finance', refs: 1 },
    { icon: '📉', name: 'Debt Relief', industry: 'Finance', refs: 1 },
    { icon: '📋', name: 'Tax Services', industry: 'Finance', refs: 1 },
    { icon: '₿', name: 'Crypto Trading', industry: 'Finance', refs: 1 },
    { icon: '📈', name: 'Stock Trading', industry: 'Finance', refs: 1 },
  ];

  return (
    <div style={{ padding: '28px', fontFamily: 'var(--hand)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 className="wf-h1" style={{ fontSize: 26 }}>📁 Categories</h1>
          <span style={{ padding: '2px 10px', border: '1.5px solid var(--ink-faint)', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>67</span>
        </div>
        <Btn onClick={() => setShowAdd(true)}>+ Add Category</Btn>
      </div>

      <div className="wf-divider-dashed" style={{ marginBottom: 20 }} />

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 14 }}>
        {categories.map((c, i) => (
          <Box key={i} style={{ padding: 20, cursor: 'pointer', background: 'var(--paper)' }}>
            <div style={{
              width: 42, height: 42, borderRadius: 10,
              background: 'var(--paper-soft)', border: '1.5px solid var(--ink-faint)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, marginBottom: 12,
            }}>{c.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{c.name}</div>
            <div className="wf-body" style={{ fontSize: 11, color: 'var(--ink-faint)', marginBottom: 8 }}>{c.industry}</div>
            {c.refs > 0 && (
              <div className="wf-micro" style={{ fontSize: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 11 }}>🔗</span> {c.refs} reference URL
              </div>
            )}
          </Box>
        ))}
      </div>

      {/* Add Category Modal */}
      {showAdd && (
        <div onClick={() => setShowAdd(false)} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(20,20,20,0.45)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'var(--paper)', border: '1.5px solid var(--ink)', borderRadius: '8px 12px 9px 11px / 10px 8px 12px 9px', width: 440, padding: '28px', fontFamily: 'var(--hand)', position: 'relative' }}>
            <button onClick={() => setShowAdd(false)} className="wf-close" style={{ position: 'absolute', top: 14, right: 14, width: 28, height: 28, fontSize: 14 }}>✕</button>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Add a new category</h3>
            <p className="wf-body" style={{ fontSize: 12, color: 'var(--ink-faint)', marginBottom: 20 }}>Categories help Genie build dedicated knowledge for each vertical you promote.</p>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Category name <span style={{ color: 'var(--accent)' }}>*</span></div>
              <input className="wf-field" placeholder="e.g., Auto Insurance" style={{ width: '100%', padding: '12px 14px', fontSize: 14 }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Industry</div>
              <select className="wf-field" style={{ width: '100%', padding: '10px 12px', fontSize: 13 }}>
                <option>Insurance</option><option>Finance</option><option>Technology</option><option>Health & Wellness</option><option>Travel</option><option>E-commerce</option><option>Education</option><option>Other</option>
              </select>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Icon <span style={{ fontWeight: 400, color: 'var(--ink-faint)' }}>(optional)</span></div>
              <input className="wf-field" placeholder="🏷 (or any emoji)" maxLength={4} style={{ width: 100, padding: '10px 12px', fontSize: 14 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <Btn variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Btn>
              <Btn onClick={() => setShowAdd(false)}>Create category</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DiscoverModule({ screenshotMode, onSave }) {
  const [status, setStatus] = React.useState('all');
  const [type, setType] = React.useState('all');
  const [running, setRunning] = React.useState('all');
  const [industry, setIndustry] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const [sort, setSort] = React.useState('recent');
  const [savedIds, setSavedIds] = React.useState(new Set([3, 8, 14]));
  const [addToBoardAd, setAddToBoardAd] = React.useState(null);

  const toggleSave = (id) => setSavedIds(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const industries = ['E-commerce', 'Insurance', 'Finance', 'SaaS', 'Health & Wellness', 'Education', 'Real Estate'];
  const brandNames = ['StyleHaus', 'GlowSkin Co.', 'FitPulse', 'CoverMe Insurance', 'QuickLend', 'EduPath', 'HomeFinder', 'WellNest', 'TechGear', 'PetCare Plus', 'TravelEasy', 'FoodBox'];
  const captions = [
    'Summer collection just dropped — swipe to see the lookbook 🔥',
    'This is how we make insurance simple. No jargon, just coverage.',
    'Will this be your startup stack? ☕ RT if you agree',
    '"I lost 30 lbs in 90 days using this one trick" — real results inside',
    'Why 50,000+ marketers switched to our platform this year',
    'POV: You just saved $400 on your home insurance 🏠',
    'BREAKING: We just launched our biggest feature ever 🚀',
    'The difference between good ads and great ads? Watch this.',
    'Stop scrolling. Your dream kitchen is 60% off this weekend only.',
    'என் தங்கச்சி Episode - 9 🎬',
    'Is this game unlocked yet? 🎮 Drop a comment below',
    'This is exactly what I needed — thank you! 💬',
    'We know what works. 50M+ impressions across 12 verticals.',
    'The #1 mistake first-time home buyers make (and how to fix it)',
    'New drop alert 🚨 Limited to 500 units — don\'t sleep on it.',
    '3 reasons this product will change your morning routine',
    'Just launched: AI-powered creative testing for media buyers',
    'Our CEO sat down with @TechReview — full interview inside',
    'The secret ingredient? Consistency. And great creative.',
    'Is performance marketing dead? Let\'s talk about it 👇',
  ];

  const allAds = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    brand: brandNames[i % brandNames.length],
    industry: industries[i % industries.length],
    caption: captions[i % captions.length],
    type: ['static', 'dynamic', 'carousel', 'static', 'dynamic'][i % 5],
    status: i % 7 === 0 ? 'inactive' : 'active',
    runDays: [1, 2, 3, 5, 7, 10, 14, 21, 30, 45, 60, 61][i % 12],
    likes: Math.floor(Math.random() * 5000) + 100,
    shares: Math.floor(Math.random() * 800) + 10,
    hasVideo: i % 3 === 1,
  }));

  const filtered = allAds.filter(ad => {
    if (status !== 'all' && ad.status !== status) return false;
    if (type !== 'all' && ad.type !== type) return false;
    if (running === '7' && ad.runDays > 7) return false;
    if (running === '15' && ad.runDays > 15) return false;
    if (running === '30' && ad.runDays > 30) return false;
    if (industry !== 'all' && ad.industry !== industry) return false;
    if (search && !ad.brand.toLowerCase().includes(search.toLowerCase()) && !ad.caption.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const hs = { fontFamily: 'var(--hand)' };

  const FilterPill = ({ label, value, onChange, options }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span className="wf-micro" style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 700, color: 'var(--ink-faint)' }}>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={{
        padding: '6px 10px', border: '1.5px solid var(--ink)', borderRadius: 999,
        background: 'var(--paper)', fontFamily: 'var(--hand)', fontSize: 11, cursor: 'pointer',
      }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );

  return (
    <div style={{ padding: '28px', ...hs }}>
      {/* header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="wf-eyebrow">Industry Insights</span>
            <span style={{ fontSize: 10, padding: '2px 8px', background: 'var(--highlight)', borderRadius: 8, fontWeight: 700 }}>LIVE FEED</span>
          </div>
          <h1 className="wf-h1" style={{ fontSize: 26, marginTop: 4 }}>◎ Discover</h1>
          <p className="wf-body" style={{ fontSize: 13, marginTop: 4, color: 'var(--ink-faint)' }}>Browse active and past ads across industries. Save winners to your boards.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn variant="ghost" onClick={onSave}>▤ My boards</Btn>
        </div>
      </div>

      {/* filters bar */}
      <Box style={{ padding: '14px 18px', marginBottom: 18, background: 'var(--paper)', display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'flex-end' }}>
        <FilterPill label="Status" value={status} onChange={setStatus} options={[
          { value: 'all', label: 'All' },
          { value: 'active', label: '● Active' },
          { value: 'inactive', label: '○ Inactive' },
        ]} />
        <FilterPill label="Type" value={type} onChange={setType} options={[
          { value: 'all', label: 'All types' },
          { value: 'static', label: 'Static' },
          { value: 'dynamic', label: 'Dynamic' },
          { value: 'carousel', label: 'Carousel' },
        ]} />
        <FilterPill label="Running since" value={running} onChange={setRunning} options={[
          { value: 'all', label: 'Any time' },
          { value: '7', label: '7 days' },
          { value: '15', label: '15 days' },
          { value: '30', label: '30 days' },
        ]} />
        <FilterPill label="Industry" value={industry} onChange={setIndustry} options={[
          { value: 'all', label: 'All industries' },
          ...industries.map(i => ({ value: i, label: i })),
        ]} />

        {/* spacer */}
        <div style={{ flex: 1 }} />

        {/* search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1.5px solid var(--ink)', borderRadius: 999, padding: '6px 12px', minWidth: 200 }}>
          <span style={{ color: 'var(--ink-faint)', fontSize: 13 }}>⌕</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brand or keyword…"
            style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--hand)', fontSize: 12, flex: 1 }}
          />
        </div>

        {/* sort */}
        <FilterPill label="Sort" value={sort} onChange={setSort} options={[
          { value: 'recent', label: 'Most recent' },
          { value: 'longest', label: 'Longest running' },
          { value: 'likes', label: 'Most liked' },
        ]} />
      </Box>

      {/* results count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span className="wf-body" style={{ fontSize: 12, color: 'var(--ink-faint)' }}>Showing {filtered.length} ads</span>
        <span className="wf-body" style={{ fontSize: 12, color: 'var(--ink-faint)' }}>{savedIds.size} saved to boards</span>
      </div>

      {/* masonry-like ad grid */}
      <div style={{ columnCount: 4, columnGap: 14 }}>
        {filtered.map(ad => {
          const isSaved = savedIds.has(ad.id);
          const aspectH = [220, 300, 260, 340, 280, 320, 240, 360][ad.id % 8];
          return (
            <Box key={ad.id} style={{
              padding: 0, overflow: 'hidden', marginBottom: 14, breakInside: 'avoid',
              background: 'var(--paper)', cursor: 'pointer',
              border: isSaved ? '2px solid var(--ink)' : undefined,
            }}>
              {/* ad header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderBottom: '1px solid var(--ink-ghost)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <span style={{ fontSize: 6, color: ad.status === 'active' ? '#22c55e' : 'var(--ink-faint)' }}>●</span>
                  <span className="wf-micro" style={{ fontSize: 9 }}>{ad.status}</span>
                </div>
                <span className="wf-micro" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>·</span>
                <span className="wf-micro" style={{ fontSize: 9 }}>since: {ad.runDays > 60 ? '61 Days' : ad.runDays + (ad.runDays === 1 ? ' Day' : ' Days')}</span>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
                  <span style={{ fontSize: 12, cursor: 'pointer', color: 'var(--ink-faint)' }} title="Like">♡ {ad.likes > 999 ? Math.round(ad.likes / 100) / 10 + 'K' : ad.likes}</span>
                  <span style={{ fontSize: 12, cursor: 'pointer', color: 'var(--ink-faint)' }} title="Share">↗ {ad.shares}</span>
                </div>
              </div>

              {/* ad visual placeholder */}
              <div style={{ height: aspectH, background: 'var(--paper-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {screenshotMode === 'sketched'
                  ? <MockUI kind={ad.hasVideo ? 'video' : 'creative'} style={{ width: '90%', height: '85%' }} />
                  : <div className="wf-img" style={{ width: '100%', height: '100%' }}><span>{ad.hasVideo ? '▶' : '🖼'}</span></div>
                }
                {/* type badge */}
                <span style={{
                  position: 'absolute', top: 8, left: 8,
                  padding: '2px 8px', fontSize: 9, fontWeight: 700,
                  background: ad.type === 'dynamic' ? 'var(--ink)' : 'var(--paper)',
                  color: ad.type === 'dynamic' ? 'var(--paper)' : 'var(--ink)',
                  border: '1px solid var(--ink)', borderRadius: 8,
                  textTransform: 'uppercase', letterSpacing: 0.3,
                }}>{ad.type}</span>
              </div>

              {/* brand + caption */}
              <div style={{ padding: '10px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <div style={{ width: 22, height: 22, border: '1.5px solid var(--ink)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700 }}>{ad.brand.charAt(0)}</div>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>{ad.brand}</span>
                  <span className="wf-micro" style={{ fontSize: 9, marginLeft: 'auto', color: 'var(--ink-faint)' }}>{ad.industry}</span>
                </div>
                <p className="wf-body" style={{ fontSize: 11, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{ad.caption}</p>
              </div>

              {/* actions — Save + Generate Variation + Add to Board */}
              <div style={{ display: 'flex', gap: 6, padding: '8px 12px', borderTop: '1px solid var(--ink-ghost)', flexWrap: 'wrap' }}>
                <button onClick={(e) => { e.stopPropagation(); toggleSave(ad.id); }} style={{
                  padding: '4px 10px', fontSize: 10, fontWeight: 700,
                  border: '1.5px solid var(--ink)', borderRadius: 999,
                  background: isSaved ? 'var(--ink)' : 'var(--paper)',
                  color: isSaved ? 'var(--paper)' : 'var(--ink)',
                  fontFamily: 'var(--hand)', cursor: 'pointer',
                }}>{isSaved ? '✓ Saved' : '☆ Save'}</button>
                <button style={{
                  padding: '4px 10px', fontSize: 10,
                  border: '1.5px solid var(--ink-faint)', borderRadius: 999,
                  background: 'transparent', color: 'var(--ink)',
                  fontFamily: 'var(--hand)', cursor: 'pointer',
                }}>✦ Variation</button>
                <button onClick={(e) => { e.stopPropagation(); setAddToBoardAd(ad.id); }} style={{
                  padding: '4px 10px', fontSize: 10,
                  border: '1.5px solid var(--ink-faint)', borderRadius: 999,
                  background: 'transparent', color: 'var(--ink)',
                  fontFamily: 'var(--hand)', cursor: 'pointer',
                }}>▤ Board</button>
              </div>
            </Box>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--ink-faint)' }}>
          <div style={{ fontSize: 32, marginBottom: 8, opacity: 0.4 }}>◎</div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>No ads match your filters</div>
          <div className="wf-body" style={{ fontSize: 12 }}>Try broadening your search or adjusting the filters above.</div>
        </div>
      )}

      {/* load more */}
      {filtered.length > 0 && (
        <div style={{ textAlign: 'center', padding: '28px 0', marginTop: 8 }}>
          <Btn variant="ghost">Load more ads ↓</Btn>
          <div className="wf-micro" style={{ marginTop: 8, fontSize: 10, color: 'var(--ink-faint)' }}>Updated every 6 hours · Last refresh: 2 hours ago</div>
        </div>
      )}

      {/* "Add to Board" mini-modal */}
      {addToBoardAd && (
        <AddToBoardModal
          adId={addToBoardAd}
          onClose={() => setAddToBoardAd(null)}
        />
      )}
    </div>
  );
}

// ── Add to Board modal (used by Discover) ──
const BOARDS_DATA = {
  categories: [
    { id: 'mortgage', name: 'Mortgage', ads: 1, updated: '1 month ago', tags: [], section: 'categories' },
    { id: 'home', name: 'home', ads: 2, updated: '22 days ago', tags: ['home insurance'], section: 'categories' },
    { id: 'auto', name: 'auto', ads: 1, updated: '22 days ago', tags: ['auto'], section: 'categories' },
    { id: 'dccd', name: 'dccd', ads: 0, updated: '7 days ago', tags: ['dccds'], section: 'categories' },
  ],
  brands: [
    { id: 'new', name: 'New', ads: 0, updated: '23 days ago', tags: [], section: 'brands' },
    { id: 'demo', name: 'Demo', ads: 0, updated: '7 days ago', tags: [], section: 'brands' },
    { id: 'geico', name: 'GEICO', ads: 4, updated: '2 days ago', tags: ['insurance'], section: 'brands' },
    { id: 'progressive', name: 'Progressive', ads: 3, updated: '5 days ago', tags: ['insurance'], section: 'brands' },
  ],
};

function AddToBoardModal({ adId, onClose }) {
  const [boards, setBoards] = React.useState({ ...BOARDS_DATA, categories: [...BOARDS_DATA.categories], brands: [...BOARDS_DATA.brands] });
  const [newBoardName, setNewBoardName] = React.useState('');
  const [newBoardSection, setNewBoardSection] = React.useState('categories');
  const [showCreate, setShowCreate] = React.useState(false);

  const addToBoard = (boardId, section) => {
    setBoards(prev => ({
      ...prev,
      [section]: prev[section].map(b => b.id === boardId ? { ...b, ads: b.ads + 1 } : b),
    }));
    onClose();
  };

  const createBoard = () => {
    if (!newBoardName.trim()) return;
    const slug = newBoardName.toLowerCase().replace(/\s+/g, '-');
    const newBoard = { id: slug, name: newBoardName, ads: 1, updated: 'just now', tags: [], section: newBoardSection };
    setBoards(prev => ({ ...prev, [newBoardSection]: [newBoard, ...prev[newBoardSection]] }));
    setNewBoardName('');
    setShowCreate(false);
    onClose();
  };

  const allBoards = [...boards.categories, ...boards.brands];

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(20,20,20,0.45)', backdropFilter: 'blur(2px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: 'var(--paper)', border: '1.5px solid var(--ink)',
        borderRadius: '8px 12px 9px 11px / 10px 8px 12px 9px',
        width: 420, maxHeight: '80vh', overflow: 'auto', fontFamily: 'var(--hand)',
      }}>
        <div style={{ padding: '18px 20px', borderBottom: '1.5px dashed var(--ink-faint)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>▤ Add to board</h3>
          <button className="wf-close" onClick={onClose} style={{ width: 24, height: 24, fontSize: 12 }}>✕</button>
        </div>
        <div style={{ padding: '12px 20px' }}>
          {/* Categories section */}
          <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 8, marginTop: 4 }}>📁 Categories</div>
          {boards.categories.map(b => (
            <div key={b.id} onClick={() => addToBoard(b.id, 'categories')} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 0', borderBottom: '1px solid var(--ink-ghost)', cursor: 'pointer',
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{b.name}</div>
                <div className="wf-micro" style={{ fontSize: 10 }}>{b.ads} ads · {b.updated}</div>
              </div>
              <span style={{ fontSize: 14, color: 'var(--ink-faint)' }}>+</span>
            </div>
          ))}

          {/* Brands section */}
          <div className="wf-eyebrow" style={{ fontSize: 9, marginBottom: 8, marginTop: 16 }}>🏷 Brands</div>
          {boards.brands.map(b => (
            <div key={b.id} onClick={() => addToBoard(b.id, 'brands')} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 0', borderBottom: '1px solid var(--ink-ghost)', cursor: 'pointer',
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{b.name}</div>
                <div className="wf-micro" style={{ fontSize: 10 }}>{b.ads} ads · {b.updated}</div>
              </div>
              <span style={{ fontSize: 14, color: 'var(--ink-faint)' }}>+</span>
            </div>
          ))}

          {showCreate ? (
            <div style={{ marginTop: 14 }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 8, padding: 3, border: '1.5px solid var(--ink-faint)', borderRadius: 999, background: 'var(--paper-soft)' }}>
                {[{ id: 'categories', label: '📁 Category' }, { id: 'brands', label: '🏷 Brand' }].map(s => (
                  <button key={s.id} onClick={() => setNewBoardSection(s.id)} style={{
                    flex: 1, padding: '5px 8px', borderRadius: 999, border: 'none',
                    background: newBoardSection === s.id ? 'var(--ink)' : 'transparent',
                    color: newBoardSection === s.id ? 'var(--paper)' : 'var(--ink-soft)',
                    fontFamily: 'var(--hand)', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                  }}>{s.label}</button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={newBoardName} onChange={(e) => setNewBoardName(e.target.value)} placeholder="Board name…"
                  style={{ flex: 1, padding: '7px 10px', border: '1.5px solid var(--ink)', borderRadius: 8, fontFamily: 'var(--hand)', fontSize: 12 }} autoFocus />
                <Btn onClick={createBoard}>Create</Btn>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowCreate(true)} style={{
              width: '100%', marginTop: 14, padding: '10px',
              border: '1.5px dashed var(--ink-faint)', borderRadius: 8,
              background: 'transparent', fontFamily: 'var(--hand)', fontSize: 12, fontWeight: 700, cursor: 'pointer',
            }}>+ Create new board</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Boards module (Industry Insights — folder view) ──
function BoardsModule({ screenshotMode }) {
  const [boards, setBoards] = React.useState({ categories: [...BOARDS_DATA.categories], brands: [...BOARDS_DATA.brands] });
  const [openBoard, setOpenBoard] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [showCreate, setShowCreate] = React.useState(false);
  const [newName, setNewName] = React.useState('');
  const [newSection, setNewSection] = React.useState('categories');

  const allBoards = [...boards.categories, ...boards.brands];

  const createBoard = () => {
    if (!newName.trim()) return;
    const slug = newName.toLowerCase().replace(/\s+/g, '-');
    const newBoard = { id: slug, name: newName, ads: 0, updated: 'just now', tags: [], section: newSection };
    setBoards(prev => ({ ...prev, [newSection]: [newBoard, ...prev[newSection]] }));
    setNewName('');
    setShowCreate(false);
  };

  const deleteBoard = (id) => setBoards(prev => ({
    categories: prev.categories.filter(b => b.id !== id),
    brands: prev.brands.filter(b => b.id !== id),
  }));

  const filterBoards = (list) => list.filter(b => !search || b.name.toLowerCase().includes(search.toLowerCase()));

  // Sample ads to show inside a board
  const boardAds = [
    { id: 101, brand: 'LawClerk.Legal', type: 'Static', caption: 'Check out the FAQs for our new Hourly Associate program to get all the 411!', days: 554, industry: 'Insurance' },
    { id: 102, brand: 'CoverMe', type: 'Dynamic', caption: 'Your home deserves the best protection. Get a quote in 60 seconds.', days: 120, industry: 'Insurance' },
    { id: 103, brand: 'SafeGuard', type: 'Static', caption: 'Peace of mind starts here. Compare plans instantly.', days: 89, industry: 'Insurance' },
  ];

  if (openBoard) {
    const b = allBoards.find(x => x.id === openBoard);
    return (
      <div style={{ padding: '28px', fontFamily: 'var(--hand)' }}>
        {/* Board detail header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <button onClick={() => setOpenBoard(null)} style={{
            padding: '6px 12px', border: '1.5px solid var(--ink)', borderRadius: 999,
            background: 'var(--paper)', fontFamily: 'var(--hand)', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          }}>← Boards</button>
          <h1 className="wf-h1" style={{ fontSize: 24 }}>{b ? b.name : 'Board'}</h1>
          <span className="wf-body" style={{ fontSize: 12, color: 'var(--ink-faint)' }}>{b ? b.ads : 0} ads</span>
        </div>

        {/* Filters row */}
        <Box style={{ padding: '10px 14px', marginBottom: 14, background: 'var(--paper)', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1.5px solid var(--ink)', borderRadius: 999, padding: '5px 10px', flex: 1, minWidth: 160 }}>
            <span style={{ color: 'var(--ink-faint)', fontSize: 12 }}>⌕</span>
            <input placeholder="Search…" style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--hand)', fontSize: 11, flex: 1 }} />
          </div>
          <select style={{ padding: '5px 8px', border: '1.5px solid var(--ink)', borderRadius: 999, fontFamily: 'var(--hand)', fontSize: 11, background: 'var(--paper)', cursor: 'pointer' }}>
            <option>Status</option><option>Active</option><option>Inactive</option>
          </select>
          <select style={{ padding: '5px 8px', border: '1.5px solid var(--ink)', borderRadius: 999, fontFamily: 'var(--hand)', fontSize: 11, background: 'var(--paper)', cursor: 'pointer' }}>
            <option>Type</option><option>Static</option><option>Dynamic</option><option>Carousel</option>
          </select>
          <select style={{ padding: '5px 8px', border: '1.5px solid var(--ink)', borderRadius: 999, fontFamily: 'var(--hand)', fontSize: 11, background: 'var(--paper)', cursor: 'pointer' }}>
            <option>Running…</option><option>7 Days</option><option>15 Days</option><option>30 Days</option>
          </select>
        </Box>

        {/* Ads masonry */}
        <div style={{ columnCount: 3, columnGap: 14 }}>
          {boardAds.slice(0, b ? b.ads : 0).concat(boardAds).slice(0, Math.max(b ? b.ads : 1, 1)).map((ad, i) => (
            <Box key={i} style={{ padding: 0, overflow: 'hidden', marginBottom: 14, breakInside: 'avoid', background: 'var(--paper)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderBottom: '1px solid var(--ink-ghost)' }}>
                <span style={{ fontSize: 6, color: '#22c55e' }}>●</span>
                <span className="wf-micro" style={{ fontSize: 9 }}>Active since: {ad.days} Days</span>
                <span style={{ marginLeft: 'auto', fontSize: 11, cursor: 'pointer', color: 'var(--ink-faint)' }}>⊡</span>
              </div>
              <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--ink-ghost)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <div style={{ width: 20, height: 20, border: '1.5px solid var(--ink)', borderRadius: '50%', fontSize: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{ad.brand.charAt(0)}</div>
                  <span style={{ fontSize: 11, fontWeight: 700 }}>{ad.brand}</span>
                  <span className="wf-micro" style={{ fontSize: 9, marginLeft: 4, color: 'var(--ink-faint)' }}>{ad.type}</span>
                </div>
                <p className="wf-body" style={{ fontSize: 11, lineHeight: 1.4 }}>{ad.caption}</p>
              </div>
              <div style={{ height: 200, background: 'var(--paper-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {screenshotMode === 'sketched' ? <MockUI kind="creative" style={{ width: '90%', height: '85%' }} /> : <div className="wf-img" style={{ width: '100%', height: '100%' }}><span>🖼</span></div>}
              </div>
              <div style={{ display: 'flex', gap: 8, padding: '8px 12px', borderTop: '1px solid var(--ink-ghost)' }}>
                <span style={{ fontSize: 12, cursor: 'pointer', color: 'var(--ink-faint)' }} title="Analyze">◎</span>
                <span style={{ fontSize: 12, cursor: 'pointer', color: 'var(--ink-faint)' }} title="Generate variation">✦</span>
                <span style={{ fontSize: 12, cursor: 'pointer', color: 'var(--ink-faint)', marginLeft: 'auto' }} title="More">⋯</span>
              </div>
            </Box>
          ))}
        </div>

        {(b && b.ads === 0) && (
          <div style={{ textAlign: 'center', padding: 48, color: 'var(--ink-faint)' }}>
            <div style={{ fontSize: 32, marginBottom: 8, opacity: 0.4 }}>▤</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>This board is empty</div>
            <div className="wf-body" style={{ fontSize: 12 }}>Save ads from Discover or Intelligence to populate this board.</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '28px', fontFamily: 'var(--hand)' }}>
      {/* Board list header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="wf-eyebrow">Industry Insights</span>
            <span style={{ fontSize: 10, padding: '2px 8px', background: 'var(--paper-soft)', border: '1.5px solid var(--ink-faint)', borderRadius: 8, fontWeight: 700 }}>Meta Only</span>
          </div>
          <h1 className="wf-h1" style={{ fontSize: 26, marginTop: 4 }}>▤ Boards</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn onClick={() => setShowCreate(true)}>+ Create new board</Btn>
        </div>
      </div>

      {/* Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1.5px solid var(--ink)', borderRadius: 999, padding: '7px 14px', maxWidth: 280, marginBottom: 18 }}>
        <span style={{ color: 'var(--ink-faint)', fontSize: 13 }}>⌕</span>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name"
          style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--hand)', fontSize: 12, flex: 1 }} />
      </div>

      {/* Create new board inline */}
      {showCreate && (
        <Box style={{ padding: 16, marginBottom: 14, background: 'var(--paper)' }}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 10, padding: 3, border: '1.5px solid var(--ink-faint)', borderRadius: 999, background: 'var(--paper-soft)' }}>
            {[{ id: 'categories', label: '📁 Category' }, { id: 'brands', label: '🏷 Brand' }].map(s => (
              <button key={s.id} onClick={() => setNewSection(s.id)} style={{
                flex: 1, padding: '5px 8px', borderRadius: 999, border: 'none',
                background: newSection === s.id ? 'var(--ink)' : 'transparent',
                color: newSection === s.id ? 'var(--paper)' : 'var(--ink-soft)',
                fontFamily: 'var(--hand)', fontSize: 11, fontWeight: 700, cursor: 'pointer',
              }}>{s.label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Board name…"
              style={{ flex: 1, padding: '8px 12px', border: '1.5px solid var(--ink)', borderRadius: 8, fontFamily: 'var(--hand)', fontSize: 12 }} autoFocus />
            <Btn onClick={createBoard}>Create</Btn>
            <button onClick={() => setShowCreate(false)} style={{ padding: '6px 10px', border: '1.5px solid var(--ink-faint)', borderRadius: 8, background: 'var(--paper)', fontFamily: 'var(--hand)', fontSize: 12, cursor: 'pointer' }}>Cancel</button>
          </div>
        </Box>
      )}

      {/* Categories boards */}
      <div className="wf-eyebrow" style={{ fontSize: 10, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span>📁</span> Categories <span style={{ fontWeight: 400, color: 'var(--ink-faint)' }}>({boards.categories.length})</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginBottom: 28 }}>
        {filterBoards(boards.categories).map(b => (
          <Box key={b.id} onClick={() => setOpenBoard(b.id)} style={{ padding: 16, cursor: 'pointer', background: 'var(--paper)', position: 'relative' }}>
            <button onClick={(e) => { e.stopPropagation(); deleteBoard(b.id); }} style={{ position: 'absolute', top: 12, right: 12, background: 'transparent', border: 'none', fontSize: 13, color: 'var(--ink-faint)', cursor: 'pointer' }} title="Delete">🗑</button>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{b.name}</div>
            <div className="wf-micro" style={{ fontSize: 10, marginBottom: 2 }}>▤ {b.ads} ads</div>
            <div className="wf-micro" style={{ fontSize: 10, color: 'var(--ink-faint)', marginBottom: 8 }}>Updated {b.updated}</div>
            {b.tags.length > 0 ? (
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {b.tags.map((t, i) => <span key={i} style={{ fontSize: 10, padding: '2px 8px', background: 'var(--paper-soft)', border: '1px solid var(--ink-faint)', borderRadius: 6 }}>{t}</span>)}
              </div>
            ) : (
              <span className="wf-micro" style={{ fontSize: 10, fontStyle: 'italic', color: 'var(--ink-faint)' }}>*No tags*</span>
            )}
          </Box>
        ))}
      </div>

      {/* Brands boards */}
      <div className="wf-eyebrow" style={{ fontSize: 10, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span>🏷</span> Brands <span style={{ fontWeight: 400, color: 'var(--ink-faint)' }}>({boards.brands.length})</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
        {filterBoards(boards.brands).map(b => (
          <Box key={b.id} onClick={() => setOpenBoard(b.id)} style={{ padding: 16, cursor: 'pointer', background: 'var(--paper)', position: 'relative' }}>
            <button onClick={(e) => { e.stopPropagation(); deleteBoard(b.id); }} style={{ position: 'absolute', top: 12, right: 12, background: 'transparent', border: 'none', fontSize: 13, color: 'var(--ink-faint)', cursor: 'pointer' }} title="Delete">🗑</button>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{b.name}</div>
            <div className="wf-micro" style={{ fontSize: 10, marginBottom: 2 }}>▤ {b.ads} ads</div>
            <div className="wf-micro" style={{ fontSize: 10, color: 'var(--ink-faint)', marginBottom: 8 }}>Updated {b.updated}</div>
            {b.tags.length > 0 ? (
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {b.tags.map((t, i) => <span key={i} style={{ fontSize: 10, padding: '2px 8px', background: 'var(--paper-soft)', border: '1px solid var(--ink-faint)', borderRadius: 6 }}>{t}</span>)}
              </div>
            ) : (
              <span className="wf-micro" style={{ fontSize: 10, fontStyle: 'italic', color: 'var(--ink-faint)' }}>*No tags*</span>
            )}
          </Box>
        ))}
      </div>
    </div>
  );
}

// ── Intelligence module (Industry Insights — My Feed / Competitor / Saved Ads) ──
function IntelligenceModule({ screenshotMode }) {
  const [tab, setTab] = React.useState('feed');
  const [status, setStatus] = React.useState('all');
  const [type, setType] = React.useState('all');
  const [running, setRunning] = React.useState('all');
  const [industry, setIndustry] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const [sort, setSort] = React.useState('recent');
  const [savedIds, setSavedIds] = React.useState(new Set([2, 5, 11, 16]));
  const [dateFrom, setDateFrom] = React.useState('');
  const [dateTo, setDateTo] = React.useState('');

  const toggleSave = (id) => setSavedIds(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const industries = ['Insurance', 'Finance', 'E-commerce', 'SaaS', 'Health & Wellness', 'Education', 'Real Estate'];
  const competitors = ['GEICO', 'Progressive', 'State Farm', 'Lemonade', 'AllState', 'Liberty Mutual'];

  const feedAds = [
    { id: 1, brand: 'GEICO', headline: 'Ride into Savings', caption: 'Save when you talk to GEICO. Bundle auto & home for even more.', type: 'static', days: 67, industry: 'Insurance' },
    { id: 2, brand: 'Progressive', headline: 'Wake Me When It\'s Boat Season', caption: 'Protect every ride. Start your free quote and watch the savings roll in.', type: 'static', days: 45, industry: 'Insurance' },
    { id: 3, brand: 'State Farm', headline: '', caption: 'Like a good neighbor, State Farm is there. Get a free quote in under 5 minutes.', type: 'dynamic', days: 30, industry: 'Insurance' },
    { id: 4, brand: 'Lemonade', headline: '', caption: 'Insurance powered by AI. Sign up in 90 seconds. Claims paid in 3 minutes.', type: 'carousel', days: 14, industry: 'Insurance' },
    { id: 5, brand: 'GEICO', headline: '', caption: 'It\'s easy to see. 15 minutes could save you 15% or more on car insurance.', type: 'static', days: 87, industry: 'Insurance' },
    { id: 6, brand: 'AllState', headline: 'Mayhem is coming', caption: 'Are you in good hands? Get protected against the unexpected.', type: 'dynamic', days: 21, industry: 'Insurance' },
    { id: 7, brand: 'Liberty Mutual', headline: 'Only pay for what you need', caption: 'Customize your coverage. Why pay for things you don\'t need?', type: 'static', days: 38, industry: 'Insurance' },
    { id: 8, brand: 'GEICO', headline: '', caption: 'Bundling your home & auto could save you hundreds. Get your quote today.', type: 'carousel', days: 52, industry: 'Insurance' },
  ];

  const competitorAds = [
    { id: 9, brand: 'GEICO', headline: '', caption: 'Real customers. Real savings. Hear their stories.', type: 'dynamic', days: 12, industry: 'Insurance' },
    { id: 10, brand: 'GEICO', headline: 'Switch & Save', caption: 'Drivers who switched saved an average of $500/year.', type: 'static', days: 28, industry: 'Insurance' },
    { id: 11, brand: 'Progressive', headline: 'Name your price', caption: 'Tell us what you want to pay and we\'ll find the coverage that fits.', type: 'static', days: 34, industry: 'Insurance' },
    { id: 12, brand: 'Progressive', headline: '', caption: 'Flo knows. Get a quote from Progressive and start saving today.', type: 'carousel', days: 7, industry: 'Insurance' },
    { id: 13, brand: 'State Farm', headline: 'Drive Safe & Save', caption: 'Safe driving pays off. Download the app and start earning discounts.', type: 'dynamic', days: 45, industry: 'Insurance' },
    { id: 14, brand: 'Lemonade', headline: 'Insurance in seconds', caption: 'Powered by AI. Zero paperwork. Instant everything.', type: 'static', days: 19, industry: 'Insurance' },
  ];

  const savedAdsData = feedAds.concat(competitorAds).filter(ad => savedIds.has(ad.id));

  const currentAds = tab === 'feed' ? feedAds
    : tab === 'competitor' ? competitorAds
    : savedAdsData;

  const filtered = currentAds.filter(ad => {
    if (status !== 'all' && (status === 'active' ? ad.days < 60 : ad.days >= 60) === false) return false;
    if (type !== 'all' && ad.type !== type) return false;
    if (running === '7' && ad.days > 7) return false;
    if (running === '15' && ad.days > 15) return false;
    if (running === '30' && ad.days > 30) return false;
    if (industry !== 'all' && ad.industry !== industry) return false;
    if (search && !ad.brand.toLowerCase().includes(search.toLowerCase()) && !ad.caption.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const hs = { fontFamily: 'var(--hand)' };

  const FilterPill = ({ label, value, onChange, options }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span className="wf-micro" style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 700, color: 'var(--ink-faint)' }}>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={{
        padding: '6px 10px', border: '1.5px solid var(--ink)', borderRadius: 999,
        background: 'var(--paper)', fontFamily: 'var(--hand)', fontSize: 11, cursor: 'pointer',
      }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );

  return (
    <div style={{ padding: '28px', ...hs }}>
      {/* header */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="wf-eyebrow">Industry Insights</span>
          <span className="wf-micro" style={{ fontSize: 9, color: 'var(--ink-faint)' }}>·</span>
          <span style={{ fontSize: 10, padding: '2px 8px', background: 'var(--highlight)', borderRadius: 8, fontWeight: 700 }}>Meta Ads</span>
        </div>
        <h1 className="wf-h1" style={{ fontSize: 26, marginTop: 4 }}>⚡ Intelligence</h1>
      </div>

      {/* search + date range + sort */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1.5px solid var(--ink)', borderRadius: 999, padding: '7px 14px', flex: 1, minWidth: 220 }}>
          <span style={{ color: 'var(--ink-faint)', fontSize: 13 }}>⌕</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brand, keyword, or competitor…"
            style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--hand)', fontSize: 12, flex: 1 }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} style={{ padding: '6px 8px', border: '1.5px solid var(--ink)', borderRadius: 8, fontFamily: 'var(--hand)', fontSize: 11, background: 'var(--paper)' }} />
          <span style={{ fontSize: 11, color: 'var(--ink-faint)' }}>to</span>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} style={{ padding: '6px 8px', border: '1.5px solid var(--ink)', borderRadius: 8, fontFamily: 'var(--hand)', fontSize: 11, background: 'var(--paper)' }} />
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} style={{
          padding: '7px 12px', border: '1.5px solid var(--ink)', borderRadius: 999,
          background: 'var(--paper)', fontFamily: 'var(--hand)', fontSize: 11, cursor: 'pointer',
        }}>
          <option value="recent">Most recent</option>
          <option value="longest">Longest running</option>
          <option value="likes">Most engagement</option>
        </select>
      </div>

      {/* tabs: My Feed / Competitor / Saved Ads */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', gap: 4, padding: 3, border: '1.5px solid var(--ink)', borderRadius: 999 }}>
          {[
            { id: 'feed', label: 'My Feed', count: feedAds.length },
            { id: 'competitor', label: 'Competitor', count: competitorAds.length },
            { id: 'saved', label: 'Saved Ads', count: savedIds.size },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '6px 14px', borderRadius: 999, border: 'none',
              background: tab === t.id ? 'var(--ink)' : 'transparent',
              color: tab === t.id ? 'var(--paper)' : 'var(--ink-soft)',
              fontFamily: 'var(--hand)', fontSize: 12, fontWeight: 700, cursor: 'pointer',
            }}>{t.label} ({t.count})</button>
          ))}
        </div>

        {/* inline filters */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <FilterPill label="Status" value={status} onChange={setStatus} options={[
            { value: 'all', label: 'All' }, { value: 'active', label: '● Active' }, { value: 'inactive', label: '○ Inactive' },
          ]} />
          <FilterPill label="Type" value={type} onChange={setType} options={[
            { value: 'all', label: 'All' }, { value: 'static', label: 'Static' }, { value: 'dynamic', label: 'Dynamic' }, { value: 'carousel', label: 'Carousel' },
          ]} />
          <FilterPill label="Running" value={running} onChange={setRunning} options={[
            { value: 'all', label: 'Any' }, { value: '7', label: '7d' }, { value: '15', label: '15d' }, { value: '30', label: '30d' },
          ]} />
        </div>
      </div>

      {/* results count */}
      <div className="wf-body" style={{ fontSize: 12, color: 'var(--ink-faint)', marginBottom: 14 }}>
        Showing {filtered.length} ads {tab === 'competitor' ? '· tracking ' + competitors.length + ' competitors' : tab === 'saved' ? '· from your saved collection' : '· personalized to your profile'}
      </div>

      {/* masonry grid */}
      <div style={{ columnCount: 4, columnGap: 14 }}>
        {filtered.map(ad => {
          const isSaved = savedIds.has(ad.id);
          const aspectH = [280, 340, 300, 380, 260, 320, 290, 350][ad.id % 8];
          return (
            <Box key={ad.id} style={{
              padding: 0, overflow: 'hidden', marginBottom: 14, breakInside: 'avoid',
              background: 'var(--paper)', cursor: 'pointer',
              border: isSaved ? '2px solid var(--ink)' : undefined,
            }}>
              {/* header bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderBottom: '1px solid var(--ink-ghost)', fontSize: 10 }}>
                <span style={{ color: ad.days < 60 ? '#22c55e' : 'var(--ink-faint)', fontSize: 6 }}>●</span>
                <span className="wf-micro">{ad.days < 60 ? 'active' : 'inactive'}</span>
                <span className="wf-micro" style={{ color: 'var(--ink-faint)' }}>· since: {ad.days} Days</span>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                  <span style={{ cursor: 'pointer', color: 'var(--ink-faint)' }} title="Analyze">◎</span>
                  <span style={{ cursor: 'pointer', color: 'var(--ink-faint)' }} title="Download">↓</span>
                  <span onClick={(e) => { e.stopPropagation(); toggleSave(ad.id); }} style={{ cursor: 'pointer', color: isSaved ? 'var(--ink)' : 'var(--ink-faint)', fontWeight: isSaved ? 700 : 400 }} title="Save">{isSaved ? '★' : '☆'}</span>
                </div>
              </div>

              {/* visual */}
              <div style={{ height: aspectH, background: 'var(--paper-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {screenshotMode === 'sketched'
                  ? <MockUI kind={ad.type === 'dynamic' ? 'video' : 'creative'} style={{ width: '90%', height: '85%' }} />
                  : <div className="wf-img" style={{ width: '100%', height: '100%' }}><span>{ad.type === 'dynamic' ? '▶' : '🖼'}</span></div>
                }
                {ad.headline && (
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 14px 12px', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', color: '#fff' }}>
                    <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.2 }}>{ad.headline}</div>
                  </div>
                )}
                <span style={{
                  position: 'absolute', top: 8, left: 8,
                  padding: '2px 8px', fontSize: 9, fontWeight: 700,
                  background: ad.type === 'dynamic' ? 'var(--ink)' : 'var(--paper)',
                  color: ad.type === 'dynamic' ? 'var(--paper)' : 'var(--ink)',
                  border: '1px solid var(--ink)', borderRadius: 8,
                  textTransform: 'uppercase', letterSpacing: 0.3,
                }}>{ad.type}</span>
              </div>

              {/* brand + caption */}
              <div style={{ padding: '10px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <div style={{ width: 22, height: 22, border: '1.5px solid var(--ink)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700 }}>{ad.brand.charAt(0)}</div>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>{ad.brand}</span>
                  <span className="wf-micro" style={{ marginLeft: 'auto', fontSize: 9, color: 'var(--ink-faint)' }}>{ad.industry}</span>
                </div>
                <p className="wf-body" style={{ fontSize: 11, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{ad.caption}</p>
              </div>

              {/* footer actions */}
              <div style={{ display: 'flex', gap: 6, padding: '8px 12px', borderTop: '1px solid var(--ink-ghost)' }}>
                <button onClick={(e) => { e.stopPropagation(); toggleSave(ad.id); }} style={{
                  padding: '4px 10px', fontSize: 10, fontWeight: 700,
                  border: '1.5px solid var(--ink)', borderRadius: 999,
                  background: isSaved ? 'var(--ink)' : 'var(--paper)',
                  color: isSaved ? 'var(--paper)' : 'var(--ink)',
                  fontFamily: 'var(--hand)', cursor: 'pointer',
                }}>{isSaved ? '✓ Saved' : '+ Save'}</button>
                <button style={{ padding: '4px 10px', fontSize: 10, border: '1.5px solid var(--ink-faint)', borderRadius: 999, background: 'transparent', color: 'var(--ink-faint)', fontFamily: 'var(--hand)', cursor: 'pointer' }}>✦ Remix</button>
                <button style={{ padding: '4px 10px', fontSize: 10, border: '1.5px solid var(--ink-faint)', borderRadius: 999, background: 'transparent', color: 'var(--ink-faint)', fontFamily: 'var(--hand)', cursor: 'pointer', marginLeft: 'auto' }}>⋯</button>
              </div>
            </Box>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--ink-faint)' }}>
          <div style={{ fontSize: 32, marginBottom: 8, opacity: 0.4 }}>⚡</div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
            {tab === 'saved' ? 'No saved ads yet' : 'No ads match your filters'}
          </div>
          <div className="wf-body" style={{ fontSize: 12 }}>
            {tab === 'saved' ? 'Star ads from My Feed or Competitor tabs to build your collection.' : 'Try broadening your search or adjusting the filters.'}
          </div>
        </div>
      )}
    </div>
  );
}
