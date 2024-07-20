import { Flex, Icon, IconButton, useTheme } from "native-base";
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from "../../../custom hooks/hooks";
import { setPage } from "../../../features/navigationSlice";

type BottomButtonProps = {
    icon: JSX.Element;
    num: number;
    onPress: (toPage: number) => void;
    pageNum: number;
}

function BottomButton({ icon, num, onPress, pageNum }: BottomButtonProps) {
    return (
        <IconButton onPress={() => onPress(num)} bg={pageNum === num ? 'primary' : 'transparent'} borderRadius='full' icon={icon} />
    );
};

export default function BottomBar() {
    const theme = useTheme();
    const iconColor = (num: number) => pageNum === num ? 'secondary' : 'primary';
    const iconSize = 'lg';
    const pageNum = useAppSelector(state => state.navigation.pageNum);
    const dispatch = useAppDispatch();

    const handlePress = (toPage: number) => {
        dispatch(setPage(toPage));
    }

    return (
        <Flex width='full' height='80px' direction='row' align='center' justify='space-around' bg='background'>
            <BottomButton onPress={handlePress} pageNum={pageNum} num={0} icon={<Icon as={MaterialCommunityIcons} name='account-circle-outline' size={iconSize} color={iconColor(0)} />} />
            <BottomButton onPress={handlePress} pageNum={pageNum} num={1} icon={<Icon as={MaterialCommunityIcons} name='hamburger-plus' size={iconSize} color={iconColor(1)} />} />
            <BottomButton onPress={handlePress} pageNum={pageNum} num={2} icon={<Icon as={MaterialCommunityIcons} name='account-circle-outline' size={iconSize} color={iconColor(2)} />} />
        </Flex>
    );
};