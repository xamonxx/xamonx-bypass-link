# hollow.node (web)

Versi website dari [hollow.node](https://github.com/0xf1c40f/hollow.node), userscript Tampermonkey/Violentmonkey yang bypass langkah ads/verify di situs shortlink. Versi ini dibangun dengan **Next.js**: tempel link, backend menjalankan browser headless (Puppeteer) yang meniru langkah klik userscript aslinya, lalu mengembalikan link tujuan akhir.

## Situs yang didukung

- `sfl.gl` (termasuk `sfl.gl/ready/go`)
- `tutwuri.id`
- `app.khaddavi.net`
- `bahasteknologi.com`

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`. `npm install` akan mengunduh Chromium bawaan Puppeteer (~200MB) — proses ini butuh waktu dan koneksi internet.

## Cara kerja

- `lib/bypass.ts` — port logika `main.user.js` asli ke Puppeteer: menonaktifkan `window.open`, mempercepat `setTimeout`/`setInterval`, lalu mengklik selector yang sama (`#submit-button`, `#verify > a`, dll.) sampai halaman berpindah ke domain di luar daftar situs shortlink di atas.
- `app/api/bypass/route.ts` — endpoint `POST` yang memvalidasi URL lalu memanggil `runBypass`.
- `app/page.tsx` — form sederhana untuk mengirim link dan menampilkan hasil.

## Catatan

- Berjalan lokal saja untuk saat ini (belum di-deploy).
- Karena bergantung pada struktur halaman situs pihak ketiga, jika situs mengubah selector/alurnya, `lib/bypass.ts` perlu disesuaikan — sama seperti userscript aslinya perlu di-update.
