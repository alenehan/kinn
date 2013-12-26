<!DOCTYPE html> 
<!-- v. 1a682 -->
<html>
<head>
<title>Kinnective</title>
<meta HTTP-EQUIV="expires" CONTENT="0">
<meta name="description" content="Kinnective is a web navigator built for your mobile, social world.">
<meta name="keywords" content="bookmarks, favorites, mobile, social">
<meta name="HandheldFriendly" CONTENT="True">
<meta name="MobileOptimized" CONTENT="320">
<link rel="shortcut icon" href="css/images/kinnective2.ico"/>
<link REL="apple-touch-icon" HREF="/apple-touch-icon.png"/>
<meta HTTP-EQUIV="cleartype" CONTENT="on">
<meta HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8" />
<meta name="viewport" CONTENT="width=device-width, initial-scale=1 user-scalable=no maximum-scale=1">
<link REL="stylesheet" HREF="css/kinncol.css" />
<link REL="stylesheet" HREF="css/kinnStyle1a682.css"/>
<script language="javascript" TYPE="text/javascript">
   var kinnGoogParams = {};
   var kinnGoog = /#/;
   var loc = window.location.href;
   if(kinnGoog.test(window.location.href) && !/\#(ours|yours|signInP|upload|searchAdd)/i.test(window.location.href)){
      var pieces1 = loc.split("kinnectiveURL=");
      var pieces2 = pieces1[1].split("kinnectiveTitle=");
      var pieces3=pieces2[0].replace("https","http");
      localStorage.setItem("googURL", pieces3);
      localStorage.setItem("googTitle",pieces2[1]);
      window.location.href = "index.html";
   }else if(!kinnGoog.test(window.location.href)){
      if(localStorage.googURL){
        kinnGoogParams.url = localStorage.getItem("googURL");
        kinnGoogParams.title = localStorage.getItem("googTitle");
        localStorage.removeItem("googTitle");
        localStorage.removeItem("googURL");
      }
   }
</script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-45585502-1', 'kinnective.com');
  ga('send', 'pageview');
</script>
<link REL="stylesheet" HREF="css/jquery.mobile.structure-1.1.0.min.css" />
<script SRC="scripts/jq.js" TYPE="text/javascript"></script>
<script SRC="scripts/1a682.js" TYPE="text/javascript"></script>
<script SRC="scripts/jqm.js" TYPE="text/javascript"></script>
</head> 
<body>
<div data-role="page" id="signInP" CLASS="pageMain" data-theme="a">
	<div CLASS="mainContainer"  data-role="content">
        <div CLASS="header" id="signInHeader">
              <div CLASS="logo" id="signInLogo">
                  <span CLASS="logoSpan">kinnective </span>
                  <span CLASS="bookmarkletSpan">
                   <a HREF="#help" CLASS="roundBtn" data-theme="a"  data-role="button" data-inline="true" data-mini="true">Help</a>
                  </span>
              </div><!--end of logo -->
              <div data-role="navbar" CLASS="mainNav" id="signInNavBar">
                 <ul class="fiveBtns">
                  <li><a HREF="#upLoad" CLASS="uploadBtnClass" id="signInPUploadBtn">Upload</a></li>
                  <li><a HREF="#yours" CLASS="yoursBtnClass" id="signInPYoursBtn">Private</a></li>
                  <li><a HREF="#ours" CLASS="oursBtnClass" id="signInPOursBtn">Public</a></li>
                  <li><a HREF="#signInP" CLASS="ui-btn-active ui-state-persist signInPSignInBtn">Sign In</a></li>
                  <li><a HREF="#searchAdd" CLASS="searchBtnClass" id="signInPSearchBtn">Search</a></li>
                 </ul>
                <ul class="fourBtns">
                  <li><a HREF="#yours" CLASS="yoursBtnClass" id="signInPYoursBtn2">Private</a></li>
                  <li><a HREF="#ours" CLASS="oursBtnClass" id="signInPOursBtn2">Public</a></li>
                  <li><a HREF="#signInP" CLASS="ui-btn-active ui-state-persist signInPSignInBtn2">Sign In</a></li>
                  <li><a HREF="#searchAdd" CLASS="searchBtnClass" id="signInPSearchBtn2">Search</a></li>
                 </ul>
              </div><!-- end of navbar -->
        </div><!--end of header above -->
 <!-- dan -->                
 <iframe SRC="anyblankpage.html" name="dummy" STYLE="display: none"></iframe>
<!-- dan -->
                     <div CLASS="contentContainer">
                     	<div id="signInForm" class="scrollable">
                            <div CLASS="pitch">
                            <h4>Push buttons, go places</h4>
                            <h2>Navigation for your mobile, social world</h2>
                            <br/>
                            <span> Jump to your favorites with a few quick clicks on a mobile-optimized, push-button panel. Store, edit, organize, and share links with smart users who have similar interests. Access curated content from any device, anywhere, anytime. Learn <a href="#help">more</a>, explore with a free trial, or join below!</span>
                            </div><!-- end of pitch -->
<!-- dan  -->
                     		<form ACTION="" METHOD="post" TARGET="dummy">
                     			<div id="login"></div>
                     		</form>
				           <form ACTION="" METHOD="post" TARGET="dummy">
 <!-- dan  -->
 							<div data-role="fieldcontain" CLASS="ui-grid-a" STYLE="border:none">
                             <div CLASS="ui-block-a" STYLE="margin-top:3px">
                            <label FOR="userNname" STYLE="display:block; margin-left:5px" id="userN">User name:</label>
                             <input TYPE="text" name="userid" id="userid" STYLE="width:100px; margin-left:5px" CLASS="scrollUp"/>
                              </div>
                             <div CLASS="ui-block-b">
                              <label FOR="pwInput" STYLE="display:block" id="userPW">Password:</label>
                             <input TYPE="password" id="userpassword" name="userpassword" STYLE="width:100px;" CLASS="scrollUp"/>
                             </div>
                              </div><!-- end of fieldcontain -->
  
                                        <div id="signInDiv"><input TYPE="submit" VALUE="Sign In" id="si"/></div>
 <!-- dan  -->                               
							</form>
 <!-- dan  -->

                               <br/>
                               <a HREF="#forgot" TYPE="button" VALUE="Forgot PW" id="forgotBtn" STYLE="width:90%; margin-left:auto; margin-right:auto;">Forgot PW</a>
                               <a HREF="#changeP" TYPE="button" VALUE="Change PW" id="changePBtn" STYLE="width:90%; margin-left:auto; margin-right:auto;">Change PW</a>
                               <a HREF="#cancel" TYPE="button" VALUE="Resign" id="cancelBtn" STYLE="width:90%;margin-left:auto; margin-right:auto;">Resign</a>
                               <br/>
                               <a HREF="#register" TYPE="button" VALUE="Register" id="reg" data-theme="a" CLASS="ui-btn-active">Click here for free trial.</a>
                               <p/>
                               <a HREF="#register2" TYPE="button" VALUE="Register" id="reg2" data-theme="a" CLASS="ui-btn-active">Click here to join.</a>
                               <br/>
                        </div><!-- End of signInForm -->
                        <div id="signInSuccess">
                              <br/>
                              <div id="soBtn">
                              <h4>You are signed in.</h4>
                              <br/>
                              <a HREF="#" data-role="button" id="so">Sign out</a>
                              <br/>
                              <a HREF="#" data-role="button" id="reload">Reload data</a>
                              </div><!-- end of soBtn -->
                        </div><!-- end of signInSuccess -->
                        <iframe id="formReturn" STYLE="display:none;"></iframe>
                    </div><!-- end of contentContainer -->
<!-- dan --> 
 					<div id="dont_forget" STYLE="display: none">		
						<form ACTION="" METHOD="post">			
							<input TYPE="text" name="username" id="username"/>			
							<input TYPE="password" name="password" id="password"/>			
							<input TYPE="submit" VALUE="Login" id="dummy_submit"/>		
						</form>
					</div> 
<!-- dan --> 
</div><!-- end of mainContainer -->
</div><!-- end of signIn -->
<div data-role="page" id="ours" data-theme="a" CLASS="pageMain">
	<div CLASS="mainContainer" data-role="content">
                    <div CLASS="header">
                    <div id="debuggerDiv" style="width:300px;height:110px;background-color:#000;color:#fff;font-size:.7em;overflow:scroll;display:none;"></div>
                            <div CLASS="logo">
                                <span CLASS="logoSpan">kinnective </span>
                                <span CLASS="bookmarkletSpan">
                                 <a HREF="#help" CLASS="roundBtn" data-theme="a"  data-role="button" title="Go to the Help file" data-inline="true" data-mini="true">Help</a>
                        		</span>
                            </div><!--end of logo -->
                            <div data-role="navbar" CLASS="mainNav">
                               <ul class="fiveBtns"> 
                               <li><a HREF="#upLoad" CLASS="uploadBtnClass" id="oursUploadBtn">Upload</a></li>
                                <li><a HREF="#yours" id="oursYoursBtn" class="yoursBtnClass">Private</a></li>
                                <li><a HREF="#ours" CLASS="ui-btn-active ui-state-persist oursBtnClass" id="oursOursBtn">Public</a></li>
                                <li><a HREF="#signInP" CLASS="signInBtnClass" id="oursSignInBtn">Sign In</a></li>
                                <li><a HREF="#" id="oursSearchBtn">Search</a></li>
                               </ul>
                                <ul class="fourBtns">
                                <li><a HREF="#yours" id="oursYoursBtn2" class="yoursBtnClass">Private</a></li>
                                <li><a HREF="#ours" CLASS="ui-btn-active ui-state-persist oursBtnClass" id="oursOursBtn2">Public</a></li>
                                <li><a HREF="#signInP" CLASS="signInBtnClass" id="oursSignInBtn2">Sign In</a></li>
                                <li><a HREF="#" id="oursSearchBtn2">Search</a></li>
                               </ul>
                            </div><!-- end of navbar -->
                     </div><!--end of header above -->
                     <div CLASS="contentContainer">
                     	<div CLASS="titleContainer">
                       		<div CLASS="buttonContainer">
                                    <a HREF="#" CLASS="arrowLBtn" id="oursArrowLBtn" data-role="button" data-icon="arrow-l" data-iconpos="notext" title="Go back in tree">Back</a>
                                     <a HREF="#" CLASS="homeBtn" id="oursHomeBtn" data-role="button" data-icon="home" data-iconpos="notext" title="Go to root level">Home</a> 
							</div>
                            <div CLASS="buttonContainer2">
                                    <a HREF="#" id="oursEditTitleBtn" data-role="button" data-mini="true" title="Edit title of this Waypoint">Edit</a>
                           </div>
                            <div CLASS="innerTitle">
                            	<div CLASS="breadCrumbs">
                                	<p><span CLASS="breadCrumbString" id="oursBCString"></span></p>
                                </div>
                                <div CLASS="mainTitle">
                                		<p><span id="oursTitleString"></span></p>
                                </div>
                            </div><!-- end innerTitle -->
                        </div><!-- end of titleContainer -->
                        <div id="oursListContainer" CLASS="listBox">
                        	<ul id="oursListContainerCG" data-role="controlgroup" data-inset="true" CLASS="listBoxInner">
                            </ul><!-- end of listContainerCG --> 
                        </div><!-- end of listContainer -->
                        <div CLASS="footerBtns">
                            <a HREF="#add" data-role="button" data-inline="true" data-mini="true" id="oursGoToAdd" title="Add a Waypoint or Link">Add</a>
                            <a HREF="#" id="oursCutBtn" data-role="button" data-inline="true" data-mini="true" title="Cut item/s checked">Cut</a>
                            <a HREF="#" data-role="button" data-inline="true" data-mini="true" id="oursCopyBtn" title="Make/view copies">Copies</a>
                             <a HREF="#discuss" data-role="button" data-inline="true" data-mini="true" id="oursDisNav" title="Go to Discuss page">Discuss</a>
                             <a HREF="#" data-role="button" data-inline="true" data-mini="true" id="oursPasteBtn" title="Paste items checked on Copies page">Paste</a>
                            
                        </div><!-- end of footerBtns -->
                     </div><!-- end of contentContainer -->
  	</div><!-- end of mainContainer above -->
</div><!-- end of pageMain -->
<div data-role="page" id="upLoad" CLASS="pageMain" data-theme="a">
	<div CLASS="mainContainer"  data-role="content">
                    <div CLASS="header">
                            <div CLASS="logo">
                                <span CLASS="logoSpan">kinnective </span>
                                <span CLASS="bookmarkletSpan">
                                 <a HREF="#help" CLASS="roundBtn" data-theme="a"  data-role="button" data-inline="true" data-mini="true" title="Go to Help file">Help</a>
                        		</span>
                            </div><!--end of logo -->
                            <div data-role="navbar" CLASS="mainNav">
                               <ul class="fiveBtns">
                               <li><a HREF="#upLoad" CLASS="ui-btn-active ui-state-persist uploadBtnClass" id="uploadUploadBtn">Upload</a></li>
                                <li><a HREF="#yours" CLASS="yoursBtnClass" id="uploadYoursBtn">Private</a></li>
                                <li><a HREF="#ours" CLASS="oursBtnClass" id="uploadOursBtn">Public</a></li>
                                <li><a HREF="#signInP" CLASS="signInBtnClass" id="uploadSignInBtn">Sign In</a></li>
                                <li><a HREF="#searchAdd" CLASS="searchBtnClass">Search</a></li>
                               </ul>
                               <ul class="fourBtns">
                                <li><a HREF="#yours" CLASS="yoursBtnClass" id="uploadYoursBtn2">Private</a></li>
                                <li><a HREF="#ours" CLASS="oursBtnClass" id="uploadOursBtn2">Public</a></li>
                                <li><a HREF="#signInP" CLASS="signInBtnClass2" id="uploadSignInBtn2">Sign In</a></li>
                                <li><a HREF="#searchAdd" CLASS="searchBtnClass2" id="uploadSearchBtn2">Search</a></li>
                               </ul>
                            </div><!-- end of navbar -->
                     </div><!--end of header above -->
                     <div CLASS="contentContainer">
                        <div id=uploadFormContainer>
                              <form name="upLoaderForm" id="upLoaderForm" ENCTYPE="multipart/form-data" TARGET="favoritesReturn" METHOD="post" ACTION="kinnective4/fullway30e.php" STYLE="padding:25px;">
                             <fieldset>
                             <input TYPE="file" id="favs" name="favs" VALUE="favs"/>
                              <input TYPE="hidden" name="xml" VALUE="1"/>
                             <input TYPE="hidden" name="command" VALUE="31"/>
                             <input TYPE="hidden" name="add" id="#adderInput" VALUE="0"/>
                             </fieldset>
                             <fieldset STYLE="padding:15px;">
                              <input TYPE="checkbox" name="uploadAdd" id="uploadAdd" VALUE="add"/>
                              <label FOR="uploadAdd">Add uploaded bookmarks to existing collection </label>
                              <p/>
                             <input TYPE="submit" VALUE="Upload" id="sb"/>
                              </fieldset>
                              </form>
                              <a HREF="#" id="downloadBtn" data-role="button" data-theme="a" title="Download your favorites file">Download</a>
                              <div id="downloadResult" CLASS="scrollable">
                               <div id="downloadResultContainer1"></div>
                               <a HREF="#" id="seeHTMLBtn" data-mini="true" data-inline="true" data-role="button">View as web page</a>
                               <div id="downloadResultContainer2"></div>                              </div>
                              <iframe name="favoritesReturn" id="favoritesReturn" onLoad="kinn.frameLoaded();"></iframe>
                            </div><!--end of uploadFormContainer-->
                          </div><!-- end of contentContainer -->
	</div><!-- end of mainContainer2 -->                    
</div><!-- end of upLoad -->
<div data-role="page" id="yours" data-theme="a" CLASS="pageMain">
	<div CLASS="mainContainer" data-role="content">
                    <div CLASS="header">
                            <div CLASS="logo">
                                <span CLASS="logoSpan">kinnective </span>
                                <span CLASS="bookmarkletSpan">
                                 <a HREF="#help" CLASS="roundBtn" data-theme="a"  data-role="button" data-inline="true" data-mini="true" title="Go to Help file">Help</a>
                        		</span>
                            </div><!--end of logo -->
                            <div data-role="navbar" CLASS="mainNav">
                               <ul class="fiveBtns"> 
                               <li><a HREF="#upLoad" CLASS="uploadBtnClass" id="yoursUploadBtn">Upload</a></li>
                               <li><a HREF="#yours" CLASS="ui-btn-active ui-state-persist yoursBtnClass" id="yoursYoursBtn">Private</a></li>
                                <li><a HREF="#ours" id="yoursOursBtn" CLASS="oursBtnClass">Public</a></li>
                                <li><a HREF="#signInP" CLASS="signInBtnClass" id="yoursSignInBtn">Sign In</a></li>
                                <li><a HREF="#" id="yoursSearchBtn">Search</a></li>
                               </ul>
                               <ul class="fourBtns">
                               <li><a HREF="#yours" CLASS="ui-btn-active ui-state-persist yoursBtnClass" id="yoursYoursBtn2">Private</a></li>
                                <li><a HREF="#ours" id="yoursOursBtn2" CLASS="oursBtnClass">Public</a></li>
                                <li><a HREF="#signInP" CLASS="signInBtnClass" id="yoursSignInBtn2">Sign In</a></li>
                                <li><a HREF="#" id="yoursSearchBtn2">Search</a></li>
                               </ul>
                            </div><!-- end of navbar -->
                     </div><!--end of header above -->
                     <div CLASS="contentContainer">
                     	<div CLASS="titleContainer">
                     	  	<div CLASS="buttonContainer">
                                    <a HREF="#" CLASS="arrowLBtn" id="oursArrowLBtn" data-role="button" data-icon="arrow-l" data-iconpos="notext" title="Go back in tree">Back</a>
                                     <a HREF="#" CLASS="homeBtn" id="yoursHomeBtn"data-role="button" data-icon="home" data-iconpos="notext" title="Go to root level">Home</a> 
							</div>
                            <div CLASS="buttonContainer2">
                                    <a HREF="#" id="yoursEditTitleBtn" data-role="button" data-mini="true" title="Edit title of this Waypoint">Edit</a>
                           </div>
                            <div CLASS="innerTitle">
                            	<div CLASS="breadCrumbs">
                                	<p><span CLASS="breadCrumbString" id="yoursBCString"></span></p>
                                </div>
                                <div CLASS="mainTitle">
                                		<p><span id="yoursTitleString"></span></p>
                                </div>
                            </div><!-- end innerTitle -->
                        </div><!-- end of titleContainer -->
                        <div id="yoursListContainer" CLASS="listBox">
                        	<ul id="yoursListContainerCG" data-role="controlgroup" data-inset="true" CLASS="listBoxInner">
                            </ul><!-- end of yuorsListContainerCG --> 
                     </div><!-- end of listContainer -->
                     <div CLASS="footerBtns">
						<a HREF="#yoursAdd" data-role="button" data-inline="true" data-mini="true" id="yoursGoToAdd" title="Add a Waypoint or Link">Add</a>
						<a HREF="#" id="yoursCutBtn" data-role="button" data-inline="true" data-mini="true" title="Cut checked item/s">Cut</a>
						<a HREF="#" data-role="button" data-inline="true" data-mini="true" id="yoursCopyBtn" title="Make/view copies">Copies</a>
						<a HREF="#discuss" data-role="button" data-inline="true" data-mini="true" id="yoursDisNav" title="Go to Notes page">Notes</a>
                        <a HREF="#" data-role="button" data-inline="true" data-mini="true" id="yoursPasteBtn" title="Paste items checked on Copies page">Paste</a>
					     </div><!-- end of footerBtns -->
                     </div><!-- end of contentContainer -->
  	</div><!-- end of mainContainer above -->
</div><!-- end of yours -->
<div data-role="page" id="add" CLASS="pageMain" data-theme="a">
        <div CLASS="mainContainer">
        <div data-role="header"> 
        	<a HREF="#ours" data-icon="delete" CLASS="cancelAction" title="Close this page">Done</a>
			<h1>Add</h1> 
        </div>
        <div CLASS="contentContainer"  id="addContainer" data-role="content">
        	<div CLASS="scrollForm">
                <form id="addForm">
                <br/>
                <div CLASS="addBtns">
                        <div CLASS="addFormWidth ui-grid-a">
                                <div CLASS="ui-block-a addBtnsDiv">
                                   <input TYPE="radio" name="addSelector" id="radioFolder" VALUE="folder" checked="true" data-mini='true'/>
                                  <label FOR="radioFolder">Waypoint / folder</label>
                                </div><!-- end block a-->
                                <div CLASS="ui-block-b addBtnsDiv">
                                  <input TYPE="radio" name="addSelector" id="radioLink" VALUE="link" data-mini='true'/>
                                  <label FOR="radioLink">Link</label>
                                </div><!-- end block b -->
                        </div><!-- end addFormWidth-->
                </div><!-- end of addBtns -->
                <div id="folderInput" CLASS="singleLine">
                        <label for "folderIn">Title:</label>
                        <input TYPE="text" maxlength=26 id="folderIn" name="folderIn" CLASS="scrollUp" ROWS="1" COLS="28" WRAP="hard"/>
                </div>
                <br/>
                <div id="linkInput" CLASS="singleLine">
                      <label for "linkIn">URL(no need for "http://"):</label>
                      <input TYPE="text" maxlength=150 id="linkIn" name="linkIn" CLASS="scrollUp" ROWS="10" COLS="30" WRAP="hard"/>
                </div>
                <br/>
                <div id="addBtnDiv">
                        <a HREF="#" data-role="button" id="oursDoneAddBtn" data-mini='true'>Add to current page</a>
                </div>
                </form>
			</div><!-- end of scrollForm -->
   </div><!-- end of contentContainer-->
   </div><!-- end of mainContainer -->
</div><!-- end of add -->
<div data-role="page" id="yoursAdd" CLASS="pageMain" data-theme="a">
        <div CLASS="mainContainer"><div data-role="header"> 
        	<a HREF="#yours" data-icon="delete" CLASS="cancelAction" title="Close this page">Done</a>
			<h1>Add</h1> 
        </div>
              <div  data-role="content" id="yoursAddContainer">
              <div CLASS="scrollForm">
                        <form id="yoursAddForm">
                                  <br/>
                                  <div CLASS="addBtns">
                                          <div CLASS="addFormWidth ui-grid-a">
                                                  <div CLASS="ui-block-a addBtnsDiv">
                                                     <input TYPE="radio" name="addSelect" id="yoursRadioFolder" VALUE="folder" checked="true" data-mini='true'/>
                                                    <label FOR="yoursRadioFolder">Waypoint / folder</label>
                                                  </div><!-- end block a-->
                                                  <div CLASS="ui-block-b addBtnsDiv">
                                                    <input TYPE="radio" name="addSelect" id="yoursRadioLink" VALUE="link" data-mini='true'/>
                                                    <label FOR="yoursRadioLink">Link</label>
                                                  </div><!-- end block b -->
                                          </div><!-- end addFormWidth-->
                                  </div><!-- end of addBtns -->
                           <div id="yoursFolderInput" CLASS="singleLine">
                                            <label for "URLIn">Title:</label>
                                            <input TYPE="text" maxlength=26 id="yoursFolderIn" name="yoursFolderIn" ROWS="1" COLS="28" WRAP="hard" CLASS="scrollUp"></input>
                                    </div>
                                    <br/>
                           <div id="yoursLinkInput" CLASS="singleLine">
                                          <label for "yoursLinkIn">URL(no need for "http://"):</label>
                                          <input TYPE="text" maxlength=250 id="yoursLinkIn" name="yoursLinkIn" ROWS="10" COLS="30" WRAP="hard" CLASS="scrollUp"></input>
                           </div>
                                    <br/>
                                    <div id="yoursAddBtnDiv">
                                            <a HREF="#y" data-role="button" id="yoursDoneAddBtn" data-mini="true">Add to current page</a>
                                    </div>
                              </form>
                 </div>div><!-- end of  scrollform -->
           </div><!-- end of content -->
       </div><!-- end of mainContainer -->
</div><!-- end of add -->
<div data-role="page" id="discuss" data-theme="a" CLASS="pageMain">
              <div CLASS="mainContainer">
                             <div data-role="header" data-backbtn="false">
                                          <a data-role="button" data-icon="delete" id="discussToOurs" HREF="#" title="Close this page">Done</a>
                                          <h1 id="discussHead">Discuss</h1> 
                             </div><!-- end of header -->
                             <div CLASS="discussContentContainer" data-role="content">
                                         <div CLASS="titleContainer">
                                                <div CLASS="innerTitle">
                                                      <div CLASS="breadCrumbs">
                                                               <div id="comBCStringDiv">
                                                                      <span id="comBCString"></span>
                                                               </div><!--end of comBCStringDiv-->
                                                               <div id="editorTotalDiv">
                                                                    <span id="editorName"><b>Editor</b></span>
                                                                    <span>:</span>
                                                                    <span id="defaultTrustTotal">Total</span>
                                                               </div><!--end of editorDiv-->
                                                      </div><!-- end BreadCrumbs-->
                                                      <div CLASS="mainTitle">
                                                               <p><span id="comTitleString"></span></p>
                                                      </div><!-- end mainTitle-->
                                                </div><!-- end innerTitle -->
                                          </div><!-- end of titleContainer -->
                                          <div id="editContainer">
                                                  <div id="lastEditor">
                                                     <p>
                                                         <span id="commentsLastEditorIntro">Last editor of this Waypoint: </span>
                                                         <span id="commentsLastEditorString">Art Lenehan</span>
                                                     </p>
                                                  </div><!-- end of lastEditor -->
                                                  <div id="lastEdit">
                                                     <p>
                                                         <span id="commentsLastEditIntro">Last change: </span>
                                                         <span id="commentsLastEditString">This is the default last change</span>
                                                     </p>
                                                  </div><!-- end of lastEditor -->
                                                   <div CLASS="editVote ui-corner-all" data-role="controlgroup" data-mini="true" data-type="horizontal">
                                                          <a HREF="#" data-role="button" data-icon="plus" id="editorUp" title="Adds to contributor's points">Approve edit</a>
                                                          <a HREF="#" data-role="button" data-icon="minus" id="editorDown" title="Subtracts from contributor's points">Disapprove edit</a>
                                                   </div><!-- end of editVote -->
                                          </div><!-- end of editContainer-->
                                          <div id="discussListContainer" CLASS="discussListBox">
                                                <div id="discussListContainerCG" data-role="controlgroup" data-inset="true" class="listBoxInner">
                                                </div><!--end discussListContainerCG-->
                                          </div><!-- end of discussListContainer -->
                                          <div id="discussResults" STYLE="visibility:hidden; z-index:0"></div>
                                        <div CLASS="footerBtns">
                                            <a HREF="#commentsAdd" id="discussAdd" data-role="button" data-inline="true" data-mini="true" title="Add a comment about last Waypoint viewed.">Add</a>
                                            <a HREF="#" id="watchAdd" data-role="button" data-inline="true" data-mini="true" data-icon="plus" title="Add this Waypoint to your Watch list and get email updates">Watch</a>
                                            <a HREF="#" id="watchSubtract" data-role="button" data-inline="true" data-mini="true" data-icon="delete" title="Take this Waypoint off Watch List">Watch</a>
                                            <a HREF="#" id="pingAdd" data-role="button" data-inline="true" data-mini="true" title="Invite discussion via emails to Watch List members">Invite</a>
                                        </div><!-- end of footerBtns -->
                           </div><!-- end of contentContainer -->
             </div><!-- end of mainContainer -->
</div><!-- end of discuss -->
<div data-role="page" id="editTitlePage" CLASS="pageMain" data-theme="a">
        <div CLASS="mainContainer"><div data-role="header"> 
        	<a HREF="#" data-icon="delete" data-rel="back" CLASS="cancelAction" title="Close this page">Done</a>
			<h1>Edit Title</h1> 
        </div>
              <div  data-role="content">
              <div CLASS="scrollForm">
                        <div id="editTitleForm">
                              <br/>
                              <div id="existingTitleDiv"><p><b>Existing title: </b><span id="existingTitleSpan">Trout fishing</span></p></div>
                              <br/>
                              <div id="newTitleInput" CLASS="singleLine">
                                      <label for "URLIn"><h3>Enter new title:</h3></label>
                                      <input TYPE="text" maxlength=26 id="newTitleIn" name="newTitleIn" ROWS="1" COLS="28" WRAP="hard" CLASS="scrollUp"></input>
                                       <br/>
                                      <a HREF="#" data-role="button" id="newTitleSubmit" data-rel="back" data-mini="true">Submit</a>
                              </div>
                        </div><!--End of editTitleForm-->
                 </div>div><!-- end of  scrollform -->
           </div><!-- end of content -->
       </div><!-- end of mainContainer -->
</div><!-- end of add -->
<div data-role="page" id="commentsAdd" CLASS="pageMain" data-theme="a">
	<div CLASS="mainContainer"  data-role="content">
		<div data-role="header"> 
        	<a HREF="#discuss" data-icon="delete" CLASS="cancelAction">Done</a>
			<h1>Add a comment</h1> 
        </div><!-- end of header -->
        <div CLASS="contentContainer"  data-role="content">
        <div id="commentInput">
        <br/>
              <label for "commentIn"><h3>Please enter your comment:</h3></label>
              <textarea id="commentIn" name="commentIn" MAXLENGTH="400"></textarea>
        </div>
        <div id="commentAddBtnDiv">
				<a HREF="#discuss" data-role="button" id="commentAddBtn">Submit</a>
        </div>
        </div><!-- end of ContantContainer -->
   </div><!-- end of mainContainer -->
</div><!-- end of add -->
<div data-role="page" id="searchAdd" CLASS="pageMain" data-theme="a">
    <div CLASS="mainContainer">
        <div data-role="header">
        <a HREF="#" data-icon="delete" CLASS="cancelAction" title="Close this page" id="searchDone1">Done</a>
        <h1>Enter terms</h1> 
        </div>
        <div CLASS="contentContainer"  data-role="content">
                    <div id="searchInput">
                    <p/>
                    <textarea id="searchIn" name="searchIn" MAXLENGTH="50"></textarea>
                    </div>
                    <fieldset  style="padding:5px;" data-role="fieldcontain" CLASS="ui-grid-b">
                           <div CLASS="ui-block-a" STYLE="width:30%">
                            <a HREF="#" data-role="button" id="searchBackBtn" data-inline="true" data-mini="true" data-icon="arrow-l" title="Go back in tree">Back</a>
                          </div>
                          <div CLASS="ui-block-b" STYLE="width:37%; padding-left:2%;">
                                     <input TYPE="checkbox" name="searchOrphans" id="searchOrphans" VALUE="add" data-inline="true" data-mini="true"/>
                                    <label FOR="searchOrphans" title="Orphans are items cut recently">+ orphans </label>
                          </div><!--end of ui-block-a -->
                          <div CLASS="ui-block-c" STYLE="width:23%">
                            <a HREF="#search" data-role="button" id="searchAddBtn" data-inline="true" data-mini="true">Submit</a>
                          </div>
                    </fieldset>
                    <div id="searchInfo"><p><span id="searchInfoTitle"><b>Window shows children of:&#160; </b></span><span id="searchInfoSpan">No search.</span></p></div><!--end of searchInfo-->
                    <div CLASS="searchResultsContainer">
                         <div id="searchListContainer">
                        	<div id="searchListContainerCG" data-role="controlgroup" data-inset="true" CLASS="listBoxInner">
                           </div><!-- end of searchListContainerCG -->
                         </div>
                          <div CLASS="footerBtns" id="searchFooter">
                              <div id="searchLegend">
                              	<div id="searchLegendTop">
                                    <div id='topSwatch' CLASS="tiny"></div>
                                    <div id="topSwatchLegendDiv"><p><span id="topSwatchLegend">Orphan</span></p></div>
                                </div>
                                <div id="searchLegendBottom">
                                    <div id='bottomSwatch' CLASS="tiny"></div>
                                    <div id="bottomSwatchLegendDiv"><p><span id="bottomSwatchLegend">Active</span></p></div>
                               </div>
                              </div><!-- end of searchLegend -->
                             <div id="searchDoneDiv">
                             <a HREF="#" id="searchDone" data-icon="delete" data-role="button" data-inline="true" data-mini="true" title="Close this page">Done</a>
                             <a HREF="#" id="searchCopyBtn" data-role="button" data-inline="true" data-mini="true" title="Make/view copies">Copies</a>
                             </div><!-- end of SearchDoneDiv-->    
                          </div><!-- end of footerBtns -->
				</div><!-- end of resultsContainer -->
		</div><!-- end of contentContainer -->
   </div><!-- end of mainContainer -->
</div><!-- end of add -->
<div data-role="page" id="copies" data-theme="a" CLASS="pageMain">
   <div CLASS="mainContainer">
        <div data-role="header"> 
        <h1>Copies</h1>
        <a data-role="button" id="copiesBackBtn" data-icon="delete" title="Close this page">Done</a>
        </div>

        		<div class='contentContainer' data-role="content">
                    						<br/>
                                            <p>Selected copies can be Cut or Pasted</p>
                                             <br/>
                                             <div id="copiesListContainer" CLASS="listBox">
                                                      <div id="copiesListContainerCG" data-role="controlgroup" data-inset="true" CLASS="liContainerCG listBoxInner">
                                                      </div><!-- end of copiesListContainerCG --> 
                                               </div><!-- end of copiesListContainer -->
                 <div CLASS="footerBtns">
						<a HREF="#" id="copiesCutBtn" data-role="button" data-inline="true" data-mini="true" title="Delete copies checked">Delete</a>
						<a HREF="#" data-role="button" data-inline="true" data-mini="true" id="copiesDoneBtn" title="Close this page">Done</a>
				 </div><!-- end of footerBtns -->

                 </div><!-- end of contentContainer -->
</div><!-- end of mainContainer above -->
</div><!-- end of pageMain -->
<div data-role="page" id="help" data-theme="a" CLASS="pageMain">
    <div CLASS="mainContainer">
    	<div data-role="header" id="helpHeader"> 
       	<a data-role="button" data-icon="delete" HREF="#" data-rel="back" title="Close this page">Done</a>
        <h1>Help</h1> 
    	</div><!--end of header-->
		<div data-role="content" id="helpContent">
        	<div id='helpFile'>
            <h2>Exploring the help file</h2>
            <br/>
            <p>Click on the arrows below, at right, to explore different help topics.</p>
             </div>
              <br/>
              <br/>
             <div id="helpListView" class="scrollable">
               <div id="helpListContainerCG">
                      <div CLASS="dataBar dataBarColor">
                          <div CLASS="dataBarTitle doubleTap">
                                <p CLASS="dataBarTitleP">
                                   <span CLASS="titleSpan">Introduction</span>
                                </p>
                          </div><!--end of dataBarTitle-->
                          <div CLASS="arrowR">
                               <a HREF="introduction.html" CLASS="arrowRBtn" data-role="button" data-icon="arrow-r" data-iconpos="notext" data-theme="a"></a><!-- end of arrowRBtn-->
                         </div><!-- end of arrowR -->
                    </div><!--end of dataBar-->
                      <div CLASS="dataBar dataBarColor">
                          <div CLASS="dataBarTitle doubleTap">
                                <p CLASS="dataBarTitleP">
                                   <span CLASS="titleSpan">Membership</span>
                                </p>
                          </div><!--end of dataBarTitle-->
                          <div CLASS="arrowR">
                               <a HREF="membership.html" CLASS="arrowRBtn" data-role="button" data-icon="arrow-r" data-iconpos="notext" data-theme="a"></a><!-- end of arrowRBtn-->
                         </div><!-- end of arrowR -->
                    </div><!--end of dataBar-->
                    <div CLASS="dataBar dataBarColor">
                          <div CLASS="dataBarTitle doubleTap">
                                <p CLASS="dataBarTitleP">
                                   <span CLASS="titleSpan">Using the bookmarklet</span>
                                </p>
                          </div><!--end of dataBarTitle-->
                          <div CLASS="arrowR">
                               <a HREF="bookmarklet.html" CLASS="arrowRBtn" data-role="button" data-icon="arrow-r" data-iconpos="notext" data-theme="a"></a><!-- end of arrowRBtn-->
                         </div><!-- end of arrowR -->
                    </div><!--end of dataBar-->
                    <div CLASS="dataBar dataBarColor">
                          <div CLASS="dataBarTitle doubleTap">
                                <p CLASS="dataBarTitleP">
                                   <span CLASS="titleSpan">Adding</span>
                                </p>
                          </div><!--end of dataBarTitle-->
                          <div CLASS="arrowR">
                               <a HREF="adding.html" CLASS="arrowRBtn" data-role="button" data-icon="arrow-r" data-iconpos="notext" data-theme="a"></a><!-- end of arrowRBtn-->
                         </div><!-- end of arrowR -->
                    </div><!--end of dataBar-->
                    <div CLASS="dataBar dataBarColor">
                          <div CLASS="dataBarTitle doubleTap">
                                <p CLASS="dataBarTitleP">
                                   <span CLASS="titleSpan">Cut, copy, paste</span>
                                </p>
                          </div><!--end of dataBarTitle-->
                          <div CLASS="arrowR">
                               <a HREF="cutting.html" CLASS="arrowRBtn" data-role="button" data-icon="arrow-r" data-iconpos="notext" data-theme="a"></a><!-- end of arrowRBtn-->
                         </div><!-- end of arrowR -->
                    </div><!--end of dataBar-->
                    <div CLASS="dataBar dataBarColor">
                          <div CLASS="dataBarTitle doubleTap">
                                <p CLASS="dataBarTitleP">
                                   <span CLASS="titleSpan">Drag and drop editing</span>
                                </p>
                          </div><!--end of dataBarTitle-->
                          <div CLASS="arrowR">
                               <a HREF="shuffling.html" CLASS="arrowRBtn" data-role="button" data-icon="arrow-r" data-iconpos="notext" data-theme="a"></a><!-- end of arrowRBtn-->
                         </div><!-- end of arrowR -->
                    </div><!--end of dataBar-->
                    <div CLASS="dataBar dataBarColor">
                          <div CLASS="dataBarTitle doubleTap">
                                <p CLASS="dataBarTitleP">
                                   <span CLASS="titleSpan">Discussion</span>
                                </p>
                          </div><!--end of dataBarTitle-->
                          <div CLASS="arrowR">
                               <a HREF="discussion.html" CLASS="arrowRBtn" data-role="button" data-icon="arrow-r" data-iconpos="notext" data-theme="a"></a><!-- end of arrowRBtn-->
                         </div><!-- end of arrowR -->
                    </div><!--end of dataBar-->
                    <div CLASS="dataBar dataBarColor">
                          <div CLASS="dataBarTitle doubleTap">
                                <p CLASS="dataBarTitleP">
                                   <span CLASS="titleSpan">Voting</span>
                                </p>
                          </div><!--end of dataBarTitle-->
                          <div CLASS="arrowR">
                               <a HREF="voting.html" CLASS="arrowRBtn" data-role="button" data-icon="arrow-r" data-iconpos="notext" data-theme="a"></a><!-- end of arrowRBtn-->
                         </div><!-- end of arrowR -->
                    </div><!--end of dataBar-->
                    <div CLASS="dataBar dataBarColor">
                          <div CLASS="dataBarTitle doubleTap">
                                <p CLASS="dataBarTitleP">
                                   <span CLASS="titleSpan">Trust Points</span>
                                </p>
                          </div><!--end of dataBarTitle-->
                          <div CLASS="arrowR">
                               <a HREF="trust.html" CLASS="arrowRBtn" data-role="button" data-icon="arrow-r" data-iconpos="notext" data-theme="a"></a><!-- end of arrowRBtn-->
                         </div><!-- end of arrowR -->
                    </div><!--end of dataBar-->
                    <div CLASS="dataBar dataBarColor">
                          <div CLASS="dataBarTitle doubleTap">
                                <p CLASS="dataBarTitleP">
                                   <span CLASS="titleSpan">About</span>
                                </p>
                          </div><!--end of dataBarTitle-->
                          <div CLASS="arrowR">
                               <a HREF="about.html" CLASS="arrowRBtn" data-role="button" data-icon="arrow-r" data-iconpos="notext" data-theme="a"></a><!-- end of arrowRBtn-->
                         </div><!-- end of arrowR -->
                    </div><!--end of dataBar-->
               </div><!--end of helpListContainerCG-->
            </div><!--end of helpListView-->
        </div><!--end of helpContent-->
	</div><!-- end of mainContainer -->
</div><!-- end of pageMain -->
<div data-role="page" id="register" data-theme="a" CLASS="pageMain">
	<div CLASS="mainContainer" data-role="content" id="regMain">
                    <div CLASS="header">
                            <div CLASS="logo">
                                <span CLASS="logoSpan">kinnective </span>
                                <span CLASS="bookmarkletSpan">
                                 	<a HREF="#help" CLASS="roundBtn" data-theme="a"  data-role="button" data-inline="true" data-mini="true" title="Go to Help file">Help</a>
                        		</span>
                            </div><!--end of logo -->
                            <div data-role="navbar" CLASS="mainNav">
                               <ul class="fiveBtns">
                               <li><a REL="external" HREF="#upLoad" CLASS="uploadBtnClass">Upload</a></li>
                                <li><a REL="external"href="#yours" CLASS="yoursBtnClass">Private</a></li>
                                <li><a REL="external"href="#ours" CLASS="oursBtnClass">Public</a></li>
                                <li><a REL="external"href="#signInP" CLASS="signInBtnClass">Sign In</a></li>
                                <li><a REL="external" HREF="#searchAdd" CLASS="searchBtnClass">Search</a></li>
                               </ul>
                               <ul class="fourBtns">
                               <li>
                                <li><a REL="external"href="#yours" CLASS="yoursBtnClass">Private</a></li>
                                <li><a REL="external"href="#ours" CLASS="oursBtnClass">Public</a></li>
                                <li><a REL="external"href="#signInP" CLASS="signInBtnClass">Sign In</a></li>
                                <li><a REL="external" HREF="#searchAdd" CLASS="searchBtnClass">Search</a></li>
                               </ul>
                            </div><!-- end of navbar -->
                     </div><!--end of header above -->
                     <div CLASS="contentContainer">
                     		<h3>Kinnective is an ad-free site focused on mapping useful and interesting web resources.  To register for a one month free trial, fill out the form below.  If you register within the month for full membership, your bookmarks will be migrated to your full membership account.</h3>
                            <br/>
						<form METHOD="POST" ACTION="kinnective4/free_verify.php" TARGET="_self">
                                    <div>First Name:     <input TYPE="text" name="user_first_name" id="user_first_name"></div>
                                    <div>Last Name:     <input TYPE="text" name="user_last_namename" id="user_last_name"></div>
                                    <div>Email address: <input TYPE="text" name="useremail" id="regUseremail"></div>
                                    <div>User ID:       <input TYPE="text" name="userid" id="regUserid"></div>
                                    <div>Enter Password:     <input TYPE="password" name="regUserPassword1" id="regUserPassword1"></div>
                                    <div>Re-enter Password:     <input TYPE="password" name="regUserPassword2" id="regUserPassword2"></div>
                                    <div id="submitter">
                                    	<input TYPE="submit" name="Button1" VALUE="Submit" id="regSubmit"/>
                                    </div>
                               </form>
					 </div><!-- end of contentContainer -->
  	</div><!-- end of mainContainer above -->
</div><!-- end of pageMain -->
<div data-role="page" id="register2" data-theme="a" CLASS="pageMain">
	<div CLASS="mainContainer" data-role="content" id="regMain">
                    <div CLASS="header">
                            <div CLASS="logo">
                                <span CLASS="logoSpan">kinnective </span>
                                <span CLASS="bookmarkletSpan">
                                 	<a HREF="#help" CLASS="roundBtn" data-theme="a"  data-role="button" data-inline="true" data-mini="true" title="Go to Help file">Help</a>
                        		</span>
                            </div><!--end of logo -->
                            <div data-role="navbar" CLASS="mainNav">
                               <ul class="fiveBtns">
                               <li><a REL="external" HREF="#upLoad" CLASS="uploadBtnClass">Upload</a></li>
                                <li><a REL="external"href="#yours" CLASS="yoursBtnClass">Private</a></li>
                                <li><a REL="external"href="#ours" CLASS="oursBtnClass">Public</a></li>
                                <li><a REL="external"href="#signInP" CLASS="signInBtnClass">Sign In</a></li>
                                <li><a REL="external" HREF="#searchAdd" CLASS="searchBtnClass">Search</a></li>
                               </ul>
                               <ul class="fourBtns">
                                <li><a REL="external"href="#yours" CLASS="yoursBtnClass">Private</a></li>
                                <li><a REL="external"href="#ours" CLASS="oursBtnClass">Public</a></li>
                                <li><a REL="external"href="#signInP" CLASS="signInBtnClass">Sign In</a></li>
                                <li><a REL="external" HREF="#searchAdd" CLASS="searchBtnClass">Search</a></li>
                               </ul>
                            </div><!-- end of navbar -->
                     </div><!--end of header above -->
                     <div CLASS="contentContainer">
                     <h3>Registration gives users the ability to contribute to the public map that Kinnective users are building, to edit the map -- subject to approval of other users -- and to participate in discussion and votes on changes. Users are charged 99 cents a month. To proceed, please fill out and submit the form.</h3>
						<form METHOD="POST" ACTION="kinnective4/paid_verify.php" TARGET="_self">
                                    <div>First Name:     <input TYPE="text" name="user_first_name" id="user_first_name2"></div>
                                    <div>Last Name:     <input TYPE="text" name="user_last_namename" id="user_last_name2"></div>
                                    <div>Email address: <input TYPE="text" name="useremail" id="regUseremail2"></div>
                                    <div>User ID:       <input TYPE="text" name="userid" id="regUserid2"></div>
                                    <div>Enter Password:     <input TYPE="password" name="regUserPassword1" id="regUserPassword12"></div>
                                    <div>Re-enter Password:     <input TYPE="password" name="regUserPassword2" id="regUserPassword22"></div>
                                    <div id="submitter2">
                                    	<input TYPE="submit" name="Button1" VALUE="Submit" id="regSubmit2"/>
                                    </div>
                               </form>
					 </div><!-- end of contentContainer -->
  	</div><!-- end of mainContainer above -->
</div><!-- end of pageMain -->
<div data-role="page" id="forgot" data-theme="a" CLASS="pageMain">
	<div CLASS="mainContainer" data-role="content" id="forgotMain">
                    <div CLASS="header">
                            <div CLASS="logo">
                                <span CLASS="logoSpan">kinnective </span>
                                <span CLASS="bookmarkletSpan">
                                 	<a HREF="#help" CLASS="roundBtn" data-theme="a"  data-role="button" data-inline="true" data-mini="true">Help</a>
                        		</span>
                            </div><!--end of logo -->
                            <div data-role="navbar" CLASS="mainNav">
                               <ul class="fiveBtns">
                               <li><a REL="external" HREF="#upLoad" CLASS="uploadBtnClass">Upload</a></li>
                                <li><a REL="external" HREF="#yours" CLASS="yoursBtnClass">Private</a></li>
                                <li><a REL="external" HREF="#ours" CLASS="oursBtnClass">Public</a></li>
                                <li><a REL="external" HREF="#signInP" CLASS="signInBtnClass">Sign In</a></li>
                                <li><a REL="external" HREF="#searchAdd" CLASS="searchBtnClass">Search</a></li>
                               </ul>
                               <ul class="fourBtns">
                                <li><a REL="external" HREF="#yours" CLASS="yoursBtnClass">Private</a></li>
                                <li><a REL="external" HREF="#ours" CLASS="oursBtnClass">Public</a></li>
                                <li><a REL="external" HREF="#signInP" CLASS="signInBtnClass">Sign In</a></li>
                                <li><a REL="external" HREF="#searchAdd" CLASS="searchBtnClass">Search</a></li>
                               </ul>
                            </div><!-- end of navbar --> 
                     </div><!--end of header above -->
                     <div id="forgotBack"><a href="#signInP" data-role="button" data-icon="delete" data-mini="true">Done</a></div>
                     <div class="pitch"><p>To recover username and reset password, please enter your email address. A message with an enabling link will be emailed to you immediately.</p></div>
                     <br/>
                     <div CLASS="contentContainer">
							  <form METHOD="POST" ACTION="kinnective4/fullway30e.php" TARGET="_self" name="forgotPassword">
									<div>Email address: <input TYPE="text" name="useremail" id="forgotUserEmail"></div>
                                    <div id="submitter">
                                    <input TYPE="submit" name="Button1" VALUE="Submit" id="forgotSubmit"/>
                                    </div>
                               </form>
					 </div><!-- end of contentContainer -->
  	</div><!-- end of mainContainer above -->
</div><!-- end of pageMain -->
<div data-role="page" id="cancel" data-theme="a" CLASS="pageMain">
	<div CLASS="mainContainer" data-role="content">
                    <div CLASS="header">
                            <div CLASS="logo">
                                <span CLASS="logoSpan">kinnective </span>
                                <span CLASS="bookmarkletSpan">
                                 	<a HREF="#help" CLASS="roundBtn" data-theme="a"  data-role="button" data-inline="true" data-mini="true" title="Go to Help file">Help</a>
                        		</span>
                            </div><!--end of logo -->
                            <div data-role="navbar" CLASS="mainNav">
                               <ul class="fiveBtns">
                               <li><a REL="external" HREF="#upLoad" CLASS="uploadBtnClass">Upload</a></li>
                                <li><a REL="external" HREF="#yours" CLASS="yoursBtnClass">Private</a></li>
                                <li><a REL="external" HREF="#ours" CLASS="oursBtnClass">Public</a></li>
                                <li><a REL="external" HREF="#signInP" CLASS="signInBtnClass">Sign In</a></li>
                                <li><a REL="external" HREF="#searchAdd" CLASS="searchBtnClass">Search</a></li>
                               </ul>
                               <ul class="fourBtns">
                                <li><a REL="external" HREF="#yours" CLASS="yoursBtnClass">Private</a></li>
                                <li><a REL="external" HREF="#ours" CLASS="oursBtnClass">Public</a></li>
                                <li><a REL="external" HREF="#signInP" CLASS="signInBtnClass">Sign In</a></li>
                                <li><a REL="external" HREF="#searchAdd" CLASS="searchBtnClass">Search</a></li>
                               </ul>
                            </div><!-- end of navbar -->
                     </div><!--end of header above -->
                     <br/>
                     <h3>To cancel membership, please fill out the form and click on "Submit."</h3>
                     <br/>
                     <div CLASS="contentContainer">
							  <form METHOD="POST" ACTION="kinnective4/verify.php" TARGET="_self">
                                    <div>Email address: <input TYPE="text" name="useremail" id="cancelUserEmail"></div>
                                    <div>User ID:       <input TYPE="text" name="userid" id="cancelUserId"></div>
                                    <div>Password:       <input TYPE="password" name="cancelPassword" id="cancelPassword"></div>
                                   <div id="submitter">
                                    	<input TYPE="submit" name="Button1" VALUE="Submit cancellation" id="cancelSubmit"/>
                                    </div>
                               </form>
					 </div><!-- end of contentContainer -->
  	</div><!-- end of mainContainer above -->
</div><!-- end of pageMain -->
<div data-role="page" id="changeP" data-theme="a" CLASS="pageMain">
	<div CLASS="mainContainer" data-role="content">
                    <div CLASS="header">
                            <div CLASS="logo">
                                <span CLASS="logoSpan">kinnective </span>
                                <span CLASS="bookmarkletSpan">
                                 	<a HREF="#help" CLASS="roundBtn" data-theme="a"  data-role="button" data-inline="true" data-mini="true" title="Go to Help file">Help</a>
                        		</span>
                            </div><!--end of logo -->
                            <div data-role="navbar" CLASS="mainNav">
                               <ul class="fiveBtns">
                               <li><a REL="external" HREF="#upLoad" CLASS="uploadBtnClass">Upload</a></li>
                                <li><a REL="external"href="#yours" CLASS="yoursBtnClass">Private</a></li>
                                <li><a REL="external"href="#ours"class="oursBtnClass">Public</a></li>
                                <li><a REL="external"href="#signInP" CLASS="signInBtnClass">Sign In</a></li>
                                <li><a REL="external" HREF="#searchAdd" CLASS="searchBtnClass">Search</a></li>
                               </ul>
                               <ul class="fourBtns">
                                <li><a REL="external"href="#yours" CLASS="yoursBtnClass">Private</a></li>
                                <li><a REL="external"href="#ours"class="oursBtnClass">Public</a></li>
                                <li><a REL="external"href="#signInP" CLASS="signInBtnClass">Sign In</a></li>
                                <li><a REL="external" HREF="#searchAdd" CLASS="searchBtnClass">Search</a></li>
                               </ul>
                            </div><!-- end of navbar -->
                     </div><!--end of header above -->
                     <div CLASS="contentContainer">
                     			<h3>Change password.</h3>
							  <form METHOD="POST" ACTION="kinnective4/verify.php" TARGET="_self">
                                    <div>User ID:       <input TYPE="text" name="newUserID" id="newUserID"></div>
                                    <div>Old password:     <input TYPE="password" name="oldUserPassword" id="oldUserPassword"></div>
                                    <div>New password:     <input TYPE="password" name="newUserPassword2" id="newUserPassword1"></div>
                                    <div>Re-enter new password:     <input TYPE="password" name="newUserPassword2" id="newUserPassword2"></div>
                                    <div id="submitter">
                                    	<input TYPE="submit" name="newPasswordSubmit" VALUE="Submit" id="newPasswordSubmit"/>
                                    </div>
                               </form>
					 </div><!-- end of contentContainer -->
  	</div><!-- end of mainContainer above -->
</div><!-- end of pageMain -->
<div data-role="page" id="kinnreg3" data-theme="a" CLASS="pageMain">
	<div data-role="content">
    	<span>Content is here.</span>
    </div>
</div><!-- end of kinnreg3-->
<div data-role="page" id="kinnreg4" data-theme="a" CLASS="pageMain">
	<div data-role="content">
    </div>
</div><!-- end of kinnreg4-->
</body>
</html>
