import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";

const dir = "C:/Users/Dave/OneDrive/Documents/Projects/SAAS_E-COMMERCE/NewApp/src";
const extensions = new Set([".tsx", ".ts", ".css"]);

const replacements = [
  // Multi-word first (avoid partial matches)
  ["var(--color-primary-hover)", "var(--color-ink-hover)"],
  ["var(--color-primary-active)", "var(--color-ink-active)"],
  ["var(--color-secondary-hover)", "var(--color-amber-hover)"],
  ["var(--color-secondary-active)", "var(--color-amber-active)"],
  ["var(--color-accent-soft)", "rgba(245, 158, 11, 0.12)"],
  ["var(--color-navy-dark)", "var(--color-ink)"],
  ["var(--color-navy)", "var(--color-ink-hover)"],
  ["var(--color-blue-mid)", "var(--color-amber)"],
  ["var(--gradient-brand-dark)", "var(--color-ink)"],
  ["var(--gradient-primary)", "var(--color-ink)"],
  ["var(--gradient-dark)", "var(--color-ink)"],
  ["var(--gradient-glow)", "var(--color-amber)"],
  ["var(--gradient-surface)", "var(--color-surface)"],
  ["var(--bg-page)", "var(--color-ground)"],
  ["var(--bg-header)", "var(--color-ink)"],
  ["var(--bg-sidebar-header)", "var(--color-ink)"],
  ["var(--bg-sidebar)", "var(--color-ink)"],
  ["var(--bg-glass)", "rgba(255, 255, 255, 0.04)"],
  ["var(--border-color-strong)", "var(--color-border-strong)"],
  ["var(--font-family)", "var(--font-body)"],
  ["var(--bg-muted)", "var(--color-ground)"],
  ["var(--accent)", "var(--color-amber)"],

  // Simple single-word (do these last)
  ["var(--color-primary)", "var(--color-ink)"],
  ["var(--color-secondary)", "var(--color-amber)"],
  ["var(--color-accent)", "var(--color-amber)"],
  ["var(--bg-surface-alt)", "var(--color-surface-alt)"],
  ["var(--bg-surface)", "var(--color-surface)"],
  ["var(--text-primary)", "var(--color-text-primary)"],
  ["var(--text-secondary)", "var(--color-text-secondary)"],
  ["var(--text-muted)", "var(--color-text-muted)"],
  ["var(--text-inverse)", "var(--color-text-inverse)"],
  ["var(--border-color)", "var(--color-border)"],
  ["var(--success)", "var(--color-success)"],
  ["var(--warning)", "var(--color-warning)"],
  ["var(--error)", "var(--color-error)"],
  ["var(--info)", "var(--color-info)"],
];

function walk(dirPath) {
  const files = [];
  for (const entry of readdirSync(dirPath)) {
    const full = join(dirPath, entry);
    if (statSync(full).isDirectory()) {
      if (entry !== "node_modules" && entry !== "dist") {
        files.push(...walk(full));
      }
    } else if (extensions.has(extname(full))) {
      files.push(full);
    }
  }
  return files;
}

const files = walk(dir);
let totalChanges = 0;
let changedFiles = 0;

for (const file of files) {
  let content;
  try {
    content = readFileSync(file, "utf8");
  } catch {
    continue;
  }

  let modified = content;
  let fileChanges = 0;

  for (const [oldStr, newStr] of replacements) {
    const re = new RegExp(oldStr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    const count = (modified.match(re) || []).length;
    if (count > 0) {
      modified = modified.replace(re, newStr);
      fileChanges += count;
    }
  }

  if (fileChanges > 0) {
    writeFileSync(file, modified, "utf8");
    totalChanges += fileChanges;
    changedFiles++;
    console.log(`${fileChanges.toString().padStart(3)} changes  → ${file}`);
  }
}

console.log(`\nDone! ${totalChanges} changes across ${changedFiles} files.`);
