# Sovereign Economic Defense

Artifact-only public release for the Sovereign Economic Defense system.

This repository is intentionally source-private. It publishes public proof payloads, verification keys, statement summaries, deployment evidence, and release-boundary documents. It does not publish implementation source, proving infrastructure, deployment automation, client adapters, operator environments, or internal runtime traces.

## What This Release Includes

- Five redacted proof bundles under `proofs/zkproofs/`
- Five public statement summaries under `proofs/statements/`
- A sanitized Midnight preprod deployment manifest under `manifests/deployment-manifest.json`
- A public release manifest under `manifests/release-manifest.json`
- Risk-boundary, verification, support, and checksum documents under `evidence/` and `checksums/`

## What This Release Does Not Include

- Circuit or application source code
- Build scripts or reproducible build machinery
- Prover service code or deployment code
- Client integrations, seed material, or operator profiles
- Local filesystem paths, machine-environment captures, or model/control-plane traces

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

## Midnight Deployment Evidence

The sanitized deployment manifest records five Midnight preprod transactions dated March 31, 2026. Explorer links are preserved in `manifests/deployment-manifest.json`.

## Verification Notes

The proof bundles in `proofs/zkproofs/` contain only:

- backend identifier
- program digest
- public inputs
- hex-wrapped verification-key payload
- hex-wrapped proof payload

All implementation-facing metadata was removed before publication.
