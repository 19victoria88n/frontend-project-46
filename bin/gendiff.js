#!/usr/bin/env node

import { Command } from 'commander';
import getDifference from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1>', 'first file')
  .arguments('<filepath2>', 'second file')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(getDifference(filepath1, filepath2, program.opts().format));
  });

program.parse();
