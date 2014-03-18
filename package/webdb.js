/* WebDB v1.0.1 - 3/18/2014
   http://github.com/haas85/webdb
   Copyright (c) 2014 Iñigo Gonzalez Vazquez <ingonza85@gmail.com> (@haas85) - Under MIT License */
(function(){var a,b,c,d,e,f;window.indexedDB=window.indexedDB||window.webkitIndexedDB||window.mozIndexedDB;c=function(){b.prototype.db=null;function b(b,c,d,e,f){var g,h;this.name=b;this.schema=c;this.version=d;this.size=e!=null?e:5242880;if(window.indexedDB){this.schema=function(){var a;a=[];for(g in this.schema){a.push(g)}return a}.call(this);h=new a.indexedDB(this.name,this.schema,this.version,f)}else if(window.openDatabase){h=new a.webSQL(this.name,this.schema,this.version,this.size,f)}if(!window.openDatabase&&!window.indexedDB){this.select=function(){throw"HTML5 Databases not supported"};this.insert=function(){throw"HTML5 Databases not supported"};this.update=function(){throw"HTML5 Databases not supported"};this["delete"]=function(){throw"HTML5 Databases not supported"};this.drop=function(){throw"HTML5 Databases not supported"};this.execute=function(){throw"HTML5 Databases not supported"};throw"HTML5 Databases not supported"}this.db=h.db;this.select=function(){return h.select.apply(h,arguments)};this.insert=function(){return h.insert.apply(h,arguments)};this.update=function(){return h.update.apply(h,arguments)};this["delete"]=function(){return h["delete"].apply(h,arguments)};this.drop=function(){return h.drop.apply(h,arguments)};this.execute=function(){return h.execute.apply(h,arguments)}}return b}();a=window.WebDB=c;e=function(a,b){var c,d;d=[];for(c in b){d.push(a[c]=b[c])}return d};f=function(a){return Object.prototype.toString.call(a).match(/[a-zA-Z] ([a-zA-Z]+)/)[1].toLowerCase()};b=function(){var a,b,c,d,g;h.prototype.db=null;h.prototype.version=0;h.prototype.schema="";h.prototype.name="";b="indexedDB_version";a="indexedDB_schema";function h(c,d,e,g){var h,i;if(e==null){e=1}if(!window.indexedDB){throw"IndexedDB not supported"}this.version=parseInt(localStorage[b]);if(this.version==null||this.version<e||isNaN(this.version)){localStorage[b]=this.version=parseInt(e)}this.schema=localStorage[a];i=JSON.stringify(d);if(this.schema!=null&&this.schema!==i){localStorage[a]=this.schema=i;localStorage[b]=this.version+=1}else{localStorage[a]=this.schema=i}this.name=c;h=window.indexedDB.open(c,this.version);h.onsuccess=function(a){return function(b){a.db=b.target.result;if(g!=null){return g.call(g)}}}(this);h.onerror=function(a){throw"Error opening database"};h.onupgradeneeded=function(a){return function(b){var c,e,g,h;a.db=b.target.result;h=[];for(g in d){e={};for(c in d[g]){if(f(d[g][c])==="object"){if(d[g][c]["primary"]){e["keyPath"]=c}if(d[g][c]["autoincrement"]){e["autoIncrement"]=true}}}if(e.keyPath==null){e={keyPath:"__key",autoIncrement:true}}if(!a.db.objectStoreNames.contains(g)){h.push(a.db.createObjectStore(g,e))}else{h.push(void 0)}}return h}}(this);h.onversionchange=function(a){return console.log(a)}}h.prototype.select=function(a,b,c){if(b==null){b=[]}return d(this.db,a,null,b,c)};h.prototype.insert=function(a,b,c){var d,e,h,i,j;if(f(b)==="object"){return g(this,a,b,c)}else{d=b.length;j=[];for(h=0,i=b.length;h<i;h++){e=b[h];j.push(g(this,a,e,function(){d--;if(d===0&&c!=null){return c.call(c,b.length)}}))}return j}};h.prototype.update=function(a,b,c,e){if(c==null){c=[]}return d(this.db,a,b,c,function(a){if(e!=null){return e.call(e,a.length)}})};h.prototype["delete"]=function(a,b,d){var e,f,g;if(b==null){b=[]}try{f=0;g=this.db.transaction([a],"readwrite").objectStore(a);return g.openCursor().onsuccess=function(a){var e,h;e=a.target.result;if(e){h=e.value;if(c(h,b)){f++;g["delete"](e.primaryKey)}return e["continue"]()}else{if(d!=null){return d.call(d,f)}}}}catch(h){e=h;if(d!=null){return d.call(d)}}};h.prototype.drop=function(c,d){var e,f;try{this.db.close();this.version+=1;localStorage[b]=this.version;f=window.indexedDB.open(this.name,this.version);f.onsuccess=function(a){return function(b){return a.db=b.target.result}}(this);return f.onupgradeneeded=function(b){return function(e){var f;b.db=e.target.result;b.db.deleteObjectStore(c);f=JSON.parse(b.schema);delete f[c];b.schema=localStorage[a]=JSON.stringify(f);if(d!=null){return d.call(d)}}}(this)}catch(g){e=g;if(d!=null){return d.call(d)}}};h.prototype.execute=function(a,b){return""};g=function(a,b,c,d){var e,f;f=a.db.transaction([b],"readwrite").objectStore(b);e=f.add(c);e.onerror=function(a){if(d!=null){return d.call(d,null)}};return e.onsuccess=function(a){if(d!=null){return d.call(d,1)}}};c=function(a,b){var c,d,e,f,g;if(b==null){b=[]}if(b.length===0){return true}for(f=0,g=b.length;f<g;f++){e=b[f];d=true;for(c in e){if(a[c]!==e[c]){d=false;break}}if(d===true){return true}}return false};d=function(a,b,d,f,g){var h,i;if(f==null){f=[]}i=[];h=d!=null?"readwrite":"readonly";return a.transaction([b],h).objectStore(b).openCursor().onsuccess=function(a){var b,h;b=a.target.result;if(b){h=b.value;if(c(h,f)){if(d!=null){e(h,d);e(b.value,d);b.update(b.value)}i.push(h)}return b["continue"]()}else{if(g!=null){return g.call(g,i)}}}};return h}();a.indexedDB=b;d=function(){var a,b,c,d,e;g.prototype.db=null;c={};e=null;function g(a,b,d,g,h){var i,j,k,l;if(g==null){g=5}if(!window.openDatabase){throw"WebSQL not supported"}g=g*1024*1024;this.db=window.openDatabase(a,d,"",g);l=0;for(k in b){c[k]={};j="CREATE TABLE IF NOT EXISTS "+k+" (";for(i in b[k]){if(f(b[k][i])==="object"){if(b[k][i]["autoincrement"]){j+=""+i+" INTEGER"}else{j+=""+i+" "+b[k][i]["type"]}if(b[k][i]["primary"]){j+=" PRIMARY KEY"}if(b[k][i]["autoincrement"]){j+=" AUTOINCREMENT"}j+=",";c[k][i]=b[k][i]["type"]}else{j+=""+i+" "+b[k][i]+",";c[k][i]=b[k][i]}}j=j.substring(0,j.length-1)+")";console.log(j);l++;e=this;this.execute(j,function(){l--;if(l===0&&h!=null){return h.call(h)}})}}g.prototype.select=function(a,c,d){var e;if(c==null){c=[]}e="SELECT * FROM "+a+b(a,c);return this.execute(e,d)};g.prototype.insert=function(b,c,d){var e,g,h,i,j,k;if(f(c)==="object"){return a(b,c,d)}else{e=c.length;g=0;k=[];for(i=0,j=c.length;i<j;i++){h=c[i];k.push(a(b,h,function(a){e--;g++;if(e===0&&d!=null){return d.call(d,g)}}))}return k}};g.prototype.update=function(a,c,e,f){var g,h;if(e==null){e=[]}h="UPDATE "+a+" SET ";for(g in c){h+=""+g+" = "+d(a,g,c[g])+", "}h=h.substring(0,h.length-2)+b(a,e);return this.execute(h,f)};g.prototype["delete"]=function(a,c,d){var e;if(c==null){c=[]}e="DELETE FROM "+a+" "+b(a,c);return this.execute(e,d)};g.prototype.drop=function(a,b){return this.execute("DROP TABLE IF EXISTS "+a,b)};g.prototype.execute=function(a,b){if(!this.db){throw"Database not initializated"}else{return this.db.transaction(function(c){return c.executeSql(a,[],function(c,d){var e,f;f=[];if(a.indexOf("SELECT")!==-1){f=function(){var a,b,c;c=[];for(e=a=0,b=d.rows.length;0<=b?a<b:a>b;e=0<=b?++a:--a){c.push(d.rows.item(e))}return c}();if(b!=null){return b.call(b,f)}}else{if(b!=null){return b.call(b,d.rowsAffected)}}},function(){return console.log(arguments)})})}};a=function(a,b,c){var f,g,h;h="INSERT INTO "+a+" (";f="(";for(g in b){h+=""+g+", ";f+=""+d(a,g,b[g])+", "}h=h.substring(0,h.length-2)+") ";f=f.substring(0,f.length-2)+") ";h+=" VALUES "+f;return e.execute(h,c)};b=function(a,b){var c,e,f,g,h,i;if(b.length>0){f=" WHERE (";for(h=0,i=b.length;h<i;h++){c=b[h];for(e in c){g=c[e];f+=""+e+" = "+d(a,e,g)+" AND "}f=f.substring(0,f.length-5)+") OR ("}return f.substring(0,f.length-5)}else{return""}};d=function(a,b,d){console.log(c);if(c[a][b]==="NUMBER"){return d}else{return"'"+d+"'"}};return g}();a.webSQL=d}).call(this);