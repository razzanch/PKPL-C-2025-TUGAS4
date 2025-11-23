<template>
  <div class="login-view">
    <Header />
    <main>
      <div class="main-content">
        <div class="overlay-content">
          <div class="contact-container">
    <img src="../assets/line.svg" alt="Decorative line" class="line-image" />
    <div class="title-wrapper">
      <h2 class="contact-text">Galeri Foto</h2>
      <div class="year-tag">{{ currentYear }}</div>
    </div>
  </div>
        </div>

        <div class="image-container1">
          <img src="../assets/public3.jpg" alt="Login Background" />
        </div>

       <!-- Jika ADA program -->
<div class="gallery-wrapper" v-if="galleryPrograms && galleryPrograms.length > 0">
  <div
    class="program-block"
    v-for="(program, index) in galleryPrograms"
    :key="index"
  >
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
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      galleryPrograms: [],
      baseUrl: import.meta.env.VITE_API_BASE_URL.replace("/api", ""),
      lightbox: null,
      currentYear: new Date().getFullYear()
    };
  },
  mounted() {
    this.fetchGalleryPublic();
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
  },
  methods: {
    async fetchGalleryPublic() {
      try {
        const res = await api.get("/public-gallery/get");
        const rawData = res.data.data;

        this.galleryPrograms = rawData.map((item) => {
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
  },
  beforeUnmount() {
    if (this.lightbox) {
      this.lightbox.destroy();
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


.gallery-wrapper {
  max-width: 80%;
  margin-left: 14%;
  padding: 2rem 1rem;
}

.program-block {
  margin-bottom: 3rem;
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



/* 404 Error Styles */
.error-container {
  position: relative;
  transform: translate(-50%, -50%);
  margin-top: 18%;
  margin-left: 50%;
  margin-bottom: -10%;
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