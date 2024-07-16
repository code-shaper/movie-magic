import { movies } from './movies';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function MoviesPage() {
  return (
    <div className="container relative mx-auto max-w-screen-xl px-8 py-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="w-[80px]">Cert</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movies.map((movie) => (
            <TableRow key={movie.id}>
              <TableCell className="font-medium">{movie.name}</TableCell>
              <TableCell>{movie.certificate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
