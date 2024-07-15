import { TailSpin } from "react-loader-spinner";
const LoaderSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <TailSpin type="TailSpin" color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export { LoaderSpinner };
