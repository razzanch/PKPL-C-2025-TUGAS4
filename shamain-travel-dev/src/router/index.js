import { createRouter, createWebHistory } from "vue-router";
import { jwtDecode } from "jwt-decode";

// Import Views
import LoginView from "../views/loginView.vue";
import DashboardView from "../views/Dashboard-AdminView.vue";
import UmrahPackageView from "../views/Paket-Umroh-AdminView.vue";
import HajjPackageView from "../views/Paket-Haji-AdminView.vue";
import TourPackageView from "../views/Paket-Wisata-AdminView.vue";
import GalleryView from "../views/Gallery-AdminView.vue";
import AccountView from "../views/Account-AdminView.vue";
import HubungiPublicView from "../views/Hubungi-PublicView.vue";
import ProfilePublicView from "../views/Profile-PublicView.vue";
import GaleriPublicView from "../views/Galeri-PublicView.vue";
import PaketUmrohPublicView from "../views/Paket-Umroh-PublicView.vue";
import RincianPaketPublicView from "../views/RincianPaket-PublicView.vue";
import PaketHajiPublicView from "../views/Paket-Haji-PublicView.vue";
import PaketWisataPublicView from "../views/Paket-Wisata-PublicView.vue";
import NotFoundPublicView from "../views/NotFound-PublicView.vue";
import HomePublicView from "../views/Home-PublicView.vue";
import IconSuccess from "../assets/icon-success.png";
import IconError from "../assets/icon-error.png";


// Fungsi untuk menampilkan notifikasi
function showNotification(message, isSuccess) {
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
  }, 2000);
}

// Konfigurasi Routing
const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: HomePublicView },
  { path: "/admin", component: LoginView },
  { path: "/admin/dashboard", component: DashboardView, meta: { requiresAuth: true } },
  { path: "/admin/umrah-packages", component: UmrahPackageView, meta: { requiresAuth: true } },
  { path: "/admin/hajj-packages", component: HajjPackageView, meta: { requiresAuth: true } },
  { path: "/admin/tour-packages", component: TourPackageView, meta: { requiresAuth: true } },
  { path: "/admin/gallery", component: GalleryView, meta: { requiresAuth: true } },
  { path: "/admin/account", component: AccountView, meta: { requiresAuth: true } },
  { path: "/contact", component: HubungiPublicView},
  { path: "/profile", component: ProfilePublicView},
  { path: "/gallery", component: GaleriPublicView},
  { path: "/umrah-packages", component: PaketUmrohPublicView},
  { path: "/hajj-packages", component: PaketHajiPublicView},
  { path: "/tour-packages", component: PaketWisataPublicView},
  { path: "/detail-package/:id", component: RincianPaketPublicView},
  
  { path: '/404', component: NotFoundPublicView },
  { path: '/:pathMatch(.*)*', redirect: '/404' } // wajib di akhir
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Scroll ke atas setiap kali berpindah halaman
    return { top: 0 };
  }
});

router.beforeEach(async (to, from, next) => {
  // 1. Daftar path yang boleh diakses tanpa login (public routes)
  const publicPaths = [
    '/',
    '/home',
    '/contact',
    '/profile',
    '/gallery',
    '/umrah-packages',
    '/hajj-packages',
    '/tour-packages',
    '/detail-package/:id',
    '/admin',
    '/404'
  ];

  // 2. Handle not found routes
  if (to.matched.some(record => record.path === '/:catchAll(.*)')) {
    return next();
  }

    // 3. Cek jika path adalah public
    const isPublicPath = publicPaths.some(path => {
      // Menangani rute dinamis /detail-package/:id
      if (path === '/detail-package/:id') {
        // Cek apakah path dimulai dengan '/detail-package'
        return to.path.startsWith('/detail-package');
      }
  
      // Handle path lainnya seperti '/umrah-packages', '/home', dll.
      return to.path === path;
    });

  // 4. Handle public paths
  if (isPublicPath) {
    // Khusus untuk /admin ketika sudah login
    if (to.path === '/admin') {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000);
          
          if (decoded.exp > currentTime) {
            showNotification('Anda sudah login!', true);
            return next('/admin/dashboard');
          } else {
            // Token expired, bersihkan storage
            localStorage.removeItem('token');
            localStorage.removeItem('role');
          }
        } catch (error) {
          console.error('Token error:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('role');
        }
      }
    }
    return next();
  }

  // 5. Verifikasi protected routes
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    showNotification('Anda belum login!', false);
    return next('/admin');
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    const tokenExpired = decoded.exp < currentTime;

   

    if (tokenExpired) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      showNotification('Sesi login anda sudah habis, silakan login kembali!', false);
      return next('/admin');
    }

    if (role !== 'master' && role !== 'admin') {
      showNotification('Akses ditolak! Role tidak valid.', false);
      return next('/admin');
    }

    if (to.path === '/admin/account' && role !== 'master') {
      showNotification('Akses ditolak! Hanya master yang bisa mengakses.', false);
      return next('/admin/dashboard');
    }

    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    showNotification('Sesi tidak valid, silakan login kembali!', false);
    return next('/admin');
  }
});



export default router;
