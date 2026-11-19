# Video Promosi Layanan Aduan RekLaLin (Remotion)

Proyek video promosi berbasis React + TypeScript + Remotion untuk aplikasi web **Layanan Aduan RekLaLin** (Dinas Perhubungan Kabupaten Banyumas).

## Spesifikasi

- Format utama media sosial (TikTok, Instagram Reels/Stories, YouTube Shorts): **1080 × 1920 (9:16)**, komposisi `RekLaLinPromoVertical`
- Format landscape: 1920 × 1080 (16:9), komposisi `RekLaLinPromo`
- 30 fps, 1.650 frame (55 detik), MP4; isi dan narasi sama di kedua format
- Delapan adegan, lima karakter animasi (Warga, Admin, Kepala Dinas, Kepala Bidang, Teknisi)
- Dua alur layanan ditampilkan terpisah: Surat Rekomendasi Penggunaan Jalan (Jalur A) dan Pergeseran/Pemindahan Fasilitas Jalan (Jalur B)

## 1. Persiapan (PowerShell + Antigravity IDE)

```powershell
node -v
npm -v
```

1. Ekstrak zip, lalu buka folder `reklalin-remotion-promo` di Antigravity IDE (File > Open Folder).
2. Buka terminal PowerShell di dalam folder itu, lalu:

```powershell
npm install
```

## 2. Preview

```powershell
npm run dev
```

Remotion Studio terbuka di browser. Pilih `RekLaLinPromo`. Setiap adegan muncul sebagai blok bernama di timeline (mis. "00:12-00:20 Pengajuan oleh Warga"). Periksa satu per satu dengan menggeser playhead atau menekan spasi.

## 3. Pemeriksaan sebelum render

```powershell
npm run typecheck
```

## 4. Render MP4 dan cover

```powershell
npm run render              # vertikal 9:16 -> out/reklalin-promo-vertikal.mp4
npm run render:landscape    # landscape 16:9 -> out/reklalin-promo-landscape.mp4
npm run still               # cover vertikal -> out/reklalin-promo-vertikal-cover.png
npm run still:landscape     # cover landscape
```

Cover dari frame lain (maksimum 1649):

```powershell
npx remotion still src/index.tsx RekLaLinPromoVertical out/cover-frame-1650.png --frame=1600
```

Area aman vertikal: elemen penting berada di antara y 230 dan y 1410 (`SAFE` di `src/config.ts`), subtitle mulai y 1440, agar tidak tertutup antarmuka TikTok/Reels.

## 5. Struktur

```text
src/
├── index.tsx              registerRoot
├── Root.tsx               komposisi + pemeriksaan linimasa
├── RekLaLinPromo.tsx      urutan adegan (Sequence) + audio
├── config.ts              frame, durasi adegan, penanda fitur, pengaturan audio
├── narration.ts           naskah (juga dipakai sebagai subtitle)
├── theme.ts               warna merek + fungsi animasi (fadeIn, rise, ease, typed, hop, ...)
├── AudioLayer.tsx         audio opsional
├── components/
│   ├── Common.tsx         latar, logo, header situs, subtitle, transisi, kursor, notifikasi, stempel
│   ├── Person.tsx         karakter 5 peran + avatar
│   └── Props.tsx          meja, laptop, peta, rambu, jalan
├── scenes/Scene1Intro.tsx ... Scene8SurveyClosing.tsx   (landscape)
└── scenes/vertical/Scene1IntroV.tsx ... Scene8SurveyClosingV.tsx   (vertikal)
```

## 6. Penyesuaian

- Teks narasi/subtitle: `src/narration.ts`. Matikan subtitle: `FEATURES.subtitles` di `src/config.ts`.
- Durasi adegan: `SCENES` di `src/config.ts` (harus berurutan dan berjumlah `TOTAL_FRAMES`; Root.tsx akan memberi galat jika tidak).
- Warna: konstanta `C` di `src/theme.ts`.
- Audio: voice-over `public/VO_Reklalin.mp3` aktif pada kedua format. Musik dan SFX opsional diatur melalui `AUDIO` pada `src/config.ts`.

## 7. Catatan akurasi (penting sebelum publikasi)

- Logo: `public/logo-dishub.png` (logo Dishub dari file yang Anda berikan, latar dibuat transparan). Ganti file ini bila logo resmi berubah.
- Nama web "Layanan Aduan RekLaLin" dikonstanta `APP_NAME` di `src/components/Common.tsx`; nama dinas di `AGENCY_NAME`.
- Formulir, peta, beranda, dokumen, QR Code, dan halaman verifikasi adalah **mockup/ilustrasi**. Teks beranda mengikuti tangkapan layar yang diberikan, dengan nama web disesuaikan. Data (RLL-0001, "Warga Contoh", alamat) fiktif.
- QR Code ilustrasi tidak dapat dipindai dan tidak ada status "Terverifikasi". QR Code adalah sarana verifikasi dokumen, bukan tanda tangan elektronik.
- Penanda fitur di `FEATURES` (`src/config.ts`) kini bernilai `true` karena tercantum pada laporan: chip PDF/DOCX, paraf digital Kepala Bidang dan tanda tangan Kepala Dinas, serta balasan ulasan oleh Admin. Ubah ke `false` bila ada yang tidak ingin ditampilkan.
- Izin final penggunaan jalan oleh Kepolisian/Polres di luar ruang lingkup sistem (tampil sebagai catatan di adegan 7).
- Tidak ada URL, kontak, nama pejabat, atau statistik yang dibuat-buat.
