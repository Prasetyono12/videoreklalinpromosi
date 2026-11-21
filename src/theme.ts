import {Easing, interpolate, spring, useVideoConfig} from 'remotion';

export const C = {
  navy: '#071B33',
  navy2: '#0B2948',
  blue: '#1769AA',
  cyan: '#38C3D2',
  pale: '#EAF4F8',
  white: '#FFFFFF',
  muted: '#A9C1D2',
  amber: '#F4B942',
  ink: '#10283F',
  green: '#39B98A',
  slate: '#557083',
  line: '#DCE8ED',
};

/**
 * Preset spring. Ubah angka di sini untuk mengatur kehalusan gerak seluruh video.
 * damping tinggi = tanpa pantulan; damping rendah = memantul.
 */
export const SPRING_PRESETS = {
  /** Transisi antar-adegan: tanpa pantulan, berhenti tepat di durasi yang ditentukan. */
  smooth: {damping: 200},
  /** Logo/brand mark: lembut, hampir tanpa pantulan. */
  logo: {damping: 22, stiffness: 80},
  /** Ikon, notifikasi, dan stempel: sedikit hidup tetapi tetap halus. */
  icon: {damping: 18, stiffness: 120},
} as const;

export const FONT = 'Arial, Helvetica, sans-serif';

const clampOpts = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const fadeIn = (frame: number, delay = 0, duration = 22) =>
  interpolate(frame - delay, [0, duration], [0, 1], {...clampOpts, easing: Easing.out(Easing.cubic)});

export const rise = (frame: number, delay = 0, distance = 34) =>
  interpolate(frame - delay, [0, 26], [distance, 0], {...clampOpts, easing: Easing.out(Easing.cubic)});

/** Interpolasi satu nilai dari frame `from` ke `to`, dibatasi (clamp) di kedua ujung. */
export const ease = (
  frame: number,
  from: number,
  to: number,
  a: number,
  b: number,
  easing: (t: number) => number = Easing.out(Easing.cubic),
) => interpolate(frame, [from, to], [a, b], {...clampOpts, easing});

export const easeInOut = (frame: number, from: number, to: number, a = 0, b = 1) =>
  ease(frame, from, to, a, b, Easing.inOut(Easing.cubic));

/** Teks yang seolah diketik. Deterministik: hanya bergantung pada frame. */
export const typed = (text: string, frame: number, start: number, charsPerFrame = 0.6) =>
  text.slice(0, Math.max(0, Math.min(text.length, Math.floor((frame - start) * charsPerFrame))));

/** Gelombang halus 0..1 untuk efek pulse. */
export const pulse = (frame: number, period = 40, offset = 0) =>
  0.5 + 0.5 * Math.sin(((frame + offset) / period) * Math.PI * 2);

/** Posisi sepanjang rangkaian titik [frame, x, y]. */
export const pathAt = (frame: number, pts: ReadonlyArray<readonly [number, number, number]>) => {
  const t = pts.map((p) => p[0]);
  const opts = {...clampOpts, easing: Easing.inOut(Easing.quad)} as const;
  return {
    x: interpolate(frame, t, pts.map((p) => p[1]), opts),
    y: interpolate(frame, t, pts.map((p) => p[2]), opts),
  };
};

/** Spring berbasis frame lokal. Mengembalikan 0 sebelum `delay`. */
export const useSpr = (frame: number, delay = 0, damping = 14, stiffness = 100) => {
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config: {damping, stiffness}});
};

/**
 * Posisi x yang melompat antar titik (mis. dokumen berpindah antar-aktor).
 * Setiap titik ditahan `dwell` frame lalu bergerak `travel` frame ke titik berikut.
 */
export const hop = (frame: number, start: number, xs: ReadonlyArray<number>, dwell = 4, travel = 10) => {
  const times: number[] = [];
  const vals: number[] = [];
  xs.forEach((x, i) => {
    const arrive = start + i * (dwell + travel);
    times.push(arrive, arrive + dwell);
    vals.push(x, x);
  });
  return interpolate(frame, times, vals, {...clampOpts, easing: Easing.inOut(Easing.cubic)});
};

/** Frame ketika titik ke-i tercapai oleh `hop`. */
export const hopArrive = (start: number, i: number, dwell = 4, travel = 10) => start + i * (dwell + travel);

/** 0..1 sementara setelah `at`, untuk efek denyut singkat. */
export const flash = (frame: number, at: number, duration = 16) => {
  const k = (frame - at) / duration;
  return k > 0 && k < 1 ? k : 0;
};

/**
 * Progres 0..1 berbasis spring yang pasti selesai dalam `durationInFrames` (tanpa pantulan).
 * Dipakai untuk transisi masuk/keluar adegan.
 */
export const useSmooth = (frame: number, delay = 0, durationInFrames = 24) => {
  const {fps} = useVideoConfig();
  return spring({frame: Math.max(0, frame - delay), fps, config: SPRING_PRESETS.smooth, durationInFrames});
};
