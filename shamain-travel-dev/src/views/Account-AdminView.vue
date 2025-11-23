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
          <h1 class="add-master-text">Akun</h1>
          <p class="data-setup-text">Manajemen Admin</p>
        </div>
       
      </div>

      <!-- Form Atas -->
      <div class="form-header">
        <button class="tab-button active">NEW ADMIN</button>
      </div>

      <div class="form-container">
        <form class="barcode-form" id="form-atas" @submit.prevent="handleSubmit">
          <!-- Bagian Kiri: Form utama -->
          <div class="left-form">
            <div class="form-row">
              <label for="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Masukkan Username"
                required
                v-model="formData.username"
                @input="validateInput('username')"
              />
            </div>

            <div class="form-row">
              <label for="password">Password</label>
              <div class="password-container">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  required
                  v-model="formData.password"
                  @input="validateInput('password')"
                />
                <img
                  :src="passwordIcon"
                  alt="Show Password"
                  class="password-toggle"
                  id="passwordToggle"
                  @click="togglePasswordVisibility"
                />
              </div>
            </div>

            <div class="form-row">
              <label for="role">Role</label>
              <input
                type="text"
                id="role"
                name="role"
                value="admin"
                required
                readonly
                v-model="formData.role"
              />
            </div>
          </div>

          <!-- Bagian Kanan: System Counter -->
          <div class="system-counter-container">
            <div class="form-actions-up">
              <button type="submit" id="add-program" class="btn-add">Add</button>
              <button type="reset" id="clear-program" class="btn-clear" @click="clearForm">Clear</button>
            </div>
          </div>
        </form>

        <div class="filter-container">
  <div class="search-wrapper">
    <span class="search-icon"></span>
    <input 
      type="text" 
      v-model="searchQuery" 
      placeholder="Cari akun berdasarkan username pada tabel dibawah ini!" 
      class="search-input"
    />
    <span v-if="searchQuery" class="clear-icon" @click="searchQuery = ''"></span>
  </div>
</div>

        <!-- Tabel untuk menampilkan data accounts -->
        <div class="accounts-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
  <template v-if="filteredAccounts.length > 0">
    <tr v-for="account in filteredAccounts" :key="account.id_accounts">
      <td>{{ account.id_accounts }}</td>
      <td v-html="highlightSearch(account.username)"></td>
      <td>{{ account.role }}</td>
      <td>
        <button @click="openEditModal(account)">
          <img src="../assets/edit.png" alt="Edit" />
        </button>
        <button @click="openDeleteModal(account)">
          <img src="../assets/trash.png" alt="Delete" />
        </button>
      </td>
    </tr>
  </template>
  <tr v-else>
    <td colspan="4" class="no-data-message">Data Tidak Ditemukan</td>
  </tr>
</tbody>


          </table>
        </div>


        <!-- Modal Edit Akun -->
  <div v-if="isEditModalOpen" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeEditModal">&times;</span>
      <h2>Edit Akun</h2>
      <label>Username:</label>
      <input type="text" v-model="editForm.username"/>

      <label>New Password:</label>
      <input type="password" v-model="editForm.newPassword" placeholder="Masukkan password baru" />

      <button @click="updateAccount">Update</button>
    </div>
  </div>

  <!-- Modal Hapus Akun -->
  <div v-if="isDeleteModalOpen" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeDeleteModal">&times;</span>
      <h2>Hapus Akun</h2>
      <label>Konfirmasi Username</label>
      <input type="text" v-model="deleteForm.username" placeholder="Masukkan username" />
      <button @click="deleteAccount">Delete</button>
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
import AccountsIcon from "../components/Accounts-icon.vue";
import IconSuccess from "../assets/icon-success.png";
import IconError from "../assets/icon-error.png";
import showPwIcon from "../assets/show-pw.png";
import hidePwIcon from "../assets/hide-pw.png";
import api from "../api"; // Import API yang sudah dikonfigurasi

export default {
  name: "AccountAdminView",
  components: {
    SideNavbar,
    FooterAdmin,
    AccountsIcon,
  },
  data() {
    return {
      isSidebarCollapsed: false,
      showPassword: false,
      passwordIcon: showPwIcon,
      formData: {
        username: "",
        password: "",
        role: "admin",
      },
      searchQuery: "",
      accounts: [], // Data accounts akan disimpan di sini
      isEditModalOpen: false,
      isDeleteModalOpen: false,
      editForm: {
        id: null,
        username: "",
        newPassword: "",
      },
      deleteForm: {
        id: null,
        username: "",
      },
    };
  },
  computed: {
  filteredAccounts() {
    if (!this.searchQuery) {
      return this.accounts;
    }
    return this.accounts.filter(account =>
      account.username.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
},
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
      this.passwordIcon = this.showPassword ? hidePwIcon : showPwIcon;
    },
    collapseSidebar() {
      this.isSidebarCollapsed = true;
    },
    expandSidebar() {
      this.isSidebarCollapsed = false;
    },
    validateInput(field) {
      const invalidChars = /[<>\/\\'";(){}]/g;
      if (invalidChars.test(this.formData[field])) {
        this.formData[field] = this.formData[field].replace(invalidChars, "");
        this.showNotification("Karakter tidak diperbolehkan!", false);
      }
    },
    async handleSubmit() {
      if (this.formData.password.length < 8) {
        this.showNotification("Password minimal harus 8 karakter!", false);
        return;
      }

      try {
        const response = await api.post("/accounts/post", this.formData);
        this.showNotification(response.data.message, true);
        this.clearForm();
        this.fetchAccounts(); // Ambil data terbaru setelah menambahkan account
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Terjadi kesalahan saat menyimpan data!";
        this.showNotification(errorMessage, false);
      }
    },
    clearForm() {
      this.formData = {
        username: "",
        password: "",
        role: "admin",
      };
    },
    showNotification(message, isSuccess) {
      const notification = document.createElement("div");
      const iconPath = isSuccess ? new URL(IconSuccess, import.meta.url).href : new URL(IconError, import.meta.url).href;

      notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${iconPath}" 
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
      }, 3000);
    },
    async fetchAccounts() {
      try {
        const response = await api.get("/accounts/get");
        this.accounts = response.data.data;
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    },
    highlightSearch(text) {
    if (!this.searchQuery) return text;
    const regex = new RegExp(`(${this.searchQuery})`, "gi");
    return text.replace(regex, `<span class="highlight">$1</span>`);
  },
    // ✨ Buka modal edit akun
    openEditModal(account) {
      this.editForm.id = account.id_accounts;
      this.editForm.username = account.username;
      this.editForm.newPassword= "";
      this.isEditModalOpen = true;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
    },
    async updateAccount() {
  if (this.editForm.newPassword && this.editForm.newPassword.length < 8) {
    this.showNotification("Password harus minimal 8 karakter!", false);
    return;
  }

  try {
    const response = await api.put(`/accounts/put/${this.editForm.id}`, {
      username: this.editForm.username,
      newPassword: this.editForm.newPassword || null, // Bisa kosong
    });

    this.showNotification("Akun berhasil diupdate!", true);
    this.closeEditModal();
    this.fetchAccounts();
  } catch (error) {
    if (error.response) {
      this.showNotification(error.response.data.message, false);
    } else {
      this.showNotification("Terjadi kesalahan, coba lagi!", false);
    }
  }
},

    //Buka modal hapus akun
    openDeleteModal(account) {
      this.deleteForm.id = account.id_accounts;
      this.deleteForm.username = "";
      this.isDeleteModalOpen = true;
    },
    closeDeleteModal() {
      this.isDeleteModalOpen = false;
    },
    async deleteAccount() {
      if (!this.deleteForm.username) {
        this.showNotification("Konfirmasi username wajib diisi!",false);
        return;
      }
      try {
        const response = await api.delete(`/accounts/delete/${this.deleteForm.id}`, {
          data: { username: this.deleteForm.username },
        });

        this.showNotification("Akun Berhasil Dihapus!",true)
        this.closeDeleteModal();
        this.fetchAccounts();
      } catch (error) {
        this.showNotification("Akun Gagal Dihapus!",false)
      }
    },
  },
  mounted() {
    this.fetchAccounts(); // Ambil data accounts saat komponen dimuat
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
</style>