import { Alert, Flex, Icon, Text } from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

type AlertPopupProps = {
    bg?: string;
    color?: string;
    h?: number;
    w?: number;
    iconVariant?: 'success' | 'error' | 'alert';
    alertText?: string;
    fontSize?: string;
};

const iconAsMap = {
    success: FontAwesome5,
    error: MaterialIcons,
    alert: Foundation,
};

const iconNameMap = {
    success: 'check',
    error: 'error',
    alert: 'alert',
};

export const AlertPopup = (props: AlertPopupProps) => {
    const { bg, color, h = 60, w = 300, iconVariant = 'success', alertText='alert!', fontSize='md' } = props;
    return (
        <Alert position='absolute' top='45%' left='50%' w={`${w}px`} h={`${h}px`} style={{ transform: `translate(-${w / 2}px, -${h / 2}px)` }} bg='transparent' p={0}>
            <Flex direction='row' px='sm' borderRadius='full' bg={bg} w='full' h='full' align="center" borderColor={color} borderWidth={1}>
                <Icon mr='sm' color={color} size={7} as={iconAsMap[iconVariant]} name={iconNameMap[iconVariant]}/>
                <Text isTruncated bold fontSize={fontSize} color={color}>{alertText}</Text>
            </Flex>
        </Alert>
    );
}