import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Background, Eyebrow, SceneFrame, Subtitle, Watermark} from '../../components/Common';
import {FacilityIllustration, PANEL_H, PANEL_W, RoadIllustration} from '../Scene2Services';
import {C, fadeIn, rise} from '../../theme';
import {narrationFor} from '../../narration';

const K = 1.04;

const Card: React.FC<{frame: number; delay: number; tag: string; title: string; accent: string; children: React.ReactNode}> = ({frame, delay, tag, title, accent, children}) => (
  <div style={{width: 960, padding: '28px 28px 30px', borderRadius: 32, background: 'rgba(255,255,255,.97)', boxShadow: '0 26px 70px rgba(4,22,40,.18)', opacity: fadeIn(frame, delay, 24), transform: `translateY(${rise(frame, delay, 48)}px)`}}>
    <div style={{fontSize: 20, fontWeight: 900, color: C.blue, letterSpacing: 3, marginBottom: 14}}>{tag}</div>
    <div style={{width: PANEL_W * K, height: PANEL_H * K, margin: '0 auto'}}>
      <div style={{transform: `scale(${K})`, transformOrigin: 'top left'}}>{children}</div>
    </div>
    <div style={{fontSize: 34, fontWeight: 900, color: C.ink, lineHeight: 1.15, marginTop: 20}}>{title}</div>
    <div style={{height: 7, width: 110, borderRadius: 9, background: accent, marginTop: 16}} />
  </div>
);

/** Adegan 2 (vertikal): dua layanan utama, ditumpuk. */
export const Scene2ServicesV: React.FC = () => {
  const f = useCurrentFrame();
  const line = narrationFor('services')[0];
  return (
    <SceneFrame enter="slideRight">
      <Background light accent={C.blue} />
      <Watermark />
      <div style={{position: 'absolute', left: 60, top: 236}}>
        <Eyebrow dark>DUA KEBUTUHAN, DUA LAYANAN</Eyebrow>
        <div style={{fontSize: 56, fontWeight: 900, color: C.ink, marginTop: 14}}>Layanan yang tersedia</div>
      </div>
      <div style={{position: 'absolute', left: 60, top: 380, display: 'flex', flexDirection: 'column', gap: 24}}>
        <Card frame={f} delay={14} tag="LAYANAN 01" accent={C.cyan} title="Surat Rekomendasi Penggunaan Jalan Selain untuk Lalu Lintas">
          <RoadIllustration frame={Math.max(0, f - 14)} />
        </Card>
        <Card frame={f} delay={36} tag="LAYANAN 02" accent={C.amber} title="Permohonan Pergeseran/Pemindahan Fasilitas Jalan">
          <FacilityIllustration frame={Math.max(0, f - 36)} />
        </Card>
      </div>
      <AbsoluteFill style={{pointerEvents: 'none'}}>
        <Subtitle text={line.text} />
      </AbsoluteFill>
    </SceneFrame>
  );
};
