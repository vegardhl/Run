<?php
	$run = mysql_connect("localhost","root","") or die(mysql_errno());

	mysql_select_db("run", $run); //"run"

	/*
	$query = mysql_query(" SELECT `score` . `Name` FROM `score` WHERE `score` . `Name` = '"  . 'Tivutan' .  "'
	", $run);*/

	//$result = mysql_fetch_array($query, MYSQL_ASSOC);
	

	if(isset($_POST['user']) ){
		$user = $_POST['user'];
		$safeUser = mysql_real_escape_string($user); //Checking for sql injection.
		$sql = "SELECT Score FROM score WHERE Name= '". $safeUser . "' ";
	}else{
		$user = "unknown";
		$sql = "SELECT Score FROM score WHERE Name= '". $user . "' ";
	}

	$query = mysql_query($sql, $run); //'Tivutan'
	//$data = mysql_fetch_array($query);

	$highest = 0;

	$storeArray = Array();
	while ($row = mysql_fetch_array($query, MYSQL_ASSOC)) {
    	$storeArray[] =  $row['Score'];  
	}

	$length = sizeof($storeArray);

	for($i=0; $i<$length; $i++){
		if($storeArray[$i] > $highest){
			$highest = $storeArray[$i];
		}
	}

	//Print($data["Score"]; //$data["Name"]
	//Print_r($storeArray);
	//echo $result;
	//printf($data);
	//printf("----------------------" + $query);
	Print($highest); //------------------------------------------------------ RIKITG
	//Print($user);
	//return $storeArray;
?>