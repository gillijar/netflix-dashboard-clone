import React, { useState, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { itemActions } from "../../../store/item";
import getGenres from "../../../helpers/getGenres";
import SimilarList from "./SimilarList";
import TitleLayout from "./TitleLayout";

const Title = () => {
  const [genres, setGenres] = useState();
  const { item } = useSelector((state) => state.item);
  const dispatch = useDispatch();
  const toggled = useSelector((state) => state.item.toggled);

  useEffect(() => {
    getGenres(setGenres);
  }, []);

  let genre;
  if (item.genre_ids && genres) {
    genre = item.genre_ids.map((id) => genres.find((genre) => genre.id === id));
  }

  const { x } = useSpring({
    x: toggled ? 0 : 100,
  });

  const closePageHandler = () => {
    dispatch(itemActions.setToggled(false));
    document.title = "Netflix";

    setTimeout(() => {
      dispatch(itemActions.setItem(false));
    }, [250]);
  };

  let releaseDate;
  if (item.release_date) {
    releaseDate = item.release_date.split("-")[0];
  }

  return (
    <animated.div
      className="title"
      style={{ transform: x.to((x) => `translateY(${x * 1}%)`) }}
    >
      {item && (
        <TitleLayout
          item={item}
          genres={genres}
          genre={genre}
          releaseDate={releaseDate}
          close={closePageHandler}
        >
          <SimilarList
            movieEndpoint={`/movie/${item.id}/similar?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&page=1`}
            tvEndpoint={`/tv/${item.id}/similar?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&page=1`}
          />
        </TitleLayout>
      )}
    </animated.div>
  );
};

export default Title;
