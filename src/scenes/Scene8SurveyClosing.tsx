import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {Avatar, Person, Role} from '../components/Person';
import {AGENCY_NAME, Background, BrandMark, Eyebrow, SceneFrame, Subtitle, Watermark} from '../components/Common';
import {CLOSING_START, FEATURES} from '../config';
import {C, SPRING_PRESETS, ease, easeInOut, fadeIn, pulse, rise, typed, useSpr} from '../theme';
import {narrationFor} from '../narration';

export const Tracker: React.FC<{frame: number}> = ({frame}) => {
  const steps = ['Diajukan', 'Diproses', 'Selesai'];
  const progress = ease(frame, 14, 70, 0, 2);
  return (
    <div style={{position: 'absolute', left: 145, top: 352, width: 640, opacity: fadeIn(frame, 10, 14)}}>
      <div style={{fontSize: 18, fontWeight: 900, color: C.blue, marginBottom: 14, letterSpacing: 1}}>STATUS PERMOHONAN</div>
      <div style={{position: 'relative', display: 'flex', justifyContent: 'space-between'}}>
        <div style={{position: 'absolute', left: 22, right: 22, top: 19, height: 6, borderRadius: 3, background: '#CFE0E8'}} />
        <div style={{position: 'absolute', left: 22, top: 19, height: 6, borderRadius: 3, background: C.green, width: `${(progress / 2) * 596}px`}} />
        {steps.map((s, i) => {
          const on = progress >= i - 0.01;
          return (
            <div key={s} style={{position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
              <div style={{width: 44, height: 44, borderRadius: 22, background: on ? C.green : 'white', border: `3px solid ${on ? C.green : '#CFE0E8'}`, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 900}}>{on ? '✓' : ''}</div>
              <div style={{fontSize: 18, fontWeight: 800, color: on ? C.ink : '#7A909C'}}>{s}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Star: React.FC<{frame: number; delay: number}> = ({frame, delay}) => {
  const pop = useSpr(frame, delay, 9, 170);
  return <div style={{fontSize: 62, color: C.amber, opacity: fadeIn(frame, delay, 6), transform: `scale(${0.5 + pop * 0.5})`}}>★</div>;
};

export const SurveyCard: React.FC<{frame: number}> = ({frame}) => {
  const comment = typed('Layanan mudah diikuti dan jelas.', frame, 70, 0.6);
  const click = frame >= 112;
  const sent = useSpr(frame, 118, 12, 130);
  return (
    <div style={{position: 'absolute', left: 1040, top: 140, width: 700, padding: 40, borderRadius: 32, background: 'white', boxShadow: '0 28px 70px rgba(4,22,40,.2)', opacity: fadeIn(frame, 18, 16), transform: `translateY(${rise(frame, 18, 36)}px)`}}>
      <div style={{fontSize: 18, color: C.blue, fontWeight: 900, letterSpacing: 2}}>SURVEI KEPUASAN</div>
      <div style={{fontSize: 34, color: C.ink, fontWeight: 900, marginTop: 14}}>Bagaimana pengalaman Anda?</div>
      <div style={{display: 'flex', gap: 14, marginTop: 24}}>
        {[0, 1, 2, 3, 4].map((s) => (
          <Star key={s} frame={frame} delay={38 + s * 7} />
        ))}
      </div>
      <div style={{minHeight: 96, borderRadius: 16, border: '1.5px solid #DDE8ED', background: '#F8FBFC', marginTop: 22, padding: '16px 18px', fontSize: 21, fontWeight: 600, color: C.ink}}>
        {comment || <span style={{color: '#91A4AF'}}>Tuliskan penilaian dan saran Anda...</span>}
      </div>
      <div style={{height: 58, borderRadius: 14, background: click ? C.green : C.blue, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 900, marginTop: 22, transform: `scale(${click ? 0.97 + 0.03 * ease(frame, 112, 120, 0, 1) : 1})`}}>
        {click ? '✓ PENILAIAN TERKIRIM' : 'KIRIM PENILAIAN'}
      </div>
      {click && (
        <div style={{position: 'absolute', right: 26, top: -22, padding: '10px 20px', borderRadius: 14, background: C.green, color: 'white', fontSize: 18, fontWeight: 900, boxShadow: '0 12px 26px rgba(0,0,0,.2)', transform: `scale(${0.6 + sent * 0.4})`, opacity: fadeIn(frame, 118, 6)}}>Terima kasih!</div>
      )}
    </div>
  );
};

export const AdminReply: React.FC<{frame: number}> = ({frame}) => {
  const s = useSpr(frame, 128, 13, 120);
  if (!FEATURES.adminSurveyReply) return null;
  return (
    <div style={{position: 'absolute', left: 1040, top: 770, display: 'flex', alignItems: 'center', gap: 18, opacity: fadeIn(frame, 128, 10), transform: `translateY(${(1 - s) * 24}px)`}}>
      <Avatar role="admin" size={84} ring={C.cyan} />
      <div style={{padding: '16px 24px', borderRadius: 20, background: C.navy, color: 'white', maxWidth: 560}}>
        <div style={{fontSize: 15, fontWeight: 800, color: C.cyan}}>Tanggapan Admin</div>
        <div style={{fontSize: 21, fontWeight: 700, marginTop: 4, lineHeight: 1.3}}>Terima kasih atas penilaian Anda.</div>
      </div>
    </div>
  );
};

const SurveyPart: React.FC<{frame: number}> = ({frame}) => {
  const happy = frame >= 112;
  const raise = ease(frame, 24, 44, 0, 1);
  return (
    <AbsoluteFill>
      <Background light accent={C.blue} />
      <Watermark />
      <div style={{position: 'absolute', left: 145, top: 92, width: 800}}>
        <Eyebrow dark>SETELAH LAYANAN</Eyebrow>
        <div style={{fontSize: 52, color: C.ink, fontWeight: 900, lineHeight: 1.1, marginTop: 20}}>Suara Warga ikut membangun kualitas pelayanan.</div>
      </div>
      <Tracker frame={frame} />
      <Person role="warga" x={470} y={500} scale={1.05} pose={{armR: [6 + 18 * raise, 8 + 92 * raise], itemR: raise > 0.05 ? 'phone' : 'none', mood: happy ? 'happy' : 'smile', nod: happy ? Math.sin(ease(frame, 112, 130, 0, 1) * Math.PI) * 8 : 0, look: 0.8}} />
      <SurveyCard frame={frame} />
      <AdminReply frame={frame} />
    </AbsoluteFill>
  );
};

const CLOSING_ROLES: Role[] = ['warga', 'admin', 'kadis', 'kabid', 'teknisi'];

const ClosingPart: React.FC<{frame: number}> = ({frame}) => {
  const k = frame - CLOSING_START;
  const reveal = easeInOut(k, 0, 22);
  const logo = useSpr(k, 8, SPRING_PRESETS.logo.damping, SPRING_PRESETS.logo.stiffness);
  const sweep = ease(k, 28, 62, -20, 130, (t) => t);
  return (
    <AbsoluteFill style={{clipPath: `circle(${reveal * 1450}px at 50% 24%)`}}>
      <Background />
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" style={{position: 'absolute', inset: 0}}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const left = i % 2 === 0;
          const y0 = 80 + i * 150;
          const d = left ? `M-40 ${y0} C 400 ${y0 + 20}, 700 300, 900 262` : `M1960 ${y0} C 1520 ${y0 + 20}, 1220 300, 1020 262`;
          return <path key={i} d={d} stroke={C.cyan} strokeOpacity={0.3} strokeWidth={3} strokeDasharray="20 22" strokeDashoffset={-k * 3 * (left ? 1 : -1)} />;
        })}
      </svg>
      <div style={{position: 'absolute', left: 0, right: 0, top: 70, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
        <div style={{transform: `scale(${0.7 + logo * 0.3})`, opacity: fadeIn(k, 6, 10)}}>
          <BrandMark size={104} />
        </div>
        <div style={{fontSize: 44, color: C.cyan, letterSpacing: 3, fontWeight: 900, marginTop: 18, opacity: fadeIn(k, 12, 14)}}>LAYANAN ADUAN</div>
        <div style={{fontSize: 140, fontWeight: 900, color: C.white, letterSpacing: -5, lineHeight: 1, marginTop: 6, opacity: fadeIn(k, 16, 16), transform: `translateY(${rise(k, 16, 24)}px)`}}>RekLaLin</div>
        <div style={{fontSize: 28, color: '#BFE9EF', letterSpacing: 2, fontWeight: 800, marginTop: 14, opacity: fadeIn(k, 28, 14)}}>{AGENCY_NAME.toUpperCase()}</div>
        <div style={{fontSize: 30, color: '#D1E3EB', marginTop: 20, opacity: fadeIn(k, 40, 16), fontWeight: 600}}>Lebih terarah. Lebih transparan. Lebih dekat dengan Warga.</div>
      </div>
      {CLOSING_ROLES.map((r, i) => (
        <Person key={r} role={r} x={960 + (i - 2) * 260 - 77} y={610} scale={0.85} opacity={fadeIn(k, 22 + i * 4, 12)} pose={{mood: 'smile'}} />
      ))}
      <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', background: `linear-gradient(105deg, transparent ${sweep - 10}%, rgba(56,195,210,.22) ${sweep}%, transparent ${sweep + 10}%)`}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 560, height: 3, background: `linear-gradient(90deg, transparent, ${C.cyan}, transparent)`, opacity: 0.4 + pulse(k, 50) * 0.3}} />
    </AbsoluteFill>
  );
};

export const Scene8SurveyClosing: React.FC = () => {
  const f = useCurrentFrame();
  const [surveyLine, closingLine] = narrationFor('survey');
  return (
    <SceneFrame enter="fade">
      <SurveyPart frame={f} />
      {f >= CLOSING_START && <ClosingPart frame={f} />}
      <Sequence from={0} durationInFrames={CLOSING_START}>
        <Subtitle text={surveyLine.text} />
      </Sequence>
      <Sequence from={CLOSING_START} durationInFrames={closingLine.endLocal - closingLine.startLocal}>
        <Subtitle text={closingLine.text} delay={14} />
      </Sequence>
    </SceneFrame>
  );
};
