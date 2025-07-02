<?php
header('Content-Type: application/json');

// Google reCAPTCHA secret key
$recaptchaSecret = '6Ldgnm4rAAAAAJ_xcQiUwPPQNkjA_wCT77Kwzum1';

// 入力チェック
if (
    empty($_POST['name']) ||
    empty($_POST['email']) ||
    empty($_POST['phone']) ||
    empty($_POST['message']) ||
    empty($_POST['g-recaptcha-response'])
) {
    echo json_encode(['success' => false, 'message' => 'すべての項目を入力してください。']);
    exit;
}

// reCAPTCHA検証
$recaptchaResponse = $_POST['g-recaptcha-response'];
$remoteIp = $_SERVER['REMOTE_ADDR'];
$verifyUrl = 'https://www.google.com/recaptcha/api/siteverify?secret=' . $recaptchaSecret . '&response=' . $recaptchaResponse . '&remoteip=' . $remoteIp;

$verify = file_get_contents($verifyUrl);
$captchaSuccess = json_decode($verify);

if (!$captchaSuccess->success) {
    echo json_encode(['success' => false, 'message' => 'ロボット確認の検証に失敗しました。']);
    exit;
}

// メール送信処理
$name = htmlspecialchars($_POST['name'], ENT_QUOTES);
$email = htmlspecialchars($_POST['email'], ENT_QUOTES);
$phone = htmlspecialchars($_POST['phone'], ENT_QUOTES);
$message = htmlspecialchars($_POST['message'], ENT_QUOTES);

$to = 'gsic-contact@growsic.co.jp'; // 管理者メールアドレス
$subject = '【お問い合わせ】オフィシャルサイトのフォームからのメッセージ';
$body = <<<EOD
お問い合わせ内容を受け付けました：

お名前：{$name}
メールアドレス：{$email}
電話番号：{$phone}

メッセージ：
{$message}
EOD;

$headers = "From: {$email}\r\n";
$headers .= "Reply-To: {$email}\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'メールの送信に失敗しました。']);
}
