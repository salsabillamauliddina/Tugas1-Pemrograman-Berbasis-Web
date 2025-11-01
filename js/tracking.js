import { dataTracking } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("nomorDO");
  const btnCari = document.getElementById("btnCari");
  const hasil = document.getElementById("hasilTracking");

  btnCari.addEventListener("click", () => {
    const nomor = input.value.trim();
    const data = dataTracking[nomor];

    if (!data) {
      hasil.classList.remove("d-none");
      hasil.innerHTML = `<div class="alert alert-danger">Nomor DO <strong>${nomor}</strong> tidak ditemukan.</div>`;
      return;
    }

    // Tampilkan data
    hasil.classList.remove("d-none");
    document.getElementById("namaMahasiswa").textContent = data.nama;
    document.getElementById("status").textContent = data.status;
    document.getElementById("ekspedisi").textContent = data.ekspedisi;
    document.getElementById("tanggalKirim").textContent = data.tanggalKirim;
    document.getElementById("jenisPaket").textContent = data.paket;
    document.getElementById("total").textContent = data.total;

    // Update progress bar
    const bar = document.getElementById("progressBar");
    let progress = 0;
    let warna = "#e3d2e9";
    if (data.status.includes("Perjalanan")) { progress = 50; warna = "bg-info"; }
    else if (data.status.includes("Dikirim")) { progress = 75; warna = "bg-primary"; }
    else if (data.status.includes("Selesai")) { progress = 100; warna = "bg-success"; }
    bar.style.width = `${progress}%`;
    bar.className = `progress-bar ${warna}`;
    bar.textContent = `${progress}%`;

    // Riwayat perjalanan
    const list = document.getElementById("listPerjalanan");
    list.innerHTML = data.perjalanan.map(p => `
      <li class="list-group-item bg-transparent border-0 px-0 py-1">
        <small class="text-secondary">${p.waktu}</small><br>
        <span>${p.keterangan}</span>
      </li>
    `).join("");
  });
});
