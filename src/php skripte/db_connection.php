<?php
$host = "localhost";
$database = "web_reviews_1";
$username = "root";
$password = "";


$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
