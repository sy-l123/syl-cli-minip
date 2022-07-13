"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs-extra");
const memFs = require("mem-fs");
const editor = require("mem-fs-editor");
const utils_1 = require("../utils");
class Creator {
    constructor(sourceRoot) {
        const store = memFs.create();
        this.fs = editor.create(store);
        this.sourceRoot(sourceRoot || path.join((0, utils_1.getRootPath)()));
        this.init();
    }
    init() { }
    sourceRoot(rootPath) {
        if (typeof rootPath === 'string') {
            this._rootPath = path.resolve(rootPath);
        }
        if (!fs.existsSync(this._rootPath)) {
            fs.ensureDirSync(this._rootPath);
        }
        return this._rootPath;
    }
    template(filePath, dest, data, options) {
        this.fs.copyTpl(path.join(this._rootPath, filePath), dest, Object.assign({}, this, data), options);
    }
    copy(filePath, dest) {
        this.fs.copy(path.join(this._rootPath, filePath), dest);
    }
    exchangeStyleExtFn(pathName, style) {
        (0, utils_1.exchangeStyleExt)(pathName, style);
    }
}
exports.default = Creator;
//# sourceMappingURL=creator.js.map