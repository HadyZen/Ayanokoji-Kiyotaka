class VirtualPet {
  constructor(name) {
    this.name = name;
    this.happiness = 40;
    this.hunger = 40;
    this.energy = 80;
    this.coins = 0;
    this.lastRestTime = null;
    this.foods = ["🍒", "🍎", "🍉", "🍑", "🍊", "🥭", "🍍", "🌶", "🍋", "🍈", "🍏", "🍐", "🥝", "🍇", "🥥", "🍅", "🥕", "🍠", "🌽", "🥦", "🥒", "🥬", "🥑", "🍆", "🥔", "🌰", "🥜", "🍞", "🥐", "🥖", "🥯", "🥞", "🍳", "🥚", "🧀", "🥓", "🥩", "🍗", "🍖", "🍔", "🌭", "🥪", "🥨", "🍟", "🍕", "🌮", "🌯", "🥙", "🥘", "🍝", "🥫", "🥣", "🥗", "🍲", "🍛", "🍜", "🦞", "🍣", "🍤", "🥡", "🍚", "🥟", "🥟", "🍢", "🍙", "🍘", "🍥", "🍡", "🥠", "🥮", "🍧", "🍨", "🍦", "🥧", "🍰", "🍮", "🎂", "🧁", "🍭", "🍫", "🍫", "🍩", "🍪", "🍯", "🧂", "🍿", "🥤", "🥛", "🍵", "☕", "🍹", "🍶"];
  }
  feed() {
    if (this.hunger >= 10) {
      const randomFood = this.foods[Math.floor(Math.random() * this.foods.length)];
      this.hunger -= 10;
      this.happiness += 4;
      this.energy += 2;
      this.coins -= 10;
      return `${this.name} senang makan ${randomFood}.\nPeliharaan kamu memiliki energi ${this.energy}, ${this.happy} kebahagiaan, dan ${this.hunger} kelaparan.\nUang peliharaanmu dikurangi 10 untuk memberi makan ${this.name}.`;
    } else {
      return `${this.name} sudah kenyang!`;
    }
  }
  play() {
    if (this.energy >= 10) {
      this.happiness += 10;
      this.energy -= 5;
      this.coins += 5;
      return `${this.name} senang bermain denganmu.\nSekarang peliharaanmu memiliki kebahagiaan ${this.happy}, energi ${this.energy}, dan mendapatkan 5 uang.`;
    } else {
      return `${this.name} kamu terlalu lelah untuk main sekarang.`;
    }
  }
  rest() {
    const currentTime = Date.now();
    if (!this.lastRestTime || (currentTime - this.lastRestTime) >= 7200000) {
      this.energy += 10;
      this.happiness += 5;
      this.lastRestTime = currentTime;
      return `${this.name} mendapatkan ${this.energy} energi dan ${this.happiness} kebagian.`;
    } else {
      const remainingTime = Math.floor((7200000 - (currentTime - this.lastRestTime)) / 60000);
      return `${this.name} sedang tidur, dibutuhkan ${remainingTime} menit untuk beristirahat penuh.`;
    }
  }
  getStatus() {
    return `🜲 𝗦𝘁𝗮𝘁𝘂𝘀 𝗽𝗲𝗹𝗶𝗵𝗮𝗿𝗮𝗮𝗻\n\nNama: ${this.name}.\nEnergi: ${this.energy}.\nKebahagiaan: ${this.happiness}.\nKelaparan: ${this.hunger}.\nUang: ${this.coins}.`;
  }
}
const fs = require("fs");
const petDataFile = "peliharaan.json";
const userPets = loadPetData();
function loadPetData() {
  try {
    const data = fs.readFileSync(petDataFile);
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}
function savePetData() {
  fs.writeFileSync(petDataFile, JSON.stringify(userPets, null, 2));
}
module.exports = {
  hady: {
    nama: 'pet',
    peran: 0,
    kuldown: 10,
    penulis: 'Hady Zen', 
    tutor: '<aksi> <nama pet>'
  },

  Ayanokoji: async function ({ api, event, args }) {
    const action = args[0];
    const petName = args[1];
    const hady = global.Ayanokoji.awalan;

    if (!action) {
      return api.sendMessage(`🜲 𝗣𝗲𝗹𝗶𝗵𝗮𝗿𝗮𝗮𝗻\n\n• ${hady}pet buat\n• ${hady}pet makan\n• ${hady}pet main\n• ${hady}pet tidur\n• ${hady}pet status\n• ${hady}pet uang\n• ${hady}pet reset`, event.threadID, event.messageID);
    }

    if (action === "buat") {
      if (userPets[event.senderID]) {
        return api.sendMessage(`Kamu sudah memiliki peliharaan bernama ${userPets[event.senderID].name}, kamu tidak dapat membuat yang lain.`, event.threadID, event.messageID);
      }

      if (!petName) {
        return api.sendMessage("Harap tentukan nama untuk peliharaan kamu.", event.threadID, event.messageID);
      }

      userPets[event.senderID] = new VirtualPet(petName);
      savePetData();
      return api.sendMessage(`Kamu telah membuat peliharaan bernama ${petName}.`, event.threadID, event.messageID);
    }

    if (!userPets[event.senderID]) {
      return api.sendMessage(`Kamu harus membuat peliharaan terlebih dahulu, gunakan ${hady}pet buat <nama>.`, event.threadID, event.messageID);
    }

    const pet = userPets[event.senderID];
    let result = "";

    switch (action) {
      case "buat":
        result = `Kamu telah membuat peliharaan bernama ${pet.name}.`;
        break;
      case "makan":
        result = pet.feed();
        break;
      case "main":
        result = pet.play();
        break;
      case "tidur":
        result = pet.rest();
        break;
      case "status":
        result = pet.getStatus();
        break;
      case "uang":
        result = `${pet.name} memiliki uang: ${pet.coins}.`;
        break;
      case "reset":
        if (!petName) {
          return api.sendMessage("Harap masukan nama peliharaan untuk mengatur ulang.", event.threadID, event.messageID);
        }
        if (pet.name !== petName) {
          return api.sendMessage(`Kamu hanya dapat mengatur ulang hewan peliharaamu sendiri, peliharaan kamu diberi nama ${pet.name}.`, event.threadID, event.messageID);
        }
        delete userPets[event.senderID];
        savePetData();
        return api.sendMessage(`Peliharaan ${petName} telah diatur ulang, gunakan ${hady}pet buat <nama> untuk membuat peliharaan baru.`, event.threadID, event.messageID);
      default:
        result = "`🜲 𝗣𝗲𝗹𝗶𝗵𝗮𝗿𝗮𝗮𝗻\n\n• ${hady}pet buat\n• ${hady}pet makan\n• ${hady}pet mulai\n• ${hady}pet tidur\n• ${hady}pet status\n• ${hady}pet uang\n• ${hady}pet reset";
    }

    savePetData();
    return api.sendMessage(result, event.threadID, event.messageID);
  }
};
