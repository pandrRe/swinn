var t;function e(t){var e=new Set(t.match(/[A-Z]/g));return Array.from(e).reduce(function(t,e){return t.replace(e,"-"+e.toLowerCase())},t)}function n(n,r,u){var c=Object.assign({},n.default||{},r||{}),i=Object.assign({},n.flags,u),o=n.rule||t.Single,a=Object.keys(n.attributes||{}).reduce(function(t,e){return t[e]=function(t){var n;c=Object.assign({},c,((n={})[e]=t,n))},t},{}),f=Object.keys(n.attributes||{}).reduce(function(t,e){return t[e]=function(){return c[e]},t},{}),s=Object.keys(n.attributes||{}).reduce(function(t,e){return t[e]=function(){delete c[e]},t},{});var g={toggle:Object.keys(i).reduce(function(t,e){return t[e]=function(t){i[e]=t||!i[e]},t},{}),get:Object.keys(i).reduce(function(t,e){return t[e]=function(){return i[e]},t},{})};var b=o===t.Single?function(){return function(t,n,r){var u=e(t.name),c=u;return Object.keys(n).forEach(function(t){c+=" "+u+"-"+e(t)+"-"+e(n[t])}),Object.keys(r||{}).forEach(function(t){r[t]&&(c+=" "+u+"-"+e(t))}),c}(n,c,i)}:function(){return function(t,n,r){var u=e(t.name);return Object.keys(n).forEach(function(t){u+=" "+e(t)+"-"+e(n[t])}),Object.keys(r||{}).forEach(function(t){r[t]&&(u+=" "+e(t))}),u}(n,c,i)};return{set:a,get:f,unset:s,setMany:function(t){return Object.assign(c,t)},displayClass:b,flags:g,setAttribute:function(t,e){a[t](e)},getAttribute:function(t){return f[t]()},unsetAttribute:function(t){s[t]()},toggleFlag:function(t){g.toggle[t]()},setFlag:function(t,e){g.toggle[t](e)},getFlag:function(t){return g.get[t]()}}}function r(t){return t}!function(t){t.Split=".category .attribute-value",t.Single=".category-attribute-value"}(t||(t={}));export{n as createStyle,t as Rule,r as category};
