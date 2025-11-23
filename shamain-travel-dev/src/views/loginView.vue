<template>
  <div class="login-view">
    <Header />
    <main>
      <div class="main-content">
        <div class="image-container">
          <img src="../assets/login-bg.svg" alt="Login Background" />
        </div>
        <div class="overlay-container">
          <div class="login-container">
            <div class="login-form">
              <h1>
                SIGN IN
                <img src="../assets/back.png" alt="Back" class="back-icon" @click="goBack" />
              </h1>
              <form @submit.prevent="submitLogin">
                <div class="form-group">
                  <label for="username">Username</label>
                  <input 
                    type="text" 
                    id="username" 
                    v-model="username" 
                    placeholder="Username" 
                    required 
                    @input="validateInput('username')" />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <div class="password-container">
                    <input 
                      :type="showPassword ? 'text' : 'password'" 
                      id="password" 
                      v-model="password" 
                      placeholder="Enter Password"
                      @input="validateInput('password')" />
                    <img :src="passwordIcon" alt="Toggle Password" class="password-toggle" @click="togglePassword" />
                  </div>
                </div>
                <button type="submit" class="signin-button">Sign in</button>
              </form>
            </div>
            <div class="welcome-message">
              <h2>"Menjadi penyelenggara wisata terdepan terkhusus Ibadah Haji dan Umroh"</h2>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />

    <!-- Notifikasi -->
    <div v-if="notification.show" :class="['notification', notification.type]">
      <img :src="notification.icon" alt="Notification Icon" class="notification-icon" />
      <span>{{ notification.message }}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import showPwIcon from "../assets/show-pw.png";
import hidePwIcon from "../assets/hide-pw.png";
import errorIcon from "../assets/icon-error.png";
import successIcon from "../assets/icon-success.png";
import { jwtDecode } from "jwt-decode"; // Perbaiki import


export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
      passwordIcon: showPwIcon,
      notification: {
        show: false,
        message: "",
        type: "",
        icon: "",
      },
    };
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
      this.passwordIcon = this.showPassword ? hidePwIcon : showPwIcon;
    },
    validateInput(field) {
      const invalidChars = /[<>\/\\'";(){}]/g;
      if (invalidChars.test(this[field])) {
        this[field] = this[field].replace(invalidChars, "");
        this.showNotification("Karakter tidak diperbolehkan!", false);
      }
    },
    showNotification(message, isSuccess) {
      this.notification = {
        show: true,
        message,
        type: isSuccess ? "success" : "error",
        icon: isSuccess ? successIcon : errorIcon,
      };

      setTimeout(() => {
        this.notification.show = false;
      }, 3000);
    },

    async submitLogin() {
  try {

  if (this.password.length < 8) {
      this.showNotification("Password harus minimal 8 karakter!", false);
      return; // stop proses login
    }
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const response = await axios.post(`${baseURL}/auth/login`, {
      username: this.username,
      password: this.password,
    });


    if (response.data.code === 200) {
      const token = response.data.data.token;
      const role = response.data.data.role;
      const username = response.data.data.username; // Ambil username dari response


      // Cek apakah token valid sebelum disimpan
      try {
        const decoded = jwtDecode(token);


        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
          console.error("Token expired!");
          this.showNotification("Token expired, login ulang!", false);
          return;
        }
      } catch (err) {
        console.error("Token tidak valid:", err);
        this.showNotification("Token tidak valid!", false);
        return;
      }

      // Simpan token, role, dan username di localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", username); // Simpan username

      this.showNotification("Login berhasil!", true);

      if (role === "master" || role === "admin") {
        this.$router.push("/admin/dashboard");
      } else {
        this.showNotification("Akses ditolak!", false);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
      }
    }
  } catch (error) {
    console.error("Login gagal:", error.response?.data?.message || error.message);
    this.showNotification("Username atau password salah!", false);
  }
},

  },
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
}


.image-container img {
    width: 100%;
    height: 650px;
    object-fit: cover;
    display: block;
    transition: transform 0.8s ease, opacity 0.8s ease;
}

.login-container {
    display: flex;
    background-color: rgba(255, 255, 255, 0.8); /* Opacity 80% */
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    max-width: 900px;
    width: 100%;
    height: 400px;
    backdrop-filter: blur(8px); /* Efek blur */
}

.login-form {
    flex: 1;
    padding: 2rem;
    background-color: transparent;
}

.login-form h1 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
    display: flex; /* Menggunakan flexbox untuk mengatur posisi */
    align-items: center; /* Pusatkan vertikal */
    justify-content: space-between; /* Jarak antara teks dan ikon */
}

.back-icon {
    width: 24px; /* Sesuaikan ukuran ikon */
    height: 24px;
    cursor: pointer; /* Ubah kursor menjadi pointer saat dihover */
    transition: opacity 0.3s ease; /* Efek transisi saat dihover */
}

.back-icon:hover {
    opacity: 0.7; /* Efek hover dengan mengurangi opacity */
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
    color: #555;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
}

.signin-button {
    width: 100%;
    padding: 10px;
    background-color: #838383;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}

.signin-button:hover {
    background-color: #4e4e4e;
}

.welcome-message {
    flex: 1;
    padding: 1rem;
    background-color: rgba(214, 182, 42, 0.8);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.welcome-message img {
    width: 150px;
    margin-bottom: 20px;
}

.welcome-message h2 {
    font-size: 24px;
    margin-bottom: 10px;
}

.welcome-message h2 {
    font-size: 24px;
    line-height: 1.6;
}

.overlay-container {
    position: absolute; /* Posisi overlay diatur agar berada di atas gambar */
    top: 22%; /* Atur jarak dari atas */
    left: 20%; /* Atur jarak dari kiri */
    width: 890px; /* Lebar container sesuai kebutuhan */
    background-color: rgba(255, 255, 255, 0.3); /* Latar belakang hitam dengan opacity 70% */
    color: white; /* Warna teks putih */
    padding: 20px; /* Jarak dalam untuk konten */
    display: flex;
    flex-direction: column;
    align-items: center; /* Posisikan konten di tengah secara horizontal */
    gap: 10px; /* Jarak antara elemen dalam flexbox */
    border-radius: 20px;
    backdrop-filter: blur(8px);
}

.overlay-container.slide-in {
    opacity: 1;
    transform: translateX(0);
}


@keyframes verticalLoopAnimation {
    0% {
        transform: scaleY(1);
        opacity: 1;
    }
    45% {
        transform: scaleY(1);
        opacity: 1;
    }
    50% {
        transform: scaleY(0);
        opacity: 0;
    }
    55% {
        transform: scaleY(0);
        opacity: 0;
    }
    60% {
        transform: scaleY(1);
        opacity: 1;
    }
    100% {
        transform: scaleY(1);
        opacity: 1;
    }
}

.overlay-container p {
    font-size: 16px; /* Ukuran font untuk teks */
    font-weight: 500;
    color: black; /* Warna teks putih agar kontras dengan latar belakang */
    line-height: 2.5; /* Jarak antar baris teks */
    text-align: justify; /* Teks rata kiri-kanan */
    transition: opacity 0.5s ease, transform 0.5s ease;
}
/* Responsif untuk layar kecil */

@media screen and (max-width: 1200px) {
    .overlay-container {
        top: 20%; /* Sesuaikan jarak dari atas */
        left: 2%; /* Sesuaikan jarak dari kiri */
        width: 96%; /* Lebar container hampir penuh */
        flex-direction: column; /* Ubah layout ke column */
    }

    .login-container {
        flex-direction: column; /* Ubah layout ke column */
    }

    .welcome-message h2 {
        font-size: 2vw; /* Ukuran font lebih besar */
        line-height: 1.4; /* Jarak antar baris lebih kecil */
    }
}


/* Media Queries for Responsive Design */
@media screen and (max-width: 1024px) {
    .overlay-container {
        top: 5%; /* Sesuaikan jarak dari atas */
        left: 5%; /* Sesuaikan jarak dari kiri */
        width: 90%; /* Lebar container lebih besar */
    }

    .welcome-message h2 {
        font-size: 3vw; /* Ukuran font lebih besar */
    }
}

@media screen and (max-width: 768px) {
    .overlay-container {
        top: 20%; /* Sesuaikan jarak dari atas */
        left: 2%; /* Sesuaikan jarak dari kiri */
        width: 96%; /* Lebar container hampir penuh */
        flex-direction: column; /* Ubah layout ke column */
    }

    .login-container {
        flex-direction: column; /* Ubah layout ke column */
    }

    .welcome-message h2 {
        font-size: 2vw; /* Ukuran font lebih besar */
        line-height: 1.4; /* Jarak antar baris lebih kecil */
    }
}

@media screen and (max-width: 480px) {
    .welcome-message h2 {

        font-size: 3vw; /* Ukuran font lebih besar */
        line-height: 1.3; /* Jarak antar baris lebih kecil */
    }
}

.password-container {
    position: relative;
    width: 100%;
    box-sizing: border-box;
}

.password-container input {
    width: 100%;
    padding-right: 40px;
}

.password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    cursor: pointer;
    z-index: 1;
}

/* Notifikasi */
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  min-width: 300px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: slideIn 0.5s ease-out;
}

.notification.success {
  background-color: #4CAF50;
  color: white;
}

.notification.error {
  background-color: #F44336;
  color: white;
}

.notification-icon {
  width: 24px;
  height: 24px;
}

/* Animasi */
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
/* MAIN CONTENT END */
  </style>
  