<?php
class Persona
{
    protected $conn;
    protected $table_name = "utente";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    function Login($email, $password)
    {
        $query = "SELECT id_utente 
        FROM $this->table_name 
        WHERE email = '$email' AND password = '$password'";

        $stmt = $this->conn->query($query);

        return $stmt;
    }

    function cambia_password($email, $password_vecchia, $password_nuova)
    {
        $query = "UPDATE $this->table_name 
                  SET password = '$password_nuova'
                  WHERE email = '$email' AND password = '$password_vecchia'";

        $stmt = $this->conn->query($query);
        return $stmt;
    }

    function Registrazione($password, $nome, $ruolo, $email)
    {
        $query = "INSERT INTO $this->table_name (password, nome, ruolo, email) VALUES ('$password', '$nome', '$ruolo', '$email')";

        $stmt = $this->conn->query($query);

        return $stmt;
    }
}
?>