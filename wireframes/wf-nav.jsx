// ─────────────────────────────────────────────────────────────
// Navigation chrome — top nav (with Solutions mega menu) + footer
// ─────────────────────────────────────────────────────────────

function NavBar({ current, onNav, openBuyNow, funnel, setFunnel }) {
  const [solOpen, setSolOpen] = React.useState(false);
  const items = [
    { id: 'home',     label: 'Home' },
    { id: '__sols',   label: 'Solutions', mega: true },
    { id: 'usecases', label: 'Use Cases' },
    { id: 'blog',     label: 'Blog' },
    { id: 'fabagent', label: 'FabAgent' },
  ];
  const onSolGroup = (current || '').startsWith('sol-');

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--paper)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 60px', borderBottom: '1.5px dashed var(--ink-faint)', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            onClick={() => onNav('home')}
            style={{ fontFamily: 'var(--hand)', fontSize: 22, fontWeight: 700, cursor: 'pointer' }}
          >fabfunnel<span style={{ color: 'var(--ink-faint)' }}>.ai</span></div>

          {/* Demo · funnel toggle — sits beside the logo, framed as a demo control */}
          {setFunnel && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 10px', border: '1.5px dashed var(--ink-faint)', borderRadius: 6 }}>
              <span style={{ fontFamily: 'var(--hand)', fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--ink-faint)' }}>Demo</span>
              <div style={{ display: 'flex', gap: 2, padding: 2, background: 'var(--paper-soft)', borderRadius: 999 }}>
                <button onClick={() => setFunnel('direct')} style={{
                  padding: '4px 10px', borderRadius: 999, border: 'none',
                  background: funnel === 'direct' ? 'var(--ink)' : 'transparent',
                  color:      funnel === 'direct' ? 'var(--paper)' : 'var(--ink-soft)',
                  fontFamily: 'var(--hand)', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                }}>A · Direct</button>
                <button onClick={() => setFunnel('trial')} style={{
                  padding: '4px 10px', borderRadius: 999, border: 'none',
                  background: funnel === 'trial' ? 'var(--ink)' : 'transparent',
                  color:      funnel === 'trial' ? 'var(--paper)' : 'var(--ink-soft)',
                  fontFamily: 'var(--hand)', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                }}>B · Trial</button>
              </div>
              <span onClick={() => onNav('compare')} style={{
                fontFamily: 'var(--hand)', fontSize: 11, color: 'var(--ink-soft)', cursor: 'pointer',
                textDecoration: 'underline wavy var(--ink-faint)', textUnderlineOffset: 3,
              }}>compare</span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {items.map(it => {
            const isActive = it.mega ? (solOpen || onSolGroup) : current === it.id;
            return (
              <span
                key={it.id}
                onClick={() => it.mega ? setSolOpen(o => !o) : onNav(it.id)}
                onMouseEnter={() => it.mega && setSolOpen(true)}
                style={{
                  fontSize: 14,
                  cursor: 'pointer',
                  color: isActive ? 'var(--ink)' : 'var(--ink-faint)',
                  borderBottom: isActive ? '2px solid var(--ink)' : '2px solid transparent',
                  paddingBottom: 2,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                {it.label}
                {it.mega && (
                  <span style={{ fontSize: 10, transition: 'transform 120ms', transform: solOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
                )}
              </span>
            );
          })}
          <span
            onClick={() => onNav('login')}
            style={{ fontSize: 13, color: 'var(--ink-faint)', cursor: 'pointer' }}
            className="wf-squig"
          >Login</span>
          <Btn onClick={() => openBuyNow('A')}>{funnel === 'trial' ? 'Start Free Trial →' : 'Buy Now'}</Btn>
        </div>

        {solOpen && typeof MegaMenu !== 'undefined' && (
          <MegaMenu onNav={onNav} onClose={() => setSolOpen(false)} />
        )}
      </div>
    </div>
  );
}

function FooterBar({ onNav }) {
  return (
    <div style={{ padding: '60px 60px 40px', borderTop: '1.5px solid var(--ink)', background: 'var(--paper)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr', gap: 40 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>fabfunnel<span style={{ color: 'var(--ink-faint)' }}>.ai</span></div>
          <p className="wf-body" style={{ marginTop: 10, fontSize: 13 }}>The AI co-pilot for performance marketers.</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            {['x','in','yt','ig'].map(s => (
              <div key={s} style={{ width: 28, height: 28, border: '1.5px solid var(--ink)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>{s}</div>
            ))}
          </div>
        </div>
        {[
          { h: 'Solutions', l: [['Creative Generation','sol-creative'],['Industry Insights','sol-insights'],['Video Sage','sol-video'],['All use cases','usecases']] },
          { h: 'Product',   l: [['Pricing','home'],['What\'s new','blog'],['Roadmap','#'],['Status','#']] },
          { h: 'Company',   l: [['About','#'],['Careers','#'],['Press','#'],['Contact','#']] },
          { h: 'Resources', l: [['Blog','blog'],['FabAgent','fabagent'],['Help center','#'],['API','#']] },
        ].map((col, i) => (
          <div key={i}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>{col.h}</div>
            {col.l.map((x, j) => (
              <div
                key={j}
                onClick={() => x[1] !== '#' && onNav(x[1])}
                className="wf-body"
                style={{ fontSize: 13, marginBottom: 6, cursor: x[1] !== '#' ? 'pointer' : 'default' }}
              >{x[0]}</div>
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
  );
}

Object.assign(window, { NavBar, FooterBar });
