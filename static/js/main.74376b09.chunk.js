(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,n){"use strict";n.r(t);var a=n(8),r=n(1),s=n(2),i=n(4),l=n(3),u=n(5),c=n(0),o=n.n(c),h=n(7),m=n.n(h);n(16);function b(e){var t="square"+(e.highlight?" highlight":"");return o.a.createElement("button",{className:t,onClick:e.onClick},e.value)}var f=function(e){function t(){return Object(r.a)(this,t),Object(i.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"renderSquare",value:function(e){var t=this,n=this.props.winSquares;return o.a.createElement(b,{key:e,value:this.props.squares[e],onClick:function(){return t.props.onClick(e)},highlight:n&&n.includes(e)})}},{key:"render",value:function(){for(var e=[],t=0,n=0;n<3;n++){for(var a=[],r=0;r<3;r++)a.push(this.renderSquare(3*n+r)),t++;e.push(o.a.createElement("div",{key:t,className:"board-row"},a))}return o.a.createElement("div",null,e)}}]),t}(o.a.Component),p=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(i.a)(this,Object(l.a)(t).call(this,e))).state={history:[{squares:Array(9).fill(null)}],stepNumber:0,xIsNext:!0},n}return Object(u.a)(t,e),Object(s.a)(t,[{key:"handleClick",value:function(e){var t=this.state.history.slice(0,this.state.stepNumber+1),n=t[t.length-1].squares.slice();v(n).winner||n[e]||(n[e]=this.state.xIsNext?"X":"O",this.setState({history:t.concat([{squares:n}]),stepNumber:t.length,xIsNext:!this.state.xIsNext}))}},{key:"jumpTo",value:function(e){this.setState({stepNumber:e,xIsNext:e%2===0})}},{key:"render",value:function(){var e,t=this,n=this.state.history,a=n[this.state.stepNumber],r=v(a.squares),s=r.winner,i=n.map(function(e,n){var a=n?"Go to move #"+n:"Restart game";return 0===n?o.a.createElement("li",{key:n},o.a.createElement("button",{className:"btn btn-danger btn-flat",onClick:function(){return t.jumpTo(n)}},a)):o.a.createElement("li",{key:n},o.a.createElement("button",{className:"btn btn-primary btn-flat",onClick:function(){return t.jumpTo(n)}},a))});return e=s?"Winner: "+s:r.isDraw?"DRAW!":"Next player: "+(this.state.xIsNext?"X":"O"),o.a.createElement("div",{className:"game"},o.a.createElement("div",{className:"game-board"},o.a.createElement("div",{className:"next"},e),o.a.createElement(f,{squares:a.squares,onClick:function(e){return t.handleClick(e)},winSquares:r.line})),o.a.createElement("div",{className:"game-info"},o.a.createElement("ul",null,i)))}}]),t}(o.a.Component);function v(e){for(var t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],n=0;n<t.length;n++){var r=Object(a.a)(t[n],3),s=r[0],i=r[1],l=r[2];if(e[s]&&e[s]===e[i]&&e[s]===e[l])return{winner:e[s],line:t[n],isDraw:!1}}for(var u=!0,c=0;c<e.length;c++)if(null===e[c]){u=!1;break}return{winner:null,line:null,isDraw:u}}m.a.render(o.a.createElement(p,null),document.getElementById("root"))},16:function(e,t,n){},9:function(e,t,n){e.exports=n(10)}},[[9,1,2]]]);
//# sourceMappingURL=main.74376b09.chunk.js.map