import { GetServerSideProps } from 'next';
import { getSession, signOut } from 'next-auth/react';

export default HomePage;
export { getServerSideProps };

function HomePage() {
  return (
    <section>
      <h1>hello world!</h1>
      <button onClick={() => signOut()}>log out</button>
    </section>
  );
}

const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        statusCode: 302,
        destination: '/login',
      },
    };
  }

  return {
    props: { session },
  };
};
