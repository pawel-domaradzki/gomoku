import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div>
      <h2>Nothing here...</h2>
      <p>
        Go to <Link to="/">main </Link> page
      </p>
    </div>
  );
};

export default NoMatch;
