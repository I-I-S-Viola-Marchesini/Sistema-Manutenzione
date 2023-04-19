<?php
class Persona
{
    protected $conn;
    protected $table_impianto = "impianto";
    protected $table_controllo_molti = "controllo_controllo_specifico";
    protected $table_controllo_specifico = "controllo_specifico";
    protected $table_manutenzione_molti = "manutenzione_manutenzione_specifico";
    protected $table_manutenzione_specifico = "manutenzione_specifico";


    public function __construct($db)
    {
        $this->conn = $db;
    }

    function Inserimento($nome, $descrizione, $ditta_manutenzione, $modalita_manutenzione, $periodicita_manutenzione, $descrizione_modalita_manutenzione, $descrizione_controllo_manutenzione, $modalita_controllo, $periodicita_controllo, $descrizione_modalita_controllo, $descrizione_controllo_controllo)
    {
        $query = "INSERT INTO $this->table_impianto (nome, descrizione) VALUES ('$nome', '$descrizione')";
        $stmt = $this->conn->query($query);

        $query2 = "Select id_impianto from $this->table_impianto where id_impianto = (SELECT MAX(id_impianto) FROM $this->table_impianto)";
        $id_impianto = $this->conn->query($query2);


        return $stmt;
    }
}
?>