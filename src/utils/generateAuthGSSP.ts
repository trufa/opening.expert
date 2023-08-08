import { GetServerSideProps } from "next";
import { getServerAuthSession } from "~/server/auth";

type GenerateAuthGSSP = (callbackUrl: string) => GetServerSideProps;

const generateAuthGSSP: GenerateAuthGSSP = (callbackUrl) => async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (session) {
    return {
      props: {
        session,
      },
    };
  }
  return {
    redirect: {
      destination: `/api/auth/signin?callbackUrl=${callbackUrl}`,
      permanent: false,
    },
  };
};

export default generateAuthGSSP;
