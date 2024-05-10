import { cc, FileUtils, Generator, Options } from '@code-shaper/shaper-utils';
import { prompt, registerPrompt } from 'inquirer';
// @ts-ignore
import inquirerDirectory from 'inquirer-directory';
import path from 'path';

// Register inquirer prompts
registerPrompt('directory', inquirerDirectory);

export const simpleWebsiteGenerator: Generator = {
  id: 'simple-website',
  name: 'Simple Website',
  description: 'generates a simple website',
  generate: generateSimpleWebsite,
};

async function generateSimpleWebsite(rootDir: string, inputOptions: Options) {
  const questions = [
    {
      type: 'input',
      name: 'itemName',
      message: 'Website name? (e.g. "movie-magic-website")',
    },
    {
      type: 'directory',
      name: 'parentDir',
      pageSize: 20,
      message: 'Parent directory? (usually "apps")',
      basePath: rootDir,
    },
  ];

  const options = await prompt(questions, inputOptions);
  const { itemName, parentDir } = options;

  // --------------------------------------------------------------------------
  // Add more options for code generation here
  // --------------------------------------------------------------------------
  // Example: itemName = simple-website

  // itemNameKebabCase = simple-website
  options['itemNameKebabCase'] = cc.kebabCase(itemName);

  // itemNameCamelCase = simpleWebsite
  options['itemNameCamelCase'] = cc.camelCase(itemName);

  // itemNamePascalCase = SimpleWebsite
  options['itemNamePascalCase'] = cc.pascalCase(itemName);

  // itemNameCapitalCase = Simple Website
  options['itemNameCapitalCase'] = cc.capitalCase(itemName);
  // --------------------------------------------------------------------------

  const { itemNameKebabCase } = options;

  const srcDir = path.join(__dirname, 'templates');
  const dstDir = path.join(parentDir, itemNameKebabCase);

  console.log();
  console.log(`Creating ${itemName}...`);

  FileUtils.transformFiles(srcDir, dstDir, options);
  console.log();
  console.log('Done.');
  console.log();
  console.log('What to do next?');
  console.log('----------------');
  console.log();
  console.log('# Install newly added dependencies');
  console.log('npm install');
  console.log();
  console.log('# Run the website to make sure it works');
  console.log('npm run dev');
  console.log();
  console.log(
    '# Point your browser to http://localhost:7777 to make sure the app runs.'
  );
  console.log();

  return Promise.resolve();
}
