import React from 'react';

const Readfile = () => {
  const [data, setData] = React.useState('');

  return (
    <div>
      <p>{data}</p>
      <button
        onClick={async e => {
          let fileHandle;
          fileHandle = await window.chooseFileSystemEntries();
          const file = await fileHandle.getFile();
          const contents = await file.text();
          setData(contents);
        }}
      >
        Open file
      </button>
    </div>
  );
};

export default Readfile;
