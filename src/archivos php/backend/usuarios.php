


<?php
// backend/api/usuarios.php
header("Access-Control-Allow-Origin: *"); // Para permitir peticiones desde React
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include("./conexion.php");

// Conexión a la base de datos
// $conn = new mysqli("sql100.byethost31.com", "b31_39171309", "FernandoS1", "b31_39171309_Proyecto_react");
// if ($conn->connect_error) {
//     die("conexion fallida: " . $conn->connect_error);
// }

// Consulta
$sql = "SELECT id_usuario, nombre_usuario, correo_electronico FROM usuarios";
$result = $conn->query($sql);

// Respuesta
$usuarios = [];
while ($fila = $result->fetch_assoc()) {
    $usuarios[] = $fila;
}

echo json_encode($usuarios);
$conn->close();