<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include("../conexion.php");

try {
    $sql = "SELECT 
                u.nombre_usuario,
                j.nombre_juego,
                p.puntaje_partida,
                p.fecha_partida
            FROM Partidas p
            JOIN Usuarios u ON p.id_usuario = u.id_usuario
            JOIN Juegos j ON p.id_juego = j.id_juego
            ORDER BY p.fecha_partida DESC";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();

    $puntuaciones = [];
    while ($row = $result->fetch_assoc()) {
        $puntuaciones[] = $row;
    }

    echo json_encode($puntuaciones);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al obtener puntuaciones: " . $e->getMessage()]);
}

$conn->close();
?>