import { MenuItem } from "@chakra-ui/react";
import useStudyStore from "~/state/study";

const DownloadPGN = () => {
  const { pgn } = useStudyStore();
  const download = () => {
    //TODO: File name should be the study name
    const file = new File([pgn()], "study.pgn", {
      type: "text/plain",
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(file);
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };
  return (
    <MenuItem
      data-cy={"download-pgn"}
      onClick={() => download()}
      isDisabled={pgn() === ""}
    >
      Download PGN
    </MenuItem>
  );
};

export default DownloadPGN;
