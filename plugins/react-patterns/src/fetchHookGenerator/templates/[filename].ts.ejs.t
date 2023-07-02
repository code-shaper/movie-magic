import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function fetch<%= itemNamePascalCase %>(): Promise<<%= returnType %>> {
  const apiUrl = import.meta.env.VITE_API_URL;
  const res<%= itemNamePascalCase %> = await axios.get<<%= returnType %>>(`${apiUrl}/<%= itemNameKebabCase %>`);

  return res<%= itemNamePascalCase %>.data;
}

export function <%= hookName %>() {
  return useQuery(['<%= itemNameCamelCase %>'], fetch<%= itemNamePascalCase %>);
}
