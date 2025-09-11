// scripts/make-bundle.mjs
import fs from "fs/promises";
import path from "path";

const ROOT = process.cwd();
const INCLUDE_EXT = new Set([
  ".ts",".tsx",".js",".jsx",".json",".css",".scss",".sass",".md",".svg",
  ".yml",".yaml",".toml",".mjs",".cjs",".html"
]);
const INCLUDE_PATHS = [
  "src","app","pages","components","public",
  "package.json","tsconfig.json","vite.config.ts","vite.config.js",
  ".env.example","README.md"
];
const EXCLUDE_DIRS = new Set([
  "node_modules",".git","dist","build",".next",".vercel",".vscode","coverage"
]);
const EXCLUDE_FILES = [/\.map$/, /\.lock$/, /\.log$/, /\.(png|jpg|jpeg|webp|mp4|webm|mov|gif)$/i];

const langByExt = (ext) => ({
  ".ts":"ts",".tsx":"tsx",".js":"js",".jsx":"jsx",".json":"json",
  ".css":"css",".scss":"scss",".sass":"sass",".md":"md",".svg":"xml",
  ".yml":"yaml",".yaml":"yaml",".toml":"toml",".mjs":"js",".cjs":"js",".html":"html"
}[ext] || "");

const exists = async p => !!(await fs.stat(p).catch(()=>null));
const shouldIncludeFile = p => {
  const ext = path.extname(p);
  if (!INCLUDE_EXT.has(ext)) return false;
  if (EXCLUDE_FILES.some(r=>r.test(p))) return false;
  return true;
};
const shouldTraverse = (name) => !EXCLUDE_DIRS.has(name);

async function* walk(dir) {
  const items = await fs.readdir(dir, {withFileTypes:true});
  for (const d of items) {
    if (d.isDirectory()) {
      if (shouldTraverse(d.name)) yield* walk(path.join(dir, d.name));
    } else {
      const full = path.join(dir, d.name);
      if (shouldIncludeFile(full)) yield full;
    }
  }
}

// Header
let out = "# Minimoji — Code bundle pour audit\n\n";
out += "## Arborescence (filtrée)\n\n```\n";

// Tree léger
async function printTree(dir, prefix="") {
  const items = (await fs.readdir(dir, {withFileTypes:true}))
    .filter(d => d.name !== "node_modules" && d.name !== ".git" && d.name !== "dist" && d.name !== "build" && d.name !== ".vercel" && d.name !== ".vscode")
    .sort((a,b)=>a.name.localeCompare(b.name));
  for (const d of items) {
    out += `${prefix}${d.name}\n`;
    if (d.isDirectory()) await printTree(path.join(dir, d.name), prefix+"  ");
  }
}
for (const p of INCLUDE_PATHS) {
  if (await exists(path.join(ROOT, p))) {
    out += p + "\n";
    const pAbs = path.join(ROOT, p);
    const stat = await fs.stat(pAbs);
    if (stat.isDirectory()) await printTree(pAbs, "  ");
  }
}
out += "```\n\n## Fichiers\n";

// Contenu fichiers
for (const base of INCLUDE_PATHS) {
  const abs = path.join(ROOT, base);
  if (!(await exists(abs))) continue;
  const st = await fs.stat(abs);
  if (st.isFile() && shouldIncludeFile(abs)) {
    const ext = path.extname(abs); const lang = langByExt(ext);
    const rel = path.relative(ROOT, abs);
    const content = await fs.readFile(abs, "utf8");
    out += `\n\n### ${rel}\n\`\`\`${lang}\n${content}\n\`\`\`\n`;
  } else if (st.isDirectory()) {
    for await (const file of walk(abs)) {
      const rel = path.relative(ROOT, file);
      const ext = path.extname(file); const lang = langByExt(ext);
      const content = await fs.readFile(file, "utf8");
      out += `\n\n### ${rel}\n\`\`\`${lang}\n${content}\n\`\`\`\n`;
    }
  }
}

await fs.writeFile("bundle-minimoji.md", out, "utf8");
console.log("✔ bundle-minimoji.md généré.");
