import React, { useEffect, useState } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { fabric } from "fabric";
// import CloseIcon from "../components/Board/CloseIcon";
import NoteLogo from "../assets/images/menu/note.png";
import viewLogo from "../assets/images/menu/view.png";
import penLogo from "../assets/images/menu/pen.png";
import handLogo from "../assets/images/menu/right-to-objection.png";
import treeLogo from "../assets/images/menu/tree.png";
import mountainLogo from "../assets/images/menu/mountain.png";
import uploadLogo from "../assets/images/menu/upload.png";

import Object1 from "../assets/images/objects/ME_Singles_Camping_48x48_Backpack_5.png";
import Object2 from "../assets/images/objects/ME_Singles_Camping_48x48_Tree_5.png";
import Object3 from "../assets/images/objects/ME_Singles_Camping_48x48_Backpack_9.png";
import Object4 from "../assets/images/objects/ME_Singles_Camping_48x48_Benched_Table_4.png";
import Object5 from "../assets/images/objects/ME_Singles_Camping_48x48_Buoy_5.png";
import Object6 from "../assets/images/objects/ME_Singles_Camping_48x48_Pier_7.png";
import Object7 from "../assets/images/objects/ME_Singles_Camping_48x48_Sign_6.png";
import Object8 from "../assets/images/objects/ME_Singles_Camping_48x48_Sleeping_Bag_1.png";
import Object9 from "../assets/images/objects/ME_Singles_Camping_48x48_Tree_7.png";
import Object10 from "../assets/images/objects/ME_Singles_Camping_48x48_Tree_76.png";
import Object11 from "../assets/images/objects/ME_Singles_Camping_48x48_Tree_121.png";
import Object12 from "../assets/images/objects/ME_Singles_Camping_48x48_Tree_197.png";
import Object13 from "../assets/images/objects/ME_Singles_Camping_48x48_Tree_Dead_4.png";
import Object14 from "../assets/images/objects/ME_Singles_Camping_48x48_Buoy_6.png";
import Object15 from "../assets/images/objects/ME_Singles_Camping_48x48_Tree_5.png";
import Object16 from "../assets/images/objects/ME_Singles_Camping_48x48_Tree_12.png";
import Object17 from "../assets/images/objects/ME_Singles_Camping_48x48_Tree_64.png";
import Object18 from "../assets/images/objects/ME_Singles_Camping_48x48_Tree_86.png";
import Object19 from "../assets/images/objects/ME_Singles_Camping_48x48_Tree_123.png";
import Object20 from "../assets/images/objects/ME_Singles_Camping_48x48_Tree_209.png";
import Object21 from "../assets/images/objects/ME_Singles_Camping_48x48_Tree_327.png";

import waterTerrain from "../assets/images/terrain/Water.png";
import grassTerrain from "../assets/images/terrain/Grass.png";
import OtherTerrain from "../assets/images/terrain/Other.png";
import whiteTerrain from "../assets/images/terrain/white.jpg";

import logoImg from "../assets/images/sidebar/logo.png";
import boardImg from "../assets/images/sidebar/board.png";
import templateImg from "../assets/images/sidebar/templates.svg";
import supportImg from "../assets/images/sidebar/support.png";

function FabricCanvas() {
  const canvasRef = React.useRef(null);
  const [showTerrainDropdown, setShowTerrainDropdown] = useState(false);
  const [selectedTextbox, setSelectedTextbox] = useState(null);
  const [canvasHistory, setCanvasHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
  const [noteText, setNoteText] = useState("New content");
  const [zoomLevel, setZoomLevel] = useState(1.0);

  const ObjectImage = [
    Object1,
    Object2,
    Object3,
    Object4,
    Object5,
    Object6,
    Object7,
    Object8,
    Object9,
    Object10,
    Object11,
    Object12,
    Object13,
    Object14,
    Object15,
    Object16,
    Object17,
    Object18,
    Object19,
    Object20,
    Object21,
  ];
  const InputColor = ["#FF000078", "#6640FF", "#95D079", "#FFFA80", "#F4F4F4"];
  const [isRightMenuOpen, setIsRightMenuOpen] = useState({
    type: "",
    isOpen: false,
  });
  const { editor, onReady } = useFabricJSEditor();

  const switchImage = (image) => {
    if (image == null) {
      if (editor && editor.canvas) {
        const canvas = editor.canvas;
        canvas.setBackgroundColor(
          { source: whiteTerrain, repeat: "repeat" },
          function () {
            canvas.renderAll();
            addToHistory(editor.canvas);
          }
        );
      }
    } else if (editor && editor.canvas) {
      const canvas = editor.canvas;
      canvas.setBackgroundColor(
        { source: image, repeat: "repeat" },
        function () {
          canvas.renderAll();
          addToHistory(editor.canvas);
        }
      );
    }
    save();
  };

  // Function to disable the pencil and dragMode tools
  const disableTools = () => {
    if (editor && editor.canvas) {
      editor.canvas.isDrawingMode = false;
      editor.canvas.toggleDragMode(false);
    }
  };

  const addTextToCenter = () => {
    if (editor && editor.canvas) {
      const canvas = editor.canvas;
      const randomNum = Math.floor(Math.random() * 4) + 2;
      // Create a new text object
      const text = new fabric.Textbox("New Content", {
        left: canvas.width / randomNum,
        top: canvas.height / randomNum,
        fontSize: 20,
      });

      // Add the text to the canvas
      canvas.add(text);

      // Add this action to the canvas history
      addToHistory(editor.canvas);
      save();
    }
    disableTools();

    // Set current SelectedTextbox to the new text object
    setSelectedTextbox(
      editor.canvas._objects[editor.canvas._objects.length - 1]
    );
    if (selectedTextbox) {
      setIsRightMenuOpen({ type: "note", isOpen: true });
      setNoteText(selectedTextbox.text);
    }
  };

  const addImageToCenter = (event) => {
    if (editor && editor.canvas) {
      const objectImgUrl = event.target.src;
      const img = new Image();
      img.src = objectImgUrl;
      img.onload = () => {
        drawImage(event, img);
      };

      // Add this action to the canvas history
      addToHistory(editor.canvas);
      save();
    }
    disableTools();
  };

  const handleObjectClick = () => {
    setIsRightMenuOpen({ type: "object", isOpen: true });
    // Disable pencil tool and hand tool
    editor.canvas.isDrawingMode = false;
    editor.canvas.toggleDragMode(false);
  };

  // const dragElement = (event, type) => {
  //   event.dataTransfer.setData("text/plain", type);

  //   // Disable pencil tool
  //   editor.canvas.isDrawingMode = false;
  //   addToHistory(editor.canvas);
  //   save();
  // };

  const dropElement = (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("text/plain");
    if (type === "note") {
      drawNote(event);
      setIsRightMenuOpen({ type: "note", isOpen: true });
    } else {
      const draggedItem = event.dataTransfer.getData("URL");
      const img = new Image();
      img.src = draggedItem;
      img.onload = () => {
        drawImage(event, img);
      };
    }
    save();
  };

  const drawImage = (event, img) => {
    // get random number from 2-9
    const randomNum = Math.floor(Math.random() * 8) + 2;
    const newImg = new fabric.Image(img, {
      left: editor.canvas.width / randomNum,
      top: editor.canvas.height / randomNum,
      width: img.width,
      height: img.height,
    });
    editor.canvas.add(newImg);
    addToHistory(editor.canvas);
    save();
  };

  const addToHistory = (canvas) => {
    const updatedHistory = canvasHistory.concat([
      JSON.stringify(canvas.toJSON()),
    ]);
    setCanvasHistory(updatedHistory);
    // Clear the redo history when a new action is added
    setRedoHistory([]);
  };

  const toggleTerrainDropdown = () => {
    setShowTerrainDropdown(!showTerrainDropdown);
  };

  const hideTerrainDropdown = () => {
    setShowTerrainDropdown(false);
  };

  // const drawNote = (event) => {
  //   const { offsetX, offsetY } = event.nativeEvent;

  //   // Create a new text object at the drop location
  //   const text = new fabric.Textbox(noteText, {
  //     left: offsetX,
  //     top: offsetY,
  //     fontSize: 20,
  //     editable: false,
  //     isNote: true,
  //   });

  //   // Add a custom property to the Textbox to identify it as a note
  //   text.isNote = true;

  //   // Add the text to the canvas
  //   editor.canvas.add(text);

  //   // Add click event listener to the Textbox note
  //   text.on("mousedown", function (e) {
  //     if (e.target === this) {
  //       setSelectedTextbox(this);
  //       editSelectedNote();
  //       setNoteText(this.text);
  //     }
  //   });

  //   // Open the side popup with the selected note's text
  //   setSelectedTextbox(text);
  //   setIsRightMenuOpen({ type: "note", isOpen: true });
  //   setNoteText(text.text);

  //   // Add this action to the canvas history
  //   addToHistory(editor.canvas);
  //   save();
  // };

  const drawNote = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;

    // Create a new text object at the drop location
    const text = new fabric.Textbox(noteText, {
      left: offsetX,
      top: offsetY,
      fontSize: 20,
      editable: false,
      isNote: true,
    });

    // Set a high index to ensure the note is on top
    text.set({ index: editor.canvas.getObjects().length + 1 });
 
    // Add the text to the canvas
    editor.canvas.add(text);

    // Add click event listener to the Textbox note
    text.on("mousedown", function (e) {
      if (e.target === this) {
        setSelectedTextbox(this);
        editSelectedNote();
        setNoteText(this.text);
      }
    });

    // Open the side popup with the selected note's text
    setSelectedTextbox(text);
    setIsRightMenuOpen({ type: "note", isOpen: true });
    setNoteText(text.text);

    // Add this action to the canvas history
    addToHistory(editor.canvas);
    save();
  };

  // Add click event listener to the Canvas note or object
  useEffect(() => {
    if (editor && editor.canvas) {
      editor.canvas.on("mouse:down", function (e) {
        if (e.target && e.target.type === "textbox") {
          // The Textbox has the "isNote" property
          setSelectedTextbox(e.target);
          setIsRightMenuOpen({ type: "note", isOpen: true });
          setNoteText(e.target.text);
        } else if (e.target && !e.target.isNote) {
          // The Textbox does not have the "isNote" property
          setSelectedTextbox(e.target);
          setIsRightMenuOpen({ type: "object", isOpen: true });
        }
      });
    }
  }, [editor]);

  const editSelectedNote = () => {
    if (selectedTextbox) {
      setIsRightMenuOpen({ type: "note", isOpen: true });
      setNoteText(selectedTextbox.text);
    }
  };

  const deleteSelectedObject = () => {
    if (selectedTextbox) {
      editor.canvas.remove(selectedTextbox);
      setSelectedTextbox(null); // Deselect the object
      // setIsRightMenuOpen({ type: "", isOpen: false }); // Close the side popup
    }
    addToHistory(editor.canvas);
    save();
  };

  // Draw pencil tool on canvas
  const drawPencil = () => {
    const pencil = new fabric.PencilBrush(editor.canvas);
    editor.canvas.freeDrawingBrush = pencil;
    editor.canvas.isDrawingMode = true;
    addToHistory(editor.canvas);
    save();
    // disable handTool
    editor.canvas.toggleDragMode(false);
  };

  const undo = () => {
    if (canvasHistory.length > 1) {
      const prevCanvasState = canvasHistory[canvasHistory.length - 2];
      const currentCanvasState = canvasHistory.pop();

      setCanvasHistory([...canvasHistory]);
      setRedoHistory([currentCanvasState, ...redoHistory]);

      editor.canvas.loadFromJSON(prevCanvasState, () => {
        editor.canvas.renderAll();
      });
    }
    save();
  };

  const redo = () => {
    if (redoHistory.length > 0) {
      const nextCanvasState = redoHistory[0];
      // const currentCanvasState = canvasHistory[canvasHistory.length - 1];

      setCanvasHistory([...canvasHistory, nextCanvasState]);
      setRedoHistory(redoHistory.slice(1));

      editor.canvas.loadFromJSON(nextCanvasState, () => {
        editor.canvas.renderAll();
      });
    }
    save();
  };

  useEffect(() => {
    if (editor && editor.canvas) {
      load();
    }
  }, [editor && editor.canvas]); // eslint-disable-line react-hooks/exhaustive-deps

  // Function to save canvas data to local storage
  const save = () => {
    const json = editor.canvas.toJSON();
    localStorage.setItem("canvasData", JSON.stringify(json));
  };

  // Function to load canvas data from local storage
  const load = () => {
    try {
      const savedCanvasData = localStorage.getItem("canvasData");
      if (savedCanvasData) {
        const canvasData = JSON.parse(savedCanvasData);
        if (editor && editor.canvas) {
          editor.canvas.loadFromJSON(canvasData, () => {
            // editor.canvas.setBackgroundColor('')
            editor.canvas.renderAll();
          });
        }
      }
    } catch (error) {
      console.error("Error loading canvas data:", error);
    }
  };

  const minZoom = 0.2; // Minimum zoom limit
  const maxZoom = 5.0; // Maximum zoom limit

  const handleZoomIn = () => {
    const currentZoom = editor.canvas.getZoom();
    const newZoom = currentZoom * 1.1; // Zoom in by 10%

    if (newZoom <= maxZoom) {
      editor.canvas.backgroundImageStretch = false;
      editor.canvas.zoomToPoint(
        { x: editor.canvas.width / 2, y: editor.canvas.height / 2 },
        newZoom
      );
      setZoomLevel(newZoom);
    }
    addToHistory(editor.canvas);
  };

  const handleZoomOut = () => {
    const currentZoom = editor.canvas.getZoom();
    const newZoom = currentZoom / 1.1; // Zoom out by 10%

    if (newZoom >= minZoom) {
      editor.canvas.backgroundImageStretch = false;
      editor.canvas.zoomToPoint(
        { x: editor.canvas.width / 2, y: editor.canvas.height / 2 },
        newZoom
      );
      setZoomLevel(newZoom);
    }
    addToHistory(editor.canvas);
  };

  // Attach the mouse wheel event handler to the canvas
  useEffect(() => {
    if (editor && editor.canvas) {
      editor.canvas.on("mouse:wheel", function (opt) {
        if (opt && opt.e && opt.e.preventDefault) {
          opt.e.preventDefault();
          opt.e.stopPropagation();
          if (opt.e.ctrlKey) {
            var delta = opt.e.deltaY;
            var zoom = editor.canvas.getZoom();
            const zoomFactor = 1.1; // Adjust the zoom factor as needed
            if (delta > 0) {
              // Zoom out
              zoom /= zoomFactor;
            } else {
              // Zoom in
              zoom *= zoomFactor;
            }
            // Ensure zoom is within limits
            zoom = Math.min(Math.max(zoom, minZoom), maxZoom);

            editor.canvas.zoomToPoint(
              { x: editor.canvas.width / 2, y: editor.canvas.height / 2 },
              zoom
            );

            // Update the canvas scroll position to match the panning
            const canvasElement =
              document.getElementsByClassName("sample-canvas")[0];
            canvasElement.scrollLeft = this.viewportTransform[4];
            canvasElement.scrollTop = this.viewportTransform[5];
          } else {
            // var e = opt.e;
            // var vpt = this.viewportTransform;
            // vpt[4] -= e.deltaX;
            // vpt[5] -= e.deltaY;
            // this.requestRenderAll();
          }
        }
      });

      // on item move update the canvas history and save to local storage
      editor.canvas.on("object:moving", function () {
        addToHistory(editor.canvas);
        save();
      });
    }
  }, [editor]); // eslint-disable-line react-hooks/exhaustive-deps

  const [dragMode, setDragMode] = useState(false);
  // Select draggable hand tool on canvas
  const handTool = () => {
    // disable pencil
    setDragMode(!dragMode);
    if (editor && editor.canvas) {
      editor.canvas.isDrawingMode = false;
      editor.canvas.toggleDragMode(!dragMode);
    }
    addToHistory(editor.canvas);
  };
  const renderTerrainPopup = () => {
    return (
      <>
        <div className="dropdown">
          <div
            className={`dropdown-menu p-3 ${showTerrainDropdown ? "show" : ""}`}
            aria-labelledby="dropdownMenuButton"
          >
            <button
              onClick={() => switchImage(null)}
              className="btn-1 mr-3 terrain-btn"
            ></button>
            <button
              onClick={() => switchImage(grassTerrain)}
              className="btn-2 mr-3 terrain-btn"
            ></button>
            <button
              onClick={() => switchImage(waterTerrain)}
              className="btn-3 mr-3 terrain-btn"
            ></button>
            <button
              onClick={() => switchImage(OtherTerrain)}
              className="btn-4 terrain-btn"
            ></button>{" "}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="section" style={{ height: "100vh", position: "relative" }}>
      <div
        className="d-flex"
        style={{
          position: "absolute",
          zIndex: 1,
          top: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {/* <nav
          id="sidebar"
          className="col-md-1 d-md-block bg-light sidebar"
          style={{ width: "100px" }}
        >
          <ul className="nav flex-column">
            <li className="nav__list-item" title="Home">
              <a className="nav-link" href="#">
                <img src={logoImg} alt="" />
              </a>
            </li>
            <li className="nav__list-item" title="Boards">
              <a className="nav-link" href="#">
                <img src={boardImg} alt="" />
              </a>
            </li>
            <li className="nav__list-item" title="Templates">
              <a className="nav-link" href="#">
                <img src={templateImg} alt="" />
              </a>
            </li>
            <li className="nav__list-item" title="Support">
              <a className="nav-link" href="#">
                <img src={supportImg} alt="" />
              </a>
            </li>
          </ul>
        </nav> */}
        <div className="flex-fill menu-bars">
          <div className="row gap-5">
            <div className="col-sm">
              <div className="board-name ml-5 flex ">
                <p>Best Board of my ideas</p>
                <div className="rename-edit-icon ms-3 mt-2">
                  <span
                    className="me-3 text-primary"
                    title="rename"
                    style={{ fontSize: "15px" }}
                  >
                    <i className="fas fa-edit"></i>
                  </span>
                  <span
                    className="me-2 text-danger"
                    title="delete"
                    style={{ fontSize: "15px" }}
                  >
                    <i className="fas fa-trash"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <nav className="navbar navbar-top navbar-light bg-light shadow-lg rounded p-2 z-index-99">
                <a
                  className="navbar-brand ms-2 cursor-pointer"
                  title="show/hide notes text"
                >
                  <img
                    src={viewLogo}
                    draggable="false"
                    alt=""
                    className="w-10"
                  />
                </a>
                <a
                  className="navbar-brand cursor-pointer"
                  title="hand for navigation"
                >
                  <img
                    src={handLogo}
                    draggable="false"
                    alt=""
                    className={`w-10`}
                    onClick={() => handTool()}
                  />
                </a>
                <span
                  draggable="true"
                  className="navbar-brand cursor-pointer"
                  // onDragStart={(event) => dragElement(event, "note")}
                  onClick={addTextToCenter}
                  title="new note"
                  id="note"
                >
                  <img
                    draggable="false"
                    src={NoteLogo}
                    alt=""
                    className="w-10 cursor-pointer"
                  />
                </span>
                <a
                  draggable="true"
                  className="navbar-brand cursor-pointer"
                  title="new object"
                >
                  <img
                    draggable="false"
                    onClick={() => handleObjectClick()}
                    className="w-10"
                    src={treeLogo}
                    alt=""
                    id="object"
                  />
                </a>
                <a
                  className="navbar-brand cursor-pointer"
                  onMouseEnter={toggleTerrainDropdown}
                  onMouseLeave={hideTerrainDropdown}
                  title="select terrain type"
                >
                  <img
                    src={mountainLogo}
                    draggable="false"
                    alt=""
                    className="w-16"
                    id="terrain"
                  />
                  {renderTerrainPopup()}
                </a>

                <a className="navbar-brand cursor-pointer" title="draw tool">
                  <img
                    src={penLogo}
                    draggable="false"
                    alt=""
                    className="w-10"
                    onClick={() => drawPencil()}
                  />
                </a>
                <a className="inputWrapper cursor-pointer" title="upload file">
                  <img
                    src={uploadLogo}
                    draggable="false"
                    alt=""
                    className="w-10"
                  />
                  <input
                    id="image-upload"
                    className="fileInput"
                    type="file"
                    accept="image/*"
                  />
                </a>
              </nav>
            </div>
            <div className="col-sm"></div>
          </div>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => dropElement(e)}
          >
            <FabricJSCanvas
              className="sample-canvas"
              id="canvas"
              onReady={onReady}
              ref={canvasRef}
            />
          </div>
          {/* {selectedTextbox && (
            <CloseIcon
              x={selectedTextbox.left}
              y={selectedTextbox.top}
              onClick={deleteSelectedObject}
            />
          )} */}
        </div>
      </div>

      {/* Bottom menu bar with Zoom In, Zoom Out, Undo, and Redo buttons */}
      <nav className="navbar bottom-navbar navbar-light bg-light zoom-menu">
        <div className="d-flex">
          <div className="flex-fill"></div>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={handleZoomIn}
          >
            <i className="fas fa-search-plus"></i>
          </button>
          <button
            className="btn btn-outline-secondary me-2"
            style={{ fontSize: "20px" }}
          >
            {Math.floor(zoomLevel * 100)}
          </button>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={handleZoomOut}
          >
            <i className="fas fa-search-minus"></i>
          </button>
          <button onClick={undo} className="btn btn-outline-secondary me-2">
            <i className="fas fa-undo"></i>
          </button>
          <button onClick={redo} className="btn btn-outline-secondary">
            <i className="fas fa-redo"></i>
          </button>
        </div>
      </nav>

      {/* Right-side menu */}
      <div
        className={`offcanvas offcanvas-end ${
          isRightMenuOpen.isOpen ? "show" : ""
        }`}
        tabIndex="-1"
        id="rightOffcanvas"
        aria-labelledby="rightOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="rightOffcanvasLabel">
            {isRightMenuOpen.type === "object"
              ? "Use Drag & Drop To Pick Object"
              : "Create New Note:"}
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={() => setIsRightMenuOpen({ type: "", isOpen: false })}
          ></button>
        </div>
        <div className="offcanvas-body">
          {isRightMenuOpen.type === "object" ? (
            <>
              <div className="input-group">
                <input
                  className="form-control border-end-0 border"
                  type="search"
                  defaultValue="search"
                  id="example-search-input"
                />
                <span className="input-group-append">
                  <button
                    className="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
                    type="button"
                  >
                    <i className="fa fa-search" />
                  </button>
                </span>
              </div>
              <div className="grid-menu-item">
                {ObjectImage.map((image, index) => (
                  <a
                    key={index + 1}
                    className="navbar-brand"
                    title="upload file"
                  >
                    <img
                      draggable="true"
                      // onDragStart={(event) => dragElement(event)}
                      onClick={(event) => addImageToCenter(event)}
                      className="w-16 h-16 cursor-pointer"
                      src={image}
                      alt=""
                      id="object"
                    />
                  </a>
                ))}
              </div>
              <div className="flex button-text gap-3 mt-4">
                <button
                  id="cancel"
                  name="button"
                  className="btn w-full cancel-btn"
                  onClick={deleteSelectedObject}
                >
                  Delete Object
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="input-group">
                <textarea
                  rows={20}
                  className="form-control border-end-0 border"
                  type="search"
                  placeholder="search for an object, eg:'house'"
                  id="example-search-input"
                  value={noteText}
                  onChange={(e) => {
                    setNoteText(e.target.value);

                    // Update the text of the selected textbox on the canvas
                    if (selectedTextbox) {
                      selectedTextbox.set({ text: e.target.value });
                      editor.canvas.renderAll();
                      addToHistory(editor.canvas);
                      save();
                    }
                  }}
                />
              </div>
              <label htmlFor="color" className="mt-3">
                Note color:
              </label>
              <div className="grid-menu-color">
                {InputColor.map((color, index) => (
                  <a
                    key={index + 1}
                    className="navbar-brand color"
                    title="Set Note Background Color"
                    onClick={() => {
                      if (selectedTextbox) {
                        selectedTextbox.set({
                          backgroundColor: color,
                        });
                        editor.canvas.renderAll();
                        addToHistory(editor.canvas);
                        save();
                      }
                    }}
                    id={`color${index + 1}`}
                    style={{ background: color }}
                  ></a>
                ))}
              </div>
              <div className="flex button-text gap-3 mt-4">
                <button
                  id="submit"
                  name="button"
                  className="btn btn-primary w-full btn-lg save-btn"
                >
                  Save
                </button>
                <button
                  id="cancel"
                  name="button"
                  className="btn w-full cancel-btn"
                  onClick={deleteSelectedObject}
                >
                  Delete Note
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FabricCanvas;

const STATE_IDLE = "idle";
const STATE_PANNING = "panning";

fabric.Canvas.prototype.toggleDragMode = function (dragMode) {
  let lastClientX;
  let lastClientY;
  let state = STATE_IDLE;

  if (dragMode) {
    this.discardActiveObject();
    this.defaultCursor = "grab";

    this.forEachObject(function (object) {
      object.prevEvented = object.evented;
      object.prevSelectable = object.selectable;
      object.evented = false;
      object.selectable = false;
    });

    this.selection = false;

    this.on("mouse:up", function () {
      state = STATE_IDLE;
    });

    this.on("mouse:down", (e) => {
      state = STATE_PANNING;
      lastClientX = e.e.clientX;
      lastClientY = e.e.clientY;
    });

    this.on("mouse:move", (e) => {
      if (state === STATE_PANNING && e && e.e) {
        let deltaX = 0;
        let deltaY = 0;
        if (lastClientX) {
          deltaX = e.e.clientX - lastClientX;
        }
        if (lastClientY) {
          deltaY = e.e.clientY - lastClientY;
        }
        lastClientX = e.e.clientX;
        lastClientY = e.e.clientY;

        let delta = new fabric.Point(deltaX, deltaY);
        this.relativePan(delta);
        // this.trigger("moved");
      }
    });
  } else {
    this.forEachObject(function (object) {
      object.evented =
        object.prevEvented !== undefined ? object.prevEvented : object.evented;
      object.selectable =
        object.prevSelectable !== undefined
          ? object.prevSelectable
          : object.selectable;
    });

    this.defaultCursor = "default";

    this.off("mouse:up");
    this.off("mouse:down");
    this.off("mouse:move");

    this.selection = true;
  }
};
