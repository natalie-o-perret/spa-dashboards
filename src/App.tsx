import { useEffect, useState, type ReactNode } from 'react';
import {
  alpha,
  AppBar,
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  Drawer,
  IconButton,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
  Typography,
  type PaletteMode,
} from '@mui/material';
import {
  AnalyticsRounded,
  ArrowOutwardRounded,
  AutoStoriesRounded,
  CalendarMonthRounded,
  DarkModeRounded,
  LightModeRounded,
  MenuRounded,
  NewspaperRounded,
  ScheduleRounded,
  SpaceDashboardRounded,
} from '@mui/icons-material';

const drawerWidth = 244;

const navItems = [
  { label: 'Overview', href: '#overview', icon: <SpaceDashboardRounded /> },
  { label: 'Pipeline', href: '#pipeline', icon: <NewspaperRounded /> },
  { label: 'Audience', href: '#audience', icon: <AnalyticsRounded /> },
  { label: 'Top stories', href: '#stories', icon: <AutoStoriesRounded /> },
  { label: 'Calendar', href: '#calendar', icon: <CalendarMonthRounded /> },
];

type PipelineStatus = 'Draft' | 'In review' | 'Scheduled';
type PipelineFilter = 'All' | PipelineStatus;

const pipelineItems: Array<{
  title: string;
  desk: string;
  status: PipelineStatus;
  author: string;
  due: string;
}> = [
  {
    title: 'The cities learning to breathe again',
    desk: 'Field notes',
    status: 'In review',
    author: 'MR',
    due: 'Today, 14:00',
  },
  {
    title: 'A field guide to neighbourhood cinemas',
    desk: 'Culture',
    status: 'Draft',
    author: 'JL',
    due: 'Today, 17:30',
  },
  {
    title: 'The quiet return of the night train',
    desk: 'Journeys',
    status: 'Scheduled',
    author: 'SK',
    due: 'Tomorrow, 08:00',
  },
  {
    title: 'Six recipes, one late-summer table',
    desk: 'Food',
    status: 'In review',
    author: 'NO',
    due: 'Tomorrow, 11:00',
  },
  {
    title: 'Who keeps a public square alive?',
    desk: 'Ideas',
    status: 'Draft',
    author: 'AM',
    due: 'Fri, 12:00',
  },
  {
    title: 'The makers rebuilding coastal radios',
    desk: 'Studio visit',
    status: 'Scheduled',
    author: 'RB',
    due: 'Fri, 18:00',
  },
];

const topStories = [
  {
    title: 'A small press makes a very big map',
    desk: 'Culture',
    readers: '38.2k',
    change: '+24%',
    width: 92,
  },
  {
    title: 'Inside the repair cafe after dark',
    desk: 'Life',
    readers: '29.8k',
    change: '+12%',
    width: 72,
  },
  {
    title: 'Notes from the last island ferry',
    desk: 'Journeys',
    readers: '21.4k',
    change: '+8%',
    width: 54,
  },
];

const week = [
  { day: 'M', date: '14' },
  { day: 'T', date: '15' },
  { day: 'W', date: '16' },
  { day: 'T', date: '17' },
  { day: 'F', date: '18', current: true },
  { day: 'S', date: '19' },
  { day: 'S', date: '20' },
];

function StudioNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        bgcolor: '#111c35',
        color: '#fffaf0',
      }}
    >
      <Box sx={{ px: 3, pt: 3.25, pb: 3 }}>
        <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
          <Box
            aria-hidden="true"
            sx={{
              display: 'grid',
              width: 34,
              height: 34,
              gridTemplateColumns: '1fr 1fr',
              gap: '3px',
              transform: 'rotate(-3deg)',
            }}
          >
            <Box sx={{ bgcolor: '#d9ef4a', borderRadius: '7px 1px 1px 1px' }} />
            <Box sx={{ bgcolor: '#2453ff', borderRadius: '1px 7px 1px 1px' }} />
            <Box sx={{ bgcolor: '#2453ff', borderRadius: '1px 1px 1px 7px' }} />
            <Box sx={{ bgcolor: '#fffaf0', borderRadius: '1px 1px 7px 1px' }} />
          </Box>
          <Typography
            component="span"
            sx={{
              fontFamily: 'Georgia, serif',
              fontSize: '1.65rem',
              fontWeight: 700,
              letterSpacing: '-0.05em',
            }}
          >
            Mosaic
          </Typography>
        </Stack>
        <Typography
          variant="overline"
          sx={{ display: 'block', mt: 1.2, color: 'rgba(255,250,240,.58)' }}
        >
          Independent publishing
        </Typography>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,.12)', mx: 2 }} />

      <List component="nav" aria-label="Workspace" sx={{ px: 1.5, py: 2.5 }}>
        {navItems.map((item, index) => (
          <ListItemButton
            key={item.label}
            component="a"
            href={item.href}
            selected={index === 0}
            onClick={onNavigate}
            sx={{
              mb: 0.75,
              minHeight: 46,
              borderRadius: index === 0 ? '14px 3px 14px 14px' : 2,
              color: 'rgba(255,250,240,.72)',
              '& .MuiListItemIcon-root': { color: 'inherit' },
              '&.Mui-selected': {
                bgcolor: '#d9ef4a',
                color: '#111c35',
                '&:hover': { bgcolor: '#d9ef4a' },
              },
              '&:hover': {
                bgcolor: 'rgba(255,255,255,.08)',
                color: '#fffaf0',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 38 }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.label}
              slotProps={{
                primary: { sx: { fontSize: '.9rem', fontWeight: 750 } },
              }}
            />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ mt: 'auto', p: 2 }}>
        <Box
          sx={{
            p: 2,
            border: '1px solid rgba(255,255,255,.14)',
            borderRadius: '4px 20px 20px 20px',
            bgcolor: 'rgba(255,255,255,.055)',
          }}
        >
          <Typography variant="overline" sx={{ color: '#d9ef4a' }}>
            Autumn edition
          </Typography>
          <Typography sx={{ mt: 0.7, fontWeight: 750, lineHeight: 1.25 }}>
            Issue 38 closes in 3 days
          </Typography>
          <LinearProgress
            variant="determinate"
            value={74}
            aria-label="Issue 38 is 74 percent complete"
            sx={{
              mt: 2,
              height: 6,
              borderRadius: 5,
              bgcolor: 'rgba(255,255,255,.13)',
              '& .MuiLinearProgress-bar': { bgcolor: '#d9ef4a' },
            }}
          />
        </Box>
        <Stack
          direction="row"
          spacing={1.2}
          sx={{ mt: 2.5, px: 0.5, alignItems: 'center' }}
        >
          <Avatar
            sx={{
              width: 34,
              height: 34,
              bgcolor: '#2453ff',
              fontSize: '.78rem',
            }}
          >
            MP
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: '.82rem', fontWeight: 800 }}>
              Maya Patel
            </Typography>
            <Typography
              sx={{ fontSize: '.72rem', color: 'rgba(255,250,240,.55)' }}
            >
              Managing editor
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

function MetricCard({
  label,
  value,
  detail,
  shape,
  accent,
}: {
  label: string;
  value: string;
  detail: string;
  shape: string;
  accent?: boolean;
}) {
  return (
    <Card
      component="article"
      sx={{
        minHeight: 142,
        p: { xs: 2, lg: 2.5 },
        borderRadius: shape,
        bgcolor: accent ? 'secondary.main' : 'background.paper',
        color: accent ? '#111c35' : 'text.primary',
        boxShadow: 'none',
      }}
    >
      <Typography
        variant="overline"
        component="p"
        sx={{ color: 'inherit', opacity: 0.66 }}
      >
        {label}
      </Typography>
      <Typography
        component="p"
        sx={{
          mt: 1.1,
          fontFamily: 'Georgia, serif',
          fontSize: { xs: '2rem', lg: '2.45rem' },
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: '-0.05em',
        }}
      >
        {value}
      </Typography>
      <Typography
        component="p"
        sx={{ mt: 1.15, fontSize: '.78rem', opacity: 0.72 }}
      >
        {detail}
      </Typography>
    </Card>
  );
}

function AudienceChart() {
  return (
    <Card
      component="section"
      id="audience"
      aria-labelledby="audience-title"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: 410, sm: 440 },
        p: { xs: 2.5, sm: 3.5 },
        border: 0,
        borderRadius: '30px 6px 30px 30px',
        bgcolor: '#2453ff',
        color: '#fff',
        boxShadow: '0 24px 60px rgba(36,83,255,.22)',
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: -75,
          right: -45,
          width: 190,
          height: 190,
          border: '38px solid rgba(255,255,255,.075)',
          borderRadius: '50%',
        }}
      />
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
      >
        <Box>
          <Typography variant="overline" sx={{ color: '#d9ef4a' }}>
            Audience pulse / 7 days
          </Typography>
          <Typography
            id="audience-title"
            component="h2"
            variant="h2"
            sx={{ mt: 0.8 }}
          >
            Readers are staying longer.
          </Typography>
        </Box>
        <Chip
          label="+18.4%"
          size="small"
          sx={{ ml: 1, bgcolor: '#d9ef4a', color: '#111c35' }}
        />
      </Stack>

      <Stack direction="row" spacing={3.5} sx={{ mt: 3.25 }}>
        <Box>
          <Typography
            sx={{
              fontFamily: 'Georgia, serif',
              fontSize: '2rem',
              lineHeight: 1,
            }}
          >
            126.8k
          </Typography>
          <Typography
            sx={{ mt: 0.5, fontSize: '.74rem', color: 'rgba(255,255,255,.9)' }}
          >
            unique readers
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontFamily: 'Georgia, serif',
              fontSize: '2rem',
              lineHeight: 1,
            }}
          >
            4m 32s
          </Typography>
          <Typography
            sx={{ mt: 0.5, fontSize: '.74rem', color: 'rgba(255,255,255,.9)' }}
          >
            average attention
          </Typography>
        </Box>
      </Stack>

      <Box sx={{ mt: 2.5 }}>
        <svg
          viewBox="0 0 420 155"
          role="img"
          aria-labelledby="trend-title trend-description"
          style={{ display: 'block', width: '100%', overflow: 'visible' }}
        >
          <title id="trend-title">Audience trend for the last seven days</title>
          <desc id="trend-description">
            Daily readers rose overall from 14,200 on Saturday to 22,400 on
            Friday, with a small dip on Monday and Wednesday.
          </desc>
          <defs>
            <linearGradient id="audience-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d9ef4a" stopOpacity=".32" />
              <stop offset="100%" stopColor="#d9ef4a" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[28, 76, 124].map((y) => (
            <line
              key={y}
              x1="0"
              x2="420"
              y1={y}
              y2={y}
              stroke="rgba(255,255,255,.17)"
              strokeDasharray="2 7"
            />
          ))}
          <path
            d="M0 112 C24 111 37 89 65 87 C92 85 105 101 132 94 C161 87 170 57 198 55 C226 53 236 74 264 68 C295 61 302 39 330 37 C363 35 381 20 420 16 L420 124 L0 124 Z"
            fill="url(#audience-fill)"
          />
          <path
            d="M0 112 C24 111 37 89 65 87 C92 85 105 101 132 94 C161 87 170 57 198 55 C226 53 236 74 264 68 C295 61 302 39 330 37 C363 35 381 20 420 16"
            fill="none"
            stroke="#d9ef4a"
            strokeWidth="4"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx="420"
            cy="16"
            r="6"
            fill="#d9ef4a"
            stroke="#2453ff"
            strokeWidth="3"
          />
        </svg>
        <Box
          aria-hidden="true"
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            mt: -1,
            color: 'rgba(255,255,255,.9)',
            fontSize: '.68rem',
            '& span': { textAlign: 'center' },
            '& span:first-of-type': { textAlign: 'left' },
            '& span:last-of-type': { textAlign: 'right' },
          }}
        >
          {['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
            <Box component="span" key={day}>
              {day}
            </Box>
          ))}
        </Box>
      </Box>
    </Card>
  );
}

function EditorialCalendar() {
  return (
    <Card
      component="section"
      id="calendar"
      aria-labelledby="calendar-title"
      sx={{
        height: '100%',
        minHeight: 410,
        p: { xs: 2.5, sm: 3 },
        borderRadius: '6px 30px 30px 30px',
      }}
    >
      <Stack
        direction="row"
        sx={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Box>
          <Typography variant="overline" color="text.secondary">
            September 14-20
          </Typography>
          <Typography
            id="calendar-title"
            component="h2"
            variant="h2"
            sx={{ mt: 0.65 }}
          >
            On the desk
          </Typography>
        </Box>
        <CalendarMonthRounded color="primary" />
      </Stack>

      <Box
        aria-label="Week of September 14"
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 0.6,
          mt: 3,
        }}
      >
        {week.map((item) => (
          <Box
            key={`${item.day}-${item.date}`}
            aria-current={item.current ? 'date' : undefined}
            sx={{
              py: 1,
              borderRadius: item.current ? '14px 4px 14px 14px' : 2,
              bgcolor: item.current ? 'secondary.main' : 'action.hover',
              color: item.current ? '#111c35' : 'text.primary',
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{ fontSize: '.63rem', fontWeight: 850, opacity: 0.65 }}
            >
              {item.day}
            </Typography>
            <Typography sx={{ mt: 0.35, fontSize: '.82rem', fontWeight: 850 }}>
              {item.date}
            </Typography>
          </Box>
        ))}
      </Box>

      <Stack spacing={2.1} sx={{ mt: 3 }}>
        {[
          { time: '10:00', title: 'Art desk stand-up', colour: '#2453ff' },
          { time: '13:30', title: 'Autumn cover review', colour: '#d9ef4a' },
          { time: '16:00', title: 'Newsletter proof', colour: '#ee805d' },
        ].map((event) => (
          <Stack
            key={event.time}
            direction="row"
            spacing={1.5}
            sx={{ alignItems: 'center' }}
          >
            <Box
              aria-hidden="true"
              sx={{
                width: 5,
                height: 38,
                borderRadius: 3,
                bgcolor: event.colour,
                flexShrink: 0,
              }}
            />
            <Box sx={{ minWidth: 0, flexGrow: 1 }}>
              <Typography sx={{ fontSize: '.88rem', fontWeight: 800 }}>
                {event.title}
              </Typography>
              <Typography
                sx={{ mt: 0.15, fontSize: '.72rem', color: 'text.secondary' }}
              >
                Studio room / {event.time}
              </Typography>
            </Box>
            <ScheduleRounded
              sx={{ fontSize: 17, color: 'text.secondary' }}
              aria-hidden="true"
            />
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

const statusColour: Record<PipelineStatus, 'default' | 'primary' | 'success'> =
  {
    Draft: 'default',
    'In review': 'primary',
    Scheduled: 'success',
  };

function Pipeline() {
  const [filter, setFilter] = useState<PipelineFilter>('All');
  const visibleItems = pipelineItems.filter(
    (item) => filter === 'All' || item.status === filter,
  );

  return (
    <Card
      component="section"
      id="pipeline"
      aria-labelledby="pipeline-title"
      sx={{ p: { xs: 2.5, sm: 3.5 }, borderRadius: '30px 30px 6px 30px' }}
    >
      <Stack
        direction={{ xs: 'column', xl: 'row' }}
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', xl: 'flex-end' },
        }}
      >
        <Box>
          <Typography variant="overline" color="primary.main">
            Publication flow
          </Typography>
          <Typography
            id="pipeline-title"
            component="h2"
            variant="h2"
            sx={{ mt: 0.65 }}
          >
            Moving through the studio
          </Typography>
        </Box>
        <ToggleButtonGroup
          value={filter}
          exclusive
          size="small"
          aria-label="Filter publication pipeline"
          onChange={(_, value: PipelineFilter | null) =>
            value && setFilter(value)
          }
          sx={{
            maxWidth: '100%',
            overflowX: 'auto',
            '& .MuiToggleButton-root': {
              flexShrink: 0,
              px: 1.4,
              borderColor: 'divider',
              color: 'text.secondary',
              textTransform: 'none',
              fontSize: '.72rem',
              fontWeight: 800,
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': { bgcolor: 'primary.dark' },
              },
            },
          }}
        >
          {(['All', 'Draft', 'In review', 'Scheduled'] as const).map((item) => (
            <ToggleButton key={item} value={item}>
              {item}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>

      <Typography
        aria-live="polite"
        sx={{ mt: 2.5, fontSize: '.75rem', color: 'text.secondary' }}
      >
        {visibleItems.length} of {pipelineItems.length} pieces
      </Typography>

      <Box sx={{ mt: 0.75 }}>
        {visibleItems.map((item, index) => (
          <Box key={item.title}>
            {index > 0 && <Divider />}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr auto',
                  sm: 'minmax(0, 1fr) auto auto',
                },
                gap: { xs: 1, sm: 2 },
                alignItems: 'center',
                py: 2,
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  component="h3"
                  variant="h3"
                  sx={{ fontSize: { xs: '1.05rem', sm: '1.16rem' } }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{ mt: 0.5, fontSize: '.72rem', color: 'text.secondary' }}
                >
                  {item.desk} / Due {item.due}
                </Typography>
              </Box>
              <Chip
                label={item.status}
                color={statusColour[item.status]}
                variant={item.status === 'Draft' ? 'outlined' : 'filled'}
                size="small"
                sx={{
                  gridRow: { xs: '1 / span 2', sm: 'auto' },
                  gridColumn: { xs: 2, sm: 'auto' },
                }}
              />
              <Avatar
                aria-label={`Assigned to ${item.author}`}
                sx={{
                  width: 30,
                  height: 30,
                  bgcolor: 'action.selected',
                  color: 'text.primary',
                  fontSize: '.67rem',
                  fontWeight: 850,
                }}
              >
                {item.author}
              </Avatar>
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
}

function TopStories() {
  return (
    <Card
      component="section"
      id="stories"
      aria-labelledby="stories-title"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        p: { xs: 2.5, sm: 3 },
        borderRadius: '30px 30px 30px 6px',
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 76,
          height: 12,
          bgcolor: 'secondary.main',
        }}
      />
      <Typography variant="overline" color="text.secondary">
        Last 7 days
      </Typography>
      <Typography
        id="stories-title"
        component="h2"
        variant="h2"
        sx={{ mt: 0.65 }}
      >
        Stories finding their people
      </Typography>

      <Box component="ol" sx={{ m: 0, mt: 3, p: 0, listStyle: 'none' }}>
        {topStories.map((story, index) => (
          <Box
            component="li"
            key={story.title}
            sx={{ mb: index === 2 ? 0 : 3 }}
          >
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ alignItems: 'flex-start' }}
            >
              <Typography
                aria-hidden="true"
                sx={{
                  pt: 0.15,
                  color: 'primary.main',
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                }}
              >
                0{index + 1}
              </Typography>
              <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                <Typography
                  component="h3"
                  variant="h3"
                  sx={{ fontSize: '1.08rem' }}
                >
                  {story.title}
                </Typography>
                <Stack
                  direction="row"
                  sx={{ mt: 0.9, justifyContent: 'space-between' }}
                >
                  <Typography
                    sx={{ fontSize: '.7rem', color: 'text.secondary' }}
                  >
                    {story.desk} / {story.readers} readers
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '.7rem',
                      color: 'success.main',
                      fontWeight: 850,
                    }}
                  >
                    {story.change}
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    mt: 1,
                    height: 4,
                    bgcolor: 'action.hover',
                    borderRadius: 4,
                  }}
                >
                  <Box
                    sx={{
                      width: `${story.width}%`,
                      height: '100%',
                      borderRadius: 4,
                      bgcolor: index === 0 ? 'secondary.main' : 'primary.main',
                    }}
                  />
                </Box>
              </Box>
            </Stack>
          </Box>
        ))}
      </Box>

      <Stack
        direction="row"
        spacing={0.5}
        sx={{ mt: 3, alignItems: 'center', color: 'primary.main' }}
      >
        <Typography sx={{ fontSize: '.76rem', fontWeight: 850 }}>
          Audience report
        </Typography>
        <ArrowOutwardRounded sx={{ fontSize: 17 }} aria-hidden="true" />
      </Stack>
    </Card>
  );
}

function MobileHeader({
  mode,
  open,
  onMenu,
  onToggleMode,
}: {
  mode: PaletteMode;
  open: boolean;
  onMenu: () => void;
  onToggleMode: () => void;
}) {
  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        display: { md: 'none' },
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: (theme) => alpha(theme.palette.background.default, 0.9),
        backdropFilter: 'blur(12px)',
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <Tooltip title="Open navigation">
          <IconButton
            edge="start"
            onClick={onMenu}
            aria-label="Open navigation"
            aria-controls="mobile-navigation"
            aria-expanded={open}
          >
            <MenuRounded />
          </IconButton>
        </Tooltip>
        <Typography
          sx={{
            ml: 1.25,
            flexGrow: 1,
            fontFamily: 'Georgia, serif',
            fontSize: '1.4rem',
            fontWeight: 700,
          }}
        >
          Mosaic
        </Typography>
        <Tooltip
          title={`Switch to ${mode === 'light' ? 'dark' : 'light'} theme`}
        >
          <IconButton
            onClick={onToggleMode}
            aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} theme`}
          >
            {mode === 'light' ? <DarkModeRounded /> : <LightModeRounded />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

function SectionRule({ children }: { children: ReactNode }) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ mb: 1, alignItems: 'center' }}>
      <Typography variant="overline" color="text.secondary">
        {children}
      </Typography>
      <Divider sx={{ flexGrow: 1 }} />
    </Stack>
  );
}

export interface AppProps {
  mode: PaletteMode;
  onToggleMode: () => void;
}

export default function App({ mode, onToggleMode }: AppProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!window.matchMedia) return;

    const desktop = window.matchMedia('(min-width: 900px)');
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileOpen(false);
    };

    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Box>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { width: drawerWidth, border: 0 },
          }}
        >
          <StudioNav />
        </Drawer>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          slotProps={{
            paper: {
              id: 'mobile-navigation',
              'aria-label': 'Mobile navigation',
            },
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: Math.min(drawerWidth + 20, 300),
              border: 0,
            },
          }}
        >
          <StudioNav onNavigate={() => setMobileOpen(false)} />
        </Drawer>
      </Box>

      <Box sx={{ ml: { md: `${drawerWidth}px` }, minHeight: '100vh' }}>
        <MobileHeader
          mode={mode}
          open={mobileOpen}
          onMenu={() => setMobileOpen(true)}
          onToggleMode={onToggleMode}
        />

        <Box
          component="main"
          id="main-content"
          tabIndex={-1}
          sx={{
            width: '100%',
            maxWidth: 1540,
            mx: 'auto',
            px: { xs: 2, sm: 3, lg: 4.5 },
            pt: { xs: 4, md: 5 },
            pb: 6,
            outline: 0,
          }}
        >
          <Box component="header" id="overview">
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3}
              sx={{
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'flex-end' },
              }}
            >
              <Box>
                <Typography variant="overline" color="primary.main">
                  Friday, 18 September / Issue 38
                </Typography>
                <Typography
                  component="h1"
                  variant="h1"
                  sx={{ mt: 1.1, maxWidth: 780 }}
                >
                  Good morning, Maya.
                </Typography>
                <Typography
                  sx={{
                    mt: 2,
                    maxWidth: 620,
                    color: 'text.secondary',
                    fontSize: { xs: '.95rem', sm: '1.05rem' },
                  }}
                >
                  The autumn edition is taking shape. Three stories need your
                  eye before lunch.
                </Typography>
              </Box>

              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Chip
                  label="Studio is on track"
                  color="success"
                  variant="outlined"
                  sx={{ bgcolor: 'background.paper' }}
                />
                <Tooltip
                  title={`Switch to ${mode === 'light' ? 'dark' : 'light'} theme`}
                >
                  <IconButton
                    onClick={onToggleMode}
                    aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} theme`}
                    sx={{
                      display: { xs: 'none', md: 'inline-flex' },
                      border: '1px solid',
                      borderColor: 'divider',
                      bgcolor: 'background.paper',
                    }}
                  >
                    {mode === 'light' ? (
                      <DarkModeRounded />
                    ) : (
                      <LightModeRounded />
                    )}
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          </Box>

          <Box component="section" aria-label="Studio summary" sx={{ mt: 5 }}>
            <SectionRule>Today at a glance</SectionRule>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, minmax(0, 1fr))',
                  lg: 'repeat(4, minmax(0, 1fr))',
                },
                gap: { xs: 1.25, sm: 2 },
              }}
            >
              <MetricCard
                label="Published"
                value="24"
                detail="6 pieces this week"
                shape="4px 24px 24px 24px"
              />
              <MetricCard
                label="Reader return"
                value="42%"
                detail="Up 5.8 points"
                shape="24px 4px 24px 24px"
                accent
              />
              <MetricCard
                label="Newsletter"
                value="68.2k"
                detail="1,204 new readers"
                shape="24px 24px 4px 24px"
              />
              <MetricCard
                label="Open edits"
                value="7"
                detail="3 due before lunch"
                shape="24px 24px 24px 4px"
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                lg: 'minmax(0, 1.75fr) minmax(310px, .8fr)',
              },
              gap: { xs: 2, lg: 2.5 },
              mt: { xs: 2, lg: 2.5 },
              alignItems: 'stretch',
            }}
          >
            <AudienceChart />
            <EditorialCalendar />
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                lg: 'minmax(0, 1.55fr) minmax(330px, .9fr)',
              },
              gap: { xs: 2, lg: 2.5 },
              mt: { xs: 2, lg: 2.5 },
              alignItems: 'stretch',
            }}
          >
            <Pipeline />
            <TopStories />
          </Box>

          <Box
            component="footer"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: 1,
              mt: 4,
              pt: 2.5,
              borderTop: '1px solid',
              borderColor: 'divider',
              color: 'text.secondary',
            }}
          >
            <Typography sx={{ fontSize: '.72rem' }}>
              Mosaic editorial workspace
            </Typography>
            <Typography sx={{ fontSize: '.72rem' }}>
              Sample data / Updated 09:42
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
