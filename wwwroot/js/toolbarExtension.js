//The index mapping looks like this: 0 -> Simple Grey, 1 -> Sharp Highlights, 
//2 -> Dark Sky, 3 -> Grey Room, 4 -> Photo Booth, 5 -> Tranquility, 
//6 -> Infinity Pool, 7 -> Simple White, 8 -> Riverbank, 9 -> Contrast, 
//1 -> 0 Rim Highlights, 1 -> 1 Cool Light, 1 -> 2 Warm Light, 1 -> 3 Soft Light,
//1 -> 4 Grid Light, 1 -> 5 Plaza, 1 -> 6 Snow Field
function ToolbarExtension(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);
}
ToolbarExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
ToolbarExtension.prototype.constructor = ToolbarExtension;
ToolbarExtension.prototype.load = function () {
    // Set background environment to "Infinity Pool"
    // and make sure the environment background texture is visible
    this.viewer.setLightPreset(2);
    this.viewer.setEnvMapBackground(true);
    // Ensure the model is centered
    this.viewer.fitToView();

    return true;
};
ToolbarExtension.prototype.onToolbarCreated = function (toolbar) {
    // alert('TODO: customize Viewer toolbar');
    var viewer = this.viewer;
    // Button 1
    var button1 = new Autodesk.Viewing.UI.Button('button__show-env-bg');
    button1.onClick = function (e) {
        viewer.setEnvMapBackground(true);
    };
    button1.addClass('button__show-env-bg');
    button1.setToolTip('Show Environment');

    // Button 2
    var button2 = new Autodesk.Viewing.UI.Button('button__hide-env-bg');
    button2.onClick = function (e) {
        viewer.setEnvMapBackground(false);
    };
    button2.addClass('button__hide-env-bg');
    button2.setToolTip('Hide Environment');
    // Button 3
    var button3 = new Autodesk.Viewing.UI.Button('button__export');
    button3.onClick = function (e) {
        let msg;
        var instanceTree = viewer.model.getData().instanceTree;
        var allDbIdsStr = Object.keys(instanceTree.nodeAccess.dbIdToIndex);
        var AllDbIds = allDbIdsStr.map(function (id) { return parseInt(id) });

        viewer.model.getBulkProperties(AllDbIds, null,
            function (elements) {
                //console.log(elements);
                elements.forEach(item => {
                    item.properties.forEach(pr => {
                        msg += pr.displayName + ' : ' + pr.displayValue + '\n';
                    });
                    //console.log(item.displayName + ' : ' + item.displayValue + '\n');
                    //msg += item.displayName + ' : ' + item.displayValue + '\n';
                });
                console.log(msg);
                //alert(msg);
            });


    };
    button3.addClass('button__export');
    button3.setToolTip('Export data');

    // SubToolbar
    this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('my-custom-toolbar');
    this.subToolbar.addControl(button1);
    this.subToolbar.addControl(button2);
    this.subToolbar.addControl(button3);
    toolbar.addControl(this.subToolbar);
};