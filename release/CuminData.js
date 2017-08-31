window.addEventListener("load",function(){JudgeAgent();CuminFlag=CuminFlagClass.CreateInstance();var a=document.querySelectorAll("[template]");for(var b=0;b<a.length;b++){(function(c){a[c].style.display="none"}(b))}var a=document.querySelectorAll("[hide]");for(var b=0;b<a.length;b++){(function(c){a[c].style.display="none";a[c].removeAttribute("hide")}(b))}});function JudgeAgent(){var a=navigator.userAgent;if(a.indexOf("Trident")>-1||a.indexOf("MSIE")>-1){IsIE=true}else{if(a.indexOf("Chrome")>-1){IsChrome=true}else{if(a.indexOf("Firefox")>-1){IsFirefox=true}else{if(a.indexOf("Opera")>-1){IsOpera=true}}}}}function CuminData(a){return CuminDataClass.CreateInstance(a)}function CuminAjax(a){return CuminAjaxClass.CreateInstance(a)}function CuminPage(a){return CuminPageClass.CreateInstance(a)}function CuminWebSocket(a){return CuminWebSocketClass.CreateInstance(a)}var CuminFlag=null;var CuminDataDict=new Array();var CuminDataDisplayDict=new Array();var CuminPageDict=new Array();var AjaxFilter=new Array();var CuminAjaxTimeOut=false;var IsFirefox=false;var IsChrome=false;var IsOpera=false;var IsIE=false;CuminDataDisplayDict["DIV"]="block";CuminDataDisplayDict["OPTION"]="block";CuminDataDisplayDict["SPAN"]="inline";CuminDataDisplayDict["TD"]="table-cell";CuminDataDisplayDict["TR"]="table-row";CuminDataDisplayDict["TABLE"]="table";CuminDataDisplayDict["LI"]="list-item";CuminDataDisplayDict["A"]="inline";var CuminFlagClass={CreateInstance:function(){var a={};a.Template="template";a.Display="SourceDisplay";a.Content="field";a.Unique="unique";a.SelectText="SelectText";a.Operator="operator";a.Out="out";a.OutMap="outMap";a.NeedJson="json";a.Flag="cft";a.Query="Query";a.SortNumber="sortnumber";a.ClearJson="clearjson";a.TemplateDisplay="";a.OperatorValues="passjson";a.Url="PageUrl";a.JsonFrom="JsonFrom";a.JsonKeys="JsonKeys";a.BindTo="BindTo";a.PageField="PageIndex";a.Send_PageCount="pageSize";a.Send_PageIndex="page";a.Auth="auth";return a}};var CuminDataClass={CreateInstance:function(g,d){var c=document.querySelector(g);var f=c.getAttribute(CuminFlag.Content);if(f==null){name=g}else{name=f}if(CuminDataDict.hasOwnProperty(name)){var b=CuminDataDict[name];if(f!=null){b.Root=c;b.RootName=g;b.CurrentNode=g;b.Index=d}return b}var e={};if(d==null){d=0}e.Index=d;e.RootName=g;e.CurrentNode=g;e.Root=c;e.Converts=null;e.MapEvents=null;e.SortNumberEvents=null;e.OutMap=c.getAttribute(CuminFlag.OutMap);e.SortNumber=0;if(e.Root==null||e.Root=="undefined"){return e}else{CuminDataDict[name]=e}e.SpliteChar=";";e.SetSpliteChar=function(h){this.SpliteChar=h};e.ModelFlag=null;e.TemplateDisplay=null;e.Model=document.querySelector(e.RootName+" ["+CuminFlag.Template+"]");if(e.Model!=null&&e.Model!="undefined"){e.TemplateDisplay=CuminDataDisplayDict[e.Model.tagName];e.Model.removeAttribute(CuminFlag.Template);e.Model.style.display=CuminFlag.TemplateDisplay;e.Model.parentNode.removeChild(e.Model)}e.IsClearJson=false;var a=e.Root.getAttribute(CuminFlag.ClearJson);if(a!=null&&a=="true"){e.IsClearJson=true}e.IsSelect=false;if(e.Root.tagName=="SELECT"){e.IsSelect=true;e.Root.addEventListener("change",function(){var h=e.Root.value;e.Root.setAttribute(CuminFlag.Out,h)})}if(e.Converts==null){e.Converts=new Array()}e.AddConvert=function(h,i){this.Converts[h]=i;return this};e.AddConvertObject=function(h){if(h==null){return this}for(var i in h){this.Converts[i]=h[i]}return this};if(e.MapEvents==null){e.MapEvents=new Array()}e.AddEvents=function(h,i){this.MapEvents[h]=i;return this};e.AddEventsObject=function(h){if(h==null){return this}for(var i in h){this.MapEvents[i]=h[i]}return this};e.AddSortNumberEvent=function(h){this.SortNumberEvents=h;return this};e.BeforeCallBack=null;e.BeforeBind=function(h){this.BeforeCallBack=h;return this};e.OutRecoder=null;e.Append=function(i,h,j){this.Bind(i,h,j,false)};e.Bind=function(m,j,n,h){if(this.BeforeCallBack!=null){this.BeforeCallBack(m,j)}var l=m;if(m.hasOwnProperty("data")){l=m.data}if(h==null){h=true}if(h){this.Clear()}if(n==null){e.BindToNode=this.Root}else{e.BindToNode=document.querySelector(n)}this.OutRecoder=this.Root.getAttribute(CuminFlag.Out);if(l instanceof Array){if(this.IsSelect){for(var k=0;k<l.length;k++){this.SelectBind(l[k])}}else{for(var k=0;k<l.length;k++){this.NormalBind(l[k],k+1,j)}}}else{if(this.IsSelect){this.SelectBind(l)}else{this.SortNumber+=1;this.NormalBind(l,this.SortNumber,j)}}return this};e.SelectBind=function(j){var k=this.Private_SetCommond(j);var h=k.getAttribute(CuminFlag.Content);k.value=j[h];var i=k.getAttribute(CuminFlag.SelectText);k.text=j[i];k.removeAttribute(CuminFlag.SelectText);if(this.OutRecoder!=null){if(this.OutRecoder==j[this.OutMap]){k.selected=true}}return k};e.BindToNode=null;e.Private_SetCommond=function(h){this.Index+=1;var i=this.Model.cloneNode(true);i.setAttribute(CuminFlag.Flag,this.Index);i.removeAttribute(this.Template);e.BindToNode.appendChild(i);return i};e.SetUnique=function(j,i){var h=j.getAttribute(CuminFlag.Unique);if(IsNotNull(h)){j.NotifyData=i}};e.TriggerEvents=new Array();
e.NormalBind=function(l,j,h){var n=this.Private_SetCommond(l);var m=document.querySelectorAll(this.RootName+" ["+CuminFlag.Flag+'="'+this.Index+'"] ['+CuminFlag.Operator+"]");for(var k=0;k<m.length;k++){(function(i){var p=m[i];var o="";if(p.tagName=="INPUT"&&p.tagName=="SELECT"){o=p.Value}else{o=p.innerHTML}p.setAttribute(CuminFlag.Operator,e.Index);p.Tag=n;p.addEventListener("click",function(){var t=p.getAttribute(CuminFlag.Operator);e.CurrentNode=e.RootName+" ["+CuminFlag.Flag+'="'+t+'"]';var s=p.getAttribute(CuminFlag.OperatorValues);var r=null;if(s!=null){r=s.split(";")}var q=GetNodeJson(e.CurrentNode,e.IsClearJson,r);if(e.TriggerEvents.hasOwnProperty(o)){e.TriggerEvents[o](q,p)}})})(k)}this.UpdateCurrentNode(l,j,h,this.RootName+" ["+CuminFlag.Flag+'="'+this.Index+'"]',true,n)};e.MouseOn_Event=new Array();e.MouseOut_Event=new Array();e.MouseClick_Evnet=new Array();e.Private_BindEvent=function(h,i){if(this.MouseOn_Event.hasOwnProperty(h)){i.addEventListener("mouseover",function(){e.MouseOn_Event[h](i)})}if(this.MouseOut_Event.hasOwnProperty(h)){i.addEventListener("mouseout",function(){e.MouseOut_Event[h](i)})}if(this.MouseClick_Evnet.hasOwnProperty(h)){i.addEventListener("click",function(){e.MouseClick_Evnet[h](i)})}return this};e.On=function(h,i){this.MouseOn_Event[h]=i;if(!this.MouseOn_Event.hasOwnProperty(h)){this.Event("mouseover",h)}return this};e.Out=function(h,i){this.MouseOut_Event[h]=i;if(!this.MouseOut_Event.hasOwnProperty(h)){this.Event("mouseout",h)}return this};e.Click=function(h,i){this.MouseClick_Evnet[h]=i;if(this.MouseClick_Evnet.hasOwnProperty(h)){this.Event("click",h)}return this};e.Event=function(k,l){var h=document.querySelectorAll(this.RootName+" ["+CuminFlag.Flag+"] ["+CuminFlag.Content+'="'+name+'"]');for(var j=0;j<h.length;j++){(function(i){var m=h[i];m.addEventListener(k,function(){e.MouseOut_Event[l](m)})})(j)}return this};e.UpdateCurrentNode=function(A,m,x,q,C,r){if(q==null){if(this.CurrentNode==null){q=this.RootName+" [json]"}else{q=this.CurrentNode}}var z=q+" ["+CuminFlag.SortNumber+"]";var w=document.querySelector(z);if(w!=null){w.innerHTML=m;e.SortNumber=m;if(this.SortNumberEvents!=null){w.addEventListener("click",function(){e.SortNumberEvents(m,A,w,r)})}if(this.Converts.hasOwnProperty(CuminFlag.SortNumber)){this.Converts[CuminFlag.SortNumber](m,A,w,r)}}var y=null;var s=this.Root.getAttribute(CuminFlag.OutMap);if(this.OutRecoder!=null){y=this.OutRecoder.split(this.SpliteChar)}var o=q+" ["+CuminFlag.Content+"]";var k=q+" ["+CuminFlag.Out+"]";var B=q+" ["+CuminFlag.Out+"] ["+CuminFlag.Content+"]";var p=q+" ["+CuminFlag.Operator+"]";var l=document.querySelectorAll(o);var t=document.querySelectorAll(B);var h=document.querySelectorAll(k);var n=document.querySelectorAll(p);l=Remove(l,t);l=Remove(l,h);for(var v=0;v<n.length;v++){(function(i){var D=n[i];e.SetUnique(D,A);var j=null;if(D.tagName=="INPUT"||D.tagName=="SELECT"){j=D.value}else{j=D.innerHTML}if(e.Converts.hasOwnProperty(j)){e.Converts[j](j,A,D,r)}})(v)}for(var v=0;v<l.length;v++){(function(F){var I=l[F];e.SetUnique(I,A);var G=I.getAttribute(CuminFlag.Content);e.Private_BindEvent(G,I);if(A.hasOwnProperty(G)){var E=e.Data(G,A,I,r);if(E!=null){if(I.tagName=="INPUT"){I.value=E}else{I.innerHTML=E}}else{I.hiddenValue=A[G]}if(e.MapEvents.hasOwnProperty(G)){I.addEventListener("click",function(){e.MapEvents[G](A,I,r)})}}if(C){var H=I.getAttribute("type");if(H==null){return}if(H.toLowerCase()=="radio"){I.addEventListener("click",function(){e.Root.setAttribute(CuminFlag.Out,I.value)})}else{if(H.toLowerCase()=="check"){I.addEventListener("click",function(){if(I.checked){e.AddOutData(I.value)}else{e.SubOutData(I.value)}})}}if(G==s){if(y!=null){var D=I.value;for(var i=0;i<y.length;i++){if(D==y[i]){I.checked=true}}}}}})(v)}if(x!=null){for(var u=0;u<h.length;u++){(function(j){e.SetUnique(h[j],A);var D=h[j].getAttribute(CuminFlag.Content);e.Private_BindEvent(D,h[j]);var i=e.Data(D,A,h[j],r);if(i!=null){h[j].setAttribute(CuminFlag.Out,i);if(x.hasOwnProperty(D)){e.Index=CuminDataClass.CreateInstance(q+" ["+CuminFlag.Content+'="'+D+'"]',e.Index).Bind(x[D],x).Index}}else{node.hiddenValue=A[D]}})(u)}}this.CurrentNode=null};e.Data=function(j,l,k,i){var h=l[j];if(this.Converts.hasOwnProperty(j)){h=this.Converts[j](h,l,k,i)}return h};e.SubOutData=function(i){var h=e.OutRecoder;if(IsNotNull(h)){if(h.charAt(h.length-1)!=e.SpliteChar){h+=e.SpliteChar}}h=h.replace(i+e.SpliteChar,"");e.Root.setAttribute(CuminFlag.Out,h)};e.AddOutData=function(j){var i=e.OutRecoder;if(IsNotNull(i)){if(i.charAt(i.length-1)!=e.SpliteChar){i+=e.SpliteChar}i=i+j+e.SpliteChar}else{var h=j;if(IsNotNull(h)){i=h+e.SpliteChar}}e.Root.setAttribute(CuminFlag.Out,i)};e.Clear=function(){var h=document.querySelectorAll(this.RootName+" ["+CuminFlag.Flag+"]");for(var i=0;i<h.length;i++){(function(k){var j=h[k];j.NotifyData=null;j.parentNode.removeChild(j)})(i)}return this};e.Trigger=function(h,i){this.TriggerEvents[h]=i;return this};e.ClearCurrentNode=function(j){if(j==null){if(this.CurrentNode==null){j=this.RootName+" [json]"
}else{j=this.CurrentNode}}else{j=j+" [json]"}var h=document.querySelectorAll(j);for(var i=0;i<h.length;i++){(function(k){var l=h[k];if(l.tagName!="SELECT"&&l.tagName!="TBODY"&&l.getAttribute("type").toLowerCase()=="check"&&l.getAttribute("type").toLowerCase()=="radio"){l.innerHTML=""}})(i)}this.CurrentNode=null};e.DeleteCurrentNode=function(i){if(i==null){if(this.CurrentNode==null){i=this.RootName+" [json]"}else{i=this.CurrentNode}}var h=document.querySelector(i);h.parentNode.remove(h);this.CurrentNode=null};e.Operatos=function(j,k){var h=document.querySelectorAll(this.RootName+" ["+CuminFlag.Flag+"] ["+CuminFlag.Operator+"]");for(var i=0;i<h.length;i++){(function(l){var m=h[l];if(m.innerHTML==j){k(l,m)}})(i)}return this};e.Foreach=function(j,k){var h=document.querySelectorAll(this.RootName+" ["+CuminFlag.Flag+"] ["+CuminFlag.Content+'="'+j+'"]');for(var i=0;i<h.length;i++){(function(l){var m=h[l];k(l,m)})(i)}return this};e.Notify=function(l,k){var i=document.querySelectorAll(l);if(i!=null&&i.length>0){var m=i[0];var l=m.getAttribute(CuminFlag.Content);var h=m.getAttribute(CuminFlag.Unique).split(this.SpliteChar);for(var j=0;j<i.length;j++){(function(o){var p=i[o];for(var n=0;n<k.length;n++){(function(q){var s=p.NotifyData;var r=k[q];if(e.UniqueIsMatch(h,s,r)){var r=e.Data(l,k[q],p);if(r!=null){if(p.tagName=="INPUT"||p.tagName=="SELECT"){if(p.getAttribute(CuminFlag.OutMap)!=null){p.setAttribute(CuminFlag.Out,r)}p.value=r}else{p.innerHTML=r}}else{p.hiddenValue=k[l]}}})(n)}})(j)}}return this};e.UniqueIsMatch=function(h,k,l){if(!IsNotNull(h)){return false}for(var i=0;i<h.length;i++){if(k[h[i]]!=l[h[i]]){return false}}return true};return e}};var CuminValidClass={CreateInstance:function(){var a={};a.Field_Request=false;a.Field_Msg=null;a.Field_Custom=null;a.Field_Min=-1;a.Field_Max=-1;a.Field_No=null;a.Must=function(b){if(b==null){b=true}this.Field_Request=b;return this};a.Min=function(b){this.Field_Min=b;return this};a.Max=function(b){this.Field_Max=b;return this};a.No=function(b){};a.Custom=function(b){this.Field_Custom=b;return this};a.Message=function(b){this.Field_Msg=b;return this};return a}};var CuminAjaxClass={CreateInstance:function(){var a={};a.xmlhttp=null;a.toJson=false;if(window.XMLHttpRequest){a.xmlhttp=new XMLHttpRequest()}else{a.xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")}a.AddFilter=function(b){AjaxFilter[AjaxFilter.length]=b;return this};a.ToJson=function(b){if(b==null){b=false}this.toJson=b;return this};a.xmlhttp.onreadystatechange=function(){var b=a.xmlhttp.status;var d=null;var e=true;if(a.xmlhttp.readyState!=4){return}if(a.toJson){d=JSON.parse(a.xmlhttp.responseText)}else{d=a.xmlhttp.responseText}if(b==200||b==0){for(var c=0;c<AjaxFilter.length;c++){e=AjaxFilter[c](b,d);if(!e){return}}if(a.Succeed!=null){a.Succeed(b,d)}}else{for(var c=0;c<AjaxFilter.length;c++){AjaxFilter[c](b,d);if(!e){return}}if(a.Failed!=null){a.Failed(b,d)}}};a.Headers=new Array();a.AddHeader=function(b,c){this.Headers[b]=c;return this};a.Succeed=function(c,b){};a.Failed=function(c,b){};a.SetSucceed=function(b){this.Succeed=b;return this};a.SetFailed=function(b){this.Failed=b;return this};a.UseGet=function(b){this.RequestMethod="GET";this.RequestUrl=b;return this};a.UsePost=function(b){this.RequestMethod="POST";this.RequestUrl=b;return this};a.Submit=function(d){var c="";if(this.RequestMethod=="GET"){c=DealGetParameters(d)}this.xmlhttp.open(this.RequestMethod,this.RequestUrl+c,false);this.xmlhttp.setRequestHeader("TimeStamp",new Date().getTime());for(var b in this.Headers){this.xmlhttp.setRequestHeader(b,this.Headers[b])}if(this.RequestMethod=="GET"){this.xmlhttp.setRequestHeader("Content-type","text/xml;charset=utf-8");this.xmlhttp.send()}else{this.xmlhttp.setRequestHeader("Content-type","application/json");if(typeof(d)!="string"){this.xmlhttp.send(JSON.stringify(d))}else{this.xmlhttp.send(d)}}return this};a.AsyncSubmit=function(d){var c="";if(this.RequestMethod=="GET"){c=DealGetParameters(d)}this.xmlhttp.open(this.RequestMethod,this.RequestUrl+c,true);this.xmlhttp.setRequestHeader("TimeStamp",new Date().getTime());for(var b in this.Headers){this.xmlhttp.setRequestHeader(b,this.Headers[b])}if(this.RequestMethod=="GET"){this.xmlhttp.setRequestHeader("Content-type","text/xml;charset=utf-8");this.xmlhttp.send()}else{this.xmlhttp.setRequestHeader("Content-type","application/json");if(typeof(d)!="string"){this.xmlhttp.send(JSON.stringify(d))}else{this.xmlhttp.send(d)}}return this};return a}};function DealGetParameters(c){var b="";if(c!=null){b+="?";for(var a in c){b+=a+"="+encodeURIComponent(c[a])+"&"}if(b.length>2){b=b.substring(0,b.length-1)}else{b=""}}return b}var CuminPageClass={CreateInstance:function(b){if(CuminPageDict.hasOwnProperty(b)){return CuminPageDict[b]}var a={};a.RootName=b;a.Root=document.querySelector(b);a.Url=a.Root.getAttribute(CuminFlag.Url);a.JsonFrom=a.Root.getAttribute(CuminFlag.JsonFrom);a.JsonKeys=a.Root.getAttribute(CuminFlag.JsonKeys);a.BindTo=a.Root.getAttribute(CuminFlag.BindTo);a.PageCount=0;
a.PageItems=0;a.CurrentIndex=2;a.PageShows=null;a.Items=function(c){if(typeof(c)=="string"){this.PageShows=c}else{this.PageItems=c}return this};a.Page=function(d,e,c){this.PageCount=e;this.PageTotle=d;if(c!=null){this.PageShows=c}this.Append("Previous");this.ReBindClick();this.Append("Next");return this};a.Append=function(f,d){var c=document.createElement("li");var e=document.createElement("a");e.className=d;e.setAttribute("aria-label",f);c.appendChild(e);if(f=="Previous"){e.innerHTML='<span aria-hidden="true">&laquo;</span>';c.addEventListener("click",function(){var h=a.CurrentIndex-1;h-=1;if(h>=0){var g=document.querySelectorAll(a.RootName+" ["+CuminFlag.Content+"]");g[h].click()}})}else{if(f=="Next"){e.innerHTML='<span aria-hidden="true">&raquo;</span>';c.addEventListener("click",function(){var h=a.CurrentIndex+1;h-=1;if(h<=a.PageTotle){var g=document.querySelectorAll(a.RootName+" ["+CuminFlag.Content+"]");g[h].click()}})}}this.Root.appendChild(c)};a.ReBindClick=function(){CuminData(b).AddEvents(CuminFlag.PageField,function(k,j,f){j.parentNode.className+="active";var h=k["PageIndex"];a.CurrentIndex=h;var l=h-Math.ceil(a.PageCount/2)+1;var i=h+Math.floor(a.PageCount/2);if(l<1){l=1;i=a.PageCount;if(i>a.Totle){i=a.Totle}}else{if(i>a.PageTotle){l=a.PageTotle+1-a.PageCount;if(l<1){l==1}i=a.PageTotle}}var g=document.querySelectorAll(a.RootName+" ["+CuminFlag.Flag+"]");for(var h=0;h<g.length;h++){(function(n){g[n].style.display="none";g[n].className=g[n].className.replace("active","")})(h)}j.parentNode.className+="active";for(var h=l-1;h<i;h++){(function(n){g[n].style.display=CuminDataDisplayDict[j.tagName]})(h)}if(IsNotNull(a.Url)){var k=null;if(IsNotNull(a.JsonFrom)){var m=null;if(IsNotNull(a.JsonKeys)){m=a.JsonKeys.split(";")}k=GetNodeJson(a.JsonFrom,false,m)}if(k==null){k=new Array()}if(a.PageShows!=null){a.PageItems=parseInt(GetValue(a.PageShows))}k[CuminFlag.Send_PageCount]=a.PageItems;k[CuminFlag.Send_PageIndex]=a.CurrentIndex;AjaxGet(a.Url,k,function(n,o){CuminData(a.BindTo).Bind(o.data)})}}).Bind(GetPageJson(this.PageTotle));var c=document.querySelectorAll(a.RootName+" ["+CuminFlag.Flag+"]");var e=this.PageCount;if(this.PageCount>this.PageTotle){e=this.PageTotle}for(var d=e;d<c.length;d++){(function(f){c[f].style.display="none"})(d)}};return a}};var CuminWebSocketClass={CreateInstance:function(a){var b={};b.WebSocketHandler=null;b.URL=a;b.IsStart=false;b.EOpen=function(c){};b.EClose=function(c){};b.EMessage=function(c){};b.EError=function(c){};window.addEventListener("beforeunload",b.Close);b.State=function(){return this.WebSocketHandler.readyState};b.SendTime=200;b.SetSendDelayTime=function(c){this.SendTime=c;return this};b.BindOpenEvent=function(c){this.EOpen=c;return this};b.BindCloseEvent=function(c){this.EClose=c;return this};b.BindMessageEvent=function(c){this.EMessage=c;return this};b.BindErrorEvent=function(c){this.EError=c;return this};b.SendHandler=null;b.Queue=new Array();b.Index=0;b.Send=function(c){if(this.WebSocketHandler==null){return this}this.Queue[this.Queue.length]=c;if(this.SendHandler==null){this.PostMessage()}return this};b.Start=function(){if(this.IsStart){return this}b.IsStart=true;b.WebSocketHandler=new WebSocket(this.URL);b.WebSocketHandler.onopen=function(c){b.EOpen(c)};b.WebSocketHandler.onclose=function(c){if(b.IsStart){b.SendHandler=null;b.CloseHandler=null;b.WebSocketHandler=null;b.IsStart=false}b.EClose(c)};b.WebSocketHandler.onmessage=function(c){b.EMessage(c)};b.WebSocketHandler.onerror=function(c){if(b.IsStart){b.SendHandler=null;b.CloseHandler=null;b.WebSocketHandler=null;b.IsStart=false}b.EError(c);b.Close()};return this};b.QueueLimit=5;b.SetQueueLimit=function(c){this.QueueLimit=c;return this};b.PostMessage=function(){var c=this;this.SendHandler=window.setInterval(function(){if(c.WebSocketHandler==null){return}if(c.WebSocketHandler.readyState==1){if(c.Queue.length>0){c.WebSocketHandler.send(c.Queue[0]);c.Queue.shift()}else{c.Index+=1;if(c.Index==c.QueueLimit){this.Index=0;window.clearInterval(c.SendHandler);c.SendHandler=null}}}},this.SendTime);return this};b.CloseHandler=null;b.Close=function(){var c=this;if(this.WebSocketHandler!=null&&this.CloseHandler==null){this.CloseHandler=window.setInterval(function(){if(c.Queue.length==0){c.WebSocketHandler.close();window.clearInterval(c.SendHandler);window.clearInterval(c.CloseHandler);c.SendHandler=null;c.CloseHandler=null;c.WebSocketHandler=null;b.IsStart=false}},800)}return this};return b}};var CurrentI18NJson=new Array();var CuminI18NClass={CreateInstance:function(b){var a={};a.File=b;a.Import=function(){CuminAjax().ToJson(true).SetSucceed(function(c,d){CurrentI18NJson[a.File]=d}).SetFailed(function(c,d){alert("无法加载"+a.File+".json文件，请管理员检查网络与路径。");a.Recover()}).UseGet("js/Global/"+a.File+".json").Submit();return this};a.Refresh=function(d){if(!CurrentI18NJson.hasOwnProperty(this.File)){if(d!=null){this.File=d}this.Import();if(!CurrentI18NJson.hasOwnProperty(this.File)){return this}}var f=CurrentI18NJson[this.File];var c=document.querySelectorAll("[global]");
for(var e=0;e<c.length;e++){(function(h){var i=c[h];var g=i.getAttribute("global");if(f.hasOwnProperty(g)){Set(i,f[g])}})(e)}return this};a.Recover=function(){var c=document.querySelectorAll("[global]");for(var d=0;d<c.length;d++){(function(f){var g=c[f];var e=g.getAttribute("global");Set(g,e)})(d)}return this};return a}};function Global(a){return CuminI18NClass.CreateInstance(a)}function AjaxGet(c,f,d,a,b){if(CuminAjaxTimeOut){return}try{CuminAjax().ToJson(b).SetFailed(function(e,h){if(ErrorShow!=null){ErrorShow(e,h)}if(a!=null){a(e,h)}}).SetSucceed(function(e,h){if(ErrorShow!=null){ErrorShow(e,h)}if(d!=null){if(h!=null&&typeof(h)!="string"){if(h.hasOwnProperty("result")){if(h.result==1){d(e,h)}}}}}).UseGet(c).Submit(f)}catch(g){g.message="请检查地址和网络！";if(ErrorShow!=null){ErrorShow(g)}}}function AjaxPost(c,f,d,a,b){if(CuminAjaxTimeOut){return}try{CuminAjax().ToJson(b).SetFailed(function(e,h){if(ErrorShow!=null){ErrorShow(e,h)}if(a!=null){a(e,h)}}).SetSucceed(function(e,h){if(ErrorShow!=null){ErrorShow(e,h)}if(d!=null){if(h!=null&&typeof(h)!="string"){if(h.hasOwnProperty("result")){if(h.result==1){d(e,h)}}}}}).UsePost(c).Submit(f)}catch(g){g.message="请检查地址和网络！";if(ErrorShow!=null){ErrorShow(g)}}}function AjaxGetWithoutFilter(c,f,d,a,b){if(CuminAjaxTimeOut){return}try{CuminAjax().ToJson(b).SetFailed(function(e,h){if(a!=null){a(e,h)}}).SetSucceed(function(e,h){if(d!=null){if(h!=null&&typeof(h)!="string"){if(h.hasOwnProperty("result")){d(e,h)}}}}).UseGet(c).Submit(f)}catch(g){g.message="请检查地址和网络！";if(ErrorShow!=null){ErrorShow(g)}}}function AjaxPostWithoutFilter(b,d,c,a){if(CuminAjaxTimeOut){return}try{CuminAjax().ToJson(toJson).SetFailed(function(e,g){if(a!=null){a(e,g)}}).SetSucceed(function(e,g){if(c!=null){if(g!=null&&typeof(g)!="string"){if(g.hasOwnProperty("result")){c(e,g)}}}}).UsePost(b).Submit(d)}catch(f){f.message="请检查地址和网络！";if(ErrorShow!=null){ErrorShow(f)}}}function GetNodeJson(k,c,g){if(c==null){c=false}var m={};var e=null;if(g==null){var b=document.querySelectorAll(k+" [json]");for(var h=0;h<b.length;h++){(function(p){var r=b[p];var o=r.getAttribute("json");if(!IsNotNull(o)){o=r.getAttribute("field")}var s=r.getAttribute("out");if(!IsNotNull(s)){if(r.tagName=="INPUT"||r.tagName=="SELECT"){s=r.value}else{s=r.innerHTML}}if(c){if(!IsNotNull(s)){m[o]=s}}else{m[o]=s}var q={};q[o]=s;if(VaildConstraints.hasOwnProperty(o)){var n=VaildConstraints[o];validate.async(q,n).then(function(i){valid_success(i,r)},function(i){valid_error(i,r)})}})(h)}}else{for(var f=0;f<g.length;f++){var d=document.querySelector(k+' [field="'+g[f]+'"]');var l=d.getAttribute("json");if(!IsNotNull(l)){l=g[f]}var e=d.getAttribute("out");if(!IsNotNull(e)){if(d.tagName=="INPUT"){e=d.value}else{e=d.innerHTML}}if(c){if(IsNotNull(e)){m[l]=e}}else{m[l]=e}var a={};a[l]=e;if(VaildConstraints.hasOwnProperty(l)){var j=VaildConstraints[l];validate.async(a,j).then(function(i){valid_success(i,d)},function(i){valid_error(i,d)})}}}return m}var valid_success=function(a,b){};var valid_error=function(a,b){};function IsNotNull(a){if(a==null){return false}else{if(a==""){return false}else{if(a=="undefined"){return false}}}return true}function Remove(f,c){if(c==null){return}var e=new Array();for(var b=0;b<f.length;b++){var d=f[b];for(var a=0;a<c.length;a++){if(d==c[a]){d=null;break}}if(d!=null){e[e.length]=d}}return e}function GetPageJson(a){if(a==null&&a==0){return null}var c=new Array();for(var b=1;b<=a;b++){c[b-1]={"PageIndex":b}}return c}function JumpTo(a,b){if(b!=null){var c=parseInt(Math.random()*10);a=a+"?"+c}window.location.href=a}function IframeJumpTo(c,a){var b=document.querySelector(c);b.onload=b.onreadystatechange=function(g){if(!b.readyState||b.readyState=="complete"){var f=b.contentDocument.activeElement.textContent;if(f!=null){var d=JSON.parse(f);if(d.result==-1){JumpTo("https://"+window.location.host)}}}};b.src=a}function Delete(a){a.parentNode.removeChild(a)}function Set(a,b){if(a!=null){if(a.tagName=="SELECT"||a.tagName=="INPUT"){a.value=b}a.innerHTML=b}}function Value(b){var a=document.querySelector(b);if(a!=null){if(a.tagName=="SELECT"||a.tagName=="INPUT"){return a.value}return a.innerHTML}return null}function Clear(b){var a=document.querySelector(b);if(a!=null){if(a.tagName=="SELECT"||a.tagName=="INPUT"){a.value=null}a.innerHTML=null}}function Animated(a,b){if(a.AnimatedClear!=null){a.className+=b;a.AnimatedClear=function(){var c=a.className;a.className=c.replace(" "+b," ")}}else{a.className+=" animated "+b;a.AnimatedClear=function(){var c=a.className;a.className=c.replace(" "+b," ")};if(IsChrome){a.addEventListener("webkitAnimationEnd",function(){a.AnimatedClear()})}else{if(IsIE){a.addEventListener("MSAnimationEnd ",function(){a.AnimatedClear()})}else{if(IsFirefox){a.addEventListener("mozAnimationEnd ",function(){a.AnimatedClear()})}else{a.addEventListener("transitionend",function(){a.AnimatedClear()})}}}}}function Warning(a){ClearWarning(a);a.className+=" cumin-warning";a.BorderHandler=window.setTimeout(function(){ClearWarning(a)},8000)
}function ClearWarning(a){if(a.BorderHandler!=null){a.className=a.className.replace(" cumin-warning","");window.clearTimeout(a.BorderHandler);a.BorderHandler=null}}function AuthRender(d){for(var c in d){if(d[c]==0){var a=document.querySelectorAll("["+CuminFlag.Auth+'="'+c+'"]');if(a!=null){for(var b=0;b<a.length;b++){(function(e){var f=a[b];Delete(f)})(b)}}}}}function PageName(){var a=location.href.split("/");var b=a.slice(a.length-1,a.length).toString(String).split(".");return b.slice(0,1)};