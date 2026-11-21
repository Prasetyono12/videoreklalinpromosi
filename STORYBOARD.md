# Storyboard dan Arahan Animasi Layanan Aduan RekLaLin

Lima karakter (Kepala Seksi ditiadakan) memakai satu komponen (`src/components/Person.tsx`) dengan gaya vektor 2D yang sama: proporsi tetap, palet merek, ekspresi lembut. Karakter bukan representasi orang nyata.

| Peran | Ciri visual |
|---|---|
| Warga | kaus cyan, rambut disanggul, celana biru tua, sepatu putih |
| Admin | hijab biru, blus pucat, kartu pengenal |
| Kepala Dinas | rambut abu-abu, blazer biru tua, dasi amber |
| Kepala Bidang | kacamata, blazer biru sedang, dasi navy |
| Teknisi | helm putih, rompi amber dengan strip reflektif, sepatu bot cokelat |

## Adegan

| # | Waktu / frame | Isi visual | Karakter dan gerakan | Transisi masuk |
|---|---|---|---|---|
| 1 | 00:00–00:05 / 0–149 | Latar navy, garis jalur mengalir, marka jalan bergerak, logo Dishub pada ubin putih muncul dengan spring, judul "Layanan Aduan" + "RekLaLin", subtitle "Dinas Perhubungan Kabupaten Banyumas", mockup beranda web | Warga berjalan masuk, berhenti, mengangkat ponsel, lingkaran pulse dan kartu aplikasi muncul. Logo membesar di akhir adegan | tidak ada (adegan pembuka) |
| 2 | 00:05–00:12 / 150–359 | Dua kartu layanan (stagger), masing-masing dengan ilustrasi sendiri | Layanan 01: Warga memegang dokumen di dekat tenda dan kerucut. Layanan 02: Teknisi berjalan ke rambu dan penanda lokasi | geser dari kanan |
| 3 | 00:12–00:20 / 360–599 | Jendela aplikasi (dengan header situs: logo Dishub dan nama Layanan Aduan RekLaLin): formulir terisi (ketik), pilihan layanan, peta dengan penanda jatuh-memantul dan rute bertahap, unggah dokumen, tombol kirim, notifikasi berhasil | Warga mengetik di laptop, mengangguk dan tersenyum saat terkirim. Kursor bergerak dan efek klik | lingkaran terbuka |
| 4 | 00:20–00:27 / 600–809 | Dua jalur terpisah (Jalur A biru, Jalur B amber), dokumen bergerak antar-aktor, lonceng notifikasi, blok keputusan Kepala Bidang (Ditolak, Dilengkapi, Diteruskan), jalur kembali | Avatar lima peran (karakter yang sama), lima node per jalur | sapuan cahaya |
| 5 | 00:27–00:34 / 810–1019 | Kiri: notifikasi penugasan dari Kepala Bidang, draft surat tersusun, diserahkan ke Kepala Bidang. Kanan: peta rute, Teknisi memeriksa rambu, flash kamera, daftar periksa, laporan dikirim ke Kepala Bidang | Teknisi mengetik di laptop; Teknisi berjalan lalu memotret | zoom |
| 6 | 00:34–00:40 / 1020–1199 | Baris draft surat (Teknisi, Kepala Bidang, Kepala Dinas, Admin) dan baris laporan fasilitas (Teknisi, Kepala Bidang, Admin), stempel (Diparaf, Disetujui, Ditinjau, Diterima), panah revisi "Catatan perbaikan" dari Kepala Bidang ke Teknisi | Karakter menyerahkan dan menerima dokumen, mengangguk | geser dari bawah |
| 7 | 00:40–00:47 / 1200–1409 | Admin menyampaikan dokumen (kop Dinas Perhubungan, chip PDF/DOCX, paraf digital Kepala Bidang, tanda tangan Kepala Dinas), QR Code ilustrasi muncul, Warga memindai (garis pindai), halaman verifikasi ilustrasi (nomor, jenis layanan, status versi, penerbit), catatan QR bukan tanda tangan elektronik, catatan Polres | Admin mengulurkan dokumen; Warga mengangkat ponsel | maske diagonal |
| 8 | 00:47–00:55 / 1410–1649 | 00:47–00:52 survei: status permohonan, bintang satu per satu, komentar diketik, kirim, tanggapan Admin. 00:52–00:55 closing: jalur menuju logo, RekLaLin besar, tagline, lima karakter | Warga memberi penilaian dan tersenyum; lima karakter berdiri di penutup | fade; closing dengan lingkaran terbuka |

Transisi masuk adalah wipe di atas adegan sebelumnya yang tetap tampil selama 18 frame (`OVERLAP` di `src/config.ts`).

## Format vertikal (9:16)

Isi, narasi, dan durasi adegan sama. Perbedaan tata letak: adegan 2 kartu ditumpuk; adegan 3 formulir dua halaman (data, lalu lokasi dan dokumen); adegan 4 dua jalur ditumpuk; adegan 5 dua panel bergantian; adegan 7 dokumen lalu halaman verifikasi bergantian; adegan 8 survei dan penutup lima karakter. Mockup beranda hanya di landscape. Subtitle vertikal berada di y 1440 ke bawah.
