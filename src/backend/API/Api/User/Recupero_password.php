<?php
require("../../Common/connect.php");
require("../../Model/Persona.php");
require("../../Model/Mailer.php");


//#####################################################################################
//            DA CAMBIARE!!! per ora manda solo un email di prova
//#####################################################################################


header("Content-type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents("php://input"));

if (empty($data->email) || empty($data->type) || empty($data->token)) {
    http_response_code(400);
    echo json_encode(["message" => "Fill every field"]);
    die();
}

// $curl = curl_init();

// curl_setopt_array(
//     $curl,
//     array(
//         CURLOPT_URL => 'https://hcaptcha.com/siteverify',
//         CURLOPT_RETURNTRANSFER => true,
//         CURLOPT_ENCODING => '',
//         CURLOPT_MAXREDIRS => 10,
//         CURLOPT_TIMEOUT => 0,
//         CURLOPT_FOLLOWLOCATION => true,
//         CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
//         CURLOPT_CUSTOMREQUEST => 'POST',
//         CURLOPT_POSTFIELDS => 'response=' . $data->token . '&secret=---',
//         CURLOPT_HTTPHEADER => array(
//             'Content-Type: application/x-www-form-urlencoded'
//         ),
//     )
// );

// $response = curl_exec($curl);

// curl_close($curl);
// $arr = json_decode($response);

// //echo $response;

// if ($arr->success) {
//     if ($arr->challenge_ts < time() - 60 * 3) { //check if captcha is expired (3 minutes)
//         http_response_code(401);
//         echo json_encode(["message" => "Captcha expired"]);
//         die();
//     }
//     sendEmail($data->email);
// } else {
//     http_response_code(401);
//     echo json_encode(["message" => "Wrong captcha"]);
//     die();
// }

sendEmail($data->email, $_SERVER['REMOTE_ADDR']);


function sendEmail($email, $ipAddress)
{
    $db = new Database();
    $db_conn = $db->connect();
    $user = new Persona($db_conn);
    $mailer = new Mail($db_conn);

    $mailer->sendEmail(
        'standard_base.html',
        'password_reset_template.html',
        'Recupero password (' . Date('d-m-Y H:i') . ')',
        $email,
        array('{ipAddress}', '{emailToReset}'),
        array($ipAddress, $email)
    );
}
