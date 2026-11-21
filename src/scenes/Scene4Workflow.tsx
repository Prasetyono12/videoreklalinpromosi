import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Avatar, Role, ROLE_LABEL} from '../components/Person';
import {Background, DocIcon, Eyebrow, SceneFrame, Subtitle, Watermark} from '../components/Common';
import {C, ease, fadeIn, flash, hop, hopArrive, rise, useSpr} from '../theme';
import {narrationFor} from '../narration';

const NODE_W = 220;
const PAD = 28;
const GAP = (1574 - 2 * PAD - 5 * NODE_W) / 4;
const nodeX = (i: number) => PAD + i * (NODE_W + GAP);
const centerX = (i: number) => nodeX(i) + NODE_W / 2;

export type Step = {role: Role; sub: string};

export const LANE_A: Step[] = [
  {role: 'warga', sub: 'Mengajukan permohonan'},
  {role: 'admin', sub: 'Verifikasi administrasi'},
  {role: 'kadis', sub: 'Meninjau & disposisi'},
  {role: 'kabid', sub: 'Keputusan & penugasan'},
  {role: 'teknisi', sub: 'Inspeksi & draft surat'},
];
export const LANE_B: Step[] = [
  {role: 'warga', sub: 'Mengajukan permohonan'},
  {role: 'admin', sub: 'Menerima & meneruskan'},
  {role: 'kadis', sub: 'Meninjau & disposisi'},
  {role: 'kabid', sub: 'Menugaskan Teknisi'},
  {role: 'teknisi', sub: 'Pemeriksaan lapangan'},
];

const FlowNode: React.FC<{step: Step; i: number; frame: number; appear: number; arrive: number}> = ({step, i, frame, appear, arrive}) => {
  const o = fadeIn(frame, appear, 14);
  const g = flash(frame, arrive, 18);
  const bell = useSpr(frame, arrive, 12, 150);
  const bellVisible = frame >= arrive && frame < arrive + 30;
  return (
    <div style={{position: 'absolute', left: nodeX(i), top: 64, width: NODE_W, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 2, opacity: o, transform: `translateY(${rise(frame, appear, 16)}px)`}}>
      <div style={{position: 'relative'}}>
        <Avatar role={step.role} size={86} ring={g > 0 ? C.cyan : '#FFFFFF'} glow={g} />
        {bellVisible && <div style={{position: 'absolute', right: -6, top: -4, width: 26, height: 26, borderRadius: 13, background: C.amber, border: '3px solid white', transform: `scale(${bell})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: C.ink}}>!</div>}
      </div>
      <div style={{fontSize: 21, fontWeight: 900, color: C.ink, marginTop: 10}}>{ROLE_LABEL[step.role]}</div>
      <div style={{fontSize: 15, fontWeight: 700, color: C.slate, marginTop: 3, lineHeight: 1.25}}>{step.sub}</div>
    </div>
  );
};

const Arrow: React.FC<{i: number; frame: number; delay: number; color: string}> = ({i, frame, delay, color}) => (
  <div style={{position: 'absolute', left: nodeX(i) + NODE_W - 2, top: 94, width: GAP + 4, display: 'flex', alignItems: 'center', opacity: fadeIn(frame, delay, 10)}}>
    <div style={{flex: 1, height: 4, borderRadius: 2, background: color, opacity: 0.55}} />
    <div style={{width: 0, height: 0, borderTop: '9px solid transparent', borderBottom: '9px solid transparent', borderLeft: `14px solid ${color}`, opacity: 0.8}} />
  </div>
);

const MiniChip: React.FC<{label: string; frame: number; delay: number; color: string}> = ({label, frame, delay, color}) => (
  <div style={{padding: '8px 16px', borderRadius: 999, background: 'white', border: `2px solid ${color}`, color: C.ink, fontSize: 17, fontWeight: 800, whiteSpace: 'nowrap', opacity: fadeIn(frame, delay, 10), transform: `scale(${0.85 + 0.15 * fadeIn(frame, delay, 10)})`}}>{label}</div>
);

export const ChipRow: React.FC<{labels: string[]; frame: number; start: number; color: string}> = ({labels, frame, start, color}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
    {labels.map((l, i) => (
      <React.Fragment key={l + i}>
        <MiniChip label={l} frame={frame} delay={start + i * 8} color={color} />
        {i < labels.length - 1 && <div style={{fontSize: 22, fontWeight: 900, color, opacity: fadeIn(frame, start + i * 8 + 4, 8)}}>→</div>}
      </React.Fragment>
    ))}
  </div>
);

const Lane: React.FC<{
  frame: number;
  top: number;
  height: number;
  tag: string;
  title: string;
  accent: string;
  steps: Step[];
  base: number;
  tokenStart: number;
  children: React.ReactNode;
}> = ({frame, top, height, tag, title, accent, steps, base, tokenStart, children}) => {
  const xs = steps.map((_, i) => centerX(i));
  const tx = hop(frame, tokenStart, xs);
  const tokenOn = frame >= tokenStart - 6;
  return (
    <div style={{position: 'absolute', left: 145, right: 145, top, height, borderRadius: 28, background: 'rgba(255,255,255,.97)', boxShadow: '0 20px 55px rgba(4,22,40,.14)', borderLeft: `10px solid ${accent}`, opacity: fadeIn(frame, base - 8, 14)}}>
      <div style={{position: 'absolute', left: PAD, top: 16, display: 'flex', alignItems: 'center', gap: 14}}>
        <div style={{padding: '6px 16px', borderRadius: 999, background: accent, color: accent === C.amber ? C.ink : 'white', fontSize: 16, fontWeight: 900, letterSpacing: 1.5}}>{tag}</div>
        <div style={{fontSize: 24, fontWeight: 900, color: C.ink}}>{title}</div>
      </div>
      {steps.map((s, i) => (
        <FlowNode key={i} step={s} i={i} frame={frame} appear={base + i * 7} arrive={hopArrive(tokenStart, i)} />
      ))}
      {steps.slice(0, -1).map((_, i) => (
        <Arrow key={i} i={i} frame={frame} delay={base + i * 7 + 6} color={accent} />
      ))}
      {tokenOn && (
        <div style={{position: 'absolute', left: tx - 20, top: 69, opacity: fadeIn(frame, tokenStart - 6, 6) * (1 - ease(frame, tokenStart + (steps.length - 1) * 14 + 12, tokenStart + (steps.length - 1) * 14 + 22, 0, 1)), zIndex: 1}}>
          <DocIcon size={40} color={accent} lines={2} />
        </div>
      )}
      {children}
    </div>
  );
};

export const DecisionBlock: React.FC<{frame: number; start: number}> = ({frame, start}) => {
  const chip = (label: string, delay: number, bg: string, fg: string) => (
    <div style={{padding: '7px 16px', borderRadius: 10, background: bg, color: fg, fontSize: 17, fontWeight: 900, opacity: fadeIn(frame, delay, 8), transform: `scale(${0.8 + 0.2 * fadeIn(frame, delay, 8)})`}}>{label}</div>
  );
  const note = (t: string, delay: number) => <div style={{fontSize: 17, fontWeight: 700, color: C.slate, opacity: fadeIn(frame, delay, 10)}}>{t}</div>;
  return (
    <div style={{position: 'absolute', left: PAD, top: 238, width: 760}}>
      <div style={{fontSize: 17, fontWeight: 900, color: C.blue, marginBottom: 8, opacity: fadeIn(frame, start - 4, 10)}}>Keputusan Kepala Bidang</div>
      <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
        {chip('Ditolak', start, '#E3EBF0', C.ink)}
        {chip('Dilengkapi', start + 8, 'rgba(244,185,66,.28)', '#8A5A00')}
        {note('→ alasan/catatan disampaikan melalui Admin kepada Warga', start + 12)}
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, marginTop: 9}}>
        {chip('Diteruskan', start + 16, 'rgba(57,185,138,.22)', '#17745A')}
        {note('→ Kepala Bidang menugaskan Teknisi', start + 22)}
      </div>
    </div>
  );
};

export const Scene4Workflow: React.FC = () => {
  const f = useCurrentFrame();
  const line = narrationFor('workflow')[0];
  const returnA = hopArrive(24, 4) + 4; // setelah dokumen tiba di Teknisi (jalur A)
  const returnB = hopArrive(64, 4) + 4;
  return (
    <SceneFrame enter="sweep">
      <Background light accent={C.cyan} />
      <Watermark />
      <div style={{position: 'absolute', left: 145, top: 86}}>
        <Eyebrow dark>ALUR PELAYANAN</Eyebrow>
        <div style={{fontSize: 50, color: C.ink, fontWeight: 900, marginTop: 14}}>Dua layanan, dua alur yang berbeda.</div>
      </div>

      <Lane frame={f} top={214} height={376} tag="JALUR A" title="Surat Rekomendasi Penggunaan Jalan" accent={C.blue} steps={LANE_A} base={8} tokenStart={24}>
        <DecisionBlock frame={f} start={hopArrive(24, 3) + 4} />
        <div style={{position: 'absolute', left: 815, top: 238, width: 740}}>
          <div style={{fontSize: 17, fontWeight: 900, color: C.blue, marginBottom: 10, opacity: fadeIn(f, returnA - 4, 10)}}>Draft diperiksa dan diparaf, disetujui, lalu disampaikan ke Warga</div>
          <ChipRow labels={['Kepala Bidang', 'Kepala Dinas', 'Admin', 'Warga']} frame={f} start={returnA} color={C.blue} />
        </div>
      </Lane>

      <Lane frame={f} top={604} height={312} tag="JALUR B" title="Pemindahan/Pergeseran Fasilitas Jalan" accent={C.amber} steps={LANE_B} base={30} tokenStart={64}>
        <div style={{position: 'absolute', left: PAD, top: 226, width: 1000}}>
          <div style={{fontSize: 17, fontWeight: 900, color: '#8A5A00', marginBottom: 8, opacity: fadeIn(f, returnB - 4, 10)}}>Laporan pemeriksaan lapangan, hingga diterima Admin</div>
          <ChipRow labels={['Teknisi', 'Kepala Bidang', 'Admin']} frame={f} start={returnB} color={C.amber} />
        </div>
      </Lane>

      <AbsoluteFill style={{pointerEvents: 'none'}}>
        <Subtitle text={line.text} />
      </AbsoluteFill>
    </SceneFrame>
  );
};
