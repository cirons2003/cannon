import { MaterialIcons } from '@expo/vector-icons';
import { Box, Icon, IconButton, Input } from 'native-base';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';

export type SearchBarProps = {
    searchTerm?: string,
    setSearchTerm?: React.Dispatch<React.SetStateAction<string>>;
    mb?: string;
    mx?: string;
    bg?: string;
    color?: string;
}

export const SearchBar = (props: SearchBarProps) => {
    const { searchTerm, setSearchTerm, mb, mx, bg, color } = props;
    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
        <Box position='relative' mb={mb} mx={mx} alignItems="center">
            <Input
                variant="filled"
                placeholder="Search..."
                width="100%"
                borderRadius="10"
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
                InputRightElement={isFocused ? <IconButton onPress={setSearchTerm ? () => setSearchTerm('') : null} icon={<Feather name='x-circle' color='primary' style={{marginRight: 4}}/>}/> : undefined}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={searchTerm}
                onChangeText={setSearchTerm}
                bg={bg ?? 'white'}
                placeholderTextColor={color}
                _focus={{ bg: bg ?? 'white', placeholderTextColor: color, borderColor: 'secondary', borderWidth: '3px' }}
                color={color}
            />
        </Box>
    );
};
