const fs = require('fs');

const files = [
  'C:\\images\\nith\\nith-main-frontend\\app\\homepage\\event\\page.tsx',
  'C:\\images\\nith\\nith-main-frontend\\app\\homepage\\academics\\page.tsx',
  'C:\\images\\nith\\nith-main-frontend\\app\\homepage\\admissions\\page.tsx',
  'C:\\images\\nith\\nith-main-frontend\\app\\homepage\\news\\page.tsx',
  'C:\\images\\nith\\nith-main-frontend\\app\\homepage\\achievements\\page.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes('import Link')) {
    content = content.replace("import React", "import Link from 'next/link';\nimport React");
  }

  // Find the list map function
  const regex = /return\s*\(\s*<div\s+key=\{item\.id\}/;
  
  let section = '';
  if (file.includes('event')) section = 'event';
  if (file.includes('academics')) section = 'academics';
  if (file.includes('admissions')) section = 'admissions';
  if (file.includes('news')) section = 'news';
  if (file.includes('achievements')) section = 'achievements';

  content = content.replace(regex, `return (\n                <Link\n                  href={\`/homepage/${section}/\${item.id}\`}\n                  key={item.id}`);

  // Find the closing div of the item
  content = content.replace(/<\/button>\s*<\/div>\s*<\/div>\s*\);\s*\}\)/, `</button>\n                  </div>\n                </Link>\n              );\n            })`);

  // Remove onClick
  content = content.replace(/onClick=\{\(\) => setSelected[a-zA-Z]+\(item\)\}/, '');

  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
}
