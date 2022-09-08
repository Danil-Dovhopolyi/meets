<?php
class MeetController
{
    public function getMeets($conn)
    {
        $st = $conn->prepare('SELECT * FROM meets');
        $st->execute();
        $rows = $st->fetchAll(PDO::FETCH_ASSOC);
        print json_encode($rows);
    }

    public function getMeet($conn, $id)
    {
        $st = $conn->prepare("SELECT * FROM meets WHERE id = $id");
        $stRows = $st->execute();
        $data = $st->fetchAll(PDO::FETCH_ASSOC);
        if (!$data) {
            http_response_code(404);

            $res = [
                "status" => false,
                'message' => 'Meet not found',
            ];
            print json_encode($res);
        } else {
            $st->execute();
            $meet = $st->fetchAll(PDO::FETCH_ASSOC);
            print json_encode($meet[0]);
        }
    }

    public function addMeet($conn, $newMeet)
    {
        $title = $this->getValueOrNullFromArrayKey($newMeet['Title']);
        $country = $this->getValueOrNullFromArrayKey($newMeet['Country']);
        $datemeet = $this->getValueOrNullFromArrayKey($newMeet['DateMeet']);
        $longitude = $this->getValueOrNullFromArrayKey($newMeet['longitude']);
        $latitude = $this->getValueOrNullFromArrayKey($newMeet['latitude']);

        $st = $conn->prepare("INSERT INTO meets (Title, Country, DateMeet, longitude, latitude) VALUES (?,?,?,?,?)");
        $st->execute([$title, $country, $datemeet, $longitude, $latitude]);
        http_response_code(201);
        $res = [
            "status" => true,
            'meet_id' => $conn->lastInsertId(),
        ];
        print json_encode($res);
    }

    public function updateMeet($conn, $id, $data)
    {
        $title = $this->getValueOrNullFromArrayKey($data['Title']);
        $country = $this->getValueOrNullFromArrayKey($data['Country']);
        $datemeet = $this->getValueOrNullFromArrayKey($data['DateMeet']);
        $longitude = $this->getValueOrNullFromArrayKey($data['longitude']);
        $latitude = $this->getValueOrNullFromArrayKey($data['latitude']);
        $st = $conn->prepare("UPDATE meets SET Title = ?, Country = ?, DateMeet = ?, longitude = ?, latitude = ? WHERE id = ?");
        $st->execute([$title, $country, $datemeet, $longitude, $latitude, $id]);
        http_response_code(200);
        $res = [
            "status" => true,
            'message' => "Meet is updated",
        ];
        print json_encode($res);
    }

    public function deleteMeet($conn, $id)
    {
        $st = $conn->prepare("DELETE FROM meets WHERE id = ?");
        $st->execute([$id]);
        http_response_code(204);
        $res = [
            "status" => true,
            'message' => "Meet is deleted",
        ];
        print json_encode($res);
    }

    // Gets value from associative array.
    // If value is empty string (php casts null to empty string)
    // then returns NULL
    private function getValueOrNullFromArrayKey($value)
    {
        if (!(gettype($value) == "string")) {
            return $value;
        }
        return $value == "" ? null : $value;
    }
}
