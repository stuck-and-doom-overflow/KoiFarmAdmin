import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal, TextInput, Button, Label } from "flowbite-react";
import {
  addNewsThunk,
  deleteNewsThunk,
  editNewsThunk,
  fetchNewsThunk,
} from "../../redux/thunks/NewsThunk";
import { selectNewsList } from "../../redux/reducers/NewsSlice";
import Swal from "sweetalert2";

export default function NewsTableThunk() {
  const dispatch = useDispatch();
  const allNews = useSelector(selectNewsList);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentNewsId, setCurrentNewsId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    dispatch(fetchNewsThunk());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this news!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteNewsThunk(id))
          .unwrap()
          .then(() => {
            Swal.fire("Deleted Successfully!");
            dispatch(fetchNewsThunk());
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: error || "Could not delete the news.",
              icon: "error",
            });
          });
      }
    });
  };

  const openEditModal = (news) => {
    setCurrentNewsId(news.id);
    setTitle(news.title);
    setContent(news.content);
    setImageUrl(news.imageUrl.join(", "));
    setIsEditMode(true);
    setModalOpen(true);
  };

  const handleAddOrEditNews = () => {
    if (isEditMode) {
      dispatch(
        editNewsThunk({
          id: currentNewsId,
          title,
          content,
          imageUrl: [imageUrl],
        })
      )
        .unwrap()
        .then(() => {
          Swal.fire("Success!", "News updated successfully.", "success");
          closeAndResetModal();
          dispatch(fetchNewsThunk());
        })
        .catch((error) => {
          Swal.fire("Error!", error || "Failed to update news", "error");
        });
    } else {
      dispatch(
        addNewsThunk({
          title,
          content,
          imageUrl: [imageUrl],
        })
      )
        .unwrap()
        .then(() => {
          Swal.fire("Success!", "News added successfully.", "success");
          closeAndResetModal();
          dispatch(fetchNewsThunk());
        })
        .catch((error) => {
          Swal.fire("Error!", error || "Failed to add news", "error");
        });
    }
  };

  const closeAndResetModal = () => {
    setModalOpen(false);
    setIsEditMode(false);
    setCurrentNewsId(null);
    setTitle("");
    setContent("");
    setImageUrl("");
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
        <Button color="success" onClick={() => setModalOpen(true)}>
          Add more
        </Button>
      </div>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Content</Table.HeadCell>
          <Table.HeadCell>Images</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {allNews.map((news) => (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              key={news.id}
            >
              <Table.Cell>{news.title}</Table.Cell>
              <Table.Cell>{news.content}</Table.Cell>
              <Table.Cell>
                {news.imageUrl.map(
                  (url, index) =>
                    url && (
                      <img
                        key={index}
                        src={url}
                        alt={`${news.id} - ${index + 1}`}
                        className="h-16 w-16 object-cover rounded"
                      />
                    )
                )}
              </Table.Cell>
              <Table.Cell style={{ display: "flex", gap: 4 }}>
                <Button onClick={() => openEditModal(news)}>Edit</Button>
                <Button color="failure" onClick={() => handleDelete(news.id)}>
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Modal show={isModalOpen} onClose={closeAndResetModal}>
        <Modal.Header>{isEditMode ? "Edit News" : "Add News"}</Modal.Header>
        <Modal.Body>
          <div
            className="space-y-6"
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            <Label htmlFor="title" style={{ color: "gray" }}>
              Title
            </Label>
            <TextInput
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Label htmlFor="content" style={{ color: "gray" }}>
              Content
            </Label>
            <TextInput
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Label htmlFor="imageUrl" style={{ color: "gray" }}>
              Image URL
            </Label>
            <TextInput
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
        </Modal.Body>
        <div style={{ display: "flex", gap: 4, justifyContent: "flex-end" }}>
          <Modal.Footer>
            <Button onClick={handleAddOrEditNews} color="success">
              {isEditMode ? "Update" : "Create"}
            </Button>
            <Button color="failure" onClick={closeAndResetModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
}
