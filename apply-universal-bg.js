const fs = require('fs');
const path = 'app/page.tsx';
let code = fs.readFileSync(path, 'utf8');

// 1. Move gradient to main wrapper
code = code.replace(
  '<main className="min-h-screen overflow-x-hidden w-full relative">',
  `<main className="min-h-screen overflow-x-hidden w-full relative">
      {/* Global Universal Background */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 30%, #f9fafb 70%, #f4fbf6 100%)"
        }}
      />
      {/* Global Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: \`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")\`
        }}
      />`
);

// Fallback if the previous main line wasn't exactly what was above (it might just be min-h-screen bg-white now?)
// Actually it is `<main className="min-h-screen overflow-x-hidden w-full relative">` because of my previous replace! wait, I never replaced `bg-white` in `main`.
// Let's just do a smarter replace.
code = code.replace(
  /<main className="min-h-screen(.*?)w-full">/,
  `<main className="min-h-screen overflow-x-hidden w-full relative">
      {/* Global Universal Background */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 30%, #f9fafb 70%, #f4fbf6 100%)"
        }}
      />
      {/* Global Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: \`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")\`
        }}
      />`
);

// Remove the Hero section's background overrides to prevent double rendering
code = code.replace(/\{\/\*\s*Background\s*\*\/\}\s*<div\s*className="absolute inset-0"\s*style=\{\{\s*background:\s*"[^"]*"\s*\}\}\s*\/>/, '');
code = code.replace(/\{\/\*\s*Grid Pattern Overlay\s*\*\/\}\s*<div\s*className="absolute inset-0 opacity-\[0.03\]"\s*style=\{\{\s*backgroundImage:\s*`url\([^`]*\)`\s*\}\}\s*\/>/, '');

// Make all main white/grey sections transparent
code = code.replace(/<section([^>]*)className="([^"]*)bg-white([^"]*)"/g, '<section$1className="$2$3"');
code = code.replace(/<section([^>]*)className="([^"]*)bg-\[#F9FAFB\]([^"]*)"/g, '<section$1className="$2$3"');
code = code.replace(/<section([^>]*)className="([^"]*)bg-\[#F9FAFB\]\/50([^"]*)"/g, '<section$1className="$2$3"');

// Clean up double spaces from empty classnames
code = code.replace(/className="\s+/g, 'className="');
code = code.replace(/\s+"/g, '"');

fs.writeFileSync(path, code);
console.log('Done!');
