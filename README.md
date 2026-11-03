# Diary App - Praktikum Mobile Programming Pertemuan 6

Aplikasi Buku Harian (Diary) berbasis React Native dan Expo CLI yang mengimplementasikan State Management, Context API, Custom Hooks, dan Routing Dinamis menggunakan Expo Router.

## Identitas Mahasiswa

- **Nama:** Azra Abizar Zaky
- **NIM:** 2430511022
- **Mata Kuliah:** Mobile Programming (Pertemuan 6)

---

## Fitur Utama

1. **CRUD Diary:** Menambahkan, melihat detail, dan mencatat cerita harian.
2. **Pencarian & Filter (_useDiarySearch_):** Mencari entri berdasarkan teks dengan teknik _debounce_ serta memfilter entri berdasarkan ikon _mood_.
3. **Tab Favorites (_useLikedEntries_):** Menyaring daftar diary yang telah ditandai suka (_like_) secara sinkron di seluruh halaman.
4. **Tombol Reset Filter:** Mengosongkan query pencarian dan mengembalikan filter mood ke posisi awal secara instan.
5. **Pengaturan (_Settings_):** Mengelola konfigurasi tampilan aplikasi (seperti _Compact Mode_).

---

## Cara Menjalankan Project

1. Ekstrak atau buka folder project `diary-app6` di VS Code.
2. Buka terminal (Command Prompt / PowerShell) di direktori project.
3. Jalankan perintah instalasi dependensi (jika belum):
   ```bash
   npm install
   ```
