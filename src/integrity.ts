import { readFile } from 'node:fs/promises';

import type { IntegrityFailure, IntegrityReport } from './types.js';
import { resolveFromRoot, sha256File } from './util.js';

function parseChecksums(raw: string): Array<{ digest: string; relativePath: string }> {
  return raw
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [digest, relativePath] = line.split(/\s{2,}/);
      if (!digest || !relativePath) {
        throw new Error(`Malformed checksum line: ${line}`);
      }
      return { digest, relativePath };
    });
}

export async function verifyPackageIntegrity(): Promise<IntegrityReport> {
  const checksumPath = resolveFromRoot('checksums', 'sha256.txt');
  const checksums = parseChecksums(await readFile(checksumPath, 'utf8'));
  const mismatches: IntegrityFailure[] = [];
  const missingFiles: string[] = [];

  for (const entry of checksums) {
    try {
      const actual = await sha256File(resolveFromRoot(entry.relativePath));
      if (actual !== entry.digest) {
        mismatches.push({
          path: entry.relativePath,
          expected: entry.digest,
          actual,
        });
      }
    } catch {
      missingFiles.push(entry.relativePath);
      mismatches.push({
        path: entry.relativePath,
        expected: entry.digest,
        actual: null,
      });
    }
  }

  return {
    ok: mismatches.length === 0 && missingFiles.length === 0,
    checkedFiles: checksums.length,
    missingFiles,
    mismatches,
  };
}
