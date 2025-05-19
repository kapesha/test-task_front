type Props = {
  className?: string;
};

export const Loader: React.FC<Props> = () => {
  return (
    <div className="loader">
      <svg className="loader__content" width="100" height="100" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="blue-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="blue" />
            <stop offset="100%" stopColor="yellow" />
            <animateTransform
              attributeName="gradientTransform"
              type="rotate"
              from="0 0.5 0.5"
              to="360 0.5 0.5"
              dur="2s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>
        <polygon
          points="100,20 117,75 175,75 127,110 145,165 100,130 55,165 73,110 25,75 83,75"
          fill="url(#blue-yellow)"
        />
      </svg>
    </div>
  );
};

