import { Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

const SearchBar = ({searchTerm, setSearchTerm}) => {
  return (
    <InputGroup w="300px">
      <InputLeftElement pointerEvents="none">
        <Icon as={Search2Icon} color="gray.500" />
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Search..."
        bg="whiteAlpha.800"
        _placeholder={{ color: 'gray.500' }}
        _hover={{ bg: 'whiteAlpha.900' }}
        _focus={{ bg: 'whiteAlpha.900', borderColor: 'blue.500' }}
        value = {searchTerm} 
        onChange = {(e)=> setSearchTerm(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchBar;
