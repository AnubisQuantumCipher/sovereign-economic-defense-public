# Public Risk Boundary

## What The Public Artifacts Support

- A proof payload exists for each listed component.
- Each proof payload is bound to a published program digest.
- Each proof payload is paired with published public inputs.
- Five related components were deployed to Midnight preprod, with transaction evidence published in the deployment manifest.

## What The Public Artifacts Do Not Support

- Inspection of the private implementation source
- Reproduction of the private proving pipeline from this repository alone
- Recovery of any private witness data
- Inference of local operator setup or private infrastructure layout

## Trust Notes

Verification of these payloads depends on a verifier compatible with the listed backend and verification-key format. This repository ships the proof material and evidence documents, not a standalone verifier binary.
