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
// import { parsePhoneNumber } from "awesome-phonenumber";

const MyListItemButton = styled(ListItemButton)({
  display: "flex",
  justifyContent: "space-between",
});

const DialogButton = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  flexDirection: "column",
  textAlign: "center",
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

  // const phoneNumberFormater = (phoneNumber) => {
  //   // if contain "x", remove a part which has x.
  //   let changeNumber = phoneNumber.split("x")[0];

  //   // if number start with 0, remove 0.
  //   if (changeNumber.startsWith("0")) {
  //     changeNumber = changeNumber.slice(1);
  //   }

  //   // add + at begin of number to find region.
  //   const pn1 = parsePhoneNumber("+" + changeNumber);

  //   // find region.
  //   let regionCode = pn1.getRegionCode();
  //   return regionCode ? (
  //     //  IF phone number has region code, show the pn1.getNumber() ELSE show number without +
  //     <div>{pn1.getNumber("international") ?? changeNumber}</div>
  //   ) : (
  //     // Invalid Phone Number
  //     <div style={{ color: regionCode ? "blue" : "red" }}>
  //       {regionCode ?? "Invalid Phone Number"}
  //     </div>
  //   );
  // };

  const phoneNumberFormater1 = (phoneNumber) => {
    if (!phoneNumber) return;
    // if contain "x", remove a part which has x.
    let changeNumber = phoneNumber.split("x")[0];

    // if number start with 0, remove 0.
    if (changeNumber.startsWith("0")) {
      changeNumber = changeNumber.slice(1);
    }

    changeNumber =
      "+" +
      changeNumber
        .replaceAll("-", "")
        .replaceAll(".", "")
        .replaceAll("(", "")
        .replaceAll(")", "");

    let totalLetter = changeNumber.split("").reduce((total, letter, index) => {
      if (index !== 0 && index % 4 === 0) {
        letter = " " + letter;
      }
      return total + letter;
    });

    return totalLetter;
  };

  const closeItem = (number) => {
    setTimeout(() => {
      handleClose();
    }, 400);
    setSelectedPhone(number);
  };

  return (
    <Stack>
      <DialogButton sx={{ display: "flex", flexDirection: "column" }}>
        <Button variant="contained" onClick={handleClickOpen}>
          Open dialog
        </Button>
        <Box sx={{ marginTop: "5px" }}>
          <Box>Your selected number :</Box>
          {phoneNumberFormater1(selectedPhone)}
        </Box>
      </DialogButton>
      <Dialog fullWidth onClose={handleClose} open={open}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px 25px",
          }}
        >
          <CloseIcon
            sx={{
              cursor: "pointer",
              padding: "3px",
              width: "5%",
              "&:hover": {
                color: "000",
                borderRadius: "50%",
                backgroundColor: "#e1e1e1",
              },
            }}
            onClick={handleClose}
          />
          <DialogTitle
            sx={{
              padding: 0,
              width: "95%",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Phone Number
          </DialogTitle>
        </Box>
        <DialogContent>
          <List>
            {users.map((user) => (
              <Fragment key={user.id}>
                <ListItem onClick={() => closeItem(user.phone)}>
                  <MyListItemButton>
                    <ListItemText
                      sx={{ color: "000000" }}
                      primary={phoneNumberFormater1(user.phone)}
                    />
                    {user.phone === selectedPhone && (
                      <ListItemIcon>
                        <CheckCircleIcon
                          sx={{
                            color: "#2196f3",
                          }}
                        />
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
