#!/bin/sh
# Patches storybook-framework-redwoodjs-vite ESM extensionless imports
# This is needed because the package uses "type": "module" with extensionless
# relative imports, which Node 20's strict ESM resolver rejects when loaded
# via require() by Storybook v7's CJS CLI.

pkg="node_modules/storybook-framework-redwoodjs-vite"

if [ ! -d "$pkg" ]; then
  exit 0
fi

# Top-level entry points
sed -i 's|from "./dist/preset"|from "./dist/preset.js"|' "$pkg/preset.js"
sed -i 's|from "./dist/index"|from "./dist/index.js"|' "$pkg/index.js" 2>/dev/null
sed -i 's|from "./dist/preview"|from "./dist/preview.js"|' "$pkg/preview.js" 2>/dev/null

# dist/preset.js
sed -i 's|from "./plugins/auto-imports"|from "./plugins/auto-imports.js"|' "$pkg/dist/preset.js"
sed -i 's|from "./plugins/mock-auth"|from "./plugins/mock-auth.js"|' "$pkg/dist/preset.js"
sed -i 's|from "./plugins/mock-router"|from "./plugins/mock-router.js"|' "$pkg/dist/preset.js"
sed -i 's|from "./plugins/react-docgen"|from "./plugins/react-docgen.js"|' "$pkg/dist/preset.js"

# dist/plugins/react-docgen.js
sed -i 's|from "./docgen-handlers/actualNameHandler"|from "./docgen-handlers/actualNameHandler.js"|' "$pkg/dist/plugins/react-docgen.js"

# dist/preview.js
sed -i 's|from "./mocks/StorybookProvider"|from "./mocks/StorybookProvider.js"|' "$pkg/dist/preview.js"

# dist/index.js
sed -i 's|from "./types"|from "./types.js"|' "$pkg/dist/index.js"

# dist/mocks
sed -i 's|from "./MockParamsProvider"|from "./MockParamsProvider.js"|' "$pkg/dist/mocks/MockProviders.js"
sed -i 's|from "./MockProviders"|from "./MockProviders.js"|' "$pkg/dist/mocks/StorybookProvider.js"
