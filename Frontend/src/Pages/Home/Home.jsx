import React from "react";
import HomeCard from "./HomeCard";
import HomeCard1 from "./HomeCard1";
import HomeCard2 from "./HomeCard2";
import { HomeCard4, HomeCard4a, HomeCard4b } from "./HomeCard4";
import { HomeCard5, HomeCard5a, HomeCard5b, HomeCard5c } from "./HomeCard5";
import HomeCard6 from "./HomeCard6";
import HomeCard7 from "./HomeCard7";
import HomeCard8 from "./HomeCard8";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import CategoryGrid from "../../Components/CategoryGrid/CategoryGrid";
import RecommendedCategories from "../../Components/RecommendedCategories/RecommendedCategories";
import LenskartSwaps from "../../Components/LenskartSwaps/LenskartSwaps";
import {
  HomeDetails,
  HomeDetails1,
  HomeDetails2,
  HomeDetails4,
  HomeDetails5,
  HomeDetails6,
  HomeDetails7,
  HomeDetails8,
  HomeDetails9,
  HomeDetails10,
  HomeDetails11,
  HomeDetails12,
  HomeDetails14,
  HomeDetails15
} from "./HomeDetails";
import { Image, Box } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box>
      <Navbar />
      <HomeCard1 type={HomeDetails1} />
      <Image
        src="https://static1.lenskart.com/media/desktop/img/Apr22/Bannerforexport.jpg"
        alt="img"
        mt="10"
      />
      <CategoryGrid />
      <RecommendedCategories />
      <LenskartSwaps />
      <HomeCard2 type={HomeDetails2} src="https://i.imgur.com/Gry0Q5D.png" />
      <br />
      <br />
      <br />
      <br />
      <HomeCard4
        text="As Seen on Shark Tank"
        src="https://static1.lenskart.com/media/desktop/img/Dec22/1-Dec/Homepage-Banner-web.gif"
      />
      <br />
      <br />
      <br />
      <br />
      
     
      <HomeCard5 />
      <br />
      <br />
      <br />
      <br />
      <br />
      <HomeCard5a type={HomeDetails4} heading="CONTACT LENSES & MORE" />
      <br />
      <br />
      <br />
      <br />
      <HomeCard5b type={HomeDetails5} heading="BUY IT YOUR WAY" />
      <br />
      <br />
      <br />
      <br />
     
    
      <HomeCard6 type={HomeDetails6} heading="EYEGLASSES" />
      <br />
      <br />
      <br />
      <br />
      <HomeCard6 type={HomeDetails7} heading="SUNGLASSES" />
      <br />
      <br />
      <br />
      <br />
      
      <HomeCard4b
        text=""
        src="https://static1.lenskart.com/media/desktop/img/Aug21/25-Aug/LK-Readers-Banner.jpg"
      />
      <br />
      <br />
      <br />
      <br />
      
      <HomeCard6 type={HomeDetails8} heading="WITH POWER COMPUTER BLU LENSES" />
      <br />
      <br />
      <br />
      <br />
      <HomeCard6
        type={HomeDetails9}
        heading="WITH ZERO POWER COMPUTER BLU LENSES"
      />
      <br />
      <br />
      <br />
      <br />
      <HomeCard4b
        text=""
        src="https://static1.lenskart.com/media/desktop/img/June22/Our-Brands-Banner.jpg"
      />
      <br />
      <br />
      <br />
      <br />
      <HomeCard6 type={HomeDetails11} heading="CONTACT LENSES" />
      <br />
      <br />
      <br />
      <br />
      <HomeCard6 type={HomeDetails12} heading="COLOR CONTACT LENSES" />
      <br />
      <br />
      <br />
      <br />
     
      <HomeCard5c type={HomeDetails14} heading="MEET OUR HAPPY CUSTOMERS" />
      <HomeCard7 />
      
      <Footer />
    </Box>
  );
};

export default Home;
