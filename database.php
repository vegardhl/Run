
<?php

	$run = mysql_connect("localhost","root","") or die(mysql_errno()); //"localhost","root",""
	//"localhost","tivutan_tivutan","boQG2z^,mD}1"
	mysql_select_db("run", $run); //"run"
	//"tivutan_fly"
	$coin = 0;
	$userName = 'Yo';
/*
	if(isset($_GET["score"])){
		$score = $_GET["score"];
		$sql = "INSERT INTO score(Name, Score) VALUES('Tivutan',$score)";
	}else{
		$sql = "INSERT INTO score(Name, Score) VALUES('Tivutan',$score)";
	}*/

	if(isset($_POST["scoreNumber"])  && isset($_POST["name"]) ){ //&& isset($_POST["name"])
		$coin = $_POST["scoreNumber"];
		//$navn = 'vegard';
		$navn = $_POST["name"];
		$sql = "INSERT INTO score(Name, Score) VALUES('".$navn."','".$coin."')";
	}else{
		$sql = "INSERT INTO score(Name, Score) VALUES('Tivutan',$score)";
	}

	mysql_query($sql, $run);

	include( 'index.html' );

?>
