import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  MenuItem,
  ClickAwayListener,
  Grow,
  Popper,
  MenuList,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export interface SubMenuItem {
  label: string;
  path: string;
}

interface SubmenuDropdownProps {
  label: string;
  path: string;
  children?: SubMenuItem[];
  onClose?: () => void;
  isTabItem?: boolean;
}

const SubmenuDropdown: React.FC<SubmenuDropdownProps> = ({ 
  label, 
  path, 
  children = [],
  onClose,
  isTabItem = false 
}) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const hasChildren = children && children.length > 0;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const handleLinkClick = (event: React.MouseEvent) => {
    if (!hasChildren) {
      if (onClose) {
        onClose();
      }
    } else {
      // If there are children, prevent navigation and just show the dropdown
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (!hasChildren) {
      setOpen(false);
    }
  }, [hasChildren]);

  if (isTabItem) {
    return (
      <Box
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          cursor: 'pointer',
          height: '100%'
        }}
      >
        <Typography
          component={Link}
          to={path}
          onClick={handleLinkClick}
          sx={{ 
            textDecoration: 'none', 
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
            px: 2,
            height: '100%'
          }}
        >
          {label}
          {hasChildren && (open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />)}
        </Typography>
        
        {hasChildren && (
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
            placement="bottom-start"
            style={{ zIndex: theme.zIndex.appBar + 1 }}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper elevation={3}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow">
                      {children.map((item) => (
                        <MenuItem 
                          key={item.label} 
                          component={Link} 
                          to={item.path} 
                          onClick={(e) => { handleClose(e); if (onClose) onClose(); }}
                          sx={{ minWidth: 180 }}
                        >
                          {item.label}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        )}
      </Box>
    );
  }
  
  // Mobile menu item with submenu
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={hasChildren ? handleToggle : undefined}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          py: 1,
          cursor: hasChildren ? 'pointer' : 'default'
        }}
      >
        <Typography
          component={hasChildren ? 'div' : Link}
          to={hasChildren ? undefined : path}
          onClick={handleLinkClick}
          sx={{ 
            textDecoration: 'none', 
            color: 'inherit',
            fontWeight: 500,
          }}
        >
          {label}
        </Typography>
        {hasChildren && (open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />)}
      </Box>
      
      {open && hasChildren && (
        <Box sx={{ mt: 1, mb: 1 }}>
          {children.map((item) => (
            <MenuItem 
              key={item.label} 
              component={Link} 
              to={item.path} 
              onClick={(e) => { if (onClose) onClose(); }}
              sx={{ 
                justifyContent: 'center',
                py: 0.5,
                fontSize: '0.9em'
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SubmenuDropdown;
