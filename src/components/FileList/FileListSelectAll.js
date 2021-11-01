import styles from "./FileListSelectAll.module.css";
import IconBar from "./FileListAssets/IconBar";
import IconCheck from "./FileListAssets/IconCheck";

/**
 * props.state = none, all, partial
 */
const FileListSelectAll = (props) => {
  return (
    <button
      className={styles["select-all"]}
      data-state={props.state}
      onClick={props.clickHandler}
      aria-label={props.label}
    >
      <div className={styles["select-all__box"]}>
        <IconBar className={styles["icon-bar"]} />
        <IconCheck className={styles["icon-check"]} />
      </div>
    </button>
  );
};

export default FileListSelectAll;
