<?php
include("../conexion.php");

// Método POST: Guardar una partida
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $id_usuario = $data['id_usuario'];
    $id_juego = $data['id_juego'];
    $puntaje = $data['puntaje'];

    $sql = "INSERT INTO Partidas (id_usuario, id_juego, puntaje_partida) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iii", $id_usuario, $id_juego, $puntaje);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(["mensaje" => "Partida guardada"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Error al guardar la partida"]);
    }
    $stmt->close();
}

// Método GET: Obtener partidas de un usuario
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id_usuario = $_GET['id_usuario'];
    
    $sql = "SELECT J.nombre_juego, P.puntaje_partida, P.fecha_partida 
            FROM Partidas P
            JOIN Juegos J ON P.id_juego = J.id_juego
            WHERE P.id_usuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_usuario);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $partidas = [];
    while ($fila = $result->fetch_assoc()) {
        $partidas[] = $fila;
    }
    
    echo json_encode($partidas);
    $stmt->close();
}

$conn->close();
?>