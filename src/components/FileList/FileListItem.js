import FileListCheckbox from "./FileListCheckbox";
import styles from "./FileListItem.module.css";

/**
 * TODO: Tests
 * - check that the data-status and display status have correct case no matter what value is passed
 * - check that checked status is equal to visual display
 */

const FileListItem = (props) => {
  const status = props.status.toLowerCase();
  const displayStatus = props.status[0].toUpperCase() + props.status.slice(1);
  const checkedLabel = props.checked ? "Item Selected" : "Item Unselected";

  return (
    <tr
      className={styles["fl-item"]}
      id={props.id}
      data-status={status}
      data-checked={props.checked}
      tabIndex="0"
      onClick={props.fileClickHandler}
      onKeyUp={props.fileEnterHandler}
    >
      <FileListCheckbox checked={props.checked} label={checkedLabel} />
      <td className={styles["fl-item__cell--name"]}>{props.name}</td>
      <td className={styles["fl-item__cell--device"]}>{props.device}</td>
      <td className={styles["fl-item__cell--path"]}>{props.path}</td>
      <td className={styles["fl-item__cell--status"]}>{displayStatus}</td>
    </tr>
  );
};

export default FileListItem;
