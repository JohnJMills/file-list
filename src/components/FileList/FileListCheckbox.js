import styles from "./FileListCheckbox.module.css";
import IconCheck from "./FileListAssets/IconCheck";

// TODO: Add aria-label for selected or unselected

const FileListCheckbox = (props) => {
  return (
    <td className={styles["fl-checkbox"]} data-checked={props.checked}>
      <div className={styles["fl-checkbox__container"]}>
        <div className={styles["fl-checkbox__check"]} aria-label={props.label}>
          <IconCheck />
        </div>
      </div>
    </td>
  );
};

export default FileListCheckbox;
