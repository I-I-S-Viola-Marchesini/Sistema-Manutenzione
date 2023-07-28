<?php
require("../../Common/connect.php");
require("../../Model/Persona.php");

header("Content-type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents("php://input"));

if (empty($data->user_id)) {
    http_response_code(400);
    echo json_encode(["message" => "Fill every field"]);
    die();
}

$db = new Database();
$db_conn = $db->connect();
$user = new Persona($db_conn);

$stmt = $user->get_user_data($data->user_id);

if ($stmt->num_rows > 0) {
    $row = $stmt->fetch_assoc();
    $nome = $row['nome'];
    $username = $row['username'];
    $email = $row['email'];
    $immagine_profilo = $row['immagine_profilo'];
    $stile_immagine_profilo = $row['stile_immagine_profilo'];

    $user_pictures_dir = "../../../../images/uploads";
    $image_path;
    if(file_exists("$user_pictures_dir/$immagine_profilo") && !empty($immagine_profilo) && $immagine_profilo != null){
        $image_path = "uploads/" . $immagine_profilo;
    } else {
        $image_path = "propic-placeholder.jpg";
    }

    $propic_style;
    if($stile_immagine_profilo == 0){
        $propic_style = "text_avatar";
    } else {
        $propic_style = "custom_avatar";
    }

    $user_arr = array(
        "user_id" => $data->user_id,
        "nome" => $nome,
        "username" => $username,
        "email" => $email,
        "immagine_profilo" => $image_path,
        "stile_immagine_profilo" => $propic_style
    );

    http_response_code(200);
    echo json_encode($user_arr);
} else {
    http_response_code(401);
    echo json_encode(["message" => "No user found with this id"]);
}