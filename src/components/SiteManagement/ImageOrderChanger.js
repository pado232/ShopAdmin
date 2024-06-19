import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../../styles/SiteImg.css";

const ImageOrderChanger = ({ images, onDragEnd }) => {
  const [localImages, setLocalImages] = useState(images);

  useEffect(() => {
    setLocalImages(images);
  }, [images]);

  // Function to handle drag end
  const handleDragEnd = (result) => {
    // Do nothing if no destination
    if (!result.destination) {
      return;
    }

    // Create a new array for updated images order
    const updatedImages = Array.from(localImages);
    const [reorderedItem] = updatedImages.splice(result.source.index, 1);
    updatedImages.splice(result.destination.index, 0, reorderedItem);

    // Update local state
    setLocalImages(updatedImages);
    console.log(updatedImages);
    // Call the provided onDragEnd function to update parent state
    onDragEnd(updatedImages);
  };

  return (
    <div>
      {" "}
      {images.length > 0 ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="images" direction="horizontal">
            {(provided) => (
              <div
                className="imgs_box"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {localImages.map((img, index) => (
                  <Draggable
                    key={index}
                    draggableId={String(index)}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={`list_container ${
                          snapshot.isDragging ? "dragging" : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          margin: "0 8px",
                        }}
                      >
                        <div>{index + 1}</div>
                        <div className="list_img">
                          <img alt={`이미지 ${index}`} src={img.imgUrl} />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div className="site_total_img_none">
          변경할 이미지가 없습니다. 변경을 취소하고 이미지를 추가해주세요.
        </div>
      )}
    </div>
  );
};

export default ImageOrderChanger;
