import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonLoader = () => {
  return (
    <SkeletonTheme baseColor="">
      <div
        style={{
          margin: "0 auto",
          padding: "1rem",
          display: "flex",
          gap: "1rem",
        }}
      >
        <div
          style={{
            width: "30%",
          }}
        >
          <Skeleton count={14} height={"2.5rem"} />
        </div>
        <div
          style={{
            width: "70%",
          }}
        >
          <Skeleton count={14} height={"2.5rem"} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonLoader;
