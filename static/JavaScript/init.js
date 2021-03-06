/*global $, saveResource, saveData, confirm, alert, fullcvParser, currentcvParser, cv, currcv, drawTree, init*/
/**
 * Get last id available
 */
function lastId(){
	'use strict';
	var hi=0;
	var categorylist=document.getElementById('full_sp').getElementsByClassName("cvcategory");
	
	for(var i=0;i<categorylist.length;i++){
		var catid = parseInt(categorylist[i].getAttribute("cvid"),10);
		if(hi < catid){
                  hi = catid;
                }
		var itemlist=categorylist[i].getElementsByClassName("item"); 

		for(var j=0;j<itemlist.length;j++){
			var itemid= parseInt(itemlist[j].getAttribute("id"),10);
			if(hi < itemid){hi = itemid;}
		}
	}
	return ++hi;
}
//get all categories of full cv
function getCategories(cv){
	'use strict';
	var arr = [];
	for(var i=0; i<cv.category.length; i++){
		arr.push(cv.category[i].title);
	}
	return arr;
}
//function to sort out toggling
function findHidden(){
	'use strict';
	var hiddenones = [];
	//right side-bar	
	var categorylist=document.getElementById('full_sp').getElementsByClassName("cvcategory");
	for(var i=0;i<categorylist.length;i++){
		var itemlist=categorylist[i].getElementsByClassName("item"); 
		for(var j=0;j<itemlist.length;j++){
			var itemid = itemlist[j].getAttribute('id');
			if(!($('#'+itemid+'.item').children().children('p').is(':visible'))){
				hiddenones.push(itemid);
			}
		}
	}
	//main section
	var catlist=document.getElementById('cv_sp').getElementsByClassName("currentcat");
	for(var k=0;k<catlist.length;k++){
		var itemli=catlist[k].getElementsByClassName("item"); 
		for(var l=0;l<itemli.length;l++){
			
			var itmid = itemli[l].getAttribute('id');
			
			if(!($('#'+itmid).children().children('p').is(':visible'))){
				hiddenones.push(itmid);
			}
		}
	}
	return hiddenones;
}

function toggle(hiddenones){
	'use strict';
	//right side-bar
	var categorylist=document.getElementById('full_sp').getElementsByClassName("cvcategory");
	for(var i=0;i<categorylist.length;i++){
		var itemlist=categorylist[i].getElementsByClassName("item"); 
		for(var j=0;j<itemlist.length;j++){
			var itemid = itemlist[j].getAttribute('id');
			if(hiddenones.indexOf(itemid)!==-1){
				$('#'+itemid+'.item').children().children('p').hide();
			}else{
				$('#'+itemid+'.item').children().children('p').show();
			}
		}
	}
	//main section
	var categoryli=document.getElementById('cv_sp').getElementsByClassName("currentcat");
	for(var k=0;k<categoryli.length;k++){
		var itemli=categoryli[k].getElementsByClassName("item"); 
		for(var l=0;l<itemli.length;l++){
			var itmid = itemli[l].getAttribute('id');
			if(hiddenones.indexOf(itmid)!==-1){
				$('#'+itmid).children().children('p').hide();
			}else{
				$('#'+itmid).children().children('p').show();
			}
		}
	}
}
function findHiddenCats(){
	'use strict';
	var hiddenones = [];	
	//main section
	var categorylist=document.getElementById('cv_sp').getElementsByClassName("currentcat");	
	for(var i=0;i<categorylist.length;i++){
		var catid=categorylist[i].getAttribute('id');
		var togglevalue = $('#'+catid).children('div').find('li').eq(0).children().attr('toggle');
		if(togglevalue==='false'){
			hiddenones.push(catid);
		}
	}	
	var categoryli=document.getElementById('full_sp').getElementsByClassName("cvcategory");	
	for(var j=0;j<categoryli.length;j++){
		var ctid=categoryli[j].getAttribute('id');
		var toggleval = $('#'+ctid).children('div').find('li').eq(0).children().attr('toggle');
		if(toggleval ==='false'){
			hiddenones.push(ctid);
		}
	}
	return hiddenones;
}
function setHiddenCats(hiddenones){
	'use strict';
	var categorylist=document.getElementById('cv_sp').getElementsByClassName("currentcat");
	for(var i=0;i<categorylist.length;i++){
		var catid=categorylist[i].getAttribute('id');
		if(hiddenones.indexOf(catid)!==-1){
			$('#'+catid).children('div').find('li').eq(0).children().attr('toggle','false');
		}else{
			$('#'+catid).children('div').find('li').eq(0).children().attr('toggle','true');
		}
	}
	var categoryli=document.getElementById('full_sp').getElementsByClassName("cvcategory");
	for(var j=0;j<categoryli.length;j++){
		var ctid=categoryli[j].getAttribute('id');
		if(hiddenones.indexOf(ctid)!==-1){
			$('#'+ctid).children('div').find('li').eq(0).children().attr('toggle','false');
		}else{
			$('#'+ctid).children('div').find('li').eq(0).children().attr('toggle','true');
		}
	}
}
//end here
function getCVS(cv){
	'use strict';
	var arr = [];
	for(var i=0; i<cv.currentcv.length; i++){
		arr.push(cv.currentcv[i].title);
	}
	return arr;
}
/**
 * Remove the item from the JSON file
 * @param currcv - the current CV
 * @param id - the id of the item being removed
 */
function removeItem(currcv, id){
	'use strict';
	for(var i = 0; i < currcv.currentcv.length; i++){
		for(var j = 0; j < currcv.currentcv[i].content.length; j++){
			if(currcv.currentcv[i].content[j].order.indexOf(id)!==-1){
				currcv.currentcv[i].content[j].order.splice(currcv.currentcv[i].content[j].order.indexOf(id),1); //delete the item
			}
		}
	}
}
/**
 * Remove the category from the JSON file
 * @param currcv - the current CV
 * @param id - the id of the category being removed
 */
function removeCat(currcv, id){
	'use strict';
	for(var i = 0; i < currcv.currentcv.length; i++){
		for(var j = 0; j < currcv.currentcv[i].content.length; j++){
			if(currcv.currentcv[i].content[j].category === id){
				currcv.currentcv[i].content.splice(j,1);
			}
		}
	}
}
/**
 * Remove the CV from the JSON file
 * @param currcv - the current CV
 */
function removeCV(currcv){
	'use strict';
	var thiscv = $('#cvs').val().replace(/_/g, ' '); //get the value of the CV being removed

	for(var i = 0; i < currcv.currentcv.length; i++){
		if(currcv.currentcv[i].title === thiscv){
			currcv.currentcv.splice(i,1);
		}
	}
}
/**
 * Initialise buttons (images)
 */
function buttonsInit(){
	'use strict';
	$('#create-item').button({
		icons: {
            primary: "ui-icon-plusthick"
        }
    });
    $('.button').button({
		icons: {
            primary: "ui-icon-triangle-1-s"
        }
    });
    $('.button_d').button({
		icons: {
            primary: "ui-icon-minusthick"
        }
    });
    $('#create-cv').button({
		icons: {
            primary: "ui-icon-plusthick"
        }
    });
    $('.showbutton').button({
		icons: {
            primary: "ui-icon-triangle-1-s"
        }
    });
    $('.delbutton').button({
		icons: {
            primary: "ui-icon-close"
        }
    });
    $('.addtocur').button({
		icons: {
            primary: "ui-icon-clipboard"
        }
    });
    $('.addcat').button({
		icons: {
            primary: "ui-icon-clipboard"
        }
    });
    $('.delcat').button({
		icons: {
            primary: "ui-icon-close"
        }
    });
    $('.delitem').button({
		icons: {
            primary: "ui-icon-trash"
        }
    });
    $('.removecat').button({
		icons: {
            primary: "ui-icon-trash"
        }
    }); 
    $('.deletecv').button({
		icons: {
            primary: "ui-icon-trash"
        }
    });
    $('.showcat').button({
		icons: {
            primary: "ui-icon-triangle-1-s"
        }
    });
    $('#export-pdf').button({text: false});
    $('#logout').hover(function(){
	$(this).attr('style','font-size:20px; text-decoration:underline');
		$('#help').attr('style','font-size:12px;');
	});
	$('#logout').mouseleave(function(){
		$(this).attr('style','font-size:16px');
		$('#help').attr('style','font-size:16px');
	});
	$('#help').hover(function(){
		$(this).attr('style','font-size:20px; text-decoration:underline');
		$('#logout').attr('style','font-size:12px');
	});
	$('#help').mouseleave(function(){
		$(this).attr('style','font-size:16px');
		$('#logout').attr('style','font-size:16px');
	});
}
//initialise sortable items
function sortableInit(){
	'use strict';
	$('.current_items').sortable({
		helper: "clone",
		appendTo: "body",
		update: function() {
			saveResource(cv);
			saveData(cv,currcv);
			sortableInit();
			buttonsInit();
		}
	});
	$('#cv_sp').sortable({
		helper: "clone",
		appendTo: "body",
		update: function() {
			saveResource(cv);
			saveData(cv,currcv);
			sortableInit();
			buttonsInit();
		}
	});
}
/**
 * Initialise functions used in click events
 * @param cv
 * @param currcv
 */
function editableInit(cv,currcv) {
    'use strict';
    buttonsInit();
    sortableInit();
    $(".button").click(function(){
	var thissp = $(this).parents().eq(3).siblings('div').attr('id');
	var allones = $('#'+thissp).find('.showbutton').length; //items
	var trueones = 0, falseones = 0; //store how many ones are hidden / visible
	var allcats = $('#'+thissp).find('.showcat').length; //categories
	var truecats = 0, falsecats = 0; //store how many ones are hidden / visible
	$('#'+thissp).find('.showbutton').each(function(){
		if($(this).attr('toggle')==='true'){
			trueones++;
		}else if($(this).attr('toggle')==='false'){
			falseones++;
		}
	});
	$('#'+thissp).find('.showcat').each(function(){
		if($(this).attr('toggle')==='true'){
			truecats++;
		}else if($(this).attr('toggle')==='false'){
			falsecats++;
		}
	});
	if(allones === trueones){
		$(this).attr('toggle','true'); 
	}else if(allones === falseones){
		$(this).attr('toggle','false'); 
	}else if(allcats === truecats){
		$(this).attr('toggle','true'); 
	}else if(allcats === falsecats){
		$(this).attr('toggle','false'); 
	}
	if($(this).attr('toggle')==='false'){
		$(this).parents('div').eq(1).siblings().find('p').slideDown();
		$(this).attr('toggle','true'); 
		$('#'+thissp).find('.showcat').attr('toggle','true');
		$('#'+thissp).find('.showbutton').attr('toggle','true');
	}else{
		$(this).parents('div').eq(1).siblings().find('p').slideUp();
		$(this).attr('toggle','false'); 
		$('#'+thissp).find('.showcat').attr('toggle','false');
		$('#'+thissp).find('.showbutton').attr('toggle','false');
	}
	});
	$(".button_d").click(function(){
		$( ".profile1" ).switchClass( "profile1", "profile2", 1000 );
		$( ".profile2" ).switchClass( "profile2", "profile1", 1000 );
		$( ".cvlist1" ).switchClass( "cvlist1", "cvlist2", 1000 );
		$( ".cvlist2" ).switchClass( "cvlist2", "cvlist1", 1000 );
		return false;
	});
	$("#help").click(function(){
		$('#tutorial').tutorial();
	});
    $('body').on('click','.showcat',function(){
		var thisparent = $(this).parents().eq(3); //the top parent e.g. div id = current_category
		var allones = thisparent.find('.showbutton').length;
		var trueones = 0, falseones = 0; //store how many ones are hidden / visible
		thisparent.find('.showbutton').each(function(){
		if($(this).attr('toggle')==='true'){
			trueones++;
		}else if($(this).attr('toggle')==='false'){
			falseones++;
		}
		});
	if(allones === trueones){
		$(this).attr('toggle','true'); 
	}else if(allones === falseones){
		$(this).attr('toggle','false'); 
	}
	if($(this).attr('toggle')==='false'){
		thisparent.find('p').slideDown();
		$(this).attr('toggle','true'); 
		thisparent.find('.showbutton').attr('toggle','true');
	}else{
		thisparent.find('p').slideUp();
		$(this).attr('toggle','false'); 
		thisparent.find('.showbutton').attr('toggle','false');
	}
	});
	$("input[name='cats']").change(function(){
		setEnabled();
	});
	$('#full').on('click', '#create-item',function(){
		$( "#dialog-form" ).dialog( "open" );
	});
	$('#cv').on('click', '#create-cv',function(){
		$( "#dialog-form2" ).dialog( "open" );
	});
    //hide items in the full resource initially
	$('#full_sp').find('.hide').siblings('p').hide();
    
	$('body').on('click','.delbutton',function() {
		if(confirm("Are you sure you want to remove the current item?")){
			$(this).parents().eq(4).remove();
			saveResource(cv);
			saveData(cv,currcv);
			sortableInit();
			buttonsInit();
		}
	});
	$('body').on('click','.delitem',function() {
		if(confirm("Are you sure you want to delete this item? This will be deleted from all CVs and cannot be undone!")){
			var thisid = $(this).parents().eq(4).attr('id');
			if(document.getElementById('curr'+thisid)){$('#curr'+thisid).remove();} //remove from current CV
			$(this).parents().eq(4).remove(); //remove from Resource Bar
			removeItem(currcv, thisid); //remove from JSON
			saveResource(cv);
			saveData(cv,currcv);
			sortableInit();
			buttonsInit();
		}
	});
	$('body').on('click','.removecat',function() {
		if(confirm("Are you sure you want to delete this category? This will be deleted including all of its items from all CVs and cannot be undone!")){
			var thisid = $(this).parents().eq(3).attr('id');
			var thiscatid = $(this).parents().eq(3).attr('cvid');
			if(document.getElementById('current_'+thisid)){$('#current_'+thisid).remove();} //remove from current CV
			$(this).parents().eq(3).remove(); //remove from Resource Bar
			removeCat(currcv, thiscatid); //remove from JSON
			saveResource(cv);
			saveData(cv,currcv);
			document.getElementById('category').innerHTML = arrVals(getCategories(cv)); //load categories on combo box
			sortableInit();
			buttonsInit();
		}
	});
	$('body').on('click','.deletecv',function() {
		if(confirm("Are you sure you want to delete this CV? This cannot be undone!")){
			$('#cv_sp').children().remove(); //remove the items on the current CV
			removeCV(currcv); //remove CV
			//set the combo box value to a different CV
			document.getElementById('cvs').innerHTML = arrVals(getCVS(currcv));
			var cvName;
			if(getCVS(currcv).length!==0){
				cvName= getCVS(currcv)[0]; //Get first element of array
				$('#cv_sp').attr('hasCV','true');
			}else{
				cvName= 'None';
				$('#cv_sp').attr('hasCV','false');
			}
			document.getElementById('cvnamelabel').innerHTML = 'Current : '+cvName;
			//reload the document to get other cv and get items and categories that are hidden
			var hiddenones = findHidden();
			var hiddencats = findHiddenCats();
			//redraw tree, middle section right side bar
			document.getElementById('cv_sp').innerHTML = currentcvParser(cv,currcv);
			document.getElementById('full_sp').innerHTML = fullcvParser(cv);
			//return state of hidden and visible items
			toggle(hiddenones);
			setHiddenCats(hiddencats);
			saveResource(cv);
			saveData(cv,currcv);
			sortableInit();
			buttonsInit();
			if($("#cvs").val() !== null){
				var href = "/export?title=" + $("#cvs").val().replace(/_/g, "+") + "&template=" + $("#templates").val().replace(/ /g,"+"); 
				$("#export-pdf").attr("href", href);
			}else{
				$("#export-pdf").attr("href", "#");
			}
		}
	});
    $('body').on('click','.showbutton',function() {
		if($(this).parents().eq(2).siblings('p').is(':visible')){
			$(this).attr('toggle','false');
		}else{
			$(this).attr('toggle','true');
		}
		$(this).parents().eq(2).siblings('p').slideToggle('fast');
	});
	//keep
	$('body').on('click','.delcat',function(){
		if(confirm("Are you sure you want to remove the current category?")){
			$(this).parents().eq(3).remove();
			saveResource(cv);
			saveData(cv,currcv);
			sortableInit();
			buttonsInit();
		}
	});
	$('body').on('click','.addcat', function() {
		var cat = $(this).parents().eq(3);
		if($('#cv_sp').attr('hasCV')==='true'){
			if (!document.getElementById("current_"+cat.attr('id'))){
				var newone = cat.clone(true).attr('id','current_'+cat.attr('id')).attr('class','currentcat');
				if(cat.attr('id')==='Profile'){
					newone.children('ul').children('li:not(:first)').remove();
				}
				newone.children('ul').each(function(){
					$(this).attr('class','current_items');
				})
				.children().each(function(){
					var itemid = $(this).attr('id');
					$(this).attr('id','curr'+itemid);
					$(this).children().children('div').children().children().children().each(function(){
						if($(this).hasClass("addtocur")){
							$(this).parent().remove();
						}
					});
				});
				newone.children('div').children('ul').children('li').children('a').switchClass("addcat","delcat"); //find addcat button, replace with a delcat
				newone.find('p').slideDown();
				newone.children('div').find('li').eq(0).children().attr('toggle','true');
				newone.appendTo($('#cv_sp'));
				saveResource(cv);
				saveData(cv,currcv);
				sortableInit();
				buttonsInit();
			}else{
				alert("CATEGORY ALREADY EXISTS IN CURRENT CV!");
			}
		}else{
			alert("You have not created a CV. Please create one to add this category to a CV.");
		}
	});
    
	$("body").on('click','.addtocur',function(){
		var item = $(this).parents().eq(4);
		var catparent = $(this).parents().eq(6);
		if($('#cv_sp').attr('hasCV')==='true'){
			//if item does not exist but category does
			if (!document.getElementById("curr"+item.attr('id')) && document.getElementById("current_"+catparent.attr('id'))){
				var newone = item.clone(true).attr('id','curr'+item.attr('id'));
				newone.children().children('div').children().children().children().each(function(){
					if($(this).hasClass("addtocur")){
						$(this).parent().remove();
					}
				});
				newone.find('p').slideDown();
				if(catparent.attr('id')==="Profile"){
					if($('#current_Profile').children('ul').children().length >= 1) {
						alert("Only one profile item is allowed in the Profile Category.");
					}else{
						newone.appendTo($('#current_'+catparent.attr('id')).children('ul'));
						saveResource(cv);
						saveData(cv,currcv);
						sortableInit();
						buttonsInit();
					}
				}else{
					newone.appendTo($('#current_'+catparent.attr('id')).children('ul'));
					saveResource(cv);
					saveData(cv,currcv);
					sortableInit();
					buttonsInit();
				}
				//if item and category both do not exist
			}else if (!document.getElementById("curr"+item.attr('id')) && !document.getElementById("current_"+catparent.attr('id'))){
				var newcat = catparent.clone(true).attr('id','current_'+catparent.attr('id')).attr('class','currentcat');
				newcat.children('ul').each(function(){
					$(this).attr('class','current_items');
				})
				.children().each(function(){
					var itemid = $(this).attr('id');
					if(itemid === item.attr('id')){
						$(this).find('p').slideDown();
						$(this).attr('id','curr'+itemid);
					}else{
						$(this).remove();
					}
				})
				.children().children('div').children().children().children().each(function(){
					if($(this).hasClass("addtocur")){
						$(this).parent().remove();
					}
				});
				newcat.children('div').find('li').eq(0).children().attr('toggle','true');
				newcat.children('div').children('ul').children('li').children('a').switchClass("addcat","delcat"); //find addcat button, replace with a delcat
				newcat.appendTo($('#cv_sp'));
				saveResource(cv);
				saveData(cv,currcv);
				sortableInit();
				buttonsInit();
				//if item already exists
			} else if (document.getElementById("curr"+item.attr('id'))) {
				alert("ITEM ALREADY EXISTS IN CURRENT CV!");
			}
		}else{
			alert("You have not created a CV. Please create one to add this item to a CV.");
		}
	});
	$('#workspace').on('click','.hide',function(){ //inline edit for headers
		var thisone = $(this).parent().parent().attr("id"); //get real id
		var patt = /[\d]+/;
		var curr = /curr/;
		var idnum = patt.exec(thisone); //get number part
		var old = $(this).text();
		var noclone = false; //boolean to check if there is a clone (e.g. when clicking on full resource, check if it exists in current cv
		var h3child, h3clone;
		if(curr.test(thisone)){ 
			h3child = $('#'+thisone).children().children('h3');
			h3clone = $('#'+idnum+'.item').children().children('h3'); //clone always exist
		}else{ 
			if($('#curr'+thisone).length){ //if clone exist
				h3clone = $('#curr'+thisone).children().children('h3');
			}else{
				noclone = true;
			}
			h3child = $('#'+idnum+'.item').children().children('h3');
		}
		if(h3child.children('input').length===0){
			var inputbox = "<input type='text' class='inputbox' value=\""+$(this).text()+"\">";
			h3child.html(inputbox);
			$("input.inputbox").focus();
			$("input.inputbox").blur(function() {
				var value = $(this).val();
				if(value!==''){
					h3child.text(value);
					if(noclone===false){
						h3clone.text(value);
					}
					if(value!==old){//only save if there's a change
						saveResource(cv);
						saveData(cv,currcv);
						sortableInit();
						buttonsInit();
					} 
				}else{
					h3child.text(old);
				}
			});
			$(".inputbox").keydown(function (event){
				if (event.keyCode===13) {//13 = Enter
					event.preventDefault();
					$(this).blur();
				}
				else if(event.keyCode===27){
					h3child.text(old); //revert to previous one if esc
					if(noclone===false){
						h3clone.text(old);
					}
					$(this).blur();
				}
			});
		}
	}); 
	$('#profile_sp').on('click','.hName, .hPhone, .hAddr',function(){ //inline edit for profile
		//alert($(this).text());
		var txtarea = $(this);
		var old = txtarea.text();
		var inputtype;
		if($(this).attr('class')==='hAddr'){
			inputtype = 'textarea';
		}else{
			inputtype = 'input';
		}
		if($(this).children(inputtype).length===0){
			var inputbox;
			if($(this).attr('class')==='hAddr'){
				inputbox = "<textarea id='textarea' class='inputbox' wrap=\"soft\">"+$(this).text()+"</textarea>";
			}else{
				inputbox = "<input type='text' class='inputbox' value=\""+$(this).text()+"\">";
			}
			$(this).html(inputbox);
			$(".inputbox").focus();
			$(inputtype+".inputbox").blur(function() {
				var value = $(this).val();
				txtarea.text(value);
				if(value!==''){
					txtarea.text(value);
					if(value!==old){//only save if there's a change
						saveResource(cv);
						saveData(cv,currcv);
						sortableInit();
						buttonsInit();
					} 
				}else{
					txtarea.text(old);
				}
			});
			$(".inputbox").keydown(function (event){
				if (event.keyCode===13) {//13 = Enter
					event.preventDefault();
					$(this).blur();
				}
				else if(event.keyCode===27){
					txtarea.text(old); //revert to previous one if esc
					$(this).blur();
				}
			});
		}
	}); 
	$('#workspace').on('click','.editable',function(){
		var thisone = $(this).attr("id"); //id is set such as : edit(id of current class being changed)
		var old = $(this).text();
		if($(this).children('textarea').length===0){
			var txt = "<textarea id=edit" +thisone+ " wrap=\"soft\">"+$(this).text()+"</textarea>";
			$(this).html(txt);
			$("#edit"+thisone).blur(function(){
				var value = $(this).val();
				if(value===""){
					$('#'+thisone+'.editable').text(old); //revert to previous one if empty
				}else{
					$('#'+thisone+'.editable').text(value);
					if(value!==old){ //only save if there's a change
						saveResource(cv); 
						saveData(cv,currcv);
						sortableInit();
						buttonsInit();
					}
				}
			});						
			$("#edit"+thisone).focus();
			$("#edit"+thisone).keydown(function (event){
				if (event.keyCode===13) {//13 = Enter
					event.preventDefault();
					$(this).blur();
				}
				else if(event.keyCode===27){
					$('#'+thisone+'.editable').text(old); //revert to previous one if esc
					$(this).blur();
				}
			});
		}
	});
	$("#export-pdf").click(function(){
		if($("#cvs").val() === null){
		alert("Please select or create a CV.");
		}
	});
	$("#cvs").change(function(){
		var item = $(this).val().replace(/_/g, " ");
		//only keep state of items in full resource
		var hiddenones = findHidden();
		document.getElementById('full_sp').innerHTML = fullcvParser(cv);
		toggle(hiddenones);
		
		document.getElementById('cv_sp').innerHTML = currentcvParser(cv,currcv);
		document.getElementById('cvnamelabel').innerHTML = 'Current : '+item;
		sortableInit();
		buttonsInit();
		var href = "/export?title=" + $(this).val().replace(/_/g, "+") + "&template=" + $("#templates").val().replace(/ /g,"+"); 
		$("#export-pdf").attr("href", href);
	});
	
	$("#templates").change(function(){
		var href = "/export?title=" + $("#cvs").val().replace(/_/g, "+") + "&template=" + $(this).val().replace(/ /g,"+"); 
		$("#export-pdf").attr("href", href);
	});
}
/**
 * Initialise adding functions (adding items and categories)
 * @param cv
 * @param currcv
 */
function addInit(cv,currcv){
	'use strict';
	var category = $("#category"),
            category1 = $("#category1"),
            title = $("#title"),
            content = $("#content"),
            allFields = $([]).add(category).add(category1).add(title).add(content); 
		$("#dialog-form").dialog({
                  autoOpen: false,
                  height: 500,
                  width: 350,
                  modal: true,
                  buttons: {
                    "Add": function(){
			allFields.removeClass( "ui-state-error" );
			var show = '<li class="hrz"><a href="#Min" class="showbutton" style="width:20px; height:16px; font-size:9px"></a></li>';
			//delete button - var del = '<li class="hrz"><a href="#Min" class="delbutton" style="width:20px; height:16px; font-size:9px"></a></li>';
			var add = '<li class="hrz"><a href="#Min" class="addtocur" style="width:20px; height:16px; font-size:9px"></a></li>';
			var buttondiv = '<div style="float:right"><ul>'+show+add+'</ul></div>';
			var addcat = '<li class="hrz"><a href="#Min" class="addcat" style="width:20px"></a></li>';
			var addcatdiv = '<div style="float:right"><ul>'+addcat+'</ul></div>'; //used for adding categories
			if($('input:radio[name=cats]:checked').val()==="opt1"){
				$("#category").removeAttr("disabled");
				$("#category1").attr("disabled","disabled");
				$("#"+category.val()).children('ul').append("<li id="+parseInt(lastId(),10)+" class=\"item\"><div class=\"hidable\">"+buttondiv+"<h3 class=\"hide\">"+title.val()+"</h3><p><span id=\"span"+parseInt(lastId(),10)+"\" class=\"editable\">"+content.val()+"</span></p></div></li>");
			}else{
				$("#category1").removeAttr("disabled");
				$("#category").attr("disabled","disabled");
				var newcat = category1.val().replace(/\s+/g, "_");
				$("#full_sp").append("<div id=\""+newcat+"\" class=\"cvcategory\" cvid=\""+parseInt(lastId(),10)+"\">"+addcatdiv+"<h3 class=\"category_title\">"+category1.val()+"</h3><ul class=\"items\"><li id="+parseInt(lastId()+1,10)+" class=\"item\"><div class=\"hidable\">"+buttondiv+"<h3 class=\"hide\">"+title.val()+"</h3><p><span id=\"span"+parseInt(lastId()+1,10)+"\" class=\"editable\">"+content.val()+"</span></p></div></li>");
			}
				saveResource(cv); 
				saveData(cv,currcv);
				document.getElementById('category').innerHTML = arrVals(getCategories(cv)); //load categories on combo box
				sortableInit();
				buttonsInit();
				$( this ).dialog( "close" );
			},
			Cancel: function(){
				$( this ).dialog( "close" );
			}
		},
		close: function(){
			allFields.val( "" ).removeClass( "ui-state-error" );
		}
	});
}
/**
 * Add a new CV
 * @param cv
 * @param currcv
 * @param cvs - The combobox used for the cvs. Used to load chosen cv from the combobox
 */
function addCV(cv,currcv){
	'use strict';
	var cvname = $("#cvname"),
	allFields = $([]).add(cvname);
	$("#dialog-form2").dialog({
		autoOpen: false,
		height: 300,
		width: 350,
		modal: true,
		buttons: {
			"Add": function(){
				allFields.removeClass( "ui-state-error" );
				var newcv = {
					"title": cvname.val(),
					"content": [
					]
				};
				currcv.currentcv[currcv.currentcv.length] = newcv; //appends new CV
				var item = cvname.val().replace(/ /g, "_");
				var cvs = getCVS(currcv);
				document.getElementById('cvs').innerHTML = arrVals(cvs); //load cvs on combo box
				$("#cvs").val(item);
				document.getElementById('cvnamelabel').innerHTML = 'Current : '+cvname.val();
				if($('#cvs').val()!==null){
					var href = "/export?title=" + $("#cvs").val().replace(/_/g, "+") + "&template=" + $("#templates").val().replace(/ /g,"+"); 
					$("#export-pdf").attr("href", href);
				}
				$('#cv_sp').attr('hasCV','true');
				$( this ).dialog( "close" );
				//reload the document to get other cv
				//get items and cats that are hidden
				var hiddenones = findHidden();
				var hiddencats = findHiddenCats();
				//redraw tree, middle section right side bar
				document.getElementById('cv_sp').innerHTML = currentcvParser(cv,currcv);
				document.getElementById('full_sp').innerHTML = fullcvParser(cv);
				//keep state of hidden and visible items
				toggle(hiddenones);
				setHiddenCats(hiddencats);
				saveResource(cv);
				saveData(cv,currcv);
				sortableInit();
				buttonsInit();
			},
			Cancel: function(){
				$( this ).dialog( "close" );
			}
		},
		close: function(){
			allFields.val( "" ).removeClass( "ui-state-error" );
		}
	});
}
/**
 * Swap colours and functionality for radio buttons (when adding a category)
 */
function setEnabled(){
	'use strict';
	if($('input:radio[name=cats]:checked').val()==="opt1"){
		$("#category").removeAttr("disabled");
		$("#oldlabel").css('color', '#000000');

		$("#category1").attr("disabled","disabled");
		$("#newlabel").css('color', '#808080');

	}else{
		$("#category1").removeAttr("disabled");
		$("#newlabel").css('color', '#000000');

		
		$("#category").attr("disabled","disabled");
		$("#oldlabel").css('color', '#808080');

	}
}
/**
 * Load array values into combobox
 * @param arr The array which values will be loaded into the combobox
 * @returns {String} The html string for the combobox
 */
function arrVals(arr){
	'use strict';
	var str="";
	var i;
	for(i=0; i<arr.length; i++) {
		var item = arr[i].replace(/\s+/g, "_");
			str += '<option value="' +item+ '">'+arr[i]+'</option>';
	}

	return str;
}
/**
 * Start the document
 * @param cv - the whole cv
 * @param currcv - the current cvs being worked on
 */
function init(cv,currcv,hasStarted,avatar){
	'use strict';
	document.getElementById('cvs').innerHTML = arrVals(getCVS(currcv)); //load cvs on combo box
	document.getElementById('category').innerHTML = arrVals(getCategories(cv)); //load categories on combo box

	//fill information of user
	document.getElementById('profile_sp').innerHTML='<div class="top"><img src="'+avatar+'" height="150" width="150" align="center" border="1px solid #C0C0C0"></div><p style="margin-right:10px;margin-top:10px"><b>Name</b>:<span class="hName">'+' '+cv.header.name+'</span><br><b>Phone</b>:<span class="hPhone">'+' '+cv.header.phone+'</span><br><b>Address</b>:<span class="hAddr">'+' '+cv.header.address+'</span></p><br>';
	var cvName;
	if(getCVS(currcv).length!==0){
		cvName= getCVS(currcv)[0]; //Get first element of array
		$('#cv_sp').attr('hasCV','true');
	}else{
		cvName= 'None';
		$('#cv_sp').attr('hasCV','false');
	}
	document.getElementById('full_sp').innerHTML = fullcvParser(cv);
	document.getElementById('cv_sp').innerHTML = currentcvParser(cv,currcv);	
	drawTree(cv,currcv,"#cvtree");
	addInit(cv,currcv);
	addCV(cv,currcv);
	editableInit(cv,currcv);	
	document.getElementById('cvnamelabel').innerHTML = 'Current : '+cvName;	
	if(hasStarted !== 'True'){$('#tutorial').tutorial();}
	if($("#cvs").val() !== null && $("#templates").val() !== null){
		var href = "/export?title=" + $("#cvs").val().replace(/_/g, "+") + "&template=" + $("#templates").val().replace(/ /g,"+"); 
		$("#export-pdf").attr("href", href);
	}
}