import React from 'react';
import {C} from '../theme';
import {BrandMark} from './Common';

/** Meja kerja. (x, y) = sudut kiri-atas permukaan meja. */
export const Desk: React.FC<{x: number; y: number; w: number; h?: number; dark?: boolean}> = ({x, y, w, h = 150, dark = true}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w}}>
    <div style={{height: 18, borderRadius: 9, background: dark ? '#EAF4F8' : '#FFFFFF', boxShadow: '0 10px 24px rgba(0,0,0,.2)'}} />
    <div style={{marginLeft: 14, marginRight: 14, height: h, borderRadius: '0 0 14px 14px', background: dark ? 'linear-gradient(#5E8DAA,#46718E)' : 'linear-gradient(#9CC1D3,#86AEC3)'}} />
  </div>
);

/** Laptop dilihat dari belakang (tutup menghadap penonton). (x, y) = sudut kiri-atas tutup. */
export const LaptopBack: React.FC<{x: number; y: number; w?: number}> = ({x, y, w = 230}) => {
  const h = w * 0.64;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h + 12}}>
      <div style={{width: w, height: h, borderRadius: 12, background: 'linear-gradient(145deg,#C9DCE5,#A9C4D2)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 22px rgba(0,0,0,.2)'}}>
        <BrandMark size={Math.round(w * 0.2)} />
      </div>
      <div style={{width: w + 26, marginLeft: -13, height: 12, borderRadius: '0 0 12px 12px', background: '#8FB0C1'}} />
    </div>
  );
};

/** Kursi sederhana di belakang karakter yang duduk. (x, y) = kiri-atas sandaran. */
export const Chair: React.FC<{x: number; y: number}> = ({x, y}) => (
  <div style={{position: 'absolute', left: x, top: y, width: 130, height: 170, borderRadius: 40, background: '#35607F', opacity: 0.9}} />
);

/** Peta ilustrasi (bukan peta geografis nyata). */
export const MapSvg: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 760 540" preserveAspectRatio="xMidYMid slice" fill="none" style={{display: 'block'}}>
    <rect width="760" height="540" fill="#E6F0F2" />
    {Array.from({length: 10}).map((_, i) => <path key={`v${i}`} d={`M${40 + i * 78} 0V540`} stroke="#C4D9DE" strokeWidth="12" />)}
    {Array.from({length: 8}).map((_, i) => <path key={`h${i}`} d={`M0 ${35 + i * 70}H760`} stroke="#C4D9DE" strokeWidth="11" />)}
    <path d="M-30 410C130 350 140 220 270 250C410 282 455 80 790 115" stroke="#FFFFFF" strokeWidth="34" />
    <path d="M-30 410C130 350 140 220 270 250C410 282 455 80 790 115" stroke="#88AEBB" strokeWidth="3" strokeDasharray="12 13" />
    <path d="M90 -20C175 95 240 150 330 180C440 220 520 330 620 560" stroke="#FFFFFF" strokeWidth="25" />
    <path d="M90 -20C175 95 240 150 330 180C440 220 520 330 620 560" stroke="#A8C8D0" strokeWidth="2" strokeDasharray="10 10" />
    <rect x="70" y="72" width="160" height="62" rx="16" fill="#C6E2D8" />
    <rect x="520" y="350" width="170" height="82" rx="18" fill="#C6E2D8" />
    <rect x="310" y="30" width="110" height="52" rx="14" fill="#C6E2D8" />
  </svg>
);

/** Penanda lokasi dengan jatuh-memantul dan lingkaran pulse. (x, y) = ujung bawah penanda. */
export const MapPin: React.FC<{x: number; y: number; frame: number; delay: number; size?: number; color?: string}> = ({x, y, frame, delay, size = 56, color = C.blue}) => {
  const k = frame - delay;
  const drop = k < 0 ? -120 : k < 14 ? -120 * (1 - (k / 14) ** 2) : k < 22 ? -14 * Math.sin(((k - 14) / 8) * Math.PI) : 0;
  const ringT = k < 22 ? 0 : ((k - 22) % 48) / 48;
  return (
    <div style={{position: 'absolute', left: x, top: y, opacity: k < 0 ? 0 : 1}}>
      {k >= 22 && <div style={{position: 'absolute', left: -size * 1.1, top: -size * 0.55, width: size * 2.2, height: size * 1.1, borderRadius: '50%', border: `3px solid ${color}`, opacity: 0.55 * (1 - ringT), transform: `scale(${0.4 + ringT * 0.9})`}} />}
      <div style={{position: 'absolute', left: -size / 2, top: -size * 1.35 + drop, width: size, height: size, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', background: color, border: '5px solid white', boxShadow: '0 10px 20px rgba(0,0,0,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{width: size * 0.3, height: size * 0.3, borderRadius: '50%', background: 'white'}} />
      </div>
    </div>
  );
};

/** Garis rute yang tergambar bertahap pada peta (viewBox 760x540). */
export const RouteLine: React.FC<{progress: number; d: string; color?: string}> = ({progress, d, color = C.blue}) => (
  <svg viewBox="0 0 760 540" preserveAspectRatio="xMidYMid slice" style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}} fill="none">
    <path d={d} stroke={color} strokeWidth="9" strokeLinecap="round" strokeDasharray="1000" strokeDashoffset={1000 * (1 - progress)} pathLength={1000} />
  </svg>
);

/** Tiang rambu lalu lintas sederhana. (x, y) = dasar tiang. */
export const SignPost: React.FC<{x: number; y: number; scale?: number; tilt?: number}> = ({x, y, scale = 1, tilt = 0}) => (
  <svg width={120 * scale} height={260 * scale} viewBox="0 0 120 260" style={{position: 'absolute', left: x - 60 * scale, top: y - 260 * scale, overflow: 'visible', transform: `rotate(${tilt}deg)`, transformOrigin: '60px 260px'}}>
    <rect x="55" y="70" width="10" height="190" rx="4" fill="#9FB6C4" />
    <rect x="15" y="4" width="90" height="82" rx="14" fill="white" stroke={C.blue} strokeWidth="6" />
    <path d="M60 18L88 66H32Z" fill={C.amber} stroke={C.ink} strokeWidth="4" strokeLinejoin="round" />
    <rect x="57" y="34" width="6" height="18" rx="3" fill={C.ink} />
    <circle cx="60" cy="58" r="3.5" fill={C.ink} />
    <rect x="40" y="252" width="40" height="8" rx="4" fill="#7E97A6" />
  </svg>
);

/** Kerucut lalu lintas. (x, y) = dasar. */
export const Cone: React.FC<{x: number; y: number; scale?: number}> = ({x, y, scale = 1}) => (
  <svg width={46 * scale} height={60 * scale} viewBox="0 0 46 60" style={{position: 'absolute', left: x - 23 * scale, top: y - 60 * scale}}>
    <path d="M23 2L38 50H8Z" fill={C.amber} />
    <path d="M17 24H29L32 34H14Z" fill="white" />
    <rect x="2" y="50" width="42" height="8" rx="3" fill={C.ink} />
  </svg>
);

/** Tenda kegiatan warga di tepi jalan. (x, y) = dasar tiang kiri. */
export const Tent: React.FC<{x: number; y: number; scale?: number}> = ({x, y, scale = 1}) => (
  <svg width={190 * scale} height={150 * scale} viewBox="0 0 190 150" style={{position: 'absolute', left: x, top: y - 150 * scale}}>
    <rect x="14" y="40" width="6" height="110" fill="#8FA9B8" />
    <rect x="170" y="40" width="6" height="110" fill="#8FA9B8" />
    <path d="M4 44L95 4L186 44Z" fill={C.blue} />
    <path d="M4 44H186V58H4Z" fill={C.cyan} />
    <path d="M30 58V74M60 58V74M90 58V74M120 58V74M150 58V74" stroke="white" strokeWidth="3" opacity=".5" />
  </svg>
);

/** Strip jalan dengan marka putus-putus yang bergerak halus. (top = tepi atas jalan). */
export const RoadStrip: React.FC<{top: number; height?: number; frame: number; speed?: number; left?: number; width?: number}> = ({top, height = 130, frame, speed = 7, left = 0, width = 1920}) => (
  <div style={{position: 'absolute', left, top, width, height, background: 'linear-gradient(#17405F,#0F3050)', borderTop: '3px solid rgba(139,196,213,.55)', borderBottom: '3px solid rgba(139,196,213,.35)'}}>
    <div style={{position: 'absolute', left: 0, right: 0, top: height / 2 - 4, height: 8, backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,.85) 0 80px, transparent 80px 170px)', backgroundPosition: `${-frame * speed}px 0`}} />
  </div>
);

/** Kartu putih generik untuk mockup. */
export const Card: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div style={{background: 'rgba(255,255,255,.97)', borderRadius: 28, boxShadow: '0 22px 60px rgba(0,0,0,.18)', ...style}}>{children}</div>
);
