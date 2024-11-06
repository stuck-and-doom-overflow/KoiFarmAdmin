import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Modal, TextInput, Select, Label } from "flowbite-react";
import { selectFishPackageList } from "../../redux/reducers/FishPackageSlice";
import {
  addFishPackageThunk,
  deleteFishPackageThunk,
  fetchFishPackageThunk,
} from "../../redux/thunks/FishPackageThunk";
import { fishList } from "../../redux/reducers/FishSlice";
import { fetchFishesThunk } from "../../redux/thunks/FishThunk";
import Swal from "sweetalert2";

export default function FishPackageComponent() {
  const dispatch = useDispatch();
  const allFishPackage = useSelector(selectFishPackageList);
  const availableFish = useSelector(fishList);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [selectedFishIds, setSelectedFishIds] = useState([]);

  useEffect(() => {
    dispatch(fetchFishPackageThunk());
    dispatch(fetchFishesThunk());
  }, [dispatch]);

  const handleAddFishPackage = () => {
    const formattedFishIds = selectedFishIds.map(String);

    dispatch(
      addFishPackageThunk({
        description: newDescription,
        fishIds: formattedFishIds,
      })
    )
      .unwrap() // Unwraps the action result for error handling
      .then(() => {
        Swal.fire("Success!", "Fish package added successfully.", "success");
        setModalOpen(false);
        setNewDescription("");
        setSelectedFishIds([]);
      })
      .catch((error) => {
        Swal.fire("Error", error, "error");
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this package!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFishPackageThunk(id))
          .unwrap()
          .then(() => {
            Swal.fire("Deleted Successfully!");
            dispatch(fetchFishPackageThunk());
          })
          .catch((error) => {
            console.error("Error deleting package:", error);
            Swal.fire({
              title: "Error!",
              text: error || "Could not delete the package.",
              icon: "error",
            });
          });
      }
    });
  };
  return (
    <div className="overflow-x-auto" style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button onClick={() => setModalOpen(true)} color="success">
          Add more
        </Button>
      </div>

      <Modal show={isModalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Add New Fish Package</Modal.Header>
        <Modal.Body>
          <div className="space-y-12">
            <Label value="Description" style={{ color: "gray" }} />
            <TextInput
              style={{ marginBottom: 20 }}
              placeholder="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              required=""
            />
            <Label value="Fish name" style={{ color: "gray" }} />
            <Select
              multiple
              value={selectedFishIds}
              onChange={(e) =>
                setSelectedFishIds(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
            >
              {availableFish.map((fish) => (
                <option key={fish.id} value={fish.id}>
                  {fish.name} - {fish.id}
                </option>
              ))}
            </Select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddFishPackage} color="success">
            Add Package
          </Button>
          <Button color="gray" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Total Weight</Table.HeadCell>
          <Table.HeadCell>Total Price</Table.HeadCell>
          <Table.HeadCell>Size</Table.HeadCell>
          <Table.HeadCell>Quantity</Table.HeadCell>
          <Table.HeadCell>Fish Type</Table.HeadCell>
          <Table.HeadCell>Fish Source</Table.HeadCell>
          <Table.HeadCell>Fish Images</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {allFishPackage.map((fishPackage, packageIndex) => (
            <React.Fragment key={packageIndex}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell rowSpan={fishPackage.fishes.length + 1}>
                  {fishPackage.description}
                </Table.Cell>
                <Table.Cell rowSpan={fishPackage.fishes.length + 1}>
                  {fishPackage.totalWeight}
                </Table.Cell>
                <Table.Cell rowSpan={fishPackage.fishes.length + 1}>
                  {fishPackage.totalPrice}
                </Table.Cell>
                <Table.Cell rowSpan={fishPackage.fishes.length + 1}>
                  {fishPackage.size.join(", ")}
                </Table.Cell>
                <Table.Cell rowSpan={fishPackage.fishes.length + 1}>
                  {fishPackage.quantity}
                </Table.Cell>
              </Table.Row>
              {fishPackage.fishes.map((fish, fishIndex) => (
                <Table.Row
                  key={fishIndex}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{fish.type}</Table.Cell>
                  <Table.Cell>{fish.source}</Table.Cell>
                  <Table.Cell>
                    {fish.imageUrls.map((url, imageIndex) => (
                      <img
                        key={imageIndex}
                        src={url}
                        alt={fish.name}
                        style={{ width: 50, height: 50, marginRight: 5 }}
                      />
                    ))}
                  </Table.Cell>
                  <Table.Cell style={{ display: "flex", gap: 4 }}>
                    <Button
                      color="failure"
                      onClick={() => handleDelete(fishPackage.id)}
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </React.Fragment>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
