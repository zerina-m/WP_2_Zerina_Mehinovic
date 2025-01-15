<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "web_reviews_1";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    $sql = "SELECT * FROM news";
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $sql .= " WHERE id = ?";
    }
    $stmt = $conn->prepare($sql);
    if (isset($id)) {
        $stmt->bind_param("i", $id);
    }
    $stmt->execute();
    $result = $stmt->get_result();
    
    $news = [];
    while ($row = $result->fetch_assoc()) {
        $news[] = $row;
    }

    echo json_encode($news);
}

elseif ($method == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (empty($data['title']) || empty($data['description'])) {
        echo json_encode(["success" => false, "message" => "Title and description are required"]);
        exit();
    }

    $title = $data['title'];
    $description = $data['description'];

    $published = date('Y-m-d H:i:s');

    $stmt = $conn->prepare("INSERT INTO news (title, description, published) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $title, $description, $published);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "News article added successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to add news article"]);
    }
}

$conn->close();
?>