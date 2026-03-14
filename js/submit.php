<?php
// --------------------
// DATABASE CONNECTION
// --------------------
$conn = new mysqli("localhost", "root", "", "contact_form");

if ($conn->connect_error) {
    die("Database connection failed");
}

// --------------------
// GET FORM DATA
// --------------------
$email = $_POST['email'];
$reason = $_POST['reason'];
$message = $_POST['message'];
$send_copy = isset($_POST['send_copy']) ? "Yes" : "No";

// --------------------
// SAVE TO DATABASE
// --------------------
$sql = "INSERT INTO contact_messages (email, reason, message, send_copy)
        VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $email, $reason, $message, $send_copy);
$stmt->execute();

// --------------------
// SEND EMAIL
// --------------------
$to = "atulxalxo07@gmail.com@gmail.com"; // 🔴 CHANGE THIS
$subject = "New Contact Form Submission";

$body = "
New form submission received:

Email: $email
Reason: $reason
Message:
$message

Send copy to user: $send_copy
";

$headers = "From: noreply@yourwebsite.com";

mail($to, $subject, $body, $headers);

// Send copy to user if checked
if ($send_copy === "Yes") {
    mail($email, "Copy of your submission", $body, $headers);
}

echo "<h2>Thank you! Your form has been submitted.</h2>";
?>
