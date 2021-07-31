import { Box, Image, Badge, Wrap, WrapItem, Center } from '@chakra-ui/react';

function Card({
  flag,
  name,
  capital,
  languages,
  population,
  subregion,
  region,
  count,
  id,
}) {
  return (
    <Box
      ml="10px"
      mr="10px"
      mt="20px"
      maxW="sm"
      borderWidth="1px"
      borderRadius="20px"
      overflow="hidden"
      _hover="background-color: red"
    >
      {/* img element for displaying flag */}
      {flag && (
        <Image
          borderRadius="20px"
          objectFit="cover"
          height="250px"
          src={flag}
          alt={name}
          mr="auto"
          ml="auto"
        />
      )}

      <Box p="6">
        <Box
          d="flex"
          alignItems="baseline"
          justifyContent={count ? 'space-between' : 'initial'}
        >
          {count && <Badge px="2">{parseInt(id) + 1}</Badge>}
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {name}
          </Badge>
          {count && <Badge px="2">{count} COUNTRIES</Badge>}
          {(region || subregion) && (
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {region} &bull; {subregion}
            </Box>
          )}
        </Box>
        {/* If languages array is empty then pass this element */}
        {/* Otherwise languages.map func won't run */}
        {languages && (
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            <Wrap ml={'5px'} spacing="10px" align="center">
              Languages:{' '}
              {languages &&
                languages.map((language, index) => (
                  <WrapItem key={index}>
                    <Center>{language.name}</Center>
                  </WrapItem>
                ))}
            </Wrap>
          </Box>
        )}

        {population && <Box>Population: {population}</Box>}
        {capital && <Box>Capital: {capital}</Box>}
      </Box>
    </Box>
  );
}

export default Card;
