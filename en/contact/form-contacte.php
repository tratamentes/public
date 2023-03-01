<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $to_email = "joao.goulart@tratamentes.pt"; // Replace with your email address
    $subject = "Novo contacto :: " . $_POST["name"] . " :: tratamentes.pt"; // Replace with your desired email subject
    $message = "Name: " . $_POST["name"] . "\nEmail: " . $_POST["email"] . "\nPhone: " . $_POST["phone"] . "\nSubject: " . $_POST["subject"] . "\nMessage: " . $_POST["message"]; // Format the email message

    // Send the email
    if (mail($to_email, $subject, $message)) {
        echo "Thank you for contacting us!";
    } else {
        echo "There was an error sending your message. Please try again later.";
    }
}
?>