import { cp } from 'node:fs/promises';
import path from 'node:path';

import type {
  ComponentRecord,
  DeploymentManifest,
  ExtractReport,
  ProofBundle,
  ProofManifest,
  ReleaseManifest,
  StatementManifest,
} from './types.js';
import { ensureDir, getPackageRoot, readJsonFile, resolveFromRoot } from './util.js';

const TOP_LEVEL_ARTIFACTS = [
  'CONSTITUTION.md',
  'LICENSE',
  'README.md',
  'manifests',
  'proofs',
  'evidence',
  'checksums',
] as const;

export async function getReleaseManifest(): Promise<ReleaseManifest> {
  return readJsonFile<ReleaseManifest>(resolveFromRoot('manifests', 'release-manifest.json'));
}

export async function getDeploymentManifest(): Promise<DeploymentManifest> {
  return readJsonFile<DeploymentManifest>(resolveFromRoot('manifests', 'deployment-manifest.json'));
}

export async function getProofManifest(): Promise<ProofManifest> {
  return readJsonFile<ProofManifest>(resolveFromRoot('manifests', 'proof-manifest.json'));
}

export async function getStatement(component: string): Promise<StatementManifest> {
  return readJsonFile<StatementManifest>(resolveFromRoot('proofs', 'statements', `${component}.json`));
}

export async function getProofBundle(component: string): Promise<ProofBundle> {
  return readJsonFile<ProofBundle>(resolveFromRoot('proofs', 'zkproofs', `${component}.json`));
}

export async function listComponents(): Promise<ComponentRecord[]> {
  const [proofManifest, deploymentManifest] = await Promise.all([
    getProofManifest(),
    getDeploymentManifest(),
  ]);

  return proofManifest.components.map((component) => {
    const deployment = deploymentManifest.contracts.find(
      (contract) => contract.name === component.deployment_contract,
    );

    if (!deployment) {
      throw new Error(`Missing deployment record for ${component.component}.`);
    }

    return {
      component: component.component,
      title: component.title,
      backend: component.backend,
      programDigest: component.program_digest,
      publicInputs: component.public_inputs,
      deploymentContract: deployment.name,
      deploymentAddress: deployment.address,
      deploymentTxHash: deployment.txHash,
      explorerUrl: deployment.explorerUrl,
      proofBundlePath: component.proof_bundle,
      statementPath: component.statement,
      proofSha256: component.proof_sha256,
      verificationKeySha256: component.verification_key_sha256,
    };
  });
}

export async function getComponent(componentName: string): Promise<ComponentRecord> {
  const components = await listComponents();
  const component = components.find((entry) => entry.component === componentName);
  if (!component) {
    const available = components.map((entry) => entry.component).join(', ');
    throw new Error(`Unknown component '${componentName}'. Available: ${available}`);
  }
  return component;
}

export function getArtifactRoot(): string {
  return getPackageRoot();
}

export async function extractArtifacts(outDir: string): Promise<ExtractReport> {
  await ensureDir(outDir);
  const root = getPackageRoot();

  for (const entry of TOP_LEVEL_ARTIFACTS) {
    await cp(path.join(root, entry), path.join(outDir, entry), { recursive: true });
  }

  return {
    outDir,
    copied: [...TOP_LEVEL_ARTIFACTS],
  };
}
