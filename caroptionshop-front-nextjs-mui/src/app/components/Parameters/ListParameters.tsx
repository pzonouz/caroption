"use client";
import AddIcon from "@mui/icons-material/Add";
import {
  Checkbox,
  Fab,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useActionState, useState } from "react";
import { ModalComponenet } from "../Utils/ModalComponent";
import { LoadingButton } from "@mui/lab";
import { DeleteMultipleParametersGroupAction } from "@/app/actions/parametersGroups.action";
import { CreateParameter } from "./CreateParameters";
import { ParametersGroupType } from "@/types/parameterGroup";
import { ParameterType } from "@/types/parameter";
import { CategoryType } from "@/types/category";
import { UpdateParameter } from "./UpdateParameters";

const ListParameters = ({
  parameterGroups,
  parameters,
  categories,
  recursiveCategories,
}: {
  parameterGroups: ParametersGroupType[];
  parameters: ParameterType[];
  categories: CategoryType[];
  recursiveCategories: CategoryType[];
}) => {
  const [createParameterOpen, setCreateParameterOpen] = useState(false);
  const [updateParameter, setUpdateParameter] = useState();
  const [deleteParameter, setDeleteParameter] = useState(null);

  const [filteredParameters, setFilteredParameters] = useState(parameters);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const toggleChecked = (value: string) => {
    if (checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
    } else {
      setCheckedList([...checkedList, value]);
    }
  };
  // const [_state, action, loading] = useActionState(
  //   DeleteMultipleParametersAction.bind(null, checkedList),
  //   null,
  // );
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        marginBottom: "3rem",
      }}
    >
      <Fab
        onClick={() => setCreateParameterOpen(true)}
        color="primary"
        sx={{ position: "fixed", left: "1rem", bottom: "1rem" }}
      >
        <AddIcon />
      </Fab>
      <ModalComponenet
        open={createParameterOpen}
        setOpen={setCreateParameterOpen}
      >
        <CreateParameter
          recursiveCategories={recursiveCategories}
          categories={categories}
        />
      </ModalComponenet>
      <ModalComponenet open={updateParameter} setOpen={setUpdateParameter}>
        <UpdateParameter
          recursiveCategories={recursiveCategories}
          parameter={updateParameter}
          categories={categories}
        />
      </ModalComponenet>
      {/* <ModalComponenet */}
      {/*   open={deleteParametersGroup} */}
      {/*   setOpen={deleteParametersGroup} */}
      {/* > */}
      {/*   <DeleteParametersGroup */}
      {/*     deleteParametersGroup={deleteParametersGroup} */}
      {/*     setOpen={setDeleteParametersGroup} */}
      {/*   /> */}
      {/* </ModalComponenet> */}

      {/* <SelectCategory */}
      {/*   selectedCategory={selectedCategory} */}
      {/*   setSelectedCategory={setSelectedCategory} */}
      {/*   categories={parentCategories} */}
      {/* /> */}
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Checkbox
                  onChange={() => {
                    if (checkedList.length == filteredParameters.length) {
                      setCheckedList([]);
                      return;
                    }
                    setCheckedList(
                      filteredParameters?.map((item) => item.uuid!),
                    );
                  }}
                  checked={
                    checkedList.length == filteredParameters.length &&
                    filteredParameters.length > 0
                  }
                  value={"uuid"}
                />
              </TableCell>
              <TableCell align="left">عنوان</TableCell>
              <TableCell align="center">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredParameters?.map((row) => (
              <TableRow
                key={row.uuid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Checkbox
                    onChange={(e) => {
                      toggleChecked(row?.uuid!);
                    }}
                    checked={row?.uuid ? checkedList.includes(row.uuid) : false}
                    value={row?.uuid || "uuid"}
                  />
                </TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => {
                      setUpdateParameter(row);
                    }}
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => setDeleteParameter(row)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {checkedList.length > 0 && ( */}
      {/*   <Box component="form" action={action}> */}
      {/*     <LoadingButton */}
      {/*       loading={loading} */}
      {/*       type="submit" */}
      {/*       color="error" */}
      {/*       variant="contained" */}
      {/*       sx={{ margin: "1rem", width: "fit-content" }} */}
      {/*     > */}
      {/*       حذف */}
      {/*     </LoadingButton> */}
      {/*   </Box> */}
      {/* )} */}
    </div>
  );
};

export { ListParameters };
