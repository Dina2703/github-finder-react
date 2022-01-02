import UserResults from "../components/users/UserResults";
import UserSearch from "../components/users/UserSearch";

function Home() {
  return (
    <>
      {/* SEARCH COMPONENT */}
      <UserSearch />
      <UserResults />
    </>
  );
}

export default Home;
