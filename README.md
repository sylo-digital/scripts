# scripts

Shared configurations used across our projects.

```
pnpm install @sylo-digital/scripts@latest -D
```

For a monorepo, add this to `.vscode/settings.json` or else eslint will helpfully silently fail in the background.

```json
{
  "eslint.workingDirectories": [
    {
      "pattern": "./{packages,apps}/*"
    }
  ]
}
```
