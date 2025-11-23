<template>
  <div class="login-view">
    <Header />
    <main>
      <div class="main-content">
        <div class="overlay-content">
          <div class="contact-container">
            <img src="../assets/line.svg" alt="Decorative line" class="line-image" />
            <h2 class="contact-text">Hubungi Kami</h2>
          </div>
        </div>
        <div class="image-container">
          <img src="../assets/public3.jpg" alt="Login Background" />
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

        
        <!-- Elegant Map Container -->
        <div class="map-container">
          <h3 class="map-title">Lokasi Kami</h3>
          <div class="map-wrapper">
            <div id="travel-map" class="map"></div>
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

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      travelLocation: [-1.246449346500444, 116.85507442387171]
    };
  },
  mounted() {
    // Wait for Leaflet to be loaded from CDN
    if (typeof L !== 'undefined') {
      this.initMap();
    } else {
      const checkLeaflet = setInterval(() => {
        if (typeof L !== 'undefined') {
          clearInterval(checkLeaflet);
          this.initMap();
        }
      }, 100);
    }
  },
  methods: {
    initMap() {
      // Initialize map
      const map = L.map('travel-map').setView(this.travelLocation, 17);
      
      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Add custom marker
      const customIcon = L.icon({
        iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      });
      
      // Create marker and open popup automatically
      const marker = L.marker(this.travelLocation, {icon: customIcon})
        .addTo(map)
        .bindPopup("<b>Alshawq Haromain Travel</b><br>Jl. Mayor TNI AD RT. 43 No. 21")
        .openPopup(); // Ini yang membuat popup selalu terbuka
      
      // Optional: Close popup when clicking elsewhere on the map
      map.on('click', function() {
        marker.closePopup();
      });
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


/* Contact Info Container Styles */
.contact-info-container {
  display: flex;
  flex-direction: row; /* Changed from column to row */
  justify-content: center; /* Center horizontally */
  align-items: stretch; /* Make cards same height */
  flex-wrap: wrap; /* Allow wrapping on small screens */
  gap: 30px; /* Adjust gap between cards */
  padding: 40px 20px;
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
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

/* Elegant Map Styles */
.map-container {
  width: 100%;
  padding: 40px 20px;

  text-align: center;
}

.map-title {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 25px;
  position: relative;
  display: inline-block;
}

.map-title:after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(to right, #4286f4, #25d366, #ffc107);
}

.map-wrapper {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.map {
  height: 450px;
  width: 100%;
  z-index: 1;
}


/* Responsive Map */
@media (max-width: 768px) {
  .map {
    height: 350px;
  }
  
  .map-overlay {
    top: 10px;
    left: 10px;
    padding: 8px 12px;
    font-size: 0.9rem;
  }
  
  .map-pin {
    font-size: 1.2rem;
  }
}

.custom-tooltip {
  background-color: white;
  border: 2px solid #4286f4;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
}

  </style>
  