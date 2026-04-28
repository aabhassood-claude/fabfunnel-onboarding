// ─────────────────────────────────────────────────────────────
// Video Sage — single-purpose video analysis tool
// Input: paste URL · upload file · pick from competitor library
// Output: annotated timeline + benchmark comparison + script remix
// Lives inside the dashboard shell (sidebar → Genie → Video Sage)
// ─────────────────────────────────────────────────────────────

function VideoSage({ screenshotMode, showAnnotations }) {
  const [src, setSrc]               = React.useState('competitor'); // url | upload | competitor
  const [url, setUrl]               = React.useState('');
  const [pickedCompetitor, setPick] = React.useState('Glow Co. · Hero ad #4');
  const [analyzed, setAnalyzed]     = React.useState(false);
  const [analyzing, setAnalyzing]   = React.useState(false);
  const [activeMoment, setActive]   = React.useState(0);

  // Mocked timeline insights — keyed to seconds
  const moments = [
    { t: '0:00', label: 'Hook',     verdict: 'strong',   note: 'Pattern interrupt — face fills frame, "Stop scrolling" before viewer can scroll.' },
    { t: '0:03', label: 'Promise',  verdict: 'strong',   note: 'Specific outcome stated in 4 words. Numbers + timeframe build credibility.' },
    { t: '0:07', label: 'Problem',  verdict: 'medium',   note: 'Could compress — viewer already nodding by 0:09. Cut 2s of B-roll.' },
    { t: '0:12', label: 'Demo',     verdict: 'strong',   note: 'Real product use, hands-only shot. No talking head — keeps energy high.' },
    { t: '0:18', label: 'Proof',    verdict: 'medium',   note: 'Two testimonials feels like one too many. Pick the higher-emotion clip.' },
    { t: '0:24', label: 'CTA',      verdict: 'weak',     note: '"Link in bio" buried. Add on-screen text card + voice emphasis.' },
    { t: '0:28', label: 'End card', verdict: 'medium',   note: 'Logo lingers 1.5s — too long for paid social. Cut to 0.5s.' },
  ];

  const benchmarks = [
    { label: 'Hook strength',   you: 92, peer: 78, unit: '/100' },
    { label: 'Time to value',   you: 3,  peer: 5,  unit: 's',   lowerBetter: true },
    { label: 'Demo coverage',   you: 35, peer: 40, unit: '%' },
    { label: 'CTA visibility',  you: 48, peer: 71, unit: '%' },
    { label: 'Avg shot length', you: 1.8, peer: 2.4, unit: 's', lowerBetter: true },
  ];

  const scriptBeats = [
    { t: '0:00–0:03', dir: 'CLOSE-UP, eye contact', vo: '"Stop scrolling — your skincare routine is missing one thing."' },
    { t: '0:03–0:07', dir: 'Hands unboxing product', vo: '"This 2-step serum gave me 30% less breakouts in 14 days."' },
    { t: '0:07–0:12', dir: 'Mirror shot, before/after split', vo: '"I tried everything. Retinols, oils, the works. Nothing stuck."' },
    { t: '0:12–0:18', dir: 'Application demo, no face', vo: '"Two pumps. Morning. That\'s it."' },
    { t: '0:18–0:24', dir: 'Testimonial card overlay',  vo: '"My friend Maya used it for a week — she texted me at 6am."' },
    { t: '0:24–0:28', dir: 'BOLD on-screen CTA card',   vo: '"Tap the link. First 200 get 20% off."' },
  ];

  const verdictColor = (v) =>
    v === 'strong' ? 'var(--highlight)' : v === 'weak' ? '#ffc8b8' : 'var(--paper-soft)';

  const runAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => { setAnalyzing(false); setAnalyzed(true); window.scrollTo(0, 0); }, 1400);
  };

  return (
    <div style={{ background: 'var(--paper)', padding: '32px 28px 60px', minHeight: '100vh' }}>

      {/* Title */}
      <div style={{ marginBottom: 28 }}>
        <Pill soft style={{ marginBottom: 10 }}>GENIE · MODULE</Pill>
        <h1 className="wf-h1" style={{ fontSize: 36 }}>Video <span className="wf-hl">Sage</span></h1>
        <p className="wf-body" style={{ fontSize: 14, marginTop: 6 }}>Drop in any winning ad. Get a second-by-second breakdown, benchmark vs your category, and a ready-to-shoot script remix.</p>
        {showAnnotations && (
          <Note style={{ top: 0, right: 0 }}>single tool — no profile branching · same flow for E-com & Affiliate</Note>
        )}
      </div>

      {/* ── Input card ───────────────────────────────────── */}
      <Box style={{ padding: 24, marginBottom: 24 }}>
        <div className="wf-eyebrow" style={{ marginBottom: 12 }}>1 · Choose a video to analyze</div>

        {/* Source picker — 3 segmented tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10, marginBottom: 16 }}>
          {[
            { id: 'url',        label: 'Paste a URL',          hint: 'TikTok · IG · YouTube · FB' },
            { id: 'upload',     label: 'Upload a file',        hint: '.mp4 · .mov · up to 200MB' },
            { id: 'competitor', label: 'Pick from library',    hint: 'From Industry Insights' },
          ].map(o => (
            <button key={o.id} onClick={() => setSrc(o.id)} style={{
              border: '1.5px solid var(--ink)',
              borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px',
              background: src === o.id ? 'var(--highlight)' : 'var(--paper)',
              padding: '14px 16px', textAlign: 'left', cursor: 'pointer',
              fontFamily: 'var(--hand)',
              boxShadow: src === o.id ? '2px 2px 0 var(--ink)' : 'none',
              minWidth: 0,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{o.label}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-faint)', marginTop: 2 }}>{o.hint}</div>
            </button>
          ))}
        </div>

        {/* Source-specific input */}
        {src === 'url' && (
          <div>
            <label style={{ fontSize: 11, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Video URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.tiktok.com/@brand/video/..."
              className="wf-field"
              style={{ marginTop: 4, width: '100%', boxSizing: 'border-box', fontFamily: 'var(--hand)' }}
            />
            <p className="wf-micro" style={{ marginTop: 6 }}>We'll fetch the video, transcribe the audio, and extract on-screen text.</p>
          </div>
        )}

        {src === 'upload' && (
          <div className="wf-box wf-box-dashed" style={{ padding: 32, textAlign: 'center', background: 'var(--paper-soft)' }}>
            <div style={{ fontSize: 32, lineHeight: 1, marginBottom: 8 }}>⬆</div>
            <div className="wf-body" style={{ fontSize: 14, fontWeight: 700 }}>Drop a video here, or click to browse</div>
            <p className="wf-micro" style={{ marginTop: 6 }}>MP4 or MOV · up to 200MB · keep it under 90 seconds for best results</p>
          </div>
        )}

        {src === 'competitor' && (
          <div>
            <label style={{ fontSize: 11, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Pick from your saved library</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10, marginTop: 8 }}>
              {[
                'Glow Co. · Hero ad #4',
                'Glow Co. · UGC #12',
                'Bloom · Founder talk',
                'Aurora · Demo cut',
              ].map((label, i) => (
                <button key={i} onClick={() => setPick(label)} style={{
                  border: '1.5px solid var(--ink)',
                  borderRadius: '5px 7px 6px 8px / 6px 5px 8px 7px',
                  background: pickedCompetitor === label ? 'var(--highlight-soft)' : 'var(--paper)',
                  padding: 6, cursor: 'pointer', minWidth: 0,
                  boxShadow: pickedCompetitor === label ? '2px 2px 0 var(--ink)' : 'none',
                }}>
                  <div style={{ position: 'relative', height: 90, marginBottom: 6 }}>
                    <MockUI kind="video" style={{ height: '100%' }} />
                    <div style={{ position: 'absolute', bottom: 4, right: 4, background: 'rgba(20,20,20,0.85)', color: 'var(--paper)', fontSize: 9, padding: '2px 5px', borderRadius: 3, fontFamily: 'var(--hand)' }}>0:30</div>
                  </div>
                  <div style={{ fontSize: 11, fontFamily: 'var(--hand)', textAlign: 'left' }}>{label}</div>
                </button>
              ))}
            </div>
            <p className="wf-micro" style={{ marginTop: 8 }}>Synced from <span className="wf-squig" style={{ cursor: 'pointer' }}>Industry Insights → Saved boards</span></p>
          </div>
        )}

        {/* CTA row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 22 }}>
          <div className="wf-micro">~30s to analyze · 1 credit per minute of video</div>
          <Btn onClick={runAnalysis} style={{ padding: '12px 22px' }}>
            {analyzing ? '⟳  Analyzing…' : analyzed ? '↻ Re-analyze' : '✦ Analyze video →'}
          </Btn>
        </div>
      </Box>

      {/* ── Analyzing state ──────────────────────────────── */}
      {analyzing && (
        <Box style={{ padding: 32, textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 36, height: 36, border: '2px solid var(--ink)', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
          <div className="wf-body" style={{ fontSize: 14, fontWeight: 700 }}>Watching your video…</div>
          <p className="wf-micro" style={{ marginTop: 4 }}>Transcribing audio · detecting beats · scoring against category · drafting remix</p>
        </Box>
      )}

      {/* ── Results ─────────────────────────────────────── */}
      {analyzed && !analyzing && (
        <React.Fragment>

          {/* Player + timeline */}
          <Box style={{ padding: 0, marginBottom: 24, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 0 }}>

              {/* Mock player */}
              <div style={{ position: 'relative', background: 'var(--ink)', minHeight: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1.5px solid var(--ink)' }}>
                <MockUI kind="video" style={{ position: 'absolute', inset: 0, height: '100%', width: '100%' }} />
                <div style={{ position: 'relative', zIndex: 1, color: 'var(--paper)', textAlign: 'center', fontFamily: 'var(--hand)' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', border: '2px solid var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', background: 'rgba(0,0,0,0.4)' }}>
                    <div style={{ fontSize: 26, marginLeft: 4 }}>▶</div>
                  </div>
                  <div style={{ marginTop: 10, fontSize: 12, opacity: 0.8 }}>{src === 'url' ? (url || 'pasted URL preview') : src === 'upload' ? 'uploaded.mp4' : pickedCompetitor}</div>
                </div>
                {/* Scrubber + timestamp markers */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 12, background: 'linear-gradient(transparent, rgba(0,0,0,0.6))' }}>
                  <div style={{ position: 'relative', height: 16 }}>
                    <div style={{ position: 'absolute', top: 7, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.4)' }} />
                    <div style={{ position: 'absolute', top: 7, left: 0, width: '32%', height: 2, background: 'var(--highlight)' }} />
                    {moments.map((m, i) => {
                      const pct = (i / (moments.length - 1)) * 100;
                      return (
                        <div key={i} onClick={() => setActive(i)} style={{
                          position: 'absolute', top: 0, left: pct + '%', transform: 'translateX(-50%)',
                          width: 10, height: 16, cursor: 'pointer',
                        }}>
                          <div style={{
                            width: 10, height: 10,
                            background: i === activeMoment ? 'var(--highlight)' : 'var(--paper)',
                            border: '1.5px solid var(--ink)',
                            borderRadius: '50%',
                            marginTop: 2,
                          }} />
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, color: 'var(--paper)', fontFamily: 'var(--hand)', fontSize: 11 }}>
                    <span>0:00</span><span>0:32</span>
                  </div>
                </div>
              </div>

              {/* Active moment detail */}
              <div style={{ padding: 20, background: 'var(--paper-soft)', minWidth: 0 }}>
                <div className="wf-eyebrow" style={{ marginBottom: 8 }}>Moment {activeMoment + 1} of {moments.length}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontFamily: 'var(--hand-loose)', fontSize: 28, fontWeight: 700 }}>{moments[activeMoment].t}</span>
                  <Pill style={{ background: verdictColor(moments[activeMoment].verdict), borderColor: 'var(--ink)', fontSize: 10 }}>
                    {moments[activeMoment].label.toUpperCase()} · {moments[activeMoment].verdict}
                  </Pill>
                </div>
                <p className="wf-body" style={{ fontSize: 13, lineHeight: 1.5 }}>{moments[activeMoment].note}</p>

                <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1.5px dashed var(--ink-faint)' }}>
                  <div className="wf-eyebrow" style={{ marginBottom: 6 }}>Jump to a moment</div>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {moments.map((m, i) => (
                      <button key={i} onClick={() => setActive(i)} style={{
                        padding: '4px 8px', fontSize: 10, fontFamily: 'var(--hand)',
                        border: '1.5px solid var(--ink)',
                        borderRadius: 999,
                        background: i === activeMoment ? 'var(--ink)' : 'var(--paper)',
                        color:      i === activeMoment ? 'var(--paper)' : 'var(--ink)',
                        cursor: 'pointer',
                      }}>{m.t} {m.label}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Box>

          {/* Three result cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 16, marginBottom: 24 }}>

            {/* Timeline analysis */}
            <Box style={{ padding: 20 }}>
              <div className="wf-eyebrow" style={{ marginBottom: 10 }}>2 · Timeline analysis</div>
              <h3 className="wf-h2" style={{ fontSize: 18, marginBottom: 14 }}>Second-by-second breakdown</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {moments.map((m, i) => (
                  <div key={i} onClick={() => setActive(i)} style={{
                    display: 'grid', gridTemplateColumns: '50px 80px 1fr', gap: 10, alignItems: 'start',
                    padding: 8,
                    borderRadius: 4,
                    background: i === activeMoment ? 'var(--highlight-soft)' : 'transparent',
                    cursor: 'pointer',
                    border: '1px solid ' + (i === activeMoment ? 'var(--ink-faint)' : 'transparent'),
                  }}>
                    <div style={{ fontFamily: 'var(--hand)', fontSize: 13, fontWeight: 700 }}>{m.t}</div>
                    <div>
                      <Pill style={{ background: verdictColor(m.verdict), fontSize: 9, padding: '2px 6px' }}>{m.label}</Pill>
                    </div>
                    <div className="wf-body" style={{ fontSize: 12, lineHeight: 1.45 }}>{m.note}</div>
                  </div>
                ))}
              </div>
            </Box>

            {/* Benchmarks */}
            <Box style={{ padding: 20 }}>
              <div className="wf-eyebrow" style={{ marginBottom: 10 }}>3 · Benchmark vs category</div>
              <h3 className="wf-h2" style={{ fontSize: 18, marginBottom: 6 }}>You vs Skincare · top 10%</h3>
              <p className="wf-micro" style={{ marginBottom: 14 }}>Compared against 1,840 ads in your saved Industry Insights category.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {benchmarks.map((b, i) => {
                  const youBetter = b.lowerBetter ? b.you < b.peer : b.you > b.peer;
                  const max = Math.max(b.you, b.peer) * 1.15;
                  return (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontFamily: 'var(--hand)', fontSize: 12 }}>
                        <span style={{ fontWeight: 700 }}>{b.label}</span>
                        <span style={{ color: youBetter ? 'var(--ink)' : 'var(--accent)' }}>
                          You {b.you}{b.unit} · peer {b.peer}{b.unit}
                        </span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 9, fontFamily: 'var(--hand)', width: 32 }}>YOU</span>
                          <div style={{ flex: 1, height: 10, background: 'var(--paper-soft)', border: '1px solid var(--ink-faint)', borderRadius: 2, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: (b.you / max * 100) + '%', background: youBetter ? 'var(--highlight)' : '#ffc8b8' }} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 9, fontFamily: 'var(--hand)', width: 32, color: 'var(--ink-faint)' }}>PEER</span>
                          <div style={{ flex: 1, height: 10, background: 'var(--paper-soft)', border: '1px solid var(--ink-faint)', borderRadius: 2, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: (b.peer / max * 100) + '%', background: 'var(--ink-faint)' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Box>
          </div>

          {/* Generated script — full width */}
          <Box style={{ padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <div className="wf-eyebrow" style={{ marginBottom: 6 }}>4 · Generated script & storyboard</div>
                <h3 className="wf-h2" style={{ fontSize: 20 }}>Your remix — same structure, your brand voice</h3>
                <p className="wf-micro" style={{ marginTop: 4 }}>Built from the patterns above, rewritten for your products and tone.</p>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                <Btn variant="outline" style={{ fontSize: 12, padding: '6px 12px' }}>↻ Regenerate</Btn>
                <Btn variant="outline" style={{ fontSize: 12, padding: '6px 12px' }}>⎘ Copy script</Btn>
                <Btn style={{ fontSize: 12, padding: '6px 12px' }}>→ Send to FabAgent</Btn>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1.4fr', gap: 14, padding: '10px 0', borderBottom: '1.5px solid var(--ink)', fontFamily: 'var(--hand)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--ink-soft)' }}>
              <div>Time</div><div>Direction</div><div>Voiceover</div>
            </div>

            {scriptBeats.map((b, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '120px 1fr 1.4fr', gap: 14,
                padding: '14px 0', borderBottom: i < scriptBeats.length - 1 ? '1.5px dashed var(--ink-faint)' : 'none',
                alignItems: 'start',
              }}>
                <div style={{ fontFamily: 'var(--hand)', fontSize: 13, fontWeight: 700 }}>{b.t}</div>
                <div className="wf-body" style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--ink-soft)' }}>{b.dir}</div>
                <div className="wf-body" style={{ fontSize: 13, lineHeight: 1.55 }}>{b.vo}</div>
              </div>
            ))}

            <div style={{ marginTop: 18, padding: 14, background: 'var(--highlight-soft)', borderRadius: 4, border: '1.5px dashed var(--ink-faint)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 18 }}>✦</span>
                <span className="wf-body" style={{ fontSize: 13 }}>
                  <strong>What changed vs the original:</strong> tightened the problem section (-2s), promoted the CTA card from supporting to hero (+1s on screen), swapped the second testimonial for a single high-emotion clip.
                </span>
              </div>
            </div>
          </Box>

          {/* Save / next steps */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, border: '1.5px dashed var(--ink-faint)', borderRadius: 6, background: 'var(--paper-soft)' }}>
            <div className="wf-body" style={{ fontSize: 13 }}>
              <strong>Save this analysis</strong> to your boards · or run another video.
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn variant="outline" style={{ fontSize: 12, padding: '8px 14px' }}>+ Save to board</Btn>
              <Btn variant="outline" style={{ fontSize: 12, padding: '8px 14px' }} onClick={() => { setAnalyzed(false); window.scrollTo(0, 0); }}>↻ Analyze another</Btn>
            </div>
          </div>

        </React.Fragment>
      )}

      {/* ── Empty state hint when not analyzed ──────────── */}
      {!analyzed && !analyzing && (
        <Box style={{ padding: 32, textAlign: 'center', background: 'var(--paper-soft)', borderStyle: 'dashed' }}>
          <div style={{ fontSize: 32, lineHeight: 1, marginBottom: 8 }}>▶</div>
          <h3 className="wf-h2" style={{ fontSize: 18, marginBottom: 6 }}>Pick a video above and hit Analyze</h3>
          <p className="wf-body" style={{ fontSize: 13, color: 'var(--ink-faint)', maxWidth: 460, margin: '0 auto' }}>
            You'll get a timeline of what worked (and what didn't), a benchmark vs your category, and a script remix you can hand straight to FabAgent.
          </p>
        </Box>
      )}
    </div>
  );
}

window.VideoSage = VideoSage;
