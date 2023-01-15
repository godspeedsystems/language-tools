# Godspeed Extension Pack
Godspped Extension Pack, is set of VSCode extensions, which helps you develop micro-services with [Godspeed Framework](https://www.godspeed.systems/) faster and better.

![preview](images/godspeed.gif "Using the extension")

## Features
1. Code snippets for `events` and `workflow`.
2. YAML validation for `events` `workflow` and `datasources`

## How to use snippets?
`godspeed event`
> Once in an event file, Just type `godspeed event` to autofill the event.

`godspeed workflow`
> Once in an workflow file, Just type `godspeed workflow` to autofill the basic workflow.

## How to use validation?
> Extension will auto activate validation for `event`, `workflow` and `datasources`. In case of missing props, it will give an error on the parent node.

## Dependencies
`Godspped Extension Pack` is dependend on [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) and [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) VSCode extensions.

1. Prisma
> Godspeed framework internally utilizes [Prisma ORM](https://www.prisma.io/) to make working with databases easy.

2. YAML
> `events`, `workflows` and `datasources` in Godspeed framework are primararly written in `YAML`. So this extension provides a configurable [language server](https://microsoft.github.io/language-server-protocol/). Godspeed framework utilizes that to provide hover on code, code completion, static code analysis and many more features for better developer experience.


## Release Notes

### 1.4.0

1. First stable version with code snippets for `godspeed events` and `godspeed workflows`
2. Support for validating `events`and `workflow` DSL

---

**Happy development with Godspeed!**
