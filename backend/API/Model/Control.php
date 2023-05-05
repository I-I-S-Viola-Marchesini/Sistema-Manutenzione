<?php
class Persona
{
    protected $conn;
    protected $table_machine = "impianto";
    protected $table_control_control_specific = "controllo_controllo_specifico";
    protected $table_control_specific = "controllo_specifico";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function insert_control($description, $description_modality, $description_controll, $peridicity, $id_machine) //id_machine è l'id dell'impianto, si può passare attraverso una lista che visualizza tutti i macchinari
    {
        $query = "INSERT INTO $this->table_control_specific (periodicità, descrizione_modalita, descrizione_controllo) VALUES ('$peridicity', '$description_modality', '$description_controll')";

        $stmt = $this->conn->query($query);

        $id_control = mysqli_insert_id($this->conn);

        $query = "INSERT INTO $this->table_control_control_specific (id_controllo_specifico, descrizione) VALUES ('$id_control', '$description')";
        $stmt = $this->conn->query($query);

        $id_control = mysqli_insert_id($this->conn);

        $query = "UPDATE $this->table_machine SET id_controllo = '$id_control' WHERE id_impianto = '$id_machine'";

        return $stmt;
    }

    public function get_control($id_machine)
    {
        $query = "SELECT $this->table_control_control_specific.descrizione, $this->table_control_specific.descrizione_modalita, $this->table_control_specific.descrizione_controllo, $this->table_control_specific.periodicità 
        FROM $this->table_machine 
        INNER JOIN $this->table_control_control_specific ON $this->table_machine.id_controllo = $this->table_control_control_specific.id_controllo 
        INNER JOIN $this->table_control_specific ON $this->table_control_control_specific.id_controllo_specifico = $this->table_control_specific.id_controllo
        WHERE $this->table_machine.id_impianto = '$id_machine'";

        $stmt = $this->conn->query($query);

        return $stmt;
    }
}
?>