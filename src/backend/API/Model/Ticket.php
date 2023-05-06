<?php
class Ticket
{
    protected $conn;
    protected $table_ticket = "ticket_manutenzione";
    protected $table_user = "utente";


    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function create_ticket($id_manutention) //il default è che tutte le voci devono essere a 0
    {
        $query = "INSERT INTO $this->table_ticket (id_manutenzione) 
        VALUES ('$id_manutention')";

        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function get_ticket($id_manutention)
    {
        $query = "SELECT * FROM $this->table_ticket 
        WHERE id_manutenzione = '$id_manutention'";

        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function sended_ticket($id_ticket) //modificare il db per far si che ci sia uno storico dei ticket inviati
    {
        $query = "UPDATE $this->table_ticket 
        SET inviato = '1'
        WHERE id_ticket = '$id_ticket'";

        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function saw_ticket($id_ticket) //modificare il db per far si che ci sia uno storico dei ticket visti
    {
        $query = "UPDATE $this->table_ticket 
        SET visto = '1'
        WHERE id_ticket = '$id_ticket'";

        $stmt = $this->conn->query($query);

        return $stmt;
    }

    public function resolved_ticket($id_ticket, $adoted_provediments) //modificare il db per far si che ci sia uno storico dei ticket risolti
    {
        $query = "UPDATE $this->table_ticket 
        SET risolto = '1', provvedimenti_adottati = '$adoted_provediments'
        WHERE id_ticket = '$id_ticket'";

        $stmt = $this->conn->query($query);
        
        return $stmt;
    }
}
?>