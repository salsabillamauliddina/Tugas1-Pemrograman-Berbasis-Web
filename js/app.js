import { dataBahanAjar } from "./data.js";

const tbody = document.querySelector("#tabelStok tbody");
const btnTambah = document.getElementById("btnTambah");
const btnRefresh = document.getElementById("btnRefresh");

//  Tampilkan data di tabel
const tampilkanData = () => {
  tbody.innerHTML = "";
  dataBahanAjar.forEach((data) => {
    console.log("<<< ini cek path cover:", data.cover);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${data.kodeLokasi}</td>
      <td>${data.kodeBarang}</td>
      <td>${data.namaBarang}</td>
      <td>${data.jenisBarang}</td>
      <td>${data.edisi}</td>
      <td>
        ${data.stok < 10 
          ? `<span class="badge bg-danger">${data.stok}</span>` 
          : `<span class="badge bg-success">${data.stok}</span>`}
      </td>
      <td><img src="${data.cover}" alt="${data.namaBarang}" width="70" class="rounded shadow-sm" onerror="this.src='assets/img/default.jpg'"></td>
    `;
    tbody.appendChild(row);
  });
};

// Jalankan saat load
tampilkanData();

// Tambah data baru 
btnTambah.addEventListener("click", () => {
  const namaBarang = prompt("Input item name:");
  if (!namaBarang) return alert("Name can't empty!");

  const kodeBarang = prompt("Input item code:");
  const stok = prompt("Input stock quantity:");
  const cover = prompt("Input file cover / url  (ex: manajemen_keuangan.jpg):");

  dataBahanAjar.push({
    kodeLokasi: "0NEW",
    kodeBarang,
    namaBarang,
    jenisBarang: "BMP",
    edisi: "1",
    stok: Number(stok) || 0,
    cover: `assets/img/${cover || "default.jpg"}`
  });

  tampilkanData();
  alert("✅ New book successfully added!");
});

// Refresh data -> belum bisa ditambahkan secara permanen karena belum ada db 
btnRefresh.addEventListener("click", () => {
  tampilkanData();
  alert("🔄 Data updated!");
});
