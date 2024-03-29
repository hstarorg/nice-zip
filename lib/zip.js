"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zipFile = exports.zipFolder = void 0;
var JSZip = require("jszip");
var fs_1 = require("fs");
var util_1 = require("util");
var path_1 = require("path");
/**
 * 压缩一个目录
 * @param folder
 * @param targetZipFileName
 * @param options
 * @returns
 */
function zipFolder(folder, targetZipFileName, options) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, doZip(targetZipFileName, function (zip) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, addFolderToZip(zip, folder)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, options)];
        });
    });
}
exports.zipFolder = zipFolder;
/**
 * 压缩单个文件
 * @param sourceFileName
 * @param targetZipFileName
 * @param options
 */
function zipFile(sourceFileName, targetZipFileName, options) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            doZip(targetZipFileName, function (zip) { return __awaiter(_this, void 0, void 0, function () {
                var entryName, fileBuffer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            entryName = (0, path_1.basename)(sourceFileName, '');
                            return [4 /*yield*/, (0, util_1.promisify)(fs_1.readFile)(sourceFileName)];
                        case 1:
                            fileBuffer = _a.sent();
                            zip.file(entryName, fileBuffer);
                            return [2 /*return*/];
                    }
                });
            }); }, options);
            return [2 /*return*/];
        });
    });
}
exports.zipFile = zipFile;
function doZip(targetZipFileName, onAddEntry, options) {
    return __awaiter(this, void 0, void 0, function () {
        var zip, opt, zipBuffer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    zip = new JSZip();
                    opt = __assign(__assign({ compression: 'DEFLATE' }, options), { type: 'nodebuffer' });
                    return [4 /*yield*/, onAddEntry(zip)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, zip.generateAsync(opt)];
                case 2:
                    zipBuffer = (_a.sent());
                    return [4 /*yield*/, (0, util_1.promisify)(fs_1.writeFile)(targetZipFileName, zipBuffer)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, true];
            }
        });
    });
}
function addFolderToZip(zip, folder) {
    return __awaiter(this, void 0, void 0, function () {
        var folderItemNames, _i, folderItemNames_1, itemName, entryName, fileStat, fileBuffer, folderZip;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, util_1.promisify)(fs_1.readdir)(folder)];
                case 1:
                    folderItemNames = _a.sent();
                    _i = 0, folderItemNames_1 = folderItemNames;
                    _a.label = 2;
                case 2:
                    if (!(_i < folderItemNames_1.length)) return [3 /*break*/, 7];
                    itemName = folderItemNames_1[_i];
                    entryName = (0, path_1.join)(folder, itemName);
                    return [4 /*yield*/, (0, util_1.promisify)(fs_1.stat)(entryName)];
                case 3:
                    fileStat = _a.sent();
                    if (!fileStat.isFile()) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, util_1.promisify)(fs_1.readFile)(entryName)];
                case 4:
                    fileBuffer = _a.sent();
                    zip.file(itemName, fileBuffer);
                    return [3 /*break*/, 6];
                case 5:
                    if (fileStat.isDirectory()) {
                        folderZip = zip.folder(itemName);
                        addFolderToZip(folderZip, entryName);
                    }
                    else {
                        // 忽略软硬链接
                        console.log('ignore symbolic link entry', entryName);
                    }
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 2];
                case 7: return [2 /*return*/];
            }
        });
    });
}
