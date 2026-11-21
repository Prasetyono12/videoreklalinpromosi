import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Background, Eyebrow, Notification, SceneFrame, Subtitle, Watermark} from '../../components/Common';
import {Person} from '../../components/Person';
import {DocumentMock, VerifyCard} from '../Scene7Delivery';
import {C, ease, fadeIn, pulse} from '../../theme';
import {narrationFor} from '../../narration';

const KD = 1.1; // skala dokumen
const KV = 1.6; // skala kartu verifikasi
const QRBOX = {x: 590, y: 875, s: 165}; // posisi QR pada kanvas vertikal (hasil skala dokumen)

/** Adegan 7 (vertikal): penyerahan dokumen dan pemindaian QR, lalu halaman verifikasi. */
export const Scene7DeliveryV: React.FC = () => {
  const f = useCurrentFrame();
  const line = narrationFor('delivery')[0];
  const give = Math.sin(ease(f, 20, 54, 0, 1) * Math.PI);
  const raise = ease(f, 94, 112, 0, 1);
  const scanning = f >= 112 && f < 152;
  const sweep = scanning ? ((f - 112) % 20) / 20 : 0;
  const phase1 = 1 - ease(f, 138, 150, 0, 1);
  const phone = {x: 806, y: 960};
  return (
    <SceneFrame enter="diagonal">
      <Background />
      <Watermark dark />
      <div style={{position: 'absolute', left: 60, top: 236}}>
        <Eyebrow>DOKUMEN HASIL DAN VERIFIKASI</Eyebrow>
        <div style={{fontSize: 46, fontWeight: 900, color: C.white, marginTop: 12}}>Hasil layanan dapat ditelusuri.</div>
      </div>
      {phase1 > 0.001 && (
        <div style={{opacity: phase1}}>
          <div style={{position: 'absolute', left: -158, top: 171, width: 1, height: 1, transform: `scale(${KD})`, transformOrigin: 'top left'}}>
            <DocumentMock frame={f} />
          </div>
          <div style={{opacity: fadeIn(f, 6, 14)}}>
            <Person role="admin" x={40} y={835} scale={0.85} pose={{armR: [6 + 46 * give, 8 + 4 * give], itemR: f < 56 ? 'doc' : 'none', mood: 'smile', nod: f > 54 && f < 70 ? 5 : 0}} />
          </div>
          <div style={{position: 'absolute', left: 690, top: 700}}>
            <Notification frame={f} delay={56} title="Hasil layanan tersedia" sub="Dari Admin untuk Warga" accent={C.green} width={330} />
          </div>
          <Person role="warga" x={830} y={835} scale={0.85} pose={{armL: [6 + 64 * raise, 8 + 10 * raise], itemL: raise > 0.05 ? 'phone' : 'none', mood: f > 56 ? 'happy' : 'smile', look: -0.8}} />
          {scanning && (
            <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
              <polygon points={`${phone.x},${phone.y} ${QRBOX.x + QRBOX.s},${QRBOX.y} ${QRBOX.x + QRBOX.s},${QRBOX.y + QRBOX.s}`} fill={C.cyan} opacity={0.18 + pulse(f, 14) * 0.08} />
              <rect x={QRBOX.x} y={QRBOX.y + sweep * (QRBOX.s - 6)} width={QRBOX.s} height={6} rx={3} fill={C.cyan} opacity={0.95} />
            </svg>
          )}
        </div>
      )}
      <div style={{position: 'absolute', left: 108 - 1240 * KV, top: 380 - 190 * KV, width: 1, height: 1, transform: `scale(${KV})`, transformOrigin: 'top left'}}>
        <VerifyCard frame={f} />
      </div>
      <div style={{position: 'absolute', left: 60, top: 1175, width: 960, fontSize: 28, fontWeight: 700, color: '#D5E7F0', lineHeight: 1.35, opacity: fadeIn(f, 176, 14)}}>
        QR Code membuka halaman verifikasi dokumen yang hanya-baca dan dapat dibuka tanpa login. QR Code bukan tanda tangan elektronik.
      </div>
      <div style={{position: 'absolute', left: 60, top: 1325, width: 960, fontSize: 22, fontWeight: 700, color: C.muted, lineHeight: 1.35, opacity: fadeIn(f, 184, 14)}}>
        Izin final penggunaan jalan oleh Kepolisian/Polres berada di luar ruang lingkup RekLaLin.
      </div>
      <AbsoluteFill style={{pointerEvents: 'none'}}>
        <Subtitle text={line.text} />
      </AbsoluteFill>
    </SceneFrame>
  );
};
