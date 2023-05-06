<?php
class Manutention
{
    protected $conn;
    protected $table_machine = "impianto";
    protected $table_manutention_manutention_specific = "manutenzione_manutenzione_specifico";
    protected $table_manutention_specific = "manutenzione_specifico";
    protected $table_manutention_external = "manutenzione_esterno";
    protected $table_ticket = "ticket_manutenzione";
    protected $table_user = "utente";


    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function insert_manutention($description, $description_modality, $description_manutention, $peridicity, $id_machine) //id_machine è l'id dell'impianto, si può passare attraverso una lista che visualizza tutti i macchinari
    {
        $query = "INSERT INTO $this->table_manutention_specific (periodicità, descrizione_modalita, descrizione_manutenzione) VALUES ('$peridicity', '$description_modality', '$description_manutention')";

        $stmt = $this->conn->query($query);

        $id_manutention = mysqli_insert_id($this->conn);

        $query = "INSERT INTO $this->table_manutention_manutention_specific (id_manutenzione_specifico, descrizione) VALUES ('$id_manutention', '$description')";
        $stmt = $this->conn->query($query);

        $id_manutention = mysqli_insert_id($this->conn);

        $query = "UPDATE $this->table_machine SET id_manutenzione = '$id_manutention' WHERE id_impianto = '$id_machine'";

        return $stmt;
    }

    public function get_manutention($id_machine)
    {
        $query = "SELECT $this->table_manutention_manutention_specific.descrizione, $this->table_manutention_specific.descrizione_modalita, $this->table_manutention_specific.manutenzione_controllo, $this->table_manutention_specific.periodicità 
        FROM $this->table_machine 
        INNER JOIN $this->table_manutention_manutention_specific ON $this->table_machine.id_manutenzione = $this->table_manutention_manutention_specific.id_manutenzione
        INNER JOIN $this->table_manutention_specific ON $this->table_manutention_manutention_specific.id_manutenzione_specifico = $this->table_manutention_specific.id_manutenzione
        WHERE $this->table_machine.id_impianto = '$id_machine'";

        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function get_id_manutention($id_machine)
    {
        $query = "SELECT $this->table_machine.id_manutenzione 
        FROM $this->table_manutention_manutention_specific
        INNER JOIN $this->table_machine ON $this->table_manutention_manutention_specific.id_manutenzione = $this->table_machine.id_manutenzione
        WHERE $this->table_machine.id_impianto = '$id_machine'";

        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function registrate_manutention($date, $id_manutention, $result_manutention, $irregolarites, $manutentor, $sign_id)
    {
        $query = "INSERT INTO $this->table_manutention_external (data, id_tipo_manutenzione, esito_manutenzione, irregolarita_riscontrate, id_controllore, firma) 
        VALUES ('$date', '$id_manutention', '$result_manutention', '$irregolarites', '$manutentor', '$sign_id')";

        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function get_manutention_extern()
    {
        $query = "SELECT $this->table_manutention_external.data, $this->table_manutention_manutention_specific.descrizione, $this->table_manutention_external.esito_manutenzione, $this->table_manutention_external.irregolarita_riscontrate, $this->table_user.nome, $this->table_manutention_external.firma 
        FROM $this->table_manutention_external
        LEFT JOIN $this->table_user ON $this->table_manutention_external.id_controllore = $this->table_user.id_utente
        LEFT JOIN $this->table_manutention_manutention_specific ON $this->table_manutention_external.id_tipo_manutenzione = $this->table_manutention_manutention_specific.id_manutenzione";

        $stmt = $this->conn->query($query);

        return $stmt;
    }
}
?>