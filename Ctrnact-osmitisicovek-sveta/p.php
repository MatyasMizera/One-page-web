<?php
$data = json_decode(file_get_contents("data.json"), true);
echo "Počet osmitisícovek: " . (count($data) - 1);
