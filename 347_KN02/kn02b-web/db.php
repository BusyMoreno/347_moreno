<?php
$host = "kn02b-db";
$user = "root";
$password = "rootpass";
$database = "m346";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>