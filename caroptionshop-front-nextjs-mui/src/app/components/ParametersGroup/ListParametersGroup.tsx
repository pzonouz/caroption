"use client";
import { DeleteMultipleCategoryAction } from "@/app/actions/categories.action";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
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
import { CreateParametersGroup } from "./CreateParametersGroup";
import { UpdateParametersGroup } from "./UpdateParametersGroup";
import { DeleteMultipleParametersGroupAction } from "@/app/actions/parametersGroups.action";
import { DeleteParametersGroup } from "./DeleteParametersGroup";
import { ParametersGroupType } from "@/types/parameterGroup";
import { CategoryType } from "@/types/category";

const ListParametersGroup = ({
  parametersGroups,
  categories,
}: {
  parametersGroups: ParametersGroupType[];
  categories: CategoryType[];
}) => {
  const [createParameterOpen, setCreateParameterOpen] = useState(false);
  const [updateParametersGroup, setUpdateParametersGroup] = useState();
  const [deleteParametersGroup, setDeleteParametersGroup] = useState(null);

  const [filteredParametersGroups, setFilteredParametersGroups] =
    useState(parametersGroups);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const toggleChecked = (value: string) => {
    if (checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
    } else {
      setCheckedList([...checkedList, value]);
    }
  };
  const [_state, action, loading] = useActionState(
    DeleteMultipleParametersGroupAction.bind(null, checkedList),
    null,
  );
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
        <CreateParametersGroup categories={categories} />
      </ModalComponenet>
      <ModalComponenet
        open={updateParametersGroup}
        setOpen={setUpdateParametersGroup}
      >
        <UpdateParametersGroup
          categories={categories}
          parametersGroup={updateParametersGroup}
        />
      </ModalComponenet>
      <ModalComponenet
        open={deleteParametersGroup}
        setOpen={deleteParametersGroup}
      >
        <DeleteParametersGroup
          deleteParametersGroup={deleteParametersGroup}
          setOpen={setDeleteParametersGroup}
        />
      </ModalComponenet>

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
                    if (checkedList.length == filteredParametersGroups.length) {
                      setCheckedList([]);
                      return;
                    }
                    setCheckedList(
                      filteredParametersGroups?.map((item) => item.uuid!),
                    );
                  }}
                  checked={
                    checkedList.length == filteredParametersGroups.length &&
                    filteredParametersGroups.length > 0
                  }
                  value={"uuid"}
                />
              </TableCell>
              <TableCell align="left">عنوان</TableCell>
              <TableCell align="center">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredParametersGroups?.map((row) => (
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
                      setUpdateParametersGroup(row);
                    }}
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => setDeleteParametersGroup(row)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {checkedList.length > 0 && (
        <Box component="form" action={action}>
          <LoadingButton
            loading={loading}
            type="submit"
            color="error"
            variant="contained"
            sx={{ margin: "1rem", width: "fit-content" }}
          >
            حذف
          </LoadingButton>
        </Box>
      )}
    </div>
  );
};

export { ListParametersGroup };
