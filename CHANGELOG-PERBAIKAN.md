# Catatan Perbaikan (ringkas, agar tidak diulang)

Format: **file/folder** → apa yang diubah → hasil. Perbaikan terbaru di paling bawah tiap bagian.

## Putaran 1: pembuatan awal
- `src/RekLaLinPromo.tsx`, `src/scenes/Scene1..8*.tsx` → delapan adegan, enam karakter, dua jalur layanan terpisah → video 1.650 frame (55 dtk).
- `src/components/` (`Common`, `Person`, `Props`) → komponen yang dipakai bersama (karakter, peta, meja, transisi, subtitle) → tidak ada kode karakter ganda.
- `src/config.ts`, `src/narration.ts`, `src/theme.ts` → durasi adegan, penanda fitur, naskah (juga jadi subtitle), warna dan fungsi animasi.
- `src/Root.tsx` → pemeriksaan linimasa: galat bila adegan tidak berurutan atau total frame tidak 1.650.
- `remotion.config.ts` → import `Config` dari `@remotion/cli/config` (impor resmi Remotion v4).
- `public/audio/`, `src/AudioLayer.tsx` → audio opsional, mati bawaan sehingga render tidak gagal tanpa file.

## Putaran 2: penyesuaian dengan keputusan dan laporan
- **Kepala Seksi ditiadakan (5 user)**: `components/Person.tsx`, `scenes/Scene4`–`Scene8`, `narration.ts` → Kepala Bidang menugaskan Teknisi; karakter, node alur, stempel, dan narasi diperbarui.
- **Nama web "Layanan Aduan RekLaLin"**: `components/Common.tsx` (`APP_NAME`, `AGENCY_NAME`), semua adegan → nama tidak pernah ditulis huruf kapital semua.
- **Logo Dishub**: `public/logo-dishub.png` (baru), `Common.tsx` (`BrandMark`) → logo dipakai di semua tempat logo dan kop dokumen.
- **Beranda web**: `Common.tsx` (`SiteHeader`), `Scene1Intro.tsx` (mockup beranda), `Scene3Apply.tsx` (header situs).
- **Selaras laporan**: `config.ts` (`FEATURES`) → chip PDF/DOCX, paraf digital Kepala Bidang, tanda tangan Kepala Dinas, dan balasan Admin dinyalakan; `Scene7Delivery.tsx` → status versi dan keterangan hanya-baca tanpa login.

## Putaran 3: ukuran untuk media sosial (TikTok, Reels, Shorts)
- **Masalah**: video 1920×1080 (16:9) tidak cocok untuk TikTok/Instagram yang memakai 1080×1920 (9:16).
- `src/config.ts` → `FORMATS` (vertikal 1080×1920 dan landscape 1920×1080) dan `SAFE` (area aman: atas 230, bawah 1410, subtitle mulai 1440).
- `src/Root.tsx` → dua komposisi: `RekLaLinPromoVertical` (utama) dan `RekLaLinPromo` (landscape tetap ada).
- `src/RekLaLinPromo.tsx` → `SceneStack` dipakai bersama; mengekspor kedua komposisi.
- `src/scenes/vertical/Scene1IntroV … Scene8SurveyClosingV.tsx` (baru) → tata letak vertikal untuk setiap adegan; isi, narasi, durasi, dan alur layanan sama persis dengan landscape.
- `src/components/Common.tsx` → `useVertical()`, subtitle, watermark, dan transisi otomatis menyesuaikan ukuran kanvas.
- Adegan landscape hanya ditambah kata `export` pada komponen yang dipakai ulang oleh versi vertikal (Scene2, 3, 4, 5, 7, 8) dan tiga parameter opsional di `Scene6Review.tsx` (`labelAt`, `compact`, `scale`). Tampilan landscape tidak berubah.
- `package.json` → `npm run render` kini menghasilkan **vertikal** (`out/reklalin-promo-vertikal.mp4`); `npm run render:landscape` untuk 16:9; `still` dan `still:landscape` untuk cover.
- Perbedaan vertikal: adegan 3 formulir dua halaman; adegan 5 dua panel bergantian; adegan 7 dokumen lalu halaman verifikasi bergantian; mockup beranda hanya ada di landscape.

## Diperiksa
- Type-check lolos terhadap tipe tiruan, sweep 550 frame per format tanpa galat. **Belum** diuji di Remotion asli (`npm run dev`, `npm run render`).

## Yang masih perlu Anda cek di komputer Anda
1. `npm install`, `npm run typecheck`, `npm run dev`, lalu periksa kedua komposisi.
2. Pastikan tidak ada elemen penting tertutup antarmuka TikTok/Reels pada ponsel (area aman sudah dijaga, tetapi tampilan antarmuka tiap aplikasi berubah-ubah).
3. Laporan masih memuat sisa "Kepala Seksi" dan nama "Peduli Warga"; sesuaikan laporan, video sudah mengikuti keputusan terbaru.

## Putaran 4: tempo VO dan logo transparan
- `src/config.ts` → VO diperlambat tipis ke playback rate 0,98; durasi komposisi diselaraskan menjadi 1.715 frame (±57,17 detik), dengan seluruh delapan adegan dan titik SFX diperpanjang proporsional, urutan tetap.
- `src/components/Common.tsx` → ubin putih dan bayangan di belakang logo dilepas; transparansi gambar logo yang sudah ada kini terlihat di semua pemakaian tanpa mengubah animasi atau komposisi adegan.
- `README.md`, `NASKAH-NARASI.md`, `STORYBOARD.md` → durasi, batas adegan, dan titik mulai penutup diperbarui agar sesuai dengan timeline baru.
