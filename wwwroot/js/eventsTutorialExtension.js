function EventsTutorialExtension(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);
}
EventsTutorialExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
EventsTutorialExtension.prototype.constructor = EventsTutorialExtension;
EventsTutorialExtension.prototype.onSelectionEvent = function (event) {
    var currSelection = this.viewer.getSelection();
    var domElem = document.getElementById('MySelectionValue');
    domElem.innerText = currSelection.length;

    var instanceTree = viewer.model.getData().instanceTree;
    //let rootId = instanceTree.getRootId();
    //console.log(instanceTree);
    //console.log(currSelection[0]);
    //console.log(currSelection.dbId);
    //console.log(Object.keys(instanceTree.nodeAccess.dbIdToIndex));
    var allDbIdsStr = Object.keys(instanceTree.nodeAccess.dbIdToIndex);
    
    //console.log(allDbIdsStr.map(function (id) { return parseInt(id) }));
    var AllDbIds = allDbIdsStr.map(function (id) {
        return parseInt(id)
    });//getAllDbIds(myViewer);
    viewer.model.getBulkProperties(AllDbIds, null,
        function (elements) {

            console.log(elements);//this includes all properties of a node.
        });
    viewer.model.getBulkProperties(currSelection, null,
        function (elements) {
            //var node = viewer.model.getData()
            //    .instanceTree.dbIdToNode[dbId];
            //var dbId = node.dbId

            //console.log(elements[0].properties);
            elements[0].properties.forEach(item =>
            {
                console.log(item);
                console.log(item.displayName + ' : ' + item.displayValue)
            });
            //console.log(element.displayCategory);
            //console.log(element.displayName);
            //console.log(element.displayValue);

            //console.log(elements[0].properties);//this includes all properties of a node.
            
        });
    //attributeName: "ElementId"
    //displayCategory: "__revit__"
    //displayName: "ElementId"
    //displayValue: "670285"

    //var alldbId = [];
    //if (!rootId) {
    //    return alldbId;
    //}
    //var queue = [];
    //queue.push(rootId);
    //while (queue.length > 0) {
    //    var node = queue.shift();
    //    alldbId.push(node);
    //    console.log(node);
    //    instanceTree.enumNodeChildren(node, function (childrenIds) {
    //        queue.push(childrenIds);
    //        console.log(viewer.getElementById(childrenIds));
    //        //console.log(queue.push(childrenIds));
    //    });
    //}

    var domElem = document.getElementById('MyToolValue');
    domElem.innerText = this.viewer.getActiveNavigationTool();
};
EventsTutorialExtension.prototype.load = function () {
    this.onSelectionBinded = this.onSelectionEvent.bind(this);
    this.viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, this.onSelectionBinded);
    return true;
};
EventsTutorialExtension.prototype.unload = function () {
    this.viewer.removeEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, this.onSelectionBinded);
    this.onSelectionBinded = null;
    return true;
};




function getFragmentWorldMatrixByNodeId(nodeId) {
    let result = {
        fragId: [],
        matrix: [],
    };
    let viewer = this.viewer;
    this.tree.enumNodeFragments(nodeId, function (frag) {

        let fragProxy = viewer.impl.getFragmentProxy(viewer.model, frag);
        let matrix = new THREE.Matrix4();

        fragProxy.getWorldMatrix(matrix);

        result.fragId.push(frag);
        result.matrix.push(matrix);
    });
    console.log(result);
    //return result;
};
