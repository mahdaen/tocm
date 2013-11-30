<?php
include 'reference/minifier.php';

// CREATING FILE LISTS.
$build_list = array(
    'source/core/native.js', 'source/core/tocmreg.js', 'source/core/tocmref.js', 'source/core/tocmbuilder.js',
    'source/core/tocmbase.js', 'source/core/tocm.js',
    'source/ext/global.js', 'source/ext/animation.js', 'source/ext/query.js', 'source/ext/query.module.js'
);

// CREATING BUILDED STRING.
$build_string = '';
$header = file_get_contents('source/core/header.js');
// ENUMERATING FILES.
foreach ($build_list as $file) {
    $build_string .= file_get_contents($file);
}

$build_string = preg_replace('/\/\*[a-zA-Z\:\s\-\d]+\*\//i', '', $build_string);
$build_string = preg_replace('/\;[\r\n]+\/\//i', ";\r\n\r\n//", $build_string);
$header .= $build_string;

$build = 'tocm.full.v1.1.js';
$build_min = 'tocm.full.v1.1.min.js';
file_put_contents($build, $header);
//header('location: tocm.full.v1.1.js');

?>