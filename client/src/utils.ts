/* eslint-disable @typescript-eslint/naming-convention */
import path = require("path");
import * as vscode from "vscode";

const showDialog = vscode.window.showInformationMessage;

const isDevMode = (context: vscode.ExtensionContext) => {
  return context.extensionMode === vscode.ExtensionMode.Development
    ? true
    : false;
};

const getDefaultSettings = (context: vscode.ExtensionContext) => {
  if (isDevMode(context)) {
    let schemaFolderPath = path.join(context.extensionPath, "/schemas/");

    const mappings = [
      { schemaFile: "events.json", globPattern: "src/events/**/*.yaml" },
      { schemaFile: "workflow.json", globPattern: "src/functions/**/*.yaml" },
      {
        schemaFile: "datasource.json",
        globPattern: "src/datasources/**/*.yaml",
      },
    ];

    return {
      "yaml.schemas": {
        ...mappings.reduce((acc: { [key: string]: string }, mapping) => {
          let key = path.join(schemaFolderPath, mapping.schemaFile);
          let value = mapping.globPattern;
          acc[key] = value;
          return acc;
        }, {}),
      },
    };
  } else {
    return {
      "yaml.schemas": {
        "https://raw.githubusercontent.com/ashu17706/godspeed-vscode-extension-pack/main/schemas/events.json": "src/events/**/*.yaml",
        "https://raw.githubusercontent.com/ashu17706/godspeed-vscode-extension-pack/main/schemas/workflow.json": "src/functions/**/*.yaml"
      },
    };
  }
};

export const installYAMLConfigurations = (context: vscode.ExtensionContext) => {
  const defaultLanguageSettings = getDefaultSettings(context);
  Object.keys(defaultLanguageSettings).forEach(async (key) => {
    const value =
      defaultLanguageSettings[key as keyof typeof defaultLanguageSettings];
    await vscode.workspace
      .getConfiguration()
      .update(key, value, vscode.ConfigurationTarget.Workspace);
  });

  showDialog("Godspeed YAML's grammer installed successfully!");
};
