import { describe, expect, test } from 'vitest';

import { verifyPackageIntegrity } from '../src/index.js';

describe('integrity verification', () => {
  test('verifies the bundled checksums', async () => {
    const report = await verifyPackageIntegrity();
    expect(report.ok).toBe(true);
    expect(report.checkedFiles).toBeGreaterThan(0);
    expect(report.mismatches).toHaveLength(0);
  });
});
