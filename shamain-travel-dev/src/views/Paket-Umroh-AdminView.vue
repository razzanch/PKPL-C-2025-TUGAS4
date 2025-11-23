<template>
    <div class="paket-umroh-admin-view">
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
            <h1 class="add-master-text">Paket Umroh</h1>
            <p class="data-setup-text">Rincian Paket</p>
          </div>
          <router-link to="/umrah-packages" custom v-slot="{ navigate }">
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
          <form @submit.prevent="addProgram" class="barcode-form">
            <!-- Bagian Kiri: Form utama -->
            <div class="left-form">
              <div class="form-row">
                <label for="kategori">Kategori</label>
                <input
                  type="text"
                  id="kategori"
                  name="kategori"
                  value="Umroh"
                  v-model="form.kategori"
                  readonly
                  required
                />
              </div>
  
              <div class="form-row">
                <label for="pre-program">Program</label>
                <input
                  type="text"
                  id="pre-program"
                  name="pre-program"
                  v-model="form.preprogram"
                  placeholder="Masukkan Nama Program"
                  required
                  @input="validateInput('preprogram')"
                />
              </div>
  
              <div class="form-row">
                <label for="periode">Periode</label>
                <input
                  type="text"
                  id="periode"
                  name="periode"
                  v-model="form.periode"
                  placeholder="Masukkan Periode"
                  required
                  @input="validateInput('periode')"
                />
              </div>
            </div>
  
            <!-- Bagian Kanan: System Counter -->
            <div class="system-counter-container">
              <div class="form-actions-up">
                <button type="submit" id="add-program" class="btn-add">Add</button>
                <button type="reset" id="clear-program" class="btn-clear">
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
      placeholder="Cari program berdasarkan nama program" 
      class="search-input"
    />
    <span v-if="searchQuery" class="clear-icon" @click="searchQuery = ''"></span>
  </div>
</div>

         
    <!-- Tabel untuk Menampilkan Data Program -->
    <div class="accounts-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Program</th>
            <th>Periode</th>
            <th>Kategori</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <!-- Jika Data Ada -->
          <template v-if="filteredPrograms.length > 0">
            <tr v-for="program in filteredPrograms" :key="program.id_program">
              <td>{{ program.id_program }}</td>
              <td v-html="highlightSearch(program.name_program)"></td>
              <td>{{ program.period }}</td>
              <td>{{ program.category_program }}</td>
              <td>{{ program.accounts_username }}</td>
              <td>
                <button @click="openEditModal(program)" class="edit-btn">
                  <img src="../assets/edit.png" alt="Edit" />
                </button>
                <button @click="openDeleteModal(program.id_program)" class="delete-btn">
                  <img src="../assets/trash.png" alt="Delete" />
                </button>
              </td>
            </tr>
          </template>

          <!-- Jika Tidak Ada Data -->
          <tr v-else>
            <td colspan="6" class="no-data-message">Data Tidak Ditemukan</td>
          </tr>
        </tbody>
      </table>
    </div>
        </div>

       <!-- Modal Edit Program -->
  <div v-if="isEditModalOpen" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeEditModal">&times;</span>
      <h2>Edit Program</h2>
      <label>Program:</label>
      <input type="text" v-model="editForm.name_program" />

      <label>Periode:</label>
      <input type="text" v-model="editForm.period" />

      <button @click="updateProgram">Update</button>
    </div>
  </div>

  <!-- Modal Hapus Program -->
  <div v-if="isDeleteModalOpen" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeDeleteModal">&times;</span>
      <h2>Hapus Program</h2>
      <label>Konfirmasi Nama Program:</label>
      <input type="text" v-model="deleteForm.name_program" placeholder="Masukkan nama program" />
      <button @click="deleteProgramConfirm">Delete</button>
    </div>
  </div>
  
        <!-- Form Bawah -->
        <div class="form-header">
          <button class="tab-button active">PAKET</button>
        </div>
  
        <div class="form-container">
          <form @submit.prevent="addPaket" class="barcode-form" id="form-bawah">
            <!-- Bagian Kiri: Form utama -->
            <div class="left-form">
              <!-- Form Program -->
              <div class="form-row">
    <label for="program">Program</label>
    <select id="program" name="program" class="form-control select2" required>
      <option value="" disabled selected>Pilih Program</option>
    </select>
  </div>
  
      <div class="form-row">
                <label for="paket">Paket</label>
                <select id="paket" name="paket" required>
                  <option value="" disabled selected>Pilih Nama Paket</option>
                  <option value="Ruby">Ruby</option>
                  <option value="Emerald">Emerald</option>
                  <option value="Sapphire">Sapphire</option>
                  <option value="Diamond">Diamond</option>
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                </select>
              </div>
  
              <div class="form-row">
                <label for="star">Star</label>
                <select id="star" name="star" required>
                  <option value="" disabled selected>Pilih Bintang</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
  
              <div class="form-row">
                <label for="hotel">Hotel</label>
                <textarea
                  id="hotel"
                  name="hotel"
                  required
                  placeholder="Masukkan Deskripsi Hotel"
                  v-model="form2.hotel"
                  @input="validateInput2('hotel')"
                ></textarea>
              </div>
  
              <div class="form-row">
                <label for="maskapai">Maskapai</label>
                <div class="dropdown-container">
                  <div class="dropdown-wrapper">
                    <input
                      type="text"
                      id="maskapai"
                      name="maskapai"
                      readonly
                      class="dropdown"
                      placeholder="Pilih Maskapai"
                      tabindex="-1"
                    />
                  </div>
                  <div class="dropdown-options" id="dropdownOptions">
                    <button class="close-btn">✖</button>
                    <div class="image-grid">
                      <img
                        src="../assets/airlines/airasia.png"
                        data-value="assets/airlines/airasia.png"
                      />
                      <img
                        src="../assets/airlines/emirates.png"
                        data-value="assets/airlines/emirates.png"
                      />
                      <img
                        src="../assets/airlines/etihad.png"
                        data-value="assets/airlines/etihad.png"
                      />
                      <img
                        src="../assets/airlines/garuda.png"
                        data-value="assets/airlines/garuda.png"
                      />
                      <img
                        src="../assets/airlines/indigo.png"
                        data-value="assets/airlines/indigo.png"
                      />
                      <img
                        src="../assets/airlines/lion.png"
                        data-value="assets/airlines/lion.png"
                      />
                      <img
                        src="../assets/airlines/malaysia.png"
                        data-value="assets/airlines/malaysia.png"
                      />
                      <img
                        src="../assets/airlines/oman.png"
                        data-value="assets/airlines/oman.png"
                      />
                      <img
                        src="../assets/airlines/saudia.png"
                        data-value="assets/airlines/saudia.png"
                      />
                      <img
                        src="../assets/airlines/scoot.png"
                        data-value="assets/airlines/scoot.png"
                      />
                      <img
                        src="../assets/airlines/skyteam.png"
                        data-value="assets/airlines/skyteam.png"
                      />
                      <img
                        src="../assets/airlines/turkish.png"
                        data-value="assets/airlines/turkish.png"
                      />
                      <img
                        src="../assets/airlines/royalbrunei.png"
                        data-value="assets/airlines/royalbrunei.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
  
              <div class="form-row">
                <label for="item-harga">Jumlah Item Harga</label>
                <select id="item-harga" name="item-harga" required>
                  <option value="" disabled selected>Pilih Jumlah Item Harga</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
  
              <div class="form-row" style="display: none;">
                <label for="quad">Quad (Rp.)</label>
                <input
                  type="text"
                  id="quad"
                  name="quad"
                  placeholder="Masukkan Harga (Rp.)"
                />
              </div>
  
              <div class="form-row" style="display: none;">
                <label for="triple">Triple (Rp.)</label>
                <input
                  type="text"
                  id="triple"
                  name="triple"
                  placeholder="Masukkan Harga (Rp.)"
                />
              </div>
  
              <div class="form-row" style="display: none;">
                <label for="double">Double (Rp.)</label>
                <input
                  type="text"
                  id="double"
                  name="double"
                  placeholder="Masukkan Harga (Rp.)"
                />
              </div>
  
              <div class="form-row">
                <label for="Include">Include</label>
                <textarea
                  id="Include"
                  name="Include"
                  placeholder="Masukkan Informasi 'Include'"
                  v-model="form2.Include"
                  @input="validateInput2('Include')"
                ></textarea>
              </div>
  
              <div class="form-row">
                <label for="catatan">Catatan</label>
                <textarea
                  id="catatan"
                  name="catatan"
                  placeholder="Masukkan Catatan"
                  v-model="form2.catatan"
                  @input="validateInput2('catatan')"
                ></textarea>
              </div>
            </div>
  
            <div class="system-counter-container">
              <div class="form-actions-down">
                <button type="submit" id="add-paket" class="btn-add" >Add</button>
                <button type="reset" id="clear-paket" class="btn-clear">
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
      v-model="searchQuery2" 
      placeholder="Cari paket berdasarkan nama paket" 
      class="search-input"
    />
    <span v-if="searchQuery2" class="clear-icon" @click="searchQuery2 = ''"></span>
  </div>
</div>


          <div class="accounts-table">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama Paket</th>
          <th>Bintang</th>
          <th>Hotel</th>
          <th>Maskapai</th>
          <th>Quad</th>
          <th>Triple</th>
          <th>Double</th>
          <th>Include</th>
          <th>Catatan</th>
          <th>Nama Program</th>
          <th>Kategori</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>


        <template v-if="filteredPrograms2.length > 0">
          <tr v-for="packages in filteredPrograms2" :key="packages.id_package">
            <td>{{ packages.id_package }}</td>
            <td>{{ packages.name_package }}</td>
            <td>{{ packages.star }}</td>
            <td>{{ packages.hotel }}</td>
            <td>{{ packages.airline_path }}</td>
            <td>{{ packages.quad }}</td>
            <td>{{ packages.triple }}</td>
            <td>{{ packages.double }}</td>
            <td>{{ packages.include_text }}</td>
            <td>{{ packages.note }}</td>
            <td>{{ packages.name_program }}</td>
            <td>{{ packages.category_program }}</td>
            <td>
              <button @click="openDeleteModal2(packages.id_package)" class="delete-btn">
                <img src="../assets/trash.png" alt="Delete" />
              </button>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="12" class="no-data-message">Data Tidak Ditemukan</td>
        </tr>
      </tbody>
    </table>
  </div>

        </div>

        <!-- Modal Hapus Program -->
  <div v-if="isDeleteModalOpen2" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeDeleteModal2">&times;</span>
      <h2>Hapus Program</h2>
      <label>Konfirmasi Nama Paket:</label>
      <input type="text" v-model="deleteForm2.name_package" placeholder="Masukkan nama paket" />
      <button @click="deleteProgramConfirm2">Delete</button>
    </div>
  </div>
        <!-- MAIN CONTENT END -->
  
        <!-- FOOTER START -->
        <FooterAdmin />
        <!-- FOOTER END -->
      </div>
    </div>
  </template>
  
  <script>
import SideNavbar from "../components/Sidebar.vue";
import FooterAdmin from "../components/FooterAdmin.vue";
import IconSuccess from "../assets/icon-success.png";
import IconError from "../assets/icon-error.png";
import AccountsIcon  from "../components/Accounts-icon.vue";
import api from "../api";

export default {
  name: "PaketUmrohAdminView",
  components: {
    SideNavbar,
    FooterAdmin,
    AccountsIcon
  },
  data() {
    return {
      isSidebarCollapsed: false, // State untuk mengontrol collapse/expand sidebar
      selectedPaths: [], // State untuk menyimpan path maskapai yang dipilih
      form: {
        kategori: "Umroh",
        preprogram: "",
        periode: "",
      },
      editForm: {
        id_program: "",
        name_program: "",
        period: "",
      },
      deleteForm: {
        id_program: "",
        name_program: "",
      },
      deleteForm2: {
        id_package: "",
        name_package: "",
      },
      form2: {
        program: "",
        paket: "",
        star: "",
        hotel: "",
        maskapai: "",
        quad: "",
        triple: "",
        double: "",
        Include: "",
        catatan: "",
      },
      programs: [], // Menyimpan data dari backend
      packages:[],
      searchQuery: "",
      searchQuery2: "",
      isEditModalOpen: false,
      isDeleteModalOpen: false,
      isDeleteModalOpen2: false,

    };
  },
  computed:{
    filteredPrograms() {
      if (!this.searchQuery) {
        return this.programs; // Jika tidak ada pencarian, tampilkan semua
      }
      return this.programs.filter(program =>
        program.name_program.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },

    filteredPrograms2() {
      if (!this.searchQuery2) {
        return this.packages; // Jika tidak ada pencarian, tampilkan semua
      }
      return this.packages.filter(packages =>
        packages.name_package.toLowerCase().includes(this.searchQuery2.toLowerCase())
      );
    }
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

    async fetchPackages() {
  try {
    const response = await api.get("/packages/get");
  
    this.packages = response.data.data
      .filter(pkg => pkg.category_program && 
                    pkg.category_program.toLowerCase() === "umroh")
      .map(pkg => ({
        ...pkg,
        quad: pkg.quad ? this.formatNumber(pkg.quad) : null,
        triple: pkg.triple ? this.formatNumber(pkg.triple) : null,
        double: pkg.double ? this.formatNumber(pkg.double) : null
      }));
    
  } catch (error) {
    console.error("Gagal mengambil data paket:", error);
    this.showNotification("Gagal mengambil data paket", false);
  }
},


formatNumber(num) {
    // Jika num adalah string dengan desimal, hilangkan bagian desimalnya
    const numberValue = typeof num === 'string' 
      ? parseFloat(num.split('.')[0]) 
      : Math.floor(num);
    
    return numberValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  async fetchPrograms() {
  try {
    const response = await api.get("/programs/get");
    
    // Filter program yang category_program-nya "Umroh" (case insensitive)
    this.programs = response.data.data.filter(program => 
      program.category_program && 
      program.category_program.toLowerCase() === "umroh"
    );
    
    this.initSelect2();
  } catch (error) {
    console.error("Gagal mengambil data program:", error);
    this.showNotification("Gagal mengambil data program", false);
  }
},



    initSelect2() {
      const selectElement = $("#program");

      // Kosongkan select sebelum menambahkan data baru
      selectElement.empty();
      selectElement.append('<option value="" disabled selected>Pilih Program</option>');

      // Tambahkan opsi berdasarkan data yang diambil
      this.programs.forEach((program) => {
        selectElement.append(new Option(program.name_program, program.id));
      });

      // Inisialisasi ulang Select2
      selectElement.select2({
        placeholder: "Pilih Program",
        allowClear: true,
        minimumResultsForSearch: 1,
      });

    },
    openEditModal(program) {
      this.editForm = { ...program };
      this.isEditModalOpen = true;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
    },

    openDeleteModal(id_program) {
  this.deleteForm = {
    id_program: id_program, // Pastikan ini diisi
    name_program: "", // Reset nama program
  };
  this.isDeleteModalOpen = true;
},

openDeleteModal2(id_package) {
  this.deleteForm2 = {
    id_package: id_package, // Langsung gunakan parameter id
    name_package: "",
  };
  this.isDeleteModalOpen2 = true;
},
    closeDeleteModal() {
      this.isDeleteModalOpen = false;
    },

    closeDeleteModal2() {
      this.isDeleteModalOpen2 = false;
    },

    async updateProgram() {
  try {
    const response = await api.put(`/programs/put/${this.editForm.id_program}`, {
      name_program: this.editForm.name_program,
      period: this.editForm.period,
    });

    this.showNotification("Akun berhasil Diupdate!",true);
        this.closeEditModal();
        this.fetchPrograms();
  } catch (error) {
    if (error.response && error.response.status === 409) {
      this.showNotification("Program dengan nama ini sudah ada! Mohon gunakan nama lain",false);
    } else {
      this.showNotification("Terjadi kesalahan saat memperbarui program!!",false);
    }
  }
},

async deleteProgramConfirm() {
  // Validasi ID program
  if (!this.deleteForm.id_program) {
    this.showNotification("ID Program tidak valid!", false);
    return;
  }

  // Validasi nama program
  if (!this.deleteForm.name_program) {
    this.showNotification("Konfirmasi nama program wajib diisi!", false);
    return;
  }

  try {
    const response = await api.delete(`/programs/delete/${this.deleteForm.id_program}`, {
      data: { name_program: this.deleteForm.name_program }
    });

    // Berhasil dihapus
    this.showNotification(response.data.message || "Program Berhasil Dihapus!", true);
    this.closeDeleteModal();
    this.fetchPrograms();
    this.fetchPackages();
    
  } catch (error) {
    console.error("Gagal menghapus program:", error);
    
    let errorMessage = "Program Gagal Dihapus!";
    
    if (error.response) {
      // Ambil pesan error dari backend jika ada
      errorMessage = error.response.data?.message || errorMessage;
      
      // Handle error spesifik berdasarkan status code
      switch (error.response.status) {
        case 400:
          errorMessage = errorMessage || "Data tidak valid";
          break;
        case 404:
          errorMessage = errorMessage || "Program tidak ditemukan";
          break;
        case 409:
          errorMessage = errorMessage || "Tidak bisa dihapus karena ada paket terkait";
          break;
        case 500:
          errorMessage = errorMessage || "Terjadi kesalahan server";
          break;
      }
    } else if (error.request) {
      errorMessage = "Tidak ada respon dari server";
    } else {
      errorMessage = "Terjadi kesalahan saat mengirim permintaan";
    }
    
    this.showNotification(errorMessage, false);
  }
},

async deleteProgramConfirm2() {
  if (!this.deleteForm2.name_package) {
    this.showNotification("Konfirmasi nama paket wajib diisi!", false);
    return;
  }

  // Validasi id_package tidak boleh undefined
  if (!this.deleteForm2.id_package) {
    this.showNotification("ID Paket tidak valid!", false);
    return;
  }

  try {
    const response = await api.delete(
      `/packages/delete/${this.deleteForm2.id_package}`, 
      {
        data: { 
          name_package: this.deleteForm2.name_package 
        }
      }
    );

    if (response.data.code === 200) {
      this.showNotification("Paket Berhasil Dihapus!", true);
      this.closeDeleteModal2();
      this.fetchPackages();
    } else {
      this.showNotification(response.data.message || "Gagal menghapus paket", false);
    }
  } catch (error) {
    console.error("Gagal menghapus paket:", error);
    let errorMessage = "Paket Gagal Dihapus!";
    
    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage = error.response.data.message || "Data tidak valid";
          break;
        case 404:
          errorMessage = "Paket tidak ditemukan";
          break;
        case 500:
          errorMessage = "Terjadi kesalahan server";
          break;
      }
    }
    
    this.showNotification(errorMessage, false);
  }
},

    highlightSearch(text) {
      if (!this.searchQuery) return text;
      const regex = new RegExp(`(${this.searchQuery})`, "gi");
      return text.replace(regex, `<span class="highlight">$1</span>`);
    },
    highlightSearch2(text) {
      if (!this.searchQuery2) return text;
      const regex = new RegExp(`(${this.searchQuery2})`, "gi");
      return text.replace(regex, `<span class="highlight">$1</span>`);
    },



    async addProgram() {
    const username = localStorage.getItem("username"); // Ambil username dari localStorage
    if (!username) {
      this.showNotification("User Belum Login!", false);
      return;
    }

    // Pastikan semua field diisi
    if (!this.form.kategori || !this.form.preprogram || !this.form.periode) {
      this.showNotification("Semua field wajib diisi!", false);
      return;
    }

    const payload = {
      category_program: this.form.kategori,  // Sesuai dengan backend
      name_program: this.form.preprogram,    // Sesuai dengan backend
      period: this.form.periode,            // Sesuai dengan backend
      accounts_id_accounts: username,       // Sudah sesuai
    };

    const response = await api.post("/programs/post", payload);
    this.showNotification("Program Berhasil Ditambahkan!", true);
    
    // Reset form setelah berhasil menambahkan
    this.form.preprogram = "";
    this.form.periode = "";
    this.fetchPrograms();
},

updateHargaFields() {
  const jumlahItemHarga = document.getElementById("item-harga");
  const quadField = document.getElementById("quad").closest(".form-row");
  const tripleField = document.getElementById("triple").closest(".form-row");
  const doubleField = document.getElementById("double").closest(".form-row");

  const quadInput = document.getElementById("quad");
  const tripleInput = document.getElementById("triple");
  const doubleInput = document.getElementById("double");

  const value = jumlahItemHarga.value;

  quadField.style.display = "none";
  tripleField.style.display = "none";
  doubleField.style.display = "none";

  quadInput.removeAttribute("required");
  tripleInput.removeAttribute("required");
  doubleInput.removeAttribute("required");

  quadInput.removeEventListener("blur", this._quadBlurHandler);
  tripleInput.removeEventListener("blur", this._tripleBlurHandler);
  doubleInput.removeEventListener("blur", this._doubleBlurHandler);

  this._quadBlurHandler = () => this.checkMinValue(quadInput);
  this._tripleBlurHandler = () => this.checkMinValue(tripleInput);
  this._doubleBlurHandler = () => this.checkMinValue(doubleInput);

  if (!value) return;

  if (value === "1") {
    quadField.style.display = "flex";
    quadInput.setAttribute("required", "true");
    quadInput.addEventListener("blur", this._quadBlurHandler);
  } else if (value === "2") {
    quadField.style.display = "flex";
    tripleField.style.display = "flex";
    quadInput.setAttribute("required", "true");
    tripleInput.setAttribute("required", "true");
    quadInput.addEventListener("blur", this._quadBlurHandler);
    tripleInput.addEventListener("blur", this._tripleBlurHandler);
  } else if (value === "3") {
    quadField.style.display = "flex";
    tripleField.style.display = "flex";
    doubleField.style.display = "flex";
    quadInput.setAttribute("required", "true");
    tripleInput.setAttribute("required", "true");
    doubleInput.setAttribute("required", "true");
    quadInput.addEventListener("blur", this._quadBlurHandler);
    tripleInput.addEventListener("blur", this._tripleBlurHandler);
    doubleInput.addEventListener("blur", this._doubleBlurHandler);
  }
},


  async addPaket() {
    // Ambil nilai dari form
    const program = document.getElementById("program").value;
    const name_package = document.getElementById("paket").value;
    const star = parseInt(document.getElementById("star").value);
    const hotel = document.getElementById("hotel").value;
    const airline_path = document.getElementById("maskapai").value;
    const include_text = document.getElementById("Include").value;
    const note = document.getElementById("catatan").value;

    // Fungsi untuk format angka ke decimal
    const formatToDecimal = (value) => {
      if (!value || value.trim() === "") return null;
      // Hilangkan semua titik dan ubah ke decimal
      const numberValue = parseFloat(value.replace(/\./g, '').replace(',', '.'));
      return isNaN(numberValue) ? null : numberValue.toFixed(2);
    };

    // Format nilai harga ke decimal dengan 2 digit
    const quad = formatToDecimal(document.getElementById("quad").value);
    const triple = formatToDecimal(document.getElementById("triple").value);
    const double = formatToDecimal(document.getElementById("double").value);

    // Validasi field wajib
    if (!program || !name_package || isNaN(star) || !hotel || !airline_path) {
      this.showNotification("Field wajib tidak boleh kosong!", false);
      return;
    }

    // Validasi minimal salah satu harga harus diisi
    if (quad === null && triple === null && double === null) {
      this.showNotification("Minimal salah satu harga (quad/triple/double) harus diisi!", false);
      return;
    }

    // Buat payload data untuk dikirim ke API
    const data = {
      program,
      name_package,
      star,
      hotel,
      airline_path,
      quad: quad !== null ? parseFloat(quad) : null,
      triple: triple !== null ? parseFloat(triple) : null,
      double: double !== null ? parseFloat(double) : null,
      include_text,
      note,
    };

    try {
      // Kirim data ke API
      const response = await api.post("/packages/post", data);
      
      if (response.data.code === 200) {
        this.showNotification("Paket berhasil ditambahkan!", true);
        this.fetchPackages();
        this.clearForm();
      } else {
        this.showNotification("Gagal menambahkan paket: " + response.data.message, false);
      }
    } catch (error) {
      console.error("Error:", error);
      this.handleErrorResponse(error);
    }
  },

  handleErrorResponse(error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          this.showNotification("Format data tidak valid: " + 
            (error.response.data.message || "Periksa input Anda"), false);
          break;
        case 403:
          this.showNotification("Program ini sudah memiliki maksimal 4 paket!", false);
          break;
        case 404:
          this.showNotification("Program tidak ditemukan!", false);
          break;
        case 409:
          this.showNotification("Nama paket sudah ada dalam program ini!", false);
          break;
        default:
          this.showNotification("Terjadi kesalahan saat mengirim data!", false);
      }
    } else {
      this.showNotification("Terjadi kesalahan saat mengirim data!", false);
    }
  },

    toggleDropdown() {
      const dropdownOptions = document.getElementById("dropdownOptions");
      const hotelTextarea = document.getElementById("hotel");

      // Cek apakah hotelTextarea sudah diisi
      if (hotelTextarea && hotelTextarea.value.trim() === "") {
        this.showNotification("Harap isi Hotel terlebih dahulu!", false);
        hotelTextarea.focus();
        return; // Keluar dari fungsi
      }

      // Toggle dropdown
      dropdownOptions.style.display =
        dropdownOptions.style.display === "block" ? "none" : "block";
    },
    selectMaskapai(event) {
      const path = event.target.getAttribute("data-value");

      if (this.selectedPaths.includes(path)) {
        this.selectedPaths = this.selectedPaths.filter((item) => item !== path);
        event.target.classList.remove("selected");
      } else {
        this.selectedPaths.push(path);
        event.target.classList.add("selected");
      }

      // Update nilai input maskapai
      const dropdown = document.getElementById("maskapai");
      dropdown.value = this.selectedPaths.join(" , ");
    },
    closeDropdown() {
      const dropdownOptions = document.getElementById("dropdownOptions");
      dropdownOptions.style.display = "none";
    },
    handleClickOutside(event) {
      const dropdown = document.getElementById("maskapai");
      const dropdownOptions = document.getElementById("dropdownOptions");

      if (!dropdown.contains(event.target) && !dropdownOptions.contains(event.target)) {
        dropdownOptions.style.display = "none";
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

    
formatRupiah(input) {
  const original = input.value;
  let angka = input.value.replace(/\D/g, "");

  if (original !== "" && /[^\d]/.test(original)) {
    const onlySeparators = /^[\d.]+$/.test(original);
    if (!onlySeparators) {
      this.showNotification("Karakter selain angka tidak diperbolehkan!", false);
    }
  }

  const nilai = parseInt(angka, 10);
  if (nilai > 100000000) {
    this.showNotification("Nilai tidak boleh lebih dari 100 juta!", false);
    angka = 0;
  }

  angka = new Intl.NumberFormat("id-ID").format(angka);
  input.value = angka;
},

checkMinValue(input) {
  const nilai = parseInt(input.value.replace(/\D/g, ""), 10);
  if (nilai < 20000000) {
    this.showNotification("Nilai minimal adalah 20 juta!", false);
    input.value = 0;
    input.focus();
  }
},

  clearForm() {
    const form = document.getElementById("form-bawah");
    form.reset();

    this.form2.Include = "";
    this.form2.catatan = "";
    this.form2.hotel = "";

    // Reset dropdown program
    const programSelect = document.getElementById("program");
    programSelect.selectedIndex = 0;
    $(programSelect).trigger("change");

    // Reset input maskapai
    const maskapaiInput = document.getElementById("maskapai");
    maskapaiInput.value = "";
    maskapaiInput.setAttribute("placeholder", "Pilih Maskapai");

    // Reset dropdown item-harga
    const itemHargaSelect = document.getElementById("item-harga");
    itemHargaSelect.selectedIndex = 0;
    $(itemHargaSelect).trigger("change");

    // Sembunyikan input harga
    document.getElementById("quad").parentElement.style.display = "none";
    document.getElementById("triple").parentElement.style.display = "none";
    document.getElementById("double").parentElement.style.display = "none";

    // Reset gambar yang terpilih di dropdown maskapai
    const dropdownOptions = document.getElementById("dropdownOptions");
    const images = dropdownOptions.querySelectorAll("img");
    images.forEach((img) => {
      img.classList.remove("selected");
    });

    // Reset array selectedPaths
    this.selectedPaths = [];


    
  },

  validateInput(field) {
      const invalidChars = /[<>\/\\'";(){}]/g;
      if (invalidChars.test(this.form[field])) {
        this.form[field] = this.form[field].replace(invalidChars, "");
        this.showNotification("Karakter tidak diperbolehkan!", false);
      }
    },
  
  validateInput2(field) {
      const invalidChars = /[<>\/\\'";(){}]/g;
      if (invalidChars.test(this.form2[field])) {
        this.form2[field] = this.form2[field].replace(invalidChars, "");
        this.showNotification("Karakter tidak diperbolehkan!", false);
      }
    },

  },
  mounted() {

    this.fetchPrograms();
    this.fetchPackages();

    // Event listener untuk dropdown maskapai
    const dropdown = document.getElementById("maskapai");
    const dropdownOptions = document.getElementById("dropdownOptions");
    const closeButton = document.querySelector(".close-btn");
    const images = dropdownOptions.querySelectorAll("img");

    // Toggle dropdown
    dropdown.addEventListener("click", this.toggleDropdown);

    // Pilih maskapai
    images.forEach((img) => {
      img.addEventListener("click", this.selectMaskapai);
    });

    // Tombol Close
    closeButton.addEventListener("click", this.closeDropdown);

    // Tutup dropdown jika klik di luar
    document.addEventListener("click", this.handleClickOutside);

     // Event listener untuk dropdown item-harga
  const jumlahItemHarga = document.getElementById("item-harga");
  jumlahItemHarga.addEventListener("change", this.updateHargaFields);

  // Event listener untuk input harga
  const quadInput = document.getElementById("quad");
  const tripleInput = document.getElementById("triple");
  const doubleInput = document.getElementById("double");

  quadInput.addEventListener("input", () => this.formatRupiah(quadInput));
  tripleInput.addEventListener("input", () => this.formatRupiah(tripleInput));
  doubleInput.addEventListener("input", () => this.formatRupiah(doubleInput));


  // Jalankan updateHargaFields saat pertama kali load
  this.updateHargaFields();

   // Event listener untuk tombol clear
   const clearButton = document.getElementById("clear-paket");
  clearButton.addEventListener("click", (event) => {
    event.preventDefault();
    this.clearForm();
  });


   // Ambil semua elemen input dan select
   const programSelect = document.getElementById("program");
  const paketInput = document.getElementById("paket");
  const starSelect = document.getElementById("star");
  const hotelTextarea = document.getElementById("hotel");
  const maskapaiInput = document.getElementById("maskapai");
  const itemHargaSelect = document.getElementById("item-harga");

  
  paketInput.addEventListener("click", (event) => {
    if (programSelect.value === "") {
      this.showNotification("Harap pilih Program terlebih dahulu!", false);
      programSelect.focus();
      paketInput.blur(); // Mencegah input paket aktif
    }
  });

  starSelect.addEventListener("click", (event) => {
    if (paketInput.value.trim() === "") {
      this.showNotification("Harap isi Nama Paket terlebih dahulu!", false);
      paketInput.focus();
      event.preventDefault(); // Mencegah dropdown star terbuka
    }
  });

  hotelTextarea.addEventListener("focus", () => {
    if (starSelect.value === "") {
      this.showNotification("Harap pilih Star (Bintang) terlebih dahulu!", false);
      starSelect.focus();
      hotelTextarea.blur(); // Mencegah textarea hotel aktif
    }
  });

  maskapaiInput.addEventListener("click", (event) => {
    if (hotelTextarea.value.trim() === "") {
      this.showNotification("Harap isi Hotel terlebih dahulu!", false);
      hotelTextarea.focus();
      event.preventDefault(); // Mencegah dropdown maskapai terbuka
    }
  });

  itemHargaSelect.addEventListener("click", (event) => {
    if (maskapaiInput.value.trim() === "") {
      this.showNotification("Harap pilih Maskapai terlebih dahulu!", false);
      maskapaiInput.focus();
      event.preventDefault(); // Mencegah dropdown item harga terbuka
    }
  });

  quadInput.addEventListener("focus", () => {
    if (itemHargaSelect.value === "") {
      this.showNotification("Harap pilih Jumlah Item Harga terlebih dahulu!", false);
      itemHargaSelect.focus();
      quadInput.blur(); // Mencegah input quad aktif
    }
  });

  tripleInput.addEventListener("focus", () => {
    if (quadInput.value.trim() === "") {
      this.showNotification("Harap isi Quad terlebih dahulu!", false);
      quadInput.focus();
      tripleInput.blur(); // Mencegah input triple aktif
    }
  });

  doubleInput.addEventListener("focus", () => {
    if (tripleInput.value.trim() === "") {
      this.showNotification("Harap isi Triple terlebih dahulu!", false);
      tripleInput.focus();
      doubleInput.blur(); // Mencegah input double aktif
    }
  });

  },
  beforeUnmount() {
    // Hancurkan Select2
    $("#program").select2("destroy");

    // Hapus event listener
    const dropdown = document.getElementById("maskapai");
    const dropdownOptions = document.getElementById("dropdownOptions");
    const closeButton = document.querySelector(".close-btn");
    const images = dropdownOptions.querySelectorAll("img");

    dropdown.removeEventListener("click", this.toggleDropdown);
    images.forEach((img) => {
      img.removeEventListener("click", this.selectMaskapai);
    });
    closeButton.removeEventListener("click", this.closeDropdown);
    document.removeEventListener("click", this.handleClickOutside);

    const jumlahItemHarga = document.getElementById("item-harga");
  jumlahItemHarga.removeEventListener("change", this.updateHargaFields);

  const quadInput = document.getElementById("quad");
  const tripleInput = document.getElementById("triple");
  const doubleInput = document.getElementById("double");

  quadInput.removeEventListener("input", () => this.formatRupiah(quadInput));
  tripleInput.removeEventListener("input", () => this.formatRupiah(tripleInput));
  doubleInput.removeEventListener("input", () => this.formatRupiah(doubleInput));

    // Hapus event listener saat komponen di-unmount
    const clearButton = document.getElementById("clear-paket");
  clearButton.removeEventListener("click", (event) => {
    event.preventDefault();
    this.clearForm();
  });

  // Ambil semua elemen input dan select
  const programSelect = document.getElementById("program");
  const paketInput = document.getElementById("paket");
  const starSelect = document.getElementById("star");
  const hotelTextarea = document.getElementById("hotel");
  const maskapaiInput = document.getElementById("maskapai");
  const itemHargaSelect = document.getElementById("item-harga");


  // Hapus event listener untuk validasi langkah
  paketInput.removeEventListener("focus", () => {
    if (programSelect.value === "") {
      this.showNotification("Harap pilih Program terlebih dahulu!", false);
      programSelect.focus();
      paketInput.blur();
    }
  });

  starSelect.removeEventListener("click", (event) => {
    if (paketInput.value.trim() === "") {
      this.showNotification("Harap isi Nama Paket terlebih dahulu!", false);
      paketInput.focus();
      event.preventDefault();
    }
  });

  hotelTextarea.removeEventListener("focus", () => {
    if (starSelect.value === "") {
      this.showNotification("Harap pilih Star (Bintang) terlebih dahulu!", false);
      starSelect.focus();
      hotelTextarea.blur();
    }
  });

  maskapaiInput.removeEventListener("click", (event) => {
    if (hotelTextarea.value.trim() === "") {
      this.showNotification("Harap isi Hotel terlebih dahulu!", false);
      hotelTextarea.focus();
      event.preventDefault();
    }
  });

  itemHargaSelect.removeEventListener("click", (event) => {
    if (maskapaiInput.value.trim() === "") {
      this.showNotification("Harap pilih Maskapai terlebih dahulu!", false);
      maskapaiInput.focus();
      event.preventDefault();
    }
  });

  quadInput.removeEventListener("focus", () => {
    if (itemHargaSelect.value === "") {
      this.showNotification("Harap pilih Jumlah Item Harga terlebih dahulu!", false);
      itemHargaSelect.focus();
      quadInput.blur();
    }
  });

  tripleInput.removeEventListener("focus", () => {
    if (quadInput.value.trim() === "") {
      this.showNotification("Harap isi Quad terlebih dahulu!", false);
      quadInput.focus();
      tripleInput.blur();
    }
  });

  doubleInput.removeEventListener("focus", () => {
    if (tripleInput.value.trim() === "") {
      this.showNotification("Harap isi Triple terlebih dahulu!", false);
      tripleInput.focus();
      doubleInput.blur();
    }
  });

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
    max-width: 100%;
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



/* ✨ Modal Styling */
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Latar belakang semi-transparan gelap */
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Pastikan modal di atas elemen lain */
}

.modal-content {
  background: #1a1a1a; /* Latar belakang hitam */
  padding: 30px;
  border-radius: 10px;
  width: 350px;
  text-align: center;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); /* Shadow halus */
  border: 1px solid #333333; /* Border subtle */
}

.modal-content h2 {
  color: #D6B62A; /* Warna gold untuk judul */
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
  text-transform: none; /* Hilangkan uppercase jika tidak diperlukan */
}

.modal-content label {
  display: block;
  color: #cccccc; /* Warna teks abu-abu terang */
  margin-bottom: 8px;
  font-size: 14px;
  text-align: left;
  font-weight: 500;
}

.modal-content input {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px; /* Jarak antar input */
  border: 1px solid #444444; /* Border subtle */
  border-radius: 6px;
  background: #2a2a2a; /* Warna input gelap */
  color: #ffffff; /* Warna teks putih */
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
}

.modal-content input:focus {
  border-color: #D6B62A; /* Border gold saat focus */
}

/* Divider antar elemen */
.modal-content .divider {
  border-bottom: 1px solid #444444; /* Warna divider subtle */
  margin: 20px 0; /* Jarak atas dan bawah */
}

.modal-content button {
  background: #D6B62A; /* Warna gold */
  color: #000000; /* Warna teks hitam */
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  margin-top: 20px;
  transition: background 0.3s ease;
}

.modal-content button:hover {
  background: #b59323; /* Warna gold lebih gelap saat hover */
}

/* Note di bawah tombol */
.modal-content .note {
  color: #888888; /* Warna teks abu-abu */
  font-size: 12px;
  margin-top: 10px;
  text-align: center;
}

.close {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 24px;
  cursor: pointer;
  color: #cccccc; /* Warna abu-abu terang */
  transition: color 0.3s ease;
}

.close:hover {
  color: #ffffff; /* Warna putih saat hover */
}



/* Main Content END*/

</style>