import {
  Options,
  Plugin,
  Generator,
  GeneratorMap,
  selectGenerator,
} from '@code-shaper/shaper-utils';
import { simpleWebsiteGenerator } from './simpleWebsiteGenerator';

const generators: GeneratorMap = {};

function registerGenerator(generator: Generator) {
  const { id } = generator;
  generators[id] = generator;
}

// ----- Register Generators Here -----
registerGenerator(simpleWebsiteGenerator);

const instantSitesPlugin: Plugin = {
  id: '@movie-magic/instant-sites',
  name: 'Instant Sites',
  description: 'generates Instant Sites artifacts',
  run: async (inputOptions: Options) => {
    const generator = await selectGenerator(generators, inputOptions);
    if (!generator) {
      return Promise.resolve();
    }

    return generator.generate(process.cwd(), inputOptions);
  },
};

export default instantSitesPlugin;
