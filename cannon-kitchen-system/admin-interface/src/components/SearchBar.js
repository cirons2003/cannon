import { Input, InputGroup, InputLeftElement, Icon, Flex } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

const SearchBar = ({searchTerm, setSearchTerm, bgc, size, mb, borderColor}) => {
  return (
    <InputGroup w="300px" mb = {mb && mb} >
      <InputLeftElement boxSize = {size && size} pointerEvents="none">
        <Flex align = 'center'>
          <Icon fontSize = {size && `${size * 1.5}px`} as={Search2Icon} color="gray.500" />
        </Flex>
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Search..."
        bg= {bgc !== null ? bgc : "whiteAlpha.800"}
        _placeholder={{ color: 'gray.500' }}
        _hover={{ bg: 'whiteAlpha.900' }}
        _focus={{ bg: 'whiteAlpha.900', borderColor: 'blue.500' }}
        value = {searchTerm} 
        onChange = {(e)=> setSearchTerm(e.target.value)}
        width = {size && size * 40}
        height = {size && size}
        fontSize = {size && `${size*2}px`}
        borderColor = {borderColor && borderColor}
        
      />
    </InputGroup> 
  );
};

export default SearchBar;
