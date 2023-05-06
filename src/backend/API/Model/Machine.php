<?php
class Machine
{
    protected $conn;
    protected $table_machine = "impianto";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function create_machine($name, $description)
    {
        $query = "INSERT INTO $this->table_machine (nome, descrizione) VALUES ('$name', '$description')";

        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function get_machine($id_machine)
    {
        $query = "SELECT * FROM $this->table_machine WHERE id_impianto = '$id_machine'";

        $stmt = $this->conn->query($query);

        return $stmt;
    }
}
?>