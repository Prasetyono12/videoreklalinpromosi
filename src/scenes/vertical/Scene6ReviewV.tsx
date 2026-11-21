import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Background, Eyebrow, SceneFrame, Subtitle, Watermark} from '../../components/Common';
import {RevisionArc, Row, RowView} from '../Scene6Review';
import {C} from '../../theme';
import {narrationFor} from '../../narration';

const ROWS_V: Row[] = [
  {top: 575, xs: [175, 405, 635, 865], scale: 0.7, compact: true, labelAt: {left: 60, top: 372, width: 960}, tag: 'JALUR A', color: C.blue, title: 'Draft surat rekomendasi', note: '', roles: ['teknisi', 'kabid', 'kadis', 'admin'], start: 12, stamps: ['', 'Diparaf', 'Disetujui', 'Diterima']},
  {top: 985, xs: [175, 520, 865], scale: 0.7, compact: true, labelAt: {left: 60, top: 900, width: 960}, tag: 'JALUR B', color: C.amber, title: 'Laporan pemeriksaan fasilitas', note: '', roles: ['teknisi', 'kabid', 'admin'], start: 48, stamps: ['', 'Ditinjau', 'Diterima']},
];

/** Adegan 6 (vertikal): pemeriksaan berjenjang dengan karakter lebih besar. */
export const Scene6ReviewV: React.FC = () => {
  const f = useCurrentFrame();
  const line = narrationFor('review')[0];
  return (
    <SceneFrame enter="slideUp">
      <Background light accent={C.blue} />
      <Watermark />
      <div style={{position: 'absolute', left: 60, top: 236}}>
        <Eyebrow dark>PEMERIKSAAN DAN REVISI</Eyebrow>
        <div style={{fontSize: 44, fontWeight: 900, color: C.ink, marginTop: 12}}>Ditinjau berjenjang, dapat diperbaiki.</div>
      </div>
      {ROWS_V.map((row) => <RowView key={row.tag} row={row} frame={f} />)}
      <RevisionArc frame={f} xs={ROWS_V[0].xs} y={538} />
      <AbsoluteFill style={{pointerEvents: 'none'}}>
        <Subtitle text={line.text} />
      </AbsoluteFill>
    </SceneFrame>
  );
};
