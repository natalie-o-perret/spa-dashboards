import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
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
  Toolbar,
  Tooltip,
  Typography,
  type PaletteMode,
} from '@mui/material';
import {
  AccountBalanceWalletRounded,
  CloseRounded,
  DarkModeRounded,
  FolderRounded,
  GroupsRounded,
  InsightsRounded,
  LightModeRounded,
  MenuRounded,
  MonitorHeartRounded,
  SpaceDashboardRounded,
  TrendingUpRounded,
} from '@mui/icons-material';
import ProjectsTable from './ProjectsTable';

const drawerWidth = 252;
const desktopMedia = '(min-width: 960px)';

const navItems = [
  { label: 'Overview', href: '#overview', icon: <SpaceDashboardRounded /> },
  { label: 'Analytics', href: '#analytics', icon: <InsightsRounded /> },
  { label: 'Projects', href: '#projects', icon: <FolderRounded /> },
  { label: 'Team', href: '#team', icon: <GroupsRounded /> },
];

const metrics = [
  {
    label: 'Active projects',
    value: '15',
    detail: '3 due this month',
    icon: <FolderRounded aria-hidden="true" fontSize="small" />,
  },
  {
    label: 'On-time delivery',
    value: '91%',
    detail: 'Up 4 points',
    icon: <TrendingUpRounded aria-hidden="true" fontSize="small" />,
  },
  {
    label: 'Budget used',
    value: '68%',
    detail: '€482k of €710k',
    icon: <AccountBalanceWalletRounded aria-hidden="true" fontSize="small" />,
  },
  {
    label: 'Team capacity',
    value: '76%',
    detail: '27 contributors',
    icon: <GroupsRounded aria-hidden="true" fontSize="small" />,
  },
];

const trend = [
  { week: 'W31', value: 62 },
  { week: 'W32', value: 68 },
  { week: 'W33', value: 66 },
  { week: 'W34', value: 73 },
  { week: 'W35', value: 78 },
  { week: 'W36', value: 81 },
  { week: 'W37', value: 86 },
  { week: 'W38', value: 91 },
];

const capacities = [
  { team: 'Design', value: 82, people: 6 },
  { team: 'Engineering', value: 76, people: 12 },
  { team: 'Research', value: 64, people: 4 },
  { team: 'Content', value: 58, people: 5 },
];

function chartY(value: number) {
  return 190 - ((value - 50) / 50) * 160;
}

function Navigation({
  onNavigate,
  onClose,
}: {
  onNavigate?: () => void;
  onClose?: () => void;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        bgcolor: 'background.paper',
      }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        sx={{ alignItems: 'center', px: 2.5, py: 2.75 }}
      >
        <Box
          aria-hidden="true"
          sx={{
            display: 'grid',
            width: 38,
            height: 38,
            flexShrink: 0,
            placeItems: 'center',
            borderRadius: 2.25,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            fontSize: '1rem',
            fontWeight: 800,
          }}
        >
          M
        </Box>
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Typography
            sx={{ fontSize: '1.05rem', fontWeight: 800, lineHeight: 1.25 }}
          >
            Meridian
          </Typography>
          <Typography
            sx={{ mt: 0.25, color: 'text.secondary', fontSize: '0.75rem' }}
          >
            Portfolio operations
          </Typography>
        </Box>
        {onClose && (
          <Tooltip title="Close navigation">
            <IconButton onClick={onClose} aria-label="Close navigation">
              <CloseRounded />
            </IconButton>
          </Tooltip>
        )}
      </Stack>

      <Divider />

      <Typography
        variant="overline"
        sx={{ px: 3, pt: 3, color: 'text.secondary' }}
      >
        Workspace
      </Typography>
      <List component="nav" aria-label="Primary navigation" sx={{ px: 1.5 }}>
        {navItems.map((item, index) => (
          <ListItemButton
            key={item.label}
            component="a"
            href={item.href}
            selected={index === 0}
            onClick={onNavigate}
            sx={{
              mt: 0.75,
              minHeight: 46,
              borderRadius: 2.5,
              color: 'text.secondary',
              '& .MuiListItemIcon-root': { color: 'inherit' },
              '&.Mui-selected': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.11),
                color: 'primary.main',
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.label}
              slotProps={{
                primary: { sx: { fontSize: '0.9rem', fontWeight: 700 } },
              }}
            />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ mt: 'auto', p: 2.5 }}>
        <Box
          component="aside"
          aria-label="Current portfolio cycle"
          sx={{
            p: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            bgcolor: 'action.hover',
          }}
        >
          <Chip
            label="Cycle 18"
            size="small"
            sx={{ bgcolor: 'action.selected', color: 'primary.main' }}
          />
          <Typography sx={{ mt: 1.25, fontSize: '0.8rem', fontWeight: 750 }}>
            Weekly portfolio review
          </Typography>
          <Typography
            sx={{ mt: 0.35, color: 'text.secondary', fontSize: '0.75rem' }}
          >
            Friday, 18 September
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

function TopBar({
  mode,
  mobileOpen,
  menuButtonRef,
  onMenu,
  onToggleMode,
}: {
  mode: PaletteMode;
  mobileOpen: boolean;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
  onMenu: () => void;
  onToggleMode: () => void;
}) {
  const nextMode = mode === 'light' ? 'dark' : 'light';

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: (theme) => alpha(theme.palette.background.paper, 0.92),
        backdropFilter: 'blur(14px)',
      }}
    >
      <Toolbar
        sx={{
          minHeight: '72px !important',
          gap: { xs: 0.75, sm: 1.5 },
          px: { xs: 1.5, sm: 3 },
        }}
      >
        <Tooltip title="Open navigation">
          <IconButton
            ref={menuButtonRef}
            edge="start"
            onClick={onMenu}
            aria-label="Open navigation"
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
            sx={{ display: { md: 'none' } }}
          >
            <MenuRounded />
          </IconButton>
        </Tooltip>

        <Stack spacing={0} sx={{ minWidth: 0, alignItems: 'flex-start' }}>
          <Typography
            noWrap
            sx={{
              display: { xs: 'none', sm: 'block' },
              color: 'text.secondary',
              fontSize: '0.625rem',
              lineHeight: 1.25,
            }}
          >
            Friday, 18 September
          </Typography>
          <Typography
            noWrap
            sx={{
              mt: { xs: 0, sm: 0.25 },
              fontSize: { xs: '0.8125rem', sm: '0.875rem' },
              fontWeight: 750,
            }}
          >
            Portfolio overview
          </Typography>
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          spacing={0.75}
          sx={{
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            color: 'text.secondary',
          }}
        >
          <Box
            aria-hidden="true"
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: 'success.main',
            }}
          />
          <Typography sx={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
            Last synced 8 min ago
          </Typography>
        </Stack>
        <Tooltip title={`Use ${nextMode} theme`}>
          <IconButton
            onClick={onToggleMode}
            aria-label={`Use ${nextMode} theme`}
          >
            {mode === 'light' ? <DarkModeRounded /> : <LightModeRounded />}
          </IconButton>
        </Tooltip>
        <Avatar
          aria-label="Signed in as Maya Chen"
          sx={{
            width: 36,
            height: 36,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            fontSize: '0.78rem',
            fontWeight: 800,
          }}
        >
          MC
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}

function MetricCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: ReactNode;
}) {
  return (
    <Card component="article" sx={{ p: { xs: 2, sm: 2.5 } }}>
      <Stack
        direction="row"
        spacing={1.5}
        sx={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Typography
          component="p"
          sx={{
            color: 'text.secondary',
            fontSize: '0.8125rem',
            fontWeight: 650,
          }}
        >
          {label}
        </Typography>
        <Box
          aria-hidden="true"
          sx={{
            display: 'grid',
            width: 32,
            height: 32,
            flexShrink: 0,
            placeItems: 'center',
            borderRadius: 2,
            bgcolor: 'action.selected',
            color: 'primary.main',
          }}
        >
          {icon}
        </Box>
      </Stack>
      <Typography
        component="p"
        sx={{
          mt: 1.25,
          fontSize: { xs: '1.85rem', sm: '2.15rem' },
          fontWeight: 780,
          lineHeight: 1,
          letterSpacing: '-0.04em',
        }}
      >
        {value}
      </Typography>
      <Typography
        component="p"
        sx={{ mt: 1.25, color: 'text.secondary', fontSize: '0.8125rem' }}
      >
        {detail}
      </Typography>
    </Card>
  );
}

function DeliveryTrend() {
  const points = trend
    .map((item, index) => `${24 + index * 96},${chartY(item.value)}`)
    .join(' ');

  return (
    <Card
      component="section"
      aria-labelledby="delivery-title"
      sx={{ height: '100%', p: { xs: 2.5, sm: 3 } }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
      >
        <Box>
          <Typography variant="overline" color="text.secondary">
            Analytics
          </Typography>
          <Typography id="delivery-title" component="h2" variant="h2">
            Delivery trend
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography
            sx={{
              color: 'primary.main',
              fontSize: '2rem',
              fontWeight: 780,
              lineHeight: 1,
              letterSpacing: '-0.04em',
            }}
          >
            91%
          </Typography>
          <Typography
            sx={{ mt: 0.65, color: 'text.secondary', fontSize: '0.75rem' }}
          >
            On-time delivery
          </Typography>
        </Box>
      </Stack>

      <Box
        component="svg"
        viewBox="0 0 720 230"
        role="img"
        aria-labelledby="delivery-chart-title delivery-chart-description"
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          height: 'auto',
          mt: 2.5,
          overflow: 'visible',
          '& .chart-grid': { stroke: theme.palette.divider },
          '& .chart-label': {
            fill: theme.palette.text.secondary,
            fontFamily: theme.typography.fontFamily,
            fontSize: 11,
          },
          '& .chart-line': { stroke: theme.palette.primary.main },
          '& .chart-dot': {
            fill: theme.palette.background.paper,
            stroke: theme.palette.primary.main,
          },
          '& .chart-dot-latest': {
            fill: theme.palette.primary.main,
            stroke: theme.palette.background.paper,
          },
          '& .chart-area-start': { stopColor: theme.palette.primary.main },
        })}
      >
        <title id="delivery-chart-title">
          On-time delivery from week 31 to week 38
        </title>
        <desc id="delivery-chart-description">
          W31: 62%; W32: 68%; W33: 66%; W34: 73%; W35: 78%; W36: 81%; W37: 86%;
          W38: 91%.
        </desc>
        <defs>
          <linearGradient id="delivery-area" x1="0" y1="0" x2="0" y2="1">
            <stop className="chart-area-start" offset="0%" stopOpacity="0.3" />
            <stop
              className="chart-area-start"
              offset="100%"
              stopOpacity="0.02"
            />
          </linearGradient>
        </defs>
        {[50, 75, 100].map((value) => (
          <g key={value}>
            <line
              className="chart-grid"
              x1="24"
              x2="696"
              y1={chartY(value)}
              y2={chartY(value)}
              strokeDasharray="4 7"
            />
            <text
              className="chart-label"
              x="0"
              y={chartY(value) + 4}
              textAnchor="start"
            >
              {value}%
            </text>
          </g>
        ))}
        <polygon
          points={`${points} 696,190 24,190`}
          fill="url(#delivery-area)"
        />
        <polyline
          className="chart-line"
          points={points}
          fill="none"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {trend.map((item, index) => {
          const x = 24 + index * 96;
          const y = chartY(item.value);
          const latest = index === trend.length - 1;
          return (
            <g key={item.week}>
              <circle
                className={`chart-dot${latest ? ' chart-dot-latest' : ''}`}
                cx={x}
                cy={y}
                r={latest ? 6 : 4.5}
                strokeWidth={latest ? 4 : 3}
                vectorEffect="non-scaling-stroke"
              />
              <text className="chart-label" x={x} y="216" textAnchor="middle">
                {item.week}
              </text>
            </g>
          );
        })}
      </Box>
    </Card>
  );
}

function TeamCapacity() {
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

export interface AppProps {
  mode: PaletteMode;
  onToggleMode: () => void;
}

export default function App({ mode, onToggleMode }: AppProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const shouldRestoreMenuFocus = useRef(false);

  const closeMobileNavigation = () => {
    shouldRestoreMenuFocus.current = true;
    setMobileOpen(false);
  };

  useEffect(() => {
    if (!window.matchMedia) return;

    const desktop = window.matchMedia(desktopMedia);
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        shouldRestoreMenuFocus.current = false;
        setMobileOpen(false);
      }
    };

    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  return (
    <>
      <Box
        component="a"
        className="skip-link"
        href="#main-content"
        sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}
      >
        Skip to dashboard content
      </Box>

      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Box
          component="aside"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
          <Drawer
            variant="permanent"
            open
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                borderRight: '1px solid',
                borderColor: 'divider',
              },
            }}
          >
            <Navigation />
          </Drawer>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={closeMobileNavigation}
            ModalProps={{ keepMounted: true, disableRestoreFocus: true }}
            slotProps={{
              paper: {
                id: 'mobile-navigation',
                'aria-label': 'Mobile navigation',
              },
              transition: {
                onExited: () => {
                  if (
                    shouldRestoreMenuFocus.current &&
                    !window.matchMedia?.(desktopMedia).matches
                  ) {
                    menuButtonRef.current?.focus();
                  }
                  shouldRestoreMenuFocus.current = false;
                },
              },
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                width: Math.min(drawerWidth + 28, 300),
              },
            }}
          >
            <Navigation
              onNavigate={closeMobileNavigation}
              onClose={closeMobileNavigation}
            />
          </Drawer>
        </Box>

        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <TopBar
            mode={mode}
            mobileOpen={mobileOpen}
            menuButtonRef={menuButtonRef}
            onMenu={() => setMobileOpen(true)}
            onToggleMode={onToggleMode}
          />

          <Box
            component="main"
            id="main-content"
            tabIndex={-1}
            sx={{
              width: '100%',
              maxWidth: 1440,
              mx: 'auto',
              px: { xs: 2, sm: 3, lg: 4 },
              pt: { xs: 4, md: 5 },
              pb: 4,
              outline: 0,
            }}
          >
            <Stack
              component="header"
              id="overview"
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2.5}
              sx={{
                alignItems: { xs: 'flex-start', sm: 'flex-end' },
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Typography variant="overline" color="primary.main">
                  Cycle 18 / Weekly review
                </Typography>
                <Typography component="h1" variant="h1" sx={{ mt: 1 }}>
                  Portfolio overview
                </Typography>
                <Typography
                  sx={{
                    maxWidth: 650,
                    mt: 1.5,
                    color: 'text.secondary',
                    fontSize: { xs: '0.95rem', sm: '1rem' },
                  }}
                >
                  Track delivery, capacity, and risk across every active
                  project.
                </Typography>
              </Box>
              <Chip
                icon={<MonitorHeartRounded />}
                label="15 active / 3 need attention"
                color="primary"
                variant="outlined"
                sx={{ bgcolor: 'background.paper' }}
              />
            </Stack>

            <Box
              component="section"
              aria-label="Portfolio metrics"
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, minmax(0, 1fr))',
                  lg: 'repeat(4, minmax(0, 1fr))',
                },
                gap: 2,
                mt: 4,
              }}
            >
              {metrics.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
              ))}
            </Box>

            <Box
              id="analytics"
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'minmax(0, 1fr)',
                  lg: 'minmax(0, 2fr) minmax(280px, 1fr)',
                },
                gap: 2,
                mt: 2,
              }}
            >
              <DeliveryTrend />
              <TeamCapacity />
            </Box>

            <Box sx={{ mt: 2 }}>
              <ProjectsTable />
            </Box>

            <Stack
              component="footer"
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              sx={{
                justifyContent: 'space-between',
                mt: 4,
                pt: 2.5,
                borderTop: '1px solid',
                borderColor: 'divider',
                color: 'text.secondary',
              }}
            >
              <Typography sx={{ fontSize: '0.75rem' }}>
                Meridian / Portfolio operations
              </Typography>
              <Typography sx={{ fontSize: '0.75rem' }}>
                Static demo data / Updated 18 September 2026
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}
