import { access } from 'node:fs/promises';
import path from 'node:path';

import { afterEach, describe, expect, test } from 'vitest';

import { extractArtifacts } from '../src/index.js';
import { makeTempDir, removeDir } from './helpers.js';

describe('artifact extraction', () => {
  const createdDirs: string[] = [];

  afterEach(async () => {
    await Promise.all(createdDirs.splice(0).map((dirPath) => removeDir(dirPath)));
  });

  test('copies the packaged artifacts into a target directory', async () => {
    const outDir = await makeTempDir('sed-public-');
    createdDirs.push(outDir);

    const report = await extractArtifacts(outDir);

    expect(report.copied).toContain('proofs');
    await expect(access(path.join(outDir, 'manifests', 'release-manifest.json'))).resolves.toBeUndefined();
    await expect(access(path.join(outDir, 'proofs', 'zkproofs', 'anti-extraction-shield.json'))).resolves.toBeUndefined();
  });
});
