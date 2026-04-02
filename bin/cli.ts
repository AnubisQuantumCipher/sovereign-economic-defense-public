#!/usr/bin/env node

import { runCli } from '../src/cli-core.js';

const exitCode = await runCli(process.argv.slice(2));
process.exitCode = exitCode;
