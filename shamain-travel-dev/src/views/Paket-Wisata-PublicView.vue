<template>
  <div class="login-view">
    <Header />
    <main>
      <div class="main-content">
        <div class="overlay-content">
          <div class="contact-container">
            <img src="../assets/line.svg" alt="Decorative line" class="line-image" />
            <div class="title-wrapper">
              <h2 class="contact-text">Paket Wisata</h2>
              <div class="year-tag">{{ currentYear }}</div>
            </div>
          </div>
        </div>

        <div class="image-container1">
          <img src="../assets/public3.jpg" alt="Login Background" />
        </div>

        <!-- ISI DISINI -->
        <section class="program-section" v-if="programs.length > 0">
          <div v-for="program in programs" :key="program.id_program" class="program-wrapper">
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


<button class="btn-rincian" @click="goToDetail(pkg.id_package)">
  RINCIAN PAKET →
</button>


</div>

            </div>
          </div>
        </section>
        <!-- END ISI -->

        <section class="program-section" v-else>
  <div class="error-container">
    <div class="error-content">
      <h1 class="error-title">🕋</h1>
      <h2 class="error-subtitle">Tidak Ada Program Tersedia</h2>
      <p class="error-message">Saat ini belum ada program dan paket yang bisa ditampilkan.</p>
      <p class="error-message">Silakan cek kembali di lain waktu atau hubungi admin untuk informasi lebih lanjut.</p>
      
      <div class="error-decoration">
        <div class="kaaba-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#d4af37" width="48px" height="48px">
            <path d="M12 2L4 7v10l8 5 8-5V7L12 2zm0 2.5L18 8v8l-6 3.5L6 16V8l6-3.5z"/>
            <path d="M12 6.5l-6 3.5v7l6 3.5 6-3.5v-7l-6-3.5z"/>
          </svg>
        </div>
        <div class="mosque-silhouette"></div>
      </div>
      
      <router-link to="/home" class="error-button">
        Kembali ke Home
      </router-link>
    </div>
  </div>
</section>


      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import api from "../api";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      programs: [],
    };
  },
  mounted() {
    this.fetchPrograms();
  },
  methods: {
    async fetchPrograms() {
      try {
    const response = await api.get("/public-packages/get");

    // Urutan khusus untuk packages
    const order = ["Ruby", "Emerald", "Sapphire", "Diamond", "Silver", "Gold"];

    // Filter program Umroh
    const umrohPrograms = response.data.filter(program =>
      program.category_program === "Wisata"
    );

    // Urutkan setiap paket dalam program berdasarkan name_package
    umrohPrograms.forEach(program => {
      program.packages.sort((a, b) => {
        return order.indexOf(a.name_package) - order.indexOf(b.name_package);
      });
    });

    // Urutkan program berdasarkan id_program dari terbesar ke terkecil
    umrohPrograms.sort((a, b) => b.id_program - a.id_program);

    // Simpan ke data
    this.programs = umrohPrograms;

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

goToDetail(id) {
  this.$router.push(`/detail-package/${id}`);
}

  },
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

.title-wrapper {
  margin-left: 3%;
  display: flex;
  align-items: center;
  gap: 12px;
}

.year-tag {
  background-color: #D6B62A;
  color: white;
  padding: 0.5rem;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  margin-top: -90px;
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

@media (max-width:768px){
  .title-wrapper{
    margin-left: 6%;
  }
}

@media (max-width:480px){
  .title-wrapper{
    margin-left: 10%;
  }
}


.program-section {
  padding: 30px 10%;
}

.program-wrapper {
  margin-bottom: 150px;
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


.btn-rincian {
  background: url('../assets/islamic-pattern-fade.png') center center / cover no-repeat;
  background-size: 100px;
  background-repeat: repeat;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  color: #222;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 2.25rem;
  font-weight: bold;
  font-size: 0.95rem;
  margin-top: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-rincian:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}



/* 404 Error Styles */
.error-container {
  position: relative;
  transform: translate(-50%, -50%);
  margin-top: 18%;
  margin-left: 50%;
  margin-bottom: -18%;
  width: 90%;
  max-width: 600px;
  text-align: center;
  color: white;
  animation: fadeIn 0.8s ease-out;

}

.error-content {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 2rem;
  border-radius: 12px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.error-title {
  font-size: 6rem;
  font-weight: 700;
  color: #d4af37;
  margin: 0;
  line-height: 1;
  text-shadow: 0 2px 10px rgba(212, 175, 55, 0.5);
}

.error-subtitle {
  font-size: 2rem;
  margin: 0.5rem 0;
  font-weight: 600;
}

.error-message {
  font-size: 1.1rem;
 
  line-height: 1.6;
}

.error-decoration {
  position: relative;
  height: 60px;
  margin: 1.5rem 0;
}

.kaaba-icon {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  animation: float 3s ease-in-out infinite;
}

.mosque-silhouette {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10"><path d="M0,10 L10,5 L20,8 L30,2 L40,6 L50,0 L60,6 L70,2 L80,8 L90,5 L100,10 Z" fill="white" opacity="0.3"/></svg>');
  background-size: contain;
  background-repeat: repeat-x;
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

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translate(-50%, -45%); }
  to { opacity: 1; transform: translate(-50%, -50%); }
}

@keyframes float {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-10px); }
}

@media (max-width:768px){
  .error-container{
    margin-bottom: -20%;
    margin-top: 38%;
  }
}
@media (max-width:480px){
  .error-container{
    margin-bottom: -50%;
    margin-top: 65%;
  }
}

</style>