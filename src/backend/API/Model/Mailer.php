<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../../../vendor/phpmailer/phpmailer/src/Exception.php';
require_once __DIR__ . '/../../../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require_once __DIR__ . '/../../../vendor/phpmailer/phpmailer/src/SMTP.php';
require_once __DIR__ . '/../Common/connect.php';

class Mail
{
    protected $mail;
    protected $smtp_data;
    protected $email_files_path = __DIR__ . '/../../emails/';

    public function __construct($db)
    {

        $this->mail = new PHPMailer(true); //se true vengono sollevate eventuali eccezioni utili per il debugging

        $query = "SELECT host, porta, email, nome_account, `password`
        FROM dati_smtp 
        WHERE id_dati_smtp = 1;";
        
        $stmt = $db->query($query);
        $row = $stmt->fetch_assoc();
        $this->smtp_data = array(
            "host" => $row['host'],
            "porta" => $row['porta'],
            "email" => $row['email'],
            "nome_account" => $row['nome_account'],
            "password" => $row['password']
        );
    }

    function getAndReplace($file, $search, $replace)
    {   
        $contents = file_get_contents($this->email_files_path . $file);
        for ($i = 0; $i < count($search); $i++) {
            $contents = str_replace($search[$i], $replace[$i], $contents);
        }
        return $contents;
    }

    function standardBase($address, $htmlTemplate)
    {
        $search = array(
            '{address}',
            '{emailBody}',
        );
        $replace = array(
            $address,
            $htmlTemplate,
        );
        $htmlBody = $this->getAndReplace('base/standard_base.html', $search, $replace);
        return $htmlBody;
    }

    public function sendEmail($base, $template, $subject, $address, $search, $replace){

        $htmlTemplate = $this->getAndReplace('template/' . $template, $search, $replace);

        switch ($base) {
            // case 'standard':
            //     $htmlBody = $this->standardBase($address, $htmlTemplate);
            //     break;
            default:
                $htmlBody = $this->standardBase($address, $htmlTemplate);
                break;
        }

        try {
            //Impostazioni server
            $this->mail->SMTPDebug = SMTP::DEBUG_SERVER;                                       //Debug mode
            $this->mail->isSMTP();                                                             //Invio tramite SMTP
            $this->mail->CharSet    = 'UTF-8';                                                 //Setta la codifica dei caratteri
            $this->mail->SMTPDebug  = 0;                                                       //Livello di debug
            $this->mail->Mailer     = 'smtp';                                                  //Tipo di mailer
            $this->mail->Host       = 'ssl://' . $this->smtp_data['host'];                     //Host SMTP
            $this->mail->SMTPAuth   = true;                                                    //Abilita autenticazione SMTP
            $this->mail->Username   = $this->smtp_data['email'];                               //SMTP username
            $this->mail->Password   = $this->smtp_data['password'];                            //SMTP password
            //$this->mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;                        //Abilita TLS implicito
            $this->mail->Port       = $this->smtp_data['porta'];                               //Porta SMTP
            //Recipients
            $this->mail->setFrom($this->smtp_data['email'], $this->smtp_data['nome_account']); //Indirizzo mittente
            $this->mail->addAddress($address);                                                 //Indirizzo destinatario
            //Content
            $this->mail->isHTML(true);                                                         //Abilita invio in HTML
            $this->mail->Subject = $subject;                                                   //Oggetto email
            $this->mail->msgHTML($htmlBody, __DIR__);                                          //Corpo email
        
            $this->mail->send();                                                               //Invia email
            return array("message" => "Email sent successfully");
        } catch (Exception $e) {
            return array("message" => "Email could not be sent.",
            "error" => "Mailer Error: {$this->mail->ErrorInfo}");
        }
    }
}
