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
export const TOTAL_FRAMES = 1715; // 57,17 detik x 30 fps; memberi ruang bagi VO yang diperlambat

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
  {id: 'intro', from: 0, duration: 156, label: '00:00-00:05.2 Opening & pengenalan'},
  {id: 'services', from: 156, duration: 218, label: '00:05.2-00:12.5 Dua jenis layanan'},
  {id: 'apply', from: 374, duration: 250, label: '00:12.5-00:20.8 Pengajuan oleh Warga'},
  {id: 'workflow', from: 624, duration: 218, label: '00:20.8-00:28.1 Alur pelayanan & peran'},
  {id: 'technical', from: 842, duration: 218, label: '00:28.1-00:35.3 Pemeriksaan & pelaksanaan teknis'},
  {id: 'review', from: 1060, duration: 187, label: '00:35.3-00:41.6 Pemeriksaan berjenjang & revisi'},
  {id: 'delivery', from: 1247, duration: 218, label: '00:41.6-00:48.8 Dokumen hasil, QR Code'},
  {id: 'survey', from: 1465, duration: 250, label: '00:48.8-00:57.2 Survei kepuasan & closing'},
];

export const sceneOf = (id: SceneId) => {
  const s = SCENES.find((x) => x.id === id);
  if (!s) throw new Error(`Adegan tidak dikenal: ${id}`);
  return s;
};

/** Titik awal bagian closing di dalam adegan terakhir (frame lokal). */
export const CLOSING_START = 156;

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
 * VO menggunakan file di public/ dan diperlambat tipis agar ritmenya selaras dengan visual.
 * Musik dan SFX tetap opsional.
 */
export const AUDIO = {
  music: {enabled: false, file: 'audio/musik-latar.mp3', volume: 0.22},
  voiceOver: {enabled: true, file: 'VO_Reklalin.mp3', volume: 1, playbackRate: 0.98},
  sfx: {
    enabled: false,
    volume: 0.5,
    cues: [
      {file: 'audio/sfx-whoosh.mp3', frame: 156},
      {file: 'audio/sfx-klik.mp3', frame: 374 + 204},
      {file: 'audio/sfx-notifikasi.mp3', frame: 374 + 214},
      {file: 'audio/sfx-whoosh.mp3', frame: 624},
      {file: 'audio/sfx-whoosh.mp3', frame: 842},
      {file: 'audio/sfx-whoosh.mp3', frame: 1060},
      {file: 'audio/sfx-digital.mp3', frame: 1247 + 104},
      {file: 'audio/sfx-penutup.mp3', frame: 1465 + 166},
    ],
  },
};
