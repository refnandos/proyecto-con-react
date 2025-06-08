<?php
// backend/api/usuarios.php
header("Access-Control-Allow-Origin: *"); // Para permitir peticiones desde React
header("Content-Type: application/json");

// Conexión a la base de datos
$conn = new mysqli("localhost", "root", "", "mi_base_de_datos");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Fallo de conexión"]);
    exit;
}

// Consulta
$sql = "SELECT id, nombre, email FROM usuarios";
$result = $conn->query($sql);

// Respuesta
$usuarios = [];
while ($fila = $result->fetch_assoc()) {
    $usuarios[] = $fila;
}

echo json_encode($usuarios);
$conn->close();