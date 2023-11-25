const Card = ({ name, suit, rank }) => {
  return (
    <div key={`${name}${suit}${rank}`}>
      <p>
        {name} of {suit}
      </p>
    </div>
  );
};

export default Card;
