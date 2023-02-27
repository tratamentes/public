<?php


// Load configuration
require_once('../../config.php');

session_start();
echo  ('Post: '. $_POST['token'] .' Session: ' . $_SESSION['token']);
// Check if form has been submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

  // Check if token is valid
  if (!isset($_POST['token']) || $_POST['token'] !== $_SESSION['token']) {
    die('Invalid token: ' . $_POST['token'] .' Session: ' . $_SESSION['token']);
  }

  // Process form submission
  // ...

// Generate token and store in session
$_SESSION['token'] = bin2hex(random_bytes(32));

    // Get form data
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
    // Get user's IP address
    $ip = $_SERVER['REMOTE_ADDR'];
    // Get current time
    date_default_timezone_set('UTC');
    $time = date('Y-m-d H:i:s');
    // Airtable API parameters
    $api_key = AIRTABLE_API_KEY;
    $base_id = AIRTABLE_BASE_ID;
    $table_name = AIRTABLE_TABLE_NAME;
    $api_endpoint = "https://api.airtable.com/v0/$base_id/$table_name";
    $headers = array(
        'Content-Type: application/json',
        'Authorization: Bearer ' . $api_key
    );
    // Airtable record data
    $data = array(
        'fields' => array(
            'Name' => $name,
            'Email' => $email,
            'Phone' => $phone,
            'Subject' => $subject,
            'Message' => $message,
            'IP Address' => $ip,
            'Time' => $time
        )
    );
    $data_json = json_encode($data);
    // Send data to Airtable API
    $ch = curl_init($api_endpoint);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $response = curl_exec($ch);
    $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    // Check for errors
    if ($http_status !== 200) {
        die('Error sending data to Airtable API');
    }
    // Redirect to thank-you page
    header('Location: ../contact/thank-you.html');
    exit;
}
?>
