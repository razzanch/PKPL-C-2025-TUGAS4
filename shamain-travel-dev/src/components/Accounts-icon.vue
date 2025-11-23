<template>
    <span class="account-icon" @click="toggleMenu">
      <img src="../assets/account.png" alt="Account" />
      <div v-show="isMenuOpen" class="account-menu">
        <div class="account-info">
            <img src="../assets/user.png" alt="Logout" class="logout-icon" />
          <span class="username">{{ username }}</span>
        </div>
        <div class="logout" @click="logout">
            <img src="../assets/logout.png" alt="Logout" class="logout-icon" />
          <span>Logout</span>
        </div>
      </div>
    </span>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "AccountIcon",
    data() {
      return {
        isMenuOpen: false,
        username: "",
      };
    },
    mounted() {
      this.fetchUsername();
    },
    methods: {
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      
      },
      async fetchUsername() {
        try {
          const token = localStorage.getItem("token");
          if (!token) return;
  
          const baseURL = import.meta.env.VITE_API_BASE_URL;
          const response = await axios.get(`${baseURL}/auth/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.username = response.data.data.username;
        } catch (error) {
          console.error("Gagal mengambil username:", error);
        }
      },
      logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        this.$router.push("/home");
      },
    },
  };
  </script>
  
  <style scoped>
  .account-icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    top: 10px;
    right: 8px;
  }
  
  .account-icon img {
  width: 40px;
  height: 40px;
  transition: transform 0.3s ease-out;
}

/* Ukuran logout icon spesifik dan tidak terpengaruh oleh .account-icon img */
.logout-icon img {
  width: 16px; /* Atur sesuai keinginan */
  height: 16px;
  margin-right: 10px;
}
  
  .account-icon img:hover {
    transform: scale(1.2);
  }
  
  .account-menu {
    position: absolute;
    top: 50px;
    right: 0;
    background:black;
    color: white;
    padding: 15px;
    border-radius: 12px;
    width: 180px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  .account-info {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  
  .username {
    font-weight: 600;
    font-size: 14px;
    color: white;
  }
  
  .logout {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px 0;
    transition: background-color 0.3s ease;
    border-radius: 6px;
  }
  
  .logout:hover {
    background-color: #d6b62a; /* Warna hover */
  }
  
  .logout-icon {
  margin-right: 20px;
}


  
  .logout span {
    font-size: 14px;
    font-weight: 500;
  }
  </style>
  