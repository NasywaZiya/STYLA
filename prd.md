STYLA – Fashion E-Commerce Website
1. Informasi Proyek
Nama Produk: STYLA – Fashion E-Commerce Website

Tim Pengembang
Frontend Developer
Backend Developer
Database Designer

Tujuan Proyek
Membangun website e-commerce fashion yang memungkinkan pengguna melihat katalog produk, menyimpan produk favorit, menambahkan produk ke keranjang, melakukan checkout, dan melacak status pesanan secara online.

2. Latar Belakang

Perkembangan teknologi digital telah mengubah cara masyarakat berbelanja produk fashion. Pelanggan menginginkan proses pembelian yang cepat, mudah, dan dapat dilakukan kapan saja tanpa harus datang ke toko fisik.

STYLA hadir sebagai platform fashion online yang menyediakan pengalaman berbelanja modern dengan tampilan minimalis, responsif, dan mudah digunakan.

3. Tujuan Sistem

Sistem dikembangkan untuk:
Menampilkan katalog produk fashion secara online.
Mempermudah pelanggan mencari produk.
Menyediakan fitur favorit dan keranjang belanja.
Mendukung proses checkout secara digital.
Menampilkan informasi status pesanan.
Meningkatkan pengalaman pengguna melalui antarmuka yang responsif.

4. Target Pengguna
Pelanggan (Customer)

Pengguna yang ingin:
Melihat produk fashion
Menambahkan produk ke favorit
Menambahkan produk ke keranjang
Melakukan checkout
Melacak pesanan

Administrator (Future Development)

Pengguna yang mengelola:
Produk
Kategori
Pesanan
Pengguna

5. Ruang Lingkup Sistem

Track Order

Menampilkan:

Nomor pesanan
Status pesanan

Contoh:

Pending
Processing
Shipped
Delivered


6. Functional Requirements
FR-01 Login

Pengguna dapat login menggunakan:
Email
Password

FR-02 Registrasi

Pengguna dapat membuat akun baru.
Data:
Nama
Email
Password

FR-03 Melihat Produk

Pengguna dapat melihat daftar produk berdasarkan kategori.

FR-04 Filter Produk

Pengguna dapat memfilter produk berdasarkan:
Category produk
Kisaran harga
Warna
Ukuran

FR-05 Favorite Produk

Pengguna dapat:
Menambahkan produk ke favorit
Menghapus produk dari favorit

FR-06 Keranjang Belanja

Pengguna dapat:
Menambahkan produk ke keranjang
Mengubah quantity
Menghapus produk

FR-07 Checkout

Pengguna dapat:
Mengisi data pengiriman
Memilih metode pengiriman
Mengkonfirmasi pesanan

FR-08 Tracking Pesanan

Pengguna dapat melihat status pesanan.

7. Non Functional Requirements
Performance
Waktu loading < 3 detik
Security
Password dienkripsi
Validasi input pengguna
Availability
Sistem dapat diakses 24/7
Responsiveness
Desktop
Tablet
Mobile

8. Teknologi yang Digunakan
Frontend
React JS
Tailwind CSS
Axios
Lucide React

Backend
Node.js
Express.js

Database
MySQL

API
REST API

9. Struktur Database Utama
Database STYLA

USERS
---------
user_id (PK)
name
email
password
phone
address

USER_ADDRESS
------------
address_id (PK)
user_id (FK)
receiver_name
phone
address
city
province
postal_code
is_default

CATEGORIES
------------
category_id (PK)
name

PRODUCTS
----------
product_id (PK)
category_id (FK)
product_name
description
price
material
created_at
status ENUM('active','inactive')

REVIEWS
---------
review_id (PK)
user_id (FK)
product_id (FK)
rating

PRODUCTS_IMAGES
----------
image_id (PK)
product_id (FK)
image_url
is_display

VARIANT
-------------------
variant_id (PK)
product_id (FK)
color_code
size
stock
sku

SALE
---------
sale_id (PK)
sale_name
discount
start_date
end_date

PRODUCT_SALE
---------------
product_sale_id (PK)
product_id (FK)
sale_id (FK)
sale_price

FAVORITE
------------
favorite_id (PK)
user_id (FK)
product_id (FK)

CART
--------
cart_id (PK)
user_id (FK)


CART_ITEMS
--------------
cart_item_id (PK)
cart_id (FK)
variant_id (FK)
quantity

ORDERS
---------
order_id (PK)
user_id (FK)
order_date
status ENUM(
'pending',
'paid',
'processing',
'shipped',
'completed',
'cancelled'
)
subtotal
shipping_cost
total_price

ORDER_DETAILS
-----------------
order_detail_id (PK)
order_id (FK)
product_id (FK)
variant_id (FK)
quantity
price

PAYMENTS
-----------
payment_id (PK)
order_id (FK)
payment_method
payment_date
amount
status ENUM(
'pending',
'paid',
'failed',
'expired',
'refunded'
)
transaction_id

SHIPMENTS
-------------
shipment_id (PK)
order_id (FK)
tracking_number
courier
shipment_status ENUM(
'pending',
'packed',
'shipped',
'in_transit',
'delivered',
'returned'
)
estimated_arrival

10. Alur Sistem STYLA
1. Pengguna Mengakses Website
Pengguna membuka website STYLA melalui browser.
Sistem menampilkan halaman utama (Home Page).
Sistem memuat data produk, kategori, koleksi, dan promo yang tersedia dari database.
Pengguna dapat menavigasi ke halaman:
Home
Women
Men
Collection
Sale
2. Pengguna Melihat Katalog Produk
Pengguna memilih salah satu kategori produk.
Sistem menampilkan daftar produk berdasarkan kategori yang dipilih.
Sistem menampilkan informasi produk berupa:
Gambar produk
Nama produk
Harga produk
Warna yang tersedia
Pengguna dapat menggunakan fitur:
Filter kategori
Filter warna
Filter harga
Sorting produk
Sistem menampilkan hasil filter sesuai kriteria yang dipilih pengguna.
3. Pengguna Melihat Detail Produk
Pengguna memilih salah satu produk dari katalog.
Sistem menampilkan halaman Detail Product.
Sistem mengambil data produk dari database meliputi:
Nama produk
Deskripsi produk
Material
Harga
Foto produk
Warna tersedia
Ukuran tersedia
Stok produk
Rating produk
Pengguna dapat melihat seluruh gambar produk melalui fitur thumbnail.
4. Pengguna Memilih Varian Produk
Pengguna memilih warna produk yang diinginkan.
Sistem menampilkan ukuran yang tersedia sesuai warna yang dipilih.
Pengguna memilih ukuran produk.
Sistem memeriksa stok berdasarkan kombinasi warna dan ukuran.
Pengguna menentukan jumlah produk yang akan dibeli.
Sistem memastikan jumlah yang dipilih tidak melebihi stok yang tersedia.
5. Menambahkan Produk ke Keranjang Belanja
Pengguna menekan tombol Add to Cart.
Sistem memeriksa apakah produk dan varian yang dipilih valid.
Sistem membuat atau memperbarui data pada tabel:
CART
CART_ITEMS
Sistem menambahkan:
Variant ID
Quantity
Sistem menampilkan notifikasi bahwa produk berhasil ditambahkan ke keranjang.
6. Mengelola Keranjang Belanja
Pengguna membuka halaman Cart.
Sistem menampilkan seluruh produk yang tersimpan dalam keranjang.
Untuk setiap produk, sistem menampilkan:
Gambar produk
Nama produk
Warna
Ukuran
Harga
Jumlah
Pengguna dapat:
Menambah jumlah produk
Mengurangi jumlah produk
Menghapus produk dari keranjang
Setiap perubahan akan memperbarui data pada tabel:
CART_ITEMS
Sistem menghitung ulang subtotal keranjang.
7. Proses Checkout
Pengguna menekan tombol Checkout.
Sistem memeriksa status autentikasi pengguna.
Jika pengguna belum login
Sistem mengarahkan pengguna ke halaman Login.
Pengguna memasukkan:
Email
Password
Jika belum memiliki akun:
Pengguna melakukan registrasi terlebih dahulu.
Setelah login berhasil:
Sistem membuat sesi pengguna.
Sistem mengarahkan kembali ke halaman Checkout.
Jika pengguna sudah login
Sistem langsung menampilkan halaman Checkout.
8. Pengisian Informasi Pengiriman
Pengguna memilih atau mengisi alamat pengiriman.
Sistem mengambil data alamat dari:
USER_ADDRESS
Pengguna memilih:
Alamat pengiriman
Kurir pengiriman
Sistem menghitung biaya pengiriman.
Sistem menampilkan ringkasan pesanan:
Produk
Jumlah
Harga
Ongkir
Total pembayaran
9. Konfirmasi Pesanan
Pengguna menekan tombol Place Order.
Sistem melakukan validasi:
Data pengguna
Alamat pengiriman
Ketersediaan stok
Jika stok mencukupi:
Sistem melanjutkan proses pesanan.
Jika stok tidak mencukupi:
Sistem menampilkan pesan kesalahan.
10. Pembuatan Order
Sistem membuat data pada tabel:
ORDERS

dengan informasi:

User ID
Tanggal pesanan
Subtotal
Ongkir
Total pembayaran
Status = Pending
Sistem membuat detail pesanan pada tabel:
ORDER_DETAILS

yang berisi:

Produk
Variant
Quantity
Harga
Sistem mengurangi stok produk pada tabel:
VARIANT

sesuai jumlah pembelian.

11. Proses Pembayaran
Sistem membuat data pembayaran pada tabel:
PAYMENTS
Data yang disimpan:
Order ID
Metode pembayaran
Nominal pembayaran
Status pembayaran
Setelah pembayaran berhasil:
PAYMENTS.status = Paid
Sistem mengubah status pesanan menjadi:
Processing
12. Pengiriman Pesanan
Admin memproses pesanan.
Sistem membuat data pengiriman pada tabel:
SHIPMENTS
Data yang disimpan:
Nomor resi
Kurir
Estimasi tiba
Ketika pesanan dikirim:
ORDERS.status = Shipped
SHIPMENTS.status = Shipped
13. Pelacakan Pesanan (Track Order)
Pengguna membuka halaman Track Order.
Sistem mengambil data dari:
ORDERS
SHIPMENTS
Sistem menampilkan status pesanan secara real-time.

Status yang dapat ditampilkan:

Pending
↓
Processing
↓
Shipped
↓
Delivered
Pengguna dapat melihat:
Nomor pesanan
Nomor resi
Kurir
Status pengiriman
Estimasi kedatangan
14. Penyelesaian Transaksi
Ketika pesanan diterima pelanggan:
Sistem mengubah status pesanan menjadi:
Delivered
Sistem mencatat transaksi sebagai selesai.
Pengguna dapat:
Melihat riwayat pesanan
Memberikan rating produk
Data rating disimpan pada tabel:
REVIEWS

Alur Sistem Favorite (Wishlist) STYLA
1. Pengguna Melihat Produk
Pengguna membuka halaman katalog produk atau halaman detail produk.
Sistem menampilkan informasi produk beserta tombol Favorite (ikon hati).
Sistem memeriksa apakah produk sudah tersimpan pada daftar favorite pengguna.
Jika produk sudah ada di favorite:
Ikon hati berwarna merah

Jika belum ada:
Ikon hati berwarna default

2. Pengguna Menambahkan Produk ke Favorite
Pengguna menekan ikon Favorite pada produk.
Sistem memeriksa status login pengguna.
Jika pengguna belum login
Sistem menampilkan pesan:
Silakan login terlebih dahulu untuk menyimpan produk favorit.
Sistem mengarahkan pengguna ke halaman Login atau Registrasi.
Jika pengguna sudah login
Sistem memeriksa apakah produk sudah ada pada tabel:
FAVORITE
------------
favorite_id
user_id
product_id
Jika produk belum ada:
INSERT INTO FAVORITE
Sistem menyimpan:
User ID
Product ID
Sistem menampilkan notifikasi:
Produk berhasil ditambahkan ke Favorite.
Ikon hati berubah menjadi aktif (merah).
3. Pengguna Menghapus Produk dari Favorite
Pengguna menekan kembali ikon Favorite pada produk yang sudah tersimpan.
Sistem mencari data favorite berdasarkan:
user_id
product_id
Sistem menghapus data dari tabel:
FAVORITE
Sistem menampilkan notifikasi:
Produk dihapus dari Favorite.
Ikon hati kembali ke kondisi normal.
4. Melihat Daftar Favorite
Pengguna membuka halaman Favorite.
Sistem memeriksa status login pengguna.
Jika belum login
Sistem mengarahkan ke halaman Login.
Jika sudah login
Sistem mengambil seluruh data favorite berdasarkan:
SELECT *
FROM FAVORITE
WHERE user_id = ?
Sistem mengambil detail produk terkait dari tabel:
PRODUCTS
PRODUCT_IMAGES
VARIANT
Sistem menampilkan daftar produk favorit berupa:
Gambar produk
Nama produk
Harga produk
Warna tersedia
Tombol View Product
Tombol Remove Favorite
5. Menambahkan Produk Favorite ke Cart
Pengguna memilih salah satu produk pada halaman Favorite.
Sistem mengarahkan ke halaman Detail Product.
Pengguna memilih:
Warna
Ukuran
Jumlah
Pengguna menekan tombol:
Add to Cart
Sistem menambahkan produk ke:
CART
CART_ITEMS
Produk tetap tersimpan pada Favorite sampai pengguna menghapusnya sendiri.
6. Sinkronisasi Favorite
Setiap kali pengguna login:
Sistem mengambil seluruh data favorite berdasarkan User ID.
Sistem menampilkan status favorite pada seluruh halaman produk.
Produk yang sudah masuk favorite akan ditandai dengan ikon hati aktif.

Alur Sistem Pencarian Produk STYLA
1. Pengguna Membuka Fitur Pencarian
Pengguna menekan ikon Search pada navbar.
Sistem menampilkan halaman atau modal pencarian.
Sistem menyediakan kolom input pencarian.
2. Pengguna Memasukkan Kata Kunci
Pengguna mengetik nama produk, kategori, atau kata kunci tertentu.
Sistem menerima input pencarian.
Contoh:
Blazer
Dress
Shoes
Black Bag
3. Sistem Memproses Kata Kunci
Sistem membaca kata kunci yang dimasukkan pengguna.
Sistem melakukan pencarian pada database.

Pencarian dapat dilakukan pada:
PRODUCTS.product_name
PRODUCTS.description
CATEGORIES.name

Contoh query:
SELECT *
FROM PRODUCTS
WHERE product_name LIKE '%blazer%'
OR description LIKE '%blazer%';
4. Sistem Menampilkan Hasil Pencarian
Sistem mengambil produk yang sesuai dengan kata kunci.
Sistem menampilkan daftar hasil pencarian berupa:
Gambar produk
Nama produk
Harga produk
Warna yang tersedia

Contoh:
Oversized Blazer
Classic Black Blazer
Premium Linen Blazer
5. Tidak Ditemukan Hasil

Jika tidak ada produk yang sesuai:
Sistem menampilkan pesan:
Produk tidak ditemukan. Coba gunakan kata kunci pencarian pakaian lainnya.

6. Pengguna Memilih Produk
Pengguna memilih salah satu produk dari hasil pencarian.
Sistem membuka halaman Detail Product.
Sistem menampilkan seluruh informasi produk yang dipilih.
7. Pengguna Melakukan Filter Tambahan

Setelah hasil pencarian tampil, pengguna dapat mempersempit hasil menggunakan filter:

Kategori
Tops
Dresses
Outerwear
Shoes
Bags
Warna
Black
Beige
Blue
Red
Harga
Min Price
Max Price
Sorting
Newest
Lowest Price
Highest Price
8. Sistem Memperbarui Hasil
Sistem menggabungkan kata kunci pencarian dengan filter yang dipilih.
Sistem menampilkan hasil yang telah diperbarui secara otomatis.

Contoh:
Keyword : Blazer
Color : Black
Price : 500.000 - 1.000.000

Hasil yang muncul hanya produk yang memenuhi seluruh kriteria tersebut.

Tampilan Navbar
Sebelum Login diambil dari .../src/components/NavbarBfr.jsx:
Search
Favorite
Cart
Login

Sesudah Login diambil dari .../src/components/Navbar.jsx:
Search
Favorite
Cart
Lacak Paket (track)
Profile

Sistem mengambil data pengguna dari tabel:
USERS

11. Kriteria Keberhasilan

Proyek dianggap berhasil apabila:

Semua halaman dapat diakses dengan baik.
Produk dapat ditampilkan dari API menggunakan Axios.
Keranjang dapat menghitung total harga dengan benar.
Checkout berjalan tanpa error.
Website responsif pada desktop dan mobile.
Data tersimpan pada database MySQL.
