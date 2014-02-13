/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    takePicture: function() {
      navigator.camera.getPicture( function( imageURI ) {
        alert( imageURI );
      },
      function( message ) {
        alert( message );
      },
      {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
      });
    }
};

// Adds a function to easily open links inapp (no browser select prompt or open with safari)
jQuery(document).ready(function ($) {

  // track the last page the user was on so we can always shortciruit undesired pages in the main frame
  var lastPage = 'http://bahnsharing.com';

  $(".in-app a").click(function(e){
    // alert('test');
    // console.log(this.href);
    var ref = window.open(this.href, '_blank', 'location=no');

    ref.addEventListener('loadstart', function(event) { 
        // alert(event.url); 
        checkURL(event.url);  
    });

    e.preventDefault();
  });


  function checkURL(destination) {
    // console.log('checking');
    if (
         (destination.indexOf("facebook") != -1) 
         || (destination.indexOf("bahn.de") != -1) 
       ) {
      // open this link in the system browser
alert(destination);
// works if fb is installed
// can check for fb wiht https://build.phonegap.com/plugins/17
  // destination = 'fb://page/527039463984441';
      window.open(destination, '_system', '');
      // navigator.app.loadUrl(destination, { openExternal:true });
      
      // and redirect the inappbrowser to the last known good url
      var ref = window.open(lastPage, '_blank', 'location=no');
      // keep the event listner going
      ref.addEventListener('loadstart', function(event) { 
        checkURL(event.url);  
      });
    } else {
      // Then this is a good url, save it to the memory
      lastPage = destination;
      // alert(lastPage + ' saved');
    }

  }
});

