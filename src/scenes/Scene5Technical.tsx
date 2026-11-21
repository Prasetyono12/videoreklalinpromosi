import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Avatar, Person} from '../components/Person';
import {Background, Check, DocIcon, Eyebrow, Notification, SceneFrame, Subtitle, Watermark} from '../components/Common';
import {Chair, Desk, LaptopBack, MapPin, MapSvg, RoadStrip, RouteLine, SignPost} from '../components/Props';
import {C, ease, fadeIn, flash, rise} from '../theme';
import {narrationFor} from '../narration';

const PW = 800;
const PH = 700;

export const Panel: React.FC<{left: number; tag: string; tagColor: string; title: string; frame: number; delay: number; children: React.ReactNode}> = ({left, tag, tagColor, title, frame, delay, children}) => (
  <div style={{position: 'absolute', left, top: 200, width: PW, height: PH, borderRadius: 30, background: 'rgba(255,255,255,.97)', boxShadow: '0 26px 70px rgba(0,0,0,.3)', overflow: 'hidden', opacity: fadeIn(frame, delay, 16), transform: `translateY(${rise(frame, delay, 36)}px)`}}>
    <div style={{position: 'absolute', left: 28, top: 20, display: 'flex', alignItems: 'center', gap: 14}}>
      <div style={{padding: '6px 16px', borderRadius: 999, background: tagColor, color: tagColor === C.amber ? C.ink : 'white', fontSize: 16, fontWeight: 900, letterSpacing: 1.5}}>{tag}</div>
      <div style={{fontSize: 23, fontWeight: 900, color: C.ink}}>{title}</div>
    </div>
    {children}
  </div>
);

/** Bagian kiri: Teknisi menyusun draft surat rekomendasi. */
export const DraftPanel: React.FC<{frame: number}> = ({frame}) => {
  const typing = frame > 40 && frame < 130;
  const tp = typing ? frame * 0.7 : 0;
  const lines = Math.floor(ease(frame, 46, 126, 0, 8));
  const handover = ease(frame, 140, 172, 0, 1);
  const arrive = flash(frame, 172, 18);
  return (
    <>
      <div style={{position: 'absolute', left: 28, top: 70}}>
        <Notification frame={frame} delay={16} title="Penugasan baru dari Kepala Bidang" sub="Menyiapkan draft surat rekomendasi" accent={C.blue} width={470} />
      </div>
      <div style={{position: 'absolute', left: 24, top: 168, width: 424, height: 360, borderRadius: 18, overflow: 'hidden', background: 'linear-gradient(#E3F3F8,#CFE8F0)'}}>
        <Chair x={126} y={80} />
        <Person role="teknisi" view="half" x={68} y={20} scale={1.4} pose={{armL: [14, 70 + Math.sin(tp) * 6], armR: [14, 70 - Math.sin(tp + 1.6) * 6], mood: 'smile', look: 0.6, nod: frame > 132 && frame < 150 ? 8 : 0}} />
        <Desk x={0} y={262} w={424} h={100} dark={false} />
        <LaptopBack x={92} y={168} w={190} />
      </div>
      <div style={{position: 'absolute', left: 470, top: 168, width: 300, height: 360, borderRadius: 18, background: 'white', border: '2px solid #DCE8ED', boxShadow: '0 14px 34px rgba(0,0,0,.14)', padding: 26, opacity: fadeIn(frame, 40, 14), transform: `translateY(${rise(frame, 40, 30)}px) rotate(1.5deg)`}}>
        <div style={{display: 'inline-block', padding: '4px 12px', borderRadius: 8, background: 'rgba(244,185,66,.3)', color: '#8A5A00', fontSize: 14, fontWeight: 900, letterSpacing: 1}}>DRAFT</div>
        <div style={{fontSize: 18, fontWeight: 900, color: C.ink, marginTop: 14}}>Surat Rekomendasi</div>
        <div style={{height: 2, background: '#DCE8ED', margin: '12px 0 16px'}} />
        {Array.from({length: 8}).map((_, i) => (
          <div key={i} style={{height: 10, borderRadius: 5, background: i < lines ? '#C7DAE3' : 'transparent', width: ['100%', '92%', '97%', '70%', '100%', '88%', '95%', '55%'][i], marginTop: 12}} />
        ))}
      </div>
      <div style={{position: 'absolute', left: 28, top: 560, right: 28, display: 'flex', alignItems: 'center', gap: 18}}>
        <Avatar role="teknisi" size={78} />
        <div style={{position: 'relative', flex: 1, height: 70}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 33, height: 4, borderRadius: 2, background: C.blue, opacity: 0.4}} />
          <div style={{position: 'absolute', left: handover * 250, top: 2, opacity: fadeIn(frame, 138, 8) * (1 - ease(frame, 176, 184, 0, 1))}}>
            <DocIcon size={44} lines={2} />
          </div>
        </div>
        <Avatar role="kabid" size={78} ring={arrive > 0 ? C.cyan : '#FFFFFF'} glow={arrive} />
        <div style={{width: 210, fontSize: 17, fontWeight: 800, color: C.ink, lineHeight: 1.3, opacity: fadeIn(frame, 150, 14)}}>Draft diserahkan kepada Kepala Bidang untuk diperiksa dan diparaf.</div>
      </div>
    </>
  );
};

/** Bagian kanan: Teknisi memeriksa fasilitas di lapangan. */
export const FieldPanel: React.FC<{frame: number}> = ({frame}) => {
  const walk = ease(frame, 14, 62, 1, 0);
  const route = ease(frame, 18, 70, 0, 1);
  const flash1 = flash(frame, 92, 10);
  const flash2 = flash(frame, 122, 10);
  const items = ['Kondisi rambu dan fasilitas', 'Foto dokumentasi', 'Catatan kondisi lapangan', 'Laporan hasil pemeriksaan'];
  const itemAt = [72, 96, 122, 150];
  const report = ease(frame, 150, 196, 0, 1);
  return (
    <>
      <div style={{position: 'absolute', left: 24, top: 66, width: 752, height: 150, borderRadius: 18, overflow: 'hidden', background: '#E6F0F2'}}>
        <div style={{position: 'absolute', inset: 0, transform: `scale(${1.2 - ease(frame, 0, 60, 0, 0.2)}) translateX(${ease(frame, 0, 60, -30, 0)}px)`}}>
          <MapSvg w={752} h={150} />
          <RouteLine d="M40 440C150 330 250 300 330 240C420 170 520 190 600 150" progress={route} color={C.cyan} />
          <MapPin x={400} y={104} frame={frame} delay={66} size={40} color={C.amber} />
        </div>
        <div style={{position: 'absolute', left: 14, bottom: 10, padding: '6px 12px', borderRadius: 10, background: 'rgba(255,255,255,.96)', fontSize: 14, fontWeight: 800, color: C.ink}}>Menuju lokasi fasilitas (ilustrasi)</div>
      </div>
      <div style={{position: 'absolute', left: 24, top: 232, width: 450, height: 300, borderRadius: 18, overflow: 'hidden', background: 'linear-gradient(#FFF6E2,#F8E8C4)'}}>
        <RoadStrip top={218} height={82} frame={frame} speed={3} width={450} />
        <SignPost x={340} y={236} scale={0.8} />
        <Person role="teknisi" x={80 + (1 - walk) * 20 + walk * -90} y={22} scale={0.72} pose={{walk: walk > 0.001 ? frame * 0.42 : undefined, walkAmp: ease(frame, 54, 64, 1, 0), itemR: walk < 0.02 ? 'camera' : 'none', armR: [24 * (1 - walk), 96 * (1 - walk) + 8], mood: 'smile', look: 1}} />
        {(flash1 > 0 || flash2 > 0) && <div style={{position: 'absolute', inset: 0, background: 'white', opacity: 0.75 * (1 - Math.max(flash1, flash2))}} />}
        {frame > 90 && <div style={{position: 'absolute', right: 14, top: 14, padding: '6px 12px', borderRadius: 10, background: C.navy, color: 'white', fontSize: 14, fontWeight: 800, opacity: fadeIn(frame, 90, 8)}}>Foto {frame > 120 ? 2 : 1}</div>}
      </div>
      <div style={{position: 'absolute', left: 494, top: 236, width: 282}}>
        {items.map((t, i) => (
          <div key={t} style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, opacity: fadeIn(frame, itemAt[i], 10), transform: `translateX(${(1 - fadeIn(frame, itemAt[i], 10)) * 20}px)`}}>
            <Check size={32} />
            <div style={{fontSize: 18, fontWeight: 800, color: C.ink, lineHeight: 1.2}}>{t}</div>
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', left: 28, top: 560, right: 28, display: 'flex', alignItems: 'center', gap: 20, opacity: fadeIn(frame, 146, 12)}}>
        <DocIcon size={54} color={C.amber} lines={3} />
        <div style={{flex: 1}}>
          <div style={{fontSize: 19, fontWeight: 900, color: C.ink}}>Laporan hasil pemeriksaan</div>
          <div style={{height: 12, borderRadius: 6, background: '#E3EBF0', marginTop: 10, overflow: 'hidden'}}>
            <div style={{width: `${report * 100}%`, height: '100%', background: `linear-gradient(90deg, ${C.amber}, ${C.cyan})`}} />
          </div>
          <div style={{fontSize: 15, fontWeight: 700, color: C.slate, marginTop: 8, opacity: fadeIn(frame, 196, 10)}}>Laporan dikirim kepada Kepala Bidang.</div>
        </div>
        <Avatar role="kabid" size={64} ring={frame >= 198 ? C.cyan : '#FFFFFF'} glow={flash(frame, 198, 18)} />
      </div>
    </>
  );
};

export const Scene5Technical: React.FC = () => {
  const f = useCurrentFrame();
  const line = narrationFor('technical')[0];
  return (
    <SceneFrame enter="zoom">
      <Background />
      <Watermark dark />
      <div style={{position: 'absolute', left: 145, top: 84}}>
        <Eyebrow>PEMERIKSAAN DAN PELAKSANAAN TEKNIS</Eyebrow>
        <div style={{fontSize: 44, fontWeight: 900, color: C.white, marginTop: 14}}>Hasil pemeriksaan dan pekerjaan teknis tercatat sesuai kewenangan.</div>
      </div>
      <Panel left={145} tag="SURAT REKOMENDASI" tagColor={C.blue} title="Teknisi menyusun draft" frame={f} delay={6}>
        <DraftPanel frame={f} />
      </Panel>
      <Panel left={975} tag="FASILITAS JALAN" tagColor={C.amber} title="Teknisi memeriksa lapangan" frame={f} delay={18}>
        <FieldPanel frame={f} />
      </Panel>
      <AbsoluteFill style={{pointerEvents: 'none'}}>
        <Subtitle text={line.text} />
      </AbsoluteFill>
    </SceneFrame>
  );
};
