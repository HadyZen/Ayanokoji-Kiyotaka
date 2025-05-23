const hady = document.getElementById("menu-toggle");
const hadi = document.getElementById("sidebar");
const arisu = sidebar.querySelectorAll('a');

hady.addEventListener("click", () => {
  hadi.classList.toggle("active");
});

arisu.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sakayanagi = document.querySelector(link.getAttribute("href"));
    hadi.classList.remove("active");
    sakayanagi.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const progress = document.getElementById('progress');
const current = document.getElementById('current');
const duration = document.getElementById('duration');

let isPlaying = false;

playBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    playBtn.innerHTML = '&#9654;';
  } else {
    audio.play();
    playBtn.innerHTML = '&#10074;&#10074;';
  }
  isPlaying = !isPlaying;
});

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    updateTime();
  }
});

progress.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

audio.addEventListener('loadedmetadata', updateTime);
audio.addEventListener('timeupdate', updateTime);

function updateTime() {
  let currentMinutes = Math.floor(audio.currentTime / 60);
  let currentSeconds = Math.floor(audio.currentTime % 60);
  let durationMinutes = Math.floor(audio.duration / 60);
  let durationSeconds = Math.floor(audio.duration % 60);
  
  if (currentSeconds < 10) currentSeconds = '0' + currentSeconds;
  if (durationSeconds < 10) durationSeconds = '0' + durationSeconds;
  
  current.innerText = `${currentMinutes}:${currentSeconds}`;
  duration.innerText = `${durationMinutes}:${durationSeconds}`;
}

document.addEventListener('DOMContentLoaded', function () {
  const sendButton = document.getElementById('send-button');
  const userInput = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');
  const virtualKeys = document.querySelectorAll('.vk-key');

  sendButton.addEventListener('click', () => {
    const message = userInput.innerText.trim();
    if (message === '') return;

    appendMessage('user', message);
    userInput.innerText = '';
    fetchResponse(message);
  });

  function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function fetchResponse(message) {
    fetch(`https://tes.me/api?text=${encodeURIComponent(message)}`)
      .then(res => res.json())
      .then(data => {
        const reply = data?.reply || 'Maaf, tidak ada respon.';
        appendMessage('bot', reply);
      })
      .catch(() => {
        appendMessage('bot', 'Lagi error, coba nanti!');
      });
  }

  virtualKeys.forEach(key => {
    key.addEventListener('click', () => {
      const value = key.textContent;

if (key.classList.contains('space')) {
  userInput.innerText += '\u00A0'; 

      } else if (key.classList.contains('del')) {
        userInput.innerText = userInput.innerText.slice(0, -1);
      } else {
        userInput.innerText += value;
      }

      userInput.focus();
    });
  });
});