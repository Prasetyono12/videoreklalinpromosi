/**
 * Konfigurasi pusat video RekLaLin.
 * Semua angka frame/durasi, penanda fitur, dan pengaturan audio ada di sini
 * supaya Root.tsx, komposisi, dan adegan memakai sumber yang sama.
 */
export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

/**
 * Dua format keluaran dengan isi dan durasi yang sama.
 * - vertical: 9:16 untuk TikTok, Instagram Reels/Stories, YouTube Shorts (format utama promosi).
 * - landscape: 16:9 untuk YouTube, presentasi, dan layar lebar.
 */
export const FORMATS = {
  vertical: {id: 'RekLaLinPromoVertical', width: 1080, height: 1920},
  landscape: {id: 'RekLaLinPromo', width: WIDTH, height: HEIGHT},
} as const;

/**
 * Area aman format vertikal (piksel pada kanvas 1080x1920): elemen penting berada di antara
 * SAFE_TOP dan SAFE_BOTTOM supaya tidak tertutup antarmuka TikTok/Reels (nama akun, tombol, keterangan).
 */
export const SAFE = {top: 230, bottom: 1410, subtitleTop: 1440, side: 60};
export const TOTAL_FRAMES = 1650; // 55 detik x 30 fps

/** Jumlah frame adegan lama tetap tampil di bawah adegan baru saat transisi masuk. */
export const OVERLAP = 24;

export type SceneId =
  | 'intro'
  | 'services'
  | 'apply'
  | 'workflow'
  | 'technical'
  | 'review'
  | 'delivery'
  | 'survey';

export const SCENES: ReadonlyArray<{id: SceneId; from: number; duration: number; label: string}> = [
  {id: 'intro', from: 0, duration: 150, label: '00:00-00:05 Opening & pengenalan'},
  {id: 'services', from: 150, duration: 210, label: '00:05-00:12 Dua jenis layanan'},
  {id: 'apply', from: 360, duration: 240, label: '00:12-00:20 Pengajuan oleh Warga'},
  {id: 'workflow', from: 600, duration: 210, label: '00:20-00:27 Alur pelayanan & peran'},
  {id: 'technical', from: 810, duration: 210, label: '00:27-00:34 Pemeriksaan & pelaksanaan teknis'},
  {id: 'review', from: 1020, duration: 180, label: '00:34-00:40 Pemeriksaan berjenjang & revisi'},
  {id: 'delivery', from: 1200, duration: 210, label: '00:40-00:47 Dokumen hasil, QR Code'},
  {id: 'survey', from: 1410, duration: 240, label: '00:47-00:55 Survei kepuasan & closing'},
];

export const sceneOf = (id: SceneId) => {
  const s = SCENES.find((x) => x.id === id);
  if (!s) throw new Error(`Adegan tidak dikenal: ${id}`);
  return s;
};

/** Titik awal bagian closing di dalam adegan terakhir (frame lokal). 47s + 5s = 52s. */
export const CLOSING_START = 150;

/**
 * Penanda fitur. Isi `true` hanya jika fitur tersebut sudah terbukti aktif di aplikasi.
 * Nilai awal sengaja konservatif sesuai aturan akurasi proyek.
 */
export const FEATURES = {
  /** Tampilkan teks narasi sebagai subtitle di bagian bawah video. */
  subtitles: true,
  /** Chip format PDF/DOCX pada dokumen hasil (keluaran PDF dan DOCX tercantum pada laporan, Tabel II.4). */
  documentFormatChips: true,
  /** Paraf digital Kepala Bidang dan tanda tangan Kepala Dinas pada dokumen (laporan, Tabel II.4 butir 4). */
  officialSignatureMarks: true,
  /** Balasan ulasan oleh Admin (laporan, Tabel II.4 butir 7). */
  adminSurveyReply: true,
};

/**
 * VO menggunakan file di public/ dan dipercepat tipis agar selesai bersama video 55 detik.
 * Musik dan SFX tetap opsional.
 */
export const AUDIO = {
  music: {enabled: false, file: 'audio/musik-latar.mp3', volume: 0.22},
  voiceOver: {enabled: true, file: 'VO_Reklalin.mp3', volume: 1, playbackRate: 1.02},
  sfx: {
    enabled: false,
    volume: 0.5,
    cues: [
      {file: 'audio/sfx-whoosh.mp3', frame: 150},
      {file: 'audio/sfx-klik.mp3', frame: 360 + 196},
      {file: 'audio/sfx-notifikasi.mp3', frame: 360 + 206},
      {file: 'audio/sfx-whoosh.mp3', frame: 600},
      {file: 'audio/sfx-whoosh.mp3', frame: 810},
      {file: 'audio/sfx-whoosh.mp3', frame: 1020},
      {file: 'audio/sfx-digital.mp3', frame: 1200 + 100},
      {file: 'audio/sfx-penutup.mp3', frame: 1410 + 160},
    ],
  },
};
