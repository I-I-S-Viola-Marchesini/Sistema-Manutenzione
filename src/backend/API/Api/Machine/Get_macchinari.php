<?php
require("../../Common/connect.php");
require("../../Model/Machine.php");

header("Content-type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents("php://input"));

if (empty($data->id_machine)) {
    http_response_code(400);
    echo json_encode(["message" => "Fill every field"]);
    die();
}

$db = new Database();
$db_conn = $db->connect();
$machine = new Machine($db_conn);

$stmt = $machine->get_machine($data->id_machine);

if ($stmt) {
    http_response_code(200);
    echo json_encode($stmt->fetch_assoc());
    die();
} else {
    http_response_code(503);
    echo json_encode(["message" => "Unable to find machine"]);
    die();
}