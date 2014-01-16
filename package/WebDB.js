/* WebDB v0.1.0 - 1/16/2014
   http://
   Copyright (c) 2014  - Licensed  */
(function(){var a,b;b=function(){function b(b,c,d,e,f){var g,h,i,j,k,l,m;this.name=b;this.version=c;this.size=d!=null?d:5242880;this.schema=e;if(window.openDatabase){g=new a.webSQL(this.name,this.version,this.size,this.schema,f)}else if(window.indexedDB){g=new a.indexedDB(this.name,this.version,this.size,this.schema,f)}if(!window.openDatabase&&!window.indexedDB){l=function(){throw"HTML5 Databases not supported"};j=function(){throw"HTML5 Databases not supported"};m=function(){throw"HTML5 Databases not supported"};k=function(){throw"HTML5 Databases not supported"};h=function(){throw"HTML5 Databases not supported"};i=function(){throw"HTML5 Databases not supported"};throw"HTML5 Databases not supported"}this.select=g.select;this.insert=g.insert;this.update=g.update;this.remove=g.remove;this.drop=g.drop;this.execute=g.execute}return b}();a=window.WebDB=b}).call(this);(function(){var a;a=function(){a.prototype.db=null;function a(a,b,c,d,e){if(c==null){c=5242880}""}a.prototype.select=function(a){return""};a.prototype.insert=function(a){return""};a.prototype.update=function(a){return""};a.prototype["delete"]=function(a){return""};a.prototype.drop=function(a){return""};a.prototype.execute=function(a,b){return""};return a}();WebDB.indexedDB=a}).call(this);(function(){var a;a=function(){var a,b,c,d;e.prototype.db=null;function e(a,b,c,d,e){var f,g,h,i;if(c==null){c=5242880}if(!window.openDatabase){throw"WebSQL not supported"}this.db=openDatabase(a,b,"",c);i=0;for(h in d){g="CREATE TABLE IF NOT EXISTS "+h+" (";for(f in d[h]){g+=""+f+" "+d[h][f]+","}g=g.substring(0,g.length-1);g+=")";i++;execute(g,function(){tables--;if(tables===0){return e.call(e)}})}}e.prototype.select=function(a,c,d){var e;if(c==null){c=[]}e="SELECT * FROM "+a;e+=b(c);return this.execute(e,d)};e.prototype.insert=function(b,c,e){var f,g,h,i,j;if(d(c)==="object"){return a(b,c,e)}else{f=c.length;j=[];for(h=0,i=c.length;h<i;h++){g=c[h];j.push(a(b,g,function(){f--;if(f===0){return e.call(e)}}))}return j}};e.prototype.update=function(a,d,e,f){var g,h;if(e==null){e=[]}h="UPDATE TABLE "+a+" SET (";for(g in d){h+=""+g+" = "+c(d[g])+", "}h=h.substring(0,h.length-2)+") "+b(e);return this.execute(h,f)};e.prototype["delete"]=function(a,c,d){var e;if(c==null){c=[]}e="DELETE FROM "+a+" "+b(c);return this.execute(e,d)};e.prototype.drop=function(a,b){return this.execute("DROP TABLE IF EXISTS "+a,b)};e.prototype.execute=function(a,b){if(!this.db){throw"Database not initializated"}else{return this.db.transaction(function(c){return c.executeSql(a,b)})}};a=function(a,b,d){var e,f,g;g="INSERT INTO "+a+" (";e="(";for(f in b){g+=""+f+", ";e+=""+c(b[f])+", "}g=g.substring(0,g.length-2)+") ";e=e.substring(0,e.length-2)+") ";g+=" VALUES "+e;return this.execute(g,d)};b=function(a){var b,d,e,f,g,h;if(a.length>0){e=" WHERE (";for(g=0,h=a.length;g<h;g++){b=a[g];for(d in b){f=b[d];e+=""+d+" = "+c(f)+" OR "}e=e.substring(0,e.length-4)+") AND ("}return e.substring(0,e.length-6)}else{return""}};c=function(a){if(isNaN(a)){return"'"+a+"'"}else{return a}};d=function(a){return Object.prototype.toString.call(a).match(/[a-zA-Z] ([a-zA-Z]+)/)[1].toLowerCase()};return e}();WebDB.webSQL=a}).call(this);