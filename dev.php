<?php
function asset($asset_name)
{
    $manifest = file_get_contents("./dist/dev/manifest.json");
    $manifest = json_decode($manifest, true); //decode json string to php associative array
    if (!isset($manifest[$asset_name])) return $asset_name; //if manifest.json doesn't contain $asset_name then return $asset_name itself
    return "./dist/dev/" . $manifest[$asset_name];
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Premier test de webpack</title>
</head>
<body>
<h1>Premier test de webpack</h1>
<button class="btn btn-primary" id="button">Cliquez ici</button>
<h2>Ce style est généré à partir de app.scss</h2>
<a href="index.php">PROD</a>
<script src="<?php echo asset("main.js"); ?>"></script>
<!-- <script src="./dist/production.js"></script> -->
</body>
</html>