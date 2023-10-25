# Godspeed Language Tools
Godspeed Language Tools includes VSCode Extension and Language Server for Godspeed Framework's DSL. [Godspeed Framework](https://www.godspeed.systems/) Using these tools, you will have better developer experience with Godspeed Framework's.

![preview](images/godspeed.gif "Installing extension from VSCode marketplace")

## Features
1. Schema based validation & suggestions for `events, workflows and datasources`.
2. JS syntax highlight for inline js in yaml.

## Dependencies
`Godspped Extension` is dependend on [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) and [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) VSCode extensions.

1. Prisma
> Godspeed framework internally utilizes [Prisma ORM](https://www.prisma.io/) to make working with databases easy.

2. YAML
> `events`, `workflows` and `datasources` in Godspeed framework are primararly written in `YAML`. So this extension provides a configurable [language server](https://microsoft.github.io/language-server-protocol/). Godspeed framework utilizes that to provide hover on code, code completion, static code analysis and many more features for better developer experience.

## Contributing
If you are new to VSCode extension development, Refer [VSCode's Extension Development Guide](https://code.visualstudio.com/api/extension-guides/overview)

## Release Notes

### 1.4.0

1. First stable version with code snippets for `godspeed events` and `godspeed workflows`
2. Support for validating `events`and `workflow` DSL

---
