export interface ReleaseManifestComponent {
  component: string;
  title: string;
  backend: string;
  program_digest: string;
  proof_bundle: string;
  statement: string;
  deployment_contract: string;
  deployment_tx_hash: string;
  proof_encoding: string;
  verification_key_encoding: string;
}

export interface ReleaseManifest {
  schema: string;
  name: string;
  version: string;
  created: string;
  releaseType: string;
  sourceVisibility: string;
  includesSourceCode: boolean;
  includesRuntimeMetadata: boolean;
  includesLocalPaths: boolean;
  proofRunDate: string;
  deploymentDate: string;
  materials: string[];
  components: ReleaseManifestComponent[];
}

export interface DeploymentContract {
  name: string;
  address: string;
  txHash: string;
  deployedAt: string;
  explorerUrl: string;
}

export interface DeploymentManifest {
  schema: string;
  network: string;
  networkName: string;
  deployedAt: string;
  updatedAt: string;
  contracts: DeploymentContract[];
}

export interface ProofManifestComponent {
  component: string;
  title: string;
  backend: string;
  program_digest: string;
  public_inputs: string[];
  proof_sha256: string;
  verification_key_sha256: string;
  proof_bundle: string;
  statement: string;
  deployment_contract: string;
  deployment_tx_hash: string;
  proof_encoding: string;
  verification_key_encoding: string;
}

export interface ProofManifest {
  schema: string;
  proofRunDate: string;
  components: ProofManifestComponent[];
}

export interface StatementManifest {
  schema: string;
  statement_id: string;
  title: string;
  claim: string;
  backend: string;
  program_digest: string;
  public_inputs: string[];
  deployment: {
    contract: string;
    address: string;
    txHash: string;
    explorerUrl: string;
  };
  published_artifacts: {
    proof_bundle: string;
  };
  notes: string[];
}

export interface ProofBundle {
  schema: string;
  component: string;
  title: string;
  backend: string;
  program_digest: string;
  public_inputs: string[];
  verification_key_sha256: string;
  verification_key_encoding: string;
  verification_key_hex: string;
  proof_sha256: string;
  proof_encoding: string;
  proof_hex: string;
}

export interface ComponentRecord {
  component: string;
  title: string;
  backend: string;
  programDigest: string;
  publicInputs: string[];
  deploymentContract: string;
  deploymentAddress: string;
  deploymentTxHash: string;
  explorerUrl: string;
  proofBundlePath: string;
  statementPath: string;
  proofSha256: string;
  verificationKeySha256: string;
}

export interface IntegrityFailure {
  path: string;
  expected: string;
  actual: string | null;
}

export interface IntegrityReport {
  ok: boolean;
  checkedFiles: number;
  missingFiles: string[];
  mismatches: IntegrityFailure[];
}

export interface ExtractReport {
  outDir: string;
  copied: string[];
}
