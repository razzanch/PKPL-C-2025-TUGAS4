<template>
  <div class="login-view">
    <Header />
    <main>
      <div class="main-content">
        <div class="overlay-content">
          <div class="contact-container">
            <!-- New Text Section Added -->
            <div class="text-cont">
            <p class="quote-text">
              PT. ALSHAWQ HAROMAIN TRAVEL | SK PPIU 08032300654320002 
            </p>
            <p class="hadith-textspecial">Umroh yang Penuh Berkah</p>
            <p class="hadith-text">
              "Melaksanakan umrah yang satu dengan umrah berikutnya akan menghapuskan dosa-dosa yang terjadi di antara keduanya. 
              <br />
              Sedangkan haji yang mabrur, tiada balasan untuknya selain surga."
              <br />
              (HR al-Bukhari dan Muslim)
            </p>
          </div>
          <router-link to="/umrah-packages" class="error-button">
                Lihat Paket
              </router-link>
          </div>
        </div>
        <div class="image-container">
          <img src="../assets/public2.jpg" alt="Login Background" />
        </div>

        <!--ISI DISINI-->

        <div class="two-column-container" data-aos="fade-up">
            <!-- Left Column -->
            <div class="left-column">
              <h1 class="welcome-text">Selamat Datang</h1>
              <h2 class="shamain-travel">SHAMAIN TRAVEL</h2>
              <img src="../assets/line.svg" alt="Decorative line" class="lineleft" />
              <p class="description-text">
                Shamain Travel, yang dikelola oleh PT. Alshawq Haromain Travel, adalah biro perjalanan Umroh dan Haji Khusus yang telah mendapatkan izin resmi. Kami memiliki SK PPIU No. 08032300654320002 yang dikeluarkan pada 02-10-2024, No. NIB 08032300654320002, serta No. Kemenhukam AHU-0052529.AH.1.1.2024. Dengan pengalaman dan keahlian kami, kami berkomitmen untuk memberikan Anda pengalaman ibadah Umroh yang penuh berkah, ibadah yang khusuk, serta pendampingan dari mutowif yang terlatih dan berkompeten.
              </p>
              <button class="read-more-btn">Baca Selengkapnya</button>
            </div>

            <!-- Vertical Divider -->
            <div class="vertical-divider"></div>

            <!-- Right Column -->
            <div class="right-column">
              <h2 class="ask-title">AYUK BERTANYA!</h2>
              <p class="ask-subtitle">"Tanyakan seputar paket - paket yang anda inginkan!"</p>
              
              <div class="form-container">
                <input type="text" placeholder="Nama" class="form-input" v-model="nama" id="nama">
<input type="email" placeholder="Email" class="form-input" v-model="email" id="nama">
<input type="text" placeholder="Subjek" class="form-input" v-model="subjek" id="subjek">
<textarea placeholder="Pesan" class="form-input textarea-input" v-model="pesan" id="pesan"></textarea>

                <button class="submit-btn" @click="handleSubmit">Submit</button>
              </div>
            </div>
          </div>



        <div class="subheader" data-aos="fade-up">
  <h2>Paket Umroh</h2>
  <img src="../assets/line.svg" alt="Decorative line" class="line-subheader" />
  <p class="package-description">Shamain Travel menghadirkan paket eksklusif Ruby, Emerald, Sapphire & Diamond - pengalaman ibadah umroh premium dengan fasilitas terbaik di Tanah Suci.</p>
</div>


<!-- ISI DISINI -->
<section class="program-section" v-if="programsUmroh.length > 0" data-aos="fade-up">
          <div v-for="program in programsUmroh" :key="program.id_program" class="program-wrapper">
            <h2 class="program-title">{{ program.name_program }}</h2>
            <p class="program-period">Periode: {{ program.period }}</p>
            <hr class="divider" />

            <div class="package-list">
              <div
  class="package-card"
  :class="getCardClass(pkg.name_package)"
  v-for="(pkg, index) in program.packages"
  :key="index"
>
  <!-- Judul Statis -->
  <h4 class="static-title">Paket</h4>

  <!-- Nama Paket -->
  <h3 class="package-title">{{ pkg.name_package }}</h3>

  <!-- Star Rating -->
<div class="star-info">
  <img
    v-for="n in pkg.star"
    :key="n"
    src="../assets/star.png"
    alt="Star"
    width="20"
    height="20"
    class="star-image"
  />
</div>


  <!-- Bagian Hotel -->
<div class="section-label hotel" style="display: flex; flex-direction: column; align-items: center;">
  <img src="../assets/hotel.png" alt="Hotel Icon" class="icon" width="20px" />
  <span>Hotel</span>
</div>

<div class="hotel-info">
  <p v-for="(line, idx) in pkg.hotel.split('\n')" :key="idx">{{ line }}</p>
</div>

<!-- Bagian Maskapai -->
<div class="section-label maskapai">
  <img src="../assets/maskapai.png" alt="Airline Icon" class="icon"/>
  <span>Maskapai</span>
</div>
<!-- Airline container dengan gaya mirip price-list -->
<div class="airlines-wrapper">
  <div class="airlines-column">
    <div v-for="(airline, i) in parseAirlines(pkg.airline_path)" :key="i" class="airline-column-item">
      <img :src="airline" alt="airline logo" class="airline-logo" />
    </div>
  </div>
</div>

<div class="price-list">
  <div class="price-item" v-if="parseFloat(pkg.quad) > 0">
    <span class="price-label">Quad</span><br>
    <span class="price-value">{{ formatPrice(pkg.quad) }}</span>
  </div>
  <div class="price-item" v-if="parseFloat(pkg.triple) > 0">
    <span class="price-label">Triple</span><br>
    <span class="price-value">{{ formatPrice(pkg.triple) }}</span>
  </div>
  <div class="price-item" v-if="parseFloat(pkg.double) > 0">
    <span class="price-label">Double</span><br>
    <span class="price-value">{{ formatPrice(pkg.double) }}</span>
  </div>
</div>
</div>

            </div>
          </div>
        </section>

        <router-link 
  to="/umrah-packages" 
  custom
  v-slot="{ navigate }"
>
  <button 
    class="btn-rincian"
    @click="navigate"
    @keyup.enter="navigate"
    role="link"
  >
    Lihat Selengkapnya →
  </button>
</router-link>




        <div class="subheader" data-aos="fade-up">
          <h2>Paket Haji</h2>
          <img src="../assets/line.svg" alt="Decorative line" class="line-subheader" />
          <p class="package-description">Shamain Travel menghadirkan paket eksklusif Gold dan Silver - pengalaman ibadah haji premium dengan fasilitas terbaik di Tanah Suci.</p>
        </div>



<!-- ISI DISINI -->
<section class="program-section" v-if="programsHaji.length > 0" data-aos="fade-up">
          <div v-for="program in programsHaji" :key="program.id_program" class="program-wrapper">
            <h2 class="program-title">{{ program.name_program }}</h2>
            <p class="program-period">Periode: {{ program.period }}</p>
            <hr class="divider" />

            <div class="package-list">
              <div
  class="package-card"
  :class="getCardClass(pkg.name_package)"
  v-for="(pkg, index) in program.packages"
  :key="index"
>
  <!-- Judul Statis -->
  <h4 class="static-title">Paket</h4>

  <!-- Nama Paket -->
  <h3 class="package-title">{{ pkg.name_package }}</h3>

  <!-- Star Rating -->
<div class="star-info">
  <img
    v-for="n in pkg.star"
    :key="n"
    src="../assets/star.png"
    alt="Star"
    width="20"
    height="20"
    class="star-image"
  />
</div>


  <!-- Bagian Hotel -->
<div class="section-label hotel" style="display: flex; flex-direction: column; align-items: center;">
  <img src="../assets/hotel.png" alt="Hotel Icon" class="icon" width="20px" />
  <span>Hotel</span>
</div>

<div class="hotel-info">
  <p v-for="(line, idx) in pkg.hotel.split('\n')" :key="idx">{{ line }}</p>
</div>

<!-- Bagian Maskapai -->
<div class="section-label maskapai">
  <img src="../assets/maskapai.png" alt="Airline Icon" class="icon"/>
  <span>Maskapai</span>
</div>
<!-- Airline container dengan gaya mirip price-list -->
<div class="airlines-wrapper">
  <div class="airlines-column">
    <div v-for="(airline, i) in parseAirlines(pkg.airline_path)" :key="i" class="airline-column-item">
      <img :src="airline" alt="airline logo" class="airline-logo" />
    </div>
  </div>
</div>

<div class="price-list">
  <div class="price-item" v-if="parseFloat(pkg.quad) > 0">
    <span class="price-label">Quad</span><br>
    <span class="price-value">{{ formatPriceDollar(pkg.quad) }}</span>
  </div>
  <div class="price-item" v-if="parseFloat(pkg.triple) > 0">
    <span class="price-label">Triple</span><br>
    <span class="price-value">{{ formatPriceDollar(pkg.triple) }}</span>
  </div>
  <div class="price-item" v-if="parseFloat(pkg.double) > 0">
    <span class="price-label">Double</span><br>
    <span class="price-value">{{ formatPriceDollar(pkg.double) }}</span>
  </div>
</div>
</div>

            </div>
          </div>
        </section>

        <router-link 
  to="/hajj-packages" 
  custom
  v-slot="{ navigate }"
>
  <button 
    class="btn-rincian"
    @click="navigate"
    @keyup.enter="navigate"
    role="link"
  >
    Lihat Selengkapnya →
  </button>
</router-link>
        

        <div class="subheader" data-aos="fade-up">
          <h2>Paket Wisata</h2>
          <img src="../assets/line.svg" alt="Decorative line" class="line-subheader" />
          <p class="package-description">Shamain Travel menghadirkan berbagai paket eksklusif sebagai pilihan terbaik untuk perjalanan wisata yang penuh berkah dan kenyamanan.</p>
        </div>




        <!-- ISI DISINI -->
<section class="program-section" v-if="programsWisata.length > 0" data-aos="fade-up">
          <div v-for="program in programsWisata" :key="program.id_program" class="program-wrapper">
            <h2 class="program-title">{{ program.name_program }}</h2>
            <p class="program-period">Periode: {{ program.period }}</p>
            <hr class="divider" />

            <div class="package-list">
              <div
  class="package-card"
  :class="getCardClass(pkg.name_package)"
  v-for="(pkg, index) in program.packages"
  :key="index"
>
  <!-- Judul Statis -->
  <h4 class="static-title">Paket</h4>

  <!-- Nama Paket -->
  <h3 class="package-title">{{ pkg.name_package }}</h3>

  <!-- Star Rating -->
<div class="star-info">
  <img
    v-for="n in pkg.star"
    :key="n"
    src="../assets/star.png"
    alt="Star"
    width="20"
    height="20"
    class="star-image"
  />
</div>


  <!-- Bagian Hotel -->
<div class="section-label hotel" style="display: flex; flex-direction: column; align-items: center;">
  <img src="../assets/hotel.png" alt="Hotel Icon" class="icon" width="20px" />
  <span>Hotel</span>
</div>

<div class="hotel-info">
  <p v-for="(line, idx) in pkg.hotel.split('\n')" :key="idx">{{ line }}</p>
</div>

<!-- Bagian Maskapai -->
<div class="section-label maskapai">
  <img src="../assets/maskapai.png" alt="Airline Icon" class="icon"/>
  <span>Maskapai</span>
</div>
<!-- Airline container dengan gaya mirip price-list -->
<div class="airlines-wrapper">
  <div class="airlines-column">
    <div v-for="(airline, i) in parseAirlines(pkg.airline_path)" :key="i" class="airline-column-item">
      <img :src="airline" alt="airline logo" class="airline-logo" />
    </div>
  </div>
</div>

<div class="price-list">
  <div class="price-item" v-if="parseFloat(pkg.quad) > 0">
    <span class="price-label">Quad</span><br>
    <span class="price-value">{{ formatPrice(pkg.quad) }}</span>
  </div>
  <div class="price-item" v-if="parseFloat(pkg.triple) > 0">
    <span class="price-label">Triple</span><br>
    <span class="price-value">{{ formatPrice(pkg.triple) }}</span>
  </div>
  <div class="price-item" v-if="parseFloat(pkg.double) > 0">
    <span class="price-label">Double</span><br>
    <span class="price-value">{{ formatPrice(pkg.double) }}</span>
  </div>
</div>
</div>

            </div>
          </div>
        </section>


        <router-link 
  to="/tour-packages" 
  custom
  v-slot="{ navigate }"
>
  <button 
    class="btn-rincian"
    @click="navigate"
    @keyup.enter="navigate"
    role="link"
  >
    Lihat Selengkapnya →
  </button>
</router-link>


<div class="subheader" data-aos="fade-up">
  <h2>Layanan Kami</h2>
  <img src="../assets/line.svg" alt="Decorative line" class="line-subheader" />
</div>


<div class="hero-container" data-aos="fade-up">
  <img 
  src="../assets/toy-pesawat.svg" 
  alt="Pesawat Dekorasi"
  class="pesawat-dekoratif"
/>

  <div class="pattern-wrapper"></div>
  <div class="image-wrapper">
    <img 
      src="../assets/bg-pesawat.jpg" 
      alt="Background Pesawat" 
      class="hero-image"
    >
    <div class="overlay">
      <div class="keunggulan-container">
        <div class="keunggulan-box">
          <i class="fas fa-id-card"></i>
          <h3>Legalitas Terjamin</h3>
          <p>Terdaftar resmi di Kemenag & terakreditasi KAN. Ibadah jadi tenang dan aman.</p>
        </div>
        <div class="keunggulan-box">
          <i class="fas fa-concierge-bell"></i>
          <h3>Fasilitas Nyaman</h3>
          <p>Dari hotel hingga transportasi, semua sudah kami siapkan secara maksimal.</p>
        </div>
        <div class="keunggulan-box">
          <i class="fas fa-user-tie"></i>
          <h3>Pendamping Profesional</h3>
          <p>Didampingi Muthowif & pembimbing berpengalaman di bidangnya.</p>
        </div>
        <div class="keunggulan-box">
          <i class="fas fa-map-marker-alt"></i>
          <h3>Kantor Jelas & Terjangkau</h3>
          <p>Kami hadir di Balikpapan untuk pelayanan langsung dan terpercaya.</p>
        </div>
        <div class="keunggulan-box">
          <i class="fas fa-handshake"></i>
          <h3>Pelayanan Ramah</h3>
          <p>Kami melayani sepenuh hati & terbuka terhadap masukan jamaah.</p>
        </div>
        <div class="keunggulan-box">
          <i class="fas fa-sync-alt"></i>
          <h3>Terus Berbenah</h3>
          <p>Kami terus belajar & meningkatkan pelayanan berdasarkan saran jamaah.</p>
        </div>
      </div>
    </div>
  </div>
  <div class="pattern-wrapper2"></div>
</div>






        <div class="subheader" data-aos="fade-up">
          <h2>Galeri Foto</h2>
          <img src="../assets/line.svg" alt="Decorative line" class="line-subheader" />
          <p class="package-description">Jelajahi galeri foto Shamain Travel yang menampilkan momen-momen berharga dari ibadah umroh, haji, dan wisata, memberikan Anda gambaran nyata tentang perjalanan penuh berkah yang kami tawarkan.</p>
        </div>

        <div class="gallery-wrapper" data-aos="fade-up">
  <div
    class="program-block"
    v-for="(program, index) in galleryPrograms"
    :key="index"
  >
    <!-- Tambahkan container di sini -->
    <div class="program-container">
      <h3 class="program-title">{{ program.name_program }}</h3>
      <p class="program-period">{{ program.period }}</p>
      <hr class="divider" />

      <div class="image-grid" :id="'gallery-' + index">
        <a
          v-for="(img, i) in program.image_files"
          :key="i"
          :href="getFullImageUrl(img)"
          class="pswp-gallery-link"
        >
          <img
            :src="getFullImageUrl(img)"
            :data-index="`${index}-${i}`"
            class="gallery-image"
            @load="onImageLoad($event, index, i)"
          />
        </a>
      </div>
    </div>
  </div>
</div>


<router-link 
  to="/gallery" 
  custom
  v-slot="{ navigate }"
>
  <button 
    class="btn-rincian"
    @click="navigate"
    @keyup.enter="navigate"
    role="link"
  >
    Lihat Selengkapnya →
  </button>
</router-link>


<div class="subheader" data-aos="fade-up">
  <h2>Mitra Pendukung Kami</h2>
  <img src="../assets/line.svg" alt="Decorative line" class="line-subheader" />
</div>

<div class="mitra-container" data-aos="fade-up">
    <img v-for="(logo, index) in logos" :key="index" :src="logo" alt="Mitra Logo" class="mitra-logo" />
  </div>


      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import api from "../api";
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import IconSuccess from "../assets/icon-success.png";
import IconError from "../assets/icon-error.png";

import mitra1 from "../assets/mitra1.png";
import mitra2 from "../assets/mitra2.png";
import mitra3 from "../assets/mitra3.png";
import bsi from "../assets/bsi.png";

import garuda from "../assets/airlines/garuda.png";
import lion from "../assets/airlines/lion.png";
import airasia from "../assets/airlines/airasia.png";
import emirates from "../assets/airlines/emirates.png";
import etihad from "../assets/airlines/etihad.png";
import indigo from "../assets/airlines/indigo.png";
import malaysia from "../assets/airlines/malaysia.png";
import oman from "../assets/airlines/oman.png";
import saudia from "../assets/airlines/saudia.png";
import scoot from "../assets/airlines/scoot.png";
import skyteam from "../assets/airlines/skyteam.png";
import turkish from "../assets/airlines/turkish.png";
import royalbrunei from "../assets/airlines/royalbrunei.png"

import AOS from 'aos';
import 'aos/dist/aos.css';


export default {
  components: {
    Header,
    Footer,
  },

  data() {
    return {
      currentYear: new Date().getFullYear(),
      programsUmroh: [],
      programsHaji:[],
      programsWisata:[],
      galleryPrograms: [],
      baseUrl: import.meta.env.VITE_API_BASE_URL.replace("/api", ""),
      lightbox: null,
      nama: "",
      email: "",
      subjek: "",
      pesan: "",

      logos: [
        mitra1,
        mitra2,
        mitra3,
        bsi,
        garuda,
        lion,
        airasia,
        emirates,
        etihad,
        indigo,
        malaysia,
        oman,
        saudia,
        scoot,
        skyteam,
        turkish,
        royalbrunei
      ],
    };
  },
  mounted() {
  this.fetchPrograms();
  this.fetchPrograms2();
  this.fetchPrograms3();
  this.fetchGalleryPublic();
  AOS.init({
      duration: 1000,
      once: false, // animasi hanya saat pertama scroll ke elemen
    });



  // Cegah input karakter berbahaya secara langsung
  const xssPattern = /<|>|on\w+=|script/gi;

  const fields = ['nama', 'email', 'subjek', 'pesan'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', (e) => {
        let clean = e.target.value.replace(xssPattern, '');
        if (clean !== e.target.value) {
          e.target.value = clean;
          this[id] = clean; // Sync dengan v-model
        }
      });
    }
  });
},
  updated() {
    // Re-init lightbox setelah render
    if (this.lightbox) {
      this.lightbox.destroy();
    }

    this.lightbox = new PhotoSwipeLightbox({
      gallery: '.image-grid',
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });

    this.lightbox.init();

    AOS.refresh(); // biar animasi tetap nyala setelah update
  },
  methods: {
    async fetchPrograms() {
  try {
    const response = await api.get("/public-packages/get");

    // Urutan khusus
    const order = ["Ruby", "Emerald", "Sapphire", "Diamond", "Silver", "Gold"];

    // Filter hanya program Umroh
    const umrohPrograms = response.data.filter(program =>
      program.category_program === "Umroh"
    );

    // Cari program Umroh dengan id_program paling besar
    const latestUmrohProgram = umrohPrograms.reduce((latest, program) => {
      return (!latest || program.id_program > latest.id_program) ? program : latest;
    }, null);

    if (latestUmrohProgram) {
      // Urutkan paket-paketnya
      latestUmrohProgram.packages.sort((a, b) => {
        return order.indexOf(a.name_package) - order.indexOf(b.name_package);
      });

      // Simpan ke data
      this.programsUmroh = [latestUmrohProgram]; // <- dalam array karena mungkin di template kamu expect array
    } else {
      this.programsUmroh = [];
    }

  } catch (error) {
    console.error("Gagal mengambil data program:", error);
  }
},

async fetchPrograms2() {
  try {
    const response = await api.get("/public-packages/get");

    // Urutan khusus
    const order = ["Ruby", "Emerald", "Sapphire", "Diamond", "Silver", "Gold"];

    // Filter hanya program Umroh
    const umrohPrograms = response.data.filter(program =>
      program.category_program === "Haji"
    );

    // Cari program Umroh dengan id_program paling besar
    const latestUmrohProgram = umrohPrograms.reduce((latest, program) => {
      return (!latest || program.id_program > latest.id_program) ? program : latest;
    }, null);

    if (latestUmrohProgram) {
      // Urutkan paket-paketnya
      latestUmrohProgram.packages.sort((a, b) => {
        return order.indexOf(a.name_package) - order.indexOf(b.name_package);
      });

      // Simpan ke data
      this.programsHaji = [latestUmrohProgram]; // <- dalam array karena mungkin di template kamu expect array
    } else {
      this.programsHaji = [];
    }

  } catch (error) {
    console.error("Gagal mengambil data program:", error);
  }
},
async fetchPrograms3() {
  try {
    const response = await api.get("/public-packages/get");

    // Urutan khusus
    const order = ["Ruby", "Emerald", "Sapphire", "Diamond", "Silver", "Gold"];

    // Filter hanya program Umroh
    const umrohPrograms = response.data.filter(program =>
      program.category_program === "Wisata"
    );

    // Cari program Umroh dengan id_program paling besar
    const latestUmrohProgram = umrohPrograms.reduce((latest, program) => {
      return (!latest || program.id_program > latest.id_program) ? program : latest;
    }, null);

    if (latestUmrohProgram) {
      // Urutkan paket-paketnya
      latestUmrohProgram.packages.sort((a, b) => {
        return order.indexOf(a.name_package) - order.indexOf(b.name_package);
      });

      // Simpan ke data
      this.programsWisata = [latestUmrohProgram]; // <- dalam array karena mungkin di template kamu expect array
    } else {
      this.programsWisata = [];
    }

  } catch (error) {
    console.error("Gagal mengambil data program:", error);
  }
},

formatPrice(value) {
  return 'Rp ' + Number(value).toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
},
formatPriceDollar(value) {
  return '$' + Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
},
    parseAirlines(pathString) {
  const paths = pathString.split(',').map(p => p.trim());
  return paths.map(p => new URL(`../${p}`, import.meta.url).href);
},
getCardClass(name) {
  const lower = name.toLowerCase();
  if (lower.includes('ruby')) return 'ruby-card';
  if (lower.includes('emerald')) return 'emerald-card';
  if (lower.includes('sapphire')) return 'sapphire-card';
  if (lower.includes('diamond')) return 'diamond-card';
  if (lower.includes('silver')) return 'silver-card';
  if (lower.includes('gold')) return 'gold-card';
  return '';
},

async fetchGalleryPublic() {
  try {
    const res = await api.get("/public-gallery/get");
    const rawData = res.data.data;

    // Mengurutkan data berdasarkan id_gallery secara menurun (terbesar ke terkecil)
    const sortedData = rawData.sort((a, b) => b.id_gallery - a.id_gallery);

    // Ambil dua data terakhir setelah diurutkan
    const latestTwoData = sortedData.slice(0, 2); // Ambil hanya dua yang pertama

    // Memproses image_files untuk setiap item
    this.galleryPrograms = latestTwoData.map((item) => {
      let image_files = [];

      if (Array.isArray(item.image_files) && item.image_files.length > 0) {
        image_files = item.image_files[0]
          .split(",")
          .map((path) => path.trim().replace(/\\/g, "/"))
          .filter((path) => path.length > 0);
      }

      return {
        ...item,
        image_files,
      };
    });
  } catch (error) {
    console.error("Gallery fetch error:", error);
  }
},
    getFullImageUrl(relativePath) {
      return `${this.baseUrl}${relativePath}`;
    },
    onImageLoad(event, groupIndex, imageIndex) {
      const img = event.target;
      const anchor = img.parentElement;

      // Set dimensi asli untuk PhotoSwipe
      anchor.setAttribute("data-pswp-width", img.naturalWidth);
      anchor.setAttribute("data-pswp-height", img.naturalHeight);
    },



    showNotification(message, isSuccess) {
      const notification = document.createElement("div");
      notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${isSuccess ? IconSuccess : IconError}" 
            alt="${isSuccess ? "Success" : "Error"}" 
            style="width: 24px; height: 24px;">
          <span>${message}</span>
        </div>`;

      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${isSuccess ? "#4CAF50" : "#F44336"};
        color: white;
        padding: 15px;
        border-radius: 4px;
        z-index: 1000;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        min-width: 300px;
        font-family: 'Arial', sans-serif;
        font-size: 14px;
        display: flex;
        align-items: center;
        animation: slideIn 0.5s ease-out;
      `;

      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.animation = "slideOut 0.5s ease-out";
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 500);
      }, 2000);
    },

    isValidInput(value) {
      const xssPattern = /<script.*?>.*?<\/script>|on\w+=".*?"/gi;
      return value.trim() !== "" && !xssPattern.test(value);
    },

    async handleSubmit() {
  if (
    !this.isValidInput(this.nama) ||
    !this.isValidInput(this.email) ||
    !this.isValidInput(this.subjek) ||
    !this.isValidInput(this.pesan)
  ) {
    this.showNotification("Semua field wajib diisi dengan benar!", false);
    return;
  }

  try {
    const response = await api.post("/email", {
      nama: this.nama,
      email: this.email,
      subjek: this.subjek,
      pesan: this.pesan,
    });

    if (response.status === 200) {
      this.showNotification("Pesan berhasil dikirim!", true);
      this.nama = "";
      this.email = "";
      this.subjek = "";
      this.pesan = "";
    } else {
      this.showNotification("Gagal mengirim pesan!", false);
    }
  } catch (error) {
    // Ambil pesan error dari backend jika tersedia
    const errorMessage =
      error.response?.data?.message || "Terjadi kesalahan saat mengirim!";
    this.showNotification(errorMessage, false);
    console.error("Error saat kirim email:", error);
  }
},

  },

  beforeUnmount() {
    if (this.lightbox) {
      this.lightbox.destroy();
    }
  },

};
</script>

<style scoped>
/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=El+Messiri:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');


* { 
  margin: 0; 
  padding: 0; 
  box-sizing: border-box; 
  font-family: 'El Messiri', sans-serif; 
}

body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden; /* Mencegah scroll horizontal */
}

/* MAIN CONTENT START */
main {
  width: 100%;
  margin: 0;
  padding: 0;
  flex: 1; /* This will make main take remaining space */
  display: flex;
  flex-direction: column;
}

.main-content {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.image-container {
  flex: 1;
  display: flex;
  position: relative; /* Wajib untuk positioning absolut */
  margin-top: 0;
  padding-top: 0;
  margin-bottom: 50px;
}

.image-container img {
  width: 100%;
  height: 650px;
  object-fit: cover;
  display: block;
  transition: transform 0.8s ease, opacity 0.8s ease;
  filter: brightness(40%); /* Atur brightness ke 70% agar lebih gelap */
}

.overlay-content {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  width: 100%;
  text-align: center;
}

.contact-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.line-image {
  margin-top: 12%;
  width: 180px; /* Adjust as needed */
  height: auto;
}

.contact-text {
  color: white;
  font-weight: bold;
  font-size: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin-top: -50px;
}

.text-cont{
  margin-top: -5%;
}


/* Two Column Layout */
.two-column-container {
  display: flex;
  width: 80%;
  max-width: 100%;
  background-color: white;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 3%;
  margin-left: auto;
  margin-right: auto;
}

.left-column {
  flex: 1;
  padding-right: 30px;
}

.right-column {
  flex: 1;
  padding-left: 30px;
}

.vertical-divider {
  width: 1px;
  background-color: #ccc;
  margin: 0 20px;
}

/* Left Column Styles */
.welcome-text {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 10px;
}

.shamain-travel {
  font-size: 2rem;
  font-weight: bold;
  color: #D6B62A;
  -webkit-text-stroke: 1px black;
  margin-bottom: 20px;
}


.lineleft{
  margin-top: -15%;
}

.description-text {
  color: #555;
  line-height: 1.6;
  margin-top: -60px;
  margin-bottom: 35px;
  text-align: justify;

}

.read-more-btn {
  background-color: #D6B62A;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.read-more-btn:hover {
  background-color: #c4a522;
  transform: translateY(-2px);
}

/* Right Column Styles */
.ask-title {
  color: #D6B62A;
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.ask-subtitle {
  color: #555;
  font-style: italic;
  margin-bottom: 25px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Styling Umum untuk Input dan Textarea */
.form-input {
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

/* Styling untuk Textarea */
.textarea-input {
  min-height: 120px;
  resize: vertical;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

/* Fokus saat Input di-click atau terpilih */
.form-input:focus, .textarea-input:focus {
  border-color: #D6B62A; /* Gunakan warna branding */
  box-shadow: 0 0 5px rgba(214, 182, 42, 0.6); /* Pemberian efek glow */
  outline: none;
}

/* Hover State */
.form-input:hover, .textarea-input:hover {
  border-color: #ccc;
}

/* Styling untuk Placeholder */
.form-input::placeholder, .textarea-input::placeholder {
  color: #bbb;
  font-style: italic;
}

/* Styling untuk Input yang diisi */
.form-input:not(:placeholder-shown), .textarea-input:not(:placeholder-shown) {
  background-color: #fff; /* Menambahkan warna latar belakang putih saat diisi */
}



/* Responsif: Menyesuaikan lebar input pada perangkat mobile */
@media (max-width: 768px) {
  .form-input, .textarea-input {
    font-size: 0.9rem;
  }
}


.submit-btn {
  background-color: #D6B62A;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.submit-btn:hover {
  background-color: #c4a522;
  transform: translateY(-2px);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .two-column-container {
    flex-direction: column;
    width: 90%;
  }
  
  .left-column, .right-column {
    padding: 0;
  }
  
  .vertical-divider {
    width: 100%;
    height: 1px;
    margin: 20px 0;
  }
}

/* Add New Styling */
.quote-text {
  width: 90%;
  font-size: 2rem;
  color: white; /* Custom color */
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  text-transform: uppercase;
  margin-top: 25%;
  margin-left: auto;
  margin-right: auto;
}


.hadith-text {
  font-size: 1.5rem;
  color: white;
  margin-top: 10px;
  line-height: 1.6;
  text-align: center;
  word-wrap: break-word;  /* Memastikan kata panjang terpecah */
  word-break: break-word; /* Memecah kata jika perlu */
  white-space: normal;    /* Mengizinkan pemecahan baris secara alami */
}

.hadith-textspecial {
  font-size: 3rem;
  color: white;
  margin-top: 10px;
  line-height: 1.6;
  text-align: center;
  word-wrap: break-word;  /* Memastikan kata panjang terpecah */
  word-break: break-word; /* Memecah kata jika perlu */
  white-space: normal;    /* Mengizinkan pemecahan baris secara alami */
}

.error-button {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: linear-gradient(135deg, #d4af37, #f1c40f);
  color: #2c3e50;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  margin-top: 1rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
}

.error-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.6);
}

/* For devices with max-width 768px (Tablets) */
@media (max-width: 768px) {
  .line-image{
    margin-top: 25%;
  }
  .contact-text {
    font-size: 1.8rem; /* Smaller font size for tablets */
  }

  .quote-text {
    font-size: 1.25rem; /* Smaller font size */
    margin-top: 38%; /* Adjust margin */
  }

  .hadith-text {
    font-size: 1rem; /* Smaller font size */
    margin-top: 8px; /* Adjust margin */
  }

  .error-button {
    padding: 0.7rem 1.5rem; /* Adjust button size */
    font-size: 1rem; /* Adjust font size for smaller buttons */
  }
}

/* For devices with max-width 480px (Mobile) */
@media (max-width: 480px) {

  .line-image{
    margin-top: 55%;
  }
  
  .quote-text {
    font-size: 1.7rem; /* Smaller font size */
    margin-top: 68%; /* Adjust margin */
  }

  .hadith-text {
    font-size: 0.9rem; /* Smaller font size */
    margin-top: 5px; /* Adjust margin */
  }

  .error-button {
    padding: 0.6rem 1.2rem; /* Adjust button size */
    font-size: 0.9rem; /* Adjust font size for smaller buttons */
  }

  .hadith-textspecial {
  font-size: 2rem;
}
}


.subheader {
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  margin-bottom: 0;
  text-align: center;
  font-size: 20px;
}

.subheader2 {
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  margin-bottom: -1000px;
  text-align: center;
  font-size: 20px;
}

.line-subheader {
  margin-top: -80px;
  width: 230px;
}

.package-description {
  font-size: 1rem;
  color: #555;
  margin-top: -80px;
  padding: 0 20%;
  line-height: 1.4;
  font-weight: 400;
}

@media (max-width: 768px) {
  .package-description {
    padding: 0 10%;
    margin-top: -80px;
  }
}




/*PACKAGE CARD START*/
.program-section {
  padding: 30px 10%;
}

.program-wrapper {
  margin-bottom: 3%;
}

.program-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.program-period {
  font-size: 1rem;
  color: #666;
  margin-bottom: 10px;
}

.divider {
  border: 1px solid black;
  margin-bottom: 20px;
}


.ruby-card {
  background: radial-gradient(circle at 0% 0%, #2e1b1b, #921010, #9b111e, #170b11);
  color: #fff;
  box-shadow: 0 0 20px rgba(155, 17, 30, 0.6);
}

.emerald-card {
  background: radial-gradient(circle at 0% 0%, #00674f, #1e2627, #02634d, #003d31);
  color: #eafff5;
  box-shadow: 0 0 20px rgba(0, 103, 79, 0.5);
}


.sapphire-card {
  background: radial-gradient(
    circle at 0% 0%,
    #0a0f1d,
    #0f3a75,
    #0f52ba,
    #1a64d6,
    #0f3a75,
    #0a0f1d
  );
  color: #eaf4ff;
  box-shadow: 0 0 20px rgba(15, 82, 186, 0.6);
}



.diamond-card {
  background: radial-gradient(
    circle at 0% 0%,
    #2b2b2b,
    #5a5a5a,
    #b0b0b0,
    #e6e6e6,
    #cfcfcf,
    #5e5e5e,
    #2b2b2b
  );
  color: #222;
  box-shadow: 0 0 25px rgba(200, 200, 200, 0.6);
}



.silver-card {
  background: radial-gradient(
    circle at 0% 0%,
    #4e4e4e,
    #999999,
    #c4c4c4,
    #bababa,
    #909090,
    #4e4e4e
  );
  color: #2c2c2c;
  box-shadow: 0 0 14px rgba(144, 144, 144, 0.35);
  border: 1px solid #a0a0a0;
}


.gold-card {
  background: radial-gradient(
    circle at 0% 0%,
    #5c4600,
    #a38d3a,
    #e0c867,
    #b09002,
    #5c4600
  );
  color: #2b2000;
  box-shadow: 0 0 16px rgba(222, 193, 88, 0.4);
  border: 1px solid #b98f2e;
}


.package-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.package-card {
  flex: 0 0 270px;
  max-width: 270px;
  box-shadow: 0 12px 50px rgba(0, 0, 0, 0.35); /* makin gelap dan dalam */
  border-radius: 30px;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.package-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 50px rgba(0, 0, 0, 0.35); /* makin gelap dan dalam */
}

/* Small title */
.static-title {
  font-size: 1.1rem;
  color: white;
  margin-bottom: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Package main title */
.package-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: white;
  letter-spacing: -0.5px;
}

/* Stars */
.star-info {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 6px;
}

/* Section label */
.section-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 700;
  color: white;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

/* Icon in label */
.section-label .icon {
  width: 45px;
  height: auto;
}

/* Hotel info */
.hotel-info {
  text-align: center;
  font-size: 1rem;
  color: white;
  line-height: 1.5;
  margin-bottom: 1rem;
  padding: 0 0.5rem;
}

/* Wrapper dengan motif & transparansi */
.airlines-wrapper {
  background: url('../assets/islamic-pattern.png') center center / cover no-repeat;
  background-size: 400px;
  background-repeat: repeat;
  position: relative;
  border-radius: 2.25rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

/* Layer putih transparan */
.airlines-wrapper::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.9);
  z-index: 0;
}

/* Maskapai tetap di atas layer transparan */
.airlines-column {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  position: relative; /* Penting agar ada di atas ::before */
  z-index: 1;
}

.airline-column-item {
  flex: 0 1 calc(25% - 12px); /* maksimal 4 per baris */
  display: flex;
  align-items: center;
  justify-content: center;
}

.airline-logo {
  height: 55px;
  object-fit: contain;
}


/* Price section */
.price-list {
  background: url('../assets/islamic-pattern.png') center center / cover no-repeat;
  background-size: 400px; /* kamu bisa adjust kalau perlu */
  background-repeat: repeat;
  position: relative;
  border-radius: 2.25rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  color: #222;
  text-align: center;
  overflow: hidden;
  margin-top: auto;

}

/* Transparansi layer background */
.price-list::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.9); /* buat opacity halus di atas pattern */
  z-index: 0;
}

/* Price items */
.price-item {
  position: relative;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #e2e2e2;
  z-index: 1;
}

/* Hapus garis bawah di item terakhir */
.price-item:last-child {
  border-bottom: none;
}

.price-label {
  font-size: 1rem;
  color: #555;
  font-weight: 500;
  display: block;
  margin-bottom: 2%; /* atur jarak label ke value */
}


/* Harga besar */
.price-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: #000;
}




.gallery-wrapper {
  max-width: 80%;
  margin-left: 14%;
  padding: 2rem 1rem;
  margin-bottom: -2%;
  
}

.program-block {
  margin-bottom: 2rem;
  text-align: left;
  max-width: 90%;
}

.program-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
  margin-left: 3%;
}

.program-period {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 0.8rem;
  margin-left: 3%;
}

.divider {
  border: 0;
  border: 1px solid black;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3%;
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.gallery-image {
  width: 230px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.program-container {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}


.gallery-image:hover {
  transform: scale(1.05);
}

@media (max-width:768px){
  .gallery-image{
    width: 440px;
  }
  .title-wrapper{
    margin-left: 6%;
  }
}

@media (max-width:480px){
  .image-grid {
  justify-content: center;
}
.divider{
  margin-bottom: 10%;
}
.gallery-image{
    width: 230px;
  }
  .title-wrapper{
    margin-left: 10%;
  }
}



.btn-rincian {
  background: url('../assets/islamic-pattern-fade.png') center center / cover no-repeat;
  background-size: 100px;
  background-repeat: repeat;
  width: 15%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  color: #222;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 2.25rem;
  font-weight: bold;
  font-size: 0.95rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 6%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-rincian:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

@media (max-width:768px){
.btn-rincian{
  width: 30%;
}

.gallery-wrapper {

  margin-bottom: -4%;
  
}
}

@media (max-width:480px){
.btn-rincian{
  width: 50%;
}
.gallery-wrapper {

margin-bottom: -8%;

}
}



.mitra-container {
  position: relative;
  background: url('../assets/islamic-pattern.png') center center / cover no-repeat;
  background-size: 400px;
  background-repeat: repeat;
  border-radius: 2.25rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  color: #222;
  text-align: center;
  overflow: hidden;

  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Default: 4 kolom */
  column-gap: 60px;
  row-gap: 30px;
  justify-items: center;
  padding: 2.5rem 1.5rem;

  max-width: 85%;
  margin-left: auto;
  margin-right: auto;
  margin-top: -3%;
  margin-bottom: 3%;
}

.mitra-container::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.9);
  z-index: 0;
  border-radius: 2.25rem;
}

.mitra-container > * {
  position: relative;
  z-index: 1;
}

.mitra-logo {
  width: 100px;
  height: auto;
  object-fit: contain;
  transition: transform 0.3s ease;
  display: block;
  margin-left: auto;
  margin-right: auto;
}


.mitra-logo:hover {
  transform: scale(1.05);
}

/* Responsive - Tablet: ubah jadi 3 kolom */
@media (max-width: 1024px) {
  .mitra-container {
    grid-template-columns: repeat(3, 1fr); /* 3 kolom */
    column-gap: 50px;
    row-gap: 25px;
    margin-top: -6%;
    margin-bottom: 4%;
  }
}

/* Responsive - Mobile */
@media (max-width: 768px) {
  .mitra-logo {
    width: 60px;
  }

  .mitra-container {
    grid-template-columns: repeat(3, 1fr); /* Tetap 3 kolom di mobile */
    column-gap: 40px;
    row-gap: 20px;
    margin-top: -12%;
    margin-bottom: 5%;
  }
}

@media (max-width: 480px) {
  .mitra-logo {
    width: 50px;
  }

  .mitra-container {
    grid-template-columns: repeat(2, 1fr); /* Opsional: 2 kolom di HP kecil */
    column-gap: 30px;
    row-gap: 20px;
    margin-top: -18%;
    margin-bottom: 8%;
  }
}





.pattern-wrapper {
  position: relative;
  background-image: url("../assets/islamic-pattern.png");
  background-repeat: repeat;
  background-size: auto;
  width: 100%;
  height: 120px;
  padding: 0;
  overflow: hidden;
  z-index: 10;
  box-shadow: 
  0 6px 16px rgba(0, 0, 0, 0.45),  /* bayangan bawah */
  0 -6px 16px rgba(0, 0, 0, 0.45); /* bayangan atas */
}

.pattern-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
  z-index: 10;
}

.pattern-wrapper2 {
  position: relative;
  background-image: url("../assets/islamic-pattern.png");
  background-repeat: repeat;
  background-size: auto;
  width: 100%;
  height: 120px;
  margin-top: -14.25%;
  padding: 0;
  overflow: hidden;
  z-index: 10;
  box-shadow: 
  0 6px 16px rgba(0, 0, 0, 0.45),  /* bayangan bawah */
  0 -6px 16px rgba(0, 0, 0, 0.45); /* bayangan atas */
}

.pattern-wrapper2::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
  z-index: 0;
}

.hero-container {
  width: 100%;
  position: relative;
  overflow: hidden;
  margin-bottom: 3%;
  margin-top: -5%;
}

.pesawat-dekoratif {
  position: absolute;
  top: -5%;
  left: 30%;

  width: 40%; /* atau gunakan persentase jika mau lebih fleksibel */
  z-index: 25;
  pointer-events: none; /* agar tidak bisa diklik atau ganggu elemen lain */
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  /* Calculate aspect ratio padding: height/width * 100% */
  padding-bottom: calc(1021 / 1440 * 100%); /* 70.9% for 1440x1021 image */
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80%;
  object-fit: cover;
  display: block;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80%;
  background-color: rgba(214, 182, 42, 0.9); /* warna kuning dengan transparansi */
  box-shadow: 
  0 6px 16px rgba(0, 0, 0, 0.45),  /* bayangan bawah */
  0 -6px 16px rgba(0, 0, 0, 0.45); /* bayangan atas */
}

/* Optional: Add responsive adjustments */
@media (max-width: 768px) {
  .image-wrapper {
    padding-bottom: 100%; /* More square aspect ratio on mobile */
  }

  .hero-image{
    height: 100%;
  }

  .overlay{
    height: 100%;
  }
}



.keunggulan-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
  max-width: 100%;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15%;
}

.keunggulan-box {
  background-color: #ffffff; /* putih */
  color: black;            /* hitam pekat */
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25); /* bayangan lebih tajam */
  text-align: center;
  transition: all 0.3s ease;
  border: none; /* hilangkan border putih sebelumnya */
}


.keunggulan-box i {
  font-size: 36px;
  color: black;
  margin-bottom: 5px;
}

.keunggulan-box h3 {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  color: black;
}

.keunggulan-box p {
  font-size: 14px;
  color: black;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .keunggulan-container {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 15%;
    gap: 40px;
  }

  .keunggulan-box {
    padding: 12px;
    font-size: 10px;
  }

  .hero-container {
  margin-bottom: 0;
}

.pattern-wrapper{
    margin-top: -5%;
  }

  .pattern-wrapper2{
    margin-top: 0%;
  }

  .pesawat-dekoratif {
  top: -1%;
}

}


@media (max-width: 480px) {
  .keunggulan-container {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 12%;
    gap: 12px;
  }

  .keunggulan-box {
    padding: 12px;
    font-size: 6.5px;
    border: 1px solid white;
  }

  .keunggulan-box i {
    font-size: 20px;
    margin-bottom: 4px;
  }

  .keunggulan-box h4 {
    font-size: 7px;
    margin-bottom: 4px;
  }

  .keunggulan-box p {
    font-size: 10px;
    line-height: 1.2;
  }

  .pattern-wrapper{
    margin-top: -5%;
  }

  .pattern-wrapper2{
    margin-top: 0%;
  }

  .pesawat-dekoratif {
  top: 5%;
  }
}

@media (max-width:479px) and (min-width:361px){
  .pattern-wrapper2{
    margin-top: 60%;
  }

  .overlay{
    height: 160%;
  }
}

@media (max-width:765px) and (min-width:481px){
  .pattern-wrapper2{
    margin-top: 60%;
  }

  .overlay{
    height: 160%;
  }
}

@media (max-width:360px){
  .pattern-wrapper2{
    margin-top: 80%;
  }

  .overlay{
    height: 250%;
  }
}

</style>

  