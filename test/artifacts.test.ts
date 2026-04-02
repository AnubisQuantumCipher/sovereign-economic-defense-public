import { describe, expect, test } from 'vitest';

import {
  getComponent,
  getDeploymentManifest,
  getProofBundle,
  getProofManifest,
  getReleaseManifest,
  listComponents,
} from '../src/index.js';

describe('artifact access', () => {
  test('loads the top-level manifests', async () => {
    const [releaseManifest, deploymentManifest, proofManifest] = await Promise.all([
      getReleaseManifest(),
      getDeploymentManifest(),
      getProofManifest(),
    ]);

    expect(releaseManifest.name).toBe('sovereign-economic-defense-public');
    expect(deploymentManifest.network).toBe('preprod');
    expect(proofManifest.components).toHaveLength(5);
  });

  test('lists the five published components', async () => {
    const components = await listComponents();
    expect(components).toHaveLength(5);
    expect(components.map((component) => component.component)).toContain('anti-extraction-shield');
  });

  test('loads a component summary and proof bundle', async () => {
    const component = await getComponent('anti-extraction-shield');
    const bundle = await getProofBundle('anti-extraction-shield');

    expect(component.deploymentContract).toBe('anti-extraction-shield');
    expect(bundle.backend).toBe('arkworks-groth16');
    expect(bundle.proof_encoding).toBe('hex-utf8');
    expect(bundle.verification_key_hex.length).toBeGreaterThan(0);
  });
});
