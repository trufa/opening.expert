import Study from "~/components/Study/Study";
import generateAuthGSSP from "~/utils/generateAuthGSSP";

export const getServerSideProps = generateAuthGSSP("/study");

const StudyPage = () => {
  return <Study />;
};

export default StudyPage;
