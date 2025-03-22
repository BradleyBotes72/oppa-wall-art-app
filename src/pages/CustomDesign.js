// src/pages/CustomDesign.js
import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";

// Physical dimensions (in mm) for the standard design
const defaultPhysicalWidth = 1200;   // mm
const defaultPhysicalHeight = 450;   // mm (minimum)
// Each physical block represents 40mm x 40mm
const physicalBlockSize = 40;         

// Display scaling: scale down by 0.25 so that each block appears as 10mm x 10mm
const scaleFactor = 0.25;
const displayBlockSize = physicalBlockSize * scaleFactor; // 10mm per block

// Standard grid in blocks
const defaultCols = Math.round(defaultPhysicalWidth / physicalBlockSize);  // 30
const defaultRows = Math.floor(defaultPhysicalHeight / physicalBlockSize); // 11

export default function CustomDesign() {
  const [customWidth, setCustomWidth] = useState(defaultPhysicalWidth);
  const [customHeight, setCustomHeight] = useState(defaultPhysicalHeight);

  const initGrid = (rows, cols) =>
    Array(rows)
      .fill()
      .map(() => Array(cols).fill("#ffffff"));

  const [grid, setGrid] = useState(initGrid(defaultRows, defaultCols));
  const [selectedColor, setSelectedColor] = useState("#ff0000");
  const [isDrawing, setIsDrawing] = useState(false);

  // Frame options
  const [frameSelected, setFrameSelected] = useState(false);
  const [frameColor, setFrameColor] = useState("#000000");

  // Final price state
  const [finalPrice, setFinalPrice] = useState(0);

  // Update grid when custom dimensions change
  useEffect(() => {
    setGrid((oldGrid) => {
      const newCols = Math.round(customWidth / physicalBlockSize);
      const newRows = Math.round(customHeight / physicalBlockSize);
      const newGrid = Array(newRows)
        .fill()
        .map((_, r) =>
          Array(newCols)
            .fill()
            .map((_, c) => (oldGrid && oldGrid[r] && oldGrid[r][c]) || "#ffffff")
        );
      return newGrid;
    });
  }, [customWidth, customHeight]);

  // Calculate final price based on R3.20 per block
  useEffect(() => {
    const newCols = Math.round(customWidth / physicalBlockSize);
    const newRows = Math.round(customHeight / physicalBlockSize);
    const totalBlocks = newCols * newRows;
    const blockCost = totalBlocks * 3.2; // R3.20 per block

    // Frame cost
    const frameCost = frameSelected ? 100 : 0;

    setFinalPrice(blockCost + frameCost);
  }, [grid, customWidth, customHeight, frameSelected]);

  const updateCellColor = (row, col) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r) => [...r]);
      newGrid[row][col] = selectedColor;
      return newGrid;
    });
  };

  const handleMouseDown = (row, col) => {
    setIsDrawing(true);
    updateCellColor(row, col);
  };

  const handleMouseEnter = (row, col) => {
    if (isDrawing) updateCellColor(row, col);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const randomizeGrid = () => {
    const randomGrid = grid.map((row) =>
      row.map(
        () =>
          "#" +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0")
      )
    );
    setGrid(randomGrid);
  };

  const clearGrid = () => {
    const newRows = grid.length;
    const newCols = grid[0]?.length || defaultCols;
    setGrid(initGrid(newRows, newCols));
  };

  const exportToPNG = () => {
    const gridElement = document.getElementById("matrix-grid");
    if (gridElement) {
      html2canvas(gridElement).then((canvas) => {
        const link = document.createElement("a");
        link.download = "custom-design.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  const handleAddDesignToCart = () => {
    let savedDesigns = JSON.parse(localStorage.getItem("designCart")) || [];
    const design = {
      grid,
      customWidth,
      customHeight,
      frameSelected,
      frameColor,
      finalPrice,
    };
    savedDesigns.push(design);
    localStorage.setItem("designCart", JSON.stringify(savedDesigns));
    alert(`Design saved and added to cart! Final Price: R${finalPrice}`);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem" }}>
        Create Your Custom Design
      </h2>

      {/* Custom Size Selection */}
      <div style={{ maxWidth: "400px", margin: "0 auto 1rem", textAlign: "center" }}>
        <label>
          Width (mm):
          <input 
            type="number" 
            value={customWidth} 
            onChange={(e) => setCustomWidth(Number(e.target.value))}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
          />
        </label>
        <label>
          Height (mm):
          <input 
            type="number" 
            value={customHeight} 
            onChange={(e) => setCustomHeight(Number(e.target.value))}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
          />
        </label>
        <p>
          Standard: {defaultPhysicalWidth}mm x {defaultPhysicalHeight}mm (30 x {defaultRows} blocks)
        </p>
      </div>

      {/* Frame Options */}
      <div style={{ maxWidth: "400px", margin: "0 auto 1rem", textAlign: "center" }}>
        <label>
          <input 
            type="checkbox" 
            checked={frameSelected} 
            onChange={(e) => setFrameSelected(e.target.checked)}
          />{" "}
          Add Frame (Extra R100)
        </label>
        {frameSelected && (
          <div style={{ marginTop: "0.5rem" }}>
            <label>
              Frame Color:{" "}
              <input 
                type="color" 
                value={frameColor} 
                onChange={(e) => setFrameColor(e.target.value)} 
              />
            </label>
          </div>
        )}
      </div>

      {/* Design Matrix Controls */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "1rem" }}>
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={randomizeGrid} style={{ padding: "0.5rem 1rem", backgroundColor: "orange", color: "#fff", border: "none", borderRadius: "4px" }}>
            Random Colors
          </button>
          <button onClick={clearGrid} style={{ padding: "0.5rem 1rem", backgroundColor: "orange", color: "#fff", border: "none", borderRadius: "4px" }}>
            Clear Grid
          </button>
          <button onClick={exportToPNG} style={{ padding: "0.5rem 1rem", backgroundColor: "orange", color: "#fff", border: "none", borderRadius: "4px" }}>
            Export as PNG
          </button>
        </div>
      </div>

      {/* Design Matrix */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {grid && grid.length > 0 && grid[0] && (
          <div
            id="matrix-grid"
            onMouseUp={handleMouseUp}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${grid[0].length}, ${displayBlockSize}mm)`,
              gridTemplateRows: `repeat(${grid.length}, ${displayBlockSize}mm)`,
              margin: "0 auto",
              border: "1px solid #000",
              maxHeight: "80vh", // Limit grid height
              overflowY: "scroll", // Allow vertical scrolling
            }}
          >
            {grid.map((row, rowIndex) =>
              row.map((color, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                  style={{
                    backgroundColor: color,
                    width: `${displayBlockSize}mm`,
                    height: `${displayBlockSize}mm`,
                    border: "1px solid #000",
                  }}
                />
              ))
            )}
          </div>
        )}
        <button
          onClick={handleAddDesignToCart}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem", backgroundColor: "orange", color: "#fff", border: "none", borderRadius: "4px" }}
        >
          Add Design to Cart
        </button>
      </div>

      {/* Final Price Display */}
      <div style={{ textAlign: "center", marginTop: "1rem", fontSize: "1.25rem" }}>
        Final Price: R{finalPrice.toFixed(2)}
      </div>
    </div>
  );
}
