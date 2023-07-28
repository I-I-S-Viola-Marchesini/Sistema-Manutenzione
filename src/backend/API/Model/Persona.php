<?php
class Persona
{
    protected $conn;
    protected $table_user = "utente";
    protected $table_token = "token";
    protected $table_session = "session";
    protected $table_2fa = "2fa";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    function get_user_data($user_id){
        $query = "SELECT nome, username, email, immagine_profilo, stile_immagine_profilo
        FROM $this->table_user
        INNER JOIN $this->table_token ON $this->table_user.id_utente = $this->table_token.id_utente
        WHERE $this->table_user.id_utente = '$user_id'";

        $stmt = $this->conn->query($query);

        return $stmt;
    }

    function login_email($email, $password)
    {
        $query = "SELECT id_utente, email
        FROM $this->table_user
        WHERE email = '$email' AND password = '$password'";

        $stmt = $this->conn->query($query);

        return $stmt;
    }

    function login_username($username, $password)
    {
        $query = "SELECT id_utente, email
        FROM $this->table_user 
        WHERE username = '$username' AND password = '$password'";

        $stmt = $this->conn->query($query);

        return $stmt;
    }

    function login_token($token, $user_id,  $hashed_password){
        $query = "SELECT $this->table_user.id_utente, token, data_creazione, data_ultima_attivita
        FROM $this->table_user
        INNER JOIN $this->table_token ON $this->table_user.id_utente = $this->table_token.id_utente
        WHERE $this->table_user.id_utente = '$user_id' AND password = '$hashed_password' AND token = '$token'";

        $stmt = $this->conn->query($query);

        return $stmt;
    }

    function createTokenAndSession($userId){

            //genera token
            $token = hash('sha256', random_bytes(64), false);

            //genera session
            $session = hash('sha256', random_bytes(64), false);

            //inserisci token e session nel db
            $tokenQuery = "INSERT INTO $this->table_token (token, id_utente, data_creazione, data_ultima_attivita) VALUES ('$token', '$userId', NOW(), NOW())";
            $this->conn->query($tokenQuery);

            $tokenIdQuery = "SELECT id_token
            FROM $this->table_token
            WHERE token = '$token'";
            $tokenIdStmt = $this->conn->query($tokenIdQuery);

            if($tokenIdStmt->num_rows > 0)
            {
                $row = $tokenIdStmt->fetch_assoc();
                $tokenId = $row["id_token"];

                $sessionQuery = "INSERT INTO $this->table_session (`session`, id_token, data_creazione) VALUES ('$session', $tokenId, NOW())";
                $this->conn->query($sessionQuery);

                $sessionIdQuery = "SELECT id_session
                FROM $this->table_session
                WHERE session = '$session'";
                $sessionIdStmt = $this->conn->query($sessionIdQuery);

                if($sessionIdStmt->num_rows > 0){
                    
                    srand((double) microtime() * 1000000);
                    $twoFactorCode = rand(100000, 999999);
                    $twoFactorId = hash('sha256', $twoFactorCode, false);

                    $query2fa = "INSERT INTO $this->table_2fa (user_id, `secret`, token, `session`, data_creazione) VALUES ('$userId', '$twoFactorId', '$token', '$session', NOW())";
                    $this->conn->query($query2fa);

                    return $twoFactorCode;

                }else{
                    return false;
                }
            }
    }


    function checkTwoFactorCode($userId, $hashed_code){
        $query = "SELECT token, `session`, data_creazione
        FROM $this->table_2fa
        WHERE user_id = '$userId' AND `secret` = '$hashed_code'";

        $stmt = $this->conn->query($query);

        return $stmt;
    }

    function cambia_password($email, $password_vecchia, $password_nuova)
    {
        $query = "UPDATE $this->table_user 
                  SET password = '$password_nuova'
                  WHERE email = '$email' AND password = '$password_vecchia'";

        $stmt = $this->conn->query($query);
        return $stmt;
    }

    function Registrazione($password, $nome, $ruolo, $email)
    {
        $query = "INSERT INTO $this->table_user (password, nome, ruolo, email) VALUES ('$password', '$nome', '$ruolo', '$email')";

        $stmt = $this->conn->query($query);

        return $stmt;
    }
}
