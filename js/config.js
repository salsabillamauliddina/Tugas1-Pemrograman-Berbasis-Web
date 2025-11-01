// agar dinamis saat mencari cover berdasarkan path files
const getBasePath = () => {
  if (typeof window === "undefined") return "assets/img/";
  const origin = window.location.origin; // contoh: http://127.0.0.1:5500
  return origin + "/assets/img/";
};

export { getBasePath };