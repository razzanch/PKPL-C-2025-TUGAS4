<template>
  <div class="login-view">
    <Header />
    <main>
      <div class="main-content">
        <div class="overlay-content">
          <div class="contact-container">
            <img src="../assets/line.svg" alt="Decorative line" class="line-image" />
            <h2 class="contact-text">Tentang Kami</h2>
          </div>
        </div>
        <div class="image-container1">
          <img src="../assets/public3.jpg" alt="Login Background" />
        </div>
        <!--disini-->
        <div class="welcome-container">
          <h1>
            <span class="welcome-text">Selamat Datang <br>di<br>  </span>
            <span class="shamain-travel"> SHAMAIN TRAVEL</span>
          </h1>
          <img src="../assets/line.svg" alt="Decorative line" class="line-image" />
        </div>

        <div class="image-container2" data-aos="fade-up">
          <img src="../assets/shamaingroup.jpg" alt="shamain-group photo" class="shamain-group">
        </div>

        <div class="opening-text" data-aos="fade-up">
          <p><strong>SHAMAIN TRAVEL</strong>, merupakan penyelenggara perjalanan Ibadah Haji dan Umroh yang telah terdaftar di Kemenag RI dan sudah terakreditasi oleh Komite Akreditasi Nasional (KAN).</p>
          <p>Pelayanan yang diberikan Shamain Travel mengikuti standar pelayanan baik dalam segi penerbangan, akomodasi hotel, konsumsi, transportasi serta Muthowif atau Pemandu yang mumpuni dan berpengalaman di bidangnya. Sehingga para Jemaah nantinya dapat beribadah dengan khusyu' dan bahagia dalam menjalankan Ibadah Haji maupun Umroh.</p>
          <p>Akhir kata, kesempurnaan hanya milik Allah SWT, namun kami senantiasa memperbaiki dari masukan-masukan maupun saran dari para Jemaah.</p>
        </div>

        <div class="card-container" data-aos="fade-up">
  <div class="card-group">
    <div class="info-card">
      <h2>Visi</h2>
      <img src="../assets/line.svg" alt="Line" class="card-line" />
      <p>Menjadi penyelenggara wisata terdepan terkhusus Ibadah Haji dan Umroh</p>
    </div>
    <div class="info-card">
      <h2>Misi</h2>
      <img src="../assets/line.svg" alt="Line" class="card-line" />
      <p>Membantu calon jemaah Haji dan Umroh dengan memberikan pelayanan yang aman dan nyaman</p>
    </div>
  </div>

  <div class="card-group center">
    <div class="info-card">
      <h2>Motto</h2>
      <img src="../assets/line.svg" alt="Line" class="card-line" />
      <p>"Sahabat Dalam Ibadah"</p>
    </div>
  </div>

  <div class="card-group center">
    <div class="info-card">
      <h2>Legalitas Kami</h2>
      <img src="../assets/line.svg" alt="Line" class="card-line" />
      <p>PT. ALSHAWQ HAROMAIN TRAVEL</p>
      <p>NO SK PPIU 08032300654320002</p>
      <p>Tanggal SK 02-10-2024</p>
      <p>NO NIB 08032300654320002</p>
      <p>NO KEMENHUKAM AHU-0052529.AH.1.1.2024</p>
    </div>
  </div>
</div>


        <div class="subheader" data-aos="fade-up">
          <h2>Perlengkapan Ibadah</h2>
          <img src="../assets/line.svg" alt="Decorative line" class="line-subheader" />
        </div>


        <div class="slider-container" data-aos="fade-up">
    <button class="slider-arrow left-arrow" @click="prevSlide" :disabled="currentIndex === 0">
      <svg class="arrow-icon" viewBox="0 0 24 24">
        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
      </svg>
    </button>
    
    <div class="slider">
      <div 
  class="slide" 
  v-for="(item, index) in visibleItems" 
  :key="index"
>
  <img 
    :src="item.image" 
    :alt="`Perlengkapan Ibadah ${index + 1}`"
    class="perlengkapan-image"
  />
  <p class="item-caption">{{ item.caption }}</p>
</div>

    </div>
    
    <button 
      class="slider-arrow right-arrow" 
      @click="nextSlide" 
      :disabled="currentIndex >= items.length - 3"
    >
      <svg class="arrow-icon" viewBox="0 0 24 24">
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
      </svg>
    </button>
  </div>

  <div class="carousel-indicators">
  <span
    v-for="(dot, i) in totalSlideSets"
    :key="i"
    class="carousel-dot"
    :class="{ active: i === currentDotIndex }"
    @click="goToSlideSet(i)"
  ></span>
</div>


<div class="subheader-2" data-aos="fade-up"> 
  <h2>
    Struktur Organisasi<br> <span class="highlight-shamain">SHAMAIN TRAVEL</span>
  </h2>
  <img src="../assets/line.svg" alt="Decorative line" class="line-subheader-2" />
</div>


<div class="org-structure" data-aos="fade-up">
  <!-- Baris 1 -->
  <div class="org-row1">
    <div class="org-card">
      <img src="../assets/person/p1.png" alt="HJ. SITI NUR ALIYAH">
      <h3>HJ. SITI NUR ALIYAH</h3>
      <p>DIREKTUR</p>
    </div>
    <div class="org-card">
      <img src="../assets/person/p2.png" alt="SHAFWA FRAUNY">
      <h3>SHAFWA FRAUNY</h3>
      <p>KOMISARIS</p>
    </div>
  </div>

  <!-- Baris 2 -->
  <div class="org-row">
    <div class="org-card">
      <img src="../assets/person/p3.png" alt="M. ALI AKBAR">
      <h3>M. ALI AKBAR</h3>
      <p>KOOR. TOUR LEADER</p>
    </div>
    <div class="org-card">
      <img src="../assets/person/p4.png" alt="RAFIF AZKA A.">
      <h3>RAFIF AZKA A.</h3>
      <p>MEDIA</p>
    </div>
    <div class="org-card">
      <img src="../assets/person/p5.png" alt="NUR YENNI">
      <h3>NUR YENNI</h3>
      <p>ADMINISTRASI</p>
    </div>
    <div class="org-card">
      <img src="../assets/person/p6.png" alt="SITI FATIMAH">
      <h3>SITI FATIMAH</h3>
      <p>MARKETING</p>
    </div>
  </div>

  <!-- Baris 3 -->
  <div class="org-row">
    <div class="org-card">
      <img src="../assets/person/p8.png" alt="HABIB ZAKY">
      <h3>HABIB ZAKY</h3>
      <p>TOUR LEADER</p>
    </div>
  </div>
</div>



        
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

import AOS from 'aos';
import 'aos/dist/aos.css';


// Import all images statically
import item1 from "../assets/perlengkapan/item1.png";
import item2 from "../assets/perlengkapan/item2.png";
import item3 from "../assets/perlengkapan/item3.png";
import item4 from "../assets/perlengkapan/item4.png";
import item5 from "../assets/perlengkapan/item5.png";
import item6 from "../assets/perlengkapan/item6.png";
import item7 from "../assets/perlengkapan/item7.png";
import item8 from "../assets/perlengkapan/item8.png";
import item9 from "../assets/perlengkapan/item9.png";
import item10 from "../assets/perlengkapan/item10.png";
import item11 from "../assets/perlengkapan/item11.png";

export default {
  components: {
    Header,
    Footer,
  },

  mounted() {
    AOS.init({
      duration: 1000,
      once: false, // animasi hanya saat pertama scroll ke elemen
    });
  },
  updated() {
    AOS.refresh(); // biar animasi tetap nyala setelah update
  },

  data() {
  return {
    items: [
      { image: item1, caption: "Batik Pria" },
      { image: item2, caption: "Batik Wanita" },
      { image: item3, caption: "Mukena" },
      { image: item4, caption: "Syal" },
      { image: item5, caption: "Buku Panduan" },
      { image: item6, caption: "Nametag" },
      { image: item7, caption: "Bantal Leher" },
      { image: item8, caption: "Tas Kerut" },
      { image: item9, caption: "Zamzam 5L" },
      { image: item10, caption: "Kain Ihram" },
      { image: item11, caption: "Koper Kecil & besar" }
    ],
    currentIndex: 0
  };
},

computed: {
  visibleItems() {
    return this.items.slice(this.currentIndex, this.currentIndex + 3);
  },
  totalSlideSets() {
    return Math.ceil(this.items.length / 3);
  },
  currentDotIndex() {
    return Math.floor(this.currentIndex / 3);
  }
},
  methods: {
    nextSlide() {
    const nextIndex = this.currentIndex + 3;
    if (nextIndex < this.items.length) {
      this.currentIndex = nextIndex;
    }
  },
  prevSlide() {
    const prevIndex = this.currentIndex - 3;
    if (prevIndex >= 0) {
      this.currentIndex = prevIndex;
    }
  },
  goToSlideSet(index) {
    this.currentIndex = index * 3;
  }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=El+Messiri:wght@400;500;600;700&display=swap');

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
  overflow-x: hidden;
}

main {
  width: 100%;
  margin: 0;
  padding: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.main-content {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.image-container1 {
  flex: 1;
  display: flex;
  position: relative;
  margin-bottom: 50px;
}

.image-container1 img {
  width: 100%;
  height: 450px;
  object-fit: cover;
  display: block;
  transition: transform 0.8s ease, opacity 0.8s ease;
  filter: brightness(40%);
}

.image-container2 {
  flex: 1;
  display: flex;
  position: relative;
 justify-content: center;
  margin-top: -70px;
  margin-bottom: 50px;
}

.image-container2 img {
  width: 80%;
  transition: transform 0.8s ease, opacity 0.8s ease;

  border-radius: 20px;
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
  width: 180px;
  height: auto;
}

.contact-text {
  color: white;
  font-weight: bold;
  font-size: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin-top: -50px;
}

.welcome-container {
  text-align: center;
  margin-top: 5%;

}

.welcome-container img {
  margin-top: -100px;
  width: 260px;
}

.welcome-text {
  font-size: 2rem;
  color: black;
}

.shamain-travel {
  font-size: 2rem;
  font-weight: bold;
  color: #D6B62A;
  -webkit-text-stroke: 1px black;
}

.opening-text {
  text-align: center;
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
  margin-top: -5%;
}

.opening-text p {
  font-size: 1rem;
}

.card-container {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.card-group {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.card-group.center {
  justify-content: center;
}

.info-card {
  background-color: white;
  border-radius: 20px;
  padding: 30px 25px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  text-align: center;
  transition: transform 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
}

.card-line {
  width: 80px;
  margin: 10px auto 20px auto;
  display: block;
}

.info-card h2 {
  font-size: 1.6rem;
  color: #222;
  margin-bottom: 5px;
}

.info-card p {
  font-size: 1.05rem;
  line-height: 1.6;
  color: #444;
}

/* Responsive Mobile */
@media (max-width: 768px) {
  .card-group {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .info-card {
    padding: 20px;
    max-width: 90%;
  }

  .info-card h2 {
    font-size: 1.4rem;
  }

  .info-card p {
    font-size: 1rem;
  }

  .card-line {
    width: 60px;
  }
}


.subheader{
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  margin-bottom: 0;
}

.line-subheader{
  margin-top: -80px;
  width: 230px;
}

.subheader-2{
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  margin-bottom: 0;
}

.line-subheader-2{
  margin-top: -90px;
  width: 250px;
}

.highlight-shamain {
  margin-left: 5px;
  font-size: 1.8rem;
  font-weight: bold;
  color: #D6B62A;
  -webkit-text-stroke: 1px black;
}




/**SLIDER DISPLAY**/

.slider-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -3%;
  margin-bottom: 3%;
  width: 100%;
}

.slider {
  display: flex;
  gap: 40px;
  overflow: hidden;
  width: 80%;
  justify-content: center;
}

.slide {
  min-width: 200px;
  transition: transform 0.3s ease;
}

.perlengkapan-image {
  width: 100%;
  max-width: 250px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}

.slider-arrow {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 -50px;
  transition: opacity 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12%;
  margin-left: 12%;
}

.slider-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.arrow-icon {
  width: 50px;
  height: 50px;
  fill: #333;
  transition: fill 0.3s;
}

.slider-arrow:hover:not(:disabled) .arrow-icon {
  fill: #D6B62A;
}
.item-caption {
  text-align: center;
  margin-top: 8px;
  font-weight: bold;
  font-size: 18px;
}


@media (max-width: 768px) {

.slider-container {
  margin-top: -10%;
  gap: 3%;
  flex-direction: row;
  align-items: center;
}

.slider {
  width: 90%;
  gap: 20px;
  justify-content: center;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 10px 0;
}

.slide {
  min-width: 140px;
  max-width: 140px;
  flex-shrink: 0;
  text-align: center;
}

.perlengkapan-image {
  width: 100%;
  height: auto;
  max-width: 140px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.item-caption {
  font-size: 14px;
  margin-top: 6px;
}

.arrow-icon {
  width: 30px;
  height: 30px;
}

.slider-arrow {
  margin-right: 6%;
  margin-left: 6%;
}

}

@media (max-width:480px)
{
  .slider {
  width: 100%;
}

  .slide {
  min-width: 100px;
  max-width: 100px;
}

.slider-arrow {
  margin-right: 0;
  margin-left: 0;
}

}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 7%;
}

.carousel-dot {
  width: 10px;
  height: 10px;
  background-color: #ccc;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.carousel-dot.active {
  background-color: #D6B62A;
}

.org-structure {
  margin-top: -3%;
  margin-bottom: 3%;
  text-align: center;
  padding: 0 20px;
}

.org-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 3%;
}

.org-row1 {
  display: flex;
  flex-direction: column;
  align-items: center;   /* untuk horizontal centering */
  gap: 30px;
  margin-bottom: 3%;
}


.org-card {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 200px;
  text-align: center;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.org-card:hover {
  transform: translateY(-5px);
}

.org-card img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 10px;
}

.org-card h3 {
  margin: 10px 0 5px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.org-card p {
  font-size: 14px;
  color: #D6B62A;
  font-weight: 600;
}

/* === Responsive Styling === */
@media (max-width: 768px) {
  .org-card {
    width: 100%;
    max-width: 250px;
  }

  .org-row {
    gap: 20px;
  }
}




</style>