/* WebDB v0.1.0 - 1/18/2014
   http://
   Copyright (c) 2014  - Licensed  */
(function(){var a,b,c,d,e,f;e=function(){b.prototype.db=null;function b(b,c,d,e,f){var g,h;this.name=b;this.schema=c;this.version=d;this.size=e!=null?e:5242880;if(window.openDatabase){h=new a.webSQL(this.name,this.schema,this.version,this.size,f)}else if(window.indexedDB){this.schema=function(){var a;a=[];for(g in this.schema){a.push(g)}return a}.call(this);h=new a.indexedDB(this.name,this.schema,this.version,f)}if(!window.openDatabase&&!window.indexedDB){this.select=function(){throw"HTML5 Databases not supported"};this.insert=function(){throw"HTML5 Databases not supported"};this.update=function(){throw"HTML5 Databases not supported"};this["delete"]=function(){throw"HTML5 Databases not supported"};this.drop=function(){throw"HTML5 Databases not supported"};this.execute=function(){throw"HTML5 Databases not supported"};throw"HTML5 Databases not supported"}this.db=h.db;this.select=function(){return h.select.apply(h,arguments)};this.insert=function(){return h.insert.apply(h,arguments)};this.update=function(){return h.update.apply(h,arguments)};this["delete"]=function(){return h["delete"].apply(h,arguments)};this.drop=function(){return h.drop.apply(h,arguments)};this.execute=function(){return h.execute.apply(h,arguments)}}return b}();a=window.WebDB=e;c=function(a,b){var c,d;d=[];for(c in b){d.push(a[c]=b[c])}return d};d=function(a){return Object.prototype.toString.call(a).match(/[a-zA-Z] ([a-zA-Z]+)/)[1].toLowerCase()};b=function(){var a,b,e;f.prototype.db=null;function f(a,b,c,d){var e,f=this;if(c==null){c=1}if(!window.indexedDB){throw"IndexedDB not supported"}e=indexedDB.open(a,c);e.onsuccess=function(a){f.db=a.target.result;if(d!=null){return d.call(d)}};e.onerror=function(a){throw"Error opening database"};e.onupgradeneeded=function(a){var c,d,e,g,h;f.db=a.target.result;c={keyPath:"key",autoIncrement:true};h=[];for(e=0,g=b.length;e<g;e++){d=b[e];if(!f.db.objectStoreNames.contains(d)){h.push(f.db.createObjectStore(d,c))}else{h.push(void 0)}}return h};e.onversionchange=function(a){return console.log(a)}}f.prototype.select=function(a,c,d){if(c==null){c=[]}return b(this.db,a,null,c,d)};f.prototype.insert=function(a,b,c){var f,g,h,i,j;if(d(b)==="object"){return e(this,a,b,c)}else{f=b.length;j=[];for(h=0,i=b.length;h<i;h++){g=b[h];j.push(e(this,a,g,function(){f--;if(f===0&&c!=null){return c.call(c,b.length)}}))}return j}};f.prototype.update=function(a,c,d,e){if(d==null){d=[]}return b(this.db,a,c,d,function(a){if(e!=null){return e.call(e,a.length)}})};f.prototype["delete"]=function(b,c,d){var e,f,g;if(c==null){c=[]}try{f=0;g=this.db.transaction([b],"readwrite").objectStore(b);return g.openCursor().onsuccess=function(b){var e,h;e=b.target.result;if(e){h=e.value;if(a(h,c)){f++;g["delete"](e.primaryKey)}return e["continue"]()}else{if(d!=null){return d.call(d,f)}}}}catch(h){e=h;if(d!=null){return d.call(d)}}};f.prototype.drop=function(a,b){var c,d;try{d=this.db.transaction([a],"readwrite").objectStore(a);d.openCursor().onsuccess=function(a){var b;b=a.target.result;if(b){d["delete"](b.primaryKey);return b["continue"]()}};if(b!=null){return b.call(b)}}catch(e){c=e;if(b!=null){return b.call(b)}}};f.prototype.execute=function(a,b){return""};e=function(a,b,c,d){var e,f;f=a.db.transaction([b],"readwrite").objectStore(b);e=f.add(c);e.onerror=function(a){if(d!=null){return d.call(d,null)}};return e.onsuccess=function(a){if(d!=null){return d.call(d,1)}}};a=function(a,b){var c,d,e,f,g;if(b==null){b=[]}if(b.length===0){return true}for(f=0,g=b.length;f<g;f++){e=b[f];d=true;for(c in e){if(a[c]!==e[c]){d=false;break}}if(d===true){return true}}return false};b=function(b,d,e,f,g){var h,i;if(f==null){f=[]}i=[];h=e!=null?"readwrite":"readonly";return b.transaction([d],h).objectStore(d).openCursor().onsuccess=function(b){var d,h;d=b.target.result;if(d){h=d.value;if(a(h,f)){if(e!=null){c(h,e);c(d.value,e);d.update(d.value)}i.push(h)}return d["continue"]()}else{if(g!=null){return g.call(g,i)}}}};return f}();a.indexedDB=b;f=function(){var a,b,c,e;f.prototype.db=null;e=null;function f(a,b,c,d,f){var g,h,i,j;if(d==null){d=5}if(!window.openDatabase){throw"WebSQL not supported"}d=d*1024*1024;this.db=openDatabase(a,c,"",d);j=0;for(i in b){h="CREATE TABLE IF NOT EXISTS "+i+" (";for(g in b[i]){h+=""+g+" "+b[i][g]+","}h=h.substring(0,h.length-1)+")";j++;e=this;this.execute(h,function(){j--;if(j===0&&f!=null){return f.call(f)}})}}f.prototype.select=function(a,c,d){var e;if(c==null){c=[]}e="SELECT * FROM "+a+b(c);return this.execute(e,d)};f.prototype.insert=function(b,c,e){var f,g,h,i,j,k;if(d(c)==="object"){return a(b,c,e)}else{f=c.length;g=0;k=[];for(i=0,j=c.length;i<j;i++){h=c[i];k.push(a(b,h,function(a){f--;g++;if(f===0&&e!=null){return e.call(e,g)}}))}return k}};f.prototype.update=function(a,d,e,f){var g,h;if(e==null){e=[]}h="UPDATE "+a+" SET ";for(g in d){h+=""+g+" = "+c(d[g])+", "}h=h.substring(0,h.length-2)+b(e);return this.execute(h,f)};f.prototype["delete"]=function(a,c,d){var e;if(c==null){c=[]}e="DELETE FROM "+a+" "+b(c);return this.execute(e,d)};f.prototype.drop=function(a,b){return this.execute("DROP TABLE IF EXISTS "+a,b)};f.prototype.execute=function(a,b){if(!this.db){throw"Database not initializated"}else{return this.db.transaction(function(c){return c.executeSql(a,[],function(c,d){var e,f;f=[];if(a.indexOf("SELECT")!==-1){f=function(){var a,b,c;c=[];for(e=a=0,b=d.rows.length;0<=b?a<b:a>b;e=0<=b?++a:--a){c.push(d.rows.item(e))}return c}();if(b!=null){return b.call(b,f)}}else{if(b!=null){return b.call(b,d.rowsAffected)}}})})}};a=function(a,b,d){var f,g,h;h="INSERT INTO "+a+" (";f="(";for(g in b){h+=""+g+", ";f+=""+c(b[g])+", "}h=h.substring(0,h.length-2)+") ";f=f.substring(0,f.length-2)+") ";h+=" VALUES "+f;return e.execute(h,d)};b=function(a){var b,d,e,f,g,h;if(a.length>0){e=" WHERE (";for(g=0,h=a.length;g<h;g++){b=a[g];for(d in b){f=b[d];e+=""+d+" = "+c(f)+" AND "}e=e.substring(0,e.length-5)+") OR ("}return e.substring(0,e.length-5)}else{return""}};c=function(a){if(isNaN(a)){return"'"+a+"'"}else{return a}};return f}();a.webSQL=f}).call(this);