import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';

/**
 * Karakter vektor 2D untuk seluruh video. Satu komponen, lima peran, satu gaya gambar.
 * Semua gerakan dihitung dari frame (deterministik), tanpa timer atau angka acak.
 *
 * Sistem koordinat internal: viewBox 0 0 180 340, kepala berpusat di (90, 54), tanah di y = 332.
 * Sudut lengan: a = angkat ke luar (derajat, 0 = menggantung), b = tekuk siku ke dalam.
 */
export type Role = 'warga' | 'admin' | 'kadis' | 'kabid' | 'teknisi';
export type ItemKind = 'none' | 'phone' | 'doc' | 'camera';
export type Mood = 'neutral' | 'smile' | 'happy';
export type View = 'full' | 'half' | 'bust';

export type Pose = {
  armL: readonly [number, number];
  armR: readonly [number, number];
  itemL: ItemKind;
  itemR: ItemKind;
  /** Fase langkah dalam radian. Kosongkan untuk berdiri. */
  walk?: number;
  /** Seberapa kuat gerak berjalan, 0..1 (untuk berhenti dengan halus). */
  walkAmp: number;
  /** Anggukan kepala dalam derajat. */
  nod: number;
  mood: Mood;
  /** Arah pandang -1 (kiri) .. 1 (kanan). */
  look: number;
  idle: boolean;
};

const DEFAULT_POSE: Pose = {armL: [6, 8], armR: [6, 8], itemL: 'none', itemR: 'none', walkAmp: 1, nod: 0, mood: 'smile', look: 0, idle: true};

type Look = {
  skin: string;
  hair: string;
  hairStyle: 'bun' | 'short' | 'parted' | 'hijab' | 'helmet';
  top: string;
  sleeve: string;
  shortSleeve: boolean;
  pants: string;
  shoes: string;
  glasses?: boolean;
  seed: number;
};

const LOOKS: Record<Role, Look> = {
  warga: {skin: '#E6B08A', hair: '#2B2230', hairStyle: 'bun', top: C.cyan, sleeve: C.cyan, shortSleeve: true, pants: '#2A4F73', shoes: '#F5FAFC', seed: 3},
  admin: {skin: '#D9A173', hair: C.blue, hairStyle: 'hijab', top: '#DCEBF4', sleeve: '#DCEBF4', shortSleeve: false, pants: '#2B5278', shoes: '#DCE7ED', seed: 17},
  kadis: {skin: '#D2A07A', hair: '#9AA8B3', hairStyle: 'short', top: '#2A5C8C', sleeve: '#2A5C8C', shortSleeve: false, pants: '#244B73', shoes: '#DCE7ED', seed: 29},
  kabid: {skin: '#BE8458', hair: '#1C1A22', hairStyle: 'parted', top: '#3A7CA8', sleeve: '#3A7CA8', shortSleeve: false, pants: '#244B73', shoes: '#DCE7ED', glasses: true, seed: 41},
  teknisi: {skin: '#C48F66', hair: '#2B2230', hairStyle: 'helmet', top: C.blue, sleeve: C.blue, shortSleeve: false, pants: '#2A4F73', shoes: '#B07D32', seed: 67},
};

const VIEWBOX: Record<View, {box: string; w: number; h: number}> = {
  full: {box: '0 0 180 340', w: 180, h: 340},
  half: {box: '0 0 180 236', w: 180, h: 236},
  bust: {box: '26 6 128 148', w: 128, h: 148},
};

const Item: React.FC<{kind: ItemKind}> = ({kind}) => {
  if (kind === 'phone')
    return (
      <g transform="translate(-11 -32)">
        <rect width="22" height="38" rx="5" fill={C.navy} stroke="#8BC4D5" strokeWidth="1.5" />
        <rect x="2.5" y="4" width="17" height="27" rx="3" fill={C.cyan} opacity=".92" />
        <rect x="5" y="9" width="11" height="3" rx="1.5" fill="white" opacity=".85" />
        <rect x="5" y="15" width="8" height="3" rx="1.5" fill="white" opacity=".6" />
      </g>
    );
  if (kind === 'doc')
    return (
      <g transform="translate(-17 -38)">
        <rect width="34" height="44" rx="3" fill="white" stroke="#C9DCE5" strokeWidth="1.5" />
        <rect x="5" y="6" width="20" height="5" rx="2" fill={C.blue} />
        <rect x="5" y="16" width="24" height="3" rx="1.5" fill="#D6E3E9" />
        <rect x="5" y="22" width="24" height="3" rx="1.5" fill="#D6E3E9" />
        <rect x="5" y="28" width="16" height="3" rx="1.5" fill="#D6E3E9" />
      </g>
    );
  if (kind === 'camera')
    return (
      <g transform="translate(-17 -26)">
        <rect y="2" width="34" height="22" rx="4" fill={C.navy} />
        <rect x="5" y="-3" width="11" height="6" rx="2" fill={C.navy} />
        <circle cx="17" cy="13" r="7.5" fill={C.cyan} stroke="white" strokeWidth="2" />
        <circle cx="29" cy="7" r="1.8" fill={C.amber} />
      </g>
    );
  return null;
};

type ArmProps = {side: 'L' | 'R'; sx: number; sy: number; a: number; b: number; look: Look; item: ItemKind};
const Arm: React.FC<ArmProps> = ({side, sx, sy, a, b, look, item}) => {
  const left = side === 'L';
  const outer = left ? a : -a;
  const inner = left ? -b : b;
  const counter = -(outer + inner);
  const forearmColor = look.shortSleeve ? look.skin : look.sleeve;
  return (
    <g transform={`translate(${sx} ${sy}) rotate(${outer})`}>
      <rect x={-8.5} y={-6} width={17} height={58} rx={8.5} fill={look.sleeve} />
      <g transform={`translate(0 50) rotate(${inner})`}>
        <rect x={-7.5} y={-4} width={15} height={50} rx={7.5} fill={forearmColor} />
        <g transform={`translate(0 48) rotate(${counter})`}>
          <Item kind={item} />
          <circle r={8.5} fill={look.skin} />
        </g>
      </g>
    </g>
  );
};

const Hair: React.FC<{look: Look; front: boolean}> = ({look, front}) => {
  const h = look.hair;
  if (look.hairStyle === 'bun' && !front) return <circle cx="90" cy="21" r="11" fill={h} />;
  if (!front) return null;
  if (look.hairStyle === 'short' || look.hairStyle === 'bun')
    return <path d="M65 55Q60 24 90 24Q120 24 115 55Q111 39 96 37Q82 41 71 39Q67 43 65 55Z" fill={h} />;
  if (look.hairStyle === 'parted')
    return <path d="M65 55Q58 24 92 23Q122 25 115 55Q112 41 100 37Q84 35 68 45Z" fill={h} />;
  if (look.hairStyle === 'helmet')
    return (
      <g>
        <path d="M66 56Q64 46 68 44L112 44Q116 46 114 56Q108 50 90 50Q72 50 66 56Z" fill={h} />
        <path d="M62 47Q62 19 90 19Q118 19 118 47Z" fill="#F5FAFC" />
        <rect x="86" y="19" width="8" height="28" fill={C.amber} />
        <rect x="57" y="43" width="66" height="9" rx="4.5" fill="#DCEBF4" />
      </g>
    );
  return null;
};

const Torso: React.FC<{role: Role; look: Look}> = ({role, look}) => {
  const body = 'M60 104Q60 88 78 88H102Q120 88 120 104L117 198Q90 204 63 198Z';
  return (
    <g>
      <path d={body} fill={look.top} />
      {role === 'warga' && <path d="M80 88Q90 102 100 88Z" fill={look.skin} />}
      {role === 'admin' && (
        <g>
          <path d="M80 90L90 134L100 90" stroke={C.cyan} strokeWidth="3" fill="none" strokeLinejoin="round" />
          <rect x="82" y="130" width="16" height="22" rx="3" fill="white" stroke={C.blue} strokeWidth="1.5" />
          <rect x="85" y="135" width="10" height="3" rx="1.5" fill={C.blue} />
        </g>
      )}
      {(role === 'kadis' || role === 'kabid') && (
        <g>
          <path d="M79 88L90 122L101 88Z" fill="white" />
          <path d="M79 88L90 122L70 146L66 100Z" fill="rgba(0,0,0,.16)" />
          <path d="M101 88L90 122L110 146L114 100Z" fill="rgba(0,0,0,.16)" />
          <path d="M88 96H92L95 110L90 150L85 110Z" fill={role === 'kadis' ? C.amber : C.navy} />
          <rect x="94" y="130" width="14" height="3" rx="1.5" fill="rgba(255,255,255,.35)" />
        </g>
      )}
      {role === 'teknisi' && (
        <g>
          <path d="M62 102Q62 90 78 90H87L86 198H65Z" fill={C.amber} />
          <path d="M118 102Q118 90 102 90H93L94 198H115Z" fill={C.amber} />
          <rect x="63" y="140" width="24" height="9" fill="#F5FAFC" />
          <rect x="93" y="140" width="24" height="9" fill="#F5FAFC" />
          <rect x="64" y="168" width="22" height="9" fill="#F5FAFC" />
          <rect x="94" y="168" width="22" height="9" fill="#F5FAFC" />
        </g>
      )}
    </g>
  );
};

const Face: React.FC<{look: Look; mood: Mood; blink: number; lookDir: number}> = ({look, mood, blink, lookDir}) => (
  <g>
    <ellipse cx="90" cy="55" rx="24" ry="27" fill={look.skin} />
    {look.hairStyle !== 'hijab' && (
      <>
        <circle cx="66" cy="58" r="5" fill={look.skin} />
        <circle cx="114" cy="58" r="5" fill={look.skin} />
      </>
    )}
    <ellipse cx={81 + lookDir * 1.6} cy="56" rx="2.7" ry={3.1 * blink} fill={C.navy} />
    <ellipse cx={99 + lookDir * 1.6} cy="56" rx="2.7" ry={3.1 * blink} fill={C.navy} />
    <path d="M75 49Q81 46 87 48M93 48Q99 46 105 49" stroke={look.hairStyle === 'hijab' ? '#3B2A24' : look.hair} strokeWidth="2.2" strokeLinecap="round" fill="none" />
    {mood === 'neutral' && <path d="M83 68Q90 70 97 68" stroke="#7A3B3B" strokeWidth="2.4" strokeLinecap="round" fill="none" />}
    {mood === 'smile' && <path d="M82 66Q90 73 98 66" stroke="#7A3B3B" strokeWidth="2.6" strokeLinecap="round" fill="none" />}
    {mood === 'happy' && (
      <g>
        <path d="M80 65Q90 79 100 65Z" fill="#8B2F3C" />
        <path d="M84 66.5H96" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <circle cx="74" cy="64" r="4.5" fill="#F29C9C" opacity=".55" />
        <circle cx="106" cy="64" r="4.5" fill="#F29C9C" opacity=".55" />
      </g>
    )}
    {look.glasses && (
      <g stroke={C.navy} strokeWidth="2.2" fill="rgba(255,255,255,.12)">
        <circle cx="81" cy="56" r="8.5" />
        <circle cx="99" cy="56" r="8.5" />
        <path d="M89.5 55H90.5" />
      </g>
    )}
  </g>
);

export type PersonProps = {
  role: Role;
  /** Posisi kiri-atas area gambar dalam piksel (relatif terhadap elemen induk). */
  x?: number;
  y?: number;
  scale?: number;
  flip?: boolean;
  view?: View;
  pose?: Partial<Pose>;
  opacity?: number;
};

export const Person: React.FC<PersonProps> = ({role, x = 0, y = 0, scale = 1, flip = false, view = 'full', pose, opacity = 1}) => {
  const f = useCurrentFrame();
  const look = LOOKS[role];
  const p: Pose = {...DEFAULT_POSE, ...pose};
  const vb = VIEWBOX[view];

  const idle = p.idle ? Math.sin((f + look.seed * 7) / 17) : 0;
  const amp = p.walk === undefined ? 0 : p.walkAmp;
  const swing = Math.sin(p.walk ?? 0) * amp;
  const bob = -Math.abs(Math.sin(p.walk ?? 0)) * 4 * amp + idle * 0.9;
  const blink = (f + look.seed) % 96 < 4 ? 0.12 : 1;

  const armLa = p.armL[0] + swing * 20 + idle * 1.2;
  const armRa = p.armR[0] - swing * 20 - idle * 1.2;
  const legL = swing * 24;
  const legR = -swing * 24;

  const showLegs = view === 'full';
  const hijab = look.hairStyle === 'hijab';

  return (
    <svg
      width={vb.w * scale}
      height={vb.h * scale}
      viewBox={vb.box}
      style={{position: 'absolute', left: x, top: y, overflow: 'visible', opacity, transform: flip ? 'scaleX(-1)' : undefined}}
    >
      {showLegs && <ellipse cx="90" cy="334" rx="56" ry="7" fill="rgba(0,0,0,.2)" />}
      <g transform={`translate(0 ${bob})`}>
        {showLegs && (
          <g>
            <g transform={`translate(76 192) rotate(${legL})`}>
              <rect x="-13" y="0" width="26" height="130" rx="12" fill={look.pants} />
              <path d="M-15 124H17Q22 136 14 142H-15Q-19 133 -15 124Z" fill={look.shoes} />
            </g>
            <g transform={`translate(104 192) rotate(${legR})`}>
              <rect x="-13" y="0" width="26" height="130" rx="12" fill={look.pants} />
              <path d="M-17 124H15Q19 133 15 142H-14Q-22 136 -17 124Z" fill={look.shoes} />
            </g>
          </g>
        )}
        <Hair look={look} front={false} />
        {hijab && <path d="M58 56Q55 18 90 18Q125 18 122 56Q124 84 114 104H66Q56 84 58 56Z" fill={look.hair} />}
        {!hijab && <rect x="83" y="76" width="14" height="18" rx="5" fill={look.skin} />}
        <Torso role={role} look={look} />
        {hijab && <path d="M58 92Q90 118 122 92L127 120Q90 136 53 120Z" fill={look.hair} />}
        <Arm side="L" sx={64} sy={102} a={armLa} b={p.armL[1]} look={look} item={p.itemL} />
        <Arm side="R" sx={116} sy={102} a={armRa} b={p.armR[1]} look={look} item={p.itemR} />
        <g transform={`rotate(${p.nod} 90 84)`}>
          <Face look={look} mood={p.mood} blink={blink} lookDir={p.look} />
          <Hair look={look} front />
          {hijab && <path d="M66 44Q66 26 90 26Q114 26 114 44Q104 36 90 36Q76 36 66 44Z" fill={look.hair} />}
        </g>
      </g>
    </svg>
  );
};

/** Ukuran piksel area gambar karakter pada skala tertentu. */
export const personSize = (view: View, scale: number) => ({w: VIEWBOX[view].w * scale, h: VIEWBOX[view].h * scale});

/** Nama jabatan resmi untuk label. */
export const ROLE_LABEL: Record<Role, string> = {
  warga: 'Warga',
  admin: 'Admin',
  kadis: 'Kepala Dinas',
  kabid: 'Kepala Bidang',
  teknisi: 'Teknisi',
};

/** Bulatan avatar (bust) untuk diagram alur. */
export const Avatar: React.FC<{role: Role; size?: number; ring?: string; glow?: number}> = ({role, size = 88, ring = 'transparent', glow = 0}) => {
  const vb = VIEWBOX.bust;
  const scale = (size * 1.05) / vb.w;
  return (
    <div style={{width: size, height: size, borderRadius: '50%', background: 'linear-gradient(160deg,#F4FAFC,#CFE5EE)', border: `4px solid ${ring}`, position: 'relative', overflow: 'hidden', flexShrink: 0, boxShadow: glow > 0 ? `0 0 0 ${glow * 10}px rgba(56,195,210,${0.28 * (1 - glow)})` : '0 8px 20px rgba(7,27,51,.14)'}}>
      <div style={{position: 'absolute', left: (size - vb.w * scale) / 2 - 4, top: 4}}>
        <Person role={role} view="bust" scale={scale} pose={{mood: 'smile'}} />
      </div>
    </div>
  );
};
