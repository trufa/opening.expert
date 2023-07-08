import Study from "~/components/Study/Study";
import generateGSSP from "~/utils/generateGSSP";

export const getServerSideProps = generateGSSP("/study");

const StudyPage = () => {
  return <Study />;
};

export default StudyPage;
