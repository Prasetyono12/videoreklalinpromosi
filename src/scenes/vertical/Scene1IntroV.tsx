import React from 'react';
import {AbsoluteFill, Easing, useCurrentFrame} from 'remotion';
import {AGENCY_NAME, Background, BrandMark, Pill, SceneFrame, Subtitle, Watermark} from '../../components/Common';
import {Person} from '../../components/Person';
import {RoadStrip} from '../../components/Props';
import {C, SPRING_PRESETS, ease, fadeIn, pulse, rise, useSpr} from '../../theme';
import {narrationFor} from '../../narration';

/** Adegan 1 (vertikal 1080x1920): pembukaan dan pengenalan. */
export const Scene1IntroV: React.FC = () => {
  const f = useCurrentFrame();
  const pop = useSpr(f, 8, SPRING_PRESETS.logo.damping, SPRING_PRESETS.logo.stiffness);
  const exit = ease(f, 118, 150, 0, 1, Easing.in(Easing.cubic));
  const walkIn = ease(f, 0, 50, 1, 0);
  const stop = ease(f, 38, 52, 1, 0);
  const hold = ease(f, 52, 74, 0, 1);
  const px = 700 + walkIn * 520;
  const py = 802;
  const ring = ((f - 70) % 54) / 54;
  const cardPop = useSpr(f, 78, 12, 110);
  const line = narrationFor('intro')[0];
  return (
    <SceneFrame enter="none">
      <Background />
      <Watermark dark />
      <div style={{position: 'absolute', left: 60, top: 250, opacity: fadeIn(f, 0), transform: `scale(${(0.72 + pop * 0.28) * (1 + exit * 0.5)})`, transformOrigin: 'left center'}}>
        <BrandMark size={120} />
      </div>
      <div style={{position: 'absolute', left: 60, top: 400, width: 960, opacity: 1 - exit * 0.6}}>
        <div style={{opacity: fadeIn(f, 24, 28), transform: `translateY(${rise(f, 24)}px)`}}>
          <div style={{fontSize: 56, lineHeight: 1, fontWeight: 800, letterSpacing: 1, color: C.cyan}}>Layanan Aduan</div>
          <div style={{fontSize: 190, lineHeight: 0.96, fontWeight: 900, letterSpacing: -8, color: C.white, marginTop: 10}}>RekLaLin</div>
          <div style={{fontSize: 34, color: '#BFE9EF', fontWeight: 800, marginTop: 24}}>{AGENCY_NAME}</div>
          <div style={{fontSize: 34, color: '#D5E7F0', lineHeight: 1.4, marginTop: 24, width: 560}}>Layanan digital untuk permohonan dan aduan terkait rekayasa lalu lintas.</div>
        </div>
        <div style={{marginTop: 22, opacity: fadeIn(f, 58), transform: `translateY(${rise(f, 58, 18)}px)`}}>
          <Pill>LAYANAN PUBLIK DIGITAL</Pill>
        </div>
      </div>
      <RoadStrip top={1180} height={130} frame={f} speed={7} width={1080} />
      <Person
        role="warga"
        x={px}
        y={py}
        scale={1.35}
        pose={{walk: walkIn > 0.001 ? f * 0.42 : undefined, walkAmp: stop, armR: [6 + 20 * hold, 8 + 92 * hold], itemR: hold > 0.01 ? 'phone' : 'none', mood: 'smile', nod: hold * 5, look: 0.5 * hold}}
      />
      {f > 70 && (
        <div style={{position: 'absolute', left: px + 118, top: py + 180, width: 0, height: 0}}>
          <div style={{position: 'absolute', left: -60, top: -60, width: 120, height: 120, borderRadius: '50%', border: `3px solid ${C.cyan}`, opacity: 0.7 * (1 - ring), transform: `scale(${0.5 + ring * 1.4})`}} />
        </div>
      )}
      <div style={{position: 'absolute', left: 700, top: 735, opacity: fadeIn(f, 78, 8), transform: `scale(${0.6 + cardPop * 0.4}) translateY(${pulse(f, 60) * -6}px)`, transformOrigin: 'bottom center'}}>
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
