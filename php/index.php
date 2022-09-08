<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: * ");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Credentials: true");

header("Content-type: json/application");
require 'PDO.php';
require 'Controller.php';
$method = $_SERVER['REQUEST_METHOD'];

$meetController = new MeetController();

$q = $_GET['q'] ?? null;
$params = explode('/', $q);
$type = $params[0];
$id = $params[1] ?? null;
switch ($method) {
    case 'GET':
        if ($type === 'meets') {
            if (isset($id)) {
                $meetController->getMeet($conn, $id);
            } else {
                $meetController->getMeets($conn);
            }
        }
        break;
    case "POST":
        if ($type === 'meets') {
            $meetController->addMeet($conn, $_POST);
        }
        break;
    case "PATCH":
        if ($type === 'meets') {
            if (isset($id)) {
                $data = file_get_contents('php://input');
                $data = json_decode($data, true);
                $meetController->updateMeet($conn, $id, $data);
            }
        }
        break;
    case "DELETE":
        if ($type === 'meets') {
            if (isset($id)) {
                $meetController->deleteMeet($conn, $id);
            }
        }
        break;
}
