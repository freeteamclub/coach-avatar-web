#!/usr/bin/env python3
import os
import re

# Color mappings from blue to green
replacements = {
    'bg-blue-600': 'bg-green-600',
    'bg-blue-700': 'bg-green-700',
    'bg-blue-800': 'bg-green-800',
    'bg-blue-500': 'bg-green-500',
    'bg-blue-50': 'bg-green-50',
    'bg-blue-100': 'bg-green-100',
    'bg-blue-200': 'bg-green-200',
    'text-blue-600': 'text-green-600',
    'text-blue-700': 'text-green-700',
    'text-blue-900': 'text-green-900',
    'text-blue-100': 'text-green-100',
    'border-blue-600': 'border-green-600',
    'border-blue-200': 'border-green-200',
    'border-blue-300': 'border-green-300',
    'border-blue-400': 'border-green-400',
    'hover:bg-blue-700': 'hover:bg-green-700',
    'hover:bg-blue-800': 'hover:bg-green-800',
    'hover:bg-blue-50': 'hover:bg-green-50',
    'hover:text-blue-600': 'hover:text-green-600',
    'hover:text-blue-700': 'hover:text-green-700',
    'hover:text-blue-900': 'hover:text-green-900',
    'hover:border-blue-400': 'hover:border-green-400',
    'hover:border-blue-300': 'hover:border-green-300',
    'from-blue-600': 'from-green-600',
    'to-indigo-600': 'to-emerald-600',
    'from-blue-50': 'from-green-50',
    'to-indigo-50': 'to-emerald-50',
    'border-l-blue-600': 'border-l-green-600',
}

def replace_colors_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    for old, new in replacements.items():
        content = content.replace(old, new)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filepath}")
        return True
    return False

def main():
    updated_count = 0
    for root, dirs, files in os.walk('./components'):
        for file in files:
            if file.endswith('.tsx'):
                filepath = os.path.join(root, file)
                if replace_colors_in_file(filepath):
                    updated_count += 1
    
    print(f"\nTotal files updated: {updated_count}")

if __name__ == "__main__":
    main()
