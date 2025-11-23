<template>
  <div class="account-admin-view">
    <!-- SIDE NAVBAR -->
    <SideNavbar
      :isCollapsed="isSidebarCollapsed"
      @toggle-sidebar="toggleSidebar"
      @collapse-sidebar="collapseSidebar"
      @expand-sidebar="expandSidebar"
    />

    <!-- MAIN CONTENT & FOOTER -->
    <div class="main-content" :style="{ marginLeft: isSidebarCollapsed ? '70px' : '200px' }">
      <div class="main-header">
        <span class="menu-icon" @click="toggleSidebar"> &#9776; </span>
        <Accounts-icon />
      </div>
      <div class="divider"></div>
      <div class="text-content">
        <div class="text-wrapper">
          <h1 class="add-master-text">Dashboard</h1>
          <p class="data-setup-text">Ringkasan Data</p>
        </div>
       
        <router-link to="/home" custom v-slot="{ navigate }">
  <span class="history-icon" @click="navigate">
    <img src="../assets/back.png" alt="back" />
  </span>
</router-link>

      </div>

      <!-- Form Atas -->
      <div class="form-header">
        <button class="tab-button active">
          {{ currentDate }}
        </button>
      </div>

      <!-- FORM CONTAINER -->
<div class="form-container">
  <!-- Kartu-Kartu -->
  <div v-for="(item, index) in summaryData" :key="index" class="summary-card">
  <i :class="getIconClass(item.title)"></i>
  <h3>{{ item.title }}</h3>
  <p>{{ item.count }}</p>
</div>


  <!-- BARIS 2: GRAFIK DISTRIBUSI PROGRAM -->
  <div class="chart-container-large">
    <canvas id="categoryChart"></canvas>
  </div>

  <!-- BARIS 3: GRAFIK PER PERIODE (Lebar Penuh) -->
  <div class="chart-container">
    <canvas id="periodChart"></canvas>
  </div>

  <!-- BARIS 3: GRAFIK UPLOAD FOTO (Lebar Penuh) -->
  <div class="chart-container">
    <canvas id="galleryChart"></canvas>
  </div>
</div>


      <!-- FOOTER -->
      <FooterAdmin />
    </div>
  </div>
</template>

<script>
import SideNavbar from "../components/Sidebar.vue";
import FooterAdmin from "../components/FooterAdmin.vue";
import AccountsIcon from "../components/Accounts-icon.vue";
import api from "../api";

export default {
  name: "DashboardView",
  components: {
    SideNavbar,
    FooterAdmin,
    AccountsIcon,
  },
  data() {
    return {
      isSidebarCollapsed: false,
      currentDate: this.getFormattedDate(),
      summaryData: [
        { title: "Program Umroh", count: 0 },
        { title: "Program Haji", count: 0 },
        { title: "Program Wisata", count: 0 },
        { title: "Total Foto", count: 0 },
        { title: "Admin Terdaftar", count: 0 },
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
    collapseSidebar() {
      this.isSidebarCollapsed = true;
    },
    expandSidebar() {
      this.isSidebarCollapsed = false;
    },
    getFormattedDate() {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      return `${day}/${month}/${year}`;
    },
    getIconClass(title) {
    switch (title) {
      case 'Program Umroh':
        return 'fas fa-kaaba';
      case 'Program Haji':
        return 'fas fa-mosque';
      case 'Program Wisata':
        return 'fas fa-plane';
      case 'Total Foto':
        return 'fas fa-images';
      case 'Admin Terdaftar':
        return 'fas fa-user-shield';
      default:
        return 'fas fa-info-circle';
    }
  },
    async fetchSummaryData() {
      try {
        this.summaryData[0].count = (await api.get("/dashboard/count-umroh")).data.total;
        this.summaryData[1].count = (await api.get("/dashboard/count-haji")).data.total;
        this.summaryData[2].count = (await api.get("/dashboard/count-wisata")).data.total;
        this.summaryData[3].count = (await api.get("/dashboard/count-gallery")).data.total;
        this.summaryData[4].count = (await api.get("/dashboard/count-admin")).data.total;
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    },
    async fetchChartsData() {
      try {
        const categoryData = await api.get("/dashboard/programs-distribution");
        this.renderChart("categoryChart", categoryData.data, "Distribusi Program");

        const periodData = await api.get("/dashboard/programs-period");
        this.renderChart("periodChart", periodData.data, "Program per Periode");

        const galleryData = await api.get("/dashboard/gallery-program");
        this.renderChart("galleryChart", galleryData.data, "Upload Foto per Program");
      } catch (error) {
        console.error("Error fetching charts data:", error);
      }
    },
    renderChart(canvasId, data, title, chartType = 'bar', theme = 'dark') {
  setTimeout(() => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas ${canvasId} tidak ditemukan`);
      return;
    }

    const ctx = canvas.getContext("2d");

    // Warna premium untuk dataset
    const colors = {
      ruby: '#E0115F', 
      emerald: '#50C878', 
      sapphire: '#0F52BA', 
      diamond: '#B9F2FF', 
      gold: '#FFD700', 
      silver: '#C0C0C0'
    };

    const colorArray = [
      colors.ruby, colors.emerald, colors.sapphire, 
      colors.diamond, colors.gold, colors.silver
    ];

    // Tema Background
    const bgThemes = {
      dark: '#000000',
      gradient: 'linear-gradient(135deg, #1a1a1a, #333333)',
    };

    // Terapkan tema background
    canvas.parentElement.style.background = bgThemes[theme];
    canvas.parentElement.style.padding = '20px';
    canvas.parentElement.style.borderRadius = '12px';
    canvas.parentElement.style.boxShadow = '0px 6px 12px rgba(255, 215, 0, 0.3)'; // Gold glow

    new window.Chart(ctx, {
      type: chartType,
      data: {
        labels: data.map((item) => Object.values(item)[0]),
        datasets: [{
          label: title,
          data: data.map((item) => Object.values(item)[1]),
          backgroundColor: chartType === 'bar' ? 
            colorArray.map(color => `${color}CC`) : // Opacity untuk bar
            colorArray,
          borderColor: colorArray.map(color => `${color}FF`),
          borderWidth: 3,
          fill: chartType === 'line',
          tension: 0.4,
          pointBackgroundColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 9
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 20,
            right: 20,
            bottom: 30,
            left: 20
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 14,
                family: "'Poppins', sans-serif",
                weight: 'bold'
              },
              color: '#FFFFFF',
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(255,255,255,0.9)',
            titleColor: '#000',
            bodyColor: '#000',
            titleFont: {
              size: 16,
              weight: 'bold'
            },
            bodyFont: {
              size: 14
            },
            padding: 14,
            cornerRadius: 14,
            displayColors: true,
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255,255,255,0.2)', // Grid lebih soft di background gelap
              drawBorder: false
            },
            ticks: {
              color: '#FFFFFF',
              font: {
                size: 12,
                family: "'Poppins', sans-serif",
                weight: 'bold'
              },
              callback: function(value) {
                if (value % 1 === 0) {
                  return value;
                }
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#FFFFFF',
              font: {
                size: 12,
                family: "'Montserrat', sans-serif",
                weight: 'bold'
              }
            }
          }
        },
        elements: {
          bar: {
            borderRadius: 12,
            borderSkipped: false // Buat bar terlihat lebih smooth
          }
        },
        animation: {
          duration: 1800,
          easing: 'easeOutExpo'
        }
      }
    });
  }, 500);
}

  },
  async mounted() {
    await this.fetchSummaryData();
    await this.fetchChartsData();
  },
};
</script>




  <style scoped>
/* Main Content START*/

/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');


/* Reset and Base Styles */
*, body, html {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat';
    box-sizing: border-box;
    
}


.main-content {
    margin-left: 200px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 200px);
    transition: margin-left 0.3s ease;
    background-color: #DEDEDE;
}

.main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 2%;
    position: relative;  /* Add this */
}

.main-header .menu-icon,
.main-header .history-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.5%;
}

.main-header .menu-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.5%;
    font-size: 30px;
}

.account-icon {
    position: relative;  /* Add this */
    top: 5px;          /* Adjust this value to move it down */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.account-icon img {
    width: 40px;
    height: 40px;
    transition: transform 0.3s ease-out;
    margin-bottom: -10px;  /* Add this to push it down */
}

.account-icon img:hover {
    transform: scale(1.2);
}


.menu-item {
    padding: 12px 16px;
    color: #ffffff;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
}



.main-header .history-icon img {
    width: 30px;
    height: 30px;
}

.history-icon {
  margin-right: -6%;
}

.main-header .menu-icon, 
.main-header .history-icon img {
    transition: transform 0.3s ease-out;
    cursor:pointer;
}

.main-header .menu-icon:hover, 
.main-header .history-icon img:hover {
    transform: scale(1.2);
}


.divider {
    width: 100%;
    height: 1px;
    background-color: black;
    margin-bottom: 30px;
    margin-top: 33px;
}

.text-content {
    display: flex;
    align-items: center;  /* Agar sejajar vertikal */
    justify-content: space-between; /* Membuat ikon berada di kanan */
    width: 90%; /* Sesuaikan dengan kebutuhan */
    margin-left: 2%;
}

.text-wrapper {
    display: flex;
    flex-direction: column; /* Supaya teks "Add" dan "Barcode Scanner" tetap diatur vertikal */
}

.history-icon {
    
    margin-right: -6%;
}

.history-icon img {
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: transform 0.3s ease-out;
}

.history-icon img:hover {
    transform: scale(1.2);
}

.add-master-text {
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 5px;
    margin-top: 0;
}

.data-setup-text {
    font-size: 24px;
    color: #6A6A6A;
    margin-top: 0;
    margin-bottom: 20px;
}

/* Form Header Styling */
.form-header {
    width: 150px; /* Ubah width jadi ukuran tetap */
    max-width: 140px; /* Agar tidak membesar di layar besar */
    margin-left: 26px; /* Gunakan px agar tidak berubah di split-screen */
    margin-top: 20px;
    padding: 15px 10px;
    background-color: grey; /* Warna latar */
    border-radius: 8px;
    text-align: center;
    z-index: 1;
}


/* Membuat teks RSS-CODE tetap terlihat */
.tab-button {
    border: none;
    font-size: 16px;
    font-weight: bold;
    color: white;
} 

.tab-button.active {
    background-color: transparent;
}

/* FORM CONTAINER - GRID UTAMA */
.form-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto;
    gap: 30px;
    margin: -10px 1.8%;
    padding: 40px;
    background: linear-gradient(135deg, #ffffff, #f8f9fa);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 100; 
}

/* Layout */
.barcode-form {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.input-container {
    position: relative;
    display: inline-block;
    width: 100%; /* Pastikan container input mengambil lebar penuh */
}

.input-container:focus {
    border-color: #202c31;
    box-shadow: 0 0 5px rgba(32, 44, 49, 0.75); /* Efek glow lebih lembut */
    transition: box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out;
}

#system-counter:focus{
    border-color: #202c31;
    box-shadow: 0 0 5px rgba(32, 44, 49, 0.75); /* Efek glow lebih lembut */
    transition: box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out;
}


/* Kanan: Form utama */
.system-counter-container {
    width: 30%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-right: 10%;
}

.system-counter-container label {
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
}

/* Pastikan parent input punya posisi relative */
.input-container {
    position: relative;
    display: inline-block;
}

/* Buat input field memiliki padding kanan lebih besar untuk ruang spinner */
#system-counter {
    padding-right: 40px; /* Sesuaikan dengan ukuran spinner */
    width: 100%; /* Pastikan input mengambil lebar penuh */
    box-sizing: border-box; /* Pastikan padding tidak mempengaruhi lebar total */
}


.system-counter-container input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    outline: none;
}

.system-counter-container textarea {
    text-align: center;
    font-size: 100px;
    line-height: 200px; /* Sesuaikan dengan tinggi textarea */
    height: 200px;
    width: 100%;
    resize: none;
}

/* Kiri: System Counter */
.left-form {
    width: 48%;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.left-form label {
    font-weight: 600;
    margin-bottom: 5px;
}

.left-form input, .left-form  select{
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s;
}

.left-form textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    resize: none;
    height: 120px;
}


.form-row {
    display: flex;
    flex-direction: column;
}

.form-row input:focus, 
.form-row select:focus {
    border-color: #202c31;
    box-shadow: 0 0 5px rgba(32, 44, 49, 0.75); /* Efek glow lebih lembut */
    transition: box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out;
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


/* Tombol */
.form-actions-up {
    display: flex;
    flex-direction: column; /* Mengubah dari horizontal ke vertikal */
    gap: 35px;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-top: 20px;
    margin-left: 40px;
    width: 80%;
}


.form-actions-down {
    display: flex;
    flex-direction: column; /* Mengubah dari horizontal ke vertikal */
    gap: 35px;
    justify-content: center;
    align-items: center;
    height: 20%;
    margin-top: 330px;
    margin-left: 40px;
    width: 80%;
}

.btn-clear, .btn-add {
    height: 28%;
    width: 150%;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
}

.btn-add {
    background-color: #32A350;
    color: white;
}

.btn-add:hover {
    background-color: #086621;
}

.btn-clear {
    background-color: #ED1B24;
    color: white;
}

.btn-clear:hover {
    background-color: #c71a1f;
}


/* Responsive Design */
@media screen and (max-width: 768px) {
    .form-header{
        margin-left: 15px;
    }
}

@media screen and (max-width: 480px) {
    .form-header{
        margin-left: 7px;
    }
    .add-master-text {
        font-size: 25px;
    }
    
    .data-setup-text {
        font-size: 15px;
    }
}


/* Warna Premium & Ikon Font Awesome */
.summary-card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 25px;
    border-radius: 15px;
    color: white;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    contain: content;
}

/* Warna Eksklusif */
.summary-card:nth-child(1) { background: linear-gradient(135deg, #004aad, #1e3c72); } /* Umroh */
.summary-card:nth-child(2) { background: linear-gradient(135deg, #008080, #2c3e50); } /* Haji */
.summary-card:nth-child(3) { background: linear-gradient(135deg, #a67c00, #ffb700); } /* Wisata */
.summary-card:nth-child(4) { background: linear-gradient(135deg, #5a189a, #9d4edd); } /* Foto */
.summary-card:nth-child(5) { background: linear-gradient(135deg, #d90429, #ff5733); } /* Admin */

/* Hover Efek Glow */
.summary-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
}

/* Ikon dari FontAwesome */
.summary-card i {
    font-size: 3rem;
    margin-bottom: 10px;
}

/* Teks */
.summary-card h3 {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 8px;
}

.summary-card p {
    font-size: 2em;
    font-weight: bold;
}

/* BARIS 2 - Grafik Distribusi Program (Lebar Penuh) */
.chart-container-large {
    grid-column: span 5; /* Lebar Penuh */
    padding: 25px;
    background: #ffffff;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
}

/* BARIS 3 - Grafik Periode & Upload Foto (Lebar Penuh, Satu per Satu ke Bawah) */
.chart-container {
    grid-column: span 5; /* Lebar Penuh */
    padding: 20px;
    background: #ffffff;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Chart Container Styling - Nuansa Islami Elegan */
.chart-container-large, .chart-container {
  position: relative;
  grid-column: span 5;
  padding: 25px;
  background: linear-gradient(135deg, #fff7e6, #fefefe);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 215, 0, 0.3);
  overflow: hidden;
}

.chart-container-large::before, .chart-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,255,255,0));
  z-index: 0;
}

.chart-container-large:hover, .chart-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

/* Canvas Styling */
canvas {
  position: relative;
  z-index: 1;
  max-height: 100%;
  max-width: 100%;
}

/* Chart Title */
.chart-title {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 1.4em;
  font-weight: 600;
  color: #444;
  font-family: "'Poppins', sans-serif";
}

/* Responsive */
@media (max-width: 768px) {
  .chart-container-large, .chart-container {
    height: 350px;
    padding: 15px;
  }
}



/* Responsive Adjustments - 1200px */
@media (max-width: 1200px) {
    .form-container {
        grid-template-columns: repeat(5, minmax(0, 1fr));
        align-items: stretch; /* Memastikan semua item meregang ke tinggi yang sama */
    }


    
}


/* RESPONSIVE DESIGN */
@media (max-width: 1024px) {
    .form-container {
        grid-template-columns: repeat(2, 1fr);
    }

    .summary-card {
        grid-column: span 1;
    }

    .chart-container-large,
    .chart-container {
        grid-column: span 2;
    }
}

@media (max-width: 768px) {
    .form-container {
        grid-template-columns: 1fr;
    }

    .summary-card, .chart-container-large, .chart-container {
        grid-column: span 1;
        width: 100%;
    }
}

</style>