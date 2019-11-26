# ¡Cinco Minutos!
Coming soon

### Dev note
There's no need to alias Preact to React until building for production.

In `package.json` (when building for production):
```json
{
  "alias": {
    "react": "preact/compat",
    "react-dom/test-utils": "preact/test-utils",
    "react-dom": "preact/compat"
  }
}