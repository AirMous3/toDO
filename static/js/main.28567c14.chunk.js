(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{116:function(t,e,n){},122:function(t,e,n){},145:function(t,e,n){"use strict";n.r(e);var c,a,i=n(0),o=n.n(i),r=n(30),s=n.n(r),l=(n(116),n(98)),d=n(62),u=n(97),j=n(23),O=(n(122),n(13)),b=n(193),f=n(99),h=n(58),T=n(2),p=o.a.memo((function(t){console.log("ADD ITEM FORM");var e=Object(i.useState)(""),n=Object(O.a)(e,2),c=n[0],a=n[1],o=Object(i.useState)(null),r=Object(O.a)(o,2),s=r[0],l=r[1],d=function(){""!==c.trim()?(t.addItemCallBack(c.trim()),a("")):l("Text incorrect")};return Object(T.jsxs)("div",{style:{padding:"10px"},children:[Object(T.jsx)(h.a,{helperText:s,value:c,label:"Type",onChange:function(t){a(t.currentTarget.value)},onKeyPress:function(t){s&&l(null),13===t.charCode&&d()},error:!!s}),Object(T.jsx)(f.a,{style:{marginRight:"-10px"},size:"large",variant:"text",onClick:d,disabled:t.disabled,children:Object(T.jsx)(b.a,{})})]})})),x=n(93),m=n.n(x),v=n(204),g=n(203),S=n(206),I=n(205),k=function(){return Object(T.jsx)(g.a,{sx:{flexGrow:1},children:Object(T.jsx)(v.a,{position:"static",color:"transparent",children:Object(T.jsxs)(I.a,{style:{display:"flex",justifyContent:"space-between"},children:[Object(T.jsx)(S.a,{size:"large",edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2},children:Object(T.jsx)(m.a,{})}),Object(T.jsx)(f.a,{color:"inherit",children:"Login"})]})})})},C=n(14),E=n(15),y=n(200),D=n(94),A=n.n(D).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"1dbc4cf7-1f30-4d66-936b-be5fca3239ce"}}),L=function(){return A.get("todo-lists")},w=function(t){return A.post("todo-lists",{title:t})},N=function(t){return A.delete("todo-lists/".concat(t))},R=function(t,e){return A.put("todo-lists/".concat(t),{title:e})},_=function(t){return A.get("todo-lists/".concat(t,"/tasks"))},M=function(t,e){return A.delete("todo-lists/".concat(t,"/tasks/").concat(e))},P=function(t,e){return A.post("todo-lists/".concat(t,"/tasks"),{title:e})},H=function(t,e,n){return A.put("todo-lists/".concat(t,"/tasks/").concat(e),n)};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(c||(c={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(a||(a={}));var K={status:"loading",error:null},B=function(t){return{type:"CHANGE-STATUS",status:t}},G=function(t){return{type:"SET-APP-ERROR",error:t}},U=(Object(y.a)(),Object(y.a)(),[]),z=function(t,e){return{type:"CHANGE-TODOLIST-FILTER",id:t,filter:e}},V=function(t,e){return{type:"CHANGE-TODOLIST-ENTITY-STATUS",todolistId:t,entityStatus:e}},F=n(195),J=n(5),W={},Y=function(t,e,n){return function(c,a){c(B("loading"));var i=a().tasks[t].find((function(t){return t.id===e}));if(i){var o=Object(C.a)({title:i.title,description:i.description,status:i.status,priority:i.priority,startDate:i.startDate,deadline:i.deadline},n);H(t,e,o).then((function(n){0===n.data.resultCode&&(c(function(t,e,n){return{type:"UPDATE-TASK",todolistId:t,taskId:e,model:n}}(t,e,o)),c(B("succeeded")))}))}else console.warn("task not found in state")}},q=o.a.memo((function(t){console.log("SPAN RENDER");var e=Object(i.useState)(!1),n=Object(O.a)(e,2),c=n[0],a=n[1],o=Object(i.useState)(""),r=Object(O.a)(o,2),s=r[0],l=r[1],d=function(){a(!0),l(t.title)};return c?Object(T.jsx)(h.a,{onBlur:function(){a(!1),t.onChangeCallBack(s)},autoFocus:!0,onDoubleClick:d,onChange:function(t){l(t.currentTarget.value)},value:s}):Object(T.jsx)("span",{onDoubleClick:d,children:t.title})})),$=n(38),Q=n.n($),X=n(199),Z=n(194),tt=o.a.memo((function(t){var e=t.task,n=t.todolistId;console.log("TASK RENDER");var a=Object(j.b)(),o=Object(i.useCallback)((function(t){a(Y(n,e.id,{title:t}))}),[a,e.id,n]);return Object(T.jsxs)("div",{className:"".concat(Q.a.tasks," ").concat(e.status===c.Completed?Q.a.isDone:""),children:["  ",Object(T.jsxs)("div",{children:[Object(T.jsx)(X.a,{size:"small",checked:e.status===c.Completed,onChange:function(t){a(Y(e.todoListId,e.id,{status:t.currentTarget.checked?c.Completed:c.New}))}})," ",Object(T.jsx)(q,{title:e.title,onChangeCallBack:o})]}),Object(T.jsx)("div",{children:Object(T.jsx)(f.a,{size:"small",onClick:function(){return a(function(t,e){return function(n){n(B("loading")),M(e,t).then((function(){n(function(t,e){return{type:"REMOVE-TASK",taskId:t,todolistId:e}}(t,e)),n(B("succeeded"))}))}}(e.id,n))},children:Object(T.jsx)(Z.a,{})})})]},e.id)})),et=o.a.memo((function(t){var e=t.todolistId,n=t.title,a=t.filter,o=t.entityStatus;console.log("TODOLIST");var r=Object(j.b)(),s=Object(j.c)((function(t){return t.tasks[e]})),l=Object(i.useCallback)((function(t){return r(function(t,e){return function(n){n(B("loading")),n(V(t,"loading")),P(t,e).then((function(e){if(0===e.data.resultCode){var c=e.data.data.item;n(function(t){return{type:"ADD-TASK",task:t}}(c)),n(B("succeeded")),n(V(t,"idle"))}else e.data.messages.length>0?(n(G(e.data.messages[0])),n(B("succeeded")),n(V(t,"idle"))):(n(G("some error")),n(B("succeeded")),n(V(t,"idle")))}))}}(e,t))}),[e,r]),d=Object(i.useCallback)((function(t){return r(function(t,e){return function(n){n(B("loading")),R(t,e).then((function(){n(function(t,e){return{type:"CHANGE-TODOLIST-TITLE",id:t,title:e}}(t,e)),n(B("succeeded"))}))}}(e,t))}),[r,e]),u=Object(i.useCallback)((function(){return r(function(t){return function(e){e(B("loading")),e(V(t,"loading")),N(t).then((function(){e({type:"REMOVE-TODOLIST",id:t}),e(B("succeeded"))}))}}(e))}),[r,e]),O=Object(i.useCallback)((function(){return r(z(e,"all"))}),[e,r]),b=Object(i.useCallback)((function(){return r(z(e,"active"))}),[e,r]),h=Object(i.useCallback)((function(){return r(z(e,"completed"))}),[e,r]);return Object(i.useEffect)((function(){r(function(t){return function(e){return e(B("loading")),_(t).then((function(n){var c=n.data.items;e(function(t,e){return{type:"SET-TASKS",tasks:t,todolistId:e}}(c,t)),e(B("succeeded"))}))}}(e))}),[r,e]),"active"===a&&(s=s.filter((function(t){return t.status===c.New}))),"completed"===a&&(s=s.filter((function(t){return t.status===c.Completed}))),Object(T.jsxs)("div",{className:Q.a.container,children:[Object(T.jsxs)("h3",{className:Q.a.span,children:[Object(T.jsx)("div",{children:Object(T.jsx)(q,{title:n,onChangeCallBack:d})}),Object(T.jsx)("div",{className:Q.a.deleteTodolistIcon,children:Object(T.jsx)(f.a,{size:"small",onClick:u,disabled:"loading"===o,children:Object(T.jsx)(F.a,{})})})]}),Object(T.jsx)(p,{addItemCallBack:l,disabled:"loading"===o}),Object(T.jsx)("div",{children:s.map((function(t){return Object(T.jsx)(tt,{task:t,todolistId:e},t.id)}))}),Object(T.jsxs)("div",{className:Q.a.status,children:[Object(T.jsx)(f.a,{size:"small",variant:"all"===a?"contained":"text",onClick:O,children:"All"}),Object(T.jsx)(f.a,{size:"small",color:"primary",variant:"active"===a?"contained":"text",onClick:b,children:"Active"}),Object(T.jsx)(f.a,{size:"small",color:"warning",variant:"completed"===a?"contained":"text",onClick:h,children:"Completed"})]})]})})),nt=n(207);function ct(){var t=i.useState(0),e=Object(O.a)(t,2),n=e[0],c=e[1],a=i.useState(10),o=Object(O.a)(a,2),r=o[0],s=o[1],l=i.useRef((function(){}));return i.useEffect((function(){l.current=function(){if(n>100)c(0),s(10);else{var t=10*Math.random(),e=10*Math.random();c(n+t),s(n+t+e)}}})),i.useEffect((function(){var t=setInterval((function(){l.current()}),500);return function(){clearInterval(t)}}),[]),Object(T.jsx)(g.a,{sx:{width:"100%"},children:Object(T.jsx)(nt.a,{variant:"buffer",value:n,valueBuffer:r})})}var at=n(196),it=n(201),ot=n(198),rt=i.forwardRef((function(t,e){return Object(T.jsx)(ot.a,Object(C.a)({elevation:6,ref:e,variant:"filled"},t))}));function st(){var t=Object(j.b)(),e=Object(j.c)((function(t){return t.app.error})),n=function(e,n){"clickaway"!==n&&t(G(null))};return Object(T.jsx)(at.a,{spacing:2,sx:{width:"100%"},children:Object(T.jsx)(it.a,{open:null!==e,autoHideDuration:6e3,onClose:n,children:Object(T.jsx)(rt,{onClose:n,severity:"error",sx:{width:"100%"},children:e})})})}var lt=function(){var t=Object(j.c)((function(t){return t.app.status}));console.log("APP RENDERED");var e=Object(j.b)(),n=Object(i.useCallback)((function(t){return e(function(t){return function(e){e(B("loading")),w(t).then((function(n){if(0===n.data.resultCode){var c=n.data.data.item;e(function(t,e){return{type:"ADD-TODOLIST",title:t,payload:e}}(t,c)),e(B("succeeded"))}else n.data.messages.length>0?(e(G(n.data.messages[0])),e(B("succeeded"))):(e(G("some error")),e(B("succeeded")))}))}}(t))}),[e]),c=Object(j.c)((function(t){return t.todolists}));return Object(i.useEffect)((function(){e((function(t){return t(B("loading")),L().then((function(e){t({type:"SET-TODOLISTS",todolists:e.data}),t(B("succeeded"))}))}))}),[e]),Object(T.jsxs)("div",{className:"App",children:[Object(T.jsx)(k,{}),Object(T.jsx)(st,{}),"loading"===t&&Object(T.jsx)(ct,{}),Object(T.jsxs)(l.a,{children:[Object(T.jsx)(d.a,{container:!0,style:{padding:"20px"},children:Object(T.jsx)(p,{addItemCallBack:n,disabled:"loading"===t})}),Object(T.jsx)(d.a,{container:!0,spacing:1,children:c.map((function(t){return Object(T.jsx)(d.a,{item:!0,children:Object(T.jsx)(u.a,{style:{padding:"20px"},children:Object(T.jsx)(et,{todolistId:t.id,title:t.title,filter:t.filter,entityStatus:t.entityStatus},t.id)})})}))})]})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var dt=n(63),ut=n(95),jt=Object(dt.b)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TASK":return Object(C.a)(Object(C.a)({},t),{},Object(J.a)({},e.todolistId,t[e.todolistId].filter((function(t){return t.id!==e.taskId}))));case"ADD-TASK":return Object(C.a)(Object(C.a)({},t),{},Object(J.a)({},e.task.todoListId,[e.task].concat(Object(E.a)(t[e.task.todoListId]))));case"UPDATE-TASK":return Object(C.a)(Object(C.a)({},t),{},Object(J.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskId?Object(C.a)(Object(C.a)({},t),e.model):t}))));case"ADD-TODOLIST":return Object(C.a)(Object(C.a)({},t),{},Object(J.a)({},e.payload.id,[]));case"REMOVE-TODOLIST":var n=Object(C.a)({},t);return delete n[e.id],n;case"SET-TODOLISTS":var c=Object(C.a)({},t);return e.todolists.forEach((function(t){return c[t.id]=[]})),c;case"SET-TASKS":var a=Object(C.a)({},t);return a[e.todolistId]=e.tasks,a;default:return t}},todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:U,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.id}));case"ADD-TODOLIST":return[Object(C.a)(Object(C.a)({},e.payload),{},{filter:"all",entityStatus:"idle"})].concat(Object(E.a)(t));case"CHANGE-TODOLIST-TITLE":return t.map((function(t){return t.id===e.id?Object(C.a)(Object(C.a)({},t),{},{title:e.title}):t}));case"CHANGE-TODOLIST-FILTER":return t.map((function(t){return t.id===e.id?Object(C.a)(Object(C.a)({},t),{},{filter:e.filter}):t}));case"SET-TODOLISTS":return e.todolists.map((function(t){return Object(C.a)(Object(C.a)({},t),{},{filter:"all",entityStatus:"idle"})}));case"CHANGE-TODOLIST-ENTITY-STATUS":return t.map((function(t){return t.id===e.todolistId?Object(C.a)(Object(C.a)({},t),{},{entityStatus:e.entityStatus}):t}));default:return t}},app:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"CHANGE-STATUS":return Object(C.a)(Object(C.a)({},t),{},{status:e.status});case"SET-APP-ERROR":return Object(C.a)(Object(C.a)({},t),{},{error:e.error});default:return t}}}),Ot=Object(dt.c)(jt,Object(dt.a)(ut.a));s.a.render(Object(T.jsx)(j.a,{store:Ot,children:Object(T.jsx)(lt,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},38:function(t,e,n){t.exports={container:"Todolist_container__2-MrN",span:"Todolist_span__i5ptW",deleteTodolistIcon:"Todolist_deleteTodolistIcon__20CNq",tasks:"Todolist_tasks__lJ4gM",isDone:"Todolist_isDone__yiSji",status:"Todolist_status__1cgdq"}}},[[145,1,2]]]);
//# sourceMappingURL=main.28567c14.chunk.js.map