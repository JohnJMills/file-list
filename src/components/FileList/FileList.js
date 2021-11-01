import { useState, useEffect } from "react";

import FileListDownload from "./FileListDownload";
import FileListHeader from "./FileListHeader";
import FileListItem from "./FileListItem";
import SelectAll from "./FileListSelectAll";
import styles from "./FileList.module.css";

const FileList = (props) => {
  /** Use State */
  const [files, updateFiles] = useState(
    props.files.map((f, i) => {
      f.id = "file-list-item-" + i;
      return f;
    })
  );

  const [checkedCount, updateCheckedCount] = useState(0);

  const [selectAllState, updateSelectAll] = useState("none");

  /** Use Effect */
  /** update files data on first load to add availability and checked status */
  useEffect(() => {
    updateFiles(
      files.map((f, i) => {
        f.id = "file-list-item-" + i;
        f.checked = false;
        const statusStr = f.status.toLowerCase();
        f.isAvailable = statusStr === "available" ? true : false;
        return f;
      })
    );
  }, []);

  /** make sure the checked count & select all always updates */
  useEffect(() => {
    updateCheckedCount(files.filter((f) => f.checked).length);
    updateSelectAll(getSelectAllState(files));
  }, [files, checkedCount, selectAllState]);

  /** Event Handlers */
  const fileClickHandler = (e) => {
    e.preventDefault();
    const clickID = getFileIdFromTarget(e.target);
    toggleCheckedFiles(clickID);
  };

  const fileEnterHandler = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const clickID = getFileIdFromTarget(e.target);
      toggleCheckedFiles(clickID);
    }
  };

  const selectAllClickHandler = (e) => {
    e.preventDefault();

    if (selectAllState === "none") {
      updateFiles(
        files.map((f) => {
          f.checked = true;
          return f;
        })
      );
    } else {
      updateFiles(
        files.map((f) => {
          f.checked = false;
          return f;
        })
      );
    }
  };

  const downloadClickHandler = (e) => {
    e.preventDefault();
    const filesToDownload = files.filter((f) => f.checked && f.isAvailable);

    if (filesToDownload.length === 0) {
      alert("No files will download");
      return;
    }

    let message = "The following files will download:\r";
    filesToDownload.forEach((f) => (message += f.name + "\r"));

    alert(message);
  };

  /** Helpers */

  /** helper function that returns the correct file item id from an event target */
  const getFileIdFromTarget = (target) => {
    let targetID = target.getAttribute("id");
    if (targetID && targetID.startsWith("file-list-item-")) {
      return targetID;
    } else {
      targetID = target.parentElement.getAttribute("id");
    }
    return targetID;
  };

  /** helper function to update click state of files */
  const toggleCheckedFiles = (clickID) => {
    updateFiles(
      files.map((f) => {
        if (clickID === f.id) {
          f.checked = !f.checked;
        }

        return f;
      })
    );
  };

  /** helper function to determine the select all state all, partial, or none */
  const getSelectAllState = (files) => {
    let state = "none";
    const count = files.filter((f) => f.checked).length;
    if (count === files.length) {
      state = "all";
    }
    if (count > 0 && count < files.length) {
      state = "partial";
    }

    return state;
  };

  /** generate a value for the select all label */
  let selectAllLabel = "Select All";
  switch (selectAllState) {
    case "none":
      selectAllLabel += ": none selected";
      break;

    case "partial":
      selectAllLabel += ": " + checkedCount + " selected";
      break;

    case "all":
      selectAllLabel += ": all selected";
      break;

    default:
      break;
  }

  return (
    <div className={styles["file-list"]}>
      <div className={styles["file-list__controls"]}>
        <SelectAll
          label={selectAllLabel}
          state={selectAllState}
          clickHandler={selectAllClickHandler}
        />
        <p className={styles["file-list__counter"]}>Selected {checkedCount}</p>
        <FileListDownload
          label="Download Selected"
          clickHandler={downloadClickHandler}
        />
      </div>

      <table className={styles["file-list__table"]}>
        <FileListHeader />

        <tbody>
          {files.map((f) => {
            return (
              <FileListItem
                checked={f.checked}
                key={f.id}
                id={f.id}
                name={f.name}
                device={f.device}
                path={f.path}
                status={f.status}
                fileClickHandler={fileClickHandler}
                fileEnterHandler={fileEnterHandler}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;
