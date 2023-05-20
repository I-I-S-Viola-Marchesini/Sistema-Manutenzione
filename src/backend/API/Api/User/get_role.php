<?php
require("../../Common/connect.php");
require("../../Model/Machine.php");

header("Content-type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents("php://input"));

$db = new Database();
$db_conn = $db->connect();
$user = new User($db_conn);

$stmt = $user->get_role();

if ($stmt) {
    $roles = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $role = array(
            "id" => $id_ruolo,
            "name" => $nome,
        );
        array_push($roles, $role);
    }
    http_response_code(200);
    echo json_encode($roles);
    die();
} else {
    http_response_code(503);
    echo json_encode(["message" => "Unable to get roles"]);
    die();
}