<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ayanokoji Kiyotaka - Susun kata</title>
  <style>
    body {
      background-image: url("https://raw.githubusercontent.com/HadyZen/Ayanokoji-Kiyotaka/refs/heads/main/assets/wallpaper.png");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      margin: 0;
      height: 100vh;
      font-size: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
    }

    h1 {
      color: white;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    #kata-acak {
      font-size: 3em;
      margin-bottom: 30px;
      background-color: #3A414A;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      letter-spacing: 5px;
      font-weight: bold;
    }

    input[type="text"] {
      padding: 15px;
      font-size: 1.2em;
      border: none;
      border-radius: 8px;
      margin-bottom: 20px;
      width: 300px;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    button {
      padding: 15px 30px;
      font-size: 1.2em;
      background-color: #3A414A;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: black;
    }

    #hasil {
      font-size: 1.4em;
      margin-top: 20px;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    }
    .hadi {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
    }
    .cipta {
      background-color: transparent;
      font-weight: bold;
      font-size: 20px;
      color: #808080;
    }
  </style>
</head>
<body>
  <div id="kata-acak"></div>
  <input type="text" id="jawaban" placeholder="Masukkan jawabanmu..">
  <button onclick="cekJawaban()">Jawab</button>
  <p id="hasil"></p>
  <div class="hadi">
    <h1 class="cipta">© 𝙷𝚊𝚍𝚢 𝚉𝚎𝚗'𝚒𝚗</h1>
  </div>
  <script>
    let daftarKata = ["PEDO", "NGENTOD", "KONTOL", "MEMEK", "MANI", "JEMBUT", "NENEN", "PEPEK", "CROT", "MULUS", "MASUK", "KELUAR", "TUSUK", "SEPONG", "COLMEK", "COLI", "KOCOKIN"];
    let kata;
    let kataAcak;

    function mulaiPermainan() {
      kata = daftarKata[Math.floor(Math.random() * daftarKata.length)];
      kataAcak = acakKata(kata);
      document.getElementById("kata-acak").textContent = kataAcak;
      document.getElementById("jawaban").value = "";
      document.getElementById("hasil").textContent = "";
    }

    function acakKata(kata) {
      let huruf = kata.split("");
      for (let i = huruf.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [huruf[i],
          huruf[j]] = [huruf[j],
          huruf[i]];
      }
      return huruf.join("");
    }

    function cekJawaban() {
      let jawaban = document.getElementById("jawaban").value.toUpperCase();
      if (jawaban === kata) {
        document.getElementById("hasil").textContent = "Selamat kamu benar!";
        mulaiPermainan();
      } else {
        document.getElementById("hasil").textContent = "Jawaban salah! coba lagi.";
      }
    }

    mulaiPermainan();
  </script>
</body>
</html>
