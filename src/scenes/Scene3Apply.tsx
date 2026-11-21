import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {APP_NAME, Background, Cursor, Eyebrow, Pill, SceneFrame, SiteHeader, Subtitle, Watermark} from '../components/Common';
import {Person} from '../components/Person';
import {Chair, Desk, LaptopBack, MapPin, MapSvg, RouteLine} from '../components/Props';
import {C, ease, fadeIn, pulse, rise, typed, useSpr} from '../theme';
import {narrationFor} from '../narration';

// Jendela aplikasi (mockup). Semua data di dalamnya fiktif.
const WIN = {x: 760, y: 112, w: 1040, h: 770};
const FORM_W = 480;

export const Field: React.FC<{label: string; value: string; frame: number; start: number; active?: boolean; caret?: boolean}> = ({label, value, frame, start, active, caret}) => {
  const show = fadeIn(frame, start - 6, 10);
  const text = typed(value, frame, start, 0.55);
  const typing = text.length < value.length && frame >= start;
  return (
    <div style={{marginTop: 14, opacity: show, transform: `translateX(${(1 - show) * 20}px)`}}>
      <div style={{fontSize: 15, color: C.slate, fontWeight: 800, marginBottom: 6}}>{label}</div>
      <div style={{height: 44, borderRadius: 11, border: `1.5px solid ${active || typing ? C.cyan : '#DCE8ED'}`, background: '#F8FBFC', display: 'flex', alignItems: 'center', padding: '0 14px', fontSize: 17, fontWeight: 600, color: C.ink}}>
        {text}
        {(typing || caret) && <span style={{display: 'inline-block', width: 2, height: 22, background: C.blue, marginLeft: 2, opacity: pulse(frame, 16) > 0.4 ? 1 : 0}} />}
        {!text && <span style={{color: '#91A6B2'}}>—</span>}
      </div>
    </div>
  );
};

export const ServiceChoice: React.FC<{frame: number; start: number}> = ({frame, start}) => {
  const show = fadeIn(frame, start - 6, 10);
  const pick = ease(frame, start + 14, start + 24, 0, 1);
  const chip = (label: string, selected: boolean) => (
    <div style={{flex: 1, padding: '9px 12px', borderRadius: 11, border: `1.5px solid ${selected ? C.blue : '#DCE8ED'}`, background: selected ? `rgba(23,105,170,${0.09 * pick})` : '#F8FBFC', color: selected ? C.blue : '#7C93A1', fontSize: 14, fontWeight: 800, lineHeight: 1.2}}>{label}</div>
  );
  return (
    <div style={{marginTop: 14, opacity: show}}>
      <div style={{fontSize: 15, color: C.slate, fontWeight: 800, marginBottom: 6}}>Jenis layanan</div>
      <div style={{display: 'flex', gap: 10}}>
        {chip('Surat Rekomendasi Penggunaan Jalan', pick > 0.5)}
        {chip('Pergeseran/Pemindahan Fasilitas Jalan', false)}
      </div>
    </div>
  );
};

const AppWindow: React.FC<{frame: number}> = ({frame}) => {
  const enter = fadeIn(frame, 6, 18);
  const mapShow = fadeIn(frame, 100, 18);
  const route = ease(frame, 128, 160, 0, 1);
  const upload = ease(frame, 150, 178, 0, 1);
  const clicked = frame >= 196;
  const btn = clicked ? 0.94 + 0.06 * ease(frame, 196, 204, 0, 1) : 1;
  const success = useSpr(frame, 206, 12, 120);
  return (
    <div style={{position: 'absolute', left: WIN.x, top: WIN.y, width: WIN.w, height: WIN.h, borderRadius: 30, overflow: 'hidden', background: 'white', boxShadow: '0 30px 80px rgba(0,0,0,.35)', opacity: enter, transform: `translateY(${rise(frame, 6, 40)}px)`}}>
      <div style={{height: 58, background: C.pale, display: 'flex', alignItems: 'center', padding: '0 22px', gap: 10, borderBottom: '1px solid #DCE8ED'}}>
        {['#F26B6B', C.amber, C.green].map((c) => <div key={c} style={{width: 13, height: 13, borderRadius: 7, background: c}} />)}
        <div style={{marginLeft: 18, display: 'flex', alignItems: 'center', gap: 10, padding: '6px 16px', borderRadius: 12, background: 'white', fontSize: 16, fontWeight: 800, color: C.ink}}>
          {APP_NAME}
        </div>
      </div>
      <SiteHeader height={60} nav={false} action={false} />
      <div style={{display: 'flex', height: WIN.h - 58 - 60}}>
        <div style={{width: FORM_W, padding: '18px 30px', borderRight: '1px solid #E4EDF1'}}>
          <div style={{fontSize: 25, fontWeight: 900, color: C.ink}}>Formulir permohonan</div>
          <Field label="Nama pemohon" value="Warga Contoh" frame={frame} start={30} />
          <ServiceChoice frame={frame} start={52} />
          <Field label="Judul permohonan" value="Kegiatan warga di ruas jalan" frame={frame} start={80} />
          <Field label="Tanggal kegiatan" value="20 Desember 2026" frame={frame} start={108} />
          <Field label="Lokasi permohonan" value="Jl. Contoh Raya No. 1" frame={frame} start={128} />
        </div>
        <div style={{flex: 1, padding: '18px 26px', display: 'flex', flexDirection: 'column'}}>
          <div style={{fontSize: 15, color: C.slate, fontWeight: 800, marginBottom: 8}}>Titik lokasi di peta (ilustrasi)</div>
          <div style={{position: 'relative', height: 260, borderRadius: 18, overflow: 'hidden', background: '#E6F0F2', opacity: mapShow, transform: `scale(${1 + (1 - mapShow) * 0.12})`}}>
            <MapSvg w={470} h={260} />
            <RouteLine d="M60 420C180 360 250 240 380 250C470 258 520 160 640 150" progress={route} color={C.cyan} />
            <MapPin x={250} y={170} frame={frame} delay={112} size={50} />
            <div style={{position: 'absolute', left: 12, right: 12, bottom: 10, padding: '9px 14px', borderRadius: 12, background: 'rgba(255,255,255,.96)', fontSize: 14, fontWeight: 800, color: C.ink, opacity: fadeIn(frame, 138, 12), transform: `translateY(${rise(frame, 138, 18)}px)`}}>Lokasi permohonan ditandai</div>
          </div>
          <div style={{fontSize: 15, color: C.slate, fontWeight: 800, margin: '16px 0 6px'}}>Dokumen pendukung</div>
          <div style={{height: 92, borderRadius: 14, border: `2px dashed ${upload > 0.9 ? C.green : '#B7CDD7'}`, background: upload > 0.9 ? 'rgba(57,185,138,.07)' : '#F8FBFC', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontSize: 17, fontWeight: 800, color: upload > 0.9 ? C.green : '#7C93A1'}}>
            {upload > 0.9 ? '✓ surat-permohonan.pdf terunggah' : 'Tarik berkas ke sini'}
          </div>
          <div style={{marginTop: 'auto', height: 56, borderRadius: 14, background: `linear-gradient(90deg, ${C.blue}, ${C.cyan})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 20, fontWeight: 900, letterSpacing: 1, opacity: fadeIn(frame, 170, 14), transform: `scale(${btn})`}}>KIRIM PERMOHONAN</div>
        </div>
      </div>
      {frame >= 206 && (
        <div style={{position: 'absolute', right: 30, bottom: 96, display: 'flex', alignItems: 'center', gap: 14, padding: '14px 22px', borderRadius: 18, background: C.green, color: 'white', boxShadow: '0 16px 36px rgba(0,0,0,.22)', transform: `scale(${0.6 + success * 0.4})`, opacity: fadeIn(frame, 206, 6)}}>
          <div style={{fontSize: 30, fontWeight: 900}}>✓</div>
          <div><div style={{fontSize: 20, fontWeight: 900}}>Permohonan terkirim</div><div style={{fontSize: 14, fontWeight: 700, opacity: 0.9}}>Nomor aduan contoh: RLL-0001</div></div>
        </div>
      )}
      {frame >= 150 && frame < 182 && (
        <div style={{position: 'absolute', left: 560 + upload * 160, top: 560 - upload * 60 + (1 - upload) * 40, opacity: 1 - ease(frame, 172, 180, 0, 1), transform: `scale(${1 - upload * 0.2})`}}>
          <svg width="46" height="58" viewBox="0 0 64 80" fill="none"><path d="M6 6a4 4 0 0 1 4-4h30l18 18v54a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V6Z" fill="white" stroke={C.blue} strokeWidth="3" /><rect x="14" y="30" width="30" height="5" rx="2.5" fill={C.blue} /><rect x="14" y="42" width="34" height="4" rx="2" fill="#D6E3E9" /></svg>
        </div>
      )}
    </div>
  );
};

export const Scene3Apply: React.FC = () => {
  const f = useCurrentFrame();
  const line = narrationFor('apply')[0];
  const happy = f >= 210;
  const nod = f >= 208 ? Math.sin(((f - 208) / 14) * Math.PI) * 9 : 0;
  const typing = f > 24 && f < 196;
  const tp = typing ? f * 0.7 : 0;
  const cursorPath = [
    [20, 900, 560],
    [34, 840, 262],
    [56, 880, 372],
    [84, 960, 372],
    [112, 880, 470],
    [130, 900, 560],
    [146, 1480, 660],
    [172, 1480, 790],
    [194, 1510, 790],
    [214, 1510, 800],
  ] as const;
  return (
    <SceneFrame enter="circle">
      <Background />
      <Watermark dark />
      <div style={{position: 'absolute', left: 145, top: 108, width: 560}}>
        <Eyebrow>LANGKAH PENGAJUAN</Eyebrow>
        <div style={{fontSize: 50, fontWeight: 900, color: C.white, lineHeight: 1.1, marginTop: 22}}>Ajukan kebutuhan dengan lebih terstruktur.</div>
        <div style={{display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28, opacity: fadeIn(f, 40)}}>
          <Pill>FORMULIR DIGITAL</Pill>
          <Pill>LOKASI PETA</Pill>
        </div>
      </div>
      <AppWindow frame={f} />
      <Cursor frame={f} path={cursorPath} clicks={[56, 130, 196]} />
      <div style={{opacity: fadeIn(f, 0, 16)}}>
        <Chair x={250} y={520} />
        <Person
          role="warga"
          view="half"
          x={200}
          y={452}
          scale={1.55}
          pose={{armL: [14, 70 + Math.sin(tp) * 6], armR: [14, 70 - Math.sin(tp + 1.6) * 6], mood: happy ? 'happy' : 'smile', nod, look: 0.6}}
        />
        <Desk x={90} y={700} w={560} h={150} />
        <LaptopBack x={275} y={598} w={200} />
      </div>
      <AbsoluteFill style={{pointerEvents: 'none'}}>
        <Subtitle text={line.text} />
      </AbsoluteFill>
    </SceneFrame>
  );
};
