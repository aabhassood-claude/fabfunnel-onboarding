// ─────────────────────────────────────────────────────────────
// fabfunnel.ai wireframe — shared bits
// ─────────────────────────────────────────────────────────────

const Box = ({ dashed, soft, style, children, className = '', ...rest }) => (
  <div
    className={`${dashed ? 'wf-box-dashed' : soft ? 'wf-box-soft' : 'wf-box'} ${className}`}
    style={style}
    {...rest}
  >
    {children}
  </div>
);

const ImgPlaceholder = ({ label, style, className = '' }) => (
  <div className={`wf-img ${className}`} style={style}>
    <span>{label || 'screenshot'}</span>
  </div>
);

// A more detailed mock UI inside a screenshot box (for hero / Genie blocks)
const MockUI = ({ kind = 'creative', style }) => {
  if (kind === 'creative') {
    return (
      <div className="wf-mock-ui" style={style}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="wf-mock-bar dark" style={{ width: 80 }} />
          <div className="wf-mock-bar" style={{ width: 40 }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, flex: 1 }}>
          <div style={{ background: 'var(--paper)', border: '1px solid var(--ink-faint)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: 'var(--ink-faint)' }}>ad 1</div>
          <div style={{ background: 'var(--paper)', border: '1px solid var(--ink-faint)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: 'var(--ink-faint)' }}>ad 2</div>
          <div style={{ background: 'var(--paper)', border: '1px solid var(--ink-faint)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: 'var(--ink-faint)' }}>ad 3</div>
        </div>
        <div className="wf-mock-bar" style={{ width: '60%' }} />
        <div className="wf-mock-bar" style={{ width: '40%' }} />
      </div>
    );
  }
  if (kind === 'video') {
    return (
      <div className="wf-mock-ui" style={style}>
        <div style={{ background: 'var(--paper)', border: '1px solid var(--ink-faint)', borderRadius: 4, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ width: 0, height: 0, borderLeft: '14px solid var(--ink-soft)', borderTop: '9px solid transparent', borderBottom: '9px solid transparent', marginLeft: 4 }} />
        </div>
        <div className="wf-mock-bar" style={{ width: '90%' }} />
        <div className="wf-mock-bar" style={{ width: '50%' }} />
      </div>
    );
  }
  if (kind === 'script') {
    return (
      <div className="wf-mock-ui" style={style}>
        <div style={{ display: 'flex', gap: 4 }}>
          <div className="wf-mock-bar dark" style={{ width: 30 }} />
          <div className="wf-mock-bar" style={{ width: 20 }} />
        </div>
        {[90, 75, 85, 60, 80, 50].map((w, i) => (
          <div key={i} className="wf-mock-bar" style={{ width: `${w}%` }} />
        ))}
      </div>
    );
  }
  if (kind === 'insights') {
    return (
      <div className="wf-mock-ui" style={style}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div className="wf-mock-bar dark" style={{ width: 50 }} />
          <div className="wf-mock-bar" style={{ width: 30, marginLeft: 'auto' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, flex: 1 }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ background: 'var(--paper)', border: '1px solid var(--ink-faint)', borderRadius: 4, padding: 4, fontSize: 9, color: 'var(--ink-faint)', display: 'flex', flexDirection: 'column', gap: 3 }}>
              <div className="wf-mock-bar" style={{ width: '70%' }} />
              <div className="wf-mock-bar" style={{ width: '40%' }} />
              <div style={{ flex: 1, background: 'var(--paper-soft)', borderRadius: 2, marginTop: 2 }} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (kind === 'hero') {
    return (
      <div className="wf-mock-ui" style={{ ...style, background: 'var(--paper)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed var(--ink-faint)', paddingBottom: 6 }}>
          <div className="wf-mock-bar dark" style={{ width: 60 }} />
          <div style={{ display: 'flex', gap: 4 }}>
            <div className="wf-mock-bar" style={{ width: 20 }} />
            <div className="wf-mock-bar" style={{ width: 20 }} />
            <div className="wf-mock-bar" style={{ width: 20 }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 1 }}>
          <div style={{ width: 60, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div className="wf-mock-bar" style={{ width: '80%' }} />
            <div className="wf-mock-bar" style={{ width: '60%' }} />
            <div className="wf-mock-bar" style={{ width: '70%' }} />
            <div className="wf-mock-bar dark" style={{ width: '50%' }} />
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            <div style={{ background: 'var(--paper-soft)', border: '1px solid var(--ink-faint)', borderRadius: 4 }} />
            <div style={{ background: 'var(--paper-soft)', border: '1px solid var(--ink-faint)', borderRadius: 4 }} />
            <div style={{ background: 'var(--paper-soft)', border: '1px solid var(--ink-faint)', borderRadius: 4 }} />
            <div style={{ background: 'var(--paper-soft)', border: '1px solid var(--ink-faint)', borderRadius: 4 }} />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const Note = ({ children, style, tilt }) => (
  <div className={`wf-note ${tilt === 'r' ? 'tilt-r' : ''}`} style={style}>
    {children}
  </div>
);

const Pill = ({ hl, soft, children, style }) => (
  <span className={`wf-pill ${hl ? 'wf-pill-hl' : ''} ${soft ? 'wf-pill-soft' : ''}`} style={style}>
    {children}
  </span>
);

const Btn = ({ variant = 'solid', children, onClick, style, type }) => {
  const cls =
    variant === 'outline' ? 'wf-btn wf-btn-outline' :
    variant === 'ghost'   ? 'wf-btn wf-btn-ghost' :
    variant === 'link'    ? 'wf-btn wf-btn-link' :
    'wf-btn';
  return (
    <button className={cls} onClick={onClick} style={style} type={type || 'button'}>
      {children}
    </button>
  );
};

const SectionTag = ({ num, children }) => (
  <div className="wf-section-tag">
    <span className="num">{num}</span>{children}
  </div>
);

const Check = () => <span className="wf-check">✓</span>;

// little hand-drawn arrow pointing right-down
const CurveArrow = ({ style }) => (
  <svg width="60" height="40" viewBox="0 0 60 40" style={style}>
    <path d="M 4 6 Q 30 6 40 26" stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 36 22 L 40 26 L 38 22" stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

Object.assign(window, { Box, ImgPlaceholder, MockUI, Note, Pill, Btn, SectionTag, Check, CurveArrow });
