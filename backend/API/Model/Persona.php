<?php
class Persona
{
    protected $conn;
    protected $table_name = "utente";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    function Login($user, $password)
    {
        $query = "SELECT id_utente 
        FROM $this->table_name 
        WHERE username = '$user' AND password = '$password'";

        $stmt = $this->conn->query($query);        

        return $stmt;
    }

    function cambia_password($user, $password_vecchia, $password_nuova)
    {
        $query = "SELECT * FROM $this->table_name WHERE username = '$user' AND password = '$password_vecchia'";

        $stmt = $this->conn->query($query);

        if ($stmt->num_rows > 0) {
            $query = "UPDATE $this->table_name SET password = '$password_nuova' WHERE username = '$user'";
            $stmt = $this->conn->query($query);
            return $stmt;
        } else {
            return false;
        }
    }

    function Registrazione($user, $password, $nome, $ruolo, $email)
    {
        $query = "INSERT INTO $this->table_name (username, password, nome, ruolo, email) VALUES ('$user', '$password', '$nome', '$ruolo', '$email')";

        $stmt = $this->conn->query($query);

        return $stmt;
    }
}
?>