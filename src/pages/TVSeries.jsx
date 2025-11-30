import React, { useState, useEffect } from 'react'
import { PageLayout } from '../components/PageLayout'
import { Grid } from '@mui/material'
import { getData } from '../utils'
import { MyCard } from '../components/MyCard'
import { MySpinner } from '../components/MySpinner'

export const TVSeries = () => {
  const [page, setPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const [numOfPages, setNumOfPages] = useState(0);

  console.log(page);

  // use getData
  useEffect(() => {
    setLoading(true);

    getData({ queryKey: ['tvSeries', 'discover/tv', page, selectedGenres] })
      .then(result => {
        console.log('TV Series data:', result);
        setData(result);
        setNumOfPages(Math.min(result.total_pages, 500)); // TMDB API limit
      })
      .catch(err => {
        console.error("Hiba történt a TV sorozatok lekérésekor:", err);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [page, selectedGenres]);

  return (
    <PageLayout title="TV Series" page={page} setPage={setPage} type='tv' selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} numOfPages={numOfPages}>
      {isLoading ? (
        <MySpinner />
      ) : (
        <Grid container spacing={2} justifyContent='center'>
          {data && data.results?.map(obj =>
            <MyCard key={obj.id} {...obj} />
          )}

          {/* Ha nincs adat vagy üres a lista */}
          {(!data || data.results?.length === 0) && !isLoading && (
            <p style={{ textAlign: 'center', width: '100%' }}>Nincs megjeleníthető adat.</p>
          )}
        </Grid>
      )}
    </PageLayout>
  )
}