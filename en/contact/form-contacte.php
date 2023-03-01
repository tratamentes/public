<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $to_email = "joao.goulart@tratamentes.pt"; // Replace with your email address
    $subject = "Novo contacto :: " . $_POST["name"] . " :: tratamentes.pt"; // Replace with your desired email subject
    $messageform = "Name: " . $_POST["name"] . "\nEmail: " . $_POST["email"] . "\nPhone: " . $_POST["phone"] . "\nSubject: " . $_POST["subject"] . "\nMessage: " . $_POST["message"]; // Format the email message
}
// inclusão da framework no código
require_once '../lib/swift_required.php';




// definir a autenticação via SMTP
// mail.dominios.pt -> deverá trocar pelo endereço de e-mail do seu domínio
// webmaster@dominio.tld -> deverá trocar pelo seu endereço de e-mail
// password_caixa_email -> deverá preencher com a password da respectiva caixa
$transport = Swift_SmtpTransport::newInstance('mail.tratamentes.pt', 25)
->setUsername('joao.goulart@tratamentes.pt')
->setPassword('*5U7+fq8M@EE&V5T')
;
$mailer = Swift_Mailer::newInstance($transport);
 
// Criar o cabeçalho, assim como a mensagem
$message = Swift_Message::newInstance($subject)
->setFrom(array('joao.goulart@tratamentes.pt' => 'Joao Goulart'))
->setTo(array($to_email))
->setBody($messageform)
;
// Efectuar o envio
$result = $mailer->send($message);