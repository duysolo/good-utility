NcodeImageResizer.IMAGE_ID_BASE="ncode_imageresizer_container_";NcodeImageResizer.WARNING_ID_BASE="ncode_imageresizer_warning_";NcodeImageResizer.scheduledResizes=[];function NcodeImageResizer(b,a){this.id=b;this.img=a;this.originalWidth=0;this.originalHeight=0;this.warning=null;this.warningTextNode=null;this.originalWidth=a.originalWidth;this.originalHeight=a.originalHeight;a.id=NcodeImageResizer.IMAGE_ID_BASE+b}NcodeImageResizer.executeOnload=function(){var b=NcodeImageResizer.scheduledResizes;for(var a=0;a<b.length;a++){NcodeImageResizer.createOn(b[a],true)}};NcodeImageResizer.schedule=function(a){if(NcodeImageResizer.scheduledResizes.length==0){if(window.addEventListener){window.addEventListener("load",NcodeImageResizer.executeOnload,false)}else{if(window.attachEvent){window.attachEvent("onload",NcodeImageResizer.executeOnload)}}}NcodeImageResizer.scheduledResizes.push(a)};NcodeImageResizer.getNextId=function(){var a=1;while(document.getElementById(NcodeImageResizer.IMAGE_ID_BASE+a)!=null){a++}return a};NcodeImageResizer.createOnId=function(a){return NcodeImageResizer.createOn(document.getElementById(a))};NcodeImageResizer.createOn=function(b,d){if(typeof d=="undefined"){d=false}if(!b||!b.tagName||b.tagName.toLowerCase()!="img"){alert(b+" is not an image ("+b.tagName.toLowerCase()+")")}if(b.width==0||b.height==0){if(!d){NcodeImageResizer.schedule(b)}return}if(!b.originalWidth){b.originalWidth=b.width}if(!b.originalHeight){b.originalHeight=b.height}if((NcodeImageResizer.MAXWIDTH>0&&b.originalWidth>NcodeImageResizer.MAXWIDTH)||(NcodeImageResizer.MAXHEIGHT>0&&b.originalHeight>NcodeImageResizer.MAXHEIGHT)){var c=false;var a,e;if(b.id&&b.id.indexOf(NcodeImageResizer.IMAGE_ID_BASE)==0){a=b.id.substr(NcodeImageResizer.IMAGE_ID_BASE.length);if(document.getElementById(NcodeImageResizer.WARNING_ID_BASE+a)!=null){e=new NcodeImageResizer(a,b);c=true;e.restoreImage()}}else{a=NcodeImageResizer.getNextId();e=new NcodeImageResizer(a,b)}if(c){e.reclaimWarning(a)}else{e.createWarning()}e.scale()}};NcodeImageResizer.prototype.restoreImage=function(){newimg=document.createElement("IMG");newimg.src=this.img.src;this.img.width=newimg.width;this.img.height=newimg.height};NcodeImageResizer.prototype.reclaimWarning=function(a){this.warning=document.getElementById(NcodeImageResizer.WARNING_ID_BASE+a);this.warningTextNode=this.warning.firstChild.firstChild.childNodes[1].firstChild;this.warning.resize=this;this.scale()};NcodeImageResizer.prototype.createWarning=function(){var g=document.createElement("TABLE");var d=document.createElement("TBODY");var a=document.createElement("TR");var f=document.createElement("TD");var e=document.createElement("TD");var c=document.createElement("IMG");var b=document.createTextNode("");c.src=NcodeImageResizer.BBURL+"/images/statusicon/wol_error.gif";c.width=16;c.height=16;c.alt="";c.border=0;f.width=20;f.className="td1";e.unselectable="on";e.className="td2";g.className="ncode_imageresizer_warning";g.textNode=b;g.resize=this;g.id=NcodeImageResizer.WARNING_ID_BASE+this.id;f.appendChild(c);e.appendChild(b);a.appendChild(f);a.appendChild(e);d.appendChild(a);g.appendChild(d);this.img.parentNode.insertBefore(g,this.img);this.warning=g;this.warningTextNode=b};NcodeImageResizer.prototype.setText=function(b){var a=document.createTextNode(b);this.warningTextNode.parentNode.replaceChild(a,this.warningTextNode);this.warningTextNode=a};NcodeImageResizer.prototype.scale=function(){this.img.height=this.originalHeight;this.img.width=this.originalWidth;if(NcodeImageResizer.MAXWIDTH>0&&this.img.width>NcodeImageResizer.MAXWIDTH){this.img.height=(NcodeImageResizer.MAXWIDTH/this.img.width)*this.img.height;this.img.width=NcodeImageResizer.MAXWIDTH}if(NcodeImageResizer.MAXHEIGHT>0&&this.img.height>NcodeImageResizer.MAXHEIGHT){this.img.width=(NcodeImageResizer.MAXHEIGHT/this.img.height)*this.img.width;this.img.height=NcodeImageResizer.MAXHEIGHT}this.warning.width=this.img.width;this.warning.onclick=function(){return this.resize.unScale()};if(this.img.width<450){this.setText(vbphrase.ncode_imageresizer_warning_small)}else{if(this.img.fileSize&&this.img.fileSize>0){this.setText(vbphrase.ncode_imageresizer_warning_filesize.replace("%1$s",this.originalWidth).replace("%2$s",this.originalHeight).replace("%3$s",Math.round(this.img.fileSize/1024)))}else{this.setText(vbphrase.ncode_imageresizer_warning_no_filesize.replace("%1$s",this.originalWidth).replace("%2$s",this.originalHeight))}}return false};NcodeImageResizer.prototype.unScale=function(){switch(NcodeImageResizer.MODE){case"samewindow":window.open(this.img.src,"_self");break;case"newwindow":window.open(this.img.src,"_blank");break;case"enlarge":default:this.img.width=this.originalWidth;this.img.height=this.originalHeight;this.img.className="ncode_imageresizer_original";if(this.warning!=null){this.setText(vbphrase.ncode_imageresizer_warning_fullsize);this.warning.width=this.img.width;this.warning.onclick=function(){return this.resize.scale()}}break}return false};