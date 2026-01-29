#!/bin/bash

# Replace all blue colors with green colors in TSX files

find . -name "*.tsx" -type f -exec sed -i '' \
  -e 's/bg-blue-600/bg-green-600/g' \
  -e 's/bg-blue-700/bg-green-700/g' \
  -e 's/bg-blue-800/bg-green-800/g' \
  -e 's/bg-blue-500/bg-green-500/g' \
  -e 's/bg-blue-50/bg-green-50/g' \
  -e 's/bg-blue-100/bg-green-100/g' \
  -e 's/bg-blue-200/bg-green-200/g' \
  -e 's/text-blue-600/text-green-600/g' \
  -e 's/text-blue-700/text-green-700/g' \
  -e 's/text-blue-900/text-green-900/g' \
  -e 's/text-blue-100/text-green-100/g' \
  -e 's/border-blue-600/border-green-600/g' \
  -e 's/border-blue-200/border-green-200/g' \
  -e 's/border-blue-300/border-green-300/g' \
  -e 's/border-blue-400/border-green-400/g' \
  -e 's/hover:bg-blue-700/hover:bg-green-700/g' \
  -e 's/hover:bg-blue-800/hover:bg-green-800/g' \
  -e 's/hover:bg-blue-50/hover:bg-green-50/g' \
  -e 's/hover:text-blue-600/hover:text-green-600/g' \
  -e 's/hover:text-blue-700/hover:text-green-700/g' \
  -e 's/hover:text-blue-900/hover:text-green-900/g' \
  -e 's/hover:border-blue-400/hover:border-green-400/g' \
  -e 's/hover:border-blue-300/hover:border-green-300/g' \
  -e 's/from-blue-600/from-green-600/g' \
  -e 's/to-indigo-600/to-emerald-600/g' \
  -e 's/from-blue-50/from-green-50/g' \
  -e 's/to-indigo-50/to-emerald-50/g' \
  -e 's/border-l-blue-600/border-l-green-600/g' \
  {} \;

echo "Color replacement complete!"
