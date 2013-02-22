/*global $*/

function sendResource(cv_j){
	'use strict';
	var suc = "false";
	$.ajax({type: "POST", 
		url: "/homepage", 
		dataType: "json",
		data: {cv: JSON.stringify(cv_j)}, 
		success: function(){ 
			suc= "true";
	}});
	return suc;
}

function sendData(cv_j, currcv_j){
	'use strict';
	var suc = "false";
	$.ajax({type: "POST", 
		url: "/homepage",
		dataType: "json",
		data: {cv: JSON.stringify(cv_j), currcv: JSON.stringify(currcv_j)},
		success: function(){ 
			suc= "true";
	}});
	return suc;
}