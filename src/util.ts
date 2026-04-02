import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function candidateRoots(moduleDir: string): string[] {
  return [
    path.resolve(moduleDir, '..', '..'),
    path.resolve(moduleDir, '..'),
    path.resolve(moduleDir, '..', '..', '..'),
  ];
}

export function getPackageRoot(): string {
  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  for (const candidate of candidateRoots(moduleDir)) {
    if (
      existsSync(path.join(candidate, 'package.json')) &&
      existsSync(path.join(candidate, 'manifests', 'release-manifest.json'))
    ) {
      return candidate;
    }
  }

  throw new Error('Unable to locate the sovereign-economic-defense package root.');
}

export function resolveFromRoot(...segments: string[]): string {
  return path.join(getPackageRoot(), ...segments);
}

export async function readJsonFile<T>(filePath: string): Promise<T> {
  const raw = await readFile(filePath, 'utf8');
  return JSON.parse(raw) as T;
}

export async function sha256File(filePath: string): Promise<string> {
  const content = await readFile(filePath);
  return createHash('sha256').update(content).digest('hex');
}

export async function ensureDir(dirPath: string): Promise<void> {
  await mkdir(dirPath, { recursive: true });
}

export function formatJson(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`;
}
