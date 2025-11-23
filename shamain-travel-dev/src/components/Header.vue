<template>
    <header>
      <div class="container">
        <div class="logo">
          <img src="../assets/shamainheader.png" alt="Logo Shamain" />
        </div>
  
        <!-- Tombol Menu (Hamburger) -->
        <div class="menu-toggle" @click="toggleMenu">
          <img src="../assets/menu.png" alt="Menu" class="hamburger-icon" />
        </div>
  
        <nav :class="{ active: isMenuActive }">
    <ul>
      <RouterLink to="/home" v-slot="{ isActive }">
        <li :class="{ active: isActive }">
          <a>Home</a>
        </li>
      </RouterLink>

      <RouterLink to="/profile" v-slot="{ isActive }">
        <li :class="{ active: isActive }">
          <a>Profil</a>
        </li>
      </RouterLink>

      <!-- Dropdown Paket -->
      <li class="dropdown">
        <a href="#">Paket</a>
        <ul class="dropdown-menu">
          <RouterLink to="/umrah-packages" v-slot="{ isActive }">
            <li :class="{ active: isActive }"><a>Paket Umroh</a></li>
          </RouterLink>

          <RouterLink to="/hajj-packages" v-slot="{ isActive }">
            <li :class="{ active: isActive }"><a>Paket Haji</a></li>
          </RouterLink>

          <RouterLink to="/tour-packages" v-slot="{ isActive }">
            <li :class="{ active: isActive }"><a>Paket Wisata</a></li>
          </RouterLink>
        </ul>
      </li>

      <RouterLink to="/gallery" v-slot="{ isActive }">
        <li :class="{ active: isActive }">
          <a>Galeri Foto</a>
        </li>
      </RouterLink>

      <RouterLink to="/contact" v-slot="{ isActive }">
        <li :class="{ active: isActive }">
          <a>Hubungi Kami</a>
        </li>
      </RouterLink>
    </ul>
  </nav>
      </div>
    </header>
  </template>
  
<script>
export default {
  data() {
    return {
      isMenuActive: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    }
  }
};
</script>
  
  <style scoped>

header {
    background-color: white;
    width: 100%;
    height: 14%;
    padding: 10px 0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    position: absolute !important;
    top: 0;
    left: 0;
    z-index: 1000;
}

/* Container utama */
.container {
    width: 80%; /* Bisa disesuaikan */
    margin: auto;
    display: flex;
    justify-content: center; /* Semua elemen di tengah */
    align-items: center;
    gap: 200px; /* Atur jarak antara logo dan menu */
}

/* Logo */
.logo img {
    width: 80px;
    height: 80px;
    border-radius: 10px;
}

/* NAVIGATION */
nav ul {
    list-style: none;
    display: flex;
    gap: 60px;
}

nav ul li {
    position: relative;
}

nav ul li a {
    color: black;
    font-weight: 600;
    font-size: 16px;
    transition: color 0.3s;
}

.container a{
    color: black;
    text-decoration: none;
}





nav ul li a:hover {
    color: #D6B62A;
}

nav ul li.active a {
  color: #D6B62A;
}

/* Tambahkan panah ke bawah dengan ikon SVG */
.dropdown > a {
    display: flex;
    align-items: center; /* Rapi sejajar */
    gap: 4px; /* Jarak antara teks dan panah */
}

/* Tambahkan panah SVG di sebelah teks */
.dropdown > a::after {
    content: "";
    display: inline-block;
    width: 22px;
    height: 22px;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path d="M7 10l5 5 5-5H7z"/></svg>');
    background-size: cover;
    transition: transform 0.3s ease;
}

/* Saat hover, panah berputar */
.dropdown:hover > a::after {
    transform: rotate(180deg);
}


/* Dropdown Menu */
.dropdown-menu {
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 180px;
  padding: 5px 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

/* Tampilkan dropdown saat hover */
.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
}

/* Style setiap item dalam Dropdown */
.dropdown-menu li {
  width: 100%;
  text-align: left;
  position: relative;
  padding: 0; /* Menghapus padding agar tidak mengganggu garis */
}

/* Garis abu-abu di tengah */
.dropdown-menu li:not(:last-child) {
  border-bottom: 1px solid #ddd; /* Gunakan border-bottom agar lebih rapi */
}

/* Style untuk Link dalam Dropdown */
.dropdown-menu li a {
  color: black;
  display: block;
  padding: 10px 20px; /* Konsisten */
  text-decoration: none;
}

/* Hover effect */
.dropdown-menu li a:hover {
  background-color: #D6B62A;
  color: white;
  border-radius: 5px; /* Hapus border-radius agar lebih bersih */
}


/* --- HAMBURGER MENU --- */
.menu-toggle {
    display: none; /* Default sembunyi, muncul di mobile */
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    position: absolute;
    right: 20px; /* Sesuaikan jarak dari kanan */
}

.hamburger-icon {
    width: 30px; /* Sesuaikan ukuran sesuai kebutuhan */
    height: 30px;
}

/* MOBILE RESPONSIVE */
@media (max-width: 1024px) {

    /* Tampilkan tombol menu */
    .menu-toggle {
        display: block;
    }
    
    /* Header lebih kecil */
    header {
        width: 70%;
        border-radius: 15px;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px;
    }

    .container {
        width: 100%;
        justify-content: space-between;
    }

    /* Sembunyikan menu utama */
    nav {
        display: none;
        position: absolute;
        top: 120%;
        left: 0;
        width: 100%;
        background-color: white;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        z-index: 1000; /* Menjadikan menu di atas elemen lain */
    }

    nav ul {
        flex-direction: column;
        align-items: flex-start; /* Rata kiri */
        padding: 10px 20px;
    }

    /* Tambahkan efek hover untuk menu pada mode mobile */
    nav ul li {
        position: relative;
        width: 100%;
        padding: 15px 0; /* Tambah padding agar lebih luas */
        text-align: left;
        border-bottom: 1px solid #ddd;
        transition: background 0.3s ease-in-out;
    }
    /* Hover berlaku hanya untuk tampilan mobile */
    nav ul li:hover {
        background-color: #D6B62A;
        border-radius: 5px; /* Hapus border-radius agar lebih bersih */
    }

    nav ul li a:hover {
        color: inherit !important; /* Menggunakan warna default, menonaktifkan hover */
    }

    nav ul li:last-child {
        border-bottom: none; /* Menghilangkan garis terakhir */
    }

    /* Dropdown */
    .dropdown-menu {
        position: absolute;
        left: 0;
        background: white;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 9999; /* Menampilkan dropdown di depan */
        padding: 10px;
        border-radius: 5px;
        width: 100%;
    }

    .dropdown-menu a {
        padding: 8px 15px;
        display: block;
        border-bottom: 1px solid #ddd;
    }

    .dropdown-menu a:last-child {
        border-bottom: none;
    }

    /* Tampilkan menu saat aktif */
    nav.active {
        display: block;
    }

    
}

/* Untuk layar lebih kecil (Mobile) */
@media (max-width: 480px) {
    .logo img {
        width: 60px;
        height: 60px;
    }

    header {
        width: 80%;
        border-radius: 15px;
    }

    .menu-toggle {
        display: block;
    }

    /* Hover berlaku hanya untuk tampilan mobile */
    nav ul li:hover {
        background-color: #D6B62A;
        border-radius: 5px;  /* Hapus border-radius agar lebih bersih */
    }

    nav ul li a:hover {
        color: inherit !important; /* Menggunakan warna default, menonaktifkan hover */
    }
}
  </style>
  