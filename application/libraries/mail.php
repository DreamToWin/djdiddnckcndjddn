<?php

defined('BASEPATH') OR exit('No direct script access allowed');

Class Mail {

    function sendmail($to, $subject, $textmail, $htmlmail = NULL, $attachment = NULL) {
        //Mail
        $transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, 'ssl')
                ->setUsername('phucpm.services@gmail.com')
                ->setPassword('phucpm095');
        //Create the Mailer using your created Transport
        $mailer = Swift_Mailer::newInstance($transport);
        //Create the message
        $message = Swift_Message::newInstance()
                //Give the message a subject
                ->setSubject($subject)
                //Set the From address with an associative array
                ->setFrom('123xem.vn@gmail.com')
                //Set the To addresses with an associative array
                ->setTo($to)
                //Give it a body
                ->setBody($textmail);
        if ($htmlmail != '') {
            //And optionally an alternative body
            $message->addPart($htmlmail, 'text/html');
        }
        if ($attachment != '') {
            //Optionally add any attachments
            $message->attach(
                    Swift_Attachment::fromPath($attachment)->setDisposition('inline')
            );
        }
        //Send the message
        $result = $mailer->send($message);
        return $result;
    }
}