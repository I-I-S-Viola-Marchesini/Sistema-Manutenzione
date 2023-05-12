<?php
require("../Common/connect.php");
require("../Model/Machine.php");

header("Content-type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents("php://input"));

if (empty($data->name) || empty($data->description)) {
    http_response_code(400);
    echo json_encode(["message" => "Fill every field"]);
    die();
}

$db = new Database();
$db_conn = $db->connect();
$machine = new Machine($db_conn);

$stmt = $machine->create_machine($data->name, $data->description);

if ($stmt) {
    http_response_code(201);
    echo json_encode(["message" => "Machine created"]);
    die();
} else {
    http_response_code(503);
    echo json_encode(["message" => "Unable to create machine"]);
    die();
}