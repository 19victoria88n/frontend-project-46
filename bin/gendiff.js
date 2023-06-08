#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((file1, file2) => {
    console.log(genDiff(file1, file2));
  });

program.parse();
