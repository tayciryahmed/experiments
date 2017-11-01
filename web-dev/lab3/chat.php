<?php 

// crÃ©ation de la chaine Ã  ajouter dans le fichier
	$chaine = "<br />- ";
	$chaine .= "<a href='javascript:recherche(\"" . gethostbyname($_SERVER['SERVER_NAME']) . "\");'>" . gethostbyname($_SERVER['SERVER_NAME']) . "</a>";
	$chaine .=  " - " . $_GET['phrase'];


	$fp = fopen("texte.html","a");

	fwrite($fp, $chaine);
	fclose($fp);
	echo "Ecriture reussie";

?>