import Wrapper from "../Components/Layout/Wrapper";
import "./Home.css";
const Home = () => {
  return (
    <div>
      <Wrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <h3>Make A Friend and Lets Start Chat</h3>
        </div>
      </Wrapper>
    </div>
  );
};

export default Home;
