import {
  alpha,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
} from '@mui/material';
import {
  FolderRounded,
  GroupsRounded,
  InsightsRounded,
  SpaceDashboardRounded,
} from '@mui/icons-material';
import NavigationBrand from './NavigationBrand';
import NavigationCycle from './NavigationCycle';

const navItems = [
  { label: 'Overview', href: '#overview', icon: <SpaceDashboardRounded /> },
  { label: 'Analytics', href: '#analytics', icon: <InsightsRounded /> },
  { label: 'Projects', href: '#projects', icon: <FolderRounded /> },
  { label: 'Team', href: '#team', icon: <GroupsRounded /> },
];

export default function Navigation({
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
      <NavigationBrand onClose={onClose} />
      <Divider />
      <Typography
        variant="overline"
        sx={{ px: 3, pt: 3, color: 'text.secondary' }}
      >
        Workspace
      </Typography>
      <List component="nav" aria-label="Primary navigation" sx={{ px: 1.5 }}>
        {navItems.map((item, index) => (
          <Tooltip key={item.label} title={`Go to ${item.label}`}>
            <ListItemButton
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
          </Tooltip>
        ))}
      </List>
      <NavigationCycle />
    </Box>
  );
}
