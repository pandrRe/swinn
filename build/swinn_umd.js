!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).swinn={})}(this,function(e){"use strict";var t;function n(e){var t=new Set(e.match(/[A-Z]/g));return Array.from(t).reduce(function(e,t){return e.replace(t,"-"+t.toLowerCase())},e)}(t=e.Rule||(e.Rule={})).Split=".category .attribute-value",t.Single=".category-attribute-value",e.createStyle=function(t,u,r){var c=Object.assign({},t.default||{},u||{}),i=Object.assign({},t.flags,r),o=t.rule||e.Rule.Single,f=Object.keys(t.attributes||{}).reduce(function(e,t){return e[t]=function(e){var n;c=Object.assign({},c,((n={})[t]=e,n))},e},{}),a=Object.keys(t.attributes||{}).reduce(function(e,t){return e[t]=function(){return c[t]},e},{}),s=Object.keys(t.attributes||{}).reduce(function(e,t){return e[t]=function(){delete c[t]},e},{}),l={toggle:Object.keys(i).reduce(function(e,t){return e[t]=function(e){i[t]=e||!i[t]},e},{}),get:Object.keys(i).reduce(function(e,t){return e[t]=function(){return i[t]},e},{})},g=o===e.Rule.Single?function(){return function(e,t,u){var r=n(e.name),c=r;return Object.keys(t).forEach(function(e){c+=" "+r+"-"+n(e)+"-"+n(t[e])}),Object.keys(u||{}).forEach(function(e){u[e]&&(c+=" "+r+"-"+n(e))}),c}(t,c,i)}:function(){return function(e,t,u){var r=n(e.name);return Object.keys(t).forEach(function(e){r+=" "+n(e)+"-"+n(t[e])}),Object.keys(u||{}).forEach(function(e){u[e]&&(r+=" "+n(e))}),r}(t,c,i)};return{set:f,get:a,unset:s,setMany:function(e){return Object.assign(c,e)},displayClass:g,flags:l,setAttribute:function(e,t){f[e](t)},getAttribute:function(e){return a[e]()},unsetAttribute:function(e){s[e]()},toggleFlag:function(e){l.toggle[e]()},setFlag:function(e,t){l.toggle[e](t)},getFlag:function(e){return l.get[e]()}}},e.category=function(e){return e},Object.defineProperty(e,"__esModule",{value:!0})});
