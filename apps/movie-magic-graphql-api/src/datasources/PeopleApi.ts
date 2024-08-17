import peopleData from './people.json';
import type { Person } from '@/generated/resolvers-types';

const people = peopleData as Person[];

export class PeopleApi {
  public async getPerson(id: string) {
    const person = people.find((person) => person.id === id);
    return Promise.resolve(person);
  }

  public async getPeople(ids: string[]) {
    const peopleList = ids.map((id) =>
      people.find((person) => person.id === id),
    );
    return Promise.resolve(peopleList);
  }
}
