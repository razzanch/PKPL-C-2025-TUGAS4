<template>
  <div class="login-view">
    <Header />
    <main>
      <div class="main-content">
        <!-- Hero Section -->
        <div class="overlay-content">
          <div class="contact-container">
            <img src="../assets/line.svg" alt="Decorative line" class="line-image" />
            <h2 class="contact-text">Rincian Paket</h2>
          </div>
        </div>
        <div class="image-container">
          <img src="../assets/public3.jpg" alt="Login Background" />
        </div>

<!--ISI DISINI-->
<div v-if="dataPackage.name_program && dataPackage.period" class="program-wrapper">
          <h2 class="program-title">{{ dataPackage.name_program }}</h2>
          <p class="program-period">Periode: {{ dataPackage.period }}</p>
          <hr class="divider" />
        </div>

       <!-- Section Layout Baru -->
<div class="section-layout" v-if="dataPackage.package && dataPackage.package.name_package">
  <!-- Kiri: Package Card -->
  <div
    class="package-card"
    :class="getCardClass(dataPackage.package.name_package)"
  >
    <h4 class="static-title">Paket</h4>
    <h3 class="package-title">{{ dataPackage.package.name_package }}</h3>

    <div class="star-info">
      <img
        v-for="n in dataPackage.package.star"
        :key="n"
        src="../assets/star.png"
        alt="Star"
        width="20"
        height="20"
        class="star-image"
      />
    </div>

    <div class="section-label hotel" style="display: flex; flex-direction: column; align-items: center;">
      <img src="../assets/hotel.png" alt="Hotel Icon" class="icon" width="20px" />
      <span>Hotel</span>
    </div>
    <div class="hotel-info">
      <p v-for="(line, idx) in dataPackage.package.hotel?.split('\n')" :key="idx">{{ line }}</p>
    </div>

    <div class="section-label maskapai">
      <img src="../assets/maskapai.png" alt="Airline Icon" class="icon" />
      <span>Maskapai</span>
    </div>
    <div class="airlines-wrapper">
    <div class="airlines-column">
      <div
        v-for="(airline, i) in parseAirlines(dataPackage.package.airline_path)"
        :key="i"
        class="airline-column-item"
      >
        <img :src="airline" alt="airline logo" class="airline-logo" />
      </div>
    </div>
  </div>

   
  <div class="price-list">
      <div class="price-item" v-if="parseFloat(dataPackage.package.quad) > 0">
        <span class="price-label">Quad</span><br />
        <span class="price-value">
          <!-- Cek jika program dimulai dengan 'Haji', pakai formatPriceDollar -->
          {{ dataPackage.name_program.startsWith('Haji') ? formatPriceDollar(dataPackage.package.quad) : formatPrice(dataPackage.package.quad) }}
        </span>
      </div>
      <div class="price-item" v-if="parseFloat(dataPackage.package.triple) > 0">
        <span class="price-label">Triple</span><br />
        <span class="price-value">
          <!-- Cek jika program dimulai dengan 'Haji', pakai formatPriceDollar -->
          {{ dataPackage.name_program.startsWith('Haji') ? formatPriceDollar(dataPackage.package.triple) : formatPrice(dataPackage.package.triple) }}
        </span>
      </div>
      <div class="price-item" v-if="parseFloat(dataPackage.package.double) > 0">
        <span class="price-label">Double</span><br />
        <span class="price-value">
          <!-- Cek jika program dimulai dengan 'Haji', pakai formatPriceDollar -->
          {{ dataPackage.name_program.startsWith('Haji') ? formatPriceDollar(dataPackage.package.double) : formatPrice(dataPackage.package.double) }}
        </span>
      </div>
    </div>
  </div>

  <!-- Kanan: Termasuk, Catatan, Info Tambahan -->
  <div class="package-side-column">
    <div class="include-container">
  <h3>Termasuk dalam Paket</h3>
  <div class="multi-column-list">
    <ul v-for="(column, colIndex) in splitToColumns(dataPackage.package.include_text)" :key="colIndex">
      <li v-for="(item, index) in column" :key="index">{{ item }}</li>
    </ul>
  </div>
</div>

<div class="note-container">
  <h3>Catatan</h3>
  <div class="multi-column-list">
    <ul v-for="(column, colIndex) in splitToColumns(dataPackage.package.note)" :key="colIndex">
      <li v-for="(item, index) in column" :key="index">{{ item }}</li>
    </ul>
  </div>
</div>


<div class="empty-container bank-info">
  <h3>Informasi Tambahan</h3>
  <div class="bank-card">
    <img src="../assets/bsi.png" alt="Logo BSI" class="bank-logo" />
    <div class="bank-details">
      <p class="bank-title">PEMBAYARAN RESMI</p>
      <p class="bank-account">a.n. <strong>PT. ALSHAWQ HAROMAIN TRAVEL</strong></p>
    </div>
  </div>
</div>

  </div>
</div>

<!-- Contact Info Containers -->
<div class="contact-info-container">
  <!-- Location Card -->
  <div class="contact-card location-card" @click="openGoogleMaps">
    <i class="fas fa-map-marker-alt contact-icon"></i>
    <p class="contact-detail">Jl. Mayor TNI AD RT. 43 No. 21, Sungai Ampal, Sumber Rejo, Balikpapan</p>
  </div>

  <!-- WhatsApp Card -->
  <div class="contact-card whatsapp-card">
    <i class="fab fa-whatsapp contact-icon"></i>
    <div class="whatsapp-numbers">
      <div class="whatsapp-item" @click="openWhatsApp('+6285246499914')">
        <p class="whatsapp-title">Nomor 1</p>
        <p class="contact-detail">0852-4649-9914</p>
      </div>
      <div class="whatsapp-item" @click="openWhatsApp('+6285387196977')">
        <p class="whatsapp-title">Nomor 2</p>
        <p class="contact-detail">0853-8719-6977</p>
      </div>
    </div>
  </div>

  <!-- Phone Card -->
  <div class="contact-card phone-card" @click="copyToClipboard('05425620520')">
    <i class="fas fa-phone-alt contact-icon"></i>
    <p class="contact-detail">0542-5620520</p>
  </div>
</div>

      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import api from "../api";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      dataPackage: {
        package: {},
        name_program: '',
        category_program: '',
        period: ''
      }
    };
  },
  mounted() {
    this.fetchPackageDetail();
  },
  methods: {
    async fetchPackageDetail() {
      const id = this.$route.params.id; // Ambil ID dari URL
      try {
        const response = await api.get(`/public-packages/detail/${id}`);
        this.dataPackage = response.data;
      } catch (error) {
        console.error("Gagal mengambil data:", error);
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

splitToColumns(text) {
  if (!text) return [];

  const allItems = text
    .split(/(?:-\s*|\d+\)\s*|•\s*)/)
    .map(item => item.trim())
    .filter(item => item.length > 0);

  // Langsung kembalikan semua item sebagai 1 kolom
  return [allItems];
},

  openGoogleMaps() {
      const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Alshawq+Haromain+Travel";
      window.open(mapsUrl, "_blank");
    },

    // Buka WhatsApp dengan nomor yang dipilih
    openWhatsApp(phoneNumber) {
      const formattedNumber = phoneNumber.replace(/\D/g, ""); // Hapus karakter non-angka
      const waUrl = `https://wa.me/${formattedNumber}`;
      window.open(waUrl, "_blank");
    },

    // Copy nomor ke clipboard
    copyToClipboard(phoneNumber) {
      navigator.clipboard.writeText(phoneNumber)
        .then(() => {
          alert("Nomor berhasil disalin: " + phoneNumber);
        })
        .catch(err => console.error("Gagal menyalin: ", err));
    }

  }
};
</script>

  
  <style scoped>

  /* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=El+Messiri:wght@400;500;600;700&display=swap');

*{ margin: 0; padding: 0; box-sizing: border-box; font-family: 'El Messiri', sans-serif; }

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
    height: 450px;
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


.program-wrapper {
  padding: 30px 18%;
  
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


.section-layout {
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 5px 18%;
  flex-wrap: wrap;
  align-items: stretch;
  margin-bottom: 5%;
}


/* Kolom Kanan: 3 container bertumpuk sejajar tinggi kiri */
.package-side-column {
  flex: 1 1 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Ini penting agar total tinggi sama dengan kiri */
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
    #5e5e5e,
    #a9a9a9,
    #d8d8d8,
    #d0d0d0,
    #a0a0a0,
    #5e5e5e
  );
  color: #333;
  box-shadow: 0 0 18px rgba(160, 160, 160, 0.4);
  border: 1px solid #bcbcbc;
}



.gold-card {
  background: radial-gradient(
    circle at 0% 0%,
    #7a5c00,
    #bfa443,
    #fceabb,
    #f7d774,
    #c9a602,
    #7a5c00
  );
  color: #3b2900;
  box-shadow: 0 0 20px rgba(255, 223, 100, 0.5);
  border: 1px solid #d4af37;
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


.include-container,
.note-container,
.empty-container {
  background-color: white;
  padding: 50px;
  border-radius: 30px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  flex: 1;
  
  /* Tambahan ini penting: */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* pastikan title dan content tetap di atas */
  gap: 10px; /* beri jarak natural antara <h3> dan <p> */
}

/* Opsional: kasih margin biar ada jarak antar card */
.package-side-column > * + * {
  margin-top: 40px;
}
.multi-column-list {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

.multi-column-list ul {
  list-style-type: disc;
  padding-left: 20px;
  margin: 0;
}

.multi-column-list li {
  margin-bottom: 8px;
  line-height: 1.6;
}

.bank-info {
  padding: 50px;
  border-radius: 30px;
  background-color: white;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  margin-top: 30px;
}

.bank-card {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 15px;
  background: white;
  padding: 16px 24px;
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
}

.bank-logo {
  width: 80px;
  height: auto;
}

.bank-details {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.bank-title {
  font-weight: bold;
  font-size: 16px;
  color: #2b9348;
  margin: 0;
}

.bank-account {
  font-size: 15px;
  margin: 0;
  color: #333;
}



.card {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.card h3 {
  margin-bottom: 10px;
}


/* Contact Info Container Styles */
.contact-info-container {
  display: flex;
  flex-direction: row; /* Changed from column to row */
  justify-content: center; /* Center horizontally */
  align-items: stretch; /* Make cards same height */
  flex-wrap: wrap; /* Allow wrapping on small screens */
  gap: 30px; /* Adjust gap between cards */
  padding: 20px 20px;
  position: relative;
  z-index: 10;
  max-width: 80%;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 2rem;
  margin-bottom: 5%;
  
}

.contact-card {
  width: 300px; /* Fixed width for consistent sizing */
  min-height: 150px; /* Minimum height */
  padding: 30px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

.contact-icon {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.contact-detail {
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
}

/* Color Themes for Each Card */
.location-card {
  background: linear-gradient(135deg, rgba(66, 134, 244, 0.1), rgba(66, 134, 244, 0.2));
  color: #4286f4;
}

.whatsapp-card {
  background: linear-gradient(135deg, rgba(37, 211, 102, 0.1), rgba(37, 211, 102, 0.2));
  color: #25d366;
}

.whatsapp-card {
  background: linear-gradient(135deg, rgba(37, 211, 102, 0.3), rgba(37, 211, 102, 0.5)); /* Lebih terang */
  color: white;
}

.whatsapp-numbers {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Jarak antar nomor */
  width: 100%;
}

.whatsapp-item {
  background: rgba(37, 211, 102, 0.7); /* Lebih terang dari kartu utama */
  padding: 10px;
  border-radius: 10px;
  text-align: center;
}

.whatsapp-title {
  font-weight: bold;
  font-size: 1rem;
}

.phone-card {
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 193, 7, 0.2));
  color: #ffc107;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .contact-card {
    width: 95%;
    padding: 25px 20px;
  }
  
  .contact-icon {
    font-size: 2rem;
  }
  
  .contact-detail {
    font-size: 1rem;
  }
}

  </style>
  