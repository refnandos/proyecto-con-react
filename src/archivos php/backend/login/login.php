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

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(["error" => "Email y contraseña son obligatorios"]);
    exit;
}

// Buscar usuario en la BD (¡usa password_hash en producción!)
$sql = "SELECT id_usuario, nombre_usuario, password_hash FROM Usuarios WHERE correo_electronico = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(401);
    echo json_encode(["error" => "Credenciales inválidas en select"]);
    exit;
}

$usuario = $result->fetch_assoc();

//  usado para comprobar conexiones
// if ($password === "123456") { 

if (password_verify($password, $usuario['password_hash'])) { 

    echo json_encode([
        "mensaje" => "Login exitoso",
        "usuario" => [
            "id" => $usuario['id_usuario'],
            "nombre" => $usuario['nombre_usuario']
        ]
    ]);
} else {
    http_response_code(401);
    echo json_encode(["error" => "Credenciales inválidas"]);
}

$stmt->close();
$conn->close();
?>
