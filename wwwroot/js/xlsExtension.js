//https://forge.autodesk.com/en/docs/viewer/v7/developers_guide/viewer_basics/extensions/
function MyAwesomeExtension(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);
    // Preserve "this" reference when methods are invoked by event handlers.
    this.lockViewport = this.lockViewport.bind(this);
    this.unlockViewport = this.unlockViewport.bind(this);
}
MyAwesomeExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
MyAwesomeExtension.prototype.constructor = MyAwesomeExtension;
MyAwesomeExtension.prototype.lockViewport = function () {
    this.viewer.setNavigationLock(true);
};
MyAwesomeExtension.prototype.unlockViewport = function () {
    this.viewer.setNavigationLock(false);
};
MyAwesomeExtension.prototype.load = function () {
    // alert('MyAwesomeExtension is loaded!');

    this._lockBtn = document.getElementById('MyAwesomeLockButton');
    this._lockBtn.addEventListener('click', this.lockViewport);

    this._unlockBtn = document.getElementById('MyAwesomeUnlockButton');
    this._unlockBtn.addEventListener('click', this.unlockViewport);

    return true;
};
MyAwesomeExtension.prototype.unload = function () {
    // alert('MyAwesomeExtension is now unloaded!');

    if (this._lockBtn) {
        this._lockBtn.removeEventListener('click', this.lockViewport);
        this._lockBtn = null;
    }

    if (this._unlockBtn) {
        this._unlockBtn.removeEventListener('click', this.unlockViewport);
        this._unlockBtn = null;
    }

    return true;
};
