!function(t){var e={};function r(s){if(e[s])return e[s].exports;var i=e[s]={i:s,l:!1,exports:{}};return t[s].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=e,r.d=function(t,e,s){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(s,i,function(e){return t[e]}.bind(null,i));return s},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/",r(r.s=0)}([function(t,e,r){t.exports=r(1)},function(t,e,r){t.exports={BSP:r(2),CA:r(3),DW:r(4),Fill:r(5),Map:r(6)}},function(t,e){t.exports=class extends Generator{constructor(t,e={}){super(t,e),this.minH=10,this.minW=10,this.depth=10,this.ratio=.55,this.padding=isNaN(e.padding)?2:e.padding}makeTree(t,e){t&&e<this.depth&&(this.split(t),this.makeTree(t.l,e+1),this.makeTree(t.r,e+1))}split(t){if(t.h<2*this.minH||t.w<2*this.minW)return;let e=Math.random()>.5;if(t.w>=t.h*this.ratio)e=!1;else{if(!(t.h>=t.w*this.ratio))return;e=!0}if(e){let e=Math.floor(Math.random()*(t.h-2*this.minH+1))+this.minH,r=t.h-e;t.l=this.makeNode(t.x,t.y,t.w,e),t.r=this.makeNode(t.x,t.y+e,t.w,r)}else{let e=Math.floor(Math.random()*(t.w-2*this.minW+1))+this.minW,r=t.w-e;t.l=this.makeNode(t.x,t.y,e,t.h),t.r=this.makeNode(t.x+e,t.y,r,t.h)}}makeNode(t,e,r,s,i,o){return{x:t,y:e,h:s,w:r,l:i,r:o}}getLeafs(t){return t.l&&t.r?[].concat(this.getLeafs(t.l),this.getLeafs(t.r)):[t]}buildCorridors(t){if(t.l&&t.r){for(var e=Math.round(t.l.x+t.l.w/2),r=Math.round(t.l.y+t.l.h/2),s=Math.round(t.r.x+t.r.w/2),i=Math.round(t.r.y+t.r.h/2),o=e<=s?e:s,h=e>=s?e:s,a=r<=i?r:i,n=r>=i?r:i,l=o;l<h;l++)this.map.set(l,a,this.floor);for(var u=a;u<n;u++)this.map.set(o,u,this.floor);this.buildCorridors(t.l),this.buildCorridors(t.r)}}buildRooms(){this.getLeafs(this.root).forEach(t=>{for(var e=this.padding;e<t.w-this.padding;e++)for(var r=this.padding;r<t.h-this.padding;r++)this.map.set(t.x+e,t.y+r,this.floor)})}generate(){this.root=this.makeNode(0,0,map.w,map.h),this.makeTree(this.root,0),this.color=0,this.buildRooms(this.root),this.buildCorridors(this.root)}}},function(t,e){t.exports=class extends Generator{constructor(t,e={}){super(t,e),this.steps=[{reps:4,r1Cutoff:5,r2Cutoff:2},{reps:2,r1Cutoff:5,r2Cutoff:-1}],this.currentStep=0,this.currentRep=0}runStep(){const t=this.steps[this.currentStep];return!t||(this.map.values.map((e,r)=>{const{x:s,y:i}=this.map.indexToXY(r),o=this.map.getNeighborCount(s,i,this.wall),h=this.map.getNeighborCount(s,i,this.wall,2);return{x:s,y:i,val:o>=t.r1Cutoff||h<=t.r2Cutoff?this.wall:this.floor}}).forEach(t=>this.map.set(t.x,t.y,t.val)),this.currentRep++,this.currentRep>=t.reps&&(this.currentRep=0,this.currentStep++),!1)}reset(){this.currentStep=0,this.currentRep=0}generate(t=1){let e;for(let r=0;r<t;r++)e=this.runStep();return e}}},function(t,e){t.exports=class extends Generator{constructor(t,e={}){super(t,e),this.reset(),this.max=e.max||20}reset(){this.walkerPos={x:Math.floor(Math.random()*this.map.w),y:Math.floor(Math.random()*this.map.h)}}generate(){let t=0,e=0;for(;e<this.max&&t<2*this.max;){this.map.get(this.walkerPos.x,this.walkerPos.y)==this.wall&&(e++,this.map.set(this.walkerPos.x,this.walkerPos.y,this.floor));let r=Math.floor(4*Math.random());this.walkerPos.x+=0==r?1:1==r?-1:0,this.walkerPos.y+=2==r?1:3==r?-1:0,this.walkerPos.x=this.walkerPos.x<=0?0:this.walkerPos.x,this.walkerPos.x=this.walkerPos.x>=this.map.w-1?this.map.w-1:this.walkerPos.x,this.walkerPos.y=this.walkerPos.y<=0?0:this.walkerPos.y,this.walkerPos.y=this.walkerPos.y>=this.map.h-1?this.map.h-1:this.walkerPos.y,t++}}}},function(t,e){t.exports=class{static random(t,e=0,r=1,s=0){t.values=t.values.map(()=>Math.random()<=s?e:r)}static distance(t,e=0,r){for(var s=0;s<r;s++)t.values.forEach((r,s)=>{const{x:i,y:o}=t.indexToXY(s),h=t.getNeighbors(i,o),a=h.some(t=>t.v===e),n=h.reduce((t,e)=>Math.min(t,e),r);a||r===e?t.set(i,o,r):t.set(i,o,n+1)})}static flood(t,e,r){const s=t.get(e,r);let i=[{x:e,y:r,v:s}],o=[];for(;i.length;){const e=i.pop();if(!o.find(t=>t.x===e.x&&t.y===e.y)){let r=t.getNeighbors(e.x,e.y).filter(t=>t.v===s).filter(t=>!o.find(e=>e.x===t.x&&e.y===t.y));i=i.concat(r),o.push(e)}}return o}}},function(t,e){t.exports=class{constructor(t,e){this.w=t,this.h=e,this.values=Array(t*e).fill(0)}indexToXY(t){return{x:t%this.w,y:(t-t%this.w)/this.w}}xyToIndex(t,e){return t+this.w*e}set(t,e,r){this.values[this.xyToIndex(t,e)]=r}get(t,e){return this.values[this.xyToIndex(t,e)]}getNeighbors(t,e,r=1){const s=[];for(let i=-r;i<=r;i++)for(let o=-r;o<=r;o++){let r=t+i,h=e+o;r<0||r>this.w||h<0||h>this.h||0===i&&0===o||s.push({x:r,y:h,v:this.get(r,h)})}return s}}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZ2VuZXJhdG9ycy9ic3BHZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vZ2VuZXJhdG9ycy9jZWxsdWxhckF1dG9tYXRhR2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL2dlbmVyYXRvcnMvZHJ1bmtXYWxrR2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL2ZpbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbWFwLmpzIl0sIm5hbWVzIjpbImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJleHBvcnRzIiwibW9kdWxlIiwiaSIsImwiLCJtb2R1bGVzIiwiY2FsbCIsIm0iLCJjIiwiZCIsIm5hbWUiLCJnZXR0ZXIiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwidmFsdWUiLCJ0IiwibW9kZSIsIl9fZXNNb2R1bGUiLCJucyIsImNyZWF0ZSIsImtleSIsImJpbmQiLCJuIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwiQlNQIiwiQ0EiLCJEVyIsIkZpbGwiLCJNYXAiLCJHZW5lcmF0b3IiLCJbb2JqZWN0IE9iamVjdF0iLCJtYXAiLCJjb25maWciLCJzdXBlciIsInRoaXMiLCJtaW5IIiwibWluVyIsImRlcHRoIiwicmF0aW8iLCJwYWRkaW5nIiwiaXNOYU4iLCJub2RlIiwibGV2ZWwiLCJzcGxpdCIsIm1ha2VUcmVlIiwiaCIsInciLCJzcGxpdEhlaWdodCIsIk1hdGgiLCJyYW5kb20iLCJzcGxpdEF0IiwiZmxvb3IiLCJySGVpZ2h0IiwibWFrZU5vZGUiLCJ4IiwieSIsInJXaWR0aCIsImNvbmNhdCIsImdldExlYWZzIiwibGVmdFhjZW50ZXIiLCJyb3VuZCIsImxlZnRZY2VudGVyIiwicmlnaHRYY2VudGVyIiwicmlnaHRZY2VudGVyIiwic3RhcnRYIiwiZW5kWCIsInN0YXJ0WSIsImVuZFkiLCJzZXQiLCJidWlsZENvcnJpZG9ycyIsInJvb3QiLCJmb3JFYWNoIiwiY29sb3IiLCJidWlsZFJvb21zIiwic3RlcHMiLCJyZXBzIiwicjFDdXRvZmYiLCJyMkN1dG9mZiIsImN1cnJlbnRTdGVwIiwiY3VycmVudFJlcCIsInZhbHVlcyIsInYiLCJpbmRleFRvWFkiLCJuQ291bnQiLCJnZXROZWlnaGJvckNvdW50Iiwid2FsbCIsIm5Db3VudDIiLCJ2YWwiLCJkb25lIiwicnVuU3RlcCIsInJlc2V0IiwibWF4Iiwid2Fsa2VyUG9zIiwiY291bnQiLCJmaWxsZWQiLCJkaXIiLCJwZXJjZW50IiwicGFzc2VzIiwidmkiLCJnZXROZWlnaGJvcnMiLCJpc1RvdWNoaW5nV2FsbCIsInNvbWUiLCJtYXhWYWx1ZSIsInJlZHVjZSIsIm1pbiIsIm5laWdoYm9ycyIsImZsb29kZWQiLCJsZW5ndGgiLCJjdXIiLCJwb3AiLCJmaW5kIiwiZiIsImZpbHRlciIsInB1c2giLCJBcnJheSIsImZpbGwiLCJ4eVRvSW5kZXgiLCJkaXN0IiwiaiIsInhpIiwieWoiXSwibWFwcGluZ3MiOiJhQUNBLElBQUFBLEtBR0EsU0FBQUMsRUFBQUMsR0FHQSxHQUFBRixFQUFBRSxHQUNBLE9BQUFGLEVBQUFFLEdBQUFDLFFBR0EsSUFBQUMsRUFBQUosRUFBQUUsSUFDQUcsRUFBQUgsRUFDQUksR0FBQSxFQUNBSCxZQVVBLE9BTkFJLEVBQUFMLEdBQUFNLEtBQUFKLEVBQUFELFFBQUFDLElBQUFELFFBQUFGLEdBR0FHLEVBQUFFLEdBQUEsRUFHQUYsRUFBQUQsUUFLQUYsRUFBQVEsRUFBQUYsRUFHQU4sRUFBQVMsRUFBQVYsRUFHQUMsRUFBQVUsRUFBQSxTQUFBUixFQUFBUyxFQUFBQyxHQUNBWixFQUFBYSxFQUFBWCxFQUFBUyxJQUNBRyxPQUFBQyxlQUFBYixFQUFBUyxHQUEwQ0ssWUFB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LEVBQUFDLElBVUF6QixhQUFBd0IsRUFBQUMsRUFBQThELEVBQUEsR0FDQSxNQUFBWixLQUNBLFFBQUFqSCxHQUFBNkgsRUFBdUI3SCxHQUFBNkgsRUFBVzdILElBQ2xDLFFBQUE4SCxHQUFBRCxFQUF5QkMsR0FBQUQsRUFBV0MsSUFBQSxDQUNwQyxJQUFBQyxFQUFBakUsRUFBQTlELEVBQ0FnSSxFQUFBakUsRUFBQStELEVBRUFDLEVBQUEsR0FBQUEsRUFBQXJGLEtBQUFZLEdBQUEwRSxFQUFBLEdBQUFBLEVBQUF0RixLQUFBVyxHQUdBLElBQUFyRCxHQUFBLElBQUE4SCxHQUNBYixFQUFBUSxNQUEwQjNELEVBQUFpRSxFQUFBaEUsRUFBQWlFLEVBQUF2QyxFQUFBL0MsS0FBQTdCLElBQUFrSCxFQUFBQyxLQUsxQixPQUFBZiIsImZpbGUiOiJpbmRleC5qcz8wNDA2ODlmNTUyOWRkNDQyN2E2NCIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgQlNQOiByZXF1aXJlKCcuL2dlbmVyYXRvcnMvYnNwR2VuZXJhdG9yLmpzJyksXG4gIENBOiByZXF1aXJlKCcuL2dlbmVyYXRvcnMvY2VsbHVsYXJBdXRvbWF0YUdlbmVyYXRvci5qcycpLFxuICBEVzogcmVxdWlyZSgnLi9nZW5lcmF0b3JzL2RydW5rV2Fsa0dlbmVyYXRvci5qcycpLFxuICBGaWxsOiByZXF1aXJlKCcuL2ZpbGwuanMnKSxcbiAgTWFwOiByZXF1aXJlKCcuL21hcC5qcycpXG59O1xuIiwiY2xhc3MgQlNQR2VuZXJhdG9yIGV4dGVuZHMgR2VuZXJhdG9yIHtcbiAgY29uc3RydWN0b3IobWFwLCBjb25maWcgPSB7fSkge1xuICAgIHN1cGVyKG1hcCwgY29uZmlnKTtcblxuICAgIHRoaXMubWluSCA9IDEwO1xuICAgIHRoaXMubWluVyA9IDEwO1xuICAgIHRoaXMuZGVwdGggPSAxMDtcbiAgICB0aGlzLnJhdGlvID0gMC41NTtcbiAgICB0aGlzLnBhZGRpbmcgPSBpc05hTihjb25maWcucGFkZGluZykgPyAyIDogY29uZmlnLnBhZGRpbmc7XG4gIH1cbiAgbWFrZVRyZWUobm9kZSwgbGV2ZWwpIHtcbiAgICBpZiAobm9kZSAmJiBsZXZlbCA8IHRoaXMuZGVwdGgpIHtcbiAgICAgIHRoaXMuc3BsaXQobm9kZSk7XG4gICAgICB0aGlzLm1ha2VUcmVlKG5vZGUubCwgbGV2ZWwgKyAxKTtcbiAgICAgIHRoaXMubWFrZVRyZWUobm9kZS5yLCBsZXZlbCArIDEpO1xuICAgIH1cbiAgfVxuICBzcGxpdChub2RlKSB7XG4gICAgY29uc3QgdG9vU21hbGwgPSBub2RlLmggPCB0aGlzLm1pbkggKiAyIHx8IG5vZGUudyA8IHRoaXMubWluVyAqIDI7XG4gICAgaWYgKHRvb1NtYWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHNwbGl0SGVpZ2h0ID0gTWF0aC5yYW5kb20oKSA+IDAuNTtcbiAgICBpZihub2RlLncgPj0gbm9kZS5oICogdGhpcy5yYXRpbykge1xuICAgICAgc3BsaXRIZWlnaHQgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYobm9kZS5oID49IG5vZGUudyAqIHRoaXMucmF0aW8pIHtcbiAgICAgIHNwbGl0SGVpZ2h0ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChzcGxpdEhlaWdodCkge1xuICAgICAgbGV0IHNwbGl0QXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobm9kZS5oIC0gdGhpcy5taW5IICogMiArIDEpKSArIHRoaXMubWluSDtcbiAgICAgIGxldCBySGVpZ2h0ID0gbm9kZS5oIC0gc3BsaXRBdDtcbiAgICAgIG5vZGUubCA9IHRoaXMubWFrZU5vZGUobm9kZS54LCBub2RlLnksIG5vZGUudywgc3BsaXRBdCk7XG4gICAgICBub2RlLnIgPSB0aGlzLm1ha2VOb2RlKG5vZGUueCwgbm9kZS55ICsgc3BsaXRBdCwgbm9kZS53LCBySGVpZ2h0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHNwbGl0QXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobm9kZS53IC0gdGhpcy5taW5XICogMiArIDEpKSArIHRoaXMubWluVztcbiAgICAgIGxldCByV2lkdGggPSBub2RlLncgLSBzcGxpdEF0O1xuICAgICAgbm9kZS5sID0gdGhpcy5tYWtlTm9kZShub2RlLngsIG5vZGUueSwgc3BsaXRBdCwgbm9kZS5oKTtcbiAgICAgIG5vZGUuciA9IHRoaXMubWFrZU5vZGUobm9kZS54ICsgc3BsaXRBdCwgbm9kZS55LCByV2lkdGgsIG5vZGUuaCk7XG4gICAgfVxuICB9XG4gIG1ha2VOb2RlKHgsIHksIHcsIGgsIGwsIHIpIHtcbiAgICByZXR1cm4ge3gsIHksIGgsIHcsIGwsIHJ9O1xuICB9XG4gIGdldExlYWZzKG5vZGUpIHtcbiAgICBpZiAobm9kZS5sICYmIG5vZGUucikge1xuICAgICAgcmV0dXJuIFtdLmNvbmNhdCh0aGlzLmdldExlYWZzKG5vZGUubCksIHRoaXMuZ2V0TGVhZnMobm9kZS5yKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbbm9kZV07XG4gICAgfVxuICB9XG4gIGJ1aWxkQ29ycmlkb3JzKG5vZGUpIHtcbiAgICBjb25zdCBoYXNDaGlsZHJlbiA9IG5vZGUubCAmJiBub2RlLnI7XG4gICAgaWYgKGhhc0NoaWxkcmVuKSB7XG4gICAgICB2YXIgbGVmdFhjZW50ZXIgPSBNYXRoLnJvdW5kKG5vZGUubC54ICsgbm9kZS5sLncgLyAyKTtcbiAgICAgIHZhciBsZWZ0WWNlbnRlciA9IE1hdGgucm91bmQobm9kZS5sLnkgKyBub2RlLmwuaCAvIDIpO1xuICAgICAgdmFyIHJpZ2h0WGNlbnRlciA9IE1hdGgucm91bmQobm9kZS5yLnggKyBub2RlLnIudyAvIDIpO1xuICAgICAgdmFyIHJpZ2h0WWNlbnRlciA9IE1hdGgucm91bmQobm9kZS5yLnkgKyBub2RlLnIuaCAvIDIpO1xuXG4gICAgICB2YXIgc3RhcnRYID0gbGVmdFhjZW50ZXIgPD0gcmlnaHRYY2VudGVyID8gbGVmdFhjZW50ZXIgOiByaWdodFhjZW50ZXI7XG4gICAgICB2YXIgZW5kWCA9IGxlZnRYY2VudGVyID49IHJpZ2h0WGNlbnRlciA/IGxlZnRYY2VudGVyIDogcmlnaHRYY2VudGVyO1xuICAgICAgdmFyIHN0YXJ0WSA9IGxlZnRZY2VudGVyIDw9IHJpZ2h0WWNlbnRlciA/IGxlZnRZY2VudGVyIDogcmlnaHRZY2VudGVyO1xuICAgICAgdmFyIGVuZFkgPSBsZWZ0WWNlbnRlciA+PSByaWdodFljZW50ZXIgPyBsZWZ0WWNlbnRlciA6IHJpZ2h0WWNlbnRlcjtcblxuICAgICAgZm9yICh2YXIgeCA9IHN0YXJ0WDsgeCA8IGVuZFg7IHgrKykge1xuICAgICAgICB0aGlzLm1hcC5zZXQoeCwgc3RhcnRZLCB0aGlzLmZsb29yKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIHkgPSBzdGFydFk7IHkgPCBlbmRZOyB5KyspIHtcbiAgICAgICAgdGhpcy5tYXAuc2V0KHN0YXJ0WCwgeSwgdGhpcy5mbG9vcik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYnVpbGRDb3JyaWRvcnMobm9kZS5sKTtcbiAgICAgIHRoaXMuYnVpbGRDb3JyaWRvcnMobm9kZS5yKTtcbiAgICB9XG4gIH1cbiAgYnVpbGRSb29tcygpIHtcbiAgICB0aGlzLmdldExlYWZzKHRoaXMucm9vdCkuZm9yRWFjaChub2RlID0+IHtcbiAgICAgIGZvciAodmFyIHggPSB0aGlzLnBhZGRpbmc7IHggPCBub2RlLncgLSB0aGlzLnBhZGRpbmc7IHgrKykge1xuICAgICAgICBmb3IgKHZhciB5ID0gdGhpcy5wYWRkaW5nOyB5IDwgbm9kZS5oIC0gdGhpcy5wYWRkaW5nOyB5KyspIHtcbiAgICAgICAgICB0aGlzLm1hcC5zZXQobm9kZS54ICsgeCwgbm9kZS55ICsgeSwgdGhpcy5mbG9vcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBnZW5lcmF0ZSgpIHtcbiAgICB0aGlzLnJvb3QgPSB0aGlzLm1ha2VOb2RlKDAsIDAsIG1hcC53LCBtYXAuaCk7XG4gICAgdGhpcy5tYWtlVHJlZSh0aGlzLnJvb3QsIDApO1xuICAgIHRoaXMuY29sb3IgPSAwO1xuICAgIHRoaXMuYnVpbGRSb29tcyh0aGlzLnJvb3QpO1xuICAgIHRoaXMuYnVpbGRDb3JyaWRvcnModGhpcy5yb290KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJTUEdlbmVyYXRvcjtcbiIsImNsYXNzIENlbGx1bGFyQXV0b21hdGFHZW5lcmF0b3IgZXh0ZW5kcyBHZW5lcmF0b3Ige1xuICBjb25zdHJ1Y3RvcihtYXAsIGNvbmZpZyA9IHt9KSB7XG4gICAgc3VwZXIobWFwLCBjb25maWcpO1xuICAgIHRoaXMuc3RlcHMgPSBbXG4gICAgICB7XG4gICAgICAgIHJlcHM6IDQsXG4gICAgICAgIHIxQ3V0b2ZmOiA1LFxuICAgICAgICByMkN1dG9mZjogMlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcmVwczogMixcbiAgICAgICAgcjFDdXRvZmY6IDUsXG4gICAgICAgIHIyQ3V0b2ZmOiAtMVxuICAgICAgfVxuICAgIF07XG5cbiAgICB0aGlzLmN1cnJlbnRTdGVwID0gMDtcbiAgICB0aGlzLmN1cnJlbnRSZXAgPSAwO1xuICB9XG4gIHJ1blN0ZXAoKSB7XG4gICAgY29uc3QgcyA9IHRoaXMuc3RlcHNbdGhpcy5jdXJyZW50U3RlcF07XG4gICAgaWYgKCFzKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLm1hcC52YWx1ZXNcbiAgICAgIC5tYXAoKHYsIGkpID0+IHtcbiAgICAgICAgY29uc3Qge3gsIHl9ID0gdGhpcy5tYXAuaW5kZXhUb1hZKGkpO1xuICAgICAgICBjb25zdCBuQ291bnQgPSB0aGlzLm1hcC5nZXROZWlnaGJvckNvdW50KHgsIHksIHRoaXMud2FsbCk7XG4gICAgICAgIGNvbnN0IG5Db3VudDIgPSB0aGlzLm1hcC5nZXROZWlnaGJvckNvdW50KHgsIHksIHRoaXMud2FsbCwgMik7XG5cbiAgICAgICAgY29uc3Qgc2V0V2FsbCA9IG5Db3VudCA+PSBzLnIxQ3V0b2ZmIHx8IG5Db3VudDIgPD0gcy5yMkN1dG9mZjtcbiAgICAgICAgcmV0dXJuIHt4LCB5LCB2YWw6IHNldFdhbGwgPyB0aGlzLndhbGwgOiB0aGlzLmZsb29yfTtcbiAgICAgIH0pXG4gICAgICAuZm9yRWFjaChjID0+IHRoaXMubWFwLnNldChjLngsIGMueSwgYy52YWwpKTtcblxuICAgIHRoaXMuY3VycmVudFJlcCsrO1xuICAgIGlmICh0aGlzLmN1cnJlbnRSZXAgPj0gcy5yZXBzKSB7XG4gICAgICB0aGlzLmN1cnJlbnRSZXAgPSAwO1xuICAgICAgdGhpcy5jdXJyZW50U3RlcCsrO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXNldCgpIHtcbiAgICB0aGlzLmN1cnJlbnRTdGVwID0gMDtcbiAgICB0aGlzLmN1cnJlbnRSZXAgPSAwO1xuICB9XG4gIGdlbmVyYXRlKHN0ZXBzID0gMSkge1xuICAgIGxldCBkb25lO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RlcHM7IGkrKykge1xuICAgICAgZG9uZSA9IHRoaXMucnVuU3RlcCgpO1xuICAgIH1cblxuICAgIHJldHVybiBkb25lO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ2VsbHVsYXJBdXRvbWF0YUdlbmVyYXRvcjtcbiIsImNsYXNzIERydW5rV2Fsa0dlbmVyYXRvciBleHRlbmRzIEdlbmVyYXRvciB7XG4gIGNvbnN0cnVjdG9yKG1hcCwgY29uZmlnID0ge30pIHtcbiAgICBzdXBlcihtYXAsIGNvbmZpZyk7XG4gICAgdGhpcy5yZXNldCgpO1xuICAgIHRoaXMubWF4ID0gY29uZmlnLm1heCB8fCAyMDtcbiAgfVxuICByZXNldCgpIHtcbiAgICB0aGlzLndhbGtlclBvcyA9IHtcbiAgICAgIHg6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMubWFwLncpLFxuICAgICAgeTogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5tYXAuaClcbiAgICB9O1xuICB9XG4gIGdlbmVyYXRlKCkge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgbGV0IGZpbGxlZCA9IDA7XG5cbiAgICB3aGlsZSAoZmlsbGVkIDwgdGhpcy5tYXggJiYgY291bnQgPCB0aGlzLm1heCAqIDIpIHtcbiAgICAgIGlmICh0aGlzLm1hcC5nZXQodGhpcy53YWxrZXJQb3MueCwgdGhpcy53YWxrZXJQb3MueSkgPT0gdGhpcy53YWxsKSB7XG4gICAgICAgIGZpbGxlZCsrO1xuICAgICAgICB0aGlzLm1hcC5zZXQodGhpcy53YWxrZXJQb3MueCwgdGhpcy53YWxrZXJQb3MueSwgdGhpcy5mbG9vcik7XG4gICAgICB9XG4gICAgICBsZXQgZGlyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNCk7XG4gICAgICB0aGlzLndhbGtlclBvcy54ICs9IGRpciA9PSAwID8gMSA6IGRpciA9PSAxID8gLTEgOiAwO1xuICAgICAgdGhpcy53YWxrZXJQb3MueSArPSBkaXIgPT0gMiA/IDEgOiBkaXIgPT0gMyA/IC0xIDogMDtcblxuICAgICAgdGhpcy53YWxrZXJQb3MueCA9IHRoaXMud2Fsa2VyUG9zLnggPD0gMCA/IDAgOiB0aGlzLndhbGtlclBvcy54O1xuICAgICAgdGhpcy53YWxrZXJQb3MueCA9XG4gICAgICAgIHRoaXMud2Fsa2VyUG9zLnggPj0gdGhpcy5tYXAudyAtIDEgPyB0aGlzLm1hcC53IC0gMSA6IHRoaXMud2Fsa2VyUG9zLng7XG5cbiAgICAgIHRoaXMud2Fsa2VyUG9zLnkgPSB0aGlzLndhbGtlclBvcy55IDw9IDAgPyAwIDogdGhpcy53YWxrZXJQb3MueTtcbiAgICAgIHRoaXMud2Fsa2VyUG9zLnkgPVxuICAgICAgICB0aGlzLndhbGtlclBvcy55ID49IHRoaXMubWFwLmggLSAxID8gdGhpcy5tYXAuaCAtIDEgOiB0aGlzLndhbGtlclBvcy55O1xuXG4gICAgICBjb3VudCsrO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERydW5rV2Fsa0dlbmVyYXRvcjtcbiIsIi8qKlxuICogQSBjb2xsZWN0aW9uIG9mIGtpbmRzIG9mIGZsb29kIGZpbGxzLlxuICovXG5jbGFzcyBGaWxsIHtcbiAgLyoqXG4gICAqIEZpbGwgdGhlIG1hcCB3aXRoIHR3byB2YWx1ZXMsIHJhbmRvbWx5LlxuICAgKlxuICAgKiBAcGFyYW0ge01hcH0gbWFwIFRoZSBtYXAgdG8gZ2V0IHRpbGVzIGZyb20uXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbd2FsbD0wXSBUaGUgZmlyc3QgKHdhbGwpIHZhbHVlLlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2Zsb29yPTFdIFRoZSBzZWNvbmQgKGZsb29yKSB2YWx1ZS5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtwZXJjZW50PTBdIFRoZSBwZXJjZW50IG9mIG1hcCB0aGF0IHNob3VsZCBiZSB3YWxscy5cbiAgICovXG4gIHN0YXRpYyByYW5kb20obWFwLCB3YWxsID0gMCwgZmxvb3IgPSAxLCBwZXJjZW50ID0gMCkge1xuICAgIG1hcC52YWx1ZXMgPSBtYXAudmFsdWVzLm1hcChcbiAgICAgICgpID0+IChNYXRoLnJhbmRvbSgpIDw9IHBlcmNlbnQgPyB3YWxsIDogZmxvb3IpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSYW5kb20gdXRpbHMgZm9yIHN1cHBvcnRpbmcgbW9kdWxlLlxuICAgKi9cbiAgc3RhdGljIGRpc3RhbmNlKG1hcCwgd2FsbCA9IDAsIHBhc3Nlcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFzc2VzOyBpKyspIHtcbiAgICAgIG1hcC52YWx1ZXMuZm9yRWFjaCgodiwgdmkpID0+IHtcbiAgICAgICAgY29uc3Qge3gsIHl9ID0gbWFwLmluZGV4VG9YWSh2aSk7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IG1hcC5nZXROZWlnaGJvcnMoeCwgeSk7XG4gICAgICAgIGNvbnN0IGlzVG91Y2hpbmdXYWxsID0gdmFsdWVzLnNvbWUobiA9PiBuLnYgPT09IHdhbGwpO1xuICAgICAgICBjb25zdCBtYXhWYWx1ZSA9IHZhbHVlcy5yZWR1Y2UoKG1heCwgdmFsKSA9PiBNYXRoLm1pbihtYXgsIHZhbCksIHYpO1xuXG4gICAgICAgIGlmIChpc1RvdWNoaW5nV2FsbCB8fCB2ID09PSB3YWxsKSB7XG4gICAgICAgICAgbWFwLnNldCh4LCB5LCB2KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYXAuc2V0KHgsIHksIG1heFZhbHVlICsgMSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogUmV0dXJuIGEgbGlzdCBvZiB0aWxlcyB0aGF0IHJlY3Vyc2l2ZWx5XG4gICAqIHRvdWNoIHRoZSBnaXZlbiB0aWxlIGFuZCBoYXZlIHRoZSBnaXZlbiB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtNYXB9IG1hcCBUaGUgbWFwIHRvIGdldCB0aWxlcyBmcm9tLlxuICAgKiBAcGFyYW0ge051bWJlcn0geCBUaGUgeCBjb29yZCBvZiB0aGUgdGlsZS5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHkgVGhlIHkgY29vcmQgb2YgdGhlIHRpbGUuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSBUaGUgdGlsZSB2YWx1ZS9udW1iZXIgdG8gbWF0Y2guXG4gICAqIEByZXR1cm4ge0FycmF5fSBUaGUgbGlzdCBvZiBwb2ludHMgYW5kIHRoZWlyIHZhbHVlcy5cbiAgICovXG4gIHN0YXRpYyBmbG9vZChtYXAsIHgsIHkpIHtcbiAgICBjb25zdCB2YWx1ZSA9IG1hcC5nZXQoeCwgeSk7XG4gICAgbGV0IG5laWdoYm9ycyA9IFt7eCwgeSwgdjogdmFsdWV9XTtcbiAgICBsZXQgZmxvb2RlZCA9IFtdO1xuXG4gICAgd2hpbGUobmVpZ2hib3JzLmxlbmd0aCkge1xuICAgICAgY29uc3QgY3VyID0gbmVpZ2hib3JzLnBvcCgpO1xuICAgICAgaWYoIWZsb29kZWQuZmluZChmID0+IGYueCA9PT0gY3VyLnggJiYgZi55ID09PSBjdXIueSkpIHtcbiAgICAgICAgbGV0IG4gPSBtYXAuZ2V0TmVpZ2hib3JzKGN1ci54LCBjdXIueSlcbiAgICAgICAgICAuZmlsdGVyKHggPT4geC52ID09PSB2YWx1ZSlcbiAgICAgICAgICAuZmlsdGVyKHggPT4gIWZsb29kZWQuZmluZChmID0+IGYueCA9PT0geC54ICYmIGYueSA9PT0geC55KSk7XG5cbiAgICAgICAgbmVpZ2hib3JzID0gbmVpZ2hib3JzLmNvbmNhdChuKTtcblxuICAgICAgICBmbG9vZGVkLnB1c2goY3VyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmxvb2RlZDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZpbGw7XG4iLCIvKipcbiAqIEEgY2xhc3MgcmVwcmVzZW50aW5nIGEgZ3JpZCBtYXAuXG4gKi9cbmNsYXNzIE1hcCB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBtYXAuXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB3IFRoZSB3aWR0aCBvZiB0aGUgbWFwLlxuICAgKiBAcGFyYW0ge051bWJlcn0gaCBUaGUgaGVpZ2h0IG9mIHRoZSBtYXAuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih3LCBoKSB7XG4gICAgdGhpcy53ID0gdztcbiAgICB0aGlzLmggPSBoO1xuICAgIHRoaXMudmFsdWVzID0gQXJyYXkodyAqIGgpLmZpbGwoMCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiB4LHkgY29vcmQgZm9yIGEgaW5kZXggaW4gdGhlIGFycmF5IHJlcHJlc2VudGluZyB0aGUgbWFwLlxuICAgKiBAcGFyYW0ge051bWJlcn0gaSBUaGUgaW5kZXggdG8gdHVybiBpbnRvIGFuIHgseSBjb29yZC5cbiAgICogQHJldHVybiB7T2JqZWN0fSB4LHkgY29vcmQuXG4gICAqL1xuICBpbmRleFRvWFkoaSkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiBpICUgdGhpcy53LFxuICAgICAgeTogKGkgLSBpICUgdGhpcy53KSAvIHRoaXMud1xuICAgIH07XG4gIH1cbiAgLyoqXG4gICAqIFR1cm5zIGFuIHgseSBjb29yZCBpbnRvIGFuIGluZGV4IGludG8gdGhlIHZhbHVlcyBhcnJheS5cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHggVGhlIHggY29vcmQuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5IFRoZSB5IGNvb3JkLlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBpbmRleC5cbiAgICovXG4gIHh5VG9JbmRleCh4LCB5KSB7XG4gICAgcmV0dXJuIHggKyB0aGlzLncgKiB5O1xuICB9XG4gIC8qKlxuICAgKiBTZXQgYSB2YWx1ZSBpbiB0aGUgdmFsdWVzIGFycmF5IGJ5IHgseS5cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHggVGhlIHggY29vcmQgb2YgdGhlIHRpbGUgdG8gc2V0LlxuICAgKiBAcGFyYW0ge051bWJlcn0geSBUaGUgeSBjb29yZCBvZiB0aGUgdGlsZSB0byBzZXQuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB2YWwgVGhlIHZhbHVlIHRvIHNldCBmb3IgdGhlIHRpbGUuXG4gICAqL1xuICBzZXQoeCwgeSwgdmFsKSB7XG4gICAgdGhpcy52YWx1ZXNbdGhpcy54eVRvSW5kZXgoeCwgeSldID0gdmFsO1xuICB9XG4gIC8qKlxuICAgKiBHZXQgYSB0aWxlcyB2YWx1ZSBmcm9tIHRoZSBtYXAgYnkgeCx5LlxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0geCBUaGUgeCBjb29yZC5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHkgVGhlIHkgY29vcmQuXG4gICAqIEByZXR1cm4ge051bWJlcn0gVGhlIHRpbGUgdmFsdWUgYXQgeCx5LlxuICAgKi9cbiAgZ2V0KHgsIHkpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZXNbdGhpcy54eVRvSW5kZXgoeCwgeSldO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbGwgbmVpZ2hib3JzIGZvciB0aGUgdGlsZSB3aXRoaW4gZGlzdC5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHggVGhlIHggY29vcmQuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5IFRoZSB5IGNvb3JkLlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2Rpc3Q9MV0gVGhlIGRpc3RhbmNlIHRvIGZpbmQgbmVpZ2hib3JzIHdpdGhpbi5cbiAgICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IG9mIHRpbGUgb2JqZWN0cy5cbiAgICovXG4gIGdldE5laWdoYm9ycyh4LCB5LCBkaXN0ID0gMSkge1xuICAgIGNvbnN0IG5laWdoYm9ycyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAtZGlzdDsgaSA8PSBkaXN0OyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAtZGlzdDsgaiA8PSBkaXN0OyBqKyspIHtcbiAgICAgICAgbGV0IHhpID0geCArIGk7XG4gICAgICAgIGxldCB5aiA9IHkgKyBqO1xuXG4gICAgICAgIGlmKHhpIDwgMCB8fCB4aSA+IHRoaXMudyB8fCB5aiA8IDAgfHwgeWogPiB0aGlzLmgpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSAhPT0gMCB8fCBqICE9PSAwKSB7XG4gICAgICAgICAgbmVpZ2hib3JzLnB1c2goe3g6IHhpLCB5OiB5aiwgdjogdGhpcy5nZXQoeGksIHlqKX0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5laWdoYm9ycztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcDtcbiJdLCJzb3VyY2VSb290IjoiIn0=