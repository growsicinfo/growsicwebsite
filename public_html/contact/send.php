<?php

mb_language("Japanese");
mb_internal_encoding("UTF-8");

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

//特定文言のチェック
$forbidden_words = [
    'M&A', '事業承継', '買収', '企業価値', '株式譲渡',
    'SEO', 'ヘッドハンティング','提案', '業務提携',
    'セールス', '事業成長', '商談', '助成金', '補助金'
];

// フォームから受け取るメッセージ
$message = $_POST['message'] ?? '';

// NGワードの検出（部分一致）
foreach ($forbidden_words as $word) {
    if (mb_stripos($message, $word) !== false) {
        echo json_encode(['success' => false, 'message' => '営業・提案等の内容は送信できません。']);
        exit;
    }

}

// 日本語が含まれているかチェック（ひらがな・カタカナ・漢字）
if (!preg_match('/[\p{Hiragana}\p{Katakana}\p{Han}]/u', $message)) {
    echo json_encode(['success' => false, 'message' => '日本語のみ対応しております。']);
    exit;
}

// メール送信処理
$name = htmlspecialchars($_POST['name'], ENT_QUOTES);
$email = htmlspecialchars($_POST['email'], ENT_QUOTES);
$phone = htmlspecialchars($_POST['phone'], ENT_QUOTES);
$message = htmlspecialchars($_POST['message'], ENT_QUOTES);

$to = 'gsic-contact@growsic.co.jp'; // 管理者メールアドレス
// $to = 'tuuhannsennyou1@gmail.com';
$subject = '【お問い合わせ】グロウオフィシャルサイトのフォームからのメッセージ';
$body = <<<EOD
お問い合わせ内容を受け付けました：

お名前：{$name}
メールアドレス：{$email}
電話番号：{$phone}

メッセージ：
{$message}
EOD;

$headers  = "From: {$email}\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";

if (mb_send_mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'メールの送信に失敗しました。']);
}
