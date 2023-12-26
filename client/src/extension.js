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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var path = require("path");
var vscode = require("vscode");
var semver = require("semver");
var node_1 = require("vscode-languageclient/node");
var utils_1 = require("./utils");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
var client;
function activate(context) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // Use the console to output diagnostic information (console.log) and errors (console.error)
            // This line of code will only be executed once when your extension is activated
            vscode.workspace.findFiles("package.json").then(function (trial) {
                var packageJsonURI = trial[0];
                vscode.workspace.fs.readFile(packageJsonURI).then(function (fileContents) {
                    var packageData = JSON.parse(fileContents.toString());
                    var godspeedCore = packageData['dependencies']['@godspeedsystems/core'];
                    var tiralForVersion = semver.satisfies(godspeedCore.slice(1), '>=2.0.0');
                    var status = false;
                    if (godspeedCore === 'latest' || tiralForVersion) {
                        var serverModule = context.asAbsolutePath(path.join("server", "out", "server.js"));
                        // The debug options for the server
                        // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
                        var debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };
                        // If the extension is launched in debug mode then the debug server options are used
                        // Otherwise the run options are used
                        var serverOptions = {
                            run: { module: serverModule, transport: node_1.TransportKind.ipc },
                            debug: {
                                module: serverModule,
                                transport: node_1.TransportKind.ipc,
                                options: debugOptions,
                            },
                        };
                        // Options to control the language client
                        var clientOptions = {
                            documentSelector: [{ scheme: "file", language: "YAML" }],
                            synchronize: {
                                // Notify the server about file changes to '.clientrc files contained in the workspace
                                fileEvents: vscode.workspace.createFileSystemWatcher("**/.clientrc"),
                            },
                        };
                        // Create a language client and start
                        client = new node_1.LanguageClient("godspeed-language-server", serverOptions, clientOptions);
                        // Start the client. This will also launch the server
                        client.start();
                        console.log("Congratulations, your extension \"".concat(context.extension.packageJSON.displayName, "\" installed!"));
                        (0, utils_1.installYAMLConfigurations)(context);
                        var installCommand = vscode.commands.registerCommand("godspeed.install", function () {
                            (0, utils_1.installYAMLConfigurations)(context);
                        });
                        context.subscriptions.push(installCommand);
                    }
                    else {
                        console.log("Godspeed version is not updated");
                        vscode.window.showWarningMessage("Godspeed version is not Updated Please Update to Version 2.0");
                    }
                });
            });
            return [2 /*return*/];
        });
    });
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
exports.deactivate = deactivate;
