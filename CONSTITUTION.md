# Public Release Constitution

## Purpose

This repository exists to publish verifiable public evidence for the Sovereign Economic Defense system without publishing the implementation witness.

## Publish Contract

This repository may publish:

- public proof payloads
- verification keys
- public statement summaries
- deployment manifests
- checksums
- risk-boundary and support documents

This repository may not publish:

- source code
- build recipes tied to private implementation structure
- proving infrastructure
- deployment scripts
- client adapters or key material
- local paths
- machine-environment captures
- runtime control-plane traces
- artifacts that reconstruct the private source layout

## Honesty Boundary

The proofs in this repository show that a verifier-compatible proof payload was produced for the listed program digests and public inputs. They do not disclose the private witness inputs or the private implementation source.

This repository does not claim:

- full public reproducibility of the private build pipeline
- public source availability
- zero-trust elimination of all off-repo trust assumptions

## Fail-Closed Rule

If a document, manifest, or artifact would reveal implementation details or local-environment residue, it must not be published here.
