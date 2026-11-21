import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {APP_NAME, Background, Cursor, Eyebrow, SceneFrame, SiteHeader, Subtitle, Watermark} from '../../components/Common';
import {Person} from '../../components/Person';
import {Chair, Desk, LaptopBack, MapPin, MapSvg, RouteLine} from '../../components/Props';
import {Field, ServiceChoice} from '../Scene3Apply';
import {C, ease, easeInOut, fadeIn, rise, useSpr} from '../../theme';
import {narrationFor} from '../../narration';

const WIN = {x: 60, y: 410, w: 960, h: 640};
const LABEL: React.CSSProperties = {fontSize: 15, color: C.slate, fontWeight: 800, marginBottom: 8};

/** Adegan 3 (vertikal): formulir dibagi dua halaman (data, lalu lokasi dan dokumen). */
export const Scene3ApplyV: React.FC = () => {
  const f = useCurrentFrame();
  const line = narrationFor('apply')[0];
  const out = easeInOut(f, 140, 158);
  const mapShow = fadeIn(f, 150, 16);
  const route = ease(f, 162, 188, 0, 1);
  const upload = ease(f, 186, 208, 0, 1);
  const clicked = f >= 214;
  const success = useSpr(f, 220, 12, 120);
  const typing = f > 18 && f < 214;
  const tp = typing ? f * 0.7 : 0;
  const happy = f >= 222;
  const nod = f >= 220 ? Math.sin(((f - 220) / 14) * Math.PI) * 9 : 0;
  const cursor = [
    [16, 780, 540],
    [24, 320, 619],
    [46, 320, 700],
    [56, 430, 700],
    [60, 320, 777],
    [82, 320, 856],
    [102, 320, 935],
    [150, 540, 720],
    [186, 540, 920],
    [208, 600, 1006],
    [216, 600, 1010],
  ] as const;
  return (
    <SceneFrame enter="circle">
      <Background />
      <Watermark dark />
      <div style={{position: 'absolute', left: 60, top: 236, width: 960}}>
        <Eyebrow>LANGKAH PENGAJUAN</Eyebrow>
        <div style={{fontSize: 50, fontWeight: 900, color: C.white, lineHeight: 1.1, marginTop: 16}}>Ajukan kebutuhan dengan lebih terstruktur.</div>
      </div>
      <div style={{position: 'absolute', left: WIN.x, top: WIN.y, width: WIN.w, height: WIN.h, borderRadius: 30, overflow: 'hidden', background: 'white', boxShadow: '0 30px 80px rgba(0,0,0,.35)', opacity: fadeIn(f, 4, 16), transform: `translateY(${rise(f, 4, 40)}px)`}}>
        <div style={{height: 46, background: C.pale, display: 'flex', alignItems: 'center', padding: '0 22px', gap: 10, borderBottom: '1px solid #DCE8ED'}}>
          {['#F26B6B', C.amber, C.green].map((c) => <div key={c} style={{width: 12, height: 12, borderRadius: 6, background: c}} />)}
          <div style={{marginLeft: 16, padding: '5px 14px', borderRadius: 10, background: 'white', fontSize: 15, fontWeight: 800, color: C.ink}}>{APP_NAME}</div>
        </div>
        <SiteHeader height={56} nav={false} action={false} />
        <div style={{position: 'relative', height: WIN.h - 46 - 56, overflow: 'hidden'}}>
          <div style={{position: 'absolute', inset: 0, padding: '16px 30px', opacity: 1 - out, transform: `translateX(${-out * 960}px)`}}>
            <div style={{fontSize: 26, fontWeight: 900, color: C.ink}}>Formulir permohonan</div>
            <Field label="Nama pemohon" value="Warga Contoh" frame={f} start={20} />
            <ServiceChoice frame={f} start={38} />
            <Field label="Judul permohonan" value="Kegiatan warga di ruas jalan" frame={f} start={58} />
            <Field label="Tanggal kegiatan" value="20 Desember 2026" frame={f} start={80} />
            <Field label="Lokasi permohonan" value="Jl. Contoh Raya No. 1" frame={f} start={100} />
          </div>
          <div style={{position: 'absolute', inset: 0, padding: '16px 30px', display: 'flex', flexDirection: 'column', opacity: out, transform: `translateX(${(1 - out) * 960}px)`}}>
            <div style={LABEL}>Titik lokasi di peta (ilustrasi)</div>
            <div style={{position: 'relative', height: 250, borderRadius: 18, overflow: 'hidden', opacity: mapShow, transform: `scale(${1 + (1 - mapShow) * 0.1})`}}>
              <MapSvg w={900} h={250} />
              <RouteLine d="M60 420C180 360 250 240 380 250C470 258 520 160 640 150" progress={route} color={C.cyan} />
              <MapPin x={430} y={170} frame={f} delay={156} size={50} />
              <div style={{position: 'absolute', left: 12, right: 12, bottom: 10, padding: '8px 14px', borderRadius: 12, background: 'rgba(255,255,255,.96)', fontSize: 15, fontWeight: 800, color: C.ink, opacity: fadeIn(f, 170, 12)}}>Lokasi permohonan ditandai</div>
            </div>
            <div style={{...LABEL, marginTop: 16, marginBottom: 6}}>Dokumen pendukung</div>
            <div style={{height: 78, borderRadius: 14, border: `2px dashed ${upload > 0.9 ? C.green : '#B7CDD7'}`, background: upload > 0.9 ? 'rgba(57,185,138,.07)' : '#F8FBFC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 800, color: upload > 0.9 ? C.green : '#7C93A1'}}>
              {upload > 0.9 ? '✓ surat-permohonan.pdf terunggah' : upload > 0 ? 'Mengunggah...' : 'Tarik berkas ke sini'}
            </div>
            <div style={{marginTop: 'auto', height: 56, borderRadius: 14, background: clicked ? C.green : `linear-gradient(90deg, ${C.blue}, ${C.cyan})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 20, fontWeight: 900, letterSpacing: 1, transform: `scale(${clicked ? 0.97 : 1})`}}>
              {clicked ? '✓ PERMOHONAN TERKIRIM' : 'KIRIM PERMOHONAN'}
            </div>
          </div>
        </div>
        {clicked && (
          <div style={{position: 'absolute', right: 28, top: 110, padding: '12px 20px', borderRadius: 16, background: C.green, color: 'white', boxShadow: '0 16px 36px rgba(0,0,0,.22)', transform: `scale(${0.6 + success * 0.4})`, opacity: fadeIn(f, 220, 6)}}>
            <div style={{fontSize: 19, fontWeight: 900}}>Permohonan terkirim</div>
            <div style={{fontSize: 14, fontWeight: 700, opacity: 0.9}}>Nomor aduan contoh: RLL-0001</div>
          </div>
        )}
      </div>
      <Cursor frame={f} path={cursor} clicks={[56, 214]} />
      <div style={{opacity: fadeIn(f, 0, 16)}}>
        <Chair x={455} y={1170} />
        <Person role="warga" view="half" x={441} y={1070} scale={1.2} pose={{armL: [14, 70 + Math.sin(tp) * 6], armR: [14, 70 - Math.sin(tp + 1.6) * 6], mood: happy ? 'happy' : 'smile', nod, look: -0.2}} />
        <Desk x={270} y={1270} w={540} h={90} />
        <LaptopBack x={445} y={1154} w={190} />
      </div>
      <AbsoluteFill style={{pointerEvents: 'none'}}>
        <Subtitle text={line.text} />
      </AbsoluteFill>
    </SceneFrame>
  );
};
