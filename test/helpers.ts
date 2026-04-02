import path from 'node:path';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';

export async function makeTempDir(prefix: string): Promise<string> {
  return mkdtemp(path.join(tmpdir(), prefix));
}

export async function removeDir(dirPath: string): Promise<void> {
  await rm(dirPath, { recursive: true, force: true });
}
