import React, { useState } from 'react';

const Folder = ({ explorer, handleInsertNode }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleFolderOrFile = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const addNewFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);

      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>🗂 {explorer.name}</span>
          <div>
            <button onClick={(e) => handleFolderOrFile(e, true)}>
              Folder +
            </button>
            <button onClick={(e) => handleFolderOrFile(e, false)}>
              File +
            </button>
          </div>
        </div>
        <div style={{ display: expand ? 'block' : 'none', paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? '🗂' : '📄'}</span>
              <input
                type="text"
                className="inputContainer__input"
                autoFocus
                onKeyDown={addNewFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}
          {explorer.items.map((item) => {
            return (
              <Folder
                explorer={item}
                key={item.id}
                handleInsertNode={handleInsertNode}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorer.name}</span>;
  }
};

export default Folder;
