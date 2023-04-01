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
        $query = "SELECT * FROM $this->table_name WHERE email = '$email' AND password = '$password_vecchia'";

        $stmt = $this->conn->query($query);

        if ($stmt->num_rows > 0) {
            $query = "UPDATE $this->table_name SET password = '$password_nuova' WHERE email = '$email'";
            $stmt = $this->conn->query($query);
            return $stmt;
        } else {
            return false;
        }
    }

    function Registrazione($id, $password, $nome, $ruolo, $email)
    {
        $query = "INSERT INTO $this->table_name (id_utente, password, nome, ruolo, email) VALUES ('$id', '$password', '$nome', '$ruolo', '$email')";

        $stmt = $this->conn->query($query);

        return $stmt;
    }
}
?>