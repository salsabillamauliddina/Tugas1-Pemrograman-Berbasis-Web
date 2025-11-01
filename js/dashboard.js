// Cek data user login dari localStorage
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

if (!loggedUser) {
  // Kalau belum login, kembali ke login page
  window.location.href = "index.html";
}

// Tampilkan data user
document.getElementById("welcomeName").textContent = loggedUser.nama;
document.getElementById("userNama").textContent = loggedUser.nama;
document.getElementById("namaUserCard").textContent = loggedUser.nama;
document.getElementById("emailUserCard").textContent = loggedUser.email;
document.getElementById("roleUserCard").textContent = loggedUser.role;

// Tombol logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedUser");
  window.location.href = "index.html";
});
