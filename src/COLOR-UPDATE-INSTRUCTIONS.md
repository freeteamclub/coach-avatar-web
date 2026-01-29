# Color Update Instructions

## Automatic Color Replacement

This project needs to replace all blue colors with green colors throughout the codebase.

### Option 1: Using Python Script

```bash
python3 update-colors.py
```

### Option 2: Using Shell Script

```bash
chmod +x replace-colors.sh
./replace-colors.sh
```

### Option 3: Manual Find & Replace

Use your IDE's find-and-replace feature across all `.tsx` files in the `/components` directory:

Replace these patterns:

- `bg-blue-600` → `bg-green-600`
- `bg-blue-700` → `bg-green-700`
- `bg-blue-50` → `bg-green-50`
- `bg-blue-100` → `bg-green-100`
- `bg-blue-200` → `bg-green-200`
- `text-blue-600` → `text-green-600`
- `text-blue-700` → `text-green-700`
- `border-blue-600` → `border-green-600`
- `border-blue-200` → `border-green-200`
- `border-blue-300` → `border-green-300`
- `border-blue-400` → `border-green-400`
- `hover:bg-blue-700` → `hover:bg-green-700`
- `hover:bg-blue-50` → `hover:bg-green-50`
- `hover:text-blue-600` → `hover:text-green-600`
- `hover:text-blue-700` → `hover:text-green-700`
- `hover:text-blue-900` → `hover:text-green-900`
- `hover:border-blue-400` → `hover:border-green-400`
- `from-blue-600` → `from-green-600`
- `to-indigo-600` → `to-emerald-600`
- `from-blue-50` → `from-green-50`
- `to-indigo-50` → `to-emerald-50`
- `border-l-blue-600` → `border-l-green-600`

### Files to Update

All `.tsx` files in:

- `/components/onboarding/`
- `/components/dashboard/`
- `/components/`

## Verification

After running the replacement, verify that:

1. All primary action buttons are green
2. Progress bars are green
3. Active states are green
4. Links and highlights are green
5. Gradients use green-to-emerald instead of blue-to-indigo

The design should maintain the same structure with green as the primary color instead of blue.