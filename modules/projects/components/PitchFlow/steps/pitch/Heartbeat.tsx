const getHeartbeatClassName = (probability: number) => {
  if (probability <= 50) {
    return 'fade-in-fast';
  }

  if (probability >= 70) {
    return 'fade-in-slow';
  }

  return 'fade-in-normal';
};

const getHeartbeatColorClassName = (probability: number) => {
  switch (true) {
    case probability < 50:
      return 'text-red-600';
    case probability >= 50 && probability < 60:
      return 'text-yellow-500';
    case probability >= 60 && probability < 80:
      return 'text-blue-500';
    case probability >= 80:
      return 'text-green-500';
    default:
      return 'text-orange-500';
  }
};

const Heartbeat = ({ probability }) => (
  <div className={`heart-rate ${getHeartbeatColorClassName(probability)}`}>
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="75px"
      height="36px"
      viewBox="0 0 150 73"
      enableBackground="new 0 0 150 73"
      xmlSpace="preserve"
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeMiterlimit="10"
        points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
      />
    </svg>
    <div className={getHeartbeatClassName(probability)} />
  </div>
);

export default Heartbeat;
