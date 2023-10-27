// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as path from "path";
import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";
import { installYAMLConfigurations } from "./utils";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  const serverModule = context.asAbsolutePath(
    path.join("server", "out", "server.js")
  );

  // The debug options for the server
  // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
  let debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "YAML" }],
    synchronize: {
      // Notify the server about file changes to '.clientrc files contained in the workspace
      fileEvents: vscode.workspace.createFileSystemWatcher("**/.clientrc"),
    },
  };

  // Create a language client and start
  client = new LanguageClient(
    "godspeed-language-server",
    serverOptions,
    clientOptions
  );

  // Start the client. This will also launch the server
  client.start();


  console.log(
    `Congratulations, your extension "${context.extension.packageJSON.displayName}" installed!`
  );

  installYAMLConfigurations(context);

  const installCommand = vscode.commands.registerCommand(
    "godspeed.install",
    () => {
      installYAMLConfigurations(context);
    }
  );

  context.subscriptions.push(installCommand);
}

// This method is called when your extension is deactivated
export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
