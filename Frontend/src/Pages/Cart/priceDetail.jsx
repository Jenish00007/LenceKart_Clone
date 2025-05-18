import React from "react";
import { useSelector } from "react-redux";
import { Flex, Text, Divider } from "@chakra-ui/react";

const PriceDetail = ({ totalPrice, discountPrice }) => {
  const { coupon } = useSelector((state) => state.cart);

  return (
    <Flex flexDirection={"column"} gap="4">
      <Flex justifyContent={"space-between"} fontSize="16px">
        <Text fontWeight="bold">SUBTOTAL</Text>
        <Text fontWeight="medium">₹{totalPrice}.00</Text>
      </Flex>
      <Divider h={2} mb={2} />
      <Flex justifyContent={"space-between"} fontSize="15px" mb={2}>
        <Text fontWeight="bold">TAX COLLECTED</Text>
        <Text fontWeight="medium">
          + ₹{Math.round((totalPrice - (coupon || 0)) * 0.18)}.00
        </Text>
      </Flex>
      <Divider mb={2} border="1px solid" />
      <Flex justifyContent={"space-between"} fontSize="16px">
        <Text fontWeight="bold">
          TOTAL ORDER{" "}
          <span
            style={{ fontSize: "14px", fontWeight: "500" }}
            color="gray"
          >
            (After Tax)
          </span>
        </Text>
        <Text fontWeight="medium">
          ₹{Math.round(totalPrice + totalPrice * 0.18)}
          .00
        </Text>
      </Flex>

      <Divider h={2} mb={2} />
      <Flex justifyContent={"space-between"} fontSize="16px" mb={2}>
        <Text fontWeight="bold">COUPON</Text>
        <Text fontWeight="medium"> - ₹{coupon || 0}.00</Text>
      </Flex>
      <Divider border="1px solid" mb={2} />
      <Flex justifyContent={"space-between"}>
        <Text fontWeight="bolder" fontSize="17px">
          TOTAL PAYABLE
        </Text>
        <Text fontWeight="bold" fontSize="17px" color="#329BA9">
          ₹
          {Math.round(totalPrice + totalPrice * 0.18) -
            (coupon || 0)}
          .00
        </Text>
      </Flex>
    </Flex>
  );
};

export default PriceDetail;
