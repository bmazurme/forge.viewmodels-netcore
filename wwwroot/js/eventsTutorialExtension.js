function EventsTutorialExtension(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);
}
EventsTutorialExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
EventsTutorialExtension.prototype.constructor = EventsTutorialExtension;
EventsTutorialExtension.prototype.onSelectionEvent = function (event) {
    var currSelection = this.viewer.getSelection();
    var domElem = document.getElementById('MySelectionValue');
    domElem.innerText = currSelection.length;
    var domElem = document.getElementById('MyToolValue');
    domElem.innerText = this.viewer.getActiveNavigationTool();//event.id;
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