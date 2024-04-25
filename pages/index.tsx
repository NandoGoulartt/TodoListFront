import ContainerHeader from "@/components/containerHeader";

export default function Home() {


  return (
    <ContainerHeader>
      <div>Bem vindo!</div>
    </ContainerHeader>
  );
}

export async function getServerSideProps(context: any) {
  const token = context.req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: { token: token },
  };
}