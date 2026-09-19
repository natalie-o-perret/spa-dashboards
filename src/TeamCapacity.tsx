import { Box, Card, LinearProgress, Stack, Typography } from '@mui/material';
import { GroupsRounded } from '@mui/icons-material';

const capacities = [
  { team: 'Design', value: 82, people: 6 },
  { team: 'Engineering', value: 76, people: 12 },
  { team: 'Research', value: 64, people: 4 },
  { team: 'Content', value: 58, people: 5 },
];

export default function TeamCapacity() {
  return (
    <Card
      component="section"
      id="team"
      aria-labelledby="capacity-title"
      sx={{ height: '100%', p: { xs: 2.5, sm: 3 } }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
      >
        <Box>
          <Typography variant="overline" color="text.secondary">
            Current allocation
          </Typography>
          <Typography id="capacity-title" component="h2" variant="h2">
            Team capacity
          </Typography>
        </Box>
        <GroupsRounded color="primary" aria-hidden="true" />
      </Stack>
      <Stack spacing={2.5} sx={{ mt: 3 }}>
        {capacities.map((item) => (
          <Box key={item.team}>
            <Stack
              direction="row"
              sx={{ alignItems: 'baseline', justifyContent: 'space-between' }}
            >
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 700 }}>
                {item.team}
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                {item.value}% / {item.people}{' '}
                {item.people === 1 ? 'person' : 'people'}
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={item.value}
              aria-label={`${item.team} capacity ${item.value} percent, ${item.people} people`}
              sx={{ mt: 1 }}
            />
          </Box>
        ))}
      </Stack>
    </Card>
  );
}
