import * as fs from "fs";
import { fileURLToPath } from "url";
import * as path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const moduleName = process.argv[2]?.toLowerCase(); // lowercase module name

if (!moduleName) {
  console.error("Please provide a module name");
  process.exit(1);
}

const moduleDir = path.join(__dirname, `../modules/${moduleName}`);

// Create the folder
fs.mkdirSync(moduleDir, { recursive: true });

// Empty files to create
const files = [
  `${moduleName}.controller.ts`,
  `${moduleName}.service.ts`,
  `${moduleName}.router.ts`,
];

// Create each empty file
files.forEach((fileName) => {
  fs.writeFileSync(path.join(moduleDir, fileName), "");
  console.log(`✅ Created ${fileName}`);
});

console.log(`\n🚀 Module "${moduleName}" generated successfully!`);
