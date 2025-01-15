<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");

ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "web_reviews_1";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['user_id']) && !empty($data['type']) && !empty($data['review'])) {
    $user_id = $data['user_id'];
    $type = $data['type'];
    $review = $data['review'];

    $stmt = $conn->prepare("INSERT INTO reviews (user_id, type, review) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $user_id, $type, $review);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Review submitted successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to submit review"]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
}

$conn->close();
?>
