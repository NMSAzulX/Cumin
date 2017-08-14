var BaseServer = "";
var ErrorShow = null;
var G = null;
var VaildConstraints = new Array();

document.write("<script language='JavaScript' src='js/CuminData.js'></script>");
document.write("<script language='JavaScript' src='js/validate.js'></script>");

window.addEventListener("load", function () {
    G = O();
	InitTemplate();
	BaseServer = "http://" + window.location.host;
    CuminAjax().AddFilter(IsBackHome);

});
/*window.addEventListener("beforeunload", function () {
    
    if (WebSocketCache != null) {
        for (var index = 0; index < WebSocketCache.length; index++) {
            (function (i) {
                WebSocketCache[index].Close();
                alert(1);
            })(index);
        }
    }
});*/

function IsBackHome(status, msg) {
	if (typeof (msg) != "string") {
		if (msg.hasOwnProperty("result")) {
			if (msg.result == -1) {
				alert(msg.msg);
				JumpTo("http://" + window.location.host);
				return false;
			}
		}
	}
	return true;
}


/**
 * 隐藏Bootstrap模态框
 * @param {string} name 节点名
 */
function CloseBootstrapModal(name) {
	$(name).map(function () {
		$(this).modal('hide');
	});
}

/***********************************Lib: Operator************************************/
var reg_http = new RegExp("^.*(.asp|.aspx|.do|.ashx|.webp)$");
var reg_webapi = new RegExp("(/.+)+");
var reg_base = new RegExp("(http://|https://).*");
var reg_ws = new RegExp("(ws://|wss://).*");
var WebSocketCache = new Array();
var CuminDataBindClass = {　　　　
	CreateInstance: function (parameter) {

		var handler = {};

		handler.BindTo = parameter;
		handler.TemplateName = null;
		handler.Convertor = null;
		handler.MapEvents = null;
		handler.Url = null;
		handler.AjaxData = null;
		handler.IsGet = false;
		handler.WebSocket = null;

		if (reg_ws.test(parameter)) {

			handler.Url = parameter;
			var websocket = CuminWebSocket(parameter);
			handler.WebSocket = websocket;
			WebSocketCache[WebSocketCache.length] = websocket;

		} else if (reg_http.test(parameter) || reg_webapi.test(parameter)) {
			if (reg_base.test(parameter)) {
				handler.Url = parameter;
			} else {
				handler.Url = BaseServer + parameter;
			}
		}
        /**
         *   Global
         */
        handler.Refresh = function (filename) {
            Global(this.BindTo).Refresh(filename);
            return this;
        }
        handler.Recover = function () {
            Global().Recover();
            return this;
        }

		/**
		 * Page
		 */
		handler.PageCount = 0;
		handler.Items = function (count) {
			this.PageCount = count;
			return this;
		}
		handler.Page = function (totle, per_count) {
			CuminPage("#PageShow").Items(this.PageCount).Page(totle, per_count);
			return this;
		}


		/**
		 * AJAX
		 */
		handler.Get = function (dataHandler) {
			this.IsGet = true;
            this.AjaxData = GetNodeData(dataHandler);
			return this;
		}
		handler.Post = function (dataHandler) {
            this.IsGet = false;
            this.AjaxData = GetNodeData(dataHandler);
			return this;
        }
        handler.StringDo = function (succeed_func, failed_func) {
            if (CuminAjaxTimeOut) { return; };
            if (this.IsGet) {
                try {
                    CuminAjax().ToJson(false).SetSucceed(succeed_func).SetFailed(failed_func).UseGet(this.Url).Submit(this.AjaxData);
                } catch (e) {
                    console.error(e);
                    e.message = "请检查地址和网络！";
                    if (ErrorShow != null) {
                        ErrorShow(e);
                    }
                }
            } else {
                try {
                    CuminAjax().ToJson(false).SetSucceed(succeed_func).SetFailed(failed_func).UsePost(this.Url).Submit(this.AjaxData);
                } catch (e) {
                    console.error(e);
                    e.message = "请检查地址和网络！";
                    if (ErrorShow != null) {
                        ErrorShow(e);
                    }
                }
            }
        }
        handler.JsonDo = function (succeed_func,failed_func) {
            if (CuminAjaxTimeOut) { return; };
            if (this.IsGet) {
                try {
                    CuminAjax().ToJson(true).SetSucceed(succeed_func).SetFailed(failed_func).UseGet(this.Url).Submit(this.AjaxData);
                } catch (e) {
                    console.error(e);
                    e.message = "请检查地址和网络！";
                    if (ErrorShow != null) {
                        ErrorShow(e);
                    }
                }
            } else {
                try {
                    CuminAjax().ToJson(true).SetSucceed(succeed_func).SetFailed(failed_func).UsePost(this.Url).Submit(this.AjaxData);
                } catch (e) {
                    console.error(e);
                    e.message = "请检查地址和网络！";
                    if (ErrorShow != null) {
                        ErrorShow(e);
                    }
                }
            }
        }

		handler.StringTo = function (nodeName) {
			if (CuminAjaxTimeOut) {return;};
			if (this.IsGet) {				
				try {
					CuminAjax().ToJson(false).SetSucceed(function (status, msg) {
						O(nodeName).Bind(msg);
					}).UseGet(this.Url).Submit(this.AjaxData);
                } catch (e) {
                    console.error(e);
					e.message = "请检查地址和网络！";
                    if (ErrorShow != null) {
                        ErrorShow(e);
					}
				}
			} else {
				try {
					CuminAjax().ToJson(false).SetSucceed(function (status, msg) {
						O(nodeName).Bind(msg);
					}).UsePost(this.Url).Submit(this.AjaxData);
                } catch (e) {
                    console.error(e);
					e.message = "请检查地址和网络！";
                    if (ErrorShow != null) {
                        ErrorShow(e);
					}
				}
			}
			return this;
		}
		handler.JsonTo = function (nodeName,out) {
			if (CuminAjaxTimeOut) {return;};
			if (this.IsGet) {
				try {
                    CuminAjax().ToJson(true).SetSucceed(function (status, msg) {
                        if (msg.hasOwnProperty("code")) {
                            if (msg.code == 1) {
                                O(nodeName).BeforeBind(this.BeforeCallBack).Convertor(this.Convertor).MapEvents(this.MapEvents).Bind(msg, out);
                            }
                        }
					}).UseGet(this.Url).Submit(this.AjaxData);
                } catch (e) {
                    console.error(e);
					e.message = "请检查地址和网络！";
                    if (ErrorShow != null) {
                        ErrorShow(e);
					}
				}
			} else {
				try {
					CuminAjax().ToJson(true).SetSucceed(function (status, msg) {
                        if (msg.hasOwnProperty("code")) {
                            if (msg.code == 1) {
                                O(nodeName).BeforeBind(this.BeforeCallBack).Convertor(this.Convertor).MapEvents(this.MapEvents).Bind(msg, out);
                            }
                        }
					}).UsePost(this.Url).Submit(this.AjaxData);
                } catch (e) {
                    console.error(e);
					e.message = "请检查地址和网络！";
                    if (ErrorShow != null) {
                        ErrorShow(e);
					}
				}
			}
			return this;
        }

        handler.NotifyTo = function (nodeName) {
            if (CuminAjaxTimeOut) { return; };
            if (this.IsGet) {
                try {
                    CuminAjax().ToJson(true).SetSucceed(function (status, msg) {
                        if (msg.hasOwnProperty("code")) {
                            if (msg.code == 1) {
                                G.Notify(nodeName, msg);
                            }
                        }
                    }).UseGet(this.Url).Submit(this.AjaxData);
                } catch (e) {
                    console.error(e);
                    e.message = "请检查地址和网络！";
                    if (ErrorShow != null) {
                        ErrorShow(e);
                    }
                }
            } else {
                try {
                    CuminAjax().ToJson(true).SetSucceed(function (status, msg) {
                        if (msg.hasOwnProperty("code")) {
                            if (msg.code == 1) {
                                G.Notify(nodeName, msg);
                            }
                        }
                    }).UsePost(this.Url).Submit(this.AjaxData);
                } catch (e) {
                    console.error(e);
                    e.message = "请检查地址和网络！";
                    if (ErrorShow != null) {
                        ErrorShow(e);
                    }
                }
            }
            return this;
        }

		/**
		 * WebSocket
		 */

		handler.Start = function () {
			handler.WebSocket.Start();
			return this;
		}
		handler.Send = function (msg) {
			handler.WebSocket.Send(msg);
			return this;
		}
		handler.Revice = function (func) {
			handler.WebSocket.BindMessageEvent(func);
			return this;
		}
		handler.Exit = function (func) {
			handler.WebSocket.BindCloseEvent(func);
			return this;
		}
		handler.Close = function () {
			handler.WebSocket.Close();
			return this;
		}

		/**
		 * Bind
		 */
		handler.UseTemplate = function (templateName) {
			this.TemplateName = templateName;
			return this;
		}
		handler.Clear = function () {
			if (this.TemplateName == null) {
				this.TemplateName = this.BindTo;
			}
			CuminData(this.TemplateName).Clear();
			return this;
		}
		handler.BeforeCallBack = null;
		handler.BeforeBind=function(func){
			this.BeforeCallBack = func;
			return this;
		}
		handler.Bind = function (data, out) {
			if (this.TemplateName == null) {
				this.TemplateName = this.BindTo;
			}
			var temp = CuminData(this.TemplateName);
			if (temp.Model == null) {
				temp = document.querySelector(this.TemplateName);
				if (temp.tagName == "INPUT" && temp.tagName == "SELECT") {
					temp.value = data;
				} else {
					temp.innerHTML = data;
				}
			} else {
				temp.BeforeBind(this.BeforeCallBack).AddConvertObject(this.Convertor).AddEventsObject(this.MapEvents).Bind(data, out, this.BindTo);
			}

			return this;
		}
		handler.Append = function (data, out) {
			if (this.TemplateName == null) {
				this.TemplateName = this.BindTo;
			}
			CuminData(this.TemplateName).BeforeBind(this.BeforeCallBack).AddConvertObject(this.Convertor).AddEventsObject(this.MapEvents).Append(data, out, this.BindTo);
			return this;
		}

		handler.On = function (name, func) {
			if (name == null) {
				document.querySelector(this.BindTo).addEventListener("mouseover", func);
			} else {
				CuminData(this.BindTo).On(name, func);
			}
			return this;
		}
		handler.Out = function (name, func) {
			if (name == null) {
				document.querySelector(this.BindTo).addEventListener("mouseout", func);
			} else {
				CuminData(this.BindTo).Out(name, func);
			}
			return this;
		}
		handler.Click = function (name, func) {
			if (name == null) {
				document.querySelector(this.BindTo).addEventListener("click", func);
			} else {
				CuminData(this.BindTo).Click(name, func);
			}
			return this;
		}

		handler.Trigger = function (dataFrom, func) {

			var DataHandler = CuminData(this.BindTo);
			if (DataHandler.Model == null) {

				DataHandler = document.querySelector(this.BindTo);

				if (dataFrom != null) {

					var tempNode = document.querySelector(dataFrom);
					tempNode.Tag = DataHandler;

					var shut = tempNode.getAttribute("ClearJson");
					if (shut != null && shut == "true") {
						shut = true;
					} else {
						shut = false;
					}

					DataHandler.addEventListener("click", function () {
						var jsonArray = DataHandler.getAttribute(CuminFlag.OperatorValues);
						if (jsonArray != null) {
							var spicalDict = jsonArray.split(";");
							func(GetNodeJson(dataFrom, shut, spicalDict), tempNode);
						} else {
							func(GetNodeJson(dataFrom, shut), tempNode);
						}
					});

				} else {
					DataHandler.addEventListener("click", func);
				}

			} else {
				DataHandler.Trigger(dataFrom, func);
			}
			return this;
		}

		handler.Convertor = function (convertors) {
			handler.Convertor = convertors;
			return this;
		}
		handler.MapEvents = function (events) {
			handler.MapEvents = events;
			return this;
		}
		handler.Notify = function (name, json) {
			if (this.TemplateName == null) {
				this.TemplateName = this.BindTo;
			}
			CuminData(this.TemplateName).Notify(name, json);
		}

		handler.AssociatedGet = function (next, url) {
			var sourceNode = document.querySelector(this.BindTo);
			var key = sourceNode.getAttribute("field");
			if (sourceNode.tagName == "INPUT" || sourceNode.tagName == "SELECT") {

				sourceNode.addEventListener("change", function () {
					AjaxGet(url + "?" + key + "=" + sourceNode.value, null, function (status, msg) {
						O(next).Bind(msg.data);
					});
				});

			} else {
				sourceNode.addEventListener("click", function () {
					AjaxGet(url + "?" + key + "=" + sourceNode.value, null, function (status, msg) {
						O(next).Bind(msg.data);
					});
				});
			}
		}

		handler.AssociatedPost = function (next, url, data) {
			var sourceNode = document.querySelector(this.BindTo);
			var key = sourceNode.getAttribute("field");

			var temp_result = null;
			if (sourceNode.tagName == "INPUT" || sourceNode.tagName == "SELECT") {

				sourceNode.addEventListener("change", function () {
					var data = new Array();
					data[key] = sourceNode.value;
					AjaxPost(url, data, function (status, msg) {
						O(next).Bind(msg.data);
					});
				});
			} else {

				sourceNode.addEventListener("click", function () {
					var data = new Array();
					data[key] = sourceNode.innerHTML;
					AjaxPost(url, data, function (status, msg) {
						O(next).Bind(msg.data);
					});
				});
			}
		}
		return handler;
	}
}




function O(node) {
	return CuminDataBindClass.CreateInstance(node);
}

function V(constraints) {
    for (var key in constraints) {
        var temp_valid = {};
        temp_valid[key] = constraints[key];
        VaildConstraints[key] = temp_valid;
    }
}

function GetNodeData(dataHandler) {
	if (dataHandler == null) {
		return null;
	}
	if (typeof (dataHandler) == "string") {
		var DataHandler = document.querySelector(dataHandler);
		var jsonArray = DataHandler.getAttribute(CuminFlag.OperatorValues);
		var shut = DataHandler.getAttribute("ClearJson");
		if (shut != null && shut == "true") {
			shut = true;
		} else {
			shut = false;
		}
		if (jsonArray != null) {
			var spicalDict = jsonArray.split(";");
            return GetNodeJson(dataHandler, shut, spicalDict);
		} else {
            return GetNodeJson(dataHandler, shut, null);
		}
	} else {
		return dataHandler;
	}

}