import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Background, Eyebrow, SceneFrame, Subtitle, Watermark} from '../components/Common';
import {Person} from '../components/Person';
import {Cone, SignPost, Tent} from '../components/Props';
import {C, ease, fadeIn, rise, pulse} from '../theme';
import {narrationFor} from '../narration';

export const PANEL_W = 708;
export const PANEL_H = 262;

export const RoadIllustration: React.FC<{frame: number}> = ({frame}) => {
  const doc = ease(frame, 44, 66, 0, 1);
  return (
    <div style={{position: 'relative', width: PANEL_W, height: PANEL_H, borderRadius: 24, overflow: 'hidden', background: 'linear-gradient(#E3F3F8,#CFE8F0)'}}>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 78, background: '#587E96'}} />
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 36, height: 6, backgroundImage: 'repeating-linear-gradient(90deg,#fff 0 46px,transparent 46px 92px)', backgroundPosition: `${-frame * 2}px 0`, opacity: 0.9}} />
      <Tent x={40} y={196} scale={0.95} />
      <Cone x={250} y={228} scale={0.7} />
      <Cone x={300} y={238} scale={0.7} />
      <Person role="warga" x={430} y={4} scale={0.74} pose={{mood: 'smile', armR: [16 + doc * 10, 90 * doc + 8], itemR: doc > 0.2 ? 'doc' : 'none'}} />
      <div style={{position: 'absolute', right: 32, top: 24, opacity: fadeIn(frame, 40, 14), transform: `translateY(${pulse(frame, 70) * -5}px)`}}>
        <svg width="82" height="102" viewBox="0 0 64 80" fill="none">
          <path d="M6 6a4 4 0 0 1 4-4h30l18 18v54a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V6Z" fill="white" stroke={C.line} strokeWidth="2" />
          <rect x="14" y="26" width="26" height="5" rx="2.5" fill={C.blue} />
          <rect x="14" y="38" width="36" height="4" rx="2" fill="#D6E3E9" />
          <rect x="14" y="47" width="30" height="4" rx="2" fill="#D6E3E9" />
          <circle cx="46" cy="64" r="11" fill={C.green} />
          <path d="M41 64l4 4 7-8" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};

export const FacilityIllustration: React.FC<{frame: number}> = ({frame}) => {
  const walk = ease(frame, 30, 70, 1, 0);
  const pin = ease(frame, 70, 90, 0, 1);
  return (
    <div style={{position: 'relative', width: PANEL_W, height: PANEL_H, borderRadius: 24, overflow: 'hidden', background: 'linear-gradient(#FFF6E2,#F8E8C4)'}}>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 78, background: '#587E96'}} />
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 36, height: 6, backgroundImage: 'repeating-linear-gradient(90deg,#fff 0 46px,transparent 46px 92px)', backgroundPosition: `${-frame * 2}px 0`, opacity: 0.9}} />
      <SignPost x={190} y={236} scale={0.82} tilt={ease(frame, 40, 75, 0, -5)} />
      <div style={{position: 'absolute', left: 96, top: 26, opacity: pin, transform: `translateY(${(1 - pin) * -24}px)`}}>
        <svg width="46" height="62" viewBox="0 0 46 62" fill="none"><path d="M23 2C11 2 3 11 3 22c0 15 20 38 20 38s20-23 20-38C43 11 35 2 23 2Z" fill={C.amber} stroke="white" strokeWidth="4" /><circle cx="23" cy="22" r="8" fill="white" /></svg>
      </div>
      <Person role="teknisi" x={380 + walk * 330} y={4} scale={0.74} pose={{walk: walk > 0.001 ? frame * 0.42 : undefined, walkAmp: ease(frame, 62, 72, 1, 0), itemL: walk < 0.02 ? 'camera' : 'none', armL: [22 * (1 - walk), 96 * (1 - walk) + 8], mood: 'smile'}} />
    </div>
  );
};

const ServiceCard: React.FC<{frame: number; delay: number; tag: string; title: string; sub: string; accent: string; children: React.ReactNode}> = ({frame, delay, tag, title, sub, accent, children}) => (
  <div style={{width: 780, padding: 36, borderRadius: 32, background: 'rgba(255,255,255,.97)', boxShadow: '0 26px 70px rgba(4,22,40,.18)', opacity: fadeIn(frame, delay, 24), transform: `translateY(${rise(frame, delay, 48)}px)`}}>
    <div style={{fontSize: 20, fontWeight: 900, color: C.blue, letterSpacing: 3, marginBottom: 18}}>{tag}</div>
    {children}
    <div style={{fontSize: 36, fontWeight: 900, color: C.ink, lineHeight: 1.15, marginTop: 28}}>{title}</div>
    <div style={{fontSize: 23, color: '#557083', lineHeight: 1.4, marginTop: 12}}>{sub}</div>
    <div style={{height: 7, width: 110, borderRadius: 9, background: accent, marginTop: 24}} />
  </div>
);

export const Scene2Services: React.FC = () => {
  const f = useCurrentFrame();
  const line = narrationFor('services')[0];
  return (
    <SceneFrame enter="slideRight">
      <Background light accent={C.blue} />
      <Watermark />
      <div style={{position: 'absolute', left: 145, top: 92}}>
        <Eyebrow dark>DUA KEBUTUHAN, DUA LAYANAN</Eyebrow>
        <div style={{fontSize: 60, fontWeight: 900, color: C.ink, marginTop: 20}}>Layanan yang tersedia</div>
      </div>
      <div style={{position: 'absolute', left: 160, right: 160, top: 258, display: 'flex', gap: 40}}>
        <ServiceCard frame={f} delay={14} tag="LAYANAN 01" accent={C.cyan} title="Surat Rekomendasi Penggunaan Jalan Selain untuk Lalu Lintas" sub="Rekomendasi untuk kegiatan masyarakat yang memerlukan penggunaan jalan.">
          <RoadIllustration frame={Math.max(0, f - 14)} />
        </ServiceCard>
        <ServiceCard frame={f} delay={36} tag="LAYANAN 02" accent={C.amber} title="Permohonan Pergeseran/Pemindahan Fasilitas Jalan" sub="Pemeriksaan kondisi rambu dan fasilitas jalan langsung di lapangan oleh Teknisi.">
          <FacilityIllustration frame={Math.max(0, f - 36)} />
        </ServiceCard>
      </div>
      <AbsoluteFill style={{pointerEvents: 'none'}}>
        <Subtitle text={line.text} />
      </AbsoluteFill>
    </SceneFrame>
  );
};
