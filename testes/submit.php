<?php
// Verify the reCAPTCHA token
$recaptcha_token = $_POST['recaptcha_token'];
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, 'https://recaptchaenterprise.googleapis.com/v1beta1/projects/YOUR_PROJECT_ID/assessments?key=6LekDMEkAAAAAKr7waboa7h0gd1i-0ZmJXgNnZIW');
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode([
  'event' => [
    'token' => $recaptcha_token,
    'siteKey' => '6LekDMEkAAAAAG24yBwb4wrp9G0lY6aWbTAKxFxK',
    'expectedAction' => 'submit'
  ]
]));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, [
  'Content-Type: application/json',
  'Authorization: Bearer YOUR_API_KEY'
]);
$response = json_decode(curl_exec($curl));
curl_close($curl);

// Check if the reCAPTCHA token is valid
if ($response->riskAnalysis->score >= 0.5 && $response->event->tokenProperties->valid) {
  // Process the form data
  $name = $_POST['name'];
  $email = $_POST['email'];
  // ...
  echo 'Form submitted successfully!';
} else {
  echo 'reCAPTCHA verification failed.';
}
?>
