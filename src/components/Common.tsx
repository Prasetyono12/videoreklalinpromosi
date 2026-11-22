import React from 'react';
import {AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {FEATURES, OVERLAP, SAFE} from '../config';
import {C, FONT, SPRING_PRESETS, ease, fadeIn, pathAt, pulse, useSmooth, useSpr} from '../theme';
import {LOGO_DISHUB} from '../scenes/assets/logoDishub';

/** True bila komposisi berorientasi vertikal (9:16). */
export const useVertical = () => {
  const {width, height} = useVideoConfig();
  return height > width;
};

export const GlobalStyles: React.FC = () => (
  <style>{`
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; font-family: ${FONT}; }
  `}</style>
);

export const Background: React.FC<{light?: boolean; accent?: string}> = ({light = false, accent = C.cyan}) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 180], [0, 80], {extrapolateRight: 'extend'});
  return (
    <AbsoluteFill
      style={{
        background: light
          ? 'linear-gradient(135deg, #F5FAFC 0%, #EAF3F8 55%, #DDECF4 100%)'
          : `radial-gradient(circle at ${65 + (drift % 10)}% 18%, #123E62 0%, ${C.navy2} 28%, ${C.navy} 72%)`,
        overflow: 'hidden',
      }}
    >
      <div style={{position: 'absolute', width: 720, height: 720, borderRadius: '50%', border: `1px solid ${light ? 'rgba(23,105,170,.10)' : 'rgba(56,195,210,.12)'}`, right: -230 + drift * 0.35, top: -320}} />
      <div style={{position: 'absolute', width: 520, height: 520, borderRadius: '50%', border: `1px solid ${light ? 'rgba(23,105,170,.10)' : 'rgba(56,195,210,.10)'}`, right: -130 + drift * 0.35, top: -220}} />
      <div style={{position: 'absolute', width: 460, height: 460, borderRadius: '50%', background: accent, opacity: light ? 0.055 : 0.075, filter: 'blur(100px)', left: -180, bottom: -250}} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: light ? 0.22 : 0.12,
          backgroundImage: 'linear-gradient(rgba(120,170,195,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(120,170,195,.18) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'linear-gradient(to bottom, black, transparent 92%)',
        }}
      />
    </AbsoluteFill>
  );
};

export const Eyebrow: React.FC<{children: React.ReactNode; dark?: boolean}> = ({children, dark = false}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, color: dark ? C.blue : C.cyan, fontSize: 22, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase'}}>
    <span style={{width: 34, height: 3, borderRadius: 5, background: dark ? C.blue : C.cyan}} />
    {children}
  </div>
);

/** Logo Dishub Kabupaten Banyumas dengan latar transparan. */
export const BrandMark: React.FC<{size?: number}> = ({size = 72}) => (
  <div
    style={{
      width: size,
      height: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    <Img src={LOGO_DISHUB} style={{width: size * 0.84, height: size * 0.84, objectFit: 'contain'}} />
  </div>
);

export const APP_NAME = 'Layanan Aduan RekLaLin';
export const AGENCY_NAME = 'Dinas Perhubungan Kabupaten Banyumas';
const APP_BLUE = '#2C7BE5';

/** Header situs web (mengikuti tampilan beranda aplikasi): logo, nama, menu, tombol Masuk. */
export const SiteHeader: React.FC<{height?: number; nav?: boolean; action?: boolean}> = ({height = 92, nav = true, action = true}) => (
  <div style={{height, background: C.navy2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${height * 0.7}px`, flexShrink: 0}}>
    <div style={{display: 'flex', alignItems: 'center', gap: height * 0.18}}>
      <BrandMark size={height * 0.7} />
      <div>
        <div style={{fontSize: height * 0.26, fontWeight: 900, color: C.white, lineHeight: 1.15}}>{APP_NAME}</div>
        <div style={{fontSize: height * 0.14, fontWeight: 600, color: '#C5D8E6', marginTop: height * 0.03}}>{AGENCY_NAME}</div>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: height * 0.36}}>
      {nav && ['Beranda', 'Layanan', 'Proses', 'Informasi'].map((n) => <div key={n} style={{fontSize: height * 0.17, fontWeight: 800, color: C.white}}>{n}</div>)}
      {action && <div style={{padding: `${height * 0.17}px ${height * 0.3}px`, borderRadius: height * 0.12, background: APP_BLUE, color: C.white, fontSize: height * 0.17, fontWeight: 900}}>Masuk</div>}
    </div>
  </div>
);

export const Pill: React.FC<{children: React.ReactNode; light?: boolean; color?: string}> = ({children, light = false, color}) => (
  <div
    style={{
      display: 'inline-block',
      padding: '12px 19px',
      borderRadius: 999,
      background: light ? 'rgba(23,105,170,.09)' : 'rgba(56,195,210,.12)',
      border: `1px solid ${light ? 'rgba(23,105,170,.18)' : 'rgba(56,195,210,.30)'}`,
      color: color ?? (light ? C.blue : C.cyan),
      fontSize: 18,
      fontWeight: 800,
      letterSpacing: 1,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </div>
);

export const Check: React.FC<{color?: string; size?: number}> = ({color = C.green, size = 30}) => (
  <div style={{width: size, height: size, borderRadius: size / 2, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: size * 0.63, flexShrink: 0}}>✓</div>
);

/** Penanda merek kecil di pojok kanan atas, pengganti footer lama. */
export const Watermark: React.FC<{dark?: boolean}> = ({dark = false}) => {
  const f = useCurrentFrame();
  const vertical = useVertical();
  return (
    <div style={{position: 'absolute', top: vertical ? 150 : 36, ...(vertical ? {left: SAFE.side} : {right: 64}), display: 'flex', alignItems: 'center', gap: 12, opacity: fadeIn(f, 6, 15) * 0.9}}>
      <BrandMark size={vertical ? 46 : 38} />
      <div style={{fontSize: vertical ? 28 : 22, fontWeight: 900, letterSpacing: -0.3, color: dark ? C.white : C.ink}}>{APP_NAME}</div>
    </div>
  );
};

/** Subtitle narasi. Memudahkan pemeriksaan sinkron dengan voice-over. */
export const Subtitle: React.FC<{text: string; delay?: number}> = ({text, delay = 6}) => {
  const f = useCurrentFrame();
  const vertical = useVertical();
  if (!FEATURES.subtitles) return null;
  const box: React.CSSProperties = vertical ? {top: SAFE.subtitleTop, alignItems: 'flex-start'} : {bottom: 44};
  return (
    <div style={{position: 'absolute', left: 0, right: 0, display: 'flex', justifyContent: 'center', ...box, opacity: ease(f, delay, delay + 14, 0, 1), transform: `translateY(${ease(f, delay, delay + 14, 12, 0)}px)`}}>
      <div style={{maxWidth: vertical ? 940 : 1480, padding: vertical ? '16px 30px' : '13px 34px', borderRadius: 18, background: 'rgba(7,27,51,.88)', color: C.white, fontSize: vertical ? 36 : 28, fontWeight: 700, textAlign: 'center', lineHeight: 1.3, boxShadow: '0 12px 34px rgba(0,0,0,.25)'}}>{text}</div>
    </div>
  );
};

export type EnterKind = 'fade' | 'slideRight' | 'slideUp' | 'circle' | 'zoom' | 'diagonal' | 'sweep' | 'none';

/**
 * Pembungkus adegan. Adegan baru berada di atas adegan lama (yang masih tampil selama OVERLAP frame),
 * lalu terbuka dengan transisi masuk yang dipilih.
 */
export const SceneFrame: React.FC<{enter: EnterKind; children: React.ReactNode}> = ({enter, children}) => {
  const f = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const t = useSmooth(f, 0, OVERLAP);
  const style: React.CSSProperties = {};
  let overlay: React.ReactNode = null;
  if (enter === 'fade') style.opacity = t;
  if (enter === 'slideRight') {
    style.transform = `translateX(${(1 - t) * width}px)`;
    style.boxShadow = '-40px 0 90px rgba(0,0,0,.28)';
  }
  if (enter === 'slideUp') {
    style.transform = `translateY(${(1 - t) * height}px)`;
    style.boxShadow = '0 -40px 90px rgba(0,0,0,.28)';
  }
  if (enter === 'circle') style.clipPath = `circle(${t * Math.hypot(width, height) * 0.54}px at 50% 50%)`;
  if (enter === 'zoom') {
    style.opacity = t;
    style.transform = `scale(${1.1 - t * 0.1})`;
  }
  if (enter === 'diagonal') {
    const p = t * 140;
    style.clipPath = `polygon(0 0, ${p}% 0, ${p - 40}% 100%, 0 100%)`;
  }
  if (enter === 'sweep') {
    style.opacity = ease(f, 0, 10, 0, 1);
    const x = interpolate(f, [0, OVERLAP], [-30, 130], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    overlay = (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: t < 1 ? 1 : 0,
          background: `linear-gradient(105deg, transparent ${x - 14}%, rgba(255,255,255,.55) ${x}%, transparent ${x + 14}%)`,
        }}
      />
    );
  }
  return (
    <AbsoluteFill style={style}>
      {children}
      {overlay}
    </AbsoluteFill>
  );
};

/** Pointer/kursor yang berpindah antar titik dan menampilkan efek klik. */
export const Cursor: React.FC<{frame: number; path: ReadonlyArray<readonly [number, number, number]>; clicks?: number[]}> = ({frame, path, clicks = []}) => {
  const {x, y} = pathAt(frame, path);
  const visible = fadeIn(frame, path[0][0], 8);
  return (
    <div style={{position: 'absolute', left: x, top: y, opacity: visible, pointerEvents: 'none', zIndex: 20}}>
      {clicks.map((c) => {
        const k = frame - c;
        if (k < 0 || k > 16) return null;
        return <div key={c} style={{position: 'absolute', left: -22, top: -22, width: 44, height: 44, borderRadius: '50%', border: `3px solid ${C.cyan}`, opacity: 1 - k / 16, transform: `scale(${0.4 + k / 16})`}} />;
      })}
      <svg width="34" height="40" viewBox="0 0 34 40" style={{filter: 'drop-shadow(0 4px 6px rgba(0,0,0,.3))'}}>
        <path d="M4 3L4 30L11 24L16 36L21 34L16 22L26 22Z" fill="white" stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

/** Kartu notifikasi yang masuk dari atas/kanan. */
export const Notification: React.FC<{frame: number; delay: number; title: string; sub?: string; accent?: string; width?: number}> = ({frame, delay, title, sub, accent = C.cyan, width = 420}) => {
  const s = useSpr(frame, delay, SPRING_PRESETS.icon.damping, SPRING_PRESETS.icon.stiffness);
  const o = fadeIn(frame, delay, 8);
  return (
    <div style={{width, display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderRadius: 20, background: 'rgba(255,255,255,.98)', boxShadow: '0 18px 44px rgba(0,0,0,.22)', opacity: o, transform: `translateY(${(1 - s) * -30}px) scale(${0.92 + s * 0.08})`}}>
      <div style={{position: 'relative', width: 44, height: 44, borderRadius: 14, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3a6 6 0 0 0-6 6v4l-2 3h16l-2-3V9a6 6 0 0 0-6-6Z" fill="white" /><circle cx="12" cy="20" r="2" fill="white" /></svg>
        <div style={{position: 'absolute', right: -3, top: -3, width: 14, height: 14, borderRadius: 7, background: C.amber, border: '2px solid white', transform: `scale(${1 + pulse(frame, 30) * 0.25})`}} />
      </div>
      <div>
        <div style={{fontSize: 20, fontWeight: 900, color: C.ink, lineHeight: 1.2}}>{title}</div>
        {sub ? <div style={{fontSize: 15, color: C.slate, marginTop: 3, fontWeight: 600}}>{sub}</div> : null}
      </div>
    </div>
  );
};

/** Ikon dokumen kecil. */
export const DocIcon: React.FC<{size?: number; color?: string; lines?: number}> = ({size = 64, color = C.blue, lines = 3}) => (
  <svg width={size} height={size * 1.25} viewBox="0 0 64 80" fill="none" style={{filter: 'drop-shadow(0 8px 14px rgba(0,0,0,.18))'}}>
    <path d="M6 6a4 4 0 0 1 4-4h30l18 18v54a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V6Z" fill="white" stroke={C.line} strokeWidth="2" />
    <path d="M40 2l18 18H44a4 4 0 0 1-4-4V2Z" fill={C.pale} />
    <rect x="14" y="26" width="26" height="5" rx="2.5" fill={color} />
    {Array.from({length: lines}).map((_, i) => (
      <rect key={i} x="14" y={38 + i * 9} width={i === lines - 1 ? 22 : 36} height="4" rx="2" fill="#D6E3E9" />
    ))}
  </svg>
);

/** Stempel/indikator persetujuan dengan animasi pop. */
export const Stamp: React.FC<{frame: number; delay: number; label: string; color?: string; size?: number}> = ({frame, delay, label, color = C.green, size = 96}) => {
  const s = useSpr(frame, delay, 14, 150);
  return (
    <div style={{width: size, height: size, borderRadius: '50%', border: `4px solid ${color}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color, background: 'rgba(255,255,255,.94)', opacity: fadeIn(frame, delay, 5), transform: `scale(${0.4 + s * 0.6}) rotate(${(1 - s) * -24 - 8}deg)`, boxShadow: '0 10px 24px rgba(0,0,0,.16)'}}>
      <div style={{fontSize: size * 0.34, fontWeight: 900, lineHeight: 1}}>✓</div>
      <div style={{fontSize: size * 0.135, fontWeight: 900, letterSpacing: 0.5, marginTop: 3, textAlign: 'center', lineHeight: 1.05}}>{label}</div>
    </div>
  );
};

/** Label jabatan di bawah karakter. */
export const RoleTag: React.FC<{title: string; sub?: string; dark?: boolean; align?: 'center' | 'left'}> = ({title, sub, dark = false, align = 'center'}) => (
  <div style={{textAlign: align}}>
    <div style={{fontSize: 22, fontWeight: 900, color: dark ? C.white : C.ink, lineHeight: 1.15}}>{title}</div>
    {sub ? <div style={{fontSize: 16, fontWeight: 700, color: dark ? C.muted : C.slate, marginTop: 4, lineHeight: 1.25}}>{sub}</div> : null}
  </div>
);

/**
 * Gerak keluar adegan lama saat adegan baru menutupinya (efek kedalaman):
 * sedikit mengecil, bergeser, dan meredup. Berjalan pada OVERLAP frame setelah `duration`.
 */
export const SceneExit: React.FC<{duration: number; children: React.ReactNode}> = ({duration, children}) => {
  const f = useCurrentFrame();
  const p = useSmooth(f, duration, OVERLAP);
  return (
    <AbsoluteFill style={{transform: `translateX(${-70 * p}px) scale(${1 - 0.04 * p})`, transformOrigin: 'center'}}>
      {children}
      <AbsoluteFill style={{background: C.navy, opacity: 0.4 * p, pointerEvents: 'none'}} />
    </AbsoluteFill>
  );
};
