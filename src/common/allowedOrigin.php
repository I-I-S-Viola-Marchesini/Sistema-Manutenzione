<?php
class allowed_origin
{
    public function __construct()
    {
        header('Access-Control-Allow-Origin: *');
    }
}