<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include("../conexion.php");

// Obtener los datos del JSON recibido
$data = json_decode(file_get_contents("php://input"), true);

// Validar que todos los campos necesarios estén presentes
$required_fields = ['id_usuario', 'id_juego', 'puntaje_partida'];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(["error" => "El campo $field es obligatorio"]);
        exit;
    }
}

// Validar que el usuario y el juego existan
$id_usuario = $data['id_usuario'];
$id_juego = $data['id_juego'];

try {
    // Verificar usuario
    $stmt = $conn->prepare("SELECT id_usuario FROM Usuarios WHERE id_usuario = ?");
    $stmt->bind_param("i", $id_usuario);
    $stmt->execute();
    if ($stmt->get_result()->num_rows === 0) {
        http_response_code(404);
        echo json_encode(["error" => "Usuario no encontrado"]);
        exit;
    }

    // Verificar juego
    $stmt = $conn->prepare("SELECT id_juego FROM Juegos WHERE id_juego = ?");
    $stmt->bind_param("i", $id_juego);
    $stmt->execute();
    if ($stmt->get_result()->num_rows === 0) {
        http_response_code(404);
        echo json_encode(["error" => "Juego no encontrado"]);
        exit;
    }

    // Iniciar transacción para asegurar la integridad de los datos
    $conn->begin_transaction();

    // Insertar en la tabla Partidas
    $insert = $conn->prepare("INSERT INTO Partidas (id_usuario, id_juego, puntaje_partida) VALUES (?, ?, ?)");
    $insert->bind_param("iii", $data['id_usuario'], $data['id_juego'], $data['puntaje_partida']);
    if (!$insert->execute()) {
        throw new Exception("Error al insertar partida: " . $insert->error);
    }


     $id_partida = $conn->insert_id;

    // Historial (descomentado y corregido)
    $stmt = $conn->prepare("
        INSERT INTO Historial_Jugador (id_usuario, id_juego, total_partidas_jugadas, puntaje_maximo)
        VALUES (?, ?, 1, ?)
        ON DUPLICATE KEY UPDATE
        total_partidas_jugadas = total_partidas_jugadas + 1,
        puntaje_maximo = GREATEST(puntaje_maximo, ?)
    ");
    $stmt->bind_param("iiii", $id_usuario, $id_juego, $data['puntaje_partida'], $data['puntaje_partida']);
    $stmt->execute();

    $conn->commit();

    http_response_code(201);
    echo json_encode([
        "mensaje" => "Partida registrada exitosamente",
        "id_partida" => $id_partida
    ]);

} catch (Exception $e) {
    $conn->rollback();
    http_response_code(500);
    echo json_encode([
        "error" => "Error al registrar la partida",
        "detalles" => $e->getMessage(),
        "sql_error" => $conn->error // Agrega información específica del error SQL
    ]);
}

$conn->close();
?>