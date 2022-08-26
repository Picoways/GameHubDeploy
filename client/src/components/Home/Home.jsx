import React, {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  filterProducts,
  filterProductsByViews,
  filterProductsByDate,
} from "../../redux/actions";
import ProductCard from "../ProductCard/ProductCard";
import Style from "./Home.module.css";
import '@splidejs/react-splide/css/skyblue';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import loader from "../../img/loader.gif"
import logoBanner from "../../img/logo-banner.png"

// Brands
import samsung from "../../img/brands/samsung.png"
import kingston from "../../img/brands/kingston.png"
import asus from "../../img/brands/asus.png"
import gigabyte from "../../img/brands/gigabyte.png"
import amd from "../../img/brands/amd.png"







function Home() {
  const dispatch = useDispatch();
  /* const products = useSelector((state) => state.products); */
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
      <>
        <Splide aria-label="My Favorite Images">
          <SplideSlide>
            <img className={Style.imgCarousel} src="https://www.asus.com/microsite/Graphics-Cards/GeForce-RTX-30-Series/img/bg-header.jpg" alt="img" />
          </SplideSlide>
          <SplideSlide>
            <img className={Style.imgCarousel} src="https://media.flixcar.com/f360cdn/msi-75930670-TechAdvisor_Monitor_3600x1260-master.jpg" alt="img" />
          </SplideSlide>
          <SplideSlide>
            <img className={Style.imgCarousel} src="https://www.lg.com/pe/images/plp-b2c/b2c-2/MNT-27GN950-Hero-Banner-thin-D.jpg" alt="img" />
          </SplideSlide>
     
        </Splide>
      </>

      <div className={Style.containerSections}>
        <div className={Style.section}>
          <h1 className={Style.title}> Echa un vistazo !</h1>
          <div className={Style.carouselBackground}>
            <div className={Style.carousel}>
              {carousel?.map((e) => {
                return (
                  <div key={e._id}>
                    <div className={Style.link} to={"/product/" + e._id}>
                      <ProductCard
                        id={e._id}
                        name={e.name}
                        image={e.image[0].url}
                        price={e.price}
                        key={e._id}
                        stock={e.stock}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={Style.testContainer}>
        {
          carousel.length > 0 && mostViewed.length > 0 && recentlyAdded.length > 0
          ?
          <>
          <div className={Style.bannerVertical}>
            <div className={Style.bannerText}>
                <div className={Style.logoBanner}>
                  <div className={Style.absoluteLogoBanner}></div>
                  <img src={logoBanner} alt="logo"/>
                </div>
                <p>Discover</p>
                <p> the best products that we have for you!</p>
            </div>
            <div className={Style.bannerVerticalimg}></div>
            <div className={Style.bannerVerticalimgDark}></div>
          </div>

          <div className={Style.alljuntos}>

            <div className={Style.juntos}>
              <div className={`${Style.link} ${Style.div}`} to={"/product/" + carousel[0]._id}>
                        <ProductCard
                          id={mostViewed[0]._id}
                          name={mostViewed[0].name}
                          image={mostViewed[0].image[0].url}
                          price={mostViewed[0].price}
                          key={mostViewed[0]._id}
                          stock={mostViewed[0].stock}
                        />
              </div>
              <div className={`${Style.link} ${Style.div}`}  to={"/product/" + carousel[1]._id}>
                        <ProductCard
                          id={carousel[1]._id}
                          name={carousel[1].name}
                          image={carousel[1].image[0].url}
                          price={carousel[1].price}
                          key={carousel[1]._id}
                          stock={carousel[1].stock}
                        />
              </div>
            </div>
            <div className={Style.abajo}>
              <div className={Style.link} to={"/product/" + carousel[2]._id}>
                        <ProductCard
                          id={recentlyAdded[2]._id}
                          name={recentlyAdded[2].name}
                          image={recentlyAdded[2].image[0].url}
                          price={recentlyAdded[2].price}
                          key={recentlyAdded[2]._id}
                          stock={recentlyAdded[2].stock}
                        />
              </div>
            </div>
          </div>
            </>
          :
          <div className={Style.loadingContainer}>
            <img src={loader} alt="loader"/>
          </div>
        }
      </div>
        <div className={Style.section}>
          <h1 className={Style.title}>Los más visitados</h1>
          <div className={Style.carouselBackground}>
            <div className={Style.carousel}>
              {mostViewed?.map((e) => {
                return (
                  <div key={e._id}>
                    <div className={Style.link}>
                      <ProductCard
                        id={e._id}
                        name={e.name}
                        image={e.image[0].url}
                        price={e.price}
                        key={e._id}
                        stock={e.stock}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className={Style.banner}>
          <img src="https://m.media-amazon.com/images/S/aplus-media/vc/a8141547-44bf-4050-bb06-096851048176.__CR0,0,1464,600_PT0_SX1464_V1___.jpg" style={{margin: "2rem 0"}} alt="img"/>
        </div>

        <div className={Style.section}>
          <h1 className={Style.title}>Novedades !</h1>
          <div className={Style.carouselBackground}>
            <div className={Style.carousel}>
              {recentlyAdded?.map((e) => {
                return (
                  <div key={e._id}>
                    <div className={Style.link} to={"/product/" + e._id}>
                      <ProductCard
                        id={e._id}
                        name={e.name}
                        image={e.image[0].url}
                        price={e.price}
                        key={e._id}
                        stock={e.stock}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={Style.brandsContainer}>
          <p>Trabajamos con las mejores marcas</p>
          <div className={Style.brands}>
            <img src={asus} alt="brand-img"/>
            <img src={samsung} alt="brand-img"/>
            <img src={kingston} alt="brand-img"/>
            <img src={gigabyte} alt="brand-img"/>
            <img src={amd} alt="brand-img"/>
          </div>
      </div>
    </div>
  );
}

export default Home;
