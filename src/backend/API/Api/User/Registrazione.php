<?php
require("../../Common/connect.php");
require("../../Model/User.php");

header("Content-type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents("php://input"));

if (empty($data->name) || empty($data->username) || empty($data->email) || empty($data->password) || empty($data->id_role)) {
    http_response_code(400);
    echo json_encode(["message" => "Fill every field"]);
    die();
}

$db = new Database();
$db_conn = $db->connect();
$user = new User($db_conn);

$stmt = $user->create_user($data->name, $data->username, $data->email, $data->password, $data->id_role);

if ($stmt) {
    http_response_code(201);
    echo json_encode(["message" => "User created"]);
    die();
} else {
    http_response_code(503);
    echo json_encode(["message" => "Unable to create user"]);
    die();
}