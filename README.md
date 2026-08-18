# Interactive Birthday Website 🎂✨

Sebuah website kustom interaktif, romantis, dan spesial yang didesain khusus sebagai kejutan ulang tahun! Bukti bahwa kado tidak selalu harus berbentuk barang, tapi bisa juga berupa *experience* manis yang dibuat sepenuh hati menggunakan barisan kode.

## 🌟 Fitur Utama
- **Sistem Keamanan "Password" Rahasia:** Hanya yang berulang tahun yang tahu jawabannya untuk bisa masuk ke dalam website.
- **Amplop Surat Animasi:** Surat cinta virtual (*handwritten style*) dengan animasi membuka amplop yang dipoles menggunakan Framer Motion.
- **Galeri Memori "Round-Robin":** Layout galeri foto dengan efek "Polaroid", "Cinematic Film", dan rotasi natural yang diambil langsung dari Cloudinary.
- **Photobooth Scrapbook:** Ruang khusus berisi kompilasi foto bergaya photobooth strip strip vertikal ala cetakan foto box.
- **Pertanyaan Interaktif:** Mini-game dengan tombol "Ngeles" (menghindar/lari) jika jawaban salah, untuk seru-seruan memancing jawaban lucu.
- **Form Rating & Reply:** Integrasi langsung ke URL WhatsApp agar balasan (beserta *rating kebahagiaan*) langsung terkirim ke si pembuat hadiah.

## 🛠 Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Animasi:** Framer Motion
- **Media Asset:** Cloudinary (untuk manajemen foto & video tanpa membebani ukuran repo)
- **Deployment:** Vercel (Coming Soon)

## 📦 Local Development

1. Clone repository ini.
2. Install dependencies menggunakan perintah:
   ```bash
   npm install
   ```
3. Copy file `.env.example` ke `.env.local` dan isi nilainya (jika menggunakan integrasi Cloudinary dan nomor WhatsApp kustom).
4. Masukkan environment variables:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
   NEXT_PUBLIC_WA_NUMBER="628xxxxxxx"
   PASSWORD_KEY="password_rahasia"
   ```
5. Jalankan development server:
   ```bash
   npm run dev
   ```

*Dibuat dengan segenap 💙 dan begadang.*
