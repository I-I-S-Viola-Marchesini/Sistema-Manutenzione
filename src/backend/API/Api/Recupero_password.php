<?php
require("../Common/connect.php");
require("../Model/Persona.php");
require("../Model/Mailer.php");


//#####################################################################################
//            DA CAMBIARE!!! per ora manda solo un email di prova
//#####################################################################################


header("Content-type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents("php://input"));

if (empty($data->email)) {
    http_response_code(400);
    echo json_encode(["message" => "Fill every field"]);
    die();
}

$db = new Database();
$db_conn = $db->connect();
$user = new Persona($db_conn);
$mailer = new Mail($db_conn);

echo $mailer->sendEmail(
    'standard_base.html',
    'password_reset_template.html',
    'Recupero password',
    $data->email,
    array('{ipAddress}'),
    array('e')
);

?>