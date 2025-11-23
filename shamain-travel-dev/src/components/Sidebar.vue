<template>
  <div
    class="side-navbar"
    :style="{ width: isCollapsed ? '70px' : '200px' }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="logo">
      <RouterLink to="/">
        <img
          :src="isCollapsed ? circleLogo : adminLogo"
          alt="Logo"
          :style="{
            width: isCollapsed ? '50px' : '100%',
            height: isCollapsed ? '50px' : '100%',
          }"
        />
      </RouterLink>
    </div>
    <ul class="menu">
      <RouterLink to="/admin/dashboard" v-slot="{ isActive, isExactActive }">
        <li :class="{ active: isActive || isExactActive }">
          <img src="../assets/dashboard.png" alt="Dashboard Icon" />
          <span v-show="!isCollapsed">Dashboard</span>
        </li>
      </RouterLink>
      <RouterLink to="/admin/umrah-packages" v-slot="{ isActive, isExactActive }">
        <li :class="{ active: isActive || isExactActive }">
          <img src="../assets/package.png" alt="Package Icon" />
          <span v-show="!isCollapsed">Paket Umroh</span>
        </li>
      </RouterLink>
      <RouterLink to="/admin/hajj-packages" v-slot="{ isActive, isExactActive }">
        <li :class="{ active: isActive || isExactActive }">
          <img src="../assets/package.png" alt="Package Icon" />
          <span v-show="!isCollapsed">Paket Haji</span>
        </li>
      </RouterLink>
      <RouterLink to="/admin/tour-packages" v-slot="{ isActive, isExactActive }">
        <li :class="{ active: isActive || isExactActive }">
          <img src="../assets/package.png" alt="Package Icon" />
          <span v-show="!isCollapsed">Paket Wisata</span>
        </li>
      </RouterLink>
      <RouterLink to="/admin/gallery" v-slot="{ isActive, isExactActive }">
        <li :class="{ active: isActive || isExactActive }">
          <img src="../assets/gallery.png" alt="Gallery Icon" />
          <span v-show="!isCollapsed">Galeri Foto</span>
        </li>
      </RouterLink>
      <RouterLink to="/admin/account" v-slot="{ isActive, isExactActive }">
        <li :class="{ active: isActive || isExactActive }">
          <img src="../assets/accounts.png" alt="Account Icon" />
          <span v-show="!isCollapsed">Akun</span>
        </li>
      </RouterLink>
    </ul>
  </div>
</template>

<script>
import adminLogo from "../assets/shamainadmin.png";
import circleLogo from "../assets/shamain-circle.png";

export default {
  name: "Sidebar",
  props: {
    isCollapsed: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      adminLogo,
      circleLogo,
      isMobileView: false, // State untuk mengecek apakah dalam mode mobile
    };
  },
  methods: {
    handleMouseEnter() {
      if (this.isCollapsed && !this.isMobileView) {
        this.$emit("expand-sidebar");
      }
    },
    handleMouseLeave() {
      if (this.isCollapsed && !this.isMobileView) {
        this.$emit("collapse-sidebar");
      }
    },
    checkScreenSize() {
      // Jika lebar layar kurang dari 768px, anggap sebagai mobile view
      this.isMobileView = window.innerWidth < 768;

      if (this.isMobileView) {
        this.$emit("collapse-sidebar"); // Otomatis menyempitkan sidebar di mobile
      } else {
        this.$emit("expand-sidebar"); // Otomatis kembalikan ke ukuran normal di desktop
      }
    },
  },
  mounted() {
    // Saat komponen di-mount, periksa ukuran layar
    this.checkScreenSize();

    // Tambahkan event listener untuk memantau perubahan ukuran layar
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeUnmount() {
    // Hapus event listener saat komponen di-unmount
    window.removeEventListener("resize", this.checkScreenSize);
  },
};
</script>

  
  <style scoped>
 /* Side Navbar START*/
.side-navbar {
    background-color: #000000;
    color: white;
    width: 200px;
    min-height: 100vh;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    transition: width 0.3s ease;
    overflow: hidden;
    transition: width 0.3s ease;
}

.side-navbar .logo {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000;
}

.side-navbar .logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: 0;
    padding: 0;
    transition: width 0.3s ease, height 0.3s ease;
}

.side-navbar .menu {
    list-style: none;
    padding: 0;
    width: 100%;
    margin-top: 15%;
}

.side-navbar .menu li {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-bottom: 25px;
    margin-top: 10px;
}

.side-navbar .menu li:last-child {
    margin-bottom: 0;
}

.side-navbar .menu li:hover {
    border-right: 10px solid #D6B62A;
    background-color: #000000;
    box-shadow: 3px 3px 10px rgba(62, 62, 62, 0.5);
    z-index: 1;
    position: relative;
}

.side-navbar .menu li img {
    width: 30px;
    height: 30px;
    margin-right: 20px;
}

.side-navbar .menu li span {
    font-size: 16px;
    font-weight: bold;
    white-space: nowrap;
    transition: display 0.3s ease;
}

/* Atur gaya tautan untuk menu */
.side-navbar .menu li a {
    display: flex;
    align-items: center;
    text-decoration: none; /* Hilangkan garis bawah */
    color: white; /* Warna teks putih */
    font-size: 16px;
    font-weight: bold;
    transition: color 0.3s ease; /* Animasi perubahan warna */
}

.side-navbar a{
    color: white;
    text-decoration: none;
}

/* Hover efek */
.side-navbar .menu a:hover {
    color: #f0f0f0; /* Sedikit lebih terang saat di-hover */
}

/* Gaya untuk ikon */
.side-navbar .menu li img {
    width: 30px;
    height: 30px;
    margin-right: 20px;
}

/* Gaya untuk teks */
.side-navbar .menu li span {
    white-space: nowrap;
}


.side-navbar .menu li.active {
    border-right: 10px solid #D6B62A;
    background-color: #000000;
    box-shadow: 3px 3px 10px rgba(62, 62, 62, 0.5);
    z-index: 1;
    position: relative;
}

/* Side Navbar END*/
  </style>
  