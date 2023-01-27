-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 27 Jan 2023 pada 18.20
-- Versi server: 5.7.39
-- Versi PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ramerion`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `blog`
--

CREATE TABLE `blog` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `user` varchar(255) NOT NULL,
  `kategori_blog` varchar(100) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `summary` varchar(255) NOT NULL,
  `konten` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `blog`
--

INSERT INTO `blog` (`id`, `user_id`, `user`, `kategori_blog`, `judul`, `slug`, `gambar`, `summary`, `konten`, `created_at`) VALUES
(29, 4, 'makk', 'finansial', 'blog baru', 'blog-baru', NULL, 'apa aja lah ini ringkasan pokoknya', '<p><strong>Lorem Ipsum</strong>&nbsp;adalah contoh teks atau <em>dummy </em>dalam industri percetakan dan penataan huruf atau <em>typesetting</em>. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an, saat seorang tukang cetak yang tidak dikenal mengambil sebuah kumpulan teks dan mengacaknya untuk menjadi sebuah buku contoh huruf. Ia tidak hanya bertahan selama 5 abad, tapi juga telah beralih ke penataan huruf elektronik, tanpa ada perubahan apapun.</p>\n<p>Ia mulai dipopulerkan pada tahun 1960 dengan diluncurkannya lembaran-lembaran Letraset yang menggunakan kalimat-kalimat dari Lorem Ipsum, dan seiring munculnya perangkat lunak Desktop Publishing seperti Aldus PageMaker juga memiliki versi Lorem Ipsum.</p>', '2023-01-22 08:09:58'),
(30, 4, 'makk', 'teknologi', 'tess', 'tess', '1674383263240285245502_1131376404113434_8024453302058149478_n.jpg', 'ini ringkasan ini ringkasan', '<p>ini konten konten konten</p>\r\n<p>ya</p>\r\n<p>iyaaa</p>\r\n<p>ini <em><strong>kontenn</strong></em></p>', '2023-01-22 10:27:43');

-- --------------------------------------------------------

--
-- Struktur dari tabel `cart`
--

CREATE TABLE `cart` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `produk_id` bigint(20) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `produk_id`, `jumlah`, `status`, `created_at`) VALUES
(2, 1, 1, 4, 'gagal', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `forum`
--

CREATE TABLE `forum` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `user` varchar(255) DEFAULT NULL,
  `konten` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `forum`
--

INSERT INTO `forum` (`id`, `user_id`, `user`, `konten`, `created_at`) VALUES
(47, 1, 'kemal', 'haa apa', '2023-01-14 03:48:41'),
(48, 4, 'makk', 'namamu melintang dihatiku gemilau gemintang di hatikuuuuuuuuuuuuuuu😭😭😭😭😭😭😭😭😭', '2023-01-14 04:37:41'),
(49, 2, 'daffa', 'ni org ngapain sih\r\nanjir awokokwa', '2023-01-21 01:23:14');

-- --------------------------------------------------------

--
-- Struktur dari tabel `gambar_blog`
--

CREATE TABLE `gambar_blog` (
  `id` bigint(20) NOT NULL,
  `blog_id` bigint(20) NOT NULL,
  `gambar` blob NOT NULL,
  `keterangan` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `gambar_forum`
--

CREATE TABLE `gambar_forum` (
  `id` bigint(20) NOT NULL,
  `forum_id` bigint(20) NOT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `keterangan` text,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `gambar_produk`
--

CREATE TABLE `gambar_produk` (
  `id` bigint(20) NOT NULL,
  `id_produk` bigint(20) NOT NULL,
  `gambar` blob NOT NULL,
  `keterangan` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategori_blog`
--

CREATE TABLE `kategori_blog` (
  `id` bigint(20) NOT NULL,
  `nama` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `kategori_blog`
--

INSERT INTO `kategori_blog` (`id`, `nama`) VALUES
(1, 'wirausaha'),
(2, 'finansial'),
(3, 'manajemen'),
(4, 'agribisnis'),
(5, 'peternakan\r\n\r\n'),
(6, 'teknologi');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategori_produk`
--

CREATE TABLE `kategori_produk` (
  `id` bigint(20) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `kategori_produk`
--

INSERT INTO `kategori_produk` (`id`, `nama`, `created_at`) VALUES
(1, 'aksesoris', NULL),
(2, 'pakaian', NULL),
(3, 'makanan', NULL),
(4, 'obat-obatan', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `komentar_blog`
--

CREATE TABLE `komentar_blog` (
  `id` bigint(20) NOT NULL,
  `blog_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `user` varchar(255) NOT NULL,
  `komentar` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `komentar_forum`
--

CREATE TABLE `komentar_forum` (
  `id` bigint(20) NOT NULL,
  `forum_id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `user` varchar(255) NOT NULL,
  `komentar` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `komentar_forum`
--

INSERT INTO `komentar_forum` (`id`, `forum_id`, `user_id`, `user`, `komentar`, `created_at`) VALUES
(19, 47, 4, 'makk', 'nggaaa', '2023-01-14 04:36:28');

-- --------------------------------------------------------

--
-- Struktur dari tabel `produk`
--

CREATE TABLE `produk` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `id_kategori` bigint(20) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `gambar` varchar(255) NOT NULL,
  `deskripsi` text NOT NULL,
  `rate` int(11) DEFAULT NULL,
  `harga` int(11) NOT NULL,
  `stok` int(11) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `produk`
--

INSERT INTO `produk` (`id`, `user_id`, `id_kategori`, `nama`, `gambar`, `deskripsi`, `rate`, `harga`, `stok`, `updated_at`, `created_at`) VALUES
(1, 2, 1, 'kaslung', '', 'jkolajkadhjk', 6, 5000, 4000, NULL, NULL),
(3, 1, 1, 'baju', '', 'deskripsi', 0, 20000, 15000, NULL, NULL),
(9, 3, 3, 'sate', '', 'pantang', 0, 9000, 2, NULL, NULL),
(10, 3, 2, 'baju', '', 'baju baker', 0, 120000, 10, NULL, NULL),
(11, 3, 3, 'minuman', '', 'miuman dingin', 0, 5000, 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(200) NOT NULL,
  `no_telp` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  `role` tinytext,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `email`, `no_telp`, `password`, `remember_token`, `role`, `created_at`, `updated_at`) VALUES
(1, '2011522023', 'boby', 'boby@email.com', '628783434243', '$2a$10$eD71y2kOD8dt59uecMZGv.GrQKmOBAwzt8bI11x9oaSVv3hmFYiqS', '', 'm', '2022-07-02 17:50:28', '2023-01-27 18:14:23'),
(2, '2011527001', 'daffa', 'daffa@email.com', '628511289374', '$2a$10$FFhrC998SYAXea52uzE5T..8YXRyvrZL3bT5V0Hp/DY0XMZqmCba2', '', 'm', '2022-07-02 19:34:21', '2023-01-21 01:20:05'),
(3, '2011523019', 'kemal', 'kemal@email.com', '622358328953', '$2a$10$Nt7pd7djbPhSrDoernRGQOtcS5fOqBUq4Kdp2A/QBgx4s3jJ0.L1i', '', 'm', '2022-07-04 01:08:14', '2023-01-09 16:33:16'),
(4, '121212', 'makk', 'makk@email.com', '628957812642', '$2a$10$NPSYZIT5oULZ2ufWzSjPMu6TFVFyI4.QyY9EIeuWxFjHHCwkcrsvK', '', 'm', '2023-01-14 03:35:32', '2023-01-22 10:35:57');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `forum`
--
ALTER TABLE `forum`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `gambar_blog`
--
ALTER TABLE `gambar_blog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blog_id` (`blog_id`);

--
-- Indeks untuk tabel `gambar_forum`
--
ALTER TABLE `gambar_forum`
  ADD PRIMARY KEY (`id`),
  ADD KEY `forum_id` (`forum_id`);

--
-- Indeks untuk tabel `gambar_produk`
--
ALTER TABLE `gambar_produk`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_produk` (`id_produk`);

--
-- Indeks untuk tabel `kategori_blog`
--
ALTER TABLE `kategori_blog`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `kategori_produk`
--
ALTER TABLE `kategori_produk`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `komentar_blog`
--
ALTER TABLE `komentar_blog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blog_id` (`blog_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `komentar_forum`
--
ALTER TABLE `komentar_forum`
  ADD PRIMARY KEY (`id`),
  ADD KEY `forum_id` (`forum_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `user_id_2` (`user_id`),
  ADD KEY `id_kategori` (`id_kategori`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `blog`
--
ALTER TABLE `blog`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT untuk tabel `cart`
--
ALTER TABLE `cart`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `forum`
--
ALTER TABLE `forum`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT untuk tabel `gambar_blog`
--
ALTER TABLE `gambar_blog`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `gambar_forum`
--
ALTER TABLE `gambar_forum`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `gambar_produk`
--
ALTER TABLE `gambar_produk`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `kategori_blog`
--
ALTER TABLE `kategori_blog`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `kategori_produk`
--
ALTER TABLE `kategori_produk`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `komentar_blog`
--
ALTER TABLE `komentar_blog`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `komentar_forum`
--
ALTER TABLE `komentar_forum`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT untuk tabel `produk`
--
ALTER TABLE `produk`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `blog`
--
ALTER TABLE `blog`
  ADD CONSTRAINT `blog_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `gambar_blog`
--
ALTER TABLE `gambar_blog`
  ADD CONSTRAINT `gambar_blog_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `gambar_forum`
--
ALTER TABLE `gambar_forum`
  ADD CONSTRAINT `gambar_forum_ibfk_1` FOREIGN KEY (`forum_id`) REFERENCES `forum` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `gambar_produk`
--
ALTER TABLE `gambar_produk`
  ADD CONSTRAINT `gambar_produk_ibfk_1` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `komentar_blog`
--
ALTER TABLE `komentar_blog`
  ADD CONSTRAINT `komentar_blog_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `komentar_blog_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `komentar_forum`
--
ALTER TABLE `komentar_forum`
  ADD CONSTRAINT `komentar_forum_ibfk_1` FOREIGN KEY (`forum_id`) REFERENCES `forum` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `komentar_forum_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `produk`
--
ALTER TABLE `produk`
  ADD CONSTRAINT `produk_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `produk_ibfk_2` FOREIGN KEY (`id_kategori`) REFERENCES `kategori_produk` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
