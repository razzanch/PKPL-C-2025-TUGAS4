<template>
  <div class="login-view">
    <Header />
    <main>
      <div class="main-content">
        <div class="overlay-content">
          <!-- 404 Error Container -->
          <div class="error-container">
            <div class="error-content">
              <h1 class="error-title">404</h1>
              <h2 class="error-subtitle">Halaman Tidak Ditemukan</h2>
              <p class="error-message">Sepertinya Anda tersesat dalam kunjungan ini.</p>
              <p class="error-message">Mari kami bantu Anda kembali ke jalan yang benar.</p>
              
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
                Home
              </router-link>
            </div>
          </div>
        </div>
        
        <div class="image-container">
          <img src="../assets/public3.jpg" alt="Login Background" />
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
}
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

/* 404 Error Styles */
.error-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 90%;
  max-width: 600px;
  text-align: center;
  color: white;
  animation: fadeIn 0.8s ease-out;
  margin-top: 9%;
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
    margin-top: 19%;
  }
}
@media (max-width:480px){
  .error-container{
    margin-top: 34%;
  }
}
  </style>
  