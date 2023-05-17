(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[6],{1186:function(e,t,a){},1199:function(e,t,a){"use strict";a.r(t);var s=a(1),n=a(14),r=a(15),c=a(3),l=a(4),i=a(9),o=a(10),u=a(0),d=a.n(u),p=a(102),h=a(82),b=(a(1186),a(22)),j=a(324),v=a(36);var f=a(8);function O(e){var t,a=e.heading,s=e.value,n=void 0===s?0:s;return Object(f.jsxs)("section",{className:"statisticscomponent",children:[Object(f.jsx)("h5",{className:"statisticscomponent__header",children:a}),Object(f.jsx)("p",{className:"statisticscomponent__content",children:(t=n,t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","))})]})}function m(e){var t=e.children,a=e.title;return e.show?Object(f.jsxs)("section",{className:"statisticspanel",children:[Object(f.jsx)("h5",{className:"statisticspanel__header",children:a}),Object(f.jsx)("div",{className:"statisticspanel__content",children:t})]}):Object(f.jsx)(f.Fragment,{})}var x=a(197),y=function(e){Object(i.a)(a,e);var t=Object(o.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).state={playerFilter:"",levelFilter:"",solvedLevels:[],totalCompleted:0,totalCreated:0,totalFailures:0,totalPlayers:0,chainId:0,lang:localStorage.getItem("lang")},s.props.web3&&window.ethereum.request({method:"eth_chainId"}).then((function(e){s.setState({chainId:Number(e)})})),s}return Object(l.a)(a,[{key:"componentDidUpdate",value:function(e,t){this.props.web3&&e.web3!==this.props.web3&&this.collectsGlobalStats()}},{key:"collectsGlobalStats",value:function(){var e=Object(r.a)(Object(s.a)().mark((function e(){var t,a,r,c,l,i;return Object(s.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([Object(j.c)(this.state.chainId),Object(j.d)(this.state.chainId),Object(j.e)(this.state.chainId),Object(j.f)(this.state.chainId)]);case 2:t=e.sent,a=Object(n.a)(t,4),r=a[0],c=a[1],l=a[2],i=a[3],this.setState({totalCompleted:r?r.toNumber():0,totalCreated:c?c.toNumber():0,totalFailures:l?l.toNumber():0,totalPlayers:i?i.toNumber():0});case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"collectPlayerStats",value:function(){var e=Object(r.a)(Object(s.a)().mark((function e(t){var a;return Object(s.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(j.a)(t,this.state.chainId);case 2:if(!e.sent){e.next=12;break}return e.next=6,Object(j.b)(t,this.state.chainId);case 6:return a=e.sent,document.querySelectorAll(".progress-bar-wrapper")[0].style.display="none",e.abrupt("return",{playerExists:!0,levelsSolved:a});case 12:return document.querySelectorAll(".progress-bar-wrapper")[0].style.display="none",e.abrupt("return",{playerExists:!1,levelsSolved:[]});case 15:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"updatePlayerStats",value:function(){var e=Object(r.a)(Object(s.a)().mark((function e(t){var a;return Object(s.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!Object(v.n)(t)){e.next=9;break}return document.querySelectorAll(".progress-bar-wrapper")[0].style.display="flex",this.setState({playerFilter:t}),e.next=6,this.collectPlayerStats(t);case 6:null===(a=e.sent)||void 0===a||a.levelsSolved.sort((function(e,t){return+e.difficulty-+t.difficulty})),this.setState({solvedLevels:null===a||void 0===a?void 0:a.levelsSolved});case 9:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return Object(f.jsxs)("div",{className:"stats-page page-container",children:[Object(f.jsxs)("div",{className:"stats-header",children:[Object(f.jsx)(O,{heading:"Total number of players",value:this.state.totalPlayers}),Object(f.jsx)(O,{heading:"Total number of instances created",value:this.state.totalCreated}),Object(f.jsx)(O,{heading:"Total number of instances solved",value:this.state.totalCompleted}),Object(f.jsx)(O,{heading:"Total number of instances failed",value:this.state.totalFailures})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("form",{children:Object(f.jsx)("div",{className:"stats-input-container form-group",children:Object(f.jsx)("input",{type:"text",className:"stats-input form-control",placeholder:"Player address",onChange:function(){var t=Object(r.a)(Object(s.a)().mark((function t(a){return Object(s.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),t.next=3,e.updatePlayerStats(a.target.value);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),onKeyDown:function(){var e=Object(r.a)(Object(s.a)().mark((function e(t){return Object(s.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:"Enter"===t.key&&t.preventDefault();case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()})})}),Object(f.jsx)("div",{className:"stats-content",children:Object(f.jsx)(m,{show:this.state.solvedLevels.length,title:"Levels Completed",children:Object(f.jsx)("div",{className:"player-stats-results",children:this.state.solvedLevels.map((function(e){return Object(f.jsxs)("div",{children:[Object(f.jsx)("span",{children:e.name}),Object(f.jsx)("span",{children:e.difficultyCircles})]},e.name)}))})})})]}),Object(f.jsx)(x.a,{})]})}}]),a}(d.a.Component);t.default=Object(p.b)((function(e){return{web3:e.network.web3}}),(function(e){return Object(h.b)({collectStats:b.r},e)}))(y)}}]);
//# sourceMappingURL=6.af4e6eb1.chunk.js.map