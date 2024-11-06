import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFishesThunk,
  updateFishThunk,
  createFishThunk,
  deleteFishThunk,
} from "../../redux/thunks/FishThunk";
import { Table, Modal, TextInput, Label, Button } from "flowbite-react";
import { fishList } from "../../redux/reducers/FishSlice";
import Swal from "sweetalert2";

export function FishTableComponent() {
  const dispatch = useDispatch();
  const allFish = useSelector(fishList);
  const [editFish, setEditFish] = useState(null);
  const [editFishModalOpen, setEditFishModalOpen] = useState(false);
  const [newFishModalOpen, setNewFishModalOpen] = useState(false);
  const [newFish, setNewFish] = useState({
    name: "",
    type: "",
    weight: 0,
    imageUrls: [""],
    sex: true,
    size: 0,
    source: "",
    price: 0,
  });

  useEffect(() => {
    dispatch(fetchFishesThunk());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this fish!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFishThunk(id))
          .unwrap()
          .then(() => {
            Swal.fire("Deleted Successfully!");
            dispatch(fetchFishesThunk());
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

  const handleEditClick = (fish) => {
    setEditFish(fish);
    setEditFishModalOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editFish) {
      dispatch(updateFishThunk({ id: editFish.id, updatedFish: editFish }))
        .unwrap()
        .then(() => {
          Swal.fire("Updated Successfully!");
          setEditFish(null);
          setEditFishModalOpen(false);
          dispatch(fetchFishesThunk());
        })
        .catch((error) => {
          console.error("Error updating fish:", error);
          Swal.fire("Error updating fish.");
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFish((prev) => ({
      ...prev,
      [name]: name === "sex" ? value === "true" : value,
    }));
  };

  const handleCreateFish = (e) => {
    e.preventDefault();
    dispatch(createFishThunk(newFish))
      .unwrap()
      .then(() => {
        Swal.fire("Fish Created Successfully!");
        resetNewFish();
        setNewFishModalOpen(false);
        dispatch(fetchFishesThunk());
      })
      .catch((error) => {
        console.error("Error creating fish:", error);
        Swal.fire("Error creating fish.");
      });
  };

  const handleImageChange = (e) => {
    const url = e.target.value; // Getting the URL string
    setNewFish((prev) => ({ ...prev, imageUrls: [url] })); // Set the URL string in imageUrls
  };

  const resetNewFish = () => {
    setNewFish({
      name: "",
      type: "",
      weight: 0,
      imageUrls: [""], // Reset to empty string array
      sex: true,
      size: 0,
      source: "",
      price: 0,
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
        <Button onClick={() => setNewFishModalOpen(true)} color="success">
          Add more
        </Button>
      </div>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Fish name</Table.HeadCell>
          <Table.HeadCell>Type</Table.HeadCell>
          <Table.HeadCell>Weight</Table.HeadCell>
          <Table.HeadCell>Size</Table.HeadCell>
          <Table.HeadCell>Sex</Table.HeadCell>
          <Table.HeadCell>Source</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Images</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {allFish.map((fish) => (
            <Table.Row
              key={fish.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {fish.name}
              </Table.Cell>
              <Table.Cell>{fish.type}</Table.Cell>
              <Table.Cell>{fish.weight} kg</Table.Cell>
              <Table.Cell>{fish.size} cm</Table.Cell>
              <Table.Cell style={{ color: fish.sex ? "red" : "green" }}>
                {fish.sex ? "Male" : "Female"}
              </Table.Cell>
              <Table.Cell>{fish.source}</Table.Cell>
              <Table.Cell>{fish.price} VND</Table.Cell>
              <Table.Cell>
                {fish.imageUrls.map((url, index) => {
                  if (url) {
                    return (
                      <img
                        key={index}
                        src={url}
                        alt={`${fish.name} - ${index + 1}`}
                        className="h-16 w-16 object-cover rounded"
                      />
                    );
                  } else {
                    return null; 
                  }
                })}
              </Table.Cell>

              <Table.Cell style={{ display: "flex", gap: 4 }}>
                <Button onClick={() => handleEditClick(fish)}>Edit</Button>
                <Button color="failure" onClick={() => handleDelete(fish.id)}>
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {newFishModalOpen && (
        <Modal show={true} onClose={() => setNewFishModalOpen(false)}>
          <Modal.Header>Add Fish</Modal.Header>
          <Modal.Body>
            <form
              onSubmit={handleCreateFish}
              className="flex flex-col gap-4 my-4"
            >
              <Label value="Fish name" style={{ color: "grey" }} />
              <TextInput
                name="name"
                required
                placeholder="Alicee"
                value={newFish.name}
                onChange={(e) =>
                  setNewFish({ ...newFish, name: e.target.value })
                }
              />
              <Label value="Fish type" style={{ color: "grey" }} />
              <TextInput
                name="type"
                placeholder="Type"
                required
                value={newFish.type}
                onChange={(e) =>
                  setNewFish({ ...newFish, type: e.target.value })
                }
              />
              <Label value="Weight(kg)" style={{ color: "grey" }} />
              <TextInput
                name="weight"
                required
                placeholder="Weight (kg)"
                value={newFish.weight}
                onChange={(e) =>
                  setNewFish({ ...newFish, weight: Number(e.target.value) })
                }
              />
              <Label value="Size(cm)" style={{ color: "grey" }} />
              <TextInput
                name="size"
                placeholder="Size (cm)"
                required
                value={newFish.size}
                onChange={(e) =>
                  setNewFish({ ...newFish, size: Number(e.target.value) })
                }
              />
              <div>
                <Label value="Sex" style={{ color: "grey" }} />
                <select
                  name="sex"
                  required
                  value={newFish.sex.toString()}
                  onChange={(e) =>
                    setNewFish({ ...newFish, sex: e.target.value === "true" })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                >
                  <option value="true">Male</option>
                  <option value="false">Female</option>
                </select>
              </div>
              <Label value="Origins" style={{ color: "grey" }} />
              <TextInput
                name="source"
                placeholder="Source"
                value={newFish.source}
                required
                onChange={(e) =>
                  setNewFish({ ...newFish, source: e.target.value })
                }
              />
              <Label value="Price(VND)" style={{ color: "grey" }} />
              <TextInput
                name="price"
                placeholder="Price"
                required
                value={newFish.price}
                onChange={(e) =>
                  setNewFish({ ...newFish, price: Number(e.target.value) })
                }
              />
              <Label value="Image URL" style={{ color: "grey" }} />
              <TextInput
                name="imageUrls"
                placeholder="Image URL"
                required
                value={newFish.imageUrls[0]}
                onChange={handleImageChange}
              />
              <div className="mt-6 flex justify-end">
                <Button type="submit">Save Fish</Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      )}

      {editFishModalOpen && (
        <Modal show={true} onClose={() => setEditFishModalOpen(false)}>
          <Modal.Header>Edit Fish</Modal.Header>
          <Modal.Body>
            <form onSubmit={handleUpdate} className="flex flex-col gap-4 my-4">
              <Label value="Fish name" style={{ color: "grey" }} />
              <TextInput
                name="name"
                required
                value={editFish?.name || ""}
                onChange={handleChange}
              />
              <Label value="Fish type" style={{ color: "grey" }} />
              <TextInput
                name="type"
                required
                value={editFish?.type || ""}
                onChange={handleChange}
              />
              <Label value="Weight(kg)" style={{ color: "grey" }} />
              <TextInput
                name="weight"
                required
                value={editFish?.weight || ""}
                onChange={handleChange}
              />
              <Label value="Size(cm)" style={{ color: "grey" }} />
              <TextInput
                name="size"
                required
                value={editFish?.size || ""}
                onChange={handleChange}
              />
              <div>
                <Label value="Sex" style={{ color: "grey" }} />
                <select
                  name="sex"
                  required
                  value={editFish?.sex.toString() || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                >
                  <option value="true">Male</option>
                  <option value="false">Female</option>
                </select>
              </div>
              <Label value="Origins" style={{ color: "grey" }} />
              <TextInput
                name="source"
                value={editFish?.source || ""}
                onChange={handleChange}
              />
              <Label value="Price" style={{ color: "grey" }} />
              <TextInput
                name="price"
                value={editFish?.price || ""}
                onChange={handleChange}
              />
              <Label value="Image URL" style={{ color: "grey" }} />
              <TextInput
                name="imageUrls"
                value={editFish?.imageUrls[0] || ""}
                onChange={(e) =>
                  setEditFish({
                    ...editFish,
                    imageUrls: [e.target.value],
                  })
                }
              />
              <div className="mt-6 flex justify-end">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
