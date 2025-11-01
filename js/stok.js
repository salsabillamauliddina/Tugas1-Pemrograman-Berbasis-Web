import { dataBahanAjar } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("tbody");
  const btnTambah = document.getElementById("btnTambah");

  function renderData() {
    tbody.innerHTML = "";
    dataBahanAjar.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.kodeBarang}</td>
        <td>${item.namaBarang}</td>
        <td>${item.jenisBarang}</td>
        <td>${item.stok}</td>
        <td><img src="${item.cover}" alt="${item.namaBarang}" width="50" class="rounded"></td>
      `;
      tbody.appendChild(tr);
    });
  }

  renderData();

  btnTambah.addEventListener("click", () => {
    const kode = document.getElementById("kode").value.trim();
    const nama = document.getElementById("nama").value.trim();
    const jenis = document.getElementById("jenis").value.trim();
    const stok = document.getElementById("stok").value.trim();

    if (!kode || !nama || !jenis || !stok) {
      alert("All fields are required!");
      return;
    }

    dataBahanAjar.push({
      kodeLokasi: "-",
      kodeBarang: kode,
      namaBarang: nama,
      jenisBarang: jenis,
      edisi: "-",
      stok: parseInt(stok),
      cover: "./assets/img/default.jpg"
    });

    renderData();
    alert("Data successfully added!");
    document.querySelectorAll("input").forEach((input) => (input.value = ""));
  });
});
