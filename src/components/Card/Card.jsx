import "./Card.css";

function Card({ title, image }) {
  return (
    <div className="card cursor-target">

      <h1>{title}</h1>

      <div className="hovercard">

        <img
          src={image}
          alt={title}
        />

      </div>

    </div>
  );
}

export default Card;