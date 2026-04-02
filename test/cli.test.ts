import { describe, expect, test } from 'vitest';

import { runCli } from '../src/cli-core.js';

function makeIo() {
  const stdout: string[] = [];
  const stderr: string[] = [];

  return {
    io: {
      cwd: process.cwd(),
      stdout: (text: string) => {
        stdout.push(text);
      },
      stderr: (text: string) => {
        stderr.push(text);
      },
    },
    stdout,
    stderr,
  };
}

describe('cli', () => {
  test('prints the banner to stdout in normal mode', async () => {
    const { io, stdout, stderr } = makeIo();
    const code = await runCli(['list'], io);

    expect(code).toBe(0);
    expect(stdout.join('')).toContain('Built by AnubisQuantumCipher');
    expect(stderr.join('')).toBe('');
  });

  test('prints the banner to stderr in json mode', async () => {
    const { io, stdout, stderr } = makeIo();
    const code = await runCli(['list', '--json'], io);

    expect(code).toBe(0);
    expect(stderr.join('')).toContain('Built by AnubisQuantumCipher');
    expect(() => JSON.parse(stdout.join(''))).not.toThrow();
  });

  test('shows a component summary', async () => {
    const { io, stdout } = makeIo();
    const code = await runCli(['show', 'anti-extraction-shield'], io);

    expect(code).toBe(0);
    expect(stdout.join('')).toContain('Anti-Extraction Shield');
    expect(stdout.join('')).toContain('deployment contract: anti-extraction-shield');
  });

  test('verifies the package through the cli', async () => {
    const { io, stdout } = makeIo();
    const code = await runCli(['verify'], io);

    expect(code).toBe(0);
    expect(stdout.join('')).toContain('verified');
  });
});
