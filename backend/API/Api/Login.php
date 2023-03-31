<?php
    require("../../Common/connect.php");
    require("../../Model/Persona.php");

    header("Content-type: application/json; charset=UTF-8");
    header('Access-Control-Allow-Origin: *');

    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->user) || empty($data->password)) {
        http_response_code(400);
        echo json_encode(["message" => "Fill every field"]);
        die();
    }

    $db = new Database();
    $db_conn = $db->connect();
    $user = new Persona($db_conn);

    $result = $user->Login($data->user, $data->password);

    if ($result != false) {
        http_response_code(200);
        echo json_encode(["response" => true, "id_utente" => $result]);
    } else {
        http_response_code(401);
        echo json_encode(["response" => false]);
    }
    die();
?>