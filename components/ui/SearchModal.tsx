import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Stack, TextField } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) !important',
  width: 500,
  borderRadius: '5px',
};

export default function SearchModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton sx={{ color: 'body.main' }} onClick={handleOpen}>
        <SearchIcon />
      </IconButton>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
          <Box sx={{...style , display: open ? 'block' : 'none' }} onClick={handleOpen}>
        <Slide direction="up" mountOnEnter unmountOnExit in={open}>
            <Stack direction="row">
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                placeholder='Search'
                sx={{backgroundColor:"body.light" , borderRadius:"5px 0 0 5px"}}
              />
              <Button variant="contained" sx={{borderRadius:"0 5px 5px 0" ,ml:"-5px"}}>
                <SearchIcon />
              </Button>
            </Stack>
        </Slide>
          </Box>
      </Modal>
    </div>
  );
}
