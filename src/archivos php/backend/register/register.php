<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

$nombre_usuario = $data['nombre_usuario'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

// Validaciones datos de usuario recibido por componente register
if (empty($nombre_usuario) || empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(["error" => "Todos los campos son obligatorios"]);
    exit;
}

// Validar email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Formato de email inválido"]);
    exit;
}

// Verificar si el email ya existe
$sql = "SELECT id_usuario FROM Usuarios WHERE correo_electronico = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    http_response_code(409);
    echo json_encode(["error" => "El email ya está registrado"]);
    exit;
}

if (strlen($password) < 8) {
    http_response_code(400);
    echo json_encode(["error" => "La contraseña debe tener al menos 8 caracteres"]);
    exit;
}

// hash de la contraseña
$password_hash = password_hash($password, PASSWORD_DEFAULT);

// insertar nuevo usuarioo
$sql = "INSERT INTO Usuarios (nombre_usuario, correo_electronico, password_hash) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $nombre_usuario, $email, $password_hash);

if ($stmt->execute()) {
    http_response_code(201);
    echo json_encode(["mensaje" => "Usuario registrado exitosamente"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Error al registrar el usuario"]);
}

$stmt->close();
$conn->close();
?>