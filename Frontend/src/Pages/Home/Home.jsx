import React from "react";
import HomeCard from "./HomeCard";
import HomeCard1 from "./HomeCard1";
import HomeCard2 from "./HomeCard2";
import axios from "axios";  

import { useState, useEffect } from "react";
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
import TrendingEyeglasses from "../../Components/TrendingEyeglasses/TrendingEyeglasses";
import SectionBanner from "../../Components/SectionBanner/SectionBanner";
import {
  HomeDetails2,
  HomeDetails4,
  HomeDetails5,
  HomeDetails6,
  HomeDetails7,
  HomeDetails8,
  HomeDetails9,
  HomeDetails11,
  HomeDetails12,
  HomeDetails14,
  HomeDetails15
} from "./HomeDetails";
import { Image, Box } from "@chakra-ui/react";
import RecentlyViewed from '../../Components/RecentlyViewed/RecentlyViewed';
import SpecialProducts from '../../Components/SpecialProducts/SpecialProducts';

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shapes, setShapes] = useState([]);
  const [shapesLoading, setShapesLoading] = useState(true);
  const [shapesError, setShapesError] = useState(null);
  const [adBanners, setAdBanners] = useState([]);
  const [adBannersLoading, setAdBannersLoading] = useState(true);
  const [adBannersError, setAdBannersError] = useState(null);
  const [sectionBanners, setSectionBanners] = useState({
    top: [],
    middle: [],
    bottom: []
  });
  const [sectionBannersLoading, setSectionBannersLoading] = useState(true);
  const [sectionBannersError, setSectionBannersError] = useState(null);
  const [sunglasses, setSunglasses] = useState([]);
  const [sunglassesLoading, setSunglassesLoading] = useState(true);
  const [sunglassesError, setSunglassesError] = useState(null);
  const [eyeglasses, setEyeglasses] = useState([]);
  const [eyeglassesLoading, setEyeglassesLoading] = useState(true);
  const [eyeglassesError, setEyeglassesError] = useState(null); 

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/banner/banners');
        //console.log('Banner API Response:', response.data);
        if (!response.data || response.data.length === 0) {
          console.warn('No banner data received from API');
        }
        setBanners(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching banners:', err);
        setError('Failed to fetch banners: ' + (err.message || 'Unknown error'));
        setLoading(false);
      }
    };

    const fetchAdBanners = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/adbanner/banners');
        setAdBanners(response.data);
        setAdBannersLoading(false);
      } catch (err) {
        console.error('Error fetching ad banners:', err);
        setAdBannersError('Failed to fetch ad banners: ' + (err.message || 'Unknown error'));
        setAdBannersLoading(false);
      }
    };
    const fetchShapes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/shape', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        //console.log('Shapes API Response:', response.data);
        setShapes(response.data);
        setShapesLoading(false);
      } catch (err) {
        console.error('Error fetching shapes:', err);
        setShapesError('Failed to fetch shapes: ' + (err.message || 'Unknown error'));
        setShapesLoading(false);
      }
    };

    const fetchSunglasses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/product?productType=sunglasses', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        //console.log('Sunglasses API Response:', response.data);
        setSunglasses(response.data.products);
        setSunglassesLoading(false);
      } catch (err) {
        console.error('Error fetching sunglasses:', err);
        setSunglassesError('Failed to fetch sunglasses: ' + (err.message || 'Unknown error'));
        setSunglassesLoading(false);
      }
    };
    const fetchEyeglasses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/product?productType=eyeglasses', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        //console.log('Sunglasses API Response:', response.data);
        setEyeglasses(response.data.products);
        setEyeglassesLoading(false);
      } catch (err) {
        console.error('Error fetching eyeglasses:', err);
        setEyeglassesError('Failed to fetch eyeglasses: ' + (err.message || 'Unknown error'));
        setEyeglassesLoading(false);
      }
    };


    const fetchSectionBanners = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/sectionbanner/banners');
        const banners = response.data;
        
        // Organize banners by section
        const organizedBanners = {
          top: banners.filter(banner => banner.section === 'top'),
          middle: banners.filter(banner => banner.section === 'middle'),
          bottom: banners.filter(banner => banner.section === 'bottom')
        };
        
        setSectionBanners(organizedBanners);
        setSectionBannersLoading(false);
      } catch (err) {
        console.error('Error fetching section banners:', err);
        setSectionBannersError('Failed to fetch section banners: ' + (err.message || 'Unknown error'));
        setSectionBannersLoading(false);
      }
    };

    fetchBanners();
    fetchAdBanners();
    fetchSectionBanners();
    fetchShapes();
    fetchSunglasses();
    fetchEyeglasses();
  }, []);

  const renderAdBanner  = (banner) => (
    <Box key={banner._id} mt="10">
      <Image
        src={banner.imageUrl}
        alt={banner.altText}
        width="100%"
      />
    </Box>
  );

  return (
    <Box>
      <Navbar />
      <HomeCard1 type={banners} loading={loading} error={error}/>
      <HomeCard2 type={shapes} loading={shapesLoading} error={shapesError} />
            
      {/* Top Ad Banner */}
      {!adBannersLoading && !adBannersError && adBanners[0] && renderAdBanner(adBanners[0])}
           
     
      
      <CategoryGrid />
      <RecommendedCategories />

       {/* Top Section Banners */}
       {!sectionBannersLoading && !sectionBannersError && sectionBanners.top.map((banner, index) => (
        <SectionBanner
          key={banner._id}
          title={banner.title}
          leftImage={banner.leftImage}
          rightImage={banner.rightImage}
        />
      ))}

      {/* <LenskartSwaps /> */}
         {/* Middle Ad Banner */}
         {!adBannersLoading && !adBannersError && adBanners[1] && renderAdBanner(adBanners[1])}
      
      {/* Middle Section Banners */}
      {!sectionBannersLoading && !sectionBannersError && sectionBanners.middle.map((banner, index) => (
        <SectionBanner
          key={banner._id}
          title={banner.title}
          leftImage={banner.leftImage}
          rightImage={banner.rightImage}
        />
      ))}
      
      <TrendingEyeglasses />
      
      <br />
      <br />
      <RecentlyViewed />
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
       {/* Bottom Ad Banner */}
       {!adBannersLoading && !adBannersError && adBanners[2] && renderAdBanner(adBanners[2])}
      <HomeCard6 type={HomeDetails8} heading="WITH POWER COMPUTER BLU LENSES" />
      <br />
     
    
      
      
      
      <HomeCard6 type={eyeglasses} loading={eyeglassesLoading} error={eyeglassesError} heading="EYEGLASSES" />
      <br />
      <br />
      <br />
      <br />
      <HomeCard6 type={sunglasses} loading={sunglassesLoading} error={sunglassesError} heading="SUNGLASSES" />
      <br />
      <br />
            
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
      <HomeCard6 type={HomeDetails11} heading="CONTACT LENSES" />
      <br />
      <br />
      
      <HomeCard6 type={HomeDetails12} heading="COLOR CONTACT LENSES" />
      <br />
      <br />
      <br />
      <br />
      {/* Bottom Section Banners */}
      {!sectionBannersLoading && !sectionBannersError && sectionBanners.bottom.map((banner, index) => (
        <SectionBanner
          key={banner._id}
          title={banner.title}
          leftImage={banner.leftImage}
          rightImage={banner.rightImage}
        />
      ))}
      <br />
      <br />
     
      <SpecialProducts />
      <HomeCard5c type={HomeDetails14} heading="MEET OUR HAPPY CUSTOMERS" />
      <HomeCard7 />
      <Footer />
    </Box>
  );
};

export default Home;
