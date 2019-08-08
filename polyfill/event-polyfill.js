/* eslint-disable no-irregular-whitespace */
/* typeof Event 
'object'

? 
*/
/* new Event('')*/

/* 对象不支持此操作 */

/* Event.toString()

"function Event() { [native code] }"


"[object Event]"

????????



*/
//https://developer.mozilla.org/zh-CN/docs/Web/API/Event/Event

/* 早期的创建事件的方法使用了受Java启发的API。下面展示了一个示例：

// Create the event.
var event = document.createEvent('Event');

// Define that the event name is 'build'.
event.initEvent('build', true, true);

// Listen for the event.
document.addEventListener('build', function (e) {
  // e.target matches document from above
}, false);

// target can be any Element or other EventTarget.
document.dispatchEvent(event); */
//https://developer.mozilla.org/en-US/docs/Web/API/Document/createEvent

/* 

Object.keys(Event.prototype)

(22)
 ["NONE", "CAPTURING_PHASE", "AT_TARGET", "BUBBLING_PHASE", "type", "target", "currentTarget", "eventPhase", "bubbles", "cancelable", "defaultPrevented", "composed", "timeStamp", "srcElement", "returnValue", "cancelBubble", "path", "composedPath", "stopPropagation", "stopImmediatePropagation", "preventDefault", "initEvent"]
*/

/* 
语法节
 event = new Event(typeArg, eventInit);
参数节
typeArg
是DOMString 类型，表示所创建事件的名称。
eventInit可选
是 EventInit 类型的字典，接受以下字段:
"bubbles"，可选，Boolean类型，默认值为 false，表示该事件是否冒泡。
"cancelable"，可选，Boolean类型，默认值为 false， 表示该事件能否被取消。
"composed"，可选，Boolean类型，默认值为 false，指示事件是否会在影子DOM根节点之外触发侦听器。
*/