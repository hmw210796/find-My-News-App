import { useState } from "react";

const FavoriteItem = (props) => {
  const [favoriteOnHover, setFavoriteOnHover] = useState(false);

  const { description, link } = props.item;

  const onHoverClass = favoriteOnHover ? `bg-orange-500` : "";

  return (
    <a href={link} target="_blank" rel="noreferrer">
      <li
        className={`px-4 py-4 ${onHoverClass}`}
        onMouseEnter={() => {
          setFavoriteOnHover(true);
        }}
        onMouseLeave={() => {
          setFavoriteOnHover(false);
        }}
      >
        <p className=" line-clamp-2">{description}</p>
      </li>
    </a>
  );
};

export default FavoriteItem;
