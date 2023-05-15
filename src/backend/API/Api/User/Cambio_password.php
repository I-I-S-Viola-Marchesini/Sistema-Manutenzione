<?php
require("../../Common/connect.php");
require("../../Model/Persona.php");

header("Content-type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents("php://input"));

if (empty($data->email) || empty($data->$password_vecchia) || empty($data->$password_nuova)) {
    http_response_code(400);
    echo json_encode(["message" => "Fill every field"]);
    die();
}

$db = new Database();
$db_conn = $db->connect();
$user = new Persona($db_conn);

$hashed_password_old = hash('sha256', $data->password_vecchia, false);
$hashed_password_new = hash('sha256', $data->password_nuova, false);


$stmt = $user->cambia_password($data->email, $hashed_password_old, $hashed_password_new);

if ($stmt->rowCount() > 0) {
    http_response_code(200);
    echo json_encode(["message" => "Password changed"]);
} else {
    http_response_code(400);
    echo json_encode(["message" => "Password not changed"]);
}