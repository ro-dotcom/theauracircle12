<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// DATABASE CONNECTION
$conn = new mysqli("localhost", "root", "", "contact_form");
if ($conn->connect_error) {
    die("DB connection failed");
}

// FORM DATA
$email = $_POST['email'];
$reason = $_POST['reason'];
$message = $_POST['message'];
$send_copy = isset($_POST['send_copy']) ? "Yes" : "No";

// SAVE TO DATABASE
$stmt = $conn->prepare(
    "INSERT INTO contact_messages (email, reason, message, send_copy)
     VALUES (?, ?, ?, ?)"
);
$stmt->bind_param("ssss", $email, $reason, $message, $send_copy);
$stmt->execute();

// ---------------------
// PHPMailer
// ---------------------
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'atulxalxo07@gmail.com';        // 🔴 your Gmail
    $mail->Password   = 'llyn afdh btfu oafq';          // 🔴 16-digit app password
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    $mail->setFrom('atulxalxo07@gmail.com', 'Website Contact');
    $mail->addAddress('atulxalxo07@gmail.com');

    if ($send_copy === "Yes") {
        $mail->addAddress($email);
    }

    $mail->Subject = 'New Contact Form Submission';
    $mail->Body    = "
Email: $email
Reason: $reason

Message:
$message
";

    $mail->send();
} catch (Exception $e) {
    echo "Email failed: {$mail->ErrorInfo}";
}

header("Location: thank-you.html");
exit();
?>
