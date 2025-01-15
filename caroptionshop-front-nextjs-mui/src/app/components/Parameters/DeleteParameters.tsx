"use client";

import {
  DeleteParametersGroupAction,
  ParametersGroupType,
} from "@/app/actions/parametersGroups.action";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
const DeleteParametersGroup = ({
  deleteParametersGroup,
  setOpen,
}: {
  deleteParametersGroup: ParametersGroupType | null;
  setOpen: Function;
}) => {
  const [state, action, loading] = useActionState(
    DeleteParametersGroupAction.bind(null, deleteParametersGroup?.uuid!),
    null,
  );
  useEffect(() => {
    if (state?.success) {
      setOpen(null);
      redirect("/admin/parameters-groups");
    }
  }, [state]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "8rem",
        marginTop: "4rem",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Typography variant="h5">آيا مطمئن هستید؟</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "8rem",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Box component="form" action={action}>
          <LoadingButton
            loading={loading}
            type="submit"
            variant="contained"
            color="error"
          >
            بله
          </LoadingButton>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setOpen(null);
          }}
        >
          خیر
        </Button>
      </Box>
    </Box>
  );
};
export { DeleteParametersGroup };
