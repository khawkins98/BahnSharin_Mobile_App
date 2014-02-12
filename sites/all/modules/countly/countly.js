//
// Countly js api
// Next Level Radio 2013
// http://count.ly/resources/reference/server-api
//


/*
   USAGE:

//
// create countly instance once
//
var countly = new Countly();
countly.init( "  YOUR COUNTLY _app_key_ HERE  " );

//
// later you can send countly events
//
var event = countly.createEvent( "buttonPressed", 1 );
countly.events( [ event ] );

//
// or multiple events at once
//
var event1 = countly.createEvent( "button 1 pressed", 1 );
var event2 = countly.createEvent( "button 2 pressed", 1 );
var event3 = countly.createEvent( "button 3 pressed", 1 );
countly.events( [ event1, event2, event3 ] );

//
// and finally, if possible when the user closes the application, send quit to end the session
//
countly.quit();

*/

function Countly()
	{
	var dn = "countly_device";
	var id = window.localStorage.getItem( dn );
	if( id && id.length != 8 )
		{
		var t = new Date();
		var v1 = 123456789;
		var v2 = 1 + Math.random();
		var v3 = t.getTime();
		var v4 = Math.floor( v1 + v2 * v3 );
		var v = v4.toString();
		id = v.substr( v.length - 8, 8 );
		}
	try
		{
		window.localStorage.setItem( dn, id );
		}
	catch( e ) {}

	this.deviceid = id;

	var ua = navigator.userAgent.toLowerCase();
	var os =
		{
		iphone : ua.match(/iphone/),
		ipod : ua.match(/ipod/),
		ipad : ua.match(/ipad/),
		ios : ua.match(/(iphone|ipod|ipad)/),
		mac : ua.match(/macintosh/),
		blackberry : ua.match(/blackberry/),
		android : ua.match(/android/),
		wp : ua.match(/windows phone/)
		};

	var osName = "unknown";
	if( os.iphone ) osName = "Apple iPhone";
	else if( os.ipod ) osName = "Apple iPod";
	else if( os.ipad ) osName = "Apple iPad";
	else if( os.mac ) osName = "Apple Macintosh";
	else if( os.android ) osName = "Android";
	else if( os.blackberry ) osName = "Blackberry";

	var t1 = 0;
	var t2 = 0;

	if( os.ios )
		{
		var t1 = ua.indexOf( "iPhone OS" ) + 10;
		var t2 = ua.indexOf( "like", t1 );
		}
	else if( os.mac )
		{
		var t1 = ua.indexOf( "OS X" ) + 5;
		var t2 = ua.indexOf( ")", t1 );
		}
	else if( os.android )
		{
		t1 = ua.indexOf( "Android" ) + 8;
		t2 = ua.indexOf( ";", t1 );
		}

	this.osversion = "0";
	if( t2 > t1 )
		{
		t = ua.substring( t1, t2 );
		var b = "";
		for( var i=0; i<t.length; i++ )
			{
			var c = t.charAt( i );
			if( c >= '0' && c <= '9' )
				{
				b = b + c;
				}
			else if( c == '_' )
				{
				b = b + '.';
				}
			}
		this.osversion = b;
		}
	this.os = osName;
	this.resolution = window.innerWidth + "x" + window.innerHeight;

	var metrics = { "_os" : this.os, "_os_version" : this.osversion, "_resolution" : this.resolution };
	this.metrics = JSON.stringify(metrics);
	}



Countly.prototype.request = function( url )
	{
	url += "&callback=countlyLoaded";
	var t = document.createElement( "script" );
	t.setAttribute( "src", url );
	t.setAttribute( "id", "countlyscript" );
	document.head.appendChild( t );
	t = null;
	}



Countly.prototype.init = function( appkey )
	{
	this.appkey = appkey;
	var url = 'http://countly.xtqt.de/i?app_key=' + this.appkey + 
		'&device_id=' + this.deviceid + 
		'&begin_session=1&metrics=' + encodeURIComponent( this.metrics );
    this.request( url );
	}



Countly.prototype.createEvent = function( key, count )
	{
	var event = { "key" : key, "count" : count };
	return event;
	}



Countly.prototype.events = function( events )
	{
	var url = 'http://countly.xtqt.de/i?app_key=' + this.appkey + 
		'&device_id=' + this.deviceid + 
		'&events=' + encodeURIComponent( JSON.stringify( events ) );
	this.request( url );
	}



Countly.prototype.requestLoaded = function( response )
	{
	}



Countly.prototype.keepAlive = function(seconds)
	{
	var url = 'http://countly.xtqt.de/i?app_key=' + this.appkey + 
		'&device_id=' + this.deviceid + 
		'&session_duration=' + seconds;
    this.request( url );
	}


Countly.prototype.quit = function()
	{
	var url = 'http://countly.xtqt.de/i?app_key=' + this.appkey + 
		'&device_id=' + this.deviceid + 
		'&end_session=1';
	var client = new XMLHttpRequest();
	client.open( "GET", url, false );
	client.send();
	}



countlyLoaded = function(response)
	{
	var d = document.getElementById( "countlyscript" );
	d.parentNode.removeChild( d );
	}

countlyPing = function()
	{
	countly.keepAlive(30);
	setTimeout( countlyPing, 30000 );
	}
