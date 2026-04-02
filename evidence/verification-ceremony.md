# Verification Ceremony

## Scope

This public release was assembled on April 2, 2026 from a private proving run finalized on March 30, 2026 and a Midnight preprod deployment manifest finalized on March 31, 2026.

## Included Public Evidence

- one sanitized proof bundle per component
- one public statement summary per component
- one sanitized deployment manifest for five Midnight preprod transactions
- one checksum list covering the published tree

## Redaction Rules Applied

- removed implementation-facing runtime metadata
- removed local filesystem paths
- removed machine-environment captures
- removed control-plane and model traces
- removed deployment and proving automation
- removed all source trees

## Result

The published proof bundles preserve the proof payload, verification key, program digest, and public inputs. The implementation witness stays private.
