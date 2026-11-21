import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {AdminReply, SurveyCard, Tracker} from '../Scene8SurveyClosing';
import {AGENCY_NAME, Background, BrandMark, Eyebrow, SceneFrame, Subtitle, Watermark} from '../../components/Common';
import {Person, Role} from '../../components/Person';
import {CLOSING_START} from '../../config';
import {C, SPRING_PRESETS, ease, easeInOut, fadeIn, pulse, rise, useSpr} from '../../theme';
import {narrationFor} from '../../narration';

const ROLES: Role[] = ['warga', 'admin', 'kadis', 'kabid', 'teknisi'];
const place = (x: number, y: number, k: number): React.CSSProperties => ({position: 'absolute', left: x, top: y, width: 1, height: 1, transform: `scale(${k})`, transformOrigin: 'top left'});

const SurveyPartV: React.FC<{frame: number}> = ({frame}) => {
  const happy = frame >= 112;
  const raise = ease(frame, 24, 44, 0, 1);
  return (
    <AbsoluteFill>
      <Background light accent={C.blue} />
      <Watermark />
      <div style={{position: 'absolute', left: 60, top: 236, width: 960}}>
        <Eyebrow dark>SETELAH LAYANAN</Eyebrow>
        <div style={{fontSize: 52, color: C.ink, fontWeight: 900, lineHeight: 1.1, marginTop: 14}}>Suara Warga ikut membangun kualitas pelayanan.</div>
      </div>
      <div style={place(60 - 145, 440 - 352, 1)}><Tracker frame={frame} /></div>
      <Person role="warga" view="half" x={790} y={405} scale={0.85} pose={{armR: [6 + 18 * raise, 8 + 92 * raise], itemR: raise > 0.05 ? 'phone' : 'none', mood: happy ? 'happy' : 'smile', look: -0.6}} />
      <div style={place(60 - 1040 * 1.37, 590 - 140 * 1.37, 1.37)}><SurveyCard frame={frame} /></div>
      <div style={place(-980, 500, 1)}><AdminReply frame={frame} /></div>
    </AbsoluteFill>
  );
};

const ClosingPartV: React.FC<{frame: number}> = ({frame}) => {
  const k = frame - CLOSING_START;
  const reveal = easeInOut(k, 0, 22);
  const logo = useSpr(k, 8, SPRING_PRESETS.logo.damping, SPRING_PRESETS.logo.stiffness);
  const sweep = ease(k, 28, 62, -20, 130, (t) => t);
  return (
    <AbsoluteFill style={{clipPath: `circle(${reveal * 1650}px at 50% 25%)`}}>
      <Background />
      <div style={{position: 'absolute', left: 0, right: 0, top: 290, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
        <div style={{transform: `scale(${0.7 + logo * 0.3})`, opacity: fadeIn(k, 6, 10)}}><BrandMark size={140} /></div>
        <div style={{fontSize: 52, color: C.cyan, letterSpacing: 4, fontWeight: 900, marginTop: 26, opacity: fadeIn(k, 12, 14)}}>LAYANAN ADUAN</div>
        <div style={{fontSize: 200, fontWeight: 900, color: C.white, letterSpacing: -8, lineHeight: 1, marginTop: 4, opacity: fadeIn(k, 16, 16), transform: `translateY(${rise(k, 16, 24)}px)`}}>RekLaLin</div>
        <div style={{fontSize: 28, color: '#BFE9EF', letterSpacing: 2, fontWeight: 800, marginTop: 16, opacity: fadeIn(k, 28, 14)}}>{AGENCY_NAME.toUpperCase()}</div>
        <div style={{fontSize: 38, color: '#D1E3EB', marginTop: 30, width: 860, lineHeight: 1.3, opacity: fadeIn(k, 40, 16), fontWeight: 600}}>Lebih terarah. Lebih transparan. Lebih dekat dengan Warga.</div>
      </div>
      {ROLES.map((r, i) => (
        <Person key={r} role={r} x={540 + (i - 2) * 200 - 67} y={1060} scale={0.75} opacity={fadeIn(k, 22 + i * 4, 12)} pose={{mood: 'smile'}} />
      ))}
      <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', background: `linear-gradient(105deg, transparent ${sweep - 10}%, rgba(56,195,210,.22) ${sweep}%, transparent ${sweep + 10}%)`}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 1030, height: 3, background: `linear-gradient(90deg, transparent, ${C.cyan}, transparent)`, opacity: 0.4 + pulse(k, 50) * 0.3}} />
    </AbsoluteFill>
  );
};

/** Adegan 8 (vertikal): survei kepuasan lalu penutup. */
export const Scene8SurveyClosingV: React.FC = () => {
  const f = useCurrentFrame();
  const [surveyLine, closingLine] = narrationFor('survey');
  return (
    <SceneFrame enter="fade">
      <SurveyPartV frame={f} />
      {f >= CLOSING_START && <ClosingPartV frame={f} />}
      <Sequence from={0} durationInFrames={CLOSING_START}>
        <Subtitle text={surveyLine.text} />
      </Sequence>
      <Sequence from={CLOSING_START} durationInFrames={closingLine.endLocal - closingLine.startLocal}>
        <Subtitle text={closingLine.text} delay={14} />
      </Sequence>
    </SceneFrame>
  );
};
