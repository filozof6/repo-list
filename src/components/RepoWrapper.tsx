import { ChangeEvent, FC, useState, useEffect } from 'react';
import { TablePagination, TextField } from '@mui/material';
import { GET_REPOSITORIES } from '../graphql/query/search';
import { useLazyQuery } from '@apollo/client';
import RepoTable, { RepoData } from './RepoTable';

const RepoWrapper: FC<any> = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [repos, setRepos] = useState<RepoData[]>([]);
  const [getRepos, { loading, data, error }] = useLazyQuery(GET_REPOSITORIES, {
    variables: { query, cursor: null, limit },
  });

  useEffect(() => {
    getRepos({ variables: { query, cursor: data?.search?.pageInfo.endCursor, limit } });
  }, [query, page, limit]);

  useEffect(() => {
    let reposToSet = [];
    if (data?.search?.nodes) {
      reposToSet = data?.search?.nodes;
    }

    setRepos(reposToSet);
  }, [data]);

  if (error) return <p>Error</p>;

  return (
    <>
      <TextField
        label="Search"
        variant="standard"
        onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
          if (e.target.value.length) {
            setQuery(e.currentTarget.value);
            setPage(0);
          }
        }}
      />
      <RepoTable repos={repos} loading={loading} limit={limit} />
      <TablePagination
        component="div"
        count={data?.search?.repositoryCount || 0}
        page={page}
        onPageChange={(e: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
          setPage(page);
        }}
        rowsPerPage={limit}
        onRowsPerPageChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
          setLimit(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </>
  );
};

export default RepoWrapper;
