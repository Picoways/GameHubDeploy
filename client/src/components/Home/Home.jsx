import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  sortPrice,
  sortRating,
  filterProducts,
  filterProductsByViews,
  filterProductsByDate,
} from "../../redux/actions";
import ProductCard from "../ProductCard/ProductCard";
import Style from "./Home.module.css";
import AddCartButton from "../AddCartButton/AddCartButton";
import '@splidejs/react-splide/css/skyblue';
import { Splide, SplideSlide } from "@splidejs/react-splide";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const carousel = useSelector((state) => state.carousel);
  const mostViewed = useSelector((state) => state.mostViewed);
  const recentlyAdded = useSelector((state) => state.recentlyAdded);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(filterProducts());
    dispatch(filterProductsByViews());
    dispatch(filterProductsByDate());
  }, [dispatch]);

  return (
    <div>
      {/* <div className={Style.imagePositioning}>
        <img
          className={Style.controllerLeft}
          src="https://www.solofondos.com/wp-content/uploads/2021/03/2ea2156ee2ce4989ea602d820db10fae.png"
          alt="img"
        />
        <img
          className={Style.axolot}
          src="https://puntociego.com.ar/download/multimedia.normal.91084a739de17b1c.67616d696e67207365747570206465736b5f6e6f726d616c2e6a7067.jpg"
          alt="img"
        />
        <img
          className={Style.controllerRight}
          src="https://www.solofondos.com/wp-content/uploads/2021/03/2ea2156ee2ce4989ea602d820db10fae.png"
          alt="img"
        />
      </div> */}

      <>
        <Splide aria-label="My Favorite Images">
          <SplideSlide className={Style.carouselImages}>
            <img className={Style.imageFromCarousel} src="https://imagenes.compragamer.com/bannerPrincipal/DC_20220427115450_qzlOt70B.jpg" alt="img" />
          </SplideSlide>
          <SplideSlide>
            <img  className={Style.imageFromCarousel} src="https://imagenes.compragamer.com/bannerPrincipal/DC_20220427121255_s4MgPPGH.jpg" alt="img" />
          </SplideSlide>
        </Splide>
      </>

      <div className={Style.containerSections}>
        <div className={Style.section}>
          <h1 className={Style.title}> Hecha un vistazo!</h1>
          <div className={Style.carouselBackground}>
            <div className={Style.carousel}>
              {carousel?.map((e) => {
                return (
                  <div key={e._id}>
                    <Link className={Style.link} to={"/product/" + e._id}>
                      <ProductCard
                        name={e.name}
                        image={e.image?.url}
                        price={e.price}
                        key={e._id}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={Style.section}>
          <h1 className={Style.title}>Los más visitados</h1>
          <div className={Style.carouselBackground}>
            <div className={Style.carousel}>
              {mostViewed?.map((e) => {
                return (
                  <div key={e._id}>
                    <Link className={Style.link} to={"/product/" + e._id}>
                      <ProductCard
                        name={e.name}
                        image={e.image?.url}
                        price={e.price}
                        key={e._id}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={Style.section}>
          <h1 className={Style.title}>Novedades!</h1>
          <div className={Style.carouselBackground}>
            <div className={Style.carousel}>
              {recentlyAdded?.map((e) => {
                return (
                  <div key={e._id}>
                    <Link className={Style.link} to={"/product/" + e._id}>
                      <ProductCard
                        name={e.name}
                        image={e.image?.url}
                        price={e.price}
                        key={e._id}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
