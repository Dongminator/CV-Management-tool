/*global $ item:true cat_class:true categorylist:true counter:true cv:true itemlist:true findHidden:true findHiddenCats:true drawTree:true toggle:true setHiddenCats:true sendData:true currcv:true sendResource:true getTreeJson:true moveObject:true saveData:true saveResource:true itemcounter:true*/
/*jshint  unused:false*/
// Creates a JSON file for JSTree. This file is created using the current cv and total tree
function getTreeJson(file,currcvs){
  "use strict";
  var treeJSON={"data": []};
	//create JSON file for the tree

	//create whole CV tree
	treeJSON.data[0]={"data":"All Items","state":"closed","children":[]};

	for(var i=0;i<file.category.length;i++){
		treeJSON.data[0].children[i]={"data":file.category[i].title,"children":[],"state":"open","attr":{id:file.category[i].id}};
		for(var j=0;j<file.category[i].item.length;j++){
			treeJSON.data[0].children[i].children[j]={"data":file.category[i].item[j].description,"attr":{id:file.category[i].item[j].id}};
		}
	}

	//current cv's
	//load cv data to hashmap JSON file
	var hashmap={};
	for(var k=0;k<file.category.length;k++){
		hashmap[file.category[k].id]=file.category[k].title;
		for(var l=0;l<file.category[k].item.length;l++){
			hashmap[file.category[k].item[l].id]=file.category[k].item[l].description;
		}
	}

	//add cv details to tree
	for(var m=0;m<currcvs.currentcv.length;m++){
		treeJSON.data[m+1]={"data":currcvs.currentcv[m].title,"state":"closed","children":[]};
		for(var n=0;n<currcvs.currentcv[m].content.length;n++){
			treeJSON.data[m+1].children[n]={"data":hashmap[currcvs.currentcv[m].content[n].category],"children":[],"state":"open","attr":{id:currcvs.currentcv[m].content[n].category,cv:currcvs.currentcv[m].title}};
			for(var x=0;x<currcvs.currentcv[m].content[n].order.length;x++){
				treeJSON.data[m+1].children[n].children[x]={"data":hashmap[currcvs.currentcv[m].content[n].order[x]],"attr":{id:currcvs.currentcv[m].content[n].order[x],cv:currcvs.currentcv[m].title}};
			}
		}
	}

	return treeJSON;
}

//change order of items in the current cv
//pos=[before|after], obj=objectid,parent=parentid and cv=nameofcv
function moveObject(currcv,data){
  "use strict";
	if(data.rslt.op.attr('id')){
		//item has been moved
		var rpos,opos;
		//locate item and switch positions
		for(var i=0;i<currcv.currentcv.length;i++){
			//data.rslt.o.atta('cv') is the cv name in which change is made
			if(currcv.currentcv[i].title===data.rslt.o.attr('cv')){
				for(var j=0;j<currcv.currentcv[i].content.length;j++){
					//data.rslt.op.attr('id') is parent node id
					if(currcv.currentcv[i].content[j].category===data.rslt.op.attr('id')){
						//locate original item and remove it
						opos=currcv.currentcv[i].content[j].order.indexOf(data.rslt.o.attr('id'));
						var item=currcv.currentcv[i].content[j].order[opos];
						currcv.currentcv[i].content[j].order.splice(opos,1);

						//add item at right position
						rpos=currcv.currentcv[i].content[j].order.indexOf(data.rslt.r.attr('id'));
						//switch the items
						if(data.rslt.p==="before"){
							currcv.currentcv[i].content[j].order.splice(rpos,0,item);
						}else if(data.rslt.p==="after"){
							currcv.currentcv[i].content[j].order.splice(rpos+1,0,item);
						}else if(data.rslt.p==="last"){
							currcv.currentcv[i].content[j].order.splice(currcv.currentcv[i].content[j].order.length+1,0,item);
						}else if(data.rslt.p==="first"){
							currcv.currentcv[i].content[j].order.splice(0,0,item);
						}
						break;
					}
				}
				break;
			}
		}
	}else{
		//category has been moved
		var rpos2,opos2;
		//locate item and switch positions
		for(var y=0;y<currcv.currentcv.length;y++){
			//data.rslt.o.atta('cv') is the cv name in which change is made
			if(currcv.currentcv[y].title===data.rslt.o.attr('cv')){
				var list=[];
				for(var z=0;z<currcv.currentcv[y].content.length;z++){
					list[z]=currcv.currentcv[y].content[z].category;
				}
				//locate original item and remove it
				opos2=list.indexOf(data.rslt.o.attr('id'));
				var itm=currcv.currentcv[y].content[opos2];
				currcv.currentcv[y].content.splice(opos2,1);

				//add item at right position
				rpos2=list.indexOf(data.rslt.r.attr('id'));
				//switch the items
				if(data.rslt.p==="before"){
					currcv.currentcv[y].content.splice(rpos2,0,itm);
				}else if(data.rslt.p==="after"){
					currcv.currentcv[y].content.splice(rpos2,0,itm);
				}else if(data.rslt.p==="last"){
					currcv.currentcv[y].content.splice(currcv.currentcv[y].content.length+1,0,itm);
				}else if(data.rslt.p==="first"){
					currcv.currentcv[y].content.splice(0,0,itm);
				}
				break;
			}
		}
	}
	return currcv;
}

function fullcvParser(cvtotal){
  "use strict";
	var full_cv = '';
	
	var show = '<li class="hrz"><a href="#Min" class="showbutton" title="Toggle hide/show item" style="width:20px; height:16px; font-size:4px"></a></li>';
	var del = '<li class="hrz"><a href="#Min" class="delitem" title="Delete item from full resource" style="width:20px; height:16px; font-size:1px"></a></li>';
	var add = '<li class="hrz"><a href="#Min" class="addtocur" title="Add item to current CV" style="width:20px; height:16px; font-size:4px"></a></li>';
	
	var buttondiv = '<div style="float:right"><ul>'+show+add+del+'</ul></div>';
	
	var addcat = '<li class="hrz"><a href="#Min" class="addcat" title="Add category to current CV" style="width:33px; height:16px"></a></li>';
	var showcat = '<li class="hrz"><a href="#Min" class="showcat" toggle="false" title="Toggle hide/show items in this category" style="width:33px; height:16px"></a></li>';
	var removecat = '<li class="hrz"><a href="#Min" class="removecat" title="Delete category from full resource" style="width:33px; height:16px"></a></li>';

	var addcatdiv = '<div style="float:right"><ul>'+showcat+addcat+removecat+'</ul></div>'; //used for adding categories
	
	for(var i = 0; i < cvtotal.category.length; i++){
		var cat_class = cvtotal.category[i].title.replace(/\s+/g, "_");
		
		full_cv += '<div id="' + cat_class + '" class="cvcategory" cvid="' +cvtotal.category[i].id+ '">'+addcatdiv+'<h3 class="category_title">'+ cvtotal.category[i].title +'</h3><ul class="items">';

		for(var j = 0; j < cvtotal.category[i].item.length; j++){
			full_cv += '<li id="' + cvtotal.category[i].item[j].id + '" class="item"><div class="hidable">'+buttondiv+'<h3 class="hide">' + cvtotal.category[i].item[j].description + '</h3><p><span id="span' + cvtotal.category[i].item[j].id + '" class="editable">' + cvtotal.category[i].item[j].content + '</span></p></div></li>';
		}

		full_cv += '</ul></div>';
	}

	return full_cv;
}

function currentcvParser(cvtotal,currcv){
  "use strict";
	if(cvtotal.category.length === 0 || $('#cvs').val() === null){
		return '';
	}else{
	
		var current_cv = '';
		var cvI;
		var cvName=$("#cvs").val().replace(/_/g," ");
		
		//determine cv index
		for(var i=0;i<currcv.currentcv.length;i++){
			if(currcv.currentcv[i].title===cvName){
				cvI=i;
				break;
			}
		}
	
		//gather id and its data in a hashmap
		var hashmap={};
		for(var c=0;c<cvtotal.category.length;c++){
			hashmap[cvtotal.category[c].id]=cvtotal.category[c].title;
			for(var d=0;d<cvtotal.category[c].item.length;d++){
				hashmap[cvtotal.category[c].item[d].id]={"description":cvtotal.category[c].item[d].description,"content":cvtotal.category[c].item[d].content};
			}
		}
		
		var show = '<li class="hrz"><a href="#Min" class="showbutton" toggle="true" title="Toggle hide/show item" style="width:33px; height:16px"></a></li>';
		var del = '<li class="hrz"><a href="#Min" class="delbutton" title="Remove item from current CV" style="width:33px; height:16px"></a></li>';
		var buttondiv = '<div style="float:right"><ul>'+show+del+'</ul></div>';
		
		var delcat = '<li class="hrz"><a href="#Min" class="delcat" title="Remove category from current CV" style="width:33px; height:16px"></a></li>';
		var showcat = '<li class="hrz"><a href="#Min" class="showcat" toggle="true" title="Toggle hide/show items in this category" style="width:33px; height:16px"></a></li>';
	
		var delcatdiv = '<div style="float:right"><ul>'+showcat+delcat+'</ul></div>'; //used for removing categories
		
		for(var p = 0; p < currcv.currentcv[cvI].content.length; p++){
			var cat_class = hashmap[currcv.currentcv[cvI].content[p].category].replace(/\s+/g, "_");
			
			current_cv += '<div id="current_' + cat_class + '" class="currentcat" cvid="' + currcv.currentcv[cvI].content[p].category + '">'+delcatdiv+'<h3 class="category_title">'+ hashmap[currcv.currentcv[cvI].content[p].category] +'</h3><ul class="current_items">';
	
			for(var j = 0; j < currcv.currentcv[cvI].content[p].order.length; j++){
				var description=hashmap[currcv.currentcv[cvI].content[p].order[j]].description;
				var content=hashmap[currcv.currentcv[cvI].content[p].order[j]].content;
	
				current_cv += '<li id="curr' + currcv.currentcv[cvI].content[p].order[j] + '" class="item"><div class="hidable">'+buttondiv+'<h3 class="hide">' + description + '</h3><p><span id="span' +currcv.currentcv[cvI].content[p].order[j]+ '" class="editable">' + content + '</span></p></div></li>';
			}
	
			current_cv += '</ul></div>';
		}
	
		return current_cv;
	}
}

//recreates the currentcv json file from the middle section
function saveData(totcv,currcv){
  "use strict";
	if($('#cvs').val()!==null){
          //determine cv index
		var cvName=$("#cvs").val().replace(/_/g," ");
		var cvI;
	
		for(var i=0;i<currcv.currentcv.length;i++){
			if(currcv.currentcv[i].title===cvName){
				cvI=i;
				//reset JSON data
				currcv.currentcv[cvI].content=[];
				break;
			}
		}
		
		//get ids out of the document
		var categorylist=document.getElementById('cv_sp').getElementsByTagName("div");
		var counter=0;//used while adding to currcv JSON file
		var contentmap={};//content and ids stored temporarily
		
		cv.header.name = $(".hName").text();
		cv.header.phone = $(".hPhone").text();
		cv.header.address = $(".hAddr").text();
	
		
		//modify entry in currcv JSON file
		for(var a=0;a<categorylist.length;a++){
			if(categorylist[a].getAttribute("class")==="currentcat"){
				//modify JSON file
				var catid=categorylist[a].getAttribute("cvid");
				currcv.currentcv[cvI].content[counter]={"category":catid,"order":[]};
				//temporary map
				contentmap[catid]={};
				
				//get items
				var patt=/curr/g;
				var itemlist=categorylist[a].getElementsByClassName("item");
				for(var j=0;j<itemlist.length;j++){
					if(itemlist[j].getAttribute('class')==='item'){ //added to disregard list hrz used for buttons
						//modify JSON file
						var itemid=itemlist[j].getAttribute("id").replace(patt,"");
						currcv.currentcv[cvI].content[counter].order[j]=itemid;
						contentmap[catid][itemid]=itemlist[j].getElementsByTagName("p")[0].textContent;
					}
				}
				counter++;
			}
		}
	
		//modify contents in totalcv JSON
		for(var q=0;q<totcv.category.length;q++){
			var catid2=totcv.category[q].id;
			for(var r=0;r<totcv.category[q].item.length;r++){
				var itemid2=totcv.category[q].item[r].id;
				if(contentmap[catid2] && contentmap[catid2][itemid2]){
					totcv.category[q].item[r].content=contentmap[catid2][itemid2];
				}
			}
		}
	}
	//get items and cats that are hidden
	var hiddenones = findHidden();
  var hiddencats = findHiddenCats();
  //redraw tree, middle section right side bar
  document.getElementById('cv_sp').innerHTML = currentcvParser(cv,currcv);
	document.getElementById('full_sp').innerHTML = fullcvParser(cv);
	drawTree(cv,currcv,"#cvtree");
	
	//keep state of hidden and visible items
	toggle(hiddenones);
	setHiddenCats(hiddencats);
	
	//save change to server
	sendData(cv, currcv);
}

//recreates totalcv json file from the resource section
function saveResource(totcv){
  "use strict";
	//get ids out of the document
	var categorylist=document.getElementById('full_sp').getElementsByTagName("div");
	totcv.category=[];
	var counter=0;
	var itemcounter=0;
	
	cv.header.name = $(".hName").text();
	cv.header.phone = $(".hPhone").text();
	cv.header.address = $(".hAddr").text();
	
	for(var i=0;i<categorylist.length;i++){
		if(categorylist[i].getAttribute("class")==="cvcategory"){
			var catname=categorylist[i].getElementsByTagName("h3")[0].textContent;
			var catid=categorylist[i].getAttribute("cvid");
			//add information to JSON file
			totcv.category[counter]={"title":catname,"id":catid,"item":[]};

			//add items to the category
			var itemlist=categorylist[i].getElementsByClassName("item"); //itemlist=categorylist[i].getElementsByTagName("li") before, changed to specifically only get 'item'
			
			for(var j=0;j<itemlist.length;j++){
				var itemid=itemlist[j].getAttribute("id");
				var itemdesc=itemlist[j].getElementsByTagName("h3")[0].textContent;
				var content=itemlist[j].getElementsByTagName("p")[0].textContent; //for some reason span is being disregarded
				//add information to JSON file
				
				totcv.category[counter].item[j]={"id":itemid,"description":itemdesc,"content":content};
			}
			counter++;
		}
	}
	//redraw tree
	drawTree(cv,currcv,"#cvtree");
	
	//save change to server
	sendResource(cv);
}