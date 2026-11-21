import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Avatar, ROLE_LABEL} from '../../components/Person';
import {Background, DocIcon, Eyebrow, SceneFrame, Subtitle, Watermark} from '../../components/Common';
import {ChipRow, DecisionBlock, LANE_A, LANE_B, Step} from '../Scene4Workflow';
import {C, ease, fadeIn, flash, hop, hopArrive, rise, useSpr} from '../../theme';
import {narrationFor} from '../../narration';

const PITCH = 190;
const cx = (i: number) => i * PITCH + PITCH / 2;

const Node: React.FC<{step: Step; i: number; frame: number; appear: number; arrive: number}> = ({step, i, frame, appear, arrive}) => {
  const g = flash(frame, arrive, 18);
  const bell = useSpr(frame, arrive, 12, 150);
  return (
    <div style={{position: 'absolute', left: i * PITCH, top: 62, width: PITCH, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 2, opacity: fadeIn(frame, appear, 14), transform: `translateY(${rise(frame, appear, 16)}px)`}}>
      <div style={{position: 'relative'}}>
        <Avatar role={step.role} size={84} ring={g > 0 ? C.cyan : '#FFFFFF'} glow={g} />
        {frame >= arrive && frame < arrive + 30 && <div style={{position: 'absolute', right: -6, top: -4, width: 26, height: 26, borderRadius: 13, background: C.amber, border: '3px solid white', transform: `scale(${bell})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: C.ink}}>!</div>}
      </div>
      <div style={{fontSize: 20, fontWeight: 900, color: C.ink, marginTop: 8}}>{ROLE_LABEL[step.role]}</div>
      <div style={{fontSize: 14, fontWeight: 700, color: C.slate, marginTop: 3, lineHeight: 1.25, width: 176}}>{step.sub}</div>
    </div>
  );
};

const Lane: React.FC<{frame: number; top: number; height: number; tag: string; title: string; accent: string; steps: Step[]; base: number; tokenStart: number; children: React.ReactNode}> = ({frame, top, height, tag, title, accent, steps, base, tokenStart, children}) => {
  const tx = hop(frame, tokenStart, steps.map((_, i) => cx(i)));
  const end = tokenStart + (steps.length - 1) * 14;
  return (
    <div style={{position: 'absolute', left: 60, top, width: 960, height, borderRadius: 28, background: 'rgba(255,255,255,.97)', boxShadow: '0 20px 55px rgba(4,22,40,.14)', borderLeft: `10px solid ${accent}`, opacity: fadeIn(frame, base - 8, 14)}}>
      <div style={{position: 'absolute', left: 22, top: 14, display: 'flex', alignItems: 'center', gap: 12}}>
        <div style={{padding: '6px 14px', borderRadius: 999, background: accent, color: accent === C.amber ? C.ink : 'white', fontSize: 15, fontWeight: 900, letterSpacing: 1.5}}>{tag}</div>
        <div style={{fontSize: 22, fontWeight: 900, color: C.ink}}>{title}</div>
      </div>
      {steps.map((s, i) => <Node key={i} step={s} i={i} frame={frame} appear={base + i * 7} arrive={hopArrive(tokenStart, i)} />)}
      {steps.slice(0, -1).map((_, i) => (
        <div key={i} style={{position: 'absolute', left: cx(i) + 52, top: 102, width: PITCH - 104, display: 'flex', alignItems: 'center', opacity: fadeIn(frame, base + i * 7 + 6, 10)}}>
          <div style={{flex: 1, height: 4, borderRadius: 2, background: accent, opacity: 0.55}} />
          <div style={{width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: `12px solid ${accent}`, opacity: 0.8}} />
        </div>
      ))}
      <div style={{position: 'absolute', left: tx - 20, top: 79, opacity: fadeIn(frame, tokenStart - 6, 6) * (1 - ease(frame, end + 12, end + 22, 0, 1)), zIndex: 1}}>
        <DocIcon size={40} color={accent} lines={2} />
      </div>
      {children}
    </div>
  );
};

/** Adegan 4 (vertikal): dua jalur layanan ditumpuk, lima aktor per jalur. */
export const Scene4WorkflowV: React.FC = () => {
  const f = useCurrentFrame();
  const line = narrationFor('workflow')[0];
  const retA = hopArrive(24, 4) + 4;
  const retB = hopArrive(64, 4) + 4;
  return (
    <SceneFrame enter="sweep">
      <Background light accent={C.cyan} />
      <Watermark />
      <div style={{position: 'absolute', left: 60, top: 236}}>
        <Eyebrow dark>ALUR PELAYANAN</Eyebrow>
        <div style={{fontSize: 46, color: C.ink, fontWeight: 900, marginTop: 12}}>Dua layanan, dua alur berbeda.</div>
      </div>
      <Lane frame={f} top={370} height={450} tag="JALUR A" title="Surat Rekomendasi Penggunaan Jalan" accent={C.blue} steps={LANE_A} base={8} tokenStart={24}>
        <DecisionBlock frame={f} start={hopArrive(24, 3) + 4} />
        <div style={{position: 'absolute', left: 22, top: 360, width: 900}}>
          <div style={{fontSize: 17, fontWeight: 900, color: C.blue, marginBottom: 8, opacity: fadeIn(f, retA - 4, 10)}}>Draft diperiksa dan diparaf, disetujui, lalu disampaikan ke Warga</div>
          <ChipRow labels={['Kepala Bidang', 'Kepala Dinas', 'Admin', 'Warga']} frame={f} start={retA} color={C.blue} />
        </div>
      </Lane>
      <Lane frame={f} top={840} height={330} tag="JALUR B" title="Pemindahan/Pergeseran Fasilitas Jalan" accent={C.amber} steps={LANE_B} base={30} tokenStart={64}>
        <div style={{position: 'absolute', left: 22, top: 232, width: 900}}>
          <div style={{fontSize: 17, fontWeight: 900, color: '#8A5A00', marginBottom: 8, opacity: fadeIn(f, retB - 4, 10)}}>Laporan pemeriksaan lapangan, hingga diterima Admin</div>
          <ChipRow labels={['Teknisi', 'Kepala Bidang', 'Admin']} frame={f} start={retB} color={C.amber} />
        </div>
      </Lane>
      <AbsoluteFill style={{pointerEvents: 'none'}}>
        <Subtitle text={line.text} />
      </AbsoluteFill>
    </SceneFrame>
  );
};
