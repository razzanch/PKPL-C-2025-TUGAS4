<template>
    <div class="gallery-admin-view">
      <!-- SIDE NAVBAR -->
      <SideNavbar
      :isCollapsed="isSidebarCollapsed"
      @toggle-sidebar="toggleSidebar"
      @collapse-sidebar="collapseSidebar"
      @expand-sidebar="expandSidebar"
    />
  
       <!-- MAIN CONTENT & FOOTER -->
    <div class="main-content" :style="{ marginLeft: isSidebarCollapsed ? '70px' : '200px' }">
        <!-- MAIN CONTENT START -->
        <div class="main-header">
          <span class="menu-icon" @click="toggleSidebar"> &#9776; </span>
          <Accounts-icon />
        </div>
        <div class="divider"></div>
        <div class="text-content">
          <div class="text-wrapper">
            <h1 class="add-master-text">Galeri Foto</h1>
            <p class="data-setup-text">Dokumentasi (Tahunan)</p>
          </div>
          <router-link to="/gallery" custom v-slot="{ navigate }">
  <span class="history-icon" @click="navigate">
    <img src="../assets/back.png" alt="back" />
  </span>
</router-link>
        </div>
  
        <!-- Form Atas -->
        <div class="form-header">
          <button class="tab-button active">PROGRAM</button>
        </div>
  
        <div class="form-container">
          <form class="barcode-form" id="form-atas" @submit.prevent="handleSubmit">
            <!-- Bagian Kiri: Form utama -->
            <div class="left-form">
              <div class="form-row">
                <label for="program">Program</label>
                <select
                  id="program"
                  name="program"
                  class="form-control select2"
                  required
                  v-model="formData.program"
                >
                  <option value="" disabled selected>Pilih Program</option>
                  <option value="Pilih Program 1">Pilih Program 1</option>
                  <option value="Pilih Program 2">Pilih Program 2</option>
                </select>
              </div>
  
              <div class="form-row">
                <label for="periode">Periode</label>
                <input
                  type="text"
                  id="periode"
                  name="periode"
                  placeholder="Pilih program terlebih dahulu!"
                  required
                  readonly
                  v-model="formData.periode"
                />
              </div>
  
              <div class="form-row">
                <label for="file">File (Max. 10)</label>
                <input
  type="file"
  id="file"
  name="file"
  accept=".png, .jpg, .jpeg"
  multiple
  required
  @change="handleFileSelection"
  key="fileInput" 
/>
                <p id="file-error" style="color: red; display: none">
                  Maksimal 10 file yang diizinkan.
                </p>
              </div>
            </div>
  
            <!-- Bagian Kanan: System Counter -->
            <div class="system-counter-container">
              <div class="form-actions-up">
                <button type="submit" id="add-program" class="btn-add">Add</button>
                <button type="reset" id="clear-program" class="btn-clear" @click="clearForm">
                  Clear
                </button>
              </div>
            </div>
          </form>

          <div class="filter-container">
  <div class="search-wrapper">
    <span class="search-icon"></span>
    <input 
      type="text" 
      v-model="searchQuery" 
      placeholder="Cari berdasarkan nama program..." 
      class="search-input"
    />
    <span v-if="searchQuery" class="clear-icon" @click="searchQuery = ''"></span>
  </div>
</div>

<div class="accounts-table">
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nama Program</th>
        <th>Periode</th>
        <th>Total</th>
        <th>File</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="filteredGallery.length > 0">
        <tr v-for="gallery in filteredGallery" :key="gallery.id_gallery">
          <td>{{ gallery.id_gallery }}</td>
          <td v-html="highlightSearch(gallery.name_program)"></td>
          <td>{{ gallery.period }}</td>
          <td>{{ gallery.files.length }}</td>
          <td>
            <div class="file-list">
              <template v-for="(file, index) in gallery.files" :key="index">
                <span class="file-item">
                  {{ file.split('/').pop() }}
                  <span v-if="index < gallery.files.length - 1">, </span>
                </span>
              </template>
            </div>
          </td>
          <td>
            <button @click="openDeleteModal(gallery)">
              <img src="../assets/trash.png" alt="Delete" />
            </button>
          </td>
        </tr>
      </template>
      <tr v-else>
        <td colspan="6" class="no-data-message">
          {{ searchQuery ? 'Data tidak ditemukan' : 'Tidak ada data' }}
        </td>
      </tr>
    </tbody>
  </table>
</div>

        </div>

        <!-- Modal Hapus Gallery -->
<div v-if="isDeleteModalOpen" class="modal">
  <div class="modal-content">
    <span class="close" @click="closeDeleteModal">&times;</span>
    <h2>Hapus Gallery</h2>
    <p>Anda yakin ingin menghapus gallery ini?</p>
    <div class="modal-actions">
      <button class="btn-cancel" @click="closeDeleteModal">Batal</button>
      <button class="btn-confirm" @click="confirmDeleteGallery">Hapus</button>
    </div>
  </div>
</div>

        <!-- MAIN CONTENT END -->
  
        <!-- FOOTER -->
        <FooterAdmin />
      </div>
    </div>
  </template>
  
  <script>
import SideNavbar from "../components/Sidebar.vue";
import FooterAdmin from "../components/FooterAdmin.vue";
import IconSuccess from "../assets/icon-success.png";
import IconError from "../assets/icon-error.png";
import AccountsIcon from "../components/Accounts-icon.vue";
import api from "../api";



export default {
  name: "GalleryAdminView",
  components: {
    SideNavbar,
    FooterAdmin,
    AccountsIcon
  },
  data() {
    return {
        isSidebarCollapsed: false, // Tambahkan properti ini
      formData: {
        program: "",
        periode: "",
        files: [],
      },
      programs: [],
      searchQuery: "",
      galleries: [],
      isDeleteModalOpen: false,
    deleteForm: {
      id: null,
      programName: "" // To show which program we're deleting
    },
    };
  },
  computed :{
    filteredGallery() {
      if (!this.searchQuery) {
        return this.galleries;
      }
      return this.galleries.filter((gallery) =>
        gallery.name_program.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed; // Toggle state
    },
    collapseSidebar() {
      this.isSidebarCollapsed = true; // Set sidebar ke mode collapsed
    },
    expandSidebar() {
      this.isSidebarCollapsed = false; // Set sidebar ke mode expanded
    },
    // In your handleFileSelection method, I'll fix the issue with the file validation:
    highlightSearch(text) {
      if (!this.searchQuery) return text;
      const regex = new RegExp(`(${this.searchQuery})`, "gi");
      return text.replace(regex, `<span class="highlight">$1</span>`);
    },

    async fetchGallery() {
        try {
            const response = await api.get("/gallery/get");
            
            // Process the data to maintain single records
            this.galleries = response.data.data.map(gallery => {
                // Split the comma-separated files into an array if needed
                const files = gallery.image_file.split(',').map(file => file.trim());
                
                return {
                    id_gallery: gallery.id_gallery,
                    name_program: gallery.name_program,
                    period: gallery.period,
                    files: files, // Array of file paths
                    files_string: gallery.image_file // Original comma-separated string
                };
            });
            
        } catch (error) {
            console.error("Error fetching gallery:", {
                error: error,
                response: error.response?.data
            });
            
            this.showNotification(
                error.response?.data?.message || 
                "Gagal memuat data gallery. Silakan coba lagi.",
                false
            );
        }
    },


    handleFileSelection(event) {
  // Get the files from the event
  const files = event.target.files;
  const maxFiles = 10;
  const allowedTypes = ["image/png", "image/jpeg"];
  const fileInput = event.target;

  // Validate if program is selected
  if (!this.formData.program || this.formData.program === "") {
    // Clear the input
    fileInput.value = "";
    this.formData.files = [];
    this.showNotification("Harap pilih Program terlebih dahulu!", false);
    return;
  }

  // Reset error display
  document.getElementById("file-error").style.display = "none";

  // Check file count
  if (files.length > maxFiles) {
    // Clear the input
    fileInput.value = "";
    this.formData.files = [];
    document.getElementById("file-error").style.display = "block";
    this.showNotification(`Maksimal ${maxFiles} file yang diizinkan.`, false);
    return;
  }

  // Check file types
  for (let i = 0; i < files.length; i++) {
    if (!allowedTypes.includes(files[i].type)) {
      // Clear the input
      fileInput.value = "";
      this.formData.files = [];
      this.showNotification("Hanya file .png dan .jpg yang diizinkan.", false);
      return;
    }
  }

  // If we reach here, validation passed
  // Save files to data model
  this.formData.files = Array.from(files);
  const fileNames = this.formData.files.map(file => file.name).join(", ");
  this.showNotification(`Berhasil memilih ${this.formData.files.length} file.`, true);
},


async handleSubmit() {
  // Validasi form
  if (!this.formData.program || !this.formData.periode || this.formData.files.length === 0) {
    this.showNotification("Harap lengkapi semua field dan pilih file!", false);
    return;
  }

  // Validasi jumlah file
  if (this.formData.files.length > 10) {
    this.showNotification("Maksimal 10 file yang diizinkan!", false);
    return;
  }

  try {
    const selectedProgram = this.programs.find(p => 
      p.name_program === this.formData.program || 
      p.id_program == this.formData.program
    );

    if (!selectedProgram) {
      this.showNotification("Program tidak valid atau tidak ditemukan!", false);
      return;
    }

    const formData = new FormData();
    formData.append('program_id', selectedProgram.id_program);
   
    // Add files with cleaned names
    this.formData.files.forEach(file => {
      const cleanedFile = new File(
        [file], 
        file.name
          .replace(/[^\w\s.-]/g, '')
          .replace(/\s+/g, '-'),
        { type: file.type }
      );
      formData.append('files', cleanedFile);
    });

    const response = await api.post('/gallery/post', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      timeout: 60000
    });

    if (response.data.code === 200) {
      this.showNotification(response.data.message || "Upload berhasil!", true);
      this.clearForm();
      this.fetchGallery();
    } else {
      this.showNotification(response.data.message || "Upload gagal", false);
    }

  } catch (error) {
    console.error("Upload Error Details:", {
      error: error,
      response: error.response?.data
    });
    
    let errorMessage = "Upload gagal";
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
      
      // Handle duplicate program error specifically
      if (error.response.data.message.includes("sudah memiliki gallery")) {
        errorMessage += ` (ID Gallery yang sudah ada: ${error.response.data.data?.existing_gallery_id || 'tidak diketahui'})`;
        this.clearForm();
      } else if (error.response.data.data?.error) {
        errorMessage += ` (${error.response.data.data.error})`;
        this.clearForm();
      }
    } else if (error.message.includes('timeout')) {
      errorMessage = "Timeout: Server terlalu lama merespon";
    } else if (error.message.includes('Network Error')) {
      errorMessage = "Tidak bisa terhubung ke server";
    }

    this.showNotification(errorMessage, false);
  }
},

clearForm() {
  // Reset form data
  this.formData = {
    program: "",
    periode: "",
    files: [],
  };
  
  // Reset input file
  const fileInput = document.getElementById('file');
  if (fileInput) {
    fileInput.value = ""; // Ini yang mengosongkan input file
  }
  
  // Reset error display
  document.getElementById("file-error").style.display = "none";

  // Reset Select2
  const programSelect = document.getElementById("program");
  if (programSelect) {
    programSelect.selectedIndex = 0;
    $(programSelect).val(null).trigger('change'); // Reset lebih efektif
  }
  
  // Force update komponen jika diperlukan
  this.$forceUpdate();
},

    async fetchPrograms() {
  try {
    const response = await api.get("/programs/get");
    
    // Ambil semua program tanpa filter
    this.programs = response.data.data;
    
    this.initSelect2();
  } catch (error) {
    console.error("Gagal mengambil data program:", error);
    this.showNotification("Gagal mengambil data program: " + error.message, false);
  }
},

initSelect2() {
  const selectElement = $("#program");

  // Kosongkan select sebelum menambahkan data baru
  selectElement.empty();
  selectElement.append('<option value="" disabled selected>Pilih Program</option>');

  // Tambahkan opsi berdasarkan data yang diambil
  this.programs.forEach((program) => {
    selectElement.append(new Option(program.name_program, program.id_program));
  });

  // Inisialisasi ulang Select2
  selectElement.select2({
    placeholder: "Pilih Program",
    allowClear: true,
    minimumResultsForSearch: 1,
  });

  // Sync dengan v-model Vue
  selectElement.on("change", (event) => {
    this.formData.program = $(event.target).val();
    const selectedProgram = this.programs.find(p => p.id_program == this.formData.program);
    this.formData.periode = selectedProgram ? selectedProgram.period : "";
  });

  // Set nilai awal jika sudah ada
  if (this.formData.program) {
    selectElement.val(this.formData.program).trigger('change');
  }
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

    openDeleteModal(gallery) {
    this.deleteForm.id = gallery.id_gallery;
    this.deleteForm.programName = gallery.name_program;
    this.isDeleteModalOpen = true;
  },
  
  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.deleteForm = {
      id: null,
      programName: ""
    };
  },
  
  async confirmDeleteGallery() {
    try {
      const response = await api.delete(`/gallery/delete/${this.deleteForm.id}`);
      
      if (response.data.code === 200) {
        this.showNotification(`Gallery untuk program ${this.deleteForm.programName} berhasil dihapus!`, true);
        this.fetchGallery(); // Refresh the gallery list
      } else {
        this.showNotification(response.data.message || "Gagal menghapus gallery", false);
      }
    } catch (error) {
      console.error("Delete error:", error);
      this.showNotification(
        error.response?.data?.message || 
        "Terjadi kesalahan saat menghapus gallery", 
        false
      );
    } finally {
      this.closeDeleteModal();
    }
  },

  },
  mounted() {
    this.fetchPrograms();
    this.fetchGallery();
  },
};


</script>

  <style scoped>

  /* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');


/* Reset and Base Styles */
*, body, html {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat';
    box-sizing: border-box;

}
/* Main Content START*/

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

/* Form Container */
.form-container {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 2%;
    margin-top: -10px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 2; /* Lebih tinggi dari form-header */
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


textarea {
    width: 100%;
    height: 100px; /* Menambah tinggi agar lebih besar */
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    font-size: 14px;
    resize: vertical; /* Bisa diubah ukurannya secara vertikal */
}

/* Efek saat textarea difokuskan */
textarea:focus {
    border-color: #202c31;
    box-shadow: 0 0 5px rgba(32, 44, 49, 0.75);
    transition: box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out;
}


/* Menambahkan arrow SVG di dalam input */
.dropdown {
    width: 100%;
    cursor: pointer;
    border: 1px solid #ccc;
    background: #fff;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath fill='grey' d='M0 0l5 5 5-5H0z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 5px center;
    background-size: 9px;
    appearance: none;
}

/* Kontainer dropdown */
.dropdown-container {
    position: relative;
    width: 100%;
}

/* Dropdown options */
.dropdown-options {
    position: absolute;
    width: 100%;
    max-height: 250px;
    overflow-y: auto;
    border: 1px solid #ccc;
    background: #fff;
    display: none;
    z-index: 1000;
    padding: 10px;
}

/* Tombol Close */
.close-btn {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    color: #555;
    position: absolute;
    right: 10px;
    top: 10px;
}

/* Grid gambar */
.image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 10px;
    justify-items: center;
    align-items: center;
}

/* Gaya gambar */
.image-grid img {
    width: 100px;
    height: auto;
    cursor: pointer;
    transition: 0.3s;
    border-radius: 5px;
}

.image-grid img.selected {
    border: 3px solid #D6B62A;
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


/* Hapus background dan container */
.accounts-table {
  width: 100%;
  margin-top: 20px;
  overflow-x: auto;
  padding: 0; /* Hapus padding agar tabel full */
  border: none; /* Hapus border */
  box-shadow: none; /* Hapus shadow */
  backdrop-filter: none; /* Hapus efek kaca */
}

/* Tabel tetap futuristik */
.accounts-table table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: rgba(0, 0, 0, 1); /* Tetap mempertahankan tabel dark */
  border-radius: 12px;
  overflow: hidden;
}


/* Header */
.accounts-table th {
  background: linear-gradient(135deg, #D6B62A, #b59323);
  color: #000;
  font-weight: bold;
  text-transform: uppercase;
  padding: 16px 20px;
  text-align: left;
  font-size: 16px;
  position: relative;
  overflow: hidden;
}

/* Efek Neon Glow pada Header */
.accounts-table th::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #D6B62A, #ffde59, #D6B62A);
  animation: neon-glow 2s infinite linear;
}

/* Isi Tabel */
.accounts-table td {
  padding: 14px 20px;
  border-bottom: 1px solid rgba(214, 182, 42, 0.3);
  color: #fff;
  font-size: 15px;
  transition: all 0.3s ease;
  position: relative;
}

/* Efek Hover */
.accounts-table tbody tr:hover {
  background: rgba(214, 182, 42, 0.2);
  box-shadow: inset 0 0 10px rgba(214, 182, 42, 0.5);
  transition: background 0.3s ease-in-out;
}

/* Tombol Aksi */
.accounts-table button {
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  transition: transform 0.2s ease, filter 0.3s ease;
}

.accounts-table button:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 0 6px rgba(214, 182, 42, 0.6));
}

.accounts-table button img {
  width: 22px;
  height: 22px;
  filter: brightness(0) invert(1);
  transition: transform 0.2s;
}

.accounts-table button:active img {
  transform: scale(0.9);
}

/* Border Radius Halus */
.accounts-table table tr:first-child th:first-child {
  border-top-left-radius: 12px;
}

.accounts-table table tr:first-child th:last-child {
  border-top-right-radius: 12px;
}

.accounts-table table tr:last-child td:first-child {
  border-bottom-left-radius: 12px;
}

.accounts-table table tr:last-child td:last-child {
  border-bottom-right-radius: 12px;
}

/* Animasi Neon Glow */
@keyframes neon-glow {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Responsif */
@media (max-width: 768px) {
  .accounts-table th,
  .accounts-table td {
    padding: 10px 12px;
    font-size: 14px;
  }

  .accounts-table button img {
    width: 18px;
    height: 18px;
  }
}


/* Pusatkan kontainer */
.filter-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}

/* Wrapper untuk posisi ikon */
.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 50%;
  max-width: 500px;
  margin-top: 30px;
}

/* Input field */
.search-input {
  width: 100%;
  padding: 12px 40px 12px 40px; /* Ruang untuk ikon */
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 25px;
  outline: none;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

/* Efek Hover */
.search-input:hover {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
}

/* Efek Fokus */
.search-input:focus {
  border-color: #D6B62A;
  box-shadow: 0 4px 12px rgba(214, 182, 42, 0.5);
  transition: all 0.3s ease-in-out;
}

/* Placeholder Styling */
.search-input::placeholder {
  color: #aaa;
  font-style: italic;
}

/* Ikon Search (Kiri) */
.search-icon {
  position: absolute;
  left: 15px;
  width: 18px;
  height: 18px;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23888"><path d="M10 2a8 8 0 1 1-5.293 14.707l-3.388 3.39a1 1 0 0 1-1.414-1.414l3.388-3.39A8 8 0 0 1 10 2Zm0 2a6 6 0 1 0 4.243 10.243A6 6 0 0 0 10 4Z"></path></svg>') no-repeat center;
  background-size: cover;
  pointer-events: none;
}

/* Ikon Clear (X) - Muncul saat ada teks */
.clear-icon {
  position: absolute;
  right: 15px;
  width: 18px;
  height: 18px;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23FF0000"><path d="M18 6L6 18M6 6l12 12" stroke="%23FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>') no-repeat center;
  background-size: cover;
  cursor: pointer;
}
/* Hover efek untuk Clear Icon */
.clear-icon:hover {
  opacity: 0.7;
}

.no-data-message {
  text-align: center;
  font-weight: bold;
  color: #999;
  padding: 10px;
}


/* ✨ Modal Styling - Improved Version */
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #1a1a1a;
  padding: 30px;
  border-radius: 10px;
  width: 350px;
  text-align: center;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid #333333;
}

.modal-content h2 {
  color: #D6B62A;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
}

/* White text for confirmation message */
.modal-content p {
  color: #ffffff; /* Text color white */
  margin-bottom: 25px;
  font-size: 16px;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 20px; /* Increased gap between buttons */
  margin-top: 20px;
}

.btn-cancel {
  padding: 12px 24px;
  background: #333333; /* Dark gray background */
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.3s ease;
}

.btn-cancel:hover {
  background: #444444; /* Slightly lighter on hover */
}

.btn-confirm {
  padding: 12px 24px;
  background: #D6B62A;
  color: #000000;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.3s ease;
}

.btn-confirm:hover {
  background: #b59323;
}

.close {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 24px;
  cursor: pointer;
  color: #cccccc;
  transition: color 0.3s ease;
}

.close:hover {
  color: #ffffff;
}
/* Main Content END*/
</style>