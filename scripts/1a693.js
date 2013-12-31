/***************************************************************************
 *                                                                         *
 *   Copyright (C) 2013 by Kinnective LLC                                   *
 *                                                                         *
 *   http://www.kinnective.com                                             *
 *                                                                         *
 ***************************************************************************/
//other pages need access to a few variables
var kinn={};
var downloadedHTML="";
(function(){
    var server = "http://www.kinnective.com/";
    var mainWid;
    var mainHt;
    var dropInto=false;
    var dropIntoTarget=null;
    var droppingTarget=null;
    var droppingParent=null;
    var droppingDirection=null;
    var droppingSide=null;
    var oldDataBarOver;
    var container;
    var conString;
    var pageString;
    var waypID;
   var warning=false;
   var diff;
   var scrollToY=0;
   var thisScroller;
   var mouseLog = [];
   var momentum=null;
   var scrollContainer;
   kinn.downloadedHTML=downloadedHTML;
   var adding=false;
   var cutting=false;
   var pasting=false;
   var copying=false;
   var scrolling=false;
   var searchOrigin="ours";
   var copyOrigin="ours";
   var patience=0;
   var urlParams={};
   var captchaFlag;
   var dataObj;
   var loaded=0;
   var isSafari;
   var isAndroid;
   var isKindle;
   var discussBCS="";
   var discussTitle="";
   var copiesFlag="";
   var yoursModel=[]; 
   var oursModel=[];
   var searchModel=[];
   var copiesModel=[];
   var upload=false;
   var copiesCheckedModel=[];
   var oursCheckedModelFull=[];
   var oursCheckedModelEmpty=[];
   var yoursCheckedModelFull=[];
   var yoursCheckedModelEmpty=[];
   var searchCheckedModel=[];
   var editID;
   var oursWaypointID=-1;
   var yoursWaypointID=-1;
   var discussWaypointID=-1;
   var editWaypointID=-1;
   var oursBCS="";
   var yoursBCS="";
   var yoursUrlVar;
   var dragger={};
   var dragging=false;
   var shifting=false;
   var mousePosYNew = 0;
   var MousePosXNew = 0;
   var mousePos=0;
   var zNumber=2;
   var bottomLimit;
   var scrollBottomH;
   var interV;
   var adder=0;
   var win;
   var kinnT=new Date();
   var kinnTString=kinnT.toString();
//channeling both touch and mouse events into a set of custom events we can work with across devices
    var TouchMouseEvent={
          DOWN: "touchmousedown",
          UP: "touchmouseup",
          MOVE: "touchmousemove"
       };
    var jQueryDocument = $(document);
    if (isTouchDevice()) {
        jQueryDocument.on("touchstart", function(e){
            onTouchEvent(e);
        });
        jQueryDocument.on("touchmove", function(e){
            onTouchEvent(e);
        });
        jQueryDocument.on("touchend", function(e){
            onTouchEvent(e);
        });
    } else {
        jQueryDocument.on("mousedown", function(e){
            onMouseEvent(e);
        });
        jQueryDocument.on("mousemove", function(e){
            onMouseEvent(e);
        });
        jQueryDocument.on("mouseup", function(e){
            onMouseEvent(e);
        });
    }
    function onMouseEvent(event) {
            var type;
            switch (event.type) {
                case "mousedown":
                type = TouchMouseEvent.DOWN;
                break;
                case "mouseup":
                type = TouchMouseEvent.UP;
                break;
                case "mousemove":
                type = TouchMouseEvent.MOVE;
                break;
                default:
                return;
            }
            var touchMouseEvent = normalizeEvent(type, event, event.pageX, event.pageY);
            $(event.target).trigger(touchMouseEvent);
    }
    function onTouchEvent(event) {
      var type;
      switch (event.type) {
         case "touchstart": 
         type=TouchMouseEvent.DOWN; 
         break;
         case "touchend": 
         type=TouchMouseEvent.UP; 
         break;
         case "touchmove": 
         type=TouchMouseEvent.MOVE; 
         break;
         default:
         return;
      }
      var touch=event.originalEvent.touches[0];
      var touchMouseEvent;
      if (type == TouchMouseEvent.UP){
      touchMouseEvent=normalizeEvent(type, event, null, null);
      }else{
      touchMouseEvent=normalizeEvent(type, event, touch.pageX, touch.pageY);
      }
      $(event.target).trigger(touchMouseEvent);
    }
    function normalizeEvent(type, original, x, y) {
      return $.Event(type, {
      pageX: x,
      pageY: y,
      originalEvent: original
      });
   }
   $(document).bind("mobileinit", function(){
       $.mobile.loadingMessageTextVisible=true;
   });
   $(document).ready(function(){
      $.mobile.defaultPageTransition="none";
      attachHandlers();
      isSafari=navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false ;
      isAndroid=navigator.userAgent.match(/android/i) ? true : false ;
      isKindle=navigator.userAgent.match(/Silk/i) ? true : false ;
      touchScroll();
      $('.ui-content').css('padding','0');
      $('#userid').replaceWith($('#username'));
      $('#userpassword').replaceWith($('#password'));
      winW=$(window).width();
      winH=$(window).height();
      if(winW == 320 && winH > 370){
          $('.mainContainer').css('height',winH);
      }
      mainWid=$('.mainContainer').width();
      mainHt=$('mainContainer').height();
      $('.pageMain').css('width','100%');
      if(winW < 770){
         $('.fiveBtns').remove();
      }else if(winW >= 770){
          $('.fourBtns').remove();
      }
      if(isKindle){
         $('<br/>').prependTo('#copies .mainContainer');
      };
   });
   loaded++;
   resetStack();
   captchaFlag=false;
   dataObj={};
   if(window.location.search) {
        var dec=decodeURIComponent(window.location.search);
        var qArr=dec.split("kinnectiveURL=");
        var qArr1=qArr[1].split("&kinnectiveTitle=");
        urlParams.url=qArr1[0];
        urlParams.title=qArr1[1];
     }
     if(window.location.hash){
        var hash=window.location.hash;
        if(hash.indexOf('?') > -1){
           var hashArr1=hash.split('?');
           var qArr2=hashArr1[1].split("&");
           var lengthQ=qArr2.length;
           for (var i=0; i < lengthQ; i++){
              var iSplit=qArr2[i].split('=');
              dataObj[iSplit[0]]=iSplit[1]; 
           }
        }
      }
      if(kinnGoogParams.title != undefined){
         urlParams.url=kinnGoogParams.url;
         urlParams.title=decodeURIComponent(kinnGoogParams.title);
      }
      $.ajax({
           type:'GET',
           contentType: 'application/x-www-form-urlencoded',
           dataType:'xml',
           url:server +'kinnective4/fullway30e.php',
               data:{
                  command:"47"
               },
           success: function(data) {
              var getOursX=data;
              var tester=$(getOursX).find('status').text();
              var patt=/ERROR/;
              if(patt.test(tester)){
                 setTimeout(function(){sign();},1500);
              }
              else if(!patt.test(tester) && urlParams.title){
                 $('#username').val("");
                 $('#password').val("");
                 $('#signInForm').hide();
                 $('#signInDiv').hide();
                 $('#signInSuccess').show();
                 getOurs();
                 getYours();
                 if(urlParams.title){
                    $('#oursGoToAdd').addClass('ui-btn-active');
                    $('#yoursGoToAdd').addClass('ui-btn-active');
                 }
              }
              else if(!patt.test(tester) && !urlParams.title){
                 $('#username').val("");
                 $('#password').val("");
                 $('#signInForm').hide();
                 $('#signInDiv').hide();
                 $('#signInSuccess').show();
                 getOurs();
                 getYours();
              }
              
           },
           error: function(jqXHR, textStatus, errorThrown) {
              createAlertBox("Network error. Please try again later.");
           },
           complete: function(jqXHR, textStatus) {
              
           }
     });
    function attachHandlers(){
          $(window).resize(function(e){
          winW=$(window).width();
          winH=$(window).height();
          if(winW == 320 && winH > 370){
              $('.mainContainer').css('height',winH);
          }
          mainWid=$('.mainContainer').width();
          mainHt=$('mainContainer').height();
          $('.pageMain').css('width','100%');
          if(winW < 770){
             $('.fiveBtns').remove();
          }else if(winW >= 770){
              $('.fourBtns').remove();
          }
          if(isKindle){
             $('<br/>').prependTo('#copies .mainContainer');
          };
      });
      $('#yoursSearchBtn, #yoursSearchBtn2').on('click',function(e){
          searchOrigin="yours";
          $.mobile.changePage("#searchAdd")
      });
     $('#oursSearchBtn, #oursSearchBtn2').on('click',function(e){
         e.preventDefault();
          searchOrigin="ours";
          $.mobile.changePage("#searchAdd");
      });
      $('#searchDone').on('click',function(e){
          if(searchOrigin=="yours"){
                  $.event.trigger({
                       type:"yoursTrigger",
                       button: "searchDoneBtn"
                   });
          }else{
                  $.event.trigger({
                       type:"oursTrigger",
                       button: "searchDoneBtn"
                   });
          }
      });
      $('#searchDone1').on('click',function(e){
          if(searchOrigin=="yours"){
                  $.event.trigger({
                       type:"yoursTrigger",
                       button: "searchDoneBtn"
                   });
          }else{
                  $.event.trigger({
                       type:"oursTrigger",
                       button: "searchDone1"
                   });
          }
      });
      $('#sb').click(function(e){
         upload=true;
         $('#downloadResult').hide();
      });
      $('#searchBackBtn').on('click',function(e){
         var newSearch;
         if(searchModel.length > 2){
            searchModel.pop();
            newSearch=searchModel.pop();
            renderSearchView(newSearch);
            searchCheckedModel=[];
         }else if(searchModel.length == 2){
            $('#searchInfoSpan').text("Search");
            searchModel.pop();
            newSearch=searchModel.pop();
            renderSearchView(newSearch);
            searchCheckedModel=[];
         }else if(searchModel.length < 2){
            createAlertBox("Can't regress past original search results.");
         }
      });
      $('.scrollUp').on('focus',function (t){
                     var off=$(this).offset();
                     var offTop = "" + off.top -25;
                     $('body').scrollTop(offTop);
      });
     $(".cancelAction").click(function(e) {
           $('.mainContainer').scrollTop(0);
     });
     $('body').on('oursTrigger', function(e){
        $.mobile.changePage("#ours");
        var dat={};
        dat.node=oursWaypointID;
        dat.command="9";
        getOursAgain(dat);
        oursBtns();
     });
     $('body').on('yoursTrigger', function(e){
        $.mobile.changePage("#yours");
        var dat={};
        dat.node=yoursWaypointID;
        dat.command="9";
        getYoursAgain(dat);
        yoursBtns();
     });
     $('#searchAdd').on('pageshow', function(e){
        $('input:checked').attr("checked",false);
        $('#searchOrphans').attr("checked",false);
        $('#searchOrphans').checkboxradio("refresh");
        $('#searchIn').focus();
        $('#searchIn').val("");
     });
     $('#searchIn').keydown(function (e){
           if(e.keyCode == 13){
              $('#searchAddBtn').trigger('click');
           }
     });
     $('#folderIn').keydown(function (e){
           if(e.keyCode == 13){
              $('#oursDoneAddBtn').trigger('click');
           }
     });
     $('#newTitleIn').keydown(function (e){
           if(e.keyCode == 13){
              $('#newTitleSubmit').trigger('click');
           }
     });
     $('#linkIn').keydown(function (e){
           if(e.keyCode == 13){
              $('#oursDoneAddBtn').trigger('click');
           }
     });
     $('#yoursFolderIn').keydown(function (e){
           if(e.keyCode == 13){
              $('#yoursDoneAddBtn').trigger('click');
           }
     });
     $('#yoursLinkIn').keydown(function (e){
           if(e.keyCode == 13){
              $('#yoursDoneAddBtn').trigger('click');
           }
     });
     $('#commentIn').keydown(function(e){
         if(e.keyCode == 13){
             $('#commentAddBtn').trigger('click');
         }
     });
     $('#add').on('pageshow', function(e){
           $('#addContainer').trigger('create');
           if(urlParams.url){
                 $('#radioLink').attr("checked",true).checkboxradio("refresh");
                 $('#radioFolder').attr("checked",false).checkboxradio("refresh");
                 $('#linkInput').show();
                 $('#folderIn').val(urlParams.title);
                 $('#linkIn').val(urlParams.url);
           }else if(!urlParams.url){
                 $('#radioFolder').attr("checked",true).checkboxradio("refresh");
                 $('#radioLink').attr("checked",false).checkboxradio("refresh");
                 $('#folderIn').val("");
                 $('#linkIn').val("");
                 $('#linkInput').hide();
           }
           if($('#folderIn').val().length > 26 && warning==false){
              createAlertBox("The title exceeds 26 characters. Please shorten or it will be clipped.");
              warning=true;
          }
           $('#folderIn').focus();
     });
     $('#yoursAdd').on('pageshow', function(e){
           $('#yoursAddContainer').trigger('create');
           if(urlParams.url){
                 $('#yoursRadioLink').attr("checked",true).checkboxradio("refresh");
                 $('#yoursRadioFolder').attr("checked",false).checkboxradio("refresh");
                 $('#yoursLinkInput').show();
                 $('#yoursFolderIn').val(urlParams.title);
                 $('#yoursLinkIn').val(urlParams.url);
           }else if(!urlParams.url){
                 $('#yoursRadioFolder').attr("checked",true).checkboxradio("refresh");
                 $('#yoursRadioLink').attr("checked",false).checkboxradio("refresh");
                 $('#yoursFolderIn').val("");
                 $('#yoursLinkIn').val("");
                 $('#yoursLinkInput').hide();
           }
          if($('#yoursFolderIn').val().length > 26 && warning==false){
              createAlertBox("The title exceeds 26 characters. Please shorten or it will be clipped.");
              warning=true;
              //return false;
          }
           $('#yoursFolderIn').focus();
     });
     $("#oursAddForm").submit(function(){
        return false;
     });
     
     $("#yoursAddForm").submit(function(){
        return false;
     });
     $('#discussAdd').click(function(e) {
           $('#commentIn').val("");
     });
     $('#oursHomeBtn').click(function(e) {
                 oursModel=[];
                 var params={};
                 params.command=90;
                 getOursAgain(params);
     });
     $('#yoursHomeBtn').click(function(e) {
                 yoursModel=[];
                 var params={};
                 params.command=91;
                 getYoursAgain(params);
     });
     $('#watchAdd').click(function(e) {
         var node=oursWaypointID;
         $.ajax({
               type:'GET',
               contentType: 'application/x-www-form-urlencoded',
               dataType:'xml',
               url:server +'kinnective4/fullway30e.php',
               data:{
                     xml:1,
                     command:36,
                     node:node
                },
               success: function(data) {
                     var getOursX=data;
                     var tester=$(getOursX).find('status').text();
                     var patt=/ERROR/;
                     var patt2=/OK/;
                     if(patt.test(tester)){
                           createAlertBox(tester.substring(10));
                     }
                     else if(patt2.test(tester)){
                        createAlertBox("Watch added.");
                     }
               },
               error: function(jqXHR, textStatus, errorThrown) {
                     createAlertBox("Network error. Please try again later." + "  " + errorThrown);
               },
               complete: function(jqXHR, textStatus) {
                  var to=setTimeout(function(){
                  $.mobile.changePage('#discuss');
                  },3000);
               }
         });
     });
     $('#watchSubtract').click(function(e) {
           var node=oursWaypointID;
           $.ajax({
                 type:'GET',
                 contentType: 'application/x-www-form-urlencoded',
                 dataType:'xml',
                 url:server +'kinnective4/fullway30e.php',
                 data:{
                       xml:1,
                       command:54,
                       node:node
                  },
                 success: function(data) {
                       var getOursX=data;
                       var tester=$(getOursX).find('status').text();
                       var patt=/ERROR/;
                       var patt2=/OK/;
                       if(patt.test(tester)){
                             createAlertBox(tester.substring(10));
                       }
                       else if(patt2.test(tester)){
                          createAlertBox("Watch has been removed");
                       }
                       //createAlertBox("Your comment has been posted");
                 },
                 error: function(jqXHR, textStatus, errorThrown) {
                       createAlertBox("Network error. Please try again later." + "  " + errorThrown);
                 },
                 complete: function(jqXHR, textStatus) {
                       var to=setTimeout(function(){
                          $.mobile.changePage('#discuss');
                          },3000);
                 }
           });
     });
     $('#pingAdd').click(function(e) {
         var node=oursWaypointID;
         $.ajax({
               type:'GET',
               contentType: 'application/x-www-form-urlencoded',
               dataType:'xml',
               url:server +'kinnective4/fullway30e.php',
               data:{
                     xml:1,
                     command:37,
                     node:node
                },
               success: function(data) {
                     var dat=data;
                     var tester=$(dat).find('status').text();
                     var patt=/ERROR/;
                     var patt2=/OK/;
               if(patt.test(tester)){
                     createAlertBox(tester.substring(10));
               }else if(patt2.test(tester)){
                     createAlertBox("Query has been sent to all the users watching this node.");
               }
               $.mobile.changePage('#discuss');
                     //createAlertBox("Your comment has been posted");
               },
               error: function(jqXHR, textStatus, errorThrown) {
                     createAlertBox("Network error. Please try again later." + "  " + errorThrown);
               },
               complete: function(jqXHR, textStatus) {

               }
         });
     });
     //function below is firing twice for no reason I can see[art]
     $('#uploadAdd').click(function(e) {
           if(this.checked == true){
              document.forms.upLoaderForm.elements.add.value='1';
           }
           else if(this.checked != true){
              document.forms.upLoaderForm.elements.add.value='0';
           }
     });
     $('#searchOrphans').click(function(e) {
           if(this.checked == true){
              adder=1;
           }
           else if(this.checked != true){
              adder=0;
           }
     });
     $('#radioFolder').change(function() {
                 if(this.checked == true){
                       $('#linkInput').hide();
                       //$('#folderIn').focus();
                 }
     });
     $('#radioLink').change(function() {
                 if(this.checked == true){
                       $('#linkInput').show();
                 }
     });
     $('#yoursRadioFolder').change(function() {
                 if(this.checked == true){
                       $('#yoursLinkInput').hide();
                       //$('#yoursFolderIn').focus();
                 }
     });
     $('#yoursRadioLink').change(function() {
                 if(this.checked == true){
                       $('#yoursLinkInput').show();
                    //$('#yoursFolderIn').focus();
                 }
     });
     //reset the form on #add to make sure we start from scracth
     $('#oursDisNav').click(function(e) {
        discussBCS=$('#oursBCString').text();
        discussTitle=$('#oursTitleString').text();
        discussWaypointID=oursWaypointID;
        $('#discussHead').text('Discuss');
        getComments();
        var titleSt=oursModel[oursModel.length -1].title;
        $('#comTitleString').text(oursModel[oursModel.length -1].title);
     });
     $('#yoursDisNav').click(function(e) {
        discussBCS=$('#yoursBCString').text();
        discussTitle=$('#yoursTitleString').text();
        discussWaypointID=yoursWaypointID;
        $('#discussHead').text('Notes');
        getComments();
         $('#comTitleString').text(yoursModel[yoursModel.length -1].title);
     });
     $('#yoursEditTitleBtn').click(function(e){
        $('#existingTitleSpan').text($('#yoursTitleString').text());
        editWaypointID=yoursWaypointID;
        $.mobile.changePage('#editTitlePage');
     });
     $('#oursEditTitleBtn').click(function(e){
        $('#existingTitleSpan').text($('#oursTitleString').text());
        editWaypointID=oursWaypointID;
        $.mobile.changePage('#editTitlePage');
     });
     $('#newTitleSubmit').click(function(e){
        var newTitleInText=$('#newTitleIn').val();
        var newTitleID=editWaypointID;
        var command=84;
        $('#newTitleIn').val("");
        if(newTitleInText !=""){
           $.ajax({
              type:'GET',
              contentType: 'application/x-www-form-urlencoded',
              dataType:'xml',
              url:server +'kinnective4/fullway30e.php',
              data:{
                 xml:1,
                 command:command,
                 node:newTitleID,
                 way_title:newTitleInText
            },
              success: function(data) {
                 var xxx=data;
                 var tester=$(xxx).find('status').text();
                 var patt=/ERROR/;
                 var patt2=/OK/;
                 if(patt.test(tester)){
                    createAlertBox(tester.substring(10));
                 }else if(patt2.test){
                    createAlertBox("The title has been changed.");
                 }
              },
              error: function(jqXHR, textStatus, errorThrown) {
                 createAlertBox("Network error. Please try again later." + "  " + errorThrown);
           },
              complete: function(jqXHR, textStatus) {
                 if(editWaypointID == oursWaypointID){
                    $('#oursTitleString').text(newTitleInText);
                    $.mobile.changePage('#ours');
                 }else if(editWaypointID == yoursWaypointID){
                    $('#yoursTitleString').text(newTitleInText);
                    $.mobile.changePage('#yours');
                 }
                 
           }
           });
        }else if(newTitleInText == ""){
           createAlertBox("Please enter a new title.");
        }
     });
     $('#commentAddBtn').click(function(e) {
        var comm=$('#commentIn').val();
           var node=discussWaypointID;
           $.ajax({
              type:'GET',
              contentType: 'application/x-www-form-urlencoded',
              dataType:'xml',
              url:server +'kinnective4/fullway30e.php',
              data:{
                 xml:1,
                 command:12,
                 node:node,
                 comment:comm
            },
              success: function(data) {
                 var xxx=data;
                 var tester=$(xxx).find('status').text();
                 var patt=/ERROR/;
                 if(patt.test(tester)){
                       createAlertBox(tester.substring(10));
                 }else{
                    $.mobile.changePage('#discuss');
                    getComments();
                 }
              },
              error: function(jqXHR, textStatus, errorThrown) {
                 createAlertBox("Network error. Please try again later." + "  " + errorThrown);
           },
              complete: function(jqXHR, textStatus) {
                 
           }
           });
     });
         $('#editorUp').click(function(e){
         e.preventDefault();
         $.ajax({
            type:'GET',
            contentType: 'application/x-www-form-urlencoded',
            dataType:'xml',
            url:server +'kinnective4/fullway30e.php',
            data:{
               xml:1,
               command:73,
               edit_id:editID,
               vote:1
            },
            success: function(data) {
               var tester=$(data).find('status').text();
               var patt=/ERROR/;
               var patt2=/OK/;
               if(patt.test(tester)){
                  createAlertBox(tester.substring(10));
               }
               else if(patt2.test(tester)){
                  createAlertBox("Your vote has been registered..");//createAlertBox(editID);
               }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               createAlertBox("Network error. Please try again later.");
            },
            complete: function(jqXHR, textStatus) {
      
            }
         });
         
      });
      $('#seeHTMLBtn').on('click',function(e){
          if(localStorage.downloadedHTML){
              var wind = window.open("downloadedBookmarks.html");
          }
      });
      $('#editorDown').on('click',function(e){
         e.preventDefault();
         $.ajax({
            type:'GET',
            contentType: 'application/x-www-form-urlencoded',
            dataType:'xml',
            url:server +'kinnective4/fullway30e.php',
            data:{
               xml:1,
               command:73,
               edit_id:editID,
               vote:0
            },
            success: function(data) {
               var tester=$(data).find('status').text();
               var patt=/ERROR/;
               var patt2=/OK/;
               if(patt.test(tester)){
                  createAlertBox(tester.substring(10));
               }
               else if(patt2.test(tester)){
                  createAlertBox("Your vote has been registered..");//createAlertBox(editID);
               }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               createAlertBox("Network error. Please try again later.");
            },
            complete: function(jqXHR, textStatus) {
      
            }
         });
         
      });
      $('#searchAddBtn').click(function(e) {
            var searchT=$('#searchIn').val();
            searchT=searchT.toLowerCase();
            var node=oursWaypointID;
            var searchR;
            $.ajax({
               type:'GET',
               contentType: 'application/x-www-form-urlencoded',
               dataType:'xml',
               data:{
                  xml:1,
                  command:5,
                  node:node,
                  searchterms:searchT,
                  searchmode:adder
             },
               url:server +'kinnective4/fullway30e.php',
               success: function(data) {
                  searchR=data;
                  var tester=$(searchR).find('status').text();
                  var patt=/ERROR/;
                  var patt2=/OK/;
                  if(patt.test(tester)){
                     createAlertBox(tester.substring(10));
                  }
                  else if(patt2.test(tester)){
                     renderSearchView(searchR);
                  }
                  //createAlertBox("Your comment has been posted");
               },
               error: function(jqXHR, textStatus, errorThrown) {
                  createAlertBox("Network error. Please try again later." + "  " + errorThrown);
               },
               complete: function(jqXHR, textStatus) {
                   // createAlertBox(searchR.toString());
                  
               }
            });
         });
         $('#oursDoneAddBtn').click(function(e) {
            if(adding == false){
               patience=0;
               adding=true;
               $('.mainContainer').scrollTop(0);
               var val=$('#radioLink').attr("checked");
               var dirXML=oursModel[oursModel.length -1].xml;
               var dir;
               var dirArr=$(dirXML).find('direction');
               var params={};
               $(dirXML).find('direction').each(function(ind) {
                  var id=$(this).find('id').text();
                  if(id == "0"){
                        dir=ind;
                        return false;
                   }
               });
               var barID = $('#oursListContainerCG .dataBar').length +1;
               if(dir != barID){
                       var dirX = dir;
                       var barIDx = barID;
                        var params = {};
                        params.command= "89";
                        params.info = "Anamoly: in the add routine, the XML search for a Direction yields: " + dir + "and the bar search yields: " + barID;
                        kinn.anamolyCall(params);
                        dir=barID;
               }
              var fIn;
              var fInA=$('#folderIn').val();
              if(fInA.length > 26){
                  var fInB = fInA.substring(0,25);
                  fIn = fInB;
              }else{
                  fIn = fInA;
              }
              if(fIn.length > 26 && warning==false){
                  createAlertBox("The title exceeds 26 characters. Please shorten or it will be clipped.");
                  warning=true;
              }
               var urlIn=$('#linkIn').val();
               var  t=/\.(aero|asia|cat|coop|jobs|org|com|net|edu|ac|info|biz|int|mobi|museum|name|post|pro|travel|tel|gov|mil|gov|co|tv|pdf|)/i.test(urlIn);
              var goo = /https:\/\/www.google.com/;
              if(goo.test(urlIn)){
                  urlIn=urlIn.replace(goo,"http://www.google.com");
              }
               var htt=/https?:\/\//i.test(urlIn);
               if(htt===false&&urlIn.length>0){
                  urlIn="http://" + urlIn;
               }
               if(t==false && val == "checked"){
                  createAlertBox("Please enter a valid URL");
                  return;
                }
               if(val == undefined){
                     params.node=oursWaypointID;
                     params.command="2";
                     params.way_title=fIn;
                     params.wp_direction=dir;
               }
               if(val == "checked") {
                     params.node=oursWaypointID;
                      params.command="10";
                     params.urlpathname=urlIn;
                     params.wp_direction=dir;
                     params.way_title=fIn;
               }
               if(t == true || urlIn == ""){
                  $('#radioLink').attr("checked",false).checkboxradio("refresh");
                  $('#radioFolder').attr("checked",true).checkboxradio("refresh");
                  $('#folderIn').val("");
                  $('#linkIn').val("");
                  urlParams.title=null;
                  $('#yoursFolderIn').val("");
                  $('#yoursLinkIn').val("");
                  $('#linkInput').hide();
                  urlParams={};
                  getOursAgain(params);
                  $('#oursGoToAdd').removeClass('ui-btn-active');
               }
            warning = false;
            var st = setTimeout(function(){
                adding=false;},2000);
            }
         });
         $('#yoursFolderIn').on('keyup',function(evt){
                 var inPL=$(this).val();
                 if(inPL.length >= 26){
                  patience++;
                 }else{
                    patience=0;
                 }
                 if(patience > 1 && warning==false){
                    createAlertBox("You have exceeded the input limit of 26 characters");
                    patience=0;
                 }
         });
         $('#commentIn').on('keyup',function(evt){
                 var inPL=$(this).val();
                 if(inPL.length >= 400){
                  patience++;
                 }else{
                    patience=0;
                 }
                 if(patience > 1){
                    createAlertBox("You have exceeded the input limit of 400 characters");
                    patience=0;
                 }
         });
         $('#folderIn').on('keyup',function(evt){
                 var inPL=$(this).val();
                 if(inPL.length >= 26){
                  patience++;
                 }else{
                    patience=0;
                 }
                 if(patience > 1 && warning == false){
                    createAlertBox("You have exceeded the input limit of 26 characters");
                    patience=0;
                 }
         });
         $('#yoursDoneAddBtn').click(function(e) {
            if(adding == false){
              adding=true;
              patience=0;
              $('.mainContainer').scrollTop(0);
              var val=$('#yoursRadioLink').attr("checked");
              var dirXML=yoursModel[yoursModel.length -1].xml;
              var dir;
              var dirArr=$(dirXML).find('direction');
              var params={};
              $(dirXML).find('direction').each(function(ind) {
                    var id=$(this).find('id').text();
                    if(id == "0"){
                          dir=ind;
                          return false;
                    }
              });
              var barID = $('#yoursListContainerCG .dataBar').length + 1;
              if(dir != barID){
                       var dirX = dir;
                       var barIDx = barID
                        var params = {};
                        params.command= "89";
                        params.info = "Anamoly: in the yoursAdd routine, the XML search for a Direction yields: " + dir + "and the bar search yields: " + barID;
                        kinn.anamolyCall(params);
                        dir=barID;
              }
              var fIn;
              var fInA=$('#yoursFolderIn').val();
              if(fInA.length > 26){
                  var fInB = fInA.substring(0,25);
                  fIn = fInB;
              }else{
                  fIn = fInA;
              }
              var urlIn=$('#yoursLinkIn').val();
               var  t=/\.(aero|asia|cat|coop|jobs|org|com|net|edu|ac|info|biz|int|mobi|museum|name|post|pro|travel|tel|gov|mil|gov|co|tv|pdf|)/i.test(urlIn);
              var goo = /https:\/\/www.google.com/;
              if(goo.test(urlIn)){
                  urlIn=urlIn.replace(goo,"http://www.google.com");
              }
              var htt=/https?:\/\//i.test(urlIn);
              if(htt===false&&urlIn.length>0){
                  urlIn="http://" + urlIn;
              }
              if(t==false && val == "checked"){
                 createAlertBox("Please enter a valid URL");
                 return;
              }
              if(val == undefined){
                       params.node=yoursWaypointID;
                       params.command="2";
                       params.way_title=fIn;
                       params.wp_direction=dir;
                 }
                 if(val == "checked") {
                       params.node=yoursWaypointID;
                       params.command="10";
                       params.urlpathname=urlIn;
                       params.wp_direction=dir;
                       params.way_title=fIn;
                 }
                 if(t == true || urlIn == ""){
                 $('#yoursRadioLink').attr("checked",false).checkboxradio("refresh");
                 $('#yoursRadioFolder').attr("checked",true).checkboxradio("refresh");
                 $('#yoursFolderIn').val("");
                 $('#yoursLinkIn').val("");
                 $('#folderIn').val("");
                 $('#linkIn').val("");
                 urlParams.title=null;
                 $('#yoursLinkInput').hide();
                 urlParams={};
                 getYoursAgain(params);
                 $('#yoursGoToAdd').removeClass('ui-btn-active');
               }
               warning=false;
               var st = setTimeout(function(){
                adding=false;},2000);
            }
         });
         $('#oursCutBtn').click(function(e){
            if(cutting == false){
               cutting=true;
               $('#ours').on('pagecreate', function(){
                  setTimeout(function(){oursCut();},350);
               });
               oursCut();
            }
         });
         $('#yoursCutBtn').click(function(e){
            if(cutting == false){
               cutting=true;
               $('#yours').on('pagecreate', function(){
                  setTimeout(function(){yoursCut();},350);
               });
               yoursCut();
            }
         });
         
         $('#oursCopyBtn').click(function(e){
            if(copying == false){
               copying=true;
               copyOrigin="ours";
               oursCopy();
            }
         });
         $('#yoursCopyBtn').click(function(e){
            if(copying == false){
               copying=true;
               copyOrigin="yours";
               yoursCopy();
            }
         });
         $('#searchCopyBtn').on('click',function(index,value){
            searchCopy();
         });
         $('#copiesCutBtn').click(function(e){
            while(copiesCheckedModel.length > 0) {
               var cop=copiesCheckedModel[copiesCheckedModel.length - 1];
               var elID=cop.id;
               updateCopiesModel(elID);
               copiesCheckedModel.pop();      
            }
            renderCopiesView();
         });
         $('#yoursOursBtn, #yoursOursBtn2').click(function(){
                  $.event.trigger({
                       type:"oursTrigger",
                       button: "copiesBackBtn"
                   });
         });
         $('#oursYoursBtn, #oursYoursBtn2').click(function(){
                  $.event.trigger({
                       type:"yoursTrigger",
                       button: "copiesBackBtn"
                   });
          });
         $('#signInPOursBtn, #signInPOursBtn2').click(function(){
                  $.event.trigger({
                       type:"oursTrigger",
                       button: "copiesBackBtn"
                   });
         });
         $('#signInPYoursBtn, #signInPYoursBtn2').click(function(){
                  $.event.trigger({
                       type:"yoursTrigger",
                       button: "copiesBackBtn"
                   });
         });
         $('#uploadOursBtn, #uploadOursBtn2').click(function(){
                  $.event.trigger({
                       type:"oursTrigger",
                       button: "copiesBackBtn"
                   });
         });
         $('#uploadYoursBtn, #uploadYoursBtn2').click(function(){
                  $.event.trigger({
                       type:"yoursTrigger",
                       button: "copiesBackBtn"
                   });
         });
         $("#copiesBackBtn").click(function() {
               if(copyOrigin == "yours"){
                  $.mobile.changePage("#yours");
                  $.event.trigger({
                       type:"yoursTrigger",
                       button: "copiesBackBtn"
                   });
               }else{
                  $.mobile.changePage('#ours');
                  $.event.trigger({
                       type:"oursTrigger",
                       button: "copiesBackBtn"
                   });
               }
         });   
         $("#copiesDoneBtn").click(function() {
               if(copyOrigin == "yours"){
                  $.mobile.changePage("#yours");
                  $.event.trigger({
                       type:"yoursTrigger",
                       button: "copiesBackBtn"
                   });
               }else{
                  $.mobile.changePage('#ours');
                  $.event.trigger({
                       type:"oursTrigger",
                       button: "copiesBackBtn"
                   });
               }
         });      
         $('#si').click(function(e) {
               e.preventDefault();
               resetStack();
               $.ajax({
                  type:'POST',
                  contentType: 'application/x-www-form-urlencoded',
                  dataType:'xml',
                  url:server +'kinnective4/fullway30e.php',
                  data:{
                     xml:1,
                     command:18,
   //dan                        
                     userid:$('#username').val(),
                     userpassword:$('#password').val()
   //dan
                  },
                  success: function(data) {
                     var tester=$(data).find('status').text();
                     var patt=/ERROR/;
                     var patt2=/OK/;
                     var patt3=/226/;
                     if(patt.test(tester)){
                        $('#username').val("");
                        $('#password').val("");
                        if(patt3.test(tester)){
                           $.mobile.changePage('#kinnreg4');
                           refreshKinnreg4();
                        }else{
                           createAlertBox(tester.substring(10));
                        }
                     }
                     else if(patt2.test(tester)){
                        $('#username').val("");
                        $('#password').val("");
//dan
                        $('#dont_forget').remove();
//dan
                        $('#signInForm').hide();
                        $('#signInDiv').hide();
                        $('#signInSuccess').show();
                        getOurs();
                        getYours();
                        if(urlParams.title){
                         $('#yoursGoToAdd').addClass('ui-btn-active');
                         $('#yoursGoToAdd').addClass('ui-btn-active');
                        }
                     }
                  },
                  error: function(jqXHR, textStatus, errorThrown) {
                     createAlertBox("Network error. Please try again later." + "  " + errorThrown);
                  },
                  complete: function(jqXHR, textStatus) {
                     //createAlertBox("Complete");
                  }
               });
         });
         $('#reload').click(function(e){
            getOurs();
            getYours();
         });
         
         $('#so').click(function(e) {
               //createAlertBox("signout function fires");
            resetStack();
            $.ajax({
               type:'GET',
               contentType: 'application/x-www-form-urlencoded',
               dataType:'xml',
               url:server +'kinnective4/fullway30e.php',
               data:{
                  xml:1,
                  command:19
               },
               success: function(data) {
                  //createAlertBox("Success");
                  $('#signInForm').show();
                  $('#signInDiv').show();
                  $('#userName').val("");
                  $('#pwInput').val("");
                  $('#signInSuccess').hide();
               },
               error: function(jqXHR, textStatus, errorThrown) {
                  createAlertBox("Network error. Please try again later.");
               },
               complete: function(jqXHR, textStatus) {
                     //createAlertBox("Complete");
               }
            });
         });
         $('#downloadBtn').click(function(e){
            upload=false;
            downloader();
         });
         $('#newPasswordSubmit').click(function(e) {
         //createAlertBox("signout function fires");
            e.preventDefault();
            var data={};
            var userid=$('#newUserID').val();
            var old_userpassword=$('#oldUserPassword').val();
            var userpassword1=$('#newUserPassword1').val();
            var userpassword2=$('#newUserPassword2').val();
            if(userid != "" && old_userpassword != "" && userpassword1 != "" && userpassword2 != ""){
               $.ajax({
                  type:'POST',
                  contentType: 'application/x-www-form-urlencoded',
                  dataType:'xml',
                  url:server +'kinnective4/fullway30e.php',
                  data:{
                        userid:userid,
                        old_userpassword:old_userpassword,
                        userpassword1:userpassword1,
                        userpassword2:userpassword2,
                        command:"78"
                  },
                  success: function(data) {
                     $('#newUserID').val("");
                     $('#oldUserPassword').val("");
                     $('#newUserPassword1').val("");
                     $('#newUserPassword2').val("");
                     var tester=$(data).find('status').text();
                     var patt=/ERROR/;
                     var patt2=/OK/;
                     var patt3=/226/;
                     if(patt.test(tester)){
                        $('#username').val("");
                        $('#password').val("");
                        if(patt3.test(tester)){
                           $.mobile.changePage('#kinnreg4');
                           refreshKinnreg4();
                        }else{
                           createAlertBox(tester.substring(10));
                        }
                     }
                     else if(patt2.test(tester)){
                        createAlertBox("Your password has been changed.");
                        $.mobile.changePage('#signInP');
                     }
                  },
                  error: function(jqXHR, textStatus, errorThrown) {
                        createAlertBox("Network error. Please try again later.");
                  },
                  complete: function(jqXHR, textStatus) {
                        //createAlertBox("Complete");
                  }
               });
            }
         });
         $('#regSubmit').click(function(e) {
         //createAlertBox("signout function fires");
            e.preventDefault();
            var data={};
            var user_first_name=$('#user_first_name').val();
            var user_last_name=$('#user_last_name').val();
            var useremail=$('#regUseremail').val();
            var userid=$('#regUserid').val();
            var password1=$('#regUserPassword1').val();
            var password2=$('#regUserPassword2').val();
            if(user_first_name != "" && user_last_name != "" && useremail != "" && userid != "" && password1 != "" && password2 != ""){
               $.ajax({
                  type:'POST',
                  contentType: 'application/x-www-form-urlencoded',
                  dataType:'xml',
                  url:server +'kinnective4/free_verify.php',
                  data:{
                        user_first_name:user_first_name,
                        user_last_name:user_last_name,
                        userid:userid,
                        useremail:useremail,
                        userpassword1:password1,
                        userpassword2:password2,
                        command:72
                  },
                  success: function(data) {
                     $('#user_first_name').val("");
                     $('#user_last_name').val("");
                     $('#regUseremail').val("");
                     $('#regUserid').val("");
                     $('#regUserPassword1').val("");
                     $('#regUserPassword2').val("");
                     var tester=$(data).find('status').text();
                     var patt=/ERROR/;
                     var patt2=/OK/;
                     if(patt.test(tester)){
                        createAlertBox(tester.substring(10));
                     }
                     else if(patt2.test(tester)){

                        /*var message=$(data).find('paypalurl').text();
                        createAlertBox("Your user ID and password have been reserved.  To start a free, two week, trial subscription, please enter information on the Paypal page. You will be directed there in a few seconds.");
                        var setIt=setTimeout(function(){
                        window.open(message,'_self');
                        },8000);*/
                        createAlertBox("To confirm registration, please click on link in email now on its way to your mailbox. The sender is No-reply@kinnective.com");
                        var setIt2=setTimeout(function(){
                            $.mobile.changePage("#signInP");
                        },8000);
                     }
                  },
                  error: function(jqXHR, textStatus, errorThrown) {
                        createAlertBox("Network error. Please try again later.");
                  },
                  complete: function(jqXHR, textStatus) {
                        //createAlertBox("Complete");
                  }
               });
            }
         });
         $('#regSubmit2').click(function(e) {
         //createAlertBox("signout function fires");
            e.preventDefault();
            var data={};
            var user_first_name=$('#user_first_name2').val();
            var user_last_name=$('#user_last_name2').val();
            var useremail=$('#regUseremail2').val();
            var userid=$('#regUserid2').val();
            var password1=$('#regUserPassword12').val();
            var password2=$('#regUserPassword22').val();
            if(user_first_name != "" && user_last_name != "" && useremail != "" && userid != "" && password1 != "" && password2 != ""){
               $.ajax({
                  type:'POST',
                  contentType: 'application/x-www-form-urlencoded',
                  dataType:'xml',
                  url:server +'kinnective4/paid_verify.php',
                  data:{
                        user_first_name:user_first_name,
                        user_last_name:user_last_name,
                        userid:userid,
                        useremail:useremail,
                        userpassword1:password1,
                        userpassword2:password2,
                        command:70
                  },
                  success: function(data) {
                     $('#user_first_name2').val("");
                     $('#user_last_name2').val("");
                     $('#regUseremail2').val("");
                     $('#regUserid2').val("");
                     $('#regUserPassword12').val("");
                     $('#regUserPassword22').val("");
                     var tester=$(data).find('status').text();
                     var patt=/ERROR/;
                     var patt2=/OK/;
                     if(patt.test(tester)){
                        createAlertBox(tester.substring(10));
                     }
                     else if(patt2.test(tester)){
                        var message=$(data).find('paypalurl').text();
                        createAlertBox("Your registration information has been sent. You will now be directed to a Paypal page to provide for payment of the 99 cent/month subscription. Your subscription can be canceled at anytime by clicking the 'Resign' button on the sign-in page. ");
                        var setIt=setTimeout(function(){
                        window.open(message,'_self');
                        },8000);
                     }
                  },
                  error: function(jqXHR, textStatus, errorThrown) {
                        createAlertBox("Network error. Please try again later.");
                  },
                  complete: function(jqXHR, textStatus) {
                        //createAlertBox("Complete");
                  }
               });
            }
         });
         $('#forgotSubmit').click(function(e) {
            e.preventDefault();
            var data={};
            var useremail=$('#forgotUserEmail').val();
            if(useremail != ""){
               $.ajax({
                  type:'POST',
                  contentType: 'application/x-www-form-urlencoded',
                  dataType:'xml',
                  url:server +'kinnective4/fullway30e.php',
                  data:{
                        useremail:useremail,
                        command:'72'
                  },
                  success: function(data) {
                     $('#forgotUserEmail').val("");
                     var tester=$(data).find('status').text();
                     var patt=/ERROR/;
                     var patt2=/OK/;
                     if(patt.test(tester)){
                        createAlertBox(tester.substring(10));
                     }
                     else if(patt2.test(tester)){
                        createAlertBox("A link has been sent to your email. It will allow you to reset password.");
                     }
                  },
                  error: function(jqXHR, textStatus, errorThrown) {
                        createAlertBox("Network error. Please try again later.");
                  },
                  complete: function(jqXHR, textStatus) {
                        //createAlertBox("Complete");
                  }
               });
            }
            });
      $('#cancelSubmit').click(function(e) {
         //createAlertBox("signout function fires");
            e.preventDefault();
            var data={};
            var useremail=$('#cancelUserEmail').val();
            var userid=$('#cancelUserId').val();
            var userpass=$('#cancelPassword').val();
            if(userid != "" && useremail != "" && userid != "" && userpass != ""){
               $.ajax({
                  type:'POST',
                  contentType: 'application/x-www-form-urlencoded',
                  dataType:'xml',
                  url:server +'kinnective4/fullway30e.php',
                  data:{
                        userid:userid,
                        useremail:useremail,
                        userpassword:userpass,
                        command:'75'
                  },
                  success: function(data) {
                     var tester=$(data).find('status').text();
                     var patt=/ERROR/;
                     var patt2=/OK/;
                     if(patt.test(tester)){
                        createAlertBox(": " + tester);
                     }
                     else if(patt2.test(tester)){
                        createAlertBox("Your subscription to Kinnective has been canceled.");
                     }
                  },
                  error: function(jqXHR, textStatus, errorThrown) {
                        createAlertBox("Network error. Please try again later.");
                  },
                  complete: function(jqXHR, textStatus) {
                     $('#cancelUserEmail').val("");
                     $('#cancelUserId').val("");
                     $('#cancelPassword').val("");   //createAlertBox("Complete");
                  }
               });
            }
            });      
            $('#ours .arrowLBtn').click(function(e) {
               //createAlertBox("this is the handleer");
               if(oursModel.length > 1) {
                  oursModel.pop();
                  oursModel.pop();
               }
               var pars={
                  xml:1,
                  command:1,
                  node:oursWaypointID,
                  wp_direction:0
               };
               getOursAgain(pars);
         });
         $('#yours .arrowLBtn').click(function(e) {
            //createAlertBox("this is the handleer");
            if(yoursModel.length > 1) {
               yoursModel.pop();
               yoursModel.pop();
            }
            var pars={
               xml:1,
               command:1,
               node:yoursWaypointID,
               wp_direction:0
            };
            getYoursAgain(pars);
         });
         $('#discussToOurs').click(function(e){
            e.preventDefault();
            if(discussWaypointID == oursWaypointID){
               $.mobile.changePage('#ours');
            }else if(discussWaypointID == yoursWaypointID){
               $.mobile.changePage('#yours');
            }
         });
         /*$('input[type="textarea"]').focus(function(e) {
               //createAlertBox('focus');
         });*/
         $('#oursPasteBtn').click(function(e) {
            if(pasting == false){
               pasting=true;
               $('#ours').on('pagecreate', function(){
                  setTimeout(function(){oursAddCheckedNode();},350);
               });
               oursAddCheckedNode();
            }
         });
         $('#yoursPasteBtn').click(function(e) {
            if(pasting == false){
               pasting=true;
               $('#yours').on('pagecreate', function(){
                  setTimeout(function(){yoursAddCheckedNode();},350);
               });
               yoursAddCheckedNode();
            }
         });
          $('a.native-anchor').on('click', function(ev) {
             ev.preventDefault();
             var target=$(this).attr('href');
             var target3=$("#" + target + "")[0];
             var off=$(target3).position().top;

             $('#bookmarkScrollPane').scrollTop(off -10);
          });
      
   }
   function oursCopy(){
      $.mobile.changePage("#copies");
      makeCopy();
      function makeCopy(){
        var copyData;
        var successData=false;
        if(oursCheckedModelFull.length > 0){
           $.mobile.showPageLoadingMsg("a", "Loading copies of big branches can take a few seconds, especially when there are several to be copied. Please be patient.");
           var cop=new CloneObject(oursCheckedModelFull[oursCheckedModelFull.length - 1]);
           var params={};
           params.command="45";
           params.xml="1";
           params.node=cop.id;
           $.ajax({
              type:'GET',
              contentType: 'application/x-www-form-urlencoded',
              dataType:'xml',
              url:server +'kinnective4/fullway30e.php',
              data:params,
              success: function(data) {
                 copyData=data;
                 var tester=$(data).find('status').text();
                 var patt=/ERROR/;
                 var patt2=/OK/;
                 if(patt.test(tester)){
                       successData=false;
                       createAlertBox(tester.substring(10));
                 }else if(patt2.test(tester)){
                     successData=true;
                     
                 }
              },
              error: function(jqXHR, textStatus, errorThrown) {
                 createAlertBox("Network error. Please try again later.");
                 successData=false;
              },
              complete: function(jqXHR, textStatus) {
                 if(successData==true){
                    var theT=$(copyData).find('node').text();
                    cop.id=theT;
                    copiesModel.push(cop);
                    copiesCheckedModel.push(cop);
                    oursCheckedModelFull.pop();
                    makeCopy();
                 }else if(successData==false){
                    oursCheckedModelFull=[];
                    makeCopy();
                 }
              }
           });
        }else if(yoursCheckedModelFull.length == 0){
           $.mobile.hidePageLoadingMsg();
           renderCopiesView();
           copying=false;
        }
      }
      
   }
   function yoursCopy(){
      $.mobile.changePage("#copies");
      makeCopy();
      function makeCopy(){
         var successData=false;
         var copyData;
         if(yoursCheckedModelFull.length > 0){
         $.mobile.showPageLoadingMsg("a", "Loading copies of big branches can take a few seconds, especially when there are several to be copied. Please be patient.");
            var cop=new CloneObject(yoursCheckedModelFull[yoursCheckedModelFull.length - 1]);
            var params={};
            params.command="45";
            params.xml="1";
            params.node=cop.id;
            $.ajax({
               type:'GET',
               contentType: 'application/x-www-form-urlencoded',
               dataType:'xml',
               url:server +'kinnective4/fullway30e.php',
               data:params,
               success: function(data) {
                  copyData=data;
                  var tester=$(data).find('status').text();
                  var patt=/ERROR/;
                  var patt2=/OK/;
                  if(patt.test(tester)){
                        successData=false;
                        createAlertBox(tester.substring(10));
                  }else if(patt2.test(tester)){
                       successData=true;
                       
                  }
               },
               error: function(jqXHR, textStatus, errorThrown) {
                  createAlertBox("Network error. Please try again later.");
                  successData=false;
               },
               complete: function(jqXHR, textStatus) {
                  if(successData == true){
                     var theT=$(copyData).find('node').text();
                     cop.id=theT;
                     copiesModel.push(cop);
                     copiesCheckedModel.push(cop);
                     yoursCheckedModelFull.pop();
                     makeCopy();
                  }else if(successData==false){
                     yoursCheckedModelFull=[];
                     makeCopy();
                  }
               }
            });
         }else if(yoursCheckedModelFull.length == 0){
            $.mobile.hidePageLoadingMsg();
            renderCopiesView();
            copying=false;
         }
     }
   }
   function searchCopy(){
      copyOrigin="searchAdd";
      $.mobile.changePage("#copies");
      var copyData;
      var successData=false;
      if(searchCheckedModel.length > 0){
         var cop=new CloneObject(searchCheckedModel[searchCheckedModel.length - 1]);
         var params={};
         params.command="45";
         params.xml="1";
         params.node=cop.id;
         $.ajax({
            type:'GET',
            contentType: 'application/x-www-form-urlencoded',
            dataType:'xml',
            url:server +'kinnective4/fullway30e.php',
            data:params,
            success: function(data) {
               copyData=data;
               var tester=$(data).find('status').text();
               var patt=/ERROR/;
               var patt3=/Error/;
               var patt2=/OK/;
               if(patt.test(tester) || patt3.test(tester)){
                     successData=false;
                     createAlertBox(tester.substring(10));
               }else if(patt2.test(tester)){
                    successData=true;
                    
               }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               createAlertBox("Network error. Please try again later.");
               successData=false;
            },
            complete: function(jqXHR, textStatus) {
               if(successData == true){
                  var theT=$(copyData).find('node').text();
                  var checkCopyData=copyData;
                  cop.id=theT;
                  copiesModel.push(cop);
                  copiesCheckedModel.push(cop);
                  searchCheckedModel.pop();
                  searchCopy();
               }else if(successData == false){
                  searchCheckedModel=[];
               }
            }
         });
      }else if(searchCheckedModel.length == 0){
         renderCopiesView();
      }
   }
   function oursCut(e){
      if(oursCheckedModelFull.length > 0) {
         oursCheckedModelFull.sort(function(obj1, obj2){
            return obj1.direction - obj2.direction;
         });
         var cutter=new CloneObject(oursCheckedModelFull[oursCheckedModelFull.length - 1]);
         var barVar=cutter.bar;
         var barID=$(barVar).attr("id");
         var dat={};
         dat.child_node=barID;
         dat.node=oursWaypointID;
         dat.xml="1";
         dat.command="4";
         dat.wp_direction=cutter.direction;
         copiesModel.push(cutter);
         copiesCheckedModel.push(cutter);
         oursCheckedModelFull.pop();
         getOursAgain(dat);
      }else if(oursCheckedModelFull.length == 0){
         $('#ours').off();
         oursBtns();
         var st = setTimeout(function(){
             cutting=false;},1000);
      }
   }
   function yoursCut(e){
      if(yoursCheckedModelFull.length > 0) {
         yoursCheckedModelFull.sort(function(obj1, obj2){
            return obj1.direction - obj2.direction;
         });
         var cutter=new CloneObject(yoursCheckedModelFull[yoursCheckedModelFull.length - 1]);
         var barVar=cutter.bar;
         var barID=$(barVar).attr("id");
         var dat={};
         dat.child_node=barID;
         dat.node=yoursWaypointID;
         dat.xml="1";
         dat.command="4";
         dat.wp_direction=cutter.direction;
         copiesModel.push(cutter);
         copiesCheckedModel.push(cutter);
         yoursCheckedModelFull.pop();
         getYoursAgain(dat);
      }else if(yoursCheckedModelFull.length == 0){
         $('#yours').off();
         yoursBtns();
         var st = setTimeout(function(){
         cutting=false;},1000);
      }
   }
   function oursAddCheckedNode(){
      if(copiesCheckedModel.length > 0){
         var checked=copiesCheckedModel[copiesCheckedModel.length - 1];
         var orph_node=checked.id;
         var command="3";
         var node=oursWaypointID;
         var direction="";
         var dirXML=oursModel[oursModel.length -1].xml;
         var dir;
         var dirArr=$(dirXML).find('direction');
         var params={};
         $(dirXML).find('direction').each(function(ind) {
               var id=$(this).find('id').text();
               if(id == "0"){
                  dir=ind;
                  return false;
               }
         });
         var barID = $('#oursListContainerCG .dataBar').length + 1;
         if(dir != barID){
                       var dirX = dir;
                       var barIDx = barID
                        var params = {};
                        params.command= "89";
                        params.info = "Anamoly: in the oursAddChecked routine, the XML search for a Direction yields: " + dir + "and the bar search yields: " + barID;
                        kinn.anamolyCall(params);
                        dir=barID;
              }
         var pars={};
         pars.command=command;
         pars.node=oursWaypointID;
         pars.orph_node=orph_node;
         pars.wp_direction=dir;
         copiesCheckedModel.pop();
         updateCopiesModel(orph_node);
         getOursAgain(pars);
      }else if(copiesCheckedModel.length == 0){
         $('#ours').off();
         oursBtns();
         var st = setTimeout(function(){
                pasting=false;},2000);
         }
   }
   function yoursAddCheckedNode(){
      if(copiesCheckedModel.length > 0){
         var checked=copiesCheckedModel[copiesCheckedModel.length - 1];
         var orph_node=checked.id;
         var command="3";
         var node=yoursWaypointID;
         var direction="";
         var dirXML=yoursModel[yoursModel.length -1].xml;
         var dir;
         var dirArr=$(dirXML).find('direction');
         var params={};
         $(dirXML).find('direction').each(function(ind) {
               var id=$(this).find('id').text();
               if(id == "0"){
                  dir=ind;
                  return false;
               }
         });
         var barID = $('#yoursListContainerCG .dataBar').length +1;
        if(dir != barID){
                       var dirX = dir;
                       var barIDx = barID
                        var params = {};
                        params.command= "89";
                        params.info = "Anamoly: in the Add routine, the XML search for a Direction yields: " + dir + "and the bar search yields: " + barID;
                        kinn.anamolyCall(params);
                        dir=barID;
         }
         var pars={};
         pars.command=command;
         pars.node=yoursWaypointID;
         pars.orph_node=orph_node;
         pars.wp_direction=dir;
         copiesCheckedModel.pop();
         updateCopiesModel(orph_node);
         getYoursAgain(pars);
      }else if(copiesCheckedModel.length == 0){
         $('#yours').off();
         yoursBtns();
         var st = setTimeout(function(){
                pasting=false;},2000);
        }
   }
   function updateCopiesModel(orph){
      $(copiesModel).each(function(index,value) {
         var idVar=value.id;
         if(orph == idVar){
            copiesModel.splice(index,1);
            return false;
         }
      });
   }
   function getOurs(){
      var getOursX;
      $.ajax({
         type:'GET',
         contentType: 'application/x-www-form-urlencoded',
         dataType:'xml',
         url:server +'kinnective4/fullway30e.php',
         data:{
            xml:"1"
         },
         success: function(data) {
            getOursX=data;
            var tester=$(getOursX).find('status').text();
            var patt=/ERROR/;
            var patt2=/OK/;
            if(patt.test(tester)){
               createAlertBox(tester.substring(10));
            }else if(patt2.test(tester)){
               renderMainView(getOursX,"ours");
            }
         },
         error: function(jqXHR, textStatus, errorThrown) {
            createAlertBox("Network error. Please try again later.");
         },
         complete: function(jqXHR, textStatus) {
            //$('#ours').trigger('pagecreate');
   
         }
   });
   }
   function getOursAgain(params){
      var comm=params.command;
      var successData=false;
      var getOursX;
      $.ajax({
         type:'GET',
         contentType: 'application/x-www-form-urlencoded',
         dataType:'xml',
         url:server +'kinnective4/fullway30e.php',
         data:params,
         success: function(data) {
            getOursX=data;
            var tester=$(getOursX).find('status').text();
            var patt=/ERROR/;
            var patt2=/OK/;
            if(patt.test(tester)){
               createAlertBox(tester.substring(10));
               successData=false;
            }else if(patt2.test(tester)){
               successData=true;
            }
         },
         error: function(jqXHR, textStatus, errorThrown) {
            createAlertBox("Network error. Please try again later.");
            successData=false;
         },
         complete: function(jqXHR, textStatus) {
            if(successData == true){
                    renderMainView(getOursX,"ours");
            }else if(successData == false){
               copiesModel=[];
               copiesCheckedModel=[];
               oursCheckedModelFull=[];
            }
         }
      });
   }
   function renderMainView(xmlInfo,target,com) {
               if(target=="yours"){
                   conString="#yoursListContainerCG";
                   pageString="#yours";
                   waypID=yoursWaypointID;
               }else if(target=="ours"){
                   conString="#oursListContainerCG";
                   pageString="#ours";
                   waypID=oursWaypointID;
               }else{
                   return;
               }
               var directionText;
               var textDirectionSub;
               var aText;
               var textaSub;
               var urlVar;
               var idVar;
               var numVar;
               var thisNode1;
               var dummyDiv;
               var finalDiv;
               var xm=xmlInfo;
               var aHref;
               $.mobile.changePage(pageString);
               var wpI=waypID;
               var wpII=$(xmlInfo).find('waypointid').text();
               var wpIII=parseInt(wpII,10);
               var item={};
               item.xml=xmlInfo;
               item.title=$(xmlInfo).find('title').text();
               item.wpID= wpIII;
               if(target=="yours"){
                   $('#yoursTitleString').text(item.title);
                   document.getElementById('yoursListContainerCG').innerHTML="";
                   if(wpI != wpIII){
                     yoursModel.push(item);
                   }else if(wpI == wpIII){
                     yoursModel.pop();
                     yoursModel.push(item);
                   }
                   yoursWaypointID=wpIII;
                   waypID = yoursWaypointID;
               }else if(target=="ours"){
                   $('#oursTitleString').text(item.title);
                   document.getElementById('oursListContainerCG').innerHTML="";
                   if(wpI != wpIII){
                     oursModel.push(item);
                   }else if(wpI == wpIII){
                     oursModel.pop();
                     oursModel.push(item);
                   }
                   oursWaypointID=wpIII;
                   waypID = oursWaypointID;
               }
               var topString1A='<div class="dataBarColor dataBar ui-corner-top" number="';
               var topString1B='" id="';
               var topString1C='"><div class="grabBoxDiv"><a href="#" class="upGrab" data-role="button" data-icon="grid" data-iconpos="notext">Up</a></div><!-- end of grabBoxDiv--><div class="checkBoxDiv"><input class="check" type="checkbox" data-role="none" title="Select this Direction"></input></div><!-- end of checkBoxDiv --><div class="dataBarTitle"><p class="dataBarTitleP"><span class="titleSpan">';
               var topString2='</span></p></div><!-- end of dataBarTitle --><div class="swoop"><a href="';
               var topString3='" class="swoopBtn" data-role="button" data-icon="forward" data-iconpos="notext" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="a" title="Link" class="ui-btn ui-btn-up-a ui-btn-icon-notext ui-corner-top"><span class="ui-btn-inner ui-corner-top"><span class="ui-btn-text">Link</span><span class="ui-icon ui-icon-forward ui-icon-shadow">&nbsp;</span></span></a></div><!-- end of swoop -->';
               var topString4='<div class="arrowR"><a href="#" class="arrowRBtn" data-role="button" data-icon="arrow-r" data-iconpos="notext" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="a" title="Folder" class="ui-btn ui-btn-up-a ui-btn-icon-notext"><span class="ui-btn-inner"><span class="ui-btn-text">Folder</span><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></span></a></div><!-- end of arrowR -->';
               var topString5='</div><!-- end of dataBar -->';
               var barString1A='<div class="dataBarColor dataBar" number="';
               var barString1B='" id="';
               var barString1C='"><div class="grabBoxDiv"><a href="#" class="upGrab" data-role="button" data-icon="grid" data-iconpos="notext">Up</a></div><!-- end of grabBoxDiv --><div class="checkBoxDiv" data-role="none"><input class="check" type="checkbox" data-role="none" title="Select this Direction"></input></div><!-- end of checkBoxDiv --><div class="dataBarTitle"><p class="dataBarTitleP"><span class="titleSpan">';
               var collectionXML=$(xmlInfo).find('direction');
               $(xmlInfo).find('direction').each(function(index) {
                  var item={};
                  var idVar=$(this).find('id').text();
                  var numVar=$(this).find('pathnum').text();
               if(index == 0){
                  var bcString=$(this).find('name').text();
                  if(target=="yours"){
                     $('#yoursBCString').text(bcString + "/");
                  }else if(target=="ours"){
                      $('#oursBCString').text(bcString + "/");
                  }
               }else if(index == 1){
                     if(idVar > 0){
                           urlVar=$(this).find('url').text();
                           if(urlVar == ""){
                              directionText=$(this).find('name').text();
                              textDirectionSub=directionText.substring(0,26);
                              thisNode1="" + topString1A + numVar + topString1B + idVar + topString1C + textDirectionSub + topString2 + "#" + topString3 + topString4 + topString5;
                              dummyDiv=document.createElement('div');
                              dummyDiv.innerHTML=thisNode1;
                              finalDiv=$(dummyDiv).find('.dataBar')[0];
                              $(finalDiv).appendTo(conString);
                           }else if(urlVar != ""){
                              aText=$(this).find('name').text();
                              textaSub=aText.substring(0,25);
                              aHref=$(this).find('url').text();
                              thisNode1="" + barString1A + numVar + barString1B + idVar + barString1C + textaSub + topString2 + aHref + topString3 + topString5;
                              dummyDiv=document.createElement('div');
                              dummyDiv.innerHTML=thisNode1;
                              finalDiv=$(dummyDiv).find('.dataBar')[0];
                              $(finalDiv).appendTo(conString);
                           }
                     }
                  }else if(index > 1){
                        if(idVar > 0) {
                           urlVar=$(this).find('url').text();
                           if(urlVar == ""){
                              directionText=$(this).find('name').text();
                              textDirectionSub=directionText.substring(0,26);
                              thisNode1="" + barString1A + numVar + barString1B + idVar + barString1C + textDirectionSub + topString2 + "#" + topString3 + topString4 + topString5;
                              dummyDiv=document.createElement('div');
                              dummyDiv.innerHTML=thisNode1;
                              finalDiv=$(dummyDiv).find('.dataBar')[0];
                              $(finalDiv).appendTo(conString);
                           }else if(urlVar != ""){
                              aText=$(this).find('name').text();
                              textaSub=aText.substring(0,25);
                              aHref=$(this).find('url').text();
                              thisNode1="" + barString1A + numVar + barString1B + idVar + barString1C + textaSub + topString2 + aHref + topString3 + topString5;
                              dummyDiv=document.createElement('div');
                              dummyDiv.innerHTML=thisNode1;
                              finalDiv=$(dummyDiv).find('.dataBar')[0];
                              $(finalDiv).appendTo(conString);
                           }
                     }
                  }
               });
     $("" + conString + " .dataBarTitle").on("touchmousedown", function(e) {
             e.preventDefault();
             e.originalEvent.preventDefault();
             e.originalEvent.stopImmediatePropagation();
            if(momentum!=null){
                clearInterval(momentum);
                momentum=null;
            }
            mouseLog=[];
            var itemThis={};
           itemThis.y=e.pageY;
           itemThis.time=e.originalEvent.timeStamp;
            mouseLog.push(itemThis);
            scrolling=true;
            diff=0;
            var shortConString=conString.substring(1);
            thisScroller = document.getElementById(shortConString);
            scrollToY=thisScroller.scrollTop+e.pageY;
     });
    $("" + conString + " .dataBarTitle").on("touchmousemove",  function(e) {
        e.preventDefault();
        e.originalEvent.preventDefault();
        e.originalEvent.stopImmediatePropagation();
        if(scrolling){
                    postMouse(e);
                    e.preventDefault();
                    if ((thisScroller.scrollTop < thisScroller.scrollHeight-thisScroller.offsetHeight &&thisScroller.scrollTop+e.pageY < scrollToY-5) ||(thisScroller.scrollTop != 0 && thisScroller.scrollTop+e.pageY > scrollToY+5)){
                     thisScroller.scrollTop=scrollToY-e.pageY;
                    }
        }
    });
    $("" + conString + " .dataBarTitle").on('touchmouseup',function(e){
                  e.preventDefault();
                  e.originalEvent.preventDefault();
                  e.originalEvent.stopImmediatePropagation();
                  scrolling=false;
                 if(mouseLog.length > 1){
                     var ml=mouseLog;
                     var newY=mouseLog[mouseLog.length-1].y;
                     var oldY=mouseLog[mouseLog.length-2].y;
                     var newTime=mouseLog[mouseLog.length-1].time;
                     var oldTime=mouseLog[mouseLog.length-2].time;
                     var distanceDiff = newY-oldY;
                     var timeDiff=newTime-oldTime;
                     var timeDiffPer=timeDiff/1000;
                     diff=distanceDiff/timeDiffPer;
                     var topPart = thisScroller.scrollTop;
                     var bottomPart = thisScroller.scrollHeight - (thisScroller.scrollTop + thisScroller.clientHeight);
                         if(diff<0 && Math.abs(diff)>bottomPart){
                            diff=(bottomPart*(-1));
                         }else if(diff>0 && diff>topPart){
                             diff=topPart;
                         }
                     if(momentum==null){
                     momentum=setInterval(function(){mom();},50);
                     }
                 }else{
                 }
         });
      $('' + conString + ' a').attr('rel','external');
      $('' + conString + ' a').attr('target','_blank');
      $('' + conString + ' .arrowRBtn').click(function(e) {
                     e.preventDefault();
                     //createAlertBox("listContainerCG .arrowBtn function fires");
                     var barVar=$(this).parents('.dataBar')[0];
                     var num=$(barVar).attr('number');
                     var ID=waypID;
                     var com="1";
                     var xml="1";
                     var pars={
                        command:com,
                        node:ID,
                        xml:xml,
                        wp_direction:num
                     };
                     if(target=="yours"){
                        getYoursAgain(pars);
                     }else if(target=="ours"){
                        getOursAgain(pars);
                     }
               });
               $('' + conString + ' .swoopBtn').click(function(ee) {
               });
               $('' + conString + ' input.check').click(function (e) {
                        var item={};
                        item.wpID=waypID;
                        var barVar=$(this).parents('.dataBar')[0];
                        item.bar=barVar;
                        item.direction=$(barVar).attr('number');
                        var barVarText=$('.titleSpan',barVar).text();
                        item.link=$(barVar).find('a').attr('href');
                        item.title=barVarText;
                        item.id=$(barVar).attr('id');
                        item.obj=this;
                        if(this.checked == true) {
                           if(item.id != "0" && target=="yours"){
                           yoursCheckedModelFull.push(item);
                           }
                           else if(item.id == "0" && target=="yours"){
                              yoursCheckedModelEmpty.push(item);
                           }
                           else if(item.id != "0" && target=="ours"){
                              oursCheckedModelFull.push(item);
                           }
                           else if(item.id == "0" && target=="ours"){
                              oursCheckedModelEmpty.push(item);
                           }
                        }
                        else if(this.checked != true) {
                           if(item.id != "0" && target=="yours"){
                              $(yoursCheckedModelFull).each(function(index, value){
                                 if(barVar == value.bar){
                                 yoursCheckedModelFull.splice(index,1);
                                 }
                              });
                           }
                           else if(item.id == "0" && target=="yours"){
                              yoursCheckedModelEmpty.pop();
                           }
                           else if(item.id != "0" && target== "ours"){
                              $(oursCheckedModelFull).each(function(index, value){
                                 if(barVar == value.bar){
                                 oursCheckedModelFull.splice(index,1);
                                 }
                              });
                           }
                           else if(item.id == "0" && target == "ours"){
                              oursCheckedModelEmpty.pop();
                           }
                        }
               });
               $('' + conString + ' .upGrab').on("touchmousedown", function(e) {
               e.originalEvent.preventDefault();
               e.originalEvent.stopImmediatePropagation();
               if(momentum!=null){
                    clearInterval(momentum);
                    momentum=null;
                }
               mouseLog=[];
               dragging=true;
               var tar=e.target;
               var b=$(tar).closest('.dataBar');
               container = document.getElementById(conString.substring(1));
               $(b).attr('position','absolute');
               $(b).css('z-index',zNumber++);
               $(this).addClass("ui-btn-active");
               dragger.scrollTopSpace = container.scrollTop + e.pageY;
               dragger.moveSpace = e.pageY - b[0].getBoundingClientRect().top;
               dragger.moveSpaceLeft = e.pageX - b[0].getBoundingClientRect().left;
               dragger.initPosY = $(b)[0].getBoundingClientRect().top;
               dragger.initPosX = $(b)[0].getBoundingClientRect().left;
               dragger.obj=b;
               dragger.id=$(b).attr('id');
               dragger.oldDirection = $(b).attr('number');
               mousePos=e.pageY;
               var boxHeight=container.offsetHeight;
               var totalHeight=container.scrollHeight;
               var barHeight=$('' + conString + ' .dataBar').height();
               dragger.topScrollLimit=container.scrollHeight - container.offsetHeight;
               dragger.topVerge = container.getBoundingClientRect().top + barHeight;
               dragger.bottomVerge = container.getBoundingClientRect().bottom - barHeight;
               scrollBottomH=totalHeight-boxHeight;
               interV=setInterval(function(){dragIt(conString,pageString,target);},100);
                        $('body').on("touchmousemove", function(e){e.originalEvent.preventDefault();postMouse(e);});
                        $('body').on("touchmouseup",function(e) {
                              e.preventDefault();
                              $('body').off("touchmousemove");
                              clearInterval(interV);
                              dragging=false;
                              $('body').off("touchmouseup");
                              if(dropInto==true){
                                  $.ajax({
                                     type:'GET',
                                     contentType: 'application/x-www-form-urlencoded',
                                     dataType:'xml',
                                     url:server +'kinnective4/fullway30e.php',
                                     data:{
                                        xml:"1",
                                        command:"103",
                                        child_node:droppingTarget,
                                        node:droppingParent,
                                        wp_direction:droppingDirection,
                                        nodeB:dropIntoTarget
                                     },
                                     success: function(data) {
                                        getYoursX=data;
                                        var tester=$(getYoursX).find('status').text();
                                        var patt=/ERROR/;
                                        var patt2=/OK/;
                                        if(patt.test(tester)){
                                           createAlertBox(tester.substring(10));
                                        }else if(patt2.test(tester)){
                                           renderMainView(getYoursX,droppingSide);
                                        }
                                     },
                                     error: function(jqXHR, textStatus, errorThrown) {
                                        createAlertBox("Network error. Please try again later.");
                                     },
                                     complete: function(jqXHR, textStatus) {
                                         if(dropInto==false){
                                             return;
                                         }
                                     }
                                 });
                              }
                              if(dropInto==false && target=="yours"){
                                  rebuildYoursList(e);
                              }else if(dropInto==false && target=="ours"){
                                  rebuildOursList(e);
                              }
                         dropInto=false;
                        });   
               });
      var yH=$('' + pageString + ' .check').innerHeight();
      var xH=$('' + pageString + ' .dataBar').height();
      var fixH=(xH - yH)/2;
      $('' + pageString + ' .check').css('position','absolute');
      if(isAndroid && win < 500){
         $('' + pageString + ' .check').css('top',fixH - 2);
      }else{
         $('' + pageString + ' .check').css('top',fixH);
      }
      $(pageString).trigger('pagecreate');
      if(target=='yours'){
         yoursBtns();
      }else if(target="ours"){
          oursBtns();
      }
   }
   function getYours(){
      var getYoursX;
      $.ajax({
         type:'GET',
         contentType: 'application/x-www-form-urlencoded',
         dataType:'xml',
         url:server +'kinnective4/fullway30e.php',
         data:{
            xml:"1",
            command:"41"
         },
         success: function(data) {
            getYoursX=data;
            var tester=$(getYoursX).find('status').text();
            var patt=/ERROR/;
            var patt2=/OK/;
            if(patt.test(tester)){
               createAlertBox(tester.substring(10));
            }else if(patt2.test(tester)){
               renderMainView(getYoursX,"yours");
            }
         },
         error: function(jqXHR, textStatus, errorThrown) {
            createAlertBox("Network error. Please try again later.");
         },
         complete: function(jqXHR, textStatus) {
            //$('#ours').trigger('pagecreate');
   
         }
     });
   }
   function getYoursAgain(params){
      var comm=params.command;
      var successData=true;
      var getYoursX;
      $.ajax({
         type:'GET',
         contentType: 'application/x-www-form-urlencoded',
         dataType:'xml',
         url:server +'kinnective4/fullway30e.php',
         data:params,
         success: function(data) {
            getYoursX=data;
            var tester=$(getYoursX).find('status').text();
            var patt=/ERROR/;
            var patt2=/OK/;
            if(patt.test(tester)){
               createAlertBox(tester.substring(10));
               successData=false;
            }else if(patt2.test(tester)){
               successData=true;
            }
         },
         error: function(jqXHR, textStatus, errorThrown) {
            createAlertBox("Network error. Please try again later.");
            successData=false;
         },
         complete: function(jqXHR, textStatus) {
            if(successData == true){
               renderMainView(getYoursX,"yours");
            }else if(successData == false){
               copiesModel=[];
               copiesCheckedModel=[];
               yoursCheckedModelFull=[];
            }
         }
      });
   }
   function getOrphans(params){
      var comm=params.command;
      var successData=true;
      var getOrphansX;
      $.ajax({
         type:'GET',
         contentType: 'application/x-www-form-urlencoded',
         dataType:'xml',
         url:server +'kinnective4/fullway30e.php',
         data:params,
         success: function(data) {
            getOrphansX=data;
            var tester=$(getOrphansX).find('status').text();
            var patt=/ERROR/;
            var patt2=/OK/;
            if(patt.test(tester)){
               createAlertBox(tester.substring(10));
               successData=false;
            }else if(patt2.test(tester)){
               successData=true;
               }
         },
         error: function(jqXHR, textStatus, errorThrown) {
            createAlertBox("Network error. Please try again later.");
            successData=false;
         },
         complete: function(jqXHR, textStatus) {
            if(successData == true){
               renderSearchView(getOrphansX);
            }
         }
      });
   }
   function saveFavs(){
      var st=$('#results').html().toString();
      var stStart="<!DOCTYPE NETSCAPE-Bookmark-file-1>";
      var finalSt="" + stStart + st;
      $.ajax({
         type:'POST',
         //contentType: 'multipart/form-data',
         //contentType: 'text/html',
         contentType: 'application/x-www-form-urlencoded',
         dataType:'xml',
         url:server +'kinnective4/fullway30e.php',
         data:{
            xml:1,
            command:38,
            favs:finalSt
         },
         success: function(data) {
            //createAlertBox("saveFaves Success");
            var x=data;
            var tester=$(x).find('status').text();
            var patt=/ERROR/;
            if(patt.test(tester)){
               createAlertBox(tester.substring(10));
            }
            
         },
         error: function(jqXHR, textStatus, errorThrown) {
            createAlertBox("Network error. Please try again later.");
         },
         complete: function(jqXHR, textStatus) {
            //createAlertBox("Complete");
         }
      });
         //var htmlString=yoursModel[yoursModel.length -1].parent.toString();
   }
   function getComments() {
      var wp=discussWaypointID;
      var comX;
      $.ajax({
         type:'GET',
         contentType: 'application/x-www-form-urlencoded',
         dataType:'xml',
         url:server +'kinnective4/fullway30e.php',
         data:{
            xml:1,
            command:13,
            node:wp
   
         },
         success: function(data) {
            comX=data;
            var tester=$(comX).find('status').text();
            var patt=/ERROR/;
            var patt2=/OK/;
            if(patt.test(tester)){
               createAlertBox(tester.substring(10));
            }
            else{
               renderCommentsView(comX);
            }
         },
         error: function(jqXHR, textStatus, errorThrown) {
            createAlertBox("Network error. Please try again later.");
         },
         complete: function(jqXHR, textStatus) {
   
         }
      });
   }
   function renderCommentsView(comXML){
      $.mobile.changePage('#discuss');
      $('#comBCString').text(discussBCS);
      $('#comTitleString').text(discussTitle);
      if(discussWaypointID == yoursWaypointID){
         $('#pingAdd').hide();
      }else{
         $('#pingAdd').show();
      }
      document.getElementById('discussListContainerCG').innerHTML="";
      var thisNode1;

      var dummyDiv;
      var finalDiv;
      var commentText;
      var ownerText;
      var idText;
      var dateText;
      var roundString1='<div class="dataBarColor commentDataBar ui-corner-top" id="';
      var cornerString1='<div class="dataBarColor commentDataBar" id="';
      var midString1='"><div class="comment"><p class="commentText">';
      var midString2='</p><p class="commentOwner">';
      var midString3='</p><p class="commentDate">';
      var midString4='</p></div><div class="commentVote" data-role="controlgroup" data-type="horizontal" data-mini="true"><a href="#" data-role="button" data-icon="plus" class="commentPlus">Agree</a><a href="#" data-role="button" data-icon="minus" class="commentMinus">Disagree</a></div></div>';
      $($(comXML).find('comment').get().reverse()).each(function(index){
         commentText=$(this).find('quote').text();
         ownerText=$(this).find('username').text();
         dateText=""+$(this).find('month').text() + " " + $(this).find('day').text() + " " + $(this).find('hours').text() + ":" + $(this).find('minutes').text();
         idText=$(this).find('id').text();
         if(index == 0){
            thisNode1="" + roundString1 + idText + midString1 + commentText + midString2 + ownerText + midString3 + dateText + midString4;
            dummyDiv=document.createElement('div');
            dummyDiv.innerHTML=thisNode1;
            finalDiv=$(dummyDiv).find('.commentDataBar')[0];
            $(finalDiv).appendTo('#discussListContainerCG');
         }else if(index > 0){
            thisNode1="" + cornerString1 + idText + midString1 + commentText + midString2 + ownerText + midString3 + dateText + midString4;
            dummyDiv=document.createElement('div');
            dummyDiv.innerHTML=thisNode1;
            finalDiv=$(dummyDiv).find('.commentDataBar')[0];
            $(finalDiv).appendTo('#discussListContainerCG');
            }
      });
      $.ajax({
         type:'GET',
         contentType: 'application/x-www-form-urlencoded',
         dataType:'xml',
         url:server +'kinnective4/fullway30e.php',
         data:{
            xml:1,
            command:39,
            node:discussWaypointID,
            edit_offset:0
         },
         success: function(data) {
            var tester=$(data).find('status').text();
            var patt=/ERROR/;
            var patt2=/waypoint/;
            if(patt.test(tester)){
               createAlertBox(tester.substring(10));
            }
            else{
               //(patt2.test(tester)){
               var eID=$(data).find('editid').text();
               var editorID=$(data).find('editor').text();
               var editDescrip=$(data).find('description').text();
               var trustPoints = $(data).find('editor_points').text();
               $('#commentsLastEditString').text(editDescrip);
               $('#editorName').text(editorID);
               $('#defaultTrustTotal').text(trustPoints);
            }
         },
         error: function(jqXHR, textStatus, errorThrown) {
            createAlertBox("Network error. Please try again later.");
         },
         complete: function(jqXHR, textStatus) {
   
         }
      });
      $('.commentPlus').click(function(e){
         var barVar=$(this).parents('.commentDataBar')[0];
         var num=$(barVar).attr('id');
         $.ajax({
            type:'GET',
            contentType: 'application/x-www-form-urlencoded',
            dataType:'xml',
            url:server +'kinnective4/fullway30e.php',
            data:{
               xml:1,
               command:74,
               comment_id:num,
               vote:1
            },
            success: function(data) {
               var tester=$(data).find('status').text();
               var patt=/ERROR/;
               var patt2=/OK/;
               if(patt.test(tester)){
                  createAlertBox(tester.substring(10));
               }
               else if(patt2.test(tester)){
                  createAlertBox("Your vote has been registered..");//createAlertBox(editID);
               }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               createAlertBox("Network error. Please try again later.");
            },
            complete: function(jqXHR, textStatus) {
      
            }
         });
         
      });
      $('.commentMinus').click(function(e){
         var barVar=$(this).parents('.commentDataBar')[0];
         var num=$(barVar).attr('id');
         var ID=yoursWaypointID;
         $.ajax({
            type:'GET',
            contentType: 'application/x-www-form-urlencoded',
            dataType:'xml',
            url:server +'kinnective4/fullway30e.php',
            data:{
               xml:1,
               command:74,
               comment_id:num,
               vote:0
            },
            success: function(data) {
               var tester=$(data).find('status').text();
               var patt=/ERROR/;
               var patt2=/OK/;
               if(patt.test(tester)){
                  createAlertBox(tester.substring(10));
               }
               else if(patt2.test(tester)){
                  createAlertBox("Your vote has been registered..");//createAlertBox(editID);
               }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               createAlertBox("Network error. Please try again later.");
            },
            complete: function(jqXHR, textStatus) {
      
            }
         });
         
      });
     $("#discussListContainerCG .comment").on("touchmousedown", function(e) {
            e.originalEvent.preventDefault();
            if(momentum!=null){
                clearInterval(momentum);
                momentum=null;
            }
            mouseLog=[];
            var itemThis={};
           itemThis.y=e.pageY;
           itemThis.time=e.originalEvent.timeStamp;
            mouseLog.push(itemThis);
            scrolling=true;
            diff=0;
            thisScroller = document.getElementById('discussListContainerCG');
            scrollToY=thisScroller.scrollTop+e.pageY;
     });
    $("#discussListContainerCG .comment").on("touchmousemove",  function(e) {
        e.originalEvent.preventDefault();
        if(scrolling){
                    postMouse(e);
                    if ((thisScroller.scrollTop < thisScroller.scrollHeight-thisScroller.offsetHeight &&thisScroller.scrollTop+e.pageY < scrollToY-5) ||(thisScroller.scrollTop != 0 && thisScroller.scrollTop+e.pageY > scrollToY+5)){
                     thisScroller.scrollTop=scrollToY-e.pageY;
                    }
        }
    });
    $("#discussListContainerCG .comment").on('touchmouseup',function(e){
                  e.originalEvent.preventDefault();
                  scrolling=false;
                 if(mouseLog.length > 1){
                     var ml=mouseLog;
                     var newY=mouseLog[mouseLog.length-1].y;
                     var oldY=mouseLog[mouseLog.length-2].y;
                     var newTime=mouseLog[mouseLog.length-1].time;
                     var oldTime=mouseLog[mouseLog.length-2].time;
                     var distanceDiff = newY-oldY;
                     var timeDiff=newTime-oldTime;
                     var timeDiffPer=timeDiff/1000;
                     diff=distanceDiff/timeDiffPer;
                     var topPart = thisScroller.scrollTop;
                     var bottomPart = thisScroller.scrollHeight - (thisScroller.scrollTop + thisScroller.clientHeight);
                         if(diff<0 && Math.abs(diff)>bottomPart){
                            diff=(bottomPart*(-1));
                         }else if(diff>0 && diff>topPart){
                             diff=topPart;
                         }
                     if(momentum==null){
                     momentum=setInterval(function(){mom();},50);
                     }
                 }else{
                 }
         });
     $('#discuss').trigger('pagecreate');
   }
   function renderSearchView(xmlInfo) {
               searchModel.push(xmlInfo);
               document.getElementById('searchListContainerCG').innerHTML="";
               var idVar;
               var titleVar;
               var parent;
              var textDirectionSub;
              var urlVar;
               var statusVar;
               var dummyDiv;
               var finalDiv;
               var path;
               var thisNode1;
               var topString1A='<div class="dataBarColor dataBar ui-corner-top" number="';
               var topString1B='" type="';
               var topString1C='" parent="';
               var topString1D='"><div class="checkBoxDiv"><input class="check" type="checkbox" data-role="none" title="Select this Direction"></input></div><!-- end of checkBoxDiv --><div class="dataBarTitle"><p class="dataBarTitleP"><span class="titleSpan">';
               var topString2='</span></p></div><!-- end of dataBarTitle --><div class="swoop"><a href="';
               var topString3='" class="swoopBtn" data-role="button" data-icon="forward" data-iconpos="notext" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="a" title="Go to link" class="ui-btn ui-btn-up-a ui-btn-icon-notext ui-corner-top"><span class="ui-btn-inner ui-corner-top"><span class="ui-btn-text">Link</span><span class="ui-icon ui-icon-forward ui-icon-shadow">&nbsp;</span></span></a></div><!-- end of swoop -->';
               var topString4='<div class="arrowR"><a href="#" class="arrowRBtn" data-role="button" data-icon="arrow-r" data-iconpos="notext" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="a" title="Go to folder" class="ui-btn ui-btn-up-a ui-btn-icon-notext"><span class="ui-btn-inner"><span class="ui-btn-text">Folder</span><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></span></a></div><!-- end of arrowR -->';
               var topString4B='<div class="searchArrowLDiv"><a href="#" class="searchArrowLBtn" data-role="button" data-icon="arrow-l" data-iconpos="notext" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="a" title="Go to parent Waypoint" class="ui-btn ui-btn-up-a ui-btn-icon-notext"><span class="ui-btn-inner"><span class="ui-btn-text">Parent folder</span><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></span></a></div><!-- end of searchArrowL -->';
               var topString5='</div><!-- end of dataBar -->';
               var barString1A='<div class="dataBarColor dataBar" number="';
               var barString1B='" type="';
               var barString1C='"><div class="checkBoxDiv"><input class="check" type="checkbox" data-role="none" title="Select this Direction"></input></div><!-- end of checkBoxDiv --><div class="dataBarTitle"><p class="dataBarTitleP"><span class="titleSpan">';
               if($(xmlInfo).find('result').length > 0){
               $('#searchInfoSpan').text("Search");
               $(xmlInfo).find('result').each(function(index) {
                  idVar=$(this).find('waypointid').text();
                  titleVar=$(this).find('title').text();
                  parent=$(this).find('parent').text();
                  textDirectionSub=titleVar.substring(0,25);
                  urlVar=$(this).find('urls').text();
                  statusVar=$(this).find('status').text();
                  if(index == 0) {
                       if(urlVar == ""){
                          thisNode1="" + topString1A + idVar + topString1B  + statusVar + topString1C + parent + topString1D + textDirectionSub +topString2 + "#" + topString3 + topString4 + topString5;
                          dummyDiv=document.createElement('div');
                          dummyDiv.innerHTML=thisNode1;
                          finalDiv=$(dummyDiv).find('.dataBar')[0];
                          $(finalDiv).appendTo('#searchListContainerCG');
                       }else if(urlVar != ""){
                          if(statusVar == 0||statusVar==2){
                          thisNode1="" + topString1A + idVar + topString1B + statusVar + topString1C + parent + topString1D + textDirectionSub + topString2 + urlVar + topString3 + topString4B + topString5;
                          }else{
                           thisNode1=topString1A + idVar + topString1B + statusVar + topString1C + parent + topString1D + textDirectionSub + topString2 + urlVar + topString3 +  topString5;
                          }
                          dummyDiv=document.createElement('div');
                          dummyDiv.innerHTML=thisNode1;
                          finalDiv=$(dummyDiv).find('.dataBar')[0];
                          $(finalDiv).appendTo('#searchListContainerCG');
                       }
               }else if(index > 0){
                  if(urlVar == ""){
                          thisNode1="" + barString1A + idVar + barString1B + statusVar + topString1C + parent + topString1D + textDirectionSub +topString2 + "#" + topString3 + topString4 + topString5;
                          dummyDiv=document.createElement('div');
                          dummyDiv.innerHTML=thisNode1;
                          finalDiv=$(dummyDiv).find('.dataBar')[0];
                          $(finalDiv).appendTo('#searchListContainerCG');
                       }else if(urlVar != ""){
                          if(statusVar == 0||statusVar==2){
                            thisNode1="" + barString1A + idVar + barString1B + statusVar + topString1C + parent + topString1D + textDirectionSub +topString2 + urlVar + topString3 + topString4B + topString5;
                          }else{
                             thisNode1="" + barString1A + idVar + barString1B + statusVar + topString1C + parent + topString1D + textDirectionSub +topString2 + urlVar + topString3 + topString5;
                          }
                          dummyDiv=document.createElement('div');
                          dummyDiv.innerHTML=thisNode1;
                          finalDiv=$(dummyDiv).find('.dataBar')[0];
                          $(finalDiv).appendTo('#searchListContainerCG');
                       }         
                    }
               });
               }else if($(xmlInfo).find('direction').length > 0){
               var titl=$(xmlInfo).find('title').text();
               $('#searchInfoSpan').text(titl);
               $(xmlInfo).find('direction').each(function(index,value) {
                  parent=$(this).find('parent').text();
                  idVar=$(this).find('id').text();
                  titleVar=$(this).find('name').text();
                  textDirectionSub=titleVar.substring(0,25);
                  urlVar=$(this).find('url').text();
                  statusVar=1;
                  path=$(this).find('pathnum').text();
                  if(idVar > 0 && path > 0){
                     if(index == 0) {
                       if(urlVar == ""){
                          thisNode1="" + topString1A + idVar + topString1B  + statusVar + topString1C + parent + topString1D + textDirectionSub + topString2 + "#" + topString3 + topString4 + topString5;
                          dummyDiv=document.createElement('div');
                          dummyDiv.innerHTML=thisNode1;
                          finalDiv=$(dummyDiv).find('.dataBar')[0];
                          $(finalDiv).appendTo('#searchListContainerCG');
                       }else if(urlVar != ""){
                          thisNode1="" + topString1A + idVar + topString1B + statusVar + topString1C + parent + topString1D + textDirectionSub +topString2 + urlVar + topString3 + topString5;
                          dummyDiv=document.createElement('div');
                          dummyDiv.innerHTML=thisNode1;
                          finalDiv=$(dummyDiv).find('.dataBar')[0];
                          $(finalDiv).appendTo('#searchListContainerCG');
                       }
                    }else if(index > 0){
                       if(urlVar == ""){
                          thisNode1="" + barString1A + idVar + topString1B + statusVar + topString1C + parent + topString1D + textDirectionSub +topString2 + "#" + topString3 + topString4 + topString5;
                          dummyDiv=document.createElement('div');
                          dummyDiv.innerHTML=thisNode1;
                          finalDiv=$(dummyDiv).find('.dataBar')[0];
                          $(finalDiv).appendTo('#searchListContainerCG');
                       }else if(urlVar != ""){
                          thisNode1="" + barString1A + idVar + topString1B + statusVar + topString1C + parent + topString1D + textDirectionSub +topString2 + urlVar + topString3 + topString5;
                          dummyDiv=document.createElement('div');
                          dummyDiv.innerHTML=thisNode1;
                          finalDiv=$(dummyDiv).find('.dataBar')[0];
                          $(finalDiv).appendTo('#searchListContainerCG');
                       }         
                    }
                  }
               });
            }else{
               $('#searchInfoSpan').text("Search yielded 0 results");
            }
          $("#searchListContainerCG .dataBarTitle").on("touchmousedown", function(e) {
            e.originalEvent.preventDefault();
            if(momentum!=null){
                clearInterval(momentum);
                momentum=null;
            }
            mouseLog=[];
            var itemThis={};
           itemThis.y=e.pageY;
           itemThis.time=e.originalEvent.timeStamp;
            mouseLog.push(itemThis);
            scrolling=true;
            diff=0;
            thisScroller = document.getElementById('searchListContainerCG');
            scrollToY=thisScroller.scrollTop+e.pageY;
     });
    $("#searchListContainerCG .dataBarTitle").on("touchmousemove",  function(e) {
        e.originalEvent.preventDefault();
        if(scrolling){
                    postMouse(e);
                    if ((thisScroller.scrollTop < thisScroller.scrollHeight-thisScroller.offsetHeight &&thisScroller.scrollTop+e.pageY < scrollToY-5) ||(thisScroller.scrollTop != 0 && thisScroller.scrollTop+e.pageY > scrollToY+5)){
                     thisScroller.scrollTop=scrollToY-e.pageY;
                    }
        }
    });
    $("#searchListContainerCG .dataBarTitle").on('touchmouseup',function(e){
                  e.originalEvent.preventDefault();
                  scrolling=false;
                 if(mouseLog.length > 1){
                     var ml=mouseLog;
                     var newY=mouseLog[mouseLog.length-1].y;
                     var oldY=mouseLog[mouseLog.length-2].y;
                     var newTime=mouseLog[mouseLog.length-1].time;
                     var oldTime=mouseLog[mouseLog.length-2].time;
                     var distanceDiff = newY-oldY;
                     var timeDiff=newTime-oldTime;
                     var timeDiffPer=timeDiff/1000;
                     diff=distanceDiff/timeDiffPer;
                     var topPart = thisScroller.scrollTop;
                     var bottomPart = thisScroller.scrollHeight - (thisScroller.scrollTop + thisScroller.clientHeight);
                     if(diff<0 && Math.abs(diff)>bottomPart){
                            diff=(bottomPart*(-1));
                     }else if(diff>0 && diff>topPart){
                             diff=topPart;
                     }
                     if(momentum==null){
                     momentum=setInterval(function(){mom();},50);
                     }
                     }
         });
               $('#searchListContainerCG a').attr('rel','external');
               $('#searchListContainerCG a').attr('target','_blank');
               $('#searchListContainerCG .arrowRBtn').click(function(ee) {
                     var barVar=$(this).parents('.dataBar')[0];
                     var ID=$(barVar).attr('number');
                     var type=$(barVar).attr('type');
                     var com="9";
                     var xm="1";
                     var pars={
                        command:com,
                        node:ID,
                        xml:xm
                     };
                     if(type == 0){
                        getOursAgain(pars);
                     }else if(type == 2){
                        getYoursAgain(pars);
                     }else if(type == 1 || type == 3){
                        getOrphans(pars);
                     }
               });
               $('#searchListContainerCG .swoopBtn').click(function(ee) {
               });
               $('#searchListContainerCG .searchArrowLBtn').click(function(ee) {
                     var barVar=$(this).parents('.dataBar')[0];
                     var ID=$(barVar).attr('parent');
                     var type=$(barVar).attr('type');
                     var com="9";
                     var xm="1";
                     var pars={
                        command:com,
                        node:ID,
                        xml:xm
                     };
                     /////this can apply only to active nodes
                     if(type == 0){
                        getOursAgain(pars);
                     }else if(type == 2){
                        getYoursAgain(pars);
                     }else if(type == 1 || type == 3){
                        getOrphans(pars);
                     }
               });
               $('#searchListContainerCG input.check').click(function (e) {
                     var item={};
                     var barVar=$(this).parents('.dataBar')[0];
                     item.bar=barVar;
                     item.id=$(barVar).attr('number');
                     item.title=$('.titleSpan',barVar).text();
                     item.link=$(barVar).find('a').attr('href');
                     item.obj=this;
                     if(this.checked == true) {
                        searchCheckedModel.push(item);
                     }else if(this.checked != true) {
                        $(searchCheckedModel).each(function(index, value){
                              if(barVar == value.bar){
                              searchCheckedModel.splice(index,1);
                              }
                        });
                     }
                  });
               $('#searchListContainerCG .dataBar').each(function () {
                  if($(this).attr("type") == 1 || $(this).attr("type") == 3){
                     if($(this).hasClass('dataBarColor')){
                        $(this).removeClass('dataBarColor');
                        $(this).addClass('orphanColor');
                        $(this).find('.titleSpan').css('color','#2880c9');
                     }
                  }
               });
               //createAlertBox("Lenth of div array in yoursListContainerCG is:  " + $('#yoursListContainerCG div').length);
               if($('#searchInfoSpan').text() == "Search" || $('#searchInfoSpan').text() == "Search yielded 0 results"){
                     $('#searchBackBtn').css('display','none');
                     $('#searchInfoTitle b').text("Window shows children of:");
               }else{
                     $('#searchBackBtn').css('display','inline-block');
                     $('#searchInfoTitle b').text("Window shows children of orphan:");
               }
               var yH=$('#searchAdd .check').innerHeight();
               var xH=$('#searchAdd .dataBar').height();
               var fixH=(xH - yH)/2;
               $('#searchAdd .check').css('position','absolute');
               if(isAndroid && win < 500){
                 $('#searchAdd .check').css('top',fixH - 2);
               }else{
              $('#searchAdd .check').css('top',fixH);
               }
              $('#searchAdd').trigger('pagecreate');
}
function renderCopiesView(){
               $.mobile.changePage('#copies');
               var title;
               var ind;
               var idVar;
               var link;
               var dummyDiv;
               var thisNode1;
               var finalDiv;
               document.getElementById('copiesListContainerCG').innerHTML="";
               var topString1A='<div class="dataBarColor dataBar ui-corner-top" number="';
               var topString1B='" id="';
               var topString1C='"><div class="checkBoxDiv" data-role="none"><input class="check" type="checkbox" data-role="none" title="Select this Direction"></div><!-- end of checkBoxDiv --><div class="dataBarTitle"><p class="dataBarTitleP"><span class="titleSpan">';
               var topString2='</span></p></div><!-- end of dataBarTitle --><div class="swoop"><a href="';
               var topString3='" class="swoopBtn" data-role="button" data-icon="forward" data-iconpos="notext" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="a" title="Link" class="ui-btn ui-btn-up-a ui-btn-icon-notext ui-corner-top"><span class="ui-btn-inner ui-corner-top"><span class="ui-btn-text">Link</span><span class="ui-icon ui-icon-forward ui-icon-shadow">&nbsp;</span></span></a></div><!-- end of swoop -->';
               var topString4='<div class="arrowR"><a href="#" class="arrowRBtn" data-role="button" data-icon="arrow-r" data-iconpos="notext" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="a" title="Folder" class="ui-btn ui-btn-up-a ui-btn-icon-notext"><span class="ui-btn-inner"><span class="ui-btn-text">Folder</span><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></span></a></div><!-- end of arrowR -->';
               var topString5='</div><!-- end of dataBar -->';
               var barString1A='<div class="dataBarColor dataBar" number="';
               var barString1B='" id="';
               var barString1C='"><div class="checkBoxDiv" data-role="none"><input class="check" type="checkbox" data-role="none" title="Select this Direction"></div><!-- end of checkBoxDiv --><div class="dataBarTitle"><p class="dataBarTitleP"><span class="titleSpan">';
               var cmLength=copiesModel.length;
               $.each(copiesModel, function(index,value) {
                  title=this.title;
                  ind=this.direction;
                  idVar=this.id;
                  link=this.link;
                  if(index == 0){
                        if(link == "#"){
                           thisNode1="" + topString1A + ind + topString1B + idVar + topString1C + title + topString2 + link + topString3 + topString4 + topString5;
                           dummyDiv=document.createElement('div');
                           dummyDiv.innerHTML=thisNode1;
                           finalDiv=$(dummyDiv).find('.dataBar')[0];
                           $(finalDiv).appendTo('#copiesListContainerCG');
                        }else if(link != "#"){
                           thisNode1="" + barString1A + ind + barString1B + idVar + barString1C + title + topString2 + link + topString3 + topString5;
                           dummyDiv=document.createElement('div');
                           dummyDiv.innerHTML=thisNode1;
                           finalDiv=$(dummyDiv).find('.dataBar')[0];
                           $(finalDiv).appendTo('#copiesListContainerCG');
                        }
                  }else if(index > 0){
                        if(link == "#"){
                              thisNode1="" + barString1A + ind + barString1B + idVar + barString1C + title + topString2 + link + topString3 + topString4 + topString5;
                              dummyDiv=document.createElement('div');
                              dummyDiv.innerHTML=thisNode1;
                              finalDiv=$(dummyDiv).find('.dataBar')[0];
                              $(finalDiv).appendTo('#copiesListContainerCG');
                        }else if(link != "#"){
                              thisNode1="" + barString1A + ind + barString1B + idVar + barString1C + title + topString2 + link + topString3 + topString5;
                              dummyDiv=document.createElement('div');
                              dummyDiv.innerHTML=thisNode1;
                              finalDiv=$(dummyDiv).find('.dataBar')[0];
                              $(finalDiv).appendTo('#copiesListContainerCG');
                     }
                  }
               });
     $("#copiesListContainerCG .dataBarTitle").on("touchmousedown", function(e) {
            e.originalEvent.preventDefault();
            if(momentum!=null){
                clearInterval(momentum);
                momentum=null;
            }
            mouseLog=[];
            var itemThis={};
           itemThis.y=e.pageY;
           itemThis.time=e.originalEvent.timeStamp;
            mouseLog.push(itemThis);
            scrolling=true;
            diff=0;
            thisScroller = document.getElementById('copiesListContainerCG');
            scrollToY=thisScroller.scrollTop+e.pageY;
     });
    $("#copiesListContainerCG .dataBarTitle").on("touchmousemove",  function(e) {
        e.originalEvent.preventDefault();
        if(scrolling){
                    postMouse(e);
                    e.preventDefault();
                    if ((thisScroller.scrollTop < thisScroller.scrollHeight-thisScroller.offsetHeight &&thisScroller.scrollTop+e.pageY < scrollToY-5) ||(thisScroller.scrollTop != 0 && thisScroller.scrollTop+e.pageY > scrollToY+5)){
                     thisScroller.scrollTop=scrollToY-e.pageY;
                    }
        }
    });
    $("#copiesListContainerCG .dataBarTitle").on('touchmouseup',function(e){
                  e.originalEvent.preventDefault();
                  scrolling=false;
                 if(mouseLog.length > 1){
                     var ml=mouseLog;
                     var newY=mouseLog[mouseLog.length-1].y;
                     var oldY=mouseLog[mouseLog.length-2].y;
                     var newTime=mouseLog[mouseLog.length-1].time;
                     var oldTime=mouseLog[mouseLog.length-2].time;
                     var distanceDiff = newY-oldY;
                     var timeDiff=newTime-oldTime;
                     var timeDiffPer=timeDiff/1000;
                     diff=distanceDiff/timeDiffPer;
                     var topPart = thisScroller.scrollTop;
                     var bottomPart = thisScroller.scrollHeight - (thisScroller.scrollTop + thisScroller.clientHeight);
                         if(diff<0 && Math.abs(diff)>bottomPart){
                            diff=(bottomPart*(-1));
                         }else if(diff>0 && diff>topPart){
                             diff=topPart;
                         }
                     if(momentum==null){
                     momentum=setInterval(function(){mom();},50);
                     }
                 }
         });
               $(copiesCheckedModel).each(function(index,value){
                  var checkID=value.id;
                  $('#copiesListContainerCG .dataBar').each(function(ind,val){
                     var barCheckID=$(this).attr('id');
                     if(checkID == barCheckID){
                        $(this).find('.check').attr('checked',true);
                        return;
                     }
                  });
               });
               $('#copiesListContainerCG input.check').click(function (e) {
                  var item={};
                  var barVar=$(this).parents('.dataBar')[0];
                  item.bar=barVar;
                  var barVarText=$('.titleSpan',barVar).text();
                  item.title=barVarText;
                  item.id=$(barVar).attr('id');
                  if(this.checked == true) {
                     copiesCheckedModel.push(item);
                  }
                  else if(this.checked != true) {
                     $(copiesCheckedModel).each(function(index, value){
                        if(item.id == value.id){
                           copiesCheckedModel.splice(index,1);
                           return false;
                        }
                     });
                  }
               });
               var yH=$('#copies .check').innerHeight();
               var xH=$('#copies .dataBar').height();
               var fixH=(xH - yH)/2;
              $('#copies .check').css('position','absolute');
             if(isAndroid && win < 500){
             $('#copies .check').css('top',fixH - 2);
             }else{
             $('#copies .check').css('top',fixH);
             }
             $('#copies').trigger('pagecreate');
   }
   function touchScroll() {
     if (isTouchDevice()) {
       var scrollStartPosY=0;
      var scrollStartPosX=0;
      $("body").on("touchstart", ".scrollable", function(e) {
      scrollStartPosY=this.scrollTop+e.originalEvent.touches[0].pageY;
      scrollStartPosX=this.scrollLeft+e.originalEvent.touches[0].pageX;
      });
      $("body").on("touchmove", ".scrollable", function(e) {
      if ((this.scrollTop < this.scrollHeight-this.offsetHeight &&
      this.scrollTop+e.originalEvent.touches[0].pageY < scrollStartPosY-5) ||
          (this.scrollTop != 0 && this.scrollTop+e.originalEvent.touches[0].pageY > scrollStartPosY+5)){
             e.preventDefault();
      }
      if ((this.scrollLeft < this.scrollWidth-this.offsetWidth &&
      this.scrollLeft+e.originalEvent.touches[0].pageX < scrollStartPosX-5) ||
          (this.scrollLeft != 0 && this.scrollLeft+e.originalEvent.touches[0].pageX > scrollStartPosX+5)){
         e.preventDefault();
      }
      this.scrollTop=scrollStartPosY-e.originalEvent.touches[0].pageY;
      this.scrollLeft=scrollStartPosX-e.originalEvent.touches[0].pageX;
      });
     }
   }
   function unTouchScroll(selector) {
   if (isTouchDevice()) {
      $('body').off("touchstart",".scrollable");
      $('body').off("touchmove",".scrollable");
     }
   }
   function isTouchDevice(){
      try{
         document.createEvent("TouchEvent");
         return true;
      }catch(e){
         return false;
      }
   }
   function CloneObject(source) {
      for (var i in source) {
      if (typeof source[i] == 'source') {
         this[i]=new CloneObject(source[i]);
      }

      else {
         this[i]=source[i];
      }
      }
   }
   function sign(){
         if($('#username').val() != "" && $('#password').val() != ""){
         $('#si').trigger('click');
       }
   }
   function testCSS(prop) {
      return prop in document.documentElement.style;
   }
   function dragIt(conSt,pageString,target){
         moveIt(conSt,pageString,target);
         var dragThing=dragger.obj[0];
         var dragPosTop=dragThing.getBoundingClientRect().top;
         if(dragPosTop < dragger.topVerge&& $(conSt).scrollTop()>0){
               creepUp(conSt);
         }else if(dragPosTop > dragger.bottomVerge&&$(conSt).scrollTop() < scrollBottomH&&dragPosTop > dragger.initPosY){
               creepDown(conSt);
         }
   }
   function moveIt(conSt,pageString,target){
       if(mouseLog.length>1){
         var dTTop = mouseLog[mouseLog.length-1].y - dragger.moveSpace;
         var dTLeft=mouseLog[mouseLog.length-1].x - dragger.moveSpaceLeft;
         var compLeft=dTLeft - container.getBoundingClientRect().left;
         if(dTLeft<(dragger.initPosX)+15){
             dTLeft=dragger.initPosX;
         }
         $(dragger.obj).offset({top:dTTop,left:dTLeft});
         var keyWidth=$('' + conSt + ' .grabBoxDiv').outerWidth() + 6;
         if(compLeft > keyWidth){
             positionIt(conSt,pageString,target);
         }else{
             dropInto=false;
             dropIntoTarget=null;
             droppingTarget=null;
             droppingDirection=null;
             droppingSide=null;
             $('' + conSt + ' .dataBar').removeClass("dataBarYellow");
             $('' + conSt + ' .dataBar').addClass("dataBarColor");
         }
       }
   }
   function positionIt(conSt,pageString,target){
       try{
       var dataBarOver;
       var dataBarOverChildren;
       var dataBarTarget = dragger.obj[0];
       var dataBarTargetTop = dataBarTarget.getBoundingClientRect().top;
       var dataBarTargetHeightFactor=($('' + conSt + ' .dataBar').outerHeight())/2;
       var dataBarTargetLeft = dataBarTarget.getBoundingClientRect().left;
       var elementOver = document.elementFromPoint(dataBarTargetLeft - 2,dataBarTargetTop+dataBarTargetHeightFactor);
       var dataBarCollectionOver = $(elementOver).closest('.dataBar');
       if(dataBarCollectionOver.length>0){
           dataBarOver=dataBarCollectionOver[0];
           dataBarOverChildren=dataBarOver.children.length;
       }else{
           dataBarOver=undefined;
       }
     }
    catch(err){
           debugLog("error in block 1: " + err.message);
    }
    try{
       if(dataBarOver != undefined && dataBarOver != oldDataBarOver){
           if(dataBarOverChildren > 4){
               $(dataBarOver).removeClass("dataBarColor");
               $(dataBarOver).addClass("dataBarYellow");
               dropInto=true;
               dropIntoTarget=dataBarOver.id;
               droppingTarget=dataBarTarget.id;
               droppingDirection=$(dataBarTarget).attr('number');
               droppingParent=waypID;
               droppingSide=target;
               if(oldDataBarOver!=undefined){
                   $(oldDataBarOver).removeClass('dataBarYellow');
                   $(oldDataBarOver).addClass('dataBarColor');
               }
           }
       oldDataBarOver=dataBarOver;
       }
    }catch(err){
        debugLog("error in block 2: " + err.message);
    }
   }
   function creepUp(conSt){
            var posTop=$(conSt).scrollTop();
            $(conSt).scrollTop(posTop - 16);
   }
   function creepDown(conSt){
            var posTop=$(conSt).scrollTop();
            $(conSt).scrollTop(posTop + 16);
   }
   function mom(){
       var clip;
       if(diff<0){
           clip=(-3);
       }else{
           clip=3;
       }
      if(diff < -5 || diff >5){
         thisScroller.scrollTop-=(diff/20 + clip);
         diff-=(diff/20 + clip);
      }else{
         clearInterval(momentum);
         momentum=null;
      }
   }
   function postMouse(e){
      var itemThis={};
      itemThis.y=e.pageY;
      itemThis.x=e.pageX;
      itemThis.time=e.originalEvent.timeStamp;
      mouseLog.push(itemThis);
      mousePosYNew=e.pageY;
      mousePosXNew=e.pageX;
      mousePos=e.pageY;
   }
   function debugLog(stringVar){
    var thisPost=document.createElement("p");
    thisPost.innerHTML=stringVar;
    $(thisPost).prependTo('#debuggerDiv');
    }
   function rebuildOursList(e) {
      var newList=[];
      var barList=$('#oursListContainerCG > .dataBar');
      $(barList).each(function(index, item){
         var itemL={};
         var id=$(this).attr('id');
         itemL.id=id;
         var pos=$(this).position().top;
         itemL.pos=pos;
         newList.push(itemL);
      });
      newList.sort(function(a,b){
         return a.pos - b.pos;
      });
      var matchID=dragger.id;
      $(newList).each(function(index,item){
         if(item.id == matchID){
            dragger.newDirection=index + 1;
            return(false);
         }
      });
      cutAndAddOursBar();
   }
   function cutAndAddOursBar(){
      var getOursX;
                  $.ajax({
                     type:'GET',
                     contentType: 'application/x-www-form-urlencoded',
                     dataType:'xml',
                     url:server +'kinnective4/fullway30e.php',
                     data:{
                        node:oursWaypointID,
                        command:"86",
                        pathA:dragger.oldDirection,
                        pathB:dragger.newDirection
                     },
                     success: function(data) {
                        getOursX=data;
                        var tester=$(getOursX).find('status').text();
                        var patt=/ERROR/;
                        var patt2=/OK/;
                        if(patt.test(tester)){
                           createAlertBox(tester.substring(10));
                           var backX=oursModel[oursModel.length - 1].xml;
                           renderMainView(backX,"ours");
                           return;
                        }else if(patt2.test(tester)){
                           renderMainView(getOursX,"ours");
                        }
                     },
                     error: function(jqXHR, textStatus, errorThrown) {
                        createAlertBox("Network error. Please try again later.");
                        var backX=oursModel[oursModel.length - 1].xml;
                           renderMainView(backX,"ours");
                           
                     },
                     complete: function(jqXHR, textStatus) {
                        //$('#ours').trigger('pagecreate');
   
                     }
            });
      
   }
   function rebuildYoursList(e) {
      var newList=[];
      var barList=$('#yoursListContainerCG > .dataBar');
      $(barList).each(function(index, item){
         var itemL={};
         var id=$(this).attr('id');
         itemL.id=id;
         var pos=$(this).position().top;
         itemL.pos=pos;
         newList.push(itemL);
      });
      newList.sort(function(a,b){
         return a.pos - b.pos;
      });
      var matchID=dragger.id;
      $(newList).each(function(index,item){
         if(item.id == matchID){
            dragger.newDirection=index + 1;
            return(false);
         }
      });
      cutAndAddYoursBar();
   }
   function cutAndAddYoursBar(){
      var getYoursX;
                  $.ajax({
                     type:'GET',
                     contentType: 'application/x-www-form-urlencoded',
                     dataType:'xml',
                     url:server +'kinnective4/fullway30e.php',
                     data:{
                        node:yoursWaypointID,
                        command:"86",
                        pathA:dragger.oldDirection,
                        pathB:dragger.newDirection
                     },
                     success: function(data) {
                        getYoursX=data;
                        var tester=$(getYoursX).find('status').text();
                        var patt=/ERROR/;
                        var patt2=/OK/;
                        if(patt.test(tester)){
                           createAlertBox(tester.substring(10));
                           var backX=yoursModel[yoursModel.length - 1].xml;
                           renderMainView(backX,"yours");
                           return;
                        }else if(patt2.test(tester)){
                           renderMainView(getYoursX,"yours");
                        }
                     },
                     error: function(jqXHR, textStatus, errorThrown) {
                        createAlertBox("Network error. Please try again later.");
                        var backX=yoursModel[yoursModel.length - 1].xml;
                        renderMainView(backX,"yours");
                     },
                     complete: function(jqXHR, textStatus) {
                        //$('#ours').trigger('pagecreate');
   
                     }
            });
      
   }
   function downloader(){
                  $.ajax({
                     type:'GET',
                     contentType: 'application/x-www-form-urlencoded',
                     dataType:'text',
                     url:server +'kinnective4/fullway30e.php',
                     data:{
                        node:0,
                        command:"35",
                     },
                     success: function(data) {
                        var tester=data;
                        downloadedHTML = tester;
                        localStorage.setItem("downloadedHTML",tester);
                        var patt=/ERROR/;
                        var patt2=/Bookmarks/;
                        if(patt.test(tester)){
                           createAlertBox(tester.substring(10));
                           return;
                        }else if(patt2.test(tester)){
                        var el = document.getElementById('downloadResult');
                        var elCon1 = document.getElementById('downloadResultContainer1');
                        var elCon2 = document.getElementById('downloadResultContainer2');
                        elCon1.innerHTML="";
                        elCon2.innerHTML="";
                        var downloadX= "" + data;
                        var dummyBr="<br/><p>Option 1: Copy the text you see below the blue button into any editor capable of saving an HTML file (Word, Notepad, etc). Save the document with the file suffix '.html' anywhere on your machine. You can then import the html file into any browser as a bookmarks file.</p><BR/><P>Option 2: If you would prefer to view the favorites file as web page and save from the browser menu, click on the blue button. When saving the page, choose 'Save as' and then 'Save as web page, complete.'</p><br/>";
                        var dummyP=document.createElement('p');
                        $(dummyP).text("" + downloadX);
                       $(dummyBr).prependTo(elCon1);
                       $(dummyP).appendTo(elCon2);
                        $(el).show();
                        }
                     },
                     error: function(jqXHR, textStatus, errorThrown) {
                        createAlertBox("Network error. Please try again later.");
                     },
                     complete: function(jqXHR, textStatus) {
                        //$('#ours').trigger('pagecreate');
   
                     }
            });
      
   }
  kinn.frameLoaded=function(){
         if(upload == true){
         upload=false;
         var i=document.getElementById('favoritesReturn');
         var y =(i.contentWindow || i.contentDocument);
         var d=y.document;
         var e=$(d).text();
         var patt=/Error/;
         var patt2=/OK/;
         var patt3=/ERROR/;
         if(patt.test(e)){
            createAlertBox(e.substring(10));
         }else if(patt2.test(e)){
            createAlertBox("Your favorites have loaded. You will now be redirected to the Yours page.");
            var to=setTimeout(function(){
               getYours();
               },4000);
         }else if(patt3.test(e)){
             createAlertBox(e.substring(10));
         }
      }
   };
   function resetStack(){
      discussBCS="";
      discussTitle="";
      copiesFlag="";
      yoursModel=[]; 
      oursModel=[];
      copiesModel=[];
      upload=false;
      copiesCheckedModel=[];
      oursCheckedModelFull=[];
      oursCheckedModelEmpty=[];
      yoursCheckedModelFull=[];
      yoursCheckedModelEmpty=[];
      oursWaypointID=-1;
      yoursWaypointID=-1;
      oursBCS="";
      yoursBCS="";
   }
   function oursBtns(){
      var ch=copiesCheckedModel.length;
      var cop=copiesModel.length;
         if(cop == 0){
            $('#oursCopyBtn').removeClass('ui-btn-active ui-state-persist');
            $('#oursPasteBtn').removeClass('ui-btn-active ui-state-persist');
         }else if(cop > 0){
            $('#oursCopyBtn').addClass('ui-btn-active ui-state-persist');
            if(ch == 0){
               $('#oursPasteBtn').removeClass('ui-btn-active ui-state-persist');
            }else if(ch > 0){
               $('#oursPasteBtn').addClass('ui-btn-active ui-state-persist');
            }
         }
         if(urlParams.title){
                       $('#oursGoToAdd').addClass('ui-btn-active');
                       $('#yoursGoToAdd').addClass('ui-btn-active');
         }else{
                       $('#oursGoToAdd').removeClass('ui-btn-active');
                       $('#yoursGoToAdd').removeClass('ui-btn-active');
         }
      $('#oursOursBtn, #oursOursBtn2').addClass('ui-btn-active ui-state-persist');
      $('#oursYoursBtn, #oursYoursBtn2').removeClass('ui-btn-active ui-state-persist');
      $('#oursSearchBtn, #oursSearchBtn2').removeClass('ui-btn-active');
   }
   function yoursBtns(){
      var ch=copiesCheckedModel.length;
      var cop=copiesModel.length;
         if(cop == 0){
            $('#yoursCopyBtn').removeClass('ui-btn-active ui-state-persist');
            $('#yoursPasteBtn').removeClass('ui-btn-active ui-state-persist');
         }else if(cop > 0){
            $('#yoursCopyBtn').addClass('ui-btn-active ui-state-persist');
            if(ch == 0){
               $('#yoursPasteBtn').removeClass('ui-btn-active ui-state-persist');
            }else if(ch > 0){
               $('#yoursPasteBtn').addClass('ui-btn-active ui');
            }
         }
         if(urlParams.title){
                       $('#oursGoToAdd').addClass('ui-btn-active');
                       $('#yoursGoToAdd').addClass('ui-btn-active');
         }else{
                       $('#oursGoToAdd').removeClass('ui-btn-active');
                       $('#yoursGoToAdd').removeClass('ui-btn-active');
         }
      $('#yoursYoursBtn, #yoursYoursBtn2').addClass('ui-btn-active');
      $('#yoursOursBtn, #yoursOursBtn2').removeClass('ui-btn-active');
      $('#yoursSearchBtn, #yoursSearchBtn2').removeClass('ui-btn-active');
                     
   }
   function refreshKinnreg4(){
               $.ajax({
               type:'GET',
               contentType: 'application/x-www-form-urlencoded',
               dataType:'html',
               url:server +'kinnreg4bbb.html',
               success: function(data) {
                  var k4=data;
                  $('#kinnreg4').html(k4);
                  $('#kinnreg4').trigger('pagecreate');
               },
               error: function(jqXHR, textStatus, errorThrown) {
                  createAlertBox("Network error 'k4'. Please try again later.");
               },
               complete: function(jqXHR, textStatus) {
                  
               }
               });
               touchScroll();
   }
   kinn.captchaSubmit4=function captchaSubmit4(e){
         e.preventDefault();
         var challenge=Recaptcha.get_challenge();
         var response=Recaptcha.get_response();
         var username=$('#captchaUserName').val();
         var useremail=$('#captchaUserEmail').val();
         var userid=$('#captchaUserID').val();
         $.ajax({
               type:'POST',
               contentType: 'application/x-www-form-urlencoded',
               dataType:'xml',
               url:server +'kinnective4/fullway30e.php',
               data:{
                     recaptcha_response_field:response,
                     recaptcha_challenge_field:challenge,
                     username:username,
                     command:80,
                     useremail:useremail,
                     userid:userid,
                },
               success: function(data) {
                     var getOursX=data;
                     var tester=$(data).find('status').text();
                     var patt=/ERROR/;
                     var patt2=/OK/;
                     if(patt.test(tester)){
                           createAlertBox(tester.substring(10));
                     }
                     else if(patt2.test(tester)){
                        createAlertBox("Your failure count has been reset and you can try again. You will be taken to the sign in page.");
                        var to=setTimeout(function(){
                           $.mobile.changePage('#signInP');
                           $('#signInP').trigger('pagecreate');
                        },5000);
                     }
               },
               error: function(jqXHR, textStatus, errorThrown) {
                     createAlertBox("Network error. Please try again later." + "  " + errorThrown);
               },
               complete: function(jqXHR, textStatus) {
                  Recaptcha.reload();
                  $('#captchaUserName').val("");
                  $('#captchaUserEmail').val("");
                  $('#captchaUserID').val("");
               }
         });
      };
      function refreshKinnreg3(){
               $.ajax({
               type:'GET',
               contentType: 'application/x-www-form-urlencoded',
               dataType:'html',
               url:server +'kinnreg3bb.html',
               success: function(data) {
                  var k3=data;
                  $('#kinnreg3').html(k3);
                  $('#kinnreg3').trigger('pagecreate');
               },
               error: function(jqXHR, textStatus, errorThrown) {
                  createAlertBox("Network error 'k3'. Please try again later.");
               },
               complete: function(jqXHR, textStatus) {
                  
               }
               });
   }
   function createAlertBox(string){
      var alertBoxString='<div class="alertBox dataBarColor ui-corner-all"><a class="deleteAlert" data-role="button" data-mini="true" data-icon="delete" data-iconpos="notext" href="">Delete</a><div class="innerAlertBox"><span class="alertSpan"></span></div></div>';
      var dummyDiv=document.createElement('div');
      dummyDiv.innerHTML=alertBoxString;
      var finalDiv=$(dummyDiv).find('.alertBox')[0];
      var pag=$.mobile.activePage;
      var mc=$(pag).find(".mainContainer");
      $(finalDiv).appendTo(mc);
      $('.alertSpan').text(string);
      $('.deleteAlert').button();
      $('.deleteAlert').click(function(e){
         $('.alertBox').hide();
         $('.alertBox').remove();
      });
      $('.alertBox').show();
   }
   function find(input){
    return $(input);
    }
   function fourBtns(){
         var str2 ='<ul><li><a href="#yours">Private</a></li><li><a href="#ours">Public</a></li><li><a href="#signInP">Sign In</a></li><li><a href="#searchAdd">Search</a></li></ul>';
         var mn=$('.mainNav');
         var ident="";
         $.each(mn,function(index,value){
             var links=$(this).find('a');
             $.each(links,function(index,value){
                if($(this).hasClass('ui-btn-active')){
                   ident=$(this).attr('href');
                }
             });
             $(this).html("");
             $(this).html(str2);
             var links2=$(this).find('a');
             $.each(links2, function(index,value){
                if(ident != ""  && ident == $(this).attr('href')){
                   $(this).addClass('ui-btn-active ui-state-persist');
                }
             });
             $(this).trigger('create');
         });
    }
    kinn.anamolyCall = function (params){
         $.ajax({
               type:'GET',
               contentType: 'application/x-www-form-urlencoded',
               dataType:'xml',
               url:server +'kinnective4/fullway30e.php',
               data:params,
               success: function(data) {
                   var patt=/ERROR/;
                   var patt2=/OK/;
                   if(patt.test(data)){
                     createAlertBox("An anamoly call, reporting an irregularity in data, has failed. Please check to see whether your operation succeeded, and repeat if necessary.");
                   }else if(patt2.test(data)){
                   }
               },
               error: function(jqXHR, textStatus, errorThrown) {
                  createAlertBox("Network error 'k4'. Please try again later.");
               },
               complete: function(jqXHR, textStatus) {
               }
               });
    }
   })();