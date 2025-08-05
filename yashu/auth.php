<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $action = $data['action'];

    if ($action === 'signup') {
        $username = $data['username'];
        $password = password_hash($data['password'], PASSWORD_DEFAULT);
        $email = $data['email'];

        try {
            $stmt = $conn->prepare("INSERT INTO users_auth (username, password, email) VALUES (?, ?, ?)");
            $stmt->execute([$username, $password, $email]);
            echo json_encode(['status' => 'success', 'message' => 'Registration successful']);
        } catch(PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Registration failed: ' . $e->getMessage()]);
        }
    }
    else if ($action === 'login') {
        $username = $data['username'];
        $password = $data['password'];

        try {
            $stmt = $conn->prepare("SELECT * FROM users_auth WHERE username = ?");
            $stmt->execute([$username]);
            $user = $stmt->fetch();

            if ($user && password_verify($password, $user['password'])) {
                echo json_encode(['status' => 'success', 'message' => 'Login successful']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Invalid username or password']);
            }
        } catch(PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Login failed: ' . $e->getMessage()]);
        }
    }
}
?>