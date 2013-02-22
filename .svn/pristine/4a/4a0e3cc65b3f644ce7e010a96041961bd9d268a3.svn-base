/*global $ getTreeJson moveObject currentcvParser saveResource saveData sortableInit buttonsInit getCVS arrVals*/
/*jshint unused:false */
function scrollToCats(realid){
  "use strict";
	var found = false;
	
	var catlist = document.getElementById('cv_sp').getElementsByClassName('currentcat');

	for(var i=0; i<catlist.length; i++){
		var catid = catlist[i].getAttribute('cvid');
		if(catid===realid){
			found = true;
			var actualid = catlist[i].getAttribute('id');
			$('html,body').animate({ scrollTop: $('#'+actualid).offset().top }, { duration: 'slow', easing: 'swing'});
			$('#cv_sp').animate({ scrollTop: $('#'+actualid).offset().top }, { duration: 'slow', easing: 'swing'});
			return true;
		}
	}
	
	catlist = document.getElementById('full_sp').getElementsByClassName('cvcategory');

	if(found===false){

		for(var j=0; j<catlist.length; j++){
			var catid2 = catlist[j].getAttribute('cvid');
			if(catid2===realid){
				var actualid2 = catlist[j].getAttribute('id');
				$('html,body').animate({ scrollTop: $('#'+actualid2).offset().top }, { duration: 'slow', easing: 'swing'});
				$('#full_sp').animate({ scrollTop: $('#'+actualid2).offset().top }, { duration: 'slow', easing: 'swing'});
				return true;
			}
		}
	}
	
	return false;
}

function drawTree(file,currcvs,tagid){
  "use strict";
	$(tagid)

	.jstree({ 
		"core" : {
			"animation" : 0,
			"initially_open" : [ "a" ]
		},
		"themes" : {
			"theme" : "classic",
			"dots" : true,
			"icons" : false
		},
		"crrm" : {
			"move" : {
				"check_move" : function (m) {
                                  var p = this._get_parent(m.o);
                                  if(!p) { return false; }
                                  p = p === -1 ? this.get_container() : p;
                                  if(p === m.np) { return true; }
                                  if(p[0] && m.np[0] && p[0] === m.np[0]) { return true; }
                                  
                                  return false;
				}
			}
		},
		"dnd" : {
			"drop_target" : false,
			"drag_target" : false
		},
		
		"json_data" : getTreeJson(file,currcvs),
		"plugins" : [ "themes", "json_data", "crrm", "dnd", "ui" ]
	})
	
	// 1) if using the UI plugin bind to select_node
        .bind("move_node.jstree", function (event, data) {
			if(data.rslt.o.attr('cv')){

				currcvs=moveObject(currcvs,data);

				//redraw the middle section
				document.getElementById('cv_sp').innerHTML = currentcvParser(file,currcvs);
			}else{
				saveResource(file);
				saveData(file,currcvs);
			}
			saveResource(file);
			saveData(file,currcvs);
			sortableInit();
			buttonsInit();
        })
        
        .bind("select_node.jstree", function (event, data) { 
			// `data.rslt.obj` is the jquery extended node that was clicked
          var pattern = /[\d]+/;
          var realid = ''+pattern.exec(data.rslt.obj.attr('id'));
          var cv = data.rslt.obj.children('a').text().trim();
          var cvs = getCVS(currcvs);
          if(cvs.indexOf(cv)!==-1){
            document.getElementById('cvs').innerHTML = arrVals(cvs); //load cvs on combo box
            $("#cvs").val(cv.replace(/\s+/g,'_'));
            document.getElementById('cv_sp').innerHTML = currentcvParser(file,currcvs);
            document.getElementById('cvnamelabel').innerHTML = 'Current Curriculum Vitae : '+cv;
            sortableInit();
            buttonsInit();
          }else{
            var bool = scrollToCats(realid);
            if(bool === false){
				if(document.getElementById('curr'+realid)){
						$('html,body').animate({ scrollTop: $('#curr'+realid).offset().top }, { duration: 'slow', easing: 'swing'});
						$('#cv_sp').animate({ scrollTop: $('#curr'+realid).offset().top }, { duration: 'slow', easing: 'swing'});
					}else if(document.getElementById(realid)){
						$('html,body').animate({ scrollTop: $('#'+realid+'.item').offset().top }, { duration: 'slow', easing: 'swing'});
						$('#full_sp').animate({ scrollTop: $('#'+realid+'.item').offset().top }, { duration: 'slow', easing: 'swing'});
					}
                        }
                }
        });
}