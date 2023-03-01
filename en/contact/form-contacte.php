<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verify the reCAPTCHA response
    $recaptcha_response = $_POST["g-recaptcha-response"];
    $secret_key = "6LfjPcEkAAAAADmqQbYb7kxiAJd97M2aQGTjPvDz"; // Replace with your secret key
    $url = "https://www.google.com/recaptcha/api/siteverify";
    $data = array(
        "secret" => $secret_key,
        "response" => $recaptcha_response
    );
    $options = array(
        "http" => array(
            "header" => "Content-type: application/x-www-form-urlencoded\r\n",
            "method" => "POST",
            "content" => http_build_query($data)
        )
    );
    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);
    $result = json_decode($response);
    
    // If the reCAPTCHA response is valid, send the email
    if ($result->success) {
        $to_email = "joao.goulart@tratamentes.pt"; // Replace with your email address
        $subject = "Novo contacto :: ".$_POST["name"]." :: tratamentes.pt"; // Replace with your desired email subject
        $message = "Name: ".$_POST["name"]."\nEmail: ".$_POST["email"]."\nPhone: ".$_POST["phone"]."\nSubject: ".$_POST["subject"]."\nMessage: ".$_POST["message"]; // Format the email message
        
        // Send the email
        if (mail($to_email, $subject, $message)) {
            echo "Thank you for contacting us!";
        } else {
            echo "There was an error sending your message. Please try again later.";
        }
    } else {
        echo "Please complete the reCAPTCHA verification to submit the form.";
    }
}
?>
