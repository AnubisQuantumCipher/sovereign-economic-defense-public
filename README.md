# sovereign-economic-defense

Public proof bundles, deployment evidence, and integrity tooling for the Sovereign Economic Defense system.

Built by [AnubisQuantumCipher](https://github.com/AnubisQuantumCipher).

This package is intentionally source-private with respect to the private implementation witness. It ships public manifests, public statements, redacted proof bundles, and a clean CLI for inspecting and extracting that evidence. It does not ship the original implementation source, deployment internals, prover internals, operator profiles, or private runtime traces.

## What This Package Includes

- Five redacted proof bundles under `proofs/zkproofs/`
- Five public statement summaries under `proofs/statements/`
- A sanitized Midnight preprod deployment manifest under `manifests/deployment-manifest.json`
- A public release manifest under `manifests/release-manifest.json`
- Risk-boundary, verification, support, and checksum documents under `evidence/` and `checksums/`
- A CLI for listing components, showing statements, verifying package integrity, and extracting the bundled artifacts

## What This Package Does Not Include

- Circuit or application source code
- Build scripts or reproducible build machinery for the private implementation
- Prover service code or deployment code
- Client integrations, seed material, or operator profiles
- Local filesystem paths, machine-environment captures, or model traces

## Install

```bash
npm install sovereign-economic-defense
```

## Quick Start

List the published components:

```bash
npx sovereign-economic-defense list
```

Show a specific component:

```bash
npx sovereign-economic-defense show anti-extraction-shield
```

Verify the installed package against its bundled checksums:

```bash
npx sovereign-economic-defense verify
```

Extract the packaged evidence bundle into a working directory:

```bash
npx sovereign-economic-defense extract --out ./sed-release
```

## CLI

Every CLI command supports `--json`. In JSON mode, the attribution banner is printed to `stderr` so `stdout` stays machine-readable.

### `list`

```bash
npx sovereign-economic-defense list
npx sovereign-economic-defense list --json
```

### `show`

```bash
npx sovereign-economic-defense show cooperative-treasury-assurance
npx sovereign-economic-defense show recirculation-sovereignty-score --json
```

### `manifest`

```bash
npx sovereign-economic-defense manifest release
npx sovereign-economic-defense manifest deployment --json
npx sovereign-economic-defense manifest proof
```

### `verify`

```bash
npx sovereign-economic-defense verify
npx sovereign-economic-defense verify --json
```

### `extract`

```bash
npx sovereign-economic-defense extract --out ./sed-release
npx sovereign-economic-defense extract --out /tmp/sed-evidence --json
```

## Programmatic API

```ts
import {
  extractArtifacts,
  getComponent,
  getDeploymentManifest,
  getProofBundle,
  getProofManifest,
  getReleaseManifest,
  listComponents,
  verifyPackageIntegrity,
} from 'sovereign-economic-defense';
```

Exported public types include:

- `ReleaseManifest`
- `DeploymentManifest`
- `ProofManifest`
- `StatementManifest`
- `ProofBundle`
- `ComponentRecord`
- `IntegrityReport`
- `ExtractReport`

## Public Scope

This release exposes evidence for five deployed components:

| Component | Proof bundle | Backend | Midnight deployment |
| --- | --- | --- | --- |
| Cooperative Treasury | `cooperative-treasury-assurance.json` | `plonky3` | `cooperative-treasury` |
| Community Land Trust | `community-land-trust-governance.json` | `plonky3` | `community-land-trust` |
| Anti-Extraction Shield | `anti-extraction-shield.json` | `arkworks-groth16` | `anti-extraction-shield` |
| Wealth Trajectory | `wealth-trajectory-assurance.json` | `plonky3` | `wealth-trajectory` |
| Sovereignty Score | `recirculation-sovereignty-score.json` | `plonky3` | `sovereignty-score` |

## Release Position

This is an evidence release, not an open-source implementation release. The proofs and verification keys are public. The implementation witness remains private.

Read these first:

- `CONSTITUTION.md`
- `evidence/public-risk-boundary.md`
- `evidence/verification-ceremony.md`
- `evidence/no-source-support-policy.md`

## Verification Notes

The proof bundles in `proofs/zkproofs/` contain only:

- backend identifier
- program digest
- public inputs
- hex-wrapped verification-key payload
- hex-wrapped proof payload

All implementation-facing metadata was removed before publication.

## Development

```bash
npm install
npm run build
npm test
```
