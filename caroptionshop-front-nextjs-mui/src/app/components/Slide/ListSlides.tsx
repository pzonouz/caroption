"use client";
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
import { useActionState, useEffect, useState } from "react";
import { ModalComponenet } from "../Utils/ModalComponent";
import { LoadingButton } from "@mui/lab";
import { SlideType } from "@/types/slide";
import { FileType } from "@/types/file";
import { CreateSlide } from "./CreateSlide";
import Image from "next/image";

const ListSlides = ({
  slides,
  images,
}: {
  slides: SlideType[];
  images: FileType[];
}) => {
  const [createSlideOpen, setCreateSlideOpen] = useState(false);
  const [updateSlide, setUpdateSlide] = useState(null);
  const [deleteSlide, setDeleteSlide] = useState(null);

  const [selectedSlide, setSelectedSlide] = useState<SlideType | number>(0);

  const [filteredSlides, setFilteredSlides] = useState(slides);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const toggleChecked = (value: string) => {
    if (checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
    } else {
      setCheckedList([...checkedList, value]);
    }
  };
  // const [_state, action, loading] = useActionState(
  //   DeleteMultipleSlideAction.bind(null, checkedList),
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
        onClick={() => setCreateSlideOpen(true)}
        color="primary"
        sx={{ position: "fixed", left: "1rem", bottom: "1rem" }}
      >
        <AddIcon />
      </Fab>
      <ModalComponenet open={createSlideOpen} setOpen={setCreateSlideOpen}>
        <CreateSlide slides={slides} images={images} />
      </ModalComponenet>
      {/* <ModalComponenet open={updateSlide} setOpen={setUpdateSlide}> */}
      {/*   <UpdateSlide */}
      {/*     categories={categories} */}
      {/*     images={images} */}
      {/*     slide={updateSlide!} */}
      {/*   /> */}
      {/* </ModalComponenet> */}
      {/* <ModalComponenet open={deleteSlide} setOpen={setDeleteSlide}> */}
      {/*   <DeleteSlide */}
      {/*     slide={deleteSlide!} */}
      {/*     setOpen={setDeleteSlide} */}
      {/*   /> */}
      {/* </ModalComponenet> */}

      {/* <SelectSlide */}
      {/*   selectedSlide={selectedSlide} */}
      {/*   setSelectedSlide={setSelectedSlide} */}
      {/*   categories={parentSlides} */}
      {/* /> */}
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Checkbox
                  onChange={() => {
                    if (checkedList.length == filteredSlides.length) {
                      setCheckedList([]);
                      return;
                    }
                    setCheckedList(filteredSlides?.map((item) => item.uuid!));
                  }}
                  checked={checkedList.length == filteredSlides.length}
                  value={"uuid"}
                />
              </TableCell>
              <TableCell align="left">عنوان</TableCell>
              <TableCell align="center">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSlides?.map((row) => (
              <TableRow
                key={row.uuid}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "end",
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
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
                <TableCell align="center">
                  <Image
                    alt=""
                    src={
                      images?.filter((item) => item?.uuid == row?.image)?.[0]
                        ?.file
                    }
                    width={100}
                    height={20}
                  />
                </TableCell>
                <TableCell sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    onClick={() => {
                      setUpdateSlide(row);
                    }}
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => setDeleteSlide(row)}>
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

export { ListSlides };
