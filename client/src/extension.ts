// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as path from "path";
import * as vscode from "vscode";
import * as semver from 'semver';
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

export async function activate(context: vscode.ExtensionContext) {
vscode.workspace.findFiles("package.json").then(trial => {
  const packageJsonURI = trial[0];
  vscode.workspace.fs.readFile(packageJsonURI).then(fileContents => {
    const packageData = JSON.parse(fileContents.toString());
    const godspeedCore= packageData['dependencies']['@godspeedsystems/core'];
    const tiralForVersion = semver.satisfies(godspeedCore.slice(1), '>=2.0.0');
    console.log(`Rohit Godspeed Core system ${godspeedCore}`);
    console.log(`Rohit get semver ${tiralForVersion}`);
    const status = false; 
    if (godspeedCore === 'latest' || tiralForVersion){       
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
      console.log(`Rohit godspeed core is the latest`);
    }
    else {
      console.log(`Godspeed version is not updated`);
      vscode.window.showWarningMessage(`Godspeed version is not Updated Please Update to Version 2.0`);
    }
  });
});
  vscode.workspace.onDidOpenTextDocument((document: vscode.TextDocument) => {
    // Check if the opened document is from the desired folder
    if (isDocumentInEventFolder(document)) {
        // Your logic for when a file from the event folder is opened
        vscode.window.showInformationMessage(`Opened file from event folder: ${path.basename(document.fileName)}`);
    }
});
vscode.workspace.onDidChangeTextDocument((event: vscode.TextDocumentChangeEvent) => {
  const activeEditor = vscode.window.activeTextEditor;

  // Check if there is an active text editor and the document is from the desired folder
  if (activeEditor && isDocumentInEventFolder(activeEditor.document)) {
      const documentText = activeEditor.document.getText();

      // Specify the key sequence to check (e.g., "fn:")
      const keySequence = "fn:";

      // Check if the document text contains the key sequence
      if (documentText.includes(keySequence)) {
          // Notify the user
          vscode.window.showInformationMessage(`Key sequence "${keySequence}" detected in active file.`);
      }
  }
});  


// const provider1 = vscode.languages.registerCompletionItemProvider('yaml', {

//   provideCompletionItems(doc ument: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

//     // a simple completion item which inserts `Hello World!`
//     const simpleCompletion = new vscode.CompletionItem('Hello World!');
//     // a completion item that inserts its text as snippet,
//     // the `insertText`-property is a `SnippetString` which will be
//     // honored by the editor.
//     const snippetCompletion = new vscode.CompletionItem('Good part of the day');
//     snippetCompletion.insertText = new vscode.SnippetString('Good ${1|morning,afternoon,evening|}. It is ${1}, right?');
//     const docs: any = new vscode.MarkdownString("Inserts a snippet that lets you select [link](x.ts).");
//     snippetCompletion.documentation = docs;
//     docs.baseUri = vscode.Uri.parse('http://example.com/a/b/c/');

//     // a completion item that can be accepted by a commit character,
//     // the `commitCharacters`-property is set which means that the completion will
//     // be inserted and then the character will be typed.
//     const commitCharacterCompletion = new vscode.CompletionItem('console');
//     commitCharacterCompletion.commitCharacters = ['.'];
//     commitCharacterCompletion.documentation = new vscode.MarkdownString('Press `.` to get `console.`');
//     // a completion item that retriggers IntelliSense when being accepted,
//     // the `command`-property is set which the editor will execute after 
//     // completion has been inserted. Also, the `insertText` is set so that 
//     // a space is inserted after `new`
//     const commandCompletion = new vscode.CompletionItem('fn:');
//     commandCompletion.kind = vscode.CompletionItemKind.Keyword;
//     commandCompletion.insertText = 'fn: ';
//     commandCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };

//     // return all completion items as array
//     return [
      
//       simpleCompletion,
//       snippetCompletion,
//       commitCharacterCompletion,
//       commandCompletion
//     ];
//   }
// });
// context.subscriptions.push(provider1);
// const completionProvider = vscode.languages.registerCompletionItemProvider(

//   { scheme: 'file', language: '.yaml' }, // Change 'yaml' to the language of your files
//   new MyCompletionItemProvider(),
//   'fn:'
// );

// context.subscriptions.push(completionProvider);
// const nameSuggestionsProvider = vscode.languages.registerCompletionItemProvider(
//   'plaintext',
//   {
//       provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
//           // get all text until the `position`
//           const linePrefix = document.lineAt(position).text.slice(0, position.character);

//           // check if it ends with the trigger string 'names:'
//           if (!linePrefix.endsWith('names:')) {
//               return undefined;
//           }

//           // Provide completion items based on your array
//           const namesArray: string[] = ['Rohit', 'Bhushan', 'Vishal', 'Rituja'];
//           const completionItems: vscode.CompletionItem[] = namesArray.map(name => {
//               const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Text);
//               return item;
//           });

//           return completionItems;
//       }
//   },
//   ':' // triggered whenever a ':' is being typed after 'names'
// );

// context.subscriptions.push(nameSuggestionsProvider);

}
function isDocumentInEventFolder(document: vscode.TextDocument): boolean {
  // Replace 'your-event-folder' with the actual name or path of your event folder
  const eventFolderPath = vscode.workspace.workspaceFolders?.[0]?.uri.path + '/src/events';

  // Check if the document's URI starts with the event folder path
  return !!eventFolderPath && document.uri.path.startsWith(eventFolderPath);
}
// async function getPackageInfo(packageName: string): Promise<any> {
//   const registryUrl = `https://registry.npmjs.org/${packageName}`;
//   const response = await fetch(registryUrl);
//   return await response.json();
//   console.log(response);
// }

  


// This method is called when your extension is deactivated
export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
