import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table, Modal, TextInput, Label } from "flowbite-react";
import { Button } from "flowbite-react";
import Swal from "sweetalert2";
import { deleteUserThunk, fetchUserThunk } from "../../redux/thunks/UserThunk";
import { selectUserList } from "../../redux/reducers/UserSlice";

export default function UserTableComponent() {
  const dispatch = useDispatch();
  const allUser = useSelector(selectUserList);

  useEffect(() => {
    dispatch(fetchUserThunk());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserThunk(id))
          .unwrap()
          .then(() => {
            Swal.fire("Deleted Successfully!");
            dispatch(fetchUserThunk());
          })
          .catch((error) => {
            console.error("Error deleting fish:", error);
            Swal.fire({
              title: "Error!",
              text: error || "Could not delete the fish.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="overflow-x-auto" style={{ width: "100%" }}>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Phone number</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>

          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {allUser.map((user) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.phoneNumber}</Table.Cell>
              <Table.Cell>{user.address}</Table.Cell>

              <Table.Cell style={{ display: "flex", gap: 4 }}>
                <Button color="failure" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>{" "}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
