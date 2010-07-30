<?php
function loadScripts($dirName) {
    if ($handle = opendir($dirName)) {
        while (false !== ($fileName = readdir($handle))) {
            if ($fileName == '.' || $fileName == '..') continue;
            $fullPath = $dirName . '/' . $fileName;
            if (is_dir($fullPath)) {
                loadScripts($fullPath);
            }
            else if (is_file($fullPath)) {
                echo '<script type="text/javascript" src="' . $fullPath . '"></script>' . PHP_EOL;
            }
        }
        closedir($handle);
    }
} 

function loadScenes($dirName) {
    if ($handle = opendir($dirName)) {
        while (false !== ($fileName = readdir($handle))) {
            if ($fileName == '.' || $fileName == '..') continue;
            $fullPath = $dirName . '/' . $fileName;
            if (is_dir($fullPath)) {
                loadScenes($fullPath);
            }
            else if (is_file($fullPath)) {
                echo '<li><a href="javascript: scene.load(\'' . $fullPath . '\').show()">' . $fileName .'</a></li>' . PHP_EOL;
            }
        }
        closedir($handle);
    }
} 
?>
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
<title>Scene Graph DEMO</title>
<meta http-equiv="Content-Type" content="application/xhtml+xml; charset=UTF-8" />
<meta http-equiv="Content-Script-Type" content="text/javascript" />
<meta http-equiv="Content-Style-Type" content="text/css" />
<link rel="stylesheet" type="text/css" href="css/demo.css" />
<?php loadScripts('scripts/jquery.js'); ?>
<?php loadScripts('scripts/sceneFX.js'); ?>
<script type="text/javascript">
jQuery.noConflict();

var scene = null;

jQuery(document).ready(function() {
   scene = new goosefx.scene.Scene('#scene');
});
</script>          
</head>
<body>
<div id="page">
    <div id="scene"></div>
    <div id="menu">
        <h1>SceneFX Demos</h1>
        <ul>
            <?php loadScenes('scenes'); ?>
        </ul>
    </div>
</div>
</body>
</html>