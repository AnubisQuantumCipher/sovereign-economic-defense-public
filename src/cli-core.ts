import path from 'node:path';

import {
  extractArtifacts,
  getComponent,
  getDeploymentManifest,
  getProofManifest,
  getReleaseManifest,
  getStatement,
  listComponents,
} from './artifacts.js';
import { verifyPackageIntegrity } from './integrity.js';
import { formatJson } from './util.js';

const BANNER = 'Built by AnubisQuantumCipher';

export interface CliIo {
  stdout: (text: string) => void;
  stderr: (text: string) => void;
  cwd: string;
}

function createDefaultIo(): CliIo {
  return {
    stdout: (text) => process.stdout.write(text),
    stderr: (text) => process.stderr.write(text),
    cwd: process.cwd(),
  };
}

function printBanner(io: CliIo, jsonMode: boolean): void {
  const writer = jsonMode ? io.stderr : io.stdout;
  writer(`${BANNER}\n`);
}

function helpText(): string {
  return [
    'sovereign-economic-defense',
    '',
    'Usage:',
    '  sovereign-economic-defense list [--json]',
    '  sovereign-economic-defense show <component> [--json]',
    '  sovereign-economic-defense manifest [release|deployment|proof] [--json]',
    '  sovereign-economic-defense verify [--json]',
    '  sovereign-economic-defense extract --out <dir> [--json]',
  ].join('\n');
}

function parseFlag(argv: string[], flag: string): boolean {
  return argv.includes(flag);
}

function readOption(argv: string[], flag: string): string | undefined {
  const index = argv.indexOf(flag);
  if (index === -1) {
    return undefined;
  }
  return argv[index + 1];
}

function formatComponentList(components: Awaited<ReturnType<typeof listComponents>>): string {
  const lines = components.map((component) =>
    `${component.component} | ${component.backend} | ${component.deploymentContract} | ${component.deploymentTxHash}`,
  );

  return `${lines.join('\n')}\n`;
}

function formatComponent(component: Awaited<ReturnType<typeof getComponent>>, statement: Awaited<ReturnType<typeof getStatement>>): string {
  return [
    component.title,
    `component: ${component.component}`,
    `backend: ${component.backend}`,
    `program digest: ${component.programDigest}`,
    `deployment contract: ${component.deploymentContract}`,
    `deployment address: ${component.deploymentAddress}`,
    `deployment tx hash: ${component.deploymentTxHash}`,
    `explorer: ${component.explorerUrl}`,
    `proof sha256: ${component.proofSha256}`,
    `verification key sha256: ${component.verificationKeySha256}`,
    `proof bundle: ${component.proofBundlePath}`,
    `statement: ${component.statementPath}`,
    `claim: ${statement.claim}`,
    `public inputs: ${component.publicInputs.join(', ')}`,
  ].join('\n') + '\n';
}

function formatIntegrity(report: Awaited<ReturnType<typeof verifyPackageIntegrity>>): string {
  if (report.ok) {
    return `verified ${report.checkedFiles} files\n`;
  }

  const lines = [
    `verification failed for ${report.mismatches.length} files`,
  ];

  for (const failure of report.mismatches) {
    lines.push(`${failure.path} expected=${failure.expected} actual=${failure.actual ?? 'missing'}`);
  }

  return `${lines.join('\n')}\n`;
}

export async function runCli(argv: string[], io: CliIo = createDefaultIo()): Promise<number> {
  const jsonMode = parseFlag(argv, '--json');
  const filteredArgs = argv.filter((arg, index) => {
    if (arg === '--json') {
      return false;
    }
    if (argv[index - 1] === '--out') {
      return true;
    }
    return true;
  });

  const [command = 'help', ...rest] = filteredArgs;

  try {
    printBanner(io, jsonMode);

    switch (command) {
      case 'help':
      case '--help':
      case '-h':
        io.stdout(`${helpText()}\n`);
        return 0;
      case 'list': {
        const components = await listComponents();
        if (jsonMode) {
          io.stdout(formatJson(components));
        } else {
          io.stdout(formatComponentList(components));
        }
        return 0;
      }
      case 'show': {
        const componentName = rest[0];
        if (!componentName) {
          throw new Error('show requires a component name');
        }
        const [component, statement] = await Promise.all([
          getComponent(componentName),
          getStatement(componentName),
        ]);
        if (jsonMode) {
          io.stdout(formatJson({ component, statement }));
        } else {
          io.stdout(formatComponent(component, statement));
        }
        return 0;
      }
      case 'manifest': {
        const target = rest[0] ?? 'release';
        const manifest =
          target === 'deployment'
            ? await getDeploymentManifest()
            : target === 'proof'
              ? await getProofManifest()
              : await getReleaseManifest();
        io.stdout(jsonMode ? formatJson(manifest) : formatJson(manifest));
        return 0;
      }
      case 'verify': {
        const report = await verifyPackageIntegrity();
        if (jsonMode) {
          io.stdout(formatJson(report));
        } else {
          io.stdout(formatIntegrity(report));
        }
        return report.ok ? 0 : 1;
      }
      case 'extract': {
        const outArg = readOption(rest, '--out') ?? readOption(argv, '--out');
        if (!outArg) {
          throw new Error('extract requires --out <dir>');
        }
        const outDir = path.resolve(io.cwd, outArg);
        const report = await extractArtifacts(outDir);
        if (jsonMode) {
          io.stdout(formatJson(report));
        } else {
          io.stdout(`extracted to ${report.outDir}\n`);
        }
        return 0;
      }
      default:
        throw new Error(`Unknown command '${command}'`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    io.stderr(`${message}\n`);
    return 1;
  }
}
