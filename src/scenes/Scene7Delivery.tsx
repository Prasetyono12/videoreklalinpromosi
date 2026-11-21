import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {AGENCY_NAME, APP_NAME, Background, BrandMark, Eyebrow, Notification, Pill, SceneFrame, Subtitle, Watermark} from '../components/Common';
import {Person} from '../components/Person';
import {FEATURES} from '../config';
import {C, ease, easeInOut, fadeIn, pulse, rise, useSpr} from '../theme';
import {narrationFor} from '../narration';

export const DOC = {x: 400, y: 190, w: 470, h: 660};
export const QR = {size: 150, x: DOC.x + DOC.w - 40 - 150, y: DOC.y + DOC.h - 40 - 190};

/** QR ilustrasi (pola deterministik). Bukan kode yang dapat dipindai. */
const QRIllustration: React.FC<{size: number}> = ({size}) => {
  const cells = Array.from({length: 21 * 21}, (_, i) => {
    const row = Math.floor(i / 21);
    const col = i % 21;
    const inFinder = (r: number, c: number) => {
      const rr = row - r;
      const cc = col - c;
      return rr >= 0 && rr < 7 && cc >= 0 && cc < 7 && (rr === 0 || rr === 6 || cc === 0 || cc === 6 || (rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4));
    };
    return inFinder(0, 0) || inFinder(0, 14) || inFinder(14, 0) || (row * 7 + col * 11 + row * col) % 5 < 2;
  });
  return (
    <div style={{width: size, height: size, background: 'white', borderRadius: 10, padding: 9, display: 'grid', gridTemplateColumns: 'repeat(21, 1fr)', gridTemplateRows: 'repeat(21, 1fr)', gap: 1, border: '2px solid #DCE8ED'}}>
      {cells.map((on, i) => (
        <div key={i} style={{background: on ? C.navy : 'white', borderRadius: 1}} />
      ))}
    </div>
  );
};

export const DocumentMock: React.FC<{frame: number}> = ({frame}) => {
  const fly = easeInOut(frame, 24, 56);
  const qrPop = useSpr(frame, 76, 11, 140);
  const startX = 250;
  const startY = 600;
  const x = startX + (DOC.x - startX) * fly;
  const y = startY + (DOC.y - startY) * fly;
  const scale = 0.28 + 0.72 * fly;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: DOC.w, height: DOC.h, transform: `scale(${scale}) rotate(${(1 - fly) * 10 - 1}deg)`, transformOrigin: 'top left', opacity: fadeIn(frame, 22, 6), borderRadius: 22, background: 'white', padding: 38, boxShadow: '0 26px 70px rgba(0,0,0,.35)'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
        <BrandMark size={56} />
        <div>
          <div style={{fontSize: 14, fontWeight: 900, color: C.blue, letterSpacing: 1}}>CONTOH DOKUMEN HASIL LAYANAN</div>
          <div style={{fontSize: 16, fontWeight: 900, color: C.ink, marginTop: 2}}>{AGENCY_NAME.toUpperCase()}</div>
        </div>
      </div>
      <div style={{height: 2, background: '#DCE8ED', margin: '20px 0 22px'}} />
      <div style={{fontSize: 23, fontWeight: 900, color: C.ink, textAlign: 'center'}}>SURAT REKOMENDASI</div>
      <div style={{fontSize: 14, fontWeight: 700, color: C.slate, textAlign: 'center', marginTop: 4}}>Nomor: RLL-0001 (contoh)</div>
      {[100, 92, 97, 68, 100, 88, 94, 60].map((w, i) => (
        <div key={i} style={{height: 10, width: `${w}%`, borderRadius: 5, background: i === 3 || i === 7 ? '#E8EFF2' : '#DCE8ED', marginTop: i === 4 ? 26 : 15}} />
      ))}
      {FEATURES.documentFormatChips && (
        <div style={{position: 'absolute', left: 38, top: QR.y - DOC.y - 4, display: 'flex', gap: 10}}>
          <Pill light>PDF</Pill>
          <Pill light>DOCX</Pill>
        </div>
      )}
      {FEATURES.officialSignatureMarks && (
        <div style={{position: 'absolute', left: 38, top: QR.y - DOC.y + 52, width: 190, opacity: fadeIn(frame, 84, 12)}}>
          {[['Paraf digital', 'Kepala Bidang'], ['Tanda tangan', 'Kepala Dinas']].map(([a, b]) => (
            <div key={b} style={{marginBottom: 12, padding: '8px 12px', borderRadius: 10, border: `2px dashed ${C.blue}`, display: 'flex', alignItems: 'center', gap: 10}}>
              <svg width="38" height="22" viewBox="0 0 38 22" fill="none"><path d="M2 16C8 2 12 2 14 12C16 20 20 6 24 8C28 10 28 18 36 6" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" /></svg>
              <div style={{fontSize: 13, fontWeight: 800, color: C.ink, lineHeight: 1.2}}>{a}<br /><span style={{color: C.slate}}>{b}</span></div>
            </div>
          ))}
        </div>
      )}
      <div style={{position: 'absolute', left: QR.x - DOC.x, top: QR.y - DOC.y, opacity: fadeIn(frame, 76, 6), transform: `scale(${0.5 + qrPop * 0.5})`, transformOrigin: 'center'}}>
        <QRIllustration size={QR.size} />
        <div style={{fontSize: 13, fontWeight: 800, color: '#7A909C', textAlign: 'center', marginTop: 6}}>Ilustrasi QR Code</div>
      </div>
    </div>
  );
};

export const VerifyCard: React.FC<{frame: number}> = ({frame}) => {
  const rows: Array<[string, string]> = [
    ['Nomor dokumen', 'RLL-0001 (contoh)'],
    ['Jenis layanan', 'Surat Rekomendasi (contoh)'],
    ['Status versi', 'Versi 1 (contoh)'],
    ['Penerbit', 'Dinas Perhubungan Kab. Banyumas'],
  ];
  return (
    <div style={{position: 'absolute', left: 1240, top: 190, width: 540, borderRadius: 30, background: 'white', padding: 34, boxShadow: '0 26px 70px rgba(0,0,0,.35)', opacity: fadeIn(frame, 150, 16), transform: `translateX(${ease(frame, 150, 176, 70, 0)}px)`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
        <BrandMark size={50} />
        <div>
          <div style={{fontSize: 14, fontWeight: 900, color: C.blue, letterSpacing: 1}}>{APP_NAME}</div>
          <div style={{fontSize: 22, fontWeight: 900, color: C.ink}}>Verifikasi dokumen</div>
        </div>
      </div>
      <div style={{display: 'inline-block', marginTop: 16, padding: '5px 14px', borderRadius: 8, background: 'rgba(244,185,66,.28)', color: '#8A5A00', fontSize: 14, fontWeight: 900}}>TAMPILAN ILUSTRASI</div>
      {rows.map(([k, v], i) => (
        <div key={k} style={{marginTop: 18, paddingBottom: 14, borderBottom: '1px solid #E4EDF1', opacity: fadeIn(frame, 160 + i * 8, 10), transform: `translateY(${rise(frame, 160 + i * 8, 14)}px)`}}>
          <div style={{fontSize: 14, fontWeight: 800, color: '#7A909C'}}>{k}</div>
          <div style={{fontSize: 21, fontWeight: 800, color: C.ink, marginTop: 4}}>{v}</div>
        </div>
      ))}
    </div>
  );
};

export const Scene7Delivery: React.FC = () => {
  const f = useCurrentFrame();
  const line = narrationFor('delivery')[0];
  const give = Math.sin(ease(f, 20, 54, 0, 1) * Math.PI);
  const raise = ease(f, 94, 112, 0, 1);
  const scanning = f >= 112 && f < 152;
  const sweep = scanning ? ((f - 112) % 20) / 20 : 0;
  const phone = {x: 925, y: 688};
  return (
    <SceneFrame enter="diagonal">
      <Background />
      <Watermark dark />
      <div style={{position: 'absolute', left: 145, top: 84}}>
        <Eyebrow>DOKUMEN HASIL DAN VERIFIKASI</Eyebrow>
        <div style={{fontSize: 46, fontWeight: 900, color: C.white, marginTop: 14}}>Hasil layanan dapat ditelusuri.</div>
      </div>

      <div style={{opacity: fadeIn(f, 6, 14)}}>
        <Person role="admin" x={80} y={545} scale={0.95} pose={{armR: [6 + 46 * give, 8 + 4 * give], itemR: f < 56 ? 'doc' : 'none', mood: 'smile', nod: f > 54 && f < 70 ? 5 : 0}} />
        <div style={{position: 'absolute', left: 60, top: 878, width: 230, textAlign: 'center', fontSize: 20, fontWeight: 900, color: C.white}}>Admin</div>
      </div>

      <DocumentMock frame={f} />

      <div style={{position: 'absolute', left: 860, top: 380, opacity: 1}}>
        <Notification frame={f} delay={56} title="Hasil layanan tersedia" sub="Dari Admin untuk Warga" accent={C.green} width={330} />
      </div>

      <Person
        role="warga"
        x={960}
        y={545}
        scale={0.95}
        pose={{armL: [6 + 64 * raise, 8 + 10 * raise], itemL: raise > 0.05 ? 'phone' : 'none', mood: f > 56 ? 'happy' : 'smile', look: -0.8}}
      />
      <div style={{position: 'absolute', left: 930, top: 878, width: 230, textAlign: 'center', fontSize: 20, fontWeight: 900, color: C.white}}>Warga</div>

      {scanning && (
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
          <polygon points={`${phone.x},${phone.y} ${QR.x + QR.size},${QR.y} ${QR.x + QR.size},${QR.y + QR.size}`} fill={C.cyan} opacity={0.18 + pulse(f, 14) * 0.08} />
          <rect x={QR.x} y={QR.y + sweep * (QR.size - 6)} width={QR.size} height={6} rx={3} fill={C.cyan} opacity={0.95} />
        </svg>
      )}

      <VerifyCard frame={f} />
      <div style={{position: 'absolute', left: 1240, top: 724, width: 540, opacity: fadeIn(f, 176, 14), fontSize: 19, fontWeight: 700, color: '#D5E7F0', lineHeight: 1.4}}>
        QR Code membuka halaman verifikasi dokumen yang hanya-baca dan dapat dibuka tanpa login. QR Code bukan tanda tangan elektronik.
      </div>
      <div style={{position: 'absolute', left: 1240, top: 838, width: 540, opacity: fadeIn(f, 184, 14), fontSize: 16, fontWeight: 700, color: C.muted, lineHeight: 1.4}}>
        Izin final penggunaan jalan oleh Kepolisian/Polres berada di luar ruang lingkup RekLaLin.
      </div>
      <AbsoluteFill style={{pointerEvents: 'none'}}>
        <Subtitle text={line.text} />
      </AbsoluteFill>
    </SceneFrame>
  );
};
