"use strict";
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
exports.unzipFile = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var util_1 = require("util");
var JSZip = require("jszip");
var utils_1 = require("./utils");
/**
 * 解压指定文件到目标文件夹（文件夹必须存在）
 * @param <sourceFile> 源文件，必须是.zip后缀
 * @param [targetFolder] 解压路径，不提供则默认解压到当前路径
 * @param [options] 解压时的配置参数
 * @returns <Promise>
 */
function unzipFile(sourceFile, targetFolder, options) {
    return __awaiter(this, void 0, void 0, function () {
        var zpiFileBuffer, zip, fileNames, filesLen, fileIdx, _i, fileNames_1, fileName, file, filePath, binaryData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!sourceFile || !(0, fs_1.existsSync)(sourceFile)) {
                        throw new Error('Must provider source file.');
                    }
                    if (targetFolder) {
                        if (!(0, fs_1.existsSync)(targetFolder)) {
                            throw new Error('Target folder not exists.');
                        }
                    }
                    else {
                        targetFolder = (0, path_1.join)((0, path_1.dirname)(sourceFile), (0, utils_1.getFileName)(sourceFile));
                        if (!(0, fs_1.existsSync)(targetFolder)) {
                            (0, fs_1.mkdirSync)(targetFolder);
                        }
                    }
                    options = options || {};
                    if (options.onProcess) {
                        if (typeof options.onProcess !== 'function') {
                            throw new Error('options.onProcess must be a function');
                        }
                    }
                    else {
                        options.onProcess = function () { };
                    }
                    return [4 /*yield*/, (0, util_1.promisify)(fs_1.readFile)(sourceFile)];
                case 1:
                    zpiFileBuffer = _a.sent();
                    return [4 /*yield*/, JSZip.loadAsync(zpiFileBuffer, options)];
                case 2:
                    zip = _a.sent();
                    fileNames = Object.keys(zip.files);
                    filesLen = fileNames.length;
                    (0, utils_1.ensureFunction)(options.onLoad)(filesLen);
                    fileIdx = 0;
                    _i = 0, fileNames_1 = fileNames;
                    _a.label = 3;
                case 3:
                    if (!(_i < fileNames_1.length)) return [3 /*break*/, 9];
                    fileName = fileNames_1[_i];
                    file = zip.files[fileName];
                    filePath = (0, path_1.join)(targetFolder, file.name);
                    if (!file.dir) return [3 /*break*/, 4];
                    if (!(0, fs_1.existsSync)(filePath)) {
                        (0, fs_1.mkdirSync)(filePath);
                    }
                    (0, utils_1.ensureFunction)(options.onProcess)(filePath, fileIdx + 1, filesLen);
                    return [3 /*break*/, 7];
                case 4: return [4 /*yield*/, file.async('binarystring')];
                case 5:
                    binaryData = _a.sent();
                    return [4 /*yield*/, (0, util_1.promisify)(fs_1.writeFile)(filePath, binaryData, 'binary')];
                case 6:
                    _a.sent();
                    (0, utils_1.ensureFunction)(options.onProcess)(filePath, fileIdx + 1, filesLen);
                    _a.label = 7;
                case 7:
                    fileIdx += 1;
                    _a.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 3];
                case 9: return [2 /*return*/, true];
            }
        });
    });
}
exports.unzipFile = unzipFile;
