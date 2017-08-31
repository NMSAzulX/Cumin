/**********************************Load Execute********************************/
window.addEventListener("load", function () {
    JudgeAgent();
    CuminFlag = CuminFlagClass.CreateInstance();
    var nodes = document.querySelectorAll("[template]");
    for (var i = 0; i < nodes.length; i++) {
        (function (index) {
            nodes[index].style.display = "none";
        }(i));
    }
    var nodes = document.querySelectorAll("[hide]");
    for (var i = 0; i < nodes.length; i++) {
        (function (index) {
            nodes[index].style.display = "none";
            nodes[index].removeAttribute("hide");
        }(i));
    }
});

function JudgeAgent() {
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("Trident") > -1 || userAgent.indexOf("MSIE") > -1) {
        IsIE = true;
    } else if (userAgent.indexOf("Chrome") > -1) {
        IsChrome = true;
    } else if (userAgent.indexOf("Firefox") > -1) {
        IsFirefox = true;
    } else if (userAgent.indexOf("Opera") > -1) {
        IsOpera = true;
    }
}




/********************************Function: FastInit*************************************/

function CuminData(nodeName) {
    return CuminDataClass.CreateInstance(nodeName);
}

function CuminAjax(nodeName) {
    return CuminAjaxClass.CreateInstance(nodeName);
}

function CuminPage(nodeName) {
    return CuminPageClass.CreateInstance(nodeName);
}

function CuminWebSocket(url) {
    return CuminWebSocketClass.CreateInstance(url);
}



/*******************************Defined: InitProperty***********************************/

var CuminFlag = null;
var CuminDataDict = new Array();
var CuminDataDisplayDict = new Array();
var CuminPageDict = new Array();
var AjaxFilter = new Array();
var CuminAjaxTimeOut = false;
var IsFirefox = false;
var IsChrome = false;
var IsOpera = false;
var IsIE = false;

CuminDataDisplayDict["DIV"] = "block";
CuminDataDisplayDict["OPTION"] = "block";
CuminDataDisplayDict["SPAN"] = "inline";
CuminDataDisplayDict["TD"] = "table-cell";
CuminDataDisplayDict["TR"] = "table-row";
CuminDataDisplayDict["TABLE"] = "table";
CuminDataDisplayDict["LI"] = "list-item";
CuminDataDisplayDict["A"] = "inline";


/*********************************Lib: FLAG***************************************/

var CuminFlagClass = {
    CreateInstance: function () {
        var handler = {};

        //模板标签
        handler.Template = "template";
        handler.Display = "SourceDisplay";
        handler.Content = "field";
        handler.Unique = "unique";
        handler.SelectText = "SelectText";
        handler.Operator = "operator";
        handler.Out = "out";
        handler.OutMap = "outMap";
        handler.NeedJson = "json";
        handler.Flag = "cft";
        handler.Query = "Query";
        handler.SortNumber = "sortnumber";
        handler.ClearJson = "clearjson";
        handler.TemplateDisplay = "";
        handler.OperatorValues = "passjson";
        handler.Url = "PageUrl";
        handler.JsonFrom = "JsonFrom";
        handler.JsonKeys = "JsonKeys";
        handler.BindTo = "BindTo";
        handler.PageField = "PageIndex";
        handler.Send_PageCount = "pageSize";
        handler.Send_PageIndex = "page";
        handler.Auth = "auth";
        return handler;
    }
}


/*********************************Lib: BIND***************************************/

var CuminDataClass = {
    CreateInstance: function (nodeName, index) {

		/**
		 * 从缓存中取类的实例
		 */
        
        var root = document.querySelector(nodeName);
        var map = root.getAttribute(CuminFlag.Content);
        if (map == null) {
            name = nodeName;
        } else {
            name = map;
        }
        if (CuminDataDict.hasOwnProperty(name)) {
            var r_handler = CuminDataDict[name];
            if (map != null) {
                r_handler.Root = root;
                r_handler.RootName = nodeName;
                r_handler.CurrentNode = nodeName;
                r_handler.Index = index;
            }
            return r_handler;
        }

        var handler = {};
        if(index==null){
            index=0;
        }
        handler.Index = index; //Cumin索引
        handler.RootName = nodeName; //根节点名称
        handler.CurrentNode = nodeName; //当前节点
        handler.Root = root;
        handler.Converts = null;
        handler.MapEvents = null;
        handler.SortNumberEvents = null;
        handler.OutMap = root.getAttribute(CuminFlag.OutMap);
        handler.SortNumber = 0;
		/**
		 * 获取节点实例，并缓存当前类实例
		 */
        if (handler.Root == null || handler.Root == "undefined") {
            return handler;
        } else {
            CuminDataDict[name] = handler;
        }



		/**
		 * 设置拼接符号
		 */
        handler.SpliteChar = ";";
        handler.SetSpliteChar = function (spliteChar) {
            this.SpliteChar = spliteChar;
        }

		/**
		 * 获取数据模板
		 */
        handler.ModelFlag = null;
        handler.TemplateDisplay = null;

        handler.Model = document.querySelector(handler.RootName + " [" + CuminFlag.Template + "]");
        if (handler.Model != null && handler.Model != "undefined") {
            handler.TemplateDisplay = CuminDataDisplayDict[handler.Model.tagName];
            handler.Model.removeAttribute(CuminFlag.Template);
            handler.Model.style.display = CuminFlag.TemplateDisplay;
            handler.Model.parentNode.removeChild(handler.Model);
        }

		/**
		 * 是否清理JSON
		 */
        handler.IsClearJson = false;
        var clearJsonNode = handler.Root.getAttribute(CuminFlag.ClearJson);
        if (clearJsonNode != null && clearJsonNode == "true") {
            handler.IsClearJson = true;
        }

		/**
		 * 如果节点是SELECT特殊节点
		 */
        handler.IsSelect = false;
        if (handler.Root.tagName == "SELECT") {
            handler.IsSelect = true;
            handler.Root.addEventListener("change", function () {
                var value = handler.Root.value;
                handler.Root.setAttribute(CuminFlag.Out, value);
            });
        }


		/**
		 * 转换器
		 */
        if (handler.Converts == null) {
            handler.Converts = new Array();
        }
		/**
		 * 	添加转换器
		 */
        handler.AddConvert = function (key, func) {
            this.Converts[key] = func;
            return this;
        }
        handler.AddConvertObject = function (instance) {
            if (instance == null) {
                return this;
            }
            for (var key in instance) {
                this.Converts[key] = instance[key];
            }
            return this;
        }
		/**
		 * 节点事件
		 */
        if (handler.MapEvents == null) {
            handler.MapEvents = new Array();
        }
		/**
		 * 	添加节点事件
		 */
        handler.AddEvents = function (key, func) {
            this.MapEvents[key] = func;
            return this;
        }
        handler.AddEventsObject = function (instance) {
            if (instance == null) {
                return this;
            }
            for (var key in instance) {
                this.MapEvents[key] = instance[key];
            }
            return this;
        }

		/**
		 * 序号事件
		 */
        handler.AddSortNumberEvent = function (func) {
            this.SortNumberEvents = func;
            return this;
        }

		/**
		 * 绑定前执行
		 */
        handler.BeforeCallBack = null;
        handler.BeforeBind = function (func) {
            this.BeforeCallBack = func;
            return this;
        }
		/**
		 * 绑定数据
		 * data:外层需要绑定的数据
		 * out:	内层需要绑定的数据
		 * to:	绑定节点添加到何处
		 */


        handler.OutRecoder = null;
        handler.Append = function (data, out, to) {
            this.Bind(data, out, to, false);
        }

        handler.Bind = function (msg, out, to, isClear) {
            if (this.BeforeCallBack != null) {
                this.BeforeCallBack(msg, out);
            }
            var data = msg;
            if (msg.hasOwnProperty("data")) {
                data = msg.data;
            }

            //清理原来绑定的节点
            if (isClear == null) {
                isClear = true;
            }
            if (isClear) {
                this.Clear();
            }


            //确定绑定节点
            if (to == null) {
                handler.BindToNode = this.Root;
            } else {
                handler.BindToNode = document.querySelector(to);
            }

            this.OutRecoder = this.Root.getAttribute(CuminFlag.Out);
            if (data instanceof Array) {

                //如果绑定数据是数组
                if (this.IsSelect) {
                    for (var i = 0; i < data.length; i++) {
                        this.SelectBind(data[i]);
                    }
                } else {
                    for (var i = 0; i < data.length; i++) {
                        this.NormalBind(data[i], i + 1, out);
                    }
                }
            } else {
                //如果绑定数据不是数组
                if (this.IsSelect) {
                    this.SelectBind(data);
                } else {
                    this.SortNumber+=1;
                    this.NormalBind(data, this.SortNumber, out);
                }
            }
            return this;
        }

		/**
		 * 绑定SELECT
		 */
        handler.SelectBind = function (data) {
            //设置以及获取克隆节点
            var clone = this.Private_SetCommond(data);

            //根据field属性值设置Value属性
            var fieldKey = clone.getAttribute(CuminFlag.Content);
            clone.value = data[fieldKey];

            //根据CuminText的值设置Text属性
            var textKey = clone.getAttribute(CuminFlag.SelectText);
            clone.text = data[textKey];
            clone.removeAttribute(CuminFlag.SelectText);


            //跟外连值进行匹配
            if (this.OutRecoder != null) {
                if (this.OutRecoder == data[this.OutMap]) {
                    //匹配并选中
                    clone.selected = true;
                }
            }
            return clone;
        }

		/**
		 * 设置公共属性
		 * 1、CTX索引加1
		 * 2、克隆模板节点
		 * 3、给克隆节点设置CTX唯一标识
		 * 4、移除template属性
		 * 5、还原Display属性
		 * 6、检测并设置唯一匹配数据
		 * 7、添加到指定节点
		 */
        handler.BindToNode = null;
        handler.Private_SetCommond = function (data) {
            this.Index += 1;
            var clone = this.Model.cloneNode(true);
            clone.setAttribute(CuminFlag.Flag, this.Index);
            clone.removeAttribute(this.Template);
            handler.BindToNode.appendChild(clone);
            return clone;
        }

		/**
		 * 设置唯一列
		 * 如果设置有 unique 标签 则将数据填充到当前克隆的节点
		 */
        handler.SetUnique = function (clone, data) {
            var uniqueValue = clone.getAttribute(CuminFlag.Unique);
            if (IsNotNull(uniqueValue)) {
                clone.NotifyData = data
            }
        }

		/**
		 * 	绑定正常节点
		 */
        handler.TriggerEvents = new Array();
        handler.NormalBind = function (data, index, out) {
            var clone = this.Private_SetCommond(data);
            var operatorNodes = document.querySelectorAll(this.RootName + " [" + CuminFlag.Flag + "=\"" + this.Index + "\"] [" + CuminFlag.Operator + "]");
            for (var i = 0; i < operatorNodes.length; i++) {
                (function (j) {
                    var node = operatorNodes[j];
                    
                    var content = "";
                    if(node.tagName=="INPUT" && node.tagName=="SELECT"){
                        content = node.Value;
                    }else{
                        content = node.innerHTML;
                    }
                    node.setAttribute(CuminFlag.Operator, handler.Index);
                    node.Tag = clone;
                    node.addEventListener("click", function () {
                        var ctxValue = node.getAttribute(CuminFlag.Operator);
                        handler.CurrentNode = handler.RootName + " [" + CuminFlag.Flag + "=\"" + ctxValue + "\"]";
                        var jsonArray = node.getAttribute(CuminFlag.OperatorValues);
                        var spicalDict =  null;
                        if(jsonArray!=null){
                            spicalDict = jsonArray.split(";");
                        }
                        var submitData = GetNodeJson(handler.CurrentNode, handler.IsClearJson, spicalDict);
                        if(handler.TriggerEvents.hasOwnProperty(content)){
                            handler.TriggerEvents[content](submitData, node);
                        }
                    });
                })(i);
            }
            this.UpdateCurrentNode(data, index, out, this.RootName + " [" + CuminFlag.Flag + "=\"" + this.Index + "\"]", true, clone);
        }

		/**
		 * 更新当前节点
		 */
        handler.MouseOn_Event = new Array();
        handler.MouseOut_Event = new Array();
        handler.MouseClick_Evnet = new Array();

        handler.Private_BindEvent = function (name, node) {
            if (this.MouseOn_Event.hasOwnProperty(name)) {
                node.addEventListener("mouseover", function () {
                    handler.MouseOn_Event[name](node);
                });
            }

            if (this.MouseOut_Event.hasOwnProperty(name)) {
                node.addEventListener("mouseout", function () {
                    handler.MouseOut_Event[name](node);
                });
            }

            if (this.MouseClick_Evnet.hasOwnProperty(name)) {
                node.addEventListener("click", function () {
                    handler.MouseClick_Evnet[name](node);
                });
            }
            return this;
        }

        handler.On = function (name, func) {
            this.MouseOn_Event[name] = func;
            if (!this.MouseOn_Event.hasOwnProperty(name)) {
                this.Event("mouseover", name);
            }
            return this;
        }
        handler.Out = function (name, func) {
            this.MouseOut_Event[name] = func;
            if (!this.MouseOut_Event.hasOwnProperty(name)) {
                this.Event("mouseout", name);
            }
            return this;
        }
        handler.Click = function (name, func) {
            this.MouseClick_Evnet[name] = func;
            if (this.MouseClick_Evnet.hasOwnProperty(name)) {
                this.Event("click", name);
            }
            return this;
        }

        handler.Event = function (event, field) {
            var nodes = document.querySelectorAll(this.RootName + " [" + CuminFlag.Flag + "] [" + CuminFlag.Content + "=\"" + name + "\"]");
            for (var i = 0; i < nodes.length; i++) {
                (function (index) {
                    var node = nodes[index];
                    node.addEventListener(event, function () {
                        handler.MouseOut_Event[field](node);
                    });
                })(i);
            }
            return this;
        }






        handler.UpdateCurrentNode = function (data, index, out, uniqueFlag, isClone, cloneNode) {

            if (uniqueFlag == null) {
                if (this.CurrentNode == null) {
                    uniqueFlag = this.RootName + " [json]";
                } else {
                    uniqueFlag = this.CurrentNode;
                }
            }

			/**
			 * 设置克隆节点序号
			 */
            var sort = uniqueFlag + " [" + CuminFlag.SortNumber + "]";
            var sortNode = document.querySelector(sort);
            if (sortNode != null) {
                sortNode.innerHTML = index;
                handler.SortNumber = index;
                if (this.SortNumberEvents != null) {
                    sortNode.addEventListener("click", function () {
                        handler.SortNumberEvents(index, data, sortNode, cloneNode);
                    });
                }
                if (this.Converts.hasOwnProperty(CuminFlag.SortNumber)) {
                    this.Converts[CuminFlag.SortNumber](index, data, sortNode, cloneNode);
                }
            }

			/**
			 * 分隔外联数据
			 */
            var outValues = null;
            var outLinkKey = this.Root.getAttribute(CuminFlag.OutMap);
            if (this.OutRecoder != null) {
                outValues = this.OutRecoder.split(this.SpliteChar);
            }

			/**
			 * 获取field 非out节点
			 */
            var recoder = uniqueFlag + " [" + CuminFlag.Content + "]";
            var outlink = uniqueFlag + " [" + CuminFlag.Out + "]";
            var remove = uniqueFlag + " [" + CuminFlag.Out + "] [" + CuminFlag.Content + "]";
            var operator = uniqueFlag + " [" + CuminFlag.Operator + "]";



            var normalNodes = document.querySelectorAll(recoder);
            var removeNodes = document.querySelectorAll(remove);
            var outNodes = document.querySelectorAll(outlink);
            var operatorNodes = document.querySelectorAll(operator);
            normalNodes = Remove(normalNodes, removeNodes);
            normalNodes = Remove(normalNodes, outNodes);

            //给Operator绑定Convertor转换器
            for (var i = 0; i < operatorNodes.length; i++) {
                (function (index) {
                    var node = operatorNodes[index];
                    handler.SetUnique(node, data);
                    var key = null;
                    if (node.tagName == "INPUT" || node.tagName == "SELECT") {
                        key = node.value;
                    } else {
                        key = node.innerHTML;
                    }
                    if (handler.Converts.hasOwnProperty(key)) {
                        handler.Converts[key](key, data, node, cloneNode);
                    }
                })(i);
            }

            //遍历普通节点
            for (var i = 0; i < normalNodes.length; i++) {
                (function (index) {
                    var node = normalNodes[index];
                    //检测并设置节点唯一匹配列   
                    handler.SetUnique(node, data);
                    //获取Field
                    var key = node.getAttribute(CuminFlag.Content);
                    handler.Private_BindEvent(key, node);
                    //设置Field
                    if (data.hasOwnProperty(key)) {
                        var r_data = handler.Data(key, data, node, cloneNode);
                        if (r_data != null) {
                            if (node.tagName == "INPUT") {
                                node.value = r_data;
                            } else {
                                node.innerHTML = r_data;
                            }
                        } else {
                            node.hiddenValue = data[key];
                        }

                        //如果有映射事件，则添加映射事件
                        if (handler.MapEvents.hasOwnProperty(key)) {
                            node.addEventListener("click", function () {
                                handler.MapEvents[key](data, node, cloneNode);
                            });
                        }
                    }
                    //设置节点事件
                    if (isClone) {
                        var type = node.getAttribute("type");
                        if (type == null) {
                            return;
                        }
                        if (type.toLowerCase() == "radio") {
                            node.addEventListener("click", function () {
                                handler.Root.setAttribute(CuminFlag.Out, node.value);
                            });

                        } else if (type.toLowerCase() == "check") {
                            node.addEventListener("click", function () {
                                if (node.checked) {
                                    handler.AddOutData(node.value);
                                } else {
                                    handler.SubOutData(node.value);
                                }
                            });
                        }
                        if (key == outLinkKey) {
                            if (outValues != null) {
                                var nodeData = node.value;
                                for (var j = 0; j < outValues.length; j++) {
                                    if (nodeData == outValues[j]) {
                                        node.checked = true;
                                    }
                                }
                            }
                        }
                    }
                })(i);
            }

            if (out != null) {
                for (var j = 0; j < outNodes.length; j++) {
                    (function (index) {
                        handler.SetUnique(outNodes[index], data);
                        var key = outNodes[index].getAttribute(CuminFlag.Content);
                        handler.Private_BindEvent(key, outNodes[index]);
                        var r_data = handler.Data(key, data, outNodes[index], cloneNode);
                        if (r_data != null) {
                            outNodes[index].setAttribute(CuminFlag.Out, r_data);
                            if (out.hasOwnProperty(key)) {
                                handler.Index = CuminDataClass.CreateInstance(uniqueFlag + " [" + CuminFlag.Content + "=\"" + key + "\"]", handler.Index).Bind(out[key], out).Index;
                            }
                        } else {
                            node.hiddenValue = data[key];
                        }
                    })(j);
                }
            }
            this.CurrentNode = null;
        }

		/**
		 *   数据处理
		 */
        handler.Data = function (key, data, node, cloneNode) {
            var result = data[key];
            if (this.Converts.hasOwnProperty(key)) {
                result = this.Converts[key](result, data, node, cloneNode);
            }
            return result;
        }

		/**
		 * checkbox或者radiobutton选中时会做以下操作
		 */
        handler.SubOutData = function (value) {
            var tempOutValue = handler.OutRecoder;
            //取最后一个字符，如果不是分隔符那么加上分隔符
            if (IsNotNull(tempOutValue)) {
                if (tempOutValue.charAt(tempOutValue.length - 1) != handler.SpliteChar) {
                    tempOutValue += handler.SpliteChar;
                }
            }
            //将旧数据替换掉
            tempOutValue = tempOutValue.replace(value + handler.SpliteChar, "");
            handler.Root.setAttribute(CuminFlag.Out, tempOutValue);
        }

        handler.AddOutData = function (value) {
            var tempOutValue = handler.OutRecoder;
            if (IsNotNull(tempOutValue)) {
                //取最后一个字符，如果不是分隔符那么加上分隔符
                if (tempOutValue.charAt(tempOutValue.length - 1) != handler.SpliteChar) {
                    tempOutValue += handler.SpliteChar;
                }
                //将数据拼接上去
                tempOutValue = tempOutValue + value + handler.SpliteChar;
            } else {

                var result = value;
                //不是空那么拼接
                if (IsNotNull(result)) {
                    tempOutValue = result + handler.SpliteChar;
                }
            }
            handler.Root.setAttribute(CuminFlag.Out, tempOutValue);
        }




        handler.Clear = function () {
            var nodes = document.querySelectorAll(this.RootName + " [" + CuminFlag.Flag + "]")
            for (var j = 0; j < nodes.length; j++) {
                (function (index) {
                    var dataNode = nodes[index];
                    dataNode.NotifyData = null;
                    dataNode.parentNode.removeChild(dataNode);
                })(j);
            }
            return this;
        }

        
        handler.Trigger = function (name, func) {
            this.TriggerEvents[name]=func;
            return this;
        }


        handler.ClearCurrentNode = function (uniqueFlag) {
            if (uniqueFlag == null) {
                if (this.CurrentNode == null) {
                    uniqueFlag = this.RootName + " [json]";
                } else {
                    uniqueFlag = this.CurrentNode;
                }
            } else {
                uniqueFlag = uniqueFlag + " [json]";
            }

            var nodes = document.querySelectorAll(uniqueFlag);
            for (var index = 0; index < nodes.length; index++) {
                (function (i) {
                    var node = nodes[i];
                    if (node.tagName != "SELECT" && node.tagName != "TBODY" &&
                        node.getAttribute("type").toLowerCase() == "check" &&
                        node.getAttribute("type").toLowerCase() == "radio"
                    ) {
                        node.innerHTML = "";
                    }
                })(index)

            }
            this.CurrentNode = null;
        }

        handler.DeleteCurrentNode = function (uniqueFlag) {
            if (uniqueFlag == null) {
                if (this.CurrentNode == null) {
                    uniqueFlag = this.RootName + " [json]";
                } else {
                    uniqueFlag = this.CurrentNode;
                }
            }
            var node = document.querySelector(uniqueFlag);
            node.parentNode.remove(node);
            this.CurrentNode = null;
        }




        handler.Operatos = function (name, func) {
            var nodes = document.querySelectorAll(this.RootName + " [" + CuminFlag.Flag + "] [" + CuminFlag.Operator + "]");
            for (var index = 0; index < nodes.length; index++) {
                (function (i) {
                    var node = nodes[i];
                    if (node.innerHTML == name) {
                        func(i, node);
                    }
                })(index);
            }
            return this;
        }

        handler.Foreach = function (name, func) {
            var nodes = document.querySelectorAll(this.RootName + " [" + CuminFlag.Flag + "] [" + CuminFlag.Content + "=\"" + name + "\"]");
            for (var index = 0; index < nodes.length; index++) {
                (function (i) {
                    var node = nodes[i];
                    func(i, node);
                })(index);
            }
            return this;
        }

		/**
		 *根据唯一列的key，将数据重新绑定到指定列 
		 *该列需要绑定唯一标识
		 */
        handler.Notify = function (key, out) {

            var nodes = document.querySelectorAll(key);
            if (nodes != null && nodes.length > 0) {
                var tNode = nodes[0];
                var key = tNode.getAttribute(CuminFlag.Content);
                var values = tNode.getAttribute(CuminFlag.Unique).split(this.SpliteChar);

                for (var index = 0; index < nodes.length; index++) {
                    (function (i) {
                        var node = nodes[i];
                        for (var j = 0; j < out.length; j++) {
                            (function (n_index) {
                                var n_data = node.NotifyData;
                                var r_data = out[n_index];
                                if (handler.UniqueIsMatch(values, n_data, r_data)) {
                                    var r_data = handler.Data(key, out[n_index], node);
                                    if (r_data != null) {
                                        if (node.tagName == "INPUT" || node.tagName=="SELECT") {
                                            if(node.getAttribute(CuminFlag.OutMap)!=null){
                                                node.setAttribute(CuminFlag.Out,r_data);
                                            }
                                            node.value = r_data;
                                        } else {
                                            node.innerHTML = r_data;
                                        }
                                    } else {
                                        node.hiddenValue = out[key];
                                    }

                                }
                            })(j);
                        }
                    })(index)
                }
            }
            return this;
        }

		/**
		 * 数据唯一性匹配
		 */
        handler.UniqueIsMatch = function (values, data, outData) {
            if (!IsNotNull(values)) {
                return false;
            }
            for (var j = 0; j < values.length; j++) {
                if (data[values[j]] != outData[values[j]]) {
                    return false;
                }
            }
            return true;
        }

        return handler;
    }
}

/*********************************Lib: Valid***************************************/
var CuminValidClass = {
    CreateInstance: function () {

        var handler = {};
        handler.Field_Request = false;
        handler.Field_Msg = null;
        handler.Field_Custom = null;
        handler.Field_Min = -1;
        handler.Field_Max = -1;
        handler.Field_No = null;

        handler.Must = function (shut) {
            if (shut == null) {
                shut = true;
            }
            this.Field_Request = shut;
            return this;
        }

        handler.Min = function (min) {
            this.Field_Min = min;
            return this;
        }
        handler.Max = function (max) {
            this.Field_Max = max;
            return this;
        }
        handler.No = function (prevent) {

        }
        handler.Custom = function (func) {
            this.Field_Custom = func;
            return this;
        }

        handler.Message = function (msg) {
            this.Field_Msg = msg;
            return this;
        }

        return handler;
    }
    //Stop .......
}






/*********************************Lib: AJAX***************************************/

var CuminAjaxClass = {
    CreateInstance: function () {

        var handler = {};
        handler.xmlhttp = null;
        handler.toJson = false;
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            handler.xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            handler.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        handler.AddFilter = function (func) {
            AjaxFilter[AjaxFilter.length] = func;
            return this;
        }

        handler.ToJson = function (shut) {
            if (shut == null) {
                shut = false;
            }
            this.toJson = shut;
            return this;
        }
        handler.xmlhttp.onreadystatechange = function () {
            var status = handler.xmlhttp.status;
            var json = null;
            var shut = true;

            if (handler.xmlhttp.readyState != 4) { return; }

            if (handler.toJson) {

                //console.log(handler.xmlhttp.responseText);
                json = JSON.parse(handler.xmlhttp.responseText);

            } else {

                json = handler.xmlhttp.responseText;
            }

            if (status == 200 || status == 0 ) {

                for (var i = 0; i < AjaxFilter.length; i++) {
                    shut = AjaxFilter[i](status, json);
                    if (!shut) {
                        return;
                    }
                }

                if (handler.Succeed != null) {
                    handler.Succeed(status, json);
                }

            } else {

                for (var i = 0; i < AjaxFilter.length; i++) {
                    AjaxFilter[i](status, json);
                    if (!shut) {
                        return;
                    }
                }

                if (handler.Failed != null) {
                    handler.Failed(status, json);
                }
            }
        }
        handler.Headers = new Array();
        //添加请求头
        handler.AddHeader = function (key, value) {
            this.Headers[key] = value;
            return this;
        }
        handler.Succeed = function (status, result) { };
        handler.Failed = function (status, result) { };
        //绑定成功事件
        handler.SetSucceed = function (func) {
            this.Succeed = func;
            return this;
        }
        //绑定失败事件
        handler.SetFailed = function (func) {
            this.Failed = func;
            return this;
        }
        //设置请求方法GET并设置URL
        handler.UseGet = function (url) {
            this.RequestMethod = "GET";
            this.RequestUrl = url;
            return this;
        }
        //设置请求方法POST并设置URL
        handler.UsePost = function (url) {
            this.RequestMethod = "POST";
            this.RequestUrl = url;
            return this;
        }
        //发送请求
        handler.Submit = function (data) {
            var parameters = "";
            if (this.RequestMethod == "GET") {
                parameters = DealGetParameters(data);
            }
            this.xmlhttp.open(this.RequestMethod, this.RequestUrl + parameters, false);
            this.xmlhttp.setRequestHeader("TimeStamp", new Date().getTime());
            for (var key in this.Headers) {
                this.xmlhttp.setRequestHeader(key, this.Headers[key]);
            }
            if (this.RequestMethod == "GET") {
                this.xmlhttp.setRequestHeader("Content-type", "text/xml;charset=utf-8");
                this.xmlhttp.send();
            } else {
                //以json的格式post
                this.xmlhttp.setRequestHeader("Content-type", "application/json");
                if (typeof (data) != "string") {
                    this.xmlhttp.send(JSON.stringify(data));
                } else {
                    this.xmlhttp.send(data);
                }
            }
            return this;
        }



        //发送请求
        handler.AsyncSubmit = function (data) {
            var parameters = "";
            if (this.RequestMethod == "GET") {
                parameters = DealGetParameters(data);
            }
            this.xmlhttp.open(this.RequestMethod, this.RequestUrl + parameters, true);
            this.xmlhttp.setRequestHeader("TimeStamp", new Date().getTime());
            for (var key in this.Headers) {
                this.xmlhttp.setRequestHeader(key, this.Headers[key]);
            }
            if (this.RequestMethod == "GET") {
                this.xmlhttp.setRequestHeader("Content-type", "text/xml;charset=utf-8");
                this.xmlhttp.send();
            } else {
                this.xmlhttp.setRequestHeader("Content-type", "application/json");
                if (typeof (data) != "string") {
                    this.xmlhttp.send(JSON.stringify(data));
                } else {
                    this.xmlhttp.send(data);
                }
            }
            return this;
        }

        return handler;
    }
}

function DealGetParameters(data) {
    var ParameterUrl = "";
    if (data != null) {
        ParameterUrl += "?";
        for (var key in data) {
            ParameterUrl += key + "=" + encodeURIComponent(data[key]) + "&";
        }
        if (ParameterUrl.length > 2) {
            ParameterUrl = ParameterUrl.substring(0, ParameterUrl.length - 1);
        } else {
            ParameterUrl = "";
        }
    }
    return ParameterUrl;
}

/**********************************Lib: Page****************************************/

var CuminPageClass = {
    CreateInstance: function (nodeName) {

        if (CuminPageDict.hasOwnProperty(nodeName)) {
            return CuminPageDict[nodeName];
        }

        var handler = {};
        handler.RootName = nodeName;
        handler.Root = document.querySelector(nodeName);
        handler.Url = handler.Root.getAttribute(CuminFlag.Url);
        handler.JsonFrom = handler.Root.getAttribute(CuminFlag.JsonFrom);
        handler.JsonKeys = handler.Root.getAttribute(CuminFlag.JsonKeys);
        handler.BindTo = handler.Root.getAttribute(CuminFlag.BindTo);
        handler.PageCount = 0;
        handler.PageItems = 0;
        handler.CurrentIndex = 2;
        handler.PageShows = null;

        handler.Items = function (shows) {
            if (typeof (shows) == "string") {
                this.PageShows = shows;
            } else {
                this.PageItems = shows;
            }
            return this;
        }

        handler.Page = function (totle, count, shows) {
            this.PageCount = count;
            this.PageTotle = totle;
            if (shows != null) {
                this.PageShows = shows;
            }
            this.Append("Previous");
            this.ReBindClick();
            this.Append("Next");
            return this;
        }

        handler.Append = function (attribute, className) {
            var element = document.createElement("li");
            var content = document.createElement("a");
            content.className = className;
            content.setAttribute("aria-label", attribute)
            element.appendChild(content);
            if (attribute == "Previous") {
                content.innerHTML = "<span aria-hidden=\"true\">&laquo;</span>";
                element.addEventListener("click", function () {
                    var index = handler.CurrentIndex - 1;
                    index -= 1;
                    if (index >= 0) {
                        var nodes = document.querySelectorAll(handler.RootName + " [" + CuminFlag.Content + "]");
                        nodes[index].click();
                    }
                });
            } else if (attribute == "Next") {
                content.innerHTML = "<span aria-hidden=\"true\">&raquo;</span>";
                element.addEventListener("click", function () {
                    var index = handler.CurrentIndex + 1;
                    index -= 1;
                    if (index <= handler.PageTotle) {
                        var nodes = document.querySelectorAll(handler.RootName + " [" + CuminFlag.Content + "]");
                        nodes[index].click();
                    }
                });
            }

            this.Root.appendChild(element);
        }



        handler.ReBindClick = function () {

            CuminData(nodeName).AddEvents(CuminFlag.PageField, function (data, node, root) {

                node.parentNode.className += "active";
                var index = data["PageIndex"];
                handler.CurrentIndex = index;
                var left = index - Math.ceil(handler.PageCount / 2) + 1;
                var right = index + Math.floor(handler.PageCount / 2);
                if (left < 1) {
                    left = 1;
                    right = handler.PageCount;
                    if (right > handler.Totle) {
                        right = handler.Totle
                    };
                } else if (right > handler.PageTotle) {
                    left = handler.PageTotle + 1 - handler.PageCount;
                    if (left < 1) {
                        left == 1
                    };
                    right = handler.PageTotle;
                }

                var nodes = document.querySelectorAll(handler.RootName + " [" + CuminFlag.Flag + "]");
                for (var index = 0; index < nodes.length; index++) {
                    (function (i) {
                        nodes[i].style.display = "none";
                        nodes[i].className = nodes[i].className.replace("active", "");
                    })(index)
                }
                node.parentNode.className += "active";

                for (var index = left - 1; index < right; index++) {
                    (function (i) {
                        nodes[i].style.display = CuminDataDisplayDict[node.tagName];
                    })(index)
                }

                if (IsNotNull(handler.Url)) {
                    var data = null;
                    if (IsNotNull(handler.JsonFrom)) {
                        var dict = null;
                        if (IsNotNull(handler.JsonKeys)) {
                            dict = handler.JsonKeys.split(";");
                        }
                        data = GetNodeJson(handler.JsonFrom, false, dict);
                    }
                    if (data == null) {
                        data = new Array();
                    }
                    if (handler.PageShows != null) {
                        handler.PageItems = parseInt(GetValue(handler.PageShows));
                    }
                    data[CuminFlag.Send_PageCount] = handler.PageItems;
                    data[CuminFlag.Send_PageIndex] = handler.CurrentIndex;
                    AjaxGet(handler.Url, data, function (status, msg) {
                        CuminData(handler.BindTo).Bind(msg.data);
                    });
                }

            }).Bind(GetPageJson(this.PageTotle));


            var nodes = document.querySelectorAll(handler.RootName + " [" + CuminFlag.Flag + "]");

            var showCount = this.PageCount;
            if (this.PageCount > this.PageTotle) {
                showCount = this.PageTotle;
            }

            for (var index = showCount; index < nodes.length; index++) {
                (function (i) {
                    nodes[i].style.display = "none";
                })(index)
            }
        }
        return handler;
    }
}
/********************************Lib: WebSocket*************************************/
var CuminWebSocketClass = {
    CreateInstance: function (url) {

        var handler = {};

        handler.WebSocketHandler = null;
        handler.URL = url;
        handler.IsStart = false;
        handler.EOpen = function (evt) { };
        handler.EClose = function (evt) { };
        handler.EMessage = function (evt) { };
        handler.EError = function (evt) { };
        
        window.addEventListener("beforeunload", handler.Close);

        handler.State = function () {
            return this.WebSocketHandler.readyState;
        }
        handler.SendTime = 200;
        handler.SetSendDelayTime = function (timsSpan) {
            this.SendTime = timsSpan;
            return this;
        }

        handler.BindOpenEvent = function (func) {
            this.EOpen = func;
            return this;
        }
        handler.BindCloseEvent = function (func) {
            this.EClose = func;
            return this;
        }
        handler.BindMessageEvent = function (func) {
            this.EMessage = func;
            return this;
        }
        handler.BindErrorEvent = function (func) {
            this.EError = func;
            return this;
        }

        handler.SendHandler = null;
        handler.Queue = new Array();
        handler.Index = 0;

        handler.Send = function (message) {
            if (this.WebSocketHandler == null) { return this; }
            this.Queue[this.Queue.length] = message;
            if (this.SendHandler == null) {

                this.PostMessage();
            }
            return this;
        }

        
        handler.Start = function () {
            if (this.IsStart) { return this; }

            handler.IsStart = true;
            handler.WebSocketHandler = new WebSocket(this.URL);
            handler.WebSocketHandler.onopen = function (evt) {
                handler.EOpen(evt);
            }
            handler.WebSocketHandler.onclose = function (evt) {
                if (handler.IsStart) {
                    handler.SendHandler = null;
                    handler.CloseHandler = null;
                    handler.WebSocketHandler = null;
                    handler.IsStart = false;
                }
                handler.EClose(evt);
            }
            handler.WebSocketHandler.onmessage = function (evt) {
                handler.EMessage(evt);
            }
            handler.WebSocketHandler.onerror = function (evt) {
                if (handler.IsStart) {
                    handler.SendHandler = null;
                    handler.CloseHandler = null;
                    handler.WebSocketHandler = null;
                    handler.IsStart = false;
                }
                handler.EError(evt);
                handler.Close();
            }
            return this;
        }


        handler.QueueLimit = 5;
        handler.SetQueueLimit = function (count) {
            this.QueueLimit = count;
            return this;
        }

        handler.PostMessage = function () {
            var tHandler = this;
            this.SendHandler = window.setInterval(function () {
                if (tHandler.WebSocketHandler == null) { return;}
                if (tHandler.WebSocketHandler.readyState == 1) {
                    if (tHandler.Queue.length > 0) {
                        tHandler.WebSocketHandler.send(tHandler.Queue[0]);
                        tHandler.Queue.shift();
                    } else {
                        tHandler.Index += 1;
                        if (tHandler.Index == tHandler.QueueLimit) {
                            this.Index = 0;
                            window.clearInterval(tHandler.SendHandler);
                            tHandler.SendHandler = null;
                        }
                    }
                }

            }, this.SendTime);
            return this;
        }


        handler.CloseHandler = null;

        handler.Close = function () {
            var tHandler = this;
            if (this.WebSocketHandler != null && this.CloseHandler == null) {
                this.CloseHandler = window.setInterval(function () {
                    if (tHandler.Queue.length == 0) {
                        tHandler.WebSocketHandler.close();
                        window.clearInterval(tHandler.SendHandler);
                        window.clearInterval(tHandler.CloseHandler);
                        tHandler.SendHandler = null;
                        tHandler.CloseHandler = null;
                        tHandler.WebSocketHandler = null;
                        handler.IsStart = false;
                    }
                }, 800);
            }
            return this;
        }
        return handler;
    }
}


/********************************Lib: i18n *************************************/
var CurrentI18NJson = new Array();

var CuminI18NClass = {
    CreateInstance: function (fileName) {

        var handler = {};
        handler.File = fileName;

        handler.Import = function () {

            CuminAjax().ToJson(true).SetSucceed(function (status, msg) {
                CurrentI18NJson[handler.File] = msg;
            }).SetFailed(function (status, msg) {
                alert("无法加载" + handler.File + ".json文件，请管理员检查网络与路径。");
                handler.Recover();
                }).UseGet("js/Global/" + handler.File + ".json").Submit();
            return this;
        }

        handler.Refresh = function (filename) {
            if (!CurrentI18NJson.hasOwnProperty(this.File)) {
                if (filename != null) {
                    this.File = filename;
                }
                this.Import();
                if (!CurrentI18NJson.hasOwnProperty(this.File)) {
                    return this;
                }
            }
            var json = CurrentI18NJson[this.File];
            var nodes = document.querySelectorAll("[global]");
            for (var i = 0; i < nodes.length; i++) {
                (function (index) {
                    var node = nodes[index];
                    var attr = node.getAttribute("global");
                    if (json.hasOwnProperty(attr))
                    {
                        Set(node, json[attr]);
                    }
                })(i);
            }
            return this;
        }

        handler.Recover = function () {
            var nodes = document.querySelectorAll("[global]");
            for (var i = 0; i < nodes.length; i++) {
                (function (index) {
                    var node = nodes[index];
                    var attr = node.getAttribute("global");
                    Set(node, attr);
                })(i);
            }
            return this;
        }
        return handler;
    }
}

function Global(filename) {
    return CuminI18NClass.CreateInstance(filename);
}



/*********************************Function: Common**************************************/
/**
 * Ajax-Get请求                 
 * @param {string} url  目标URL
 * @param {json} data   需要传送的数据
 * @param {func} succeed 成功时回调函数 
 * @param {func} failed  失败时回调函数
 */
function AjaxGet(url, data, succeed, failed, toJson) {
    if (CuminAjaxTimeOut) {
        return;
    };
    try {
        CuminAjax().ToJson(toJson).SetFailed(function (status, msg) {
            if (ErrorShow != null) {

                ErrorShow(status, msg);
            }
            if (failed != null) {
                failed(status, msg);
            }
        }).SetSucceed(function (status, msg) {
            if (ErrorShow != null) {

                ErrorShow(status, msg);
            }
            if (succeed != null) {
                if (msg != null && typeof (msg) != "string") {
                    if (msg.hasOwnProperty("result")) {
                        if (msg.result == 1) {
                            succeed(status, msg);
                        }
                    }
                }
            }

        }).UseGet(url).Submit(data);

    } catch (e) {
        e.message = "请检查地址和网络！";
        if (ErrorShow != null) {
            ErrorShow(e);
        }
    }
}

/**
 * Ajax-Post请求                 
 * @param {string} url  目标URL
 * @param {json} data   需要传送的数据
 * @param {func} succeed 成功时回调函数 
 * @param {func} failed  失败时回调函数
 */
function AjaxPost(url, data, succeed, failed, toJson) {
    if (CuminAjaxTimeOut) {
        return;
    };
    try {
        CuminAjax().ToJson(toJson).SetFailed(function (status, msg) {
            if (ErrorShow != null) {
                ErrorShow(status, msg);
            }
            if (failed != null) {
                failed(status, msg);
            }
        }).SetSucceed(function (status, msg) {
            if (ErrorShow != null) {
                ErrorShow(status, msg);
            }
            if (succeed != null) {
                if (msg != null && typeof (msg) != "string") {
                    if (msg.hasOwnProperty("result")) {
                        if (msg.result == 1) {
                            succeed(status, msg);
                        }
                    }
                }
            }
        }).UsePost(url).Submit(data);

    } catch (e) {
        e.message = "请检查地址和网络！";
        if (ErrorShow != null) {
            ErrorShow(e);
        }

    }
}


/**
 * Ajax-Get请求 不过滤              
 * @param {string} url  目标URL
 * @param {json} data   需要传送的数据
 * @param {func} succeed 成功时回调函数 
 * @param {func} failed  失败时回调函数
 */
function AjaxGetWithoutFilter(url, data, succeed, failed, toJson) {
    if (CuminAjaxTimeOut) {
        return;
    };
    try {

        CuminAjax().ToJson(toJson).SetFailed(function (status, msg) {
            if (failed != null) {
                failed(status, msg);
            }
        }).SetSucceed(function (status, msg) {
            if (succeed != null) {
                if (msg != null && typeof (msg) != "string") {
                    if (msg.hasOwnProperty("result")) {
                        succeed(status, msg);
                    }
                }
            }

        }).UseGet(url).Submit(data);

    } catch (e) {
        e.message = "请检查地址和网络！";
        if (ErrorShow != null) {
            ErrorShow(e);
        }
    }
}

/**
 * Ajax-Post请求 不过滤              
 * @param {string} url  目标URL
 * @param {json} data   需要传送的数据
 * @param {func} succeed 成功时回调函数 
 * @param {func} failed  失败时回调函数
 */
function AjaxPostWithoutFilter(url, data, succeed, failed) {
    if (CuminAjaxTimeOut) {
        return;
    };
    try {
        CuminAjax().ToJson(toJson).SetFailed(function (status, msg) {
            if (failed != null) {
                failed(status, msg);
            }
        }).SetSucceed(function (status, msg) {
            if (succeed != null) {
                if (msg != null && typeof (msg) != "string") {
                    if (msg.hasOwnProperty("result")) {
                        succeed(status, msg);
                    }
                }
            }
        }).UsePost(url).Submit(data);

    } catch (e) {
        e.message = "请检查地址和网络！";
        if (ErrorShow != null) {
            ErrorShow(e);
        }
    }
}

/*获取指定节点JSON数据，支持映射 
 * json="real_name"  实际传送json的名字
 * field="bind_name" 从json绑定时需要的名字
 */
function GetNodeJson(nodeName, isClearJson, spicalDict) {
    if (isClearJson == null) {
        isClearJson = false;
    }
    var result = {};
    var data = null;

    if (spicalDict == null) {
        var nodes = document.querySelectorAll(nodeName + " [json]");
        for (var index = 0; index < nodes.length; index++) {
            (function (i) {
                var node = nodes[i];

                //获取JSON的KEY
                var key = node.getAttribute("json");
                if (!IsNotNull(key)) {
                    key = node.getAttribute("field");
                }

                //获取数据
                var data = node.getAttribute("out");
                if (!IsNotNull(data)) {
                    if (node.tagName == "INPUT" || node.tagName == "SELECT") {
                        data = node.value;
                    } else {
                        data = node.innerHTML;
                    }
                }

                //填充结果
                if (isClearJson) {
                    if (!IsNotNull(data)) {
                        result[key] = data;
                    }
                } else {
                    result[key] = data;
                }

                var valid = {};
                valid[key] = data;
                if (VaildConstraints.hasOwnProperty(key)) {
                    var Constraints = VaildConstraints[key];

                    validate.async(valid, Constraints).then(function (attr) {
                        valid_success(attr, node);
                    }, function (error) {
                        valid_error(error, node);
                    });
                }
            })(index);
        }

    } else {

        for (var i = 0; i < spicalDict.length; i++) {

            var node = document.querySelector(nodeName + " [field=\"" + spicalDict[i] + "\"]");
            var key = node.getAttribute("json");
            if (!IsNotNull(key)) {
                key = spicalDict[i];
            }
            var data = node.getAttribute("out");
            if (!IsNotNull(data)) {
                if (node.tagName == "INPUT") {
                    data = node.value;
                } else {
                    data = node.innerHTML;
                }
            }

            if (isClearJson) {
                if (IsNotNull(data)) {
                    result[key] = data;
                }
            } else {
                result[key] = data;
            }
            var valid = {};
            valid[key] = data;
            if (VaildConstraints.hasOwnProperty(key)) {
                var Constraints = VaildConstraints[key];
                validate.async(valid, Constraints).then(function (attr) {
                    valid_success(attr, node);
                }, function (error) {
                    valid_error(error, node);
                });
            }
        }
    }


    return result;
}
var valid_success = function (attr, node) { };
var valid_error = function (error, node) { };

/**
 * 空值检测
 * @param {对象} value
 */
function IsNotNull(value) {
    if (value == null) {
        return false;
    } else if (value == "") {
        return false;
    } else if (value == "undefined") {
        return false;
    }
    return true;
}

/**
 * 集合相减
 * @param {数组} sourceNodes
 * @param {数组} removeNodes
 */
function Remove(sourceNodes, removeNodes) {
    if (removeNodes == null) {
        return;
    }
    var nodeArray = new Array();
    for (var i = 0; i < sourceNodes.length; i++) {
        var node = sourceNodes[i];
        for (var j = 0; j < removeNodes.length; j++) {
            if (node == removeNodes[j]) {
                node = null;
                break;
            }
        }
        if (node != null) {
            nodeArray[nodeArray.length] = node;
        }
    }
    return nodeArray;
}

/**
 * 生成CuminData需要的JSON
 * @param {int} totle 页码总数
 */
function GetPageJson(totle) {
    if (totle == null && totle == 0) {
        return null;
    }
    var jsons = new Array();
    for (var index = 1; index <= totle; index++) {
        jsons[index - 1] = {
            "PageIndex": index
        };
    }
    return jsons;
}

/**
 * 跳转到目标URL
 * @param {string} url 目标URL
 * @param {bool} random 是否拼接随机数
 */
function JumpTo(url, random) {
    if (random != null) {
        var parm = parseInt(Math.random() * 10);
        url = url + "?" + parm;
    }
    window.location.href = url;
}
/**
 * 框架跳转
 * @param {string} iframeName 框架ID
 * @param {sring} url 目标URL
 */
function IframeJumpTo(iframeName, url) {
    var iframe = document.querySelector(iframeName);
    iframe.onload = iframe.onreadystatechange = function (e) {
        if (!iframe.readyState || iframe.readyState == "complete") {
            //获取数据并校验
            var data = iframe.contentDocument.activeElement.textContent;
            if (data != null) {
                var json = JSON.parse(data);
                if (json.result == -1) {
                    //登录超时则跳转到主页
                    JumpTo("https://" + window.location.host);
                }
            }
        }
    };
    iframe.src = url;
}

/**
 * 将该节点删除
 * @param {obj} node 要删除的节点
 */
function Delete(node) {
    node.parentNode.removeChild(node);
}

/**
 * 设置对象的值
 * @param {element} node 元素
 * @param {string} value 值
 */
function Set(node,value) {
    if (node != null) {
        if (node.tagName == "SELECT" || node.tagName == "INPUT") {
            node.value = value;
        }
        node.innerHTML = value;
    }
}


/**
 * 获取该节点的值
 * @param {string} nodeName 筛选器名称
 */
function Value(nodeName) {
    var node = document.querySelector(nodeName);
    if (node != null) {
        if (node.tagName == "SELECT" || node.tagName == "INPUT") {
            return node.value;
        }
        return node.innerHTML;
    }
    return null;
}


/**
 * 清除对象的值
 * @param {string} nodeName 元素名称（选择器）
 */
function Clear(nodeName) {
    var node = document.querySelector(nodeName);
    if (node != null) {
        if (node.tagName == "SELECT" || node.tagName == "INPUT") {
            node.value = null;
        }
        node.innerHTML = null;
    }
}

/**
 * 兼容Animate动画
 * 如果在mouseover 中设置了动画，请在mouseout事件中调用node.AnimatedClear函数
 * @param {element} node 元素对象
 * @param {string} animateCss 动画类
 */
function Animated(node, animateCss) {

    if (node.AnimatedClear != null) {
        node.className += animateCss;
        node.AnimatedClear = function () {
            var className = node.className;
            node.className = className.replace(" " + animateCss, " ");
        }
    } else {
        node.className += " animated " + animateCss;
        node.AnimatedClear = function () {
            var className = node.className;
            node.className = className.replace(" " + animateCss, " ");
        }
        if (IsChrome) {
            node.addEventListener("webkitAnimationEnd", function () {
                node.AnimatedClear();
            });
        } else if (IsIE) {
            node.addEventListener("MSAnimationEnd ", function () {
                node.AnimatedClear();
            });
        } else if (IsFirefox) {
            node.addEventListener("mozAnimationEnd ", function () {
                node.AnimatedClear();
            });
        } else {
            node.addEventListener("transitionend", function () {
                node.AnimatedClear();
            });
        }
    }
}

/**
 * 警告框，变红
 * @param {element} node 操作元素
 */
function Warning(node) {
    ClearWarning(node);
    node.className += " cumin-warning";
    node.BorderHandler = window.setTimeout(function () {
        ClearWarning(node);
    }, 8000);
}

/**
 * 清除警告框
 * @param {element} node 操作元素
 */
function ClearWarning(node) {
    if (node.BorderHandler != null) {
        node.className = node.className.replace(" cumin-warning", "");
        window.clearTimeout(node.BorderHandler);
        node.BorderHandler = null;
    }
}


/**
 * 根据后端json进行前端渲染
 * @param {object} json 后端json
 */
function AuthRender(json) {
    for (var key in json) {
        if (json[key] == 0) {
            var nodes = document.querySelectorAll("[" + CuminFlag.Auth + "=\"" + key + "\"]");
            if (nodes != null) {
                for (var i = 0; i < nodes.length; i++) {
                    (function (index) {
                        var node = nodes[i];
                        Delete(node);
                    })(i)
                }
            }
        }
    }
}

/**
 * 获取当前页面文件名
 */
function PageName() {
    var currentUrls = location.href.split("/");
    var fileName = currentUrls.slice(currentUrls.length - 1, currentUrls.length).toString(String).split(".");
    return fileName.slice(0, 1);
}