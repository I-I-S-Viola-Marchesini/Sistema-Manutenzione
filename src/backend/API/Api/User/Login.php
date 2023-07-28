<?php
require("../../Common/connect.php");
require("../../Model/Persona.php");
require("../../Model/Mailer.php");

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
$mailer = new Mail($db_conn);

$hashed_password = hash('sha256', $data->password, false);

if (empty($data->token) || empty($data->id_user)) {
    firstLogin($data, $user, $mailer, $hashed_password);
} else {
    fastLogin($data, $user, $hashed_password);
}

//  id + password = verifica in due passaggi necessaria
function firstLogin($data, $user, $mailer, $hashed_password)
{
    if (strpos($data->email_user, "@") !== false) {
        $stmt = $user->login_email($data->email_user, $hashed_password);

        if ($stmt->num_rows > 0) {
            $row = $stmt->fetch_assoc();
            $userId = $row['id_utente'];
            $email = $row['email'];

            $TFACode = $user->createTokenAndSession($userId);

            sendEmail($mailer, $email, $TFACode);

            $user_arr = array(
                "firstLogin" => "true",
                "method" => "email",
                "userId" => $userId,
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
            $userId = $row['id_utente'];
            $email = $row['email'];

            $TFACode = $user->createTokenAndSession($userId);

            sendEmail($mailer, $email, $TFACode);

            $user_arr = array(
                "firstLogin" => "true",
                "method" => "username",
                "userId" => $userId,
            );
            http_response_code(200);
            echo json_encode($user_arr);
        } else {
            http_response_code(401);
            echo json_encode(["message" => "Wrong username or password"]);
        }
    }
}

//  token + id + password = login diretto
function fastLogin($data, $user, $hashed_password)
{
    $stmt = $user->login_token($data->token, $data->user_id,  $hashed_password);

    if ($stmt->num_rows > 0) {
        $row = $stmt->fetch_assoc();

        $dataCreazione = $row['data_creazione']; //controlla se sono passati 7 giorni
        $dataUltimaAttivita = $row['data_ultima_attivita']; //controlla se sono passati 30 minuti

        if(isOlderThan($dataUltimaAttivita, 1800)){
            http_response_code(401);
            echo json_encode(["message" => "Token expired"]);
            die();
        }

        if(isOlderThan($dataCreazione, 604800)){
            http_response_code(401);
            echo json_encode(["message" => "Token expired"]);
            die();
        }

        $user_arr = array(
            "userId" => $row['id_utente'],
            "session" => $row['session']
        );
        http_response_code(200);
        echo json_encode($user_arr);
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Wrong token or password"]);
    }
}

function sendEmail($mailer, $email, $codice)
{
    $mailer->sendEmail(
        'standard_base.html',
        '2fa_template.html',
        'Conferma di voler accedere (' . Date('d-m-Y H:i') . ')',
        $email,
        array('{nomePC}', '{codice}'),
        array('', $codice)
    );
}

function isOlderThan($date, $time){
    $tempoPassato = time() - strtotime($date);
    if($tempoPassato > $time){
        return true;
    }

    return false;
}