import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Person, Role, ROLE_LABEL} from '../components/Person';
import {Background, DocIcon, Eyebrow, SceneFrame, Stamp, Subtitle, Watermark} from '../components/Common';
import {C, fadeIn, flash, hop, hopArrive, pulse, rise} from '../theme';
import {narrationFor} from '../narration';

const DEFAULT_SCALE = 0.6;
export type Row = {labelAt?: {left: number; top: number; width: number}; compact?: boolean; scale?: number; top: number; xs: number[]; tag: string; color: string; title: string; note: string; roles: Role[]; start: number; stamps: string[]};

const ROWS: Row[] = [
  {top: 300, xs: [640, 940, 1240, 1540], tag: 'JALUR A', color: C.blue, title: 'Draft surat rekomendasi', note: 'Diperiksa dan diparaf Kepala Bidang, disetujui Kepala Dinas, lalu Admin menyampaikan hasilnya.', roles: ['teknisi', 'kabid', 'kadis', 'admin'], start: 12, stamps: ['', 'Diparaf', 'Disetujui', 'Diterima']},
  {top: 625, xs: [640, 1090, 1540], tag: 'JALUR B', color: C.amber, title: 'Laporan pemeriksaan fasilitas', note: 'Disusun Teknisi, ditinjau Kepala Bidang, hasilnya diterima Admin.', roles: ['teknisi', 'kabid', 'admin'], start: 48, stamps: ['', 'Ditinjau', 'Diterima']},
];

const Actor: React.FC<{role: Role; i: number; row: Row; frame: number}> = ({role, i, row, frame}) => {
  const SCALE = row.scale ?? DEFAULT_SCALE;
  const arrive = hopArrive(row.start, i);
  const depart = arrive + 4;
  const receive = i > 0 ? flash(frame, arrive - 4, 16) : 0;
  const give = i < row.roles.length - 1 ? flash(frame, depart - 2, 14) : 0;
  const reach = Math.sin(receive * Math.PI);
  const handOut = Math.sin(give * Math.PI);
  const nod = receive > 0 ? Math.sin(receive * Math.PI) * 6 : 0;
  const w = 180 * SCALE;
  const o = fadeIn(frame, row.start - 10 + i * 4, 12);
  return (
    <div style={{position: 'absolute', left: row.xs[i] - w / 2, top: row.top, opacity: o, transform: `translateY(${rise(frame, row.start - 10 + i * 4, 24)}px)`}}>
      <Person role={role} scale={SCALE} pose={{armL: [6 + 50 * reach, 8 + 6 * reach], armR: [6 + 50 * handOut, 8 + 6 * handOut], mood: receive > 0.3 ? 'happy' : 'smile', nod}} />
      <div style={{position: 'absolute', left: -60, width: w + 120, top: 340 * SCALE + 8, textAlign: 'center', fontSize: 20, fontWeight: 900, color: C.ink}}>{ROLE_LABEL[role]}</div>
    </div>
  );
};

export const RowView: React.FC<{row: Row; frame: number}> = ({row, frame}) => {
  const tx = hop(frame, row.start, row.xs);
  const done = frame > hopArrive(row.start, row.roles.length - 1) + 20;
  return (
    <>
      <div style={{position: 'absolute', ...(row.labelAt ?? {left: 145, top: row.top + 30, width: 380}), opacity: fadeIn(frame, row.start - 12, 14), display: row.compact ? 'flex' : 'block', alignItems: 'center', gap: 16}}>
        <div style={{display: 'inline-block', padding: '6px 16px', borderRadius: 999, background: row.color, color: row.color === C.amber ? C.ink : 'white', fontSize: 16, fontWeight: 900, letterSpacing: 1.5}}>{row.tag}</div>
        <div style={{fontSize: row.compact ? 30 : 27, fontWeight: 900, color: C.ink, marginTop: row.compact ? 0 : 14, lineHeight: 1.15}}>{row.title}</div>
        {!row.compact && <div style={{fontSize: 18, fontWeight: 700, color: C.slate, marginTop: 10, lineHeight: 1.35}}>{row.note}</div>}
      </div>
      {row.roles.map((r, i) => (
        <Actor key={r} role={r} i={i} row={row} frame={frame} />
      ))}
      {row.stamps.map((label, i) =>
        label ? (
          <div key={i} style={{position: 'absolute', left: row.xs[i] - 150, top: row.top - 6}}>
            <Stamp frame={frame} delay={hopArrive(row.start, i) + 6} label={label} color={row.color === C.amber ? '#D79A1B' : C.green} size={86} />
          </div>
        ) : null,
      )}
      <div style={{position: 'absolute', left: tx - 26, top: row.top + 110 + 20 * Math.sin(((frame - row.start) / 14) * Math.PI) * 0, opacity: fadeIn(frame, row.start - 6, 6) * (done ? 0 : 1), zIndex: 3}}>
        <DocIcon size={52} color={row.color} lines={2} />
      </div>
    </>
  );
};

/** Panah revisi: catatan perbaikan kembali dari Kepala Bidang kepada Teknisi. */
export const RevisionArc: React.FC<{frame: number; xs?: number[]; y?: number}> = ({frame, xs = ROWS[0].xs, y = 282}) => {
  const start = 96;
  const t = Math.max(0, Math.min(1, (frame - start - 6) / 40));
  const x0 = xs[1];
  const x1 = xs[0];
  const cx = (x0 + x1) / 2;
  const cy = y - 76;
  // titik pada kurva Bezier kuadrat (deterministik)
  const bx = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x1;
  const by = (1 - t) * (1 - t) * y + 2 * (1 - t) * t * cy + t * t * y;
  return (
    <>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0, opacity: fadeIn(frame, start, 12), pointerEvents: 'none'}} fill="none">
        <path d={`M${x0} ${y} Q${cx} ${cy} ${x1} ${y}`} stroke={C.amber} strokeWidth="5" strokeDasharray="12 10" strokeLinecap="round" />
        <path d={`M${x1 + 4} ${y - 4}l16 -10 M${x1 + 4} ${y - 4}l18 8`} stroke={C.amber} strokeWidth="5" strokeLinecap="round" />
      </svg>
      <div style={{position: 'absolute', left: bx - 15, top: by - 15, width: 30, height: 30, borderRadius: 15, background: C.amber, border: '4px solid white', opacity: fadeIn(frame, start + 6, 6) * (t < 1 ? 1 : 0), boxShadow: '0 6px 14px rgba(0,0,0,.2)'}} />
      <div style={{position: 'absolute', left: cx - 130, top: (y + cy) / 2 - 50, width: 260, textAlign: 'center', padding: '8px 16px', borderRadius: 12, background: 'rgba(244,185,66,.25)', color: '#8A5A00', fontSize: 19, fontWeight: 900, opacity: fadeIn(frame, start + 10, 12), transform: `scale(${1 + pulse(frame, 50) * 0.03})`}}>Catatan perbaikan</div>
    </>
  );
};

export const Scene6Review: React.FC = () => {
  const f = useCurrentFrame();
  const line = narrationFor('review')[0];
  return (
    <SceneFrame enter="slideUp">
      <Background light accent={C.blue} />
      <Watermark />
      <div style={{position: 'absolute', left: 145, top: 84}}>
        <Eyebrow dark>PEMERIKSAAN, PERSETUJUAN, DAN REVISI</Eyebrow>
        <div style={{fontSize: 48, fontWeight: 900, color: C.ink, marginTop: 14}}>Ditinjau berjenjang, dapat diperbaiki.</div>
      </div>
      {ROWS.map((row) => (
        <RowView key={row.tag} row={row} frame={f} />
      ))}
      <RevisionArc frame={f} />
      <AbsoluteFill style={{pointerEvents: 'none'}}>
        <Subtitle text={line.text} />
      </AbsoluteFill>
    </SceneFrame>
  );
};
