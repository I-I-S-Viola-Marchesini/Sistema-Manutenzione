<?php
require("../../common/connect.php");
require("../../model/Persona.php");

header("Content-type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents("php://input"));

if (empty($data->email) || empty($data->password_vecchia) || empty($data->password_nuova)) {
    http_response_code(400);
    echo json_encode(["message" => "Fill every field"]);
    die();
}
else if (strlen($data->password_nuova) < 8) {
    http_response_code(400);
    echo json_encode(["message" => "Password too short"]);
    die();
}

$db = new Database();
$db_conn = $db->connect();
$user = new Persona($db_conn);

$stmt = $user->cambia_password($data->email, hash('sha256', $data->password_vecchia), hash('sha256', $data->password_nuova));
http_response_code(201);
echo json_encode(array("Update" => "Done"));
?>