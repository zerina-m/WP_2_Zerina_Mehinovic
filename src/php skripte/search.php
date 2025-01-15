<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

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

$searchTerm = isset($_GET['search']) ? $_GET['search'] : '';

if (empty($searchTerm)) {
    echo json_encode(["success" => false, "message" => "No search term provided"]);
    exit();
}

$sql = "
    (SELECT 'book' AS type, title, date, review FROM books WHERE title LIKE ? OR date LIKE ?)
    UNION
    (SELECT 'game' AS type, title, date, review FROM games WHERE title LIKE ? OR date LIKE ?)
    UNION
    (SELECT 'movie' AS type, title, date, review FROM movies WHERE title LIKE ? OR date LIKE ?)
    UNION
    (SELECT 'news' AS type, title, description, review FROM news WHERE title LIKE ? OR description LIKE ?)
";

$stmt = $conn->prepare($sql);
$searchTermWithWildcard = "%" . $searchTerm . "%";
$stmt->bind_param("ssssssss", $searchTermWithWildcard, $searchTermWithWildcard, $searchTermWithWildcard, $searchTermWithWildcard, $searchTermWithWildcard, $searchTermWithWildcard, $searchTermWithWildcard);

$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);

$stmt->close();
$conn->close();
?>