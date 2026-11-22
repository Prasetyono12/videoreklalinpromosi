import {SCENES, SceneId, CLOSING_START} from './config';

export type NarrationLine = {
  scene: SceneId;
  /** Frame lokal di dalam adegan tempat kalimat mulai tampil sebagai subtitle. */
  startLocal: number;
  endLocal: number;
  text: string;
};

/**
 * Naskah final voice-over. Satu kalimat per segmen; panjang kalimat disesuaikan
 * dengan durasi adegan (kecepatan bicara sekitar 2,5 - 3 kata per detik).
 */
export const NARRATION: ReadonlyArray<NarrationLine> = [
  {scene: 'intro', startLocal: 0, endLocal: 156, text: 'Kenalkan Layanan Aduan RekLaLin, layanan digital untuk permohonan dan aduan rekayasa lalu lintas.'},
  {scene: 'services', startLocal: 0, endLocal: 218, text: 'Tersedia dua layanan utama: rekomendasi penggunaan jalan selain untuk lalu lintas, serta pergeseran atau pemindahan fasilitas jalan.'},
  {scene: 'apply', startLocal: 0, endLocal: 250, text: 'Warga mengisi data, memilih layanan, menentukan lokasi melalui peta, dan mengunggah dokumen pendukung.'},
  {scene: 'workflow', startLocal: 0, endLocal: 218, text: 'Permohonan diproses Admin dan pejabat terkait, melalui tahapan yang berbeda sesuai jenis layanan dan kewenangannya.'},
  {scene: 'technical', startLocal: 0, endLocal: 218, text: 'Kepala Bidang menugaskan Teknisi, yang menyiapkan draft surat atau memeriksa langsung di lapangan.'},
  {scene: 'review', startLocal: 0, endLocal: 187, text: 'Hasil ditinjau secara berjenjang dan dapat diperbaiki sesuai catatan pejabat berwenang.'},
  {scene: 'delivery', startLocal: 0, endLocal: 218, text: 'Admin menyampaikan hasil kepada Warga. Dokumen yang tersedia dapat diperiksa melalui QR Code verifikasi.'},
  {scene: 'survey', startLocal: 0, endLocal: CLOSING_START, text: 'Warga dapat memantau perkembangan layanan dan memberi penilaian melalui survei kepuasan.'},
  {scene: 'survey', startLocal: CLOSING_START, endLocal: 250, text: 'Layanan Aduan RekLaLin. Lebih terarah, transparan, dan dekat dengan Warga.'},
];

export const narrationFor = (scene: SceneId) => NARRATION.filter((n) => n.scene === scene);

/** Pemeriksaan sederhana: setiap kalimat harus berada dalam durasi adegannya. */
export const assertNarrationFitsTimeline = () => {
  for (const n of NARRATION) {
    const s = SCENES.find((x) => x.id === n.scene);
    if (!s || n.startLocal < 0 || n.endLocal > s.duration || n.endLocal <= n.startLocal) {
      throw new Error(`Narasi di luar rentang adegan: ${n.scene}`);
    }
  }
};
