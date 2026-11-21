import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Background, Eyebrow, SceneFrame, Subtitle, Watermark} from '../../components/Common';
import {DraftPanel, FieldPanel, Panel} from '../Scene5Technical';
import {C, ease} from '../../theme';
import {narrationFor} from '../../narration';

const K = 940 / 800; // panel landscape (800 px) diperbesar ke lebar 940 px
const SPLIT = 104;

/**
 * Adegan 5 (vertikal): dua panel tampil bergantian (draft surat, lalu pemeriksaan lapangan).
 * Animasi panel dipercepat agar kedua bagian selesai dalam 7 detik.
 */
export const Scene5TechnicalV: React.FC = () => {
  const f = useCurrentFrame();
  const line = narrationFor('technical')[0];
  const a = 1 - ease(f, SPLIT - 6, SPLIT + 6, 0, 1);
  const b = ease(f, SPLIT - 4, SPLIT + 8, 0, 1);
  const fa = Math.min(f, SPLIT) * 1.8;
  const fb = Math.max(0, f - SPLIT) * 1.95;
  const wrap = (o: number): React.CSSProperties => ({position: 'absolute', left: 70, top: 410 - 200 * K, width: 800, height: 900, transform: `scale(${K})`, transformOrigin: 'top left', opacity: o});
  return (
    <SceneFrame enter="zoom">
      <Background />
      <Watermark dark />
      <div style={{position: 'absolute', left: 60, top: 236, width: 960}}>
        <Eyebrow>PEMERIKSAAN DAN PELAKSANAAN TEKNIS</Eyebrow>
        <div style={{fontSize: 44, fontWeight: 900, color: C.white, marginTop: 12, lineHeight: 1.12}}>Hasil pemeriksaan dan pekerjaan teknis tercatat sesuai kewenangan.</div>
      </div>
      {a > 0.001 && (
        <div style={wrap(a)}>
          <Panel left={0} tag="SURAT REKOMENDASI" tagColor={C.blue} title="Teknisi menyusun draft" frame={fa} delay={4}>
            <DraftPanel frame={fa} />
          </Panel>
        </div>
      )}
      {b > 0.001 && (
        <div style={wrap(b)}>
          <Panel left={0} tag="FASILITAS JALAN" tagColor={C.amber} title="Teknisi memeriksa lapangan" frame={fb} delay={4}>
            <FieldPanel frame={fb} />
          </Panel>
        </div>
      )}
      <AbsoluteFill style={{pointerEvents: 'none'}}>
        <Subtitle text={line.text} />
      </AbsoluteFill>
    </SceneFrame>
  );
};
