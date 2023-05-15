<?php
require("../Common/connect.php");
require("../Model/Persona.php");

header("Content-type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents("php://input"));

if (empty($data->email_user) || empty($data->password)) {
    http_response_code(400);
    echo json_encode(["message" => "Fill every field"]);
    die();
}

$db = new Database();
$db_conn = $db->connect();
$user = new Persona($db_conn);

$hashed_password = hash('sha256', $data->password, false);

if (strpos($data->email_user, "@") !== false) {
    $stmt = $user->login_email($data->email_user, $hashed_password);

    if ($stmt->num_rows > 0) {
        $row = $stmt->fetch_assoc();
        $user_arr = array(
            "id" => $row['id_utente']
        );
        http_response_code(200);
        echo json_encode($user_arr);
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Wrong email or password"]);
    }
} else if (strpos($data->email_user, "@") !== true) {
    $stmt = $user->login_username($data->email_user, $hashed_password);

    if ($stmt->num_rows > 0) {
        $row = $stmt->fetch_assoc();
        $user_arr = array(
            "id" => $row['id_utente']
        );
        http_response_code(200);
        echo json_encode($user_arr);
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Wrong username or password"]);
    }
}
