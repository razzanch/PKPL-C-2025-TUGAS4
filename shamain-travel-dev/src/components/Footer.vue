<template>

<head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
  />
</head>

    <!-- FOOTER START -->
    <footer class="footer">
      <!-- Layer 1: Background Image -->
      <div class="footer-background"></div>
  
      <!-- Layer 2: Overlay Transparan -->
      <div class="footer-overlay">
        <div class="footer-container">
          <div class="footer-section">
            <img src="../assets/shamainfooter.png" alt="Shamain Travel Logo" />
          </div>
          <div class="footer-section">
            <h3>Reach Us</h3>
            <p>
              <a
                href="https://maps.app.goo.gl/aRwnzBSEdQeqBXSK7?g_st=aw"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jl. Mayor TNI AD RT. 43 No. 21, Sungai Ampal, Sumber Rejo, Balikpapan
              </a>
            </p>
            <p @click="copyToClipboard('0542-5620520')" style="cursor: pointer;">
              Phone: 0542-5620520
            </p>
            <p @click="openWhatsApp('+6285246499914')" style="cursor: pointer;">
              WhatsApp (1) : 0852-4649-9914
            </p>
            <p @click="openWhatsApp('+6285387196977')" style="cursor: pointer;">
              WhatsApp (2): 0853-8719-6977
            </p>
            <p>
              <a
                href="mailto:alshawqharomaintravel@gmail.com?subject=Halo%20Shamain%20Travel&body=Halo,%20saya%20ingin%20bertanya%20tentang%20paket%20Umroh."
                target="_blank"
                rel="noopener noreferrer"
              >
                Email: alshawqharomaintravel@gmail.com
              </a>
            </p>
          </div>
          <div class="footer-section">
            <h3>Fast Access</h3>
            <p><RouterLink to="/"><a>Home</a></RouterLink></p>
<p><RouterLink to="/profile"><a>Profil</a></RouterLink></p>
<p><RouterLink to="/umrah-packages"><a>Paket Umroh</a></RouterLink></p>
<p><RouterLink to="/hajj-packages"><a>Paket Haji</a></RouterLink></p>
<p><RouterLink to="/tour-packages"><a>Paket Wisata</a></RouterLink></p>
<p><RouterLink to="/gallery"><a>Galeri Foto</a></RouterLink></p>
<p><RouterLink to="/contact"><a>Hubungi Kami</a></RouterLink></p>

          </div>
          <div class="footer-section">
            <h3>Follow Us</h3>
            <div class="social-icons">
              <a href="#"><i class="fab fa-facebook"></i></a>
              <a href="#"><i class="fab fa-youtube"></i></a>
              <a
                href="https://www.instagram.com/shamaintravel?igsh=MWc4ZDltZmYxMmVyNQ=="
                target="_blank"
              >
                <i class="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.tiktok.com/@shamaintravel?_t=ZS-8uhTWxVOdnz&_r=1"
                target="_blank"
              >
                <i class="fab fa-tiktok"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; Shamain Travel 2025</p>
        </div>
      </div>
    </footer>
    <!-- FOOTER END -->
  </template>
  
  <script>
  export default {
    methods: {
      copyToClipboard(text) {
        navigator.clipboard.writeText(text)
          .then(() => {
            alert("Copied");
          })
          .catch((err) => {
            console.error("Failed to copy: ", err);
          });
      },

       // Buka WhatsApp dengan nomor yang dipilih
    openWhatsApp(phoneNumber) {
      const formattedNumber = phoneNumber.replace(/\D/g, ""); // Hapus karakter non-angka
      const waUrl = `https://wa.me/${formattedNumber}`;
      window.open(waUrl, "_blank");
    },
    },
  };
  </script>
  
  <style scoped>
.footer {
    position: relative;
    width: 100%;
    
}

/* Layer 1: Background Image */
.footer-background {
    background: url('../assets/footer-bg.png') no-repeat center center/cover;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

/* Layer 2: Overlay Transparan */
.footer-overlay {
    position: relative;
    background-color: rgba(0, 0, 0, 0.85); /* Hitam dengan 85% opacity */
    padding: 50px 0;
    color: white;
    width: 100%;
}


/* Footer Content */
.footer-container {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 30px;
}

.footer-section:nth-child(3) { /* Quick Menu */
    margin-left: 80px; 
}

.footer-section {
    flex: 1;
    min-width: 200px;
}


.footer-section h3 {
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: 700;
}

.footer-section p {
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 10px;
    font-weight: 400;
    color: rgb(182, 182, 182);
}

.footer-section a {
    color: rgb(182, 182, 182);
    text-decoration: none;
}

.footer-section a:hover {
    color: #FFD700;
    text-decoration: underline;
}

.footer-section p:hover {
    color: #FFD700;
    text-decoration: underline;
}
.footer-section img {
    height: 80px;
    width: auto;
}

/* Social Icons */
.social-icons {
    display: flex;
    gap: 20px;
}

.social-icons a {
    color: white;
    font-size: 20px;
    text-decoration: none;
}

.social-icons a:hover {
    color: #FFD700;
}

/* Mengatur ukuran gambar shamainfooter.png */
.footer-section img {
    display: block;
    width: 180px;
    height: 180px;
    object-fit: contain;
    margin: 0 auto; /* Agar gambar tetap di tengah */
    border-radius: 150px;
}

/* Divider putih hanya sepanjang konten */
.footer-bottom {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    padding-top: 15px; /* Memberi jarak atas */
    position: relative;
}

.footer-bottom::before {
    content: "";
    display: block;
    width: 75%; /* Ubah sesuai kebutuhan */
    height: 2px;
    background-color: white;
    margin: 0 auto 10px auto; /* Tengah dan beri jarak bawah */
}



/* Responsive Design */
@media screen and (max-width: 768px) {
    .footer-container {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    .social-icons {
        justify-content: center;
    }
    .form-header{
        margin-left: 15px;
    }
    .footer-section:nth-child(3) { /* Quick Menu */
    margin-left: 0px; 
}
}

@media screen and (max-width: 480px) {
    .footer-container {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    .social-icons {
        justify-content: center;
    }
    .form-header{
        margin-left: 7px;
    }
    .add-master-text {
        font-size: 25px;
    }
    
    .data-setup-text {
        font-size: 15px;
    }
    .footer-section:nth-child(3) { /* Quick Menu */
    margin-left: 0px; 
}
}
  </style>
  