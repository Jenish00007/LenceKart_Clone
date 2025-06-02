// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Pagination from "../../Components/Pagination";
// import Navbar from "./Navbar";
// import {
//   Box,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   TableContainer,
//   Heading,
//   Button,
//   useToast,
//   Text,
//   Grid,
//   GridItem,
//   Input,
//   Select
// } from "@chakra-ui/react";
// import { API_URL } from "../../config";

// const Productlist = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [sort, setSort] = useState("");
//   const [filter, setFilter] = useState("");
//   const [gender, setGender] = useState("");
//   const [page, setPage] = useState(0);
//   const [shape, setShape] = useState("");
//   const [style, setStyle] = useState("");
//   const [productref, setProductref] = useState("");
//   const toast = useToast();

//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `${API_URL}/product?sort=${sort}&productRefLink=${productref}&gender=${gender}&productType=${filter}&shape=${shape}&style=${style}&page=${page}`
//       );
//       const postData = await response.json();
//       setData(postData);
//       setIsLoading(false);
//     } catch (error) {
//       setIsLoading(false);
//       console.log(error);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [sort, filter, page, gender, shape, style, productref]);

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(
//         `${API_URL}/product/${id}`,
//         {
//           method: "DELETE"
//         }
//       );
//       if (response.status === 200) {
//         fetchData();

//         toast({
//           title: "Product Deleted",
//           description: "Product Deleted Successfully.",
//           status: "success",
//           duration: 2000,
//           isClosable: true
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Box bg="gray.200" minH="710px">
//       <Navbar />
//       <br />
//       <Grid
//         templateColumns={{
//           lg: "30% 10% 10% 10% 15% 15%",
//           md: "repeat(2, 1fr)",
//           sm: "repeat(1, 1fr)",
//           base: "repeat(1, 1fr)"
//         }}
//         justifyContent="space-between"
//         w="95%"
//         m="auto"
//         gap="4"
//       >
//         <GridItem colSpan={{ lg: 1, md: 2, sm: 1, base: 1 }}>
//           <Input
//             size="lg"
//             type="search"
//             fontSize={{ lg: "16px", base: "14px" }}
//             h="40px"
//             bg="whiteAlpha.900"
//             borderRadius="3xl"
//             placeholder="Search by name"
//             value={productref}
//             onChange={(e) => setProductref(e.target.value)}
//           />
//         </GridItem>
//         <GridItem>
//           <Select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             size="lg"
//             fontSize={{ lg: "16px", base: "14px" }}
//             h="40px"
//             bg="whiteAlpha.900"
//           >
//             <option value="">All Glasses</option>
//             <option value="sunglasses">Sun Glasses</option>
//             <option value="eyeglasses">Eye Glasses</option>
//           </Select>
//         </GridItem>
//         <GridItem>
//           <Select
//             value={gender}
//             onChange={(e) => setGender(e.target.value)}
//             size="lg"
//             fontSize={{ lg: "16px", base: "14px" }}
//             h="40px"
//             bg="whiteAlpha.900"
//           >
//             <option value="">For all Gender</option>
//             <option value="Men">Men</option>
//             <option value="Women">Women</option>
//             <option value="Kid">Kid</option>
//           </Select>
//         </GridItem>
//         <GridItem>
//           <Select
//             value={sort}
//             onChange={(e) => setSort(e.target.value)}
//             size="lg"
//             fontSize={{ lg: "16px", base: "14px" }}
//             h="40px"
//             bg="whiteAlpha.900"
//           >
//             <option value="">Sort By Price</option>
//             <option value="lowtohigh">Low to High</option>
//             <option value="hightolow">High to Low</option>
//           </Select>
//         </GridItem>
//         <GridItem>
//           <Select
//             placeholder="Choose Frame Shape"
//             onChange={(e) => setShape(e.target.value)}
//             value={shape}
//             size="lg"
//             fontSize={{ lg: "16px", base: "14px" }}
//             h="40px"
//             bg="whiteAlpha.900"
//           >
//             <option value="Rectangle">Rectangle</option>
//             <option value="Round">Round</option>
//             <option value="Wayfarer">Wayfarer</option>
//             <option value="Butterfly">Butterfly</option>
//             <option value="Aviator">Aviator</option>
//             <option value="Wrapround">Wrap Round</option>
//             <option value="Cateye">Cateye</option>
//             <option value="Hexagon">Hexagon</option>
//             <option value="Square">Square</option>
//           </Select>
//         </GridItem>
//         <GridItem>
//           <Select
//             placeholder="Choose Frame Types"
//             onChange={(e) => setStyle(e.target.value)}
//             value={style}
//             size="lg"
//             fontSize={{ lg: "16px", base: "14px" }}
//             h="40px"
//             bg="whiteAlpha.900"
//           >
//             <option value="Tinted">Tinted</option>
//             <option value="FullFrame">FullFrame</option>
//             <option value="Mirror">Mirror</option>
//           </Select>
//         </GridItem>
//       </Grid>
//       <br />
//       <br />
//       {isLoading ? (
//         <Heading
//           as="h1"
//           fontSize={{ lg: "4xl", base: "2xl" }}
//           fontFamily="cursive"
//           textAlign="center"
//           minH="500px"
//         >
//           Loading...
//         </Heading>
//       ) : data.length === 0 ? (
//         <Heading
//           as="h1"
//           fontSize={{ lg: "4xl", base: "2xl" }}
//           color="gray"
//           textAlign="center"
//           minH="540px"
//         >
//           No Data found
//         </Heading>
//       ) : (
//         <Box>
//           <Text
//             w="95%"
//             m="auto"
//             fontSize={{ lg: "2xl", sm: "xl", base: "lg" }}
//             fontWeight="bold"
//             color="whiteAlpha.900"
//             bg="#329c92"
//             p="2"
//           >
//             Product List
//           </Text>
//           <Box
//             w="95%"
//             m="auto"
//             bg="whiteAlpha.900"
//             overflowX="auto"
//             sx={{
//               '&::-webkit-scrollbar': {
//                 height: '8px',
//               },
//               '&::-webkit-scrollbar-track': {
//                 background: '#f1f1f1',
//               },
//               '&::-webkit-scrollbar-thumb': {
//                 background: '#888',
//                 borderRadius: '4px',
//               },
//               '&::-webkit-scrollbar-thumb:hover': {
//                 background: '#555',
//               },
//             }}
//           >
//             <TableContainer>
//               <Table variant="striped" colorScheme="teal" size={{ lg: "md", base: "sm" }}>
//                 <Thead>
//                   <Tr>
//                     <Th fontSize={{ lg: "15px", base: "12px" }}>Edit</Th>
//                     <Th fontSize={{ lg: "15px", base: "12px" }}>Delete</Th>
//                     <Th fontSize={{ lg: "15px", base: "12px" }}>Name</Th>
//                     <Th fontSize={{ lg: "15px", base: "12px" }}>Shape</Th>
//                     <Th fontSize={{ lg: "15px", base: "12px" }}>Colors</Th>
//                     <Th fontSize={{ lg: "15px", base: "12px" }}>Gender</Th>
//                     <Th fontSize={{ lg: "15px", base: "12px" }}>Style</Th>
//                     <Th fontSize={{ lg: "15px", base: "12px" }}>Dimension</Th>
//                     <Th fontSize={{ lg: "15px", base: "12px" }}>Product Type</Th>
//                     <Th fontSize={{ lg: "15px", base: "12px" }}>Orginal Price</Th>
//                     <Th fontSize={{ lg: "15px", base: "12px" }}>Discounted Price</Th>
//                     <Th fontSize={{ lg: "15px", base: "12px" }}>Rating</Th>
//                     <Th fontSize={{ lg: "15px", base: "12px" }}>image Url</Th>
//                   </Tr>
//                 </Thead>
//                 <Tbody>
//                   {data.map((el, i) => (
//                     <Tr key={i}>
//                       <Td>
//                         <Button
//                           colorScheme="blue"
//                           fontSize={{ lg: "15px", base: "12px" }}
//                           size={{ lg: "md", base: "sm" }}
//                           onClick={() => navigate(`/editproduct/${el._id}`)}
//                         >
//                           Edit
//                         </Button>
//                       </Td>
//                       <Td>
//                         <Button
//                           fontSize={{ lg: "15px", base: "12px" }}
//                           colorScheme="red"
//                           size={{ lg: "md", base: "sm" }}
//                           onClick={() => handleDelete(el._id)}
//                         >
//                           Delete
//                         </Button>
//                       </Td>
//                       <Td fontSize={{ lg: "15px", base: "12px" }} textTransform="capitalize">
//                         {el.productRefLink}
//                       </Td>
//                       <Td fontSize={{ lg: "15px", base: "12px" }}>{el.shape}</Td>
//                       <Td fontSize={{ lg: "15px", base: "12px" }}>{el.colors}</Td>
//                       <Td fontSize={{ lg: "15px", base: "12px" }}>{el.gender}</Td>
//                       <Td fontSize={{ lg: "15px", base: "12px" }}>{el.style}</Td>
//                       <Td fontSize={{ lg: "15px", base: "12px" }}>{el.dimension}</Td>
//                       <Td fontSize={{ lg: "15px", base: "12px" }} textTransform="capitalize">
//                         {el.productType}
//                       </Td>
//                       <Td fontSize={{ lg: "15px", base: "12px" }}>₹ {el.mPrice}</Td>
//                       <Td fontSize={{ lg: "15px", base: "12px" }}>₹ {el.price}</Td>
//                       <Td fontSize={{ lg: "15px", base: "12px" }}>{el.rating}</Td>
//                       <Td fontSize={{ lg: "15px", base: "12px" }}>{el.imageTsrc}</Td>
//                     </Tr>
//                   ))}
//                 </Tbody>
//               </Table>
//             </TableContainer>
//           </Box>
//         </Box>
//       )}
//       <br />
//       {data.length !== 0 && (
//         <Pagination
//           current={page}
//           onChange={(value) => setPage(value)}
//           totalPage={data.length < 0 ? true : false}
//         />
//       )}
//       <br />
//       <br />
//     </Box>
//   );
// };

// export default Productlist;
