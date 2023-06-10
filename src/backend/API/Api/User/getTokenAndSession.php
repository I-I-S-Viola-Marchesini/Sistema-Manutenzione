<?php
require("../../Common/connect.php");
require("../../Model/Persona.php");

header("Content-type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents("php://input"));

if (empty($data->user_id) || empty($data->two_factor_code)) {
    http_response_code(400);
    echo json_encode(["message" => "Fill every field"]);
    die();
}

$db = new Database();
$db_conn = $db->connect();
$user = new Persona($db_conn);

$hashed_code = hash('sha256', $data->two_factor_code, false);

$stmt = $user->checkTwoFactorCode($data->user_id, $hashed_code);

if($stmt->num_rows > 0){
    $row = $stmt->fetch_assoc();
    $user_arr = array(
        "token" => $row['token'],
        "session" => $row['session']
    );

    $dataCreazione = $row['data_creazione']; //controlla se sono passati 5 minuti
    
    $tempoPassato = time() - strtotime($dataCreazione);

    if($tempoPassato > 300){
        http_response_code(401);
        echo json_encode(["message" => "Code expired"]);
        die();
    }

    http_response_code(200);
    echo json_encode($user_arr);
} else {
    http_response_code(401);
    echo json_encode(["message" => "Wrong code"]);
}