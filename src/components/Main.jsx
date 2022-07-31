import { useState, useEffect, Fragment } from "react";
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
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState(null);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const phoneNumberFormater = (phoneNumber) => {
    if (phoneNumber === null) {
      return " ";
    }
    // if contain "x", remove a part which has x.
    let changeNumber = phoneNumber.split("x")[0];

    // if number start with 0, remove 0.
    if (changeNumber.startsWith("0")) {
      changeNumber = changeNumber.slice(1);
    }

    // add + at begin of number to find region.
    const pn1 = parsePhoneNumber("+" + changeNumber);

    // find region.
    let regionCode = pn1.getRegionCode();
    return (
      <div style={{ display: "flex", gap: "10px" }}>
        {/* IF phone number has region code, show the pn1.getNumber() ELSE show number without + */}
        <div>{pn1.getNumber() ?? changeNumber}</div>
        {/* like above, IF has regionCode, color is blue ELSE red */}
        <div style={{ color: regionCode ? "blue" : "red" }}>
          {regionCode ?? "Invalid Phone Number"}
        </div>
      </div>
    );
  };

  // const handleChoosePhoneNumber = (number) => {
  //   setTimeout(() => {
  //     handleClose();
  //   }, 600);
  //   setSelectedPhone(number);
  // };

  return (
    <Stack>
      <DialogButton sx={{ display: "flex", flexDirection: "column" }}>
        <Button variant="contained" onClick={handleClickOpen}>
          Open dialog
        </Button>
        <Box sx={{ marginTop: "5px" }}>
          {phoneNumberFormater(selectedPhone)}
        </Box>
      </DialogButton>
      <Dialog fullWidth onClose={handleClose} open={open}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px 20px",
            borderBottom: "1px solid black",
          }}
        >
          <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          <DialogTitle sx={{ padding: 0, width: "100%", textAlign: "center" }}>
            Phone Number
          </DialogTitle>
        </Box>
        <DialogContent>
          <List>
            {users.map((user) => (
              <Fragment key={user.id}>
                <ListItem>
                  <MyListItemButton
                    onClick={() => setSelectedPhone(user.phone)}
                    // onClick={() => handleChoosePhoneNumber(user.phone)}
                  >
                    <ListItemText primary={phoneNumberFormater(user.phone)} />
                    {user.phone === selectedPhone && (
                      <ListItemIcon>
                        <CheckCircleIcon sx={{ color: "blue" }} />
                      </ListItemIcon>
                    )}
                  </MyListItemButton>
                </ListItem>
                <Divider />
              </Fragment>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default Main;
