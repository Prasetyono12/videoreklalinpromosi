import React from 'react';
import {AbsoluteFill, Easing, useCurrentFrame} from 'remotion';
import {AGENCY_NAME, APP_NAME, BrandMark, Background, Pill, SceneFrame, SiteHeader, Subtitle, Watermark} from '../components/Common';
import {Person} from '../components/Person';
import {RoadStrip} from '../components/Props';
import {C, SPRING_PRESETS, ease, fadeIn, pulse, rise, useSpr} from '../theme';
import {narrationFor} from '../narration';

/** Mockup beranda aplikasi (mengikuti tampilan beranda; ilustrasi, bukan tangkapan layar langsung). */
const HomepageMock: React.FC = () => (
  <div style={{width: 1600, height: 900, borderRadius: 28, overflow: 'hidden', background: 'linear-gradient(120deg,#0C2744 0%,#16405F 55%,#4A7FAE 100%)', boxShadow: '0 40px 100px rgba(0,0,0,.45)', position: 'relative'}}>
    <SiteHeader height={92} />
    <div style={{position: 'absolute', left: 140, top: 170}}>
      <div style={{display: 'inline-flex', alignItems: 'center', gap: 14, padding: '12px 26px', borderRadius: 999, border: '2px solid rgba(255,255,255,.35)', color: C.white, fontSize: 26, fontWeight: 800}}>
        <span style={{width: 14, height: 14, borderRadius: 7, background: C.green}} />
        {APP_NAME}
      </div>
      <div style={{fontSize: 110, fontWeight: 900, color: C.white, lineHeight: 1.02, marginTop: 36}}>Pelayanan<br />Transportasi<br /><span style={{color: '#8EC5FF'}}>yang Lebih Mudah</span></div>
      <div style={{fontSize: 30, color: '#DCE9F2', lineHeight: 1.5, marginTop: 36, width: 1000}}>Ajukan permohonan pelayanan Dinas Perhubungan Kabupaten Banyumas secara lebih mudah, terstruktur, dan dapat dipantau melalui satu sistem.</div>
      <div style={{display: 'flex', gap: 24, marginTop: 44}}>
        <div style={{padding: '22px 46px', borderRadius: 16, background: '#2C7BE5', color: C.white, fontSize: 30, fontWeight: 900}}>Masuk ke Sistem →</div>
        <div style={{padding: '22px 46px', borderRadius: 16, border: '2px solid rgba(255,255,255,.4)', color: C.white, fontSize: 30, fontWeight: 900}}>Lihat Layanan</div>
      </div>
    </div>
  </div>
);

/** Garis jalur yang mengalir pelan di latar belakang. */
const FlowLines: React.FC<{frame: number}> = ({frame}) => (
  <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" style={{position: 'absolute', inset: 0}}>
    {[0, 1, 2].map((i) => (
      <path
        key={i}
        d={`M-40 ${210 + i * 90} C 480 ${120 + i * 70}, 900 ${420 + i * 40}, 1960 ${180 + i * 110}`}
        stroke={C.cyan}
        strokeOpacity={0.16 - i * 0.03}
        strokeWidth={2}
        strokeDasharray="22 26"
        strokeDashoffset={-frame * (1.6 + i * 0.5)}
      />
    ))}
  </svg>
);

export const Scene1Intro: React.FC = () => {
  const f = useCurrentFrame();
  const pop = useSpr(f, 8, SPRING_PRESETS.logo.damping, SPRING_PRESETS.logo.stiffness);
  const exit = ease(f, 118, 150, 0, 1, Easing.in(Easing.cubic));
  const walkIn = ease(f, 0, 50, 1, 0);
  const stop = ease(f, 38, 52, 1, 0);
  const hold = ease(f, 52, 74, 0, 1);
  const px = 1250 + walkIn * 640;
  const py = 389;
  const ring = ((f - 70) % 54) / 54;
  const cardPop = useSpr(f, 78, 12, 110);
  const line = narrationFor('intro')[0];

  return (
    <SceneFrame enter="none">
      <Background />
      <FlowLines frame={f} />
      <Watermark dark />
      <div style={{position: 'absolute', left: 145, top: 130, display: 'flex', alignItems: 'center', gap: 24, opacity: fadeIn(f, 0)}}>
        <div style={{transform: `scale(${(0.72 + pop * 0.28) * (1 + exit * 0.9)}) translateX(${exit * 140}px)`, transformOrigin: 'left center'}}>
          <BrandMark size={86} />
        </div>
        <div style={{color: C.white, fontSize: 22, fontWeight: 800, letterSpacing: 2.5, opacity: 1 - exit}}>{AGENCY_NAME.toUpperCase()}</div>
      </div>
      <div style={{position: 'absolute', left: 145, top: 262, width: 1020, opacity: 1 - exit * 0.6}}>
        <div style={{opacity: fadeIn(f, 24, 28), transform: `translateY(${rise(f, 24)}px)`}}>
          <div style={{fontSize: 46, lineHeight: 1, fontWeight: 800, letterSpacing: 1, color: C.cyan}}>Layanan Aduan</div>
          <div style={{fontSize: 140, lineHeight: 0.96, fontWeight: 900, letterSpacing: -6, color: C.white, marginTop: 10}}>RekLaLin</div>
          <div style={{fontSize: 36, color: '#BFE9EF', fontWeight: 800, letterSpacing: 0.5, marginTop: 24}}>{AGENCY_NAME}</div>
          <div style={{fontSize: 31, color: '#D5E7F0', lineHeight: 1.4, marginTop: 28, maxWidth: 800}}>Layanan digital untuk permohonan dan aduan terkait rekayasa lalu lintas.</div>
        </div>
        <div style={{marginTop: 44, opacity: fadeIn(f, 58), transform: `translateY(${rise(f, 58, 18)}px)`}}>
          <Pill>LAYANAN PUBLIK DIGITAL</Pill>
        </div>
      </div>
      <div style={{position: 'absolute', left: 1300, top: 80, width: 544, height: 306, opacity: fadeIn(f, 16, 20), transform: `translateY(${rise(f, 16, 30)}px)`}}>
        <div style={{transform: 'scale(0.34)', transformOrigin: 'top left'}}>
          <HomepageMock />
        </div>
      </div>
      <RoadStrip top={800} height={130} frame={f} speed={7} />
      <Person
        role="warga"
        x={px}
        y={py}
        scale={1.45}
        pose={{
          walk: walkIn > 0.001 ? f * 0.42 : undefined,
          walkAmp: stop,
          armR: [6 + 20 * hold, 8 + 92 * hold],
          itemR: hold > 0.01 ? 'phone' : 'none',
          mood: 'smile',
          nod: hold * 5,
          look: 0.5 * hold,
        }}
      />
      {f > 70 && (
        <div style={{position: 'absolute', left: px + 128, top: py + 190, width: 0, height: 0}}>
          <div style={{position: 'absolute', left: -60, top: -60, width: 120, height: 120, borderRadius: '50%', border: `3px solid ${C.cyan}`, opacity: 0.7 * (1 - ring), transform: `scale(${0.5 + ring * 1.4})`}} />
        </div>
      )}
      <div style={{position: 'absolute', left: px - 190, top: py - 20, opacity: fadeIn(f, 78, 8), transform: `scale(${0.6 + cardPop * 0.4}) translateY(${pulse(f, 60) * -6}px)`, transformOrigin: 'bottom right'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderRadius: 20, background: 'rgba(255,255,255,.97)', boxShadow: '0 18px 40px rgba(0,0,0,.28)'}}>
          <BrandMark size={44} />
          <div>
            <div style={{fontSize: 22, fontWeight: 900, color: C.ink}}>RekLaLin</div>
            <div style={{fontSize: 14, color: C.slate, fontWeight: 700}}>Layanan Aduan</div>
          </div>
        </div>
      </div>
      <AbsoluteFill style={{pointerEvents: 'none'}}>
        <Subtitle text={line.text} />
      </AbsoluteFill>
    </SceneFrame>
  );
};
