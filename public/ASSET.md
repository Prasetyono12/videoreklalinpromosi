Letakkan aset lokal yang sudah mendapat izin penggunaan di folder ini.

Audio (diatur di objek `AUDIO` pada `src/config.ts`):

- `VO_Reklalin.mp3` voice-over utama video (dipakai oleh kedua format komposisi)
- `audio/musik-latar.mp3`     musik latar bebas hak cipta
- `audio/sfx-whoosh.mp3`, `sfx-klik.mp3`, `sfx-notifikasi.mp3`, `sfx-digital.mp3`, `sfx-penutup.mp3`

Voice-over sudah aktif. Musik dan efek suara tetap nonaktif secara default; saat `enabled` bernilai `false`, file terkait tidak dibaca.
Jangan memakai musik atau efek suara yang berhak cipta tanpa izin.

Aset lain yang dapat diganti dengan versi asli: logo resmi RekLaLin, tangkapan layar aplikasi, QR Code verifikasi asli.

Logo:
- Logo Dishub dipakai dari `src/assets/logoDishub.ts` (disematkan di kode). `public/logo-dishub.png` hanya berkas sumber.
- Untuk mengganti logo: simpan gambar baru (PNG persegi, latar transparan) sebagai `public/logo-dishub.png`, lalu buat ulang `src/assets/logoDishub.ts` berisi `export const LOGO_DISHUB = 'data:image/png;base64,...';` (isi base64 dari gambar baru).
