import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const includedEntries = [
  'package.json',
  'README.md',
  'LICENSE',
  'CONSTITUTION.md',
  'dist',
  'manifests',
  'proofs',
  'evidence',
];

async function collectFiles(entryPath) {
  const absolutePath = path.join(root, entryPath);
  const stats = await import('node:fs/promises').then(({ stat }) => stat(absolutePath));

  if (stats.isFile()) {
    return [entryPath];
  }

  const entries = await readdir(absolutePath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relativePath = path.join(entryPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(relativePath)));
    } else if (entry.isFile()) {
      files.push(relativePath);
    }
  }

  return files;
}

async function sha256(relativePath) {
  const content = await readFile(path.join(root, relativePath));
  return createHash('sha256').update(content).digest('hex');
}

const files = [];
for (const entry of includedEntries) {
  files.push(...(await collectFiles(entry)));
}

files.sort();

const output = files
  .filter((relativePath) => relativePath !== 'checksums/sha256.txt')
  .map(async (relativePath) => `${await sha256(relativePath)}  ${relativePath}`);

await writeFile(
  path.join(root, 'checksums', 'sha256.txt'),
  `${(await Promise.all(output)).join('\n')}\n`,
  'utf8',
);
