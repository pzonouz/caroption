import { CategoryType } from "@/app/actions/categories.action";
import { Box, Modal } from "@mui/material";

const ModalComponenet = ({
  open,
  setOpen,
  children,
}: {
  open: any;
  setOpen: Function;
  children: React.ReactElement;
}) => {
  return (
    <Modal
      id="modal"
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Box
        sx={{
          width: "90%",
          marginX: "auto",
          marginTop: "2rem",
          backgroundColor: "white",
          maxHeight: "90vh",
          overflow: "hidden",
          overflowY: "scroll",
          paddingBottom: "3rem",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export { ModalComponenet };
