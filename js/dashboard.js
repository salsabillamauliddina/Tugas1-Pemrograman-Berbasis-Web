// untuk greeting pada saat berhasil login
const greetingEl = document.getElementById("greeting");
const hour = new Date().getHours();

let greet = "Good Night 🌙";
if (hour < 12) greet = "Good Morning 🌞";
else if (hour < 18) greet = "Good Afternoon ☀️";
else greet = "Good Afternoon 🌇";

greetingEl.textContent = `${greet}, welcome to SITTA UT!`;
