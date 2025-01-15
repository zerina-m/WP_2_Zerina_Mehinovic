<?php
require 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $table = $_POST['table'];
    $allowed_tables = ['books', 'games', 'movies', 'news'];

    if (in_array($table, $allowed_tables)) {
        $fields = $_POST['fields'];
        $columns = implode(', ', array_keys($fields));
        $placeholders = ':' . implode(', :', array_keys($fields));

        $stmt = $conn->prepare("INSERT INTO $table ($columns) VALUES ($placeholders)");
        
        foreach ($fields as $key => $value) {
            $stmt->bindValue(":$key", $value);
        }

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Record added successfully']);
        } else {
            echo json_encode(['error' => 'Failed to add record']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid table']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request']);
}
?>
