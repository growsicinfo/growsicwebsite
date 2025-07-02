$(document).ready(function () {
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();

    const form = this;
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const recaptchaResponse = grecaptcha.getResponse();
    if (recaptchaResponse.length === 0) {
      $('#result').html('<div class="alert alert-danger">reCAPTCHAを完了してください。</div>');
      return;
    }

    // フォームが有効なら送信
    $.ajax({
      url: 'send.php',
      type: 'POST',
      data: $(form).serialize(),
      dataType: 'json',
      success: function (res) {
        if (res.success) {
          $('#result').html('<div class="alert alert-success">お問い合わせを受け付けました。<br>ご送信いただいた内容を確認し、必要に応じて改めてご連絡いたします。<br>ブラウザの戻るボタンでお戻りください。</div>');
          form.reset();
          form.classList.remove('was-validated');
          grecaptcha.reset();
          $(form).find('button[type="submit"]').prop('disabled', true);
        } else {
          $('#result').html('<div class="alert alert-danger">' + res.message + '</div>');
        }
      },
      error: function () {
        $('#result').html('<div class="alert alert-danger">送信中にエラーが発生しました。</div>');
      }
    });
  });
});
