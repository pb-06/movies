import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { ContentPagination } from './ContentPagination'
import { Genres } from './Genres'

export const PageLayout = ({ title, children, page, setPage, type, selectedGenres, setSelectedGenres, numOfPages }) => {
  return (
    <Container maxWidth={false}
      sx={{
        background: 'linear-gradient(to right, #082f49, #075985)',
        color: 'white',
        minHeight: '100vh',
        minWidth: '100vw',
        paddingBottom: '50px'
      }}>

      <Typography variant='h4' sx={{
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: 2,
        textAlign: 'center',
        background: 'linear-gradient(to right, #e24dc9ff, #d6f36cff)',
        p: '1rem',
        mb: 2,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        {title}
      </Typography>

      {selectedGenres && (
        <Genres
          type={type}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          setPage={setPage}
        />
      )}

      <Box sx={{ padding: '20px 0' }}>
        {children}
      </Box>

      {setPage && (
        <Box display='flex' justifyContent='center' sx={{ paddingBottom: '60px' }}>
          {numOfPages > 1 && (
            <ContentPagination page={page} setPage={setPage} numOfPages={numOfPages} />
          )}
        </Box>
      )}

    </Container>
  )
}