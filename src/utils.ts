/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from "vscode";

const showDialog = vscode.window.showInformationMessage;

const defaultLanguageSettings = {
  "yaml.schemas": {
    "https://raw.githubusercontent.com/ashu17706/godspeed-vscode-extension-pack/main/schemas/events.json":
      "src/events/**/*.yaml",
    "https://raw.githubusercontent.com/ashu17706/godspeed-vscode-extension-pack/main/schemas/workflow.json":
      "src/functions/**/*.yaml",
  },
};

export const installYAMLConfigurations = (context: vscode.ExtensionContext) => {
  Object.keys(defaultLanguageSettings).forEach(async (key) => {
    const value =
      defaultLanguageSettings[key as keyof typeof defaultLanguageSettings];
    await vscode.workspace
      .getConfiguration()
      .update(key, value, vscode.ConfigurationTarget.Workspace);
  });

  showDialog("Godspeed YAML's grammer installed successfully!");
};
