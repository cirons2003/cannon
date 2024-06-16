import { MaterialIcons } from '@expo/vector-icons';
import { Box, Icon, Input } from 'native-base';

export type SearchBarProps = {
    searchTerm?: string,
    setSearchTerm?: React.Dispatch<React.SetStateAction<string>>;
    mb?: string;
    mx?: string;
    bg?: string;
    color?: string;
}

export  const SearchBar = (props: SearchBarProps) => {
    const { searchTerm, setSearchTerm, mb, mx, bg, color } = props;

    return (
        <Box mb={mb} mx={mx} alignItems="center">
            <Input
                variant="filled"
                placeholder="Search..."
                width="100%"
                borderRadius="10"
                py="2"
                px="3"
                borderWidth="1px"
                borderColor={color}
                InputLeftElement={
                    <Icon
                        as={<MaterialIcons name="search" />}
                        size="sm"
                        m="2"
                        color={color ?? 'grey'}
                    />
                }
                value={searchTerm}
                onChangeText={setSearchTerm}
                bg={bg ?? 'white'}
                placeholderTextColor={color}
                _focus={{bg: bg ?? 'white', placeholderTextColor: color, borderColor: 'secondary', borderWidth:'3px'}}
                color={color}
            />
        </Box>
    );
};
