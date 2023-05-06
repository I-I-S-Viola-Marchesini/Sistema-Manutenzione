<?php
require("../../common/connect.php");
require("../../model/Persona.php");

header("Content-type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents("php://input"));

if (empty($data->password) || empty($data->nome) || empty($data->ruolo) || empty($data->email)) {
    http_response_code(400);
    echo json_encode(["message" => "Fill every field"]);
    die();
}
else if (strlen($data->password) < 8) {
    http_response_code(400);
    echo json_encode(["message" => "Password too short"]);
    die();
}

$db = new Database();
$db_conn = $db->connect();
$user = new Persona($db_conn);

$stmt = $user->Registrazione( hash('sha256', $data->password), $data->$nome, $data->$ruolo, $data->$email);
http_response_code(201);
echo json_encode(array("Registration" => "Done"));
?>