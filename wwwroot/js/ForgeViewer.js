/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////


//Autodesk.Viewing.Initializer(options, function onInitialized() {
//    viewerApp = new Autodesk.Viewing.ViewingApplication('MyViewerDiv');
//    var config3d = {
//        extensions: ['WharfExtension']
//    };
//    viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Private.GuiViewer3D, config3d);
//    var model = 'urn:' + defaultModel;
//    viewerApp.loadDocument(model, onDocumentLoadSuccess, onDocumentLoadFailure);
//});


var viewer;

function launchViewer(urn) {
  var options = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken
  };

  Autodesk.Viewing.Initializer(options, () => {
    var htmlDiv = document.getElementById('forgeViewer');
    Autodesk.Viewing.theExtensionManager.registerExtension('MyAwesomeExtension', MyAwesomeExtension);
    Autodesk.Viewing.theExtensionManager.registerExtension('ToolbarExtension', ToolbarExtension);
      Autodesk.Viewing.theExtensionManager.registerExtension('EventsTutorialExtension', EventsTutorialExtension);
    var config3d = {
        extensions: ['MyAwesomeExtension', 'ToolbarExtension', 'EventsTutorialExtension'],
    };  
    viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv, config3d);




      //viewer.start();
      //viewer.loadModel(...);



    viewer.start();
    var documentId = 'urn:' + urn;
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
  });
}

function onDocumentLoadSuccess(doc) {
  var viewables = doc.getRoot().getDefaultGeometry();
  viewer.loadDocumentNode(doc, viewables).then(i => {
    // documented loaded, any action?
  });
}

function onDocumentLoadFailure(viewerErrorCode) {
  console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function getForgeToken(callback) {

  fetch('/api/forge/oauth/token').then(res => {
    res.json().then(data => {
      callback(data.access_token, data.expires_in);
    });
  });
}


