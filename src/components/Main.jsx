import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Stack,
} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import axios from "axios";
import { useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import { parsePhoneNumber } from "awesome-phonenumber";

const MyListItemButton = styled(ListItemButton)({
  display: "flex",
  justifyContent: "space-between",
});

const DialogButton = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
});

const Main = () => {
  const phoneNumberFormater = (phoneNumber) => {
    const pn = parsePhoneNumber(phoneNumber, "SE");
    return pn.getNumber("national");
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      setData(response.data);
    });
  }, []);

  const [phoneNumbers, setPhoneNumbers] = useState([]);

  useEffect(() => {
    if (phoneNumbers.length) return;
    setPhoneNumbers(
      data.map((e) => ({ id: e.id, phoneNumber: e.phone, ischecked: false }))
    );
  }, [data, phoneNumbers]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack>
      <DialogButton>
        <Button variant="contained" onClick={handleClickOpen}>
          Open dialog
        </Button>
      </DialogButton>
      <Dialog onClose={handleClose} open={open}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "10px",
          }}
        >
          <CloseIcon onClick={handleClose} />
          <DialogTitle sx={{ padding: 0, paddingRight: "25%" }}>
            Phone Number
          </DialogTitle>
        </Box>
        <DialogContent>
          <List>
            {phoneNumbers.map(({ id, ischecked, phoneNumber }) => (
              <>
                <ListItem key={id}>
                  <MyListItemButton
                    onClick={() => {
                      const phoneNumberClone = [...phoneNumbers];
                      const index = phoneNumbers.findIndex((r) => id === r.id);
                      const record = phoneNumbers[index];
                      record.ischecked = record.ischecked ? false : true;
                      phoneNumberClone[index] = record;
                      setPhoneNumbers(phoneNumberClone);
                    }}
                  >
                    <ListItemText primary={phoneNumberFormater(phoneNumber)} />
                    {ischecked && (
                      <ListItemIcon>
                        <CheckCircleIcon sx={{ color: "blue" }} />
                      </ListItemIcon>
                    )}
                  </MyListItemButton>
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default Main;
