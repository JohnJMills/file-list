import styles from "./FileListHeader.module.css";

const FileListHeader = () => {
  return (
    <thead>
      <tr className={styles["fl-table__tr--header"]}>
        <th className={styles["fl-table__th"]}></th>
        <th className={styles["fl-table__th"]}>Name</th>
        <th className={styles["fl-table__th"]}>Device</th>
        <th className={styles["fl-table__th"]}>Path</th>
        <th className={styles["fl-table__th--status"]}>Status</th>
      </tr>
    </thead>
  );
};

export default FileListHeader;
