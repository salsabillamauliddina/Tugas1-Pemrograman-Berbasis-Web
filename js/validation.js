import { dataPengguna } from "./data.js"; 

// ===================== ALERT FUNCTION =====================
const showAlert = (message, type = 'danger', target = 'alertContainer') => {
  const container = document.getElementById(target);
  if (container) {
    container.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
  }
};

// ===================== LOGIN FUNCTION =====================
const Login = () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Cek jika kosong
  if (!email || !password) {
    return showAlert("Email and password can't be empty!");
  }

  // Validasi format email
  const emailFormatValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailFormatValidation.test(email)) { 
    return showAlert("Email format isn't valid!");
  }

  // Validasi panjang password
  if (password.length < 5) {
    return showAlert("Password must be at least 5 characters!");
  }

  // Cari user berdasarkan email
  const user = dataPengguna.find(u => u.email === email);

  // Jika email tidak ditemukan
  if (!user) {
    return showAlert("Can't find that email. Please register first!");
  }

  // Jika password salah
  if (user.password !== password) {
    return showAlert("Email or password is incorrect!");
  }

  // Jika login berhasil
  showAlert(`Welcome, ${user.nama || "User"}!`, "success");

  // Simpan data user ke localStorage agar bisa dipakai di dashboard
  localStorage.setItem("loggedUser", JSON.stringify(user));

  // Redirect otomatis ke dashboard
  setTimeout(() => {
    window.location.href = '../dashboard.html';
  }, 1500);
};

// ===================== REGISTER FUNCTION =====================
const Register = () => {
  const nama = document.getElementById("regNama").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const confirm = document.getElementById("regConfirmPassword").value.trim();

  // Validasi kosong
  if (!nama || !email || !password || !confirm) 
    return showAlert("Semua field harus diisi!", "danger", "registerAlert");

  // Validasi format email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) 
    return showAlert("Format email tidak valid!", "danger", "registerAlert");

  // Validasi panjang password
  if (password.length < 5) 
    return showAlert("Password minimal 5 karakter!", "warning", "registerAlert");

  // Validasi konfirmasi password
  if (password !== confirm) 
    return showAlert("Konfirmasi password tidak cocok!", "danger", "registerAlert");

  // Cek apakah email sudah terdaftar
  if (dataPengguna.some(user => user.email === email)) 
    return showAlert("Email sudah terdaftar!", "warning", "registerAlert");

  // Simpan data baru
  dataPengguna.push({
    id: dataPengguna.length + 1,
    nama,
    email,
    password,
    role: "User",
    lokasi: "Pusat"
  });

  showAlert("Registrasi berhasil! Silakan login.", "success", "registerAlert");

  // Tutup modal otomatis
  setTimeout(() => {
    const modal = bootstrap.Modal.getInstance(document.getElementById("registerModal"));
    modal.hide();
  }, 1500);
};

// ===================== FORGOT PASSWORD FUNCTION =====================
let userReset = null; // Menyimpan user yang valid email

const ForgotPassword = () => {
  const emailInput = document.getElementById("forgotEmail");
  const newPassword = document.getElementById("newPassword");
  const confirmNewPassword = document.getElementById("confirmNewPassword");

  // Tahap 1: Validasi email
  if (userReset === null) {
    const email = emailInput.value.trim();
    const user = dataPengguna.find(u => u.email === email);

    if (!email) {
      return showAlert("Email tidak boleh kosong!", "danger", "forgotAlert");
    }
    if (!user) {
      return showAlert("Email tidak ditemukan!", "warning", "forgotAlert");
    }

    userReset = user; 
    showAlert("Email ditemukan! Silakan buat password baru.", "success", "forgotAlert");

    // Tampilkan form password baru
    document.getElementById("forgotEmailSection").style.display = "none";
    document.getElementById("resetPasswordSection").style.display = "block";
  } 
  // Tahap 2: Ubah password
  else {
    if (newPassword.value.length < 5) {
      return showAlert("Password minimal 5 karakter!", "danger", "forgotAlert");
    }
    if (newPassword.value !== confirmNewPassword.value) {
      return showAlert("Konfirmasi password tidak cocok!", "danger", "forgotAlert");
    }

    userReset.password = newPassword.value;
    showAlert("Password berhasil diubah! Silakan login.", "success", "forgotAlert");

    setTimeout(() => {
      userReset = null;
      const modal = bootstrap.Modal.getInstance(document.getElementById("forgotModal"));
      modal.hide();
      document.getElementById("forgotForm").reset();
      document.getElementById("forgotEmailSection").style.display = "block";
      document.getElementById("resetPasswordSection").style.display = "none";
    }, 1500);
  }
};

// ===================== EVENT LISTENERS =====================

// Login button
document.getElementById("loginBtn")?.addEventListener("click", (e) => {
  e.preventDefault();
  Login();
});

// Register form
document.getElementById("registerForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  Register();
});

// Forgot password form
document.getElementById("forgotForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  ForgotPassword();
});
