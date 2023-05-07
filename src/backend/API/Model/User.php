<?php
class User
{
    protected $conn;
    protected $table_user = "utente";
    protected $table_role = "ruolo";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function create_user($name, $username, $email, $password, $id_role)
    {
        $query = "INSERT INTO $this->table_user (nome, username, email, password, id_ruolo) 
        VALUES ('$name', '$username', '$email', '$password', '$id_role')";

        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function get_user($id_user)
    {
        $query = "SELECT * FROM $this->table_user WHERE id_utente = '$id_user'";

        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function get_user_by_email($email)
    {
        $query = "SELECT * FROM $this->table_user WHERE email = '$email'";

        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function create_role($name, $description)
    {
        $query = "INSERT INTO $this->table_role (nome, descrizione) 
        VALUES ('$name', '$description')";

        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function get_role($user_id)
    {
        $query = "SELECT $this->table_role.id_ruolo 
        FROM $this->table_user 
        INNER JOIN $this->table_role ON $this->table_user.ruolo = $this->table_role.id_ruolo 
        WHERE id_utente = '$user_id'";

        $stmt = $this->conn->query($query);

        return $stmt;
    }
}
