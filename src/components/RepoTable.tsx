import { FC } from 'react';
import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Star, ForkLeft } from '@mui/icons-material';

export type RepoData = {
  forkCount: number;
  name: string;
  stargazerCount: number;
  url: string;
};

const RepoTable: FC<{
  repos: RepoData[];
  loading: boolean;
  limit: number;
}> = ({ repos, loading, limit }) => {
  let tableRows: JSX.Element[] | Element[] = [];

  if (loading) {
    tableRows = Array.from(Array(limit)).map((val, i) => (
      <TableRow key={i}>
        <TableCell component="th" scope="row">
          <Skeleton variant="text" sx={{ width: '50%' }} />
        </TableCell>
        <TableCell align="right">
          <Skeleton variant="text" sx={{ width: 30, display: 'inline-block' }} />
        </TableCell>
        <TableCell align="right">
          <Skeleton variant="text" sx={{ width: 30, display: 'inline-block' }} />
        </TableCell>
      </TableRow>
    ));
  }

  if (!loading && repos.length) {
    tableRows = repos.map((repo: RepoData, i) => (
      <TableRow key={i}>
        <TableCell component="th" scope="row">
          <a href={repo.url} target="_blank" rel="noreferrer">
            {repo.name}
          </a>
        </TableCell>
        <TableCell align="right">{repo.stargazerCount}</TableCell>
        <TableCell align="right">{repo.forkCount}</TableCell>
      </TableRow>
    ));
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Repo name</TableCell>
            <TableCell align="right">
              <Star sx={{ position: 'relative', top: 7 }} /> Stars
            </TableCell>
            <TableCell align="right">
              <ForkLeft sx={{ position: 'relative', top: 7 }} /> Forks
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableRows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default RepoTable;
