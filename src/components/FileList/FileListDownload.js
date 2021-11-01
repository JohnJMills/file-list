import styles from "./FileListDownload.module.css";
import IconDownload from "./FileListAssets/IconDownload";

const FileListDownload = (props) => {
  return (
    <button
      className={styles["file-list__download"]}
      onClick={props.clickHandler}
    >
      <IconDownload />
      {props.label}
    </button>
  );
};

export default FileListDownload;
