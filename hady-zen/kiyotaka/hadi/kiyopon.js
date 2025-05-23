(() => {
      emailjs.init('c0akXFvxMmMKUoiWf');
    })();

    document.getElementById('contact-form').addEventListener('submit', function(event) {
      event.preventDefault();

      emailjs.sendForm('hadikiyotaka', 'template_ihoae21', this)
        .then(() => {
          alert("Laporan berhasil dikirim!");
        }, () => {
          alert("Terjadi kesalahan, coba lagi.");
        });
    });

    function goBack() {
      if (document.referrer) {
        window.history.back();
      } else {
        window.location.href = "/";
      }
    }